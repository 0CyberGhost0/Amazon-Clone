const express=require('express');
const authRouter=express.Router();
const User=require('../models/user');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const auth=require('../middlewares/auth');
authRouter.post('/api/signin',async(req,res)=>{
    try {
        console.log("Inside Signin in auth");
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({msg:"User doesn't Exist"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({msg:"Incorrect Password"});
        }
        const token=jwt.sign({id:user._id},"password");
        res.json({token,...user._doc});

    } catch (error) {
        res.status(500).json({error:error.message});
        
    }
});
authRouter.post('/api/signup',async (req,res)=>{
   try {
     const {name,email,password}=req.body;
     const existingUser=await User.findOne({email});
     if(existingUser){
         return res.status(400).json({error:"User with same email Already exists"});
     }
     const hashPassword=await bcrypt.hash(password,8);
     let user=new User({
         name,
         password:hashPassword,
         email,
     });
     user=await user.save();
     res.json(user);
   } catch (e){
        res.status(500).json({error:e.message});
   }

});
authRouter.post('/tokenIsValid',async(req,res)=>{
    try {
        const token=req.header("x-auth-token");
        if(!token) res.json(false);
        const verified=jwt.verify(token,"password");
        if(!verified) return res.json(false);
        const user=await User.findById(verified.id);
        if(!user) return res.json(false);
        res.json(true);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
});
authRouter.post("/",auth,async(req,res)=>{
    const user=await User.findById(req.user);
    res.json({...user._doc,token:req.token});

});

module.exports=authRouter;
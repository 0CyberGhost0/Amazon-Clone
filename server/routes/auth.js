const express=require('express');
const authRouter=express.Router();
const User=require('../models/user');
const bcrypt=require('bcryptjs');
authRouter.post('/api/signup',async (req,res)=>{
   try {
    console.log('Inside Sigup operation');
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
   } catch (e) {
    res.status(500).json({error:e.message});
    
   }

});
module.exports=authRouter;
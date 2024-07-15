const express=require('express');
const app=express();
const mongoose=require('mongoose');
const authRouter=require('./routes/auth');
const User=require('./models/user')
const bcrypt=require('bcryptjs');
const dbUrl="mongodb+srv://ved:admin@amazon.mw9rykz.mongodb.net/?retryWrites=true&w=majority&appName=amazon"
mongoose.connect(dbUrl).then(()=>{
    console.log("Database Connected");}
).catch((e)=>{
    console.log(e);
});
app.use(express.json());
app.post('/api/signup',async (req,res)=>{
    try {
     console.log('Inside Signup operation');
      const {name,email,password}=req.body;
      const existingUser=await User.findOne({email});
      if(existingUser){
          res.status(400).json({error:"User with same email Already exists"});
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
// app.use('/',authRouter);
app.listen(3000,()=>{
    console.log("Listening on Port 3000");
});

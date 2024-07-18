const express=require('express');
const app=express();
const mongoose=require('mongoose');
const authRouter=require('./routes/auth');
const User=require('./models/user')
const bcrypt=require('bcryptjs');
const jwt=require("jsonwebtoken");
const dbUrl="mongodb+srv://ved:admin@amazon.mw9rykz.mongodb.net/?retryWrites=true&w=majority&appName=amazon"
mongoose.connect(dbUrl).then(()=>{
    console.log("Database Connected");}
).catch((e)=>{
    console.log(e);
});
app.use(express.json());
app.use('/',authRouter);
app.listen(3000,()=>{
    console.log("Listening on Port 3000");
});

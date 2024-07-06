const express=require('express');
const app=express();
const mongoose=require('mongoose');
const authRouter=require('./routes/auth');
const dbUrl="mongodb+srv://ved:admin@amazon.mw9rykz.mongodb.net/?retryWrites=true&w=majority&appName=amazon"
mongoose.connect(dbUrl).then(()=>{
    console.log("Database Connected");}
).catch((e)=>{
    print("error" , e);
});
app.use(express.json());
app.use('/',authRouter);
app.listen(3000,()=>{
    console.log("Listening on Port 3000");
});

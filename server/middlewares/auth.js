const jwt=require("jsonwebtoken");
const auth=(req,res,next)=>{
    try {
        const token=req.header('x-auth-token');
        if(!token) res.staus(401).json({msg:"No Auth Access!! Access Denied"});
        const verified=jwt.verify(token,"password");
        if(!verified) return res.status(401).json({msg:"Token Authorization failed!"});
        req.user=verified.id;
        req.token=token;
        next(); 
        
    } catch (error) {
        res.status(500).json({error:error.message});
    }
};
module.exports=auth;
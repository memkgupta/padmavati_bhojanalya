const jwt = require('jsonwebtoken');
const setUser = (user)=>{
const token = jwt.sign(JSON.stringify(user),process.env.JWT_SECRET);
return token;
}
const getUser = (req,res,next)=>{
    const headers = req.headers; // get all headers of a request
console.log(headers)
    const token = headers.authorization?.split(' ')[1];
    if(token){
        try {
            req.user = jwt.verify(token,process.env.JWT_SECRET);
next();
        } catch (error) {
            res.status(400).json({success:false,message:"Invalid Token"})
        }

    }
    else{
        res.status(400).json({success:false,message:"Login First"})
    }

}
module.exports={setUser,getUser};
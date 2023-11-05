const { getUser, setUser } = require("../middlewares/auth");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const errorHandler = require("../middlewares/error");
const { HttpError } = require("../utils/Errors/HttpError");
const { sendOTP } = require("../utils/otpUtils");
const loginHandler = async (req, res, next) => {
  //checking wether the user exists or not
  const user = await User.findOne({
    $or: [{ email: req.body.email }, { mobile_no: req.body.email }],
  });
  if (user) {
    const isPasswordMatched = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (isPasswordMatched) {
      const token = setUser(user);
      console.log(token);
      res.status(200).json({
        success: true,
        message: "User Logged In successFully",
        token: token,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Either email is wrong or password is incorrect",
      });
    }
  } else {
    // res.status(400).json({ success: false, message: "No such user exists" });
    return next(new HttpError(400,"No such user exists"));
    
  }
};
const signUpHandler = async (req, res, next) => {
  // we should handle errors
  // we will first check that user already exist or not
  const user = await User.findOne({
    $or: [
      { email: req.body.email },
      { uname: req.body.uname },
      { mobile_no: req.body.mobile_no },
    ],
  });
  if (user) {
    res.status(400).json({
      success: false,
      message: "User Already Exists with this email or mobile no.",
    });
  } else {
    try {
      const OTP = sendOTP(req.body.email);
      if(OTP){
        req.body.otp = {otp:OTP};  // adding otp property to req.body
      }
      const user = await User.create(req.body);
      user.save();
      if (user) {
        res
          .status(200)
          .json({ success: true, message: "User Created SuccessFully" });
      } else {
        res.status(400).json({
          success: false,
          message: "User Can't be created Please Enter Valid Data",
        });
      }
    } catch (error) {
        return next(error); // here we are not sending our custom error but the error object thrown by this catch block
    }
  }
};
const verifyOTP = async(req,res,next)=>{

  const {otp,email} = req.body;
  
  try {
    const user = await User.findOne({email:email});
    if(!user){
      return next(new HttpError(400,"Invalid Email Id"))
    }
    // Checking wether there is an recent otp or not 
    if(!user.otp.otp){
      return next(new HttpError(400,"Invalid Request"));
    }
    else{
      if(otp===user.otp.otp){
        // checking wether the otp is expired or not
        if(Date.now()-user.otp.createdAt>1000*10*60){
          return next(new HttpError(400,"Otp time expired please request another otp"))
        }
        // once otp is matched marked verified true and unset the otp
  User.findOneAndUpdate({email:email},{$set:{verified:true},$unset:{otp:1}},{new:true}).then(()=>{
  res.status(200).json({success:true,message:"OTP matched And User Verified"});
  }).catch((err)=>{
    console.log(err)
    return next(new HttpError(400,err.message))
  })
      }
      else{
        return next(new HttpError(400,"Invalid OTP"));
      }
    }
   
  } catch (error) {
    return next(new HttpError(400,error.message))
  }

}
const updateHandler = async (req, res) => {};
const fetchAccount = (req, res) => {
  res.send(req.user);
};

module.exports = {
  loginHandler,
  signUpHandler,
  fetchAccount,
  verifyOTP
};

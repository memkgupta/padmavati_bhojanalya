const { getUser, setUser } = require("../middlewares/auth");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const errorHandler = require("../middlewares/error");
const { HttpError } = require("../utils/Errors/HttpError");
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
const updateHandler = async (req, res) => {};
const fetchAccount = (req, res) => {
  res.send(req.user);
};

module.exports = {
  loginHandler,
  signUpHandler,
  fetchAccount,
};

const express = require('express');
const router  = express.Router();
const {signUpHandler,loginHandler,fetchAccount, verifyOTP} = require('../controllers/userController');
const auth = require('../middlewares/auth')
router.post('/signup',signUpHandler);
router.post('/login',loginHandler);
router.get('/me',auth.getUser,fetchAccount);
router.put('/otp/verify',verifyOTP);
module.exports = router;
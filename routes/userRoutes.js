const express = require('express');
const router  = express.Router();
const {signUpHandler,loginHandler,fetchAccount} = require('../controllers/userController');
const auth = require('../middlewares/auth')
router.post('/signup',signUpHandler);
router.post('/login',loginHandler);
router.get('/me',auth.getUser,fetchAccount);

module.exports = router;
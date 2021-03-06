// src/routes/authentication/index.js

const express = require('express');
const router = express.Router();
const {
  googleSignIn,
  facebookSignin,
  refresh,
  emailLogin,
  emailSignup,
  forgotPassword,
  resetPassword,
} = require('./authentication');
const {
  validateEmailLogin,
  validateEmailSignup,
  validateFacebookSignin,
  validateGoogleSignin,
  validateResetPassword,
} = require('./validation');

router.get('/refresh', refresh);
router.post('/google', validateGoogleSignin, googleSignIn);
router.post('/facebook', validateFacebookSignin, facebookSignin);
router.post('/email/signup', validateEmailSignup, emailSignup);
router.post('/email/login', validateEmailLogin, emailLogin);
router.put('/forgotpassword', forgotPassword);
router.put('/resetpassword', validateResetPassword, resetPassword);
module.exports = router;

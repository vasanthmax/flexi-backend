// src/routes/authentication/index.js 

const express = require('express')
const router = express.Router()
const { googleSignIn, facebookSignin, refresh,
        emailLogin, emailSignup } = require('./authentication')
const { validateEmailLogin, validateEmailSignup,
        validateFacebookSignin, validateGoogleSignin } = require('./validation')

router.get('/refresh', refresh)
router.post('/google', validateGoogleSignin, googleSignIn)
router.post('/facebook', validateFacebookSignin, facebookSignin)
router.post('/email/signup', validateEmailSignup, emailSignup)
router.post('/email/login', validateEmailLogin, emailLogin)


module.exports = router
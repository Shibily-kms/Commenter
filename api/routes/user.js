const express = require('express');
const router = express.Router();
const { checkSignUpData, sendOtp, verifyOtp, doSingUp } = require('../controllers/auth-controller')

// Sing Up And Otp
router.post('/check-signup', checkSignUpData)
router.post('/otp', sendOtp)
router.post('/send-otp', sendOtp)
router.post('/verify-otp', verifyOtp)
router.post('/sign-up',doSingUp)  

module.exports = router;
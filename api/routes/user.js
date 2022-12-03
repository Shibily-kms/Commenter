const express = require('express');
const router = express.Router();
const { checkSignUpData, sendOtp, verifyOtp, doSingUp, verifyUserNameOrEmail, setNewPassword,
    doSingIn, getUserData } = require('../controllers/auth-controller')
const { verifyUser } = require('../middlewares/verify-middleware')
const { doPost, getUserPost, likePost, savePost, removeSavePost, deletePost } = require('../controllers/post-controller')

// Sing Up And Otp
router.post('/check-signup', checkSignUpData)
router.post('/send-otp', sendOtp)
router.post('/verify-otp', verifyOtp)
router.post('/sign-up', doSingUp)

//  Forgot Password
router.post('/verify-username-or-email', verifyUserNameOrEmail);
router.post('/new-password', setNewPassword);

// Sign In
router.post('/sign-in', doSingIn)
router.get('/get-user', getUserData)

// Post
router.post('/post', verifyUser, doPost)
router.get('/user-post', verifyUser, getUserPost)
router.put('/like', verifyUser, likePost)
router.put('/save-post', verifyUser, savePost)
router.delete('/save-post', verifyUser, removeSavePost)
router.delete('/delete-post/:urId/:postId', verifyUser, deletePost)

module.exports = router;
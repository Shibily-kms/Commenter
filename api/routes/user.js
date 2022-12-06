const express = require('express');
const router = express.Router();
const { checkSignUpData, sendOtp, verifyOtp, doSingUp, verifyUserNameOrEmail, setNewPassword,
    doSingIn, getUserData } = require('../controllers/auth-controller')
const { verifyUser } = require('../middlewares/verify-middleware')
const { doPost, getUserPost, likePost, savePost, removeSavePost, deletePost, getAllSavePost, getHomePost,
    doComment, removeComment } = require('../controllers/post-controller')
const { getFriendsSuggestions, doFollow, getProfileInfo, doUnfollow } = require('../controllers/friends-controller')
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
router.get('/save-post', verifyUser, getAllSavePost)
router.put('/save-post', verifyUser, savePost)
router.delete('/save-post/:urId/:postId', verifyUser, removeSavePost)
router.delete('/delete-post/:urId/:postId', verifyUser, deletePost)

// Friends Post
router.get('/post', verifyUser, getHomePost)

// Friends
router.get('/friends-suggestions/:count', verifyUser, getFriendsSuggestions)
router.post('/follow', verifyUser, doFollow)
router.post('/unfollow',verifyUser,doUnfollow)
router.get('/:userName',verifyUser,getProfileInfo)

// Comment
router.post('/comment', verifyUser, doComment)
router.delete('/comment/:comId/:postId', verifyUser, removeComment)

module.exports = router;
const express = require('express');
const router = express.Router();
const upload = require('../config/multer')
const { checkSignUpData, sendOtp, verifyOtp, doSingUp, verifyUserNameOrEmail, setNewPassword,
    doSingIn, getUserData } = require('../controllers/auth-controller')
const { verifyUser } = require('../middlewares/verify-middleware')
const { doPost, getUserPost, likePost, savePost, removeSavePost, deletePost, getAllSavePost, getHomePost,
    doComment, removeComment } = require('../controllers/post-controller')
const { getFriendsSuggestions, doFollow, getProfileInfo, doUnfollow, getAllFollowing,
    getAllFollowers } = require('../controllers/friends-controller')
const { editProfile,getUsersOne } = require('../controllers/user-controller')
const {newConversation,getConversation} = require('../controllers/conversation-controller')
const {doMessage,getMessage} = require('../controllers/message-controller')



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
router.put('/like', verifyUser, likePost)
router.get('/user-post', verifyUser, getUserPost)
router.get('/save-post', verifyUser, getAllSavePost)
router.put('/save-post', verifyUser, savePost)
router.delete('/save-post/:urId/:postId', verifyUser, removeSavePost)
router.delete('/delete-post/:urId/:postId', verifyUser, deletePost)

// Friends Post
router.get('/post', verifyUser, getHomePost)

// Friends
router.get('/friends-suggestions/:count', verifyUser, getFriendsSuggestions)
router.post('/follow', verifyUser, doFollow)
router.post('/unfollow', verifyUser, doUnfollow)
router.get('/following', verifyUser, getAllFollowing)
router.get('/followers', verifyUser, getAllFollowers)
router.get('/:userName', verifyUser, getProfileInfo)

// Comment
router.post('/comment', verifyUser, doComment)
router.delete('/comment/:comId/:postId', verifyUser, removeComment)

// User
router.put('/edit-profile', verifyUser, upload.single('profile'), editProfile)
router.get('/users/:urId',verifyUser,getUsersOne)

// Conversation
router.post('/conversation',verifyUser,newConversation)
router.get('/conversation/:urId',verifyUser,getConversation)


// Message 
router.post('/message',verifyUser,doMessage)
router.get('/message/:conId',verifyUser,getMessage)



module.exports = router;
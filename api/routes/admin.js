const express = require('express');
const router = express.Router();
const {verifyAdmin } = require ('../middlewares/verify-middleware')
const { doAdminSignIn,checkAdminData } = require('../controllers/auth-controller')
const { getUserList,userBlockOrUnblock } = require('../controllers/user-controller')

// Sign In
router.post('/sign-in', doAdminSignIn)
router.get('/get-admin',verifyAdmin, checkAdminData);

// user List
router.get('/user-list',verifyAdmin,getUserList)
router.get('/user-block-or-unblock/:urId',verifyAdmin,userBlockOrUnblock)

module.exports = router;
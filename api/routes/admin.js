const express = require('express');
const router = express.Router();
const { doAdminSignIn,checkAdminData } = require('../controllers/auth-controller')

router.post('/sign-in', doAdminSignIn)
router.get('/get-admin',checkAdminData)

module.exports = router;
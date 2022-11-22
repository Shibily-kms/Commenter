const express = require('express');
const router = express.Router();
const { doAdminSignIn } = require('../controllers/auth-controller')

router.post('/sign-in', doAdminSignIn)

module.exports = router;
const UserModel = require('../models/user-model')
const otpHelper = require('../config/otp')
const bcrypt = require('bcrypt');


module.exports = {
    checkSignUpData: async (req, res, next) => {
        try {

            let body = req.body
            let email = await UserModel.findOne({ emailId: body.emailId })
            let userName = await UserModel.findOne({ userName: body.userName })

            if (email) {
                res.status(400).json({ success: false, message: 'Email Id already used' })
            } else if (userName) {
                res.status(400).json({ success: false, message: 'user name already used' })
            } else {
                res.status(201).json({ success: true, message: 'user data is OK' })
            }

        } catch (error) {
            throw error;
        }
    },

    sendOtp: async (req, res, next) => {
        try {
            let body = req.body
            otpHelper.dosms(body.number).then((response) => {
                if (response) {
                    res.status(201).json({ success: true, message: 'Otp Sended to this number' })
                }
            })

        } catch (error) {
            throw error;
        }
    },

    verifyOtp: (req, res, next) => {
        try {
            let body = req.body
            otpHelper.otpVerify(body.otp, body.mobile).then((response) => {
                if (response) {
                    res.status(201).json({ success: true, message: 'Virification Success' })
                } else {
                    res.status(400).json({ error: true, message: "Incurrect OTP" })
                }
            })
        } catch (error) {
            throw error;
        }
    },

    doSingUp: async (req, res, next) => {
        try {
            let body = req.body
            body.password = await bcrypt.hash(body.password, 10)
            UserModel.create(body).then((response) => {
                if (response) {
                    res.status(201).json({ success: true, message: 'user sign up success' })
                } else {
                    res.status(400).json({ success: false, message: 'User Sign up not completed , try now' })
                }
            })

        } catch (error) {
            throw error;
        }
    },

    // Forgot Password

    verifyUserNameOrEmail: async (req, res, next) => {
        try {
            let body = req.body
            await UserModel.findOne({ $or: [{ userName: body.name }, { emailId: body.name }] }).then((data) => {
                if (data) {
                    res.status(201).json({ success: true, message: 'User is Available', emailId: data.emailId, mobile: data.mobile })
                } else {
                    res.status(400).json({ error: true, message: 'Invalid user name or email Id' })
                }
            })

        } catch (error) {
            throw error;
        }
    },

    setNewPassword: async (req, res, next) => {
        try {
            let body = req.body
            body.password = await bcrypt.hash(body.password, 10)
            await UserModel.updateOne({ emailId: body.emailId }, {
                $set: {
                    password: body.password
                }
            }).then((result)=>{
                res.status(201).json({success:true,message : 'password updated'})
            })

        } catch (error) {
            throw error;
        }
    }
}
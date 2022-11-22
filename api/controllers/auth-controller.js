const UserModel = require('../models/user-model')
const otpHelper = require('../helpers/otp-helpers')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { customId } = require('../helpers/customId-helpers')

module.exports = {

    // User Auth Start
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
            body.urId = customId(6, 'UR')
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
            }).then((result) => {
                res.status(201).json({ success: true, message: 'password updated' })
            })

        } catch (error) {
            throw error;
        }
    },
    doSingIn: async (req, res) => {
        try {


            let body = req.body
            const maxAge = 60 * 60 * 24;

            let user = await UserModel.findOne({ $or: [{ userName: body.userName }, { emailId: body.userName }] })
            if (user) {

                let status = await bcrypt.compare(body.password, user.password);
                if (status) {
                    const token = jwt.sign({ userId: user.urId }, process.env.TOKEN_KEY, { expiresIn: maxAge })

                    res.cookie("commender", token, {
                        withCrdentials: true,
                        httpOnly: false,
                        maxAge: maxAge * 1000
                    })

                    res.status(201).json({
                        user: user, token,
                        success: true, message: 'Sing In Completed'
                    })
                } else {
                    res.status(400).json({ error: true, message: 'Incurrect Password' })
                }

            } else {
                res.status(400).json({ error: true, message: "Invalid User name Or Email Id" })
            }

        } catch (error) {
            throw error;
        }
    },

    // User Auth End


    // Admin Auth Start
    doAdminSignIn: (req, res, next) => {
        try {
            console.log(req.body,'her');
            const maxAge = 60 * 60 * 24;
            const { emailId, password } = req.body
            let adminData = {
                email: process.env.ADMIN_EMAIL,
                password: process.env.ADMIN_PASSWORD
            }
            console.log(emailId ,adminData.email,'data');
            if(emailId == adminData.email){
                if(password == adminData.password){
                    const token = jwt.sign({ email: adminData.email }, process.env.TOKEN_KEY, { expiresIn: maxAge })

                    res.cookie("commenderAdmin", token, {
                        withCrdentials: true,
                        httpOnly: false,
                        maxAge: maxAge * 1000
                    })
                    res.status(201).json({
                        status : true,
                        success : true,
                        admin : adminData.emailId,
                        message : 'Authentication Completed'
                    })
                }else{
                    res.status(400).json({
                        status : false,
                        error : true,
                        message : 'Incurrent Password'
                    })
                }
            }else{
                res.status(400).json({
                    status : false,
                    error : true,
                    message : 'Invalid Email Id'
                })
            }
        } catch (error) {
            throw error ;
        }
    }
    // Admin Auth End
}
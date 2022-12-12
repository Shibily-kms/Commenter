const UserModel = require('../models/user-model')
const { customId } = require('../helpers/customId-helpers')
const jwt = require('jsonwebtoken')
const VoiceResponse = require('twilio/lib/twiml/VoiceResponse')


// About User 
module.exports = {
    getUserList: async (req, res, next) => {
        try {
            const userList = await UserModel.find()

            userList.forEach(object => {
                delete object._doc['password'];
            });

            res.status(201).json({
                success: true, error: false,
                message: 'all user details',
                users: userList
            })
        } catch (error) {
            throw error;
        }
    },
    userBlockOrUnblock: async (req, res, next) => {
        let urId = req.params.urId
        try {
            await UserModel.findOne({ urId }).then((user) => {
                if (user.status === "Active") {
                    UserModel.updateOne({ urId }, {
                        $set: {
                            status: "Blocked"
                        }
                    }).then(() => {

                        res.status(201).json({ success: true, error: false, urId, message: 'User blocked' })
                    })
                } else {
                    UserModel.updateOne({ urId }, {
                        $set: {
                            status: "Active"
                        }
                    }).then(() => {
                        res.status(201).json({ success: true, error: false, urId, message: 'User Unblocked' })
                    })
                }
            }).catch((error) => {
                res.status(400).json({ success: false, error: true, urId, message: 'This user not valid' })
            })

        } catch (error) {
            throw error;
        }
    },
    // profile

    editProfile: async (req, res, next) => {
        try {
            let flag = false
            console.log(req.body, 'body');
            const body = req.body // {firstName, lastName, emailId,file, dob, location, website}
            const jwtToken = jwt.verify(req.cookies.commenter, process.env.TOKEN_KEY)
            const urId = jwtToken.userId
            console.log('hi');
            let user = await UserModel.findOne({ urId })
            console.log(user.emailId != body.emailId, 'status');
            if (user.emailId != body.emailId) {
                console.log('hiiiiiiiiiiiiiiii');
                await UserModel.findOne({ emailId: body.emailId }).then((response) => {
                    console.log(response, 'resposnessssssssss');
                    if (response) {
                        console.log('flag is true');
                        flag = true
                    }
                })
            }
            console.log(flag, 'flag');
            if (flag) {
                res.status(400).json({ status: false, message: 'this email Id existed' })
            } else {
                await UserModel.updateOne({ urId }, {
                    $set: {
                        firstName: body.firstName,
                        lastName: body.lastName,
                        emailId: body.emailId,
                        location: body?.location,
                        website: body?.website,
                        dob: body.dob,
                        profile: body?.file ? body.file : user?.profile
                    }
                }).then((result) => {
                    user.firstName = body.firstName
                    user.lastName = body.lastName
                    user.emailId = body.emailId
                    user.location = body?.location ? body.location : user?.location
                    user.website = body?.website ? body.website : user?.website
                    user.dob = body.dob
                    user.profile = body?.file ? body.file : user?.profile
                    delete user._doc.password

                    res.status(201).json({ status: true, user, message: 'user details updated' })
                }).catch((error) => {
                    res.status(400).json({ status: false, message: 'update faild' })
                })
            }


        } catch (error) {
            res.status(500).json({ status: false, message: 'update faild' })
        }
    }
}
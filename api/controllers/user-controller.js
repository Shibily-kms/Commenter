const UserModel = require('../models/user-model')
const { customId } = require('../helpers/customId-helpers')

// About User 
module.exports = {
    getUserList: async (req, res, next) => {
        console.log('here');
        try {
            let userList = await UserModel.find()

            userList.forEach(object => {
                delete object['password'];
                delete object['cover'];
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
    }
}
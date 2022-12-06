const UserModel = require('../models/user-model')
const PostModel = require('../models/post-model')
const jwt = require('jsonwebtoken')


module.exports = {
    getFriendsSuggestions: async (req, res, next) => {
        try {
            const { count } = req.params
            const jwtToken = jwt.verify(req.cookies.commenter, process.env.TOKEN_KEY)
            const urId = jwtToken.userId
            // await UserModel.findOne({ urId }).then((user) => {
            //     let following = user.following
            //     let followers = user.followers
            //     if (following != []) {
            //         // await UserModel.
            //     } else if (followers != [] || following == []) { 

            //     } else {
            //     }
            // })

            await UserModel.find().then((users) => {
                let list = users.filter((user) => {
                    return user.urId != urId
                })
                list = list.map((user) => {
                    return {
                        urId: user.urId,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        userName: user.userName,
                        profile: user?.profile
                    }
                })
                res.status(201).json({ success: true, users: list, message: 'user-list' })
            })
        } catch (error) {

        }
    },

    doFollow: async (req, res, next) => {
        try {

            const jwtToken = jwt.verify(req.cookies.commenter, process.env.TOKEN_KEY)
            const urId = jwtToken.userId
            let { followId } = req.body
            console.log(req.body, 'followId');
            await UserModel.updateOne({ urId }, {
                $push: {
                    following: followId
                }
            }).then((result) => {
                console.log(result, 'hiiii');
                UserModel.updateOne({ urId: followId }, {
                    $push: {
                        followers: urId
                    }
                }).then((response) => {
                    console.log(response, 'rsepnse');
                    res.status(201).json({ success: true, message: 'follwing success' })

                })
            })
        } catch (error) {

        }
    },
    doUnfollow: async (req, res, next) => {
        try {
            const jwtToken = jwt.verify(req.cookies.commenter, process.env.TOKEN_KEY)
            const urId = jwtToken.userId
            const { followId } = req.body
            console.log(req.body, 'followId');
            await UserModel.updateOne({ urId }, {
                $pull: {
                    following: followId
                }
            }).then((result) => {
                console.log(result, 'hiiii');
                UserModel.updateOne({ urId: followId }, {
                    $pull: {
                        followers: urId
                    }
                }).then((response) => {
                    console.log(response, 'rsepnse');
                    res.status(201).json({ success: true, message: 'unfollow success' })

                })
            })
        } catch (error) {

        }
    },
    getProfileInfo: async (req, res, next) => {
        try {
            const { userName } = req.params

            await UserModel.findOne({ userName }).then(async (profile) => {
                delete profile._doc.password
                await PostModel.aggregate([
                    {
                        $match: {
                            urId: profile.urId
                        }
                    },
                    {
                        $lookup: {
                            from: 'users',
                            localField: 'urId',
                            foreignField: 'urId',
                            as: 'author'
                        }
                    },
                    {
                        $addFields: {
                            firstName: { $first: '$author.firstName' },
                            lastName: { $first: '$author.lastName' },
                            userName: { $first: '$author.userName' },
                        }
                    },
                    {
                        $project: {
                            author: 0
                        }
                    },
                    {
                        $sort: {
                            createDate: -1
                        }
                    }
                ]).then((posts) => {
                    res.status(201).json({ success: true, profile, posts, message: 'get profile info' })
                })
            }).catch((error) => {
                // Invalid user Name
                res.status(400).json({ error: true, message: "Invalid User Name" })
            })

        } catch (error) {

        }
    },
    getAllFollowing: async (req, res, next) => {
        try {
            const jwtToken = jwt.verify(req.cookies.commenter, process.env.TOKEN_KEY)
            const urId = jwtToken.userId
            console.log('userssdf sdf sd');
            await UserModel.aggregate([
                {
                    $match: {
                        urId
                    }
                },
                {
                    $unwind: '$following'
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'following',
                        foreignField: 'urId',
                        as: 'data'
                    }
                },
                {
                    $project: {
                        firstName: { $first: '$data.firstName' },
                        lastName: { $first: '$data.lastName' },
                        userName: { $first: '$data.userName' },
                        urId: { $first: '$data.urId' },
                    }
                }
            ]).then((resposne) => {
                res.status(201).json({ success: true, following: resposne, message: 'get follwing users' })
            })
        } catch (error) {

        }
    },
    getAllFollowers: async (req, res, next) => {
        try {
            const jwtToken = jwt.verify(req.cookies.commenter, process.env.TOKEN_KEY)
            const urId = jwtToken.userId
            await UserModel.aggregate([
                {
                    $match: {
                        urId
                    }
                },
                {
                    $unwind: '$followers'
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'followers',
                        foreignField: 'urId',
                        as: 'data'
                    }
                },
                {
                    $project: {
                        firstName: { $first: '$data.firstName' },
                        lastName: { $first: '$data.lastName' },
                        userName: { $first: '$data.userName' },
                        urId: { $first: '$data.urId' },
                    }
                }
            ]).then((resposne) => {
                res.status(201).json({ success: true, followers: resposne, message: 'get followers users' })
            })
        } catch (error) {

        }
    },

}
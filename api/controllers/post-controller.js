const { customId } = require('../helpers/customId-helpers')
const PostModel = require('../models/post-model')
const jwt = require('jsonwebtoken')

module.exports = {
    doPost: async (req, res, next) => {
        try {
            let body = req.body     //text,image,video,urId

            body.postId = customId(10, 'PS')
            body.createDate = new Date();
            await PostModel.create(body).then((result) => {
                res.status(201).json({ success: true, error: false, post: body, message: 'new post Added' })
            }).catch((error) => {
                res.status(400).json({ success: false, error: true, message: 'posts validation failed' })
            })
        } catch (error) {
            res.status(400).json({ success: false, error: true, message: 'Type Something' })
        }
    },
    getUserPost: async (req, res, next) => {
        try {
            const jwtToken = jwt.verify(req.cookies.commenter, process.env.TOKEN_KEY)
            if (jwtToken) {
                const urId = jwtToken.userId
                await PostModel.find({ urId }).sort({ createDate: -1 }).then((posts) => {
                    res.status(201).json({ success: true, error: false, posts, message: 'user all posts' })
                }).catch((error) => {
                    res.status(400).json({ success: false, error: true, message: "Requseted data is Empty" })
                })
            }
        } catch (error) {
            throw error;
        }
    },
    likePost: async (req, res, next) => {
        try {
            const { urId, postId, like } = req.body
            if (like) {
                await PostModel.updateOne({ postId }, {
                    $push: {
                        reactions: urId
                    },
                    $inc: {
                        reactCount: 1
                    }
                }).then(() => {
                    res.status(201).json({ success: true, error: false, urId, postId, like: true, message: 'liked' })
                }).catch((error) => {
                    res.status(201).json({ success: true, error: false, message: "can't find the post" })
                })
            } else {
                await PostModel.updateOne({ postId }, {
                    $pull: {
                        reactions: urId
                    },
                    $inc: {
                        reactCount: -1
                    }
                }).then(() => {
                    res.status(201).json({ success: true, error: false, urId, postId, like: false, message: 'Unliked' })
                }).catch((error) => {
                    res.status(201).json({ success: true, error: false, message: "can't find the post" })
                })

            }
        } catch (error) {

        }
    }
}
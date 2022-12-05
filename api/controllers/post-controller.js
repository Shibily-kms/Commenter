const { customId } = require('../helpers/customId-helpers')
const PostModel = require('../models/post-model')
const UserModel = require('../models/user-model')
const jwt = require('jsonwebtoken')

module.exports = {
    // Post
    doPost: async (req, res, next) => {
        try {
            let body = req.body     //text,image,video,urId

            body.postId = customId(10, 'PS')
            body.createDate = new Date();
            await PostModel.create(body).then((result) => {
                UserModel.findOne({ urId: body.urId }).then((user) => {
                    console.log(user, 'dslfjsd');
                    result._doc.firstName = user.firstName
                    result._doc.lastName = user.lastName
                    result._doc.userName = user.userName
                    console.log(result, 'result');
                    res.status(201).json({ success: true, error: false, post: result, message: 'new post Added' })
                })
            }).catch((error) => {
                res.status(400).json({ success: false, error: true, message: 'posts validation failed' })
            })
        } catch (error) {
            res.status(400).json({ success: false, error: true, message: 'Type Something' })
        }
    },
    // Get Post
    getUserPost: async (req, res, next) => {
        try {
            console.log('here coming');
            const jwtToken = jwt.verify(req.cookies.commenter, process.env.TOKEN_KEY)
            const urId = jwtToken.userId
            await PostModel.aggregate([
                {
                    $match: {
                        urId
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

                res.status(201).json({ success: true, error: false, posts, message: 'user all posts' })
            }).catch((error) => {
                res.status(400).json({ success: false, error: true, message: "Requseted data is Empty" })
            })

        } catch (error) {
            throw error;
        }
    },
    // Like Post
    likePost: async (req, res, next) => {
        try {
            console.log(req.body,'bdoy');
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
            throw error;
        }
    },
    // Save Post

    savePost: async (req, res, next) => {
        try {
            console.log('hi here');
            const { urId, postId } = req.body
            console.log(req.body, 'body')
            await UserModel.updateOne({ urId }, {
                $push: {
                    savePost: postId
                }
            }).then(() => {
                res.status(201).json({ success: true, message: 'This post saved' })
            }).catch((error) => {
                res.status(400).json({ error: true, message: 'try now' })
            })
        } catch (error) {
            throw error;
        }

    },
    // Remove post from list
    removeSavePost: async (req, res, next) => {
        try {
            const { urId, postId } = req.params
            await UserModel.updateOne({ urId }, {
                $pull: {
                    savePost: postId
                }
            }).then(() => {
                res.status(201).json({ success: true, postId, message: 'Removed form savelist' })
            }).catch((error) => {
                res.status(400).json({ error: true, message: 'try now' })
            })
        } catch (error) {
            throw error;
        }

    },
    // Get All Post
    getAllSavePost: async (req, res, next) => {
        try {
            const jwtToken = jwt.verify(req.cookies.commenter, process.env.TOKEN_KEY)
            if (jwtToken) {
                const urId = jwtToken.userId
                await UserModel.aggregate([
                    {
                        $match: {
                            urId
                        }
                    },
                    {
                        $unwind: '$savePost'
                    },
                    {
                        $project: {
                            _id: 0, urId: 1, savePost: 1
                        }
                    },
                    {
                        $lookup: {
                            from: 'posts',
                            localField: 'savePost',
                            foreignField: 'postId',
                            as: 'posts'
                        }
                    },
                    {
                        $unwind: '$posts'
                    },
                    {
                        $lookup: {
                            from: 'users',
                            localField: 'posts.urId',
                            foreignField: 'urId',
                            as: 'how'
                        }
                    },
                    {
                        $project: {
                            post: '$posts',
                            firstName: { $first: '$how.firstName' },
                            lastName: { $first: '$how.lastName' },
                            userName: { $first: '$how.userName' },
                        }
                    }


                ]).then((posts) => {
                    posts = posts.map((item) => {
                        item.post.firstName = item.firstName
                        item.post.lastName = item.lastName
                        item.post.userName = item.userName
                        return item.post
                    }).reverse()
                    console.log(posts, 'XXXXXXXXsave posts');

                    // posts = posts.sort((a, b) => a - b)
                    res.status(201).json({ success: true, posts: posts, message: 'get all save posts' })
                })

            } else {
                res.status(400).json({ error: true, message: 'Token missed' })
            }
        } catch (error) {
            throw error;
        }
    },

    deletePost: async (req, res, next) => {
        try {
            console.log(req.params, 'body');
            const { urId, postId } = req.params
            await PostModel.deleteOne({ urId, postId }).then((result) => {
                res.status(201).json({ success: true, postId, message: 'Post removed' })
            }).catch((error) => {
                res.status(400).json({ error: true, message: "Can't delete post" })
            })
        } catch (error) {
            throw error;
        }
    },

    // Home Post
    getHomePost: async (req, res, next) => {
        try {
            const jwtToken = jwt.verify(req.cookies.commenter, process.env.TOKEN_KEY)
            const urId = jwtToken.userId

            let otherPost = await UserModel.aggregate([
                {
                    $match: {
                        urId
                    }
                },
                {
                    $unwind: '$following'
                },
                {
                    $project: {
                        _id: 0, urId: 1, following: 1
                    }
                },
                {
                    $lookup: {
                        from: 'posts',
                        localField: 'following',
                        foreignField: 'urId',
                        as: 'posts'
                    }
                },
                {
                    $unwind: '$posts'
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'following',
                        foreignField: 'urId',
                        as: 'how'
                    }
                },
                {
                    $project: {
                        post: '$posts',
                        uPost: 1,
                        firstName: { $first: '$how.firstName' },
                        lastName: { $first: '$how.lastName' },
                        userName: { $first: '$how.userName' },
                    }
                },
                {
                    $sort: {
                        'post.createDate': -1
                    }
                }

            ])
            otherPost = otherPost.map((item) => {
                item.post.firstName = item.firstName
                item.post.lastName = item.lastName
                item.post.userName = item.userName
                return item.post
            })

            let userPost = await PostModel.aggregate([
                {
                    $match: {
                        urId
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
            ])

            let merge = otherPost.concat(userPost)
            merge = merge.sort((a, b) => b.createDate - a.createDate)

            res.status(201).json({ success: true, posts: merge, message: 'get home post', })

        } catch (error) {
            throw error;
        }
    }


}
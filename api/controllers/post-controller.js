const { customId } = require('../helpers/customId-helpers')
const PostModel = require('../models/post-model')


module.exports = {
    doPost: async (req, res, next) => {
        try {
            let body = req.body     //text,image,video,urId
            console.log(body,'body');
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
    }
}
const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    urId: {
        type: String,
        required: [true, ""]
    },
    postId: String,
    text: String,
    file: [],
    comments: [],
    reactions: [],
    commentCount: {
        type: Number,
        default: 0
    },
    reactCount: {
        type: Number,
        default: 0,
    },

    createDate: Date


},
    {
        timestamps: true
    })

const UserModel = mongoose.model('posts', postSchema)
module.exports = UserModel
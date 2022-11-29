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
    createDate: Date


},
    {
        timestamps: true
    })

const UserModel = mongoose.model('posts', postSchema)
module.exports = UserModel
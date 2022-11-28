const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    urId: {
        type: String,
        required: [true, ""]
    },
    psId: String,
    text: String,
    image: [],
    video: [],
    comments: [],
    reactions: []


},
    {
        timestamps: true
    })

const UserModel = mongoose.model('posts', postSchema)
module.exports = UserModel
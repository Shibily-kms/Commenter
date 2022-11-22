const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Pleace provide a first name"]
    },
    lastName: {
        type: String,
        required: [true, "Enter last name"]
    },
    userName: {
        type: String,
        required: [true, "Enter user name"]
    },
    emailId: {
        type: String,
        required: [true, "Enter emailId"]
    },
    mobile: {
        type: String,
    },
    password: {
        type: String,
    },
    profile: {
        type: String
    },
    cover: {
        type: String
    },
    urId: {
        type: String,
        required: [true, ""]
    }
},
    {
        timestamps: true
    })

const UserModel = mongoose.model('user', userSchema)
module.exports = UserModel
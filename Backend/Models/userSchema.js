const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        minlength: 3,
        unique: true
    },
    fname: {
        type: String,
        required: true,
        minlength: 3
    },
    lname: {
        type: String,
        required: false,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
    }
})

const User = mongoose.model("USER", userSchema)
module.exports = User
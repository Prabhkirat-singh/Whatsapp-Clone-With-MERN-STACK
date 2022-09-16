const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

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
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ]
})

userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({_id: this._id}, process.env.JWTSECRETKEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (err){
        console.log(err);
    }
}

const User = mongoose.model("USER", userSchema)
module.exports = User
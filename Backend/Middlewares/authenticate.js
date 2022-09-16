const jwt = require('jsonwebtoken')
const User = require('../Models/userSchema')

const Authenticate = async (req, res, next) =>{
    try{
        const token = req.cookies.jwtToken
        const verifytoken = jwt.verify(token, process.env.JWTSECRETKEY);

        const rootUser = await User.findOne({ _id: verifytoken._id, 'tokens.token': token})

        if (!rootUser) {console.log('user not found')}

        req.token = token
        req.rootUser = rootUser;
        req.userID = rootUser._id

        next()
    } catch (err){
        res.status(401).send("Unauthorized: No taken provided")
    }
}

module.exports = Authenticate
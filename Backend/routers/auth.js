const express = require("express");
const router = express.Router();

require('../db/conn')
const User = require('../Models/userSchema')

const checkLogin = (req, res, next)=>{
    console.log("working")
    next()
}

router.get('/', (req, res)=>{
    res.send("Hello from router js")
})

router.post('/create-account', async (req, res)=>{
    const {userName, fname, lname, password} = req.body

    if(!userName || !fname || !lname || !password){
        return res.status(422).json({error: "Pls Filled The Fields"})
    }
    try {
        
        const UserExist = await User.findOne({ userName })

        if(UserExist){
            return res.status(422).json({error: "User Name Already Exist"})
        }
        
        const user = new User({userName, fname, lname, password});

        await user.save();

        res.status(201).json({message: "User Registered Successfuly"})   

    } catch (err) {
        console.log(err)
    }
})

router.post('/', async (req, res)=>{
    try {
        const {userName, password} = req.body
        const UserExist = await User.findOne({userName})
        const PasswordExist = await User.findOne({password})

    if(PasswordExist && UserExist){
        return res.status(200).json({message: "Loged In Successfully"})
    }
    else {return res.status(422).json({message : "Invailid User Name And Password"})}

    } catch (error) {
        console.log(error)
    }si
    
})

router.post('/chats', async (req, res)=>{
    try {
        const {userName} = req.body
        const UserExist = await User.findOne({userName})

    if(UserExist){
        return res.status(200).json({message: "User Found"})
    } else {return res.status(404).json({message: "User Not Found"})}
    
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;
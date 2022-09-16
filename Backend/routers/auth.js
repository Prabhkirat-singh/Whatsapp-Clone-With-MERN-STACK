const express = require("express");
const jwt = require('jsonwebtoken');
const Authenticate = require("../Middlewares/authenticate");
const router = express.Router();

require("../db/conn");
const User = require("../Models/userSchema");

router.post("/create-account", async (req, res) => {
  const { userName, fname, lname, password } = req.body;

  if (!userName || !fname || !lname || !password) {
    return res.status(422).json({ message: "Pls Filled The Fields" });
  }
  try {
    const UserExist = await User.findOne({ userName });

    if (UserExist) {
      return res.status(422).json({ message: "User Already Exist" });
    }

    const user = new User({ userName, fname, lname, password });

    await user.save();

    res.status(201).json({ message: "User Registered Successfuly" });
    token = await userName.generateAuthToken()
      res.cookie('jwtToken', token, {
        httpOnly: true
      })
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  try {
    let token;
    const { userName, password } = req.body;
    const UserExist = await User.findOne({ userName });
    
    if (!userName || !password) {
      return res.status(400).json({message: "Please Enter The Data"})
    }

    if (UserExist) {
      token = await UserExist.generateAuthToken()
      res.cookie('jwtToken', token, {
        httpOnly: true
      })

      const PasswordExist = UserExist.password;

      if (PasswordExist === password) {
        return res.status(200).json({ message: "Loged In Successfully" });
      }
      return res
        .status(422)
        .json({ message: "Invailid User Name And Password" });
    } else {
      return res
        .status(422)
        .json({ message: "Invailid User Name And Password" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/chats/find-user", async (req, res) => {
  try {
    const { userName } = req.body;
    const UserExist = await User.findOne({ userName });

    if (UserExist) {
      return res.status(200).json({ message: "User Found" });
    } else {
      return res.status(404).json({ message: "User Not Found" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get('/chats', Authenticate, (req, res) => {
  res.send(req.rootUser)
})

router.get('/chats-fetching-All-Users', (req, res)=>{
  User.find({}).then((users)=>{
    res.status(200).json({users})
  }).catch((err)=>{
    console.log(err)
  })
})

module.exports = router;

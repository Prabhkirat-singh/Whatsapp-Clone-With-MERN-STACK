const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const app = express()

app.use(express.json())
app.use(cookieParser())

dotenv.config({path: './config.env'});
require('./db/conn')
// const User = require('./Models/userSchema')

app.use(require('./routers/auth'))

const port = process.env.PORT

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
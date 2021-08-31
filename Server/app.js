

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const Port = 5000

//Import Database File
require('./db/conn')

//Import Model
require('./Model/userSchema')


app.use(cookieParser());

app.use(bodyParser.json())

app.use(express.json())

//Import Routes
app.use(require('./router/routes'))


app.listen(Port,()=>{
    console.log(`Server is running on port ${Port}`)
})




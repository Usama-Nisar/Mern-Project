const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const User = mongoose.model('User')
const Bcrypt = require('bcrypt')
const  {compare}  = require('bcrypt')
const jwt = require('jsonwebtoken')
const authentication = require('../Middleware/authentication')


// Get Route
router.get('/',async (req,res) => {
    try{

        const data = await User.find()
        res.send(data)

    }catch(err){
         res.send(err)
    }
})


//Post Route
router.post('/register', async (req,res) => {

    try{

        const {name, email, phone, work, password, cpassword} = req.body

        if(!name || !email || !phone || !work || !password || !cpassword){
            return res.status(422).send({error:"fill the fields properly"})
        }
    
        const userExist = await User.findOne({email: email})
        
        if(userExist){
            return res.status(422).send({error:"Email is alreday exists"})
        }else if(password != cpassword){
            return res.status(422).send({error:"password is not matched"})   
        }

        const registeredData = new User({name, email, phone, work, password, cpassword})
        
        await registeredData.save() 
       
        res.status(201).send({message:"User Registered Successfully"})

    }catch(err){
        res.status(400).send(err)
    }
    
})

router.post('/signin', async (req,res) => {
   
    try{
        let jwttoken;
        const {email,password} = req.body
        if(!email || !password){
            return  res.status(400).send({error:'Fill the field properly'})
        }
        const userExits = await User.findOne({email:email})

        if(userExits){
            const isMatch = await Bcrypt.compare(password,userExits.password)

        if(!isMatch){
             return res.status(400).send({error:'Invalid Credientials'})
        }
        else{

            jwttoken = await userExits.generateAuthToken()
            console.log(jwttoken)
            res.cookie('jwt',jwttoken,{
                expires: new Date(Date.now() + 25892000000),
                httpOnly:true
            })
            return res.status(200).send({message:'User Login Successfully'})
        }    
        }else{
            return res.status(400).send({error:'Invalid Credientials email'})
        }

    }catch(err){
        return res.status(400).send({error:'Invalid Credientials email'})
    }
});


// GET PRIVATE ROUTE FOR ABOUT US PAGE
router.get('/about', authentication ,(req,res) => {
    res.send(req.rootUser)    
})

//get data for contact us and home page

router.get('/getdata', authentication, (req,res) => {
    res.send(req.rootUser) 
})

//post data of contact us page
router.post('/contact', authentication, async (req,res) => {
    
    try{

        const {name, email, phone, message} = req.body;

        if(!name || !email || !phone || !message){
           return res.status(400).send({error: 'User send Error'})
        }
   
        const userExit = await User.findOne({_id :  req.userId})
        if(userExit){
         userExit.addMessage(name, email, phone, message)
           res.status(201).send({message:"Message Send Successfully"})
        }
        

    }catch(err){
        console.log(err)
    }
   
})

router.get('/logout', (req,res) => {
    res.clearCookie('jwt', {path :'/'})
    res.status(200).send({message:'User Logout'})
})

module.exports = router
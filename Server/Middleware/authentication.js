const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {tokenKey} = require('../db/conn')
const User = mongoose.model("User")


const authentication = async (req,res,next) => {
     try{
        const token = req.cookies.jwt;
        const verifyToken = jwt.verify(token, tokenKey )
        const rootUser = await User.findOne({_id: verifyToken._id,'tokens.token': token});
        if(!rootUser){ throw new Error('User not found') }
        req.token = token
        req.rootUser = rootUser
        req.userId = rootUser._id
        next();

     }catch(err){
         res.status(401).send('Unauthorized: No token provided')
         console.log(err)
        }
    
}

module.exports = authentication
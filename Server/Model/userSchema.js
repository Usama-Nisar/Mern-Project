
const mongoose = require('mongoose')
const Bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {tokenKey} = require('../db/conn')    


const userSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true,
        unique: true
    },

    phone:{
        type: Number,
        required: true
    },

    work:{
        type: String,
        required: true
    },

    password:{
        type: String,
        required: true
    },

    cpassword:{
        type: String,
        required: true
    },

    Date:{
        type: Date,
        default: Date.now
    },

    messages:[
        
        {
            name:{
                type: String,
                required: true
            },
        
            email:{
                type: String,
                required: true,
                unique: true
            },
        
            phone:{
                type: Number,
                required: true
            },

            message:{
                type: String,
                required: true
            }
        }
    ],

    tokens:[
        {
            token:{
                type: String,
                required: true
            }
        }
    ]
})

userSchema.pre('save', function(next){
    console.log('working')
     const user = this
     if(!user.isModified('password')){
         return next()
     }
     Bcrypt.genSalt(12,(err,salt) => {
         if(err){
             return next(err)
         } 
    Bcrypt.hash(user.password,salt, (err,hash)=>{
         if(err){
             return next(err)
         }
         user.password = hash 
       next()
    })   
 })

})

userSchema.methods.generateAuthToken = async function () {
    try{
        let jwttoken = jwt.sign({_id:this._id},tokenKey)
        this.tokens = this.tokens.concat({token: jwttoken});
        await this.save()
        return jwttoken;

    }catch(err){
        console.log(err)
    }
}

userSchema.methods.addMessage = async function(name, email, phone, message){

    try{

         this.messages = this.messages.concat({name, email, phone, message})
         await this.save();
         return this.messages;

    }
    catch(err){
        console.log(err)
    }
}

mongoose.model('User',userSchema)
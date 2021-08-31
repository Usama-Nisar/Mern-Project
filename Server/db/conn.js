
const mongoose = require('mongoose')


const key = 'mongodb+srv://username:password@cluster0.rybsr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
module.exports = {
    tokenKey:'MyNameIsUsamaNisaeAndIAmWebDeveloperAndFullStackWebDeveloper'
}

mongoose.connect(key,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on('connected',() =>{
    console.log('Database  connected successfully')
})

mongoose.connection.on('error',() =>{
    console.log('Database connected failed')
})

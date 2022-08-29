const mongoose = require('mongoose')

const TechSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    }
})

const Tech = mongoose.model('tech',TechSchema)

module.exports = Tech 

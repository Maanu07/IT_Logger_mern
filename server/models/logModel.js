const mongoose = require('mongoose')

const LogSchema = new mongoose.Schema({
    message:{
        type:String,
        required:true
    },
    attention:{
        type:Boolean,
        default:false
    },
    tech:{
        type:String,
        // required:true
    },
    date: {
        type:Date,
        default:Date.now
    },
    id:{
        type:Number,
        default:1
    }

})

const Log = mongoose.model('log',LogSchema)

module.exports = Log
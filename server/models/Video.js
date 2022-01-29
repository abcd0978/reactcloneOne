const mongoose = require('mongoose');
const Schema = mongoose.Schema

const VideoSchema = mongoose.Schema({
    writer:{
        type:Schema.Types.ObjectId,//유저 모델의 스키마 아이디 조인같은 역할을함 
        ref:"User"
    },
    title:{
        type:String,
        maxlength:50
    },
    description:{
        type:String
    },
    privacy:{
        type:Number
    },
    filePath:{
        type:String
    },
    category:{
        type:String
    },
    views:{
        type:Number,
        default:0
    },
    thumbnail:{
        type:String
    },
    
},
{timestamps:true})


const Video = mongoose.model('Video',VideoSchema)
module.exports = {Video}
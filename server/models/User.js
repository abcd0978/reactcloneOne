const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');


const UserSchema = mongoose.Schema({
    name:{
        type:String,
        maxlength:50
    },
    email:{
        type:String,
        trim:true,
        unique: 1
    },
    password:{
        type: String,
        minlength: 5
    },
    lastname:{
        type: String,
        maxlength: 50
    },
    role:{
        type:Number,
        default:0
    },
    image:String,
    token:{
        type:String
    },
})

UserSchema.pre('save',function(next){//save함수 하기전에하는 함수
    let user = this;//삽입하려고 하는 유저의 password

    if(user.isModified('password'))
    {
        bcrypt.genSalt(saltRounds,function(err,salt){
            if(err)
                return next(err)
    
            bcrypt.hash(user.password,salt,function(err,hash){
                if(err)
                    return next(err)
                user.password = hash;
                next()
            })
    
        })
    }else{
        next();
    }

})
UserSchema.methods.comparePassword = function(plainPassword,cb){
    bcrypt.compare(plainPassword, this.password, function(err,isMatch){
        if(err)
            return cb(err)
        cb(null,isMatch)
    })
}
UserSchema.methods.generateToken = function(cb){
    //jwt를 이용해서 토큰 생성
    let user = this;
    let token = jwt.sign(user._id.toString(),'secretToken')
    
    user.token = token;
    
    user.save((err,user)=>{
        if(err)
        {
            console.log('세이브에러')
            return cb(err)
        }
        cb(null,user)
    })
}

UserSchema.statics.findByToken = function(token,cb){
    let user = this;
    jwt.verify(token,'secretToken',(err,decoded)=>{
        user.findOne({"_id":decoded, "token":token},(err,user)=>{
            if(err)
                return cb(err);
            cb(null,user);
        })
    })
}
const User = mongoose.model('User',UserSchema)
module.exports = {User}
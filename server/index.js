const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const {User} = require('./models/User');
const {auth} = require('./middlewares/auth')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
dotenv.config();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use(cookieParser())

const port = process.env.PORT
mongoose.connect(process.env.MONGO_URL)
.then((db)=>{
    console.log(db)
    console.log('db connected.')
}).catch((err)=>{
    console.log(err)
})


app.get('/api/hello',(req,res)=>{
    res.send('hello')
})


app.post("/api/users/register",(req,res)=>{
    const user = new User(req.body)
    
    user.save((err,userInfo)=>{
        if(err){
            return res.json({success: false , err})
        }
        return res.status(200).json({success:true})
    })
})

app.post("/api/users/login",(req,res)=>{
    User.findOne({email:req.body.email},(err,userInfo)=>{

        //이메일을 못찾았다면
        if(!userInfo){
            return res.json({
                loginSuccess:false,
                message:"로그인에 실패했습니다."
            })
        }
        console.log('이메일 성공')
        //이메일을 찾았다면
        userInfo.comparePassword(req.body.password,(err,isMathch)=>{
            //비밀번호가 틀렸다면
            if(!isMathch)
                return res.json({
                    loginSuccess:false, 
                    message: "로그인에 실패했습니다."
                })
            console.log('비번성공')
            //이메일이 맞고 비밀번호까지 맞았다면. 토큰 생성

            userInfo.generateToken((err,user)=>{
                if(err)
                {
                    return res.status(400).send(err)
                }
                console.log(`토큰 ${user.token}`)
                res.cookie('x_auth',user.token).status(200).json({loginSuccess:true, userId:user._id})
            })
        })
    })
})

app.get('/api/users/auth',auth,(req,res)=>{
    res.status(200).json({
        _id:req.user._id,
        ifAdmin:req.user.role === 0 ? false : true,
        isAuth:true,
        email:req.user.email,
        name:req.user.name,
        lastname:req.user.lastname,
        role:req.user.role,
        image:req.user.image
    })
})

app.get('/api/users/logout',auth,(req,res)=>{
    console.log(req.user)
    User.findOneAndUpdate({_id:req.user._id},
        {token:""},(err,user)=>{
            if(err)
                return res.json({success:false ,err});
            return res.status(200).send({success:true})
        })
})
app.listen(port,()=>console.log(`Example app listening on port ${port}`));
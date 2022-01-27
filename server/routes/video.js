const express = require('express');
const router = express.Router();
const {User} = require('../models/User');
const {auth} = require('../middlewares/auth');
const multer = require('multer');
const path = require('path');
const { send } = require('process');
//multer 설정

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        //루트 디렉토리의 uploads폴더안에 저장
        cb(null,'uploads/');
    },
    filename:(req,file,cb)=>{
        //현재시각과 파일이름을 합한형태로 저장
        cb(null,`${Date.now()}_${file.originalname}`);
    },
    //mp4파일만 올릴수 있음
    fileFilter:(req,file,cb)=>{
        const ext = path.extname(file.originalname);
        if(ext !== '.mp4')
        {
            return cb(res.state(400).end('only mp4 files can be uploaded'));
        }
        cb(null,true)
    }
})

//한번의 하나의 파일만 올릴수 있음
const upload = multer({storage:storage}).single("file");

router.post("/uploadfiles",(req,res)=>{
    

    upload(req,res,(err) =>{
        if(err){
            return res.json({success:false, err});
        }else{
            return res.json({success:true, url: res.req.file.path, fileName: res.req.file.filename});
        }
    } )
})

module.exports = router;
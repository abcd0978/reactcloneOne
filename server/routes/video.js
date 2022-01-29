const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const {Video} = require('../models/Video');

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
    //비디오 파일 저장
    upload(req,res,(err) =>{
        if(err){
            return res.json({success:false, err});
        }else{
            return res.json({from:'multer',success:true, url: res.req.file.path, fileName: res.req.file.filename});
        }
    } )
})

router.post("/uploadVideo",(req,res)=>{
    //비디오 정보 저장
    const video = new Video(req.body)
    video.save( (err,doc) =>{
        if(err)
            return res.json({success:false,err});
        else
            return res.json({success:true});
    })
})

router.post("/thumbnail",(req,res)=>{
    

    //클라이언트에서 올정보:
    /*
    {
        url:"파일저장경로"
        fileName:"파일 이름" 
    }
    */
    let fileDuration="";
    let filePath;

    ffmpeg.ffprobe(req.body.url, function(err,metadata){
        fileDuration = metadata.format.duration;
    });//파일의 재생시간을 얻어온다.

    console.log("만드는중")
    ffmpeg(req.body.url)
    .on('filenames',function(filenames){
        filePath = "uploads/thumbnails/"+filenames[0];
    })//저장할 파일이름들
    .on('end',()=>{
        return res.json({from:'ffmpeg',success:true, url: filePath, fileDuration:fileDuration});
    })//끝났으면 json을 보낸다. (성공여부, 파일 경로, 파일이름, 파일 재생시간)
    .on('error',(err)=>{
        return res.json({success:false,err});
    })
    .screenshots({//스크린샷 설정
        count:3,
        folder:'uploads/thumbnails/',
        size:'320x240',
        filename:'thumbnail-%b.png'
    })

})
module.exports = router;
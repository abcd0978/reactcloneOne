const express = require('express');
const router = express.Router();
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');
const {Video} = require('../models/Video');
const { Subscriber } = require('../models/Subscriber');

//multer 설정

const storagefunc = multer.diskStorage({
    destination: (req, file, cb) => {
        //루트 디렉토리의 uploads폴더안에 저장
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        //현재시각과 파일이름을 합한형태로 저장
        cb(null, `${Date.now()}_${file.originalname}`);
    }
})
const fileFilter = (req, file, cb) => {

    // mime type 체크하여 원하는 타입만 필터링

    if (file.mimetype == 'video/mp4') {

        cb(null, true);

    } else {

        cb({
            msg: 'mp4 파일만 업로드 가능합니다.'
        }, false);

    }
}
//한번의 하나의 파일만 올릴수 있음
const upload = multer({storage: storagefunc, fileFilter: fileFilter}).single(
    "file"
)

//================================= Video =================================

router.post("/uploadfiles", (req, res) => {

    upload(req, res, err => {

        if (err) {

            return res.json({success: false, err})

        } else {

            return res.json(
                {success: true, url: res.req.file.path, filePath: res.req.file.path, fileName: res.req.file.filename}
            )

        }

    })

});

router.get("/getVideos", (req, res) => {
    //랜딩페이지에서 보여질 비디오정보들 가져오기
    Video
        .find()
        .populate('writer')
        .exec((err, videos) => { //videos:쿼리로 찾은 결과json,
            if (err) 
                return res
                    .status(400)
                    .send(err);
            else 
                return res
                    .status(200)
                    .json({success: true, videos});
                //성공시 결과물을 보낸다.
            }
        )
})

router.post("/getSubscriptionVideos", (req, res) => {

    //자신의 id를 가지고 구독하는 사람들을 찾는다.

    Subscriber
        .find({userFrom: req.body.userFrom})
        .exec((err, subscriberInfo) => {
            if (err) {
                return res.status(400).send(err);
            } else {

                let subscribedUsers = []
                subscriberInfo.map((subscriber, index) => {
                    subscribedUsers.push(subscriber.userTo);
                })

                //배열안에 있는 모든 writer를 find한다.
                Video.find({writer:{$in:subscribedUsers}})
                .populate('writer')
                .exec((err,videos)=>{
                    if(err){
                        return res.status(400).send(err)
                    }else{
                        return res.status(200).json({success:true,videos})
                    }
                })
            }
        })
})

router.post("/getVideoDetail", (req, res) => {
    //하나의 비디오의 디테일을 전송한다.

    const videoId = req.body.videoId;

    Video.findOne({"_id": req.body.videoId})
    .populate("writer")
    .exec((err, videoDetail) => {
        if (err) {
            return res
                .status(400)
                .json({success: false, err})
        } else {
            return res
                .status(200)
                .json({success: true, videoDetail});
        }
    })

})

router.post("/uploadVideo", (req, res) => {
    //비디오 정보 저장
    const video = new Video(req.body)
    video.save((err, doc) => {
        if (err) 
            return res.json({success: false, err});
        else 
            return res.json({success: true});
        }
    )
})

router.post("/thumbnail", (req, res) => {

    //클라이언트에서 올정보:
    /*
    {
        url:"파일저장경로"
        fileName:"파일 이름"
    }
    */
    let fileDuration = "";
    let filePath;

    ffmpeg.ffprobe(req.body.url, function (err, metadata) {
        fileDuration = metadata.format.duration;
    }); //파일의 재생시간을 얻어온다.

    console.log("만드는중")
    ffmpeg(req.body.url)
        .on('filenames', function (filenames) {
            filePath = "uploads/thumbnails/" + filenames[0];
        }) //저장할 파일이름들
        .on('end', () => {
            return res.json(
                {from: 'ffmpeg', success: true, url: filePath, fileDuration: fileDuration}
            );
        }) //끝났으면 json을 보낸다. (성공여부, 파일 경로, 파일이름, 파일 재생시간)
        .on('error', (err) => {
            return res.json({success: false, err});
        })
        .screenshots({ //스크린샷 설정
            count: 3,
            folder: 'uploads/thumbnails/',
            size: '320x240',
            filename: 'thumbnail-%b.png'
        })

})
module.exports = router;
const express = require('express');
const router = express.Router();
const {Like} = require('../models/Like');
const {DisLike} = require('../models/Dislike');


router.post("/getlike", (req, res) => {

    let data={}

    if(req.body.videoId)
        data = {videoId:req.body.videoId}
    else
        data = {commentId:req.body.commentId}
    
    Like.find(data)
    .exec((err,likes)=>{
        if(err)
            return res.status(400).json({success:false,err})
        return res.status(200).json({success:true,likes})
    })

});
router.post("/getdislike", (req, res) => {

    let data={}

    if(req.body.videoId)
        data = {videoId:req.body.videoId}
    else
        data = {commentId:req.body.commentId}
    
    DisLike.find(data)
    .exec((err,dislikes)=>{
        if(err)
            return res.status(400).json({success:false,err})
        return res.status(200).json({success:true,dislikes})
    })

});

router.post("/uplike", (req, res) => {

    let data={}

    if(req.body.videoId)
        data = {videoId:req.body.videoId, userId:req.body.userId}
    else
        data = {commentId:req.body.commentId, userId:req.body.userId}
    
    //like넣어주기.
    const like = new Like(data)

    like.save((err,result)=>{
        if(err)
            return res.status(400).json({success:false,err})
        
         //dislike이 이미클릭되어있다면, dislike1줄이기
        DisLike.findOneAndDelete(data)
        .exec((err,result)=>{
            if(err)
                return res.status(400).json({success:false,err})
            
            return res.status(200).json({success:true});
        })
    })
});

router.post("/unlike", (req, res) => {

    let data={}

    if(req.body.videoId)
        data = {videoId:req.body.videoId, userId:req.body.userId}
    else
        data = {commentId:req.body.commentId, userId:req.body.userId}
    
    Like.findOneAndDelete(data)
    .exec((err,result)=>{
        if(err)
            return res.status(400).json({success:false,err});
        return res.status(200).json({success:true})
    })

});

router.post("/updislike", (req, res) => {

    let data={}

    if(req.body.videoId)
        data = {videoId:req.body.videoId, userId:req.body.userId}
    else
        data = {commentId:req.body.commentId, userId:req.body.userId}
    
    //like넣어주기.
    const dislike = new DisLike(data)

    dislike.save((err,result)=>{
        if(err)
            return res.status(400).json({success:false,err})
        
         //like가 이미클릭되어있다면, like를 1줄이기
        Like.findOneAndDelete(data)
        .exec((err,result)=>{
            if(err)
                return res.status(400).json({success:false,err})
            
            return res.status(200).json({success:true});
        })
    })
});

router.post("/undislike", (req, res) => {

    let data={}

    if(req.body.videoId)
        data = {videoId:req.body.videoId, userId:req.body.userId}
    else
        data = {commentId:req.body.commentId, userId:req.body.userId}
    
    DisLike.findOneAndDelete(data)
    .exec((err,result)=>{
        if(err)
            return res.status(400).json({success:false,err});
        return res.status(200).json({success:true})
    })

});

module.exports = router;
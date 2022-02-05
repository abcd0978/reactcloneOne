const express = require('express');
const router = express.Router();
const {Comment} = require('../models/Comment');

router.post("/saveComment", (req, res) => {

    const comment  = new Comment(req.body);
    
    comment.save((err,comment)=>{
        if(err){
            return res.json({success:false,err})
        }else{
            Comment.find({'_id':comment._id})
            .populate('writer')
            .exec((err,result)=>{
                if(err){
                    return res.json({success:false,err})
                }else{
                    return res.status(200).json({success:true,result})
                }
            })
        }
    })
    
});

router.post("/getComments", (req, res) => {

    const videoId = req.body.videoId

    Comment.find({postId:videoId})
    .populate('writer')
    .exec((err,comments)=>{
        if(err){
            return res.status(400).json({success:false,err})
        }else{
            res.status(200).json({success:true,comments})
        }
    })

});





module.exports = router;
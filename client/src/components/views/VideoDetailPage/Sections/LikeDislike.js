import React,{useEffect,useState} from 'react';
import {Tooltip} from 'antd'
import { LikeOutlined, DislikeOutlined, LikeFilled, DislikeFilled} from '@ant-design/icons'
import axios from 'axios'


function LikeDislike(props) {

    const [Likes, setLikes] = useState(0);
    const [DisLikes, setDisLikes] = useState(0);
    const [LikeAction, setLikeAction] = useState(false);
    const [DisLikeAction, setDisLikeAction] = useState(false);

    let data={};

    if(props.videoId){
        data = {videoId : props.videoId, userId:props.userId}
    }else{
        data = {userId: props.userId, commentId: props.commentId}
    }

    useEffect(() => {
        axios.post("/api/like/getLike",data)
        .then(res=>{
            if(res.data.success){
                setLikes(res.data.likes.length)
    
                res.data.likes.map(like => {
                    //내가 like버튼을 눌렀는지?
                    if(like.userId===props.userId){
                        setLikeAction(!LikeAction)
                    }
                })

            }
            else{
                alert('error while getting likes')
            }
        })

        axios.post("/api/like/getdisLike",data)
        .then(res=>{
            if(res.data.success){
                setDisLikes(res.data.dislikes.length)

                res.data.dislikes.map(dislike => {
                    //내가 dislike버튼을 눌렀는지?
                    if(dislike.userId===props.userId){
                        setDisLikeAction(!DisLikeAction)
                    }
                })

            }
            else{
                alert('error while getting dislikes')
            }
        })
    }, []);
    
    const onLike=()=>{
        if(data.userId===undefined || data.userId===""){
            return alert('로그인이 필요한 서비스 입니다.')
        }
        //like버튼이 안눌려있었다면.
        if(!LikeAction){
            axios.post('/api/like/uplike',data)
            .then(res=>{
              if(res.data.success){
                setLikes(Likes+1)
                setLikeAction(!LikeAction)
                //dislike가 눌려있었다면
                if(DisLikeAction){
                    setDisLikes(DisLikes-1)
                    setDisLikeAction(!DisLikeAction)
                }
                    
              }else{
                  alert('error while like')
              }
            })
        }
        //like버튼이 눌려있었다면
        else{
            axios.post('/api/like/unlike',data)
            .then(res=>{
              if(res.data.success){
                  setLikes(Likes-1);
                  setLikeAction(!LikeAction);
              }else{
                  alert('error while unlike')
              }
            })
        }
    }

    const onDisLike=()=>{
        if(data.userId===undefined || data.userId===""){
            return alert('로그인이 필요한 서비스 입니다.')
        }
        //dislike버튼이 안눌려있었다면.
        if(!DisLikeAction){
            axios.post('/api/like/updislike',data)
            .then(res=>{
              if(res.data.success){
                setDisLikes(DisLikes+1)
                setDisLikeAction(!DisLikeAction)
                //like가 눌려있었다면
                if(LikeAction){
                    setDisLikes(Likes-1)
                    setDisLikeAction(!LikeAction)
                }
              }else{
                  alert('error while like')
              }
            })
        }
        //dislike버튼이 눌려있었다면
        else{
            axios.post('/api/like/undislike',data)
            .then(res=>{
              if(res.data.success){
                  setDisLikes(DisLikes-1);
                  setDisLikeAction(!DisLikeAction);
              }else{
                  alert('error while undislike')
              }
            })
        }
    }



    return (
    <div style={{marginRight:"4px"}}>
        <span style={{marginRight:'2px'}} key="comment-basic-like">
            <Tooltip title="Like">
                {!LikeAction ?
                <LikeOutlined
                    style={{cursor:'pointer'}}
                    onClick={onLike}
                    theme="filled"/> :
                <LikeFilled
                style={{cursor:'pointer'}}
                onClick={onLike}
                theme="filled"/>
                }
            </Tooltip>
            <span style={{paddingLeft:'4px'}}>{Likes}</span>
        </span>

        <span key="comment-basic-dislike">
            <Tooltip title="DisLike">
                {!DisLikeAction ? 
                <DislikeOutlined
                    style={{cursor:'pointer'}}
                    onClick={onDisLike}/> :
                <DislikeFilled
                style={{cursor:'pointer'}}
                onClick={onDisLike}/>
                }
            </Tooltip>
            <span style={{paddingLeft:'4px'}}>{DisLikes}</span>
        </span>
    </div>
    );
}

export default LikeDislike;

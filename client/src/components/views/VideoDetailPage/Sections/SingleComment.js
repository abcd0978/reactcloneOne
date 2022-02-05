import React,{useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import {Comment, Avatar, Button, Input} from 'antd'
import axios from 'axios';

function SingleComment(props) {

  const user = useSelector(state=>state.user);
  const videoId = props.videoId;
  const [OpenReply, setOpenReply] = useState(false); 
  const [Commentvalue, setCommentvalue] = useState("");
  
  const HandleClick = (event) =>{
    setCommentvalue(event.currentTarget.value)
  }

  const onClickReplyAction=()=>{
    setOpenReply(!OpenReply);
  }

  const commentAction=[
    <span onClick={onClickReplyAction} key="comment-basic-reply-to">Reply to</span>
  ]

  const onSubmit=(event)=>{
    event.preventDefault();

    const data = {
      content: Commentvalue, //쓴 댓글
      writer: user.userData._id, //유저 데이터
      postId: videoId,
      responseTo: props.comment._id
    }
    console.log(data);
    axios.post('/api/comment/saveComment', data)
    .then(res => {
        if (res.data.success) {
            console.log(res.data);
            setCommentvalue("")
            props.MyRefresh(res.data.result);
        } else {
            alert('error ocured while saving comment')
        }
    })
  }

  return (
      <div>
          <Comment
          actions={commentAction}
          author={props.comment.writer.name}
          avatar={<Avatar src={props.comment.writer.image} alt="profile"/>}
          content={<p>{props.comment.content}</p>}
          >
          </Comment>

        {OpenReply &&
          <form style={{display:'flex'}} onSubmit={onSubmit} >

            <textarea style={{width:'100%', borderRadius:'5px'}}
                onChange={HandleClick}
                value={Commentvalue}
                placeholder="코멘트 작성해주세요"
            />
            <br/>
            <Button style={{width:'20%',height:'52px'}} onClick={onSubmit} >Submit</Button>
          </form>
        }

      </div>
  );
}

export default SingleComment;

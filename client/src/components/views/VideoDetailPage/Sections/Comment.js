import React,{useState} from 'react';
import {useSelector} from 'react-redux'
import axios from 'axios';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';
import {Button, Input} from 'antd'

function Comment(props) {

    const user = useSelector(state=>state.user);
    const [Commentvalue, setCommentvalue] = useState("");
    const videoId = props.videoId;


    const handleClick=(event)=>{
        setCommentvalue(event.currentTarget.value)
    }

    const onSubmit=(event)=>{
        event.preventDefault();

        const data = {
            content:Commentvalue,//쓴 댓글
            writer:user.userData._id,//유저 데이터
            postId:videoId
        }
        axios.post('/api/comment/saveComment',data)
        .then(res=>{
            if(res.data.success){
                setCommentvalue("")
                props.MyRefresh(res.data.result);
            }else{
                alert('error ocured while saving comment')
            }
        })
    }

    return (
    <div>
        <br/>
        <p>Replies</p>
        <hr/>

        {/*comment lists */}

        {props.commentList && props.commentList.map((comment,index)=>(
            (!comment.responseTo &&//depth가 1인 comment만 출력됨
            <>
                <SingleComment MyRefresh={props.MyRefresh} comment={comment} videoId={videoId}/>
                <ReplyComment MyRefresh={props.MyRefresh} parentCommentId={comment._id} videoId={videoId} commentList={props.commentList}/>
            </>
            )
        ))}

        {/*Root comment form */}

        <form style={{display:'flex'}} onSubmit={onSubmit}>
            <textarea style={{width:'100%', borderRadius:'5px'}}
                onChange={handleClick}
                value={Commentvalue}
                placeholder="코멘트 작성해주세요"
            />
            <br/>
            <Button style={{width:'20%',height:'52px'}} onClick={onSubmit}>Submit</Button>
        </form>
    </div>
    );
}

export default Comment;
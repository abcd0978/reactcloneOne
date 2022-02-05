import React,{useEffect,useState} from 'react';
import SingleComment from './SingleComment';

function ReplyComment(props) {

    const videoId = props.videoId
    const [ChildCommentNum, setChildCommentNum] = useState(0);
    const [OpenReply, setOpenReply] = useState(false);
    
    useEffect(() => {
        let commentNum = 0;
        //commentList는 모든 comment의 배열 
        const commentList = props.commentList;
        commentList.map((comment)=>{
            //자신이 가지고있는 부모의 id와 commentList에있는 responseTo가 일치한다면
            //자신또는 자신과 같은 depth에 있는 댓글이다.
            if(props.parentCommentId === comment.responseTo){
                commentNum++
            }
        })
        setChildCommentNum(commentNum);
    }, [props.commentList]);

    const renderReplyComments = (parent) => 
        props.commentList.map((comment,index)=>(
            <React.Fragment>
            { comment.responseTo === parent &&
                <div style={{width:'80%', marginLeft:'40px'}}>
                    <SingleComment MyRefresh={props.MyRefresh} comment={comment} videoId={videoId}/>
                    <ReplyComment MyRefresh={props.MyRefresh} commentList={props.commentList} videoId={videoId} parentCommentId={comment._id}/>
                </div>
            }
            </React.Fragment>
        ))
    

    const onClickfunc=()=>{
        setOpenReply(!OpenReply)
    }

    return (
        <div>
            {(ChildCommentNum > 0) &&
                <p style={{
                    fontSize: '14px',
                    margin: '0',
                    color: 'gray',
                    cursor:'pointer'}}
                    onClick={onClickfunc}>
                    {!OpenReply ? `view ${ChildCommentNum} more comments` : "close" }
                </p>
            }

            {OpenReply &&
            renderReplyComments(props.parentCommentId)
            }
            

        </div>
    );
}

export default ReplyComment;

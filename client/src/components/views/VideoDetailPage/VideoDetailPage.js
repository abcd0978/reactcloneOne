import React, {useEffect,useState} from 'react';
import { useLocation } from 'react-router-dom';
import {Row, Col, List, Avatar,Button} from 'antd'
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/SubscribeButton';
import Comment from './Sections/Comment';
import LikeDislike from './Sections/LikeDislike';
import axios from 'axios';

function VideoDetailPage() {

    const location = useLocation();
    const videoId = {videoId:location.pathname.split('/')[2]}

    const [VideoDetail,setVideoDetail] = useState([])
    const [Comments, setComments] = useState([])

    const MyRefresh = (newComment) =>{
        setComments(Comments.concat(newComment))
    }

    useEffect(()=>{
        axios.post('/api/video/getVideoDetail',videoId)
        .then(res=>{
            if(res.data.success){
                setVideoDetail(res.data.videoDetail)
            }else{
                alert('error while getting videoDetail')
            }
        })

        axios.post('/api/comment/getComments',videoId)
        .then(res=>{
            if(res.data.success){
                setComments(res.data.comments);
            }else{
                alert('error while getting comments')
            }
        })

    },[])

    

    if(VideoDetail.writer)
    {
        //자신이 자신의 영상에 들어갔는가?
        const isHim = VideoDetail.writer._id!==localStorage.getItem('userId')
        const SubscribeButton = (isHim && <Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')}/>)
        return (
            <Row gutter={[16, 16]}>


                <Col lg={18} xs={24}>
                    <div
                        style={{
                            width: '100%',
                            padding: '3rem 4rem'
                        }}
                    >
                        <video
                            style={{
                                maxWidth: '100%',
                                maxHeight: '100%'
                            }}
                            src={`http://localhost:3100/${VideoDetail.filePath}`}
                            controls/>
    
                        
                        <List.Item 
                        //비디오 업로더의 userId를 property로 넣어준다.
                        actions={[<LikeDislike videoId={videoId.videoId} userId={window.localStorage.getItem('userId')}/>,SubscribeButton]}
                        >
                            <List.Item.Meta 
                             avatar={<Avatar src={VideoDetail.writer.image}/>}
                             title={VideoDetail.writer.name}
                             description={VideoDetail.description}                                 
                            />
                        </List.Item>
                    
                        {/*comments */}

                        <Comment MyRefresh={MyRefresh} commentList={Comments} videoId={videoId.videoId}/>

                    </div>
                </Col>


                <Col lg={6} xs={24}>
                    <SideVideo/>
                </Col>


            </Row>
        )
    }else{
        return(
            <div>loading...</div>
        )
    }
    
}

export default VideoDetailPage;

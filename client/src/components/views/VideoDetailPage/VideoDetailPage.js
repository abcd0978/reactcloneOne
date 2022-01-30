import React, {useEffect,useState} from 'react';
import { useLocation } from 'react-router-dom';
import {Row, Col, List, Avatar} from 'antd'
import axios from 'axios';

function VideoDetailPage() {

    const location = useLocation();
    const videoId = {videoId:location.pathname.split('/')[2]}

    const [VideoDetail,setVideoDetail] = useState([])

    useEffect(()=>{
        axios.post('/api/video/getVideoDetail',videoId)
        .then(res=>{
            if(res.data.success){
                console.log(res.data.videoDetail.writer)
                setVideoDetail(res.data.videoDetail)
            }else{
                alert('fuckypu')
            }
        })
    },[])


    if(VideoDetail.writer)
    {
        return (
            <Row gutter={[16, 16]}>
                <Col lg={18} xs={24}>
                    <div
                        style={{
                            width: '100%',
                            padding: '3rem 4rem'
                        }}>
                        <video
                            style={{
                                maxWidth: '100%',
                                maxHeight: '100%'
                            }}
                            src={`http://localhost:3100/${VideoDetail.filePath}`}
                            controls/>
    
                        <List.Item actions>
                            <List.Item.Meta 
                             avatar={<Avatar src={VideoDetail.writer.image}/>}
                             title={VideoDetail.writer.name}
                             description={VideoDetail.description}                                 
                            />
                        </List.Item>
    
                    </div>
                </Col>
                <Col lg={6} xs={24}>
                    Side videos
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

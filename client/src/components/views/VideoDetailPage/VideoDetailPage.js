import React, {useEffect,useState} from 'react';
import { useLocation } from 'react-router-dom';
import {Row, Col, List, Avatar,Button} from 'antd'
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/SubscribeButton';
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
                        actions={[<Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')}/>]}
                        >
                            <List.Item.Meta 
                             avatar={<Avatar src={VideoDetail.writer.image}/>}
                             title={VideoDetail.writer.name}
                             description={VideoDetail.description}                                 
                            />
                        </List.Item>
                        {/*comments */}
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

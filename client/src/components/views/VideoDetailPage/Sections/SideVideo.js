import React,{useEffect,useState} from 'react';
import axios from 'axios';

function SideVideo() {

  const [SideVideos, setSideVideos] = useState([]);

  useEffect(()=>{
    axios.get('/api/video/getVideos')
    .then(res=>{
        if(res){
            setSideVideos(res.data.videos)
        }else{
            alert('비디오 가져오기를 실패했습니다.')
        }
    })
  },[])

  const renderSideVideo = SideVideos.map((video,index)=>{

    let minutes = Math.floor(video.duration/60);
    let seconds = Math.floor(video.duration - minutes*60);
    return(
    <div style={{display:'flex', marginBottom:'1rem', padding:'0, 2rem'}}>

      <div style={{width:'40%',marginRight:'1rem'}} >
        <a href={`/video/${video._id}`}>
          <img style={{width:'100%',height:'100%'}} src={`http://localhost:3100/${video.thumbnail}`} alt="thumbnail"/>
        </a>
      </div>

      <div style={{width:'50%'}}>
        <a href={`/video/${video._id}`} style={{color:'gray'}}>
          <span style={{fontSize:'1rem', color:'black'}}>{video.title}</span><br/>
          <span>{video.writer.name}</span> <br/>
          <span>{video.views} :views</span><br/>
          <span>{minutes}: {seconds}</span>
        </a>
      </div>

    </div>
    )

  })

  return (

    <>
      <div style={{marginTop:'3rem'}}/>
      {renderSideVideo}
    </>
    );
}

export default SideVideo;

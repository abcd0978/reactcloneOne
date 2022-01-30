import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom'
import {Typography, Button, Form, message, Input} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Dropzone from 'react-dropzone'
import {AlignRightOutlined, PlusOutlined, CheckOutlined } from '@ant-design/icons'
import {useSelector} from 'react-redux'
import axios from 'axios';
const {Title} = Typography;


const MapPrivate = [
	{value: 0, label:"Private"},
	{value: 1, label:"Public"}
]

const MapCategory = [
	{value:0, label: "Film & Animation"},
	{value:1, label: "Autos & Vehicles"},
	{value:2, label: "Music"},
	{value:3, label: "Pets & Animals"},
]

function VideoUploadPage() {

	const navigate = useNavigate();

	//리덕스 user스테이트를 갖고옴
	const user = useSelector(state=>state.user);
	
	const [VideoTitle,setVideoTitle] = useState("")
	const [Description,setDescription] = useState("")
	const [Private, setPrivate] = useState("0")
	const [Category, setCategory] = useState("0")

	const [FilePath, setFilePath] = useState("");
	const [Duration, setDuration] = useState("");
	const [ThumbnailPath, setThumbnailPath] = useState("");


	const titleOnChange = e => setVideoTitle(e.currentTarget.value)

	const descriptionOnChange= e => setDescription(e.currentTarget.value)

	const privateOnChange= e=> setPrivate(e.currentTarget.value)

	const categoryOnChange= e => setCategory(e.currentTarget.value)
	
	const onDropFunc = (files)=>{//드랍존 함수
		let formData = new FormData();
		const config={
			header:{'Content-type':'multipart/form-data'}
		}
		
		formData.append('file',files[0])
		axios.post('/api/video/uploadfiles',formData,config)//비디오 보냄
		.then(res=>{
			if(res.data.success)
			{
				console.log(res.data);
				let variable = {
					url:res.data.url,
					fileName:res.data.fileName
				}
				setFilePath(res.data.url);//비디오의 Path를 설정함
				axios.post('/api/video/thumbnail',variable)//비디오 보내는거 성공하면 썸네일 요청함.
				.then(res=>{
					if(res){
						setThumbnailPath(res.data.url);//썸네일 요청 성공하면 썸네일의 Path를 받아옴 
						setDuration(res.data.fileDuration);//비디오의 재생시간을 받아옴

					}else{
						alert('썸네일 생성에 실패했습니다.')
					}
				})
			}
			else
			{
				console.log(res.data)
				alert(res.data.msg)
			}
		})
	}

	const onSubmitFunc = (event) =>{//제출함수
		event.preventDefault();

		const data={
			writer:user.userData._id,
			title:VideoTitle,
			description:Description,
			privacy:parseInt(Private),
			filePath:FilePath,
			category:Category,
			duration:Duration,
			thumbnail:ThumbnailPath,
		}

		axios.post('/api/video/uploadVideo',data)
		.then(res=>{
			if(res){
				console.log(res.data);
				message.success('비디오가 성공적으로 업로드 되었습니다.')
				navigate('/',{replace:true});
			}else{
				alert('실패했습니다.')
			}
		})
	}

	return( 
	<div style={{maxWidth:'700px', margin:'2rem auto'}}>
		<div style={{textAlign:'center', marginBottom:'2rem'}}>
			<Title level={2}>Upload Video </Title>
   		</div>
    	<Form onSubmit={onSubmitFunc}>
			<div style={{display:'flex',justifyContent:'space-between'}}>
				{/*drop zone */}
				<Dropzone
				onDrop={onDropFunc}
				multiple={false}
				maxSize={1000*1000*1000}>
				{({getRootProps, getInputProps})=>(
					<div style={{width:'300px', height:'240px', border:'1px solid lightgray', display:'flex',
					alignItems:'center', justifyContent:'center'}} {...getRootProps()}>
						<input {...getInputProps()} />
						{ThumbnailPath === "" ? //삼항연산자 렌더
						<PlusOutlined style={{fontSize:'3rem'}}/> : <CheckOutlined style={{fontSize:'3rem'}} />}

					</div>
				)}
				</Dropzone>
				{/*썸네일*/}
				{ThumbnailPath &&
				// ThumnailPath스테이트와 AND연산을 하면 ThumbnailPath가 정의된때에만 이미지가 렌더링됨.
				<div>
					<img src={`http://localhost:3100/${ThumbnailPath}`} alt="thumbnail" />
				</div> }
			</div>
			<br/>
			<br/>
			<label>Title</label>
			<Input 
				onChange={titleOnChange}
				value={VideoTitle}
			/>
			<br/>
			<br/>
			<label>Description</label>
			<TextArea
				onChange={descriptionOnChange}
				value={Description}
				/>
			<br/>
			<br/>
			<select onChange={privateOnChange}>
				{MapPrivate.map((item,index)=>(
					<option key={index} value={item.value}>{item.label}</option>
				))}
			</select>
			<br/>
			<br/>
			<select onChange={categoryOnChange}>
				{MapCategory.map((item,index)=>(
					<option key={index} value={item.value}>{item.label}</option>
				))}
			</select>
			<br/>
			<br/>
			<Button type="primary" size="large" onClick={onSubmitFunc}>
				Submit
			</Button>


    	</Form>
	</div>
  );
}

export default VideoUploadPage;

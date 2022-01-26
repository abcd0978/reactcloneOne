import React,{useState} from 'react';
import {Typography, Button, Form, message, Input} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Dropzone from 'react-dropzone'
import {PlusOutlined} from '@ant-design/icons'
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

	const [VideoTitle,setVideoTitle] = useState("")
	const [Description,setDescription] = useState("")
	const [Private, setPrivate] = useState("")
	const [Category, setCategory] = useState("Film & Animation")

	const titleOnChange = (e)=>{
		setVideoTitle(e.currentTarget.value)
	}

	const descriptionOnChange=(e)=>{
		setDescription(e.currentTarget.value)
	}

	const privateOnChange=(e)=>{
		setPrivate(e.currentTarget.value)
	}

	const categoryOnChange=(e)=>{
		setCategory(e.currentTarget.value)
	}

	const onDropfunc = (files)=>{
		let formData = new FormData;
		const config={
			header:{'content-type':'multipart/form-data'}
		}
		formData.append('file',files[0])
		console.log(files[0])
	}

	return( 
	<div style={{maxWidth:'700px', margin:'2rem auto'}}>
		<div style={{textAlign:'center', marginBottom:'2rem'}}>
			<Title level={2}>Upload Video </Title>
   		</div>
    	<Form onSubmit>
			<div style={{display:'flex',justifyContent:'space-between'}}>
				{/*drop zone */}
				<Dropzone
				onDrop={onDropfunc}
				multiple={false}
				maxSize={1000*1000*1000}>
				{({getRootProps, getInputProps})=>(
					<div style={{width:'300px', height:'240px', border:'1px solid lightgray', display:'flex',
					alignItems:'center', justifyContent:'center'}} {...getRootProps()}>
						<input {...getInputProps()} />
						<PlusOutlined style={{fontSize:'3rem'}} />
					</div>
				)}
				</Dropzone>
				{/*썸네일*/}
				<div>
					<img src alt />
				</div>
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
			<Button type="primary" size="large" onChange>
				Submit
			</Button>


    	</Form>
	</div>
  );
}

export default VideoUploadPage;

import React,{useEffect} from 'react'
import axios from 'axios'

function LandingPage(props) {

    const onClickHandler =()=>{
        axios.get('/api/users/logout')
        .then(res=>{
            if(res.data.success){
                alert('로그아웃되었음');
            }else{
                alert('로그아웃에 실패하였습니다.')
            }
        })
    }
    useEffect(()=>{
        axios.get('/api/hello')
        .then(res=>console.log(res.data)) 
    },[])
    return (
        <div style={{display:'flex',justifyContent:'center',alignItems:'center'
            ,width:'100%',height:'100vh'}}>
            <h2>시작페이지</h2>
            <button onClick={onClickHandler}>
                로그아웃
            </button>
        </div>
    )
}

export default LandingPage

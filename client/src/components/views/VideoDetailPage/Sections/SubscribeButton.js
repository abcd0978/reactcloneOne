import React, {useEffect, useState} from 'react';
import axios from 'axios';


function SubscribeButton(props) {

const [SubscribeNumber, setSubcribeNumber] = useState("")
const [Subscribed, setSubscribed] = useState(false);
useEffect(()=>{

    let writerData = {userTo:props.userTo}

    axios.post('/api/subscribe/subnum',writerData)
    .then(res=>{
        if(res.data.success){
            setSubcribeNumber(res.data.subscribeNumber)
        }else{
            alert('error while getting subnumber')
        }
    })

    let visitorData = {userTo:props.userTo, userFrom:props.userFrom}


    axios.post('/api/subscribe/issubed',visitorData)
    .then(res=>{
        if(res.data.success){
            console.log(res.data)
            setSubscribed(res.data.subscribed)
        }else{
            alert('error while getting sub info')
        }
    })

},[])


const onSubscribe = ()=>{


    if(props.userFrom==="" || props.userFrom===undefined)
    {
        if(window.confirm("로그인이 필요합니다. 로그인 하시겠습니까??")){
            window.location.replace('/login')            
        }
    }

    let subinfo = {
        userTo: props.userTo,
        userFrom: props.userFrom
    }
    if(Subscribed){
        axios.post('/api/subscribe/unsub',subinfo)
        .then(res=>{
            if(res){
                console.log(res.data)
                setSubcribeNumber(SubscribeNumber-1)
                setSubscribed(!Subscribed)
            }else{
                alert('error while unsub')
            }
        })
    }else{
        axios.post('/api/subscribe/sub',subinfo)
        .then(res=>{
            if(res){
                console.log(res.data)
                setSubcribeNumber(SubscribeNumber+1)
                setSubscribed(!Subscribed)
            }else{
                alert('error while sub')
            }
        })
    }
}


return (
    <div>
        <button
            style={{
                backgroundColor: `${Subscribed ? '#AAAAAA' : '#CC0000'}`,
                borderRadius: '4px',
                color: 'white',
                padding: '10px 16px',
                fontWeight: '500',
                fontSize: '1rem',
                textTransform: 'uppercase',
                border: '0',
                outline: '0'
            }}
            onClick={onSubscribe}>
            {SubscribeNumber} {Subscribed ? "Subscribed" : "Subscribe"}</button>
    </div>
);
}

export default SubscribeButton;
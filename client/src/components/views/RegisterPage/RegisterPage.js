import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";
import { registerUser } from '../../../_actions/user_action';

function RegisterPage() {
    const dispatch = useDispatch();
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Name, setName] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const onEmailHandler = (event)=>{
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event)=>{
        setPassword(event.currentTarget.value)
    }

    const onNameHandler =(event)=>{
        setName(event.currentTarget.value);
    }

    const onConfirmPasswordHandler = (event)=>{
        setConfirmPassword(event.currentTarget.value);
    }

    const onSubmitHandler = (event)=>{
        event.preventDefault();

        if(Password!==ConfirmPassword){
            return alert('비밀번호확인과 비밀번호가 다릅니다.')
        }
        let body = {
            email:Email,
            password:Password,
            name:Name
        }


        dispatch(registerUser(body))
        .then(res=>{
            if(res.payload.success){
                navigate('/login',{replace:true})
            }else{
                alert('failed')
            }
        })

        
    }
    return (
        <div style={{display:'flex',justifyContent:'center',alignItems:'center'
        ,width:'100%',height:'100vh'}}>
            <form style={{display:'flex', flexDirection:'column'}} 
                onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Name</label>
                <input type="name" value={Name} onChange={onNameHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <label>ConfirmPassword</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />

                <hr/>
                <button>
                    Login
                </button>
            </form>
        </div>
    )
}

export default RegisterPage

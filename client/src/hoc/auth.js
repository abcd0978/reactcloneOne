import React,{ useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Auth(SpecificComponent,option,adminRoute=null){

    //option: null:누구나, true:로그인한 유저만, false:로그인한 유저는 출입 불가
    function AuthenticationCheck(props){
        let user = useSelector(state => state.user);
        const dispatch = useDispatch();
        const navigate = useNavigate();

        useEffect(() => {
         dispatch(auth()).then(async res=>{
             if(await !res.payload.isAuth){//로그인을 안했을 경우
                if(option){//option이 true이면,
                    navigate('/login');
                }
            }else{//로그인은 했으나 어드민이 아님.
                if(adminRoute && !res.payload.isAdmin){
                    navigate('/');
                }
            }

            })
            }
        , [])
        return (<SpecificComponent{...props} user={user}/>)
    }
    return <AuthenticationCheck/>
}

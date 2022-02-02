import React from 'react'
import {Menu} from'antd'
import axios from 'axios'
import {USER_SERVER} from '../../../Config'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

//const Upload = require('../../../../assets/images/upload.png')

function RightMenu(props){

    const user = useSelector(state=>state.user);

    const logoutHandler=()=>{
        axios.get(`${USER_SERVER}/logout`)
        .then(res=>{
            if(res.status===200){
                window.location.replace("/")
                window.localStorage.setItem('userId',"");
            }else{
                alert('logout failed')
            }
        })
    }
    if (user.userData && !user.userData.isAuth) {
        return (
            <Menu mode={props.mode}>
            <Menu.Item key="up">
              <a href="/login">signin</a>
            </Menu.Item>
            <Menu.Item key="in"> 
              <a href="/register">signup</a>
            </Menu.Item>
          </Menu>
        )
      } else {
        return (
          <Menu mode={props.mode}>
            <Menu.Item  key="upload">
              <a href="/video/upload">Upload</a>
            </Menu.Item>
            <Menu.Item key="logout">
              <a onClick={logoutHandler}>Logout</a>
            </Menu.Item>
          </Menu>
        )
      }


}

export default RightMenu
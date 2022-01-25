import React from 'react'
import {Menu} from'antd'
import axios from 'axios'
import {USER_SERVER} from '../../../Config'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

//const Upload = require('../../../../assets/images/upload.png')

function RightMenu(props){

    const user = useSelector(state=>state.user);
    const navigate = useNavigate()

    const logoutHandler=()=>{
        axios.get(`${USER_SERVER}/logout`)
        .then(res=>{
            if(res.status===200){
                window.location.replace("/")
            }else{
                alert('logout failed')
            }
        })
    }
    if (user.userData && !user.userData.isAuth) {
        return (
          <Menu mode={props.mode}>
            <Menu.Item key="mail">
              <a href="/login">Signin</a>
            </Menu.Item>
            <Menu.Item key="app">
              <a href="/register">Signup</a>
            </Menu.Item>
          </Menu>
        )
      } else {
        return (
          <Menu mode={props.mode}>
            <Menu.Item key="logout">
              <a onClick={logoutHandler}>Logout</a>
            </Menu.Item>
          </Menu>
        )
      }


}

export default RightMenu
import axios from "axios";
import {LOGIN_USER} from './types'
import { REGISTER_USER } from "./types";
import {AUTH_USER} from "./types"
export function loginUser(dataSubmit){
    const request = axios.post('/api/users/login',dataSubmit)
        .then(res=>res.data)
    
    return {
        type:LOGIN_USER,
        payload:request
    }
}
export function registerUser(dataSubmit){
    const request = axios.post('/api/users/register',dataSubmit)
        .then(res=>res.data)
    
    return {
        type:REGISTER_USER,
        payload:request
    }
}

export function auth(){
    const request = axios.get('/api/users/auth')
        .then(res=>res.data)
    return {
        type:AUTH_USER,
        payload:request
    }
}
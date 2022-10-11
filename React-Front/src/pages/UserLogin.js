
import './App.css';

import {GoogleLogout ,GoogleLogin} from "react-google-login";
import React, { useState } from 'react';
import { Layout } from 'antd';
import { Navigate} from "react-router-dom";
import '../logininfo.js';
import {axios_user} from '../Axios'

const axios = axios_user();
const { Header, Content } = Layout;
const responseGoogle = (response) => {
  console.log(response);
}
const clientId = "100559822787-ffbh8kditc4o92h0jnghut5t882mr9pq.apps.googleusercontent.com";

function UserLogin() {
  const [showloginButton, setShowloginButton] = useState(false);
  const [showlogoutButton, setShowlogoutButton] = useState(false);
  const [showloginstatus, setloginstatus] = useState(global.userlogininfo.statas)
  const [accessToken, setaccessToken] = useState();
  const onLoginSuccess = (res) => {
    //console.log('Login Success:', res.profileObj);
    //console.log('access_token:', res.getAuthResponse(true).access_token);
    //console.log('res:', res);
    //axios
    
    setaccessToken(res.getAuthResponse(true).access_token);
    axios.post('/SignInUser',{
      email : JSON.parse(JSON.stringify(res.profileObj.email)),
      name  : JSON.parse(JSON.stringify(res.profileObj.name)),
      access_token: res.getAuthResponse(true).access_token
    })
    //.then(console.log( Data2))
    .then((res) => {console.log(res.status)})
    .catch(err=>{console.log("err")}); 
    //axios-end 
    global.userlogininfo.statas = true
    setShowloginButton(false);
    setShowlogoutButton(true);
    setloginstatus(true)
};
axios.get('/GetServerStatus').then((res)=>{
  //console.log(res.data.status)
  if(res.data.status==="success"){
    //console.log(res)
    setShowloginButton(true);
  }
})
.catch(err=>{console.log("Server Error:"+err)}); 
const onSignoutSuccess = () => {
  alert("You have been logged out successfully");
  //console.clear();
  global.userlogininfo.statas = false
  console.log(global.userlogininfo.statas)
  setShowloginButton(true);
  setShowlogoutButton(false);
  
  setloginstatus(false)
};





const onLoginFailure = (res) => {
  console.log('Login Failed:', res);
};


  return (
    <Content>
        { showloginstatus ?
          <Navigate to={`/user`}/>
          : null
        }
        <div style={{height:'100px',width:'100%'}}></div>
        <div style={{height:'100px',width:'100%'}}>
        <center>
        { showloginButton ?

                <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign In"
                    onSuccess={onLoginSuccess}
                    onFailure={onLoginFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                   
                />  : <h1>Server Error</h1>}</center></div>
               
        </Content>         
            
  );
}

export default UserLogin;

import './App.css';

import {GoogleLogout ,GoogleLogin} from "react-google-login";
import React, { useState ,useEffect} from 'react';
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

const UserLogin = () =>  {
  const [showloginButton, setShowloginButton] = useState(false);
  const [showlogoutButton, setShowlogoutButton] = useState(false);
  const [showloginstatus, setloginstatus] = useState(global.userlogininfo.statas)
  const [accessToken, setaccessToken] = useState();
  

  const onLoginSuccess = (res) => {
    //console.log('Login Success:', res.profileObj);
    console.log('access_token!!!:', res.getAuthResponse(true).access_token);
    //console.log('res:', res);
    //axios
    localStorage.setItem("acctoken",res.getAuthResponse(true).access_token)
    localStorage.setItem("userinfo",JSON.stringify(res.profileObj))
    setaccessToken(res.getAuthResponse(true).access_token);
    axios.post('/SignInUser',{
      email : JSON.parse(JSON.stringify(res.profileObj.email)),
      name  : JSON.parse(JSON.stringify(res.profileObj.name)),
      access_token: res.getAuthResponse(true).access_token
    })
    //.then(console.log( Data2))
    .then((res) => {
    if(res.status===200){
      global.userlogininfo.statas = true
      setShowloginButton(false);
      setloginstatus(true)
    }
  
    })
    .catch(err=>{console.log("SignIn Error:"+err)}); 
    //axios-end 

    
};
function GetServerStatus(){
  axios.get('/GetServerStatus').then((resq)=>{
   
    if(resq.data.status==="success"){
      //console.log(resq.data.status)
      setShowloginButton(true);    
    }
    
  })
  .catch(err=>{console.log("Server Error:"+err);GetServerStatus();}
  );
}   

if(!showloginButton){
  GetServerStatus();
}

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
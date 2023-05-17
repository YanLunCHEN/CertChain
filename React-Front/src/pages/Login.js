
import './App.css';
import loginstate from '../routes/ProtectedRoutes';
//import React from "react";
// import {GoogleLogout ,GoogleLogin} from "react-google-login";
import React, { useState } from 'react';
import { Layout } from 'antd';
import User from "./User";
import { BrowserRouter, Routes, Route ,Navigate} from "react-router-dom";
import '../logininfo.js';



const { Header, Content } = Layout;
const responseGoogle = (response) => {
  console.log(response);
}
const clientId = "1042995923118-56bteondv86u1gq4jdbsq2qleqb4e5c4.apps.googleusercontent.com";

function Login() {
  const [showloginButton, setShowloginButton] = useState(true);
  const [showlogoutButton, setShowlogoutButton] = useState(false);
  const [showloginstatus, setloginstatus] = useState(global.logininfo.statas)
  const onLoginSuccess = (res) => {
    console.log('Login Success:', res.profileObj);
    global.logininfo.statas = true
    setShowloginButton(false);
    setShowlogoutButton(true);
    setloginstatus(true)
};

const onSignoutSuccess = () => {
  alert("You have been logged out successfully");
  //console.clear();
  global.logininfo.statas = false
  console.log(global.logininfo.statas)
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
          <Navigate to="/user"/>
          : null
        }


        
        { showloginButton ?

                <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign In"
                    onSuccess={onLoginSuccess}

                    onFailure={onLoginFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                   
                />  : null}
            
            
        
        
            
           
        </Content>
                
  
                
            
  );
}

export default Login;
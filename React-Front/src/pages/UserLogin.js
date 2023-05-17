
import './App.css';

import { GoogleLogin } from '@react-oauth/google';
import React, { useState ,useEffect} from 'react';
import {useRef } from 'react'
import { Layout } from 'antd';
import { Navigate} from "react-router-dom";
import '../logininfo.js';
import {axios_user} from '../Axios'
import jwtDecode from 'https://esm.run/jwt-decode';
const axios = axios_user();
const { Header, Content } = Layout;
const responseGoogle = (response) => {
  console.log(response);
}
const clientId = "100559822787-ffbh8kditc4o92h0jnghut5t882mr9pq.apps.googleusercontent.com";
const loadScript = (src) =>
  new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve()
    const script = document.createElement('script')
    script.src = src
    script.onload = () => resolve()
    script.onerror = (err) => reject(err)
    document.body.appendChild(script)
  })
const UserLogin = () =>  {
  const [showloginButton, setShowloginButton] = useState(false);
  const [showlogoutButton, setShowlogoutButton] = useState(false);
  const [showloginstatus, setloginstatus] = useState(global.userlogininfo.statas)
  const [accessToken, setaccessToken] = useState();
  // useEffect(() => {
  //   console.log("run")
  //   //I'm adding the <script>
  //   const elemScript = document.createElement('script'); 
  //   elemScript.src = "https://accounts.google.com/gsi/client";
  //   elemScript.async = true;
  //   elemScript.defer = true;
  //   document.body.append(elemScript);

  //   //adding the code from the documentation
  //   window.onload = function () {
  //     console.log("in")
  //     google.accounts.id.initialize({
  //       client_id: clientId,
  //       callback: handleCredentialResponse
  //     });
  //     google.accounts.id.renderButton(
  //       document.getElementById("buttonDiv"),
  //       { theme: "outline", size: "large" }  // customization attributes
  //     );
  //     google.accounts.id.prompt(); // also display the One Tap dialog
  //   }

  //   return () => {
  //     //I get ride of the <scripts> when the elements is unmounted
  //     document.body.removeChild(elemScript);
  //   }
  // }, [document])
  
  const googleButton = useRef(null);

  useEffect(() => {
    const src = 'https://accounts.google.com/gsi/client'
    const id = '100559822787-ujji5gc5nk4aqmn1hlevjnmbjmtsro6q.apps.googleusercontent.com'

    loadScript(src)
      .then(() => {
        /*global google*/
        console.log(google)
        google.accounts.id.initialize({
          client_id: id,
          callback: handleCredentialResponse,
        })
        google.accounts.id.renderButton(
          googleButton.current, 
          { theme: 'outline', size: 'large' } 
        )
      })
      .catch(console.error)

    return () => {
      const scriptTag = document.querySelector(`script[src="${src}"]`)
      if (scriptTag) document.body.removeChild(scriptTag)
    }
  }, [])


  function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    console.log(jwtDecode(response.credential))
    let profileObj = jwtDecode(response.credential)
    localStorage.setItem("acctoken",response.credential)
    localStorage.setItem("userinfo",JSON.stringify(profileObj))
    setaccessToken(response.credential);
    axios.post('/SignInUser',{
      email : JSON.parse(JSON.stringify(profileObj.email)),
      name  : JSON.parse(JSON.stringify(profileObj.name)),
      access_token: response.credential
    })
    .then((res) => {
      if(res.status===200){
        global.userlogininfo.statas = true
        localStorage.setItem("isLogIn",true);
        setShowloginButton(false);
        setloginstatus(true)
      }
    })
    .catch(err=>{console.log("SignIn Error:"+err)}); 
    //axios-end 
  }
  // window.onload = function () {
  //   google.accounts.id.initialize({
  //     client_id: clientId,
  //     callback: handleCredentialResponse
  //   });
  //   google.accounts.id.renderButton(
  //     document.getElementById("buttonDiv"),
  //     { theme: "outline", size: "large" }  // customization attributes
  //   );
  //   google.accounts.id.prompt(); // also display the One Tap dialog
  // }
  // const onLoginSuccess = (res) => {
  //   console.log('Login Success:', res);
  //   console.log('access_token!!!:', res.getAuthResponse(true).access_token);
  //   localStorage.setItem("acctoken",res.getAuthResponse(true).access_token)
  //   localStorage.setItem("userinfo",JSON.stringify(res.profileObj))
  //   setaccessToken(res.getAuthResponse(true).access_token);
  //   axios.post('/SignInUser',{
  //     email : JSON.parse(JSON.stringify(res.profileObj.email)),
  //     name  : JSON.parse(JSON.stringify(res.profileObj.name)),
  //     access_token: res.getAuthResponse(true).access_token
  //   })
  //   .then((res) => {
  //   if(res.status===200){
  //     global.userlogininfo.statas = true
  //     localStorage.setItem("isLogIn",true);
  //     setShowloginButton(false);
  //     setloginstatus(true)
  //   }
  
  //   })
  //   .catch(err=>{console.log("SignIn Error:"+err)}); 
  //   //axios-end 
  // };
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
      <div>
        { showloginstatus ?
          <Navigate to={`/user`}/>
          : null
        }
        <div style={{height:'100px',width:'100%'}}></div>
        <div style={{height:'100px',width:'100%'}}>
          <center>
            {/* { showloginButton ?
              <GoogleLogin
                onSuccess={onLoginSuccess}
                onError={onLoginFailure}
              />: <h1>Server Error</h1>} */}
              {/* <div id="buttonDiv"></div> */}
              <div ref={googleButton}></div>
          </center></div>
          </div>     
        </Content>         
        
  );
}

export default UserLogin;
import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { Layout } from 'antd';
import { Link,Navigate } from "react-router-dom";
const { Header, Content } = Layout;

const clientId = "100559822787-ffbh8kditc4o92h0jnghut5t882mr9pq.apps.googleusercontent.com";

const InstitutionLogin = () =>  {
    
        const [showloginButton, setShowloginButton] = useState(true);
        const [showlogoutButton, setShowlogoutButton] = useState(false);
        const [showloginstatus, setloginstatus] = useState(global.inslogininfo.statas)
        const onLoginSuccess = (res) => {
          console.log('Login Success:', res.profileObj);
          global.inslogininfo.statas = true
          setShowloginButton(false);
          setShowlogoutButton(true);
          setloginstatus(true)
      };
      
      const onSignoutSuccess = () => {
        alert("You have been logged out successfully");
        //console.clear();
        global.inslogininfo.statas = false
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
                <Navigate to="/institution"/>
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
export default InstitutionLogin;
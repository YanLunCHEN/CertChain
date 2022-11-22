
import './App.css';
import { Layout, Space } from 'antd';
import { Button } from 'antd';
import { Typography,Card,Col, Row  } from 'antd';
//import { BrowserRouter, Routes, Route } from "react-router-dom";
import {  useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect, useContext } from 'react';
import {axios_ins} from '../Axios'
import { Navigate} from "react-router-dom";
import React from 'react';

const { Header, Content } = Layout;
const { Title } = Typography;
const axios = axios_ins();




const App = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [showloginstatus, setloginstatus] = useState(global.inslogininfo.statas);
    const userRef = useRef();
    function isValidEmail(email) {
      return /\S+@\S+\.\S+/.test(email);
    }
    function isValidPasswd(pwd) {
      return /\S/.test(pwd);
    }
    const onLoginSuccess = () => {
      if(!isValidEmail(user)){
        alert("You Email is invalid!");
        return false
      }
      if(!isValidPasswd(pwd)){
        alert("You passwd is invalid!");
        return false
      }
      console.log("click")
      axios.post('/SignInIns',{
        email : user,
        passwd  : pwd
      })
      .then((res) => {
        console.log(res.status)
        console.log(res.data)
        if(res.data.status==='success'){
          global.inslogininfo.statas = true
          localStorage.setItem('InsAccessToken',res.data.access_token);
          console.log(global.inslogininfo.statas )
          setloginstatus(true)
          return true
        }
        else{
          console.log(res.status)
          alert("You account is invalid!");
          return false
        }
        
      })
      .catch((err) => 
      {

        console.log(err)
        alert("Server error!");
        return false
      }); 
      

    }
  return(
<>
<div className="App">
    <Layout>
      <Layout>
      <Content>
      { showloginstatus ?
          <Navigate to={`/institution`}/>
          : null
        }
        <div className="Institue-Login" style={{height: '200px', width : '100%'}}>
          <br/>
        <Title>發證端登入</Title>
          
        </div>
        <div style={{height: '200px', width : '100%'}}>
        
        <input
          type="text"
          placeholder="電子郵件地址"
          id="username"
          
          style={{height: '65px', width : '300px'}}
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          //value={user}
          value={user}
          required
          
        />
        <p></p>
        
        <input
            type="password"
            placeholder="密碼"
            id="password"
            style={{height: '65px', width : '300px'}}
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
        />
        </div>
        <div style={{height: '450px', width : '100%'}} className="space">
          <Space align="baseline">
          <input type="submit" hidden />
          <Button style={{height: '40px', width : '60px'}} onClick={onLoginSuccess}>登入</Button>
          <Button style={{height: '40px', width : '60px'}} onClick={() => navigate('/Registe')}> 註冊</Button>
          </Space>
        </div>
      <p>
      </p>
        

      </Content>
      </Layout>
      <div style={{height: '100%', width : '100%'}}>
      <p>Designed by AUCSIE</p>
      </div>
    </Layout>
    </div>
  </>
  );
};

export default App;
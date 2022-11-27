import React from 'react';
import { Button,Space,Upload,message } from 'antd';
import './App.css';
import { Layout } from 'antd';
import { Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Carousel } from 'antd';
import { Image } from 'antd';
//import {GoogleLogout ,GoogleLogin} from "react-google-login";
import { useState } from 'react';
import { BrowserRouter ,Navigate} from "react-router-dom"
import '../logininfo.js';
import {axios_ins} from '../Axios'
const axios = axios_ins();
const { Header, Content , Footer} = Layout;
const { Title } = Typography;
const clientId = "1042995923118-56bteondv86u1gq4jdbsq2qleqb4e5c4.apps.googleusercontent.com";

function clickMe() {
  alert("Success!");
}

const props = {
  name: 'file',
  action: 'http://218.161.4.208:5000/InsertToBlockchain',
  headers: {
    //authorization: 'authorization-text',
    access_token : localStorage.getItem('InsAccessToken'),
  },
  

  onChange(info) {
    console.log(info.file.status)
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }

    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};


function Institution() {
  
  const [showloginstatus, setloginstatus] = useState(global.inslogininfo.statas);
  const accessToken = localStorage.getItem('InsAccessToken');
  
  const onSignoutSuccess = () => {
    alert("You have been logged out successfully");
    //console.clear();
    localStorage.removeItem('InsAccessToken');
    global.inslogininfo.statas = false
    console.log(global.inslogininfo.statas )
    setloginstatus(false)
    axios.get('/sign_out')
  };
  return (
    
  <div className="App">
    
      <Layout>
      
       <Layout>

      <Content>
      <br/>
      <Title>Welcome Institution!</Title>
      <br/>
      { showloginstatus ?
          null
          : <Navigate to="/"/>
      }  
      <Space size="large">
        
        {/* <Button size="large" onClick={clickMe}>
          查看個人資料
        </Button> */}
      <Upload maxCount={1} accept=".csv"{...props}>
        <Button size="large" >
          <UploadOutlined /> 證書上鏈
        </Button>
      </Upload>
     
       
        <Button size="large" onClick={onSignoutSuccess}>
          登出
        </Button>
        </Space>
      </Content>
      </Layout>
      <br />
      <center><iframe width="800px" height="500px"  src="https://www.youtube.com/embed/Lv3HKITlfZ4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></center>
        
      </Layout>
        <p>Designed by AUCSIE</p>
  </div>
  
  )
};

export default Institution;
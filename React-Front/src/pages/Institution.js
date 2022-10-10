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
  action: 'http://114.32.250.105:5000/InsertToBlockchain',
  headers: {
    authorization: 'authorization-text',
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
  const accessToken = null;
  if(!accessToken){
    axios.get('/getAccessToken').then(resp => {
      console.log('acctoken = '+resp.data);
      accessToken=resp.data;
    })
    .catch((err)=>{
      //console.log("err:"+err);
    });
  }
  
  const onSignoutSuccess = () => {
    alert("You have been logged out successfully");
    //console.clear();
    global.inslogininfo.statas = false
    console.log(global.inslogininfo.statas )
    setloginstatus(false)
    axios.get('/sign_out')
  };
  return (
    
  <div className="App">
    
      <Layout>
      <Header>
        <Title style={{color:'white'}} level={1} >Welcome Institution!</Title>
      </Header>
       <Layout>

      <Content>
      
      { showloginstatus ?
          null
          : <Navigate to="/"/>
      }  
      <Space size="large">
        
        <Button size="large" onClick={clickMe}>
          查看個人資料
        </Button>
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
      
      <Footer>
      <Carousel autoplay>
      <div>
        <Image width={500}
        src="https://csie.au.edu.tw/var/file/52/1052/pictures/507/m/mczh-tw1000x1000_large9469_756704868140.jpg"
        />
        </div>
        <div>
        <Image width={500}
        src="https://csie.au.edu.tw/var/file/52/1052/pictures/240/m/mczh-tw1000x1000_large15034_519244718308.jpg"
        />
        </div>
        <div>
        <Image width={500}
        src="https://csie.au.edu.tw/var/file/52/1052/pictures/515/m/mczh-tw1000x1000_large15035_696029119003.jpg"
        />
        </div>
      <div>
        <Image width={500}
        src="https://csie.au.edu.tw/var/file/52/1052/pictures/608/m/mczh-tw1000x1000_large15036_469164619113.jpg"
        />
        </div>
      <div>
        <Image width={500}
        src="https://csie.au.edu.tw/var/file/52/1052/pictures/110/m/mczh-tw1000x1000_large15037_353318919159.jpg"
        />
       </div>
      <div>
        <Image width={500}
        src="https://csie.au.edu.tw/var/file/52/1052/pictures/550/m/mczh-tw1000x1000_large14995_960798487071.jpg"
        />
        </div>
      <div>
        <Image width={500}
        src="https://csie.au.edu.tw/var/file/52/1052/pictures/114/m/mczh-tw1000x1000_large14996_202953287273.jpg"
        />
        </div>
      <div>
        <Image width={500}
        src="https://csie.au.edu.tw/var/file/52/1052/pictures/389/m/mczh-tw1000x1000_large15038_296158019511.jpg"
        />
        </div>
      <div>
        <Image width={500}
        src="https://csie.au.edu.tw/var/file/52/1052/pictures/916/m/mczh-tw1000x1000_large15039_579163619645.jpg"
        />
        </div>
      <div>
        <Image width={500}
        src="https://csie.au.edu.tw/var/file/52/1052/pictures/816/m/mczh-tw1000x1000_large15040_115928819891.jpg"
        />
        </div>
      <div>
        <Image width={500}
        src="https://csie.au.edu.tw/var/file/52/1052/pictures/571/m/mczh-tw1000x1000_large15041_5325520096.jpg"
        />
        </div>
      <div>
        <Image width={500}
        src="https://csie.au.edu.tw/var/file/52/1052/pictures/653/m/mczh-tw1000x1000_large15043_412559720798.jpg"
        />
        </div>
      </Carousel>
      <h1>Designed by AUCSIE</h1>
      </Footer>

        </Layout>
  </div>
  
  )
};

export default Institution;
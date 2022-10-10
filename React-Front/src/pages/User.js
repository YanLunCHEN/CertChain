import React from 'react';
import { Button,Space,message } from 'antd';
import './App.css';
import { Layout } from 'antd';
import { Typography } from 'antd';
import { Carousel } from 'antd';
import { Image } from 'antd';
import { GoogleLogout } from "react-google-login";
import { useState } from 'react';
import { Navigate} from "react-router-dom"
import '../logininfo.js';
import {axios_user} from '../Axios'
import { Descriptions } from 'antd';




const axios = axios_user();
const { Content , Footer} = Layout;
const { Title } = Typography;
const clientId = "1042995923118-56bteondv86u1gq4jdbsq2qleqb4e5c4.apps.googleusercontent.com";

function clickMe() {
  alert("Success!");
  

}



/*const props = {
  name: 'file',
  action: 'http://localhost:3000/',
  headers: {
    authorization: 'authorization-text',
  },

  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }

    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};*/


function User() {
  const [showUserName, setUserName] = useState();
  const [showloginstatus, setloginstatus] = useState(global.userlogininfo.statas);
  const [showCertificate, setCertificate] = useState(false);
  
  const accessToken = null;
  if(!accessToken){
    axios.get('/getAccessToken').then(resp => {
      accessToken=resp.data;
      console.log('acctoken = '+accessToken);
    })
    .catch((err)=>{
      //console.log("err:"+err);
    });
  }
  
  
  const onSignoutSuccess = () => {
    alert("You have been logged out successfully");
    //console.clear();
    global.userlogininfo.statas = false
    console.log(global.userlogininfo.statas )
    setloginstatus(false)

  };
  const onSignoutFailure = (res) => {
    console.log('Signout Failed:', res);
  };
  
  
  function getOthersCert(){
    
    axios.post('/get_other_certificate',{
    
    }).then(resp => {
      
      console.log(resp.data);
  });
  }
  function getMyCertificate(){
    axios.post('/get_my_certificate',{
      access_token : accessToken,

  }).then((res) => {
    console.log(res.json)
    /*if(res.data){
      this.cert_data = res.data
      setCertificate(!showCertificate)
    }*/
  })
  .catch((err) => {
    console.log(err)
    
  }); 
    
  }


  return (
    
    <div className="App">
    
    <Layout>
     <Layout>

    <Content>
      <br/>
      <Title>Welcome User!</Title>
      <br/>
    <Space size="large">
        
        <Button size="large" onClick={getMyCertificate}>
          我的證書
        </Button>
        <Button size="large" onClick={getOthersCert}>
          查詢證書
        </Button>
        <Button size="large" onClick={clickMe}>
          分享證書
        </Button>
        
        
        <GoogleLogout
                    render={renderProps => (
                    <Button size="large" onClick={renderProps.onClick} disabled={renderProps.disabled}>登出</Button>
                    )}
                    clientId={clientId}
                    buttonText="Sign Out"
                    onLogoutSuccess={onSignoutSuccess}
                    onSignoutFailure={onSignoutFailure}
                >
                </GoogleLogout>
      { showloginstatus ?
          null
          : <Navigate to="/"/>
      }  
        </Space>
      </Content>
      </Layout>
      
      <Footer>
      <br/>
      <div id="autoDisplay">
      {showCertificate?
      <div className='aaa'>
      <Descriptions layout="horizontal">
    <br/>
      <Descriptions.Item label="Name" >YI-XUE,ZHUANG</Descriptions.Item><br /><br />
      <Descriptions.Item label="Birth" >20000915</Descriptions.Item><br /><br />
      <Descriptions.Item label="Date" >20230604</Descriptions.Item><br /><br />
      <Descriptions.Item label="Degree">bachelor</Descriptions.Item><br /><br />
      <Descriptions.Item label="Department" >CSIE</Descriptions.Item><br /><br />
      <Descriptions.Item label="President" >CH-MING,CHEN</Descriptions.Item><br /><br />
      <Descriptions.Item label="Institution">Aletheia University</Descriptions.Item><br /><br />
      <Descriptions.Item label="Expiration_Date" >00000000</Descriptions.Item><br /><br />
      </Descriptions>
      </div>
      :
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
      }
      </div>

      <p>Designed by AUCSIE</p>
      </Footer>

        </Layout>
  </div>
  
  )
};

export default User;
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
import parse from 'html-react-parser';


import { Collapse } from 'antd';

const { Panel } = Collapse;
const axios = axios_user();
const { Content , Footer} = Layout;
const { Title, Paragraph} = Typography;
const clientId = "1042995923118-56bteondv86u1gq4jdbsq2qleqb4e5c4.apps.googleusercontent.com";

// function clickMe() {
//   alert("Success!");
// }


function User(){
  function clickMe() {
    alert(accessToken);
    console.log(accessToken)
  }
  const [showUserName, setUserName] = useState();
  const [showloginstatus, setloginstatus] = useState(global.userlogininfo.statas);
  const [showCertificate, setCertificate] = useState(false);
  const [showCertData, setCertData] = useState();
  const [accessToken, setaccessToken] = useState(null);
  const [ShowOthersCert,setShowOthersCert] = useState(false);
  const [OthersCert, setOthersCert] = useState(null);
  const [ShowOthersCertData,setOthersCertData] = useState();
  console.log(JSON.parse(localStorage.getItem("userinfo")));
  // if(accessToken===null){
  //   axios.get('/getAccessToken').then(resp => {
  //     console.log("acctoken",resp.data)
  //     setaccessToken(localStorage.getItem("acctoken"));
      
  //     setUserName(JSON.parse(localStorage.getItem("userinfo")).name)
  //     //console.log('gacctoken = '+accessToken)
  //   })
  //   .catch((err)=>{
  //     console.log("err:"+err);
  //   });
  // }
  if(accessToken===null){
    setaccessToken(localStorage.getItem("acctoken"));
    setUserName(JSON.parse(localStorage.getItem("userinfo")).name)
  }
  const onSignoutSuccess = () => {
    alert("You have been logged out successfully");
    //console.clear();
    axios.get('/sign_out').then(resp => {
      //console.log(resp.data);
      
    })
    .catch((err)=>{
      console.log("err:"+err);
    });
    global.userlogininfo.statas = false
    //console.log(global.userlogininfo.statas )
    setloginstatus(false)
    setaccessToken(null);
  };
  const onSignoutFailure = (res) => {
    console.log('Signout Failed:', res);

  };
  function AutoDisplay(){
    return(
    <div id="autoDisplay">
    <Carousel autoplay>
      <div>
        <Image width={700}
          src="https://csie.au.edu.tw/var/file/52/1052/pictures/507/m/mczh-tw1000x1000_large9469_756704868140.jpg"
        />
      </div>
      <div>
        <Image width={700}
          src="https://csie.au.edu.tw/var/file/52/1052/pictures/240/m/mczh-tw1000x1000_large15034_519244718308.jpg"
        />
      </div>
      <div>
        <Image width={700}
          src="https://csie.au.edu.tw/var/file/52/1052/pictures/515/m/mczh-tw1000x1000_large15035_696029119003.jpg"
        />
      </div>
      <div>
        <Image width={700}
          src="https://csie.au.edu.tw/var/file/52/1052/pictures/608/m/mczh-tw1000x1000_large15036_469164619113.jpg"
        />
      </div>
      <div>
        <Image width={700}
          src="https://csie.au.edu.tw/var/file/52/1052/pictures/110/m/mczh-tw1000x1000_large15037_353318919159.jpg"
        />
      </div>
      <div>
        <Image width={700}
          src="https://csie.au.edu.tw/var/file/52/1052/pictures/550/m/mczh-tw1000x1000_large14995_960798487071.jpg"
        />
      </div>
      <div>
        <Image width={700}
          src="https://csie.au.edu.tw/var/file/52/1052/pictures/114/m/mczh-tw1000x1000_large14996_202953287273.jpg"
        />
      </div>
      <div>
        <Image width={700}
          src="https://csie.au.edu.tw/var/file/52/1052/pictures/389/m/mczh-tw1000x1000_large15038_296158019511.jpg"
        />
      </div>
      <div>
        <Image width={700}
          src="https://csie.au.edu.tw/var/file/52/1052/pictures/916/m/mczh-tw1000x1000_large15039_579163619645.jpg"
        />
      </div>
      <div>
        <Image width={700}
          src="https://csie.au.edu.tw/var/file/52/1052/pictures/816/m/mczh-tw1000x1000_large15040_115928819891.jpg"
        />
      </div>
      <div>
        <Image width={700}
        src="https://csie.au.edu.tw/var/file/52/1052/pictures/571/m/mczh-tw1000x1000_large15041_5325520096.jpg"
        />
        </div>
      <div>
        <Image width={700} 
        src="https://csie.au.edu.tw/var/file/52/1052/pictures/653/m/mczh-tw1000x1000_large15043_412559720798.jpg"
        />
      </div>
      </Carousel>
      </div>)
  }
  
  function getOthersCert(){
    
    setCertificate(false) 
    if(!ShowOthersCert){      
      axios.post('/get_others_certificate',{ 
        access_token : accessToken,
      }).then(resp => {  
        //let othersCertList = resp.data;
        //console.log("**************"+resp.data);
        if(resp.data.status ==="not certificate"){
          alert(resp.data.status);
          setShowOthersCert(false);
        }
        else{
          setOthersCert(resp.data);
          setShowOthersCert(true);
          console.log(OthersCert);
        }
        
      });
    }
    else{
      
      setShowOthersCert(!ShowOthersCert);
    }
  }
  
  function getMyCertificate(){
    
    setShowOthersCert(false);
    if(!showCertificate){
      
      //console.log("click get my cert:",accessToken)
      axios.post('/get_my_certificate',{
        access_token : accessToken,
      }).then((res) => {
        if(res.data.status==="not certificate"){
          alert(res.data.status);
        }
        else{
          if(res.data.name){
            let cert = {
              "name":res.data.name,
              "birth":res.data.birth,
              "date":res.data.date,
              "degree":res.data.degree,
              "department":res.data.department,
              "president":res.data.president,
              "institution":res.data.institution,
              "expiration_Date":res.data.expiration_date,
              "JsonDataHex":res.data.jsonHex,
              "signature":res.data.signature
            }
            setCertData(cert);
            setCertificate(!showCertificate)
          }
        }
      })
      .catch((err) => {
        console.log(err)
        
      });
      }
    else{
      setCertificate(!showCertificate)
    }
  }
  const CertVisitable = (props) => {
    let arr=[];
    for(let i=0;i<Object.keys(props).length;i++){
      arr.push(props[i]);
    }
    const listItems = arr.map((number) =>
      <Panel header={number.name} key={arr.indexOf(number)}><p><div className='aaa'>
      <Descriptions layout="horizontal"><br/>
      <Descriptions.Item label="Name" >{number.name}</Descriptions.Item><br /><br />
      <Descriptions.Item label="Birth" >{number.birth}</Descriptions.Item><br /><br />
      <Descriptions.Item label="Date" >{number.date}</Descriptions.Item><br /><br />
      <Descriptions.Item label="Degree">{number.degree}</Descriptions.Item><br /><br />
      <Descriptions.Item label="Department" >{number.department}</Descriptions.Item><br /><br />
      <Descriptions.Item label="President" >{number.president}</Descriptions.Item><br /><br />
      <Descriptions.Item label="Institution">{number.institution}</Descriptions.Item><br /><br />
      <Descriptions.Item label="Expiration_Date" >{number.expiration_date}</Descriptions.Item><br /><br />
      <Descriptions.Item label="JsonDataHex" span={2}><Paragraph copyable>{number.jsonHex}</Paragraph></Descriptions.Item><br />
      <Descriptions.Item label="Signature" span={2}><Paragraph copyable>{number.signature}</Paragraph></Descriptions.Item><br /><br />
      </Descriptions>
      </div></p></Panel>
    );
    // console.log(arr);
    // const listItems = arr.map((number) =>
    //   number
    // );
    // console.log(listItems);
    
    // const listItems = props.map((number) =>
    //   <Panel header="This is panel header 1" key="1"><p>gg</p></Panel>
    // );
  
    return(
      <div>
        <Collapse accordion>
          {listItems}
        </Collapse>
      </div>
    )
  }
  const CertFormat = (props) => {
    //cert = JSON.parse(cert);
    //console.log(cert)
    return (<div className='aaa'>
    <Descriptions layout="horizontal"><br/>
    <Descriptions.Item label="Name" >{props.name}</Descriptions.Item><br /><br />
    <Descriptions.Item label="Birth" >{props.birth}</Descriptions.Item><br /><br />
    <Descriptions.Item label="Date" >{props.date}</Descriptions.Item><br /><br />
    <Descriptions.Item label="Degree">{props.degree}</Descriptions.Item><br /><br />
    <Descriptions.Item label="Department" >{props.department}</Descriptions.Item><br /><br />
    <Descriptions.Item label="President" >{props.president}</Descriptions.Item><br /><br />
    <Descriptions.Item label="Institution">{props.institution}</Descriptions.Item><br /><br />
    <Descriptions.Item label="Expiration_Date" >{props.expiration_Date}</Descriptions.Item><br /><br />
    <Descriptions.Item label="JsonDataHex" span={2}><Paragraph copyable>{props.JsonDataHex}</Paragraph></Descriptions.Item><br />
    <Descriptions.Item label="Signature" span={2}><Paragraph copyable>{props.signature}</Paragraph></Descriptions.Item><br /><br />
    </Descriptions>
    </div>)
  };

  return (
    
    <div className="App">
    
    <Layout>
     <Layout>

    <Content>
      <br/>
      <Title>Welcome {showUserName}!</Title>
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
        ></GoogleLogout>
      { showloginstatus ?
          null
          : <Navigate to="/"/>
      }  
        </Space>
      </Content>
      </Layout>
      
      <Footer>
      <br/>
      <div id="showcert">
      {showCertificate?
      <CertFormat {...showCertData} />:
      ShowOthersCert? 
      <CertVisitable {...OthersCert} />:
      
      <AutoDisplay />
      }
      </div>
      <p>Designed by AUCSIE</p>
      
      </Footer>

        </Layout>
  </div>
  
  )
};

export default User;
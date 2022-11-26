import React from 'react';
import { Button,Space} from 'antd';
import './App.css';
import { Layout , Row,Col} from 'antd';
import { Typography } from 'antd';
import { Carousel } from 'antd';
import { Image } from 'antd';
import { GoogleLogout } from "react-google-login";
import { useState } from 'react';
import { Navigate} from "react-router-dom"
import '../logininfo.js';
import {axios_user} from '../Axios'
import { Descriptions } from 'antd';
// import parse from 'html-react-parser';
// import ReactModal from 'react-modal';
import { Collapse } from 'antd';
import { Input } from 'antd';
import { Select } from 'antd';
const { Option } = Select;



const { Panel } = Collapse;
const axios = axios_user();
const { Content , Footer} = Layout;
const { Title, Paragraph} = Typography;
const clientId = "1042995923118-56bteondv86u1gq4jdbsq2qleqb4e5c4.apps.googleusercontent.com";

function User(){

  const handledateChange = (value) => {
    //console.log(`selected ${value}`);
    localStorage.setItem("date",value)
  };
  const handleemailChange = (value) => {
    //console.log(`email ${value.target.value}`);
    localStorage.setItem("email",value.target.value)
  };
  const [showUserName, setUserName] = useState();
  const [showloginstatus, setloginstatus] = useState(global.userlogininfo.statas);
  const [showCertificate, setCertificate] = useState(false);
  const [showCertData, setCertData] = useState();
  const [accessToken, setaccessToken] = useState(null);
  const [ShowOthersCert,setShowOthersCert] = useState(false);
  const [OthersCert, setOthersCert] = useState(null);
  const [ShowShareMyCert,setShareMyCert] = useState(false);
  const [SharedCertData,setSharedCertData] = useState(null);

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
    global.userlogininfo.statas = false;
    localStorage.setItem("isLogIn",false);
    //console.log(global.userlogininfo.statas )
    setloginstatus(false);
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
    setShareMyCert(false);
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
    setShareMyCert(false);
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
  function getShareCertPage(){
    setCertificate(false) 
    setShowOthersCert(false);
    if(!ShowShareMyCert){      
      setShareMyCert(!ShowShareMyCert);
    }
    else{
      setShareMyCert(!ShowShareMyCert);
    }
  }

  const CertVisitable = (props) => {
    let arr=[];
    for(let i=0;i<Object.keys(props).length;i++){
      arr.push(props[i]);
    }
    const listItems = arr.map((number) =>
      <Panel header={number.name} key={arr.indexOf(number)}>
      <div className='aaa'>
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
      </div>
      </Panel>
    );

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
  const getSharedEmail = () =>{
    axios.post('/shared_cert',{ 
      access_token : accessToken,
    }).then(resp => { 
      console.log(resp.data);
      setSharedCertData(resp.data)
    }).catch(err=>{
      console.log(err);
    }); 
      
  }
    
  
  const Sharemycert = () => {
   
    return (
      <Layout>
        <div className='title'>
          <Title>新增證書使用者</Title>
        </div>
        <Row className='row'>
        <Col span={12}>
        <div className='h1'>
        <h3>請輸入電子信箱</h3>
        <Input placeholder="Email" style={{
          width: 500,
          marginLeft: 5,
        }} 
        onChange={handleemailChange}
        />      
        </div>
        </Col>       
        <Col span={6}>
        <div className='h2'>
        <h3>請選擇天數</h3>
        <Select
          defaultValue="Days"
          style={{
            width: 200,
          }}
          onChange={handledateChange}
        >
        <Option value="5">5</Option>
        <Option value="10">10</Option>
        <Option value="15">15</Option>
        <Option value="30">30</Option>
        <Option value="90">90</Option>
        </Select>
        </div>
        </Col>
        <Col span={6}>
        <div className='h4'>
        <h3><br/></h3>
        <Button  onClick={addSharePersion}>
          提交
        </Button>
        </div>
        </Col>
        </Row>
      <br/>
      <br/>
        <div className='share'>
        <Button  onClick={getSharedEmail}>
          已分享的證書
        </Button><br/>
        {SharedCertData}
        </div>
      <div className='qqq'>
        <br/>
        <br/>   
      
      </div>
      </Layout>
    );
  }
  const addSharePersion = () =>{
    let email = localStorage.getItem("email");
    let date = localStorage.getItem("date")
    axios.post('/share_my_cert',{ 
      access_token : accessToken,
      createEmail : email,
      date : date
    }).then(resp => {  
      if(resp.data.status==="insertAgressselect success"){
        alert(resp.data.status);
      }
      else{
        alert(resp.data.status);
      }
      
    }).catch(err=>{
      alert(err);
    })

  }
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
        <Button size="large" onClick={getShareCertPage}>
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
      ShowShareMyCert?
      <Sharemycert />
      :<AutoDisplay />
      }
      </div>
      <p>Designed by AUCSIE</p>
      
      </Footer>

        </Layout>
  </div>
  
  )
};

export default User;
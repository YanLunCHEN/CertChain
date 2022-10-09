
import './App.css';
import { Layout, Space } from 'antd';
import { Button } from 'antd';
import { Typography,Card,Col, Row  } from 'antd';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {  useNavigate } from 'react-router-dom';
import React from 'react';



const { Header, Content } = Layout;
const { Title } = Typography;


/*function clickins() {
  alert("Success institution!");
  history.push('/the/path')
}*/
function clickuser() {
    //alert("Success user!");
    //<Navigate to="/Userlogin"/>
  }


const App = () => {
    const navigate = useNavigate();
  return(
<>
<div className="App">
    <Layout>
      <Layout>
      <Content>
        <div className="choose">
          <br/>
        <Title>首頁</Title>
          <h1>--------請選擇您的身分---------</h1>
        </div>

        <div className="space">
          <Space align="baseline">
          <Button style={{height: '80px', width : '130px'}} onClick={() => navigate('/institutionlogin')}>發證者</Button>
          <Button style={{height: '80px', width : '130px'}} onClick={() => navigate('/Userlogin')}> 查證者</Button>
          </Space>
        </div>
      <p>
      </p>
        <div className="site-card-wrapper">
          
        <Row gutter={16}>
          <Col span={12}>
            <Card title="發證者" bordered={false}>
              <h1>屬於發證單位</h1>
            </Card>
          </Col>

          <Col span={12}>
            <Card title="查證者" bordered={false}>
              <h1>屬於企業端、學生端</h1>
            </Card>
          </Col>
        </Row>
  </div>

      </Content>
      </Layout>
      <p>Designed by AUCSIE</p>
    </Layout>
    </div>
  </>
  );
};

export default App;
import { Layout } from 'antd';
import React from 'react';
import { Button, Form, Input } from 'antd';
import { Typography } from 'antd';
const { Content } = Layout;
const { Title } = Typography;


const Registe = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Layout>
      <Content>
      <div className='aaa'>
        <div className='h1'>
        <br />
        <Title>申請成為發證機構</Title>
          </div>
        <br />
      <Form
      name="basic"
      labelCol={{
        span: 8,
      
      }}
      wrapperCol={{
        span: 8,

      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="代表機構單位"
        name="Represent Institution"
        rules={[
          {
            required: true,
            message: 'Please input your represent institution!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="聯絡人姓名"
        name="Contact Person"
        rules={[
          {
            required: true,
            message: 'Please input your name!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="聯絡人電子信箱"
        name="Contact Email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="聯絡人電話"
        name="Contact Phone"
        rules={[
          {
            required: true,
            message: 'Please input your phone number!',
          },
        ]}
      >
        
        <Input />
      </Form.Item>


      <Form.Item 
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
        提交
    </Button>
      </Form.Item>
    </Form>
    <div className='qqq'>
    <p>Designed by AUCSIE</p>
    </div>
    </div>
      </Content>
    </Layout>
    
  );
};
export default Registe;
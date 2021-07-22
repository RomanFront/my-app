import React, { Component } from 'react';
import { Layout, Form, Input, Button } from 'antd';
import s from './Login.module.css';
import 'antd/dist/antd.css';
import { fire } from '../../services/firebase';

const { Content } = Layout;

class LoginPage extends Component {
  onFinish = ({email, password}, type) => {
    console.log(email, password, type);
    if (type == 'signUp') {      
      fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log('####: res', res);
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
    } else {
      fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log('####: res', res);
      })
    }
    
  }

  onFinishFailed = (errorMsg) => {
    console.log('####: errorMsg', errorMsg)
  }

  renderForm = () => {
    let type = 'signIn';
    return (
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={({email, password}) => this.onFinish({email, password}, type)}
        onFinishFailed={this.onFinishFailed}
      >
        <Form.Item
          label="E-mail"
          name="email"
          rules={[{ required: true, message: 'Please input your e-mail!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button style={{marginLeft: '20px'}} 
          type="default" htmlType="submit" onClick={() => {
            type = 'signUp';
          }}>
            Register
          </Button>
        </Form.Item>
      </Form>
    )
  }

  render() {

    return (
      <Layout>
        <Content>
          <div className={s.root}>
            <div className={s.form_wrap}>
              123123123@gmail.com : testtest
              <br />
              first@gmail.com : testtest
              <br />
              <br />
              { this.renderForm() }
            </div>
          </div>
        </Content>
      </Layout>
    )
  }
}

export default LoginPage;
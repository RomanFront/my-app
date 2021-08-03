import React, { Component } from 'react';
import { Layout, Form, Input, Button } from 'antd';
import s from './Login.module.css';
import 'antd/dist/antd.css';
import { withFirebase } from '../../context/firebaseContext';

const { Content } = Layout;

class LoginPage extends Component {
  onFinish = ({email, password}, type) => {
    const { signWithEmail, registerWithEmail } = this.props.firebase;

    console.log(email, password, type);
    if (type === 'signUp') {
      registerWithEmail(email, password)
      .then(res => {
        console.log('####: res', res);
        localStorage.setItem('user', JSON.stringify(res.user.uid));
        this.props.history.push('/home');
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
    } else {
      signWithEmail(email, password)
        .then(res => {
          console.log('####: res', res);
          localStorage.setItem('user', JSON.stringify(res.user.uid));
          this.props.history.push('/home');
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
          <Button type="primary" htmlType="submit" onClick={() => {
            type = 'signIn';
          }}>
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

export default withFirebase(LoginPage);
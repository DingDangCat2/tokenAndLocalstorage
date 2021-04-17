import { message,Form, Input, Button, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import React from 'react';
import ajax from './ajax';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

class App extends React.Component {

  constructor(props){
    super(props)
  this.state={};
  axios({url:'/token',
  method:'post'}).then(function(res){
  if(res.status===200 && res.data!==' '){
    message.success('用户登录成功！');
  window.location.href='home';
  }else{
    return false;
  }
  })
  }
   onFinish (values) {
    let storage = window.localStorage;
ajax('/login',values,'post').then(
  function(res){
    if(res.status===200 && res.data !==" "){
      window.location.href='home';//不加反斜杠，表示基于当前路由的同级路由如当前路由是localhost:3000/user/login,跳转后是localhost:3000/user/home,加了反斜杠表示localhost:3000/home
    }

    storage.setItem('token',res.data);//setitem,getitem,clear,remove
    //请求拦截器的作用是在每个请求中都加入token令牌，在需要用户数据验证时，后端对其进行验证，避免每次请求都需要在请求头中放入令牌。应保证拦截器是在全局作用域下运行，才能对所有axios请求进行操作！
    // axios.interceptors.request.use(function(config){
    //   config.withCredentials = true//携带cookie
    //     config.headers = {
    //       token : storage.getItem('token')
    //     }
    //     return config;
    // },function(err){
    //   return Promise.reject(err);
    // })
  }
)
  };



   onFinishFailed (errorInfo)  {
    console.log('Failed:', errorInfo);
  };
methods(){
axios({
  headers:{'Content-type':'application/json'},
  method:'get',
  url:'/user',
  params:{},
})

}
render(){
  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={this.onFinish.bind(this)}
      onFinishFailed={this.onFinishFailed.bind(this)}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
   
    </Form>
  );
};
}
  
export default App;
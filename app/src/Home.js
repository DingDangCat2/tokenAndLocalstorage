import 'antd/dist/antd.css';
import React from 'react';
import User1 from './User1';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Link, Route,Redirect, Switch } from 'react-router-dom';
import User2 from './user2';
import User3 from './user3';
import ajax from './ajax';
import Username from './username';
const { Header, Content, Footer } = Layout;
class Home extends React.Component{
    constructor(props){
        super(props);
       this.state={
'token':window.localStorage.getItem('token'),
       } 
    }

   render(){
       return(
       <Layout className="layout">
         
       <Header>
         <div className="logo" />
         <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
           <Menu.Item key="1"><Link to='home'>user</Link></Menu.Item>
           <Menu.Item key="2"><Link to='user2'>user2</Link></Menu.Item>
           <Menu.Item key="3"><Link to='user3'>User3</Link></Menu.Item>
           <Username></Username>
         </Menu>
         
       </Header>
       <Content style={{ padding: '0 50px' }}> 
         <Breadcrumb style={{ margin: '16px 0' }}>
           <Breadcrumb.Item>Home</Breadcrumb.Item>
           <Breadcrumb.Item>List</Breadcrumb.Item>
           <Breadcrumb.Item>App</Breadcrumb.Item>
         </Breadcrumb>
         <div className="site-layout-content">
           <Redirect to='home'></Redirect>
           <Route path='home' component={User1}></Route>
           <Route path='user2'  component={User2}></Route>
     <Route path='user3' component={User3}></Route>
     </div>
       </Content>
       <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
     </Layout>

       )
   } 
}
export default Home;
import React from 'react';
import {Button, message} from 'antd';
import ajax from './ajax';
import './css/username.css';
import 'antd/dist/antd.css';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
class Username extends React.Component{
constructor(props){
super(props)
this.state={
    'user':'login',
    'out':''
}
}
delete(){
    window.localStorage.removeItem('token');
            message.success('quit ok');
        window.location.reload();
}

login(){
    if(this.state.out){
      
        message.success('xjf!!!');
    }else{
        window.location.href='/login';
    }
}

componentDidMount(){
    axios({
        url:'/user',
        method:'post',
    }).then((res)=>{
if(res.status===200 && res.data!==' '){
this.setState({
    'user':"welcome: "+ res.data.username,
    'out':'退出',
})
}else{
    this.setState({'user':'login',
'out':''})
}
    })
}
    render(){
        return(
            <div className="username">
<Button className='btn' onClick={this.login.bind(this)}>{this.state.user}</Button> 
<Button className='btn' onClick={this.delete.bind(this)}>{this.state.out}</Button> 

            </div>
        )
    }
}
export default withRouter(Username);
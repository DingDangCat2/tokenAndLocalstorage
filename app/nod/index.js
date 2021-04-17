const express =require('express');
const body=require('body-parser');
const cookie=require('cookie-parser');
const jwt=require('jsonwebtoken');
var app=express();
app.use(body.urlencoded({extended:false}));
app.use(body.json());
app.use(cookie());
// app.post('/login',function(req,res){
//     //对用户的数据进行数据库查询，如果存在则分发给浏览器cookie.cookie可设置过期时间。默认关闭浏览器后失效
// res.cookie('username',req.body.username,{maxAge:60*1000});
// res.cookie('password',req.body.password);
// res.statusCode=200;
// res.send('ok');
//     });
app.post('/login',function(req,res){
    //先和数据库的信息进行，比对，如果存在则生成对应token。否则直接返回错误.
    const token=jwt.sign( { 'username':req.body.username,'password':req.body.password},'tokenKey',{expiresIn:'600000ms'})
    res.statusCode=200;
    res.send(token);
})
//   app.get('/home',function(req,res){
//       if(req.cookies){
//           res.clearCookie('username');
//           res.clearCookie('password');
//           res.send('ok');
//       }
//   })
app.post('/token',function(req,res){
    const result=jwt.verify(req.headers.token,'tokenKey');
    if(result){
        res.statusCode=200;
res.send('ok')
    }else{
        res.statusCode=205;
        res.send(' ')
    }
})

app.post('/user',function(req,res){
    jwt.verify(req.headers.token,'tokenKey',(err,decodeed)=>{
if(err){
    res.statusCode=205;
    res.send('')
}else{
    if(decodeed){    res.statusCode=200;
        res.send(decodeed);}
        else{
            res.statusCode=205;
            res.send('');
        }

}
    })
})

app.listen(8081,function(){console.log("running")});
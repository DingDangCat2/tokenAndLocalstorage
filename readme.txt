此组件是针对用户免密支付的一种处理方式，使用了token令牌保存用户的信息到localstorage,
1.在app.js中，首先检测当前用户的token是否存在，若存在，则不需要再输入信息进行登录（直接跳转到用户首页） .若不存在，则 用户输入登录，后端接受到用户信息后
对信息进行数据库比对，如果存在则根据用户名和密码生成一个token（使用中间件jsonwebtoken），并传给前端，前段 在得到token后保存在localstorage
中，以便使用！
2.网站中所有需要用户数据信息的地方都应该拿到本地的token传入后端进行解析。如果解析 成功则返回数据，如果不成功则提示用户进行登录。token因为需要在很多的
请求中被传到后端 进行解析比对，所以使用了请求拦截（axios.）——
axios.interceptors.request.use(function(config){
  config.withCredentials = true//携带cookie
    config.headers = {
      token : window.localStorage.getItem('token')
    }
    return config;
},function(err){
  return Promise.reject(err);
})
——请求拦截和响应拦截的作用是在请求发送前和接受响应后对某些数据进行操作，比如请求头，请求体，响应数据。（本项目中在用户输入进行login的时候并不需要token）
——在设置请求拦截和响应拦截的时候，其起到的作用主要是：对页面所有的请求都进行操作，而不是操作个别请求，如果仅仅只操作个别请求，直接设置难道不是更好吗？？？
所以要设置全局的请求拦截或者响应拦截！
3.在username.js中，前端通过请求拦截将token发送给后端进行解析比对（jsonwebtoken.verify(token,token秘钥(秘钥在后端生成token的时候设置！))）,成功则传回解析后的数据，
供页面使用，失败则提醒用户登录。
4.jsonwebtoken的使用：
jwt=require('jsonwebtoken);
  const token=jwt.sign( { 'username':req.body.username,'password':req.body.password},'tokenKey',{expiresIn:'600000ms'})
    res.statusCode=200;
  //生成token，exporesIn为过期时间，单位：ms/h/days/d  eg:1000, "2 days", "10h", "7d"
const result=jwt.verify(req.headers.token,'tokenKey');
  //对token进行解析！
5.localstorage和sessionstorage和cookie和session
一是持久化客户端存储，除非你主动进行删除清理，否则长期存在。
二是在打开页面到关闭浏览器窗口期间有效。session——一段时间。
三也是一种客户端储存方式，但是区别在于：1.cookie只能存储4k数据，2.cookie每次都需要传给后端，后端根据这个cookie判断状态，这样会浪费带宽。
服务端分发cookie：
// res.cookie('username',req.body.username,{maxAge:60*1000});单位：ms
// res.cookie('password',req.body.password);
//还可以对路径进行配置。...
四是存储再服务器端，后端根据session的数据响应前端的数据，当存在多个用户同时使用时，服务器端也会同时使用多个session进行存储，浪费服务器性能。
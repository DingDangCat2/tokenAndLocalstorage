import axios from 'axios';
axios.interceptors.request.use(function(config){
  config.withCredentials = true//携带cookie
    config.headers = {
      token : window.localStorage.getItem('token')
    }
    return config;
},function(err){
  return Promise.reject(err);
})
export default function Ajax(url,data={},type){
    if(type==='GET'){
 return axios.get(url, {
        params: data
      });
    }else{
       return axios({
         headers: {
            'Content-Type':'application/json'
        },
         method: 'post',
         url: url,
         data: data
       });
    }
}

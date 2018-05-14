import axios from 'axios'
import { Message,MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API,//http://192.168.17.61:3000' ,///, api的base_url
  timeout: 20000, // 请求超时时间
  // headers:{
  //   'Content-Type':'application/x-protobuf',
  //   post:{
  //     'Content-Type':'application/x-protobuf'
  //   }
  // },
  // responseType:'arraybuffer',
  // transformRequest: [ (data)=> {
  //   // let config = Object.assign({}, data, { type: 'login' });
  //   // // 对 data 进行任意转换处理
  //   // console.log(config);
  //   const accountReq = zpa.zhibobao.personal.account.AccountLoginRequest;
  //   let accData = {
  //     mobile:"15158161535",
  //     code:"999999",
  //     type:"0"
  //   };
  //
  //   const buff = accountReq.encode(accountReq.fromObject(accData));
  //   return buff.finish();
  // }],
  // transformResponse: [ (data)=> {
  //   // 对 data 进行任意转换处理
  //   const uint8arr = new Uint8Array(Buffer.from(data));
  //   const accountRes = zpa.zhibobao.personal.account.AccountLoginResponse.decode(uint8arr);
  //   console.log(data);
  //   console.log(accountRes);
  //   console.log(accountRes.toJSON());
  //   return accountRes;
  // }]
});


// request拦截器
service.interceptors.request.use(config => {
  config.headers['Authorization'] = 'Bearer ' + getToken();
  return config
}, error => {
  Promise.reject(error)
});

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code === 500) {
       MessageBox.confirm('您的账号在其他地方登陆', '温馨提示', {
         confirmButtonText: '重新登录',
         cancelButtonText: '取消',
         type: 'warning'
       }).then(() => {
         store.dispatch('FedLogOut').then(() => {
           location.reload();// 为了重新实例化vue-router对象 避免bug
         });
       })
    }else{
      return response
    }

  },
  error => {
    console.log('err' + error)// for debug
    return Promise.reject(error)
  })

export default service

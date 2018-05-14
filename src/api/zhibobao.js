import axios from 'axios'
import { getToken,getCookie } from '@/utils/auth'
import { Message,MessageBox } from 'element-ui'
import store from '@/store'
import zhibobaoGateway from 'zhibobao-js';
 const apiInstance = function () {
    //全局的 axios 默认值
   const axios_service = axios.create({
      baseURL: 'http://v4.api.zhibobao.com' ,// api的base_urlhttp://v4.api.zhibobao.com
      timeout: 20000, // 请求超时时间
      headers:{
        "X-Token":'Bearer ' + getToken(),
        post:{
          'Content-Type':'application/x-protobuf'
        }
      }
    });
    let api = new zhibobaoGateway({
      invoker :function (server, service ,method, request) {
        let url = "/"+ server + "/"+service + '/' +method;
        if(server === 'zhibobao.personal.account') {
          try{
            request.appType =13;
          }catch(err){
            request = {
              appType:13
            }
          }
        }
        axios_service.defaults.headers['X-Token'] = 'Bearer ' + getToken();
        return axios_service.post(url,request).then( function(resp) {
          let code = parseInt(resp.headers['x-err-code']) || 0;
          let message = resp.headers['x-err-message'] || '';
          if(resp.status === 500){
            Message.error(message||"操作失败，请刷新重试");
            return false
          }
          if(resp.status === 200 && code === 500){
            MessageBox.confirm('信息获取失败，请重新登录', '温馨提示', {
              confirmButtonText: '重新登录',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              store.dispatch('FedLogOut').then(() => {
                location.reload();// 为了重新实例化vue-router对象 避免bug
              });
            })
            return false;
          }

          if(resp.status === 200 && (code !== 0 || message)){
            try{
              let {code, message} = resp.data;
              Message.error(message||"操作失败，请刷新重试");
            }catch (err){
              console.error(err);
            }
            return false;
          }
          return {
            data:resp.data,
            code:code,
            message:message
          };
        }).catch(()=>{
          return false
        })
      }
    });
    return api;
};
const api = apiInstance();
export default api;

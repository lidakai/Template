import request from '@/utils/request'
import zpa from 'zhibobao-personal-account'
export function loginByUsername(data) {
  return request({
    url: '/api/v1/account/auth/login',
    method: 'post',
    data
  })
}


export function loginByPassward(data) {
  return request({
    url: '/api/v1/account/auth/pwlogin',
    method: 'post',
    data
  })
}


export function getUserInfo() {
  return request({
    url: '/api/v1/account/info/get',
    method: 'get'
  })
}

export function bindRoom(data) {
  return request({
    url:'/api/v1/account/anchor/bind',
    method:'post',
    data
  })
}



export function loginByWechat(data) {
  return request({
    url: '/api/v1/account/wechat/login',
    method: 'post',
    data
  })
}

export function loginByWeibo() {
  return request({
    url: '/api/v1/account/weibo/login',
    method: 'post',
    data
  })
}

export function loginByQQ() {
  return request({
    url: '/api/v1/account/qq/login',
    method: 'post',
    data
  })
}

export function bindMobile(data) {
  return request({
    url:'/api/v1/account/mobile/bind',
    method:'post',
    data
  })
}

export function unbindThird(data) {
  return request({
    url:'/api/v1/account/third/unbind',
    method:'post',
    data
  })
}

export function logout(data) {
  return request({
    url:'/api/v1/account/auth/logout',
    method:'get',
  })
}

export function pbTest(data) {
  return request({
    url:'/zhibobao.personal.account/Account/pwLogin',
    method:'post',
    data
  })
}

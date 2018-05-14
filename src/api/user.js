import request from '@/utils/request'

export function checkOldMobile(data) {
  return request({
    url: '/api/v1/account/mobile/check',
    method: 'post',
    data
  });
}

export function getCheckCode(data) {
  return request({
    url: '/api/v1/account/auth/code',
    method: 'post',
    data
  });
}

export function modifyNewMobile(data) {
  return request({
    url: '/api/v1/account/mobile/modify',
    method: 'post',
    data
  });
}

export function getAnchorInfo() {
  return request({
    url:'/api/v1/data/anchor/info',
    method:'get',
  })
}


export function uploadAvatar(data) {
  return request({
    url:'/api/v1/account/image/put',
    method:'post',
    data
  })
}

export function modifyInfo(data) {
  return request({
    url:'/api/v1/account/info/modify',
    method:'post',
    data
  })
}

export function bindRoom(data) {
  return request({
    url:'/api/v1/account/anchor/bind',
    method:'post',
    data
  })
}

export function  unbindRoom() {
  return request({
    url:'/api/v1/account/anchor/unbind',
    method:'get',
  })
}

export function modifyPassword(data) {
  return request({
    url:'/api/v1/account/auth/pw/modify',
    method:'post',
    data
  })
}




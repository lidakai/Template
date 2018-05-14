import request from '@/utils/request'

export function trend (data) {
  return request({
    url:'/api/v1/data/trend',
    method:'post',
    data
  })
}

export function hot (data) {
  return request({
    url:'/api/v1/data/hot',
    method:'post',
    data
  })
}

export function record (data) {
  return request({
    url:'/api/v1/data/record',
    method:'post',
    data
  })
}



export function rank (data) {
  return request({
    url:'/api/v1/data/rank',
    method:'post',
    data
  })
}

//获取今日概况数据
export function generalForm () {
  return request({
    url:'/api/v1/data/form',
    method:'get',
  })
}

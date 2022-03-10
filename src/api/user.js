import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-element-admin/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: {token}
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}


export function getCode(params) {
  return request({
    url: '/getCode',
    method: 'get',
    params
  })
}
export function getToken(params) {
  return request({
    url: '/getToken',
    method: 'get',
    params
  })
}

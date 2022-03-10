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
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}

// 获取二维码
export function getCode(params) {
  return request({
    url: '/getCode',
    method: 'get',
    params
  })
}
// 获取token
export function getToken(params) {
  return request({
    url: '/getToken',
    method: 'get',
    params
  })
}
// 获取uuid
export function getUUid(params) {
  return request({
    url: '/uuid',
    method: 'get',
    params
  })
}


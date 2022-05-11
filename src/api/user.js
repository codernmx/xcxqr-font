import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-element-admin/user/login',
    method: 'post',
    data
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
    url: '/api/getCode',
    method: 'get',
    params
  })
}

// 获取token
export function getToken(params) {
  return request({
    url: '/api/getToken',
    method: 'get',
    params
  })
}

// 获取uuid
export function getUUid(params) {
  return request({
    url: '/api/uuid',
    method: 'get',
    params
  })
}

// 获取用户列表
export function getUserList(params) {
  return request({
    url: '/api/bjcx/user/list',
    method: 'get',
    params
  })
}

/* 发送验证码 */
export function sendMail(data) {
  return request({
    url: '/api/send/email',
    method: 'POST',
    data
  })
}

/* 验证码登录 */
export function codeLogin(data) {
  return request({
    url: '/api/code/login',
    method: 'POST',
    data
  })
}
/* 获取角色 */
export function getRoles(params) {
  return request({
    url: '/api/get/user/info',
    method: 'GET',
    params
  })
}

// 添加 用户
export function addUser(data) {
  return request({
    url: '/api/bjcx/user/insert',
    method: 'POST',
    data
  })
}
// 修改 用户
export function updateUser(data) {
  return request({
    url: '/api/bjcx/user/update',
    method: 'POST',
    data
  })
}
// 删除 用户
export function delUser(params) {
  return request({
    url: '/api/bjcx/user/delete',
    method: 'get',
    params
  })
}

/* 日志相关 */

// 获取IP列表
export function getLogList(params) {
  return request({
    url: '/api/bjcx/log/list',
    method: 'get',
    params
  })
}

/* 附件相关 */

// 获取附件列表
export function getFileList(params) {
  return request({
    url: '/api/bjcx/file/list',
    method: 'get',
    params
  })
}


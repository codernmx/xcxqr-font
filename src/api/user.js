import request from '@/utils/request'

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

/* 发送验证码 */
export function sendCode(data) {
  return request({
    url: '/api/send/code',
    method: 'POST',
    data
  })
}
export function sendEmail(data) {
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
/* 获取用户的所有角色信息 */
export function getRoles(params) {
  return request({
    url: '/api/get/user/info',
    method: 'GET',
    params
  })
}
/* 获取配置信息 */
export function getConfigApi() {
  return request({
    url: '/api/get/config',
    method: 'get'
  })
}

/* ----------------------用户相关---------------- */
/* ----------------------用户相关---------------- */
/* ----------------------用户相关---------------- */

// 获取用户列表
export function getUserList(params) {
  return request({
    url: '/api/bjcx/user/list',
    method: 'get',
    params
  })
}
/* 获取用户下角色信息 */
export function getUserRoleById(params) {
  return request({
    url: '/api/bjcx/user/detail',
    method: 'get',
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

/* ----------------------角色相关---------------- */
/* ----------------------角色相关---------------- */
/* ----------------------角色相关---------------- */

// 获取用户列表
export function getRoleList(params) {
  return request({
    url: '/api/bjcx/role/list',
    method: 'get',
    params
  })
}
// 添加 用户
export function addRole(data) {
  return request({
    url: '/api/bjcx/role/insert',
    method: 'POST',
    data
  })
}
// 修改 用户
export function updateRole(data) {
  return request({
    url: '/api/bjcx/role/update',
    method: 'POST',
    data
  })
}
// 删除 用户
export function delRole(params) {
  return request({
    url: '/api/bjcx/role/delete',
    method: 'get',
    params
  })
}

/* ----------------------日志相关---------------- */
/* ----------------------日志相关---------------- */
/* ----------------------日志相关---------------- */

// 获取IP列表
export function getLogList(params) {
  return request({
    url: '/api/bjcx/log/list',
    method: 'get',
    params
  })
}

/* ----------------------附件相关---------------- */
/* ----------------------附件相关---------------- */
/* ----------------------附件相关---------------- */

// 获取附件列表
export function getFileList(params) {
  return request({
    url: '/api/bjcx/file/list',
    method: 'get',
    params
  })
}
/* 删除附件 */
export function delFile(data) {
  return request({
    url: '/api/bjcx/file/del',
    method: 'post',
    data
  })
}
/* 修改文件名 */
export function fileUpadte(data) {
  return request({
    url: '/api/bjcx/file/update',
    method: 'post',
    data
  })
}


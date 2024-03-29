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
export function getConfigApi(params) {
  return request({
    url: '/api/get/config',
    method: 'get',
    params
  })
}

/* ----------------------用户相关---------------- */
/* ----------------------用户相关---------------- */
/* ----------------------用户相关---------------- */

// 获取用户列表
export function getUserList(params) {
  return request({
    url: '/api/applet/user/list',
    method: 'get',
    params
  })
}

// 获取邀请了用户的列表
export function getUserInviteList(params) {
  return request({
    url: '/api/applet/user/list/have/children',
    method: 'get',
    params
  })
}

/* 获取用户下角色信息 */
export function getUserRoleById(params) {
  return request({
    url: '/api/applet/user/detail',
    method: 'get',
    params
  })
}

/* 获取用户统计信息 */
export function getUserTotal(params) {
  return request({
    url: '/api/applet/user/total',
    method: 'get',
    params
  })
}

// 添加 用户
export function addUser(data) {
  return request({
    url: '/api/applet/user/insert',
    method: 'POST',
    data
  })
}
// 修改 用户
export function updateUser(data) {
  return request({
    url: '/api/applet/user/update',
    method: 'POST',
    data
  })
}
/* 修改用户状态 */
export function updateUserStatus(data) {
  return request({
    url: '/api/applet/user/updateStatus',
    method: 'POST',
    data
  })
}
// 删除 用户
export function delUser(params) {
  return request({
    url: '/api/applet/user/delete',
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
    url: '/api/applet/role/list',
    method: 'get',
    params
  })
}
// 添加 用户
export function addRole(data) {
  return request({
    url: '/api/applet/role/insert',
    method: 'POST',
    data
  })
}
// 修改 用户
export function updateRole(data) {
  return request({
    url: '/api/applet/role/update',
    method: 'POST',
    data
  })
}
// 删除 用户
export function delRole(params) {
  return request({
    url: '/api/applet/role/delete',
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
    url: '/api/applet/log/list',
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
    url: '/api/applet/file/list',
    method: 'get',
    params
  })
}
/* 删除附件 */
export function delFile(data) {
  return request({
    url: '/api/applet/file/del',
    method: 'post',
    data
  })
}
/* 修改文件名 */
export function fileUpadte(data) {
  return request({
    url: '/api/applet/file/update',
    method: 'post',
    data
  })
}

/* ----------------------资料收集---------------- */
/* ----------------------资料收集---------------- */
/* ----------------------资料收集---------------- */

// 获取IP列表
export function getGatherList(params) {
  return request({
    url: '/api/applet/gather/list',
    method: 'get',
    params
  })
}
// 添加收集项目
export function addGather(data) {
  return request({
    url: '/api/applet/gather/insert',
    method: 'POST',
    data
  })
}
// 修改收集项目
export function updateGather(data) {
  return request({
    url: '/api/applet/gather/update',
    method: 'POST',
    data
  })
}
// 删除 项目
export function delGather(params) {
  return request({
    url: '/api/applet/gather/delete',
    method: 'get',
    params
  })
}
/* 获取已经上传的学生列表 */
export function alreadyUpload(params) {
  return request({
    url: '/api/applet/already/upload/list',
    method: 'get',
    params
  })
}
/* 下载压缩文件 */
export function getCompressingFile(params) {
  return request({
    url: '/api/applet/compressing/file',
    method: 'get',
    params
  })
}

export function getResumeInfo(data) {
  return request({
    url: '/mini/program/resume/get/userInfo',
    method: 'post',
    data
  })
}
export function resumeInfoUpdate(data) {
  return request({
    url: '/mini/program/resume/userInfo/update',
    method: 'post',
    data
  })
}

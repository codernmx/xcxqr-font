import request from '@/utils/request'

/* 获取城市列表 */
export function getCityList(params) {
  return request({
    url: '/api/gzh/city/list',
    method: 'get',
    params
  })
}
/* 获取配置用户 */
export function getCityCustomerList() {
  return request({
    url: '/api/gzh/city/customer/list',
    method: 'get',
  })
}
/* 添加城市 */
export function cityInsert(data) {
  return request({
    url: '/api/gzh/city/insert',
    method: 'post',
    data
  })
}
/* 修改城市 */
export function cityUpdate(data) {
  return request({
    url: '/api/gzh/city/update',
    method: 'post',
    data
  })
}
/* 删除 */
export function cityDel(params) {
  return request({
    url: '/api/gzh/city/delete',
    method: 'get',
    params
  })
}
/* 发送通知 */
export function sendNotice(data) {
  return request({
    url: '/api/gzh/notice/send',
    method: 'post',
    data
  })
}


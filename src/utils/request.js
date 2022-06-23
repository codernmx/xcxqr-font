import axios from 'axios'
import { MessageBox, Message, Loading } from 'element-ui'
import { baseURL } from '@/config/index'
import store from '@/store'
import { getToken } from '@/utils/auth'

// loading进度条设置
let globalLoading = null // 这里是loading

function startLoading() {
  globalLoading = Loading.service({
    lock: true,
    text: '服务器卖命加载中…'
    // background: 'rgba(0, 0, 0, 0.6)'
  })
}

function endLoading() {
  setTimeout(() => {
    globalLoading.close()
  }, 100)
}

// create an axios instance
const service = axios.create({
  // baseURL,
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url  (添加一段请求接口)
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000 // request timeout  超时时间30秒
})

// request interceptor
service.interceptors.request.use(

  config => {
    if (config.url != '/api/uuid') {
      startLoading() // 避免轮训的时候存在加载动画
    }

    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    endLoading()
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      if (res.code == 403) {
        /* token过期回到login */
        location.reload()
      }
      Message({
        message: res.msg || '系统内部错误，请联系管理员',
        type: 'error',
        duration: 5 * 1000
      })
    } else {
      return res
    }
  },
  error => {
    endLoading()
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service

import router from '@/router'
import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
import { getTimeStamp } from '@/utils/auth.js'

const TimeOut = 3600 // 3600s === 1hour

// create an axios instance
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
request.interceptors.request.use(config => {
  if (store.getters.token) {
    // 如果token超时
    if (isTimeoutFn()) {
      // 登出logout
      store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('登录超时'))
    }
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

// response interceptor
request.interceptors.response.use(response => {
  const { success, message, data } = response.data
  if (success) {
    return data
  } else {
    Message.error(message)
    return Promise.reject(new Error(message))
  }
}, error => {
  // 如果返回的code是10002
  if (error && error.response && error.response.data && error.response.data.code === 10002) {
    store.dispatch('user/logout')
    router.push('/login')
    Message.error('登录超时')
  } else {
    Message.error(error.message)
  }
  return Promise.reject(error)
})

function isTimeoutFn() {
  const currentTime = Date.now()
  const timeStamp = getTimeStamp()
  return (currentTime - timeStamp) / 1000 > TimeOut
}

export default request

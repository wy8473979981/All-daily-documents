import Vue from 'vue'
import axios from 'axios'
import { Loading } from 'element-ui'
import QS from 'qs'
import { getDataType } from '@utils/index.js'
import router from '../router'
import { showFullScreenLoading, tryHideFullScreenLoading } from '@/utils/axiosHelperLoading'
Vue.prototype.$axios = axios
// import { saveTemplate } from './index'
// console.log(router, '----[路由对象 start]----')
// console.log(saveTemplate, '---saveTemplate---')

let loadingCount = 0
let loadingService
let loadingType = 'over'

const hideLoading = () => {
  if (loadingCount > 0) {
    loadingService.close()
    loadingCount--
  }
}

const showLoading = () => {
  if (loadingCount === 0) {
    loadingService = Loading.service({
      lock: true,
      text: '加载中…',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    loadingCount++
  }
}
const baseURL = process.env.NODE_ENV === 'development' ? '' : '../../../budget/'
Vue.prototype.$baseURL = baseURL

const baseConfig = {
  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
  // headers: { 'Content-Type': 'application/json' }
}
const urlObj = {
  // baseURL: 'http://192.168.120.173/ampsaas/', // 本地-测试地址
  // baseURL: 'http://192.168.121.229:802/' // 测试地址
  baseURL: baseURL // 生产地址
}
const axiosConfig = process.env.NODE_ENV === 'development' ? baseConfig : { ...urlObj, ...baseConfig }
const http = axios.create(axiosConfig)

http.interceptors.request.use(
  config => {
    // const token = localStorage.getItem('ys_contract_token')
    // if (token) {
    //   if (!config.params) {
    //     config.params = {}
    //   }
    //   // 接口地址后挂token
    //   // config.params.token = token
    // } else {
    //   console.log('请求时没有token了')
    //   // router.push({ name: 'login' })
    // }
    // config.headers = {
    //   Authorization: 'Bearer ' + token
    // }
    loadingType = 'loading'
    showFullScreenLoading();
    return config
  },
  error => {
    hideLoading()
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  response => {
    loadingType = 'over'
    if (
      response.data.code && getDataType(response.data) === '[object Object]') {
      if (response.data.code === 999) {
        // router.push({ name: 'login' })
        // localStorage.clear()
      }
    }
    setTimeout(() => {
      tryHideFullScreenLoading();
    }, 0)
    return Promise.resolve(response)
  },
  error => {
    loadingType = 'over'
    setTimeout(() => {
      tryHideFullScreenLoading();
    }, 0)
    return Promise.reject(error)
  }
)

export function get(url, params, responseType = 'json') {
  return new Promise((resolve, reject) => {
    http.get(url, {
      params,
      responseType,
      timeout: 180000
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}

export function del(url, params, responseType = 'json') {
  return new Promise((resolve, reject) => {
    http.delete(url, {
      params,
      responseType,
      timeout: 180000
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}

const conType = {
  JSON: { 'Content-Type': 'application/json;charset=UTF-8' },
  FORM: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
}

export function post(url, params = { timeout: 180000 }, contype = 'JSON') {
  // console.log(params, '----[post入参 start]----')
  return new Promise((resolve, reject) => {
    const paramsHandle = {
      JSON: params,
      FORM: QS.stringify(params)
    }
    http.post(
      url,
      paramsHandle[contype],
      // params,
      {
        headers: conType[contype],
        timeout: params.timeout
      }
    )
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        // console.log(err, '----[err回参 start]----')
        reject(err.data)
      })
  })
}

export function put(url, params = { timeout: 30000 }, contype = 'JSON') {
  // console.log(params, '----[post入参 start]----')
  return new Promise((resolve, reject) => {
    const paramsHandle = {
      JSON: params,
      FORM: QS.stringify(params)
    }
    http.put(
      url,
      paramsHandle[contype],
      // params,
      {
        headers: conType[contype],
        timeout: params.timeout
      }
    )
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        // console.log(err, '----[err回参 start]----')
        reject(err.data)
      })
  })
}

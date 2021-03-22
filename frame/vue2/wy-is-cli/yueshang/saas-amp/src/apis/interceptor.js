import Vue from 'vue'
import axios from 'axios'
import { Loading } from 'element-ui'
import QS from 'qs'
import { getDataType } from '@utils/index.js'
import router from '../router'
import { showFullScreenLoading, tryHideFullScreenLoading } from '@/utils/axiosHelperLoading'
Vue.prototype.$axios = axios

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
const baseURL = process.env.NODE_ENV === 'development' ? '/' : 'ampsaas_bl/'
Vue.prototype.$baseURL = baseURL

const baseConfig = {
  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
  // headers: { 'Content-Type': 'application/json' }
}
const urlObj = {
  baseURL: baseURL // 生产地址
}
const axiosConfig = process.env.NODE_ENV === 'development' ? baseConfig : { ...urlObj, ...baseConfig }
const http = axios.create(axiosConfig)

http.interceptors.request.use(
  config => {
    // console.log(config, '----[请求入参 start]----')
    const token = localStorage.getItem('ys_contract_token')
    const jwtToken = localStorage.getItem('ys_contract_jwt_token')
    if (jwtToken) {
      if (!config.params) {
        config.params = {}
      }
      config.params.token = token
    } else {
      console.log('请求时没有token了')
      router.push({ name: 'login' })
      localStorage.clear()
    }
    if (jwtToken) {
      config.headers.Authorization = jwtToken
    }
    config.withCredentials = true // 请求携带cookie
    loadingType = 'loading'
    // setTimeout(() => {
    //   if (loadingType === 'loading') showLoading()
    // }, 800)
    if (config.useScreenLoadingBol) {
      showFullScreenLoading();
    }
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
        // Message.error('令牌无效，请重新登录')
        // window.location.href = `http://${window.location.host}/#/login`
        router.push({ name: 'login' })
        // localStorage.removeItem('ys_contract_token')
        // localStorage.removeItem('ys_contract_permission')
        // localStorage.removeItem('ys_contract_layout')
        localStorage.clear()
      }
    }
    // hideLoading()
    tryHideFullScreenLoading();
    return Promise.resolve(response)
  },
  error => {
    loadingType = 'over'
    // hideLoading()
    tryHideFullScreenLoading();
    return Promise.reject(error)
  }
)

const conType = {
  JSON: { 'Content-Type': 'application/json;charset=UTF-8' },
  FORM: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
}

export function get(url, params, responseType = 'JSON', useScreenLoadingBol = true) {
  return new Promise((resolve, reject) => {
    let req = { params, responseType, timeout: 6000000, headers: conType[responseType], useScreenLoadingBol };
    http.get(url, req).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}

export function post(url, params = { timeout: 6000000 }, contype = 'FORM', useScreenLoadingBol = true) {
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
        timeout: params.timeout,
        useScreenLoadingBol
      },
    )
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        console.log(err, '----[err回参 start]----')
        reject(err.data)
      })
  })
}

import axios from 'axios'
import store from '@/store/index.js'
import QS from 'qs'
import { getDataType } from '@/utils/index.js'
import { Toast } from 'vant'
// import router from '../router'
// import Base from "./apis/base";
// import { saveTemplate } from './index'

let loadingCount = 0
let loadingType = 'over'

// 隐藏loading
const hideLoading = () => {
  if (loadingCount > 0) {
    // setTimeout(() => {
    //   store.state.isLoading = false
    // }, 1000)
    store.state.isLoading = false
    loadingCount--
  }
}
// 显示loading
const showLoading = () => {
  if (loadingCount === 0) {
    store.state.isLoading = true
    loadingCount++
  }
}

const baseConfig = {
  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
  // headers: { 'Content-Type': 'application/json' }
}
const urlObj = {
  // baseURL: 'http://192.168.120.173/ampsaas/', // 本地-测试地址
  // baseURL: 'http://192.168.121.229:802/' // 测试地址
  baseURL: process.env.VUE_APP_URL // 测试地址
};
const axiosConfig = process.env.NODE_ENV === 'development' ? baseConfig : { ...urlObj, ...baseConfig }
const http = axios.create(axiosConfig)

http.interceptors.request.use(
  config => {
    // console.log(config.timeout, '----[请求入参 start]----')
    let token = localStorage.getItem('ys_contract_token');
    if(token) {
      token = JSON.parse(token);
    }
    // let now = Date.now();
    // if(!token || !token.overTime || token.overTime < now) {
    //   if(token) {
    //     localStorage.removeItem('ys_contract_token')
    //   }
    //   if(!(location.href.includes('login'))) {
    //     // router.push({ name: 'login' })
    //     // return false;
    //   }
    // }
    if (token) {
      if (!config.params) {
        config.params = {}
      }
      config.headers = {
        'Authorization': token.token
      }
      // 获取到token后赋值到接口参数
      // config.params.token = token.token
    } else {
      console.log('请求时没有token了')
      // router.push({ name: 'login' })
    }
    // config.headers = {
    //   'Authorization': 'Bearer ' + token
    // }
    // 接口返回时间超过500ms显示loading
    loadingType = 'loading'
    // setTimeout(() => {
    //   if (loadingType === 'loading') showLoading()
    // }, 500)
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
        // Toast.fail('令牌无效，请重新登录')
        // window.location.href = `http://${window.location.host}/#/login`
        // router.push({ name: 'login' })
        localStorage.removeItem('ys_contract_token')
      }
    }
    hideLoading()
    return Promise.resolve(response)
  },
  error => {
    loadingType = 'over'
    hideLoading()
    return Promise.reject(error)
  }
)

export function get (url, params, responseType = 'json') {
  return new Promise((resolve, reject) => {
    http.get(url, {
      params,
      responseType,
      timeout: 10000
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}

const conType = {
  'JSON': { 'Content-Type': 'application/json;charset=UTF-8' },
  'FORM': { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
}

export function post (url, params = { timeout: 10000 }, contype = 'JSON') {
  url = 'api/' + url;
  console.log(params, '----[post入参 start]----')
  // 如果参数里需要userId,统一改为当前登录角色
  // if(params.userId) {
  //   params.userId = store.state.userInfo.userid
  // }
  return new Promise((resolve, reject) => {
    const paramsHandle = {
      'JSON': params,
      'FORM': QS.stringify(params)
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
        if (err == 'Error: Request failed with status code 403') {
          // router.push({ name: 'login' })
          Toast.fail('登录已失效，请重新登录')
          return
        }
        console.log(err, '----[err回参 start]----')
        reject(err.data)
        let token = localStorage.getItem('ys_contract_token');
        if(token) {
          Toast.fail('系统异常，请稍后重试')
        }
      })
  })
}



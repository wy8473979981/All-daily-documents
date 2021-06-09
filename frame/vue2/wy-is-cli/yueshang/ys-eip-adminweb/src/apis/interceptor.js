import axios from 'axios'
import store from '@/store/index.js'
import {
  Message,
  Loading
} from 'element-ui'
import QS from 'qs'
import Utils from '@/utils/index.js'
import router from '../router'
import Base from "./apis/base";
import Qs from 'qs'
import {
  showFullScreenLoading,
  tryHideFullScreenLoading
} from '@/utils/axiosHelperLoading'



// import { saveTemplate } from './index'
// console.log(router, '----[路由对象 start]----')
// console.log(saveTemplate, '---saveTemplate---')

const baseConfig = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }
  // headers: { 'Content-Type': 'application/json' }
}
const urlObj = {
  // baseURL: 'http://192.168.120.173/ampsaas/', // 本地-测试地址
  // baseURL: 'http://192.168.121.229:802/' // 测试地址
  baseURL: process.env.VUE_APP_URL // 测试地址
};
// const axiosConfig = process.env.NODE_ENV === 'development' ? baseConfig : { ...urlObj, ...baseConfig }
// 判断是本地环境还是线上环境，如果是线上环境修改请求地址
const axiosConfig = window.location.href.search(/8067/) != -1 ? baseConfig : {
  ...urlObj,
  ...baseConfig
}
const http = axios.create(axiosConfig)

http.interceptors.request.use(
  config => {
    // console.log(config.timeout, '----[请求入参 start]----')
    let token = null
    let info = localStorage.getItem('ys_contract_token');
    if (info) {
      token = JSON.parse(info).token;
    }
    if (token) {
      if (!config.params) {
        config.params = {}
      }
      config.headers = {
        'Authorization': token
      }
    } else {
      console.log('请求时没有token了')
    }
    if (config.useScreenLoadingBol) {
      showFullScreenLoading()
    }
    return config
  },
  error => {
    tryHideFullScreenLoading()
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  response => {
    if (response.data.code && Utils.getDataType(response.data) === '[object Object]') {
      if (response.data.code == '50147' || response.data.code == '50148') {
        localStorage.removeItem('ys_contract_token')
        // Message.error(response.data.message)
        router.push({ name: 'login' })
      }/* else if (response.data.code.startsWith('50')) {
        Message.error(response.data.message)
      } */
    }
    tryHideFullScreenLoading()
    return Promise.resolve(response)
  },
  error => {
    tryHideFullScreenLoading()
    return Promise.reject(error)
  }
)

const conType = {
  'JSON': {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  'FORM': {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  },
}

export function get (url, params, useScreenLoadingBol = true, responseType = 'JSON') {
  return new Promise((resolve, reject) => {
    const req = {
      params,
      paramsSerializer: function (params) {
        return Qs.stringify(params, {
          arrayFormat: 'brackets'
        })
      },
      responseType,
      timeout: 6000,
      headers: conType[responseType],
      useScreenLoadingBol
    }
    http.get(url, req).then(res => {
      // if (res.data.code == 200) {
      //   return resolve(res.data)
      // } else {
      //   Message.error(res.data.message)
      // }

      return resolve(res.data)

    }).catch(err => {
      let token = localStorage.getItem('ys_contract_token');
      if (token) {
        Message.error('系统异常，请稍后重试')
      }
      reject(err.data)
    })
  })
}

export function post (url, params = {
  timeout: 6000
}, useScreenLoadingBol = true, contype = 'JSON') {
  console.log(params, '----[post入参 start]----')
  return new Promise((resolve, reject) => {
    const paramsHandle = {
      'JSON': params,
      'FORM': QS.stringify(params)
    }
    http.post(
      url,
      paramsHandle[contype], {
      headers: conType[contype],
      timeout: params.timeout,
      useScreenLoadingBol
    }
    )
      .then(res => {
        // if (res.data.code == 200) {
        //   return resolve(res.data)
        // } else {
        //   Message.error(res.data.message)
        // }
        return resolve(res.data)
      })
      .catch(err => {
        let token = localStorage.getItem('ys_contract_token');
        if (token) {
          Message.error('系统异常，请稍后重试')
        }
        return reject(err.data)
      })
  })
}

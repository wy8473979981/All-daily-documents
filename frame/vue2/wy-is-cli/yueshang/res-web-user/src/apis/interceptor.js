import axios from 'axios'
// import store from '@/store/index.js'
import { Message, Loading } from 'element-ui'
import QS from 'qs'
import { getDataType } from '@/utils/index.js'
import resetMessage from '@/utils/resetMessage.js'
import router from '../router'
import md5 from 'js-md5'
// import Base from "./apis/base";
// import { saveTemplate } from './index'
// console.log(router, '----[路由对象 start]----')
// console.log(saveTemplate, '---saveTemplate---')

let loadingCount = 0
let loadingService
let loadingType = 'over'

const hideLoading = () => {
  if (loadingCount > 0) {
    // setTimeout(() => {
    //   loadingService.close()
    // }, 1000);
    loadingService.close()
    loadingCount--
  }
}

const openLoading = () => {
  if (loadingCount === 0) {
    loadingService = Loading.service({
      lock: true,
      text: '加载中…',
      background: 'rgba(0, 0, 0, 0.2)'
    })
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
// const axiosConfig = process.env.NODE_ENV === 'development' ? baseConfig : { ...urlObj, ...baseConfig }
// 判断是本地环境还是线上环境，如果是线上环境修改请求地址
const axiosConfig = window.location.href.search(/8066/) != -1 ? baseConfig : { ...urlObj, ...baseConfig }
const http = axios.create(axiosConfig)

http.interceptors.request.use(
  config => {
    // console.log(config.timeout, '----[请求入参 start]----')
    // const token = localStorage.getItem('ys_contract_token')
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
    //     router.push({ name: 'login' })
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

    loadingType = config.showLoading
    setTimeout(() => {
      if(loadingType === 'loading')openLoading()
    },500)
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
      timeout: 20000
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
	'FORMDATE':{'Content-Type': 'application/x-www-form-urlencoded' }
}

export function post (url, params = { timeout: 20000 }, showLoading = 'notloading', contype = 'JSON', signShow = false) {
  url = 'api/' + url;
  console.log(params, url, '----[post入参 start]----')
  // 如果参数里需要userId,统一改为当前登录角色
  // if(params.userId) {
  //   params.userId = store.state.userInfo.userid
  // }
	const timestamp = new Date().getTime()
	const nonce = Math.floor(Math.random() * (1 - 100) + 100)
	const sign = md5(`${timestamp}||${nonce}||yueworld`)
	if(signShow) {
		params.timestamp = timestamp
		params.nonce = nonce
		params.sign = sign
	}
	if(contype === 'FORMDATE'&& signShow) {
		params.append("timestamp",timestamp)
		params.append("nonce",nonce)
		params.append("sign",sign)
	}
  return new Promise((resolve, reject) => {
    const paramsHandle = {
      'JSON': params,
      'FORM': QS.stringify(params),
			'FORMDATE':params
    }
    http.post(
      url,
      paramsHandle[contype],
      // params,
      {
        headers: conType[contype],
        timeout: params.timeout,
        showLoading
      }
    )
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        // 登录页面调用该接口403不显示报错提示
        if (url == 'api/bs/dict/getApproveStatus' && err == 'Error: Request failed with status code 403') {
          return
        }
        if (err == 'Error: Request failed with status code 403') {
          router.push({ name: 'login' })
          // Message.error('登录已失效，请重新登录')
          resetMessage.error('登录已失效，请重新登录')
          return
        }
        console.log(err, '----[err回参 start]----')
        reject(err.data)
        let token = localStorage.getItem('ys_contract_token');
        if(token) {
          Message.error('系统异常，请稍后重试')
        }
      })
  })
}




import qs from 'qs'
import axios from 'axios';
import md5 from 'md5'
import { APIConfig } from './api.config'
import { Message } from 'element-ui'

/**
 * 取消重复请求
 */
export const RepeatRequestMessage = '重复请求'
// pending [{url: string, cancel: function}]
let Pending = []
const getUrlKey = (config) => {
  const { url, method, params } = config;
  const str = `${url}?methods=${method}&params=${qs.stringify(params)}`;
  return str
}
const CancelToken = axios.CancelToken
const RemovePending = (config) => {
  for (const p in Pending) {
    const list = Pending[p];
    if (list.url === getUrlKey(config)) {
      // 执行取消操作
      list.cancel(RepeatRequestMessage)
      // 从数组中移除记录
      Pending.splice(p, 1)
    }
  }
}

export class Api {
  constructor(config = {}) {
    this.api = axios.create(Object.assign({}, APIConfig, config));

    this.api.interceptors.request.use(config => {
      RemovePending(config);

      config.cancelToken = new CancelToken(c => {
        Pending.push({ url: getUrlKey(config), cancel: c })
      })
      return config
    })

    this.apiInterceptorsResponse = this.api.interceptors.response.use(
      response => {

        RemovePending(response.config);

        const res = response.data;
        const code = Number(res.code);
        if (code !== 1) {
          if (code === 403) {
            Message.info('登陆状态失效，正在跳转登陆页面···')
            return Promise.reject()
          } else if (response.headers && response.headers['content-disposition']) {
            // 文件流下载
            return response
          } else {
            Message.error(res.message || '出错了， 请稍后重试')
            return Promise.reject()
          }
        } else {
          return res.data
        }
      },
      error => {
        error.message !== RepeatRequestMessage && Message({
          message: error.message,
          type: error,
          duration: 5 * 1000
        })

        return Promise.reject(error)
      }
    )
  }

  getSendData (data) {
    const timestamp = new Date().getTime();
    const nonce = Math.floor(Math.random() * (1 - 100) + 100);
    const sign = md5(`${timestamp}||${nonce}||yueworld`);
    const sendData = Object.assign({}, data, { timestamp, nonce, sign })
    return sendData
  }

  request (config) {
    return this.api.request(config)
  }

  get (url, data = {}, config) {
    return this.api.get(`${url}?${qs.stringify(this.getSendData(data))}`, config)
  }

  post (url, data, config) {
    return this.api.post(url, this.getSendData(data), config)
  }
}

import qs from 'qs'
import axios from 'axios';
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
        const status = res.status;
        if (status === 0) {
          return res.result;
        } else {
          Message.error(res.message || "出错了， 请稍后重试");
          return res
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
    const key = process.env.VUE_APP_TXKEY;
    const sendData = Object.assign({}, data, { key });
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
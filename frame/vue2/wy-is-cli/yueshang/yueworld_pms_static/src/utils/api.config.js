import qs from 'qs'

export const APIConfig = {
  withCredentials: true, // 跨域请求时是否需要使用凭证
  timeout: 30000,
  baseURL: process.env.VUE_BASE_API,
  headers: {
    common: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  },
  paramsSerializer: (params) => qs.stringify(params, { indices: false })
}

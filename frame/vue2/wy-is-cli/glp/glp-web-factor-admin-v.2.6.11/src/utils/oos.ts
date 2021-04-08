import OSS from 'ali-oss'
import { http } from '@/api/http'
import { uuid } from './perf'
import { resp, download } from './file'

interface RequestOptions {
  headers: Record<string, any>;
  withCredentials: boolean;
  file: File;
  data: any;
  filename: string;
  action: string;
  onProgress: (e: { percent: number }) => void;
  onSuccess: (res: any) => void;
  onError: (err: Error) => void;
}

const config = {
  region: 'oss-cn-shanghai',
  accessKeyId: '',
  accessKeySecret: '',
  bucket: '',
  stsToken: '',
  path: '',
  expiration: '',
  secure: true // 使用https
}

export function oosRequest(options: RequestOptions) {
  getToken().then(() => {
    const params = Object.assign({}, config) as any
    const path = genOssFilename(options.file)
    delete params.expiration
    params.path = path
    const client = new OSS(params)
    const data = options.file
    options.onProgress({ percent: 50 })
    return client.put(path, data).then((result: any) => {
      options.onProgress({ percent: 100 })
      options.onSuccess(result)
      return result
    })
  }).catch(e => {
    options.onError(e)
  })
  // scheduleRefreshToken().then(() => {

  // }).catch(e => {
  //   options.onError(e)
  // })

  return oosRequest

  function genOssFilename(file: File) {
    const suffix = file.name.substr(file.name.lastIndexOf('.'))
    return config.path + '/' + uuid() + suffix
  }
}

function getToken() {
  return http().get('/backend/oss/stsToken').then(data => {
    const { endPoint, bucketName, region, path, accessKeyId, accessKeySecret, securityToken, expiration } = data
    const item = {
      region,
      accessKeyId,
      accessKeySecret,
      bucket: data.bucketName,
      stsToken: securityToken,
      path,
      expiration
    }
    Object.assign(config, item)
    return config
  })
}

function scheduleRefreshToken() {
  if (config.expiration) return Promise.resolve()
  return getToken().then(() => {
    setTimeout(scheduleRefreshToken, getDuration(new Date(config.expiration)))
  }).catch((e) => {
    setTimeout(scheduleRefreshToken, 1000 * 5)
    return Promise.reject(e)
  })

  function getDuration(time: Date) {
    const delta = 1000 * 10 // 提前 10s
    const min = 1000 * 5 // 最小间隔 5s
    return Math.max(time.getTime() - Date.now() - delta, min)
  }
}

export function ossDownload (name: string, url: string) {
  /**
   * 若都支持跨域用 download 方法
   */

  // getToken().then(() => {
  //   if (!url.includes(config.bucket)) { // 如果不在同一个bucket， 既不能使用ajax、也不能使用signatureUrl, 图片、pdf不支持下载
  //     resp(url, name, '_blank')
  //     return
  //   }
  //   const client = new OSS(config)
  //   const response = {
  //     'content-disposition': `attachment; filename=${encodeURIComponent(name)}`
  //   }
  //   const flag = '/tmp/'
  //   const idx = url.indexOf(flag)
  //   const id = url.slice(idx + 1)
  //   const path = client.signatureUrl(id, { response })
  //   resp(path, name)
  // })

  download(url, name).catch(() => {
    console.warn('文件 [' + url + '] 不支持跨域下载')
    resp(url, name, '_blank')
  })
}

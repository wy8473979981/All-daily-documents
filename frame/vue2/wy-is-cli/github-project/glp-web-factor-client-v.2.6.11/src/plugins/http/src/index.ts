import Http, { HttpOptions } from './Http'

export default function install (Vue: any, options: HttpOptions) {
  const http = new Http(options)
  Vue.prototype.$http = http
}

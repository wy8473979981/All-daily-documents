import Vue from 'vue'
import HttpPlugin from './src'

const appId = process.env.VUE_APP_APP_ID

Vue.use(HttpPlugin, {
  expiredHandler: function (url: string) {
    const auth = Vue.prototype.$auth
    if (auth) auth.toLogin(url, false)
  },
  requestHandler (cfg: any) {
    const auth = Vue.prototype.$auth
    const userNo = auth?.principle?.user?.userNo
    const headers: any = {}
    headers.userNo = userNo || ''
    headers.appId = appId || '' // 登出时需要
    if (!auth.authenticated && auth.single) {
      const url = new URL(window.location.href.replace(/#.*\?/, '?'))
      headers.ticket = url.searchParams.get('ticket') || ''
    }
    Object.assign(cfg.headers, headers)
  }
})

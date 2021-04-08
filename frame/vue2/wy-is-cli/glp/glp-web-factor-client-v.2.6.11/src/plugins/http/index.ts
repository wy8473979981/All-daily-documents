import Vue from 'vue'
import HttpPlugin from './src'

Vue.use(HttpPlugin, {
  expiredHandler: function (url: string) {
    const auth = Vue.prototype.$auth
    if (auth) auth.toLogin(url, false)
  },
  requestHandler (cfg: any) {
    const auth = Vue.prototype.$auth
    const userNo = auth.principle && auth.principle.userNo
    const headers: any = {}
    headers.userNo = userNo || ''
    if (!auth.authenticated && auth.single) {
      const url = new URL(window.location.href.replace(/#.*\?/, '?'))
      headers.ticket = url.searchParams.get('ticket') || ''
    }
    Object.assign(cfg.headers, headers)
  }
})

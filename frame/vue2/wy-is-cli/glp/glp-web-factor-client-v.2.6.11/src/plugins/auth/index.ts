import store from '@/store'
import { Principle, LoginParams } from './src/Auth'
import Vue from 'vue'
import AuthPlugin from './src'
import { toArray } from '@/utils/data'
import { localAuthorities } from '@/config/page/options'

// 是否在开发环境开启 本地全量权限
const enabledLocalAuthorities = true
const isDev = process.env.NODE_ENV === 'development'

Vue.use(AuthPlugin, {
  single: process.env.VUE_APP_AUTH_MODE === 'S', // 是否单点登录模式
  principleLoader: function (): Promise<Principle> {
    const http = Vue.prototype.$http
    const all = [http.get('/clientend/customer/info'), http.get('/api/item/getItems'), http.post('/clientend/customer/getCustomer')]
    return Promise.all(all).then(([user, dictionary, userInfo]: any) => {
      store.commit('dictionary/setItems', dictionary)
      return {
        user: {
          username: user.userNo,
          cname: user.name,
          realnameStatus: userInfo.realnameStatus,
          ifReadAndAgree: userInfo.ifReadAndAgree,
          ifNeedRealName: userInfo.ifNeedRealname,
          url: userInfo.url,
          userInfo: userInfo,
          ...user
        },
        roles: [],
        authorities: toArray(localAuthorities, cloneFn)
      }
    })

    function cloneFn (row: any, parent: any) {
      const pid = (parent && parent.pid) || ''
      const id = pid + '/' + row.code
      return {
        pid: id,
        id,
        code: row.code,
        label: row.label,
        parentId: pid || null,
        seq: row.seq,
        parent: parent
      }
    }
  },
  logoutHandler: function (): Promise<string> {
    const http = Vue.prototype.$http
    return http.get('/logout')
  },
  loginHandler: function (params: LoginParams): Promise<any> {
    const http = Vue.prototype.$http
    return http.post('/login', params)
  }
})

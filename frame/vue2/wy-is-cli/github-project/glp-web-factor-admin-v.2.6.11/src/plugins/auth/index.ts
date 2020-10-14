import { Principle, LoginParams } from './src/Auth'
import Vue from 'vue'
import AuthPlugin from './src'
import store from '@/store'
import { toArray } from '@/utils/data'
import { localAuthorities } from '@/config/page/options'

const ssoLoginUrl = process.env.VUE_APP_SSO_LOGIN_URL

// 是否在开发环境开启 本地全量权限
const enabledLocalAuthorities = true
const isDev = process.env.NODE_ENV === 'development'

Vue.use(AuthPlugin, {
  single: process.env.VUE_APP_AUTH_MODE === 'S', // 是否单点登录模式
  principleLoader: function (): Promise<Principle> {
    const http = Vue.prototype.$http
    const all = [http.get('/backend/user/info'), http.get('/backend/user/rolesAndPerms'), http.get('/glp-fae/dictionary/list'), http.get('/api/item/getItems')]
    return Promise.all(all).then(([user, authority, dictionary, dictionary2]: any) => {
      dictionary = { ...dictionary, ...dictionary2 }
      store.commit('dictionary/setItems', dictionary)
      const authorities = (enabledLocalAuthorities && isDev) ? localAuthorities : authority.perms
      return {
        user: {
          username: user.userNo,
          cname: user.name,
          ...user
        },
        roles: (authority.roles || []).map((v: any) => Object.assign({}, { roleCode: v.code, roleName: v.roleName })),
        authorities: toArray(authorities, cloneFn)
      }
    })

    function cloneFn(row: any, parent: any) {
      const pid = (parent && parent.pid) || ''
      const id = pid + '/' + row.code
      return {
        pid: id,
        id,
        code: row.code,
        label: row.label,
        parentId: pid || null,
        seq: row.seq,
        parent: parent,
        children: getOperateList(row.children)
      }
    }

    function getOperateList(list: any[] = []) {
      const _list: any[] = []
      list.map((item, index) => {
        if (item.type === 2) {
          _list.push(item.code)
        }
      })
      return _list
    }
  },
  logoutHandler: function (): Promise<string> {
    const http = Vue.prototype.$http
    return http.get('/logout?' + window.document.cookie)
  },
  loginHandler: function (params: LoginParams): Promise<any> {
    const http = Vue.prototype.$http
    return http.post('/login', params)
  },
  ssoLoginUrl
})

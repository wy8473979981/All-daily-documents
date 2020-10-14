import { NavigationGuard } from 'vue-router'
import Vue from 'vue'
import NP from 'nprogress'
import { getHomePage } from '@/config/home-page'

const whiteList = ['/login', '/error/**'] // ant style wildcat

const frontGuard: NavigationGuard = function (to, from, next) {
  NP.start()
  const auth = Vue.prototype.$auth

  // 主页匹配
  if (to.path === '/') {
    auth.load().then(() => {
      const roles = auth.roles.map((v: any) => v.roleCode)
      const authorities = auth.authorities.map((v: any) => v.pid)
      const homePage = getHomePage(roles, authorities)
      if (homePage && homePage !== '/') {
        next(homePage)
        NP.done()
      } else {
        next()
      }
    })
    return
  }

  // 白名单或未设置权限， 不验证
  if (onWhiteList(to.path) || (!to.meta?.pid)) {
    next()
    return
  }
  // 权限控制
  auth.access(to.meta?.pid).then((pass: boolean) => {
    if (pass) {
      next()
    } else {
      next({ path: '/error/403' })
      NP.done()
    }
  }).catch(() => {
    NP.done()
  })
}

function onWhiteList(path: string) {
  const convertRegEx = (expr: string) => {
    return new RegExp('^' +
      (expr || '')
        .replace(/\*\*/g, '#__#')
        .replace(/\*/g, '[^/]*')
        .replace(/#__#/g, '.*') +
      '$')
  }
  return whiteList.some(v => convertRegEx(v).test(path))
}

export default frontGuard

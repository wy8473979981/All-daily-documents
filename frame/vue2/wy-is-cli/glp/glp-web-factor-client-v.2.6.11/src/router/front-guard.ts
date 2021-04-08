import { NavigationGuard } from 'vue-router'
import Vue from 'vue'
import NP from 'nprogress'
import { getHomePage } from '@/config/home-page'
import { http } from '@/api/http'
import { Message } from 'element-ui'

const whiteList = ['/login', '/error/**', '/home'] // ant style wildcat

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
      toCertify()
    } else {
      next({ path: '/error/403' })
      NP.done()
    }
  }).catch(() => {
    NP.done()
  })

  function toCertify() {
    const url = window.location.href
    if (Number(auth.principle.user.userType) === 0) { // 内部员工
      if (to.path === '/staff') next()
      else if (url.indexOf('ticket') > 0) {
        next('/staff')
      } else {
        next()
      }
    } else {
      if (to.path === '/home') next()
      if (auth.principle.user.ifNeedRealName === 1) { // 实名认证开启
        if (auth.principle.user.realnameStatus === 0) { // 未实名
          window.location.href = auth.principle.user.url
          next(false)
        } else if (auth.principle.user.realnameStatus === 1) { // 已实名
          disagreeJump(next)
        } else {
          Message({
            showClose: true,
            type: 'warning',
            message: '实名认证中',
            duration: 0
          })
        }
      } else { // 实名认证关闭
        next()
      }
    }

    function disagreeJump(fn: any) {
      const auth = Vue.prototype.$auth
      /*
        1.是否阅读并同意协议 1已阅读，跳转首页、2未来阅读，跳转到阅读页
      */
      if (auth.principle.user.ifReadAndAgree === 1) {
        fn()
      } else {
        if (to.path === '/authorization') next()
        else next('/authorization')
      }
    }
  }
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

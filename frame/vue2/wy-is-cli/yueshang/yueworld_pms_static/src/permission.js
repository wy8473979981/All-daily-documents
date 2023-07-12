/*
 * @Author: fhj
 * @LastEditors: zengcheng
 */
import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
// import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // 进度条
  NProgress.start()
  // 设置title
  document.title = getPageTitle(to.meta.title)
  const hasRoles = store.getters.permission_routes && store.getters.permission_routes.length > 0
  if (hasRoles) {
    next()
    // 去除tips
    setTimeout(() => {
      const tipsList = document.getElementsByClassName('el-tooltip__popper') || []
      for (let i = 0; i < tipsList.length; i++) {
        tipsList[i].remove()
      }
    }, 300)
    // document.getElementsByClassName('el-tooltip__popper').remove()
    return
  }

  if (localStorage.isLogin !== '1' && to.path !== '/login') {
    next(`/login?redirect=${to.path}`)
    NProgress.done()
    return
  }

  if (localStorage.isLogin === '1' && to.path === '/login') {
    next({ path: '/' })
    NProgress.done()
    return
  }
  console.log('123')
  try {
    // get user info
    // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
    // generate accessible routes map based on roles
    const accessRoutes = await store.dispatch('permission/generateRoutes')
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)
    // hack method to ensure that addRoutes is complete
    // set the replace: true, so the navigation will not leave a history record
    next({ ...to, replace: true })
  } catch (error) {
    // remove token and go to login page to re-login
    await store.dispatch('user/resetToken')
    Message.error(error || 'Has Error')
    next(`/login?redirect=${to.path}`)
    NProgress.done()
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
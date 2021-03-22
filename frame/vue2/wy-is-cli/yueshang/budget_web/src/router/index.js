import Vue from 'vue'
import Router from 'vue-router'
import { routes } from './routes.js'
import store from '../store/index'

// 解决两次访问相同路由地址报错
const originalPush = Router.prototype.push

Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)
const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes,
  // mode: 'history'
  mode: 'hash'
})

router.beforeEach((to, from, next) => {
  if (to && to.query.sourceType && to.query.sourceType.toLowerCase() === 'pms') {
    store.commit('saveIsShowContent', true)
  } else {
    store.commit('saveIsShowContent', false)
  }
  next()
  // const noServer = false
  // return
  // if (!noServer) {
  //   const token = localStorage.getItem('ys_contract_token')
  //   if (token || to.name === 'login') {
  //     next()
  //   } else {
  //     next({ name: 'login' })
  //   }
  // } else {
  //   next()
  // }
})

// router.afterEach((to, from) => {
//   const parentPath = document.getElementById('parentPath')
//   console.log(parentPath, '---pp')
// })
export default router

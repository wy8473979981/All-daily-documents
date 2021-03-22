import Vue from 'vue'
import VueRouter from "vue-router"
import Router from 'vue-router'
import { routes } from './routes.js'

// 解决两次访问相同路由地址报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter);

Vue.use(Router)
const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes,
  // mode: 'history'
  mode: 'hash'
})

router.beforeEach((to, from, next) => {
  const noServer = false
  // next()
  // return
  if (!noServer) {
    const token = localStorage.getItem('ys_contract_token')
    if (token || to.name === 'login') {
      next()
    } else {
      next({ name: 'login' })
    }
  } else {
    next()
  }
})

// router.afterEach((to, from) => {
//   const parentPath = document.getElementById('parentPath')
//   console.log(parentPath, '---pp')
// })
export default router

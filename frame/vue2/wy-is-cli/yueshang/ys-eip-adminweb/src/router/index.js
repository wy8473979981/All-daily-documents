import Vue from 'vue'
import VueRouter from "vue-router"
import Router from 'vue-router'
import { routes } from './routes.js'
import store from '@/store/index.js'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 解决两次访问相同路由地址报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
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

export function resetRouter () {
  const newRouter = new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes,
    node: 'hash'
  });
  router.matcher = newRouter.matcher;
  // console.log(routes, router, 88888)
}

router.beforeEach((to, from, next) => {
  let noServer = false;
  NProgress.start();
  if (from.fullPath == '/') {
    const rout = JSON.parse(localStorage.getItem('spxt_rout'));
    router.options.routes = rout;
  }
  if (!noServer) {
    let info = localStorage.getItem('ys_contract_token');
    const token = info && JSON.parse(info).token;
    if (token || to.name === 'login') {
      if (token && to.name === 'login') {
        next('/')
      } else {
        next()
      }
    } else {
      next({ name: 'login' })
    }
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  NProgress.done()
})
export default router

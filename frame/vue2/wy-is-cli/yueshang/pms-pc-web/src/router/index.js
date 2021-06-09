import Vue from 'vue'
import VueRouter from 'vue-router'
import getRouterList from './utils'
import Routers from './router'
import Store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { baseApi } from 'api/base'
import isEmpty from 'lodash/isEmpty'
import { getSession, setSession } from 'utils/utils'

Vue.use(VueRouter)

const RouterList = getRouterList(Routers)

const routes = [
  {
    path: '/test',
    name: 'Test',
    component: () => import('views/index/index.vue')
  },
  {
    path: '/',
    name: 'Index',
    redirect: '/or-ranking-headquarters',
    component: () => import('views/index/index.vue')
  },
  // {
  //   path: '/ranking-of-headquarters',
  //   name: 'RankingOfHeadquarters',
  //   component: () => import('views/OpeningRate/RankingOfHeadquarters/index.vue')
  // },
  ...RouterList,
  {
    path: '/404',
    name: '404',
    component: () => import('views/error/index.vue')
  }
]

console.log('routes,', routes)

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (!isEmpty(getSession('enumList'))) {
    const list = JSON.parse(getSession('enumList'))
    Store.commit('base/modifyEnum', list)
    next()
  } else {
    baseApi.getAllEnum().then(res => {
      Store.commit('base/modifyEnum', res)
      setSession('enumList', JSON.stringify(res), false)
    }).finally(() => {
      next()
    })
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router

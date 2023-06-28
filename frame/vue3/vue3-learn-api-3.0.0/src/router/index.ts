import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import ref from '../views/ref.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'ref',
    component: ref
  },
  {
    path: '/lifecycle',
    name: 'lifecycle',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/lifecycle.vue')
  },
  {
    path: '/reactive-toRefs',
    name: 'reactive-toRefs',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/reactive-toRefs.vue')
  },
  {
    path: '/watch',
    name: 'watch',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/watch.vue')
  },
  {
    path: '/axios',
    name: 'axios',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/axios.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

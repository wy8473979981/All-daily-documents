import { AppRouteConfig } from './type'
import configRoutes from './config-routes'

const routes: Array<AppRouteConfig> = [
  {
    path: '/',
    component: () => import('@/views/layout/index.vue'),
    children: [
      ...configRoutes,
      {
        path: '/error/:code',
        name: 'error',
        props: ({ params = {} }) => ({ ...params }),
        component: () => import('@/views/error/index.vue')
      }
    ]
  },
  // DON'T CHANGE BELOW
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '',
    redirect: '/'
  },
  {
    path: '*',
    redirect: '/error/404'
  },
  {
    path: '/authorization',
    name: 'authorization',
    component: () => import('@/views/pages/authorization/company/index.vue'),
    meta: { pid: '/dashboard' }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/staff',
    name: 'staff',
    component: () => import('@/views/pages/staff/index.vue'),
    meta: { pid: '/dashboard' }
  }
]

console.log(routes)

export default routes

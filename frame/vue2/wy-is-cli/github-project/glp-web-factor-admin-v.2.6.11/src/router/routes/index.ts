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
  }
]

export default routes

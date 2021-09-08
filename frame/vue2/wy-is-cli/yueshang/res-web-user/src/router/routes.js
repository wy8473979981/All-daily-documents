import Layout from '@/layout/index.vue'
import baolRoutes from './baol/route_baol'
// import zjRoutes from './zj/route_zj'

const dynamicRoutes = [
  ...baolRoutes,
  // ...zjRoutes,
];

const fixRoutes = (routes) => {
  return routes.filter(item => item.meta.visible)
  .map(item => {
    const {component, children, ...rest} = item
    if (children && children.length > 0) {
      const fixedChildren = fixRoutes(children)
      return {
        children: fixedChildren,
        ...rest
      }
    } else {
      return rest
    }
  })
}

const fixed = fixRoutes(dynamicRoutes)

// console.log(fixed)

const routes = [
  {
    path: '*',
    redirect: fixed[0].redirect
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: "登录",
      visible: false
    }
  },
  ...dynamicRoutes
]

export {
  routes,
  fixed
}

import managementRoutes from './baol/route_management'

const dynamicRoutes = [
  ...managementRoutes
]

const fixRoutes = (routes) => {
  // const permission = localStorage.getItem('ys_contract_permission')
  // if (permission) {
  //   for (const key in routes) {
  //     if (routes[key].meta.title == '预算管理') {
  //       if (permission.indexOf('zchz_view') == -1) {
  //         routes[key].meta.visible = false
  //       }
  //     }
  //   }
  // }
  return routes.filter(item => item.meta.visible)
    .map(item => {
      const { component, children, ...rest } = item
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


const routes = [
  {
    path: '*',
    redirect: fixed[0].redirect
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@views/login/index_bl.vue'),
    meta: {
      title: '登录',
      visible: false
    }
  },
  ...dynamicRoutes
]

export {
  routes,
  fixed
}

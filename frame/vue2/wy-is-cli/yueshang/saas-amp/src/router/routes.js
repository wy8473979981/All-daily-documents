import Layout from '@/layout/index.vue'
import baolRoutes from './baol/route_baol'
// import zjRoutes from './zj/route_zj'
// import hfRoutes from './hf/route_hf'

const dynamicRoutes = [
  ...baolRoutes,
  // ...zjRoutes,
  // ...hfRoutes,
];

const fixRoutes = (routes) => {
  const permission = localStorage.getItem('ys_contract_permission')
  if (permission) {
    for (let key in routes) {
      if (routes[key].meta.title == '资产汇总') {
        if (permission.indexOf('zchz_view') == -1) {
          routes[key].meta.visible = false
        }
      }
      if (routes[key].meta.title == '审核汇总') {
        if (permission.indexOf('shhz_view') == -1) {
          routes[key].meta.visible = false
        }
      }
      if (routes[key].meta.title == '存量资产导入') {
        if (permission.indexOf('clzc_view') == -1) {
          routes[key].meta.visible = false
        }
      }
      if (routes[key].meta.title == '类型配置') {
        if (permission.indexOf('lxpz_view') == -1) {
          routes[key].meta.visible = false
        }
      }
      if (routes[key].meta.title == '项目分配') {
        if (permission.indexOf('xmfp_view') == -1) {
          routes[key].meta.visible = false
        }
      }
      if (routes[key].meta.title == '日志') {
        if (permission.indexOf('rz_view') == -1) {
          routes[key].meta.visible = false
        }
      }
      if (routes[key].meta.title == '展示') {
        if (permission.indexOf('zsy_view') == -1) {
          routes[key].meta.visible = false
        }
      }
    }
  }
  console.log('-------fixRoutes-------')
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

console.log("fixed:",fixed)

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
      title: "登录",
      visible: false
    }
  },
  // {
  //   path: '/show',
  //   name: 'show',
  //   component: () => import('@views/show/index.vue'),
  //   meta: {
  //     title: "展示",
  //     visible: false,
  //     dump: true,
  //   }
  // },
  {
    path: '/planShow',
    name: 'planShow',
    component: () => import('@views/plan/show.vue'),
    meta: {
      title: "平面图展示",
      visible: false,
      dump: true,
    }
  },
  {
    path: '/analysis',
    name: 'analysis',
    component: () => import('@views/type/analysis.vue'),
    meta: {
      title: "对比分析",
      visible: false,
      dump: true,
    }
  },
  {
    path: '/opening',
    name: 'opening',
    component: () => import('@views/type/opening.vue'),
    meta: {
      title: "开业率",
      visible: false,
      dump: true,
    }
  },
  {
    path: '/occupancy',
    name: 'occupancy',
    component: () => import('@views/type/occupancy.vue'),
    meta: {
      title: "出租率",
      visible: false,
      dump: true,
    }
  },
  {
    path: '/covered',
    name: 'covered',
    component: () => import('@views/type/covered.vue'),
    meta: {
      title: "建筑面积对比",
      visible: false,
      dump: true,
    }
  },
  ...dynamicRoutes
]

export {
  routes,
  fixed
}

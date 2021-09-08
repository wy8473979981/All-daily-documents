import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* 自动化后的路由 */
import menusList from '@/views/index.js'

// 默认路由
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage401')
  },
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    meta: { title: '首页及代办', level: 1 },
    alwaysShow: true, // 取消合并规则
    children: [
      {
        path: 'home',
        name: 'HomePage',
        component: menusList.home,
        meta: { title: '数据概览', hideNavBar: true, level: 2 }
      },
      {
        path: 'Page404',
        name: 'errorPage404',
        component: menusList.mini,
        meta: { title: '信息和审批', hideNavBar: true, level: 2 },
        alwaysShow: true,
        children: [
          {
            path: 'wisdomLand',
            name: 'errorPage404',
            component: menusList.wisdomLand,
            meta: { title: '邮件和信息', hideNavBar: true, level: 3 }
          }
        ]
      },
      {
        path: 'plan',
        name: 'text1',
        component: menusList.errorPage404,
        meta: { title: '计划', hideNavBar: true, level: 2 }
      },
      {
        path: 'memorandum',
        name: 'text2',
        component: menusList.errorPage404,
        meta: { title: '投绝决备忘录', hideNavBar: true, level: 2 }
      },
      {
        path: 'entrustment',
        name: 'text3',
        component: menusList.errorPage404,
        meta: { title: '委托情况', hideNavBar: true, level: 2 }
      }
    ]
  },
  {
    path: 'investmentEstimation',
    name: 'text_1',
    component: menusList.Layout,
    meta: { title: '投资测算', level: 1 },
    children: [
      {
        path: '/investmentEstimation/list',
        name: 'text_2',
        component: menusList.errorPage404,
        meta: { title: '投资测算', level: 2 }
      }
    ]
  },
  {
    path: 'budget',
    name: 'text_2',
    component: menusList.Layout,
    meta: { title: '预算管理', level: 1 },
    children: [
      {
        path: '/budget/list',
        name: 'text_2',
        component: menusList.errorPage404,
        meta: { title: '预算管理', level: 2 }
      }
    ]
  },
  {
    path: 'assets',
    name: 'text_3',
    component: menusList.Layout,
    meta: { title: '资产状态', level: 1 },
    children: [
      {
        path: '/assets/list',
        name: 'text_2',
        component: menusList.errorPage404,
        meta: { title: '资产状态', level: 2 }
      }
    ]
  },
  {
    path: 'returnManagement',
    name: 'text_4',
    component: menusList.Layout,
    meta: { title: '回报管理', level: 1 },
    children: [
      {
        path: '/returnManagement/list',
        name: 'text_2',
        component: menusList.errorPage404,
        meta: { title: '回报管理', level: 2 }
      }
    ]
  },
  {
    path: 'riskManagement',
    name: 'text_5',
    component: menusList.Layout,
    meta: { title: '风险控制', level: 1 },
    children: [
      {
        path: '/riskManagement/list',
        name: 'text_2',
        component: menusList.errorPage404,
        meta: { title: '风险控制', level: 2 }
      }
    ]
  },
  {
    path: 'assetPackage',
    name: 'text_6',
    component: menusList.Layout,
    meta: { title: '资产包设计', level: 1 },
    children: [
      {
        path: '/assetPackage/list',
        name: 'text_2',
        component: menusList.errorPage404,
        meta: { title: '资产包设计', level: 2 }
      }
    ]
  },
  {
    path: 'link',
    name: 'text_7',
    component: menusList.Layout,
    meta: { title: '转至PMS', level: 1 },
    children: [
      {
        path: '/link/list',
        name: 'text_2',
        component: menusList.errorPage404,
        meta: { title: '转至PMS', level: 2 }
      }
    ]
  }

]

// 根据接口配置路由
export function getMenusList(menus) {
  const menuList = []
  menus.forEach(element => {
    const item = setMenu(element)
    item && menuList.push(item)
  })
  return menuList
}

// 递归菜单children
function setMenu(menuItem) {
  // 和接口约定这个必须为json字符串
  const extraInfo = JSON.parse(menuItem.extraInfo)

  // 前端没这组件 直接去除
  if (!menusList[extraInfo.component]) {
    return null
  }
  // 递归children
  const childrenList = []
  menuItem.children.forEach(element => {
    const item = setMenu(element)
    item && childrenList.push(item)
  })

  // 返回的menuItem
  const menu = {
    path: menuItem.url,
    meta: {
      title: menuItem.name,
      icon: extraInfo.icon
    },
    hidden: extraInfo.hidden,
    component: menusList[extraInfo.component]
  }

  // 如果children=0 不添加到menuItem中
  if (childrenList.length > 0) {
    menu.children = childrenList
  }

  // 如果是一级目录 直接设置布局
  if (extraInfo.component === 'Layout') {
    // 一级
    menu.redirect = menuItem.url
    // 没children的一级
    if (childrenList.length === 0) {
      return undefined
    }
  } else {
    menu.name = extraInfo.component
  }
  return menu
}

/**
 * asyncRoutes
 * 菜单一级可以不写children，但是考虑到后台页面很多会出现各种子级，所以只有一级菜单也必须设置children
 */
export const asyncRoutes = [

]

// 报错路由
export const errorRoutes = [
  { path: '*', redirect: '/404', hidden: true }
]

// 创建路由函数
const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// 重置路由
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

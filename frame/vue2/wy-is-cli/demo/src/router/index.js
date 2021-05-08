import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    level: 'level-1',
    component: Layout,
    redirect: '/dashboard',
    name: 'dashboard',
    meta: {
      title: '首页及代办',
      icon: ''
    },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '数据概览' }
      }, {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'menu1',
        meta: { title: '信息和审批' },
        children: [
          {
            path: 'menu1-1',
            level: 'level-3',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'menu1-1',
            meta: { title: '邮件和信息' }
          },
          {
            path: 'menu1-3',
            level: 'level-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'menu1-3',
            meta: { title: '邮件和信息' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Raydata',
        meta: { title: 'Raydata', icon: 'el-icon-s-help' }
      }
    ]
  },
  {
    path: '/example',
    level: 'level-1',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '基础数据', icon: '' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '项目信息', icon: '' }
      },
      {
        path: 'tree1',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '多经信息', icon: '' }
      },
      {
        path: 'tree2',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '品牌商家', icon: '' }
      }
    ]
  },
  {
    path: '/example1',
    level: 'level-1',
    component: Layout,
    alwaysShow: true,
    redirect: '/example1/table1',
    name: 'Example',
    meta: { title: '基础数据(写字楼)', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table1',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '写字楼管理', icon: '' }
      }
    ]
  },
  {
    path: '/example2',
    level: 'level-1',
    component: Layout,
    alwaysShow: true,
    redirect: '/example2/table2',
    name: 'Example',
    meta: { title: '招商管理', icon: '' },
    children: [
      {
        path: 'table1',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '招商平台', icon: '' }
      }
    ]
  },
  {
    path: '/form',
    level: 'level-1',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: '' }
      }
    ]
  },

  {
    path: '/nested',
    level: 'level-1',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: ''
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                level: 'level-4',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                level: 'level-4',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },

  // {
  //   path: 'external-link',
  //   level: 'level-1',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

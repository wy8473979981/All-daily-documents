import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 路由配置
import routerList from './config.js'
/* Layout */
import Layout from '@/layout'
import mini from '@/views/Components/mini'

import { isExternal } from '@/utils/validate'

/* 自动化后的路由 */
// import menusList from '@/views/index.js'

// 默认路由
export const constantRoutes = [{
  path: '/redirect',
  component: Layout,
  hidden: true,
  children: [{
    path: '/redirect/:path*',
    component: () => import('@/views/Components/redirect/index')
  }]
},
{
  path: '/404',
  component: () => import('@/views/Components/errorPage404'),
  hidden: true
},
{
  path: '/401',
  component: () => import('@/views/Components/errorPage401')
},
{
  path: '/Login',
  name:'Login',
  component: () => import('@/views/Components/Login')
},
]

// 根据接口配置路由
export function getMenusList(menus) {
  const menuList = []
  menus.forEach(element => {
    element.level = 1
    const item = setMenu(element)
    item && menuList.push(item)
  })
  return menuList
}

// 递归菜单children
function setMenu(menuItem,parentName='') {


  // 返回的menuItem
  // const parentPath = menuItem.parentComUrl ? '/' + menuItem.parentComUrl : ''
  let PATH = menuItem.path?menuItem.path:(menuItem.parentComUrl ? menuItem.parentComUrl + '/' : '') + menuItem.name

  const isHTTPS = isExternal(PATH)

  if(PATH.indexOf('/') !== 0 && !isHTTPS){
    PATH = '/'+PATH
  }
  const menu = {
    ...menuItem,
    path: PATH,
    meta: {
      title: menuItem.title,
      icon: menuItem.icon || null ,// 目前无图标
      hideNavBar:menuItem.hideNavBar,
      showBread:menuItem.hideBread?false:menuItem.hidden, //不在左边显示爹页面出现面包屑
      parentName:menuItem.parentName
    },
    hidden: !!menuItem.hidden,
    component: () => import(`@/views${PATH}/index.vue`)
  }


  // 递归children
  const childrenList = []
  if (menu.children && menu.children.length > 0) {
    menu.children.forEach(element => {
      let newElement = {...element}
      newElement.level = 2
      newElement.parentComUrl = parentName +`/${menu.name}`
      const item = setMenu(newElement,newElement.parentComUrl)
      item && childrenList.push(item)
    })
  }
  
  // 如果children=0 不添加到menuItem中
  if (childrenList.length > 0) {
    menu.children = childrenList
    if(childrenList.filter(item=>item.hidden).length!=0){
      menu.alwaysShow = true
    }
    // menu.alwaysShow = true

    // 一级目录设置layout
    if(menuItem.level === 1 ){
      menu.component = Layout
    }
    // 二级目录并且子childrenList都为hidden component为默认
    let hasChild = childrenList.map(item=>item.hidden).filter(item=>!item)
    if(hasChild.lenght===0){
      menu.alwaysShow = null
    }
    if (menuItem.level === 2 ) {
      menu.component = mini
    }
  } 
  return menu
}


/**
 * asyncRoutes
 * 菜单一级可以不写children，但是考虑到后台页面很多会出现各种子级，所以只有一级菜单也必须设置children
 */

export const asyncRoutes = getMenusList(routerList)
console.log(asyncRoutes)
// 报错路由
export const errorRoutes = [{
  path: '*',
  redirect: '/404',
  hidden: true
}]

// 创建路由函数
const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({
      y: 0
    }),
    routes: constantRoutes
  })

const router = createRouter()

// 重置路由
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

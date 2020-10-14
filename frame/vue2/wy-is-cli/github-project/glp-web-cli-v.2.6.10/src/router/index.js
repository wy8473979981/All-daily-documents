import Vue from 'vue'
import Router from 'vue-router'

// 处理多次点击菜单报错      网上方案：https://www.cnblogs.com/dianzan/p/11399745.html
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* 白板路由模板 */
import TransformTpl from '@/views/transformTpl/index'

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
	roles: ['admin','editor']     will control the page roles (you can set multiple roles)
	title: 'title'               the name show in submenu and breadcrumb (recommend set)
	icon: 'svg-name'             the icon show in the sidebar,
	noCache: true                if true ,the page will no be cached(default is false)
  }
**/

// 一级菜单不显示子集时，level：1   子集的single：true
// 菜单路径都写完整路径

export const constantRouterMap = [
  {
	path: '/icon',
	redirect: '/icon/index',
	component: Layout,
	meta:{level:1,title: '图标',icon: 'icon'},
	children: [
	  {
		path: '/icon/index',
		component: (resolve) => require(['@/views/icons/index'], resolve),
		name: 'Icons',
		meta: {
			level:2,
			single:true,
			title: '图标', icon: 'icon', noCache: true }
	  }
	]
  },
  {
	path: '/',
	component: Layout,
	redirect: '/dashboard',
	meta: { level:1,title: '表单', icon: 'form', noCache: true },
	children: [
	  {
		path: '/dashboard',
		component: (resolve) => require(['@/views/regexp/index'], resolve),
		name: 'Dashboard',
		meta: {
			level:2,
			single:true,
			title: "表单验证", icon: 'dashboard', noCache: true }
	  }
	//   , {
	// 	path: 'index',
	// 	component: (resolve) => require(['@/views/form/index'], resolve),
	// 	name: 'Form',
	// 	meta: { title: '表单', icon: 'form', noCache: true }
	//   }
	]
  },

  {
	path: '/table',
	component: Layout,
	redirect: '/table/index',
	name: 'Table',
	meta: {
	  title: '表格',
	  level:1,
	  icon: 'chart'
	},
	children: [
	  	{
			path: '/table/index',
			component: (resolve) => require(['@/views/table/index'], resolve),
			name: 'tableIndex',
			meta: {level:2,title: '表单页列表',icon: 'chart',single:true}
	  	},
	  	{
			path: '/table/add',
			component: (resolve) => require(['@/views/table/add'], resolve),
			name: 'addTable',
			hidden:true,
			meta: { level:3,title: '新增'}
	  	}
	]
  }, {
	path: '/button',
	redirect: '/button/index',
	component: Layout,
	meta:{level:1,title:'按钮',icon: 'example'},
	children: [
	  {
		path: '/button/index',
		component: (resolve) => require(['@/views/button/index'], resolve),
		name: 'Button',
		meta: { single:true,level:2,title: '按钮', icon: 'example', noCache: true }
	  }
	]
  },
  {
	path: '/upload',
	redirect: '/upload/index',
	component: Layout,
	meta:{level:1,title:'文件上传',icon: 'documentation'},
	children: [
	  {
		path: '/upload/index',
		component: (resolve) => require(['@/views/upload/index'],resolve),
		name: 'upload',
		meta: {single:true,level:2, title: '图片上传及预览', icon: 'documentation', noCache: true }
	  }
	]
  },
  {
	path: '/message',
	redirect: '/message/index',
	component: Layout,
	meta:{level:1,title:'消息提示',icon: 'message'},
	children: [
	  {
		path: 'index',
		component: (resolve) => require(['@/views/message/index'], resolve),
		name: 'Message',
		meta: {single:true,level:2, title: '消息提示', icon: 'message', noCache: true }
	  }
	]
  },
  {
	path: '/system',
	component: TransformTpl,
	redirect: '/system/404',
	name:'system',
	meta: {level:1, title: '系统提示', icon: 'form', noCache: true },
	children: [
	  	{
			path: '/system/403',
			component: (resolve) => require(['@/views/system/403'], resolve),
			name: '403',
			meta: { level:2,title: "403", icon: 'dashboard', noCache: true }
		},
		  {
			path: '/system/404',
			component: (resolve) => require(['@/views/system/404'], resolve),
			name: '404',
			meta: { level:2,title: "404", icon: 'dashboard', noCache: true }
		  },
		  {
			path: '/system/500',
			component: (resolve) => require(['@/views/system/500'], resolve),
			name: '500',
			meta: { level:2,title: '500', icon: 'form', noCache: true }
		  }
	]
  },

  	{
		path: '/detail',
		component: Layout,
		redirect: '/detail/index',
		name:'detail',
		meta: {level:1, title: '详情页面', icon: 'form', noCache: true },
		children: [
		  	{
				path: '/detail/index',
				component: (resolve) => require(['@/views/detail/index'], resolve),
				name: 'statusPage',
				meta: { single:true,level:2,title: "详情页面", icon: 'dashboard', noCache: true }
			},
			{
				path: '/detail/view',
				component: (resolve) => require(['@/views/detail/view'], resolve),
				name: 'statusPage',
				meta: { single:true,level:2,title: "查看详情", icon: 'dashboard', noCache: true }
			},
		]
	},

]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
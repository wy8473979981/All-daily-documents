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
		path: '',
		component: Layout,
		redirect: '/market/index',
		meta: { title: '市场活动', icon: 'chart', noCache: true }
	},
	{
		path: '/market',
		component: Layout,
		redirect: '/market/index',
		name: 'market',
		meta: { level: 1, title: '市场活动', icon: 'chart', noCache: true },
		children: [
			{
				path: '/market/index',
				component: (resolve) => require(['@/views/market/index'], resolve),
				// name: 'index',
				meta: { level: 2, title: '市场活动', icon: 'chart', noCache: true }
			},
			{
				path: '/market/index/add',
				component: (resolve) => require(['@/views/market/add'], resolve),
				name: 'marketAdd',
				hidden: true,
				meta: { level: 3, title: '新增', noCache: true, }
			},
			{
				path: '/market/index/edit',
				component: (resolve) => require(['@/views/market/add'], resolve),
				name: 'marketEdit',
				hidden: true,
				meta: { level: 3, title: '修改', noCache: true }
			},
			{
				path: '/market/index/detail',
				component: (resolve) => require(['@/views/market/detail'], resolve),
				name: 'marketDetail',
				hidden: true,
				meta: { level: 3, title: '详情', noCache: true }
			},
			{
				path: '/market/index/channelDetail',
				component: (resolve) => require(['@/views/market/channelDetail'], resolve),
				name: 'channelDetail',
				hidden: true,
				meta: { level: 3, title: '渠道详情', noCache: true }
			},
			{
				path: '/market/index/channelRedactAdd',
				component: (resolve) => require(['@/views/market/channelRedact'], resolve),
				name: 'channelRedactAdd',
				hidden: true,
				meta: { level: 3, title: '渠道新增', noCache: true }
			},
			{
				path: '/market/index/channelRedactEdit',
				component: (resolve) => require(['@/views/market/channelRedact'], resolve),
				name: 'channelRedactEdit',
				hidden: true,
				meta: { level: 3, title: '渠道修改', noCache: true }
			},
		]
	}, {
		path: '/consumer',
		component: Layout,
		redirect: '/consumer/index',
		name: 'consumer',
		meta: { title: '客户', level: 1, icon: 'user', noCache: true },
		children: [
			{
				path: '/consumer/index',
				component: (resolve) => require(['@/views/consumer/index'], resolve),
				// name: 'index',
				meta: { level: 2, title: '客户', icon: 'user', noCache: true, }
			},
			{
				path: '/consumer/index/add',
				component: (resolve) => require(['@/views/consumer/add'], resolve),
				name: 'consumerAdd',
				hidden: true,
				meta: { level: 3, title: '新增', noCache: true }
			},
			{
				path: '/consumer/index/edit',
				component: (resolve) => require(['@/views/consumer/add'], resolve),
				name: 'consumerEdit',
				hidden: true,
				meta: { level: 3, title: '修改' }
			},
			{
				path: '/consumer/index/detail',
				component: (resolve) => require(['@/views/consumer/detail'], resolve),
				name: 'consumerDetail',
				hidden: true,
				meta: { level: 3, title: '详情' }
			},
			{
				path: '/consumer/index/accessoryAdd',
				component: (resolve) => require(['@/views/consumer/components/accessory/edit'], resolve),
				name: 'accessoryAdd',
				hidden: true,
				meta: { level: 3, title: '附件新增' }
			},
			{
				path: '/consumer/index/accessoryEdit',
				component: (resolve) => require(['@/views/consumer/components/accessory/edit'], resolve),
				name: 'accessoryEdit',
				hidden: true,
				meta: { level: 3, title: '附件修改' }
			},
			{
				path: '/consumer/index/accessoryDetail',
				component: (resolve) => require(['@/views/consumer/components/accessory/detail'], resolve),
				name: 'accessoryDetail',
				hidden: true,
				meta: { level: 3, title: '附件详情' }
			}
		]
	}, {
		path: '/consumerImport',
		component: Layout,
		redirect: '/consumerImport/index',
		// name: 'consumerImport',
		meta: {
			title: '客户导入',
			level: 1,
			icon: 'example'
		},
		children: [
			{
				path: '/consumerImport/index',
				component: (resolve) => require(['@/views/consumerImport/index'], resolve),
				name: 'index',
				meta: { level: 2, title: '客户导入', icon: 'example' }
			}
		]
	}, {
		path: '/business',
		component: Layout,
		redirect: '/business/index',
		name: 'business',
		meta: {
			title: '商机',
			level: 1,
			icon: 'international'
		},
		children: [
			{
				path: '/business/index',
				component: (resolve) => require(['@/views/business/index'], resolve),
				// name: 'index',
				meta: { level: 2, title: '商机', icon: 'international', noCache: true, }
			},
			{
				path: '/business/index/add',
				component: (resolve) => require(['@/views/business/add'], resolve),
				name: 'add',
				hidden: true,
				meta: { level: 3, title: '新增' }
			},
			{
				path: '/business/index/edit',
				component: (resolve) => require(['@/views/business/add'], resolve),
				name: 'edit',
				hidden: true,
				meta: { level: 3, title: '修改' }
			},
			{
				path: '/business/index/detail',
				component: (resolve) => require(['@/views/business/detail'], resolve),
				name: 'detail',
				hidden: true,
				meta: { level: 3, title: '详情' }
			}
		]
	}, {
		path: '/visit',
		component: Layout,
		redirect: '/visit/index',
		name: 'visit',
		meta: {
			title: '拜访',
			level: 1,
			icon: 'guide'
		},
		children: [
			{
				path: '/visit/index',
				component: (resolve) => require(['@/views/visit/index'], resolve),
				// name: 'index',
				meta: { level: 2, title: '拜访', icon: 'guide', noCache: true, }
			},
			{
				path: '/visit/index/add',
				component: (resolve) => require(['@/views/visit/add'], resolve),
				name: 'add',
				hidden: true,
				meta: { level: 3, title: '新增' }
			},
			{
				path: '/visit/index/edit',
				component: (resolve) => require(['@/views/visit/add'], resolve),
				name: 'edit',
				hidden: true,
				meta: { level: 3, title: '修改' }
			},
			{
				path: '/visit/index/detail',
				component: (resolve) => require(['@/views/visit/detail'], resolve),
				name: 'detail',
				hidden: true,
				meta: { level: 3, title: '详情' }
			}
		]
	}, {
		path: '/contacts',
		component: Layout,
		redirect: '/contacts/index',
		name: 'contacts',
		meta: {
			title: '联系人',
			level: 1,
			icon: 'email'
		},
		children: [
			{
				path: '/contacts/index',
				component: (resolve) => require(['@/views/contacts/index'], resolve),
				// name: 'index',
				meta: { level: 2, title: '联系人', icon: 'email', noCache: true, }
			},
			{
				path: '/contacts/index/add',
				component: (resolve) => require(['@/views/contacts/add'], resolve),
				name: 'add',
				hidden: true,
				meta: { level: 3, title: '新增' }
			},
			{
				path: '/contacts/index/edit',
				component: (resolve) => require(['@/views/contacts/add'], resolve),
				name: 'edit',
				hidden: true,
				meta: { level: 3, title: '修改' }
			},
			{
				path: '/contacts/index/detail',
				component: (resolve) => require(['@/views/contacts/detail'], resolve),
				name: 'detail',
				hidden: true,
				meta: { level: 3, title: '详情' }
			}
		]
	},
	{
		path: '/todoApproval',
		component: Layout,
		redirect: '/todoApproval/index',
		name: 'contacts',
		meta: {
			title: '业务审批',
			level: 1,
			icon: 'email'
		},
		children: [
			{
				path: '/todoApproval/index',
				component: (resolve) => require(['@/views/todoApproval/index'], resolve),
				// name: 'index',
				meta: { level: 2, title: '业务审批', icon: 'documentation', noCache: true, }
			},
			{
				path: '/todoApproval/index/detail',
				component: (resolve) => require(['@/views/todoApproval/detail'], resolve),
				name: 'detail',
				hidden: true,
				meta: { level: 3, title: '详情' }
			}
		]
	},
	{
		path: '/more',
		component: Layout,
		redirect: '/more/siteIndex',
		// name: 'more',
		meta: { title: '更多', icon: 'excel' },
		children: [
			{
				path: '/more/siteIndex',
				component: (resolve) => require(['@/views/site/index'], resolve),
				name: 'siteIndex',
				meta: { level: 2, title: "地址信息" },
			},
			{
				path: '/more/siteIndex/detail',
				component: (resolve) => require(['@/views/site/detail'], resolve),
				name: 'site',
				hidden: true,
				meta: { level: 3, title: "详情" }
			},
			{
				path: '/more/siteIndex/add',
				component: (resolve) => require(['@/views/site/add'], resolve),
				name: 'site',
				hidden: true,
				meta: { level: 3, title: "新增" }
			},
			{
				path: '/more/siteIndex/edit',
				component: (resolve) => require(['@/views/site/add'], resolve),
				name: 'site',
				hidden: true,
				meta: { level: 3, title: "修改" }
			},
			{
				path: '/more/legalControlIndex',
				component: (resolve) => require(['@/views/legalControl/index'], resolve),
				name: 'legalControlIndex',
				meta: { level: 2, title: "法定代表及实控人" }
			},
			{
				path: '/more/legalControlIndex/detail',
				component: (resolve) => require(['@/views/legalControl/detail'], resolve),
				name: 'legalControl',
				hidden: true,
				meta: { level: 3, title: "详情" }
			},
			{
				path: '/more/legalControlIndex/add',
				component: (resolve) => require(['@/views/legalControl/add'], resolve),
				name: 'legalControl',
				hidden: true,
				meta: { level: 3, title: "新增" }
			},
			{
				path: '/more/legalControlIndex/edit',
				component: (resolve) => require(['@/views/legalControl/add'], resolve),
				name: 'legalControl',
				hidden: true,
				meta: { level: 3, title: "修改" }
			},
			{
				path: '/more/operationIndex',
				component: (resolve) => require(['@/views/operationStatistics/index'], resolve),
				name: 'operationIndex',
				meta: { level: 2, title: "业务统计" }
			},
			{
				path: '/more/operationIndex/activity',
				component: (resolve) => require(['@/views/operationStatistics/activityStatistics'], resolve),
				name: 'operation',
				hidden: true,
				meta: { level: 3, title: "活动统计" }
			},
			{
				path: '/more/operationIndex/visit',
				component: (resolve) => require(['@/views/operationStatistics/visitStatistics'], resolve),
				name: 'operation',
				hidden: true,
				meta: { level: 3, title: "拜访统计" }
			},
			{
				path: '/more/operationIndex/busines',
				component: (resolve) => require(['@/views/operationStatistics/businessStatistics'], resolve),
				name: 'operation',
				hidden: true,
				meta: { level: 3, title: "商机统计" }
			},
			{
				path: '/more/batchTranferConsumer',
				component: (resolve) => require(['@/views/batchTranferConsumer/index'], resolve),
				name: 'batchTranferConsumer',
				meta: { level: 2, title: "批量转让客户" }
			},
			{
				path: '/more/shareProfitSet',
				component: (resolve) => require(['@/views/shareProfitSet/index'], resolve),
				name: 'shareProfitSet',
				meta: { level: 2, title: "分润设置" }
			},
			{
				path: '/more/shareProfitSet/detail',
				component: (resolve) => require(['@/views/shareProfitSet/detail'], resolve),
				name: 'detail',
				hidden: true,
				meta: { level: 3, title: "详情" }
			},
			{
				path: '/more/shareProfitSet/add',
				component: (resolve) => require(['@/views/shareProfitSet/add'], resolve),
				name: 'add',
				hidden: true,
				meta: { level: 3, title: "新增" }
			},
			{
				path: '/more/shareProfitSet/edit',
				component: (resolve) => require(['@/views/shareProfitSet/add'], resolve),
				name: 'edit',
				hidden: true,
				meta: { level: 3, title: "修改" }
			},
		]
	},
	{
		path: '/customize',
		component: TransformTpl,
		redirect: '/customize/questionnaire',
		name: 'customize',
		meta: { level: 1, title: '普洛斯金融', icon: 'dashboard', noCache: true },
		children: [
			{
				path: '/customize/questionnaire',
				component: (resolve) => require(['@/views/customize/index'], resolve),
				name: 'customize',
				meta: { level: 2, title: "普洛斯金融", icon: 'dashboard', noCache: true }
			},
		]
	},
	{
		path: '/system',
		component: TransformTpl,
		redirect: '/system/404',
		name: 'system',
		meta: { level: 1, title: '系统提示', icon: 'form', noCache: true },
		children: [
			{
				path: '/system/403',
				component: (resolve) => require(['@/views/system/403'], resolve),
				name: '403',
				meta: { level: 2, title: "403", icon: 'dashboard', noCache: true }
			},
			{
				path: '/system/404',
				component: (resolve) => require(['@/views/system/404'], resolve),
				name: '404',
				meta: { level: 2, title: "404", icon: 'dashboard', noCache: true }
			},
			{
				path: '/system/500',
				component: (resolve) => require(['@/views/system/500'], resolve),
				name: '500',
				meta: { level: 2, title: '500', icon: 'form', noCache: true }
			}
		]
	},
]

export default new Router({
	mode: 'history', // require service support
	scrollBehavior: () => ({ y: 0 }),
	routes: constantRouterMap
})
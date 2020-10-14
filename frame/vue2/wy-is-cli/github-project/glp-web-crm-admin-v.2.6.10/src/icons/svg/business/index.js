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
export const constantRouterMap = [
  {
	path: '/icon',
	component: Layout,
	children: [
	  {
		path: 'index',
		component: (resolve) => require(['@/views/icons/index'], resolve),
		name: 'Icons',
		meta: { title: '图标', icon: 'icon', noCache: true },
		children: [

		]
	  }
	]
  },
  {
	path: '/todo',
	component: Layout,
	redirect: '/todo/tohandle',
	name: 'todo',
	meta: { title: '我的待办', icon: 'icon-cangkuguanli', noCache: true,level:1},
	children: [
		{
			path: '/todo/tohandle',
			component: (resolve) => require(['@/views/todo/ToHandle'], resolve),
			name: 'tohandle',
			meta: { title: '待处理', icon: 'icon', noCache: true ,single:true,level:2},
		},
		{
			path: '/todo/handled',
			component: (resolve) => require(['@/views/todo/Handled'], resolve),
			name: 'handled',
			hidden:true,
			meta: { title: '已处理', icon: 'icon', noCache: true ,single:true,level:2},
		},
		{
			path: '/todo/detail',
			component: (resolve) => require(['@/views/todo/Detail'], resolve),
			name: 'todo-detail',
			hidden:true,
			meta: { title: "详情", icon: 'dashboard', noCache: true ,single:true,level:2}
		},
	]
  },
  {
	path: '',
	component: Layout,
	// redirect: '/permission/toList',
	redirect: '/todo/tohandle',
	meta: { title: '表单', icon: 'form', noCache: true }
  },
  {
	path: '/system',
	component: TransformTpl,
	redirect: '/system/404',
	name:'system',
	meta: { title: '系统提示', icon: 'form', noCache: true },
	children: [
	  	{
			path: '403',
			component: (resolve) => require(['@/views/system/403'], resolve),
			name: '403',
			meta: { title: "403", icon: 'dashboard', noCache: true }
		},
		  {
			path: '404',
			component: (resolve) => require(['@/views/system/404'], resolve),
			name: '404',
			meta: { title: "404", icon: 'dashboard', noCache: true }
		  },
		  {
			path: '500',
			component: (resolve) => require(['@/views/system/500'], resolve),
			name: '500',
			meta: { title: '500', icon: 'form', noCache: true }
		  }
	]
  },
  	{
		path: '/testicon',
		component: Layout,
		redirect: '/testicon/index',
		name:'testiconList',
		meta: { title: 'testicon列表', icon: 'form', noCache: true },
		children: [
		  	{
				path: 'index',
				component: (resolve) => require(['@/views/testicon/index'], resolve),
				name: 'testiconIndex',
				meta: { title: "list", icon: 'dashboard', noCache: true }
			}
		]
	},
  	/*---------------------start准入相关路由----------------------*/
  	{
		path: '/baseManagement',
		component: Layout,
		redirect: '/baseManagement/warehouseList',
		name:'baseManagement',
		meta: { title: '基础信息管理', icon: 'icon-jichuxinxiguanli', noCache: true },
		children: [
		  	{ 
				path: '/baseManagement/warehouseList',
				component: (resolve) => require(['@/views/warehouse/list'], resolve),
				name: 'list',
				meta: {
					level:2,
					title: "仓库管理", icon: 'icon-cangkuguanli', noCache: true }
			},
			{
				path: '/baseManagement/warehouseList/edit',
				component: (resolve) => require(['@/views/warehouse/Detail'], resolve),
				name: 'edit',
				hidden:true,
				meta: {
					level:3,
					title: "新增仓库",rname:'新增仓库', icon: 'dashboard', noCache: true }
			},
			{
				path: '/baseManagement/warehouseList/view',
				component: (resolve) => require(['@/views/warehouse/View'], resolve),
				name: 'view',
				hidden:true,
				meta: {
					level:3,
					title: "查看仓库", icon: 'dashboard', noCache: true }
			},


			{
				path: '/baseManagement/operator',
				component: (resolve) => require(['@/views/operator/list'], resolve),
				name: 'list',
				meta: { 
					level:2,
					title: "运营方管理", icon: 'icon-yunyingfangguanli', noCache: true }
			},
			{
				path: '/baseManagement/operator/edit',
				component: (resolve) => require(['@/views/operator/Detail'], resolve),
				name: 'edit',
				hidden:true,
				meta: {
					level:3,
					title: "新增运营方",rname:'新增运营方', icon: 'dashboard', noCache: true }
			},
			{
				path: '/baseManagement/operator/view',
				component: (resolve) => require(['@/views/operator/View'], resolve),
				name: 'view',
				hidden:true,
				meta: {
					level:3,
					title: "查看运营方", icon: 'dashboard', noCache: true }
			},
		]
	},
	{
		path: '/permission',
		component: Layout,
		redirect: '/permission/toList',
		name:'permission',
		meta: { title: '准入管理', icon: 'icon-zhunruguanli', noCache: true},
		children: [
		  	{
				path: '/permission/toList',
				component: (resolve) => require(['@/views/permission/to/List'], resolve),
				name: 'list',
				meta: {
					level:2,
					title: "准入管理", icon: 'icon-wodedaiban', noCache: true}
			},
			{
				path: '/permission/toList/edit',
				component: (resolve) => require(['@/views/permission/to/Edit'], resolve),
				name: 'edit',
				hidden:true,
				meta: {
					level:3,
					title: "编辑准入信息", icon: 'dashboard', noCache: true }
			},
			{
				path: '/permission/toList/detail',
				component: (resolve) => require(['@/views/permission/to/Detail'], resolve),
				name: 'detail',
				hidden:true,
				meta: {
					level:3,
					title: "审批详情", icon: 'dashboard', noCache: true }
			},

			{
				path: '/permission/toList/operateDetail',
				component: (resolve) => require(['@/views/permission/to/mainDetail'], resolve),
				name: 'operateDetail',
				hidden:true,
				meta: {
					level:3,
					title: "审批详情", icon: 'dashboard', noCache: true }
			},
			{
				path: '/permission/toList/viewDetail',
				component: (resolve) => require(['@/views/permission/history/Detail'], resolve),
				name: 'viewDetail',
				hidden:true,
				meta: {
					level:3,
					title: "审批详情", icon: 'dashboard', noCache: true }
			},


			{
				path: '/permission/history',
				component: (resolve) => require(['@/views/permission/history/List'], resolve),
				name: 'history',
				hidden:true,
				meta: {
					level:2,
					title: "审批历史", icon: 'icon-shenpilishi', noCache: true }
			},
			{
				path: '/permission/history/detail',
				component: (resolve) => require(['@/views/permission/history/Detail'], resolve),
				name: 'detail',
				hidden:true,
				meta: {
					level:3,
					title: "查看准入信息", icon: 'dashboard', noCache: true }
			}
		]
	},
	{
		path: '/agreement',
		component: Layout,
		redirect: '/agreement/list',
		name:'agreement',
		meta: { title: '协议管理', icon: 'icon-xieyiguanli', noCache: true },
		children: [
		  	{
				path: '/agreement/list',
				component: (resolve) => require(['@/views/agreement/List'], resolve),
				name: 'list',
				meta: {
					level:2,
					title: "协议登记",rname:'协议管理列表', icon: 'icon-xieyidengji', noCache: true }
			},
			{
				path: '/agreement/list/detail',
				component: (resolve) => require(['@/views/agreement/Detail'], resolve),
				name: 'detail',
				hidden:true,
				meta: {
					level:3,
					title: "新增协议登记详情", icon: 'dashboard', noCache: true }
			}
		]
	},
  	/*---------------------end准入相关路由----------------------*/


	/*---------------------库存盘点相关路由start----------------------*/
	{
		path: '/warehouseInventoryThird',
		component: Layout,
		redirect: '/warehouseInventoryThird/index',
	    name: 'warehouseInventoryThird',
		meta: {title: '库存盘点',icon: 'icon-cangkuguanli'},
		children:[
			{//第三方
				path: '/warehouseInventoryThird/index',
				component: (resolve) => require(['@/views/third/thirdetailed'], resolve),
				name: 'thirdetailed',
				meta: {title:'监管方',rname:'盘点单查看-第三方监管人员专用',icon: 'icon-cangkuguanli',level:2,single:true}
			},
		]
	},
    {
		path: '/warehouseInventory',
		component: Layout,
		redirect: '/warehouseInventory/inventoryTask',
	    name: 'warehouseInventory',
		meta: {title: '库存盘点',icon: 'icon-pandianrenwuguanli2'},
		children: [
			//盘点任务管理
			{//列表
				path: '/warehouseInventory/inventoryTask',
				component: (resolve) => require(['@/views/task/List'], resolve),
				name: 'list',
				meta: { title: '盘点任务管理',icon: 'icon-pandianrenwuguanli',level:2}
			},
			{//新增盘点
				path: '/warehouseInventory/inventoryTask/add',
				component: (resolve) => require(['@/views/task/add'], resolve),
				name: 'add',
				hidden:true,
				meta: {level:3,title:'盘点任务管理',rname:'新建盘点任务',icon: 'icon-pandianrenwuguanli', noCache: true }
			},
			{//任务参数查看
				path: '/warehouseInventory/inventoryTask/taskParam',
				component: (resolve) => require(['@/views/task/taskParam'], resolve),
				name: 'taskParam',
				hidden:true,
				meta: {level:3, title:'盘点任务管理',rname: '任务参数查看',icon: 'icon-pandianrenwuguanli', noCache: true}
			},
			{//任务清单查看
				path: '/warehouseInventory/inventoryTask/lists',
				component: (resolve) => require(['@/views/task/lists'], resolve),
				name: 'lists',
				hidden:true,
				meta: {level:3,title:'盘点任务管理', rname: '任务清单查看',icon: 'icon-pandianrenwuguanli', }
			},
			{//任务清单查看明细
				path: '/warehouseInventory/inventoryTask/detailed',
				component: (resolve) => require(['@/views/task/detailed'], resolve),
				name: 'detailed',
				hidden:true,
				meta: {level:3, title:'盘点任务管理',rname: '盘点单查看',icon: 'icon-pandianrenwuguanli',}
			},
			{//任务清单重盘
				path: '/warehouseInventory/inventoryTask/heveydisk',
				component: (resolve) => require(['@/views/task/heveydisk'], resolve),
				name: 'heveydisk',
				hidden:true,
				meta: {level:3,title:'盘点任务管理',rname: '盘点单新建重盘',icon: 'icon-pandianrenwuguanli'}
			},
			//盘点报告
			{//列表
				path: '/warehouseInventory/inventoryReport',
				component: (resolve) => require(['@/views/report/inventoryReport'], resolve),
				name: 'inventoryReport',
				meta: { title: '盘点报告',icon: 'icon-pandianbaogao',level:2}
			},
			{//盘点单报告列表
				path: '/warehouseInventory/inventoryReport/seelist',
				component: (resolve) => require(['@/views/report/seelist'], resolve),
				name: 'seelist',
				hidden:true,
				meta: {level:3,title: '盘点报告',rname: '盘点单报告列表',icon: 'icon-pandianbaogao'}
			},
			{//盘点单报告明细
				path: '/warehouseInventory/inventoryReport/detailed',
				component: (resolve) => require(['@/views/report/detailed'], resolve),
				name: 'detailed',
				hidden:true,
				meta: {level:3,title: '盘点报告',rname: '盘点单报告详情',icon: 'icon-pandianbaogao'}
			},
		  //盘点效率
		  {//列表
			path: '/warehouseInventory/inventoryEfficiency',
			component: (resolve) => require(['@/views/efficiency/inventoryEfficiency'], resolve),
			name: 'inventoryEfficiency',
			meta: { title: '盘点效率',icon: 'icon-pandianxiaolv',level:2}
		  },
		  {//详情
			path: '/warehouseInventory/inventoryEfficiency/detailed',
			component: (resolve) => require(['@/views/efficiency/detailed'], resolve),
			name: 'detailed',
			hidden:true,
			meta: {level:3,title: '盘点效率',rname: '详情',icon: 'icon-pandianxiaolv'}
		   },
		   {//详情明细
			path: '/warehouseInventory/inventoryEfficiency/detailedll',
			component: (resolve) => require(['@/views/efficiency/detailedll'], resolve),
			name: 'detailedll',
			hidden:true,
			meta: {level:3,title: '盘点效率',rname: '盘点单报告详情',icon: 'icon-pandianxiaolv'}
		  },
		  //账户管理
          {//列表
			path: '/warehouseInventory/accountInfo',
			component: (resolve) => require(['@/views/account/account'], resolve),
			name: 'account',
			meta: { title: '账户管理',icon: 'icon-account',level:2}
		  },
		]
	},
    /*---------------------库存盘点相关路由end----------------------*/
	/*------------杰之行出库管理start-------------*/
	//运营专员
	{
	path: '/outgoingManagement',
	component: Layout,
	redirect: '/outgoingManagement/index',
	name: 'outgoingManagement',
	meta: {title: '出库管理',icon: 'icon-cangkuguanli'},
	children:[
		{//出库查询
			path: '/outgoingManagement/index',
			component: (resolve) => require(['@/views/outgoingManagement/list'], resolve),
			name: 'list',
			meta: {title:'出库查询',rname:'出库查询',icon: 'icon-cangkuguanli',level:2,single:true}
		},
		{//审批详情
			path: '/outgoingManagement/index/Detail',
			component: (resolve) => require(['@/views/outgoingManagement/Detail'], resolve),
			name: 'Detail',
			hidden:true,
			meta: {
				level:3,
				title: "审批详情", icon: 'icon-cangkuguanli', noCache: true }
		},
	 ]
	},
	//数据专员
	{
		path: '/dataSteward',
		component: Layout,
		redirect: '/dataSteward/index',
		name: 'dataSteward',
		meta: {title: '出库管理',icon: 'icon-cangkuguanli'},
		children:[
			{//出库查询
				path: '/dataSteward/index',
				component: (resolve) => require(['@/views/dataSteward/list'], resolve),
				name: 'list',
				meta: {title:'出库查询',rname:'出库查询',icon: 'icon-cangkuguanli',level:2,single:true}
			},
			{//审批详情
				path: '/dataSteward/index/Detail',
				component: (resolve) => require(['@/views/dataSteward/Detail'], resolve),
				name: 'Detail',
				hidden:true,
				meta: {
					level:3,
					title: "审批详情", icon: 'icon-cangkuguanli', noCache: true }
			},
		 ]
	},
	/*------------杰之行出库管理end-------------*/
	/*---------商品管理start----------*/
	{
		path: '/commodityManagement',
		component: Layout,
		redirect: '/commodityManagement/index',
		name: 'commodityManagement',
		meta: {title: '商品管理',icon: 'icon-cangkuguanli'},
		children:[
			{//商品信息
				path: '/commodityManagement/index',
				component: (resolve) => require(['@/views/commodityManagement/index'], resolve),
				name: 'index',
				meta: {title:'商品信息',rname:'商品信息',icon: 'icon-cangkuguanli',level:2,single:true}
			},
			{//查看
				path: '/commodityManagement/index/commodityDetail',
				component: (resolve) => require(['@/views/commodityManagement/commodityDetail'], resolve),
				name: 'commodityDetail',
				hidden:true,
				meta: {
					level:3,
					title: "查看详情", icon: 'icon-cangkuguanli', noCache: true }
			},
			{//历史明细
				path: '/commodityManagement/index/historyDetail',
				component: (resolve) => require(['@/views/commodityManagement/historyDetail'], resolve),
				name: 'historyDetail',
				hidden:true,
				meta: {
					level:3,
					title: "历史明细", icon: 'icon-cangkuguanli', noCache: true }
			},
			{//客户信息
				path: '/commodityManagement/customerList',
				component: (resolve) => require(['@/views/commodityManagement/customerList'], resolve),
				name: 'customerList',
				meta: {title:'客户信息',rname:'客户信息',icon: 'icon-cangkuguanli',level:2,single:true}
			},
			{//客户详情
				path: '/commodityManagement/customerList/customerDetail',
				component: (resolve) => require(['@/views/commodityManagement/customerDetail'], resolve),
				name: 'customerDetail',
				hidden:true,
				meta: {
					level:3,
					title: "客户详情", icon: 'icon-cangkuguanli', noCache: true }
			},
			{//品类品牌
				path: '/commodityManagement/categoryBrand',
				component: (resolve) => require(['@/views/commodityManagement/categoryBrand'], resolve),
				name: 'categoryBrand',
				meta: {title:'品类品牌信息',rname:'品类品牌信息',icon: 'icon-cangkuguanli',level:2,single:true}
			},
			{//商品质押管理
				path: '/commodityManagement/commodityPledge',
				component: (resolve) => require(['@/views/commodityManagement/commodityPledge'], resolve),
				name: 'commodityPledge',
				meta: {title:'商品质押管理',rname:'商品质押管理',icon: 'icon-cangkuguanli',level:2,single:true}
			},
			{//客户质押管理
				path: '/commodityManagement/customerPledge',
				component: (resolve) => require(['@/views/commodityManagement/customerPledge'], resolve),
				name: 'customerPledge',
				meta: {title:'客户质押管理',rname:'客户质押管理',icon: 'icon-cangkuguanli',level:2,single:true}
			},
			{//商品预警列表
				path: '/commodityManagement/commodityWarning',
				component: (resolve) => require(['@/views/commodityManagement/commodityWarning'], resolve),
				name: 'commodityWarning',
				meta: {title:'商品预警查询',rname:'商品预警查询',icon: 'icon-cangkuguanli',level:2,single:true}
			},
			{//商品预警详情
				path: '/commodityManagement/commodityWarning/warningDetail',
				component: (resolve) => require(['@/views/commodityManagement/warningDetail'], resolve),
				name: 'warningDetail',
				meta: {title:'商品预警查询',rname:'商品预警查询',icon: 'icon-cangkuguanli',level:3,single:true}
			},
			{//品类盘点阈值
				path: '/commodityManagement/inventoryThreshold',
				component: (resolve) => require(['@/views/commodityManagement/inventoryThreshold'], resolve),
				name: 'inventoryThreshold',
				meta: {title:'品类盘点阈值',rname:'品类盘点阈值',icon: 'icon-cangkuguanli',level:2,single:true}
			},
			{//价格信息维护
				path: '/commodityManagement/commodityPrice',
				component: (resolve) => require(['@/views/commodityManagement/commodityPrice'], resolve),
				name: 'commodityPrice',
				meta: {title:'价格信息维护',rname:'价格信息维护',icon: 'icon-cangkuguanli',level:2,single:true}
			},
			{//价格信息维护-历史明细
				path: '/commodityManagement/commodityPrice/priceDetail',
				component: (resolve) => require(['@/views/commodityManagement/priceDetail'], resolve),
				name: 'priceDetail',
				meta: {title:'价格信息维护',rname:'历史明细',icon: 'icon-cangkuguanli',level:3,single:true}
			},
		 ]
	},
	/*---------商品管理end----------*/
	/*---------库存管理start----------*/
	{
		path: '/stockManagement',
		component: Layout,
		redirect: '/stockManagement/warehouseInfo',
		name: 'stockManagement',
		meta: {title: '库存管理',icon: 'icon-cangkuguanli'},
		children:[
			{//仓库信息
				path: '/stockManagement/warehouseInfo',
				component: (resolve) => require(['@/views/stockManagement/warehouseInfo'], resolve),
				name: 'warehouseInfo',
				meta: {title:'仓库信息',rname:'仓库信息',icon: 'icon-cangkuguanli',level:2,single:true}
			},
			{//入库列表
				path: '/stockManagement/intoWarehouseList',
				component: (resolve) => require(['@/views/stockManagement/intoWarehouseList'], resolve),
				name: 'intoWarehouseList',
				meta: {
					level:2,
					title: "入库列表", icon: 'icon-cangkuguanli', single:true }
			},
			{//入库详情
				path: '/stockManagement/intoWarehouseList/intoWarehouseDetail',
				component: (resolve) => require(['@/views/stockManagement/intoWarehouseDetail'], resolve),
				name: 'intoWarehouseDetail',
				hidden:true,
				meta: {
					level:3,
					title: "入库详情", icon: 'icon-cangkuguanli', noCache: true }
			},
			{//出库列表 
				path: '/stockManagement/outWarehouseList',
				component: (resolve) => require(['@/views/stockManagement/outWarehouseList'], resolve),
				name: 'outWarehouseList',
				meta: {
					level:2,
					title: "出库列表", icon: 'icon-cangkuguanli', single:true }
			},
			{//出库详情
				path: '/stockManagement/outWarehouseList/outWarehouseDetail',
				component: (resolve) => require(['@/views/stockManagement/outWarehouseDetail'], resolve),
				name: 'outWarehouseDetail',
				hidden:true,
				meta: {
					level:3,
					title: "出库详情", icon: 'icon-cangkuguanli', noCache: true }
			},
			{//最新库存查询
				path: '/stockManagement/checkStock',
				component: (resolve) => require(['@/views/stockManagement/checkStock'], resolve),
				name: 'checkStock',
				meta: {
					level:3,
					title: "最新库存查询", icon: 'icon-cangkuguanli', noCache: true }
			},
			{//历史库存查询
				path: '/stockManagement/checkHistoryStock',
				component: (resolve) => require(['@/views/stockManagement/checkHistoryStock'], resolve),
				name: 'checkHistoryStock',
				meta: {
					level:3,
					title: "历史库存查询", icon: 'icon-cangkuguanli', noCache: true }
			},
			{//库存预警查询
				path: '/stockManagement/stockWarn',
				component: (resolve) => require(['@/views/stockManagement/stockWarn'], resolve),
				name: 'stockWarn',
				meta: {
					level:2,
					title: "库存预警查询", icon: 'icon-cangkuguanli', single:true }
			},
			{//库存预警详情
				path: '/stockManagement/stockWarnDetail',
				component: (resolve) => require(['@/views/stockManagement/stockWarnDetail'], resolve),
				name: 'stockWarnDetail',
				hidden:true,
				meta: {
					level:3,
					title: "预警详情", icon: 'icon-cangkuguanli', noCache: true }
			},
			{//库存对比
				path: '/stockManagement/stockBalance',
				component: (resolve) => require(['@/views/stockManagement/stockBalance'], resolve),
				name: 'stockBalance',
				meta: {
					level:2,
					title: "库存对比", icon: 'icon-cangkuguanli', single:true }
			},
			{//库存对比详情
				path: '/stockManagement/stockBalanceDetail',
				component: (resolve) => require(['@/views/stockManagement/stockBalanceDetail'], resolve),
				name: 'stockBalanceDetail',
				hidden:true,
				meta: {
					level:3,
					title: "库存对比详情", icon: 'icon-cangkuguanli', noCache: true }
			},
		 ]
	},
	/*---------库存管理end----------*/
]

export default new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  { path: '*', redirect: 'system/404', hidden: true }
]

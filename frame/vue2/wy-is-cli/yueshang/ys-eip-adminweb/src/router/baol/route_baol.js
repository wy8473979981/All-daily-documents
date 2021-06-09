import Layout from '@/layout/index.vue'

export default [
	{
		path: '/',
		component: Layout,
		redirect: '/index',
		meta: {
			title: "首页",
			visible: true
		},
		children: [{
			name: "index",
			path: "index",
			component: () => import("@/views/index/index.vue"),
			meta: {
				title: "首页",
				visible: true
			}
		},]
	},
	// {
	// 	path: "/statistic",
	// 	component: Layout,
	// 	redirect: '/statistic/approval_record',
	// 	meta: {
	// 		title: "统计查询",
	// 		// icon: "el-icon-coin",
	// 		visible: true
	// 	},
	// 	children: [{
	// 		name: "approval_record",
	// 		path: "approval_record",
	// 		component: () => import("@/views/statistic/approval_record/index.vue"),
	// 		// component: () => import("@/views/land-manage/parcel-msg/index.vue"),
	// 		meta: {
	// 			title: "网批过期记录",
	// 			visible: true
	// 		}
	// 	},
	// 	{
	// 		name: "parcelMsgDetail",
	// 		path: "parcel_msg/detail",
	// 		component: () => import("@/views/land-manage/parcel-msg/detail.vue"),
	// 		meta: {
	// 			title: "地块信息列表 > 详情",
	// 			visible: false
	// 		}
	// 	},
	// 	]
	// },
	// {
	// 	path: "/base",
	// 	component: Layout,
	// 	redirect: '/base/baseContent',
	// 	meta: {
	// 		title: "基础配置",
	// 		// icon: "el-icon-coin",
	// 		visible: true
	// 	},
	// 	children: [{
	// 		name: "baseContent",
	// 		path: "baseContent",
	// 		component: () => import("@/views/base/baseContentConfig/index.vue"),
	// 		meta: {
	// 			title: "内容模板配置",
	// 			visible: true
	// 		}
	// 	},
	// 	{
	// 		name: "data_d",
	// 		path: "data_d",
	// 		component: () => import("@/views/basic-config/data/index.vue"),
	// 		meta: {
	// 			title: "数据字典",
	// 			visible: true
	// 		}
	// 	},
	// 	{
	// 		name: "serial",
	// 		path: "serial",
	// 		component: () => import("@/views/basic-config/serial/index.vue"),
	// 		meta: {
	// 			title: "序列号规则",
	// 			visible: true
	// 		}
	// 	},
	// 	{
	// 		name: "log",
	// 		path: "log",
	// 		component: () => import("@/views/basic-config/log/index.vue"),
	// 		meta: {
	// 			title: "日志查询",
	// 			visible: true
	// 		}
	// 	},
	// 	{
	// 		name: "dataSync",
	// 		path: "dataSync",
	// 		component: () => import("@/views/basic-config/dataSync/index.vue"),
	// 		meta: {
	// 			title: "数据同步管理",
	// 			visible: true
	// 		}
	// 	}
	// 	]
	// },
	// {
	// 	path: "/approval",
	// 	component: Layout,
	// 	redirect: '/approval/info',
	// 	meta: {
	// 		title: "审批数据",
	// 		// icon: "el-icon-coin",
	// 		visible: true
	// 	},
	// 	children: [{
	// 		name: "info",
	// 		path: "info",
	// 		component: () => import("@/views/approval/info/index.vue"),
	// 		meta: {
	// 			title: "审批信息查询",
	// 			visible: true
	// 		}
	// 	},
	// 	{
	// 		name: "share",
	// 		path: "share",
	// 		component: () => import("@/views/approval/share/index.vue"),
	// 		meta: {
	// 			title: "审批共享查询",
	// 			visible: true
	// 		}
	// 	},
	// 	{
	// 		name: "delay",
	// 		path: "delay",
	// 		component: () => import("@/views/approval/delay/index.vue"),
	// 		meta: {
	// 			title: "延期申请查询",
	// 			visible: true
	// 		}
	// 	},
	// 	{
	// 		name: "approval_push",
	// 		path: "approval_push",
	// 		component: () => import("@/views/approval/push/index.vue"),
	// 		meta: {
	// 			title: "审批推送查询",
	// 			visible: true
	// 		}
	// 	},
	// 	{
	// 		name: "sync",
	// 		path: "sync",
	// 		component: () => import("@/views/approval/sync/index.vue"),
	// 		meta: {
	// 			title: "数据同步查询",
	// 			visible: true
	// 		}
	// 	},
	// 	{
	// 		name: "notice",
	// 		path: "notice",
	// 		component: () => import("@/views/approval/notice/index.vue"),
	// 		meta: {
	// 			title: "数据通知查询",
	// 			visible: true
	// 		}
	// 	},
	// 	{
	// 		name: "todolist",
	// 		path: "todolist",
	// 		component: () => import("@/views/approval/todo/index.vue"),
	// 		meta: {
	// 			title: "待办事项查询",
	// 			visible: true
	// 		}
	// 	}
	// 	]
	// },
	{
		path: "/system",
		component: Layout,
		redirect: '/system/serverList',
		meta: {
			title: "系统监控",
			// icon: "el-icon-coin",
			visible: true
		},
		children: [
			{
				name: "serverList",
				path: "serverList",
				component: () => import("@/views/system/serverList.vue"),
				meta: {
					title: "服务请求明细",
					visible: true
				}
			},
			{
				name: "countTotalList",
				path: "countTotalList",
				component: () => import("@/views/system/countTotalList.vue"),
				meta: {
					title: "调用次数统计-应用",
					visible: true
				}
			},
			{
				name: "countTotalApiList",
				path: "countTotalApiList",
				component: () => import("@/views/system/countTotalApiList.vue"),
				meta: {
					title: "调用次数统计-服务(API)",
					visible: true
				}
			},
			{
				name: "timeTotalList",
				path: "timeTotalList",
				component: () => import("@/views/system/timeTotalList.vue"),
				meta: {
					title: "执行时间统计",
					visible: true
				}
			},
			{
				name: "xcjk",
				path: "xcjk",
				component: () => import("@/views/system/xcjk/index.vue"),
				meta: {
					title: "线程池监控",
					visible: true
				}
			},
		],
	},
	{
		path: "/systemManage",
		component: Layout,
		redirect: '/system/applySupport',
		meta: {
			title: "系统管理",
			// icon: "el-icon-coin",
			visible: true
		},
		children: [{
			name: "applySupport",
			path: "applySupport",
			component: () => import("@/views/systemManage/applySupport.vue"),
			meta: {
				title: "应用维护",
				visible: true
			}
		},
		{
			name: "dataDic",
			path: "dataDic",
			component: () => import("@/views/systemManage/dataDic.vue"),
			meta: {
				title: "数据字典",
				visible: true
			}
		},
		{
			name: 'limitsManage',
			path: "limitsManage",
			component: () => import("@/views/systemManage/limitsManage.vue"),
			meta: {
				title: "权限管理",
				visible: true
			}
		},
		{
			name: 'userManage',
			path: "userManage",
			component: () => import("@/views/systemManage/userManage.vue"),
			meta: {
				title: "已关联用户列表",
				visible: true
			}
		},
		],
	},
	{
		path: "/appManage",
		component: Layout,
		redirect: '/appManage/fwwf',
		meta: {
			title: "应用管理",
			// icon: "el-icon-coin",
			visible: true
		},
		children: [
			{
				name: "fwwf",
				path: "fwwf",
				component: () => import("@/views/appManage/fwwf/index.vue"),
				meta: {
					title: "服务维护",
					visible: true
				}
			},
			{
				name: "cswf",
				path: "cswf",
				component: () => import("@/views/appManage/cswf/index.vue"),
				meta: {
					title: "参数映射维护",
					visible: true
				}
			},
			{
				name: 'sjgz',
				path: "sjgz",
				component: () => import("@/views/appManage/sjgz/index.vue"),
				meta: {
					title: "数据规则",
					visible: true
				}
			},
			{
				name: 'sjtm',
				path: "sjtm",
				component: () => import("@/views/appManage/sjtm/index.vue"),
				meta: {
					title: "数据脱敏",
					visible: true
				}
			},
			{
				name: 'xlpz',
				path: "xlpz",
				component: () => import("@/views/appManage/xlpz/index.vue"),
				meta: {
					title: "限流配置",
					visible: true
				}
			},
			{
				path: 'httpRequest',
				name: 'httpRequest',
				component: () => import("@/views/httpRequest/index.vue"),
				meta: {
					title: "http请求头参数",
					visible: true
				},
			},
			{
				path: 'httpLimite',
				name: 'httpLimite',
				component: () => import("@/views/httpLimite/index.vue"),
				meta: {
					title: "http请求权限",
					visible: true
				},
			},
		],
	},
	{
		path: "/logManage",
		component: Layout,
		redirect: '/logManage/qqrz',
		meta: {
			title: "日志管理",
			// icon: "el-icon-coin",
			visible: true
		},
		children: [
			{
				name: "jsrz",
				path: "jsrz",
				component: () => import("@/views/logManage/jsrz/index.vue"),
				meta: {
					title: "接受日志",
					visible: true
				}
			},
			{
				name: "qqrz",
				path: "qqrz",
				component: () => import("@/views/logManage/qqrz/index.vue"),
				meta: {
					title: "请求错误日志",
					visible: true
				}
			},
			{
				name: 'hdrz',
				path: "hdrz",
				component: () => import("@/views/logManage/hdrz/index.vue"),
				meta: {
					title: "回调错误日志",
					visible: true
				}
			},
		],
	},
];

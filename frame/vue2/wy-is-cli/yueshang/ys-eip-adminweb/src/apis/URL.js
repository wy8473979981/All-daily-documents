const URL = {
	commonModule: {
		midAppIndistinctUrl: '/ys-eip-server/find/midApp/indistinct',// 应用列表模糊查询
		midBusinessIndistinctUrl: '/ys-eip-server/find/midBusiness/indistinct',// 服务（API）列表模糊查询 
		dictUrl: '/ys-eip-server/findConfigByConfigType',// 字典接口
	},
	loginModule: {
		loginUrl: 'ys-eip-server/admin/login',// 登录
		findAllMenuUrl: '/ys-eip-server/admin/findAllMenu',// 用户菜单
		loginOutUrl: '/ys-eip-server/admin/loginOut',// 退出接口
	},
	logManage: {
		qqLogListUrl: '/ys-eip-logger/find/requestError/list',// 请求日志 列表
		qqLogDetailUrl: '/ys-eip-logger/get/requestError/detail',// 请求日志 详情
		hdLogListUrl: '/ys-eip-logger/find/callBackError/list',// 回调日志 列表
		hdLogDetailUrl: '/ys-eip-logger/get/callbackError/detail',// 回调日志 详情
	},
	appManage: {
		fwwfListUrl: '/ys-eip-server/find/midBusiness/list', // 服务维护 列表
		fwwfAddUrl: '/ys-eip-server/midBusiness/add', // 服务维护 新增
		fwwfNameByBusinessUrl: '/ys-eip-server/find/business/by/name',// 模糊搜索  请求通道  和  请求方式
		fwwfEditUrl: '/ys-eip-server/midBusiness/edit', // 服务维护 修改
		fwwfDetailUrl: '/ys-eip-server/find/business/detail', // 服务维护 详情
		fwwfDeleteUrl: '/ys-eip-server/midBusiness/delete',// 服务维护—删除
		fwwfOperateUrl: '/ys-eip-server/midBusiness/operate', // 服务维护 启用或停用指定的服务

		cswfListUrl: '/ys-eip-server/find/midParam/list', // 参数维护 列表
		cswfAddUrl: '/ys-eip-server/midParam/add', // 参数维护 新增参数
		cswfBatchAddUrl: '/ys-eip-server/midParam/batch/add', // 参数维护 批量新增
		cswfRemoveUrl: '/ys-eip-server/midParam/remove', // 参数维护 删除参数
		cswfDetailUrl: '/ys-eip-server/find/midParam/detail', // 参数维护 详情查询

		sjgzListUrl: '/ys-eip-server/find/midDataRule/list',// 数据规则 列表
		sjgzDetailUrl: '/ys-eip-server/midDataRule/details',// 数据规则 详情
		sjgzAddUrl: '/ys-eip-server/midDataRule/operate',// 数据规则 — 新增 /可用 / 不可用

		sjtmListUrl: '/ys-eip-server/find/midRegular/list',// 数据脱敏 列表
		sjtmDetailUrl: '/ys-eip-server/midRegular/details',// 数据脱敏 获取指定服务的脱敏参数配置列表
		sjtmAddUrl: '/ys-eip-server/midRegular/add',// 数据脱敏 新增
		sjtmMidRegularSwitchUrl: '/ys-eip-server/midRegular/editStatus',// 数据脱敏 停用或启用指定脱敏参数

		xlpzListUrl: '/ys-eip-server/find/midFlowConfig/list', // 限流配置 列表
		xlpzAddUrl: '/ys-eip-server/midFlowConfig/add', // 限流配置 新增
		xlpzDeleteUrl: '/ys-eip-server/midFlowConfig/delete', // 限流配置 删除

	},
	systemManage: {
		appListUrl: 'ys-eip-server/find/midAppAuth/appBusinessAuthVO/list',
		userListUrl: '/ys-eip-server/find/midAppAuth/user/list',
		searchAppUrl: 'ys-eip-server/find/midApp/indistinct',
		dicListUrl: 'ys-eip-server/find/midSysConfig/list',
		dicTypes: 'ys-eip-server/findConfigTypeList',
		addDic: 'ys-eip-server/midSysConfig/add',
		switchOpenUrl: 'ys-eip-server/midSysConfig/edit',
		deleteDicUrl: 'ys-eip-server/midSysConfig/remove',
		imitCheckUrl: 'ys-eip-server/midAppAuth/user/operate',
		serveMenu: 'ys-eip-server/find/midApp/indistinct',
		appSuportListUrl: 'ys-eip-server/find/midApp/list',
		addAppUrl: 'ys-eip-server/midApp/add',
		deleteAppUrl: 'ys-eip-server/midApp/remove',
		updataAppUrl: 'ys-eip-server/midApp/edit',
		secretKeyUrl: 'ys-eip-server/midApp/secretKey',
		dicNameUrl: 'ys-eip-server/findConfigByConfigType',
		userLinkListUrl: 'ys-eip-server/find/midAppAuth/by/AppId',
		updateSecretUrl: 'ys-eip-server/midApp/updateSecretKey',
	},
	system: {
		serveListUrl: 'ys-eip-monitor/find/businessMonitor/list',
		requsttUrl: 'ys-eip-monitor/get/businessMonitor/detail',
		countListUrl: 'ys-eip-monitor/find/execute/app/list',
		countAppListUrl: 'ys-eip-monitor/find/execute/business/list',
		lineEchartUrl: 'ys-eip-monitor/find/execute/business/chart',
		lineAppEchartUrl: 'ys-eip-monitor/find/execute/app/chart',
		timeListUrl: 'ys-eip-monitor/find/execute/time/list',
		getThreadPoolInfo: '/ys-eip-monitor/monitor/getThreadPoolInfo',// 获取所有线程池监控信息
		editParamOfThreadPoolForTargetServer: '/ys-eip-monitor/monitor/editParamOfThreadPoolForTargetServer',// 修改指定服务上的指定线程池的参数
	    retryUrl:'/ys-eip-server/business/http/singleRetry'
	},
	home: {
		topCountUrl: 'ys-eip-monitor/find/top/static',
		requestTotalUrl: 'ys-eip-monitor/find/day/request/static',
		appRequestTotalUrl: 'ys-eip-monitor/find/app/request/static',
		successTotalUrl: 'ys-eip-monitor/find/success/static'
	},
	httpRequest: {
		listUrl: 'ys-eip-server/find/midHeaderConfig/list',
		addUrl: 'ys-eip-server/midHeaderConfig/add',
		deleteUrl: 'ys-eip-server/midHeaderConfig/delete',
		updateUrl: 'ys-eip-server/midHeaderConfig/edit'
	},
	httpLimite: {
		listUrl: 'ys-eip-server/find/midCredentialsConfig/list',
		addUrl: 'ys-eip-server/midCredentialsConfig/add',
		deleteUrl: 'ys-eip-server/midCredentialsConfig/delete',
		updateUrl: 'ys-eip-server/midCredentialsConfig/edit'
	}
}
export { URL }
let columnList = {
	timeTotalList: [{
			label: "序号",
			key: 'No',
			width: '60px',
			align: "center",
		},
		{
			label: "应用名称",
			key: "appName",
			width: '120px',
			align: "center",
		},
		{
			label: "服务名称",
			key: "businessName",
			width: '120px',
			align: "center",
		},
		{
			label: "请求时间(单位:毫秒)",
			key: "requestTime",
			align: "center",
		},
		{
			label: "回调时间(单位:毫秒)",
			key: "callbackTime",
			align: "center",
		},
		{
			label: "执行时间(单位:毫秒)",
			key: "totalTime",
			align: "center",
		}
	],
	serverColumn: [{
			label: "序号",
			key: 'No',
			width: '60px',
			align: "center",
		},
		{
			label: "应用名称",
			key: "appName",
			align: "center",
			width: '140px',
		},
		{
			label: "服务名称",
			key: "businessName",
			align: "center",
			width: '300px',
		},
		{
			label: "请求状态",
			key: "reqStatusName",
			align: "center",
			width: '100px',
		},
		{
			label: "请求重试次数",
			key: "reqTimes",
			align: "center",
			width: '120px',
		},
		{
			label: "回调状态",
			key: "callbackStatusName",
			align: "center",
			width: '100px',
		},
		{
			label: "回调重试次数",
			key: "callbackTimes",
			align: "center",
			width: '120px',
		},
		{
			label: "总请求次数",
			key: "times",
			align: "center",
			width: '100px',
		},
		{
			label: "总接受次数",
			key: "receiveTimes",
			align: "center",
			width: '100px',
		},
		{
			label: "创建时间",
			key: "createdDate",
			align: "center",
			width: '170px',
		},
		{
			label: "更新时间",
			key: "updatedDate",
			align: "center",
			width: '170px',
		},
		{
			label: "操作",
			key: "function",
			align: "center",
			width: '90px',
			functionList: [{
					name: '请求',
					showKey:'requestShow',
					function: 'request'
				},
				{
					name: '回调',
					showKey:'callbakeShow',
					function: 'response',
				}
			]
		}
	],
	countTotal: [{
			label: "序号",
			key: 'No',
			width: '60px',
			align: "center",
		},
		{
			label: "应用名称",
			key: "appName",
			width: '140px',
			align: "center",
		},
		{
			label: "服务名称",
			key: "businessName",
			width: '160px',
			align: "center",
		},
		{
			label: "成功次数",
			key: "successTime",
			align: "center",
			width: '40px',
		},
		{
			label: "失败次数",
			key: "failureTime",
			align: "center",
			width: '40px',
		},
		{
			label: "总次数",
			key: "totalTime",
			align: "center",
			width: '40px',
		},
		{
			label: "操作",
			key: "function",
			align: "center",
			width: '50px',
			functionList: [{
				name: '折线图',
				function: 'echartMap'
			}]
		}
	],
	countTotalApi: [{
			label: "序号",
			key: 'No',
			width: '60px',
			align: "center",
		},
		{
			label: "应用名称",
			key: "appName",
			width: '140px',
			align: "center",
		},
		{
			label: "服务名称",
			key: "businessName",
			width: '160px',
			align: "center",
		},
		{
			label: "成功次数",
			key: "successTime",
			align: "center",
			width: '40px',
		},
		{
			label: "失败次数",
			key: "failureTime",
			align: "center",
			width: '40px',
		},
		{
			label: "总次数",
			key: "totalTime",
			align: "center",
			width: '40px',
		},
		{
			label: "操作",
			key: "function",
			width: '50px',
			align: "center",
			functionList: [{
				name: '折线图',
				function: 'echartMap'
			}]
		}
	]
}
export default columnList

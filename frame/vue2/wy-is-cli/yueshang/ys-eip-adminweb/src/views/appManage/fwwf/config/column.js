let columnconfig = {
	tablecolumn1: [
		{
			label: "序列",
			key: 'xuhao',
			width: '80px',
			align: "center",
		},
		{
			label: "应用名称",
			key: "appName",
			width: '180px',
			align: "center",
		},
		
		{
			label: "BusinessCode",
			key: "businessCode",
			width: '160px',
			align: "center",
		},
		{
			label: "服务类型",
			key: "businessType",
			width: '80px',
			align: "center",
		},
		{
			label: "服务名称",
			key: "businessName",
			width: '180px',
			align: "center",
		},
		{
			label: "服务地址",
			key: "businessUrl",
			width: '180px',
			align: "center",
		},
		{
			label: "请求通道",
			key: "reqType",
			width: '100px',
			align: "center",
		},
		{
			label: "请求方式",
			key: "reqMethod",
			width: '100px',
			align: "center",
		},
		{
			label: "是否同步",
			key: "syncFlagName",
			width: '80px',
			align: "center",
		},
		{
			label: "状态",
			key: "status",
			width: '80px',
			align: "center",
			editType: 'switch',
			function: 'switchChange'
		},
		{
			label: "备注",
			key: "remark",
			width: '100px',
			align: "center",
		},
		{
			label: "创建时间",
			key: "createdDate",
			width: '160px',
			align: "center",
		},
		{
			label: "操作",
			key: "function",
			align: "center",
			width: '170px',
			functionList: [
				{
					name: '参数映射',
					function: 'csysFunc',
					color: '#4876EF'
				}, 
				{
					name: '服务监控',
					function: 'fwjkFunc',
					color: '#4876EF'
				}, {
					name: '修改',
					function: 'editOpenFunc',
					color: '#4876EF'
				}, {
					name: '删除',
					function: 'deleteOpenFunc',
					color: '#F4647E'
				},
			]
		}
	],
}
export default columnconfig

let columnconfig = {
	tablecolumn1: [
		{
			label: "序列",
			key: 'No',
			width: '60px',
			align: "center",
		},
		{
			label: "应用名称",
			key: "appName",
			width: '170px',
			align: "center",
		},
		{
			label: "服务名称",
			key: "businessName",
			width: '170px',
			align: "center",
		},
		{
			label: "错误代码",
			key: "httpStatus",
			width: '80px',
			align: "center",
		},
		{
			label: "错误信息",
			key: "errMessage",
			width: '150px',
			align: "center",
		},
		{
			label: "接收时间",
			key: "callbackDate",
			align: "center",
			width: '140px',
		},
		{
			label: "操作",
			key: "function",
			align: "center",
			width: '60px',
			functionList: [
				{
					name: '详情',
					function: 'viewFunc',
					color: '#4876EF'
				}
			]
		}
	],
	tableList: []
}
export default columnconfig
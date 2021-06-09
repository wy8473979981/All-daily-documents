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
			width: '200px',
			align: "center",
		},
		{
			label: "服务名称",
			key: "businessName",
			width: '200px',
			align: "center",
		},
		{
			label: "特殊规则个数",
			key: "ruleNum",
			width: '100px',
			align: "center",
			numberFormat: true,
			numberPrecision: 0,
		},
		{
			label: "操作",
			key: "function",
			align: "center",
			width: '90px',
			functionList: [
				{
					name: '配置',
					function: 'vindicateFunc',
					color: '#4876EF'
				}, {
					name: '查看',
					function: 'viewFunc',
					color: '#4876EF'
				},
			]
		}
	],
}
export default columnconfig

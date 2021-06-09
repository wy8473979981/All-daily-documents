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
			label: "脱敏字段总数",
			key: "fieldNum",
			width: '100px',
			align: "center",
		},
		{
			label: "操作",
			key: "function",
			align: "center",
			width: '90px',
			functionList: [
				{
					name: '配置',
					function: 'deployFunc',
					color: '#4876EF'
				},
				{
					name: '查看',
					function: 'viewFunc',
					color: '#4876EF'
				}
			]
		}
	],
	tablecolumn2: [
		{
			label: "序列",
			key: 'No',
			width: '60px',
			align: "center",
			editType: 'input',
		},
		{
			label: "参数名称",
			key: "remark",
			align: "center",
			width: '150px',
			editType: 'input',
		},
		{
			label: "参数",
			key: "fieldName",
			align: "center",
			width: '150px',
			editType: 'input',
		},
		{
			label: "正则表达式脱敏",
			key: "regular",
			align: "center",
			width: '200px',
			editType: 'input',
		},
		{
			label: "状态",
			key: "statusFlag",
			align: "center",
			width: '130px',
			editType: 'switch',
			function: 'switchChange'
		}
	],
	tablecolumn3: [
		{
			label: "序列",
			key: 'No',
			width: '60px',
			align: "center",
		},
		{
			label: "参数名称",
			key: "key1",
			align: "center",
		},
		{
			label: "参数",
			key: "fieldName",
			align: "center",
		},
		{
			label: "正则表达式脱敏",
			key: "regular",
			align: "center",
			width: '200px',
		},
		{
			label: "状态",
			key: "statusFlag",
			align: "center",
			width: '90px',
			editType: 'switch',
			disabled: true,
		}
	],
	tableList: []
}
export default columnconfig

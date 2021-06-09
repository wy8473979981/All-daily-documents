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
			width: '210px',
			align: "center",
		},
		{
			label: "服务名称",
			key: "businessName",
			width: '210px',
			align: "center",
		},
		{
			label: "参数（个）",
			key: "number",
			width: '80px',
			numberFormat: true,
			numberPrecision: 0,
			align: "center",
		},
		{
			label: "最后维护时间",
			key: "lastDate",
			width: '140px',
			align: "center",
		},
		{
			label: "最后维护人",
			key: "updatedName",
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
					name: '维护',
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
	tablecolumn2: [
		{
			label: "序列",
			key: 'No',
			width: '60px',
			align: "center",
		},
		{
			label: "参数名称",
			key: "remark",
			width: '150px',
			align: "center",
			editType: 'input',
		},
		{
			label: "原参数",
			key: "paramName",
			width: '150px',
			align: "center",
			editType: 'input',
		},
		{
			label: "传输参数",
			key: "paramNameTarget",
			width: '150px',
			align: "center",
			editType: 'input',
		},
		{
			label: "是否必填项",
			key: "requiredFlag",
			width: '90px',
			align: "center",
			editType: 'input',
			showSelect: true
		},
		{
			label: "操作",
			key: "function",
			align: "center",
			width: '45px',
			functionList: [
				{
					name: '删除',
					function: 'vindicateDeleteFunc',
					color: '#F4516E'
				}
			]
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
			key: "remark",
			width: '150px',
			align: "center",
		},
		{
			label: "原参数",
			key: "paramName",
			width: '150px',
			align: "center",
		},
		{
			label: "传输参数",
			key: "paramNameTarget",
			width: '150px',
			align: "center",
		},
		{
			label: "是否必填项",
			key: "requiredFlag",
			width: '90px',
			align: "center",
		},
	],
}
export default columnconfig

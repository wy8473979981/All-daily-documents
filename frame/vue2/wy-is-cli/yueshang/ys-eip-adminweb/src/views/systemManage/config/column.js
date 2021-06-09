let columnList = {
	applySupport: [{
			label: "序号",
			key: 'No',
			width: '60px',
			align: "center",
		},
		{
			label: "应用编号",
			key: "appCode",
			width: '200px',
			align: "center",
		},
		{
			label: "应用名称",
			key: "appName",
			width: '200px',
			align: "center",
			color:'#4876EF',
			editType:'input',
			editFunction:'editName'
		},
		{
			label: "创建人",
			width: '100px',
			key: "createdName",
			align: "center",
		},
		{
			label: "操作",
			key: "function",
			width: '120px',
			align: "center",
			functionList: [{
				name: '服务维护',
				function: 'serveSupport',
			},
			{
				name: '删除',
				function: 'deleteSupport',
				color:'#F4516E'
			},
			{
				name: '密钥',
				function: 'secretKey',
			}]
		},
	],
	dataDicList: [
		{
			label: "序号",
			key: 'No',
			width: '60px',
			align: "center",
		},
		{
			label: "数据类型",
			key: "configType",
			width: '80px',
			align: "center",
			editType:'input',
			showSelect:true
		},
		{
			label: "数据名称",
			key: "configName",
			width: '120px',
			align: "center",
		},
		{
			label: "字典名称",
			key: "configValue",
			width: '120px',
			align: "center",
			editType:'input',
			singleInput:true
		},
		{
			label: "字典KEY",
			key: "configKey",
			width: '120px',
			width:'150px',
			align: "center",
			editType:'input'
		},
		{
			label: "显示顺序",
			key: "sort",
			width: '105px',
			align: "center",
			editType:'input'
		},
		{
			label: "备注",
			key: "remark",
			width: '120px',
			align: "center",
			editType:'input'
		},
		{
			label: "状态",
			key: "statusFlag",
			width: '80px',
			align: "center",
			editType:'switch',
			disabled:false,
			function:'switchOpen'
		},
		{
			label: "操作",
			key: "function",
			width: '60px',
			align: "center",
			functionList: [{
				name: '删除',
				function: 'deleteSure',
				color:'#F4516E'
			}]
		}
	]
}
export default columnList

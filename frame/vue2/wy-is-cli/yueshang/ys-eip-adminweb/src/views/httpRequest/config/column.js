import axios from "@/apis/index.js";
let columnList = {
	httpRequest: [{
		label: "序号",
		key: 'No',
		width: '60px',
		align: "center",
	},
	{
		label: "应用名称",
		key: "appId",
		width: '150px',
		align: "center",
		autocomplete: true,
		editType: 'input',
		serveApi: axios.commonServe.midAppIndistinct,
	},
	{
		label: "服务名称",
		key: "businessId",
		width: '150px',
		align: "center",
		autocomplete: true,
		editType: 'input',
		serveApi: axios.commonServe.midBusinessIndistinct,
	},
	{
		label: "参数名称",
		key: "headerKey",
		width: '150px',
		align: "center",
		editType: 'input',
	},
	{
		label: "参数数据",
		key: "headerValue",
		width: '150px',
		align: "center",
		editType: 'input',
	},
	{
		label: "描述",
		key: "remark",
		width: '150px',
		align: "center",
		editType: 'input',
	},
	/* {
		label: "状态",
		key: "statusFlag",
	align: "center",
		editType:'switch',
		disabled:false,
	}, */
	{
		label: "操作",
		key: "function",
		width: '56px',
		align: "center",
		functionList: [{
			name: '删除',
			function: 'deleteHttp',
			color: '#F4516E'
		}]
	}
	]
}
export default columnList

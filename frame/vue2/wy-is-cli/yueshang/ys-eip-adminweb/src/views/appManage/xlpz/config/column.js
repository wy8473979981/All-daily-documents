import axios from "@/apis/index.js";
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
			key: "appId",
			width: '200px',
			align: "center",
			autocomplete: true,
			editType: 'input',
			serveApi: axios.commonServe.midAppIndistinct,
		},
		{
			label: "服务名称",
			key: "businessId",
			width: '200px',
			align: "center",
			autocomplete: true,
			editType: 'input',
			serveApi: axios.commonServe.midBusinessIndistinct,
		},
		{
			label: "时间间隔（分钟）",
			key: "timeInterval",
			width: '100px',
			align: "center",
			numberInput: true,
			editType: 'input',
		},
		{
			label: "最大请求数",
			key: "maximum",
			width: '100px',
			align: "center",
			numberInput: true,
			editType: 'input',
		},
		{
			label: "操作",
			key: "function",
			align: "center",
			width: '45px',
			functionList: [
				{
					name: '删除',
					function: 'deleteOpenFunc',
					color: '#F4647E'
				},
			]
		}
	],
}
export default columnconfig


import axios from "@/apis/index.js";

let searchConfig = [
	{
		type: 'autocomplete',
		placeholder: '请输入应用名称',
		key: 'appId',
		serveApi: axios.commonServe.midAppIndistinct,
	},
	{
		type: 'autocomplete',
		placeholder: '请输入服务名称',
		key: 'businessId',
		serveApi: axios.commonServe.midBusinessIndistinct,
	},
	{
		type: 'dateRang',
		placeholderStart: '请选择开始时间',
		placeholderEnd: '请选择结束时间',
		key: 'daterange'
	},

]

export default searchConfig

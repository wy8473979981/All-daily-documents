
import axios from "@/apis/index.js";
let searchList = {
	timeTotalList: [{
			type: 'autocomplete',
			placeholder: '请输入应用名称',
			key: 'appId',
			searchParams:true,
			serveApi: axios.commonServe.midAppIndistinct,
		},
		{
			type: 'autocomplete',
			placeholder: '请输入服务名称',
			key: 'businessId',
			searchParams:true,
			serveApi: axios.commonServe.midBusinessIndistinct,
		},
		{
			type: 'dateRang',
			searchParams:true,
			placeholderStart: '请选择开始时间',
			placeholderEnd: '请选择结束时间',
			key: 'date'
		},
	],
	
	server: [{
			type: 'autocomplete',
			placeholder: '请输入应用名称',
			key: 'appId',
			searchParams:true,
			serveApi: axios.commonServe.midAppIndistinct,
		},
		{
			type: 'autocomplete',
			placeholder: '请输入服务名称',
			key: 'businessId',
			searchParams:true,
			serveApi: axios.commonServe.midBusinessIndistinct,
		},
		{
			type: 'select',
			placeholder: '请求状态',
			key: 'reqStatus',
			selectList: [{
					key: '0',
					value: '未处理'
				},
				{
					key: '1',
					value: '成功'
				},
				{
					key: '2',
					value: '失败'
				}
			]
		},
		{
			type: 'select',
			placeholder: '回调状态',
			key: 'callbackStatus',
			selectList: [{
					key: '0',
					value: '未处理'
				},
				{
					key: '1',
					value: '成功'
				},
				{
					key: '2',
					value: '失败'
				}
			]
		}
	],
	countTotalApi: [{
			type: 'autocomplete',
			placeholder: '请输入应用名称',
			key: 'appId',
			searchParams:true,
			serveApi: axios.commonServe.midAppIndistinct,
		},
		{
			type: 'autocomplete',
			placeholder: '请输入服务名称',
			key: 'businessId',
			searchParams:true,
			serveApi: axios.commonServe.midBusinessIndistinct,
		},
		{
			type: 'dateRang',
			searchParams:true,
			placeholderStart: '请选择开始时间',
			placeholderEnd: '请选择结束时间',
			key: 'date'
		},
	],
	countTotal: [{
			type: 'autocomplete',
			placeholder: '请输入应用名称',
			key: 'appId',
			searchParams:true,
			serveApi: axios.commonServe.midAppIndistinct,
		},
		{
			type: 'dateRang',
			searchParams:true,
			placeholderStart: '请选择开始时间',
			placeholderEnd: '请选择结束时间',
			key: 'date'
		},
	],
}

export default searchList
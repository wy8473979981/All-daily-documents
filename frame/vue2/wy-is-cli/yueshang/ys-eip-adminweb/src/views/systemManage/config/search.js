import axios from "@/apis/index.js";
let searchList = {
	applySupport: [{
		type: 'autocomplete',
		placeholder: '请输入应用名称',
		key: 'appId',
		searchParams:true,
		serveApi: axios.commonServe.midAppIndistinct,
	}],
	dataDicList: [
		{
			type: 'inputSearchMenu',
			placeholder: '请输入数据类型',
			key: 'configType',
			selectKey:'configType',
			selectValue:'configName',
			selectList:[]
		},
		{
			type: 'inputSearchMenu',
			placeholder: '请输入字典名称',
			key: 'configValue',
			selectKey:'configValue',
			selectValue:'configValue',
			remoteMethod:true,
			selectList:[]
		},
		
		/* {
			type:'checkboxSearchMenu',
			placeholder: '请选择字典类型',
			key: 'configType',
			selectKey:'configType',
			selectValue:'configName',
			selectList: ['上海', '北京', '广州', '深圳', '上饶']
		}, */
		{
			type: 'select',
			placeholder: '请选中状态',
			key: 'statusFlag',
			selectList: [{
					key: '',
					value: '全部'
				},
				{
					key: true,
					value: '打开'
				},
				{
					key: false,
					value: '关闭'
				}
			]
		}
	],
	limitsManage: [
	{
		type: 'autocomplete',
		placeholder: '请输入应用名称',
		key: 'appId',
		searchParams:true,
		serveApi: axios.commonServe.midAppIndistinct,
	}],
}

export default searchList

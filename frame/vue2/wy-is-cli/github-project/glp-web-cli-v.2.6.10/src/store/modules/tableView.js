/*
	#author		lut000
	#date 		2019/08/16
	#purpose	表格展示数据
	#version	1.0.0
*/

let localStr=localStorage.getItem('global_table_data');
let localData=localStr?JSON.parse(localStr):[];

export default {
	namespaced: true,
	state:{
		tableViewData:localData
	},
	mutations:{
		setTableData (state,data){
			// 设置state
			state.tableViewData.push(data);
			// 存储本地缓存
			localStorage.setItem('global_table_data',JSON.stringify(state.tableViewData));
		}
	},
	getters:{
	},
	actions:{
		setTableDataAction ({commit}, data){
			commit('setTableData',data)
		}
	}
}
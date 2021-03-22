import Vue from "vue";
import Vuex from "vuex";
import persistedState from "vuex-persistedstate";

Vue.use(Vuex);
export default new Vuex.Store({
	state: {
		dictAssemble: null,
		projectInfo: null,
		groups: null,
		merchantList: null,
		projectIdBol: null,
	},
	getters: {
		getDictAssemble: state => state.dictAssemble,
		getPprojectInfo: state => state.projectInfo,
		getGroups: state => state.groups,
		getMmerchantList: state => state.merchantList,
		getProjectIdBol: state => state.projectIdBol,
	},
	mutations: {
		setDictAssemble(state, payload) {
			state.dictAssemble = payload
			// console.log(state.dictAssemble, 'state.dictAssemble')
		},
		setProjectInfo(state, payload) {
			state.projectInfo = payload
			// console.log(state.projectInfo, 'state.projectInfo')
		},
		setGroups(state, payload) {
			state.groups = payload
			// console.log(state.groups, 'state.groups')
		},
		setMerchantList(state, payload) {
			state.merchantList = payload
			// console.log(state.merchantList, 'state.merchantList')
		},
		setProjectIdBol(state, payload) {
			state.projectIdBol = payload
			// console.log(state.projectIdBol, 'state.projectIdBol')
		},
	},
	actions: {},
	modules: {},
	plugins: [persistedState()]
});

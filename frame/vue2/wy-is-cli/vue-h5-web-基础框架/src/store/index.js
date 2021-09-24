import Vue from "vue";
import Vuex from "vuex";
import persistedState from "vuex-persistedstate";

Vue.use(Vuex);
export default new Vuex.Store({
	state: {
		dictAssemble: null,
		projectInfo: null,//项目列表数据
		zsProjectInfo: null,//招商项目列表数据
		groups: null,
		merchantList: null,
		projectIdBol: null,
		hasToken: false,
		hasAuth: false,
		watermarkText: '',
		user: null
	},
	getters: {
		getDictAssemble: state => state.dictAssemble,
		getGroups: state => state.groups,
		getMmerchantList: state => state.merchantList,
		getProjectIdBol: state => state.projectIdBol,
		getHasAuth: state => state.hasAuth,
	},
	mutations: {
		setDictAssemble (state, payload) {
			state.dictAssemble = payload
			// console.log(state.dictAssemble, 'state.dictAssemble')
		},
		setProjectInfo (state, payload) {
			state.projectInfo = payload
			// console.log(state.projectInfo, 'state.projectInfo')
		},
		setZsProjectInfo (state, payload) {
			state.zsProjectInfo = payload
		},
		setGroups (state, payload) {
			state.groups = payload
			// console.log(state.groups, 'state.groups')
		},
		setMerchantList (state, payload) {
			state.merchantList = payload
			// console.log(state.merchantList, 'state.merchantList')
		},
		setProjectIdBol (state, payload) {
			state.projectIdBol = payload
			// console.log(state.projectIdBol, 'state.projectIdBol')
		},
		setHasToken (state, payload) {
			state.hasToken = payload
		},
		setHasAuth (state, payload) {
			state.hasAuth = payload
		},
		setWatermarkText (state, payload) {
			state.watermarkText = payload
		},
		setUser(state, payload) {
			state.user = payload
		}
	},
	actions: {},
	modules: {},
	plugins: [persistedState()]
});

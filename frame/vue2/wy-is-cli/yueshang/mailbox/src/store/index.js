import Vue from "vue";
import Vuex from "vuex";
import persistedState from "vuex-persistedstate";
// import SecureLS from "secure-ls";
// const ls = new SecureLS({ isCompression: false });

Vue.use(Vuex);
export default new Vuex.Store({
	state: {
		token: null,
		userType: null,
		user: null,
		userInfo: null, // 用户详情
		opList: null, // 字典表集合
		pageType: 0, // 当前页面状态 0 收件箱、1已发送、2草稿箱、3已删除
		tabIndex: 0, // 收件箱 tab index
		delIndex: 0, // 已删除 tab index
		contactIndex: 0, // 通讯录层级
		receiverList: [], // 转发用户列表
		contactArray: [], // 通讯录树
		selectedBox: {}, // 缓存通讯录选中用户
		scrollTops: {getTop: 0}, // 列表页面top
		detailItem: null, // 缓存详情信息
		dutyIndex: null, // 职能 tab index
	},
	mutations: {
		setUserType(state, payload) {
			state.userType = payload
			console.log('payload=',payload)
			if( payload === 2 ){
				state.user = {token: 'e307f733b7971065dbd0b66418931404',uiid: 'wangjt2'}
			}else if( payload === 3 ){
				state.user = {token: '8ecee1f780f2f8bddcff688a2d05f348',uiid: 'fangl1'}
			}else{
				state.user = {token: '4081eec7622f2d227880df96a6cf90c5',uiid: 'tangmj2'}
			}
		},
		setUser(state, payload) {
			state.user = payload
		},
		setUserInfo(state, payload) {
			state.userInfo = payload
		},
		setOpList(state, payload) {
			state.opList = payload
		},
		setPageType(state, payload) {
			state.pageType = payload
		},
		setTabIndex(state, payload) {
			state.tabIndex = payload
		},
		setDelIndex(state, payload) {
			state.delIndex = payload
		},
		setContactIndex(state, payload) {
			state.contactIndex = payload
		},
		setReceiverList(state, payload) {
			state.receiverList = payload
		},
		setContactArray(state, payload) {
			state.contactArray = payload
		},
		setSelectedBox(state, payload) {
			state.selectedBox = payload
		},
		setScrollTops(state, payload) {
			state.scrollTops = payload
		},
		setDetailItem(state, payload) {
			state.detailItem = payload
		},
		setDutyIndex(state, payload) {
			state.dutyIndex = payload
		}
	},
	actions: {},
	modules: {},
	plugins: [persistedState()]
});

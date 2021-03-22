import Vue from "vue";
import Vuex from "vuex";
import persistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
const ls = new SecureLS({ isCompression: false });
persistedState({
	key: "baolong_h5",
	storage: {
		getItem: (key) => ls.get(key),
		setItem: (key, value) => ls.set(key, value),
		removeItem: (key) => ls.remove(key),
	},
	reducer(state) {
		return {
			token: state.token,
			projectList: state.projectList,
		};
	},
});
Vue.use(Vuex);
export default new Vuex.Store({
	state: {
		token: null,
		projectList: [],
	},
	mutations: {
		setItem(key, value) {
			this.state[key] = value;
			localStorage.setItem(JSON.stringify(value));
		},
		getItem(key) {
			let result = localStorage.getItem(key);
			return JSON.parse(result);
		},
	},
	actions: {},
	modules: {},
});

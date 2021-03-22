import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vant from "vant";
import axios from "./api/index.js";
import "lib-flexible";
import dayjs from "dayjs";
import echarts from "echarts";
import Plugins from "./components/index.js";

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;
Vue.prototype.$dayjs = dayjs;
Vue.use(Vant);
Vue.use(Plugins);
Vue.filter("formatNumber", function(value = "0", currencyType = "") {
	try {
		Number(value);
		let res;
		if (value.toString().indexOf(".") === -1) {
			res = (value || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,") + ".00";
		} else {
			let prev = value.toString().split(".")[0];
			let next = value.toString().split(".")[1] < 10 ? value.toString().split(".")[1] + "0" : value.toString().split(".")[1];
			res = (prev || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,") + "." + next;
		}
		return currencyType + res;
	} catch (e) {
		return value;
	}
});

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount("#app");

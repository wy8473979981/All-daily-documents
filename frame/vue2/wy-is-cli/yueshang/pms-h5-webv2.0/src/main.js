import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vant from "vant";
import { Toast, Dialog, Notify } from 'vant'
import axios from "./api/index.js";
import "lib-flexible";
import dayjs from "dayjs";
import echarts from "echarts";
import Plugins from "./components/index.js";
import Utils from "@/utils/index";
import md5 from 'js-md5';
import webTitle from './directives'
import lodash from 'lodash';
const ua = navigator.userAgent.toLowerCase();
const isWxwork = ua.match(/wxwork/i) == 'wxwork'
import Mixin from "./mixins/index"

Vue.prototype.$isWxwork = isWxwork
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;
Vue.prototype.$dayjs = dayjs;
Vue.prototype.$util = Utils;
Vue.prototype.$md5 = md5;
Vue.prototype.$Toast = Toast;
Vue.prototype.$Dialog = Dialog;
Vue.prototype.$Notify = Notify;
Vue.prototype.$lodash = lodash;

Vue.directive('webTitle', webTitle)
Vue.use(Vant)
Vue.use(Plugins)
Vue.mixin(Mixin)
Vue.filter("formatNumber", function (value = "0", currencyType = "") {
	try {
		Number(value);
		let res;
		if (value.toString().indexOf(".") === -1) {
			res = (value || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,") + ".00";
		} else {
			let prev = value.toString().split(".")[0];
			let next = value.toString().split(".")[1] < 10 ? value.toString().split(".")[1] + "0" : value.toString().split(".")[
				1];
			res = (prev || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,") + "." + next;
		}
		return currencyType + res;
	} catch (e) {
		return value;
	}
});
Vue.prototype.setCookie = function (name, value, day) {
	if (day !== 0) { //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除

		var curDate = new Date();

		var curTamp = curDate.getTime();

		var curWeeHours = new Date(curDate.toLocaleDateString()).getTime() - 1;

		var passedTamp = curTamp - curWeeHours;

		var leftTamp = 24 * 60 * 60 * 1000 - passedTamp;

		var leftTime = new Date();

		leftTime.setTime(leftTamp + curTamp);

		document.cookie = name + "=" + escape(value) + ";expires=" + leftTime.toGMTString();

	} else {

		document.cookie = name + "=" + escape(value);

	}

}

Vue.prototype.getCookie = function (name) {
	let arr;

	let reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

	arr = document.cookie.match(reg)
	if (arr) {
		return unescape(arr[2]);
	} else {
		return null;
	}
}

router.beforeEach((to, from, next) => {
	try {
		let uiid = Utils.getQueryString('uiid', to.fullPath)
		if (to.fullPath && to.fullPath.match(/uiid/g) && to.fullPath.match(/uiid/g).length > 0) {
			uiid = true
		}
		// Dialog({ message: JSON.stringify(uiid) });
		if (to.path === "/" && to.fullPath !== "/?type=local" && to.fullPath != '/' && to.fullPath.substr(0, 7) !== "/?uiid=" && !uiid && to.query.path !== "main") {
			if (window.WebViewJavascriptBridge && !isWxwork) {
				if (from.path === "/pages/common/project-selector") {
					next();
				} else {
					window.WebViewJavascriptBridge.callHandler("goBack", { param: "返回" }, function () { });
				}
				return true;
			} else if (window.webkit && window.webkit.messageHandlers && !isWxwork) {
				if (from.path === "/pages/common/project-selector") {
					next();
				} else {
					window.webkit.messageHandlers.goBack.postMessage({ param: "返回" });
				}
				return true;
			} else {
				next();
			}
		} else {
			// Dialog({ message: '1111111111' });
			next();
		}
	} catch (e) {
		console.log(e)
	}
});

router.afterEach(() => {
	// 会员页面回到顶部
	let dom = document.querySelector('#app');
	dom.scrollTop = 0;
})
new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount("#app");

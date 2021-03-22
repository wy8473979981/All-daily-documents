import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vant from "vant";
import { Toast ,Dialog } from 'vant'
import axios from "./api/index.js";
import "lib-flexible";
import dayjs from "dayjs";
import echarts from "echarts";
import Plugins from "./components/index.js";
import Utils from "@/utils/index";
import md5 from 'js-md5';
import webTitle from './directives'

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;
Vue.prototype.$dayjs = dayjs;
Vue.prototype.$util = Utils;
Vue.prototype.$md5 = md5;
Vue.prototype.$Toast = Toast;
Vue.prototype.$Dialog = Dialog;

Vue.directive('webTitle', webTitle)
Vue.use(Vant);
Vue.use(Plugins);
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

Vue.mixin({
	methods: {
		setData: function (obj, callback) {
			let that = this;
			const handleData = (tepData, tepKey, afterKey) => {
				tepKey = tepKey.split('.');
				tepKey.forEach(item => {
					if (tepData[item] === null || tepData[item] === undefined) {
						let reg = /^[0-9]+$/;
						tepData[item] = reg.test(afterKey) ? [] : {};
						tepData = tepData[item];
					} else {
						tepData = tepData[item];
					}
				});
				return tepData;
			};
			const isFn = function (value) {
				return typeof value == 'function' || false;
			};
			Object.keys(obj).forEach(function (key) {
				let val = obj[key];
				key = key.replace(/\]/g, '').replace(/\[/g, '.');
				let front, after;
				let index_after = key.lastIndexOf('.');
				if (index_after != -1) {
					after = key.slice(index_after + 1);
					front = handleData(that, key.slice(0, index_after), after);
				} else {
					after = key;
					front = that;
				}
				if (front.$data && front.$data[after] === undefined) {
					Object.defineProperty(front, after, {
						get() {
							return front.$data[after];
						},
						set(newValue) {
							front.$data[after] = newValue;
							that.$forceUpdate();
						},
						enumerable: true,
						configurable: true
					});
					front[after] = val;
				} else {
					that.$set(front, after, val);
				}
			});
			// this.$forceUpdate();
			isFn(callback) && this.$nextTick(callback);
		}
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

	var arr;

	var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

	if (arr = document.cookie.match(reg))

		return unescape(arr[2]);

	else

		return null;
	ocument.cookie = name + "=" + escape(value);

}
router.beforeEach((to, from, next) => {
	if (to.path === "/" && to.fullPath !== "/?type=local" && to.fullPath.substr(0,7) !== "/?uiid=" && to.query.path !== "main") {
		if (window.WebViewJavascriptBridge) {
			if (from.path === "/pages/common/project-selector") {
				next();
			} else {
				window.WebViewJavascriptBridge.callHandler("goBack", { param: "返回" }, function (responseData) {});
			}
			return true;
		} else if (window.webkit && window.webkit.messageHandlers) {
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
		next();
	}
});
router.afterEach((to, from, next) => {
	// 会员页面回到顶部
	let dom = document.querySelector('#app');
	dom.scrollTop = 0;
})
new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount("#app");

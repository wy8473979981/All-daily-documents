<script>
//app.js
import request from "./utils/request";
import * as echarts from "./packages/ec-canvas/echarts";

export default {
	onLaunch: function (e) {
		this.globalData.name = e.query.name; // 登录
		this.connectWebViewJavascriptBridge();
		this.connectWebViewJavascriptBridge();
		// uni.login({
		//   success: res => {// 发送 res.code 到后台换取 openId, sessionKey, unionId
		//   }
		// }); // 获取用户信息

		// uni.getSetting({
		//   success: res => {
		//     if (res.authSetting['scope.userInfo']) {
		//       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
		//       uni.getUserInfo({
		//         success: res => {
		//           // 可以将 res 发送给后台解码出 unionId
		//           this.globalData.userInfo = res.userInfo; // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
		//           // 所以此处加入 callback 以防止这种情况

		//           if (this.userInfoReadyCallback) {
		//             this.userInfoReadyCallback(res);
		//           }
		//         }
		//       });
		//     }
		//   }
		// });
	},
	globalData: {
		get request() {
			return request;
		},

		get cache() {
			return {
				set(key, value) {
					uni.setStorageSync(key, value);
				},

				get(key, defaultValue = null) {
					const value = uni.getStorageSync(key);

					if ([undefined, null, ""].includes(value)) {
						return defaultValue;
					}

					return value;
				},

				clear(key) {
					uni.removeStorage({
						key,
					});
				},
			};
		},

		get page() {
			const self = this;
			return {
				go(url, query = {}) {
					const queries = Object.keys(query || {}).map((key) => `${key}=${query[key]}`);

					if (queries.length) {
						if (url.indexOf("?") !== -1) {
							url += `${queries.join("&")}`;
						} else {
							url += `?${queries.join("&")}`;
						}
					}
					console.log(url);
					uni.navigateTo({
						url,
					});
				},

				back(delta = 0) {
					uni.navigateBack({
						delta,
					});
				},
			};
		},

		get toast() {
			return function (options) {
				uni.showToast(options);
			};
		},

		get today() {
			const date = new Date();
			const year = date.getFullYear();
			const month = `0${date.getMonth() + 1}`.slice(1);
			const day = `0${date.getDate()}`.slice(1);
			return {
				year,
				month,
				day,
			};
		},

		getDefaultDate(type) {
			let date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1 > 10 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
			let day = date.getDate() > 10 ? date.getDate() + 1 : "0" + date.getDate();

			if (type === "year") {
				return year;
			}

			if (type === "month") {
				return year + "-" + month;
			}

			if (type === "day") {
				return year + "-" + month + "-" + day;
			}
		},

		userInfo: null,
		name: null,
	},
	created() {
		this.$router.beforeEach((to, from, next) => {
			console.log("路由：", to);
			if (to.path === "/") {
				if (window.WebViewJavascriptBridge) {
					window.WebViewJavascriptBridge.callHandler("goBack", { param: "返回" }, function (responseData) {});
					return true;
				} else if (window.webkit && window.webkit.messageHandlers) {
					window.webkit.messageHandlers.goBack.postMessage({ param: "返回" });
					return true;
				} else {
					next();
				}
			} else {
				next();
			}
		});
	},
	methods: {
		connectWebViewJavascriptBridge(callback) {
			console.log("准备与APP搭桥：");
			if (window.WebViewJavascriptBridge) {
				console.log("桥接：window.WebViewJavascriptBridge");
				callback(WebViewJavascriptBridge);
			} else {
				document.addEventListener(
					"WebViewJavascriptBridgeReady",
					function () {
						console.log("桥接：document.addEventListener");
						callback(WebViewJavascriptBridge);
					},
					false,
				);
				console.log("桥接失败！");
			}
		},
		connectWebViewJavascriptBridge(bridge) {
			try {
				console.log("执行：bridge.init！");
				bridge.init(function (message, responseCallback) {
					console.log("JS got a message", message);
					var data = {
						"Javascript Responds": "测试中文!",
					};

					if (responseCallback) {
						console.log("JS responding with", data);
						responseCallback(data);
					}
				});
			} catch (e) {
				console.log("ERROR：执行：bridge.init===失败！！！");
			}
		},
	},
};
</script>
<style>
@import "./app.css";
</style>

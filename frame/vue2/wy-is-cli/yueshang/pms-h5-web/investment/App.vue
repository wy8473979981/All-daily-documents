<script>
//app.js
import request from "./utils/request";

export default {
	onLaunch: function () {
		this.connectWebViewJavascriptBridge();
		this.connectWebViewJavascriptBridge();
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
			let month = date.getMonth() + 1;
			let day = date.getDay();

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
	},
	created() {
		this.$router.beforeEach((to, from, next) => {
			console.log("路由：", from.path);
			if (to.path === "/") {
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
	},
	methods: {
		connectWebViewJavascriptBridge(callback) {
			if (window.WebViewJavascriptBridge) {
				uni.showToast({
					title: "成功111",
				});
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

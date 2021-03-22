<script>
//app.js
import request from "./utils/request";
import * as echarts from "./packages/ec-canvas/echarts";

export default {
	onLaunch: function () {
		const that = this;
		let token = this.$route.query.token;
		let uiid = this.$route.query.uiid;
		setTimeout((_) => {
			request
				.options({
					loading: true,
				})
				// http://demo.powerlong.com/PowerDesk
				.get("/open/bis-mini-app!pdWx.action", {
					source: "yysj",
					token: token,
					uiid: uiid,
				})
				.then((result) => {
					if (!result) {
						if (that.getPower) {
							that.getPower(false);
						}
						that.globalData.power = false;
						return;
					}
					if (that.getPower) {
						that.getPower(true);
					}
					that.globalData.power = true;
						let { projectInfo, userInfo } = result.data;
							that.globalData.grade = projectInfo.grade
							if (projectInfo.projectList.length === 1) {
								that.globalData.bisProjectId = projectInfo.projectList[0].bisProjectId;
								that.globalData.projectName = projectInfo.projectList[0].shortName;
							} else if (projectInfo.grade !== "0") {
								that.globalData.cache.set("projectList", JSON.stringify(projectInfo.projectList));
								that.globalData.label = projectInfo.projectList[0].shortName;
								that.globalData.value = projectInfo.projectList[0].bisProjectId;
							} else {
								that.globalData.cache.set("projectList", JSON.stringify(projectInfo.projectList));
							}
							that.globalData.userInfo = userInfo;
							if (that.testDataCallback) {
								that.testDataCallback(that.globalData);
							}
							
							if (that.setProjectDefault) {
								that.setProjectDefault(that.globalData);
							}
					
					
					
					
					// let { projectInfo, userInfo } = result.data;
					// if (projectInfo.grade === "2") {
					// 	that.globalData.bisProjectId = projectInfo.projectList[0].bisProjectId;
					// 	that.globalData.projectName = projectInfo.projectList[0].shortName;
					// } else if (projectInfo.grade === "0") {
					// }
					// that.globalData.userinfo = userInfo;
					// if (that.testDataCallback) {
					// 	that.testDataCallback(that.globalData);
					// }
					// if (that.setProjectDefault) {
					// 	that.setProjectDefault(that.globalData);
					// }
				});
		}, 1000);
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

		get echarts() {
			return echarts;
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
			let month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
			let day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();

			if (type === "year") {
				return year;
			}

			if (type === "month") {
				return year + "-" + month;
			}

			if (type === "day") {
				return year + "-" + month + "-" + day;
			}

			if (type === "yesterday") {
				date.setTime(date.getTime() - 24 * 60 * 60 * 1000);
				let yesterday = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();
				return year + "-" + month + "-" + yesterday;
			}
		},

		userInfo: null,
		bisProjectId: "",
		projectName: "全部",
		power: false, // 注意：false 需要权限校验、 true 不校验权限
	},
	created() {
		this.$router.beforeEach((to, from, next) => {
			if (to.path === "/" && to.fullPath !== "/?type=local" && to.query.path !== "main") {
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

//app.js
import request from "./utils/request";
import * as echarts from "./packages/ec-canvas/echarts";

App({
	onLaunch: function () {
		// 登录
		wx.login({
			success: (res) => {
				// 发送 res.code 到后台换取 openId, sessionKey, unionId
			},
		});
		// 获取用户信息
		wx.getSetting({
			success: (res) => {
				if (res.authSetting["scope.userInfo"]) {
					// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
					wx.getUserInfo({
						success: (res) => {
							// 可以将 res 发送给后台解码出 unionId
							this.globalData.userInfo = res.userInfo;

							// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
							// 所以此处加入 callback 以防止这种情况
							if (this.userInfoReadyCallback) {
								this.userInfoReadyCallback(res);
							}
						},
					});
				}
			},
		});
	},
	get request() {
		return request;
	},
	get cache() {
		return {
			set(key, value) {
				wx.setStorageSync(key, value);
			},
			get(key, defaultValue = null) {
				const value = wx.getStorageSync(key);
				if ([undefined, null, ""].includes(value)) {
					return defaultValue;
				}
				return value;
			},
			clear(key) {
				wx.removeStorage({ key });
			},
		};
	},
	get page() {
		const self = this;
		return {
			go(url, query = {}) {
				const queries = Object.keys(query || {}).map(
					(key) => `${key}=${query[key]}`
				);
				if (queries.length) {
					if (url.indexOf("?") !== -1) {
						url += `${queries.join("&")}`;
					} else {
						url += `?${queries.join("&")}`;
					}
				}
				wx.navigateTo({ url });
			},
			back(delta = 0) {
				wx.navigateBack({ delta });
			},
		};
	},
	get toast() {
		return function (options) {
			wx.showToast(options);
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
	globalData: {
		userInfo: null,
	},
});

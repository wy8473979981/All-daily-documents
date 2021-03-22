const requestOptionsMap = {};
let requestOptions = null;
import app from "App";

const clearLoading = (options) => {
	try {
		delete requestOptionsMap[options.url];
		// const loadings = Object.keys(requestOptionsMap).reduce((result, key) => result + (requestOptionsMap[key].loading ? 1 : 0), 0);

		// if (loadings && loadings === 0) {
		// 	uni.hideLoading();
		// }
	} catch (e) {}
	try {
		setTimeout(() => {
			uni.hideLoading();
		}, 0);
	} catch (e) {}
};

// const HOST = "http://demo.powerlong.com/PowerDesk"; //
const HOST = "http://pd.powerlong.com";
//

const module = {
	call: function (options) {
		if (options.url.indexOf("http") === -1) {
			options.url = `${HOST}${options.url}`;
		}

		const { loading, caching } = requestOptions || {};

		if (loading) {
			setTimeout(() => {
				uni.showLoading({
					mask: true,
					loading,
				});
			}, 0);
		}

		const cacheKey = `${options.method}:${options.url}${JSON.stringify(options.data)}`;

		if (caching) {
			const cache = app.globalData.cache.get(cacheKey);

			if (cache && cache.expiredAt > Date.now()) {
				clearLoading(options);
				return Promise.resolve(cache.payload);
			}
		}

		requestOptionsMap[options.url] = { ...requestOptions };
		requestOptions = null;
		const token = app.globalData.cache.get("token");
		const header = { ...header };
		if (token) {
			header.authorization = `Bearer ${token}`;
		}

		return new Promise((resolve, reject) => {
			uni.request({
				...options,
				header,
				success: function (res) {
					if (!["0", 0, 200].includes(res.data.code)) {
						app.globalData.toast({
							icon: "none",
							title: res.data.msg || "请求错误",
						});
						if (res.data.code === "403") {
							if (window.WebViewJavascriptBridge) {
								window.WebViewJavascriptBridge.callHandler("loginOut", { param: "退出登录" }, function (responseData) {});
							}
							if (window.webkit && window.webkit.messageHandlers) {
								window.webkit.messageHandlers.loginOut.postMessage({ param: "退出登录" });
							}
						}
						if (res.data.code == 401 || res.data.code == 402) {
							resolve(false);
						}
					} else {
						if (caching) {
							const ttl = (parseInt(caching) > 0 ? parseInt(caching) : 15) * 60 * 1000;
							app.globalData.cache.set(cacheKey, {
								payload: res.data,
								expiredAt: Date.now() + ttl,
							});
						}

						resolve(res.data);
					}
				},
				fail: function (res) {
					reject(res);
				},
				complete: function () {
					clearLoading(options);
				},
			});
		});
	},
};

const request = function () {
	return this;
};

request.prototype = {
	options: function (payload) {
		requestOptions = payload;
		return this;
	},
	get: function (url, data) {
		return module.call({
			method: "get",
			url,
			data,
		});
	},
	post: function (url, data) {
		return module.call({
			method: "post",
			url,
			data,
		});
	},
	put: function (url, data) {
		return module.call({
			method: "put",
			url,
			data,
		});
	},
	delete: function (url, data) {
		return module.call({
			method: "delete",
			url,
			data,
		});
	},
};
export default new request();

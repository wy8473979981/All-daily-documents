const requestOptionsMap = {};
let requestOptions = null;

const clearLoading = (options) => {
	delete requestOptionsMap[options.url];
	const loadings = Object.keys(requestOptionsMap).reduce(
		(result, key) => result + (requestOptionsMap[key].loading ? 1 : 0),
		0
	);
	if (loadings === 0) {
		wx.hideLoading();
	}
};

// const HOST = 'http://10.251.5.247/PowerDesk';
// const HOST = 'https://e4dcbea92895.ngrok.io';
// const HOST = "http://192.168.121.156:8080/PowerDesk";
const HOST = "https://pd.powerlong.com";
const module = {
	call: function (options) {
		if (options.url.indexOf("http") === -1) {
			options.url = `${HOST}${options.url}`;
		}

		const app = getApp();
		const { loading, caching } = requestOptions || {};
		if (loading) {
			wx.showLoading({
				mask: true,
				loading,
			});
		}
		const cacheKey = `${options.method}:${options.url}${JSON.stringify(
			options.data
		)}`;
		if (caching) {
			const cache = app.cache.get(cacheKey);
			if (cache && cache.expiredAt > Date.now()) {
				clearLoading(options);
				return Promise.resolve(cache.payload);
			}
		}

		requestOptionsMap[options.url] = {
			...requestOptions,
		};
		requestOptions = null;

		const token = app.cache.get("token");
		const header = {
			...header,
		};
		if (token) {
			header.authorization = `Bearer ${token}`;
		}

		return new Promise((resolve, reject) => {
			wx.request({
				...options,
				header,
				success: function (res) {
					if (!["0", 0, 200].includes(res.data.code)) {
						app.toast({
							icon: "none",
							title: res.data.msg || "请求错误",
						});
					} else {
						if (caching) {
							const ttl =
								(parseInt(caching) > 0 ? parseInt(caching) : 15) * 60 * 1000;
							app.cache.set(cacheKey, {
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

import Vue from "vue";
import axios from "axios";
// import QS from "qs";
// import store from "../store/index";
// import router from "../router/index";
import { Notify } from "vant";
Vue.use(Notify);

// 环境的切换
// if (process.env.NODE_ENV === "development") {
// 	axios.defaults.baseURL = "https://marketingapi.powerlong.com/api";
// } else if (process.env.NODE_ENV === "production") {
// 	axios.defaults.baseURL = "";
// }
axios.defaults.baseURL = process.env.VUE_APP_URL;
// 请求超时时间
axios.defaults.timeout = 10000;
// post请求头
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";
// 请求拦截器
axios.interceptors.request.use(
	(config) => {
		return config;
	},
	(error) => {
		return Promise.error(error);
	},
);

// 响应拦截器
axios.interceptors.response.use(
	(response) => {
		if (response.data.code !== "0") {
			Notify({
				type: "danger",
				message: response.data.msg || "出错了",
			});
		}
		return Promise.resolve(response);
	},
	// 服务器状态码不是200的情况
	(error) => {
		Notify({ type: "danger", message: error.message });
		return Promise.reject(error.response);
	},
);
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
	return new Promise((resolve, reject) => {
		axios
			.get(url, {
				params: params,
			})
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject(err.data);
			});
	});
}
export function post(url, params) {
	return new Promise((resolve, reject) => {
		axios
			.post(url, params)
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject(err.data);
			});
	});
}

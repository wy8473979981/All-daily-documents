import Vue from "vue";
import axios from "axios";
// import QS from "qs";
// import store from "../store/index";
// import router from "../router/index";
import { Notify } from "vant";
import md5 from 'js-md5';
import { showFullScreenLoading, tryHideFullScreenLoading } from '@/utils/axiosHelperLoading'
Vue.use(Notify);

// 环境的切换
// if (process.env.NODE_ENV === "development") {
// 	axios.defaults.baseURL = "http://marketingapi.powerlong.com/api";
// } else if (process.env.NODE_ENV === "production") {
// 	axios.defaults.baseURL = "";
// }
axios.defaults.baseURL = process.env.VUE_APP_URL;
// 请求超时时间
axios.defaults.timeout = 30000;
// post请求头
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";
// 请求拦截器
axios.interceptors.request.use(
    (config) => {
        if (config.showLoading) {
            showFullScreenLoading();
        }
        return config;
    },
    (error) => {
        return Promise.error(error);
    },
);

// 响应拦截器
axios.interceptors.response.use(
    (response) => {
        if (response.config.showLoading) {
            tryHideFullScreenLoading();
        }
        if (response.data.code != 1 && response.data.code != 0 && response.data.code != 200) {
            Notify({
                type: "danger",
                message: response.data.msg || response.data.message || "出错了",
            });
        }
        return Promise.resolve(response);
    },
    // 服务器状态码不是200的情况
    (error) => {
        tryHideFullScreenLoading();
        // Notify({
        //     type: "danger",
        //     message: response.data.msg || response.data.message || "出错了",
        // });
        return Promise.reject(error.response);
    },
);



/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get (url, params, showLoading = true) {
    return new Promise((resolve, reject) => {
        const timestamp = new Date().getTime();
        const nonce = Math.floor(Math.random() * (1 - 100) + 100);
        const sign = md5(`${timestamp}||${nonce}||yueworld`);
        let req = { params: { ...params, sign: sign, timestamp: timestamp, nonce: nonce, }, showLoading: showLoading }

        axios.get(url, req)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.data);
            });
    });
}
export function post (url, params, showLoading = true) {
    return new Promise((resolve, reject) => {
        const timestamp = new Date().getTime();
        const nonce = Math.floor(Math.random() * (1 - 100) + 100);
        const sign = md5(`${timestamp}||${nonce}||yueworld`);
        let req = { ...params, sign: sign, timestamp: timestamp, nonce: nonce }

        axios.post(url, req, { showLoading: showLoading })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.data);
            });
    });
}

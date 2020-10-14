/*
	#author		lut000
    #date 		2019/07/18
    #purpose    axios配置
*/

// import { Message } from 'element-ui'
import router from '@/router'
import store from '@/store'
import axios from 'axios';
import { Utils } from "@/utils";

import { showFullScreenLoading, tryHideFullScreenLoading } from '@/utils/axiosHelperLoading'

function getQueryString(name) {
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    const urlObj = window.location;
    var r = urlObj.href.indexOf('#') > -1 ? (urlObj.hash.split("?")[1] ? urlObj.hash.split("?")[1].match(reg) : null) : urlObj.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
};
function getSearchParams(key, str) {                                      //查询字段值
    let t = str ? str : window.location.search;
    let val = '';
    if (t) {
        t = t.substr(1);
        let arr = t.split('&');
        for (let i = 0, len = arr.length; i < len; i++) {
            let item = arr[i];
            if (item) {
                let re = new RegExp(key + '=', 'i');
                if (re.test(item)) {
                    val = item.replace(key + '=', '');
                    break;
                }
            }
        }
    }
    return val;
};




// 系统appId
const appId = process.env.APP_ID || 'GLPa27a128049fd3b24';

// 超时时间
axios.defaults.timeout = 20000;
axios.defaults.withCredentials = true;
// 统一header
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';

// http request 拦截器
axios.interceptors.request.use(
    config => {
        let userNo = '';
        let reg = new RegExp('"', "g");
        let str = localStorage.getItem("userNo") || "";
        if (str !== null || str !== "") {
            userNo = str.replace(reg, "")
        } else {
            userNo = str
        }
        config.data = JSON.stringify(config.data);
        config.headers['appId'] = appId;
        config.headers['userNo'] = userNo;//用户信息
        let ticket = getQueryString('ticket') || getSearchParams('ticket');
        if (ticket) {
            config.headers['ticket'] = ticket;
        }
        showFullScreenLoading();
        return config
    },
    error => {
        return Promise.reject(error)
    }
);


axios.interceptors.response.use(
    response => {
        let res = response.data;
        if (res.code == 401) {
            // 登录失效
            // router.app.$message({
            //     type: 'warning',
            //     message: '登录失效，请重新登录！',
            //     onClose: () => {
            //         // let backUrl = window.location.href;
            //         let backUrl = location.protocol + '//' + location.host;
            //         try {

            //             store.commit('signOut', {});
            //         } catch (e) {
            //             localStorage.removeItem('global_user_info');
            //             localStorage.removeItem('userNo');
            //         }
            //         window.location.href = res.data + '?appId=' + appId + '&backUrl=' + backUrl
            //     }
            // });
            let backUrl = location.protocol + '//' + location.host;
            try {

                store.commit('signOut', {});
            } catch (e) {
                localStorage.removeItem('global_user_info');
                localStorage.removeItem('userNo');
            }
            window.location.href = res.data + '?appId=' + appId + '&backUrl=' + backUrl
        }
        tryHideFullScreenLoading();
        return response
    },
    error => {
        let re = error.response || null;
        if (re) {
            getHttpStatusCode(re);
        }
        tryHideFullScreenLoading();
        return Promise.reject(error)
    }
);


function getHttpStatusCode(re) {                 //检测http返回状态
    switch (re.status) {
        case 401:
            {
                // 拦截未登录或登录失效
                // router.app.$message({
                //     type: 'warning',
                //     message: '登录失效，请重新登录！',
                //     onClose: () => {

                //     }
                // });
                let backUrl = location.protocol + '//' + location.host;
                try {
                    router.app.$store.commit('signOut', {});
                    localStorage.removeItem('global_user_info');
                    localStorage.removeItem('userNo');
                } catch (e) {
                    localStorage.removeItem('global_user_info');
                    localStorage.removeItem('userNo');
                }
                window.location.href = re.data + '?appId=' + appId + '&backUrl=' + backUrl
                break;
            }
        case 417:
            {
                let { data = {} } = re;
                router.app.$message({
                    type: 'warning',
                    message: data.message || re.statusText
                })
                break;
            }

        default:
            router.app.$message({
                type: 'warning',
                message: re.statusText || ''
            })
            break;
    }
}

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params = {}, header = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params,
            headers: header
        }).then(response => {
            resolve(response.data)
        })
            .catch(err => {

                reject(err)
            })
    })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}, header = {}) {
    return new Promise((resolve, reject) => {
        // let param = Utils.deepCloneTofieldNull(data)

        axios.post(url, data, {
            headers: header
        }).then(
            response => {
                resolve(response.data)
            },
            err => {
                reject(err)
            }
        )
    })
}
import router from "../router";
const ua = navigator.userAgent.toLowerCase();
const isWxwork = ua.match(/wxwork/i) == 'wxwork'
import { Toast, Notify, Dialog } from "vant";
const getDefaultDate = (type) => {
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
}

const numberFormat = (value, options = { precision: 2, unit: '', type: true }) => {
    //value:number | string,//options:{ precision: number, unit: string, type: Boolean }

    if (isNaN(value) || ['', null, undefined].includes(value)) {
        return value | '-';
    }
    if (options.type) {
        // 默认以万元为单位
        value = value / 10000;
    }
    const newValue = value.toString().replace(/[^\d.-]/g, '');
    // if (typeof options.precision !== 'number') {
    //     const pointPoistion = newValue.toString().indexOf('.');
    //     if (~pointPoistion) {
    //         options.precision = newValue.toString().substr(pointPoistion + 1);
    //     }
    // }
    const text = Number(newValue).toFixed(options.precision);
    const bit = text.indexOf('.') < 0 ? '' : text.substr(text.indexOf('.'));
    const format = text.replace(/\..*$/, '').split('').reverse().join('').replace(/\d{3}\B/g, function (_, c) {
        return _ + ',';
    }).split('').reverse().join('');
    return `${format}${bit}${options.unit || ''}`;
}

const absoluteValue = (num) => {
    if (isNaN(num) || ['', null, undefined].includes(num)) {
        return '-';
    }
    return Math.abs(num - 0) + "%";
}
const isEmpty = (num) => {
    if (num === 0) {
        return true;
    }
    return num && num !== "-" && num !== "- ";
}

// app交互-跳转
const pageGo = (url, param, title) => {
    if (window.WebViewJavascriptBridge && !isWxwork) {
        window.WebViewJavascriptBridge.callHandler('gotoDetail', { 'param': '详情', 'url': url + '?' + getUrl(param) }, function () { });
        return
    } else if (window.webkit && window.webkit.messageHandlers && !isWxwork) {
        window.webkit.messageHandlers.gotoDetail.postMessage({ title: '详情', url: url + '?' + getUrl(param) })
        return
    }
    // console.log(getUrl(param), ' getUrl(param)')
    router.push({ path: url, query: param })

}
// app交互-tab显示、隐藏
const showTabStatus = (showBottomTab = 'true', showTopTab = 'true') => {
    if (window.WebViewJavascriptBridge && !isWxwork) {
        window.WebViewJavascriptBridge.callHandler('showTabStatus', { 'showBottomTab': showBottomTab, 'showTopTab': showTopTab }, function () {});
    } else if (window.webkit && window.webkit.messageHandlers && !isWxwork) {
        if(showBottomTab === 'true') {
            window.webkit.messageHandlers.tabShow.postMessage({})
        } else {
            window.webkit.messageHandlers.tabHidden.postMessage({})
        }
    }
}

const getUrl = (data) => {
    let newData = deepCloneTofieldNull(data);
    let url = ''
    Object.keys(newData).forEach(item => {
        url += `${item}=${newData[item]}&`
    })
    // let _url = url.substring(0, url.length - 1);
    return url
}

const deepCloneTofieldNull = (obj) => {
    var newObj = obj instanceof Array ? [] : {};
    if (typeof obj !== 'object') {
        return obj;
    } else {
        for (var i in obj) {
            if (typeof obj[i] === 'object' && Object.prototype.toString.call(obj[i]) != "[object Null]") {
                newObj[i] = deepCloneTofieldNull(obj[i])
            } else {
                if (![null, "", undefined, "null", "undefined"].includes(obj[i])) {
                    newObj[i] = obj[i];
                }
            }
        }
    }
    return newObj;
}
const getUrlParamsCode = (codeName) => {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == codeName) { return pair[1]; }
    }
    return (false);
}
// 获取url参数值
const getQueryString = (name,str) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    // console.log(window.location.search,'-----window.location.search');
    let r = ''
    if(str){
        str = encodeURI(str)
        str = '?'+str.split('?')[1]
        r = str.substr(1).match(reg);
    }else{
        r = window.location.search.substr(1).match(reg);
    }
    var context = "";
    if (r != null)
        context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
}
// 打开文件
const openFile = (url, name, fullPath = false) => {
    try {
        if (window.WebViewJavascriptBridge && !isWxwork) {
            window.WebViewJavascriptBridge.callHandler('downloadFile', { param: "详情", url: !fullPath?(process.env.VUE_APP_URL + url):url, fileName: name,mime: '' }, function () {});
            return
        } else if (window.webkit && window.webkit.messageHandlers && !isWxwork) {
            window.webkit.messageHandlers.downloadFile.postMessage({ param: '详情', url: !fullPath?(process.env.VUE_APP_URL + url):url, fileName: name,mime: '' })
            return
        }
        window.open(url)
    }catch(e){
    }
}
// 附件 上传文件格式
const getFileType = (type,name) => {XX
    const types = ['doc','docx','ppt','pptx','xls','xlsx','application/pdf','pdf','txt','image/jpeg','image/png','jpeg','jpg','png','gif','mp4','rmvb','mkv','avi','flv','wmv'];
    // if(!type) {
        const fType = name.split('.')
        if(fType.length > 1) {
            const fL = fType.length
            if(types.includes(fType[fL - 1].toLowerCase())) {
                return true
            }
            return false
        }
        return false
    // }
    // if(types.includes(type)) {
    //     return true
    // }
    return false
}
export default {
    getDefaultDate,
    numberFormat,
    absoluteValue,
    isEmpty,
    getQueryString,
    getUrlParamsCode,
    showTabStatus,
    pageGo,
    openFile,
    getFileType
}

import router from "../router";
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
        return '-';
    }
    if (options.type) {
        // 默认以万元为单位
        value = value / 10000;
    }
    const newValue = value.toString().replace(/[^\d.-]/g, '');
    
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
    if (window.WebViewJavascriptBridge) {
        window.WebViewJavascriptBridge.callHandler('gotoDetail', { 'param': '详情', 'url': url + '?' + getUrl(param) }, function (responseData) { });
        return
    } else if (window.webkit && window.webkit.messageHandlers) {
        window.webkit.messageHandlers.gotoDetail.postMessage({ title: '详情', url: url + '?' + getUrl(param) })
        return
    }
    // console.log(getUrl(param), ' getUrl(param)')
    router.push({ path: url, query: param })

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

export default {
    getDefaultDate,
    numberFormat,
    absoluteValue,
    isEmpty,
    pageGo,
    getUrl,
    deepCloneTofieldNull
}

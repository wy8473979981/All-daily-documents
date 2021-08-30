const numberFormat = (value, //number | string,
options = {} //{ precision: number; unit: string }
) => {
  const newValue = value.toString().replace(/[^\d.-]/g, '');

  if (isNaN(newValue) || ['', null, undefined].includes(newValue)) {
    return value;
  }

  if (typeof options.precision !== 'number') {
    const pointPoistion = newValue.toString().indexOf('.');
    if (~pointPoistion) {
      options.precision = newValue.toString().substr(pointPoistion + 1);
    }
  }

  const text = Number(newValue).toFixed(options.precision || 0);
  const bit = text.indexOf('.') < 0 ? '' : text.substr(text.indexOf('.'));
  const format = text.replace(/\..*$/, '').split('').reverse().join('').replace(/\d{3}\B/g, function (_, c) {
    return _ + ',';
  }).split('').reverse().join('');
  return `${format}${bit}${options.unit || ''}`;
};

// app交互-跳转
const pageGo = (url,param,title) => {
	if(window.WebViewJavascriptBridge) {
		window.WebViewJavascriptBridge.callHandler('gotoDetail', {'param': '详情','url': url + '?' +getUrl(param)}, function(responseData) {});
		return
	} else if(window.webkit && window.webkit.messageHandlers) {
		window.webkit.messageHandlers.gotoDetail.postMessage({title: '详情',url: url + '?' + getUrl(param)})
		return
	}
	const app = getApp();
	app.globalData.page.go(url,param);
}
const getUrl = (data) => {
	let url = ''
	Object.keys(data).forEach(item => {
		url += `${item}=${data[item]}&`
	})
	return url
}

module.exports = {
  numberFormat,
  pageGo,
  getUrl
};
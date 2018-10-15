function setCookie(name, value) {
	var Days = 30; //此 cookie 将被保存 30 天
	var exp = new Date();
	exp.setTime(exp.getTime() + Days);
	if(value == "" || value == "null" || value == "null" || value == " ") {
		
	} else {
		document.cookie = name + "=" + escape(value) + ";expires=Sun, 17-Jan-2100 19:14:07 GMT";
	}
}

function getCookie(sName) {
	debugger
	var aCookie = document.cookie.split("; ");
	for(var i = 0; i < aCookie.length; i++) {
		var aCrumb = aCookie[i].split("=");
		if(sName == aCrumb[0]) {
			return aCrumb[1];
		}
	}
	return null;
}

function checkCookieExist(name) {
	//判断cookie是否存在
	if(getCookie(name))
		return true;
	else
		return false;
}

//删除cookie
function deleteCookie(name, path, domain) {
	var strCookie;
	// 检查Cookie是否存在
	if(checkCookieExist(name)) {
		// 设置Cookie的期限为己过期
		strCookie = name + "=";
		strCookie += (path) ? "; path=" + path : "";
		strCookie += (domain) ? "; domain=" + domain : "";
		strCookie += "; expires=Thu, 01-Jan-70 00:00:01 GMT";
		document.cookie = strCookie;
	}
}

function saveCookie(name, value, expires, path, domain, secure) {
	var strCookie = name + "=" + value;
	if(expires) {
		// 计算Cookie的期限, 参数为天数
		var curTime = new Date();
		curTime.setTime(curTime.getTime() + expires * 24 * 60 * 60 * 1000);
		strCookie += "; expires=" + curTime.toGMTString();
	}
	// Cookie的路径
	strCookie += (path) ? "; path=" + path : "";
	// Cookie的Domain
	strCookie += (domain) ? "; domain=" + domain : "";
	// 是否需要保密传送,为一个布尔值
	strCookie += (secure) ? "; secure" : "";
	document.cookie = strCookie;
}
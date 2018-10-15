function createXHR(){
	if(typeof XMLHttpRequest != "undefined"){
		return new XMLHttpRequest();
	}else if(typeof ActiveXObject != "undefined"){//ie7以下的版本，以ie6为例
		//定义一个数组
		var version = [
				"MSXML2.XMLHttp.6.0",
				"MSXML2.XMLHttp.2.0",
				"MSXML2.XMLHttp"
		];
		//循环创建XHR对象
		for(var i in version){
//			return new ActiveXObject(version[i]);//注意浏览器队其版本的支持，所以需要调整一下
			try{
				return new ActiveXObject(version[i]);
			}catch(e){
				//跳过
			}
		}
	}else{
		throw new Error("就你这浏览器，赶紧淘汰吧");
	}
}
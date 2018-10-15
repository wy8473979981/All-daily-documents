



function createXHR(){
	if(typeof XMLHttpRequest !== "undefined"){
		return new XMLHttpRequest();
	}else if(typeof ActiveXObject !== "undefined"){
		var version = [
						"MSXML2.XMLHttp.6.0",
						"MSXML2.XMLHttp.2.0",
						"MSXML2.XMLHttp"
					];
		for(var i=0; i<3 ; i++){
			try(){
				return new ActiveXObject(version[i]);
			}catch(e){
				
			}
		}
	}else{
		throw new Error("请更换浏览器");
	}
}

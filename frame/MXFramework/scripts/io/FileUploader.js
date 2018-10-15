$ns("mx.io");

/**
 * 提供一个文件上传的类（不包含界面部分）。目前仅支持 HTML5。
 */
mx.io.FileUploader = function()
{
    var me = $extend(MXComponent); 
    var base = {};
    
    /**
     * 获取或设置一个字符串，表示处理上传文件的服务地址。
     */
    me.url = null;
    
    /**
     * 获取或设置一个 HTML5 的 File 对象。
     */
    me.file = null;
    
    /**
     * 获取或设置文件上传服务端需要的参数。
     * 该属性为一个 JSON 对象，如（{ columnNames:"name,age,gender", columnCaptions:"姓名,年龄,性别", fileName:"用户表格"}）。
     */
    me.params = null;
    
    /**
     * 当文件上传，进度发生改变时触发该事件。
     */
    me.onprogresschange = null;
    
    /**
     * 当文件上传完成时，触发该事件。
     */
    me.onprogresscomplete = null;
    
    /**
     * 当文件上传失败时，触发该事件。
     */
    me.onprogresserror = null;
    
    /**
     * 当文件上传过程中，调用{@link me.cancel}取消上传时，触发该事件。
     */
    me.oncanceled = null;  
    
    /**
     * 当文件上传服务端处理完毕后，触发该事件。
     * 
     * @param resultValue 一个字符串，表示服务端的返回值。
     */
    me.onuploadcomplete = null;    
    
    /**
     * 内部上传 XMLHttpRequest 请求。
     */
    var xhr;
    
    /**
     * 文件上传。
     */
    me.upload = function()
    {
    
    	_startUpload();
    
        xhr = new XMLHttpRequest();         
        var upload = xhr.upload; 
        xhr.addEventListener("readystatechange", _xhr_readystatechange, false);
        xhr.addEventListener("abort", _xhr_uploadCanceled, false);
        xhr.addEventListener("error", _uploadError, false);
        xhr.addEventListener("load", _uploadSucceed, false);
        xhr.uploadProgress = null;
        upload.addEventListener("loadstart",_uploadStart,false);
        upload.addEventListener("loadend",_uploadEnd,false);
        upload.addEventListener("progress", _uploadProgress, false);
        if(me.sessionId && me.sessionId!=null)
        {
            me.params.sessionId = me.sessionId;
        }
        var url = _getUrl(me.url, me.params);
        xhr.open("POST", url, true);
        xhr.setRequestHeader('Content-Disposition', encodeURIComponent(me.file.name));
        var fd = new FormData();
        if ($.browser.msie && $.browser.version == "10.0" && me.file.size == 0)//IE10上传空文件会失败，在此处理一下
        {
        	var oBlob = new Blob([" "], { type: "text/plain"});
        	fd.append("file", oBlob, me.file.name);
        }
        else
        {
        	fd.append("file", me.file);  
        }
      
        xhr.send(fd);
        fd = null;
    };
    
    /**
     * 设置 {@link params} 的值。
     */
    me.setParams = function(p_params)
    {
        if (me.params != p_params)
        {
            me.params = p_params;
        }
    };
    
    /**
     * 取消当前上传操作。
     */
    me.cancel = function()
    {
        if (xhr)
        {
            try
            {
                xhr.abort();    
            }
            catch(e){}
        }
    }
    
    function _xhr_readystatechange(event)
    {
        var xhr = event.currentTarget;
    	if (xhr != null && xhr.readyState == 4)
    	{
    		var result = xhr.responseText;
    		me.trigger("uploadcomplete", { resultValue:result });
    	}
    }
    
    function _xhr_uploadCanceled(e)
    {
        me.trigger("canceled", { event: e});
    }
    
    function _uploadProgress(event)
    {      
    	if(xhr.uploadProgress == null)
    	{
    	     xhr.uploadProgress = "xhr";
    	}
        me.trigger("progresschange", { event:event });
    }
    
    function _uploadStart()
    {
         mx.utils.DelayedTask.delay(500, function(){
         	
         	if (xhr == null) {
         		 return;
         	}
         	
         	 if(xhr.uploadProgress == null)
         	 {
         	      xhr.uploadProgress = "getProgress";
         	 }
             if(xhr.uploadProgress == "xhr")
             {
                  return;
             }
             _getProgress();
         }, me, []);
         
    }
    /**
     *@ignore
     *文件是否已上传完成 
     */
    var isUploadEnd = false; 
    
    function _uploadEnd()
    {
    	  isUploadEnd = true;
    	  me.sessionId = null;
          me.trigger("progresschange", 100);
    }
    
    function _startUpload()
    {
    	isUploadEnd = false;
    	me.sessionId = null;
    	try{
    	    	    var xmlHttp =  new XMLHttpRequest();
					xmlHttp.open("POST", me.url, false);
					xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
					xmlHttp.send("option=startUpload&rnd=" + mx.random());
					if (xmlHttp.status == 200) {
						if (typeof xmlHttp.responseText == "string") {
							  me.sessionId = xmlHttp.responseText.trim();  
						}
					} 
    	}catch(e){}
    }
    
    function _getProgress()
    {  
    	if(isUploadEnd === true || me.sessionId == null)
    	{
    	     return; 
    	}
	    try {
			var xmlHttp = new XMLHttpRequest();
			xmlHttp.open("post", me.url, false);
			xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
			xmlHttp.send("option=getProgress&sessionId="+me.sessionId+"&rnd=" + mx.random());
			if (xmlHttp.status == 200) {
				var res = xmlHttp.responseText;
				if (res) {
					res = parseInt(res, 10);
					if (res != -1 && !isNaN(res)) {
						try {
							if(0 < res < 100){
					             me.trigger("progresschange", res);
					        }
							window.setTimeout(_getProgress, 500)
						} catch (e) {
						}
					 } 
				}
			} 
		} catch (e) {
		}
    }
    
    function _uploadSucceed(event)
    {
        me.trigger("progresscomplete", { event:event });
    }
    
    function _uploadError(event)
    {
        me.trigger("progresserror", { event:event });
    }
    
    function _getUrl(p_url, p_params)
    {
        var params = "";
        var url = "";
        for (var key in p_params)
        {
            if (params == "")
            {
                params += key + "=" + encodeURIComponent(encodeURIComponent(me.params[key]));
            }
            else
            {
                params += "&" + key + "=" + encodeURIComponent(encodeURIComponent(me.params[key]));
            }
        }
        
        url = p_url + ($isEmpty(params) ? "" : "?" + params);
        return url;
    }
    
    base.dispose = me.dispose;
    /**
	* 释放对象运行时动态生成的内容（属性、方法、事件）。
	*/
    me.dispose = function()
    {
    	if (xhr != null)
    	{
    		xhr.removeEventListener("readystatechange",_xhr_readystatechange);
	        xhr.removeEventListener("abort",_xhr_uploadCanceled);
	        xhr.removeEventListener("error",_uploadError);
	        xhr.removeEventListener("load",_uploadSucceed);
	        
	        xhr.upload.removeEventListener("loadstart",_uploadStart);
	        xhr.upload.removeEventListener("loadend",_uploadEnd);
	        xhr.upload.removeEventListener("progress",_uploadProgress);
        
    		xhr = null;
    		delete xhr;
    	}
    	
    	base.dispose();
    }
    
    me.endOfClass(arguments);
    return me;
};

/**
 * 提供一个方法，判断当前浏览器是否支持 HTML5 文件拖拽功能。
 */
mx.io.FileUploader.isSupported = function()
{
    return typeof(FileReader) == "undefined" ? false : true;
};
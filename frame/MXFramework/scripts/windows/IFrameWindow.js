$ns("mx.windows");

/**
 * 提供一个使用 IFrame 加载技术实现的窗体基类，该窗体的主体部分是一个 IFRAME 元素，当窗体显示在浏览器时，会动态加载 {@link mx.windows.IFrameWindow.url} 字段指定的页面。
 * 
 * <p>
 * <b>IFrameWindow 的初始化逻辑，必须通过订购 {@link onload} 事件编写，切勿通过重写 {@link init} 方法实现。</b>
 * </p>
 */
mx.windows.IFrameWindow = function()
{
    var me = $extend(mx.windows.Window);
    var base = {};
    
    /**
     * 获取或设置当前窗体对象是否允许重用。
     */
    me.reusable = false;
    
    /**
     * 获取或设置内部嵌入的 iframe DOM对象的 src 属性。
     */
    me.url = null;
    
    /**
     * 获取窗体内部嵌入的 iframe DOM对象，不允许设值覆盖。
     */
    me.iframe = null;
    
    base.init = me.init;
    me.init = function()
    {
        base.init();
        me.ajax = false;
        me.$body.append("<div style='width:100%;height:100%;'><iframe style='width:100%;height:100%;' frameborder=0></iframe></div>");
        me.iframe = me.$("iframe").get(0);
    };
    
    base._show = me._show;
    /**
     * @ignore
     */
    me._show = function()
    {
        if (!me.isLoaded)
        {
            me.__load();
            base._show(false);
        }
        else
        {
            base._show();
        }
    };
    
    var _sessionTimer = null;
    /**
     * @ignore
     */
    me.__load = function()
    {
        var url = me.url;
        if (mx.debugMode)
        {
            if (url.indexOf("?") != -1)
            {
                url += "&rnd=" + mx.random();
            }
            else
            {
                url += "?rnd=" + mx.random();
            }
        }
        me.iframe.src = mx.mappath(url);
        
        $(me.iframe).one("load", me.__load_callback);
        
        /** 如果打开的菜单和 workbench 不在同一域内，为避免IFrame 中的页面会话超时
         	则通过后台请求的方式保持会话,当前默认为 10 分钟请求一次所访问地址所在域
         	的页面。*/
        if (!url.startsWith(mx.rootPath))
    	{
    		var match = url.match(/^(.*\:\/\/[^\/]*\/[^\/]*\/)*/);
    		
    		var appUrl = null;
			if (typeof match != "undefined" && null != match)
			{
				appUrl = match[1];
			}
		   	
			if ($notEmpty(appUrl))
			{
	        	_sessionTimer = window.setInterval(
		    		function()
		    		{
		    			$.ajax({
			                url: appUrl + "ping/ping.jsp",
			                type: "POST",
			                async: true,                
			                error: function(e){
			                    window.clearInterval(_sessionTimer);
			                }
			            }); 
		    		}, 600000
		    	);
			}
    	}
    };
    
    /**
     * @ignore
     */
    me.__load_callback = function()
    {
        me.isLoaded = false;
        if (typeof(me.load) == "function")
        {
            me.load({target: me, type: "load"});
        }
        me.trigger("load");
    };
    
    base.dispose = me.dispose;
    /**
	* 释放对象运行时动态生成的内容（属性、方法、事件）。
	*/
    me.dispose = function()
    {
        window.clearInterval(_sessionTimer);
		_sessionTimer = null;
		
 		//added by tiger on 20140421,避免IFRAMEWINDOW内存泄露
		$(me.iframe).off().unbind().remove();
		me.off();
		_disposing=true;	
		//end added
		base.dispose();
    };
    
    //added by tiger on 2014/4/30 15:04:10
	var _disposing=false;
    base.close = me.close;
    me.close = function(){
    	try{
    		me.iframe.contentWindow.windowWillClose = true;
    		me.iframe.contentWindow.close();
    	}catch(e)
    	{
    		
    	}
		if(_disposing){
			base.close();
		}else{
			var timer1 = setTimeout(function(){
				clearTimeout(timer1);			
				base.close();
			}, 200);
		}		
    }
    //end add
    
    me.endOfClass(arguments); 
    return me;
};
$ns("mx.windows");

/**
 * 提供一个使用 AJAX 动态加载技术实现的窗体基类。窗体在第一次显示在浏览器之前，会自动从后台通过 AJAX 技术加载 {@link mx.windows.AjaxWindow.url} 字段指定的页面，并将其中的内容呈现在窗体中。
 * 
 * <p>
 * <b>AjaxWindow 的初始化逻辑，必须通过订购 {@link onload} 事件编写，切勿通过重写 {@link init} 方法实现。</b>
 * </p>
 */
mx.windows.AjaxWindow = function()
{
    var me = $extend(mx.windows.Window);
    var base = {};
    
    /**
     * 获取一个绝对（如 http://www.google.com）或相对 URL 路径（如 ~/samples/test.jsp）， AJAX 动态加载的 URL 地址。
     * 该字段必须在初始化前设置。
     */
    me.url = null;
    
    /**
     * 设置 AjaxWindow 是否处于调试模式。
     */
    me.debugMode = false;
    
    base.init = me.init;
    me.init = function()
    {
        base.init();
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
    
    /**
     * @ignore
     */
    me.__load = function()
    {
        if (!me.debugMode)
        {
            // 如果当前窗体是在非调试模式，即使用 AJAX 模式。
            me.setBusy();
            var url = me.url;
            if (mx.debugMode)
            {
                // 如果 MX 框架处于调试模式，则强制浏览器不缓存数据。
                if (url.indexOf("?") != -1)
                {
                    url += "&rnd=" + mx.random();
                }
                else
                {
                    url += "?rnd=" + mx.random();
                }
            }
            
            $.ajax({
        		url: mx.mappath(url),
        		success: function(response,status,xhr){
        			var ajaxHtml = response;
        			var fxDef = "id='$mx-framework$'";
        			
        			if (response.indexOf(fxDef) > 0)
        			{
        				var metaDef = "<meta ";
            			var fxEndDef = "'></script>";
            			
            			var metaDefLoc = response.indexOf(metaDef);
            			var fxDefLoc = response.indexOf(fxDef);
            			var fxEndDefLoc = response.indexOf(fxEndDef, fxDefLoc) + fxEndDef.length;
            			ajaxHtml = response.substr(0, metaDefLoc) + response.substring(fxEndDefLoc);
        			}
        			
        			me.$body.html(ajaxHtml);
        			
        			me.__load_callback(response, status, xhr);
        		}
        	});
        }
        else
        {
            // 如果是在调试模式，即使用 JSP 页面直接访问，则直接触发 onload 事件。
            window.setTimeout(me.__load_callback, 50);
        }
    };
    
    /**
     * @ignore
     */
    me.__load_callback = function()
    {
        me.isLoaded = true;
        me.setBusy(false);
        if ($isFunction(me.load))
        {
            me.load({target:me, type:"load"});
        }
        me.trigger("load");
    };
    
    me.endOfClass(arguments); 
    return me;
};
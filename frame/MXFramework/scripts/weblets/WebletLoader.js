$ns("mx.weblets");

/**
 * 提供一个 {@link mx.weblets.Weblet} 加载器的类。该类只在 MX 框架内部使用，不建议开发人员直接使用。
 */
mx.weblets.WebletLoaderClass = function()
{
    var me = this;
    
    /**
     * @ignore
     */
    me.load = function(p_webletID, p_callback, p_params)
    {
        var webletID = _getWebletID(p_webletID);
        var bundleName = _getBundleName(p_webletID);
        if (bundleName != null && mx.weblets.WebletManager.bundles[webletID] == null)
        {
            mx.weblets.WebletManager.bundles.add(bundleName);
            mx.weblets.WebletManager.bundles[webletID] = bundleName;
        }
        
        if (!mx.debugMode)
        {
            _load(p_webletID, p_callback, p_params);
        }
        else
        {
           _loadUnderDebugMode(p_webletID, p_callback);
        }
    };
    

    function _load(p_webletID, p_callback, p_params)
    {       
        var path = _getPath(p_webletID, p_params);
        mx.include(path, function(){
            _loadcallback(p_webletID, p_callback);
        });
    }
    
    
    function _loadUnderDebugMode(p_webletID, p_callback)
    {
        var path = _getPath(p_webletID);
        // 如果是 Deubg 模式，先加载 weblet.js。
        mx.importClass(path, function(){
            _loadcallback(p_webletID, p_callback);
        });
    }
    
    function _getWebletID(p_webletID)
    {
        var webletID = null;
        if ($isString(p_webletID))
        {
            webletID = p_webletID;
        }
        else
        {
            webletID = p_webletID.webletID;
        }
        return webletID;        
    }
    
    function _getBundleName(p_webletID)
    {
        var bundleName = null;
        if (!$isString(p_webletID) && typeof(p_webletID.bundleName) != "undefined")
        {
            bundleName = p_webletID.bundleName;
        }
        return bundleName;
    }
    
    function _getPath(p_webletID, p_params)
    {
        var webletID = _getWebletID(p_webletID);
        var bundleName = _getBundleName(p_webletID);
        
        var path = null;
        if (!mx.debugMode)
        {
        	var webletName = webletID;
        	var weblet = mx.weblets.WebletManager.weblets[webletID];
        	
        	if (webletID.indexOf("$") != -1)
            {
        		webletName = webletID.substring(webletID.lastIndexOf("$") + 1);
            }
        	
        	if (p_params && p_params.scene)
    		{
        		path = String.format("/{0}/scenes/{1}/scripts/combine.js", [p_params.bundleName, p_params.scene]);
    		}
        	else
        	{
        		path = String.format("~/{0}/scripts/{1}.weblet.js", [webletID, webletName]);
        	}
        }
        else
        {
            path = webletID + ".weblet";
        }
        return path;
    }
    
    function _loadcallback(p_webletID, p_callback)
    {
        // 当 weblet.js 加载完毕
        var webletID = _getWebletID(p_webletID);
        var bundleName = _getBundleName(p_webletID);
        
        var weblet = null;
        try
        {
            weblet = eval('('+webletID+')');
        }
        catch (e) {}
        
        if ($instanceOf(weblet, mx.weblets.Weblet))
        {
            if (bundleName != null && weblet.bundleName == null)
            {
                weblet.bundleName = bundleName;                
            }
            
            // 如果 Weblet 正确加载，则：
            // 1.加载国际化，非 Debug 模式下也需要做此操作。
            if (mx.enableWebletI18n)
            {
            	mx.importMessages(webletID);
            }
            
            // 2.加载所有依赖的 Weblet。
            for (var i = 0; i < weblet.requires.length; i++)
            {
                var require = weblet.requires[i];
                var bdlName = bundleName;
                var webletName = null;
                var parts = require.split("/");
                if (parts.length > 1)
                {
                    bdlName = parts[0];
                    webletName = parts[1];
                }
                else
                {
                    webletName = require;
                }
                
                if (webletName == webletID)
                {
                    // 防止自我依赖。
                    continue;
                }
                else if (mx.weblets.WebletManager.weblets[webletName] != null)
                {
                    // 防止循环依赖。
                    continue;
                }
                else
                {
                    if (bundleName != null)
                    {
                        me.load({
                            webletID:webletName,
                            bundleName:bdlName
                        });
                    }
                    else
                    {
                        me.load(webletName);
                    }
                }
            }
            // 3.当上述所有脚本均加载成功：
            mx.whenScriptReady(function()
            {
                if (!weblet.hasLoaded)
                {
                    weblet.hasLoaded = true;
                    weblet.trigger("load");
                }
                if ($isFunction(p_callback))
                {
                    p_callback(weblet);
                }
            });
        }
        else
        {
        	var errMsg = mx.err("WEBLET_LOAD", [ webletID ]);
        	if (mx.debugMode)
        	{
        		throw new Error(errMsg);
        	}
        	else
        	{
        		mx.error(errMsg);
        	}
        }
    }
    
    return me;
};

mx.weblets.WebletLoader = new mx.weblets.WebletLoaderClass();
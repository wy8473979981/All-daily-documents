/*!
 * MXFramework v5.0 (Codename: Elegance)
 * - A WebApp-Oriented AJAX Framework
 *
 * Copyleft 2012.
 *
 * Create Date: 2012-06-05 16:51
 */

// 定义全局对象。
$global = window;


// 命名空间
function $namespace(p_namespace)
{
    var parts = p_namespace.split(".");
    if (parts.length == 0)
    {
        return null;
    }
    
    // 命名空间的第一层一定是一个 Weblet，如果没有则必须使用 WebletManager.load 加载。
    var webletName = parts[0];
    try
    {
        eval("(" + webletName + ")");
    }
    catch (e)
    {
        throw new Error(mx.err("WEBLET_UNDEFINED", [ webletName ]));
    }
    
    var space = parts[0];
    for (var i = 1; i < parts.length; i++)
    {
        space += "." + parts[i];
        if (!eval(space))
        {
            eval(space + " = {};");
        }
    }
    return eval(p_namespace);
}
$ns = $namespace;

// 继承
function $extend(p_baseClass)
{
    if (typeof(p_baseClass) == "function")
    {
        var inst = new p_baseClass();
        inst.__class__ = $extend.caller;
        if (p_baseClass != MXObject && p_baseClass != MXComponent)
        {
            inst.__superClasses__.push(p_baseClass);
        }
        return inst;
    }
}

// 获取 p_inst 实例的类型。
function $getClass(p_inst)
{
    if (p_inst == null)
    {
        return null;
    }
    switch (typeof(p_inst))
    {
        case "boolean":
            return Boolean;
            
        case "number":
            return Number;

        case "string":
            return String;
            
        case "function":
            return Function;
            
        case "object":
            if (typeof(p_inst.getClass) == "function")
            {
                return p_inst.getClass();
            }
            else if ($isDate(p_inst))
            {
                return Date;
            }
            else if ($isArray(p_inst))
            {
                return Array;
            }
            else
            {
                return Object;
            }
    }
}

// 判断 p_inst 是否是 p_class 的实例。
function $instanceOf(p_inst, p_class)
{
    if (p_inst == null)
    {
        return false;
    }
    switch (typeof(p_inst))
    {
        case "boolean":
            return p_class == Boolean;
            
        case "number":
            return p_class == Number;

        case "string":
            return p_class == String;
            
        case "function":
            return p_class == Function;
            
        case "object":
            if (typeof(p_inst.instanceOf) == "function")
            {
                return p_inst.instanceOf(p_class);
            }
            else if ($isDate(p_inst))
            {
                return p_class == Date;
            }
            else if ($isArray(p_inst))
            {
                return p_class == Array;
            }
            else
            {
                return false;
            }
    }
}

function $isIE()
{
    return (window.navigator.userAgent.toLowerCase().indexOf("msie") != -1);
}

/**
 * @ignore
 * 清除窗体内部 Iframe 造成的内存泄露。
 */
function $clearIframeLeak(p_iframe)
{
	p_iframe.onload = null;
	p_iframe.src = "about:blank";
	
    var contentWindow = null;
    
    try{
    	contentWindow = p_iframe.contentWindow;
    }catch(e){contentWindow = null;}
    
    if (contentWindow)
    {
    	try
    	{
    		contentWindow.document.write("");
    		if ($isFunction(contentWindow.document.clear))
    		{
    			contentWindow.document.clear();
    		}
    		
        	//contentWindow.close();
    	}catch(e){}
    }
    
    try
    {
    	p_iframe.src = "";
    }catch(e){}
    
    if($isIE())
	{
		top.CollectGarbage();
		setTimeout("CollectGarbage();", 100);
	}
}

/**
 * 提供一个基础类，为 MX 框架提供运行时环境。该类在运行时只有一个实例 mx。
 */
MX = function()
{
    var me = this;
    
    /**
     * 获取或设置模块名称。
     */
    me.bundleName = "mx";
    
    /**
     * 获取框架的国际化信息。
     * 
     * @default zh_CN
     */
    me.locale = "zh_CN";
    
    /**
     * 获取或设置框架的主题库名称。
     * 如果需要替换框架提供的主题，请使用 {@link setTheme} 方法设置主题。
     * 
     * @default aero
     */
    me.theme = "aero";
    
    /**
     * 获取或设置框架使用的主题库的路径。
     * 如果需要替换框架提供的主题，请设置该字段的值。
     * 
     * @default ~/mx/resources/themes
     */
    me.themePath = "~/mx/resources/themes";
    
    /**
     * 获取一个 Boolean 值，表示当前是否开发。如果为 true 表示当前是开发模式；反之当前为运行时模式。
     * 
     * @default false
     */
    me.debugMode = false;
    
    /**
     * 获取一个 Boolean 值，表示当前是否采用压缩模式引入框架。
     * 
     * @default false
     */
    me.compressMode = false;
    
    /**
     * 获取一个字符串值，表示框架内的上传控件 {@link mx.editors.FileEditor} 的默认上传模式。
     * 
     * @default null
     */
    me.globalUploadMode = null;
    
    /**
     * 获取设置的错误类型，如果为 normal 表示正常提示错误信息，如果为 friendly 表示不显示后台错误信息。
     * 
     * @default normal
     */
    me.errorType = "normal";
    
    /**
     * 是否启用 Weblet 中的国际化功能。
     * 
     * @default true
     */
    me.enableWebletI18n = true;
    
    /**
     * 获取当前工程的根路径。
     */
    me.rootPath = null;
    
    /**
     * @ignore
     * 获取当前工程的相对路径。
     */
    me.relativePath = null;
    
    var useRelativePath = true;
    
    me.init = function()
    {
        var scripts = document.getElementsByTagName("script");
        var src = scripts[scripts.length - 1].src;
        
        var mxPath = "/mx/scripts/framework-debug.js";
        var mxminPath = "/mx/scripts/framework.js";
        
        if (_endsWith(src, mxPath))
        {
            me.rootPath = src.substr(0, src.length - mxPath.length);
        }
        else if (_endsWith(src, mxminPath))
        {
            me.rootPath = src.substr(0, src.length - mxminPath.length);
        }
        
        if (typeof($MX_DEBUGMODE) != "undefined")
        {
            me.debugMode = $MX_DEBUGMODE;
        }
        
        if (typeof($MX_COMPRESSMODE) != "undefined")
        {
            me.compressMode = $MX_COMPRESSMODE;
        }
        
        if (me.compressMode == true)
        {
        	var mxgzipPath = "/mx/servlets/mxframework";
        	me.rootPath = src.substr(0, src.length - mxgzipPath.length);
        }
        
        if (typeof $SERVER_PATH != "undefined")
        {
            me.relativePath = _endsWith($SERVER_PATH, "/") && $SERVER_PATH != "/" ? $SERVER_PATH.substring(0, $SERVER_PATH.length-1 ) : $SERVER_PATH;
        }
        
        if (typeof($MX_LOCALE) != "undefined")
        {
            me.locale = $MX_LOCALE;
        }
        
        if (typeof($MX_ERRORTYPE) != "undefined")
        {
            me.errorType = $MX_ERRORTYPE;
        }
        
        if (typeof($MX_THEME) != "undefined")
        {
            me.theme = $MX_THEME;
        }
        if (typeof($MX_THEMEPATH) != "undefined")
        {
            me.themePath = $MX_THEMEPATH;
        }
        if (typeof($MX_UPLOADMODE) != "undefined")
        {
            me.globalUploadMode = $MX_UPLOADMODE;
        }
        
        if (typeof($MX_ENABLE_WEBLET_I18N) != "undefined")
        {
            me.enableWebletI18n = $MX_ENABLE_WEBLET_I18N;
        }
        
        if (typeof $MX_USERP != "undefined")
        {
            useRelativePath = $MX_USERP;
        }
        
        if (useRelativePath == true && me.relativePath != null)
        {
            me.rootPath = me.relativePath;
        }
        
        me.importMessages("mx");    
        me.include("$/css/zero.css");
        me.include("$/fonts/pictos.css");
        
        if (me.debugMode && !me.compressMode)
        {
            me.importClass("mx.types.Array");
            me.importClass("mx.types.Boolean");
            me.importClass("mx.types.Date");
            me.importClass("mx.types.Function");
            me.importClass("mx.types.HashMap");
            me.importClass("mx.types.Number");
            me.importClass("mx.types.Object");
            me.importClass("mx.types.String");

            me.importClass("mx.lib.jquery-aop");
            
            me.importClass("mx.MXComponent");
            me.importClass("mx.MXObject");
            me.importClass("mx.MXEvent");
            
            me.importClass("mx.utils.JsonUtil");
            me.importClass("mx.utils.SymbolUtil");
            me.importClass("mx.utils.CheckUtil");
            me.importClass("mx.lib.jquery-mx");
            
            me.importClass("mx.controls.Control");
            me.importClass("mx.controls.ErrorBox");
            me.importClass("mx.editors.Editor");
            me.importClass("mx.containers.Container");
            me.importClass("mx.views.View");
            me.importClass("mx.views.ViewController");
            me.importClass("mx.windows.Window");
            me.importClass("mx.windows.WindowManager");
            me.importClass("mx.weblets.WebletContainer");
            me.importClass("mx.permissions.PermissionAgentClass");
            me.importClass("mx.bizlogic.BizModelAgentClass");
            
            me.include("$theme/theme.css");
        }
        else
        {
            me.include("$theme/min.css");
            me.loadMXExtModule();
        }
        
        $.ajaxSetup({
            global: true,  

            complete:function(e)
            {
                var sessionstate = e.getResponseHeader("sessionstate");
                var redirecturl = e.getResponseHeader("redirecturl");
                
                //update by tiger on 2015/7/27 11:37:45, 防止XSS注入攻击
                redirecturl = encodeURI(redirecturl);
                redirecturl = redirecturl.replace(/javascript:/gi, '');
                //end update
                
                if (sessionstate != null && sessionstate == 'timeout')
                {
                	mx.indicate("info", mx.msg("SESSION_TIMEOUT"));
                	if (redirecturl != null)
                	{
                		if (!redirecturl.toLowerCase().indexOf("http://"))
                			top.window.location.href = redirecturl;
                	}
                    else
                    {
                    	top.window.location.reload();
                    }
                }
            }
        });
        return me;
    };
    
    /**
     * 在控制台打印 MX 的普通日志。日志以“MX”开头（如“[MX] loaded.”）。
     * 
     * @param p_message
     *            一个字符串，表示需要打印的信息。
     */
    me.log = function(p_message)
    {
        if (typeof(console) != "undefined" && typeof(console.log) != "undefined")
        {
            console.log("[MX] " + p_message);
        }
    };
    
    /**
     * 在控制台打印 MX 的警告日志。日志以“MX”开头（如“[MX] warning.”）。
     * 
     * @param p_message
     *            一个字符串，表示需要打印的信息。
     */
    me.warn = function(p_message)
    {
        if (typeof(console) != "undefined" &&  typeof(console.warn) != "undefined")
        {
            console.warn("[MX] " + p_message);
        }
    };
    
    /**
     * 在控制台打印 MX 的错误日志。日志以“MX”开头（如“[MX] error.”）。
     * 
     * @param p_message
     *            一个字符串，表示需要打印的信息。
     */
    me.error = function(p_message)
    {
        if (typeof(console) != "undefined" &&  typeof(console.error) != "undefined")
        {
            console.error("[MX] " + p_message);
        }
    };

    __$indication = null;
    /**
     * 在指定的容器中显示一个提示。
     * 
     * @param p_type 一个字符串，表示提示的类型。如“info”、“warn”、“error”、“busy”、“user”等。
     * @param p_message 指定提示的信息。
     * @param [p_options] 设置indicate参数。参数类型包括：
     *                    delayTime: 关闭延迟时间; 
     *                    fadeOutTime: 淡化退出时间; 
     *                    vPosition: 垂直框显示位置，如“center”,"top"; 
     *                    hPosition: 水平显示位置.如“center”,"left"; 
     *                    left:      绝对定位,水平位置，优先级高于hPosition
     *                    top:       绝对定位,垂直位置，优先级高于vPosition
     */
    me.indicate = function(p_type, p_message, p_options)
    {
        var $container = $(document.body);
        
        //默认参数值
        var delayTime = 2000;
        var fadeOutTime = 1200;
        var vPosition = "center";
        var hPosition = "center";
        var left = null;
        var top = null;
        
        //参数解析
        if (p_options != null)
        {
        	//保留
            if (p_options.$container != null)
            {
                $container = p_options.$container;
            }
            
            if(p_options.delayTime != null)
            {
            	delayTime = p_options.delayTime;
            }
            
            if(p_options.fadeOutTime != null)
            {
            	fadeOutTime = p_options.fadeOutTime;
            }
            
            if(p_options.vPosition != null)
            {
            	vPosition = p_options.vPosition;
            }
            
            if(p_options.hPosition != null)
            {
            	hPosition = p_options.hPosition;
            }
            
            if(p_options.left != null)
            {
            	left = p_options.left;
            }
            
            if(p_options.top != null)
            {
            	top = p_options.top;
            }
        }

        if ($container == null) return;

        if (__$indication == null)
        {
            __$indication = $("<div id='indication' class='mx'><div id='icon'/><pre id='text'/></div>");
            __$indication.css("minWidth", 140);
            __$indication.css("maxWidth", "90%");
            __$indication.hide();
            __$indication.borderRadius(12);
        }
        $container.append(__$indication);

        var $icon = __$indication.children("#icon");
        // 由于框架使用pictos 样式字体定义图标，而这些图标在IE中有时显示不出。
        // 这里定义了平台已用的5个常见图标，确保在常规使用中图标在不同的浏览器中显示一致。
        var types = ["info","warn","error","user","busy"];
        if ($notEmpty(p_type) && types.contains(p_type))
        {
        	$icon.empty();
        	$icon.removeClass();
        	$icon.removeAttr("style");
        	$icon.addClass(p_type);
        }
        else
        {
             var symbol = mx.utils.SymbolUtil.getSymbol(p_type);
             if (symbol != null)
             {
                 $icon.show();
                 $icon.css("fontFamily", symbol.font);
                 $icon.text(symbol.text);
             }
             else
             {
                 $icon.hide();
             }
        }
        
        __$indication.children("#text").html(p_message);
        __$indication.css("left", 0);
        __$indication.css("top", 0);
        __$indication.centralize();
        if(vPosition == "top") {
        	__$indication.css("top", 0);
        }
        if(hPosition == "left") {
        	__$indication.css("left", 0);
        }
        if(left != null) {
        	__$indication.css("left", left);
        }
        if(top != null) {
        	__$indication.css("top", top);
        }

        __$indication.stop(true, true);
        
        
        __$indication.show().delay(delayTime).fadeOut(fadeOutTime);
        
        __$indication.on("click",function(){
        	__$indication.hide();
        });
    };
    
    var __errorBox = null;
    /**
     * 在页面中以统一方式显示错误信息。
     * 
     * @param p_error 一个字符串，表示错误信息；或一个 Error 对象。
     * @param p_errorPage 一个字符串，表示错误页面的地址。
     */
    me.showerror = function(p_error, p_errorPage)
    {
        if ($isString(p_error))
        {
            p_error = new Error(p_error);
        }
        
        var message = null;
        if (p_error == null)
        {
            message = mx.err("GENERAL", ["Unknown"]);
        }
        else
        {
            if (p_error.error != null && p_error.error.message != null)
            {
                p_error = p_error.error;
            }
            
            message = p_error.message;
        }
        
        if (me.errorType && me.errorType.toLowerCase() == "console")
        {
        	me.error(message);
        	return;
        }
        
        if (__errorBox == null)
        {
            __errorBox = new mx.controls.ErrorBox();
        }
        var errorPage = null;
        if ($notEmpty(p_errorPage))
        {
            errorPage = p_errorPage.replace("$serverPath", me.rootPath);
        }
        __errorBox.show(message, errorPage);
    };
    
    /**
     * 返回一个 Weblet 对应的地址。
     * 
     * @param p_url
     *            一个字符串，表示特定的地址。 
     *            <p>
     *            该参数的形式包括:
     *            <ul>
     *            <li><b>~/</b> - 以“~/”开头表示获取 UAP项目 的根目录地址或网站虚拟路径。</li>
     *            <li><b>~/../</b> - 在模块项目中使用本框架时，如果引用其他模块项目的资源必须以该格式或者完整路径。
     *            <li><b>./</b> - 以“./”开头表示获取 MX 的根目录地址。</li>
     *            <li><b>$/</b> - 以“$/”开头表示获取 MX 的 resources 目录地址。</li>
     *            <li><b>$locale/</b> - 以“$locale/”开头表示获取 MX 的 resources/locales 目录地址。</li>
     *            <li><b>$theme/</b> - 以“$theme/”开头表示获取 MX 的 resources/themes 目录地址。</li>
     *            </ul>
     *            </p>
     */
    me.mappath = function(p_url)
    {
        if (typeof (p_url) != "string") return null;
        
        var url = p_url;
        if (url.indexOf("~/../") == 0)
        {
        	if (_endsWith(me.rootPath, "/"))
        	{
            	url = me.rootPath + url.substr(5);
        	}
        	else
        	{
        		url = me.rootPath + url.substr(4);
        	}
        }
        else if (url.indexOf("~/") == 0)
        {
            var parts = url.split("/");
            var moduleName = null;
            var path = url;
            if (parts.length > 1)
            {
                moduleName = parts[1];
                if (moduleName.indexOf("$") != -1)
                {
                    var newModuleName = moduleName.replace(/\$/g, "/");
                    path = url.replace(moduleName, newModuleName);
                }
            }
            
            url = _getRootPath(url) + path.substr(2);
        }
        else if (url.indexOf("./") == 0)
        {
            url = _getRootPath(url) + "mx" + url.substr(1);
        }
        else if (url.indexOf("$/") == 0)
        {
            url = _getRootPath(url) + "mx/resources" + url.substr(1);
        }
        else if (url.indexOf("$locale/") == 0)
        {
            url = _getRootPath(url) + "mx/resources/locales/" + me.locale + url.substr(7);
        }
        else if (url.indexOf("$theme/") == 0)
        {
            url = me.mappath(me.themePath) + "/" + mx.theme + url.substr(6);
        }

        return url;
    };
    
    /**
     * 设置 {@link themePath} 字段的值。
     * 
     * @param p_themePath 一个字符串，表示需要使用的主题库的路径（如“~/dbm/resources/themes”）。
     */
    me.setThemePath = function(p_themePath)
    {
        if (p_themePath != null)
        {
            me.themePath = p_themePath;
        }
    };
    
    /**
     * 设置 {@link theme} 字段的值。
     * 
     * @param p_theme 一个字符串，表示主题的名称（如“aero”）。
     * @param [p_themePath] 一个字符串，表示需要使用的主题库的路径（如“~/dbm/resources/themes”）。
     */
    me.setTheme = function(p_theme, p_themePath)
    {
        var themePath = me.themePath;
        var oldThemeUrl = me.mappath(themePath);
        var newThemeUrl = null;
        if (p_themePath != null)
        {
            me.setThemePath(p_themePath);
            newThemeUrl = me.mappath(p_themePath);
        }
        else
        {
            newThemeUrl = oldThemeUrl;
        }
        
        if (p_theme != null)
        {            
            var href = null;
            for (var i = 0; i < me.loadedStyles.length; i++)
            {
                href = me.loadedStyles[i];                
                if (href.indexOf(oldThemeUrl + "/" + me.theme) != -1)
                {                 
                    var $link = $("link[href='" + href + "']");
                    var parts = href.split("/");
                    var url = newThemeUrl + "/" + p_theme + "/" + parts[parts.length - 1];
                    $link.attr("href", url);
                    
                    me.loadedStyles[i] = url;
                    delete me.loadedStyles[href];
                    me.loadedStyles[url] = url;
                }
            }
            
            me.theme = p_theme;
        }
    };
    
    /**
     * 获取正在加载中的 JavaScript 脚本的集合。
     * 
     * @item 一个字符串，表示 JavaScript 脚本的资源路径
     * @index JavaScript 脚本的 src 属性或者加载开始顺序（从 0 开始计数）。
     */
    me.loadingScripts = [];
    
    /**
     * 获取已经加载完毕的 JavaScript 脚本的集合。
     * 
     * @item 一个字符串，表示 JavaScript 脚本的资源路径
     * @index JavaScript 脚本的 src 属性或者加载完成顺序（从 0 开始计数）。
     */
    me.loadedScripts = [];  
    
    /**
     * 获取正在加载中的 CSS 样式库的集合。
     * 
     * @item 一个字符串，表示 CSS 样式库的资源路径
     * @index CSS 样式库的 href 属性或者加载开始顺序（从 0 开始计数）。
     */
    me.loadingStyles = [];
    
    /**
     * 获取已经加载完毕的 CSS 样式库的集合。
     * 
     * @item 一个字符串，表示 CSS 样式库的资源路径
     * @index CSS 样式库的 href 属性加载完成顺序（从 0 开始计数）。
     */
    me.loadedStyles = [];
    
    
    var __head = null;
    /**
     * 加载 JavaScript 脚本或者 CSS 样式库文件。
     * 
     * @param p_path
     *            一个字符串，表示要加载文件的路径。
     * @param [p_callback=null]
     *            加载完成后的回调方法。
     */
    me.include = function(p_path, p_callback)
    {
        var path = me.mappath(p_path);
        
        var ingList = null;
        var edList = null;
        var type = null;
        if (path.indexOf(".js") == path.length - 3)
        {
            ingList = me.loadingScripts;
            edList = me.loadedScripts;
            type = "js";
        }
        else if (path.indexOf(".css") == path.length - 4)
        {
            ingList = me.loadingStyles;
            edList = me.loadedStyles;
            type = "css";
        }
        
        if (!me.debugMode && type == "css" && path.indexOf("resources/themes") != -1)
        {
            if (path.indexOf("resources/themes/" + me.theme + "/min.css") == -1)
            {
                if (typeof(p_callback) == "function")
                {
                    p_callback();
                }
                
                return;
            }
        }
        
        if (ingList[path] != null)
        {
            if (typeof(p_callback) == "function")
            {
                ingList[path].push(p_callback);
            }
        }
        else if (edList[path] != null)
        {
            if (typeof(p_callback) == "function")
            {
                p_callback();
            }            
        }
        else
        {
            _add(ingList, path, ((typeof(p_callback) == "function") ? [ p_callback ] : []));
            if (document.body)
            {
                // 在 document 已成功加载后，某一时刻动态加载一个新的文件。
                var element = null;
                if (type == "js")
                {
                    element = document.createElement("script");                   
                }
                else if (type == "css")
                {
                    element = document.createElement("link");
                    element.rel = "stylesheet";
                }
                                
                if (element.readyState)
                {
                    element.onreadystatechange = me._include_onload;
                }
                
                element.onload = me._include_onload;
                element.onerror = me._include_onload;
                element.dynamic = true;
                
                // 必须在这里给 src 和 href 赋值，强烈鄙视 IE 的 Bug！！！
                if (type == "js")
                {
                    element.src = path;
                }
                else if (type == "css")
                {
                    element.href = path;
                }
                
                element.id = path;
                
                if (document.body != null && type != "css")
                {
                    document.body.appendChild(element);
                }
                else
                {
                    if (__head == null)
                    {
                        __head = document.getElementsByTagName('head')[0];
                    }
                    __head.appendChild(element);
                }    
            }
            else
            {            	
                // 在 document 正在加载的时候，加载一个新的文件。
                var tag = null;
                if (type == "js")
                {
                    tag = "<script src='" + path + "'";
                }
                else if (type == "css")
                {
                    tag = "<link rel='stylesheet' href='" + path + "'";
                }
                document.write(tag + " id='" + path + "' onerror='mx._include_onload(event)' onreadystatechange='mx._include_onload(event);' onload='mx._include_onload(event)'>" + (type == "js" ? "</script>" : ""));
            }
        }
    };
    $include = me.include;
    
    /**
     * @ignore
     */
    me._include_onload = function(e)
    {
        var e = e ? e : event;
        var element = null;
        if (e.srcElement != null)
        {
            element = e.srcElement;
        }
        else
        {
            element = e.target;
        }
        
        
        if (element.readyState)
        {
        	//updated by tiger on 2014/6/24 14:33:58,IE10下如果readyState状态不为complete,
        	//则webletLoader.js会报js加载异常
        	if( $.browser.msie && ($.browser.version == "10.0"))
        	{
	            if (element.readyState != "complete")
	            {
	                return;
	            }        		
        	}else{
	            if (element.readyState != "loaded" && element.readyState != "complete")
	            {
	                return;
	            } 
        	}
        	//end update
        }
        
        element.onload = null;
        element.onerror = null;
        if (element.readyState)
        {
            element.onreadystatechange = null;
        }
        
        var path = null, id = element.id;
        var callbacks = [];
        if (element.tagName == "SCRIPT")
        {
            path = element.src;
            if (!id)
            {
                id = path;
            }
            // 这里的path是绝对路径，而me.loadedScripts存储的是相对路径，因此需要使用 id 做 key。
            if (e.type != "error")
            {
                _add(me.loadedScripts, id, path);
                callbacks = me.loadingScripts[id];
                _remove(me.loadingScripts, id);
            }
            else
            {
                mx.error("Fail to load '" + path + "'.");
            }
        }
        else if (element.tagName == "LINK")
        {
            path = element.href;
            if (!id)
            {
                id = path;
            }
            
            if (e.type != "error")
            {
                _add(me.loadedStyles, id, path);
                callbacks = me.loadingStyles[id];
                _remove(me.loadingStyles, id);
            }
            else
            {
                mx.error("Fail to load '" + path + "'.");
            }
        }
        
        
        // 按照先进先出的顺序，触发 include 的回调函数。
        while (callbacks && callbacks.length > 0)
        {
            var func = callbacks.pop();
            func(path);
            func = null;
        }
        callbacks = null;
        
        
        if (me.loadingStyles.length == 0 && me._styleReady_callbacks.length > 0)
        {
            // 当所有相关样式表单均已加载完毕。
            while (me._styleReady_callbacks.length > 0)
            {        
                if (me.loadingStyles.length > 0)
                {
                    break;
                }
                
                var readyFunc = me._styleReady_callbacks.pop();
                readyFunc();
                readyFunc = null;
            }
        }
        
        if (me.loadingScripts.length == 0 && me._scriptReady_callbacks.length > 0)
        {
            // 当所有相关脚本均已加载完毕。
            while (me._scriptReady_callbacks.length > 0)
            {       
                if (me.loadingScripts.length > 0)
                {
                    break;
                }
                
                var readyFunc = me._scriptReady_callbacks.pop();
                readyFunc();
                readyFunc = null;
            }
        }
        
        if (me.loadingStyles.length == 0 && me.loadingScripts.length == 0 && me._ready_callbacks.length > 0)
        {
            // 当所有文件均已加载完毕。
            while (me._ready_callbacks.length > 0)
            {      
                if (me.loadingStyles.length > 0 || me.loadingScripts.length > 0)
                {
                    break;
                }
                
                var readyFunc = me._ready_callbacks.pop();
                readyFunc();
                readyFunc = null;
            }
        }
    };
    
    /**
     * @ignore
     */
    me._ready_callbacks = [];
    
    /**
     * 添加一个方法，该方法在所有资源加载完成后被执行。
     * 
     * @param p_callback
     *            回调方法。
     */
    me.whenReady = function(p_callback)
    {
        if (typeof(p_callback) != "function")
        {
            return;
        }
        
        if (me.loadingStyles.length == 0 && me.loadingScripts.length == 0)
        {
            p_callback();
        }
        else
        {
            me._ready_callbacks.push(p_callback);
        }
    };
    
    me._styleReady_callbacks = [];
    
    /**
     * 添加一个方法，该方法在所有 CSS 样式库加载完成后被执行。
     * 
     * @param p_callback
     *            回调方法。
     */
    me.whenStyleReady = function(p_callback)
    {
        if (typeof(p_callback) != "function")
        {
            return;
        }
        
        if (me.loadingStyles.length == 0)
        {
            p_callback();
        }
        else
        {
            me._styleReady_callbacks.push(p_callback); 
        }
    };
    
    me._scriptReady_callbacks = [];
    
    /**
     * 添加一个方法，该方法在所有 JavaScript 脚本加载完成后被执行。
     * 
     * @param p_callback
     *            回调方法。
     */
    me.whenScriptReady = function(p_callback)
    {
        if (typeof(p_callback) != "function")
        {
            return;
        }
        
        if (me.loadingScripts.length == 0)
        {
            p_callback();
        }
        else
        {
            me._scriptReady_callbacks.push(p_callback); 
        }
    };
    
    
    var __scrollBarWidth = null;
    /**
     * 获取滚动条的宽度。
     */
    me.getScrollBarWidth = function()
    {
        if ($isEmpty(__scrollBarWidth))
        {
            var scrollBarHelper = document.createElement("div");
            scrollBarHelper.style.cssText = "overflow:scroll;width:100px;height:100px;visibility:hidden"; 
            document.body.appendChild(scrollBarHelper);
            if (scrollBarHelper) {
                __scrollBarWidth = {
                    horizontal: scrollBarHelper.offsetHeight - scrollBarHelper.clientHeight,
                    vertical: scrollBarHelper.offsetWidth - scrollBarHelper.clientWidth
               };
           }
           document.body.removeChild(scrollBarHelper);
        }
        return __scrollBarWidth;
    };
    
    function _add(p_collection, p_key, p_value)
    {
        p_collection[p_key] = p_value;
        p_collection.push(p_key);
    }
    
    function _remove(p_collection, p_key)
    {
        for (var i = 0; i < p_collection.length; i++)
        {
            if (p_collection[i] == p_key)
            {
                p_collection.splice(i, 1);
                p_collection[p_key] = null;
                delete p_collection[p_key];
                break;
            }
        }
    }
    
    function _endsWith(p_str1, p_str2)
    {
        return p_str1.substring(p_str1.length - p_str2.length) == p_str2;
    }
    
    /**
     * 加载 JavaScript 脚本。
     * 
     * @param p_fullClassName
     *            要加载的类信息，如 mx.windows.Window。
     * @param [p_callback=null]
     *            加载完成后的回调方法。
     */
    me.importClass = function(p_fullClassName, p_callback)
    {
        if (!me.debugMode && !p_fullClassName.contain("mx.lib.echarts") && !p_fullClassName.contain("mx.lib.ckeditor"))
        {
            if (typeof(p_callback) == "function")
            {
                p_callback();
            }
        }
        else
        {
            var parts = p_fullClassName.split(".", 1);
            var path = null;
            if (parts.length == 1)
            {
                var moduleName = parts[0];
                var classPath = p_fullClassName.substr(moduleName.length + 1).replace(/\./g, "/");
                path = "~/" + moduleName + "/scripts/" + classPath + ".js";
            }
            
            if (path != null)
            {
                me.include(path, p_callback);
            }
        }
    };
    $import = me.importClass;
    
    /**
     * 加载国际化资源脚本。
     * 
     * @param p_moduleName
     *            要加载的模块名称。
     * @param [p_callback=null]
     *            加载完成后的回调方法。
     */
    me.importMessages = function(p_moduleName, p_callback)
    {
        var path = null;
        path = "$locale/messages.js";
        var isExist = true;
        if (p_moduleName == "mx")
        {
            path = "$locale/messages.js";
        }
        else
        {
            path = "~/" + p_moduleName + "/resources/locales/" + me.locale + "/messages.js";
            path = mx.mappath(path);
            $.ajax({
                url: path,
                type: "GET",
                async: false,                
                error: function(e){
                    isExist = false;
                }
            }); 
        }
        if (isExist)
        {            
            me.include(path, p_callback);
        }
    };
    
    /**
     * 返回一个字符串，表示国际化信息。
     * 
     * @param p_key
     *            一个字符串，表示指定的键。
     * @param [p_args=null]
     *            一个数组或 JSON 对象。当国际化信息为“{0} 已加载。”或“{0} 和 {1}
     *            已加载。”的形式时，参数为数组，分别对应各个占位符中的值；当国际化信息为“{a} 已加载。”或“{a} 和 {b}
     *            已加载。”的形式时，参数为 JSON 对象（如{a: "DBM", b: "DBM2"}）。
     */
    me.msg = function(p_key, p_args)
    {
        return $format(mx.messages[p_key], p_args);
    };
    
    /**
     * 返回一个字符串，表示错误类的国际化信息。
     * 
     * @param p_key
     *            一个字符串，表示指定的键。<b>在国际化文件中错误类的国际化信息的键需要以“ERR_”开头，但获取国际化信息时不需要加“ERR_”。</b>
     * @param p_args
     *            请参见 {@link msg} 方法的“p_args”参数。
     */
    me.err = function(p_key, p_args)
    {
        return me.msg("ERR_" + p_key, p_args);
    };
    
    function _getBundleName(p_moduleName)
    {
        var path = null;
        if (typeof(mx.weblets) != "undefined" && typeof(mx.weblets.WebletManager) != "undefined")
        {
            var bundle = mx.weblets.WebletManager.bundles[p_moduleName];
            if (bundle != null)
            {
                path = bundle;
            }
        }
        return path;
    }
  
    function _getRootPath(p_url)
    {
        var url = p_url;
        var path = me.rootPath;
        var parts = url.split("/");
        var moduleName = null;
        var bundleName = null;
        
        if (parts.length > 1)
        {
            moduleName = parts[1];
        
            if (moduleName != "mx")
            {
                bundleName = _getBundleName(moduleName);
            }
            
            if (url.indexOf("~/") == 0)
            {
                if (moduleName != "mx")
                {
                    path += (bundleName == null ? "" : (path == "/" ? bundleName : "/" + bundleName));
                }
            }
        }
        
        return _endsWith(path, "/") ? path : (path + "/");
    }
    
    /**
     * 加载框架扩展模块的 Weblet 脚本。
     * 
     * @param p_extWebletName
     *            要加载的扩展模块 Weblet 名称，默认为 "mx"。
     * @param [p_callback=null]
     *            加载完成后的回调方法。
     */
    me.loadMXExtModule = function(p_extWebletName, p_callback)
    {
    	if (typeof(p_extModuleName) == "undefined")
    	{
    		p_extWebletName = "mx";
    	}
        
        var _rootPath = _endsWith(me.rootPath, "/") ? me.rootPath : (me.rootPath + "/");
    	
    	var path = "mx.extmodule.js";
        if (p_extWebletName == "mx")
        {
            path = "mx.extmodule.js";
            path = _rootPath + "mx/scripts/" + path;
        }
        else
        {
            path = p_extWebletName + ".extmodule.js";
            path = _rootPath + p_extWebletName + "/scripts/" + path;
        }
        
        var isExist = true;
	    $.ajax({
            url: path,
            type: "GET",
            async: false,
            timeout: 6000,
            complete: function(response) {
	            if (response.status == 200) {
	               isExist = true;
	            } else {
	               isExist = false;
	            }
	        }
	    }); 
        
	    if (isExist)
	    {
	    	me.include(path, p_callback);
	    }
    };
    
    //added by tiger on 2014/5/9 18:57:22
    me.dispose = function()
    {   
    	if ($isIE())
    	{
    		var head = document.getElementsByTagName('head')[0];
    		var nodes = head.childNodes;
    		for(var i=nodes.length-1; i>=0; i--){
    			if(nodes[i].tagName=='SCRIPT'){
    				nodes[i].onload = null;
    				nodes[i].onerror = null;
    				nodes[i].onreadystatechange = null;
    			}
    			nodes[i].removeNode(true);
    		}
    		
    		//脚本集合清除
    		for(var item in me.loadedScripts){
    			me.loadedScripts[item] = null;
    			delete me.loadedScripts[item];
    		}
    		me.loadedScripts.length = 0;

    		for(var item in me.loadedStyles){
    			me.loadedStyles[item] = null;
    			delete me.loadedStyles[item];
    		}
    		me.loadedStyles.length = 0;
    		
    		for(var item in me.loadingScripts){
    			me.loadingScripts[item] = null;			
    			delete me.loadingScripts[item];
    		}
    		me.loadingScripts.length = 0;
    		
    		for(var item in me.loadingStyles){
    			me.loadingStyles[item] = null;
    			delete me.loadingStyles[item];
    		}
    		me.loadingStyles.length = 0;
    	}
		
		//属性置空
		for(var item in me){
			if (item != "document")
			{
				me[item] = null;
			}
		}
    };
    
    
    me.random = function (p_number){
    	var seed = new Date().getTime();
    	seed = (seed*9301+49297) % 233280;
    	if (p_number == null || parseInt(p_number) == NaN)
    		return Math.ceil(seed/233280.0 * 10000000000000000);
    	else
    		return Math.ceil(seed/233280.0 * parseInt(p_number));
    }
    
    return me;
};

mx = new MX();
mx.init();

window.onerror = function(p_message, p_url, p_line)
{
	//屏蔽AnyChart在销毁后仍然活动事件
	if(p_message.indexOf('SetReturnValue')>-1 && p_message.indexOf('无法获取')>-1){
		return;
	}
    mx.showerror(new Error(p_url + "\r\nLine: " + p_line + "\r\n\r\n" + p_message));
};

window.onunload = function(){
	mx.dispose();
	mx = null;
	
	window.jQuery = window.$ = null;
};
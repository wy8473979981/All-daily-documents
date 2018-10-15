$ns("mx.weblets");

$import("mx.weblets.WebletContext");

/**
 * 描述一个 Web 小程序的类。请不要在程序中直接实例化该类。 通常该类会在 weblet.js 中通过
 * {@link mx.weblets.WebletManagerClass.register} 方法创建。
 */
mx.weblets.Weblet = function()
{
    var me = $extend(MXComponent);
    var base = {};

    /**
     * 获取该 Weblet 的名称。
     */
    me.name = null;

    /**
     * 获取或设置模块名称。
     */
    me.bundleName = null;
    
    /**
     * 获取该 Weblet 的上下文信息。也可以使用 {@link getContext} 方法获取。
     */
    me.context = null;

    /**
     * 获取一个集合，包含该对象依赖的所有 {@link mx.weblets.Weblet}。如果需要跨模块引用 {@link mx.weblets.Weblet}，可写成“bundle/weblet”的形式。
     * 
     * @item String
     * @index 项在集合中的序号（从 0 开始计数）。
     */
    me.requires = [];

    /**
     * 获取一个 Boolean 值，表示 {@link mx.weblets.Weblet} 是否已加载。
     * 
     * @default false
     */
    me.hasLoaded = false;

    /**
     * 获取一个 Boolean 值，表示 {@link mx.weblets.Weblet} 是否已启动。
     * 
     * @default false
     */
    me.hasStarted = false;

    /**
     * 当该对象加载后将触发该事件。调用 {@link mx.weblets.WebletManagerClass.load} 方法时会触发该事件。
     */
    me.onload = null;

    /**
     * 当该对象启动后将触发该事件。调用 {@link mx.weblets.WebletManagerClass.start} 方法时会触发该事件。
     */
    me.onstart = null;

    base.init = me.init;
    me.init = function()
    {
        me.context = new mx.weblets.WebletContext(
        {
            id : me.id,
            name : me.name
        });
        base.init();
    };

    /**
     * 返回该对象的上下文信息。
     */
    me.getContext = function()
    {
        return me.context;
    };

    
    __$indication = null;
    /**
     * 在指定的容器中显示一个提示。
     * 
     * @param p_type  一个字符串，表示提示的类型。 主要包含 “info”、“warn”、“error”、“busy”、“user”。
     * @param p_message 指定提示的信息。
     * @param [p_options] 目前暂未使用。
     */
    me.indicate = function(p_type, p_message, p_options)
    {
        mx.indicate(p_type, p_message, p_options);
    };
    
    var __errorBox = null;
    /**
     * 在页面中以统一方式显示错误信息。
     * 
     * @param p_error 一个字符串，表示错误信息；或一个 Error 对象。
     */
    me.showerror = function(p_error)
    {
        mx.showerror(p_error);
    };
    
    /**
     * 返回一个 Weblet 对应的地址。
     * 
     * @param p_url
     *            一个字符串，表示特定的地址。 
     *            <p>
     *            该参数的形式包括:
     *            <ul>
     *            <li><b>~/</b> - 以“~/”开头表示获取当前模块的 face 目录地址。</li>
     *            <li><b>~/../</b> - 在模块项目中使用本框架时，如果引用其他模块项目的资源必须以该格式或者完整路径。
     *            <li><b>./</b> - 以“./”开头表示获取当前 Weblet 的根目录地址。</li>
     *            <li><b>$/</b> - 以“$/”开头表示获取当前 Weblet 的 resources 目录地址。</li>
     *            <li><b>$locale/</b> - 以“$locale/”开头表示获取当前 Weblet 的 resources/locales 目录地址。</li>
     *            <li><b>$theme/</b> - 以“$theme/”开头表示获取当前 Weblet 的 resources/themes 目录地址。</li>
     *            <li><b>其余</b> - 其余请参见 {@link MX.mappath} 方法。</li>
     *            </ul>
     *            </p>
     */
    me.mappath = function(p_url)
    {
        if (typeof (p_url) != "string") return null;

        var rootPath = mx.rootPath; 
        if(rootPath.lastIndexOf("/") != rootPath.length - 1)
        {
        	rootPath += "/";
        }
        
    	var bundlePath = rootPath;
		bundlePath += me.bundleName ? (me.bundleName + "/") : "";
		
        var id = me.id;
        if (id.indexOf("$") != -1)
        {
            id = id.replace(/\$/g, "/");
        }
        
        if (p_url.indexOf("~/../") == 0)
        {
            return rootPath + p_url.substr(5);
        }
        else if (p_url.indexOf("~/") == 0)
        {
            return bundlePath + p_url.substr(2);
        }
        else if (p_url.indexOf("./") == 0)
        {
            return bundlePath + id + p_url.substr(1);
        }
        else if (p_url.indexOf("$/") == 0)
        {
            return bundlePath + id + "/resources" + p_url.substr(1);
        }
        else if (p_url.indexOf("$locale/") == 0)
        {
            return bundlePath + id + "/resources/locales/"
                    + mx.locale + p_url.substr(7);
        }
        else if (p_url.indexOf("$theme/") == 0)
        {
            return bundlePath + id + "/resources/themes/" + mx.theme
                    + p_url.substr(6);
        }
        else
        {
            return mx.mappath(p_url);
        }
    };

    /**
     * 请参见 {@link MX.include} 方法。
     */
    me.include = function(p_path, p_callback)
    {
        var path = me.mappath(p_path);
        mx.include(path, p_callback);
    };

    /**
     * 在控制台打印 Weblet 的普通日志。日志以 Weblet 的唯一标识加方括号开头（如“[dbm] loaded.”）。
     * 
     * @param p_message
     *            一个字符串，表示需要打印的信息。
     */
    me.log = function(p_message)
    {
        if (typeof (console) != "undefined")
        {
            console.log("[" + me.id + "] " + p_message);
        }
    };

    /**
     * 在控制台打印 Weblet 的警告日志。日志以 Weblet 的唯一标识加方括号开头。
     * 
     * @param p_message
     *            一个字符串，表示需要打印的信息。
     */
    me.warn = function(p_message)
    {
        if (typeof (console) != "undefined")
        {
            console.warn("[" + me.id + "] " + p_message);
        }
    };

    /**
     * 在控制台打印 Weblet 的错误日志。日志以 Weblet 的唯一标识加方括号开头。
     * 
     * @param p_message
     *            一个字符串，表示需要打印的信息。
     */
    me.error = function(p_message)
    {
        if (typeof (console) != "undefined")
        {
            console.error("[" + me.id + "] " + p_message);
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
    	if (me.messages != undefined)
    		return $format(me.messages[p_key], p_args);
    	else
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
    
    //added by tiger on 2014/4/23 18:34:04
    me.dispose = function(){
    	me.context.dispose();
    	me.requires.clear();
    }

    me.endOfClass(arguments); 
    return me;
};
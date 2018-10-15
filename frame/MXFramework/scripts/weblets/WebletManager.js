$ns("mx.weblets");

$import("mx.weblets.Weblet");
$import("mx.weblets.WebletLoader");

/**
 * 提供 {@link mx.weblets.Weblet} 管理的类。该类在运行时唯一的静态实例是 <b>mx.weblets.WebletManager</b>
 * 对象。
 */
mx.weblets.WebletManagerClass = function()
{
    var me = this;

    /**
     * 获取一个集合，包含所有注册的 {@link mx.weblets.Weblet} 类型。
     * 
     * @item link mx.weblets.Weblet
     * @index {@link mx.weblets.Weblet} 的唯一标识（{@link MXComponent.id}）或
     *        {@link mx.weblets.Weblet} 在集合中的序号（从 0 开始计数）。
     */
    me.weblets = [];

    /**
     * 获取一个集合，包含了所有 {@link mx.weblets.Weblet} 对应的 bundle 名称。
     */
    me.bundles = [];
    
    /**
     * 加载 {@link mx.weblets.Weblet}。如果指定的 {@link mx.weblets.Weblet} 没有被加载过，
     * 则当它加载完成后会触发 {@link mx.weblets.Weblet.onload} 事件。
     * 
     * @param p_webletID 一个字符串，表示 {@link mx.weblets.Weblet} 的唯一标识；或者一个 JSON 对象（如：{ webeltID:"dbm", bundleName:"mx" }）。
     * @param [p_callback=null] 回调函数。当加载完成后会执行该方法。
     * 
     * @example
     * 下面的示例说明了如何使用 WebletManager 的 load 方法。
     * <code language="JavaScript">
     * mx.weblets.WebletManager.load("dbm", function(p_weblet)
     * {
     *     if (me.weblet == p_weblet)
     *     {
     *         return;
     *     }
     *
     *     me.weblet = p_weblet;
     *     if (me.weblet != null)
     *     {
     *         me.webletID = me.weblet.id;
     *         if (p_args == null)
     *         {
     *             p_args = {};
     *         }
     *         p_args.rootViewPort = me;
     *         me.context = me.weblet.context;
     *         mx.weblets.WebletManager.start(me.weblet, p_args);
     *     }
     * });
     * </code>
     */
    me.load = function(p_webletID, p_callback, p_params)
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
        
        if (mx.weblets.WebletManager.weblets[webletID] != null)
        {
            // 如果此前已加载。
            if ($isFunction(p_callback))
            {
                p_callback(mx.weblets.WebletManager.weblets[webletID]);
            }
        }
        else
        {
            mx.weblets.WebletLoader.load(p_webletID, p_callback, p_params);
        }
    };

    /**
     * 注册 {@link mx.weblets.Weblet}。
     *  
     * @param p_options 一个 JSON 对象，包含 {@link mx.weblets.Weblet} 的唯一标识、名称、事件等信息。
     * @exception 当参数“p_options”中不包含“id”属性时，会抛异常。
     * 
     * @example
     * 下面的示例说明了如何使用 WebletManager 的 register 方法。
     * <code language="JavaScript">
     * mx.weblets.WebletManager.register({
     *     id: "dbm",
     *     name: "Dynamic Bind Model",
     *     requires: [ "dbm2", "dbm3" ],
     *     onload: function(e)
     *     {
     *         dbm.log("Loaded.");
     *     },
     *     onstart: function(e)
     *     {
     *         dbm.log("started.");
     *     }
     * });
     * </code>
     */
    me.register = function(p_options)
    {
        if (p_options == null || $isEmpty(p_options.id))
        {
            throw new Error(mx.err("WEBLET_ID_UNDEFINED"));
        }

        if (me.weblets[p_options.id] != null)
        {
            mx.error("Weblet '" + p_options.id + "' has already been loaded or loading.");
            return;
        }

        var weblet = new mx.weblets.Weblet(p_options);
        me.weblets.add(weblet);
        me.weblets[weblet.id] = weblet;
        // 创建一个全局对象作为命名空间。
        $global[weblet.id] = weblet;
        
        return weblet;
    };

    /**
     * 启动 {@link mx.weblets.Weblet}。如果指定的 {@link mx.weblets.Weblet} 已注册过，
     * 则当它自动完成后会触发 {@link mx.weblets.Weblet.onstart} 事件。
     * 
     * @param p_weblet 一个字符串或 {@link mx.weblets.Weblet} 实例。
     * 如果为字符串，表示 {@link mx.weblets.Weblet} 的唯一标识；否则为一个 {@link mx.weblets.Weblet} 实例。
     * @param [p_args=null] 一个 JSON 对象，是 {@link mx.weblets.Weblet} 的
     *            {@link mx.weblets.Weblet.onstart} 事件的参数。该参数默认包含 {@link mx.weblets.WebletContext.rootViewPort} 属性和 {@link mx.weblets.WebletContext} 对象。
     * @exception 当指定的“p_weblet”没有注册时会抛异常。
     */
    me.start = function(p_weblet, p_args)
    {
        var weblet = null;
        if (p_weblet != null)
        {
            if ($isString(p_weblet))
            {
                var webletID = p_weblet;
                weblet = me.weblets[webletID];
            }
            else if ($instanceOf(p_weblet, mx.weblets.Weblet))
            {
                weblet = p_weblet;
            }
        }

        if ($instanceOf(weblet, mx.weblets.Weblet))
        {
            if (weblet.hasStarted)
            {
                mx.error("Weblet '" + weblet.id + "' has already been started.");
                return;
            }
            
            if (p_args == null)
            {
                p_args = {};
            }
            
            p_args.context = weblet.context;
            if (p_args.rootViewPort != null)
            {
                weblet.context.rootViewPort = p_args.rootViewPort;
            }
            weblet.trigger("start", p_args);
        }
        else
        {
            throw new Error(mx.err("WEBLET_UNDEFINED", [p_weblet]));
        }
    };

    return me;
};

mx.weblets.WebletManager = new mx.weblets.WebletManagerClass();
$ns("mx.weblets");

$import("mx.views.ViewPort");
$import("mx.weblets.WebletManager");

/**
 * 提供一个 Weblet 的容器。继承自 {@link mx.views.ViewPort}。
 * 
 * @example
 * 下面是示例说明了 webletContainer 如何创建以及在初始化时自动调用 load 方法。
 * <code language="JavaScript">
 * // webletContainer 在实例化后自动初始化，在初始化过程中自动调用 load 方法。如果没有自动初始化则手动调用 init 方法，然后在初始化过程中依然自动调用 load 方法。
 * var webletContainer = new mx.weblets.WebletContainer({ $e: $("#viewPort"), webletID: "dbm" });
 * </code>
 */
mx.weblets.WebletContainer = function()
{
    var me = $extend(mx.views.ViewPort);
    var base = {};

    /**
     * 获取 {@link mx.weblets.Weblet} 的唯一标识。
     */
    me.webletID = null;

    /**
     * 获取或设置模块名称。
     */
    me.bundleName = null;
    
    /**
     * 获取或设置 Weblet 所在的场景名。
     */
    me.scene = null;
    
    /**
     * 获取 {@link mx.weblets.Weblet} 对象。
     */
    me.weblet = null;
    
    me.onwebletload = null;

    /**
     * 初始化方法。执行设置样式并初始化属性等操作。
     */
    base.init = me.init;
    me.init = function()
    {
        me.$e.addClass("webletContainer");
        me.$e.empty();
        
        base.init();
        if (me.webletID != null)
        {
            if (me.bundleName != null)
            {
                me.load({
                    webletID:me.webletID,
                    bundleName:me.bundleName
                });
            }
            else
            {
                me.load(me.webletID);
            }
        }
        
        if (window.attachEvent)
        {
        	window.attachEvent("onbeforeunload", me.dispose);
        }
    };

    /**
     * <b>该方法会在初始化时自动调用。</b>
     * 该方法在 {@link mx.weblets.Weblet} 加载完成后会调用 {@link mx.weblets.WebletManagerClass.start} 方法。
     * 详见 {@link mx.weblets.WebletManagerClass.load} 方法。
     * 
     * @param p_webletID
     *            一个字符串，表示 {@link mx.weblets.Weblet} 的唯一标识；或者一个 JSON 对象（如：{ webeltID:"dbm", bundleName:"mx" }）。
     * @param p_args
     *            一个 JSON 对象，是 {@link mx.weblets.Weblet} 的
     *            {@link mx.weblets.Weblet.onstart} 事件的参数。该参数默认包含 {@link mx.weblets.WebletContext.rootViewPort} 属性和 {@link mx.weblets.WebletContext} 对象。
     */
    me.load = function(p_webletID, p_args)
    {
    	var params = {scene: me.scene, bundleName: me.bundleName};
        mx.weblets.WebletManager.load(p_webletID, function(p_weblet)
        {
            if (me.weblet == p_weblet)
            {
                return;
            }

            me.weblet = p_weblet;
            if (me.weblet != null)
            {
                me.webletID = me.weblet.id;
                if (p_args == null)
                {
                    p_args = {};
                }
                p_args.rootViewPort = me;
                me.context = me.weblet.context;
                mx.weblets.WebletManager.start(me.weblet, p_args);
                
                me.trigger("webletload", {weblet: me.weblet});
            }
        }, params);
    };

	/**
	 * iframe 窗体销毁时，要将webletContainer进行销毁
	 */
	base.dispose = me.dispose; 
	me.dispose = function(){
		if(!window.windowWillClose) return;
		
		if (window.detachEvent)
		{
			window.detachEvent("onbeforeunload", arguments.callee);
		}

		var weblet = mx.weblets.WebletManager.weblets[me.webletID];
		if(weblet.dispose)
			weblet.dispose();
		delete weblet;
		weblet = null;
		$global[me.webletID] = null;
		
		me.off();	
		base.dispose();
	}

    me.endOfClass(arguments); 
    return me;
};
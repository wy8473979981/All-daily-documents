$ns("mx.views");

$import("mx.containers.HSplit");
$import("mx.containers.VSplit");
$import("mx.containers.PanelLayout");

/**
 * 提供一个管理一组控件、控件布局、数据、数据绑定的类。视图对应展现框架 MVC 模型中的 view。视图也是一个容器，它继承于
 * {@link mx.containers.Container}。
 */
mx.views.View = function()
{
    var me = $extend(mx.containers.Container);
    var base = {};
    
    /**
     * 获取视图的视图容器，参见 {@link mx.views.ViewPort}。
     */
    me.viewPort = null;
    
    /**
     * 获取视图控制器的实体引用，参见 {@link mx.views.ViewController}。
     */
    me.controller = null;
    
    /**
     * 获取或设置一个字符串，表示布局器的类型。
     * <p>
     * 该类型可选的值包括：
     * <ul>
     *      <li><b>mx.containers.HSplit</b></li>
     *      <li><b>mx.containers.VSplit</b></li>
     *      <li><b>mx.containers.PanelLayout</b></li>
     * </ul>
     * </p>
     */
    me.layoutType = null;
    
    /**
     * 获取或设置一个 JSON 对象，表示布局器对象 {@link layoutControl} 的初始化参数。
     */
    me.layoutOptions = null;
    
    /**
     * 获取一个对象，表示布局器控件，控件的类型通过 {@link layoutType} 进行设置。
     */
    me.layoutControl = null;
    
    /**
     * 当视图进入激活状态时触发该事件。在{@link mx.views.ViewPort.setView} 方法中触发。
     */
    me.onactivate = null;
    
    /**
     * 当视图进入非激活状态时触发该事件。在{@link mx.views.ViewPort.setView} 方法中触发。
     */
    me.ondeactivate = null;

    /**
     * 初始化方法。执行设置样式并初始化属性等操作。
     */
    base.init = me.init;
    me.init = function()
    {
        base.init();
        me.$e.addClass("view");
        
        if (me.layoutType != null)
        {
            try
            {
                layoutType = eval('('+me.layoutType+')');
            }
            catch (e)
            {                
            }
            me.layoutControl = new layoutType(me.layoutOptions);
            base.addControl(me.layoutControl);
        }
    };

    base.addControl = me.addControl;
    /**
     * 将 {@link mx.controls.Control} 对象添加到集合 {@link controls} 中。
     * @overload function  function(p_control, p_param, p_islinebreak)
     * @param p_control
     *            一个 {@link mx.controls.Control} 对象。
     * @param p_param
     *            一个 JSON 对象，表示视图中所使用的布局控件的参数。            
     * @param p_islinebreak
     * 			  一个布尔值，表示添加新控件时是否先换行。
     */
    me.addControl = function(p_control, p_param, p_islinebreak)
    {
        if (me.layoutControl != null)
        {
            me.layoutControl.addControl(p_control, p_param, p_islinebreak);
        }
        else
        {
            base.addControl(p_control, p_islinebreak);
        }
    };
    
    base.dispose = me.dispose;
	/**
	* 释放对象运行时动态生成的内容（属性、方法、事件）。
	*/
    me.dispose = function()
    {
    	//added by tiger on 2014/4/24 18:12:58
    	me.off();
    	me.layoutControl = null;
    	me.viewPort = null;
    	
    	if (me.controller && me.controller.view)
    	{
    		me.controller.view = null;
    	}
    	
		me.controller = null;   	
    	//end add
    	
        base.dispose();
    };
    
    /**
     * 提供一个方法，设置当对象的内容超过其指定高度及宽度时管理内容方式。
     * 
     * @overload function(p_value)
     * 
     * @param p_overflowType
     *            一个字符串，对应 CSS 的属性，可选择包括：
     * <ul>
     *     <li><b>overflow</b></li>
     *     <li><b>overflow-x</b></li>
     *     <li><b>overflow-y</b></li>
     * </ul>
     * @param p_value
     *            一个字符串，表示 p_overflowType 属性的值，可选择包括：
     * <ul>
     *     <li><b>visible</b></li>
     *     <li><b>auto</b></li>
     *     <li><b>hidden</b></li>
     *     <li><b>scroll</b></li>
     * </ul>
     */
    me.setOverflow = function(p_overflowType, p_value)
    {
    	if(p_value == null)
    	{
    		p_value == p_overflowType || "auto";
    		p_overflowType = "overflow";
    	}
    	if(p_overflowType == "overflow" || p_overflowType == "overflow-x" || p_overflowType == "overflow-y")
    	{
    		me.$e.css(p_overflowType,p_value);
    	}
    }
    
    me.endOfClass(arguments); 
    return me;
};
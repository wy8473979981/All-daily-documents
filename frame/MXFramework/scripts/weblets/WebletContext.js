$ns("mx.weblets");

/**
 * 描述 {@link mx.weblets.Weblet} 的上下文信息，包括唯一标识（id）、名称以及自定义描述信息。 通常
 * {@link mx.weblets.Weblet} 本身可以通过 {@link mx.weblets.Weblet.context}
 * 属性获得。如果是继承自 {@link mx.controls.Control} 的类的实例可以通过
 * {@link mx.controls.Control.getContext} 方法获得。
 */
mx.weblets.WebletContext = function()
{
    var me = $extend(MXObject);
    var base = {};

    /**
     * 获取 {@link mx.weblets.Weblet} 的唯一标识。
     */
    me.id = null;
    
    /**
     * 获取 {@link mx.weblets.Weblet} 的名称。
     */
    me.name = null;
    
    /**
     * 获取 {@link mx.weblets.Weblet} 的根 {@link mx.views.ViewPort} 对象。
     */
    me.rootViewPort = null;

    /**
     * 获取 {@link mx.windows.WindowManager} 的实例。
     */
    me.windowManager = null;

    base._ = me._;
    me._ = function(p_options)
    {
        if (me.canConstruct())
        {
            base._(p_options);
            if (me.windowManager == null)
            {
                me.windowManager = new mx.windows.WindowManager(
                {
                    context : me
                });
            }
        }
    };
    
    //added by tiger on 2014/4/23 18:27:28
    base.dispose = me.dispose;
    me.dispose = function(){
    	me.windowManager.context = null;
    	me.windowManager = null;
    	me.rootViewPort = null;
    	base.dispose();
    }

    me.endOfClass(arguments); 
    return me;
};
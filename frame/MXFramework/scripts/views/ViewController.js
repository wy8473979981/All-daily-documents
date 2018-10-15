$ns("mx.views");

$import("mx.types.HashMap");

/**
 * 提供一个视图控制器的类。
 */
mx.views.ViewController = function()
{
    var me = $extend(MXComponent);
    var base = {};
    
    /**
     * 一个{@link mx.types.HashMap} 的实例 HashMap，存放指定关联视图控制器的唯一实例。
     */
    var _singletonMap = null;

    /**
     * 获取视图控制器对应的视图，也可使用 {@link getView} 方法获取。
     */
    me.view = null;
    
    /**
     * @ignore
     */
    base._ = me._;    
    me._ = function(p_options)
    {
    	if (arguments.length > 0 && !$.isPlainObject(arguments[0]))
    	{
    		_singletonMap = arguments[0];
    	}
    	
    	if (_singletonMap == null)
    	{
    		_singletonMap = new mx.types.HashMap();
    	}
    	
    	if ($notEmpty(me.typeName))
    	{
    		_singletonMap.setItem(me.typeName, me);
    	}
    	
    	base._(p_options);
    };

    
    /**
     * 获取关联的视图控制器的一个单例。
     * @param p_typeName 关联的视图控制器的类型名称，需要在继承的子类中强制指定。
     */
    me.getLinkViewController = function(p_typeName)
    {
    	if (!$isString(p_typeName))
    	{
    		return null;
    	}
    	
    	if (_singletonMap != null && _singletonMap.hasItem(p_typeName))
    	{
			return _singletonMap.getItem(p_typeName);	
    	}
    	
    	var clazz = null;
    	try
    	{
    		clazz = eval("(" + p_typeName + ")");
    	}
    	catch(e)
    	{   		
    	}
    	
    	if ($.isFunction(clazz))
    	{
    		return new clazz(_singletonMap);
    	}
    	
    	return null;
    }
    
    /**
     * 获取视图控制器的视图。若视图为空则即创建视图。
     */
    me.getView = function()
    {
        if (me.view == null)
        {
            /*
             * TODO: 在 ViewController 的派生类中添加实例化和初始化 view 的逻辑。 本方法通常从 ViewPort
             * 中调用。
             * 
             * 示例1: // 新建一个视图。 me.view = new abc.views.XyzView();
             * 
             * 示例2: // 来自于一个已有视图，可实现一个 View 对应多个 ViewController 的效果。 me.view =
             * anotherView;
             */
        }
        if (me.view != null)
        {
            me.view.controller = me;
        }
        return me.view;
    };

    /**
     * 详见 {@link mx.controls.Control.getContext} 方法。
     */
    me.getContext = function()
    {
        if (me.getView() != null)
        {
            return me.view.getContext();
        }
        return null;
    };

    base.dispose = me.dispose;
     /**
     * 释放对象运行时动态生成的内容（属性、方法、事件）。
     */
    me.dispose = function()
    {
		if(_singletonMap){
			_singletonMap.clear();
			delete _singletonMap;
		}        
        me.view = null;
		base.dispose();
		base=null;
    };

    me.endOfClass(arguments); 
    return me;
};
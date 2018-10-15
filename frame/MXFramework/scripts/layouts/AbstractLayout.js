$ns("mx.layouts");

/**
 * 所有布局控件的抽象基类。
 * @abstract
 */
mx.layouts.AbstractLayout = function()
{
	var me = $extend(MXComponent);
	var base = {};
	
	/**
	 * 设置和获取布局控件的类型。
	 */
	me.typeName = null;
	
	/**
	 * 设置和获取一个容器实例，表示布局控件所作用的容器。
	 */
	me.owner = null;
	
	base.init = me.init;
	me.init = function()
	{
		base.init();
		me._init();
	};
	
	/**
     * @ignore
     */
	me._init = function()
	{
		// 初始化保护方法	
	};
	
	me.endOfClass(arguments);
	return me;
};

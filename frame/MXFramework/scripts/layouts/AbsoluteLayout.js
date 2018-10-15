$ns("mx.layouts");

/**
 * 绝对定位布局控件。
 * 
 * 使用示例请参考 {@link mx.layouts.LayoutFactoryClass.createLayout}。
 */

mx.layouts.AbsoluteLayout = function()
{
	var me = $extend(mx.layouts.AbstractLayout);
	var base = {};

	me.typeName = "AbsoluteLayout";

    /**
     * @ignore
     */
	me._init =  function()
	{
		_calculateChildren();
		me.owner.on("ctrladded", _container_ctrladded);
	};


	function _calculateChildren()
	{
		var children = me.owner.controls;
		if ($isArray(children))
		{
			$.each(children, function(index, child)
			{
				_caculateChild(child);
			});
		}
	}

	function _caculateChild(p_child)
	{
		var options = p_child.layoutConfigs || {left: 0, top: 0},
			left = options.left || 0,
			top = options.top || 0;

		p_child.$e.css({"position": "absolute", "top": top, "left": left});
	}

	function _container_ctrladded(e)
	{
		var control = e.ctrl;
		_caculateChild(control);
	}

	return me.endOfClass(arguments);
};
$ns("mx.controls");

/**
 * 提供一个进度条控件的类。
 * 
 * @example
 * 该示例将说明如何创建一个进度条控件。
 * <code language="JavaScript">
 * //创建一个宽度为 300px，最小值默认为 0，最大值默认为 100 的进度条。
 * var progressBar = new mx.controls.ProgressBar({width:300});
 * //设置当前进度条的值
 * progressBar.setValue(50);
 * 
 * //创建一个宽度为 200px，最小值为 10，最大值为 200 的进度条。
 * var progressBar = new mx.controls.ProgressBar({width:200, min:10, max:200});
 * </code>
 */
mx.controls.ProgressBar = function() 
{
	var me = $extend(mx.controls.Control);
	var base = {};

	/**
	 * @default 200
	 */
	me.width = 200;
	
	/**
	 * @default 12
	 */
	me.height = 12;

	/**
	 * 获取当前进度条的值。请使用 {@link setValue} 方法设置该字段的值。
	 * 
	 * @default 0
	 */
	me.value = 0;

	/**
	 * 获取当前进度条的百分比值。
	 */
	me.percentage = 0;

	/**
     * 获取或设置一个 Boolean 值，表示是否显示进度条百分比值。
     */
    me.displayPercentage = false;
	
	/**
	 * 获取或设置进度条的最小值。
	 * 
	 * @default 0
	 */
	me.min = 0;

	/**
	 * 获取或设置进度条的最大值。
	 * 
	 * @default 100
	 */
	me.max = 100;
	
	/**
	 * @ignore
	 */
	me.$valueBar = $("<div id='bar'></div>");

	/**
	 * @ignore
	 */
	me.$percentage = null;
	
	base.init = me.init;
	me.init = function() 
	{
		base.init();
		_init();
	};

	/**
	 * 设置进度条的值。
	 * 
	 * @param p_value 指定的值，参见 {@link value} 属性。
	 * @param [p_animating=true] 是否采用动画效果刷新。
	 */
	me.setValue = function(p_value, p_animating) 
	{
		me.value = _formatValue(p_value);
		_refresh(p_animating);
	};
	
	
	function _refresh(p_animating)
	{
		var percentage = ((me.value - me.min) / (me.max - me.min)) * 100;
		if (percentage > 100) 
		{
			percentage = 100;
		}
		if (percentage < 0) 
		{
			percentage = 0;
		}
		me.percentage = percentage;
		me.$valueBar.animate({
			width : percentage + "%"
		}, p_animating != false ? "normal" : 0);
		
		if (me.displayPercentage)
		{
		    me.$percentage.text(Math.round(percentage) + "%");
		}
	}
	
	
	/**
	 * 刷新进度条。
	 * 
	 * @param [p_animating=true] 是否采用动画效果刷新。
	 */
	me.refresh = function(p_animating) 
	{
		me.$valueBar.css({width: 0});
		_refresh(p_animating);
	};
	
	function _formatMaxMin()
	{
		var temp = null,
			min = parseInt(me.min),
			max = parseInt(me.max);
		me.min = isNaN(min) ? 0: min;
		me.max = isNaN(max) ? 0: max;
		if (me.min > me.max)
		{
			temp = me.min;
			me.min = me.max;
			me.max = temp;
		}
	}
	
	function _formatValue(p_value)
	{
		var value = parseInt(p_value);
		
		value = isNaN(value) ? 0: value;
		
		if (value < me.min)
		{
			value = me.min;
		}
		else if (value > me.max)
		{
			value = me.max;
		}	
		return value;
	}
	
	function _init()
	{
		me.$e.addClass("progressBar");
		
		_formatMaxMin();
		
		me.$e.append(me.$valueBar);
		if (me.displayPercentage)
		{
		    me.$percentage = $("<span id='percentage'/>");
		    me.$e.append(me.$percentage);
		}

		me.setValue(me.value, false);
	}
	
	 base.dispose = me.dispose;
    /**
	* 释放对象运行时动态生成的内容（属性、方法、事件）。
	*/
    me.dispose = function()
    {
    	if (me.$valueBar != null)
    	{
    		me.$valueBar.empty().remove();
    		me.$valueBar = null;
    		delete me.$valueBar;
    	}
    	
    	if (me.$percentage != null)
    	{
    		me.$percentage.empty().remove();
    		me.$percentage = null;
    		delete me.$percentage;
    	}
    	
    	base.dispose();
    }
	
	me.endOfClass(arguments); 
	return me;
};
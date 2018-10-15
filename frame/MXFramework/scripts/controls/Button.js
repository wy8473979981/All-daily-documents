$ns("mx.controls");

/**
 * 提供一个按钮控件的类。
 * 
 * @example 
 * 以下是一个创建 {@link mx.controls.Button} 的示例。 该示例将说明如何创建一个
 *          {@link mx.controls.Button}，以及如何订购事件。 
 * <code language="JavaScript">
 * var button = new mx.controls.Button({
 *     text: "按钮名称"
 * });
 * 
 * button.on("click", function()
 * {
 *     alert("点击事件");
 * });
 * </code>
 */
mx.controls.Button = function()
{
    var me = $extend(mx.controls.Control);
    var base = {};

    /**
     * 获取按钮控件的显示文本。请使用 {@link setText} 方法设置文本的值。
     */
    me.text = "";

    /**
     * 当点击按钮并且 {@link mx.controls.Control.enabled} 字段值为 true 时触发该事件。
     */
    me.onclick = null;

    var _$input = null;

    base.init = me.init;
    me.init = function()
    {
    	_$input = $("<input type='button'/>");
    	
        base.init();

        me.$e.addClass("buttonDiv");

        me.$e.append(_$input);

        me.setText(me.text);

        me.$e.on("click", _onclick);

        me._refreshState();
    };

    /**
     * 设置标签的显示文本。
     * 
     * @param p_text
     *            一个字符串文本，表示按钮的显示文本。
     */
    me.setText = function(p_text)
    {
        me.text = p_text;
        _$input.val(me.text);
    };
    
    
    base.setWidth = me.setWidth;
    /**
     * 设置button的宽度 
     * 
     * @param p_width 控件的宽度,可以是数字（如 500）、字符串（如“500px”或“50%”）.
     */
    me.setWidth = function(p_width)
    {
    	 base.setWidth(p_width);
    	 if ($isString(p_width) && p_width.endsWith("%"))
    	 {
    	 	_$input.css("width", "100%");
    	 }
    	 else if (typeof (p_width) != "undefined")
         {
    		 var borderWidth = parseInt(me.$e.css('borderTopWidth'));
    		 if (isNaN(borderWidth))
    		 {
    			 borderWidth = 0;
    		 }
             _$input.css("width", (parseInt(me.width) - borderWidth * 2) + "px");
         }
    };
    
    base.setHeight = me.setHeight;
    /**
     * 设置button的高度
     * 
     * @param p_height 控件的高度,可以是数字（如 500）、字符串（如“500px”或“50%”）.
     */
    me.setHeight = function(p_height)
    {
    	base.setHeight(p_height);
		 if ($isString(p_height) && p_height.endsWith("%"))
    	{
    		_$input.css("height", "100%");
    	}
		else if (typeof (p_height) != "undefined")
	    {
			 var borderWidth = parseInt(me.$e.css('borderTopWidth'));
			 if (isNaN(borderWidth))
    		 {
				 borderWidth = 0;
    		 }
             _$input.css("height", (parseInt(p_height) - borderWidth * 2) + "px");
	    }
    };
    
    base.setBorder = me.setBorder;
    /**
     * 设置控件的边框样式。
     * @param p_border
     *            一个字符串，表示css样式的 border 属性。
     */
    me.setBorder = function(p_border)
    {
    	base.setBorder(p_border);
    	me.setWidth(me.width);
    	me.setHeight(me.height);
    };

    /**
     * @ignore
     */
    me._refreshState = function()
    {
        if (_$input != null)
        {
            _$input.attr("disabled", !me.enabled);
        }
    };
    
    /**
     * 设置 {@link enabled} 字段的值。
     * 
     * @param p_enabled : 布尔值 true：控件可用反之不可用
     */
    me.setEnabled = function(p_enabled)
    {          
        if (typeof (p_enabled) != "undefined")
        {
            me.enabled = p_enabled;  
            me.$e.toggleClass("disabled", !p_enabled);
            me._refreshState();
        }
    };

    /**
     * @ignore
     */
    function _onclick(e)
    {
        if (me.enabled == false) return;
        me.trigger("click");
    }
    
    base.dispose = me.dispose;
    /**
	* 释放对象运行时动态生成的内容（属性、方法、事件）。
	*/
    me.dispose = function()
    {
    	_$input.empty().remove();
    	delete _$input;
    	base.dispose();
    }
    
    me.endOfClass(arguments); 
    return me;
};
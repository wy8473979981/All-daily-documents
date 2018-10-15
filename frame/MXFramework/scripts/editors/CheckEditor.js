$ns("mx.editors");

/**
 * 提供一个显示允许用户选择 true 或 false 条件的复选框的类。
 * 
 * @example
 * 以下是一个创建 {@link mx.editors.CheckEditor} 的示例。
 * <code language="JavaScript">
 * var checkEditor = new mx.editors.CheckEditor({ 
 *     value: 'T', // 设置默认为选中
 *     caption: "党员", // 标题
 *     
 *     onchanged: _checkEditor_changed        
 * });
 *
 * function _checkEditor_changed()
 * {
 *     alert(checkEditor.value); // 当选中时， value 值为 checkedValue 字段的值；当未选中时， value 值为 uncheckedValue 字段的值。
 * }
 * </code>
 * 
 * @example
 * 以下是如何使用 {@link mx.editors.CheckEditor} 的示例。
 * <code language="JavaScript">
 * checkEditor.setCaption("团员"); // 设置 caption 字段的值。
 * 
 * checkEditor.setValue("F", true); // 第一个参数为 checkedValue 或 uncheckedValue 字段的值；第二个参数为 true，表示要触发 onchanged 事件。详见 setValue 方法。
 * </code>
 */
mx.editors.CheckEditor = function() 
{
	var me = $extend(mx.editors.Editor);
	var base = {};
	
	/**
     * 获取一个值，表示与 {@link mx.editors.CheckEditor} 关联的文本标签。请使用 {@link setCaption} 方法设置该字段的值。
     */
	me.caption = null;
	
	/**
     * 获取或设置是否显示caption。
     * @defalut true
     */
	me.displayCaption = true;
	
	/**
     * 获取或设置 {@link mx.editors.CheckEditor} 选中的值。
     * @default T
     */
	me.checkedValue = "T";
	
	/**
     * 获取或设置 {@link mx.editors.CheckEditor} 未选中的值。
     * @default F
     */
	me.uncheckedValue = "F";
	
	/**
     * @ignore
     */
	me.$span = $("<span id='text'/>");
	
	
	base.init = me.init;
	me.init = function() 
	{
		base.init();
		_init();
	};
	
    /**
     * 设置 {@link caption} 字段的值。
     * 设置标题的值
     * @param p_caption 一个字符串
     */
    me.setCaption = function(p_caption)		
    {
        me.caption = p_caption;
        if (p_caption == null || !me.displayCaption)			
        {
            me.$span.remove();
        }
        else		
        {
            me.$span.text(me.caption);
            me.$e.append(me.$span);
        }		
    };
    
    
    base.setValue = me.setValue;
    /**
     * 请参考 {@link mx.editors.Editor.setValue} 方法。
     */
    me.setValue = function(p_value, p_triggerEvent)		
    {
        base.setValue(p_value, p_triggerEvent);
        var checked = $isEqual(me.value, me.checkedValue);
        me.$e.toggleClass("checked", checked);
    };
    
    /**
     * 获取编辑器选中状态。
     * 返回一个布尔值，true 表示选中，false 表示未选中
     */
    me.isChecked = function()
    {
    	return me.getValue() == me.checkedValue;
    }

    /**
     * @ignore
     */
    me._parseValue = function(p_value)		
    {					  
        if (me.checkedValue != null && me.uncheckedValue != null && p_value == null) 
        {
            return null;
        }
        else 
        {
            return me.checkedValue == p_value ? me.checkedValue : me.uncheckedValue;
        }
    };

    /**
     * @ignore
     */
    me._checkEditor_click = function()				
    {
        if (me.isReadOnly() || !me.enabled) return;
        var value = $isEqual(me.value, me.checkedValue) ? me.uncheckedValue: me.checkedValue;
        me.setValue(value, true);
    };
    
    /**
     * @ignore
     */
    me._toggleTip = function(){
    	if(me.readOnly || !me.enabled){
    		if($notEmpty(me.value)){
        		me.$e.attr("title",me.caption);
        	}
    	}else{
    		me.$e.removeAttr("title");
    	}
    }
    
    
    me.reset = function(p_triggerEvent)
    {
        me.setValue(null, p_triggerEvent);
    };
    
	function _init()
	{
	    me.$e.addClass("checkEditor");
	    me.$e.append("<span id=img/>");
	    me.$e.append(me.$span);
	    me.$e.userSelectable(false);
	    me.$e.children("span").click(me._checkEditor_click);

	    me.setCaption(me.caption);
	    me._initDefaultValue();
	    me.setReadOnly(me.readOnly);
	}
	
	me.endOfClass(arguments); 
    return me;
};
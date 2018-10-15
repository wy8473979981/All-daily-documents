$ns("mx.editors");

$import("mx.utils.SymbolUtil");

/**
 * 提供一个用户自定义按钮方法的文本编辑器。
 * 
 * @example 
 * 以下是一个通过 {@link mx.editors.CustomEditor} 创建一个自定义按钮方法的文本编辑器的示例，同时为按钮绑定事件。
 * <code language="JavaScript">
 * 创建一个不可编辑的 {@link mx.editors.CustomEditor}。
 * var customEditor = mx.editors.CustomEditor({
 *            width:250,
 *            enabled:false,
 *            onclick: customEditor_click
 *        });
 *
 * 创建一个可编辑的 {@link mx.editors.CustomEditor}。
 * var customEditor = mx.editors.CustomEditor({
 *            width:250,
 *            onclick: customEditor_click
 *        });
 * function customEditor_click()
 * {
 *     alert("我被点击");
 * }
 * </code>
 * 
 */
mx.editors.CustomEditor = function()
{
	var me = $extend(mx.editors.Editor);
	var base = {};

	/**
	 * 获取控件宽度，请参见 {@link mx.controls.Control.width} 字段。
	 * 
     * @default 200
     */
    me.width = 200;
    
    /**
     * 获取按钮标题，当 {@link useSymbol} 字段值为 true 时，标题会被转换成为相应的字符图标。请参见 {@link mx.utils.SymbolUtilClass}。
     *
     * @default dialog
     */
    me.buttonCaption = "dialog";
    
    /**
     * 当点击按钮并且 {@link mx.editors.Editor.isReadOnly} 方法返回 false 时触发该事件。
     */
    me.onclick = null;
    
    /**
     * 获取或设置一个 Boolean 值，表示显示字符图标还是普通文本。请参见 {@link mx.utils.SymbolUtilClass}。
     * 
     * @default true
     */
    me.useSymbol = true;
    
    /**
     * 设置是否禁用输入框,此属性为false时只会禁用输入框，而对按钮没有影响。
     * 不支持在子类{@link mx.editors.FileEditor} 中使用
     * 它对input的作用，优先级要高于enabled属性。
     * 
     * @default true
     */
    me.enabledInput = true;
    
    /**
     * 设置或获取一个 Boolean 值，表示是否显示按钮。
     * 
     * @default true
     */
    me.displayButton = true;
    
    /**
     * @ignore
     */
    me.$inputContainer = $("<div id=inputContainer/>");
    
    /**
     * @ignore
     */
    me.$input = $("<input id='customInput' type='text'>");

    /**
     * @ignore
     */
    me.$button = $("<input id='customBtn' type='button'/>");
    
    /**
     * {@exclude mx.editors.FileEditor}
     * 
     * 提供提交值和显示值之间的转换功能，该方法需要覆写实现,不支持在子类 {@ mx.editors.FileEditor} 中使用。
     * 返回值是需要显示的文本。
     * @param p_value 需要提交的值。
     */
    me.valueFormatter = null;
    
	base.init = me.init;
	me.init = function()
	{
		base.init();

        me.$e.addClass("customEditor");

        me.$inputContainer.append(me.$input);
        me.$e.append(me.$inputContainer);
        if(me.displayButton)
        {
        	var $buttonContainer = $("<div id=customButton></div>");
        	$buttonContainer.append(me.$button);
        	me.$e.append($buttonContainer);
        	
        	var text = me.buttonCaption;
        
	    	if (me.useSymbol)
	    	{
	    		var symbol = mx.utils.SymbolUtil.getSymbol(text);
	    		if (symbol != null)
	    		{
	    			me.$button.addClass("symbolFont");
	    			text = symbol.text;
	    		}
	    	}
	    	else
	    	{
	    		text = "···";
	    	}
	        
	        me.$button.val(text);
	
	        me.$button.on("click", _onclick);
        }
        else
        {
        	me.$inputContainer.css({"right": "0", "margin-right": "0"});
        }
        
        var v_text = me.text;
        me._initDefaultValue();
        if(v_text != null)
        	me.setText(v_text);
        
        if (me.enabledInput)
        {
        	 me.$input.on("dblclick", _onclick);
        }
        else
        {
        	me.$input.on("click", _onclick);
        }
       
        me.$input.on("blur", _onblur);
        
        me._refreshState();
	};
	
	/**
	 * 提供一个方法，用其他的元素取代文本框。
	 * 
	 * @param p_input 一个DOM对象或数组，用于取代原有的文本框。
	 */
	me.resetInput = function(p_input)
	{
	    me.$inputContainer.empty();
	    if($isArray(p_input))
	    {
	        for(var i = 0; i < p_input.length; i++)
	        {
	            me.$inputContainer.append(p_input[i]);
	        }
	    }
	    else
	    {
	        me.$inputContainer.append(p_input);
	    }
	};
	
	/**
	 * {@exclude mx.editors.FileEditor}
	 * 设置输入框是否可用。不支持在子类{@link mx.editors.FileEditor} 中使用
	 * @param p_enabled 布尔值,true代表输入框可编辑，false代表输入框不可编辑。
	 */
	me.setEnabledInput = function(p_enabled)
	{
	    if(p_enabled){
	    	p_enabled = true;
	    }else{
	    	p_enabled = false;
	    }
		me.enabledInput = p_enabled;
		me._refreshState();
	}
	
	/**
	 * @override
	 * 设置自定义编辑器的显示值，
	 * 
	 * @param p_text，表示自定义编辑器的显示值。
	 */
	base.setText = me.text;
	me.setText = function(p_text)
	{
		me.text = p_text;
		me.$input.val(p_text);
	}
	
	base._formatValue = me._formatValue;
	/**
	 * @ignore
	 * 设置输入框是否可用
	 * 
	 * @param enabled 布尔值,true代表输入框可编辑，false代表输入框不可编辑
	 */
	me._formatValue = function(p_value)
	{
		var text = "";
        if ($isFunction(me.valueFormatter))
        {
        	text = me.valueFormatter(p_value);
        }
        else
        {
            text = base._formatValue(p_value);
        }
        
		return text;
	}
	
	/**
     * @ignore
     */
    me._refreshState = function()
    {      
        if (me.$button != null)
        {
            me.$input.attr("disabled",!me.enabled);	
            me.$input.attr("readonly", me.isReadOnly());
            me.$input.attr("readonly", !me.enabledInput);
            me.$button.attr("disabled", !me.enabled);
        }
    };
    
    /**
     * @ignore
     */
	function _onclick(e)
    {
        if(me.isReadOnly() || !me.enabled) return;
        me.trigger("click");
    }
	
	function _onblur()
    {
        me.setValue(me.$input.val(), true);
    }
    
	me.endOfClass(arguments); 
    return me;
};
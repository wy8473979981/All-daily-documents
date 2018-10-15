$ns("mx.editors");

$import("mx.controls.Label");

/**
 * 提供一个显示文字的标签编辑器（通常该编辑器只是用于显示，不提供编辑功能）。
 * @example
 * 以下是一个创建 {@link mx.editors.LabelEditor} 的示例。
 * <code language="JavaScript">
 * var labelEditor = new mx.editors.LabelEditor({ 
 *     value: "我是标签", 
 *     onchanged: _labelEditor_changed        
 * });
 *
 * function _labelEditor_changed(e)
 * {
 *     alert(e.target.value); 
 * }
 * </code>
 */
mx.editors.LabelEditor = function()
{
    var me = $extend(mx.editors.Editor);
    
    var base = {};
    
    var _label = null;
    
    me.value = "";
    
    me.height = null;
    
    /**
	 * 获取标签编辑器的文本的左右对齐方式。如“left”，表示靠右对齐。请使用 {@link setTextAlign} 方法设置该字段的值。
	 * <p>
     * 该字段的可选值包括:
     * <ul>
     * <li>left</li>
     * <li>right</li>
     * <li>center</li>
     * <li>justify</li>
     * </ul>
     * </p>
     * 
     * @default left
     */
	me.textAlign = "left";
	
	/**
     * 获取标签编辑器的文本的上下对齐方式。如“middle”，表示居中对齐。请使用 {@link setVAlign} 方法设置该字段的值。
     * <p>
     * 该字段的可选值包括:
     * <ul>
     * <li>top</li>
     * <li>middle</li>
     * <li>bottom</li>
     * </ul>
     * </p>
     * 
     * @default middle
     */
	me.vAlign = "middle";
	
	/**
	 * 获取一个 Boolean 值，表示标签编辑器文本是否自动换行。
	 * 
     * @default false
	 */
	me.autoWrap = false;
	
	/**
	 * 获取一个 Boolean 值，表示标签编辑器和旁边的控件是否呈递在同一行内。请使用 {@link setDisplayInline} 方法设置该字段的值。
	 * 
     * @default false
	 */
	me.displayInline = false;
	
	/**
	 * 获取一个 Boolean 值，表示光标移动到标签编辑器上时是否显示提示信息。请使用 {@link setShowTitle} 方法设置该字段的值。
	 * 
     * @default false
	 */
	me.showTitle = false;
	
	
	/**
	 * 获取一个字符串，表示 {@link mx.editors.LabelEditor} 边框样式。请通过 {@link setBorder} 方法设置该字段的值。
	 * 
	 * @default "1px solid #CCD0D5"
	 */
	me.border = "1px solid #CCD0D5";
	
    base.init = me.init;
    me.init = function()
    {
        base.init();
        me.$e.addClass("labelEditor");
        if (_label == null)
        {        	
        	var h = me.height;
        	//added by tiger on 2014/9/23 10:11:27, 设置IE7下的默认值
        	if($.isIE67() && !h){
        		h = 'auto';
        	}
        	//end add
        	
            _label = new mx.controls.Label({
                width:"100%",
                //height:"100%",
                height: h,
                autoWrap: me.autoWrap,
                textAlign: me.textAlign,
                verticalAlign: me.vAlign
            });
            me.$e.append(_label.$e);
        }
        if (me.border)
        {
        	me.setBorder(me.border);
        }
        me._initDefaultValue();
    	me.setAutoWrap(me.autoWrap);
    	me.setDisplayInline(me.displayInline);
    	me.setShowTitle(me.showTitle);
    };
    
    base.setValue = me.setValue;
    me.setValue = function(p_value, p_triggerEvent)
    {
        base.setValue(p_value, p_triggerEvent);
        
        me.text = me.value;
        if (_label != null)
        {
        	if(me.text != null){
        		 _label.setText(me.text);
        	}
        }
        me.setShowTitle(me.showTitle);
    };
    	
	/**
     * 设置 {@link textAlign} 字段的值。
     * 
     * @param p_textAlign 一个文本，表示标签编辑器文本的左右对齐方式。
     */
	me.setTextAlign = function(p_textAlign)
	{
	    if ($notEmpty(p_textAlign) &&  _label != null)
        {
	        me.textAlign = p_textAlign;
            _label.setTextAlign(p_textAlign);
        }
	};
	
	/**
	 * 设置 {@link vAlign} 字段的值。
	 * 用来设置控件的上下对齐方式,且只有当设置LabelEditor为行内元素时有效，
	 * 即设置LabelEditor的css属性 display:inline-block;时有效
	 * @param p_vAlign 一个文本，表示标签编辑器的上下对齐方式。
	 */
	me.setVAlign = function(p_vAlign)
    {
        if ($notEmpty(p_vAlign) && _label != null)
        {
            me.vAlign = p_vAlign;
            _label.setVerticalAlign(p_vAlign);
        }
    };
	
	/**
	 * 设置 {@link displayInline} 字段的值。
	 * 
	 * @param p_displayInline 一个 Boolean 值，表示标签编辑器和旁边的控件是否呈递在同一行内。
	 */
	me.setDisplayInline = function(p_displayInline)
    {
        me.displayInline = p_displayInline;
        me.$e.toggleClass("displayInline", me.displayInline);
    };
    	
	/**
	 * 设置 {@link autoWrap} 字段的值。
	 * 
	 * @param p_autoWrap 一个 Boolean 值，表示标签编辑器文本是否自动换行。
	 */
	me.setAutoWrap = function(p_autoWrap)
    {
        if (_label != null)
        {
	        me.autoWrap = p_autoWrap;
	        me.$e.toggleClass("autoWrap", me.autoWrap);
	        _label.setAutoWrap(p_autoWrap);
        }
    };
    
    /**
     * 设置 {@link border} 字段的值。
     * 
     *  @param p_border 一个字符串，表示 {@link mx.editors.LabelEditor} 边框样式。
     */
    me.setBorder = function(p_border)
    {
    	me.$e.css("border", p_border);
    }
    
    /**
     * 设置 {@link showTitle} 字段的值。
     * 
     *  @param p_showTitle 一个 Boolean 值，表示光标移动到标签编辑器上时是否显示提示信息。
     */
    me.setShowTitle = function (p_showTitle)
    {
    	me.showTitle = p_showTitle;
        if(p_showTitle)
        {
            me.$e.get(0).title = (me.value ==null ? "" : me.value);
        }
        else
        {
        	me.$e.get(0).title = "";
        }
    }
    
    /**
     * 设置 {@link height} 字段的值。
     * 
     * @param p_height
     *            控件的高度，可以是数字（如 100），也可以是字符串（如 “100%”）。
     */
    base.setHeight = me.setHeight;
    me.setHeight = function (p_height)
    {
    	me.height = p_height;
    	base.setHeight(p_height);
	    if (_label != null)
        {
            _label.setHeight(p_height);
        }
    }
    
    me.endOfClass(arguments); 
    return me;
};
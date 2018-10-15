$ns("mx.controls");

/**
 * 提供一个文本标签的类。 
 * 
 * @example
 * 以下是一个 {@link mx.controls.Label} 文本标签控件的使用示例。
 * <code language="JavaScript">
 * var label = new mx.controls.Label({
 *     text: "姓名",
 *     textAlign: "center",
 *     verticalAlign: "middle",
 *     onclick: function(e)
 *     {
 * 	       alert(e.target.text);
 *     }
 * });
 * </code>
 */
mx.controls.Label = function()
{
	var me = $extend(mx.controls.Control);
	var base = {};

	/**
	 * 获取标签显示的文本。请使用 {@link setText} 方法设置文本的值。
	 */
	me.text = "";
	
	/**
	 * 获取标签的文本的左右对齐方式。如“left”，表示靠右对齐。请使用 {@link setTextAlign} 方法设置该字段的值。
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
     * 获取标签的文本的上下对齐方式。如“middle”，表示居中对齐。请使用 {@link setVerticalAlign} 方法设置该字段的值。
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
	me.verticalAlign = "middle";
	
	
	/**
	 * @default 120
	 */
	me.width = 120;
	
	/**
     * @default 21
     */
	me.height = 21;
	
	/**
	 * 获取控件字体大小，可以是数字（如 12）、字符串（如“12px”）。请使用 {@link setFontSize} 方法设置该字段的值。
	 * 
	 * @default 12px
	 */
	me.fontSize = "12px";
	
	/**
	 * 获取一个 Boolean 值，表示标签文本是否自动换行。请使用 {@link setAutoWrap} 方法设置该字段的值。
	 * 
     * @default false
	 */
	me.autoWrap = false;
	
	/**
     * 当点击 Label 并且 {@link mx.controls.Control.enabled} 字段值为 true 时触发该事件。
     */
	me.onclick = null;
	
	var _$span = null;
	
    base.init = me.init;
    me.init = function()
    {
        base.init();
        
        me.$e.addClass("label");
        _$span = $("<span/>");
        me.$e.append(_$span);        
        _$span.text(me.text);
        
        me.setAutoWrap(me.autoWrap);
        me.setTextAlign(me.textAlign);
        me.setVerticalAlign(me.verticalAlign);
        
        me.setFontSize(me.fontSize);
        
        me.$e.on("click", _onclick);
    };
    
    /**
     * 设置标签的显示文本。
     * 
     * @param p_text 一个字符串文本，表示标签显示的文本。
     */
	me.setText = function(p_text)
	{
	    me.text = p_text;
	    _$span.text(p_text); 
	};
	
	/**
     * 设置 {@link textAlign} 字段的值。
     * 
     * @param p_textAlign 一个文本，表示标签文本的左右对齐方式。
     */
	me.setTextAlign = function(p_textAlign)
	{
	    if ($notEmpty(p_textAlign))
        {
	        me.textAlign = p_textAlign;
            me.$e.css("text-align", me.textAlign);
            
            //added by tiger on 2014/9/22 20:39:37,在IE6下需要 
            adjustLabelUnderIe67();
            //end add
        }
	};
	
	/**
	 * 设置 {@link verticalAlign} 字段的值。
	 * 
	 * @param p_verticalAlign 一个文本，表示标签文本的上下对齐方式。
	 */
	me.setVerticalAlign = function(p_verticalAlign)
    {
        if ($notEmpty(p_verticalAlign))
        {
            me.verticalAlign = p_verticalAlign;
            me.$e.find("span").css("vertical-align", me.verticalAlign);            
        }

        adjustLabelUnderIe67();
    };
    
    function adjustLabelUnderIe67(){
    	if($.isIE67() && _$span){
    		_$span.removeAttr("id");
			_$span.removeClass("top");
			_$span.removeClass("bottom");
			var style = _$span.attr("style");
			if(style){
				var reg = /top\s*:\s*[^;]*;*/;
				_$span.attr("style",style.replace(reg,""));
			}
			_$span.css("top","auto");			
			
    		if(me.autoWrap){
    			_$span.attr("id","span");
    			
    			if(me.verticalAlign == "top"){
    				_$span.addClass("top");
    			}else if(me.verticalAlign == "bottom"){
    				_$span.addClass("bottom");
    			}else{
    				var height = _$span.height();
    				if(height<=0){
    					_$span.appendTo($(document.body));
    					height = _$span.height();
    					me.$e.append(_$span);
    				}
    				
    				var ch = me.$e.height();

					//TODO，若父容器为100%，还可能存在问题
    				if(ch <= 0 && me.height.indexOf('%')>0){
    					ch = me.$e.parent().height();
						var t = parseFloat(me.height) / 100;    						
						ch = ch * t;
    				}
    				
    				var top = (ch - height) / 2.0;
    				_$span.css("top",top);    				
    			}
    		}
    	}
    }
    
    /**
     * 设置 {@link fontSize} 字段的值。
     * 
     * @param p_fontSize 控件字体大小，可以是数字（如 12）、字符串（如“12px”）。
     */
    me.setFontSize = function(p_fontSize)
    {
        if ($notEmpty(p_fontSize))
        {
            me.fontSize = p_fontSize;
            _$span.css("font-size", me.fontSize);
        }
    };
    
    base.setHeight = me.setHeight;
    me.setHeight = function(p_height)
    {
        base.setHeight(p_height);
        // 如果自动换行，用 display:table~table-cell 控制文本的上下对齐方式
        if (!me.autoWrap)
        {
        	if ($isNumber(p_height))
        	{
        		me.$e.css("line-height", me.height+"px");
        	}
        	else if($isString(p_height) && p_height.indexOf("px") > -1)
        	{
        		me.$e.css("line-height", me.height);
        	}
        }
        adjustLabelUnderIe67();
    };
    
	/**
	 * 设置 {@link autoWrap} 字段的值。
	 * 
	 * @param p_autoWrap 一个 Boolean 值，表示标签文本是否自动换行。
	 */
    me.setAutoWrap = function(p_autoWrap)
    {
    	if (p_autoWrap)
    	{
    		// 如果自动换行，用 display:table~table-cell 控制文本的上下对齐方式
    		 me.$e.css("line-height", "normal");
    	}
    	else
    	{
    		// 不自动换行，只有一行文本，用 line-height 设置为上下居中
    		if ($isNumber(me.height))
            {
                me.$e.css("line-height", me.height+"px");
            }
            else if($isString(me.height) && me.height.indexOf("px") > -1)
            {
                me.$e.css("line-height", me.height);
            } 
    	}
        me.autoWrap = p_autoWrap;
        me.$e.toggleClass("autoWrap", me.autoWrap);
        adjustLabelUnderIe67();
    }
    
    /**
     * @ignore
     */
    function _onclick(e)
    {
        if(me.enabled == false)return;
        me.trigger("click");
    }
    
    base.dispose = me.dispose;
    /**
	* 释放对象运行时动态生成的内容（属性、方法、事件）。
	*/
    me.dispose = function()
    {
    	if (_$span != null)
    	{
    		_$span.empty().remove();
    		_$span = null;
    		delete _$span;
    	}
    	base.dispose();
    }
    
	me.endOfClass(arguments); 
	return me;
};
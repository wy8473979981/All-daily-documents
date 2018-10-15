$ns("mx.containers");

$import("mx.containers.Split");

/**
 * 提供一个面板在垂直方向上的 {@link mx.containers.Split} 控件。
 * 
 * @example
 * 以下是一个创建 {@link mx.containers.HSplit} 的示例。
 * 该示例将说明如何创建一个 {@link mx.containers.HSplit}，如何向其中添加控件。
 * <code language="JavaScript">
 * var hSplit = new mx.containers.HSplit({
 *     height:"100%",
 *     width:"100%"
 * });
 * 
 * var btnUp = new mx.controls.Button({text:"UP"}); 
 * var btnDown = new mx.controls.Button({text:"DOWN"}); 
 * 
 * //向上边容器加入一个按钮
 * hSplit.addControl(btnUp, 0);
 * 
 * //向下边容器加入一个按钮
 * hSplit.addControl(btnDown, 1);
 * </code>
 * 
 * @example
 * 以下是一个创建上边高度为 20%，下边高度为 80% 的 {@link mx.containers.HSplit} 的示例。
 * <code language="JavaScript">
 * var hSplit = new mx.containers.HSplit({
 *     rows:"20%, 80%"
 * });
 * </code>
 */
mx.containers.HSplit = function()
{
    var me = $extend(mx.containers.Split);
    var base = {};
    
    /**
     * 请参见 {@link mx.containers.Split.orientation} 字段。
     * 
     * @default horizontal
     */
    me.orientation = "horizontal";
    
    /**
     * 获取一个字符串，表示 {@link mx.containers.HSplit} 的面板个数以及每个面板的高度（如“100,auto”，表示有两个面板，第一个面板高度为 “100px”，第二个的面板高度自适应）。
     * 
     * @default auto, auto
     */
    me.rows = "auto, auto";
    
    var _$splitter = null;
    var _$splitterBtn = null;
    var _splitterHeight = 3;
    
    var _panel1OuterHeight = 0;
    var _panel1InnerHeight = 0;
    var _panel2OuterHeight = 0;
    var _panel2InnerHeight = 0;
    var _fixedTop = true;
    
    base.collapse = me.collapse;
    base.expand = me.expand;
    
    /**
     * 初始化方法。执行设置样式并初始化属性等操作。
     */
    base.init = me.init;
    me.init = function()
    {
        base.init();
        
        if(me.$panel1) {
        	me.$panel1.attr('id','hPanel1');
        }
        if (me.$panel2) {
        	me.$panel2.attr('id','hPanel2');
		}
        if (me._$splitter) {
        	me._$splitter.attr('id','hSplitter');
		}
        me.$container.addClass("hSplit");
        
        if (!me.resizable)
        {
        	_splitterHeight = 0;
        }
        
        var h = 0;
        if (me.splitOptions.panel1 == "auto" && me.splitOptions.panel2 == "auto")
        {
            h = "50%";
            me.$panel1.css("height", h);
            me.$panel2.css("marginTop", _splitterHeight);
            me.$panel2.css("top", h);
        }
        else if (me.splitOptions.panel1 == "auto" && me.splitOptions.panel2 != "auto")
        {
            var option = me.splitOptions.panel2;
            h = _convert(option)
            me.$panel1.css("marginBottom", _splitterHeight);
            me.$panel1.css("bottom", h);
            me.$panel2.css("height", h);
            _fixedTop = false;
        }
        else if (me.splitOptions.panel1 != "auto")
        {
            var option = me.splitOptions.panel1;
			
            h = _convert(option);
            me.$panel1.css("height", h);
            me.$panel2.css("marginTop", _splitterHeight);
            me.$panel2.css("top", h);
        }
        
        if (me.resizable)
        {
            me._$splitter_btn.attr('id', me.activePanelIndex == 0 ? "topSpiltterBtn" : "bottomSpiltterBtn");
        	me._$splitter_btn.addClass(me.activePanelIndex == 0 ? "top" : "bottom");
            _fixedTop ? me._$splitter.css("top", h):  me._$splitter.css("bottom", h);
            me._$splitter_btn.on("mousedown", _splitterBtn_mousedown);  
            me._$splitter.on("mousedown", _splitter_mousedown);
        }
        
        //IE6与IE7, 设置的宽度不包含border、padding、margin的大小，需要额外处理
    	if($.isIE67()) {
	        me.$container.resize(function(){
	        	me.$panel2.css("marginTop", 0);
	        	// 宽度微调
	        	me.$panel1.css("width", me.$container.parent().width() - 
	        			(me.$panel1.outerWidth() - me.$panel1.width()));
	        	me.$panel2.css("width", me.$container.parent().width() - 
	        			(me.$panel2.outerWidth() - me.$panel2.width()));
	        	// 位置及高度微调
	        	if((!me.$e.is(":hidden") && me.$panel1.is(":hidden")) || me.$panel1.hasClass("hide")) {
	        		me.$panel2.css("top", me.resizable ? _splitterHeight : 0);
	        		me.$panel2.css("height", me.$container.parent().height() - 
	        				(me.resizable ? _splitterHeight : 0) - 
	        				(me.$panel2.outerHeight() - me.$panel2.height()));
	        	} else if((!me.$e.is(":hidden") && me.$panel2.is(":hidden")) || me.$panel2.hasClass("hide")) {
	        		me.$panel1.css("height", me.$container.parent().height() - 
	        				(me.resizable ? _splitterHeight : 0) - 
	        				(me.$panel1.outerHeight() - me.$panel1.height()));
	        	} else {
	        		if (me.splitOptions.panel1 == "auto" && me.splitOptions.panel2 != "auto" 
		        		&& !($isString(option) && option.indexOf("%") != -1)) {
	        			me.$panel1.css("height", me.$container.parent().height() - me.$panel2.outerHeight() - 
	        					(me.resizable ? _splitterHeight : 0) - 
	        					(me.$panel1.outerHeight() - me.$panel1.height()));
					} else {
						me.$panel2.css("top", me.$panel1.outerHeight() + (me.resizable ? _splitterHeight : 0));
		        		me.$panel2.css("height", me.$container.parent().height() - me.$panel1.outerHeight() - 
		        				(me.resizable ? _splitterHeight : 0) - 
		        				(me.$panel2.outerHeight() - me.$panel2.height()));
					}
	        	}
	    		// 分隔条位置微调
	    		if (me.resizable) {
    				me._$splitter.css("top", (!me.$e.is(":hidden") && me.$panel1.is(":hidden")) || me.$panel1.hasClass("hide") ? 0 :me.$panel1.outerHeight());
	            }
	        });
    	} else {
    		me.$e.one("resize", function(){
        		me.$e.resize(_split_resize);
        	});
    	}
    };
	
	base.dispose = me.dispose;
    /**
	* 释放对象运行时动态生成的内容（属性、方法、事件）。
	*/
    me.dispose = function(){
		if(me.$panel1) {
        	me.$panel1.removeAttr('id').removeClass();
        }
        if (me.$panel2) {
        	me.$panel2.removeAttr('id').removeClass();
		}
        if (me._$splitter) {
        	me._$splitter.removeAttr('id').removeClass();
		}
		if(me._$splitter_btn){
			me._$splitter_btn.removeAttr("id").removeClass();
		}
		$(document).off("mousemove", _splitter_mousemove);
		base.dispose();
	}
    
	/**
     * 展开指定的面板（通过 {@link activePanelIndex} 属性设置可展开的面板）。
     */
    me.expand = function()
    {
        if (me.expanded)
        {
            return;
        }
        var _panel1Height = me.$panel1.outerHeight(), _panel2Height = me.$panel2.outerHeight();
        
		me._do_resizing_();
		
		me._$splitter_btn.removeClass("collapsed");
        if (me.activePanelIndex == 0)
        {
            //IE6与IE7, 设置的宽度不包含border、padding、margin的大小，需要额外处理
        	if($.isIE67()) {
                me._$splitter.css("top", _panel1OuterHeight);
                me.$panel2.css("height", me.$panel2.height() - _panel1OuterHeight);
                me.$panel2.css("top", _panel1OuterHeight + _splitterHeight);
        	} else {
        		_panel1OuterHeight = _panel1Height;
                _panel2OuterHeight = _panel2Height;
        		if (_fixedTop)
        		{
        			me.$panel1.css("height", _panel1OuterHeight);
	            	me._$splitter.css("top", _panel1OuterHeight);
	            	me.$panel2.css("top", _panel1OuterHeight);
        		}
        		else
        		{
        			me.$panel1.css("bottom", _panel2OuterHeight - _panel1OuterHeight);
        			me._$splitter.css("bottom", _panel2OuterHeight - _panel1OuterHeight);
        			me.$panel2.css("height", _panel2OuterHeight - _panel1OuterHeight);
        		}
        	}
        	
        	if($.isIE6()) {
        		me.$panel1.removeClass("hide");
        		me.$panel1.animate({ height:_panel1InnerHeight }, 150); 
        	} else {
        		me.$panel1.animationShow({speed: 250, animation: "fadeIn"});
        	}
        }
        else
        {      
        	//IE6与IE7, 设置的宽度不包含border、padding、margin的大小，需要额外处理
        	if($.isIE67()) {
        		var height = me.$panel1.height() - _panel2OuterHeight;
                me.$panel1.css("height", height);
                me._$splitter.css("top", me.$panel1.outerHeight());
        	} else {
        		_panel1OuterHeight = _panel1Height;
                _panel2OuterHeight = _panel2Height;
                
                if (_fixedTop)
        		{
        			var height = _panel1OuterHeight - _panel2OuterHeight;
	            	me.$panel1.css("height", height);
	            	me._$splitter.css("top", height);
	            	me.$panel2.css("top", height);
        		}
        		else
        		{
        			me.$panel1.css("bottom", _panel2OuterHeight);
        			me._$splitter.css("bottom", _panel2OuterHeight);
        			me.$panel2.css("height", _panel2OuterHeight);
        		}
        	}
        	
        	if($.isIE6()) {
        		me.$panel2.removeClass("hide");
        		me.$panel2.animate({ height: _panel2InnerHeight }, 150);
        	} else {
        		me.$panel2.animationShow({speed: 250, animation: "fadeIn"});
        	}     
        }
        base.expand();
    };
    
    /**
     * 隐藏指定的面板（通过 {@link activePanelIndex} 属性设置可展开的面板）。
     */
    me.collapse = function()
    {
        if (!me.expanded)
        {
            return;
        }
        me._do_resizing_();
        
        me._$splitter_btn.addClass("collapsed");
        if (me.activePanelIndex == 0)
        {
        	_panel1OuterHeight = me.$panel1.outerHeight();
        	_panel2OuterHeight = me.$panel2.outerHeight();
            _panel1InnerHeight = me.$panel1.height();
            //IE6与IE7, 设置的宽度不包含border、padding、margin的大小，需要额外处理
        	if($.isIE67()) {
        		me._$splitter.css("top", 0);
                me.$panel2.css("height", me.$panel2.height() + _panel1OuterHeight);
                me.$panel2.css("top", _splitterHeight);
        	} else {
        		if (_fixedTop)
        		{
	           		me._$splitter.css("top", 0);
	            	me.$panel2.css("top", 0);	
        		}
        		else
        		{
        			var height =  _panel1OuterHeight + _panel2OuterHeight;
        			me._$splitter.css("bottom", height);
        			me.$panel2.css("height", height);
        		}
        	}
        	
        	if($.isIE6()) {
            	me.$panel1.animate({ height:0 }, 150); 
            	me.$panel1.addClass("hide");
        	} else {
        		me.$panel1.animationHide({speed: 250, animation: "fadeOut"});
        	}
        }
        else
        {
        	_panel1OuterHeight = me.$panel1.outerHeight();
        	_panel2OuterHeight = me.$panel2.outerHeight();
            _panel2InnerHeight = me.$panel2.height();
            //IE6与IE7, 设置的宽度不包含border、padding、margin的大小，需要额外处理
        	if($.isIE67()) {
                var height = me.$panel1.height() + _panel2OuterHeight;
                me.$panel1.css("height", height);
                me._$splitter.css("top", me.$panel1.outerHeight());
        	} else {
                if (_fixedTop)
        		{
	            	height = _panel1OuterHeight + _panel2OuterHeight
	            	me.$panel1.css("height", height);
	            	me._$splitter.css("top", height);
        		}
        		else
        		{
        			me.$panel1.css("bottom", 0);
	           	 	me._$splitter.css("bottom", 0);
        		}
        	}
        	
        	if($.isIE6()) {
        		me.$panel2.animate({ height: 0 }, 150);
        		me.$panel2.addClass("hide");
        	} else {
        		me.$panel2.animationHide({speed: 250, animation: "fadeOut"});
        	}
        }
        base.collapse();
    };
    
    function _splitterBtn_mousedown(e)
    {
        me.toggleExpanded();
        e.stopPropagation();
    };
    
    var _mouseY = 0, _srcY = 0;
    var _panel2OldHeight = 0;  //用于在IE6与IE7下调整panel2高度
    function _splitter_mousedown(e)
    {
        _mouseY = e.clientY;
        //IE6与IE7, 设置的宽度不包含border、padding、margin的大小，需要额外处理
    	if($.isIE67()) {
    		_srcY = me.$panel1.height();
    		_panel2OldHeight = me.$panel2.height();
    	} else {
    		_srcY = _fixedTop ? me.$panel1.outerHeight(): me.$panel2.outerHeight();
    	}
        e.stopPropagation();
        if (me.expanded) {
        	me._cover(true);
        }
        $(document.body).userSelectable(false);
        if (me.expanded) {
        	$(document).on("mousemove", _splitter_mousemove);
            $(document).one("mouseup", function(){
                $(document).off("mousemove", _splitter_mousemove);
                me._cover(false);
            });
        }
    }
    
    function _splitter_mousemove(e)
    {
    	if (!me.enabled)
    		return;
        var offsetY = e.clientY - _mouseY;
        
        if($.isIE6()) {
        	if(me.activePanelIndex == 0 && offsetY > 0 && me.$panel1.hasClass("hide")) {
        		me.$panel1.removeClass("hide");
        	} else if(me.activePanelIndex == 1 && offsetY < 0 && me.$panel2.hasClass("hide")) {
        		me.$panel2.removeClass("hide");
        	}
        }
        
		var args = { 
        	panel1: { 
        		width: me.$panel1.width(), 
        		height: me.$panel1.height() 
        	}, 
        	panel2: {
        		width: me.$panel2.width(),
				height: me.$panel2.height() 
			} 
		};
		
		me.trigger("resizing", args);
		
        if (_fixedTop && (offsetY + _srcY <= me.threshold[0] || offsetY + _srcY + me.threshold[1] >= me.$e.height() - _splitterHeight))
        {
            return;
        }
        if (!_fixedTop && (_srcY - offsetY <=  me.threshold[1] || _srcY - offsetY + me.threshold[0] >= me.$e.height() - _splitterHeight))
        {
        	return
        }
        
        //IE6与IE7, 设置的宽度不包含border、padding、margin的大小，需要额外处理
    	if($.isIE67()) {
    		me.$panel1.css("height", offsetY + _srcY);
        	me.$panel1.css("bottom", offsetY + _srcY);
        	me._$splitter.css("top", me.$panel1.outerHeight());
    		me.$panel2.css("top", me.$panel1.outerHeight() + (parseInt(me.$panel2.css("marginTop")) == 0 ? _splitterHeight : 0));
    		me.$panel2.css("height", _panel2OldHeight - offsetY);
    	} else {
    		if (_fixedTop)
        	{
	       	 	me._$splitter.css("top", offsetY + _srcY);
	        	me.$panel1.css("height", offsetY + _srcY);
	        	me.$panel2.css("top", offsetY + _srcY);
        	}
        	else
        	{
        		me._$splitter.css("bottom", _srcY - offsetY);
	        	me.$panel2.css("height",  _srcY - offsetY);
	        	me.$panel1.css("bottom", _srcY - offsetY);
        	}
    	}
        
        me.trigger("resize", { panel1: { width: me.$panel1.width(), height: me.$panel1.height() }, panel2: { width: me.$panel2.width(), height: me.$panel2.height() } });
    }
    
    function _split_resize(e)
    {
    	if (me.activePanelIndex == 1 && $isEqual(me.$panel2.css("display"), "none") && _fixedTop)
    	{
    		var height = me.$e.outerHeight() - _splitterHeight - parseInt(me.$e.css("borderTopWidth")) - parseInt(me.$e.css("borderBottomWidth"));
            me.$panel1.css("height", height);
            me._$splitter.css("top", height);
    	}
    	if (me.activePanelIndex == 0 && $isEqual(me.$panel1.css("display"), "none") && !_fixedTop)
    	{
    		var height = me.$e.outerHeight() - _splitterHeight - parseInt(me.$e.css("borderTopWidth")) - parseInt(me.$e.css("borderBottomWidth"));
            me.$panel2.css("height", height);
            me._$splitter.css("bottom", height);
    	}
    	
    }
    
    function _convert(p_value)
    {
    	var value;
    	if ($isString(p_value))
    	{
    		if (p_value.endsWith("%"))
    		{
    			value = p_value;
    		}
    		else
    		{
    			value = parseInt(p_value);
    		}
    	}
    	else if ($isNumber(p_value))
    	{
    		value = p_value;
    	}
    	return value;
    }
    
    me.endOfClass(arguments); 
    return me;
};
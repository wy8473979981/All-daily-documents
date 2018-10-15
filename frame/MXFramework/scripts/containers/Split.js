$ns("mx.containers");

/**
 * 表示一个由可移动条组成的控件，该可移动条将容器的显示区域分成两个或三个大小可调的面板。
 * 该类的派生类有 {@link mx.containers.VSplit}，{@link mx.containers.HSplit}。
 * 
 * @abstract  
 */
mx.containers.Split = function()
{
    var me = $extend(mx.containers.Container);
    var base = {};
    
    /**
     * @ignore
     */         
    me.$panel1 = null;
    
    /**
     * @ignore
     */
    me.$panel2 = null;
    
    /**
     * @default 100%
     */
    me.width = "100%";
    
    /**
     * @default 100%
     */
    me.height = "100%";
    
    /**
     * 获取和设置边框粗细，一个数字（如 1、0）或字符串（如“2px”、“5px”）。
     */
    me.borderThick = "1px";
    
    /**
     * 获取一个值，该值指示 {@link mx.containers.Split} 面板处于水平方向还是垂直方向。
     * <p>
     * 该字段通常包括:
     * <ul>
     *     <li><b>vertical</b> - 表示面板在水平方向。</li>
     *     <li><b>horizontal</b> - 表示面板在垂直方向。</li>
     * </ul>
     * </p>
     * @default vertical
     */
    me.orientation = "vertical";
    
    /**
     * 获取一个 Boolean 值，表示是否可以由用户以拖动方式改变容器面板大小。该字段必须在初始化前设置。
     * 
     * @default false
     */
    me.resizable = false;
    
    /**
     * 获取或设置哪个面板可隐藏或展开。
     * 该值为一个数字，表示控件中哪个 Panel 的索引（如果是 {@link mx.containers.VSplit}，“0”表示左边的 Panel，“1”表示右边的 Panel。如果是 {@link mx.containers.HSplit}，“0”表示上面的 Panel，“1”表示下面的 Panel）。
     * 
     * @default 0
     */
    me.activePanelIndex = 0;
    
    /**
     * 获取控件的内边距。如“4px”表示上下左右的内边距均为 4 像素。
     * 
     * @default 0
     */
    me.padding = 0;
    
    /**
     * 获取一个 Boolean 值，表示索引值为 {@activePanelIndex} 的面板是否展开。 
     */
    me.expanded = true;
    
    /**
     * 获取和设置面板拖拽时的上阈值和下阈值,该属性通常是一个数字或者数组。当为数字时，表示上下（左右）阈值都为相同值；当数组时，数组的第一个元素表示上（左）阈值，数组的第二个元素表示下（右）阈值。
     * @default 10
     */
    me.threshold = 10;
    
    /**
     * 当容器内面板大小发生改变时触发该事件。
     */
    me.onresize = null;
    
     /**
     * 当容器内面板大小发生改变前触发该事件。
     */
    me.onresizing = null;
    
    /**
     * 获取一个 JSON 对象，该属性表示 {@link mx.containers.Split} 的两个面板的尺寸信息。例如 { panel1: “30%”， panel2: "auto"} 表示 panel1的高度（宽度）为 70%, panel2的高度（宽度）自适应。
     * 该属性由 {@link mx.containers.HSplit} 的 {@mx.containers.HSplit.rows} 属性 或者  {@link mx.containers.VSplit} 的 {@mx.containers.VSplit.cols} 属性决定。
     * @default null
     */
    me.splitOptions = null;
    /**
     * @ignore
     */
    me.owner = null;
    
    /**
     * @ignore
     */
    me._$splitter = null;
    
    /**
     * @ignore
     */
    me._$splitter_btn = null;
    
    base.init = me.init;
    me.init = function() 
    {          
    	me.$panel1 = $("<div/>");
    	me.$panel2 = $("<div/>");
        base.init();
        
        me.$container.addClass("split");
        me.$panel1.addClass("panel1");
        me.$panel2.addClass("panel2");
        me.setBorderThick(me.borderThick);
        
        me.$container.append(me.$panel1);
        
        if (me.resizable)
        {
            me._$splitter = $("<div class='splitter'><table><tbody><tr><td><span/></td></tr></tbody></table></div>");            
            me._$splitter_btn = me._$splitter.find("span");
			delete me._$splitter_btn.prevObject;
            me.$container.append(me._$splitter);
            me.changeTitle();
            
            if ($isNumber(me.threshold))
            {
            	var threshold = me.threshold;
            	me.threshold = [threshold, threshold];
            }
        }
        
        me.$container.append(me.$panel2);
        
        me.loadOptions();
    };
	
	base.dispose = me.dispose;
    /**
	* 释放对象运行时动态生成的内容（属性、方法、事件）。
	*/
    me.dispose = function(){	
		if (me.resizable){
			me._$splitter.off();
			me._$splitter.unbind();
			me._$splitter.empty().remove();
			
			me._$splitter_btn.off();
			me._$splitter_btn.unbind();
			me._$splitter_btn.empty().remove();
		}
		
		me.$panel1.off();
		me.$panel1.unbind();
		me.$panel1.empty().remove();
		
		me.$panel2.off();
		me.$panel2.unbind();
		me.$panel2.empty().remove();	
		
		base.dispose();
	}
    
    /**
     * @overide
     */
    me.setPadding = function(p_padding)
    {
    	if ($notEmpty(me.$panel1) && $notEmpty(me.$panel2) && $notEmpty(p_padding))
    	{
    		me.$panel1.css({"padding": p_padding});
    		me.$panel2.css({"padding": p_padding});
    		me.paddding = p_padding;
    	}
    };
    
    /**
     * 将一组 {@link mx.controls.Control} 对象添加到集合 {@link controls} 中。
     * 
     * @param p_controls
     *            一个 {@link mx.controls.Control} 控件数组。
     * @param [p_index=0] 一个数字，表示控件中哪个 Panel 的索引（如果是 {@link mx.containers.VSplit}，“0”表示左边的 Panel，“1”表示右边的 Panel。如果是 {@link mx.containers.HSplit}，“0”表示上面的 Panel，“1”表示下面的 Panel）。
     * 
     * @param [p_islinebreak=true] 一个布尔值，表示添加控件时是否强制换行。
     */
    me.addControls = function(p_controls, p_index, p_islinebreak)
    {
        if ($.isArray(p_controls))
        {
        	for (var i = 0; i < p_controls.length; i++) {
				me.addControl(p_controls[i], p_index, p_islinebreak);	
        	}
        }
    };
    
    base.addControl = me.addControl;
    /**
     * 详见 {@link mx.containers.Container.addControl} 方法。
     * 
     * @param p_control
     *            一个 {@link mx.controls.Control} 对象。
     * @param [p_index=0] 一个数字，表示控件中哪个 Panel 的索引（如果是 {@link mx.containers.VSplit}，“0”表示左边的 Panel，“1”表示右边的 Panel。如果是 {@link mx.containers.HSplit}，“0”表示上面的 Panel，“1”表示下面的 Panel）。
     * 
     * @param [p_islinebreak=true] 一个布尔值，表示添加控件时是否强制换行。
     */
    me.addControl = function(p_control, p_index, p_islinebreak)
    {
        if (p_control == null) return;
        
        if (p_index == 0 || typeof (p_index) == "undefined")
        {
            me.$container = me.$panel1;
        }
        else
        {
            me.$container = me.$panel2;
        }    
        
        // 如果第二个参数不传入添加位置，而传入布尔值 true，则默认添加到第一个面板，并且换行处理。
        if (p_index === true)
        {
        	p_islinebreak = true;
        }
        
        base.addControl(p_control, p_islinebreak);
    };
    
    base.append = me.append;
    /**
     * 详见 {@link mx.containers.Container.append} 方法。
     * 
     * @param $p_obj 一个 JQuery 对象，或一个控件（包含 $container 容器），或一个 HTML DOM 元素。
     *            
     * @param [p_index=0] 一个数字，表示控件中哪个 Panel 的索引（如果是 {@link mx.containers.VSplit}，“0”表示左边的 Panel，“1”表示右边的 Panel。如果是 {@link mx.containers.HSplit}，“0”表示上面的 Panel，“1”表示下面的 Panel）。
     */
    me.append = function($p_obj, p_index)
    {
        if (p_index == 0 || typeof (p_index) == "undefined")
        {
            me.$container = me.$panel1;
        }
        else
        {
            me.$container = me.$panel2;
        } 
        
        base.append($p_obj);
    };       
    
    /**
     * 展开指定的面板（通过 {@link activePanelIndex} 属性设置可展开的面板）。
     */
    me.expand = function()
    {  
    	if (!me.enabled)
    		return;
        me.expanded = true;
        me.trigger("resize", { panel1: { width: me.$panel1.width(), height: me.$panel1.height() }, panel2: { width: me.$panel2.width(), height: me.$panel2.height() } });
    };
    
    /**
     * 隐藏指定的面板（通过 {@link activePanelIndex} 属性设置可展开的面板）。
     */
    me.collapse = function()
    {    
    	if (!me.enabled)
    		return;
        me.expanded = false;
        me.trigger("resize", { panel1: { width: me.$panel1.width(), height: me.$panel1.height() }, panel2: { width: me.$panel2.width(), height: me.$panel2.height() } });
    };
    
    /**
     * 切换指定面板的显示状态（展开或隐藏）。
     */
    me.toggleExpanded = function()
    {
    	if (!me.enabled)
    		return;
        if (me.expanded)
        {
            me.collapse();
        }
        else
        {
            me.expand();
        }
        me.changeTitle();
    };
    
    /**
     * @ignore
     * 改变显示隐藏按钮的显示值。
     */
    me.changeTitle = function()
    {
        me._$splitter_btn.attr("title", me.expanded ? mx.msg("SPLITTER_HIDE") : mx.msg("SPLITTER_SHOW"));   
    };
    
    /**
     * 设置字段 {@link borderThick} 的值。
     * @param p_borderThick 一个数字（如 1、0）或字符串（如“2px”、“5px”）。
     */
    me.setBorderThick = function(p_borderThick)
    {
        me.borderThick = p_borderThick;
        me.$panel1.css("border-width", me.borderThick);
        me.$panel2.css("border-width", me.borderThick);
    };
    
    /**
     * @ignore
     */
    me.loadOptions = function()
    {
        _loadSplitOptions();
    };
    
    /**
     * @ignore
     * 
     * 触发重置事件。
     */
    me._do_resizing_ = function(e)
    {
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
    };
    /**
     * @ignore 
     * 设置遮罩层防止添加HTMLContainer时，document上绑定的事件跳转到新的HTMl中
     */
    me._cover = function(p_isBusy)
    {
        var busy = $isBoolean(p_isBusy) ? p_isBusy : true;
        
        if (busy)
        {
        	//增加背景色和滤镜，避免内容区中IFRAME对拖动的影响，IFRAME中的控件会让mouseup事件丢失
            var $mark = $("<div style='position:absolute;height:100%;width:100%; left:0; top:0;background-color:#0000ff;filter:alpha(opacity=5);opacity:0.05;' id='splitCover'/>");
            $mark.css("zIndex", 99999);
            me.$e.append($mark);
        }
        else
        {
            var $mark = me.$e.children("div#splitCover");
            if ($notEmpty($mark))
            {
                $mark.remove();
            }
        }
    };
    
    function _loadSplitOptions()
    {
        var parts = null;
        if (me.orientation == "vertical")
        {
            parts = me.cols.replace(/\*/g, "auto").split(",");
        }
        else
        {
            parts = me.rows.replace(/\*/g, "auto").split(",");
        }
        var panel1 = null;
        var panel2 = null;
        if (parts.length == 2)
        {
            panel1 = parts[0].trim();
            panel2 = parts[1].trim();
        }
        
        me.splitOptions = { panel1: panel1, panel2: panel2};
    }
    
    me.endOfClass(arguments); 
    return me;
};
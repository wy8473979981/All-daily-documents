$ns("mx.containers");

$import("mx.containers.Split");

/**
 * 提供一个面板在水平方向上的 {@link mx.containers.Split} 控件。
 * 
 * @example
 * 以下是一个创建 {@link mx.containers.VSplit} 的示例。
 * 该示例将说明如何创建一个 {@link mx.containers.VSplit}，如何向其中添加控件。
 * <code language="JavaScript">
 * var vSplit = new mx.containers.VSplit({
 *     height:"500px",
 *     width:"100%"
 * });
 * 
 * var btnLeft = new mx.controls.Button({text:"我在左边"}); 
 * var btnRight = new mx.controls.Button({text:"我在右"}); 
 * 
 * //向左边容器加入一个按钮
 * vSplit.addControl(btnLeft, 0);
 * 
 * //向右边容器加入一个按钮
 * vSplit.addControl(btnRight, 1);
 * </code>
 * @example
 * 以下是一个创建左边宽度为 20%，右边宽度为80% 的 {@link mx.containers.VSplit} 的示例。
 * <code language="JavaScript">
 * var vSplit = new mx.containers.VSplit({
 *     cols:"20%, 80%"
 * });
 * </code>
 */
mx.containers.VSplit = function()
{
    var me = $extend(mx.containers.Split);
    var base = {};
    
    /**
     * 请参见 {@link mx.containers.Split.orientation} 字段。
     * 
     * @default vertical
     */
    me.orientation = "vertical";
    
    /**
     * 获取一个字符串，表示 {@link mx.containers.VSplit} 的面板个数以及每个面板的宽度（如“100,auto”，表示有两个面板，第一个面板宽度为 “100px”，第二个的面板宽度自适应；暂不支持“auto,100”的格式，即第一个为 auto，第二个为数字或百分比）。
     * 
     * @default auto, auto
     */
    me.cols = "auto, auto";
    
    var _$splitter = null;
    var _$splitterBtn = null;
    var _splitterWidth = 3;
    
    var _init$Panel1Width = 0;

    base.init = me.init;
    me.init = function()
    {
        base.init();
        
        if(me.$panel1) {
        	me.$panel1.attr('id','vPanel1');
        }
        if (me.$panel2) {
        	me.$panel2.attr('id','vPanel2');
		}
        if (me._$splitter) {
        	me._$splitter.attr('id','vSplitter');
		}
        me.$container.addClass("vSplit");
        
        if (!me.resizable)
        {
        	_splitterWidth = 1;
        }
        
        if (me.splitOptions.panel1 == "auto" && me.splitOptions.panel2 == "auto")
        {
            var w = "50%";
            me.$panel1.css("width", w);
        }   
        else if (me.splitOptions.panel1 != "auto")
        {
            me.$panel1.css("width", me.splitOptions.panel1);
        }
       
        if (!me.resizable)
        {
            me.$panel1.css("margin-right", _splitterWidth);
        }
        else
        {
            me._$splitter_btn.on("mousedown", _splitterBtn_mousedown);
            me._$splitter_btn.attr('id', me.activePanelIndex == 0 ? "leftSpiltterBtn" : "rightSpiltterBtn");
            me._$splitter_btn.addClass(me.activePanelIndex == 0 ? "left" : "right");
            me._$splitter.on("mousedown", _splitter_mousedown);
        }
        
        
        
        $(window).one("load", function()
        {
        	_init$Panel1Width = me.$panel1.width();
        });
	
        //IE6与IE7, 设置的宽度不包含border、padding、margin的大小，需要额外处理
    	if($.isIE67()) {
	        me.$container.resize(function(){
	        	// 高度微调
	        	me.$panel1.css("height", me.$container.parent().height() - (me.$panel1.outerHeight() - me.$panel1.height()));
	        	me.$panel2.css("height", me.$container.parent().height() - (me.$panel2.outerHeight() - me.$panel2.height()));
	        	// 宽度微调
	        	if((!me.$e.is(":hidden") && me.$panel2.is(":hidden")) || me.$panel2.hasClass("hide")) {
	        		me.$panel1.css("width", me.$container.parent().width() - 
	        				(me.$panel1.outerWidth() - me.$panel1.width()) - _splitterWidth);
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
		$(window).off("load");
		base.dispose();
	}

    /**
     * 展开指定的面板（通过 {@link activePanelIndex} 属性设置可展开的面板）。
     */
    base.expand = me.expand;
    me.expand = function()
    {
        if (me.expanded)
        {
            return;
        }
    	me._do_resizing_();
    	
        me._$splitter_btn.removeClass("collapsed");

		var innerVsplit = me.$panel2.find(".vSplit");
		
        if (me.activePanelIndex == 0)
        {
        	if($.isIE6()) {
        		me.$panel1.removeClass("hide");
        	} else {
        		me.$panel1.show();
        	}
        }
        else
        {         
        	if($.isIE6()) {
        		me.$panel2.removeClass("hide");
        	} else {
        		me.$panel2.show();
        	}
        }
        
        // 针对设置的初始宽度是百分比的情况，如果初始执行了隐藏操作，而且在取消隐藏后又手工拖拽调整了宽度。
        // 不合适展开时使用之前记录调整后的大小，需要根据初始百分比重新计算宽度。
        if(!_isSplitterMove)
        {
        	if (me.splitOptions.panel1 == "auto")
            {
            	_init$Panel1Width = me.$e.outerWidth() * 0.5;
            }
            else if (me.splitOptions.panel1.endsWith("%"))
            {
            	_init$Panel1Width = me.$e.outerWidth() * (parseInt(me.splitOptions.panel1) / 100);
            }
        }
        

        base.expand();
		me.$panel1.animate({ width:_init$Panel1Width }, 300, function(){
			
			me.changeTitle();
            if (innerVsplit.size() > 0)
            {
				innerVsplit = innerVsplit.first();
				var panelNum = innerVsplit.find(".panel2").size();
            	var innerVsplit$panel1 = innerVsplit.children(".panel1");
				var innerVsplit$panel2 = innerVsplit.children(".panel2");
				var innerVsplit$panel2$vsplit = innerVsplit$panel2.find(".vSplit");
				var innerVsplit$panel2$panel1 = innerVsplit$panel2$vsplit.children(".panel1");
				var innerVsplit$panel2$panel2 = innerVsplit$panel2$vsplit.children(".panel2");
				var innerPanelPadding = innerVsplit$panel1.css("padding");
				innerPanelPadding = innerPanelPadding != "" ? parseInt(innerPanelPadding) : 3;

				if (innerVsplit$panel2$panel1.size() > 0)
				{
					innerVsplit$panel2$panel1.width(function(n, w)
					{
						if (innerVsplit$panel2$panel2.is(":hidden"))
						{
							return me.$e.width() - _init$Panel1Width  - (_splitterWidth*3) - innerVsplit$panel1.outerWidth() - innerPanelPadding * 2 * 2;
						}
					});
				}
				else
				{
					innerVsplit$panel1.width(function(n, w)
					{
						if (innerVsplit$panel2.is(":hidden"))
						{
							return me.$e.outerWidth() - _init$Panel1Width - (_splitterWidth*2) - (innerPanelPadding * 2) - 2;
						}
						else
						{
							return w;
						}
					});
				}
            }
        });   
    };
    
    /**
     * 隐藏指定的面板（通过 {@link activePanelIndex} 属性设置可展开的面板）。
     */
    base.collapse = me.collapse;
    me.collapse = function()
    {
        if (!me.expanded)
        {
            return;
        }
    	me._do_resizing_();
    	
        me._$splitter_btn.addClass("collapsed");
		if (_init$Panel1Width == 0)
		{
			_init$Panel1Width = me.$panel1.outerWidth();

			if ($.browser.msie && me.parent && me.parent.middlePanelWidth)
			{
				if (!me.parent.leftPanelVisible)
				{
					if ($isString(me.parent.middlePanelWidth) && me.parent.middlePanelWidth.indexOf("%") != -1)
					{
						_init$Panel1Width = _init$Panel1Width * (parseInt(me.parent.middlePanelWidth)/100);
					}
					else
					{
						_init$Panel1Width = me.parent.middlePanelWidth;
					}
				}
				else
				{
					if ($isString(me.parent.leftPanelWidth) && me.parent.leftPanelWidth.indexOf("%") != -1)
					{
						_init$Panel1Width = me.$e.outerWidth() * (parseInt(me.parent.leftPanelWidth)/100);
					}
					else
					{
						_init$Panel1Width = me.parent.leftPanelWidth;
					}
				}
			}
		}        

        if (me.activePanelIndex == 0)
        {
            me.$panel1.animate({ width:0 }, 300, function(){
            	if($.isIE6()) {
            		me.$panel1.addClass("hide");
            	} else {
            		me.$panel1.hide();
            	}
                base.collapse();
                me.changeTitle();
            });            
        }
        else
        {        	
        	//在IE8中如果没有显示的设置border，me.$e.css("borderLeftWidth")会返回"",导致获取的newWidth为NaN
        	/* 可能是由于对称性问题，需要减去1，凑成偶数*/
        	var newWidth = me.$e.outerWidth() - _splitterWidth 
        		-parseBorder(me.$e.css("borderLeftWidth")) 
        		- parseBorder(me.$e.css("borderRightWidth"))
        		- 1;
        	
        	//IE6与IE7, 设置的宽度不包含border、padding、margin的大小，需要额外处理
        	if($.isIE67()) {
        		newWidth = me.$panel1.width() + me.$panel2.outerWidth(true);
        	}
            me.$panel1.animate({ width: newWidth }, 300, function(){
            	if($.isIE6()) {
            		me.$panel2.addClass("hide");
            	} else {
            		me.$panel2.hide();
            	}
                base.collapse();
                me.changeTitle();
            });
        }   
    };
    
    function _splitterBtn_mousedown(e)
    {
        me.toggleExpanded();
        e.stopPropagation();
    }
    
    var _mouseX = 0; 
    var _srcWidth = 0;
    function _splitter_mousedown(e)
    {
        _srcWidth = me.$panel1.width();
        _mouseX = e.clientX;
        e.stopPropagation();
        me._cover(true);
        $(document.body).userSelectable(false);
        $(document).on("mousemove", _splitter_mousemove);
        $(document).one("mouseup", function(){
            $(document).off("mousemove", _splitter_mousemove);
            me._cover(false);
        });
    }
    
    var _isSplitterMove = false;
    function _splitter_mousemove(e)
    {
    	if (!me.enabled)
    		return;
        var offsetX = e.clientX - _mouseX;
        
        if($.isIE6()) {
        	if(me.activePanelIndex == 0 && offsetX > 0 && me.$panel1.hasClass("hide")) {
        		me.$panel1.removeClass("hide");
        	} else if(me.activePanelIndex == 1 && offsetX < 0 && me.$panel2.hasClass("hide")) {
        		me.$panel2.removeClass("hide");
        	}
        }
        
        me._do_resizing_();
	
        if (_srcWidth + offsetX <= me.threshold[0] || offsetX + _srcWidth + me.threshold[1] >= me.$e.width() - _splitterWidth)
        {
            return;
        }
        me.$panel1.css("width", _srcWidth + offsetX);
        _init$Panel1Width = _srcWidth + offsetX;
        _isSplitterMove = true;
        
        me.trigger("resize", { panel1: { width: me.$panel1.width(), height: me.$panel1.height() }, panel2: { width: me.$panel2.width(), height: me.$panel2.height() } });
    }
    
    function _split_resize(e)
    {
    	if (me.activePanelIndex == 1 && $isEqual(me.$panel2.css("display"), "none"))
    	{
    		/* 可能是由于对称性问题，需要减去1，凑成偶数*/
    		me.$panel1.width(me.$e.outerWidth() 
    			- _splitterWidth - parseBorder(me.$e.css("borderLeftWidth")) 
    			- parseBorder(me.$e.css("borderRightWidth")) -1);
    	}
    }
    
    function parseBorder(p_width)
    {
    	  if(typeof p_width == "undefined")
    	  {
    	      return 0;
    	  }
    	  p_width = parseInt(p_width);
          return isNaN(p_width) ? 0 : p_width;
    }
   
    me.endOfClass(arguments); 
    return me;
};
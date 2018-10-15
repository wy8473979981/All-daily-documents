$ns("mx.containers");

$import("mx.containers.HSplit");
$import("mx.containers.VSplit");

/**
 * 提供一个多面板布局的控件。面板有上下左右中五个，可使用其中任意组合的面板。
 * 
 * @example
 * 以下是一个创建 {@link mx.containers.PanelLayout} 的示例。
 * <code language="JavaScript">
 * var layout = new mx.containers.PanelLayout({
 *     topPanelVisible:false,  // 隐藏顶部面板
 *     leftPanelVisible:false, // 隐藏左部面板
 *     middlePanelHeight:400,  // 设置中部面板高度
 *     middlePanelWidth:"50%"  // 设置中部面板宽度
 * });
 * </code>
 * 
 * @example
 * 以下是一个向 {@link mx.containers.PanelLayout} 控件的面板中添加内容的示例。
 * <code language="JavaScript">
 * var btn = new mx.controls.Button({
 *     text:"bruce"
 * });
 * var label = new mx.controls.Label({
 *     text:"dbm"
 * });
 * layout.addControl(label);      // 添加到中部面板
 * layout.addControl(btn, "top"); // 添加到顶部面板
 * </code>
 */
mx.containers.PanelLayout = function()
{
    var me = $extend(mx.containers.Container);
    var base = {};
    
    /**
     * 获取或设置一个 Boolean 值，表示顶部面板是否可见。
     * 
     * @default true
     */
    me.topPanelVisible = true;
    
    /**
     * 获取或设置一个 Boolean 值，表示左部面板是否可见。
     * 
     * @default true
     */
    me.leftPanelVisible = true;
    
    /**
     * 获取或设置一个 Boolean 值，表示右部面板是否可见。
     * 
     * @default true
     */
    me.rightPanelVisible = true;
    
    /**
     * 获取或设置一个 Boolean 值，表示底部面板是否可见。
     * 
     * @default true
     */
    me.bottomPanelVisible = true;
    
    /**
     * 获取或设置一个 Boolean 值，表示所有面板是否可拖动并改变大小。
     * 
     * @default true
     */
    me.enabled = true;
    
    /**
     * 获取或设置一个 Boolean 值，表示顶部面板是否可拖动并改变大小。
     * 
     * @default true
     */
    me.topPanelResizable = true;
    
    /**
     * 获取或设置一个 Boolean 值，表示左部面板是否可拖动并改变大小。
     * 
     * @default true
     */
    me.leftPanelResizable = true;
    
    /**
     * 获取或设置一个 Boolean 值，表示右部面板是否可拖动并改变大小。
     * 
     * @default true
     */
    me.rightPanelResizable = true;
    
    /**
     * 获取或设置一个 Boolean 值，表示底部面板是否可拖动并改变大小。
     * 
     * @default true
     */
    me.bottomPanelResizable = true;
    
    /**
     * 获取或设置一个值，表示顶部面板的高度。<b>该值必须为数字。</b>
     * 
     * @default 80
     */
    me.topPanelHeight = 80;
    
    /**
     * 获取或设置一个值，表示中部面板的高度。<b>该值必须为数字。</b>
     * 
     * @default 300
     */
    me.middlePanelHeight = 300;
    
    /**
     * 获取或设置一个值，表示左部面板的宽度。<b>该值可以为数字或百分比。</b>
     * 
     * @default 20%
     */
    me.leftPanelWidth = "20%";
    
    /**
     * 获取或设置一个值，表示中部面板的宽度。<b>该值可以为数字或百分比。</b>
     * 
     * @default 60%
     */
    me.middlePanelWidth = "60%";
    
    /**
     * 获取和设置边框粗细，一个数字（如 1、0）或字符串（如“2px”、“5px”）。
     */
    me.borderThick = "1px";
    
    /**
     * @ignore
     */
    me.$panelTop = null;
    
    /**
     * @ignore
     */
    me.$panelLeft = null;
    
    /**
     * @ignore
     */
    me.$panelMiddle = null;
    
    /**
     * @ignore
     */
    me.$panelRight = null;
    
    /**
     * @ignore
     */
    me.$panelBottom = null;
    
    var _hSplitBottom = null;
    var _hSplit = null;
    var _vSplit = null;
    var _vSplitRight = null;
    var _splitterWidthOrHeight = 3;
    
    base.init = me.init;
    me.init = function()
    {
        base.init();
        
        _init();
        me.setEnabled(me.enabled);
        
    };
    
	base.dispose = me.dispose;
    /**
	* 释放对象运行时动态生成的内容（属性、方法、事件）。
	*/
    me.dispose = function(){		
		if(_vSplitRight){
			_vSplitRight.dispose();
			_vSplitRight=null;
		}		
		if(_vSplit){
			_vSplit.dispose();
			_vSplit=null;
		}
		
		if(_hSplitBottom){
			_hSplitBottom.dispose();
			_hSplitBottom=null;
		}
		if(_hSplit){
			_hSplit.dispose();
			_hSplit=null;
		}
		
		base.dispose();
	}
    
    /**
     * 从 {@link controls} 集合中移除指定的 {@link mx.controls.Control} 对象。
     * 从集合中移除控件时，该控件会被从上下文的 DOM 中移除，但仍驻留在内存中，可以重用。
     * 
     * @param p_control
     *            一个 {@link mx.controls.Control} 对象。
     * @param p_deep
     *            表示是否从内存中删除指定控件。
     */
    me.removeControl = function(p_control, p_deep)
    {
        if (p_control != null)
        {
            p_control.parent = null;
            if (me.controls.remove(p_control) || me.$e.find(p_control.$e).length > 0)
            {
            	if ($notEmpty(p_control.id))
            	{
					me.controls[p_control.id]=null;
            		delete me.controls[p_control.id];					
            	}
                if (p_deep == true)
				{					
					if ($isFunction(p_control.dispose))
					{
						p_control.dispose();
					}
					
					p_control = null;
					delete p_control;
				}else if(p_control.$e){
            		try{
            			p_control.$e.empty().remove();
						p_control.$e.removeData("control");
                	}catch(e){}
            	}
            }
            
            me.trigger("ctrlremoved", {ctrl: p_control});
        }
    };
    
    /**
     * 容器的clear方法
     */
    me.clear = function(){
	    var cs = me.controls;
    	for(var i = cs.length-1; i>=0; i--){        		
    		var c = cs[i];       		
    		if(c.controls && c.controls.length>0){
    			//c.dispose();
    		}else{
    			me.removeControl(c, true);
    		}
    	}
    }
    
    /**
     * 详见 {@link mx.containers.Container.addControls} 方法。
     * @param p_controls 一个 {@link mx.controls.Control} 控件数组。
     * @param [p_panel="middle"] 一个字符串，表示控件中哪个位置的面板（如“top”、“left”、“middle”、“right”、“bottom”）。
     */
    me.addControls = function(p_controls, p_panel)
    {
        if ($isArray(p_controls))
        {
        	$.each(p_controls, function(index, control){
        		me.addControl(control, p_panel)
        	});
        }
    };
    
    base.addControl = me.addControl;
    /**
     * 详见 {@link mx.containers.Container.addControl} 方法。
     * 
     * @param p_control
     *            一个 {@link mx.controls.Control} 对象。
     * @param [p_panel="middle"] 一个字符串，表示控件中哪个位置的面板（如“top”、“left”、“middle”、“right”、“bottom”）。
     * 
     * @param [p_islinebreak=true] 一个布尔值，表示添加控件时是否强制换行。
     */
    me.addControl = function(p_control, p_panel, p_islinebreak)
    {
        if (p_control == null) return;
        
        switch (p_panel)
        {
            case "top":
                me.$container = me.$panelTop;
                break;
            case "left":
                me.$container = me.$panelLeft;
                break;
            case "middle":
            	me.$container = me.$panelMiddle;
                break;
            case "right":
                me.$container = me.$panelRight;
                break;
            case "bottom":
                me.$container = me.$panelBottom;
                break;
            default:
            	me.$container = me.$panelMiddle;
        }

        // 如果第二个参数不传入面板位置，而是布尔值 true，则默认添加到中间面板，并且换行处理。
        if (p_panel == true)
        {
        	p_islinebreak = true;
        }
        
        if (me.$container != null)
        {
            base.addControl(p_control, p_islinebreak);
        }
    };
    
    /**
     * 向容器中添加内容。
     * @param $p_obj 一个 JQuery 对象，或一个控件（包含 $container 容器），或一个 HTML DOM 元素。
     * 
     * @param $p_obj
     *            一个 {@link mx.controls.Control} 对象。
     * @param [p_panel="middle"] 一个字符串，表示控件中哪个位置的面板（如“top”、“left”、“middle”、“right”、“bottom”）。
     */
    me.append = function($p_obj, p_panel)
    {
    	if ($p_obj == null) return;
    	
    	var $container = me.$panelMiddle;
    	switch (p_panel)
    	{
	    	case "top":
	    		$container = me.$panelTop;
	    		break;
	    	case "left":
	    		$container = me.$panelLeft;
	    		break;
	    	case "right":
	    		$container = me.$panelRight;
	    		break;
	    	case "bottom":
	    		$container = me.$panelBottom;
	    		break;
    	}
    	
        if ($container != null)
        {
            $container.append(me.$wrap($p_obj));
        }
    };
    
    /**
     * @param p_position
     *            一个字符串， 表示需要隐藏或显示的面板位置。
     * <p>
     * 该参数常见值包括:
     * <ul>
     *     <li> left （隐藏或显示左边面板）</li>
     *     <li> top  （隐藏或显示顶部面板）</li>
     *     <li> right （隐藏或显示右边面板，前提是中间区域分为了左、中、右三部分）</li>
     *     <li> bottom（隐藏或显示底部面板）</li>
     * </ul>
     * </p>   
     * 
     * @default "left"。
     */
    me.togglePanel = function(p_position)
    {
    	if ($isEmpty(p_position))
    	{
    		p_position = "left";
    	}
    	
    	switch(p_position.toLowerCase())
    	{
    		case "left":
    			if (me.leftPanelVisible)
	    			_vSplit.toggleExpanded();
	    		break;
    		case "top":
    			if (me.topPanelVisible)
	    			_hSplit.toggleExpanded();
	    		break;
    		case "right":
    			if (me.rightPanelVisible)
	    			_vSplitRight.toggleExpanded();
	    		break;
    		case "bottom":
    			if (me.bottomPanelVisible)
	    			_hSplitBottom.toggleExpanded();
	    		break;
    	}
    }
 	
    function _top_hSplit_resizing(e)
    {
    	var split = e.target, 
    		activePanelIndex = split.activePanelIndex,
    		panel1Height = split.$panel1.outerHeight(),
    		height,
    		bottomPanel2;
    	
    	if (activePanelIndex != 0 || $isEmpty(_hSplitBottom) || $isEmpty(me.$panelMiddle))
    	{
    		return;
    	}
    	
    	bottomPanel2 =  _hSplitBottom.$panel2;
    	split.threshold[1] =  me.$panelMiddle.outerHeight() + 10;
    	
    	if (split.$panel1.css("display") == "none" && _hSplitBottom.$panel2.css("display") == "none")
    	{
    		height =  _hSplitBottom.$panel1.height() - panel1Height;
    		_hSplitBottom.$panel1.height(height);
    		_hSplitBottom._$splitter.css("top", height);
    	}
    	else if (split.$panel1.css("display") != "none" && _hSplitBottom.$panel2.css("display") == "none")
    	{
    		height =  _hSplitBottom.$panel1.height() + panel1Height;
    		_hSplitBottom.$panel1.height(height);
    		_hSplitBottom._$splitter.css("top", height);
    	}
    }
   
    function _initHSplit()
    {
        _hSplit = new mx.containers.HSplit({
            rows:me.topPanelHeight + ",auto",
            resizable:me.topPanelResizable,
            borderThick: me.borderThick,            
            onresizing: _top_hSplit_resizing,
            owner:me
        });
        me.$panelTop = _hSplit.$panel1;
        
        if (me.bottomPanelVisible || me.leftPanelVisible || me.rightPanelVisible)
        {
	        _hSplit.$panel2.css({
	            border:"none",
	            padding:0
	        });
        }
    }
    
    function _initHSplitBottom()
    {
    	var height = me.middlePanelHeight;
        _hSplitBottom = new mx.containers.HSplit({
            rows:me.middlePanelHeight + ",auto",
            resizable:me.bottomPanelResizable,
            activePanelIndex:1,
            borderThick: me.borderThick,
            owner:me
        });
        
        if (me.leftPanelVisible || me.rightPanelVisible)
        {
        	_hSplitBottom.$panel1.css({
	            border:"none",
	            padding:0
        	});
        }
      
        me.$panelMiddle = _hSplitBottom.$panel1;
        me.$panelBottom = _hSplitBottom.$panel2;
    }
    
    function _initVSplit()
    {
        _vSplit = new mx.containers.VSplit({
            cols:me.leftPanelWidth + ",auto",
            resizable:me.leftPanelResizable,
            onresize:_vsplit_resize,
            borderThick: me.borderThick,
            onresizing: _vsplit_resizing,
            owner:me
            
        });
        
        
        if (me.rightPanelVisible)
        {
        	 _vSplit.$panel2.css({
	        	border: "none",
	        	padding: 0
        	});
        }
       
        me.$panelLeft = _vSplit.$panel1;

		if (!me.rightPanelVisible)
		{
			me.$panelMiddle = _vSplit.$panel2;
		}
    }
    
    function _initVSplitRight()
    {    
        var leftWidth = null;
        var width = me.middlePanelWidth;
        if ($isString(me.leftPanelWidth) && $isString(me.middlePanelWidth))
        {
            if (me.leftPanelVisible)
            {
                leftWidth = parseInt(me.leftPanelWidth.substr(0, me.leftPanelWidth.length - 1));
                width = parseInt(me.middlePanelWidth.substr(0, me.middlePanelWidth.length - 1));
                width = (width*100/(100 - leftWidth)) + "%";
            }
        }

        _vSplitRight = new mx.containers.VSplit({
            cols:width + ", auto",
            resizable:me.rightPanelResizable,
            activePanelIndex:1,
            borderThick: me.borderThick,
            owner:me
        });        
        me.$panelMiddle = _vSplitRight.$panel1;
        me.$panelRight = _vSplitRight.$panel2;
    }
    
    function _vsplit_resize(p_args)
    {
        if (_vSplitRight != null)
        {
            if (!_vSplitRight.expanded)
            {
                _vSplitRight.$panel1.css("width", p_args.panel2.width - _splitterWidthOrHeight);
            }
            else
            {
            	if(_vSplit.expanded)
            	{
            		var panel1 =  _vSplitRight.$panel1;
            		var width = me.middlePanelWidth;
            		if ($isString(me.leftPanelWidth) && $isString(me.middlePanelWidth))
                    {
            			var leftWidth = parseInt(me.leftPanelWidth.substr(0, me.leftPanelWidth.length - 1));
                        width = parseInt(me.middlePanelWidth.substr(0, me.middlePanelWidth.length - 1));
                        width = (width*100/(100 - leftWidth)) + "%";
                    }
            		panel1.animate({ width:width }, 100);
            	} 
            }
        }
    }
    
    function _vsplit_resizing(e)
    {
    	var split = e.target;
		if ($notEmpty(_vSplitRight))
		{
			split.threshold[1] =  _vSplitRight.$panel1.outerWidth() + 10;
		}
    }
        
    function _init()
    {
        if (me.topPanelVisible && me.bottomPanelVisible)
        {
            _initHSplit();
            _initHSplitBottom();
            _hSplit.addControl(_hSplitBottom, 1);
        }
        else if (me.topPanelVisible && !me.bottomPanelVisible)
        {
            _initHSplit();
        }
        else if (!me.topPanelVisible && me.bottomPanelVisible)
        {
            _initHSplitBottom();
        }
 
        if (me.leftPanelVisible && me.rightPanelVisible)
        {
            _initVSplit();
            _initVSplitRight();
            _vSplit.addControl(_vSplitRight, 1);
            _addVSplit();
        }
        else if (me.leftPanelVisible && !me.rightPanelVisible)
        {
            _initVSplit();
            _addVSplit();
        }
        else if (!me.leftPanelVisible && me.rightPanelVisible)
        {
            _initVSplitRight();
            _addVSplitRight();
        }
        
        
        
        if (_hSplit != null)
        {
            base.addControl(_hSplit);
        }
        else if (_hSplitBottom != null)
        {
            base.addControl(_hSplitBottom);
        }
        else if (_vSplit != null) 
        {
            base.addControl(_vSplit);
        }
        else if (_vSplitRight != null)
        {
            base.addControl(_vSplitRight);
        }
    }
    
    function _addVSplit()
    {
        if (_hSplitBottom != null)
        {
            _hSplitBottom.addControl(_vSplit);
        }
        else if (_hSplit != null)
        {
            _hSplit.addControl(_vSplit, 1);
        }
    }
    
    function _addVSplitRight()
    {
        if (_vSplit != null)
        {
            _vSplit.addControl(_vSplitRight, 1);
        }
        else　if (_hSplitBottom != null)
        {
            _hSplitBottom.addControl(_vSplitRight);
        }
        else if (_hSplit != null)
        {
            _hSplit.addControl(_vSplitRight, 1);
        }
    }
    
    /**
     * @ignore
     * 
     * 获取内部第一层水平分割对象。
     */
    me.getInnerHSplit = function()
    {
    	return _hSplit;
    };
    
    /**
     * @ignore
     * 获取内部第二层水平分割对象。
     */
    me.getInnerHSplitBottom = function()
    {
    	return _hSplitBottom;
    };
    
    /**
     * @ignore
     * 获取内部第一层垂直分割对象。
     */
    me.getInnerVSplit = function()
    {
    	return _vSplit;
    };
    
    /**
     * @ignore
     * 获取内部第二层垂直分割对象。
     */
    me.getInnerVSplitRight = function()
    {
    	return _vSplitRight;
    };
    
    /**
     * 重设控件的大小。
     * 
     * {@exclude mx.controls.UploadControl}
     * {@exclude mx.controls.Slider}
     * {@exclude mx.datacontrols.ScrollBar}
     * 
     * @param p_width
     *            控件的宽度，可以是数字（如 100），也可以是字符串（如 “100%”）。
     * @param p_height
     *            控件的高度，可以是数字（如 100），也可以是字符串（如 “100%”）。
     */
    me.resizeTo = function(p_width, p_height)
    {
        me.setWidth(p_width);
        me.setHeight(p_height);
        var intHeight = parseInt(p_height);
        if(me.$panelTop != null){
        	me.$panelTop.height(intHeight*0.2);
        	me.$e.find(".splitter").eq(0).css("top",intHeight*0.2);
        	if(_hSplitBottom != null){
        		_hSplitBottom.$e.parent().css("top",intHeight*0.2);
        		_hSplitBottom.$panel1.height((intHeight-me.topPanelHeight)*0.8);
                _hSplitBottom._$splitter.css("top",(intHeight-me.topPanelHeight)*0.8);
                _hSplitBottom.$panel2.css("top",(intHeight-me.topPanelHeight)*0.8);
        	}else{
        		me.$e.find("#hPanel2.panel2").css("top",intHeight*0.2);
        	}
        }else{
        	if(_hSplitBottom != null){
        		 _hSplitBottom.$panel1.height(intHeight*0.8);
        		 _hSplitBottom._$splitter.css("top",intHeight*0.8);
        	     _hSplitBottom.$panel2.css("top",intHeight*0.8);
        	}
        
        }
    };
    
    /**
     * 获取一个 Boolean值，表示所有面板里面是否可拖动并改变大小。
     * @param p_enabled
     * 			一个Boolean值 true 或 false
     * @default  true
     */
    me.setEnabled = function(p_enabled){
    	me.enabled = p_enabled;
    	if(!p_enabled){
    		me.$e.find("div.splitter").css('visibility', 'hidden');
    	}else{
    		me.$e.find("div.splitter").css('visibility', 'visible');
    	}
    	
    };
    
    me.endOfClass(arguments);
    return me;
};
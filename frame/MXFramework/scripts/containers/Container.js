$ns("mx.containers");

$import("mx.layouts.LayoutFactory");
$import("mx.controls.ContextMenu");

/**
 * 表示 MX 框架中所有容器控件的基类。 在 MX 框架中窗体、选项卡、分割控件等均为容器。 通常组件包含一个控件集合；集合中的单个控件也可能是一个容器。
 * 
 * @abstract  
 */
mx.containers.Container = function()
{
    var me = $extend(mx.controls.Control);
    var base = {};

    /**
     * 详见 {@link mx.controls.Control.position} 属性。
     * 
     * @default relative
     */
    me.position = "relative";

    /**
     * 获取容器的宽度。可以是数字（如 500）、字符串（如“500px”或“50%”）。
     * 
     * @default auto
     */
    me.width = "auto";

    /**
     * 获取容器的高度。可以是数字（如 500）、字符串（如“500px”或“50%”）。
     * 
     * @default 100%
     */
    me.height = "100%";
    
    /**
     * 获取或设置容器的上下文菜单。
     * {@exclude mx.containers.Accordion}
     * 
     * @default null
     */
    me.contextMenu = null;
    
    /**
     * 获取容器包含的控件集合。集合中的单个控件也可能是一个容器。请使用 {@link addControl} 和
     * {@link removeControl} 方法向集合中添加或移除控件。
     * 
     * @item mx.controls.Control
     * @index 控件在集合中的序号（从 0 开始计数）。
     */
    me.controls = [];

    /**
     * 获取容器控件中用来包含控件 DOM 元素的占位符。
     */
    me.$container = null;
	
    /**
     * 获取和设置一个容器控件的布局器。
     * {@exclude mx.windows.Window}
     * {@exclude mx.containers.Accordion}
     * {@exclude mx.containers.DockPanelPort}
     * {@exclude mx.containers.DockPanel}
     * {@exclude mx.containers.DockPage}
     * {@exclude mx.containers.Split}
     * 
     * 
     * 该字段可选的值包括：
     * <ul>
     *     <li>{@link mx.layouts.AbsoluteLayout}</li>
     *     <li>{@link mx.layouts.AnchorLayout}</li>
     * </ul>
     *
     * @example
     * 下面是一个绝对定位布局的容器添加控件的示例：
     * <code language="JavaScript">
     * var container = new mx.containers.Container({
     *     layout: "mx.layouts.AbsoluteLayout"
     * });
     * var textEditor = new mx.editors.TextEditor({
     *     layoutConfigs: {
     *        left: 100,
     *        top: 50
     *     }
     * });
     * container.addControl(textEditor);
     * </code>
     * 
     * @example
     * 下面是一个锚定布局的容器添加控件的示例：
     * <code language="JavaScript">
     * var container = new mx.containers.Container({
     *     layout: "mx.layouts.AnchorLayout"
     * });
     * 
     * var textEditor1 = new mx.editors.TextEditor({
     *     id: "editor1",
     *     layoutConfigs: {
     *        left: "100",
     *        top: 50
     *     }
     * });
     * container.addControl(textEditor1);
     * var textEditor2 = new mx.editors.TextEditor({
     *     id: "editor2",
     *     layoutConfigs: {
     *        left: "editor1, 100px",//坐标值以逗号分隔，逗号之前是锚定对象的 id ，逗号之后表示相对于锚定对象的偏移。
     *        top: 50,//如果不设置锚定对象，则以当前父容器为锚定对象。
     *        bottom: "editor1, 100px"
     *     }
     * });
     * container.addControl(textEditor2);
     * </code>
     */
    me.layout = null;

    /**
     * 获取和设置布局参数，该属性是一个 JSON 对象。
     * {@exclude mx.containers.Split}
     * {@exclude mx.windows.Window}
     * {@exclude mx.containers.Accordion}
     * {@exclude mx.containers.DockPanelPort}
     * {@exclude mx.containers.DockPanel}
     * {@exclude mx.containers.DockPage}
     * {@exclude mx.containers.Panel}
     * {@exclude mx.containers.PanelLayout}
     * {@exclude mx.containers.TabControl}
     * {@exclude mx.containers.TabPage}
     * {@exclude mx.containers.WizardStep}
     * 
     * @default null
     */
    me.layoutOptions = null;

    
    /**
     * 当添加控件到容器后，将触发该事件。
     * 
     * @param ctrl 一个 {@link mx.controls.Control} 类型或子类型对象。
     */
    me.onctrladded = null;
    
    /**
     * 当从容器移除控件后，将触发该事件。
     * 
     * @param ctrl 一个 {@link mx.controls.Control} 类型或子类型对象。
     */
    me.onctrlremoved = null;

    /**
     * 在弹出上下之前执行
     * 传入执行方法中参数为 {cancel:false,event:e};  cancel如果为true会中断默认逻辑的执行，event为事件参数
     */
    me.oncontextmenu = null;
    /**
     * 初始化方法。执行设置样式并初始化属性等操作。
     */
    base.init = me.init;
    me.init = function()
    {
        base.init();
        me.$e.addClass("container");
        if (me.$container == null)
        {
            me.$container = me.$e;
        }
        if (me.controls.length > 0)
        {
        	var controls = me.controls;
        	me.controls = [];
        	for (var i = 0; i < controls.length; i++)
        	{
        		me.addControl(controls[i]);
        	}
        }
        if (me.padding != null)
        {
        	me.setPadding(me.padding);
        }
        
        me.$e.on("contextmenu", _container_contextmenu);
        if ($notEmpty(me.layout))
        {
        	me.layout = mx.layouts.LayoutFactory.createLayout(me.layout, $.extend({owner: me}, me.layoutOptions));
        }
    };
	
    /**
     * 设置控件的内边距。
     * {@excude mx.containers.Wizard}
     * 
     * @param p_padding
     *            css 样式的 padding 属性。
     */
    me.setPadding = function(p_padding)
    {
        if (typeof (p_padding) != "undefined" && me.$container != null)
        {
            me.padding = p_padding;
            me.$container.css("padding", p_padding);
        }
    };

    /**
     * 将 {@link mx.controls.Control} 对象添加到集合 {@link controls} 中。
     * {@exclude mx.containers.TabControl}
     * 
     * @param p_control
     *            一个 {@link mx.controls.Control} 对象。
     * @param p_islinebreak
     * 			  一个布尔值，表示添加新控件时是否先换行。
     */
    me.addControl = function(p_control, p_islinebreak)
    {
        if (p_control != null)
        {
        	if ($.isPlainObject(p_control))
        	{
            	p_control = _createControl(p_control);	
            }

			if ($notEmpty(p_control))
			{
				 //added by tiger on 2014/6/25 20:17:56,适用于对象被添加多次的情形

                var po = p_control.parent;

                if(po){
                         po.controls.remove(p_control);
                         if(p_control.id){
                        	 delete po[p_control.id];
                        }
                }

                //end add

				p_control.parent = me;

				if (p_islinebreak === true)
				{
					if($.isIE67())
					{
						//样式中加入：overflow:hidden;。否则ie6下对div显示最小高度为字体高度12像素。
						me.$container.append("<div style='clear:both;height:1px;width:0px;overflow:hidden;'></div>");
					}
					else
					{
					   me.$container.append("<br/>");
					}
					
				}
				
				me.controls.add(p_control);
				if (me.$container != null)
					me.$container.append(p_control.$e);

				if ($notEmpty(p_control.id))
				{
					if ($isNumber(p_control.id))
					{
						p_control.id = p_control.id.toString();
					}
					
					//added by tiger on 2014/6/25 20:28:56,原来有父容器,且名字在新父容器中存在，
                    //为避免id重名，id换为新值
                    if(po){
                    	if(me.controls[p_control.id]){
                    		p_control.id = "childControl_" + (me.controls.length - 1);
                    	}
                    }
                    //end add

				}
				else
				{
					p_control.id = "childControl_" + (me.controls.length - 1);
				}
				
				me.controls[p_control.id] = p_control;
				
				me.trigger("ctrladded", {ctrl: p_control});
			}
        }
    };

    /**
     * 将一组 {@link mx.controls.Control} 对象添加到集合 {@link controls} 中。
     * {@exclude mx.containers.TabControl}
     * 
     * @param p_controls
     *            一个 {@link mx.controls.Control} 控件数组。
     */
    me.addControls = function(p_controls)
    {
        if ($.isArray(p_controls))
        {
        	for (var i = 0; i < p_controls.length; i++) {
				me.addControl(p_controls[i]);	
        	}
        }
    };

    
    /**
     * 根据指定的控件属性及属性值查找当前视图中对应的控件。
     * 如果仅传入一个参数，则默认将该参数作为别名的值进行查找。
     * 
     * @overload function(p_alias)
     * @param p_alias 一个字符串，表示控件的别名。
     * 
     * @overload function(p_attrName, p_attrValue)
     *
     * @param p_attrName 一个字符串，表示控件的属性名。
     * @param p_attrValue 一个字符串，表示控件的属性值。
     * 
     * {@exclude mx.datacontrols.DynamicForm}
     */
    me.findControl = function(p_alias)
    {
    	if (arguments.length == 0)
    	{
    		return null;
    	}
    	else if  (arguments.length == 1)
    	{
    		var $control = me.$e.find("[alias=" + p_alias + "]");
	        if ($control.length > 0)
	        {
	            return $control.data("control");
	        }
	        else
	        {
	            return null;
	        }	
    	}
        else if  (arguments.length == 2)
    	{
    		var $control = me.$e.find("[" + arguments[0] + "=" + arguments[1] + "]");
	        if ($control.length > 0)
	        {
	            return $control.data("control");
	        }
	        else
	        {
	            return null;
	        }	
    	}
    };
    
    /**
     * 根据指定的权限标识查找当前视图中对应的控件。
     * 
     * @param p_permissionID 一个字符串，表示控件的权限标识。
     */
    me.findControlByPermissionID = function(p_permissionID)
    {
    	return me.findControl("permissionID", p_permissionID);
    };
    
    /**
     * 向容器中添加内容。
     * {@exclude mx.containers.TabControl}
     * @param $p_obj 一个 JQuery 对象，或一个控件（包含 $container 容器），或一个 HTML DOM 元素。
     */
    me.append = function($p_obj)
    {
        me.$container.append(me.$wrap($p_obj));
    };

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
            if (me.controls.remove(p_control))
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
     * 容器的dispose方法
     * 
     */
    base.dispose = me.dispose; 
    me.dispose = function(){
	    var cs = me.controls;
		
		//1.除去子控件
		if(cs && cs.length>0){
			for(var i = cs.length-1;i>=0;i--){        		
				var c = cs[i];				
				/*if(c && c.controls && c.controls.length>0){
					//从容器中删除对控件的引用
					cs.splice(i,1); 
					delete me.controls[c.id];
									
					//控件的销毁    		
					c.dispose(true);
				}else{
					me.removeControl(c, true);
				}*/			   	
				delete me.controls[c.id];
				if(c.dispose != undefined){
					c.dispose(true);
				}
				c = null;
			}
		}
			
    	
 		//2.销毁容器自身 		
 		if(me.$container){
			me.$container.off();
			me.$container.unbind();
 			me.$container.empty().remove();
 		}
		base.dispose();
    }
    
    /**
     * 容器的dispose方法
     */
    //added by tiger on 20140416
    me.clear = function(){
	    var cs = me.controls;
    	for(var i = cs.length-1; i>=0; i--){        		
    		var c = cs[i];       		

    		if(c.controls && c.controls.length>0){
    			c.dispose();
    		}else{
    			me.removeControl(c, true);
    		}
    	}
    }    
    
    /**
     * 根据控件的构造参数实例化需要添加的控件。
     * 
     * @param p_options 控件的构造参数
     */
    function _createControl(p_options)
    {
    	var control = null;
    	
    	if ($.isPlainObject(p_options))
    	{
    		// 当控件参数  ctype 或者 ctrltype 设置为控件类名时，创建相应的控件类实例。
    		var cType = p_options.ctype || p_options.ctrltype;
    		var T = eval('('+p_options.cType+')');
    		
    		if ($isFunction(T))
    		{
    			control = new T(p_options);
    		}
    	}
    	
    	return control;
    }
    
    /**
     * 弹出容器的右键菜单。
     */
    function _container_contextmenu(e)
    {
    	var arg = {cancel:false,event:e};
    	me.trigger("contextmenu",arg);
    	if(arg.cancel)
    	{
    	    return false;
    	}

    	if (me.contextMenu != null)
        {
        	if($instanceOf(me.contextMenu,mx.controls.ContextMenu))
        	{
        	    me.contextMenu.show(e.clientX, e.clientY);
                return false;
        	}
            else if($.isPlainObject(me.contextMenu))
            {
                me.contextMenu = new  mx.controls.ContextMenu(me.contextMenu);
                me.contextMenu.show(e.clientX, e.clientY);
                return false;
            }
        }
    	
    	var parent = e.target.parentNode;
        var mxobject, enableBrowserContextMenu;
        while (parent != null)
        {
            mxobject = $(parent).data("control");
            if (typeof mxobject != "undefined" && mxobject.enableBrowserContextMenu === true)
            {
                enableBrowserContextMenu = mxobject.enableBrowserContextMenu;
                break;
            }
            parent = parent.parentNode;
        }

        //这个逻辑是为了阻止在容器里弹出浏览器默认的上下文菜单
	    if (!enableBrowserContextMenu && $isString(e.target.className) && (e.target.tagName != "EMBED")
	    		&& (e.target.tagName != "OBJECT")&& e.target.className.indexOf("container") == -1)
		{
			return false;
		}  
    }

    me.endOfClass(arguments); 
    return me;
};
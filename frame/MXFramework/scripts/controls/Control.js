$ns("mx.controls");

/**
 * 表示 MX 框架中所有控件的基类，它继承于 {@link MXComponent} 类。框架中控件包含有基础控件、容器控件、编辑器控件、数据控件等。
 * 
 * @abstract 
 */
mx.controls.Control = function()
{
    var me = $extend(MXComponent);
    /**
     * 设置一个 JSON，保存父类的引用。
     */
    var base = {};

    /**
     * 获取或设置一个字符串，表示控件的别名。
     */
    me.alias = null;
    
    /**
     * 获取或设置一个字符串，表示控件的权限标识。
     */
    me.permissionID = null;
    
    /**
     * 获取控件所属的父对象。
     */
    me.parent = null;

    /**
     * 获取控件的显示样式值。如“none”，表示隐藏控件；
     * “block”表示强制作为块对象呈递。请使用 {@link setDisplay}方法设置该字段的值。
     * {@exclude mx.datacontrols.ComplexGrid}
     * {@exclude mx.windows.Window}
     * {@exclude mx.windows.WizardWindow}
     * {@exclude mx.windows.AjaxWindow}
     * {@exclude mx.windows.IFrameWindow}
     * 
     */
    me.display = "";

    /**
     * 获取控件位置样式值。请使用 {@link setPosition} 方法设置该字段的值。 
     * <p>
     * 该字段的可选值包括:
     * <ul>
     * <li>relative</li>
     * <li>absolute</li>
     * </ul>
     * </p>
     */
    me.position = null;

    /**
     * 获取控件的左边界与父容器左边界的像素距离。请使用 {@link setLeft} 方法设置该字段的值。
     * 
     * {@exclude mx.datacontrols.ComplexForm}
     * {@exclude mx.datacontrols.DataGridSearchBox}
     * {@exclude mx.datacontrols.DynamicForm}
     * {@exclude mx.datacontrols.SkinDataForm}
     * 
     */
    me.left = null;

    /**
     * 获取控件的右边界与父容器右边界的像素距离。请使用 {@link setRight} 方法设置该字段的值。
     * {@exclude mx.windows.Window}
     * {@exclude mx.datacontrols.ComplexForm}
     * {@exclude mx.datacontrols.DataGridSearchBox}
     * {@exclude mx.datacontrols.DynamicForm}
     * {@exclude mx.datacontrols.SkinDataForm}
     */
    me.right = null;

    /**
     * 获取控件的上边界与父容器上边界的像素距离。请使用 {@link setTop} 方法设置该字段的值。
     * 
     * {@exclude mx.datacontrols.ComplexForm}
     * {@exclude mx.datacontrols.DataGridSearchBox}
     * {@exclude mx.datacontrols.DynamicForm}
     * {@exclude mx.datacontrols.SkinDataForm}
     */
    me.top = null;

    /**
     * 获取控件的下边界与父容器下边界的像素距离。请使用 {@link setBottom} 方法设置该字段的值。
     * {@exclude mx.windows.Window}
     * {@exclude mx.datacontrols.ComplexForm}
     * {@exclude mx.datacontrols.DataGridSearchBox}
     * {@exclude mx.datacontrols.DynamicForm}
     * {@exclude mx.datacontrols.SkinDataForm}
     */
    me.bottom = null;

    /**
     * 获取控件的宽度。可以是数字（如 500）、字符串（如“500px”或“50%”）。请使用 {@link setWidth} 方法设置该字段的值。
     */
    me.width = null;

    /**
     * {@exclude mx.controls.Slider} 
     * 
     * 获取控件的高度。可以是数字（如 500）、字符串（如“500px”）。请使用 {@link setHeight} 方法设置该字段的值。
     */
    me.height = null;

    /**
     * 获取控件是否可以对用户交互作出响应。如果该值为 true，则表示控件可以对用户交互作出响应；反之则不能。
     * 请使用 {@link setEnabled} 方法设置该字段的值。
     * 
     * {@exclude mx.datacontrols.DataGridSearchBox} 
     * 
     * @default true
     */
    me.enabled = true;
    
    /**
     * 获取一个 Boolean 值，表示控件是否可见。如果该值为 true，则表示控件可见；反之则不可见。请使用 {@link setVisible}
     * 方法设置该字段的值。
     * 
     * {@exclude mx.windows.Window}
     * 
     * @default true
     */
    me.visible = true;

    /**
     * 获取控件的边框样式。如“1px solid red”，表示边框的样式为 1 像素红色的实线。请使用 {@link setBorder}
     * 方法设置该字段的值。
     */
    me.border = null;

    /**
     * 获取控件的内边距。如“4px”表示上下左右的内边距均为 4 像素； “4px 2px 3px 1px”则表示上边距为 4 像素，右边距为 2
     * 像素，下边距为 3 像素，左边距为 1 像素。请使用 {@link setPadding} 方法设置该字段的值。
     * 
     * {@exclude mx.controls.Slider}
     * {@exclude mx.editors.CustomEditor}
     * {@exclude mx.controls.ToolStrip}
     * {@exclude mx.datacontrols.ComplexForm}
     * {@exclude mx.datacontrols.ComplexGrid}
     * {@exclude mx.datacontrols.GroupHeaderGrid}
     * {@exclude mx.datacontrols.GroupItemGrid}
     * {@exclude mx.datacontrols.GroupLockHeaderGrid}
     * {@exclude mx.datacontrols.LockHeaderGrid}
     * {@exclude mx.datacontrols.DataGrid}
     * {@exclude mx.datacontrols.DataForm}
     * {@exclude mx.datacontrols.DataTree}
     * {@exclude mx.datacontrols.ScrollLoadGrid}
     * {@exclude mx.datacontrols.SkinDataForm}
     * {@exclude mx.editors.FileEditor}
     * {@exclude mx.editors.TimeEditor}
     */
    me.padding = null;

    /**
     * @ignore
     * 设置控件的 CSS 样式。该值为一个 JSON 对象，如 { color:"red", background-color:"blue", padding:"8px" }。
     */
    me.css = null;
    
    /**
     * 指定css伪类名称，设置控件显示样式
     */
    me.cssClass = null;
    
    /**
     * 获取控件的标签。
     * 
     * @default <div/>
     */
    me.eTag = "<div/>";

    /**
     * 获取该控件的占位符，该占位符为一个 JQuery 对象。
     */
    me.$e = null;
    
    /**
     * 获取或初始化设置是否允许浏览器默认的上下文菜单。
     * {@exclude mx.controls.ToolStrip}
     */
    me.enableBrowserContextMenu = false;

    /**
     * 获取或者设置一个 JSON 对象，该属性表示控件在父容器中的布局配置参数。该属性只有在控件父容器运用布局器才会生效。
     * {@exclude mx.windows.Window}
     */
    me.layoutConfigs = null;

    base.init = me.init;
    me.init = function()
    {
        base.init();

        if (me.$e == null)
        {
            me.$e = $(me.eTag);
        }

        if (me.id != null)
        {
            me.$e.attr("id", me.id);
        }

        if (me.alias != null)
        {
            me.$e.attr("alias", me.alias);
        }
        
        if (me.permissionID != null)
        {
        	me.$e.attr("permissionID", me.permissionID);
        }
        
        me.$e.data("control", me);

        if (me.display != null)
        {
            me.setDisplay(me.display);
        }
        if (me.position != null)
        {
            me.setPosition(me.position);
        }
        if (me.left != null)
        {
            me.setLeft(me.left);
        }
        if (me.right != null)
        {
            me.setRight(me.right);
        }
        if (me.top != null)
        {
            me.setTop(me.top);
        }
        if (me.bottom != null)
        {
            me.setBottom(me.bottom);
        }
        if (me.width != null)
        {
            me.setWidth(me.width);
        }
        if (me.height != null)
        {
            me.setHeight(me.height);
        }
        if (me.border != null)
        {
            me.setBorder(me.border);
        }
        if (me.padding != null)
        {
            me.setPadding(me.padding);
        }
        if (me.css != null)
        {
            me.setCss(me.css);
        }
        if(me.cssClass != null){
        	me.setCssClass(me.cssClass);
        }
        if (me.visible === false)
        {
            me.hide();
        }
        if (me.enabled === false)
        {
            me.setEnabled(me.enabled);
        }
    };

    var _context = null;
    
    /**
     * 获取控件当前所属 {@link mx.weblets.Weblet} 的上下文信息（ {@link mx.weblets.WebletContext} 类型）。
     */
    me.getContext = function()
    {
        if (_context == null)
        {
            var parent = me;
            while (parent != null)
            {
                if ($instanceOf(parent, mx.views.ViewPort))
                {
                    _context = parent.context;
                    break;
                }
                parent = parent.parent;
            }
        }
        return _context;
    };

    /**
     * 设置 {@link display} 字段的值。
     * 
     * {@exclude mx.controls.ErrorBox}
     * {@exclude mx.datacontrols.ComplexGrid}
     * {@exclude mx.windows.Window}
     * {@exclude mx.windows.WizardWindow}
     * {@exclude mx.windows.AjaxWindow}
     * {@exclude mx.windows.IFrameWindow}
     * 
     * @param p_display
     *            css 样式的 display 属性。
     */
    me.setDisplay = function(p_display)
    {
        if (typeof (p_display) != "undefined")
        {
            me.display = p_display;
            me.$e.css("display", me.display);
        }
    };

    /**
     * 设置 {@link position} 字段的值。
     * 
     * {@exclude mx.controls.ErrorBox}
     * {@exclude mx.windows.Window}
     * {@exclude mx.windows.WizardWindow}
     * {@exclude mx.windows.AjaxWindow}
     * {@exclude mx.windows.IFrameWindow}
     * 
     * 
     * @param p_position
     *            一个字符串，表示 css 样式的 position 属性。
     */
    me.setPosition = function(p_position)
    {
        if (typeof (p_position) != "undefined")
        {
            me.position = p_position;
            me.$e.css("position", me.position);
        }
    };

    /**
     * 设置 {@link left} 字段的值。
     * 
     * @param p_left
     *            控件的左边界与父容器左边界的像素距离，可以是数字（如 50），也可以是字符串（如 50%）。
     *            
     * {@exclude mx.datacontrols.ComplexForm}
     * {@exclude mx.datacontrols.DataGridSearchBox}
     * {@exclude mx.datacontrols.DynamicForm}
     * {@exclude mx.datacontrols.SkinDataForm}
     */
    me.setLeft = function(p_left)
    {
        if (typeof (p_left) != "undefined")
        {
            me.left = p_left;
            me.$e.css("left", me.left);
        }
    };

    /**
     * 设置 {@link right} 字段的值。
     * 
     * {@exclude mx.windows.Window}
     * {@exclude mx.datacontrols.ComplexForm}
     * {@exclude mx.datacontrols.DataGridSearchBox}
     * {@exclude mx.datacontrols.DynamicForm}
     * {@exclude mx.datacontrols.SkinDataForm}
     * 
     * @param p_right
     *             控件的右边界与父容器右边界的像素距离，可以是数字（如 50），也可以是字符串（如 50%）。
     */
    me.setRight = function(p_right)
    {
        if (typeof (p_right) != "undefined")
        {
            me.right = p_right;
            me.$e.css("right", me.right);
        }
    };

    /**
     * 设置 {@link top} 字段的值。
     * 
     * @param p_top
     *             控件的上边界与父容器上边界的像素距离，可以是数字（如 50），也可以是字符串（如 50%）。
     *             
     * {@exclude mx.datacontrols.ComplexForm}
     * {@exclude mx.datacontrols.DataGridSearchBox}
     * {@exclude mx.datacontrols.DynamicForm}
     * {@exclude mx.datacontrols.SkinDataForm}
     * 
     */
    me.setTop = function(p_top)
    {
        if (typeof (p_top) != "undefined")
        {
            me.top = p_top;
            me.$e.css("top", me.top);
        }
    };

    /**
     * 设置 {@link bottom} 字段的值。
     * {@exclude mx.windows.Window}
     * {@exclude mx.datacontrols.ComplexForm}
     * {@exclude mx.datacontrols.DataGridSearchBox}
     * {@exclude mx.datacontrols.DynamicForm}
     * 
     * @param p_bottom
     *             控件的下边界与父容器下边界的像素距离，可以是数字（如 50），也可以是字符串（如 50%）。
     */
    me.setBottom = function(p_bottom)
    {
        if (typeof (p_bottom) != "undefined")
        {
            me.bottom = p_bottom;
            me.$e.css("bottom", me.bottom);
        }
    };

    /**
     * 设置 {@link width} 字段的值。
     * 
     * {@exclude mx.controls.UploadControl}
     * 
     * 
     * @param p_width
     *            控件的高度,可以是数字（如 500）、字符串（如“500px”或“50%”）.
     */
    me.setWidth = function(p_width)
    {
        if (typeof (p_width) != "undefined" && me.$e)
        {
            me.width = p_width;
            me.$e.css("width", me.width);
        }
    };

    /**
     *  {@exclude mx.controls.Slider}
     *  {@exclude mx.editors.TextEditor}
     *  
     * 设置 {@link height} 字段的值。
     * 注：子类{@link mx.controls.UploadControl}上传控件不支持百分比设置高度
     * 
     * @param p_height
     *            控件的高度，可以是数字（如 100），也可以是字符串（如 “100%”）。
     */
    me.setHeight = function(p_height)
    {
        if (typeof (p_height) != "undefined" && me.$e)
        {
            me.height = p_height;
            me.$e.css("height", me.height);
        }
    };

    /**
     * 设置 {@link css} 字段的值。
     * 
     * @param p_css 一个 JSON 对象，表示控件的 CSS 样式。
     * 
     * {@exclude mx.datacontrols.ScrollBar}
     * 
     */
    me.setCss = function(p_css)
    {
        me.css = p_css;
        me.$e.css(p_css);
    };
    
    /**
     * 设置 {@link cssClass} 字段的值
     * 
     * @param p_cssClass 一个String 对象，样式classname
     * 
     * {@exclude mx.datacontrols.ScrollBar}
     */
    me.setCssClass = function(p_cssClass){
    	me.cssClass = p_cssClass;
    	me.$e.addClass(p_cssClass);
    }
    
    /**
     * 设置 {@link enabled} 字段的值。
     * 
     * {@exclude mx.controls.ErrorBox}
     * {@exclude mx.datacontrols.DataGridSearchBox}
     */
    me.setEnabled = function(p_enabled)
    {          
        if (typeof (p_enabled) != "undefined")
        {
            me.enabled = p_enabled;
            me.$e.toggleClass("disabled", !p_enabled);    
            me.$e.attr("disabled", !p_enabled);
        }
    };
    
    /**
     * 设置 {@link visible} 字段的值。
     * 
     * {@exclude mx.controls.ErrorBox}
     * {@exclude mx.windows.Window}
     * 
     * @param p_visible
     *            一个 Boolean 值，表示控件是否可见。
     */
    me.setVisible = function(p_visible)
    {
        if (typeof (p_visible) != "undefined" && me.$e)
        {
            me.visible = p_visible;
            if(me.visible){
                me.$e.show();
            }else{
            	me.$e.hide();
            }
        }
    };

    /**
     * 设置控件的内边距。
     * 
     * {@exclude mx.controls.Slider}
     * {@exclude mx.editors.CustomEditor}
     * {@exclude mx.editors.TextEditor}
     * {@exclude mx.controls.ToolStrip}
     * {@exclude mx.datacontrols.ComplexForm}
     * {@exclude mx.datacontrols.ComplexGrid}
     * {@exclude mx.datacontrols.GroupHeaderGrid}
     * {@exclude mx.datacontrols.GroupItemGrid}
     * {@exclude mx.datacontrols.GroupLockHeaderGrid}
     * {@exclude mx.datacontrols.LockHeaderGrid}
     * {@exclude mx.datacontrols.DataGrid}
     * {@exclude mx.datacontrols.DataForm}
     * {@exclude mx.datacontrols.DataTree}
     * {@exclude mx.datacontrols.ScrollLoadGrid}
     * {@exclude mx.datacontrols.SkinDataForm}
     * {@exclude mx.editors.FileEditor}
     * 
     * @param p_padding
     *            一个字符串，表示css样式的 padding 属性。
     */
    me.setPadding = function(p_padding)
    {
        if (typeof (p_padding) != "undefined")
        {
            me.padding = p_padding;
            me.$e.css("padding", p_padding);
        }
    };

    /**
     * 设置控件的边框样式。
     * {@exclude mx.editors.TextEditor}
     * @param p_border
     *            一个字符串，表示css样式的 border 属性。
     */
    me.setBorder = function(p_border)
    {
        if (typeof (p_border) != "undefined")
        {
            me.border = p_border;
            me.$e.css("border", p_border);
        }
    };

    /**
     * 返回一个 Boolean 值，该值表示控件的容器中是否包含该 JQuery 对象。
     * 
     * @param $p_target 一个 JQuery 对象，或 JQuery 选择器对应的字符串（如“#container”），或 HTML DOM 元素。
     */
    me.contains = function($p_target)
    {
    	try
        {
        	var $target = me.$wrap($p_target);
        }catch(e)
        {
        	return false;
        }
        return $.contains(me.$e.get(0), $target.get(0));
    };
    
    /**
     * 显示控件，设置控件可见。
     * 
     * {@exclude mx.windows.Window}
     */
    me.show = function()
    {
        me.setVisible(true);
    };

    /**
     * 隐藏控件，设置控件不可见。
     * 
     * {@exclude mx.windows.Window}
     */
    me.hide = function()
    {
        me.setVisible(false);
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
    };

    /**
     * 移动控件到指定位置。
     * 
     * {@exclude mx.controls.ErrorBox}
     * 
     * @param p_left
     *            一个数字，表示 css 样式的 left 属性。
     * @param p_top
     *            一个数字，表示 css 样式的 top 属性。
     */
    me.moveTo = function(p_left, p_top)
    {
        if (typeof (p_left) != "undefined")
        {
            me.setLeft(p_left);
        }
        if (typeof (p_top) != "undefined")
        {
            me.setTop(p_top);
        }
    };
    
    /**
     * 获取控件容器对应的 HTML DOM 元素对象。
     */
    me.getEl = function()
    {
    	if ((null != me.$e) && (me.$e instanceof jQuery))
    	{
    		return me.$e.get(0);
    	}
    	
    	return null;
    }
    
    /**
     * 该方法与 me.$e.find(p_expression) 等同。
     */
    me.$ = function(p_expression)
    {
        var result = null;
        if (me.$e != null)
        {
            result = me.$e.find(p_expression);
        }
        else
        {
            result = $(p_expression);
        }
		if(result&&result.prevObject){
			delete result.prevObject;
		}
        return result;
    };

    /**
     * 返回一个 JQuery 对象。
     * 
     * @param [p_obj=me.$e] 一个 JQuery 对象，或继承自 Control 的控件，或字符串，或 HTML DOM 元素。
     *      如果参数为 JQuery 对象，则返回本身；
     *      如果参数为继承自 Control 的控件，则返回控件的 $e 对象；
     *      如果参数为字符串，则返回以字符串为选择器的 JQuery 对象；
     *      如果参数为空，则返回控件本身的 $e 对象。
     */
    me.$wrap = function(p_obj)
    {
        var $result = null;
        if (p_obj == null)
        {
            $result = me.$e;
        }
        else if (typeof(p_obj.jquery) != "undefined")
        {
            $result = p_obj;
        }
        else if (typeof(p_obj.$e) != "undefined")
        {
            $result = p_obj.$e;
        }
        else
        {
            if ($isString(p_obj))
            {
                if (me.$e == null)
                {
                    $result = $(p_obj);
                }
                else
                {
                    $result = me.$(p_obj);
                }
            }
            else
            {
                $result = $(p_obj);
            }
        }
        if ($result == null || $result.length == 0)
        {
            throw new Error("Nothing is selected by the jQuery expression '" + p_obj + "'." + (($isString(p_obj) && !p_obj.startsWith("#")) ? " Missing the '#'?" : ""));
        }
        return $result;
    };
    
    base.dispose = me.dispose;
    /**
	* 释放对象运行时动态生成的内容（属性、方法、事件）。
	*/
    me.dispose = function()
    {  	
    	_context = null;
        
		me.off(); 
		// add dispose tag
		me.disposing = true;
		
		if (me.$e)
		{
			me.$e.off();
			me.$e.unbind();
			me.$e.removeAttr("id");
			me.$e.removeAttr("alias");
			me.$e.removeAttr("permissionID");
			me.$e.removeAttr("style");
			me.$e.removeAttr("disabled");
			me.$e.removeAttr("class");
			me.$e.removeClass();
			me.$e.removeData("control");
			
			//将DOM对象的引用切断，下面代码回收内存的同时会影响功能，因为有些DOM元素的固有方法和属性被删除。
			if ($isIE())
            {
                var elem = me.$e.get(0);			        	
                if(elem){
                	var events = ["onresizeend","onblur","onkeydown","ondragstart","onscroll","onpropertychange",
                					"ondragenter","onmouseup","oncontextmenu","onbeforeupdate","onreadystatechange","onmouseenter",
                					"onresize","onselectstart","ondragend","onfocus","onmouseover",
                					"ondblclick","onkeypress","onmousewheel","onkeyup","onmovestart",
                					"onmouseout","oncellchange","onmousedown","onmouseleave","onclick","ondrag","onresizestart",
                					"onchange","onerror","onload","onselect"];
                    var es = elem.getElementsByTagName("*");
                    var e0;
                    try{
                        for(var i=0; i < es.length; i++){
                            e0  = es[i];

                            // 事件置空
                            for(var j=0; j < events.length; j++){
                                if(e0[events[j]])
                                    e0[events[j]] = null;
                            }

                            e0 = null;
                        }	
                    }catch(e){};
                }	
            }
			
			//added by tiger on 2015/4/13 12:06:03
			$("*",me.$e).each(function(){
				jQuery.event.remove(this);
				jQuery.removeData(this);
			});			
			me.$e.empty().remove();
			delete me.$e.prevObject;
			me.removeJQuryCache(me.eTag);			
			me.$e = null;
			delete me.$e; 			   			  
		}			
		
		/**
		*此处动作放置到MXObject对象中处理
		*/
    	/*for(var item in me){
    		var t = typeof me[item];
	        if (t == "function" || t == "object") {	
	        	if(me[item] && me[item].constructor == MXEvent){
	        		me[item].clear();
	        	}
	        		        	
	        	try{
	        		if("dispose" != item)
	        			me[item] = null;
	        	}catch(e){};
	        }
    	}*/
			
		base.dispose(); 	
    };

    me.endOfClass(arguments); 
    return me;
};
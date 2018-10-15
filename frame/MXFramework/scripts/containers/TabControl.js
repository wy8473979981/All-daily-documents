$ns("mx.containers");

/**
 * 提供一个分页控件。
 * 
 * @example
 * 以下是一个创建 {@link mx.containers.TabControl} 的示例。
 * 该示例将说明如何创建一个 {@link mx.containers.TabControl}，如何添加 {@link mx.containers.TabPage} 页，以及如何订购事件。
 * <code language="JavaScript">
 * var tabControl = new mx.containers.TabControl({
 *     pages:[
 *         { text: "常规", name: "general" },
 *         { text: "角色", name: "role" }
 *     ],
 *     onselectionchanging: _selection_changing,
 *     onselectionchanged: _selection_changed
 * }); 
 *
 * function _selection_changing(e)
 * {
 *     if (!confirm("确定需要更改选择项?"))
 *     {
 *         e.cancel = true;
 *     }
 * }
 *  
 * function _selection_changed()
 * {
 *     alert("选择页发生了改变，当前选择项为：" + tabControl.selection.text);
 * }
 * </code>
 */
mx.containers.TabControl = function()
{
    var me = $extend(mx.containers.Container);
    var base = {};

    /**
     * @default 100%
     */
    me.width = "100%";

    /**
     * @default 100%
     */
    me.height = "100%";

    /**
     * 获取或设置一个 Boolean 值，该值表示是否显示控件的分页按钮。
     * 该字段必须在初始化前设置。控件初始化后请使用 {@link setHeaderVisible} 方法设置该字段的值。
     * 
     * @default true 
     */
    me.headerVisible = true;
    
    
    /**
     * 获取或设置一个Boolean值，该值表示是否显示标签图标。
     * 
     * @default false
     */
    me.displayIcon = false;
    
    /**
     * 获取一个集合，包含控件中所有的页（{@link mx.containers.TabPage} 类型）。
     * 
     * @item mx.containers.TabPage
     * @index 页的名称（{@link mx.containers.TabPage.name}）或页在集合中的序号（从 0 开始计数）。
     */
    me.pages = [];

    /**
     * 获取一个对象，表示 {@link mx.containers.TabControl} 中当前显示的页（{@link mx.containers.TabPage} 类型）。
     */
    me.selection = null;
    
    /**
     * 获取或设置选项卡的隐藏模式。
     * 可设的值为。
     * <ul>
     * 	<li>
     * 		detach 表示标签切换为非选中状态时将标签体从当前 DOM 上下文中移除。
     * 	</li>
     * 	<li>
     * 		hide   表示标签切换为非选中状态时将标签体从当前 DOM 上下文中隐藏。
     * 	</li>
     * </ul>
     * 
     * @default detach 
     */
    me.tabHideMode = "detach";
    
    /**
     * 获取或设置选项卡的隐藏模式是否应用全局的$MX_TAB_HIDEMODE变量。
     * 可设的值为。
     * <ul>
     * 	<li>
     * 		true  表示隐藏模式会应用$MX_TAB_HIDEMODE变量。
     * 	</li>
     * 	<li>
     * 		false 表示隐藏模式不会应用$MX_TAB_HIDEMODE变量。
     * 	</li>
     * </ul>
     * 
     * @default true 
     */
    me.enableMxTabHideMode = true;

    /**
     * 当控件的显示页发生改变后，将触发该事件。调用 {@link selectPage}(p_page, true) 方法后会触发该事件。
     * 
     * @param page 一个 {@link mx.containers.TabPage} 对象，即将被选择并显示的选项卡页。  
     */
    me.onselectionchanged = null;

    /**
     * 当控件的显示页发生改变的时候，将触发该事件。调用 {@link selectPage} 方法时会触发该事件。
     * 
     * @cancelable 
     * @param page 一个 {@link mx.containers.TabPage} 对象，即将被选择并显示的选项卡页。    
     */
    me.onselectionchanging = null;

    /**
     * 获取一个 JQuery 对象，该对象用于显示分页按钮。
     */
    me.$head = null;

    /**
     * 获取一个 JQuery 对象，该对象用于显示每页的内容。
     */
    me.$body = null;
    
    /**
     * @ignore
     * 获取选项卡溢出时左侧的浮动移动导航按钮。
     */
    me.$left_scroll_div = null;
    
    /**
     * @ignore
     * 获取选项卡溢出时右侧的浮动移动导航按钮。
     */
    me.$right_scroll_div = null;
    

    /**
     * 初始化方法。执行设置样式并初始化属性等操作。
     */
    base.init = me.init;
    me.init = function()
    {
        base.init();
        _init();
    };

    /**
     * 设置 {@link headerVisible} 字段的值。
     * @param [p_headerVisible=true] 一个 Boolean 值，表示是否显示控件的分页按钮。如果该值为 true，表示显示分页按钮；反之则不显示。
     */
    me.setHeaderVisible = function(p_headerVisible)
    {
        if (p_headerVisible == null)
        {
            p_headerVisible = true;
        }
        if (p_headerVisible)
        {
            me.$("> #head").show();
        } else
        {
            me.$("> #head").hide();
        }
        me.headerVisible = p_headerVisible;
    };

    /**
     * 设置 {@link $body} 对象的内边距。
     */
    me.setPadding = function(p_padding)
    {
    	if (typeof (p_padding) != "undefined" && me.$body != null)
    	{
    		me.padding = p_padding;
    		me.$body.css("padding", me.padding);
    	}
    };

    /**
     * 向 {@link mx.containers.TabControl} 的页集合（{@link pages} 集合）中添加新页，并返回该 {@link mx.containers.TabPage} 对象。
     * 
     * @overload function(p_page)
     * 
     * @param p_name 一个字符串（不能是全为数字的字符串，必须包含一个非数字字符），表示该页的名称。{@link mx.containers.TabPage.name} 字段也是所有页的唯一标识，必须唯一。
     * @param p_text 一个字符串，表示该页的按钮上显示的文本。
     * @param p_closable 一个Boolean值，表示该页是否可以关闭。
     * @param p_page 一个 JSON 对象或一个 {@link mx.containers.TabPage} 对象，表示要添加的新页。
     * 
     * @example
     * 以下是为 {@link mx.containers.TabControl} 添加一个 {@link mx.containers.TabPage} 的示例。
     * <code language="JavaScript">
     * tabControl.appendPage("job", "职位"); // tabControl 为一个 TabControl 实例对象，“职位”为 TabPage 的“text”属性值，“job”为 TabPage 的“name”属性值     
     * </code>
     */
    me.appendPage = function(p_name, p_text, p_closable)
    {
    	var pageName = ($.isPlainObject(p_name) || $instanceOf(p_name, mx.containers.TabPage)) ? p_name.name : p_name;
        if (typeof (me.pages[pageName]) != "undefined")
        {
            throw new Error(mx.err("DUPLICATED_ITEM", [ pageName ]));
        }
        
        var page = null;
        if (arguments.length == 1 && typeof (p_name) == "object")
        {
            if ($.isPlainObject(p_name))
            {
                page = new mx.containers.TabPage(p_name);
            } 
            else
            {
                page = p_name;
            }
        }
        else if (arguments.length == 2)
        {
            page = new mx.containers.TabPage( { name: p_name, text: p_text} );
        } 
        else if (arguments.length == 3)
        {
            page = new mx.containers.TabPage( { name: p_name, text: p_text, closable: p_closable} );
        }
        
        page.owner = me;
        page.parent = me;
        page.setDisplayIcon();

        me.$head.append(page.$button);
        
        if (me.tabHideMode == "hide")
        {
        	if (!page.initialized)
        	{
        		page.init();
        	}
        	
        	me.$body.append(page.$container);
        	page.$container.hide();
        }

        me.pages.add(page);
        me.pages[page.name] = page;
        me.trigger("ctrladded", {ctrl: page});
        if (me.pages.length == 1)
        {
            me.selectPage(page, true);
        }

        return page;
    };

    /**
     * 向 {@link mx.containers.TabControl} 的页集合（{@link pages} 集合）中添加一组页。
     * 
     * @param p_pages 一个数组，该数组包含了一组 {@link mx.containers.TabPage} 对象。
     * 
     * @example
     * 以下是为 {@link mx.containers.TabControl} 添加一组 {@link mx.containers.TabPage} 的示例。
     * <code language="JavaScript">
     * tabControl.appendPages([
     *     { text: "职位", name: "job", closable: true},
     *     { text: "岗位", name: "position", imageKey: "position_16" }
     * ]);        
     * </code>
     */
    me.appendPages = function(p_pages)
    {
        if ($isArray(p_pages))
        {
            for ( var i = 0; i < p_pages.length; i++)
            {
                me.appendPage(p_pages[i]);
            }
        }
    };

    /**
     * 从 {@link pages} 集合中移除指定的 {@link mx.containers.TabPage} 对象，若该页是控件当前的显示页，则会自动选择第一页，并触发 {@link onselectionchanged} 事件。从集合中移除页时，有关移除的页的所有信息均会被删除。
     * @param p_page 一个数字（如 0），表示 {@link pages} 集合中页的序号;或一个字符串，表示页的唯一标识（{@link mx.containers.TabPage.name} 字段）；或者一个 {@link mx.containers.TabPage} 对象。
     */
    me.removePage = function(p_page)
    {
        var page = null;
        if (typeof (p_page) == "object")
        {
            page = p_page;
        } 
        else
        {
            page = me.pages[p_page];
        }

        if (page != null)
        {
        	page.close();
        }
    };

    /**
     * 从 {@link pages} 集合中同时移除多个项。
     *  @param p_pages 一个数组，该数组包含了一组数字（如 0，1，3，5，8）表示 {@link pages} 集合中页的序号；或一个字符串，表示页的唯一标识（{@link mx.containers.TabPage.name} 字段）；或者一组 {@link mx.containers.TabPage} 对象。
     */
    me.removePages = function(p_pages)
    {   
    	if(p_pages != null && p_pages != [] && p_pages != "")
    	{
	    	if ($isArray(p_pages) && typeof (p_pages[0]) == "number")
	        {	var j=0;	
	    		p_pages = p_pages.sort(function(a,b){return a-b});

	            for (var i = 0; i < p_pages.length; i++)
	            {
	            	me.removePage(p_pages[i]-j);
	            	j++;
	            }
	        }
	    	else if ($isArray(p_pages) && typeof (p_pages[0]) == "object" ||typeof (p_pages[0]) == "string")
	    	{
	    		 for (var a = 0; a < p_pages.length; a++)
	             {
			    			me.removePage(p_pages[a]);
	             }
	    	}	    	
    	}
    };
    /**
     * 从 {@link pages} 集合中移除除了当前选中的项以外的所有项。
     */
    me.removeOtherPages = function()
    {       
        if (me.selection != null)
        {
            while (me.pages.length > 1)
            {
                if (me.pages[0] == me.selection)
                {
                    me.removePage(1);
                }
                else
                {
                    me.removePage(0);
                }
            }
        }
        else
        {
            me.clearPages();
        }
    };
    
    /**
     * 从 {@link pages} 集合中移除所有项。若要从 {@link mx.containers.TabControl} 中移除单个项，请使用 {@link removePage} 方法。
     */
    me.clearPages = function()
    {
        while (me.pages.length > 0)
        {
            me.removePage(0);
        }
    };
    
    /**
     * 选择并显示 {@link mx.containers.TabControl} 页集合中的指定页。
     * @param p_page 一个数字（如 0），表示 {@link pages} 集合中页的序号；或一个字符串，表示页的唯一标识（{@link mx.containers.TabPage.name} 字段）；或者一个 {@link mx.containers.TabPage} 对象。        
     * @param [p_triggerEvent=false] 一个 Boolean 值，表示是否要触发 {@link onselectionchanged} 事件。如果该值为 true，则触发事件；反之则不触发。
     */
    me.selectPage = function(p_page, p_triggerEvent)
    {
        var page = null;
        if (typeof (p_page) == "object")
        {
            page = p_page;
        }
        else if (typeof (p_page) == "number" || typeof (p_page) == "string")
        {
            page = me.pages[p_page];
        }
    
        if (page)
        {
        	if (!page.initialized)
        	{
        		page.init();
        	}
        }
        else
    	{
        	return;
    	}
        
        if (me.selection == page) return;
        
        var args = {
            cancel : false,
            page : page
        };
        me.trigger("selectionchanging", args);
        if (args.cancel)
            return;

        if (me.selection != null)
        {
            me.selection.$button.removeClass("selected");
            
            if (me.tabHideMode == "detach")
            {
            	me.selection.$container.detach();	
            }
            else
            {
            	me.selection.$container.hide();	
            }
        }

        _scrollIntoView(page);
        page.$button.addClass("selected");
        me.selection = page;
        
        if (me.tabHideMode == "detach")
        {
        	me.$body.append(me.selection.$container);
        }
    	
        page.$container.show();
        
        if (p_triggerEvent)
        {
            me.trigger("selectionchanged", {page: page});
        }
    };
    
    
    
    
    function _init()
    {
        me.$container.addClass("tabControl");
        me.$container.append("<div id=head class=tab-head></div><div id=body class=tab-body></div>");
        me.$head = me.$("#head");
        me.$head.userSelectable(false);
        me.$body = me.$("#body");
        
        // 父类初始化时调用过此方法，但是对于这个类来说，这里需要再次调用。
        me.setPadding(me.padding);

        me.$right_scroll_div = $("<div class='head-right'/>");
        me.$right_scroll_div.on("mouseover", _right_scroll_div_mouseover);
        me.$head.append(me.$right_scroll_div);

        me.$left_scroll_div = $("<div class='head-left'/>");
        me.$left_scroll_div.on("mouseover", _left_scroll_div_mouseover);
        me.$head.append(me.$left_scroll_div);
        
        me.$head.on("mouseenter", _head_mouseenter);
        me.$head.on("mouseleave", _head_mouseleave);   
        
        var container = me.$container.get(0);
        var $container = $(container);
        
        if (typeof $MX_TAB_HIDEMODE != "undefined" && me.enableMxTabHideMode)
        {
        	me.tabHideMode = $MX_TAB_HIDEMODE;
        }
        
        me.$head.on("click", "a", function(e)
        {
            if (!me.enabled) return;
            me.selectPage($(this).attr("id"), true);
        });
        
        me.$head.on("click", "a .tab-close-icon", function(e)
        {
        	if (!me.enabled) return;
        	var closedTabPageName = $(this).parent().attr("id");
            me.removePage(closedTabPageName);
            e.stopPropagation();
            return false;
        });

        if (!me.headerVisible)
        {
            me.setHeaderVisible(me.headerVisible);
        }
        
        if ($isArray(me.pages))
        {
            var pages = me.pages;
            me.pages = [];
            me.appendPages(pages);
        }
        
        //IE6与IE7, 设置的宽度不包含border、padding、margin的大小，需要额外处理
    	if($.isIE67()) {
    		me.$container.resize(function(){
    			me.$body.css("height", me.$container.height() - 
    					me.$head.outerHeight() - 
    					parseInt(me.$body.css("padding")) * 2 - 4);
    		});
    	}
    }

    /**
     * 请不要使用 JQuery-mx 中封装的 scrillIntoView 方法！！否则 Workbench 中会出现遮盖菜单的问题。
     */
    function _scrollIntoView(p_page)
    {
        var $buttons = p_page.$button.prevAll("a");
        var offsetLeft = 0;
        $buttons.each(function(i){
            offsetLeft += $buttons.eq(i).outerWidth();
        });
        var scrollLeft = me.$head.scrollLeft();
        var headWidth = me.$head.outerWidth();
        
        var width = offsetLeft + p_page.$button.outerWidth();
        if (offsetLeft < scrollLeft)
        {
            me.$head.scrollLeft(offsetLeft - 1);
        }
        else if (width > scrollLeft + headWidth)
        {
            me.$head.scrollLeft(width - headWidth);
        }
        
        if (me.$right_scroll_div.css("display") != "none" || me.$left_scroll_div.css("display") != "none")
        {
            me.$right_scroll_div.css("right", 0 - me.$head.scrollLeft());
            me.$left_scroll_div.css("left", me.$head.scrollLeft());
        }
    }

    var _timerId = null;
    function _right_scroll_div_mouseover(e)
    {
        me.$right_scroll_div.one("mouseout", _scroll_div_mouseout);
        _timerId = window.setInterval(_scrollRight, 100);
    }

    function _left_scroll_div_mouseover(e)
    {
        me.$left_scroll_div.one("mouseout", _scroll_div_mouseout);
        _timerId = window.setInterval(_scrollLeft, 100);
    }

    
    function _scroll_div_mouseout()
    {
        window.clearInterval(_timerId);
    }

    function _scrollRight()
    {
        var scrollLeft = me.$head.scrollLeft();
        me.$head.scrollLeft(scrollLeft + 20);
        //me.$right_scroll_div.css("right", 0 - me.$head.scrollLeft());
        me.$right_scroll_div.css("left", me.$head.scrollLeft() + me.$head.width() - me.$right_scroll_div.width() - 2);
        me.$left_scroll_div.css("left", me.$head.scrollLeft());
    }

    function _scrollLeft()
    {
        var scrollLeft = me.$head.scrollLeft();
        me.$head.scrollLeft(scrollLeft - 20);
        //me.$right_scroll_div.css("right", 0 - me.$head.scrollLeft());
        me.$right_scroll_div.css("left", me.$head.scrollLeft() + me.$head.width() - me.$right_scroll_div.width() - 2);
        me.$left_scroll_div.css("left", me.$head.scrollLeft());
    }

    function _head_mouseenter()
    {
        var scrollWidth = me.$head.get(0).scrollWidth;
        var offsetWidth = me.$head.get(0).offsetWidth;
        if (scrollWidth > offsetWidth)
        {
            //me.$right_scroll_div.css("right", 0 - me.$head.scrollLeft());
            me.$right_scroll_div.css("left", me.$head.scrollLeft() + me.$head.width() - me.$right_scroll_div.width() - 2);
            me.$left_scroll_div.css("left", me.$head.scrollLeft());
            me.$right_scroll_div.show();
            me.$left_scroll_div.show();
        }
    }
    
    function _head_mouseleave()
    {
        //me.$right_scroll_div.css("right", 0 - me.$head.scrollLeft());
        me.$right_scroll_div.css("left", me.$head.scrollLeft() + me.$head.width() - me.$right_scroll_div.width() - 2);
        me.$left_scroll_div.css("left", me.$head.scrollLeft());
        me.$right_scroll_div.hide();
        me.$left_scroll_div.hide();
    }

    base.dispose = me.dispose;
    /**
     * 从{@link mx.containers.Container}中移除该{@link mx.containers.TabControl}实例
     */
    me.dispose = function()
    {
        if (me.pages != null)
        {
            for ( var i = 0; i < me.pages.length; i++)
            {
                var page = me.pages[i];
                if($notEmpty(page))
                {
                	me.pages[page.name] = null;
                	delete me.pages[page.name];
                	
                	page.dispose();
                	page = null;
                	me.pages[i] = null;
                }
            }
            me.pages.clear();
        }
		
		me.$left_scroll_div.off();
		me.$left_scroll_div.unbind();
		me.$left_scroll_div.empty().remove();
		
		me.$right_scroll_div.off();
		me.$right_scroll_div.unbind();
		me.$right_scroll_div.empty().remove();
		
		me.$head.off();
		me.$head.off("click","**");
		me.$head.unbind();
		me.$head.empty().remove();
		
		me.$body.off();
		me.$body.unbind();
		me.$body.empty().remove();
        base.dispose();
    };

    me.endOfClass(arguments); 
    return me;
};

/**
 * 提供一个表示 {@link mx.containers.TabControl} 中的单个选项卡页的类。示例请参见 {@link mx.containers.TabControl}。
 */
mx.containers.TabPage = function()
{
    var me = $extend(mx.containers.Container);
    var base= {};
    
     /**
     * 获取该对象的父容器的对象，通常是一个 {@link mx.containers.TabControl} 类的实例。
     */
    me.owner = null;                 
     
    /**
     * 获取一个 JQuery 对象，表示该选项卡页的按钮对象。
     */
    me.$button = $("<a><span class='tab-text'/></a>");
    
  
    /**
     * 获取或设置选项卡页的名称。该字段也是选项卡页的唯一标识。
     * 该字段仅能设置非数字类型的字符串，避免包含特殊字符。
     * 控件初始化时必须设置该属性
     */
    me.name = null;
    
    /**
     * 获取该选项卡页按钮上显示的文本。请使用 {@link setText} 方法设置该字段的值。
     */
    me.text = null;        
    
    /**
     * 获取一个 Boolean 值，表示是否显示选项卡页的按钮。如果该值为 true，则显示；反之则不显示。请使用 {@link setVisible} 方法设置该字段的值。
     * 
     * @default true
     */
    me.visible = true;
    
    /**
     * 获取一个 Boolean 值，表示是否显示关闭选项卡按钮。如果该值为 true，则显示；反之则不显示。请使用 {@link setClosable} 方法设置该字段的值。
     * 
     * @default false
     */
    me.closable = false;
    
    
    /**
     * 获取一个字符串，表示 {@link mx.containers.TabPage} 标签图标的 URL（如“~$/icons/save.png”）。请使用 {@link setImageUrl} 方法设置该字段的值。
     *  必须设置{@link mx.containers.TabControl}的 {@link displayIcon}:true,该属性才能生效 
     */
    me.imageUrl = null;
    
    /**
     * 获取一个字符串，表示 {@link mx.containers.TabPage} 标签图标的名称。请使用 {@link setImageKey} 方法设置该字段的值。
     * 必须设置{@link mx.containers.TabControl}的 {@link displayIcon}:true,该属性才能生效     
     */
    me.imageKey = null;
    
    /**
     * 详见 {MXComponent.autoInit} 属性。
     * 
     * @default false
     */
    me.autoInit = false;
    
    /**
     * 当选项卡页被隐藏前将触发该事件。通常调用 {@link hide} 方法前会触发该事件。
     * 
     * @cancelable
     */
    me.onhiding = null;
    
    /**
     * 当选项卡页被隐藏后将触发该事件。通常调用 {@link hide} 等方法后会触发该事件。
     */
    me.onhide = null;

    /**
     * 当选项卡页被关闭后将触发该事件。通常调用 {@link close} 方法后会触发该事件。
     */
    me.onclose = null;

    /**
     * 当选项卡页被关闭前将触发该事件。通常调用 {@link close} 等方法前会触发该事件。
     * 
     * @cancelable
     */
    me.onclosing = null;
    
    /**
     * 初始化方法。执行设置样式并初始化属性等操作。
     */
    base.init = me.init;
    me.init = function()
    {            
    	if (!me.initialized)
        {
            base.init();
            me.$container.addClass("tab-page");
        }
    };
    
    /**
     * 设置 {@link imageUrl} 字段的值。
     * 
     * @param p_imageUrl 一个字符串，表示 {@link mx.containers.TabPage} 标签图标的 URL
     */
    me.setImageUrl = function(p_imageUrl)
    {
        if (p_imageUrl != null)
        {
            me.imageUrl = p_imageUrl;
            me.setDisplayIcon();
        }
    };
    
    /**
     * 设置 {@link imageKey} 字段的值。
     * 
     * @param 一个字符串，表示 {@link mx.containers.TabPage} 标签图标的名称
     */
    me.setImageKey = function(p_imageKey)
    {
        if (p_imageKey != null)
        {
            me.imageKey = p_imageKey;
            var imageUrl = mx.mappath("$/icons/" + p_imageKey + ".png");
            me.setImageUrl(imageUrl);
        }
    };
    
    /**
     * 设置 {@link closable} 字段的值。
     */
    me.setClosable = function(p_closable)
    {
        var $close_icons = me.$button.find(".tab-close-icon");
        var $close_icon = null;
        
        if ($close_icons.length > 0)
        {
            $close_icon = $($close_icons[0]);
        }
        
    
        if (p_closable)
        {
            if ($close_icon == null)
            {
                $close_icon = $("<span class='tab-close-icon'/>");
                me.$button.append($close_icon);
            }
        }
        else
        {
            if ($close_icon != null)
            {
                $close_icon.remove();
            }
        }
        
        me.closable = p_closable;       
    };
    
    /**
     * 设置标签页图标是否显示。根据 {@link mx.containers.TabControl.displayIcon} 属性设置标签图标的可见性。
     * @param $p_displayIcon 一个 Boolean 值，该值表示是否显示标签图标，默认为TabControl的{@link displayIcon}属性值。
     */
    me.setDisplayIcon = function(p_displayIcon)
    {
        if ($isEmpty(me.owner))
            return;
        
        var $tab_icons = me.$button.find(".tab-icon");
        var $tab_icon = null;
        
        if ($tab_icons.length > 0)
        {
            $tab_icon = $($tab_icons[0]);
        }
        
        if ($isEmpty(p_displayIcon))
        {
        	p_displayIcon = me.owner.displayIcon
        }
        
        if (p_displayIcon)
        {
            if ($tab_icon == null)
            {
                $tab_icon = $("<span class='tab-icon'/>");
                me.$button.prepend($tab_icon);
            }
            
            $tab_icon.css("backgroundImage", "url(" + mx.mappath(me.imageUrl) + ")");
        }
        else
        {
            if ($tab_icon != null)
            {
                $tab_icon.remove();
            }
        }
    };

    
    /**
     * 向选项卡页中添加内容。
     * @param $p_obj 一个 JQuery 对象，或一个控件（包含 $container 容器），或一个 HTML DOM 元素。
     */
    me.append = function($p_obj)
    {
        var $result = null;
        if (typeof($p_obj.jquery) != "undefined")
        {
            me.$container.append(me.$wrap($p_obj));
        }
        else if (typeof($p_obj.$e) != "undefined")
        {
            me.addControl($p_obj);
        }        
    };
    
    /**
     * 移除选项卡中指定的内容。
     * @param $p_obj 一个 JQuery 对象，或一个控件（包含 $container 容器），或一个 HTML DOM 元素。
     */
    me.remove = function($p_obj)
    {
        var item = me.$wrap($p_obj);
        item.remove();                      
    };
    
    /**
     * 返回该选项卡页在 {@link mx.containers.TabControl} 的 {@link mx.containers.TabControl.pages} 集合中的序号（0 代表第一个）。如果该对象的 {@link owner} 字段为空，则返回 -1。
     */
    me.getIndex = function()
    {
        return me.owner != null ? me.owner.pages.indexOf(me) : -1;
    };
    
    /**
     * 设置 {@link text} 字段的值。
     */
    me.setText = function(p_text)
    {
        me.text = p_text;
        me.$button.children(".tab-text").text(me.text != null ? me.text : "");
    };
     
    /**
     * 设置 {@link visible} 字段的值。
     */
    me.setVisible = function(p_visible)
    {           
        me.visible = p_visible;
        p_visible ? me.$button.css("display", "") : me.$button.css("display", "none");
    };      
    
    /**
     * 将选项卡页置为可见，即将 {@link visible} 字段置为 true。
     */
    me.show = function()
    {
        me.setVisible(true);
    };
    
    /**
     * 将选项卡页置为不可见，即将 {@link visible} 字段置为 false。
     */
    me.hide = function()
    {
    	// 这里的隐藏和实现和 mx.windows.Window 的实现不太一样，仅仅隐藏，考虑到兼容问题，不再修改。
    	var args = { cancel: false };
        me.trigger("hiding", args);
        if (args.cancel)
        {
            return false;
        }
        
        me.setVisible(false);
        
        me.trigger("hide");
    };
    
    /**
     * 将选项卡关闭
     */
    me.close = function()
    {
    	var args = { page: me, cancel: false };
        me.trigger("closing", args);
        if (args.cancel)
        {
            return false;
        }

        me.owner.pages.remove(me);
		me.owner.pages[me.name] = null;
		delete me.owner.pages[me.name];

		me.trigger("close", {page: me});
		

		if (me.$container != null)
        {
        	me.$container.remove();
        }
        if (me.$button != null)
        {
        	me.$button.remove();
        }
        
        delete me.$e;
        delete me.$button;
        
        if (me.owner.selection == me)
        {
            me.owner.selection = null;
            if (me.owner.pages.length > 0)
            {
                me.owner.selectPage(0);
            }
        }

        if (typeof me.dispose == "function")
        {
        	me.dispose();	
        }
        return true;
    }
    
    base.dispose = me.dispose;
    me.dispose = function()
    {
    	_clearMemLeak();
    	if (me.$button != undefined){
    		me.$button.off();
    		me.$button.unbind();
    		me.$button.empty().remove();
    	}
		me.owner=null;
		base.dispose();
		//added badded by tiger on 2015/4/9 11:21:23
		if ($isIE())
		{
			CollectGarbage();
		　　　setTimeout("CollectGarbage();", 1);
		}	
		//end add
    }
    
    function _clearMemLeak()
    {
    	// 删除页面中的嵌入式 OBJECT 元素以及 IFRAME 元素，防止内存泄露。
		var _iframes = me.$container ? me.$container.find("IFRAME") : null;
		if (_iframes && _iframes.length > 0)
		{
			var src, contentWindow;
			$.each(_iframes, function(i, _iframe){
                try
                {
                	$clearIframeLeak(_iframe);
	                _iframe = null;
                }
                catch(e){}
			});
		}

		var _objects = me.$container ? me.$container.find("OBJECT"): null;
		if (_objects && _objects.length > 0)
		{
			$.each(_objects, function(i, _object){
				try{
					$(_object).empty().remove();
					_object = null;
				}catch(e){}
			});
		}
    }
    
    
    base.endOfClass = me.endOfClass;
    /**
     * @ignore
     */
    me.endOfClass = function(p_arguments)
    {
        base.endOfClass(p_arguments);
    
        me.$button.attr("id", me.name);   
        
        me.setClosable(me.closable);
        me.setImageUrl(me.imageUrl);
        me.setImageKey(me.imageKey);
    
        if (me.text != null)
        {
            me.setText(me.text);            
        }
        
        if(!me.visible) 
        {
            me.setVisible(me.visible);           
        }
        
        return me;
    };
 
    
    me.endOfClass(arguments); 
    return me;
};
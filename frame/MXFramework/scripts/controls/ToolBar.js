$ns("mx.controls");

$import("mx.controls.ToolStrip");
$import("mx.controls.ToolStripItem");

/**
 * 一个提供工具条的类。
 * 
 * @example 以下是一个工具条如何初始化的代码示例。 
 * <code language="JavaScript">
 * var toolBar = new mx.controls.ToolBar(
 * {
 *     items :
 *     [
 *     {
 *         name : "menuGroup",//菜单项的唯一标识
 *         toolTip : "菜单分组",
 *         imageKey : "new",
 *         text : "菜单分组",
 *         items :
 *         [
 *         {
 *             name : "childMenu1",
 *             toolTip : "子菜单1",
 *             imageKey : "new",
 *             text : "子菜单1"
 *         },
 *         {
 *             name : "childMenu2",
 *             toolTip : "子菜单2",
 *             imageKey : "new",
 *             text : "子菜单2"
 *         }]
 *     }, 
 *     "-",//横线表示显示分隔线
 *     {
 *         name : "menu1",
 *         toolTip : "主菜单1",
 *         imageKey : "new",
 *         text : "主菜单1"
 *     },
 *     {
 *         name : "menu2",
 *         toolTip : "主菜单2",
 *         imageKey : "new",
 *         text : "主菜单2"
 *     }]
 * });
 * </code>
 */
mx.controls.ToolBar = function()
{
    var me = $extend(mx.controls.ToolStrip);
    var base = {};

    /**
     * 获取一个字符串，表示控件的类型。详见 {@link mx.controls.ToolStrip.toolStripType} 字段。
     * 
     * @default toolBar
     */
    me.toolStripType = "toolBar";

    /**
     * 获取 {@link mx.controls.ToolStrip.items} 集合中项的默认类型。详见
     * {@link mx.controls.ToolStrip.defaultItemType} 字段。
     * 
     * @default mx.controls.ToolBarItem
     */
    me.defaultItemType = mx.controls.ToolBarItem;

    /**
     * 获取或设置一个值，表示显示字符图标还是普通文本。请参见 {@link mx.utils.SymbolUtilClass}。
     * 
     * @default true
     */
    me.useSymbol = false;
    
    /**
     * 获取或设置控件的类型。
     * <p>
     * 该字段的可选值包括:
     * <ul>
     * <li>toolBar</li>
     * <li>quickToolBar</li>
     * </ul>
     * </p>
     * 
     * @default toolBar
     */
    me.toolBarType = "toolBar";
	
	/**
     * 获取或设置图标和文字的显示样式。
     * <p>
     * 该字段的可选值包括:
     * <ul>
     * <li>left</li>
     * <li>up</li>
     * </ul>
     * </p>
     * 
     * @default left
     */
    me.imagePosition = "left";
    
    /**
     * 获取或设置控件的布局方向。
     * <p>
     * 该字段的可选值包括:
     * <ul>
     * <li>horizontal</li>
     * <li>vertical</li>
     * </ul>
     * </p>
     * 
     * @default horizontal
     */
    me.direction = "horizontal";
    
    /**
     * 获取或设置一个值，表示横向工具条的菜单项溢出时自动换行或不自动换行(隐藏)
     * <p>
     * 该字段的可选值包括:
     * <ul>
     * <li>true</li>
     * <li>false</li>
     * </ul>
     * </p>
     * 
     * @default true 自动换行
     */
    me.wrapOverflow = true;
    
    /**
     *  当wrapOverflow的值为false，且工具条内部选项总宽度大于工具条宽度时，显示的控制按钮被点击时，会触发该事件。
     */
    me.oncontrolbuttonclick = null;
    
    var $controlBut;
    
    base.init = me.init;
    me.init = function()
    {
    	if($.isIE67()) {
    		if(me.width == "100%") me.width = null;
    	}
    	
        base.init();
        me.$e.addClass("toolBar");
        
		if(me.imagePosition=="up"){
			me.$e.addClass("imgUp");
		}
		
		if (me.direction == "vertical")
		{
			me.$e.addClass("vertical");
			
			// IE6下的大小及位置微调
			if($.isIE6() && me.$e.width() != 0 && me.$e.width() > 45) {
				me.$e.find("li > a > span#text").css("width", me.$e.width() - 40);
				me.$e.find("li > a > span#group").css("left", me.$e.width() - 45);
			}
		} else {
			if(!me.wrapOverflow) {
				me.$e.addClass("nowrap");
				
				$controlBut = $("<div id=controlBut></div>");
				$controlBut.on("click", function(){
					me.$e.toggleClass("nowrap");
					me.trigger("controlbuttonclick");
				});
				$controlBut.on("mouseenter", function(){
					$controlBut.addClass("hover");
				});
				$controlBut.on("mouseleave", function(){
					$controlBut.removeClass("hover");
				});
				me.$e.append($controlBut);
				
				// 当工具条内部选项总宽度大于工具条宽度时，显示控制按钮
				me.$e.resize(function(){
					var itemsWidth = 0;
					var itemsHeight = 0;
					for(var i = 0; i < me.items.length; i++) {
						itemsWidth += me.items[i].$e.outerWidth();
						itemsHeight = itemsHeight < me.items[i].$e.outerHeight() ? 
								me.items[i].$e.outerHeight() : itemsHeight;
					}
					if(me.$e.width() < itemsWidth ) {
						if ($controlBut){
							$controlBut.css({display: "block", height: itemsHeight});
						}
					}
				});
			}
		}
		
        _setToolBarType(me.toolBarType);

        var $toolBarFlag = $("<li class=toolBarFlag><span/></li>");
        me.$e.prepend($toolBarFlag);
        me.$e.on("click", "li > a > span", _toolBarItem_click);
    };
    
    /**
     * @ignore
     */
    base._appendItem = me._appendItem;
    me._appendItem = function(p_item)
    {
        base._appendItem(p_item);
        //如果有controlBut，则需要将其移动到最后
        if ($controlBut)
        	$controlBut.appendTo(me.$e);
        me.$e.trigger("resize");
    }

    //added by tiger on 2014/5/26 19:51:03, 获取对工具项点击处理的引用
    /**
     * 显示项{@link mx.controls.ToolStripItem}的子菜单项
     */
    me.showDropdownMenu = function(p_item){
        if (!me.enabled) return;
        
        p_item.dropDown("fast");
    }
    //end add    

    function _setToolBarType(p_toolBarType)
    {
        if ("quickToolBar" == p_toolBarType)
        {
            me.$e.addClass("quickToolBar");
        }
    }

    function _toolBarItem_click()
    {
        if (!me.enabled) return;
        var id = this.parentNode.parentNode.id;
        var item = me.getItemByName(id);
        if (typeof (item) != "undefined" && item.enabled && item.items != null
                && item.items.length != 0)
        {
            if ("group" == this.id)
            {
                item.dropDown("fast");
            }
            $(document).one("mousedown", _document_click);
            $(document).one("mouseup", _document_click);
        }
    }

    function _document_click(e)
    {
        var target = e.target
        var $target = $(target);
        var $menu = $target.closest("ul.menu");
        var menu;
        var contains = false;
        
        if ($menu.length > 0)
        {
            menu = $menu.data("control");
            if ($isEqual(menu, me) || $isEqual(menu.owner, me))
            {
                contains = true;
            }
        }

        if (contains)
        {
            var li = null;
            if (target.tagName == "SPAN" || target.tagName == "IMG")
            {
                li = target.parentNode.parentNode;
            }
            else if (target.tagName == "A")
            {
                li = target.parentNode;
            }

            if (li != null)
            {
                if (li.className == "group"
                        || li.className.indexOf("group ") != -1
                        || li.className.indexOf(" group") != -1)
                {
                    $(document).one("mousedown", _document_click);
                    $(document).one("mouseup", _document_click);
                    return;
                }
            }
            
            if (target == $menu.menuSilde("upButton").get(0) || target == $menu.menuSilde("downButton").get(0))
	        {
	            $(document).one("mousedown", _document_click);
	            $(document).one("mouseup", _document_click);
	            return;
	        }
        }

        me.hideDropDown();
        $(document.body).find(".menu").fadeOut("fast");
        $(document).off("mousedown", _document_click);
        $(document).off("mouseup", _document_click);
    }

	//updated by tiger on 2015/4/9 12:08:51
	base.dispose = me.dispose;
	/**
	* 释放对象运行时动态生成的内容（属性、方法、事件）。
	*/
	me.dispose = function(){
		if ($controlBut != null)
		{
			$controlBut.off();
			$("*",$controlBut).each(function(){
				jQuery.event.remove(this);
				jQuery.removeData(this);
			});
			$controlBut.get(0).innerHTML = "";	
			$controlBut = null;
		}
		
		if(me.$e.contextmenu){
			 me.$e.contextmenu = null;
		}
		
		if ($controlBut != null)
		{
			$controlBut.empty().remove();
		}
		
		$(document).off("mousedown", _document_click);
        $(document).off("mouseup", _document_click);
		
		base.dispose();
	}
	//end update

    me.endOfClass(arguments); 
    return me;
};

/**
 * 提供一个在 {@link mx.controls.ToolBar} 控件中显示的菜单项的类。
 */
mx.controls.ToolBarItem = function()
{
    var me = $extend(mx.controls.ToolStripItem);
    var base = {};
    
    /**
     * 初始化方法。执行设置样式并初始化属性等操作。
     */
    base.init = me.init;
    me.init = function()
    {
        base.init();
    };
    
    /**
     *  设置 {@link mx.controls.ToolStripItem.$link} 字段值。
     */
    me.setLink = function()
    {
        var $a = me.$e.children("a");
        me.$link = $a.children("span");
    };
    var __itemId = new Date().getTime();
    /**
     * 设置 {@link isGroup} 字段值为 true。
     */
    me.makeGroup = function()
    {
        if (!me.isGroup)
        {
            me.isGroup = true;
            
            if (me.items == null)
            {
                me.items = [];
            }
            
            me.$e.addClass("group");
            
            var $link = me.$e.children("a");
            var $groupImg = null;
            $groupImg = $link.children("span#group");
            if ($groupImg.length == 0)
            {
                $groupImg = $("<span id='group'/>");        
                $link.append($groupImg);
            }
             var id = me.name.replace("#", "_");
             me._$menu = $("<ul class='menu' id='" + id+ "_" + __itemId + "'/>");
             me._$menu.data("control", me);
             me._$menu.menuSilde();
             $('body').append(me._$menu);
        }
    };
  
    me.endOfClass(arguments); 
    return me;
};
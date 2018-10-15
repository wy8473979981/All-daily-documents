$ns("mx.controls");

$import("mx.controls.MenuItem");
$import("mx.utils.SymbolUtil");

/**
 * 提供一个对 {@link mx.controls.ToolStrip} 可以包含的所有元素的事件和布局进行管理的抽象基类。该类的派生类包括 {@link mx.controls.MenuItem} 等。
 * 
 * @abstract
 */
mx.controls.ToolStripItem = function()
{
    var me = $extend(mx.controls.Control);
    var base = {};
    
    /**
     * 获取或设置项的名称。
     * 初始化控件必须设置该字段
     */
    me.name = null;
    
    /**
     * 获取该项的父容器的对象，通常是一个 {@link mx.controls.ToolStrip} 类型的实例。
     * 
     */
    me.owner = null; 
        
    /**
     * 获取该项的父 {@link mx.controls.ToolStripItem} 对象。如果没有，则为 null。
     */
    me.parent = null;
    
    /**
     * 获取一个集合，包含所有的子项（{@link mx.controls.ToolStripItem} 类型）。请使用 {@link setItems} 方法设置该字段的值。
     * 
     * @item mx.controls.ToolStripItem
     * @index 项的唯一标识（{@link mx.controls.ToolStripItem.name}）或项在集合中的序号（从 0 开始计数）。
     */
    me.items = null;
    
    /**
     * 获取要显示在项上的文本。请使用 {@link setText} 方法设置该字段的值。
     */
    me.text = null;
    
    /**
     * 获取一个字符串，表示用户将鼠标悬停在该项上时显示的简短说明。请使用 {@link setToolTip} 方法设置该字段的值。
     */
    me.toolTip = null;
    
    /**
     * 获取一个字符串，表示 {@link mx.controls.ToolStripItem} 图像的 URL（如“~/icons/save.png”）。请使用 {@link setImageUrl} 方法设置该字段的值。
     */
    me.imageUrl = null;
    
    /**
     * 获取一个字符串，表示 {@link mx.controls.ToolStripItem} 图像的名称。请使用 {@link setImageKey} 方法设置该字段的值。
     */
    me.imageKey = null;
    
    /**
     * 获取一个 Boolean 值，表示该项是否为选择项。如果该值为 true，则该项前面会出现打钩的图片，表示选择了该项；反之则没有选择。请使用 {@link setChecked} 方法设置该字段的值。
     * 
     * @default false
     */
    me.checked = false;
    
    /**
     * 获取该项是否可以对用户交互作出响应。如果该值为 true，则表示可以对用户交互作出响应；反之则不能。
     * 请使用 {@link setEnabled} 方法设置该字段的值。
     * 
     * @default true
     */
    me.enabled = true;
    
    /**
     * 获取该项是否为可见状态。如果该值为 true，则表示可见；反之则不可见。
     * 请使用 {@link setVisible} 方法设置该字段的值。
     * 
     * @default true
     */
    me.visible = true;
    
    /**
     * 获取或设置一个值，表示显示字符图标还是普通文本。请参见 {@link mx.utils.SymbolUtilClass}。
     * 
     * @default false
     */
    me.useSymbol = false;
    
    /**
     * 获取或设置一个值，表示字符图标文本的大小。
     * 
     * @default 16
     */
    me.symbolSize = 16;
    
    /**
     * 获取该项是否为分隔符。如果为 true，表示该项为分隔符；反之则不是。
     * 
     * @default false
     */
    me.isSeparator = false;
    
    /**
     * 获取一个 Boolean 值，表示该项是否包含子项。如果该值为 true，表示有子项；反之则没有。
     * 通常 {@link items} 集合的 length 属性大于 0，该字段就为 true。如果要将该值设为 true，请使用 {@link makeGroup} 方法。
     * 
     * @default false
     */
    me.isGroup = false;
    
    /**
     * 获取一个 Boolean 值，表示子项是否显示。如果该值为 true，表示子项已显示；反之则隐藏。该字段与 {@link mx.controls.ToolStripItem.dropDown} 方法和 {@link mx.controls.ToolStripItem.hideDropDown} 方法有关。
     * 
     * @default true
     */
    me.droppedDown = true;
    
    /**
     * @ignore
     */
    me.dropDownChildItem = null;
    
    /**
     * @ignore
     */
    me.eTag = "<li class='item'><a/></li>";
    
    /**
     * 在单击 {@link mx.controls.ToolStripItem} 时触发该事件。
     */
    me.onclick = null;
    
    /**
     * @ignore
     * 
     * 当用户单击 {@link mx.controls.ToolStripItem} 所有的子项后，会触发该事件。
     * 
     * @param item 一个 {@link mx.controls.ToolStripItem} 对象。
     */
    me.onitemclick = null;
    
    /**
     * 当该项的子项显示时，会触发该事件。调用 {@link dropDown} 方法后会触发该事件。
     */
    me.ondropdown = null;
    
    /**
     * 当该项的子项显示之前，会触发该事件。调用 {@link dropDown} 方法时会触发该事件。
     * 
     * @cancelable
     */
    me.ondroppingdown = null;
    
    /**
     * @ignore
     * 设置该项接受点击事件的对象，请使用 {@link setLink} 方法设置该值。
     */
    me.$link = null;
    
    /**
     * @ignore
     */
    me._$menu = null;
    
    base.init = me.init;
    me.init = function()
    {
        base.init();
        
        me.$e.userSelectable(false);
        if (me.name != null)
        {
            me.$e.attr("id", me.name);
        }
        
        if (me.text != null) me.setText(me.text);
        if (me.toolTip != null) me.setToolTip(me.toolTip);
        if (me.imageUrl != null) 
        {
            me.setImageUrl(me.imageUrl);
        }
        else if (me.imageKey != null)
        {
            me.setImageKey(me.imageKey);
        }
        
        if(me.imageKey==null){
        	me.setImageKey(null);
        }
        
        if (me.checked) me.setChecked(me.checked);
        if (!me.enabled) me.setEnabled(me.enabled);
        if (!me.visible) me.setVisible(me.visible);
        
        me.setLink();
        
        me.$e.mouseup(_lnk_mouseup);
        me.$e.mousedown(_lnk_mousedown);
        
        if ($isArray(me.items))
        {
            var items = me.items;
            me.items = [];
            me.appendItems(items);
        }
    };
    
    /**
     * @ignore
     * 设置 {@link $link} 字段值。
     */
    me.setLink = function()
    {
        me.$link = me.$e.children("a");
        
        if ($.isIE6())
        {
        	me.$link.attr("href", 'javascript:void(0)');
        }
    };
    
    /**
     * 设置 {@link text} 字段的值。
     * 
     * @param p_text 显示文本
     */
    me.setText = function(p_text)
    {
        me.text = p_text;
        var $link = me.$e.children("a");
        var $span = null;
        $span = $link.children("span#text");
        if(p_text == null)
        {
            $span.remove();
        }
        else
        {
            if($span.length == 0)
            {
                $span = $("<span id='text'/>");
                $link.append($span);
            }
            
            var text = p_text;
            
            if (me.useSymbol)
            {
                var symbol = mx.utils.SymbolUtil.getSymbol(text);
                if (symbol != null)
                {
                    $span.css("fontFamily", symbol.font);
                    $span.css("fontSize", me.symbolSize);
                    $span.text(symbol.text);
                    return;
                }
            }
            
            $span.css("fontFamily", "");
            $span.css("fontSize", "");
            $span.text(text);
        }
    };    
    
    /**
     * 设置 {@link text} 字段的值。
     * 
     * @param p_html 一段 html 代码。
     */
    me.setHtml = function(p_html)
    {
        if (p_html == null)
        {
            me.setText(null);
        }
        
        var $link = me.$e.children("a");
        var $span = null;
        $span = $link.children("span#text");
        
        if($span.length == 0)
        {
            $span = $("<span id='text'/>");
            $link.append($span);
        }
        
        $span.html(p_html);
        me.text = $span.text();
    };
    
    /**
     * 设置 {@link toolTip} 字段的值。
     * 
     * @param p_toolTip 设置提示信息
     */
    me.setToolTip = function(p_toolTip)
    {
        me.$e.children("a").attr("title", p_toolTip);
    };
    
    /**
     * 设置 {@link imageUrl} 字段的值。
     * 
     * @param p_image 图片路径
     */
    me.setImageUrl = function(p_image)
    {
        me.imageUrl = p_image;
        var $link = me.$e.children("a");
        var $img = null;
        $img = $link.children("span#img");
        if(p_image == null)
        {
        	if(me.owner != null && me.owner.imagePosition == "up")
        	{
	        	$img = $("<span id='img'/>");        
	            $link.prepend($img);
        	}else
        	{
	            $img.remove(); 
        	}
        }
        else
        {
            if($img.length == 0)
            {
                $img = $("<span id='img'/>");        
                $link.prepend($img);
            }        
            $img.css("background-image", "url("+mx.mappath(p_image)+")");
        }           
    };
         
    /**
     * 设置 {@link imageKey} 字段的值。该方法会在 $/icons/ 目录中查找相应的 png 图片。($/icons/ 指 mx/resources/icons/)
     * 
     * @param [p_imageKey] 一个字符串，表示图片的名称。如 $/icons 目录中有一张图片为“role_48.png”或“role.png”的图片，那么该参数都是“role”。
     */
    me.setImageKey = function(p_imageKey)
    {
        me.imageKey = p_imageKey;
        if (me.imageKey != null)
        {
            if (me.owner != null)
            {
                var imageSize = me.owner.imageSize;
                var url = null;
                // IE6下图片使用gif
    			if($.isIE6()) {
    				if (imageSize == 16) {
                        url = "$/icons/gif/" + me.imageKey + ".gif";
                    } else {
                        url = "$/icons/gif/" + me.imageKey + "_" + imageSize + ".gif";
                    }
    			} else {
    				if (imageSize == 16) {
                        url = "$/icons/" + me.imageKey + ".png";
                    } else {
                        url = "$/icons/" + me.imageKey + "_" + imageSize + ".png";
                    }
    			}
                me.setImageUrl(url);
            }                
        }
        else
        {
            me.setImageUrl(me.imageUrl);
        }
    };
    
    /**
     * 设置 {@link enabled} 字段的值。
     * 
     * @param p_enabled boolean true：可用 false：不可用
     */
    me.setEnabled = function(p_enabled)
    {
        me.enabled = p_enabled;            
        p_enabled ? me.$e.removeClass("disabled") : me.$e.addClass("disabled");
    };
        
    /**
     * 设置 {@link visible} 字段的值。
     * 
     * @param p_visible 布尔值，true：可见 false：不可见
     */
    me.setVisible = function(p_visible)
    {           
        me.visible = p_visible;
        p_visible ? me.$e.css("display", "") : me.$e.css("display", "none");            
    };
    
    /**
     * 设置 {@link checked} 字段的值。
     * 
     * @param p_checked 布尔值，true：选中 false ：不选中
     */
    me.setChecked = function(p_checked)
    {
        me.checked = p_checked;
        p_checked ? me.$e.addClass("checked") : me.$e.removeClass("checked");            
    };
    
    /**
     * 设置 {@link mx.controls.ToolStripItem} 的显示文本的文本特性。
     * 
     * @param [p_fontFamily] 一个字符串，表示字体的名称。可参见 <b>css</b> 的 <b>font-family</b> 属性。
     * @param [p_fontSize] 一个数字或字符串，表示字体的尺寸。可参见 <b>css</b> 的 <b>font-size</b> 属性。
     * @param [p_fontWeight] 一个字符串，表示字体的粗细。可参见 <b>css</b> 的 <b>font-weight</b> 属性。
     * @param [p_fontStyle] 一个字符串，表示字体的样式。可参见 <b>css</b> 的 <b>font-style</b> 属性。
     */
    me.setFont = function(p_fontFamily, p_fontSize, p_fontWeight, p_fontStyle)
    {
        var $span = me.$e.find("span");
        if (typeof(p_fontFamily) != "undefined")
        {
            $span.css("fontFamily", p_fontFamily);
        }
        if (typeof(p_fontSize) != "undefined")
        {
            $span.css("fontSize", p_fontSize);
        }
        if (typeof(p_fontWeight) != "undefined")
        {
            $span.css("fontWeight", p_fontWeight);
        }
        if (typeof(p_fontStyle) != "undefined")
        {
            $span.css("fontStyle", p_fontStyle);
        }
    };
    
    /**
     * 当 {@link parent} 字段不为空时，返回该项在父 {@link mx.controls.ToolStripItem} 的 {@link items} 集合中的序号（0 代表第一个）；
     * 当 {@link parent} 字段为空并且 {@link owner} 字段不为空时，返回该项在 {@link mx.controls.ToolStrip} 的 {@link mx.controls.ToolStrip.items} 集合中的序号（0 代表第一个）。
     * 如果该对象的 {@link parent} 和 {@link owner} 字段都为空，则返回 -1。
     */
    me.getIndex = function()
    {
        if (me.parent != null)
        {
            return me.parent.items.indexOf(me);
        }
        else
        {
            if (me.owner != null)
            {
                return me.owner.items.indexOf(me);
            }
        }
        return -1;
    };
    
    /**
     * 切换选中状态。
     */
    me.toggleChecked = function()
    {
        me.setChecked(!me.checked);
    };
    
    var __itemId = new Date().getTime();
    /**
     * 设置 {@link isGroup} 字段值为 true。
     */
    me.makeGroup = function()
    {
        if(!me.isGroup)
        {
            me.isGroup = true;
            if (me.items == null)
            {
                me.items = [];
            }
            me.$e.removeClass("item");
            me.$e.addClass("group");

            var id = me.name.replace("#", "_");
            me._$menu = $("<ul class='menu' id='" + id+ "_" + __itemId + "'/>");
            me._$menu.data("control", me);
            me._$menu.menuSilde();
            $('body').append(me._$menu);
        }
    };
    
    /**
     * 返回一个 Boolean 值，表示该项是否有子项，也表示 {@link items} 集合的 length 属性是否大于 0。如果该值为 true，则表示该项包含子项；反之则没有。
     */
    me.hasChildren = function()
    {
        return me.items != null && me.items.length > 0;
    };
    
    /**
     * 将 {@link mx.controls.ToolStripItem} 对象添加到集合 {@link items} 中，并返回该对象。
     * 
     * @overload function(p_item)
     * @overload function(p_name,p_text)
     * @overload function(p_name,p_text,p_image)
     * 
     * @param p_name 一个字符串，表示添加的 {@link mx.controls.ToolStripItem} 对象的名称（{@link mx.controls.ToolStripItem.name} 字段的值）；当参数只有 p_name 一个时，也可以作为一个 JSON 对象（如 { name:"new", text:"新建" }），表示 {@link mx.controls.ToolStripItem} 的一组属性值。
     * @param [p_text] 一个字符串，表示 {@link mx.controls.ToolStripItem} 对象的 {@link mx.controls.ToolStripItem.text} 字段的值。
     * @param [p_image] 一个字符串，表示 {@link mx.controls.ToolStripItem} 图标的 URL。详见 {mx.controls.ToolStripItem.iamge} 字段。
     * @param p_item 一个 {@link mx.controls.ToolStripItem} 对象，表示要添加的项。
     */
    me.appendItem = function(p_name, p_text, p_image)
    {
        var item = null;
        if ($isObject(p_name) && $isEmpty(p_text) && $isEmpty(p_image))
        {
            if ($.isPlainObject(p_name))
            {
                var options = p_name;
                options.parent = me;
                options.owner = me.owner;
                item = new mx.controls.MenuItem(options);
            }
            else
            {
                item = p_name;
            }
        }
        else
        {
            var options = 
            {
                parent: me,
                owner: me.owner,
                name: p_name,
                text: p_text,
                image: p_image
            };
            item = new mx.controls.MenuItem(options);
        }
        
        if (me.items != null && $notEmpty(me.getItemByName(item.name)))
        {
        	mx.indicate("warn", mx.err("DUPLICATED_ITEM", [ item.name ]));
        	return null;
        }
        
        me._appendItem(item);
        
        return item;
    };
    
    /**
     * 向 {@link mx.controls.ToolStripItem} 的项集合（{@link items} 集合）中添加一组新项。
     * 
     * @param p_items 一个数组，该数组包含了一组新项（{@link mx.controls.ToolStripItem} 类型）。
     */
    me.appendItems = function(p_items)
    {
        if ($isArray(p_items))            
        {
            for (var i = 0; i < p_items.length; i++)
            {
                var item = p_items[i];
                if ($isString(item))
                {
                    if (item == "-" || item == "|")
                    {
                        me.appendSeparator();
                    }
                    else
                    {
                        me.appendItem(item, item);
                    }
                }
                else if ($isObject(item))
                {
                    me.appendItem(item);
                }
            }
        }
    };
    
    /**
     * 设置 {@link items} 字段的值。该方法首先会清空 {@link items} 集合。
     * 
     * @param p_items 一个数组，该数组包含了一组 {@link mx.controls.ToolStripItem} 对象。
     */
    me.setItems = function(p_items)
    {
        me.clearItems();
        me.appendItems(p_items);
    };
    
    /**
     * 从 {@link items} 集合中移除指定的 {@link mx.controls.ToolStripItem} 对象。从集合中移除项时，有关移除的项的所有信息均会被删除。若要从集合中移除所有项，请使用 {@link clearItems} 方法。
     * 
     * @param p_item 一个 {@link mx.controls.ToolStripItem} 对象。
     */
    me.removeItem = function(p_item)
    {
        if (p_item != null)
        {
            p_item.$e.remove();
            me.items.remove(p_item);
            me.items["#" + p_item.name] = null;
            delete me.items["#" + p_item.name];
            
            if(!p_item.disposed)
            {
            	p_item.dispose();
            }
            
            if(me.items.length==0)
            {
	    	     me.isGroup = false;
	    	     me.$e.removeClass("group");
	    	     me.$e.addClass("item");
	    	     me.$e.find("ul").remove();	
	    	     var id = me.name.replace("#", "_");
                 $('body').children("ul#" + id + "_" + __itemId).remove();
            }
        }
    };
    
    /**
     * 删除指定位置的 {@link mx.controls.ToolStripItem} 对象。
     * 
     * @param p_index 一个数字（如 0），表示 {@link items} 集合中项的序号。
     */
    me.removeByIndex = function(p_index)
    {
        me.removeItem(me.items[p_index]);
    };
    
    /**
     * 提供一个方法，根据指定值删除 {@link mx.controls.ToolStripItem} 对象。
     * 
     * @param p_name
     *            一个数字或者字符串，表示要刪除的 {@link mx.controls.ToolStripItem} 对象的
     *            {@link mx.controls.ToolStripItem.name} 属性的值。
     */
    me.removeByName = function(p_name)
    {
        var item = me.getItemByName(p_name);
        if ($notEmpty(item))
        {
            me.removeItem(item);
        }
    };
    
    /**
     * 将 {@link mx.controls.ToolSeparator} 分隔符添加到集合 {@link items} 中，并返回该对象。
     * 
     * @param [p_name] 一个 {@link mx.controls.ToolSeparator} 对象；或一个 JSON 对象，表示 {@link mx.controls.ToolSeparator} 对象的一组属性值。
     */
    me.appendSeparator = function(p_name)
    {
        var item = null;
        if ($isObject(p_name))
        {
            item = p_name;
        }
        else
        {
            item = new mx.controls.ToolSeparator(p_name);
        }
        
        me._appendItem(item);
        
        return item;
    };

    /**
     * 从 {@link items} 集合中移除所有的项。若要从 {@link mx.controls.ToolStripItem} 中移除单个项，请使用 {@link removeItem} 方法。
     */
    me.clearItems = function()
    {
    	if (me.items != null)
    	{
	    	while (me.items.length > 0)
	        {
	            me.removeByIndex(0);
	        }
    	}
    };
    
    /**
     * 显示 {@link mx.controls.ToolStripItem} 所有的子项。该方法会触发 {@link ondropdown} 和 {@link ondroppingdown} 事件。
     * 
     * @param p_speed 三种预定速度之一的字符串（“slow”，“normal”，“fast”）或表示动画时长的毫秒数值（如：1000）。
     */
    me.dropDown = function(p_speed)
    {
        if(!me.enabled) return;
        
        var args = { cancel:false };       
        me.trigger("droppingdown", args);
        if (args.cancel) return;
        
        if (p_speed == null)
        {
            p_speed = 0;
        }
        if (me.parent != null && me.parent.dropDownChildItem != null)
        {
            if (me.parent.dropDownChildItem == me)
            {
                return;
            }
            me.parent.dropDownChildItem.hideDropDown();
        }
        else if (me.parent == null && me.owner != null && me.owner.dropDownChildItem != null)
        {
            if (me.owner.dropDownChildItem == me)
            {
                return;
            }
            me.owner.dropDownChildItem.hideDropDown();
        }
        
        if (me.owner != null)
        {
            var canDropDown = me.owner.updateItemsVisibility(me.items);
            if (!canDropDown)
            {
                return;
            }
        }  
        
        me.$e.addClass("droppedDown");
        me.droppedDown = true;
        
        if (me.parent != null)
        {
            me.parent.dropDownChildItem = me;
        }
        else
        {
            me.owner.dropDownChildItem = me;
        }
        
        me._refreshSubMenus(p_speed);
      	
        me.trigger("dropdown");
        
        if (me.owner != null)
        {
            me.owner.trigger("dropdown");
        }
    };
    
    /**
     * @ignore
     */
    me._refreshSubMenus = function(p_speed)
    {
        var owner = me.owner;
        var parent = me.parent;
        var pos = me.$e.offset();
        var top = pos.top;
        var left = pos.left;
        var zIndex = $notEmpty(parent) ? parseInt(parent._$menu.css("z-index")) + 1: parseInt(owner.$e.css("z-index")) + 1;
        var availableHeight = $(document).scrollTop() + $(window).height();
        var availableWidth = $(document).scrollLeft() + $(window).width();
        
        //当前菜单项为一级菜单
        if ($isEmpty(parent) && $isEqual(owner.direction, "horizontal"))
        {
            top += me.$e.outerHeight();
            if (me._$menu.outerHeight() +　top > availableHeight)
	        {
	            me._$menu.css("height", availableHeight - top);
	        }
            if (me._$menu.outerWidth() + left > availableWidth)
            {
                left = left + me.$e.outerWidth() - me._$menu.outerWidth();
            }
        }
        else
        {
            left += me.$e.outerWidth();
	        if (top + me._$menu.height() > availableHeight)
	        {
	            if (me._$menu.height() > availableHeight)
	            {
	                top = 0;
	                me._$menu.css({height: availableHeight});
	            }
	            else
	            {
	                top = availableHeight - me._$menu.outerHeight();
	            }
	        }
	
	        if (left + me._$menu.outerWidth() > availableWidth)
	        {
	            left = pos.left - me._$menu.outerWidth();
	        }
        }
        
        me._$menu.css({top: top, left: left, zIndex: zIndex});
        me._$menu.fadeIn(p_speed);
    }
 
    /**
     * 隐藏 {@link mx.controls.ToolStripItem} 所有的子项。
     * 
     * @param p_speed 三种预定速度之一的字符串（“slow”，“normal”，“fast”）或表示动画时长的毫秒数值（如：1000）。
     */
    me.hideDropDown = function(p_speed)
    {
        if (p_speed == null)
        {
            p_speed = 0;
        }
        if (me.droppedDown)
        {
            if (me.dropDownChildItem != null)
            {
                me.dropDownChildItem.hideDropDown();
            }
            
            
            me.$e.removeClass("droppedDown");
            if (p_speed == 0)
            {
                me._$menu.hide();
            }
            else
            {
                me._$menu.fadeOut(p_speed);
            }
            
            me.droppedDown = false;
            if (me.parent != null)
            {
                me.parent.dropDownChildItem = null;
            }
            else if (me.parent == null && me.owner != null)
            {
                me.owner.dropDownChildItem = null;
            }
            
            if (me.owner != null)
            {
                me.owner.trigger("hidedropdown");
            }
        }
    };
    
    /**
     * 将该 {@link mx.controls.ToolStripItem} 置为可见，即将 {@link visible} 字段置为 true。
     */
    me.show = function()
    {
        me.setVisible(true);
    };
    
    /**
     * 将该 {@link mx.controls.ToolStripItem} 置为不可见，即将 {@link visible} 字段置为 false。
     */
    me.hide = function()
    {
        me.setVisible(false);
    };
    
    /**
     * 提供一个方法，根据指定的 {@link mx.controls.ToolStripItem.name} 值选中 {@link mx.controls.ToolStripItem} 项。
     * 
     * @param p_name
     *            一个字符串，表示要选中的 {@link mx.controls.ToolStripItem} 对象的
     *            {@link mx.controls.ToolStripItem.name} 属性的值。
     */
    me.getItemByName = function(p_name)
    {      
        return me.items["#" + p_name];
    };
    
    /**
     * @ignore
     *
     * 将指定的项（通常是 {@link mx.controls.ToolStripItem} 类型和 {@link mx.controls.ToolSeparator} 类型）添加到集合 {@link items} 中，并返回该对象。
     * 
     * @param p_item 一个对象，通常是 {@link mx.controls.ToolStripItem} 类型和 {@link mx.controls.ToolSeparator} 类型。
     */
    me._appendItem = function(p_item)
    {
        p_item.parent = me;
        p_item.owner = me.owner;
        
        me.makeGroup();
        me.items.add(p_item);   
        me.items["#" + p_item.name] = p_item;
        me._$menu.append(p_item.$e);
        return p_item;
    };

    function _lnk_mouseup(e)
    {
        if(!me.enabled || !me.owner.enabled || e.which >= 2) return;
        
        //如果是点击下拉三角号的  <span/>,则不触发 itemclick 事件。
        if("group" == e.target.id) return;
        
        me.trigger("click");
        
        var p = me.parent;
        var args = { item: me };
        while (p != null)
        {
            p.trigger("itemclick", args);
            p = p.parent;
        }
        if (me.owner != null)
        {
            me.owner.trigger("itemclick", args);
        }
    }
    
    function _lnk_mousedown(e)
    {               
        if(!me.enabled || !me.owner.enabled || e.which >= 2) return;
        
        if("group" == e.target.id) return;
        
        me.owner.trigger("itemmousedown", { item: me, e: e });
        
        e.stopPropagation();
    }
    
    /**
	 * 释放对象运行时动态生成的内容（属性、方法、事件）。
	 */
	base.dispose = me.dispose;
	me.dispose = function()
	{
	 	
	 	me.clearItems();
	 	
	 	if (me.$link != null)
		{
	    	me.$link.empty().remove();
	    	delete me.$link;
		}
		
		if (me._$menu != null)
		{
			me._$menu.find("div").off();
			me._$menu.off();
			me._$menu.removeData("control");
	    	me._$menu.empty().remove();
	    	delete me._$menu;
		}
		
	 	base.dispose();
	}
     
    
    me.endOfClass(arguments); 
    return me;
};
$ns("mx.controls");

$import("mx.controls.ToolSeparator");
$import("mx.controls.ToolStripItem");

/**
 * 为菜单、工具栏等控件提供基类。该类的派生类包含：{@link mx.controls.MainMenu}、{@link mx.controls.ContextMenu}。<b>所有派生类容器的
 * HTML 元素必须为 &lt;UL&gt;</b>。
 * 
 * @abstract
 */
mx.controls.ToolStrip = function()
{
    var me = $extend(mx.controls.Control);
    var base = {};

    /**
     * 获取一个集合，包含 {@link mx.controls.ToolStrip} 中所有的项（{@link mx.controls.ToolStripItem}
     * 类型）。请使用 {@link setItems} 方法设置该字段的值。
     * 
     * @item mx.controls.ToolStripItem
     * @index 项的唯一标识（{@link mx.controls.ToolStripItem.name}）或项在集合中的序号（从 0
     *        开始计数）。
     */
    me.items = [];

    /**
     * 获取一个字符串，表示控件的类型。在基类中，该字段的值为“toolStrip”。在派生类 {@link mx.controls.MainMenu}
     * 中，{@link mx.controls.MainMenu.toolStripType} 为“mainMenu”；在
     * {@link mx.controls.ContextMenu} 中，{@link mx.controls.ContextMenu.toolStripType}
     * 为“contextMenu”。
     * 
     * @default toolStrip
     */
    me.toolStripType = "toolStrip";

    /**
     * 获取 {@link items} 集合中项的默认类型。在基类中，默认类型为 {@link mx.controls.ToolStripItem}。在派生类
     * {@link mx.controls.MainMenu} 和 {@link mx.controls.ContextMenu} 中，默认类型都为
     * {@link mx.controls.MenuItem}。
     * 
     * @default mx.controls.ToolStripItem
     */
    me.defaultItemType = mx.controls.ToolStripItem;

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
     * 获取 {@link mx.controls.ToolStripItem} 图片的大小。该字段必须在初始化前设置。
     * 
     * @default 16
     */
    me.imageSize = 16;

    /**
     * @ignore
     */
    me.dropDownChildItem = null;
    
    
    /**
     * 获取或设置菜单项的对齐方式，请在初始化之前设置该字段的值。
     * <p>
     * 该字段的可选值包括:
     * <ul>
     * <li>right</li>
     * <li>left</li>
     * </ul>
     * </p>
     * 
     * @default left
     * {@exclude mx.controls.ContextMenu}
     */
    me.itemAlign = "left";
    
    
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
     * @ignore
     */
    me.direction = "horizontal";
    
    /**
     * @ignore
     */
    me.eTag = "<ul/>";

    /**
     * 当单击控件中 {@link mx.controls.ToolStripItem} 的时候，将触发该事件。
     * 
     * @param item
     *            一个 {@link mx.controls.ToolStripItem} 对象。表示当前被点击的项。
     */
    me.onitemclick = null;

    /**
     * 当鼠标在 {@link mx.controls.ToolStripItem} 上按下时触发该事件。
     * 
     * @param item
     *            一个 {@link mx.controls.ToolStripItem} 对象。表示当前被点击的项。
     */
    me.onitemmousedown = null;

    /**
     * 当子项显示时，会触发该事件。调用 {@link mx.controls.ToolStripItem.dropDown} 方法后会触发该事件。
     */
    me.ondropdown = null;

    /**
     * 当子项收缩时，会触发该事件。调用 {@link mx.controls.ToolStripItem.hideDropDown} 方法后会触发该事件。
     */
    me.onhidedropdown = null;
    
    /**
     * @ignore
     */
    me.$right_scroll_div = null;
    
    /**
     * @ignore
     */
    me.$left_scroll_div = null;

    base.init = me.init;
    me.init = function()
    {
        base.init();
        if (me.$e[0].tagName != "UL")
        {
            throw new Error(mx.err("CONTROL_WRONG_TAG",
            ["mx.controls.ToolStrip", "UL"]));
        }

        me.$e.userSelectable(false);
        me.$e.contextmenu(function()
        {
            return false;
        });

        if ($isArray(me.items))
        {
            var items = me.items;
            me.items = [];
            me.appendItems(items);
        }            
    };

    /**
     * 返回一个 Boolean 值，表示控件是否有项，也表示 {@link items} 集合的 length 属性是否大于 0。如果该值为
     * true，则表示控件中有项；反之则没有。
     */
    me.hasChildren = function()
    {
        return me.items.length > 0;
    };
    
   
    
    /**
     * 在指定位置插入一个 {@link mx.controls.ToolStripItem} 对象。
     * @param p_position 表示待插入的位置，通常是一个索引值。
     * @param p_item 表示待插入的 {@link mx.controls.ToolStripItem} 对象实例或者 JSON 对象。
     * @param p_direction 一个 Boolean 值，该值表示插入的方向，当值为 true 表示向后插入，反之为向前插入。默认为 true。
     */
    me.insertItem = function(p_position, p_item, p_direction)
    {
        var args = arguments;
        var argsLength = arguments.length;
        var position = 0;
        var item = null;
        var direction = true;
        var setPosition = function(p_position)
        {
            var length = me.items.length;
            if (p_position >= length)
            {
                 position = length > 0 ? length - 1: 0;
            }
            else if (p_position < 0)
            {
                 position = 0;
            }
            else
            {
                 position = p_position;
            }
          
        }; 
        var setItem = function(p_item)
        {
            if ($isEqual(p_item, "-"))
            {
                item = me._createSeparator(p_item);
            }
            else if ($.isPlainObject(p_item))
            {
                item = me._createItem(p_item);
            }
            else if ($instanceOf(p_item, me.defaultItemType) || $instanceOf(p_item, mx.controls.ToolSeparator))
            {
                item = p_item;
            }
        };
        switch (argsLength)
        {
            case 1:
                if ($isObject(p_position) || $isEqual(p_item, "-"))
                    setItem(p_position);
                break;
            case 2:
                if ($isNumber(p_position) && ($isObject(p_item) || $isEqual(p_item, "-")))
                {
                    setPosition(p_position);
                    setItem(p_item)
                }
                else if (($isObject(p_position) || $isEqual(p_position, "-")) && $isBoolean(p_item))
                {
                    setItem(p_position);
                    direction = p_item;
                }
                break;
            case 3:
                if ($isNumber(p_position) && ($isObject(p_item) || $isEqual(p_item, "-")) && $isBoolean(p_direction))
                {
                    setPosition(p_position);
                    setItem(p_item);
                    direction = p_direction;
                }
                break;
            default:
                break;
        }
        if ($notEmpty(item))
        {
            item = me._insertItem(position, item, direction);
        }
        return item;
    };
     
    /**
     * 在指定位置前插入一个 {@link mx.controls.ToolStripItem} 对象。
     * @param p_position 表示插入的位置，通常是一个索引值。
     * @param p_item 表示待插入的 {@link mx.controls.ToolStripItem} 对象实例或者 JSON 对象。
     */
    me.insertItemBefore = function(p_position, p_item)
    {
        me.insertItem(p_position, p_item, false);
    };
    
    /**
     * 在指定位置后插入一个 {@link mx.controls.ToolStripItem} 对象。
     * @param p_position 表示插入位置，通常是一个索引值。
     * @param p_item 表示待插入的 {@link mx.controls.ToolStripItem} 对象实例或者 JSON 对象。
     */
    me.insertItemAfter = function(p_position, p_item)
    {
        me.insertItem(p_position, p_item, true);  
    };
    
    /**
     * 在指定位置插入一个 {@link mx.controls.ToolSeparator} 分隔符。
     * @param p_position 表示插入的位置，通常是一个索引值。
     * @param p_item 表示待插入的 {@link mx.controls.ToolSeparator} 对象实例或者 字符串分割符 "-" 。
     * @param p_direction 一个 Boolean 值，该值表示插入的方向，当值为 true 表示向后插入，反之为向前插入。默认为 true。
     */
    me.insertSeparator = function(p_position, p_item, p_direction)
    {
    	me.insertItem(p_position, p_item, p_direction);
    };
    
    /**
     * 在指定位置前插入一个 {@link mx.controls.ToolSeparator} 分隔符。
     * @param p_position 表示插入的位置，通常是一个索引值。
     * @param p_item 表示待插入的 {@link mx.controls.ToolSeparator} 对象实例或者 字符串分割符 "-" 。
     */
    me.insertSeparatorBefore = function(p_position, p_item)
    {
    	me.insertItem(p_position, p_item, false);
    };
    
     /**
     * 在指定位置后插入一个 {@link mx.controls.ToolSeparator} 分隔符。
     * @param p_position 表示插入的位置，通常是一个索引值。
     * @param p_item 表示待插入的 {@link mx.controls.ToolSeparator} 对象实例或者 字符串分割符 "-" 。
     */
    me.insertSeparatorAfter = function(p_position, p_item)
    {
    	me.insertItem(p_position, p_item, true);
    };
    
    /**
     * @ignore
     */
    me._insertItem = function(p_position, p_item, p_direction)
    {
        p_item.parent = null;
        p_item.owner = me;        
        var items = me.items;
        var length = items.length;
        var siblingItem = me.items[p_position];
        var index = 0;
        
        if (length > 0)
        {
            index = p_direction ? p_position + 1: p_position;
        }
       
        for (var i = length - 1; i >= index; i--)
        {
           items[i+1] = items[i]; 
        }
        
        items[index] = p_item;
        
        if ($instanceOf(p_item, me.defaultItemType))
        {
        	 items["#" + p_item.name] = p_item;
        }       
        
        if ($notEmpty(siblingItem))
        {
             p_direction ? siblingItem.$e.after(p_item.$e) : siblingItem.$e.before(p_item.$e);
        }
        else
        {
            me.$e.append(p_item.$e);
        }
        return p_item;
    };
    
    /**
     * 创建一个 {@link mx.controls.ToolStripItem} 对象。
     * @ignore
     */
    me._createItem = function(p_name, p_text, p_image)
    {
        var item = null, name, options;
        if ($.isPlainObject(p_name))
        {
        	name = p_name.name;
        	options = {
        		useSymbol: $isEmpty(p_name.useSymbol) ? me.useSymbol: p_name.useSymbol,
        		symbolSize:  $isEmpty(p_name.useSymbol) ? me.symbolSize: p_name.symbolSize,
        		parent: null,
        		owner:me
        	};
        	options = $.extend(p_name, options);
        }
        else if ($instanceOf(p_name, me.defaultItemType))
        {
        	item = p_name;
        	name = item.name;
        }
        else 
        {
        	options = {
        		parent : null,
                owner : me,
                name : p_name,
                text : p_text,
                imageUrl : p_image,
                useSymbol : me.useSymbol,
                symbolSize : me.symbolSize
        	};
        	name = p_name;
        }
        
        if ($notEmpty(me.getItemByName(name)))
        {
        	mx.indicate("warn", mx.err("DUPLICATED_ITEM", [ name ]));
        	return null;
        }
        
        if ($isEmpty(item))
        {
        	item = new me.defaultItemType(options);
        }
  
        return item;
    };
    
    /**
     * 将 {@link mx.controls.ToolStripItem} 对象添加到集合 {@link items} 中，并返回该对象。
     * 
     * @overload function(p_item)
     * @overload function(name,text)
     * @overload function(p_name,p_text,p_image)
     * 
     * @param p_name
     *            一个字符串，表示添加的 {@link mx.controls.ToolStripItem} 对象的名称（{@link mx.controls.ToolStripItem.name}
     *            字段的值）；当参数只有 p_name 一个时，也可以作为一个 JSON 对象（如 { name:"new",
     *            text:"新建" }），表示 {@link mx.controls.ToolStripItem} 的一组属性值。
     * @param [p_text]
     *            一个字符串，表示 {@link mx.controls.ToolStripItem} 对象的
     *            {@link mx.controls.ToolStripItem.text} 字段的值。
     * @param [p_image]
     *            一个字符串，表示 {@link mx.controls.ToolStripItem} 图标的 URL。详见
     *            {mx.controls.ToolStripItem.iamge} 字段。
     * @param p_item
     *            一个 {@link mx.controls.ToolStripItem} 对象，表示要添加的项。
     */
    me.appendItem = function(p_name, p_text, p_image)
    {
        var item = me._createItem(p_name, p_text, p_image);
        if ($notEmpty(item))
            me._appendItem(item);
        return item;
    };

    /**
     * 向 {@link mx.controls.ToolStrip} 的项集合（{@link items} 集合）中添加一组新项。
     * 
     * @param p_items
     *            一个数组，该数组包含了一组{@link mx.controls.ToolStripItem}对象
     */
    me.appendItems = function(p_items)
    {
        if ($isArray(p_items))
        {
            for ( var i = 0; i < p_items.length; i++)
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
        me.setEnabled(me.enabled);
    };

    /**
     * 将 {@link mx.controls.ToolSeparator} 分隔符添加到集合 {@link items} 中，并返回该对象。
     * 
     * @param [p_name]
     *            一个 {@link mx.controls.ToolSeparator} 对象；或一个 JSON 对象，表示
     *            {@link mx.controls.ToolSeparator} 对象的一组属性值。
     */
    me.appendSeparator = function(p_name)
    {
        var sep = me._createSeparator(p_name);
        if ($notEmpty(sep))
            me._appendItem(sep);
        return sep;
    };
    
    /**
     * @ignore
     */
    me._createSeparator = function(p_sep)
    {
        var sep = null;
         if ($instanceOf(p_sep, mx.controls.ToolSeparator))
        {
            sep = p_sep;
        }
        else
        {
            sep = new mx.controls.ToolSeparator(p_sep);
        }
        return sep;
    };
    
    /**
     * 设置 {@link items} 字段的值。该方法首先会清空 {@link items} 集合。
     * 
     * @param p_items
     *            一个数组，该数组包含了一组 {@link mx.controls.ToolStripItem} 对象。
     */
    me.setItems = function(p_items)
    {
        me.clearItems();
        me.appendItems(p_items);
    };

    /**
     * 从 {@link items} 集合中移除指定的 {@link mx.controls.ToolStripItem}
     * 对象。从集合中移除项时，有关移除的项的所有信息均会被删除。若要从集合中移除所有项，请使用 {@link clearItems} 方法。该方法只能删除一级菜单项。
     * 
     * @param p_item
     *            一个 {@link mx.controls.ToolStripItem} 对象。
     */
    me.removeItem = function(p_item)
    {
        if (p_item != null)
        {
            me.items.remove(p_item);
            me.items["#" + p_item.name] = null;
            delete me.items["#" + p_item.name];
            
            if(!p_item.disposed)
          	{
          		p_item.dispose();
          	}
        }
    };

    /**
     * 删除指定位置的 {@link mx.controls.ToolStripItem} 对象。
     * 
     * @param p_index
     *            一个数字（如 0），表示 {@link items} 集合中项的序号。
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
     *            {@link mx.controls.ToolStripItem.name} 属性的值。该方法只能删除一级子项。
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
     * 从 {@link items} 集合中移除所有的项。若要从 {@link mx.controls.ToolStrip} 中移除单个项，请使用
     * {@link removeItem} 方法。
     */
    me.clearItems = function()
    {
        while (me.items.length > 0)
        {
            me.removeByIndex(0);
        }
    };

    /**
     * 根据菜单项的名称查找并返回对应的菜单项。如果该菜单项为子菜单中的项，可以使用“/”将上级菜单分隔开来（如 “new/newFile”）。
     * 
     * @param p_commands
     *            一个字符串，表示上级菜单与下级菜单，中间以“/”分隔。
     */
    me.getItem = function(p_commands)
    {
        var commands = p_commands.split("/");
        var index = 0;
        if (commands.length > 0)
        {
            var item = me.getItemByName(commands[index]);
            if (item != null)
            {
                index++;
                while (index < commands.length)
                {
                    item = item.getItemByName(commands[index++]);
                    if (item == null)
                    {
                        return null;
                    }
                }
                if (index == commands.length)
                {
                    return item;
                }
            }
        }
        return null;
    };

    /**
     * 提供一个方法，根据指定的 {@link mx.controls.ToolStripItem.name} 值获取一级
     * {@link mx.controls.ToolStripItem} 项。该方法不支持递归查找，如果需要请使用 {@link getItem}方法 
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
     * 请参见 {@link mx.controls.ToolStripItem.hideDropDown} 方法。该方法仅在
     * {@link dropDownChildItem} 字段不为空时有效。
     */
    me.hideDropDown = function(p_speed)
    {
        if (me.dropDownChildItem != null)
        {
            me.dropDownChildItem.hideDropDown(p_speed);
        }
    };

    /**
     * 将指定的所有菜单项重新布局，并返回一个 Boolean 值，表示是否显示菜单项。规则为第一和最后一个可见项应该为
     * {@link mx.controls.ToolStripItem} 类型，并且中间不能出现连续的分割线。
     */
    me.updateItemsVisibility = function(p_items)
    {
        if ($isArray(p_items))
        {
            var length = p_items.length;
            for ( var i = 0; i < length; i++)
            {
                p_items[i].$e.toggle(p_items[i].visible);
            }

            var firstItemIndex = -1;
            var lastItemIndex = -1;
            var index = 0;
            while (index < length)
            {
                var item = p_items[index];

                if (item.visible && !item.isSeparator)
                {
                    firstItemIndex = lastItemIndex = index;
                }
                else if (item.visible && item.isSeparator)
                {
                    if (firstItemIndex == -1)
                    {
                        item.hide();
                    }
                    else
                    {
                        if (!_hasPreVisibleItem(index, p_items))
                        {
                            item.hide();
                        }
                    }
                }
                index++;
            }

            index = lastItemIndex == -1 ? -1 : lastItemIndex + 1;
            while (index != -1 && index < length)
            {
                var item = p_items[index];
                if (item.visible && item.isSeparator)
                {
                    item.hide();
                }
                index++;
            }
            if (firstItemIndex == -1)
            {
                return false;
            }
            return true;
        }
    };

    /**
     * @ignore
     * 将指定的项（通常是 {@link mx.controls.ToolStripItem} 类型和
     * {@link mx.controls.ToolSeparator} 类型）添加到集合 {@link items} 中，并返回该对象。
     * 
     * @param p_item
     *            一个对象，通常是 {@link mx.controls.ToolStripItem} 类型和
     *            {@link mx.controls.ToolSeparator} 类型。
     */
    me._appendItem = function(p_item)
    {
        p_item.parent = null;
        p_item.owner = me;
        me.items.add(p_item);
        me.items["#" + p_item.name] = p_item;
        if(me.itemAlign == "right")
        {
        	p_item.$e.css("float","right");
        	me.$e.prepend(p_item.$e);
        }
        else
        {
        	me.$e.append(p_item.$e);
        }
        return p_item;
    };

	//added by tiger on 2015/4/7 21:34:16
	base.dispose = me.dispose;
	/**
	 * 释放对象运行时动态生成的内容（属性、方法、事件）。
	 */
	me.dispose = function(){
		me.onitemclick = null;
		me.ondropdown = null;
		me.onhidedropdown = null;	
		me.clearItems();
		
		if (me.$right_scroll_div != null)
		{
			me.$right_scroll_div.off();
			me.$right_scroll_div.empty().remove();
			me.$right_scroll_div = null;
			delete me.$right_scroll_div;
		}
		
		if (me.$left_scroll_div != null)
		{
			me.$left_scroll_div.off();
			me.$left_scroll_div.empty().remove();
			me.$left_scroll_div = null;
			delete me.$left_scroll_div;
		}
		
		if (me.dropDownChildItem != null)
		{
			me.dropDownChildItem.dispose();
		}
		
		base.dispose();
	}
	//end add


    function _hasPreVisibleItem(p_index, p_items)
    {
        for ( var i = p_index - 1; i >= 0; i--)
        {
            var item = p_items[i];
            if (item.visible)
            {
                if (item.isSeparator)
                {
                    return false;
                }
                if (!item.isSeparator)
                {
                    return true;
                }
            }
        }
        return false;
    }

    me.endOfClass(arguments);
    return me;
};
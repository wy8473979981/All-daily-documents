$ns("mx.editors");

/**
 * 提供一个允许用户进行数据选择操作的列表编辑器的类。
 * 
 * @example 以下是一个列表编辑器如何初始化的示例。 
 * <code language="JavaScript">
 * var listEditor = new mx.editors.ListEditor(
 * {
 *     "width" : 80,
 *     "height" : 200,
 *     "displayCheckBox" : true,//显示复选框。
 *     "items" :
 *     [
 *     {
 *         text : "咖啡",
 *         value : "Coffee"
 *     },
 *     {
 *         text : "牛奶",
 *         value : "Milk"
 *     },
 *     {
 *         text : "糖",
 *         value : "Sugar"
 *     } ]//在初始化时指定数据。
 * });
 * 
 * listEditor.appendItem("Apple", "苹果");//也可以动态添加数据项。
 * 
 * </code>
 */
mx.editors.ListEditor = function()
{
    var me = $extend(mx.editors.Editor);
    var base = {};

    /**
     * 获取控件的宽度。可以是数字（如 500）、字符串（如“500px”或“50%”）。
     * 
     * @default auto
     */
    me.width = "auto";

    /**
     * 获取控件的高度。可以是数字（如 500）、字符串（如“500px”或“50%”）。
     * 
     * @default 100%
     */
    me.height = "100%";

    /**
     * 获取一个集合，包含列表中所有的项（{@link mx.editors.ListItem} 类型）。请使用 {@link setItems}
     * 方法设置该字段的值。
     * 
     * @item mx.editors.ListItem
     * @index 项的唯一标识（{@link mx.editors.ListItem.value}）或项在集合中的序号（从 0 开始计数）。
     */
    me.items = [];

    /**
     * 获取或设置一个值，该值表示列表中的每一项之前是否显示一个选择框。如果该值为 true，则表示显示；反之则不显示。该字段必须在初始化前设置。
     */
    me.displayCheckBox = false;

    /**
     * 获取或设置一个值，表示是否显示空值。
     */
    me.displayNullValue = false;
    
    /**
     * 获取一个对象，表示 {@link mx.editors.ListEditor} 中当前选定的项（{@link mx.editors.ListItem}
     * 类型）。
     */
    me.selection = null;

    /**
     * 获取或设置多选值之间的分隔符。当 {@link mx.editors.ListEditor.displayCheckBox} 字段为 true
     * 支持多选时，所有选择项的值会以该分隔符进行分隔。
     * 
     * @default ","
     */
    me.valueSeparator = ",";

    /**
     * 获取或设置要为此 {@link mx.editors.ListEditor} 显示的属性, 值不能设置为"value"。
     */
    me.displayMember = "text";

    /**
     * 获取或设置一个属性，该属性将用作 {@link mx.editors.ListEditor} 中的项的实际值。值不能设置为"text"。
     */
    me.valueMember = "value";

    /**
     * 当控件当前的选择项发生改变后，将触发该事件。调用 {@link selectItem}、 {@link deselectAll}、
     * {@link deselectItem} 和 {@link removeByValue}、 {@link removeByIndex}方法后会触发该事件。
     */
    me.onselectionchanged = null;

    /**
     * 当控件当前的选择项发生改变的时候，将触发该事件。调用 {@link selectItem} 方法时会触发该事件。
     * 
     * @cancelable 一个 Boolean 值，表示是否中止事件。
     * @param item
     *            一个 {@link mx.editors.ListItem} 对象，即将被选择的项。
     * @param cancel   一个 Boolean 值，表示是否中止事件         
     */
    me.onselectionchanging = null;
    
    
    /**
     * 当单击列表中项的时候，将触发该事件。
     * 
     * @param item
     *            一个 {@link mx.editors.ListItem} 对象，被单击的项。
     */
    me.onitemclick = null;
    
    /**
     * 当双击列表中项的时候，将触发该事件。
     * 
     * @param item
     *            一个 {@link mx.editors.ListItem} 对象，被双击的项。
     */
    me.onitemdoubleclick = null;

    /**
     * @ignore
     */
    me._nullItem = null;
    
    base.init = me.init;
    me.init = function()
    {
        base.init();
        me.$list = $("<ul></ul>");
        me.$e.userSelectable(false);
        me.$e.append(me.$list);
        me.$e.addClass("listEditor");
        me.$e.on("click", "li", _item_click);
        me.$e.on("dblclick", "li", _item_dblclick);
        if (me.displayCheckBox)
        {
            me.$list.addClass("checkListEditor");
        }
        
        if (me.displayNullValue)
        {
            me._nullItem = new mx.editors.ListItem({value:"null", text:"", owner:me});
            me._nullItem.$e.addClass("nullItem");
            me._nullItem.$e.find("#text").text(mx.msg("NULLVALUE"));
        }
        
        me.differDisplayValue = (me.displayMember != me.valueMember);
        
        if (me.items == null)
        {
            me.items = [];
        }
        else
        {
            var items = me.items;
            me.items = [];
            me.setItems(items);
        }
        me._initDefaultValue();
        if (me.readOnly)
        {
            me.setReadOnly(me.readOnly);
        }
    };
	
	base.dispose = me.dispose;
    me.dispose = function(){
		me.clearItems();
		me.$list.empty().remove();
		me.$list=null;
		delete me.$list;
			
		base.dispose();
		base=null;
	}

    /**
     * 向 {@link mx.editors.ListEditor} 的项列表（{@link items} 集合）添加项，并返回该
     * {@link mx.editors.ListItem} 对象。
     * 
     * @param p_text
     *            一个字符串，表示要添加的 {@link mx.editors.ListItem} 的
     *            {@link mx.editors.ListItem.text} 属性；或者一个
     *            {@link mx.editors.ListItem} 对象；或者一个自定义对象。
     * @param [p_value=null]
     *            一个字符串，表示要添加的 {@link mx.editors.ListItem} 的
     *            {@link mx.editors.ListItem.value} 属性
     */
    me.appendItem = function(p_text, p_value)
    {
        var item, value, text, args= arguments, argsLength = args.length;
        if (argsLength == 1)
        {
        	if ($.isPlainObject(p_text))
	        {
	        	value = p_text[me.valueMember];
	        	text = p_text[me.displayMember];
	        }
	        else if ($instanceOf(p_text, mx.editors.ListItem))
	        {
	        	value = p_text[me.valueMember];
	        	text = p_text[me.displayMember];
	        	item = p_text;
	        }
	        else if ($isString(p_text) || $isNumber(p_text))
	        {
	        	value = p_text;
	        	text = p_text;
	        }
        }
        else if (argsLength == 2)
        {
        	if ($isString(p_text) || $isNumber(p_text))
        	{
        		value = p_value;
        		text = p_text;
        	}
        }
        
     	if ($notEmpty(item))
     	{
     		if ($notEmpty(item.owner))
            {
            	item.owner.deselectItem(item);
            	item.owner.items.remove(item);
            	item.owner = me;
            }
            if (!item.initialized)
            {
                item.init();
            }
     	}
     	else
     	{
     		item = new mx.editors.ListItem(
            {
                "value" : value,
                "text" : text,
                owner : me
            });
     	}
     	
     	var itemFound = false;
     	
     	if (typeof item["value"] == "undefined")
     	{// 添加的 item 没有 value 属性,禁止添加
     		itemFound = true;
     	}
     	else
     	{
     		for(var i = 0;i < me.items.length; i++)
        	{
     			if(item["value"] == me.items[i]["value"] || ($isEmpty(item["value"]) && $isEmpty(item["text"]) && $isEqual(me.items[i], me._nullItem)))
        		{
        			itemFound = true;
        			break;
        		}
        	}
     	}
     	
     	if(!itemFound)
     	{
            me.items.add(item);
            me.$list.append(item.$e);
     	}

        return item;
    };

    /**
     * 提供一个方法，根据 {@link mx.editors.ListItem.value} 属性获取对应的
     * {@link mx.editors.ListItem} 对象。
     * 
     * @param p_value
     *            一个数字或者字符串，表示要获取的 {@link mx.editors.ListItem} 对象的
     *            {@link mx.editors.ListItem.value} 属性的值。
     */
    me.getItemByValue = function(p_value)
    {
        var result = mx.utils.JsonUtil.getItem(me.items, "value", p_value);
        if ($isEmpty(result))
        {
            return null;
        }
        return result;
    };

    /**
     * 向 {@link mx.editors.ListEditor} 的项列表（{@link items} 集合）添加一组项。
     * 
     * @param p_items
     *            一个数组，该数组包含了一组 {@link mx.editors.ListItem} 对象。
     * 
     * @example 以下是为 {@link mx.editors.ListEditor} 添加一组
     *          {@link mx.editors.ListItem} 的示例。 
     * <code language="JavaScript">
     * listEditor.appendItems([
     *     { text: "苹果", value: "Apple" },
     *     { text: "牛奶", value: "Milk" },
     *     { text: "糖", value: "Sugar" }
     * ]);         
     * </code>
     */
    me.appendItems = function(p_items)
    {
        for ( var i = 0; i < p_items.length; i++)
        {
            var item = p_items[i];
            me.appendItem(item);
        }
    };

    /**
     * 从 {@link items} 集合中移除指定的 {@link mx.editors.ListItem} 对象，若该对象是控件当前的选中项，则触发
     * {@link onselectionchanged} 事件。从列表中移除项时，有关移除的项的所有信息均会被删除。若要从列表中移除所有项，请使用
     * {@link clearItems} 方法。
     * 
     * @overload function(p_item)
     * @overload function(p_item, p_triggerEvent)
     * 
     * @param p_item
     *            一个 {@link mx.editors.ListItem} 对象。
     * @param [p_triggerEvent=false]
     *            一个 Boolean 值，表示是否要触发事件。如果该值为 true，则触发事件；反之则不触发。
     */
    me.removeItem = function(p_item, p_triggerEvent)
    {
        // 如果被移除的项处于选中状态，需要解除选中，并在最后刷新编辑器的值
        var valChanged = false;
        if (p_item.checked)
        {
            p_item.toggleChecked();
            valChanged = true;
        }
        if (me.selection == p_item)
        {
            me.deselectItem(p_item);
            valChanged = true;
        }

        me.items.remove(p_item);
        p_item.dispose();

        if (valChanged)
        {
            base.setValue(_getEditorValue(), p_triggerEvent);
        }
    };

    /**
     * 提供一个方法，删除指定位置的 {@link mx.editors.ListItem} 对象。
     * 
     * @param p_index
     *            一个数字，表示要删除的 {@link mx.editors.ListItem} 项的位置。
     */
    me.removeByIndex = function(p_index)
    {
        me.removeItem(me.items[p_index]);
    };

    /**
     * 提供一个方法，根据指定值删除 {@link mx.editors.ListItem} 对象。
     * 
     * @param p_value
     *            一个数字或者字符串，表示要刪除的 {@link mx.editors.ListItem} 对象的
     *            {@link mx.editors.ListItem.value} 属性的值。
     */
    me.removeByValue = function(p_value)
    {
        var item = me.getItemByValue(p_value);
        if ($notEmpty(item))
        {
            me.removeItem(item);
        }
    };

    /**
     * 从 {@link items} 集合中移除所有项。若要从 {@link mx.editors.ListEditor} 中移除单个项，请使用
     * {@link removeByValue} 或 {@link removeByIndex} 方法。
     */
    me.clearItems = function()
    {
        me.deselectAll();
        while (me.items.length > 0)
        {
            me.removeItem(me.items[0]);
        }
    };

    /**
     * 设置 {@link items} 字段的值。该方法首先会清空 {@link items} 集合。
     * 
     * @param p_items
     *            一个数组，该数组包含了一组 {@link mx.editors.ListItem} 对象。
     */
    me.setItems = function(p_items)
    {
        me.clearItems();
        if (me.displayNullValue)
        {
        	if(me._nullItem.$e == undefined){
        		me._nullItem = new mx.editors.ListItem({value:"null", text:"", owner:me});
                me._nullItem.$e.addClass("nullItem");
                me._nullItem.$e.find("#text").text(mx.msg("NULLVALUE"));
        	}
        	me.appendItem(me._nullItem);
        	
        }
        me.appendItems(p_items);
    };

    /**
     * 选择 {@link mx.editors.ListEditor} 列表中的指定项。
     * 
     * @overload function(p_item)
     * @overload function(p_item, p_triggerEvent)
     * 
     * @param p_item
     *            一个 {@link mx.editors.ListItem} 对象。
     * @param [p_triggerEvent=false]
     *            一个 Boolean 值，表示是否要触发事件。如果该值为 true，则触发事件；反之则不触发。
     */
    me.selectItem = function(p_item, p_triggerEvent)
    {
        if (p_triggerEvent)
        {
            var args =
            {
                cancel : false,
                item : p_item
            };

            me.trigger("selectionchanging", args);

            if (args.cancel)
            {
                return;
            }
        }
        if (me.selection != null)
        {
            me.selection.$e.removeClass("selected");
        }
        if (p_item != null)
        {
            p_item.$e.addClass("selected");
            me.selection = p_item;
            if (me.displayCheckBox)
            {
                me.selection.toggleChecked();
            }
            base.setValue(_getEditorValue(), true);
            if (p_triggerEvent)
            {
                me.trigger("selectionchanged");
            }
        }
    };

    /**
     * 提供一个方法，选中指定位置的 {@link mx.editors.ListItem} 项。
     * 
     * @param p_index
     *            一个数字，表示要选中的项所在的位置。
     * @param [p_triggerEvent=false]
     *            一个 Boolean 值，表示是否要触发事件。如果该值为 true，则触发事件；反之则不触发。
     */
    me.selectByIndex = function(p_index, p_triggerEvent)
    {
        me.selectItem(me.items[p_index], p_triggerEvent);
    };

    /**
     * 提供一个方法，根据指定值选中 {@link mx.editors.ListItem} 项。
     * 
     * @param p_value
     *            一个数字或者字符串，表示要选中的 {@link mx.editors.ListItem} 对象的
     *            {@link mx.editors.ListItem.value} 属性的值。
     * @param [p_triggerEvent=false]
     *            一个 Boolean 值，表示是否要触发事件。如果该值为 true，则触发事件；反之则不触发。
     */
    me.selectByValue = function(p_value, p_triggerEvent)
    {
        var item = me.getItemByValue(p_value);
        if ($notEmpty(item))
        {
            me.selectItem(item, p_triggerEvent);
        }
        else
        {
        	// 初始化时 _initDefaultValue 把 value 赋值为 null 了，此时没有 items，me.value 手动改回。
        	// 或者没有 me.items 时， me.value 应该等于 p_value;
        	me.value = p_value;
        }
    };

    /**
     * 清除对 {@link mx.editors.ListEditor} 中指定项的选定。该方法只有当指定项与 {@link selection}
     * 字段相同时，才有效。
     * 
     * @overload function(p_item)
     * @overload function(p_item, p_triggerEvent)
     * 
     * @param p_item
     *            一个 {@link mx.editors.ListItem} 对象，表示要清除对该项的选定。
     * @param [p_triggerEvent=false]
     *            一个 Boolean 值，表示是否要触发事件。如果该值为 true，则触发事件；反之则不触发。
     */
    me.deselectItem = function(p_item, p_triggerEvent)
    {
        if (p_item == null)
        {
            return;
        }
        if (me.selection == p_item)
        {
            me.selection.$e.removeClass("selected");
            me.selection = null;
        }
        if (p_triggerEvent)
        {
            me.trigger("selectionchanged");
        }
    };

    /**
     * 提供一个方法，取消选中指定位置的 {@link mx.editors.ListItem} 项。
     * 
     * @param p_index
     *            一个数字，表示要取消选中的项所在的位置。
     * @param [p_triggerEvent=false]
     *            一个 Boolean 值，表示是否要触发事件。如果该值为 true，则触发事件；反之则不触发。
     */
    me.deselectByIndex = function(p_index, p_triggerEvent)
    {
        me.deselectItem(me.items[p_index], p_triggerEvent);
    };

    /**
     * 提供一个方法，根据指定值取消选中 {@link mx.editors.ListItem} 项。
     * 
     * @param p_value
     *            一个数字或者字符串，表示要取消选中的 {@link mx.editors.ListItem} 对象的
     *            {@link mx.editors.ListItem.value} 属性的值。
     * @param [p_triggerEvent=false]
     *            一个 Boolean 值，表示是否要触发事件。如果该值为 true，则触发事件；反之则不触发。
     */
    me.deselectByValue = function(p_value, p_triggerEvent)
    {
        var item = me.getItemByValue(p_value);
        if ($notEmpty(item))
        {
            me.deselectItem(item, p_triggerEvent);
        }
    };

    /**
     * 清除对 {@link mx.editors.ListEditor} 当前的选中项的选定。使用该方法后，{@link selection}
     * 字段变为空。
     */
    me.deselectAll = function()
    {
        if (me.selection != null)
        {
            me.deselectItem(me.selection);
        }
    };

    /**
     * 将所有的项设为选中状态，即将列表中所有的 {@link mx.editors.ListItem} 对象的
     * {@link mx.editors.ListItem.checked} 字段设为 true。 该方法仅在
     * {@link displayCheckBox} 字段值为 true 时有效。
     */
    me.checkAll = function()
    {
        _doCheckAll(true);
    };

    /**
     * 将列表中的所有项都设置为未选中状态，即将列表中所有的 {@link mx.editors.ListItem} 对象的
     * {@link mx.editors.ListItem.checked} 字段设为 false。 该方法仅在
     * {@link displayCheckBox} 字段值为 true 时有效。
     * 
     * @param [p_triggerEvent=false]
     *            一个 Boolean 值，表示是否要触发事件。如果该值为 true，则触发事件；反之则不触发。
     */
    me.uncheckAll = function()
    {
        _doCheckAll(false);
    };

    /**
     * 返回一个集合，包含列表中所有的选中项（{@link mx.editors.ListItem} 类型）。
     */
    me.getCheckedItems = function()
    {
        var checkedItems = [];
        if (me.displayCheckBox && me.items != null)
        {
            for ( var i = 0; i < me.items.length; i++)
            {
                if (me.items[i].checked)
                {
                    checkedItems.add(me.items[i]);
                }
            }
        }
        return checkedItems;
    };

    /**
     * 设置 {@link mx.editors.ListEditor} 中当前选中的项。
     * 
     * @overload function(p_value)
     * @overload function(p_value, p_triggerEvent)
     * 
     * @param p_value
     *            一个字符串或一个数组。当 {@link displayCheckBox} 属性为 false 时，参数为要选中的项
     *            {@link mx.editors.ListItem} 的
     *            {@link mx.editors.ListItem.value} 属性；当 {@link displayCheckBox}
     *            属性为 true 时，参数为一个由 {@link valueSeparator} 将多个
     *            {@link mx.editors.ListItem.value} 连接起来组成的字符串，或者由 多个
     *            {@link mx.editors.ListItem.value} 组成的数组。
     * @param [p_triggerEvent=false]
     *            一个 Boolean 值，表示是否要触发事件。如果该值为 true，则触发事件；反之则不触发。
     */
    base.setValue = me.setValue;
    me.setValue = function(p_value, p_triggerEvent)
    {
        if (me.displayCheckBox)
        {
            me.uncheckAll();
            var valueArray = new Array();
            if ($isArray(p_value))
            {
                valueArray = p_value;
            }
            else if ($notEmpty(p_value))
            {
                valueArray = p_value.split(me.valueSeparator);
            }

            for ( var i = 0; i < valueArray.length; i++)
            {
                var item = me.getItemByValue(valueArray[i]);
                if (item != null)
                {
                    item.setChecked(true);
                }
            }
            base.setValue(p_value, p_triggerEvent);
        }
        else
        {
            me.selectByValue(p_value, p_triggerEvent);
        }
    };

    /**
     * 根据指定的 {@link mx.editors.ListItem.text} 值，在列表中查找相应的
     * {@link mx.editors.ListItem} 对象并返回（如果有多个 {@link mx.editors.ListItem}，只返回第一个）。如果没有查找到，则返回
     * null。
     * 
     * @param p_text
     *            一个字符串，表示要查找的 {@link mx.editors.ListItem} 对象的
     *            {@link mx.editors.ListItem.text} 值。
     */
    me.findItemByText = function(p_text)
    {
        var item = null;
        for ( var i = 0; i < me.items.length; i++)
        {
            if (me.items[i].text == p_text)
            {
                item = me.items[i];
                break;
            }
        }
        return item;
    };

    /**
     * 设置 {@link mx.editors.ListEditor} 中当前选中的项。
     * 
     * @overload function(p_text)
     * @overload function(p_text, p_triggerEvent)
     * 
     * @param p_text
     *            一个字符串或一个数组。当 {@link displayCheckBox} 属性为 false 时，参数为要选中的项
     *            {@link mx.editors.ListItem} 的 {@link mx.editors.ListItem.text}
     *            属性；当 {@link displayCheckBox} 属性为 true 时，参数为一个由
     *            {@link valueSeparator} 将多个 {@link mx.editors.ListItem.text}
     *            连接起来组成的字符串，或者由 多个 {@link mx.editors.ListItem.text} 组成的数组。
     */
    me.setText = function(p_text, p_triggerEvent)
    {
        var textArray = new Array();
        if ($isArray(p_text))
        {
            textArray = p_text;
        }
        else if ($notEmpty(p_text))
        {
            textArray = p_text.split(me.valueSeparator);
        }
        var values = "";
        for ( var i = 0; i < textArray.length; i++)
        {
            var valItem = me.findItemByText(textArray[i]);
            if (valItem != null)
            {
                values = values + me.valueSeparator + valItem.value;
            }
        }
        if (values.length > 0)
        {
            me.setValue(values.substring(1));
        }
        else
        {
            me.setValue(values);
        }
    };

    /**
     * 返回一个集合，包含列表中所有选中项的 {@link mx.editors.ListItem.value} 值。
     */
    me.getCheckedValues = function()
    {
        var checkedValues = [];
        if (me.displayCheckBox && me.items != null)
        {
            for ( var i = 0; i < me.items.length; i++)
            {
                if (me.items[i].checked)
                {
                    checkedValues.add(me.items[i].value);
                }
            }
        }
        return checkedValues;
    };

    /**
     * 设置 {@link readOnly} 字段的值。
     */
    me.setReadOnly = function(p_readOnly)
    {
        if (typeof(p_readOnly) == "undefined")
        {
            p_readOnly = true;
        }
        me.readOnly = p_readOnly;
        
        me.$wrap().toggleClass("readOnly", me.readOnly);
    };
    
    base.reset = me.reset;
    
    /**
     *将选中状态和样式也一并重置 
     */
    me.reset = function(){
        me.uncheckAll();
    	me.deselectItem(me.selection);	
    	base.reset();
    }
    
    /**
     * @ignore
     * 获取一个字符串，表示 {@link mx.editors.ListEditor} 中当前选中的项
     * {@link mx.editors.ListItem} 的值。 当 {@link displayCheckBox} 属性为 false
     * 时，返回当前 {@link selection} 的值； 当 {@link displayCheckBox} 属性为 true 时，将所有
     * CheckBox 被勾选的项 {@link mx.editors.ListItem} 的
     * {@link mx.editors.ListItem.value} 属性用 {@link valueSeparator} 拼接成一个字符串。
     */
    function _getEditorValue()
    {
        var nowValue = "";
        if (me.displayCheckBox)
        {
            if (me.items != null)
            {
                for ( var i = 0; i < me.items.length; i++)
                {
                    if (me.items[i].checked)
                    {
                        nowValue = nowValue + me.valueSeparator
                                + me.items[i].value;
                    }
                }
            }
            if (nowValue.length > 0)
            {
                nowValue = nowValue.substring(me.valueSeparator.length);
            }
        }
        else
        {
            if (me.selection == null)
            {
                nowValue = null;
            }
            else
            {
                nowValue = me.selection.value;
            }
        }
        return nowValue;
    }

    function _doCheckAll(p_checked)
    {
        if (me.displayCheckBox && me.items != null)
        {
            for ( var i = 0; i < me.items.length; i++)
            {
                if (me.items[i].checked != p_checked)
                {
                    me.items[i].setChecked(p_checked);
                }
            }
        }
    }

    function _item_click(p_event)
    {
    	if(me.enabled == false)
    	{
    		return;
    	}
    	var args =
        {
            item : $(p_event.currentTarget).data("item")
        };
        me.selectByValue(p_event.currentTarget.id, true);
        me.trigger("itemclick", args);
        p_event.stopPropagation();
    }

    function _item_dblclick(p_event)
    {
    	if(me.enabled == false)
    	{
    		return;
    	}
        var args =
        {
            item : $(p_event.currentTarget).data("item")
        };
        me.trigger("itemdoubleclick", args);
        p_event.stopPropagation();
    }

    me.endOfClass(arguments); 
    return me;
};


/**
 * 提供一个在 {@link mx.editors.ListEditor} 控件中显示的列表项的类。另请参见 {@link mx.editors.ListEditor}类。
 */
mx.editors.ListItem = function()
{
    var me = $extend(MXComponent);
    var base = {};

    /**
     * 获取该对象的实际值。该字段也是该对象在 {@link mx.editors.ListEditor} 所有项中的唯一标识。请使用
     * {@link setValue} 方法设置该字段的值。注意该字段不能是数字。
     * 必须要设置该属性
     */
    me.value = null;

    /**
     * 获取该对象的显示值。请使用 {@link setText} 方法设置该字段的值。
     * 必须要设置该属性
     */
    me.text = null;

    /**
     * 获取一个值，表示该对象是否处于选中状态。如果该值为 true，则表示选中；反之则不选中。 请使用 {@link setChecked}
     * 方法设置该字段的值。
     * 
     * @default false
     */
    me.checked = false;

    /**
     * 获取该对象的父容器的对象，通常是一个 {@link mx.editors.ListEditor} 类的实例。
     * 
     * @default null
     */
    me.owner = null;

    /**
     * 初始化数据项。
     */
    base.init = me.init;
    me.init = function()
    {
        base.init();
        
        me.$e = $("<li><a href='javascript:void(0)' style='text-decoration:none;'><span id='text'/></a></li>");
        if (me.owner != null)
        {
            if (me.owner.displayCheckBox)
            {
                me.$e.find("a").prepend($("<span id=img/>"));
            }
        }
        if (me.text != null)
        {
            me.setText(me.text);
        }
        if (me.value != null)
        {
            me.setValue(me.value);
        }
        if (me.checked)
        {
            me.setChecked(me.checked);
        }
        me.$e.data("item", me);
    };
	
	base.dispose = me.dispose;
    me.dispose = function(){
		me.owner=null;
		me.$e.find("*").removeAttr("href").removeAttr("style").removeAttr("id").removeAttr("title").removeClass();
		me.$e.removeAttr("id");
		me.$e.removeData("item");
		me.$e.empty().remove();
		me.$e=null;		
		
		base.dispose();
		base=null;
	}

    /**
     * 设置 {@link text} 字段的值。
     * @param p_text 一个字符串
     */
    me.setText = function(p_text)
    {
        me.text = p_text;
        me.$e.find("#text").text(me.text != null ? me.text : "");
        me.$e.find("#text").attr("title", me.text != null ? me.text : "");
    };

    /**
     * 设置 {@link value} 字段的值。
     * @param p_value
     */
    me.setValue = function(p_value)
    {
        me.value = p_value;
        me.$e.attr("id", me.value);
    };

    /**
     * 设置 {@link checked} 字段的值。
     * 
     * @param p_checked
     *            一个 Boolean 值，表示是否要选中当前项。
     */
    me.setChecked = function(p_checked)
    {
        me.checked = p_checked;
        me.$e.toggleClass("checked", me.checked);
    };

    /**
     * 切换选中状态。
     */
    me.toggleChecked = function()
    {
        if (me.owner && me.owner.enabled && !me.owner.readOnly)
        {
        	me.setChecked(!me.checked, true);
        }
    };

    /**
     * 删除当前项。该方法仅当 {@link owner} 字段不为空时有效。
     */
    me.remove = function()
    {
        if (me.owner != null)
        {
            me.owner.removeItem(me);
        }
    };

    /**
     * 返回该对象在 {@link mx.editors.ListEditor} 的
     * {@link mx.editors.ListEditor.items} 集合中的序号（0 代表第一个）。如果该对象的 {@link owner}
     * 字段为空，则返回 -1。
     */
    me.getIndex = function()
    {
        return me.owner != null ? me.owner.items.indexOf(me) : -1;
    };

    /**
     * 设置 {@link mx.editors.ListEditor} 的滚动条的顶部偏移值（该对象容器到父容器的顶部偏移值）。
     */
    me.scrollIntoView = function()
    {
        var top = me.$e.get(0).offsetTop;
        me.$e.parent().scrollTop(top);
    };

    me.endOfClass(arguments); 
    return me;
};
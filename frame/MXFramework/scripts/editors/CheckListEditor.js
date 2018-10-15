$ns("mx.editors");

$import("mx.editors.CheckEditor");

/**
 * 一个提供组合单选或者复选项的编辑器类。
 * 
 * @example 
 * 以下是一个创建 {@link mx.editors.CheckListEditor} 的示例。 该示例将说明如何创建一个
 *          {@link mx.editors.CheckListEditor}，以及如何订购事件。 
 * <code language="JavaScript">
 * var checkListEditor = new mx.editors.CheckListEditor(
 * {
 *     type:"radio", 
 *     items:[
 *         {text: "变电站1", value: "xx-001"},
 *         {text: "变电站2", value: "xx-002"}, 
 *         {text: "变电站3", value: "xx-003"}],
 *     onitemchanged:_changed
 * });
 * 
 * function _changed(e)
 * {
 *     alert(e.item.value);
 * }
 * </code>
 */
mx.editors.CheckListEditor = function()
{
    var me = $extend(mx.editors.Editor);
    var base = {};

    /**
     * 获取或设置每行显示的 checkListItem（radio 或者 checkbox）{@link mx.editors.CheckListItem} 数目。
     * 
     * @default 3
     */
    me.columns = 3;
    
    /**
     * 设置或获取控件是否可用, 当{@link mx.editors.CheckListItem} 和 {@link mx.editors.CheckListEditor}同时设置enabled时，
     * 以CheckListEditor的enabled属性设置决定是否可用
     */
    me.enabled = true;
    
    /**
     * 获取或设置容器中的 checkListItem {@link mx.editors.CheckListItem} 集合。
     * 
     * @default []
     */
    me.items = [];
    
    /**
     * 请参见 {@link mx.editors.ListEditor.valueSeparator}。
     */
    me.valueSeparator = ",";
    
    /**
     * 获取或设置容器中的 checkListItem 类型（radio 或者 checkbox）{@link mx.editors.CheckListItem} 集合。
     * <p>
     * 该属性可选的值包括：
     * <ul>
     * <li><b>checkbox</b></li>
     * <li><b>radio</b></li>
     * </ul>
     * </p>
     * 
     * @default checkbox
     */
    me.type = "checkbox";

    /**
     * @ignore
     */
    me.width = "100%";
    
    /**
     * @ignore
     */
    me.height = "auto";
    
    /**
     * 当 {@link mx.editors.CheckListItem} 对象实例的 {@link mx.editors.CheckListItem.checked} 属性发生变化时触发的事件。该事件在控件初始化时不触发。
     * @param item 代表事件源的对象，即mx.editors.CheckListItem
     */
    me.onitemchanged = null;
 
    //布局容器，通过表格的 colgroup 控制 checkEditor  {@link mx.editors.CheckEditor} 的布局。
    var _$table = null;
    
    
    //当 type 设置为 “radio” 时，记录上次选中的 chekcEditor {@link mx.editors.CheckEditor} 选中的项。
    var _lastCheckedItem = null;
    
    base.init = me.init;
    me.init = function()
    {
    	if($.isIE67()) {
    		if(me.width == "100%") me.width = "auto";
    	}
    	
        base.init();
        me.$e.addClass("checkListEditor");
        if (me.type == "radio")
        {
            me.$e.addClass("radio");
        }
        
        _$table = $("<table>"); 
        var colgroup = $("<colgroup></colgroup>");
        _$table.append(colgroup);
        for (var i = 0; i < me.columns; i++)
        {
            var $col = $("<col></col>");
            colgroup.append($col);
        }
        me.resizeTo(me.width, me.height);

        me.$e.append(_$table);
        if ($notEmpty(me.items) && me.items.length > 0 )
        {
            me.setItems(me.items);
            if ($isEmpty(me.value))
            {
                me.refreshValue();
            }
        }
        me._initDefaultValue();
        if (me.readOnly == true)
        {
            me.setReadOnly(me.readOnly);
        }
        _$table.userSelectable(false);
    };
    
    /**
     * 请参见 {@link mx.controls.Control.setEnabled} 方法。
     */
    me.setEnabled = function(p_enabled)
    {
    	if (typeof (p_enabled) != "undefined")
        {
            me.enabled = p_enabled;  
            $.each(me.items, function(index, item){
            	if ($instanceOf(item, mx.editors.CheckListItem))
            	{
            		item.setEnabled(me.enabled);
            	}
            });
        }
    };
    
    /**
     * 请参见 {@link mx.editors.Editor.setReadOnly} 方法。
     */
    me.setReadOnly = function(p_readOnly)
    {
    	if (typeof (p_readOnly) != "undefined")
        {
            me.readOnly = p_readOnly;  
            $.each(me.items, function(index, item){
            	if ($instanceOf(item, mx.editors.CheckListItem))
            	{
            		item.setReadOnly(me.readOnly);
            	}
            });
        }
    }
    
    
    /**
     * 根据值获取选择项
     * @param p_value 一个字符串
     * 如果找到返回一个 {@link mx.editors.CheckListItem} 对象，否则返回null
     */
    me.getItem = function(p_value)
    {
        if ($isEmpty(p_value))
            return null;
        return me.items["#"+ p_value];
    };
    
    
    /**
     * 向 {@link mx.editors.CheckListItem} 的项集合（{@link items} 集合）中添加一组新项。
     * 
     * @param p_items 一个数组，该数组包含了一组新项。
     */
    me.appendItems = function(p_items)
    {
        for (var i = 0; i < p_items.length; i++) 
        {
            me.appendItem(p_items[i]);  
        }
    };

    /**
     * 将 {@link mx.editors.CheckListItem} 对象添加到集合 {@link items} 中，并返回该对象。
     * 
     * @overload function(p_item)
     * 
     * @param p_text 一个字符串，表示 {@link mx.editors.CheckListItem} 对象的显示名称。
     * @param p_value 一个字符串，表示 {@link mx.editors.CheckListItem} 对象的值。
     * @param p_item 一个 {@link mx.editors.CheckListItem} 对象，表示要添加的项。
     */
    me.appendItem = function(p_text, p_value)
    {
    	if ($notEmpty(me.items["#" + p_value]) || $notEmpty(me.items["#" + p_text.value]))
    	{
    		throw new Error(mx.err("DUPLICATED_ITEM", [ $notEmpty(p_value) ? p_value : p_text.value ]));
    	}
        var item = null;
        if (typeof(p_text) == "string")
        {
            item = new mx.editors.CheckListItem({
            	caption: p_text, 
            	value: p_value, 
                readOnly: me.readOnly,
                enabled: me.enabled,
                onchanged: _item_onchanged
             });
        }
        else if ($.isPlainObject(p_text))
        {
        	var _options =  $.extend(true,{},p_text, {caption: p_text.text, readOnly: (me.readOnly ? me.readOnly : p_text.readOnly), enabled: (!me.enabled ? me.enabled : p_text.enabled), onchanged:_item_onchanged });
            item = new mx.editors.CheckListItem(_options);
        }
        else if ($instanceOf(p_text, mx.editors.CheckListItem))
        {
        	item = p_text;
        	if(!me.enabled)
        	{
        		item.setEnabled(me.enabled);
        	}
        	
        	if(me.readOnly)
        	{
        		item.setReadOnly(me.readOnly);
        	}
        }

        if (!me.items.contains(item))
        {
        	me.items.add(item);
        	me.items["#" + item.value] = item;
        }
        var row = null;
        if ((me.items.length - 1) % me.columns == 0)
        {
            var $row = $("<tr>");
            _$table.append($row);
            row = $row[0];
        }
        else
        {
            row = _$table.find("tr:last")[0];
        }
        var cell = row.insertCell(row.cells.length);
        cell.appendChild(item.$e[0]);
        
        return item;
    };
    
    /**
     * 设置 {@link items} 字段的值。该方法首先会清空 {@link items} 集合。
     * 
     * @param p_items
     *            一个数组，该数组包含了一组 {@link mx.editors.CheckListItem} 对象。
     */
    me.setItems = function(p_items)
    {
        if($isArray(p_items))
        {
            me.clear();
            me.appendItems(p_items);
        }
    };
    
    /**
     * 获取选中的 {@link mx.editors.CheckListItem} 对象集合。
     */
    me.getCheckedItems = function()
    {
        var checkedItems = [];
        
        var l = me.items.length;
        for (var i = 0; i < l; i++) {
            if (me.items[i].checked)
            {
                checkedItems.add(me.items[i]);
            }
        }
        
        return checkedItems;
    };
    
    /**
     * 设置指定的 {@link mx.editors.CheckListItem} 项目为选中状态。
     * @param p_item 一个 {@link mx.editors.CheckListItem} 对象，表示要选中的项。
     */
    me.checkItem = function(p_item)
    {
        if (me.type == "radio" && $notEmpty(_lastCheckedItem))
        {
        	_lastCheckedItem.setChecked(p_item == _lastCheckedItem, true);
        }
        p_item.setChecked(true, true);
    };
    
    /**
     * 取消指定的 {@link mx.editors.CheckListItem} 项目的选中状态。
     * @param p_item 一个 {@link mx.editors.CheckListItem} 对象，表示要取消选中的项。
     */
    me.uncheckItem = function(p_item)
    {
        p_item.setChecked(false, true);
    };
    
    /**
     * 设置集合 {@link items} 中所有的 {@link mx.editors.CheckListItem} 项目为选中状态。
     */
    me.checkAll = function()
    {
        if (me.type != "radio")
        {
            var l = me.items.length;
            for (var i = 0; i < l; i++) 
            {
                me.items[i].setChecked(true, true);
            }
        }
    };
    
    /**
     * 设置集合 {@link items} 中所有的 {@link mx.editors.CheckListItem} 项目为取消选中状态。
     */
    me.uncheckAll = function()
    {
        if (me.type != "radio")
        {
            var l = me.items.length;
            for (var i = 0; i < l; i++) 
            {
                me.items[i].setChecked(false, true);
            }
        }
    };
    
    /**
     * 清空集合 {@link items} 中所有的 {@link mx.editors.CheckListItem} 项目。
     */
    me.clear = function()
    {
        me.items = [];
        _$table.find("tbody").empty();
    };
   
    base.setValue = me.setValue;
    me.setValue = function(p_value, p_triggerEvent)
    {
        base.setValue(p_value, p_triggerEvent);
        me.refreshCheckState();
    };
  
    /**
     * 重置编辑器。
     * 
     * @param [p_triggerEvent=false] 指定是否要触发 {@link onchanged} 事件。
     */
    me.reset = function(p_triggerEvent)
    {
        me.setValue(null, p_triggerEvent);
    };
    
    
    
    /**
     * 根据 {@link value} 更新 {mx.editors.CheckListEditor} 的选中状态。
     */
    me.refreshCheckState = function()
    {
    	var items = me.items;
		var value = me.value;
    	if ($isEqual(me.type, "radio", true))
        {
    		$.each(items, function(index, item){
    			item.setChecked(me._isEqual(item.value, value), false); //不触发changed事件
                if (item.checked)
                {
                    _lastCheckedItem = item;
                }
    		});
        }
        else
        {
        	var values = [];
        	if ($notEmpty(value))
        		values = value.split(me.valueSeparator);
        	$.each(items, function(index, item){
        		item.setChecked(values.contains(item.value), false); //不触发changed事件
        	});
        }   
    }
    
   /**
    * 根据{mx.editors.CheckListEditor} 的选中状态更新 {@link value}。
    */
   me.refreshValue = function ()
   {
	   var items = me.items;
	   var value = null;
	   if ($isEqual(me.type, "radio"))
	   {
		   $.each(items, function(index, item){
   				if (item.checked)
   				{
   					value = item.value;
   				}
   		   });
	   }
	   else
	   {
		   var values = [];
		   $.each(items, function(index, item){
			   if (item.checked)
				   values.add(item.value);
		   });
           if (values.length > 0)
		      value = values.join(me.valueSeparator);
	   }
       
	   base.setValue(value, true);
   }
   
   /**
    *@ignore 
    *重写用来设置text属性
    */
   me._formatValue = function(p_value)
   {
       if(p_value == null) return "";
       
       var values = null;
       if ($isArray(p_value))
       {
           values =  p_value;
       }else if ($isString(p_value))
       {
           var separator = me.valueSeparator != null ? me.valueSeparator : ",";
       	values = p_value.split(separator);
       }else{
       	values = [p_value];
       }
       return _getTextByValues(values);
   };
   
   function _getTextByValue(p_value)
   {
   	if ($isBoolean(p_value))
   	{
   		return parseBoolean(p_value) ? mx.msg("CHECKED_VALUE") : mx.msg("UNCHECKED_VALUE");
   	}
	for (var i = 0; i < me.items.length; i++)
	{
		if (p_value == me.items[i].value)
		{
			return me.items[i].text;
			
		}
	}
       return p_value;
   }
   
   function _getTextByValues(p_values)
   {
       var separator = null;
       separator = me.valueSeparator != null ? me.valueSeparator : ",";
       var result = [];
       for(var i = 0; i < p_values.length; i++)
       {
           result.add(_getTextByValue(p_values[i]));
       }
       return result.length > 0 ? result.join(separator) : p_values ;
   }
    
    function _item_onchanged(e)
    {
        if (me.type == "radio" && $notEmpty(_lastCheckedItem))
        {        	
        	_lastCheckedItem.setChecked(_lastCheckedItem == e.target, false);
        }
        if (!me.items.contains(e.target))
        {
        	me.items.add(e.target);
    		me.items["#" + e.target.value] = e.target;
        }
        if (e.target.checked )
        {
            _lastCheckedItem = e.target;
        }
        me.refreshValue();
        me.trigger("itemchanged", {item:e.target});
    }
    
    me.endOfClass(arguments); 
    return me;
};



/**
 * 提供一个多选项或单选项列表控件（{@link mx.editors.CheckListEditor} 类型）中的数据项的类。请不要单独使用。
 */
mx.editors.CheckListItem = function() 
{
    var me = $extend(mx.editors.CheckEditor);
    var base = {};
    
    
    me.checked = false;
    
    
    //是否第一次被setChecked
    var _firstAssignChecked = true;
    
    
    /**
     * 设置数据项的选中状态。
     * @param p_checked 一个 Boolean 值，表示是否要选中 {@link mx.editors.CheckEditor} 控件。如果该值为 true，表示选中；反之则不选中。
     * @param [p_triggerEvent=false] 一个 Boolean 值，表示是否要触发 onchanged 事件。如果该值为 true，表示需要触发；反之则不触发。
     */
    me.setChecked = function(p_checked, p_triggerEvent)     
    {
        var changed = false;
        if ( me.checked  != p_checked || _firstAssignChecked) 
        {
        	_firstAssignChecked = false;
        	  me.checked  = p_checked;
             me.$e.toggleClass("checked",  me.checked );
             if (p_triggerEvent)
             {
                 me.trigger("changed");
             }
        }
    };
    
    /**
     * 获取编辑器选中状态。
     * 返回一个布尔值，true 表示选中，false 表示未选中
     */
    me.isChecked = function(){
    	return me.checked;
    }
    
    /**
     * 切换选中状态。
     * @param [p_triggerEvent=false] 一个 Boolean 值，表示是否要触发 onchanged 事件。如果该值为 true，表示需要触发；反之则不触发。
     */
    me.toggleChecked = function(p_triggerEvent)
    {
    	me.setChecked(! me.checked, p_triggerEvent);
    };
    
    /**
     * 设置 {@link value} 字段的值。
     */
    me.setValue = function(p_value)     
    {
    	me.value = p_value;
    };
    
    me.reset = function(p_triggerEvent)
    {
        me.setValue(null, p_triggerEvent);
        me.checked =false;
        me.$e.toggleClass("checked",false);
    };
    
    /**
     * 设置 {@link text}字段的值,如果要设置标题请调用{@link setCaption}
     */
    me.setText = function(p_text){
    	me.text = p_text;
    	me.setValue(p_text);
    }

    /**
     * @ignore
     */
    me._checkEditor_click = function()				
    {
    	if (me.isReadOnly() || !me.enabled) return;
        if (me.type == "radio" &&  me.checked ) return;
        
        me.setChecked(! me.checked , true);
    };
    
    me.endOfClass(arguments); 
    return me;
};
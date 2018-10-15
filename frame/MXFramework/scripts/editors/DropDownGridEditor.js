$ns("mx.editors");

$import("mx.datacontrols.DataGrid");
$import("mx.editors.ComboEditor");

/**
 * 提供一个下拉表格的类。
 *
 * @example
 * 以下是一个使用本地数据创建 {@link mx.editors.DropDownGridEditor} 的示例。
 * <code language="JavaScript">
 * var option = {
 *       	 primaryKey:"id",
 *           allowPaging : true, 
 *           allowSorting : true, 
 *           displayPrimaryKey : true, 
 *           
 *           columns :
 *           [
 *           {
 *               name : "id",
 *               caption : "主键",
 *               align : "center",
 *               width : "100px",
 *               allowSorting : true,
 *               readOnly : true,
 *               dataType : "string",
 *               editorType : "TextEditor"
 *           },
 *           {
 *               name : "comp",
 *               caption : "公司",
 *               align : "center",
 *               width : "100px",
 *               allowSorting : true,
 *               readOnly : true,
 *               dataType : "string",
 *               editorType : "TextEditor"
 *           },
 *           {
 *               name : "addr",
 *               caption : "地址",
 *               align : "center",
 *               width : "100px",
 *               allowSorting : true,
 *               dataType : "string",
 *               maxlength : 50,
 *               editorType : "TextEditor"
 *           } ],
 *           entityContainer : new mx.datacontainers.GridEntityContainer(
 *           {
 *               primaryKey : "id",
 *               type : "local",
 *               loadMeta : false,
 *               data :
 *               [{
 *                   id : "001",
 *                   comp : "公司1",
 *                   addr : "北京"
 *               },
 *               {
 *                   id : "002",
 *                   comp : "公司2",
 *                   addr : "广东"
 *               },
 *               {
 *                   id : "003",
 *                   comp : "公司3",
 *                   addr : "南京"
 *               }]
 *           })
 * };
 * var dropDownGridEditor = new mx.editors.DropDownGridEditor({
 * 		left:300,
 *		valueColumn:"id",
 *		displayColumn:"comp",
 *		value:"001,002",
 *		displayCheckBox : true,// 第一列显示 CheckBox
 * 		dataGrid:option
 * });
 * </code>
 * 
 * @example
 * 以下是一个使用服务端数据创建 {@link mx.editors.DropDownGridEditor} 的示例。
 * <code language="JavaScript">
 *	var dropdownGrid = new mx.editors.DropDownGridEditor ({
 *		left:100,
 *		valueColumn:"id",
 *      displayColumn:"name",
 *      value:"402894263de8720f013de874de8d0004",
 *		displayCheckBox:true,
 *		url:uapdemo.mappath("~/../uapdemo/rest/dropdowngrid/")
 * });
 * </code>
 * 
 * @example
 * 以下是一个使用字典数据的 {@link mx.editors.DropDownGridEditor} 的示例。
 * <code language="JavaScript">
 * // 如果下拉表格当前页没有提供足够的显示值，下拉表格编辑器到字典中查找显示值。
 * var dropdownGrid = new mx.editors.DropDownGridEditor ({
 *		left:100,
 *		valueColumn:"id",
 *      displayColumn:"name",
 *      value:"402894263de8720f013de874de8d0004",
 *		displayCheckBox:true,
 *		url:uapdemo.mappath("~/../uapdemo/rest/dropdowngrid/"),
 *		dicts:[{value:"402894263de8720f013de874de8d0003", text:"张三"},
 *			{value:"402894263de8720f013de874de8d0004", text:"张四"},
 *			{value:"402894263de8720f013de874de8d0005", text:"张五"},
 *			{value:"402894263de8720f013de874de8d0006", text:"张六"},]
 * });
 * </code>
 */
mx.editors.DropDownGridEditor = function()
{
    var me = $extend(mx.editors.ComboEditor);
    var base = {};
    
    /**
     * 获取或设置一个 JSON 对象，表示初始化 {@link mx.datacontrols.DataGrid} 的构造参数。
     * 必须设置{@link url}和{@link dataGrid}这两个属性中的其中一个
     */
    me.dataGrid = null;
    
    /**
     * 获取或设置多选值之间的分隔符。当 {@link mx.editors.DropDownGridEditor.displayCheckBox} 字段为 true
     * 支持多选时，所有选择项的值和显示值会以该分隔符进行分隔。
     * 
     * @default ","
     */
    me.valueSeparator = ",";
    
    /**
     * 获取一个 Boolean 值，表示 {@link mx.editors.DropDownGridEditor.dataGrid} 是否可以多选。
     * 
     * @default false
     */
    me.displayCheckBox = false;
    
    /**
     * 获取或设置一个字符串，该字符串对应的属性的值将用作 {@link mx.editors.DropDownGridEditor} 中的项的显示值。
     * 该字段对应下拉表格的列名。
     * 
     * @default text
     */
    me.displayColumn = "text";
    
    /**
     * 获取或设置一个字符串，该字符串对应的属性的值将用作 {@link mx.editors.DropDownGridEditor} 中的项的实际值。
     * 该字段对应下拉表格的列名，
     * 如果初始化控件dataGrid属性为空，并且设置了url属性，则会将valueColumn的值最为下拉列表DataGrid的主键使用
     * 
     * @default id
     */
	me.valueColumn = "id";
    
    /**
     * 一个字符串，表示 REST 服务的地址。如果 {@link dataGrid} 字段值为空，会根据这个地址获获取表格的数据构造表格。
     * 必须设置{@link url}和{@link dataGrid}这两个属性中的其中一个
     */
    me.url = null; 
    
    /**
     * 获取或设置已选择下拉表格值的字典集合。如果下拉表格当前页没有提供足够的显示值，下拉表格编辑器到字典中查找显示值。
     */
    me.dicts = null;
    
    /**
     * 获取一个数字，表示下拉框的下拉高度。
     * 
     * @default 300
     */
    me.dropDownHeight = 300;
    
    /**
     * 获取一个数字，表示下拉框的下拉宽度。
     * 
     * @default 400
     */
    me.dropDownWidth = 400;
    
    /**
     * @ignore
     */
    me.dropDownControl = null;
    
    base.init = me.init;
    me.init = function(){
    	base.init();
    	me.differDisplayValue = (me.valueColumn != me.displayColumn);
    }
    
    /**
     * @ignore
     */
    me._initDropDownControl = function()
    {
        if (me.dropDownControl == null)
        {
        	me.dropDownContainer = new mx.containers.Container();
            me.dropDownContainer.$e.addClass("mx");
            me.dropDownContainer.$e.resizable(true);
            if (!$.isIE67())
            {
            	me.dropDownContainer.$e.css("overflow", "auto");
            }
            
        	if($.isPlainObject(me.dataGrid))
        	{
                if (me.displayCheckBox == true)
                {
                    me.dataGrid.displayCheckBox = me.displayCheckBox;
                }
                
            	me.dataGrid = new mx.datacontrols.DataGrid(me.dataGrid);
        	}
        	else if(me.url)
        	{
        		var tmp_displayPrimaryKey = false;
        		if (me.displayColumn == me.valueColumn){
        			tmp_displayPrimaryKey = true;
        		}
        		me.dataGrid = new mx.datacontrols.DataGrid({
        			displayCheckBox:me.displayCheckBox,
        			baseUrl:me.url,
        			primaryKey: me.valueColumn,
        			displayPrimaryKey : tmp_displayPrimaryKey
        		});
        	}

        	if(!_check_dataGrid())
        	{
        		mx.showerror(new Error(mx.err("LOADING",["DataGrid or EntytiContainer is Undefined"])));
        		return;
        	}
        	me.displayCheckBox = me.dataGrid.displayCheckBox;
        	me.dataGrid.on("load", _load);
        	me.dataGrid.load();
        	if (me.dataGrid.displayCheckBox)
            {
	        	me.dataGrid.on("itemchecked", _item_checked);
            }
            else
            {
                me.dataGrid.on("selectionchanged", _selection_changed);
            }
            me.dropDownContainer.addControl(me.dataGrid);
        }
        
        me.dropDownControl = me.dropDownContainer;
        me.dropDownControl.$e.addClass("dropDown");
        me.dropDownControl.$e.hide();
    };
    
    base.dispose = me.dispose;
    
    me.dispose = function()
    {
    	me.dataGrid.entityContainer.dispose();
		me.dataGrid.dispose();
		base.dispose();
    };

    base.setValue = me.setValue;
    /**
     * @ignore
     */
    me.setValue = function(p_value, p_triggerEvent, p_userOper)
    {
    	if(!_check_dataGrid())
    	{
    		mx.showerror(new Error(mx.err("LOADING",["DataGrid or EntytiContainer is Undefined"])));
    		return;
    	}
    	
        base.setValue(p_value, p_triggerEvent);

        // 如果不是用户点选，要到dataGrid 中根据value选择
        if (($isEmpty(p_userOper) || !p_userOper))
        {
        	if (p_value)
        	{
        		_select_item();
        	}
        	else
        	{
        		me.dataGrid.uncheckAll();
        		me.dataGrid.deselectAll();
        	}
        }
    };
    
    base._resetDropDownControl = me._resetDropDownControl;
    /**
     * @ignore
     */
    me._resetDropDownControl = function()
    {
        base._resetDropDownControl();
        me.dropDownContainer.resizeTo(me.dropDownWidth, me.dropDownHeight);
	    me.dataGrid.resizeTo('100%', '100%');
    };
    
    
    base.setHint = me.setHint;
    /**
     *@ignore 
     */
    me.setHint = function(p_hint)
    {
    	base.setHint(p_hint);
    	me.$hintInput.focus(_hintInput_focus);
    };
    
    base.reset = me.reset;
    /**
     * 重置编辑器。
     * @overload  function(p_triggerEvent)
     * @param [p_triggerEvent=false] 指定是否要触发 {@link onchanged} 事件。
     */
    me.reset = function(p_triggerEvent)
    {
    	if(!_check_dataGrid())
    	{
    		mx.showerror(new Error(mx.err("LOADING",["DataGrid or EntytiContainer is Undefined"])));
    		return;
    	}
    	base.reset(p_triggerEvent);
    	me.dataGrid.uncheckAll();
		me.dataGrid.deselectAll();
    };
    
    function _hintInput_focus(e)
    {
    	 me.$input.show();
	     me.$hintInput.hide();
	     me.$input.focus();
    }
    
    /**
     * 向字典（{@link dicts} 集合）添加字典项。
     *
     * @param p_dicts 一个数组，表示下拉表格文本、值的字典项集合。
     * 格式为[{value:"value", text:"text"}, {value:"value2", text:"text2"}];
     */
    me.appendDicts = function(p_dicts)
    {
    	if ($.isArray(p_dicts))
    	{
    		for (var i = 0; i < p_dicts.length; i++)
    		{
    			me.appendDict(p_dicts[i]);
    		}
    	}
    }
    
    /**
     * 向字典（{@link dicts} 集合）添加字典项。
     *
     * @param p_value 一个字符串，表示下拉表格对应的实际值。
     * @param p_text 一个字符串，表示下拉表格对应的显示值。
     */
    me.appendDict = function(p_value, p_text)
    {
    	if (!me.dicts)
    	{
    		me.dicts = [];
    	}
    	if ($isString(p_text) && $isString(p_value) && $notEmpty(p_text) && $notEmpty(p_value))
    	{
    		var inDicts = false;
    		for (var i = 0; i < me.dicts.length; i++)
    		{
    			if(p_value == me.dicts[i]["value"])
    			{
    				inDicts = true;
    				break;
    			}
    		}
    		if (!inDicts)
    		{
    			me.dicts.add({"value" : p_value, "text" : p_text});
    		}
    	}
    	else if ($.isPlainObject(p_value))
    	{
    		me.appendDict(p_value.value, p_value.text);
    	}
    }
    
   /**
    * @ignore
    */
    me._formatValue = function(p_value)
    {
    	if (p_value == null) 
    		return "";
    	return me.displayCheckBox ? _getTextByValues(p_value) : _getTextByValue(p_value);
    };
    
    /**
     * 设置编辑器的文本值。编辑器会自动将 p_text 转换为 {@link valueType} 字段表示的数据类型。
     * @overload function(p_text, p_triggerEvent)
     * @param p_text 一个文本，表示编辑器值的文本表达式。
     * @param [p_triggerEvent=false] 指定是否要触发 {@link onchanged} 事件。
     * 触发事件的条件是p_triggerEvent为true并且当前值me.value不等于p_value
     */
    me.setText = function(p_text, p_triggerEvent)
    {
    	me.value =  _getValuesByText(p_text);
        me.setValue(me.value, p_triggerEvent);
    };
    
    //查找显示值对应的Value
    function _getValuesByText(p_text)
    {
		var text = p_text;
		var values = [];
		if ($isString(p_text))
		{
			text = p_text.split(me.valueSeparator);
		}
		if($.isArray(text)){
			for (var i = 0; i < text.length; i++)
			{
				values.add(_getValueByText(text[i]));
			}
		}
    	return values.join(me.valueSeparator);
    }
    
    // 查找显示值
    function _getTextByValues(p_values)
    {
		var values = p_values;
		var text = [];
		if ($isString(p_values))
		{
			values = p_values.split(me.valueSeparator);
		}
		if($.isArray(values)){
			for (var i = 0; i < values.length; i++)
			{
				text.add(_getTextByValue(values[i]));
			}
		}
    	return text.join(me.valueSeparator);
    }
    
  //查找显示值对应的Value
    function _getValueByText(p_text)
    {
    	if ($isBoolean(p_text))
    	{
    		return parseBoolean(p_text) ? mx.msg("CHECKED_VALUE") : mx.msg("UNCHECKED_VALUE");
    	}
    	// me.dataGrid.items 中查找显示值
    	if (me.dataGrid && $instanceOf(me.dataGrid, mx.datacontrols.DataGrid) && me.dataGrid.items.length > 0)
    	{
    		var results = mx.utils.JsonUtil.getItems(me.dataGrid.entityContainer.data, me.displayColumn, p_text);
    		if (results && $isArray(results)){
    			var entity = results[0];
    			var value = entity[me.valueColumn];
	    		me.appendDict(value, p_text);
	    		return value;
    		}
    	}
    	// 如果找不到，从me.dicts 中查找
    	if (me.dicts && me.dicts.length > 0)
    	{
    		for (var i = 0; i < me.dicts.length; i++)
    		{
    			if (me.dicts[i][me.displayColumn] == p_text)
    			{
    				return me.dicts[i]["value"];
    			}
    		}
    	}
    	return p_text;
    }
    
    // 查找显示值
    function _getTextByValue(p_value)
    {
    	if ($isBoolean(p_value))
    	{
    		return parseBoolean(p_value) ? mx.msg("CHECKED_VALUE") : mx.msg("UNCHECKED_VALUE");
    	}
    	// me.dataGrid.items 中查找显示值
    	if (me.dataGrid && $instanceOf(me.dataGrid, mx.datacontrols.DataGrid) && me.dataGrid.items.length > 0)
    	{
    		var results = mx.utils.JsonUtil.getItems(me.dataGrid.entityContainer.data, me.valueColumn, p_value);
    		if (results && $isArray(results)){
    			var entity = results[0];
    			var text = entity[me.displayColumn];
	    		me.appendDict(p_value, text);
	    		return text;
    		}
    	}
    	// 如果找不到，从me.dicts 中查找
    	if (me.dicts && me.dicts.length > 0)
    	{
    		for (var i = 0; i < me.dicts.length; i++)
    		{
    			if (me.dicts[i]["value"] == p_value)
    			{
    				return me.dicts[i]["text"];
    			}
    		}
    	}
    	return p_value;
    }

    // 勾选或选择
    function _select_item()
    {
    	if (me.value != null)
    	{
	    	if (me.displayCheckBox)
	        {
	            _checkItemsByValues(me.value);
	        }
	        else
	        {
	            _selectItemByValue(me.value);
	        }
    	}
    }
    //有选择框时，根据 value 选择item
    function _checkItemsByValues(p_value)
    {
    	if(me.dropDownControl){
	    	var values = [p_value];
	    	if (me.displayCheckBox){
	    		values = p_value.split(me.valueSeparator);
	    	}
	    	var items =  me.dataGrid.items;
	    	if (me.dataGrid != null && items.length > 0)
	    	{
	    		for (var i = 0; i < items.length; i++)
	    		{
	    			if (values.indexOf(items[i].getValue(me.valueColumn)) > -1)
	    			{
	    				items[i].setChecked(true);
	    			}else
	    			{
	    				items[i].setChecked(false);
	    			}
	    		}
	    		_resetCheckAllStatus();
	    	}
    	}
    }
    
    function _resetCheckAllStatus()
	{
		var $tableDiv = me.dataGrid._tableDiv();
		if ($notEmpty($tableDiv))
		{
			var trsCount = $tableDiv.find("tr").length;
			var checkedTrsCount = $tableDiv.find("tr.checked").length;
			if (trsCount > 0 && trsCount == checkedTrsCount)
			{
				me.dataGrid._checkAll();
			}
			else
			{
				me.dataGrid._uncheckAll();
			}
		}
	}
    
    // 没有选择框，根据 value 选择item
    function _selectItemByValue(p_value)
    {
    	if(me.dropDownControl){
	    	var items =  me.dataGrid.items;
	    	if (me.dataGrid != null && items.length > 0)
	    	{
	    		for (var i = 0; i < items.length; i++)
	    		{
	    			if (p_value == items[i].getValue(me.valueColumn))
	    			{
	    				me.dataGrid.selectItem(i, false);
	    				break;
	    			}
	    		}
	    	}
    	}
    }
    
    function _load()
    {
    	// 下拉表格加载数据之后，更新选中的值
    	_select_item();
		me.setValue(me.value);
    }
    // 选中之后
    function _item_checked(e)
    {
    	var values = me.value && me.text ? me.value.split(me.valueSeparator) :[];
    	// 选中则加入 values 否则去掉。如果 DataGrid 的 getCheckedIDs 能得到所有 分页中的 IDs 则不需要这些逻辑
        if(e.item && e.item.checked)
        {
        	values.add(e.item.getValue(me.valueColumn));
        }
        else if(e.item && !e.item.checked)
        {
        	values.remove(e.item.getValue(me.valueColumn));
        }
        // 全选或选择清空时
        else
        {
        	var IDs = me.dataGrid.getCheckedIDs();
        	// 全选
        	if (IDs.length > 0)
        	{
        		for (var j = 0; j < IDs.length; j++)
        		{
        			if (values.indexOf(IDs[j]) == -1)
        			{
        				values = values.concat(IDs[j]);
        			}
        		}
        	}
        	// 选择清空
        	else
        	{
        		for (var i = 0; i < me.dataGrid.items.length; i++)
        		{
        			// 删除当前页面选择的值
        			values.remove(me.dataGrid.items[i].getValue(me.valueColumn));
        		}
        	}
        }
        me.setValue(values.join(me.valueSeparator), true, true);
    };
    
    // 不显示 checkBox 时，me.dataGrid 选择选择项改变时执行
    function _selection_changed()
    {
    	var value = null;
        var item = me.dataGrid.selection;
        // 选中有 item
    	if (item)
    	{
			value = item.getValue(me.valueColumn);
			me.setValue(value, true, true);
    	}
    	// 没有选中则设置原值，不舒服editor 的 change 事件
    	else if($notEmpty(me.value))
    	{
    		me.setValue(me.value);
    	}
    };
    /**
     * 检验datagrid是否存在
     */
    function _check_dataGrid()
    {
    	if (me.dataGrid == null)
    	{
            return false;
    	}
    	else if ($isEmpty(me.dataGrid.entityContainer))
        {
    		return false;
        }
        else if ($isEmpty(me.dataGrid.entityContainer.baseUrl) && "remote" == me.dataGrid.entityContainer.type)
        {
        	return false;
        }
    	return true;
    };
    
    me.endOfClass(arguments); 
    return me;
};
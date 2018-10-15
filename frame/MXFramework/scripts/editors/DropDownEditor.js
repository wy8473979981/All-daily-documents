$ns("mx.editors");

$import("mx.editors.ComboEditor");
$import("mx.editors.ListEditor");
$import("mx.rpc.RESTClient");

/**
 * 提供一个允许用户从下拉列表中选择数据项的控件的类。该控件支持可编辑和不可编辑两种模式，当 {@link mx.editors.DropDownEditor.displayMember} 和 {@link mx.editors.DropDownEditor.valueMember} 相同并且
 * {@link mx.editors.ComboEditor.allowEditing} 为 true 时，控件支持编辑；当 {@link mx.editors.DropDownEditor.displayMember} 和 {@link mx.editors.DropDownEditor.valueMember} 不同时，控件不支持编辑（{@link mx.editors.ComboEditor.allowEditing} 属性失效）。
 *
 * @example
 * 以下是一个创建 {@link mx.editors.DropDownEditor} 以及如何添加项的示例。
 * <code language="JavaScript">
 * var dropDownEditor = new mx.editors.DropDownEditor(
 * {
 *     allowEditing: false,  // 设置是否允许编辑
 *     displayCheckBox: true,
 *     valueSeparator: "#",
 *     displayMember: "text",
 *     valueMember: "value",
 *     items: [
 *         { text: "苹果", value: "Apple" },
 *         { text: "汽车", value: "Car" },
 *         { text: "学生", value: "Student" }
 *     ],
 *
 *     onchanged: _dropDownEditor_changed
 * });
 *
 * dropDownEditor.appendItem("书", "Book");
 *
 * dropDownEditor.appendItems([
 *     { text: "老师", value: "Teacher" },
 *     { text: "牛奶", value: "Milk" }
 * ]);
 *
 * function _dropDownEditor_changed()
 * {
 *     alert("value 值发生改变，目前为 " + dropDownEditor.value);
 * }
 * </code>
 *
 * @example
 * 以下是如何使用 {@link mx.editors.DropDownEditor} 的示例。
 * <code language="JavaScript">
 * dropDownEditor.setDisplayValue("苹果");            // 将显示值设为“苹果”。
 * dropDownEditor.setValue("StudentA", "学生A");      // 将显示值设为“学生A”，实际值设为“StudentA”。由于列表项中没有“StudentA”项，所有不选中任何项，也不触发 onchanged 事件。
 * dropDownEditor.setValue("Student", true);         // 将实际值设为“Student”，选中“Student”项，并显示对应的显示值“学生”，同时触发 onchanged 事件。
 * dropDownEditor.setValue("Student", "学生A", true); // 将实际值设为“Student”，选中“Student”项，并将显示值设为“学生A”，同时触发 onchanged 事件。
 * </code>
 */
mx.editors.DropDownEditor = function()
{
    var me = $extend(mx.editors.ComboEditor);
    var base = {};

    /**
     * 获取一个集合，包含下拉列表中所有的项（{@link mx.editors.ListItem} 类型）。请使用 {@link setItems} 方法设置该字段的值。
     * 必须要设置{@link items}和{@link url}两个属性中的其中一个
     * 
     * @item mx.editors.ListItem
     * @index 项的唯一标识（{@link mx.editors.ListItem.value}）或项在集合中的序号（从 0 开始计数）。
     */
    me.items = [];
    
    var _items = [];

    /**
     * 请参见 {@link mx.editors.ListEditor.valueSeparator}。
     */
    me.valueSeparator = ",";

    /**
     * 获取或设置一个值，该值表示列表中的每一项之前是否显示一个选择框。如果该值为 true，则表示显示；反之则不显示。该字段必须在初始化前设置。
     * 
     * @default false
     */
    me.displayCheckBox = false;
    
    /**
     * 设置或获取是否显示关闭按钮,该字段必须在初始化前设置。
     * 
     * @default true
     */
    me.displayCloseButton = true;

    /**
     * 获取或设置一个值，表示是否显示空值。
     */
    me.displayNullValue = false;
    
    /**
     * 获取一个数字，表示下拉框的最小高度。
     * 
     * @default 95
     */
    me.dropDownMinHeight = 95;

    /**
     * 获取一个数字，表示下拉框的最大高度。
     * 
     * @default 200
     */
    me.dropDownMaxHeight = 200;

    /**
     * 获取或设置一个字符串，该字符串对应的属性的值将用作 {@link mx.editors.DropDownEditor} 中的项的显示值。
     * 
     * @default text
     */
    me.displayMember = "text";
    
    /**
     * 获取或设置下拉框列表是否自动根据输入的内容做匹配过滤
     */
    me.autoMatchInput = false;
    
	/**
	 * 设置和获取一个 Boolean 值，该值表示是否开启自动匹配高亮显示。
	 * @default false
	 */
	me.heightLightMatch = false;
    
    
    var _displayMember = null;
    
    /**
     * 获取或设置一个字符串，该字符串对应的属性的值将用作 {@link mx.editors.DropDownEditor} 中的项的实际值。
     * 
     * @default value
     */
    me.valueMember = "value";
    
    var _valueMember = null;
    
    /**
     * 一个字符串，表示 REST 服务的地址。如果该属性不为空，会根据这个地址获取下拉框数据然后绘制下拉框。如果为空，则以 {@link items} 集合的数据来绘制下拉框。
     * 必须要设置{@link items}和{@link url}两个属性中的其中一个
     */
    me.url = null;
    
    /**
     * 一个 Boolean 值，表示是否已经根据 {@link url} 地址获取完数据。<b>该属性在 {@link url} 属性不为空时有效。</b>
     * 
     * @default false
     */
    me.isLoaded = false;
    
    /**
     * 获取一个 {@link mx.editors.listEditor} 对象，表示下拉的列表控件。
     */
    me.listEditor = null;

    /**
     * @ignore
     */
    me.dropDownControl = null;
    /**
     * 关闭按钮或全选多选按钮的高度
     */
    var _btnHeight = 0;
    
    var _preValueMember;
    
    base.init = me.init;
    me.init = function(){
    	_btnHeight = (me.displayCheckBox || me.displayCloseButton) ? 25 : 0 ;
    	_preValueMember = me.valueMember;
    	_displayMember = me.displayMember;
    	_valueMember = me.valueMember;
    	if(me.postponesDropDown){
    		$(me.items).each(function(){
            	var v_item = {};
            	v_item[me.displayMember] = this[me.displayMember];
            	v_item[me.valueMember] = this[me.valueMember];
            	_items.add(v_item);
            });
    	}
    	base.init();
    	me.differDisplayValue = (me.displayMember != me.valueMember);
    }
	
	base.dispose = me.dispose;
    me.dispose = function(){
		_wordCache.clear();
		if(_restClient){
			_restClient.dispose();
		}		
		if(_items){
			_items.clear();
		}
		if(_$checkDiv){
			_$checkDiv.empty().remove();
		}
		
		base.dispose();
		base=null;
	}

   
    base.setAllowEditing = me.setAllowEditing;
    me.setAllowEditing = function(p_allowEditing)
    {
    	if(me.autoMatchInput)
    	{
    		base.setAllowEditing(true);
    	}else if (me.displayMember != me.valueMember)
        {
            base.setAllowEditing(false);
        }
        else
        {
        	base.setAllowEditing(p_allowEditing)
        }
    	
    	me.$input.off("change",me._input_change);
    	
    	if(me.autoMatchInput){
            me.$dropDownButton.off("click");
            me.$e.off("click");
            me.$input.off("keyup",_$input_keyup);
            
            me.$e.on("click", me._dropDownButton_click);
            me.$input.on("keyup",_$input_keyup);
            me.on("dropdown",_dropControl_ondropdown);
    	}else{
    		me.$input.on("change",me._input_change);
    	}
    };
    
    function _$input_blur(){
    	me.validate(true);
    }
    
    //指示是否需要将value转换为Text显示
    var _transValueToText = true;
    
    function _$input_keyup(e){
    	if(me.dropDownControl == null)
        	me._initDropDownControl();
    	var value = me.$input.val();
    	if($notEmpty(value)){
    		if(!me.droppedDown)
    			me._dropDownButton_click();
    		var matchedItems = loadFromCache(value);
    		showItems(matchedItems);
    	}else{
    		showAllItems();
    	}
    	//按删除键动态设置值
    	if($notEmpty(me.value)){
    		if(e.keyCode == 8 || e.keyCode == 46){
    			//获取到匹配的项
        		var matchedItems = loadFromCache(value);
        		var valueAry = trimWords(me.value);
        		var matchValue = [];
        		$(valueAry).each(function(p_index,p_value){
        			$(matchedItems).each(function(){
        				if(p_value == this.value){
        					matchValue.add(p_value);
        					return false;
        				}
        			});
        		});
        		_transValueToText = false;
        		me.setValue(matchValue.join(me.valueSeparator),true);
        		_transValueToText = true;
        	}
    	}
    }
    
    function _dropControl_ondropdown(e){
    	showAllItems();
    }
    
    function showItems(p_items){
    	if(me.listEditor)
    		$(me.listEditor.items).each(function(){
    			this.$e.hide();
    			if (me.heightLightMatch)
    				this.$e.find("span#text").html(this.text);
    		});
    	
    	$(p_items).each(function(){
    		if (me.heightLightMatch)
        	{
    			if (me.$input.val() != null || me.$input.val() != "")
        		{
        			var text = this.text;
        			var val = me.$input.val();
        			if (text.indexOf(val) >= 0)
        			{
        				var tmp = [];
	    				tmp = text.split(val);
	    				var p = '';
	    				this.$e.find("span#text").html('');
	    				for(var i = 0; i< tmp.length;i++){
	    					if (i == tmp.length - 1)
	    					{
	    						p = p + tmp[i];
	    					}else{
	    						p = p + tmp[i] + "<font class='heightLight'>"+ val + "</font>";
	    					}
	    					
	    				}
	    				this.$e.find("span#text").html(p);
        			}
        		}
        	}	
			this.$e.show();
		});
    }
    
    function showAllItems(){
    	if(me.listEditor)
    		$(me.listEditor.items).each(function(){
    			this.$e.show();
    			if (me.heightLightMatch)
    				this.$e.find("span#text").html(this.text);
    		});
    }
    
    //只保存一条记录
    var _wordCache = new mx.types.HashMap();
    function loadFromCache(p_word){
    	if($isEmpty(p_word))
    		return [];
    	p_word = p_word.trim();
    	if(_wordCache.hasItem(p_word)){
    		return _wordCache.getItem(p_word);
    	}else{
    		var items = getMatchedListItems(p_word);
    		//if(_wordCache.length > 100)
    			_wordCache.clear();
    		_wordCache.setItem(p_word,items);
    		return items;
    	}
    }
    
    function getMatchedListItems(p_word){
    	if($isEmpty(p_word))
    		return [];
    	p_word = p_word.trim();
    	var words = trimWords(p_word);
    	var items = [];
    	if(me.listEditor){
    		$(me.listEditor.items).each(function(p_index,p_item){
    			$(words).each(function(){
    				if(this != "" && p_item.text && p_item.text.toLowerCase().indexOf(this.toLowerCase()) > -1){
    					items.add(p_item);
    					return false;
    				}
    			});
    		});
    	}
    	me.listEditor.items
    	return items;
    }
    
    function trimWords(p_word){
    	var wordAry = [];
    	if(me.displayCheckBox){
    		wordAry = p_word.split(me.valueSeparator);
    	}else{
    		wordAry.add(p_word);
    	}
    	return wordAry;
    }
    
    base.hideDropDown = me.hideDropDown;
    me.hideDropDown = function(p_speed){
    	base.hideDropDown(p_speed);
    	if(me.autoMatchInput){
    		if(me.isValidate){
        		var text = me._formatValue(me.value);
        		if(me.$input)
        			me.$input.val(text);
        	}
    	}
    }
    
    /**
     * 设置 {@link url} 值。当 {@link url} 值改变，{@link isLoaded} 属性将变为 false，字典数据将重新加载。
     * @param p_url url地址
     */
   	me.setUrl = function(p_url)
   	{
   		if ($isEmpty(p_url))
   			return;
   		if ($notEqual(me.url, p_url))
   		{
   			me.url = p_url;
   			
   			if ($isEmpty(_restClient))
   			{
   				_restClient = new mx.rpc.RESTClient({ baseUrl: p_url });
   			}
   			
   			_restClient.setBaseUrl(p_url);
   			me.isLoaded = false;
   		}
	   	};

    /**
     * 向 {@link mx.editors.DropDownEditor} 的项列表（{@link items} 集合）添加项，并返回添加的项。
     *
     * @overload function(p_item)
     *
     * @param p_text 一个字符串，表示添加的 {@link mx.editors.ListItem} 对象的显示值（{@link mx.editors.ListItem.text} 字段的值）。
     * @param p_value 一个字符串，表示添加的 {@link mx.editors.ListItem} 对象的实际值（{@link mx.editors.ListItem.value} 字段的值）。
     * @param p_item 一个 JSON 对象（如 { text: "书", value: "book" }）或 {@link mx.editors.ListItem} 对象，表示要添加到列表中的项。
     *
     * @example
     * 可参见 {@link mx.editors.ListEditor.appendItem} 方法的示例。
     */
    me.appendItem = function(p_text, p_value)
    {
    	var argsLength = arguments.length;
    	var item = null;
        if (argsLength == 1){
        	if ($.isPlainObject(p_text))
	        {
        		item = p_text;
	        }else if ($instanceOf(p_text, mx.editors.ListItem))
	        {
	        	item = p_text;
	        }else {
	        	item = {};
	        	item[me.valueMember] = p_text;
	        	item[me.displayMember] = p_text;
	        }
        }else if (argsLength == 2)
        {
        	item = {};
        	item[me.valueMember] = p_value;
        	item[me.displayMember] = p_text;
        }
        //没有初始化下拉列表
    	if (me.dropDownControl == null)
        {
    		me.items.add(item);
    		_items.add(item);
        }else{
        	item = me.listEditor.appendItem(item);
            if (item != null)
            {
                me.items = me.listEditor.items;
                autoResizeDropDownSize();
                _synchronizedItems();
            }
        }
        return item;
    };
    
    /**
     * 同步items
     */
    function _synchronizedItems(){
    	_items = [];
    	$(me.items).each(function(){
        	var v_item = {};
        	v_item["value"] = _valueMember == "value" ? this.value : this.text;
        	v_item["text"] = _displayMember == "value" ? this.value : this.text;
        	if (v_item["value"] == "" && v_item["text"] == "")
        	{
        		v_item["value"] = "null";
        	}
        	_items.add(v_item);
        });
    }

    /**
     * 向 {@link mx.editors.DropDownEditor} 的项列表（{@link items} 集合）添加一组项。
     * @param p_items 一个数组，该数组包含了一组 {@link mx.editors.ListItem} 对象。
     *
     * @example
     * 可参见 {@link mx.editors.ListEditor.appendItems} 方法的示例。
     */
    me.appendItems = function(p_items)
    {
        if(me.dropDownControl == null){
        	me._initDropDownControl();
        }
    	me.listEditor.appendItems(p_items);
        me.items = me.listEditor.items;
        autoResizeDropDownSize();
        _synchronizedItems();
        
        if (me.value != undefined)
        {
        	var text = _getTextByValue(me.value);
        	if ( text != undefined && text != me.value)
        	{
        		me.setText(text);
        	}
        }
    };
    
    function autoResizeDropDownSize(){
    	var listEditorUl = me.listEditor.$list.get(0);
    	if(listEditorUl.clientWidth > 0){
    		var listEditorDiv = me.listEditor.$e.get(0);
    		var height = calcuteDropDownHeight();//计算高度
    		var srollBarHeight = (listEditorUl.clientWidth < listEditorUl.scrollWidth ||  listEditorDiv.clientWidth < listEditorDiv.scrollWidth) ? 21 : 0;
    		var listHeight = height + srollBarHeight;
    		me.listEditor.setHeight(listHeight);	
        	
            if (srollBarHeight > 0 && listEditorUl.scrollWidth !== listEditorUl.clientWidth)
            {
            	me.listEditor.$list.width(listEditorUl.scrollWidth + 2);
            }
        	me.dropDownControl.setHeight(listHeight + _btnHeight);
    	}
	}

    /**
     * 设置 {@link items} 字段的值。该方法首先会清空 {@link items} 集合。
     * 
     * @param p_items 一个数组，该数组包含了一组 {@link mx.editors.ListItem} 对象。
     */
    me.setItems = function(p_items)
    {
    	if(me.dropDownControl == null){
        	me._initDropDownControl();
        }
    	me.listEditor.setItems(p_items);
        me.items = me.listEditor.items;
        autoResizeDropDownSize();
        _synchronizedItems();
    };

    /**
     * 从 {@link items} 集合中移除指定的 {@link mx.editors.ListItem} 对象，若该对象是控件当前的选中项，则触发 {@link onselectionchanged} 事件。从列表中移除项时，有关移除的项的所有信息均会被删除。若要从列表中移除所有项，请使用 {@link clearItems} 方法。
     * 
     * @param p_item 一个数字（如 0），表示 {@link items} 集合中项的序号；或者一个 {@link mx.editors.ListItem} 对象。
     */
    me.removeItem = function(p_item)
    {
        if (me.dropDownControl != null)
        {
            var item = null;
            if ($isNumber(p_item) || $isString(p_item))
            {
                item = me.items[p_item];
            }
            else if ($isObject(p_item))
            {
                item = p_item;
            }
            
           	me.listEditor.removeItem(item);

            if (item != null)
            {
                me.items.remove(item);
                me.items[item.value] = null;
                delete me.items[item.value];
                
                for(var i=0;i<_items.length;i++){
                	if(_items[i][me.displayMember] == item.text && _items[i][me.valueMember] == item.value){
                		_items.removeAt(i);
                		break;
                	}
                }
            }
            
            if (me.listEditor != null)
            {
            	me.setValue(me.listEditor.value);
            }
        }
    };
    
    /**
     * 设置 {@link valueMember} 字段的值。
     * @param p_valueMember 一个字符串，该字符串对应的属性的值将用作 {@link mx.editors.DropDownEditor} 中的项的实际值。
     */
    me.setValueMember = function(p_valueMember)
    {
    	if (p_valueMember != null && p_valueMember != me.valueMember)
        {
    		_preValueMember = me.valueMember;
    		me.valueMember = p_valueMember;
        	me.differDisplayValue = (me.displayMember != me.valueMember);
            if (me.dropDownControl != null)
            {
            	me.listEditor.valueMember = p_valueMember;
                _resetDropDownControlItems();
            }else if(me.url == null &&　$isArray(_items) && _items.length > 0){
            	_resetValue(_items,me.value);
            }
        }
    };
    
    /**
     * 设置 {@link displayMember} 字段的值。
     *  @param p_displayMember 一个字符串，该字符串对应的属性的值将用作 {@link mx.editors.DropDownEditor} 中的项的显示值。
     */
    me.setDisplayMember = function(p_displayMember)
    {
    	if (p_displayMember != null && p_displayMember != me.displayMember)
        {
            me.displayMember = p_displayMember;
            me.differDisplayValue = (me.displayMember != me.valueMember);
            if (me.dropDownControl != null)
            {
                me.listEditor.displayMember = p_displayMember;
                _resetDropDownControlItems();
            }else if(me.url == null &&　$isArray(_items) && _items.length > 0){
            	_resetValue(_items,me.value);
            }
        }
    };
    
    function _getItemsByValue(p_items,p_value){
    	var itemAry = [];
    	if(p_value){
    		var valueAry = p_value.split(me.valueSeparator);
    		$(valueAry).each(function(i,value){
    			$(p_items).each(function(){
    				if(value == this[_preValueMember]){
    					itemAry.add(this);
    					return false;
    				}
    			});
    		});
    	}
    	return itemAry;
    }
    
    function _resetValue(p_items,p_value){
		var v_items = _getItemsByValue(p_items,p_value);
		if(v_items.length > 0){
			var displyAry = [];
			var valAry = [];
			$(v_items).each(function(){
				displyAry.add(this[me.displayMember]);
				valAry.add(this[me.valueMember]);
			});
			me.setValue(valAry.join(me.valueSeparator),displyAry.join(me.valueSeparator),_preValueMember == me.valueMember ? false : true);
		}
    }
    
    function _resetDropDownControlItems(){
    	me._initDropDownControl();
    	//重置下拉框选项,并重新赋值
    	if(me.url == null &&　$isArray(_items) && _items.length > 0){
    		me.listEditor.setItems(_items);
    		_resetValue(_items,me.value);
    	}
    	me.isLoaded = false;
    	//重新加载远程数据
    	me._resetDropDownControl();
    }
    
    /**
     * 从 {@link items} 集合中移除所有项。若要从 {@link mx.editors.DropDownEditor} 中移除单个项，请使用 {@link removeItem} 方法。
     */
    me.clearItems = function()
    {
        if (me.dropDownControl != null)
        {
            me.listEditor.clearItems();
            me.items = [];
            _items = [];
            me.$input.val("");
            me.value="";
        }
    };

    /**
     *@ignore 
     */
    me._initDropDownControl = function()
    {
    	if (me.dropDownControl == null)
        {
        	var options = {};
            options.displayMember = me.displayMember;
            options.valueMember = me.valueMember;
            
            if ($isArray(me.items))
            {
                options.items = me.items;
                _items = me.items;
            }
            if (me.displayCheckBox)
            {
                options.displayCheckBox = me.displayCheckBox;
            }
            if (me.displayNullValue)
            {
                options.displayNullValue = me.displayNullValue;
            }
            if (me.valueSeparator != null)
            {
                options.valueSeparator = me.valueSeparator;
            }
            
            me.dropDownControl = new mx.containers.Container({
            	id: "dropDownEditorContainer"
            });
            me.dropDownControl.$e.addClass("mx");
            
            me.listEditor = new mx.editors.ListEditor(options);
            me.dropDownControl.addControl(me.listEditor);
            
            me.listEditor.$e.css("overflow-x","auto");
            me.items = me.listEditor.items;
            _synchronizedItems();
            me.listEditor.on("selectionchanged", _selectionChanged);
            
            _initSelectAndCloseButton();
        }
        
        me.dropDownControl.$e.addClass("dropDown");
        me.dropDownControl.$e.hide();
    };
    
    function _initSelectAndCloseButton(){
    	if(me.displayCheckBox || me.displayCloseButton){
	    	$container = $("<table id='checkTable'><tr><td align=right></td></tr></table>");
	    	var _$Td = $container.find("td:last");
	    	var $table = $("<table><tr><td/><td/></tr></table>");
	    	_$Td.append($table);
	    	if(me.displayCheckBox)
	    		$table.find("td:first").append(_createSelectAllCheckBox());
	    	if(me.displayCloseButton)
	    		$table.find("td:last").append(_createCloseBtn());
	    	me.dropDownControl.$e.append($container);
			$container=null;
    	}
    }
    
    var _$checkDiv = null;
    function _createSelectAllCheckBox(){
    	_$checkDiv = $("<div class='checkEditor'><span id=img/><span id=text/></div>");
    	_$checkDiv.children("span").click(_checkEditor_onclick);
    	var $txt = _$checkDiv.find("#text");
    	$txt.text(mx.msg("SELECTALL"));
    	return _$checkDiv;
    }
    
    function _createCloseBtn(){
    	var $closeDiv = $("<div id=closeDiv><span id='closetext'/></div>");
    	$closeDiv.click(function(){me.hideDropDown(me.speed);});
    	$closeDiv.find("#closetext").text(mx.msg("CLOSE"));
    	return $closeDiv;
    }
    
    function _checkEditor_onclick(e){
    	if (me.isReadOnly() || !me.enabled) return;
    	if(_$checkDiv)
    		checkSelectAll();
    }
    
    base.reset = me.reset;
    
    me.reset = function(p_triggerEvent)
    {
         base.reset(p_triggerEvent);
         checkSelectAll(false,true);
         me.listEditor.reset();
    }
    
    function checkSelectAll(p_checked,p_istrigger){
    	if(me.displayCheckBox ===  false)
    	{
    	    return;
    	}
    	if(p_istrigger == undefined)
    		p_istrigger = true;
    	var hasChecked = _$checkDiv.hasClass("checked");
    	if(p_checked == undefined){
    		p_checked = !hasChecked;
    	}
    	_$checkDiv.toggleClass("checked",p_checked);
    	if(p_checked != hasChecked && p_istrigger)
    		doCheck(p_checked);
    }
    
    function doCheck(p_checked){
    	p_checked ? checkAllItem() : unCheckAllItem();
    }
    
    function checkAllItem(){
    	me.listEditor.checkAll();
    	_selectionChanged();
    }
    
    function unCheckAllItem(){
    	me.listEditor.uncheckAll();
    	_selectionChanged();
    }
    
    base._refreshState = me._refreshState;
    /**
     * @ignore
     */
    me._refreshState = function()
    {
        base._refreshState();
        if(me.displayCheckBox && me.dropDownControl && _$checkDiv){
        	_$checkDiv.toggleClass("disabled", !me.enabled || me.isReadOnly());
        }
    };
    
    base.setValue = me.setValue;
    me.setValue = function(p_value, p_displayValue, p_triggerEvent)
    {
    	base.setValue(p_value, p_displayValue, p_triggerEvent);
        if (me.listEditor != null)
        {
            me.listEditor.setValue(p_value);
        }
        
        if(me.displayCheckBox && me.dropDownControl){
        	var checkValueAry = me.listEditor.getCheckedValues();
        	var allItems = me.listEditor.items;
        	if(checkValueAry.length == 0){
        		checkSelectAll(false);
        	}else {
        		if(allItems.length == checkValueAry.length){
        			checkSelectAll(true);
        		}else{
        			checkSelectAll(false,false);
        		}
        	}
        }
    };

    /**
     * 参见 {@link mx.editors.Editor.setText} 方法。
     * @param p_text
     * @param p_triggerEvent
     */
    me.setText = function(p_text, p_triggerEvent)
    {
        var value = _getValueByText(p_text);
        me.setValue(value, p_triggerEvent);
    };

    /**
     *@ignore 
     */
    me._formatValue = function(p_value)
    {
        if(!_transValueToText){
        	return me.$input.val();
        }
        
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

    var _restClient = null;
    base._resetDropDownControl = me._resetDropDownControl;
    /**
     *@ignore 
     */
    me._resetDropDownControl = function()
    {
        base._resetDropDownControl();
        if (($isEmpty(me.items) || me.items.length == 0 || (me.items.length == 1 && me.displayNullValue === true)) && me.url != null && !me.isLoaded)
        {
            if (_restClient == null)
            {
                _restClient = new mx.rpc.RESTClient({ baseUrl: me.url });
            }
            var getResult = _restClient.getSync("");

            if (getResult.successful)
            {
                var vItems = [];
            	me.isLoaded = true;
            	var _value = me.value;
                me.clearItems();
                if (typeof(getResult.resultValue) != "undefined" && typeof(getResult.resultValue.items) != "undefined")
                {
                	vItems = getResult.resultValue.items;
                	me.setItems(getResult.resultValue.items);
                }
                else
                {	
                	vItems = getResult.resultValue;
                    me.setItems(getResult.resultValue);
                }
                _resetValue(vItems,_value);
            }
        }

		_resizeDropDown();
		
        if(me.isValidate){
        	me.listEditor.setValue(me.value);
        }
    };

	function _resizeDropDown()
	{
		var width = me.$e.width();
        var height = calcuteDropDownHeight();
		me.listEditor.resizeTo(width - 1, height);
        me.dropDownControl.resizeTo(width, height + _btnHeight);
	}
	
	function calcuteDropDownHeight(){
		var _dropDownHeight = me.items.length * 18 + 5;
        if (_dropDownHeight === 5)
        {
			_dropDownHeight = me.dropDownMinHeight;
        }else if (_dropDownHeight > me.dropDownMaxHeight)
        {
        	_dropDownHeight = me.dropDownMaxHeight;
        }
        return _dropDownHeight;
	}
    
    /**
     *@ignore 
     */
    me._afterDropDown = function()
    {
    	//已经添加了item
    	if(me.items.length > 0){
    		var listEditorDiv = me.listEditor.$e.get(0);
        	var listEditorUl = me.listEditor.$list.get(0);
    		//判断是否存在滚动条
        	var srollBarHeight = (listEditorUl.clientWidth < listEditorUl.scrollWidth ||  listEditorDiv.clientWidth < listEditorDiv.scrollWidth) ? 21 : 0;
        	
        	var height = me.listEditor.height + srollBarHeight;
        	me.listEditor.setHeight(height);	
        	
            if (srollBarHeight > 0 && listEditorUl.scrollWidth !== listEditorUl.clientWidth)
            {
            	me.listEditor.$list.width(listEditorUl.scrollWidth + 2);
            }
        	me.dropDownControl.setHeight(height + _btnHeight);
        	
        	//判断下拉框是否是往上 
        	if(me.dropDownControl.$e.get(0).offsetTop<me.$e.get(0).offsetTop){
            	me.dropDownControl.setTop(me.dropDownControl.$e.get(0).offsetTop - srollBarHeight);
        	}
    	}
    	if (me.listEditor.selection != null)
        {
            me.listEditor.selection.scrollIntoView();
        }
    };

    function _selectionChanged()
    {
        var result = null;
        if (me.listEditor.displayCheckBox)
        {
            var values = me.listEditor.getCheckedValues();
            var seperator = me.valueSeparator;
            if (seperator == null)
            {
                result = values;
            }
            else
            {
                result = values.join(seperator);
            }
        }
        else
        {
            result = me.listEditor.value;
            me.hideDropDown();
        }
        me.setValue(result, true);
    }

    function _getTextByValue(p_value)
    {
    	if ($isBoolean(p_value))
    	{
    		return parseBoolean(p_value) ? mx.msg("CHECKED_VALUE") : mx.msg("UNCHECKED_VALUE");
    	}
    	//还没有初始化下拉框
    	if(me.listEditor == null){
    		for (var i = 0; i < me.items.length; i++){
    			if(p_value == me.items[i][me.valueMember]){
    				return me.items[i][me.displayMember];
    			}
    		}
    	}else{
	        for (var i = 0; i < me.items.length; i++)
	        {
	            if (p_value == me.items[i].value)
	            {
	                return me.items[i].text;
	            }
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

    function _getValueByText(p_text)
    {
        for (var i = 0; i < me.items.length; i++)
        {
            if (p_text == me.items[i].text)
            {
                return  me.items[i].value;
            }
        }
        return p_text;
    }
    
    me.endOfClass(arguments); 
    return me;
};
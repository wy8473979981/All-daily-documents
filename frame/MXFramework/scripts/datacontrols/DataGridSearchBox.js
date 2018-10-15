$ns("mx.datacontrols");

$import("mx.editors.EditorFactory");
$import("mx.controls.Button");
$import("mx.utils.CheckUtil");
$import("mx.windows.MessageBox");

/**
 * 提供一个查询框，它要和 {@link mx.datacontrols.PagedControl} 配合使用。帮助有需要进行查询的的表格控件实现查询功能。
 */
mx.datacontrols.DataGridSearchBox = function()
{
	var me = $extend(mx.controls.Control);
	var base = {};
	
	/**
     * @default 100%
     */
    me.width = "100%";

    /**
     * @default auto
     */
    me.height = "auto";

    /**
     * 获取查询框所属的 {@link mx.datacontrols.PagedControl} 对象。
     * 初始化控件时必须设置该属性
     */
	me.pagedControl = null;
	
	/**
	 * 获取一个 {@link mx.controls.Button} 对象，表示查询框的查询按钮。
	 */
	me.searchButton = null;
	
	/**
	 * 获取一个 {@link mx.controls.Button} 对象，表示查询框的重置按钮。
	 */
	me.resetButton = null;
	
	/**
	 * 获取或设置一个 Boolean 值，表示查询按钮和重置按钮是否显示。
	 */
	me.displayButton = true;
	
	/**
	 * 获取或设置一个 Boolean 值，表示是否对查询框中输入的文本做sql注入检查。默认检查
	 * 
	 * @default true 
	 */
	me.sqlInjectionCheck = true;
	
	/**
     * 获取或设置包含sql关键字的查询条件是否提交后台查询
     * 
     * @default true
     */
    me.allowSqlKeyQuery = true;
    
    /**
     * 获取或初始化设置查询框中输入的值是否需要编码。
     * 
     * @default false
     */
    me.encodeValue = false;
	
	/**
	 * @ignore
	 */
	me._isSqlInject = false;
	
	/**
     * 获取一个集合，包含控件中显示的所要显示的查询项的集合。
     * 可通过colspan设置查询项跨列，注：当跨列项为该行最后一列时不作为跨列处理。
     */
    me.fields = [];
    
    /**
	 * 获取或设置一个 Boolean 值，表示是否将查询按钮放在最后一行的最后位置。默认不是。
	 * 若为true，itemNumOfRow=3，fields数量正好为3，查询按钮布局另起一行，放在行的最后。
	 * @default false 
	 */
    me.newItemLayout = false;
    
    /**
     * 获取和设置查询框每行显示的查询项个数。
     * 
     * @default 3
     */
    me.itemNumOfRow = 3;
    
    /**
     * 获取设置标题列的宽度。
     * 
     * @default 100
     */
    me.captionColumnWidth = 100;

    /**
     * 获取一个集合，包含查询框中所有的编辑器（{@link mx.editors.Editor}）。
     * 
     * @item mx.editors.Editor
     * @index 编辑器的标识或编辑器在集合中的序号（从 0 开始计数）。
     */
    me.editors = [];
    
    /**
     * 获取一个集合，包含查询框中所有的扩展的按钮（{@link mx.controls.Button}）。
     * 
     * @item mx.controls.Button
     * @index 按钮的标识或按钮在集合中的序号（从 0 开始计数）。
     */
    me.buttons = [];
    
    /**
     * 设置扩展按钮的宽度,该属性需要和{@link buttons} 配合使用
     * @default 75px
     * 
     * @example
     * 添加扩展按钮
     * buttons:[
     * 			  {text:"扩展按钮1"},
     * 			  {text:"扩展按钮2"}
     * 		   ],
     * 设置扩展按钮的宽度
     * buttonWidth: "100px"
     */
    me.buttonWidth = "75px";
    
    /**
     * 获取和设置查询框是否初始化时隐藏。
     * 
     * @default false
     */
    me.initHidden = false;
    
    /**
     * 获取和设置查询框是否可以隐藏。
     * 
     * @default true
     */
    me.allowHiding = true;
    
    /**
     * 获取或设置是否使用高级查询功能。
     * 
     * @default false
     */
    me.isAdvance = false;
    
    /**
     * 获取或设置表格是否固定宽度
     * 
     *  @default false
     */
    me.tableFixed = false;
    
    /**
     * @ignore
     */
    me._isHidden = null;
    
    /**
     * @ignore
     */
    me._messageBox = null;
    
    
    /**
     * 在搜索条件改变时触发。
     */
    me.onsearchparamchanged = null;
    
    /**
     * 在点击查询按钮时触发。
     * 
     * @param cancel
     *            一个 Boolean 值，表示是否中止当前的查询动作。
     */
    me.onsearching = null;
    
    /**
     * 添加一个查询字段后触发事件。
     */
    me.onfieldadd = null;
    
    /**
     * 包含自身的容器，是一个Container实例
     */
    me.container = null;
    
    
    var $table = null;
    
    /**
     * 设置存储自定义高级查询过滤条件的数组。
     */
    var customJsonFilters = null;
	
	base.init = me.init;
	me.init = function()
	{
		base.init();
		
		me.$e.addClass("dataGridSearchBox");
		
		me.setContainer(me.container);
		
		if(me.allowHiding == false)
	    {
		    me.initHidden = false;
	    }
		
		if (typeof $MX_ENABLE_SKQ != "undefined")
        {
        	me.allowSqlKeyQuery = false;
        }
		
		me._isHidden = me.initHidden;
		
		$table = _createTable();
        me.$e.append($table);
        me.$e.on("resize" , _ajustDataGridTop);
        
        if(me._messageBox==null){
        	me._messageBox = new mx.windows.MessageBox( {
				reusable : true,
				title :  mx.msg("WARNNING"),
				cancelButtonText : mx.msg("CLOSE"),
				message : mx.msg("ERROR_RETURN"),
				imgkey : "warnning",
				showOkButton : false,
				showCancelButton : true
			});
        }
        
        me.$e.keyup(_searchBox_onkeyup);
        
        if (!me.enabled)
        {
        	me.setEnabled(me.enabled);
        }
	};
	
	
	function _searchBox_onkeyup(e){
		if($notEmpty(me.searchButton) && e.keyCode == 13){
			_enterKeydownSearch();
		}
		e.stopPropagation();
	}

	
	/**
	 * 设置字段的可见性。
	 * @param p_fieldName 字段名称。
	 * @param p_visible 一个 Boolean 值。
	 */
	me.setFieldVisible = function(p_fieldName, p_visible)
	{
		if ($isString(p_fieldName))
		{
			var $editorTd = $table.find("td[id='" + p_fieldName + "']");
			var $captionTd = $editorTd.prev();
			if (p_visible)
			{
				$editorTd.show();
				$captionTd.show();
			}
			else
			{
				$editorTd.hide();
				$captionTd.hide();
			}
		}
	}
	
	/**
	 * 绘制{@link fields} 指定的查询字段编辑器控件
	 */
	me.setFields = function()
	{
        me.editors.clear();
        
        _renderFields(me.fields);
        if(me.initHidden)
        {
            me.toggleShowState(me.initHidden);
        }
        _initButtons();
        
        if (!me.enabled)
        {
        	me.setEnabled(me.enabled);
        }
       
	};
	
	 /**
     * 设置 {@link enabled} 字段的值。
     */
    me.setEnabled = function(p_enabled)
    {         
    	me.enabled = p_enabled;
    	if (!me.searchButton) return;
    	me.searchButton.setEnabled(p_enabled);
    	me.resetButton.setEnabled(p_enabled);
    	for (var i = 0; i < me.buttons.length; i++)
        {
            me.buttons[i].setEnabled(p_enabled);
        }
    	
    	for (var j = 0; j < me.editors.length; j++)
        {
            var editor = me.editors[j];
            _setEditorEnable(editor,p_enabled); 
        }
    };
    
	/**
	 * 设置包含DataGridSearchBox的容器，默认为与之关联的表格控件。
	 * @param p_container 一个mx.containers.Container对象
	 */
	me.setContainer = function(p_container)
	{
		if(!$instanceOf(p_container,mx.containers.Container))
		{
			me.container = null;
		}
		else
		{
			me.container = p_container;
		}
	}
	
	/**
	 * 添加一个查询字段。
	 * @param p_field 一个 JSON 对象，该对象表示查询字段的属性。 例如： { name: "age", caption: "年龄", editorType："NumberEditor"}。
	 */
	me.appendField = function(p_field)
	{
		if ($.isPlainObject(p_field) && $notEmpty(p_field.name))
		{
			me.fields.add(p_field);
			var $tr = $table.find("tr:last");
			var $td = $tr.find("td:last");
			var index = $td.index();
			if (index % me.itemNumOfRow == 0)
			{
				$tr = $("<tr/>");
				$tr.append($td);
				$table.append($tr);
			}

			var fieldCell = _renderField(p_field);
            $td.before(fieldCell.captionCell);
            $td.before(fieldCell.editorCell); 
            me.trigger("fieldadd");
		}
	};
	
	/**
	 * 切换查询框的显示状态。
	 * 
	 * @param [p_isHidden = null] 一个 Boolean 值，如果为 true,表示显示查询框，反之表示隐藏查询框。null 表示切换到相反状态。
	 */
    me.toggleShowState = function(p_isHidden)
    {
        if($notEmpty(p_isHidden))
        {
            me._isHidden = p_isHidden;
        }
        else
        {
            me._isHidden = !me._isHidden;
        }
        
        if ($.browser.msie && ($.browser.version == "8.0" || $.browser.version == "9.0"))
        {
        	if(me._isHidden == true)
            {    	
                me.$e.css("visibility", "hidden");
            }
            else
            {
            	me.$e.css("visibility", "visible");
            }
        }
        else
        {
        	if(me._isHidden == true)
            {    	
                me.$e.css("display", "none");
            }
            else
            {
            	me.$e.css("display", "");
            }
        }
        
    };
    
    /**
     * 获取查询框的高度。
     */
    me.getHeight = function()
    {
    	if(me._isHidden== true)
    	{
    		return 0;
    	}
    	if(me.$e && me.$e.outerHeight() != 0)
    	{
    		return me.$e.outerHeight();
    	}
        var height = parseInt((((_itemNum?_itemNum:me.fields.length) + me.itemNumOfRow - 1) / me.itemNumOfRow)) * 21;
        if (height == 0)
        {
            return 0;
        }
        
        var adder = 6;
        var editors = me.editors;
        var len = editors.length;
        var maxHeight = 21;
        var colspan = 1;
        var num = 0;
        for(var i = 0; i < len; i++)
        {
        	var _height = parseInt(editors[i].height);
        	if(_height > maxHeight)
        	{
        		maxHeight = _height;
        	}
        	if((num + 1) % me.itemNumOfRow == 0 || (num == _itemNum -1)) 
        	{
        		adder += maxHeight - 20;
        		maxHeight = 21;
        	}
        	
        	if (editors[i].colspan) 
        	{
        		if (colspan < editors[i].colspan) 
        		{
        			i--;
        			colspan++;
        		}
        		else
        		{
        			colspan = 1;
        		}
        	}
        	
        	num++;
        }
        
        return height + adder + _getButtonContainerHeight();
    };
    
    /**
     * 以 JSON 对象数组的形式返回查询参数。例如： 
     * [
     *      //属性age的查询条件
     *      {
     *          name: "age", // 属性名称
     *          criterions: [
     *              { fieldName: "age", value: 21, operator: ">"},
     *              { fieldName: "age", value: 48, operator: "<"}
     *          ], // 查询条件子项集合
     *          junction: "and", //查询条件子项的连接关系
     *          columnJunction: "and" //属性age与相邻属性之间的连接关系
     *      },
     *      {
     *          name: "gender",
     *          criterions: [
     *              { fieldName: "gender", value: "1", operator: "="}
     *          ],
     *          junction: "and",
     *          columnJunction: "and"
     *      }
     * ]
     */
    me.getJsonSearchParam = function()
    {
        me._isSqlInject = false;
    	var params = [];
        var editors = me.editors;
        var fields = me.fields;
        var sqlIn = [];
        for (var i = 0; i < editors.length; i++)
        {
            var name = fields[i].name;
            var value = editors[i].value;
            if ($instanceOf(editors[i], mx.editors.ConditionFilterEditor))
            {
                var jsonValue = editors[i].getJsonValue();
                if ($notEmpty(jsonValue) && (jsonValue.criterions.length > 0))
                {
                    params.add(jsonValue);
                }
            }
            else
            {
                if ($notEmpty(value))
                {
                    var jsonValue = {};
                    var criterions = [];
                    if ($instanceOf(editors[i], mx.editors.TextEditor) && me.sqlInjectionCheck)
                    {
                        var res = mx.utils.CheckUtil.isSqlInjection(value);
                        if (!res.successful)
                        {
                        	if (!sqlIn.contains(res.hint))
                            {
                                sqlIn.add(res.hint);
                                continue;
                            }
                        }
                    }
                    var ele = {};
                    ele.fieldName = name;
                    ele.operator = "=";
                    ele.value = value;
                    criterions.add(ele);
                    jsonValue.criterions = criterions;
                    jsonValue.junction = "and";
                    jsonValue.columnJunction = "and";
                    params.add(jsonValue);
                }
            }
        }

        if (customJsonFilters != null)
        {
        	params = $.merge(params, customJsonFilters);
        }
        
        if (sqlIn.length > 0)
        {
            me._isSqlInject = true;
        	var sqls = sqlIn.join(",");
           
    		me._messageBox.setMessage(mx.msg("SQL_INJECTION",{sql:sqls}));
            me._messageBox.show();
        }
        
        return params;
    };
    
    /**
     * 获取查询参数，是由需要查询的参数拼成的字符串，如 key1=value1&key2=value2。
     */
    me.getSearchParam = function()
    {
    	me._isSqlInject = false;
    	var params = "";
        var editors = me.editors;
        var fields = me.fields;
        var sqlIn = [];
        for (var i = 0; i < editors.length; i++)
        {
            var name = fields[i].name;
            var value = editors[i].value;
            if ($notEmpty(value))
            {
                if ($instanceOf(editors[i], mx.editors.TextEditor))
                {
                    if(me.sqlInjectionCheck){
                    	var res = mx.utils.CheckUtil.isSqlInjection(value);
                    	if (!res.successful)
                        {
                        	if (!sqlIn.contains(res.hint))
                            {
                                sqlIn.add(res.hint);
                                continue;
                            }
                        }else
	                    {
	                        params = params +name+ "=" + _getValue(value) + "&";
	                    }
                    }else{
                    	 params = params +name+ "=" + _getValue(value) + "&";
                    }
                }
                else
                {
                    params = params +name+ "=" + _getValue(value)+"&";
                }
            }
        }
        
        if (sqlIn.length > 0)
        {
            me._isSqlInject = true;
        	var sqls = sqlIn.join(",");
    		me._messageBox.setMessage(mx.msg("SQL_INJECTION",{sql:sqls}));
            me._messageBox.show();
        }
        if (params.length > 0)
        {
            params = params.substring(0, params.length-1);
        }
        
        return params;
    };
    
    /**
     * 添加组合查询过滤条件，需要在加载数据前调用。
     *    
     * @param p_fieldName 一个字符串，表示查询条件的字段信息。
     * @param p_operator 一个字符串，表示查询条件的操作符信息。
     * <p>
     * 该参数可选的值包括以下内容。
     * <ul>
     *      <li><b>^</b> 表示‘包含’</li>
     *      <li><b>*</b> 表示‘开始包含’</li>
     *      <li><b>&</b> 表示‘结尾包含’</li>
     *      <li><b><></b> 表示‘不等于’</li>
     *      <li><b>=</b> 表示‘等于’</li>
     *      <li><b>>=</b> 表示‘大于等于’</li>
     *      <li><b><=</b> 表示‘小于等于’</li>
     * </ul>
     * </p>
     * @param p_value 一个字符串，表示查询条件的字段的值信息。
     * @param p_junction 一个字符串，表示列内的关系运算符信息。
     * @param p_colJunction 一个字符串，表示列之间的关系运算符信息。
     * <p>
     * 参数 p_junction、p_colJunction 可选的值包括以下内容。
     * <ul>
     *      <li><b>and</b> 表示‘并且’</li>
     *      <li><b>or</b> 表示‘或者’</li>
     * </ul>
     * </p>
     */
    me.addJsonFilter = function(p_fieldName, p_operator, p_value, p_junction, p_colJunction)
    {
    	if (!$.isArray(customJsonFilters))
    	{
    		customJsonFilters = new Array();
    	}
    	
    	// 如果已经添加相同的字段条件，则将后续添加的该字段条件和之前的条件
    	// 合并到指定字段的条件集合中，以后续添加的关系操作符为最终操作符。
    	var filter;
    	for (var i = 0; i < customJsonFilters.length; i++) {
    		filter = customJsonFilters[i];

			for (var j = 0, l = filter.criterions.length; j < l; j++)
			{
				if (filter.criterions[j].fieldName == p_fieldName && 
					(filter.operator != p_operator || filter.value != p_value))
				{
					filter.addFilter(p_fieldName, p_operator, p_value);
					filter.junction = p_junction;
					filter.columnjunction = p_colJunction;
					return;
				}	
			}
    	}
    	
    	var jsonFilter = new JsonFilter({junction: p_junction, columnJunction: p_colJunction});
    	jsonFilter.addFilter(p_fieldName, p_operator, p_value);
    	
    	customJsonFilters.add(jsonFilter);
    };
    
    /**
     * 销毁方法
     * added by tiger on 2015/4/2 17:12:06
     */
    base.dispose = me.dispose;
    me.dispose = function(){
		
		if(me.searchButton){
			me.searchButton.dispose();
			me.searchButton=null;
			delete me.searchButton;
		}
		
		if(me.resetButton){
			me.resetButton.dispose();
			me.resetButton=null;
			delete me.resetButton;
		}
		
		while(me.buttons.length > 0){
    		var btn = me.buttons.pop();			
    		if(typeof btn.dispose == 'function'){
    			btn.dispose();
    			btn = null;
    		}
    	}				
		
    	if(me._messageBox != null){
    		me._messageBox.dispose();
    		me._messageBox = null;
    	}
		
		if(me.container){
			me.container.dispose();
			me.container=null;
		}
		
    	while(me.editors.length > 0){
    		var editor = me.editors.pop();
			me.editors[editor.name]=null;
			delete me.editors[editor.name];			
    		if(typeof editor.dispose == 'function'){
    			editor.dispose();
    			editor = null;
    		}
    	}
		
		$("*",$table).each(function(){
			jQuery.event.remove(this);
			jQuery.removeData(this);
		});
		$table.removeAttr("cellspacing").removeAttr("cellpadding");
		$table.find("td").removeAttr("class").removeAttr("style").removeAttr("id").removeAttr("colspan").removeAttr("rowspan");
		$table.off();
		$table.unbind();
		$table.empty().remove();
    	$table = null;
		delete $table;
		
		if(_$buttonContainer){
			_$buttonContainer.off();
			_$buttonContainer.unbind();
			_$buttonContainer.removeAttr("style").removeAttr("class");
			_$buttonContainer.empty().remove();
			_$buttonContainer=null;
			delete _$buttonContainer;
		}		
		
		me.$e.removeClass("dataGridSearchBox");		
		
    	base.dispose();    	
    	if ($isIE())
    		CollectGarbage();
    }


    /**
     * @ignore
     * 
     * 高级查询过滤条件构造类。
     */
    function JsonFilter()
    {
    	var self = this;
    	
    	/**
    	 * 获取或设置列过滤条件对象集合。
    	 * 过滤条件对象示例 ：{ "fieldName": p_fieldName,	"operator": p_operator,	"value": p_value }
    	 */
    	self.criterions = new Array();
    	
    	/**
    	 * 获取或设置列内部逻辑关系运算符。
    	 */
    	self.junction = "and";
    	
    	/**
    	 * 获取或设置列之间逻辑关系运算符。
    	 */
    	self.columnJunction = "and";

		    	
    	self.addFilter = function(p_fieldName, p_operator, p_value)
    	{
    		self.criterions.add(
				{
					"fieldName": p_fieldName,
					"operator": p_operator,
					"value": p_value
				}
			);
    	};
    	
    	self.removeFilter = function(p_fieldName, p_operator, p_value)
    	{
    		for (var i = 0; i < self.criterions.length; i++) {
    			if (self.criterions[i].fieldName == p_fieldName&& 
    					self.criterions[i].operator == p_operator && 
    						self.criterions[i].p_value == p_value
    			)
    			{
    				self.criterions.splice(i, 1);
    			}
    		}
    	};
    	
    	var args = arguments[0];
    	if ($.isPlainObject(args))
    	{
    		self.criterions = $notEmpty(args.criterions) ? args.criterions : [];
    		self.junction = $notEmpty(args.junction) ? args.junction : "and";
    		self.columnJunction = $notEmpty(args.columnJunction) ? args.columnJunction : "and";
    	}
    	
    	return self;
    }
    
    /**
     * 提供一个方法，重置所有查询条件。
     */
    me.reset = function()
    { 	
        for (var i = 0; i < me.editors.length; i++)
        {
            if(me.editors[i].value == "" ||me.editors[i].value != me.fields[i].value)
            {
            	me.editors[i].reset();
            } 
            me.editors[i].value = me.fields[i].value;
        }
        me._updateEditor();
    };
    
    /**
     * @ignore
     */
    me._updateEditor = function()
    {
        for (var i = 0; i < me.editors.length; i++)
        {
            var editor = me.editors[i];
            if ($instanceOf(editor, mx.editors.DropDownEditor) ||
                $instanceOf(editor, mx.editors.CheckListEditor) ||
                $instanceOf(editor, mx.editors.ListEditor) ||
                $instanceOf(editor, mx.editors.AutoCompleteEditor)
            	)
            {
                if ($isEmpty(editor.items) || editor.items.length == 0)
                {
                    var pagedControl = me.pagedControl;
                    var entityContainer = pagedControl.entityContainer;
                    if ($notEmpty(entityContainer) &&　$notEmpty(entityContainer.dicts) && $notEmpty(entityContainer.dicts[editor.name]))
                    {
                        editor.appendItems(entityContainer.dicts[editor.name]);
                    }
                    else if ($notEmpty(pagedControl.dicts) && $notEmpty(pagedControl.dicts['#'+ editor.name]))
                    {
                        editor.appendItems(pagedControl.dicts['#'+ editor.name].values);
                    }
                }
            }
            else if ($instanceOf(editor, mx.editors.DropDownTreeEditor)
            		||$instanceOf(editor, mx.editors.DropDownGridEditor)) 
            {
            	if ($isEmpty(editor.dicts) || editor.dicts.length == 0) 
            	{
            		var pagedControl = me.pagedControl;
                    var entityContainer = pagedControl.entityContainer;
            		
            		if ($notEmpty(entityContainer.dicts)
            				&& $notEmpty(entityContainer.dicts[editor.name])) 
            		{
            			editor.appendDicts(entityContainer.dicts[editor.name]);
            		}
            	}
            }
            
            if (!$isEmpty(editor.value))
            {
            	if ($instanceOf(editor, mx.editors.CustomEditor))
            	{
            		var text = editor.text;
            		editor.setValue(editor.value);
            		if ($notEmpty(text))
            		{
            			editor.setText(text);
            		}
            	}
            	else
            	{
            		editor.setValue(editor.value);
            	}
            }
        }
        
        //由于Datagrid被addControl时渲染dom有一个过程，虽然Datagrid中使用了 
        //    $(function(){
    	//    	_initGridTop();
    	//    });
        //但是当在window组件中使用Datagrid时没有效果，所以调用getHeight时有时为0，在Datagrid加载之后再调用一次该方法，确保搜索框正确显示
        _ajustDataGridTop();
    };
    
	/*
	 * 创建表格
	 */
    function _createTable()
    {
        var $table = $("<table cellspacing=0 cellpadding=0 " + (me.tableFixed?"style='table-layout: fixed;'":"") + "></table>");
        return $table;
    };
	
    
    function _renderField(p_field)
    {
    	if ($isEmpty(p_field.name))
    		throw new Error(mx.err("FIELDNAME_NON_NULLABLE"));
    	if ($isEmpty(p_field.caption))
    		throw new Error(mx.err("FIELDCAPTION_NON_NULLABLE"));
    	//渲染标题
    	var $captionCell = $("<td class=caption/>");
    	var fieldCaption = $notEmpty(p_field.caption) ? (p_field.caption + "：") : "";
    	$captionCell.width(me.captionColumnWidth);
        $captionCell.text(fieldCaption);
        if(_checkTipLength(fieldCaption) > me.captionColumnWidth)
        {
            $captionCell.attr("title", fieldCaption);
        }
        
        var colspan = "";
        if (p_field.colspan)
        {
        	colspan = "colspan = " + (p_field.colspan*2-1);
        }
        
    	//渲染编辑器
    	var $editorCell = $("<td class=editor "+  colspan + "/>");
    	$editorCell.attr("id", p_field.name)
        var width = p_field.width;
        
        if($notEmpty(width))
        {
           if ((me.captionColumnWidth + width) < 250)
           {
               width = 250 - me.captionColumnWidth;
           }
        }
        else
        {
        	if (p_field.colspan)
        	{
        		width = 250*p_field.colspan - me.captionColumnWidth;
        	}
        	else
        	{
        		width = 250 - me.captionColumnWidth;
        	}
            
        }
        p_field.width = width;
       
        var editor = null;
        var editorType = $isEmpty(p_field.editorType) ? "TextEditor" : p_field.editorType;
        
        var fieldClone = $clone(p_field);
        delete fieldClone.visible;
        //把构造参数传递下去
    	fieldClone.editorOptions = $clone(fieldClone);
        if (editorType == "RichTextEditor")
        {
        	fieldClone.owner = true;
        	fieldClone.height = 21;
        }
        if (me.isAdvance && (
        		editorType == "TextEditor" || editorType == "DateTimeEditor" ||
             	editorType == "NumberEditor" || editorType == "TimeEditor")
        )
        {
        	//值类型默认设置为String
        	fieldClone.valueType = "string";
        	editor = mx.editors.EditorFactory.createEditor("ConditionFilterEditor", fieldClone);
        }
        else
        {
            editor = mx.editors.EditorFactory.createEditor(p_field.editorType, fieldClone);
            if(editorType == "TextEditor" || editorType == "NumberEditor"){
            	//注册回车事件
            	if(!editor.onenterkeyup)
            		editor.onenterkeyup = new MXEvent();
            	editor.on("enterkeyup",function(){
            		_enterKeydownSearch();
            	});
            }
        }
        me.editors[p_field.name] = editor;
        me.editors.add(editor);
        $editorCell.append(editor.$e);
        if(p_field.colspan){
        	$editorCell.width(250*p_field.colspan - me.captionColumnWidth);
        }else{
        	$editorCell.width(width);
        }
        
        
        p_field.visible = $isEmpty(p_field.visible) ? true: p_field.visible;
        if (p_field.visible)
        {
        	$captionCell.show();
        	$editorCell.show()
        }
        else
        {
        	$captionCell.hide();
        	$editorCell.hide()
        }
        
        if (p_field.showCaption === false)
        {
        	$captionCell.hide();
        }
        
        return { "captionCell": $captionCell, "editorCell": $editorCell };
    }
    
    
    function _renderButtons()
    {
    	var $cellButton = $("<td class=buttonTd/>");
	    if((_itemNum?_itemNum:me.fields.length) % me.itemNumOfRow > 0)
	    {
	        $cellButton.attr("colSpan", (me.itemNumOfRow - ((_itemNum?_itemNum:me.fields.length) % me.itemNumOfRow)) * 2 + 1); 
	    }
	    
	    if($.isIE67()) {
		    var $searchBoxButtonDiv = $("<div class=searchBoxButtonDiv/>");
		    $searchBoxButtonDiv.width(135);
		    $cellButton.append($searchBoxButtonDiv);
		    
		    me.searchButton = new mx.controls.Button({width: 60, text: mx.msg("SEARCH")});
		    me.resetButton = new mx.controls.Button({width: 60, text: mx.msg("RESET")});
		    var space = $("<div class=space style='width: 15px; height: 15px; display:inline-block'>");
		    me.searchButton.on("click", _search);
		    me.resetButton.on("click", me.reset);
		    $searchBoxButtonDiv.append(me.searchButton .$e);
		    $searchBoxButtonDiv.append(space);
		    $searchBoxButtonDiv.append(me.resetButton.$e);
	    } else {
	    	me.searchButton = new mx.controls.Button({text: mx.msg("SEARCH")});
		    me.resetButton = new mx.controls.Button({text: mx.msg("RESET")});
		    var space = $("<div class=space>");
		    me.searchButton.on("click", _search);
		    me.resetButton.on("click", me.reset);
		    $cellButton.append(me.searchButton .$e);
		    $cellButton.append(space);
		    $cellButton.append(me.resetButton.$e);
	    }
		
	    return $cellButton;
    }
    /*
     * 渲染查询条件
     */
    var _itemNum = 0;
    var _trNum = 0;
    function _renderFields(p_fields)
    {
        var $row = null;
        $table.children().remove();
        for (var i = 0; i < p_fields.length; i++)
        {
            var field = p_fields[i]; 
            if (field.colspan < 1)
            {
            	field.colspan = 1;
            }
            
            if (field.colspan > me.itemNumOfRow)
            {
            	field.colspan = me.itemNumOfRow;
            }
            
            if ((_itemNum+1)%me.itemNumOfRow == 0 && field.colspan > 1)
            {
            	field.colspan = 1;
            }
            
            if ((parseInt(_itemNum /me.itemNumOfRow)+1) != _trNum)
            {
                $row = $("<tr/>");
                $table.append($row);
                _trNum++;
            }
            var fieldCell = _renderField(field);
            
            if (field.mergeWithAbove)
            {
            	if ($row.children("td").length == 0)
            	{
            		var _row = $row.prev();
            		var _lastTd = _row.children("td:last-child");
            		if (field.showCaption !== false)
            		{
            			_lastTd.append(field.caption);
            		}
            		_lastTd.append(fieldCell.editorCell.children());
            	}
            	else
            	{
            		var _lastTd = $row.children("td:last-child")
            		if (field.showCaption !== false)
            		{
            			_lastTd.append(field.caption);
            		}
            		
            		_lastTd.append(fieldCell.editorCell.children());
            	}
            }
            else
            {
            	$row.append(fieldCell.captionCell);
            	$row.append(fieldCell.editorCell);
            	_itemNum++;
            }
            
            
            
            if (field.colspan)
            {
            	_itemNum += field.colspan-1;
            }
        }
        
        if (me.newItemLayout)
        {
        	if ((_itemNum) % (me.itemNumOfRow) == 0)
            {
            	$row = $("<tr/>");
                $table.append($row);
                for (var j = 0; j < me.itemNumOfRow - 1; j++)
                {
                	var $captionTd = $("<td/>").width(me.captionColumnWidth);
                    var $editorTd = $("<td/>").width(250 - me.captionColumnWidth);
                	$row.append($captionTd);
                	$row.append($editorTd);
                }
            }
            else
            {
            	for (var j = 0; j < me.itemNumOfRow - 1; j++)
                {
            		if (((_itemNum % me.itemNumOfRow) + j + 1) % me.itemNumOfRow == 0)
            			break;
            		var $captionTd = $("<td/>").width(me.captionColumnWidth);
                    var $editorTd = $("<td/>").width(250 - me.captionColumnWidth);
            		$row.append($captionTd);
                	$row.append($editorTd);
                }
            }
        }

        if (me.displayButton && $notEmpty($row))
        {
		  	$row.append(_renderButtons());
        }
    };
    
    var _isScroll = false;
    function _ajustDataGridTop()
    {
        if (me._isHidden == false)
        {
            var scrollWidth = me.$e.get(0).scrollWidth;
            var offsetWidth = me.$e.get(0).offsetWidth;
            if (scrollWidth > offsetWidth)
            {
                if( _isScroll == false)
                {
                	if($.isIE67()) {
                		me.$e.css("overflow-x", "scroll");
                	}
                	
                    _isScroll = true;
                    me.pagedControl.$grid.css("top", function(index, value) {
                        return parseFloat(value) + 17;}
                    );
                }
                
            }
            else
            {
               
                if(_isScroll == true)
                { 
                    me.pagedControl.$grid.css("top", function(index, value) {
                        return parseFloat(value) - 17;}
                    );
                    _isScroll = false;
                }
                else if($.isIE67())
                { 
                	me.pagedControl.$grid.css("top", function(index, value) {
						if (me.pagedControl && me.pagedControl.displayToolBar && parseInt(value) == parseInt(me.pagedControl.toolBarHeight))
						{
							value = me.getHeight() + parseInt(me.pagedControl.toolBarHeight);
						}
						else if (parseFloat(value) == 0)
						{
							value = me.getHeight();
						}
                        return parseFloat(value) ;
					});
                } 
                else
                {
                	if (me.pagedControl)
					{
						if (me.pagedControl.displayToolBar)
						{
							me.pagedControl.$grid.css("top",me.getHeight() + parseInt(me.pagedControl.toolBarHeight));	
						}
						else
						{
							me.pagedControl.$grid.css("top",me.getHeight());	
						}
						
					}
                }
            }
            
            //自适应调整多列查询框宽度
            if (!me.tableFixed)
            {
	            var cols = 1;
	            var num = 0;
	            var percent = 0;
	            var colsEditors = [];
	            for (var i = 0; i < me.fields.length; i++)
		        {
		        	if (me.fields[i].colspan && parseInt(me.fields[i].colspan) > 1)
		            {
		            	if(cols == 1){
			            	var start = (num+1)%me.itemNumOfRow*2;
			            	var end = start + (parseInt(me.fields[i].colspan)-1)*2;
			            	
			            	var _start = start;
			            	var _end = end;
			            	
		            		var tdwidth = 0;
			            	var editorWidth = 0;
			            	var originalTdWidth = 0;
		            		var tr = $table.find("tbody>tr");
		            		
		            		for (var j = 0; j < tr.length; j++)
		            		{
		            			start = _start;
		            			end = _end;
		            			var td = tr.eq(j).children("td");
		            			if (td.length < end)
		            			{
		            				var cs = 0;
		            				for (var k = 0; k < start; k++)
		            				{
		            					var colspan = td.eq(k).attr("colspan");
				            			if (colspan && colspan > 1)
				            			{
				            				cs += parseInt(colspan);
				            			}
		            				}
		            				start = start - cs + 1;
		            				end = end - cs + 1;
		            			}
		            			
		            			tdwidth = 0;
		            			editorWidth = 0;
								originalTdWidth = 0;
								percent = 0;
		            			if (end > 0)
		            			{
				            		for (var k = start - 1; k < end; k++)
				            		{
				            			var colspan = td.eq(k).attr("colspan");
				            			if (colspan && colspan > 1)
				            			{
				            				tdwidth = 0;
				            				break;
				            			}
				            			
				            			tdwidth+=td.eq(k).width();
				            			if ($.isIE6())
				            			{
				            				if (td.eq(k).attr("class") == "caption")
											{
				            					originalTdWidth += parseInt(me.captionColumnWidth);
				            				}
											else if(td.eq(k).attr("class") == "editor")
											{
				            					originalTdWidth += parseInt(me.editors[td.eq(k).attr("id")].width);
				            				}
				            			}
				            		}
		            			}
			            		
			            		if (tdwidth != 0)
			            		{
				            		editorWidth = tdwidth - td.eq(end-1).width() + td.eq(end-1).children().eq(0).width() + 2;
				            		percent = (editorWidth*100/tdwidth-0.1);
				            		
				            		if ($.isIE6())
									{
										originalTdWidth+=(me.itemNumOfRow*2-(parseInt(me.fields[i].colspan)*2-1));
				            			percent = percent*((tdwidth>originalTdWidth?tdwidth/originalTdWidth:originalTdWidth/tdwidth));
										
				            		}
				            		break;
			            		}
		            		}
		            		
		            		if (!percent)
		            		{
		            			var parenttr = me.editors[me.fields[i].name].$e.parent().parent();
		            			var editorsoffsetLeft = me.editors[me.fields[i].name].$e.eq(0).offset().left;
		            			var prevtr = parenttr.prev();
		            			if (prevtr.length == 0)
		            			{
		            				prevtr = parenttr.next();
		            			}
		            			
		            			if (prevtr.length > 0)
		            			{
		            				var lasteditor = prevtr.eq(0).find("td:last-child").children().eq(0);
		            				if (lasteditor.attr("class") == "buttonDiv")
		            				{	
		            					percent = 100;
		            				}
		            				else
		            				{
		            					percent = (lasteditor.eq(0).offset().left+lasteditor.width()-editorsoffsetLeft)*100/(parenttr.width()-editorsoffsetLeft);
										if ($.isIE6())
										{
											var _tdwidth = parenttr.width();
											var _originalTdWidth = 0;
											var td = prevtr.eq(0).children("td");
											for (var k = 0; k < td.length; k++)
											{
												if (td.eq(k).attr("class") == "caption")
												{
													_originalTdWidth += parseInt(me.captionColumnWidth);
												}
												else if(td.eq(k).attr("class") == "editor")
												{
													var __colspan = td.eq(k).attr("colspan");
													if (__colspan)
													{
														_originalTdWidth += (250*(parseInt(__colspan)+1)/2 - me.captionColumnWidth);
													}
													else
													{
														_originalTdWidth += (250 - me.captionColumnWidth);
													}
												}
												
											}	
                                            _originalTdWidth+=(me.itemNumOfRow*2-(parseInt(me.fields[i].colspan)*2-1));											
											percent = percent*((_tdwidth>_originalTdWidth?_tdwidth/_originalTdWidth:_originalTdWidth/_tdwidth));
										}
									}
		            			}
		            			else
		            			{
		            				percent = 100;
		            			}
		            		}
		            		
		            		me.editors[me.fields[i].name].setWidth(percent+"%");
		            	}
		            	
		            	if (cols < me.editors[i].colspan) 
		        		{
		        			i--;
		        			cols++;
		        		}
		        		else
		        		{
		        			cols = 1;
		        		}
		            }
		            
		            num++;
		        }
            }
        }
    }
    
    function _enterKeydownSearch(){
    	var editors = me.editors;
        //textEditor和numberEditor及时重新设值
    	for (var i = 0; i < editors.length; i++)
        {
        	if($instanceOf(editors[i], mx.editors.TextEditor) || $instanceOf(editors[i], mx.editors.NumberEditor)){
        		editors[i].setValue(editors[i].$input.val(),true);
        	}
        }
        _search();
    }
    
    /*
     * 查询 
     */
    function _search()
    {
    	var l_params;
    	if (me.isAdvance)
    	{
    		l_params = me.getJsonSearchParam();
    	}
    	else
    	{
    		l_params = me.getSearchParam();
    	}
    	
    	//发现sql注入，并且不允许sql关键字查询
    	if(me.allowSqlKeyQuery == false && me._isSqlInject){
    		return;
    	}
    	
    	var args = { cancel: false, params: l_params };
    	me.trigger("searching", args);
    	if (args.cancel)
    	{
    		return;
    	}
        me.pagedControl && (me.pagedControl.pageIndex = 1);
        me.trigger("searchparamchanged");
    }
    
    function _checkTipLength(tip)
    {
    	var ch_num = 0;
    	for (var i = 0; i < tip.length; i++)
    	{
    		if(mx.utils.CheckUtil.isChinese(tip[i]))
    		ch_num ++;
    	}
    	return ch_num * 12 + (tip.length - ch_num) * 8 + 12;
    }

    var _$buttonContainer = null;
    
    /**
     * 初始化按钮
     */
    function _initButtons()
    {
    	if($isArray(me.buttons))
    	{
    		_$buttonContainer = $("<div style='width:100%'></div>");
    		for(var i=0;i< me.buttons.length;i++)
    		{
    			var _options = {width:me.buttonWidth,css:{"margin-left":"5px","margin-top":"5px"}};
				$.extend(_options,me.buttons[i]);
				var _button = new mx.controls.Button(_options);
				_$buttonContainer.append(_button);
				me.buttons[i] = _button;
				_$buttonContainer.append(_button.$e);
    		}    		
    		
    		// IE6&7下修复空DIV的高度
    		if(me.buttons.length == 0 && $.isIE67()) {
    			_$buttonContainer.css("font-size", 0);
    		}
    		
    		me.$e.append(_$buttonContainer);	
    		_$buttonContainer.resize(function(){
    			me.trigger("fieldadd");
    		});
    	}
    } 
    
    /**
     * 根据 {@link encodeValue}属性设置是否编码输入值。
     * @param p_value
     * @returns
     */
    function _getValue(p_value)
    {
    	if (me.encodeValue == true)
    	{
    		return encodeURIComponent(p_value);
    	}
    	else
    	{
    		return p_value;
    	}
    }
    
    /**
     * 获取按钮容器的高度 
     */
    function _getButtonContainerHeight()
    {
    	if(_$buttonContainer!=null)
    	{
    		return _$buttonContainer.height();
    	}
    	return 0;
    }
    
    function _setEditorEnable(p_editor,p_enabled)
    {
    	if(!$instanceOf(p_editor,mx.editors.Editor))
    	{
    		return;
    	}
    	else
        {
        	p_editor.setEnabled(p_enabled)	
        }    
    }
	me.endOfClass(arguments); 
	return me;
};

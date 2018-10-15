$ns("mx.editors");

$import("mx.containers.Container");
$import("mx.datacontrols.DataTree");
$import("mx.editors.ComboEditor");
$import("mx.datacontainers.TreeEntityContainer");

/**
 * 提供一个允许用户从下拉树中选择数据项的控件的类。支持单选和多选。
 *
 * @example
 * 以下是一个使用本地数据创建 {@link mx.editors.DropDownTreeEditor} 的示例。
 * <code language="JavaScript">
 * var dropDownEditor = new mx.editors.DropDownTreeEditor(
 * {
 *     displayCheckBox: true, // 设置是否多选
 *     nodes: [
 *     {
 *         id: "1",
 *         text: "北京",
 *         itemType: "item",
 *         hasChildren: false
 *     },
 *     {
 *         id: "2",
 *         text: "江苏",
 *         itemType: "folder",
 *         hasChildren: true,
 *         childNodes:[
 *             {
 *                 id: "2-1",
 *                 text: "南京",
 *                 itemType: "item",
 *                 hasChildren: false
 *             }
 *         ]
 *     }
 *     ],
 *
 *     onchanged: _dropDownEditor_changed
 * });
 *
 * function _dropDownEditor_changed()
 * {
 *     alert("value 值发生改变，目前为 " + dropDownEditor.value);
 * }
 * </code>
 *
 * @example
 * 以下是一个使用 URL 创建 {@link mx.editors.DropDownTreeEditor} 的示例。
 * <code language="JavaScript">
 * var dropDownEditor = new mx.editors.DropDownTreeEditor(
 * {
 *     url: "~/rest/bdz"
 * });
 * </code>
 */
mx.editors.DropDownTreeEditor = function()
{
    var me = $extend(mx.editors.ComboEditor);
	var base = {};

	/**
     * 获取一个下拉树对象。
     */
	me.dataTree = null;

	/**
     * 获取一个集合，包含下拉树中所有的节点（{@link mx.datacontrols.DataTreeNode} 类型）。
     * 必须设置{@link url}和{@link nodes}这两个属性中的其中一个
     * 
     * @item mx.datacontrols.DataTreeNode
     */
	me.nodes = [];
	
	/**
     * 请参见 {@link mx.editors.DropDownEditor.valueSeparator}。
     */
    me.valueSeparator = ",";
    
    /**
     * 获取或设置已选择树节点的值类型。
     * 如果设置了{@link url}属性，则必须设置{@link valueType}属性
     */
    me.valueType = null;
    
    /**
     * 获取或设置已选择下拉树值的字典集合。
     */
    me.dicts = null;
	
	/**
     * 获取或设置一个 Boolean 值，该值表示树节点之前是否显示一个选择框。如果该值为 true，则表示显示；反之则不显示。该字段必须在初始化前设置。
     * 返回的数据格式为 { successful: true, resultValue:[{ id:"1", text:"A", hasChildren:true, childNodes:[] }] }。
     * 
     * @default false
     */
    me.displayCheckBox = false;
    
    /**
     * 获取或设置下拉框列表是否自动根据输入的内容做匹配过滤
     */
    me.autoMatchInput = false;
	
    /**
     * 一个字符串，表示 REST 服务的地址。如果该属性不为空，会根据这个地址获取下拉框数据然后绘制下拉框。如果为空，则以 {@link nodes} 集合的数据来绘制下拉框。
     * 必须设置{@link url}和{@link nodes}这两个属性中的其中一个
     */
    me.url = null;
    
    /**
     * 获取下拉树编辑器的值,可以在初始化代码中设置初始值，如果想运行期动态设置控件值，请使用 {@link setValue} 方法。
     * 如果设置了value值，下拉树控件会将value值转换成显示值，具体查找的步骤如下：
     *  1、根据value值查询dataTree树节点，如果查询到直接返回node.text，否则，进入第二步
     *  2、如果设置了{@link url}并且设置了{@link valueType}，则客户端会发出rest请求(服务url：url/value的值/self?itemType=valueType的值)需要后台配合查询获得显示值信息，
     *    返回格式:{resultValue:{nodes:[{id:"",text:""}]},resultHint:"",successful: true}
     *    否则，进入第三步
     *  3、从{@link dicts}数据字典查询,如果还是查询不到，则从{@link nodes}指定的本地节点查询
     */
    me.value = null;
    
    /**
     * 获取或设置一个数字，表示下拉框的下拉高度。
     * 
     * @default 200
     */
    me.dropDownHeight = 200;
    
    /**
     * 获取一个数字，表示下拉框的下拉宽度。
     */
    me.dropDownWidth = null;
    
    /**
     * 获取或设置一个数字，表示下拉框的最小高度。 当dropDownHeight < dropDownMinHeight时，
     * 弹出的下拉框的高度以dropDownMinHeight为准，否则以dropDownHeight为准
     * @default 200
     */
    me.dropDownMinHeight = 200;
    
	/**
     * @ignore
     */
    me.dropDownControl = null;
    
    /**
     * 获取或设置一个 Boolean 值，该值表示是否默认加载树的数据。如果该值为 true，则表示默认加载；反之则不显示。该字段必须在初始化前设置。
     * @default true
     */
    me.autoLoad = true;
    
    /**
     * 提供提交值和显示值之间的转换功能，该方法需要覆写实现。
     * 返回值是需要显示的文本。
     * @param p_value 需要提交的值。
     */
    me.valueFormatter = null;
    
    /**
     * 获取或设置一个 Boolean 值，表示树的节点选中是否选中子节点。
     * 
     * @default true
     */
    me.checkCascade = true;
    
    /**
     * 当双击树节点的时候，将触发该事件。
     * 
     * @param node 一个 {@link mx.datacontrols.DataTreeNode} 对象。
     */
    me.onnodedoubleclick = null;
    
    /**
     * 当点击树节点的时候，将触发该事件。
     * 
     * @param node 一个 {@link mx.datacontrols.DataTreeNode} 对象。
     */
    me.onnodeclick = null;

    var _hasLoaded = false;
    
    //匹配节点的缓存
    var _matchedNodesCache = null;
    
	base.init = me.init;
	me.init = function()
	{
		if(me.url)
			me.setUrl(me.url);
		me.differDisplayValue = true;
		base.init();
	}
	
	
	base.setAllowEditing = me.setAllowEditing;
    me.setAllowEditing = function(p_allowEditing)
    {
    	if(me.autoMatchInput)
    	{
    		base.setAllowEditing(true);
    	}else{
        	base.setAllowEditing(p_allowEditing)
        }
    	
    	me.$input.off("change",me._input_change);
    	
    	if(me.autoMatchInput){
    		me.checkCascade = false;
    		_matchedNodesCache = new mx.types.HashMap();
    		
            me.$dropDownButton.off("click");
            me.$e.off("click");
            me.$input.off("keyup",_$input_keyup);
            
            me.$e.on("click", me._dropDownButton_click);
            me.$input.on("keyup",_$input_keyup);
    	}else{
    		me.$input.on("change",me._input_change);
    	}
    };
    
    me._beforeDropDown = function(){
    	markNodesUnselected();
    	showAllTreeNodes();
    	if($notEmpty(me.value)){
    		var nodes = getCurrentNodes();
    		showNodes(nodes);
    	}
    }
    
    //指示是否需要将value转换为Text显示
    var _transValueToText = true;
    
    function _$input_keyup(e){
    	if(!me.dropDownControl)
        	me._initDropDownControl();
    	var value = me.$input.val();
    	if($notEmpty(value)){
    		if(!me.droppedDown)
    			me._dropDownButton_click();
    		markNodesUnselected();
    		var matchedNodes = getMatchedNodes(value);
    		if(matchedNodes.length > 0){
    			_hideAllTreeNodes();
    			showNodes(matchedNodes);
    		}else{
    			showAllTreeNodes();
    		}
    	}else{
    		markNodesUnselected();
    		showAllTreeNodes();
    		if($notEmpty(me.value)){
    			me.setValue(null,true);
    			restNodeCheckedState();
    		}
    	}
    }
    
    function showNodes(p_nodes){
    	$(p_nodes).each(function(){
			var node = this;
			while(node){
				node.$e.show();
				node = node.parent;
				if(node && !node.expanded)
					node.expand();
			}
			this.$e.scrollIntoView();
			this.markAsSelected(true);
		});
    }
    
    function _hideAllTreeNodes(){
    	me.dataTree.$e.find("li").hide();
    }
    
    function showAllTreeNodes(){
    	me.dataTree.$e.find("li").show();
    }
    
    function markNodesUnselected(){
    	var nodes = getSelectedNodes();
    	$(nodes).each(function(){
			this.markAsSelected(false);
		});
    }
    
    function getMatchedNodes(p_text){
    	if(_matchedNodesCache.hasItem(p_text))
    		return _matchedNodesCache.getItem(p_text);
    	var allNodes = [];
    	var wordAry = trimWords(p_text);
		$(wordAry).each(function(p_index,p_value){
			if(p_value != ""){
				var nodes = getNodesByText(p_value);
				allNodes.addAll(nodes);
			}
		});
		_matchedNodesCache.setItem(p_text,allNodes);
		return allNodes;
    }
    
    function trimWords(p_word){
    	var wordAry = [];
    	if($isEmpty(p_word))
    		return wordAry;
    	if(me.displayCheckBox){
    		wordAry = p_word.split(me.valueSeparator);
    	}else{
    		wordAry.add(p_word);
    	}
    	return wordAry;
    }
    
    function getNodesByText(p_text){
    	var nodes = [];
    	if($isEmpty(p_text))
    		return nodes;
    	var $nodes = me.dataTree.$e.find("li > a > span:contains("+ p_text +")").closest("li");
		$.each($nodes,function(){
			nodes.add(me.dataTree.getNode(this));
		});
		return nodes;
    }
    
    function getSelected$Nodes(){
    	return me.dataTree.$e.find("li.selected");
    }
    
    function getSelectedNodes(){
    	var $nodes = getSelected$Nodes();
    	var nodes = [];
    	$.each($nodes,function(){
			nodes.add(me.dataTree.getNode(this));
		});
		return nodes;
    }
    
    function getCurrentNodes(){
    	if(me.displayCheckBox){
    		return me.dataTree.getCheckedNodes();
    	}else{
    		var node = me.dataTree.getNode(me.value);
    		return node ? [node] : [];
    	}
    }
    
    function restNodeCheckedState(){
    	markNodesUnselected();
    	if(me.displayCheckBox){
    		var nodes = me.dataTree.getCheckedNodes();
    		$(nodes).each(function(){
    			this.setChecked(false,me.checkCascade);
    		});
    	}
    }
    
	var _restClient = new mx.rpc.RESTClient();
	
	/**
	 * 设置url地址
	 * @param p_url 一个url地址 
	 */
	me.setUrl = function(p_url)
	{
		if ($isEmpty(p_url))
		{
			return;
		}
		me.url = p_url;
		_hasLoaded = false;
		if (me.dataTree && me.dataTree.entityContainer)
		{
			me.dataTree.entityContainer.setBaseUrl(p_url);
		}
		if ($notEmpty(_restClient))
		{
			_restClient.setBaseUrl(p_url);
		}
	}
	
	/**
     * @ignore
     */
	me._initDropDownControl = function()
    {
        if (me.dropDownControl == null)
        {
            var options = {};

            if ($isBoolean(me.displayCheckBox))
            {
                options.displayCheckBox = me.displayCheckBox;
            }
            options.autoSelect = false;
            options.checkCascade = me.autoMatchInput ? false : me.checkCascade;
            
            me.dropDownContainer = new mx.containers.Container();
            me.dropDownContainer.$e.attr("id", "dropDownTreeEditor");
            me.dropDownContainer.$e.addClass("mx");
            
            options.baseUrl = me.url;
            options.showDefaultContextMenu = false;
            
            options.onnodedoubleclick = me.onnodedoubleclick;
            options.onnodeclick = me.onnodeclick;
            
            me.dataTree = new mx.datacontrols.DataTree(options);
            
            me.setUrl(me.url);
            
            if (me.nodes.length > 0)
            {
                me.dataTree.entityContainer.type = "local";
                me.dataTree.entityContainer.data = me.nodes;
            }
            
            if (me.dicts > 0)
            {
            	me.dataTree.entityContainer.dicts = me.dicts;
            }
            
            me.dataTree.$e.resizable(true);
            if (me.displayCheckBox)
            {
                me.dataTree.$e.on("click", "#checkBox", _node_checkchanged);
            }
            else
            {
                me.dataTree.on("selectionchanged", _selectionchanged);
            }   
            
            if (me.autoLoad)
	        {
	        	_syscLoadTree();
	        }
            
            me.dropDownContainer.addControl(me.dataTree);
        }
        me.on("deleted",_clearselectvalue);
        me.dropDownControl = me.dropDownContainer;
        me.dropDownControl.$e.addClass("dropDown");
        me.dropDownControl.$e.hide();
    };
        
    base._resetDropDownControl = me._resetDropDownControl;
    /**
     * @ignore
     */
    me._resetDropDownControl = function()
    {
        base._resetDropDownControl();
        
        if (!_hasLoaded)
        {
        	_syscLoadTree();
        }
        
        /// 定位已选择的树节点。
        if ($notEmpty(me.value))
        {
	        var values = me.value.split(me.valueSeparator);
	        var node;
	        try {
		        for (var i = 0, l = values.length; i < l; i++) {
		        	node = me.dataTree.getNode(values[i]);
		        	if ($notEmpty(node))
		        	{
						if (me.displayCheckBox)
			        	{
			        		node.setChecked(true, me.checkCascade);	
			        	}
			        	else
			        	{
			        		node.select();
			        	}	   
						
						while (node.parent && !node.parent.expanded)
						{
							node.parent.expand();
							if ($notEmpty(node.parent))
							{
								node = node.parent;
							}
						}
		        	}
		        }
	        }
	        catch(e)
	        {
	        	mx.showerror(mx.msg("ERR_LOADING") + e.message);
	        }
        }
        
        var _width = $isNumber(me.dropDownWidth) ? me.dropDownWidth : me.$e.width();
        var _height = me.dropDownHeight < me.dropDownMinHeight ? me.dropDownMinHeight : me.dropDownHeight;
        me.dropDownContainer.resizeTo(_width, _height);
        
        //IE6与IE7, 设置的宽度不包含border、padding、margin的大小，需要额外处理
    	if($.isIE67()) {
    		me.dataTree.resizeTo(_width - 4, _height - 4);
    	} else {
    		me.dataTree.resizeTo("100%", "100%");
    	}
    };
    
    base.reset = me.reset;
    
    /**
     * 重置编辑器。
     * @overload  function(p_triggerEvent)
     * @param [p_triggerEvent=false] 指定是否要触发 {@link onchanged} 事件。
     */
    me.reset = function(p_triggerEvent)
    {
    	base.reset(p_triggerEvent);
        if(me.dataTree!=null && me.dataTree.clearChecked != undefined)
        {
            me.dataTree.clearChecked();
        }         
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
	
    base.setValue = me.setValue;
    /**
     * @ignore
     */
    me.setValue = function(p_value, p_triggerEvent, p_userOper)
    {
    	base.setValue(p_value, p_triggerEvent);

        if ($isEmpty(p_userOper) || !p_userOper)
        {
            if (me.displayCheckBox)
            {
                _checkNodesByValues(p_value);
            }
            else
            {
                var node = me.dataTree ? me.dataTree.getNode(p_value) : null;
                if (node != null)
                {
                    me.dataTree.selectNode(node);
                }
            }
        }
    };
    
    /**
     * 根据特定需求来设置下拉树的值。
     * 
     * @example
     * 下列代码重写了默认的 renderValue 逻辑，当下拉树可以多选时，筛选选中的节点的值。
     * <code>
     * var dropDownTree = new mx.editors.DropDownTreeEditor(
     * {
     *      renderValue: function(p_tree)
     *      {
     *          if (p_tree.displayCheckBox)
     *          {
     *              var nodes = p_tree.findNodes("li[itemType='item'].checked");
     *              var ids = [];
     *              for (var i = 0; i < nodes.length; i++)
     *              {
     *                  ids.add(nodes[i].id);
     *              }
     *          }
     *          return ids;
     *      }
     * });
     * </code>
     */
    me.renderValue = function(p_tree)
    {
        var result = null;
        if (me.displayCheckBox)
        {
            result = _getCheckedIDs();
        }
        else
        {
            result = p_tree.selection.id;
        }
        return result;
    };
    
    /**
     * 向字典（{@link dicts} 集合）添加字典项。
     *
     * @param p_dicts 一个数组，表示树节点文本、值的字典项集合。
     */
    me.appendDicts = function(p_dicts)
    {
    	if ($.isArray(p_dicts))
    	{
    		me.dicts = p_dicts;
    	}
    }
    
     /**
     * 向字典（{@link dicts} 集合）添加字典项。
     *
     * @param p_text 一个字符串，表示树节点对象的显示值。
     * @param p_value 一个字符串，表示树节点对象的实际值。
     */
    me.appendDict = function(p_text, p_value)
    {
    	if ($isEmpty(me.dicts))
    	{
    		me.dicts = [];
    	}
    	if ($.isPlainObject(p_text))
    	{
    		me.dicts.add(dict);	
    	}
    	else if ($isString(p_text) && $isString(p_value) && $notEmpty(p_text) && $notEmpty(p_value))
    	{
    		me.dicts.add({"value" : p_value, "text" : p_text});
    	}
    }
    
    /**
     * @ignore
     */
    me._formatValue = function(p_value)
    {
    	if(!_transValueToText){
        	return me.$input.val();
        }
    	
    	if (p_value == null) return "";

        if ($isFunction(me.valueFormatter))
        {
        	return me.valueFormatter(p_value);
        }
        
        var result = "";
        if (me.dropDownControl != null && me.displayCheckBox)
        {
            var values = null;
            if ($isArray(p_value))
            {
                values =  p_value;
            }
            else if ($isString(p_value))
            {
                values = p_value.split(me.valueSeparator);
            }
            result = _getTextByValues(values);
        }
        else
        {
            result = _getTextByValue(p_value);
        }
        return result;
    };

    function _getTextByValue(p_value)
    {
    	var node = me.dataTree ? me.dataTree.getNode(p_value) : null;
    	
        if (node == null)
        {
        	if ($notEmpty(me.url) && $notEmpty(me.valueType))
	    	{
                // 同步加载下拉树。
                var results = null;
                try
                {
                    results =  _restClient.getSync("/" + p_value + "/self",{ itemType: me.valueType });
                    if ($notEmpty(results) && results.successful)
                    {
                        results = results.resultValue;
                        var treeNode;
                        if ($isEmpty(results.nodes))
                        {
                            treeNode = results;
                        }
                        else if (results.nodes.length > 0)
                        {
                            treeNode = results.nodes[0];
                        }
                        
                        if ($notEmpty(treeNode) && $notEmpty(treeNode.text))
                        {
                            results = treeNode.text;
                        }
                        else
                        {
                            results = "";
                        }
                    }
                    else
                    {
                        mx.indicate("error", results.resultHint);
                    }
                }
                catch(e){}
                
                return results;
	    	}else {
	    		if (me.dicts != null){
		    		var dict;
		    		for (var i = 0; i < me.dicts.length; i++)
			        {
			        	dict = me.dicts[i];
			            if ($.isPlainObject(dict) && p_value == dict.value)
			            {
			                return dict.text;
			            }
			        }
	    		}
		    		
	    		//查询本地数据
	    		if(me.nodes){
	    			var node = _getNodeById(me.nodes,p_value);
		    		if(node)
		    			return node.text;
	    		}
		    		
			    return p_value;
	    	}
        }
        else
        {
        	return node.text;
        }
    }
    
    function _getNodeById(p_nodes,p_id){
    	if($.isArray(p_nodes)){
    		for(var i=0;i<p_nodes.length;i++){
    			var node = p_nodes[i];
    			if(node.id == p_id){
    				return node;
    			}else if(node.childNodes){
    				var tnode = _getNodeById(node.childNodes,p_id);
    				if(tnode)
    					return tnode;
    			}
    		}
    	}
    	return null;
    }
    
    function _getTextByValues(p_values)
    {
        var result = [], text;
        for(var i = 0; i < p_values.length; i++)
        {
            text = _getTextByValue(p_values[i]);
            if ($notEmpty(text))
            {
                result.add(text);
            }
        }
        return result.join(me.valueSeparator);
    }
    
    function _getCheckedIDs()
    {
        var ids = [];
        if (me.displayCheckBox)
        {
            ids = me.dataTree.getCheckedNodeIDs();
        }
        
        return ids;
    }
    
    function _checkNodesByValues(p_values)
    {
        if(me.dataTree){
        	var values = [];
            if ($isArray(p_values))
            {
                values =  p_values;
            }
            else if ($isString(p_values))
            {
                values = p_values.split(me.valueSeparator);
            }
            
            for (var i = 0; i < values.length; i++)
            {
                var node = me.dataTree.getNode(values[i]);
                if (node != null)
                {
                    node.setChecked(true, me.checkCascade);
                }
            }
        }
    }
    
    function _node_checkchanged(e)
    {
        if (me.displayCheckBox)
        {
            var ids = me.renderValue(me.dataTree);
            me.setValue(ids.join(me.valueSeparator), true, true);            
        }
    }
    
    function _selectionchanged(e)
    {
        if (!me.displayCheckBox)
        {
            var id = me.renderValue(me.dataTree);
            me.setValue(id, true, true);
        }
    }
    
    function _clearselectvalue(){
    	if (!me.displayCheckBox && $notEmpty(me.dataTree.selection))
    	{
    		me.dataTree.selection.markAsSelected(false);
    		me.dataTree.selection = null;
    	}
    	else
    	{
    		var _checkedNodes = me.dataTree.getCheckedNodes();
    		for(var i=0;i<_checkedNodes.length;i++){
    			var node = _checkedNodes[i];
    			node.setChecked(false, true);
    		}
    	}
    }
    
    function _syscLoadTree()
    {
        try
        {
            me.dataTree.load(function(p_context){
                _hasLoaded = true;
            }); 
        }
        catch(e)
        {
            throw new Error(e);
        }
    }
    
	me.endOfClass(arguments);
	return me;
};
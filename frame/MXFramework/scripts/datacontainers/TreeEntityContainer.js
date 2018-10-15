$ns("mx.datacontainers");

$import("mx.datacontainers.EntityContainer");
$import("mx.utils.GUIDUtil");

/**
 * 提供一个供 {@link mx.datacontrols.DataTree} 使用的数据容器的类。
 * 
 * @example 以下是一个树形数据容器如何初始化并通过远程服务加载数据的代码示例。 
 * <code language="JavaScript">
 * var container = new mx.datacontainers.TreeEntityContainer(
 * {
 *     "baseUrl" : "~/rest/getNode"
 * });
 * container.on("load", function()
 * {
 *     alert("onload");//触发 onload 事件。
 * });
 * container.load(node);//为指定的节点加载子节点；如果不传参数，则加载根节点。
 * </code>
 * 
 * @example 以下是一个树形数据容器加载本地数据的代码示例。 
 * <code language="JavaScript">
 * var container = new mx.datacontainers.TreeEntityContainer(
 * {
 *     "type" : "local",//声明容器类型为本地数据。
 *     "data" : //本地数据信息。
 *     [
 *     {
 *         "id" : "local_1",
 *         "text" : "local_1_text",
 *         "hasChildren" : true,
 *         "nodes" : //子节点。
 *         [
 *         {
 *             "id" : "local_1_1",
 *             "text" : "local_1_1_text",
 *             "hasChildren" : false
 *         },
 *         {
 *             "id" : "local_1_2",
 *             "text" : "local_1_2_text",
 *             "hasChildren" : false
 *         } ]
 *     },
 *     {
 *         "id" : "local_2",
 *         "text" : "local_2_text",
 *         "hasChildren" : false
 *     },
 *     {
 *         "id" : "local_3",
 *         "text" : "local_3_text",
 *         "hasChildren" : false
 *     } ]
 * });
 * container.on("load", function()
 * {
 *    alert("onload");//触发 onload 事件。
 * });
 * container.load();
 * </code>
 */
mx.datacontainers.TreeEntityContainer = function()
{
    var me = $extend(mx.datacontainers.EntityContainer);
    var base = {};

    /**
     * 以下参数说明仅包含当前子类的扩展参数，基础参数和其他信息请参照
     * {@link mx.datacontainers.EntityContainer.onload} 事件。
     * 
     * @param parentNode
     *            一个 {@link mx.datacontrols.DataTreeNode} 对象，表示此次加载子节点的节点。
     * @param nodes
     *            一个数组，包含本次加载结果中的节点信息。
     */
    me.onload = null;

    /**
     * 当数据容器中有数据对象被删除时，将触发该事件。
     * 
     * @param cancel
     *            一个 Boolean 值，表示是否中止事件。
     * @param node
     *            一个 {@link mx.datacontrols.DataTreeNode} 对象，表示要删除的节点。
     */
    me.ondeleting = null;

    /**
     * 当数据容器中有数据对象被删除后，将触发该事件。
     * 
     * @param node
     *            一个 {@link mx.datacontrols.DataTreeNode} 对象，表示要删除的节点。
     */
    me.ondeleted = null;
	
    /**
     * 当数据容器中新增数据对象时，将触发该事件。
     * 
     * @param cancel
     *            一个 Boolean 值，表示是否中止事件。
     * @param entity
     *            一个 JSON 对象，表示新增的数据对象。
     */
    me.oncreating = null;
    
    /**
     * 当数据容器中新增数据对象后，将触发该事件。
     * 
     * @param entity
     *            一个 JSON 对象，表示新增的数据对象。
     */
    me.oncreated = null;
    
    me.primaryKey = "id";
    
    me.loadMeta = false;
    
    me.canCreate = true;
	
    
    me._removeCallBack = null;
    
    
    var _loadingNode = null;

    var _deletingNode = null;
    
    
    base.init = me.init;
    me.init = function()
    {
    	base.init();
    	if ($isEqual(me.type, "remote"))
    	{
    		me.data = [];
    	}
    	else
    	{
    		var data = me.data || [];
    		me.data = [];
    		_populateNodes(data);
    	}
    }
    
    /**
     * 提供一个方法，为数据容器加载数据对象。
     * 
     * @overload function()
     * @overload function(p_node)
     * @overload function(p_node, p_callBack)
     * 
     * @param [p_node]
     *            一个 {@link mx.datacontrols.DataTreeNode} 对象，表示要加载子节点的节点。
     * @param [p_callBack]
     *            一个方法，表示加载完成后的回调函数。
     */
    base.load = me.load;
    me.load = function(p_node, p_callBack)
    {
        _loadingNode = null;
        if (typeof (p_callBack) != "undefined")
        {
            if ($isArray(p_node) || $.isPlainObject(p_node))
            {
                base.load(p_node, p_callBack);
            }
            else if ($instanceOf(p_node, mx.datacontrols.DataTreeNode))
            {
                // 为某个节点加载子节点
            	_loadingNode = p_node;
                var params = p_node.queryParams != null ? p_node.queryParams : {};
                params.itemType = p_node.itemType;
                base.load(p_node.id, params, p_callBack);
            }
        }
        else if (typeof (p_node) != "undefined")
        {
            if ($instanceOf(p_node, mx.datacontrols.DataTreeNode))
            {
                _loadingNode = p_node;
                var params = p_node.queryParams != null ? p_node.queryParams : {};
                params.itemType = p_node.itemType;
                base.load(p_node.id, params);
            }else{
            	base.load(p_node);
            }
        }
        else
        {
            base.load();
        }
    };

    /**
     * 提供一个方法，根据主键获取对应的数据对象。
     * 
     * @param p_nodeID
     *            一个字符串或者数字，表示要查找的数据对象的主键值。
     */
    me.getNodeEntity = function(p_nodeID, p_itemType)
    {
    	if ($notEmpty(p_nodeID) && ($isString(p_nodeID) || $isNumber(p_nodeID)))
     	{
    		var node = null;
            $.each(me.data, function(i, p_node){
               if (p_node.id  === p_nodeID && p_node.itemType  === p_itemType)
               {
                   node = p_node;
               } 
            });
            
            if (node != null)
            {
            	return node;
            }

     		return me.data["#" + p_nodeID];
     	}
    };
	
    /**
     * 
     */
    me.create = function(p_node, p_options)
    {
    	var args = {};
    	if (!me.canCreate)
    	{
    		me._notAllowedTip();
    		return;
		}
		if ($.isPlainObject(p_options))
        {
        	args.parentNode = me.getNodeEntity(p_options.parentId, p_options.itemType);
        	args.nextSibling = me.getNodeEntity(p_options.nextId, p_options.itemType);
        	args.prevSibling = me.getNodeEntity(p_options.prevId, p_options.itemType);
        	args.order = $isEmpty(p_options.order) ? true : p_options.order; 
        }
		args.node = p_node || {};
	
        var event_args = $.extend(true, {cancel: false}, args)

        me.trigger("creating", event_args);
        if (event_args.cancel)
        {
            return;
        }
        
      	var node = _create(args.node, args);
      	args.node = node;
        event_args = $.extend(true, {}, args);
        me.trigger("created", event_args);
     	return $isEmpty(node)? node: $.extend(true, {}, node);   
    }
    
    
    function _create(p_node, p_args)
    {
    	var node = p_node, 
    	    nextSibling = p_args.nextSibling,
    	    prevSibling = p_args.prevSibling,
    	    parentNode = p_args.parentNode, 
    	    order = p_args.order,
    	    pk = node[me.primaryKey],
 			data = [];
		
 		if ($isEmpty(parentNode))
 		{
 			if ($notEmpty(nextSibling))
 			{
 				parentNode = me.data["#" + nextSibling.parentId];
 			}
 			else if ($notEmpty(prevSibling))
 			{
 				parentNode = me.data["#" + prevSibling.parentId];
 			}
 		}
 		
 		if ($notEmpty(parentNode) && !parentNode.hasChildren)
 		{
 			return;
 		}
 	
    	if ($isEmpty(pk))
    	{
    		pk = mx.utils.GUIDUtil.newGUID();
    		node[me.primaryKey] = pk;
    	}
    	
    	node.parentId = $isEmpty(parentNode) ? null: parentNode[me.primaryKey];
		
    	if ($notEmpty(me.data["#" + pk]))
    	{
    		mx.indicate("warn", mx.err("DUPLICATED_ITEM", [ pk ]));
    		return;
    	}
    	
    	if ($isEmpty(parentNode))
    	{
    		data = me.data || [];
    		me.data = data;
    	}
    	else
    	{
    		data = parentNode.childNodes || [];
    		parentNode.childNodes = data;
    	}
    	
    	if (!data.contains(node))
    	{
    		if ($notEmpty(data["#" + pk]))
        	{
        		mx.indicate("warn", mx.err("DUPLICATED_ITEM", [ pk ]));
        		return;
        	}
    		if ($notEmpty(nextSibling))
    		{
    			data.insertBefore(node, nextSibling);
    		}
    		else if ($notEmpty(prevSibling))
    		{
    			data.insertAfter(node, prevSibling);
    		}
    		else 
    		{
    			order ? data.add(node): data.insert(0, node);
    		}
    	}
    	else
    	{
    		mx.indicate("warn", mx.err("DUPLICATED_ITEM", [ pk ]));
    		return;
    	}
    	
    	if ($isEmpty(data["#" + pk]))
    	{
    		data["#" + pk] = node;
    	}
    	
    	if ($isEmpty(me.data["#" + pk]))
    	{
    		me.data.add(node);
    		me.data["#" + pk] = node;
    	}
    		
		if ($isArray(node.childNodes))
		{
			$.each(node.childNodes, function(index, child){
				_create(child, { parentNode: node});
			});
		}

    	return node;
    }
    
    /**
     * 提供一个方法，删除一个树节点。
     * 
     * @overload function(p_node)
     * @overload function(p_node, p_delete)
     * 
     * @param p_node
     *            一个 {@link mx.datacontrols.DataTreeNode} 对象，表示要删除的节点。
     * @param [p_callback] 一个方法，表示删除之后的回调函数。
     * @param [p_path] 一个字符串，表示自定义删除服务的路径。
     */
    me.remove = function(p_node, p_callback, p_path)
    {
        if (me._submitting)
        {
            return;
        }
        me._submitting = true;
        
        me._removeCallBack = p_callback
        var args =
        {
            cancel : false,
            node : p_node
        };

        me.trigger("deleting", args);
        if (args.cancel)
        {
            return;
        }

        _deletingNode = p_node;

        var IDs = [];
        IDs.add(p_node.id);

   		if ($isEqual(me.type, "remote")) 
   		{
   			//var delUrl = ("remove" in me.actions) ? me.actions["remove"] : "delete";
        	//delUrl = p_path || delUrl;
        	var delUrl = me._makePath("remove","delete",p_path);
        	var _post = me._getClientPostMode("remove");
        	_post(delUrl, JSON.stringify({"ids": IDs}), _delete_callback);
   		}
        else
        {
        	me._submitting = false;
        	_delete_success();
        }
        
    };

    /**
     * @ignore
     */
    base._prepareLocalData = me._prepareLocalData;
    me._prepareLocalData = function(p_data)
    {
    	me.data = p_data;
        var localResult = {}, resultValue = {nodes: p_data};
       	localResult.resultValue = resultValue;
        return localResult;
    };

    /**
     * @ignore
     */
    me._parseData = function(p_result)
    {
    	var nodes = p_result.nodes,parentNode = _loadingNode;
    	if ($isEmpty(me.data))
    	{
    		me.data = [];
    	}
        if ($isArray(nodes))
        { 
        	if (me.type === "local")
        	{
        		if ($notEmpty(_loadingNode))
        		{
        			p_result.nodes = _filterNodes();
        			
        			if (p_result.nodes == 0 && nodes["#" + _loadingNode.id])
        			{
            			p_result.nodes = nodes["#" + _loadingNode.id].childNodes;
        			}
        		}
        	}
        	else if (me.type == "remote")
        	{
        		_populateNodes(nodes, parentNode);
        	}
        }
    };
    
    
    function _filterNodes()
    {
    	if ($notEmpty(_loadingNode) && $isArray(_loadingNode.childNodes))
    	{
    		return _loadingNode.childNodes;
    	}
    	return [];
    }
    
    function _clearChildren(p_node)
    {
    	var children = $isEmpty(p_node) ? me.data: p_node.childNodes
    	if ($isArray(children))
    	{
    		while (children.length > 0)
    		{
    			_remove(children[0], p_node);
    		}
    	}
    }
    
    function _populateNodes(p_nodes, p_parentNode)
    {
		var data, pk;
		
		if (! $isArray(p_nodes))
			return;
		
		if ($isEmpty(p_parentNode))
		{
			me.data = me.data ||　[];
			data = me.data;
		}
		else
		{
			p_parentNode.childNodes = p_parentNode.childNodes || [];
			data = p_parentNode.childNodes;
		}
		
		_clearChildren(p_parentNode);
		
	    $.each(p_nodes, function(index, node){	
	    	pk = node[me.primaryKey];
			node.parentId = $isEmpty(p_parentNode) ? null: p_parentNode[me.primaryKey];
			
			if (!data.contains(node))
			{
				data.add(node);
			}
			data["#" + pk] = node;
			me.data["#" + pk] = node;
		
			if ($isArray(node.childNodes))
			{
				var childNodes = node.childNodes;
				node.childNodes = [];
				_populateNodes(childNodes, node)
			}
    	});
    }

    /**
     * @ignore
     */
    base._setLoadArgs = me._setLoadArgs;
    me._setLoadArgs = function(p_result)
    {
        var args = new Object();
        if ($notEmpty(_loadingNode))
        {
            args.parentNode = _loadingNode;
        }
        args.nodes = p_result.nodes;
        return args;
    };

    /**
     * @ignore
     */
    base._setLoadingArgs = me._setLoadingArgs;
    me._setLoadingArgs = function()
    {
        var newArgs = {};
        newArgs.childItemTyps = "";
        newArgs.itemType = "";
        newArgs.filter = "";
        return newArgs;
    };

    function _delete_callback(p_context)
    {
        me._submitting = false;
        if (p_context.successful)
        {
            _delete_success(p_context);
        }
        else
        {
            _delete_error(p_context);
        }
    }
	
    
    function _remove(p_node, p_parentNode)
    {
    	var parent = p_parentNode; 
    	if ($isArray(p_node.childNodes) && p_node.childNodes.length > 0)
    	{
    		var childNodes = p_node.childNodes;
    		while (childNodes.length > 0)
    		{
    			_remove(childNodes[0], p_node);	
    		}
    	}

    	if ($isEmpty(parent))
		{
			me.data.remove(p_node);
		}
		else if ($isArray(parent.childNodes))
		{
			parent.childNodes.remove(p_node);
		}
		delete me.data["#" + p_node[me.primaryKey]];
    }
    
    function _delete_success(p_result)
    {
        var removeNode = me.getNodeEntity(_deletingNode.id, _deletingNode.itemType);
        
       _remove(removeNode, _deletingNode.parent);
		
        var args =
        {
            node : _deletingNode
        };
        me.trigger("deleted", args);
        
        if ($notEmpty(me._removeCallBack))
        {
            me._removeCallBack(args);
        }
    }

    function _delete_error(p_context)
    {
        me._showError("DELETING", p_context);
    }

    me.endOfClass(arguments);
    return me;
};
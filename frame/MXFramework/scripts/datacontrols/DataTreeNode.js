$ns("mx.datacontrols");

/**
 * 提供一个 {@link mx.datacontrols.DataTree} 控件中节点的类。
 */
mx.datacontrols.DataTreeNode = function()
{
    var me = $extend(MXComponent);
    var base = {};
    
    /**
     * 获取一个字符串，表示节点的唯一标识。请使用 {@link setID} 方法设置该字段的值。
     */
    me.id = null;
    
    /**
     * 获取该对象的父容器的对象，通常是一个 {@link mx.datacontrols.DataTree} 类的实例。
     */
    me.owner = null;
    
    /**
     * 获取该对象的父节点对象，通常是一个 {@link mx.datacontrols.DataTreeNode} 类的实例。
     */
    me.parent = null;
    
    /**
     * 获取一个字符串，表示说明节点的类型（如“folder”，“role”，“job”等）。请使用 {@link setItemType} 方法设置该字段的值。
     * 
     * @default item
     */
    me.itemType = "item";
    
    /**
     * 获取节点显示的文本。请使用 {@link setText} 方法设置该字段的值。
     */
    me.text = null;
    
    /**
     * 获取一个字符串，表示 {@link mx.datacontrols.DataTreeNode} 图像的 URL（如“$/icons/role.png”）。请使用 {@link setImageUrl} 方法设置该字段的值。
     */
    me.imageUrl = null;
    
    /**
     * 获取一个字符串，表示 {@link mx.datacontrols.DataTreeNode} 图像的名称。请使用 {@link setImageKey} 方法设置该字段的值。
     */
    me.imageKey = null;
    
    /**
     * 获取一个 Boolean 值，表示该节点的子节点是否展开。如果该值为 true，表示子节点展开；反之则隐藏。
     * 
     * @default false
     */
    me.expanded = false;
    
     /**
     * 获取一个字符串值，表示该节点的显示方式。
     * 
     * <p>
     * 该字段的可选值包括:
     * <ul>
     *     <li><b>entityNode</b> - 实体节点。表示节点是一个实体对象节点。</li>
     *     <li><b>propGroup</b> - 属性分组节点。表示节点是属性分组。</li>
     *     <li><b>virtualNode</b> - 虚拟节点。表示节点是一个静态节点。</li>
     *     <li><b>enumNode</b> - 枚举节点。节点的值来源于枚举项</li>
     * </ul>
     * </p>
     * 
     * @default null
     */
    me.displayMode = null;
    
    /**
     * 获取一个 Boolean 值，表示该节点是否有子节点。如果该值为 true，则表示有子节点；反之则没有。
     * 
     * @default false
     */
    me.hasChildren = false;
    
    /**
     * 获取同步树中当前节点的子节点集合。
     * 
     * @default null
     */
    me.childNodes = null;
    
    /**
     * 一个 JSON 对象，通常在加载子节点时需要一些请求参数时，可以使用字段。
     * 使用时可以订购 {@link mx.datacontrols.DataTree.onexpanding} 事件，在树节点展开之前为该字段赋值。
     * 该请求参数会与默认的请求参数合并后一起传到服务端。
     */
    me.queryParams = null;
    
    /**
     * 获取或设置一个 Boolean 值，表示树的节点是否懒加载。
     * 
     * @default true
     */
    me.isLasyLoad = true;
    
    /**
     * @ignore
     */
    me.eTag = "<li/>";
    
    /**
     * @ignore
     */
    me.$e = null;
    
    var _$text = null;
    
    var _$img = null;
    
    base.init = me.init;
    me.init = function()
    {
        base.init();
        
        if (me.$e == null)
        {
            me.$e = $(me.eTag);
        }
        
        var a = null;
        if ($.isIE6())
        {
        	a = "<a href='javascript:void(0)' style='text-decoration:none;'><span id='expandor'/><img/><span id='text'/></a>";
        }else
        {
        	a = "<a><span id='expandor'/><img/><span id='text'/></a>";
        }
        
        me.$e.html(a);
        
        _$text = me.$e.find("span#text");
        _$img = me.$e.find("img");
        
        if (!me.hasChildren)
        {
        	me.$e.addClass("item"); 
            me.$e.find("> a").addClass("item");            
        } else {
        	me.$e.addClass("folder"); 
        	me.$e.find("> a").addClass("folder");   
        }
     
        
        me.$e.data("node", me);
        
        if (me.id != null)
        {
            me.setID(me.id);
        }
        if (me.itemType != null)
        {
            me.setItemType(me.itemType);
        }
        if ($notEmpty(me.text))
        {
            me.setText(me.text);
        }
        if ($notEmpty(me.imageUrl))
        {
            me.setImageUrl(me.imageUrl);
        }
        if ($notEmpty(me.imageKey))
        {
            me.setImageKey(me.imageKey);
        }
        if ($notEmpty(me.childNodes))
        {
        	childNodes = me.childNodes;
        	me.childNodes = [];
            me.childNodes=_appendNodes(childNodes);
        }
        else
        {
        	me.childNodes = [];
        }
        if (me.expanded)
        {
        	me.hasLoaded() ? me._expand(): me.expand();
        }
        
        
        if ($isEmpty(me.imageUrl) && $isEmpty(me.imageKey))
        {
        	// IE6下图片使用gif
			if($.isIE6()) {
				_$img.attr("src", me.hasChildren ? mx.mappath("$/icons/gif/folder.gif") : mx.mappath("$/icons/gif/item.gif"));
			} else {
				_$img.attr("src", me.hasChildren ? mx.mappath("$/icons/folder.png") : mx.mappath("$/icons/item.png"));
			}
        }
    };
	
	base.dispose = me.dispose;
    /**
	* 释放对象运行时动态生成的内容（属性、方法、事件）。
	*/
    me.dispose = function(){
		$(document).off("keydown");
		_$ul=null;
		_$img.removeAttr("src");
		_$img.empty().remove();
		_$img=null;
		me.$e.removeAttr("itemType");
		me.$e.removeData("node");
		if(me.childNodes){
			for(var i=0;i<me.childNodes.length;i++){
				var node=me.childNodes[i];
				if(node.dispose){
					node.dispose();
				}
				node=null;
			}
			me.childNodes.clear();
			delete me.childNodes;
		}
				
		base.dispose();
		base=null;
	}

    
    /**
     * 设置 {@link id} 字段的值。
     */
    me.setID = function(p_id)
    {
        me.id = p_id;
        me.$e.attr("id", me.id);
    };
    
    /**
     * 设置 {@link text} 字段的值。
     */
    me.setText = function(p_text)
    {
        me.text = p_text;
        if (_$text != null)
        {
            _$text.text(me.text);
        }
    };
    
    /**
     * 设置树节点的选中状态。
     */
    me.setChecked = function(p_checked, p_checkCascade)
    {
        if (me.owner != null && me.owner.displayCheckBox)
        {   
            me.$e.toggleClass("checked", p_checked);
            me.$e.find("> a").toggleClass("checked", p_checked);
            if (p_checkCascade)
            {
	            var $lis = me.$e.find("li");
	            $lis.toggleClass("checked", p_checked);
	            me.$e.removeClass("checkedPart");
	            $lis.removeClass("checkedPart");
	            
	            var $as = me.$e.find("a"); 
	            $as.toggleClass("checked", p_checked);
	            me.$e.find("> a").removeClass("checkedPart");
	            $as.removeClass("checkedPart");
	            
	            var parentNode = me.parent;
	            while (parentNode != null)
	            {
	                var checkedStatus = parentNode.childNodesCheckedStatus();
	                parentNode.$e.toggleClass("checked", checkedStatus == "checked");
	                parentNode.$e.toggleClass("checkedPart", checkedStatus == "checkedPart");
	                parentNode.$e.find("> a").toggleClass("checked", checkedStatus == "checked");
	                parentNode.$e.find("> a").toggleClass("checkedPart", checkedStatus == "checkedPart");
	                parentNode = parentNode.parent;
	            }
            }
        }
    };
    
    /**
     * 切换选中状态。
     */
    me.toggleChecked = function(p_checkCascade)
    {                        
        var checked = me.isChecked();
        me.setChecked(!checked, p_checkCascade);
    };
    
    /**
     * 返回一个 Boolean 值，表示该节点是否选中。
     */
    me.isChecked = function()
    {
        return me.$e.hasClass("checked");
    };
    
    /**
     * 返回一个字符串值，表示该节点所有子节点的选中状态。包括三种“checked”、“unchecked”、“checkedPart”，分别表示全选、全部未选中、选中部分节点。
     */
    me.childNodesCheckedStatus = function()
    {
        var $lis = me.$e.find("li");
        var checked = $lis.hasClass("checked"); 
        if (!checked)
        {
            return "unchecked";
        }
        else
        {      
            var result = "checked";
            $lis.each(function(i){
                if (!$lis.eq(i).hasClass("checked"))
                {
                    result = "checkedPart";
                    return;
                }
            });
            
            return result;
        }
    };
    
    /**
     * 设置 {@link imageUrl} 字段的值。 
     * 
     * @param [p_imageUrl=$/images/space.png] 一个字符串，表示图像的 URL。
     */
    me.setImageUrl = function(p_imageUrl)
    {
        if (p_imageUrl == null)
        {
            p_imageUrl = "$/images/space.png";
        }
        me.imageUrl = p_imageUrl;
        me.$e.find("> a > img").attr("src", mx.mappath(me.imageUrl));
    };

    /**
     * 设置 {@link imageKey} 字段的值。该方法会在 $/icons 目录中查找相应的 png 图片。
     * 
     * @param [p_imageKey] 一个字符串，表示图片的名称。如 $/icons 目录中有一张图片为“role_48.png”或“role.png”的图片，那么该参数都是“role”。
     */
    me.setImageKey = function(p_imageKey)
    {
        me.imageKey = p_imageKey;
        if (me.imageKey != null)
        {
            var imageSize = me.owner != null ? me.owner.imageSize : 16;
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
        else
        {
            me.setImageUrl(null);
        }
    };
    
    /**
     * 设置 {@link itemType} 字段的值。
     */
    me.setItemType = function(p_type)
    {
        me.itemType = p_type;
        me.$e.attr("itemType", me.itemType);
    };
    
    /**
     * 返回一个 {@link mx.datacontrols.DataTreeNode} 对象，表示该节点的父节点。
     */
    me.getParentNode = function()
    {
        var $parent = me.$e.parent().parent("li");
        if ($parent.length == 0)
        {
            return null;
        }
        return me.owner != null ? me.owner.getNode($parent) : null;
    };
    
    /**
     * 返回一个 {@link mx.datacontrols.DataTreeNode} 对象，表示该节点的前一个节点。
     */
    me.getPrevNode = function()
    {
        var $prevLi = me.$e.prev("li");
        return $prevLi.data("node");
    };
    
    /**
     * 返回一个 {@link mx.datacontrols.DataTreeNode} 对象，表示该节点的后一个节点。
     */
    me.getNextNode = function()
    {
        var $nextLi = me.$e.next("li");
        return $nextLi.data("node");
    };
    
    /**
     * 返回该对象的属性值或节点的 HTML DOM 元素的属性值。
     * 
     * @param p_name 一个字符串，表示该对象的属性名称（如“text”、“imageUrl”）或者表示节点的 HTML DOM 元素的属性名称（如“class”、“itemType”）。
     */
    me.getValue = function(p_name)
    {
        if (typeof(me[p_name]) != "undefined")
        {
            return me[p_name];
        }
        else
        {
            return me.$e.attr(p_name);
        }
    };
    
    /**
     * 根据字段名称设置该字段的值。
     * 
     * @param p_name 一个字符串，表示字段名称（如“text”、“imageUrl”）或表示节点的 HTML DOM 元素的属性名称（如“class”、“itemType”）。
     * <p>
     * 该参数作为字段名称时的值可以为：
     * <ul>
     *     <li><b>id</b></li>
     *     <li><b>itemType</b></li>
     *     <li><b>text</b></li>
     *     <li><b>imageUrl</b></li>
     *     <li><b>imageKey</b></li>
     * </ul>
     * </p>
     * @param p_value 一个字符串，表示要设置的值。
     */
    me.setValue = function(p_name, p_value)
    {
        switch (p_name)
        {
            case "id":
                me.setID(p_value);
                break;
            case "itemType":
                me.setItemType(p_value);
                break;
            case "text":
                me.setText(p_value);
                break;
            case "imageUrl":
                me.setImageUrl(p_value);
                break;
            case "imageKey":
                me.setImageKey(p_value);
                break;
            default:
                me.$e.attr(p_name, p_value);
                break;
        }
    };
    
    /**
     * 返回一个 Boolean 值，表示该节点是否已加载子节点。如果该值为 true，则表示已加载；反之则没有。
     */
    me.hasLoaded = function()
    {
        return _$ul != null;
    };
    
    /**
     * 将该节点标记为“已剪切”节点。
     * 
     * @param [p_isCut=true] 一个 Boolean 值，表示将该节点标记为已剪切。已剪切的节点图标会处于半透明状态。
     */
    me.markAsCut = function(p_isCut)
    {
        if (p_isCut == null)
        {
            p_isCut = true;
        }
        me.$e.find("img").opacity(p_isCut ? 0.3 : 1);
    };
    
    /**
     * 将节点插入到指定的 JQuery 对象的后面，并返回该 {@link mx.datacontrols.DataTreeNode} 节点。
     * 
     * @param p_node 要插入的节点，详见 {@link _createNode} 方法的参数 p_node。
     * @param $after 一个 JQuery 对象，表示要插入到该 JQuery 对象对应的节点之后。
     */
    me.insertNodeAfter = function(p_node, $after)
    {
       	var node, prevNode = $after.data("node"), options = {};
    	
    	if ($isEmpty(prevNode))
    		return;
    	
    	options.prevId = prevNode.id;
    	
    	if ($.isPlainObject(p_node))
    	{
    		node = me.owner.entityContainer.create(p_node, options);
    	}
  		else if ($instanceOf(p_node, mx.datacontrols.DataTreeNode))
  		{
  			node = p_node;
  		}
  		
       	if ($notEmpty(node))
       	{
       		return _insertNodeAfter(node, prevNode);
       	}
    };
    
    
   function _insertNodeAfter(p_node, p_prevNode)
   {
    	p_node.parent = p_prevNode.parent;
    	var node = me._createNode(p_node);
    	if ($isEmpty(node))
    	{
    		return;
    	}
    	me.childNodes.insertAfter(node, p_prevNode);
    	node.$e.insertAfter(p_prevNode.$e);
    	return node;
   }
    
    /**
     * 将节点插入到指定的 JQuery 对象的前面，并返回该 {@link mx.datacontrols.DataTreeNode} 节点。
     * 
     * @param p_node 要插入的节点，详见 {@link _createNode} 方法的参数 p_node。
     * @param $before 一个 JQuery 对象，表示要插入到该 JQuery 对象对应的节点之前。
     */
    me.insertNodeBefore = function(p_node, $before)
    {
       	var node, nextNode = $before.data("node"), options = {}
  		
    	if ($isEmpty(nextNode))
    		return;
    		
  		options.nextId = nextNode.id;
  		if ($.isPlainObject(p_node))
    	{
    		node = me.owner.entityContainer.create(p_node, options);
    	}
  		else if ($instanceOf(p_node, mx.datacontrols.DataTreeNode))
  		{
  			node = p_node;
  		}
       	if ($notEmpty(node))
       	{
       		return _insertNodeBefore(node, nextNode);
       	}
    };
    
    function _insertNodeBefore(p_node, p_nextNode)
    {
    	p_node.parent = p_nextNode.parent;
    	var node = me._createNode(p_node);
        if ($isEmpty(node))
    	{
    		return;
    	}
    	me.childNodes.insertBefore(node, p_nextNode);
        node.$e.insertBefore(p_nextNode.$e);
        return node;
    }
    
    /**
     * 添加一个子节点（该节点为最后一个子节点），并返回该 {@link mx.datacontrols.DataTreeNode} 节点。
     * 
     * @param p_node 一个 JSON 对象，表示 {@link mx.datacontrols.DataTreeNode} 的一组属性值；或一个 {@link mx.datacontrols.DataTreeNode} 对象。
     */
    me.appendNode = function(p_node)
    {   
    	var node;
    	if ($.isPlainObject(p_node))
    	{
    		node = me.owner.entityContainer.create(p_node, {order: true, parentId: me.id});
    	}
    	else if ($instanceOf(p_node, mx.datacontrols.DataTreeNode))
    	{
    		node = p_node;
    		if (p_node.id && me.findNode("#"+p_node.id))
    		{
    			mx.indicate("warn", mx.err("DUPLICATED_ITEM", [ p_node.id ]));
        		return;
    		}	
    	}
    	if ($notEmpty(node))
      	{
      		return me._appendNode(node);
      	}
    };
    
    /**
     * @ignore
     */
    me._appendNode = function(p_node)
    {
    	var node = me._createNode(p_node);
        if (node == null) return;
        
        me.childNodes.add(node);
        
        if (_$ul != null)
        {
            _$ul.append(node.$e);
        }
        
        if (!me.hasChildren)
        {
            me.hasChildren = true;
        }
        
        return node;
    }
    
    /**
     * 添加一个子节点（该节点为第一个子节点），并返回该 {@link mx.datacontrols.DataTreeNode} 节点。
     * 
     * @param p_node 要插入的节点，详见 {@link _createNode} 方法的参数 p_node。 
     */
    me.prependNode = function(p_node)
    {           
        var node;
        if ($.isPlainObject(p_node))
        {
        	node = me.owner.entityContainer.create(p_node, {order: false, parentId: me.id});
        }
        else if ($instanceOf(p_node, mx.datacontrols.DataTreeNode))
    	{
    		node = p_node;
    	}
        if ($notEmpty(node))
        {
        	return me._prependNode(node);
        }
    };
    
    /**
     * @ignore
     */
    me._prependNode = function(p_node)
    {
    	var node = me._createNode(p_node);
        if (node == null) return;
        
        me.childNodes.insert(0, node);
        if (_$ul != null)
        {
            _$ul.prepend(node.$e);
        }
        if (!me.hasChildren)
        {
            me.hasChildren = true;
        }
        
        return node;
    }
    
    /**
     * 添加一组子节点，并以数组的形式返回添加的这些 {@link mx.datacontrols.DataTreeNode} 节点。
     * 
     * @param p_nodes 一个数组对象，表示 {@link mx.datacontrols.DataTreeNode} 的一组属性值的数组；或一个 {@link mx.datacontrols.DataTreeNode} 对象的数组 
     */
    me.appendNodes = function(p_nodes)
    {
        if (! $isArray(p_nodes) || p_nodes.length <= 0) return;
        var result = [];
        if ($isArray(p_nodes))
        {
            for (var i = 0; i < p_nodes.length; i++)
            {
                 var node = me.appendNode(p_nodes[i]);
                if ($instanceOf(node, mx.datacontrols.DataTreeNode))
                {
                	result.add(node);
                }
            }
        }
        return result;
    };
    
    function _appendNodes(p_nodes)
    {
    	if (! $isArray(p_nodes) || p_nodes.length <= 0) return;
    	var result = [];
        if ($isArray(p_nodes))
        {
            for (var i = 0; i < p_nodes.length; i++)
            {
                var node = me._appendNode(p_nodes[i]);
                if ($instanceOf(node, mx.datacontrols.DataTreeNode))
                {
                	result.add(node);
                }
            }
        }
        return result;
    }
    
    /**
     * 移除该节点的 DOM 元素。所有绑定的事件、附加的数据等都会保留下来。
     * 
     * @param [p_removeRemote=false] 一个 Boolean 值，表示是否需要删除服务端树节点。
     * @param [p_callback=false] 一个 Function 对象，表示节点删除后的回调函数。
     */
    me.removeNode = function(p_removeRemote, p_callback)
    {
        var removeRemote = false;
        var callback = null;
        if ($isBoolean(p_removeRemote))
        {
        	removeRemote = p_removeRemote;
        	
        	if ($isFunction(p_callback))
        	{
        		callback = p_callback;
        	}
        }
        else if ($isFunction(p_removeRemote))
        {
        	callback = p_removeRemote;
        }
        
        if (removeRemote)
        {
            if (me.owner != null && me.owner.entityContainer != null)
            {
                me.owner.entityContainer.remove(me, function(){
                	me._removeNode(callback);
                });
            }
        }
        else
        {
            me._removeNode(callback);           
        }
    };
    
    /**
     * @ignore
     */
    me._removeNode = function(p_callback)
    {
        var selected = false;
        if (me.owner != null && me.owner.selection == me)
        {
            selected = true;
            me.owner.selection = null;
        }
        me.markAsSelected(false);
        
        if (selected && me.owner != null && me.owner.autoSelect)
        {
            var li = me.$e.next();
            if (li.length == 0)
            {
                li = me.$e.prev();
            }
            if (li.length == 0)
            {
                li = me.$e.parent().parent();
            }
            
            if (li.length != 0 && li.tag() == "li")
            {
                node = me.owner.getNode(li);
                me.owner.selectNode(node);
            }
            else
            {
                me.owner.selectNode(null);
            }
        }
        
        me.$e.detach();
        me.owner = null;
        
        if ($isFunction(p_callback))
        {
        	p_callback();
        }
    };
    
    /**
     * 请参见 {@link mx.datacontrols.DataTree.selectNode} 方法。该方法仅在 {@link owner} 字段不为空时有效。
     */
    me.select = function()
    {
        if (me.owner != null)
        {
            me.owner.selectNode(me);
        }
    };
    
    var _expand_callback = null;
    /**
     * 展开子节点。
     * 
     * @param [p_callback=null] 展开节点后的回调函数。
     */
    me.expand = function(p_callback)
    {
    	if ($isFunction(p_callback))
    	{
    		_expand_callback = p_callback;
    	}
        
        if (!me.hasChildren) return;
        
        var args = { cancel: false, node: me };
        if (me.owner != null)
        {
            me.owner.trigger("expanding", args);
        }
        if (args.cancel)
        {
            return;
        }
        
        if (!me.hasLoaded() && me.isLasyLoad)
        {
            if (me.owner != null && me.owner.entityContainer != null)
            {
                me.owner.entityContainer.load(me, me._expand);
            }
        }
        else
        {
            me._expand();
        }
    };
    
    /**
     * @ignore 
     */
    me._expand = function()
    {
        if (_$ul != null)
        {
            if (me.owner != null)
            {
                _$ul.animationShow({speed: me.owner.speed, animation: me.owner.expandAnimation}, function()
                {
                	me.$e.addClass("expanded");
                    me.$e.find("> ul").addClass("expanded");
                    me.$e.find("> a").addClass("expanded");
                    me.expanded = true;
                });            
            }
        }
        else
        {
        	me.$e.addClass("expanded");
            me.$e.find("> ul").addClass("expanded");
            me.$e.find("> a").addClass("expanded");
            me.expanded = true;
        }
        
        if (me.owner != null && me.owner.trigger)
        {
            me.owner.trigger("expanded", { node: me });
        }
        
        if ($notEmpty(_expand_callback))
        {
            _expand_callback();
        }
    };
    
    /**
     * 隐藏子节点。
     * 
     * @param [p_callback] 一个 Function 对象，表示节点隐藏后的回调方法。
     */
    me.collapse = function(p_callback)
    {
        if (!me.hasChildren) return;
        
        me.$e.removeClass("expanded");
        me.$e.find("> ul").removeClass("expanded");
        me.$e.find("> a").removeClass("expanded");
        me.expanded = false;
        
        if (me.owner != null && _$ul != null)
        {
            _$ul.animationHide({speed: me.owner.speed, animation: me.owner.collapseAnimation});
        }
                
        if ($isFunction(p_callback))
        {
            p_callback(me);
        }
    };
    
    /**
     * 切换子节点展开的状态。如果子节点隐藏，使用该方法后就展开；反之则隐藏。
     */
    me.toggleExpand = function()
    {
        me.expanded ? me.collapse() : me.expand();
    };
    
    /**
     * 将该节点标记为选中的节点。
     * 
     * @param [p_selected=true] 一个 Boolean 值，表示是否将该节点标记为选中的节点。
     */
    me.markAsSelected = function(p_selected)
    {
        if (arguments.length == 0)
        {
            p_selected = true;
        }
        me.$e.toggleClass("selected", p_selected);
        me.$e.find("> a").toggleClass("selected", p_selected);
        
		if (me.owner != null && me.owner.moveByShortcutKey)
		{
			$(document).off("keydown");
			$(document).on("keydown", function(p_event){
				if (p_event.ctrlKey)
				{
					if (p_event.keyCode == 38)
					{
						me.moveUp();
					}
					else if (p_event.keyCode == 40)
					{
						me.moveDown();
					}
				}
			});
		}
    };
    
    /**
     * 返回一个 Boolean 值，表示该节点是否选中。
     */
    me.isSelected = function()
    {
        return me.$e.hasClass("selected");
    };
    
    /**
     * 刷新子节点。
     * 
     * @param [p_callback] 刷新展开节点后的回调函数。
     */
    me.refresh = function(p_callback)
    {
        if (me.hasChildren)
        {
            if (_$ul != null)
            {
                _$ul.empty().remove();
                _$ul = null;
            }

            me.childNodes = [];
        }
		
        me.expand(p_callback);
        
        if ($notEmpty(me.owner) && me.owner.refreshSelectedNode == true)
        {
        	me.refreshSelf();
        }
    };
    
    /**
     * 刷新自身文本或图标信息。
     */
    me.refreshSelf = function()
    {
    	if ($notEmpty(me.owner) && $notEmpty(me.owner.baseUrl))
    	{
			var url = me.owner.baseUrl + "/" + me.id + "/self";
    		$.getJSON(url, { itemType: me.getValue("itemType") }, function(p_context)
	    		{
					if (p_context.successful)
					{
						var results = p_context.resultValue;
						var treeNode;
						if ($isEmpty(results.nodes))
						{
							treeNode = results;
						}
						else if (results.nodes.length > 0)
						{
							treeNode = results.nodes[0];
						}
						
						if ($notEmpty(treeNode))
						{
							if ($notEmpty(treeNode.text))
							{
								me.setText(treeNode.text);	
							}
							if ($notEmpty(treeNode.imageUrl))
							{
								me.setImageUrl(treeNode.imageUrl);	
							}
						}
					}
					else
					{
						mx.indicate("error", p_context.resultHint);
					}
	    		}
    		);    		
    	}
    };
    
    /**
     * 返回一个值，表示该节点与做比较的节点是否相同。
     * 
     * @param p_node 一个 {@link mx.datacontrols.DataTreeNode} 对象。
     */
    me.equals = function(p_node)
    {
        if (p_node == null) return false;
        
        return (p_node.$e.get(0) == me.$e.get(0));
    };
    
    /**
     * 返回当前节点下复合 p_expression 条件的树节点（{@link mx.datacontrols.DataTreeNode} 类型）。请参见 {@link mx.datacontrols.DataTree.findNode} <b>示例 2</b>。
     * @param p_expression 一个 JQuery 表达式，该表达式应明确指向唯一的 LI 元素。
     */
    me.findNode = function(p_expression)
    {
        if (p_expression == null)
        {
            return null;
        }
        
        var node = null;
        var $li = me.$e.find(p_expression);
        node = me.owner.getNode($li);
        
        return node;
    };
    
    var _level = 0;
    /**
     * 获取当前节点的层数。
     */
    me.getLevel = function()
    {
        if (_level != 0) 
        {
            return _level;
        }
        
        var i = 1;
        var parentNode = me;
        while (parentNode && parentNode.parent != null)
        {
            i++;
            parentNode = parentNode.parent;
        }
        _level = i;
        
        return i;
    };
    
    /**
     * 将当前节点移动到指定的位置。
     * 
     * @param p_index 一个 Number 值，表示节点的索引（0 表示第一个节点）。
     */
    me.moveTo = function(p_index)
    {
        var $prevLis = me.$e.prevAll("li");
        var nodeChanged = false;
        var targetNodes = [];
        if ($prevLis.length < p_index)
        {
            var targetIndex = p_index - $prevLis.length - 1;
            var $nextLis = me.$e.nextAll("li");
            me.$e.insertAfter($nextLis.eq(targetIndex));
            nodeChanged = true;
            for (var i = 0; i <= targetIndex; i++)
            {
                targetNodes.add($nextLis.eq(i).data("node"));
            }
        }
        else if ($prevLis.length > p_index)
        {
            var targetIndex = $prevLis.length - p_index - 1;
            me.$e.insertBefore($prevLis.eq(targetIndex));
            nodeChanged = true;
            for (var i = 0; i <= targetIndex; i++)
            {
                targetNodes.add($prevLis.eq(i).data("node"));
            }
        }
        
        if (me.owner != null && nodeChanged)
        {
            me.owner.trigger("nodeindexchanged", { sourceNode:me, targetNodes:targetNodes });
        }
    };
    
    /**
     * 将当前节点向上移动一格。如果是第一个节点则位置不变。
     */
    me.moveUp = function()
    {
        var $prevLis = me.$e.prevAll("li");
        if ($prevLis.length > 0)
        {
            me.moveTo($prevLis.length - 1);
        }
    };
    
    /**
     * 将当前节点往下移动一格。如果是最后一个节点则位置不变。
     */
    me.moveDown = function()
    {
        var $prevLis = me.$e.prevAll("li");
        me.moveTo($prevLis.length + 1);
    };
    
    var _$ul = null;
    /**
     * @ignore
     * 根据指定的条件创建并返回节点（{@link mx.datacontrols.DataTreeNode} 类型）。
     * 
     * @param p_node 一个 JSON 对象，表示 {@link mx.datacontrols.DataTreeNode} 的一组属性值；或一个 {@link mx.datacontrols.DataTreeNode} 对象。
     */
    me._createNode = function(p_node)
    {
        var node = null;
        if ($.isPlainObject(p_node))
        {
            var T = mx.datacontrols.DataTreeNode;
            if (me.owner != null)
            {
                T = me.owner.treeNodeType;
            }
            if (T == null)
            {
                throw new Error("TreeNode type can not be null.");
            }
            
            p_node.owner = me.owner;
            p_node.parent = me;
            node = new T(p_node);
        }
        else if ($isObject(p_node))
        {
            node = p_node;
        }
        else
        {
            return;
        }
        
        if (me.owner != null && me.owner.displayCheckBox)
        {
            var $a = node.$e.children("a");
            var $expandor = $a.children("#expandor");
            var $img = $("<span id='checkBox'/>");
            if ($expandor.length > 0)
            {
                $expandor.after($img);
            }
            else
            {
                $a.prepend($img);
            }
        }
        
        node.owner = me.owner;
        node.parent = me;
        //如果父节点不允许懒加载，则一次性加载所有子节点。
        if(!me.isLasyLoad)
        {
            node.isLasyLoad = false;
        }
        if (node.isSelected())
        {
            node.markAsSelected(false);
        }
               
        var $ul = me.$e.children("ul");
        if ($ul.length > 0)
        {
            _$ul = $ul;
        }
        else
        {
            _$ul = $("<ul/>");
            me.$e.append(_$ul);
        }
        
        _$ul.css("text-indent", (node.getLevel() - 1) * 20 + "px");
        return node;
    };
    
    
    me.endOfClass(arguments); 
    return me;
};
$ns("mx.datacontrols");

$import("mx.controls.ContextMenu");
$import("mx.datacontrols.DataTreeNode");

/**
 * 提供一个在树状结构中显示分层数据的控件的类，该树状结构包含可展开和折叠的项。
 * 
 * @example
 * 以下为 {@link mx.datacontrols.DataTree} 的示例。<b>说明了如何调用 Rest 服务获取树的数据然后在客户端构造树。</b>
 * <code language="JavaScript">
 * var dataTree = new mx.datacontrols.DataTree({            
 *     baseUrl: "~/dbm/rest/person/tree"
 * });
 * dataTree.load();
 * </code>
 * 
 * @example
 * 以下为 {@link mx.datacontrols.DataTree} 的示例。<b>说明了如何使用数据容器在客户端构造树。</b>
 * <code language="JavaScript">
 * var treeEntityContainer = new mx.datacontainers.TreeEntityContainer({
 *     baseUrl: "~/dbm/rest/person/tree"  // rest 服务地址规约详见接口设计文档
 * });
 * 
 * var dataTree = new mx.datacontrols.DataTree({            
 *     entityContainer: treeEntityContainer
 * });
 * 
 * dataTree.load();
 * </code>
 * 
 * @example
 * 以下为 {@link mx.datacontrols.DataTree} 的示例。<b>说明了如何使用本地数据构造树。</b>
 * <code language="JavaScript">
 * var treeEntityContainer = new mx.datacontainers.TreeEntityContainer({
 *     type: "local",
 *     data: [
 *         {
 *             id: "a",
 *             text: "中国",
 *             hasChildren: true,
 *             childNodes:[
 *                 {
 *                     id: "a-21",
 *                     text: "江苏"
 *                 },
 *                 {
 *                     id: "a-22",
 *                     text: "台湾"
 *                 }
 *             ]
 *         },
 *         {
 *             id: "b",
 *             text: "巴西"
 *         }
 *     ]  
 * });
 * 
 * var dataTree = new mx.datacontrols.DataTree({
 *     entityContainer: treeEntityContainer
 * });
 * 
 * dataTree.load();
 * </code>
 * 
 * @example
 * 以下为 {@link mx.datacontrols.DataTree} 的示例。<b>说明了如何订购树的属性、方法、事件。</b>
 * <code language="JavaScript">
 * var dataTree = new mx.datacontrols.DataTree({
 *     entityContainer: treeEntityContainer,
 *     displayCheckBox: true, // 是否需要在树中显示选中框
 *     onselectionchanged: _tree_selectionchanged
 * });
 * 
 * dataTree.load();
 * 
 * function onselectionchanged(e)
 * {
 *     alert("The current selected node is " + e.selection.text + ".");
 * }
 * </code>
 */
mx.datacontrols.DataTree = function()
{
    var me = $extend(mx.controls.Control);
    var base = {};
    
    /**
     * @default auto
     */
    me.width = "auto";
    
    /**
     * @default 100%
     */
    me.height = "100%";
    
    /**
     * @ignore
     */
    me.navigatable = false;
    
    /**
     * 获取或设置一个 Boolean 值，表示当树节点中没有选中节点的时候，是否自动选择第一个节点。如果该值为 true，则自动选择；反之则不自动选择。
     * 
     * @default true
     */
    me.autoSelect = true;
    
    /**
     * 获取或设置一个 Boolean 值，该值表示树节点之前是否显示一个选择框。如果该值为 true，则表示显示；反之则不显示。该字段必须在初始化前设置。
     * 
     * @default false
     */
    me.displayCheckBox = false;
    
    /**
     * 获取或设置一个 Boolean 值，该值表示树节点选中时，是否级联选择其父子树节点。该字段在 displayCheckBox 字段为 true 时有效。
     * 
     * @default true
     */
    me.checkCascade = true;
    
    /**
     * 获取树节点的类型。
     * 
     * @default mx.datacontrols.DataTreeNode
     */
    me.treeNodeType = mx.datacontrols.DataTreeNode;
    
    /**
     * 获取一个对象，表示 {@link mx.datacontrols.DataTree} 中当前选中的节点（{@link mx.datacontrols.DataTreeNode} 类型）。
     */
    me.selection = null;
    
    /**
     * 获取 {@link mx.datacontrols.DataTreeNode} 图片的大小。该字段必须在初始化前设置。
     * 
     * @default 16
     */
    me.imageSize = 16;
    
    /**
     * 获取一个 {@link mx.datacontainers.EntityContainer} 对象，表示 {@link mx.datacontrols.DataTree} 的数据容器。如果没有为 DataTree 控件指定数据源，则只能通过 appendNode 等方法添加树节点，而 {@link load} 等动态加载树节点的方法均无效。
     */
    me.entityContainer = null;
    
    /**
     * 请参见 {@link mx.datacontainers.EntityContainer.baseUrl} 属性。<b>如果 DataTree 的 {@link entityContainer} 由外界创建，那么该属性不需要设置；
     * 否则只有当{@link entityContainer} 属性对应的数据容器对象的type属性值为local时,可以不需要设置该属性，其它情况下必须设置.</b>
     */
    me.baseUrl = null;
    
    /**
     * 一个 {@link mx.controls.ContextMenu} 对象，表示控件的右键菜单。
     */
    me.contextMenu = null;
    
    /**
     * 一个 {@link mx.controls.ContextMenu} 对象，表示树节点的右键菜单。
     */
    me.nodeMenu = null;
    
    /**
     * 获取或设置树节点显示的动画效果。
     * <p>
     * 该字段的可选值包括:
     * <ul>
     *     <li><b>none</b> - 无动画效果。</li>
     *     <li><b>show</b> - 无动画效果。</li>
     *     <li><b>slideDown</b> - 以滑动的方式显示。</li>
     *     <li><b>fadeIn</b> - 淡入效果。</li>
     * </ul>
     * </p>
     * 
     * @default slideDown
     */
    me.expandAnimation = "slideDown";
    
    /**
     * 获取或设置树节点隐藏的动画效果。
     * <p>
     * 该字段的可选值包括:
     * <ul>
     *     <li><b>none</b> - 无动画效果。</li>
     *     <li><b>hide</b> - 无动画效果。</li>
     *     <li><b>slideUp</b> - 以滑动的方式显示。</li>
     *     <li><b>fadeOut</b> - 淡入效果。</li>
     * </ul>
     * </p>
     * 
     * @default slideUp
     */
    me.collapseAnimation = "slideUp";
    
    /**
     * 获取或设置树节点展开的速度。
     * 
     * @default 100
     */
    me.speed = 100;
    
    /**
     * 获取或设置一个 Boolean 值，表示树的节点是否懒加载。
     * 
     * @default true
     */
    me.isLasyLoad = true;
    
    /**
     * 获取或设置一个 Boolean 值，表示是否显示默认的树及树节点的上下文菜单，默认菜单项只包含刷新项。
     * 
     * @default false
     */
    me.showDefaultContextMenu = true;
    
    /**
     * 获取或设置一个 Boolean 值，表示树的节点刷新时，是否在刷新子节点的同时刷新当前选中节点。
     * 
     * @default false
     */
    me.refreshSelectedNode = false;
    
    /**
     * 获取或设置一个 Boolean 值，表示是否使用向上快捷键（ctrl+↑）或向下快捷键（ctrl+↓）移动单个树节点。
     * 
     * @default false
     */
    me.moveByShortcutKey = false;
    
    /**
     * @ignore
     */
    me.$root = null;
    
    /**
     * 当控件当前选择的节点发生改变后，将触发该事件。通常调用 {@link selectNode} 和 {@link clearNodes} 等方法后会触发该事件。
     * 
     * @param selection 一个 {@link mx.datacontrols.DataTreeNode} 对象，即将被选择的节点。
     */
    me.onselectionchanged = null;
    
    /**
     * 当控件当前选择的节点发生改变的时候，将触发该事件。通常调用 {@link selectNode} 方法时会触发该事件。
     * 
     * @cancelable
     * @param selection 一个 {@link mx.datacontrols.DataTreeNode} 对象，即将被选择的节点。
     */
    me.onselectionchanging = null;
    
    /**
     * 当展开某个树节点之前，将触发该事件。通常调用 {@link mx.datacontrols.DataTreeNode.expand} 方法时会触发该事件。
     * 
     * @cancelable
     * @param node 一个即将展开的 {@link mx.datacontrols.DataTreeNode} 对象。
     */
    me.onexpanding = null;
    
    /**
     * 当树节点展开后将触发该事件。通常调用 {@link mx.datacontrols.DataTreeNode.expand} 方法时会触发该事件。
     * 
     * @param node 一个已经展开的 {@link mx.datacontrols.DataTreeNode} 对象。
     */
    me.onexpanded = null;
    
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
    
    /**
     * 当右键单击树节点弹出右键菜单的时候，将触发该事件。
     * 
     * @cancelable
     * @param node 一个 {@link mx.datacontrols.DataTreeNode} 对象。
     */
    me.onmenushowing = null;
    
    /**
     * 当节点位置发生改变的时候，将触发该事件。通常调用 {@link moveTo}、{@link moveUp}、{@link moveDown} 方法时会触发该事件。
     * 
     * @param sourceNode 一个 {@link mx.datacontrols.DataTreeNode} 对象，即移动的源节点。
     * @param targetNodes 一组 {@link mx.datacontrols.DataTreeNode} 对象集合，即被移动的目标节点集合。
     */
    me.onnodeindexchanged = null;
    
    base.init = me.init;
    me.init = function()
    {        
    	if($.isIE67()) {
    		if(me.width == "auto") me.width = null;
    		if(me.height == "100%") me.height = null;
    	}
    	  
        base.init();
        
        if (me.$e.children("ul").length > 0)
        {
            me.$root = me.$e.children("ul");
        }
        else
        {
            me.$root = $("<ul/>");
            me.$e.append(me.$root);
        }
        
        me.$e.userSelectable(false);
        me.$e.addClass("dataTree");
        if (me.navigatable)
        {
            me.$e.addClass("navigatable");
        }       
        
        var contextMenu = {
            name: "rootRefresh",
            text: mx.msg("REFRESH"),
            onclick: _contextMenu_item_click
        };
        var nodeMenu = {
            name: "refresh",
            text: mx.msg("REFRESH"),
            onclick: _menu_item_click
        };
        
        if ($.isPlainObject(me.contextMenu))
        {
            me.contextMenu.items.insert(0, "-");
            me.contextMenu.items.insert(0, contextMenu);
            me.contextMenu = new mx.controls.ContextMenu(me.contextMenu);
        }        
        else if ($isEmpty(me.contextMenu) && me.showDefaultContextMenu)
        {
            me.contextMenu = new mx.controls.ContextMenu({
                items:[
                    contextMenu
                ]
            });
        }
        
        if ($.isPlainObject(me.nodeMenu))
        {
            me.nodeMenu.items.insert(0, "-");
            me.nodeMenu.items.insert(0, nodeMenu);
            me.nodeMenu = new mx.controls.ContextMenu(me.nodeMenu); 
        }
        else if ($isEmpty(me.nodeMenu) && me.showDefaultContextMenu)
        {
            me.nodeMenu = new mx.controls.ContextMenu({
                items:[ nodeMenu ]
            });
        }
        
        if (me.entityContainer == null)
        {
            me.entityContainer = new mx.datacontainers.TreeEntityContainer({
                baseUrl: me.baseUrl
            });            
        }
        me.setEntityContainer(me.entityContainer);
        
        me.$e.on("click", "#expandor", _node_expandor_click);
        me.$e.on("click", "#checkBox", _node_checkBox_click);
        me.$e.on("click", "a", _node_link_click);
        me.$e.on("dblclick", "a", _node_link_dblclick);
        me.$e.on("contextmenu", "a", _node_link_contextmenu);
        me.$e.contextmenu(_contextmenu);
        if ($.isIE67() && !$.isIE6())
        {
        	me.$e.css("overflow",'visible');
        }
    };
	
	base.dispose = me.dispose;
    /**
	* 释放对象运行时动态生成的内容（属性、方法、事件）。
	*/
    me.dispose = function(){
		me.$e.find("li").each(function(){
			if($(this).data("node")){
				$(this).data("node").dispose();
			}
		});
		
		base.dispose();
		base=null;
	}
    
    me._isBusy = false;

    /**
     * 加载树。<b>第一次加载树的时候需要调用该方法，加载子节点时控件会自动加载。</b>
     * 
     * @param [p_data] 一个 JSON 对象，表示加载树节点时的请求参数。
     * @param [p_callback] 加载完节点后的回调函数。
     */
    me.load = function(p_data, p_callback)
    {        
        if (me.entityContainer != null)
        {
            if(!me._isBusy){
	        	me.$root.empty();
	        	if ($isEmpty(me.entityContainer.baseUrl) && "remote" == me.entityContainer.type)
	            {
	                mx.showerror(new Error(mx.err("LOADING",["EntityContainer BaseUrl is Undefined"])));
	                return ;
	            }
	            me.entityContainer.load(p_data, p_callback);
            }
        }
        else
        {
            throw new Error(mx.err("ERR_ENTITYCONTAINER_NON_NULLABLE"), ["DataTree"]);
        }
    };
    
    /**
     * 设置 {@link entityContainer} 字段的值。
     */
    me.setEntityContainer = function(p_entityContainer)
    {
        if ($notEmpty(p_entityContainer))
        {
            me.entityContainer = p_entityContainer;
            if ($notEmpty(me.entityContainer))
            {
                me.entityContainer.off("loading", _entityContainer_loading);
                me.entityContainer.off("load", _entityContainer_load);
            }
            me.entityContainer.on("loading", _entityContainer_loading);
            me.entityContainer.on("load", _entityContainer_load);
        }
    };
    
    /**
     * 返回当前树中复合 p_expression 条件的树节点（{@link mx.datacontrols.DataTreeNode} 类型）。当复合条件的树节点数等于 0 时，返回 null；等于 1 时，返回该 LI 元素对应的树节点对象；当大于 1 时，返回复合条件的第一个 LI 元素对应的树节点对象。
     * @param p_expression 一个 JQuery 表达式字符串，该表达式应明确指向唯一的 LI 元素。
     * 
     * @example
     * 获取标识为“ABC123”的节点:
     * <code language="JavaScript">
     * var node = dataTree.findNode("#ABC123");
     * </code>
     * 
     * @example
     * 获取标识为“ABC123”的节点下的“XYZ789”节点:
     * <code language="JavaScript">
     * var node = dataTree.findNode("li#ABC123 > ul > li#XYZ789");
     * 
     * // 或与 mx.datacontrols.DataTreeNode.findNode 方法混合使用
     * var parentNode = dataTree.findNode("#ABC123");
     * var node = parentNode.findNode("#XYZ789");
     * </code>
     * 
     * @example
     * 获取第一个根节点:
     * <code language="JavaScript">
     * var node = dataTree.findNode("li:first-child");
     * </code>
     * 
     * @example
     * 获取最后一个类型为“MyType”的节点:
     * <code language="JavaScript">
     * var node = dataTree.findNode("li[itemType='MyType']:last");
     * </code>
     */
    me.findNode = function(p_expression)
    {
        if (p_expression == null)
        {
            return null;
        }
        
        var node = null;
        var $li = me.$e.find(p_expression);
        node = me.getNode($li);
        
        return node;
    };
    
    /**
     * 返回一个 {@link mx.datacontrols.DataTreeNode} 数组，表示当前树中复合 p_expression 条件的所有树节点（{@link mx.datacontrols.DataTreeNode} 类型）。如果没有查找到复合条件的节点，则返回一个空数组（[]）。
     * @param p_expression 一个 JQuery 表达式字符串，该表达式指向一组 LI 元素。
     * 
     * @example
     * 获取当前树中所有根节点（递归遍历）:
     * <code language="JavaScript">
     * var nodes = dataTree.findNodes("li");
     * </code>
     * 
     * @example
     * 获取所有根节点:
     * <code language="JavaScript">
     * var nodes = dataTree.findNodes("> ul > li");
     * </code>
     * 
     * @example
     * 获取所有类型为“MyType”的节点:
     * <code language="JavaScript">
     * var nodes = dataTree.findNodes("li[itemType='MyType']");
     * </code>
     */
    me.findNodes = function(p_expression)
    {
        if (p_expression == null)
        {
            return null;
        }
        
        var nodes = [];
        
        var $lis = me.$e.find(p_expression);
        for (var i = 0; i < $lis.length; i++)
        {
            var node = me.getNode($lis[i]);
            if (node != null)
            {
                nodes.add(node);
            }
        }
        
        return nodes;
    };
    
    /**
     * 返回指定节点标识（或指定节点对应的 LI 元素）的树节点（{@link mx.datacontrols.DataTreeNode} 类型）。
     * @overload function(p_li)
     * @overload function(p_nodeID)
     * 
     * @param $p_li 一个 JQuery 对象，对应唯一的 LI 元素。
     * @param p_li 一个 LI 元素。
     * @param p_nodeID 一个字符串，指定节点的唯一标识。
     * 
     * @example
     * 获取标识为“ABC123”的节点:
     * <code language="JavaScript">
     * var node = dataTree.getNode("ABC123");
     * </code>
     * 
     * @example
     * 获取 LI 元素对应的节点:
     * <code language="JavaScript">
     * var node = dataTree.getNode(li);
     * 
     * // 或 JQuery 对象
     * var $li = $(li);
     * node = dataTree.getNode($li); 
     * </code>
     */
    me.getNode = function($p_li, p_itemType)
    {
        if ($isEmpty($p_li))
        {
            return null;
        }
        
        if ($isString($p_li))
        {
        	if (arguments.length == 2 && $notEmpty(p_itemType))
        	{
        		$p_li = me.$e.find("li[id='" + $p_li + "'][itemType='" + p_itemType + "']");
        	}
			else
			{
				$p_li = me.$e.find("li[id='" + $p_li + "']");
			}
        }
        
        if ($isObject($p_li))
        {                
            if (typeof($p_li.jquery) == "undefined")
            {
                $p_li = $($p_li);
            }      
            
            if($p_li.length > 0)
            {
            	var $li = $p_li.eq(0);
	            if ($li.tag() == "li")
	            {       
	                var node = $li.data("node");
	                return node;
	            }
            }
        }
        
        return null;
    };
    
    /**
     * 获取所有选中的节点的集合。该方法仅在 {@link displayCheckBox} 为 true 时有效。
     */
    me.getCheckedNodes = function()
    {
        var $nodes = me.$root.find("li.checked");
        var nodes = [];
        $nodes.each(function()
        {
            var node = me.getNode(this);                
            nodes.add(node);
        });
        
        return nodes;
    };
    
    /**
     * 获取所有选中的节点的唯一标识的集合。该方法仅在 {@link displayCheckBox} 为 true 时有效。
     */
    me.getCheckedNodeIDs = function()
    {
        var $nodes = me.$root.find("li.checked");
        var ids = [];
        $nodes.each(function()
        {
            var node = me.getNode(this);                
            ids.add(node.id);
        });
        
        return ids;
    };
    
    /**
     * 选择 {@link mx.datacontrols.DataTree} 中的指定的树节点。
     * 
     * @param p_node 一个 {@link mx.datacontrols.DataTreeNode} 节点对象。
     * @param [p_triggerEvent=true] 一个 Boolean 值，表示是否要触发 {@link onselectionchanging} 和 {@link onselectionchanged} 事件。如果该值为 true，则触发事件；反之则不触发。
     */
    me.selectNode = function(p_node, p_triggerEvent)
    {
        if (p_triggerEvent != false)
        {
            var args = { selection: p_node, cancel: false };
            me.trigger("selectionchanging", args);
            if (args.cancel) return;
        }
        
        if (me.selection != null)
        {
            if (me.selection.equals(p_node))
            {
                return;
            }
            me.selection.markAsSelected(false);
        }
        
        me.selection = p_node;
        if (me.selection != null)
        {
            me.selection.markAsSelected(true);
        }
        
        if (p_triggerEvent != false)
        {
            me.trigger("selectionchanged", { selection: me.selection });
        }
    };
    
    /**
     * 选择树控件的第一个节点。该方法仅当 {@link selection} 为空的时候有效。
     */
    me.selectFirstNode = function()
    {
        if (me.selection == null)
        {
            var $lis = me.$e.find("li");
            if ($lis.length > 0 && me.enabled)
            {
                var node = me.getNode($lis);
                me.selectNode(node);
            }
        }
    };
    
    /**
     * 将节点插入到指定的 JQuery 对象的后面，并返回该节点。如果当前没有选中的节点，并且 {@link autoSelect} 属性为 true，那么使用该方法后会选中第一个节点。
     * @param p_node 要插入的节点，详见 {@link _createNode} 方法的参数 p_node。
     * @param $after 一个 JQuery 对象，表示要将 p_node 插入到该 JQuery 对象对应的节点之后。
     * 
     * @example
     * 以下是将 B 节点插入到 C 节点之后的示例。
     * <code language="JavaScript">
     * dataTree.insertNodeAfter(nodeB, nodeC.$e);
     * </code>
     */
    me.insertNodeAfter = function(p_node, $after)
    {
    	var node, prevNode = $after.data("node"), options = {};
    	
    	if ($isEmpty(prevNode))
    		return;
    	
    	options.prevId = prevNode.id;
    	
    	if ($.isPlainObject(p_node))
    	{
    		node = me.entityContainer.create(p_node, options);
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
    	node.$e.insertAfter(p_prevNode.$e);
    	if (me.selection == null && me.autoSelect)
        {
            me.selectFirstNode();
        }
        return node;
     }
    
    /**
     * 将节点插入到指定的 JQuery 对象的前面，并返回该节点。如果当前没有选中的节点，并且 {@link autoSelect} 属性为 true，那么使用该方法后会选中第一个节点。
     * @param p_node 要插入的节点，详见 {@link _createNode} 方法的参数 p_node。
     * @param $before 一个 JQuery 对象，表示要将 p_node 插入到该 JQuery 对象对应的节点之前。
     *
     * @example
     * 以下是将 C 节点插入到 B 节点之前的示例。
     * <code language="JavaScript">
     * dataTree.insertNodeBefore(nodeC, nodeB.$e);
     * </code>
     */
    me.insertNodeBefore = function(p_node, $before)
    {
    	var node, nextNode = $before.data("node"), options = {}
  		
    	if ($isEmpty(nextNode))
    		return;
    		
  		options.nextId = nextNode.id;
  		if ($.isPlainObject(p_node))
    	{
    		node = me.entityContainer.create(p_node, options);
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
    	node.$e.insertBefore(p_nextNode.$e);
    	if (me.selection == null && me.autoSelect)
        {
            me.selectFirstNode();
        }
        return node;
    }
    
    /**
     * 添加一个根节点（该节点为最后一个根节点），并返回该节点。如果当前没有选中的节点，并且 {@link autoSelect} 属性为 true，那么使用该方法后会选中第一个节点。
     * 
     * @param p_node 要插入的节点，详见 {@link _createNode} 方法的参数 p_node。 
     */
    me.appendNode = function(p_node)
    {
    	var node;
    	if ($.isPlainObject(p_node))
    	{
    		node = me.entityContainer.create(p_node, {order: true});
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
        me.$root.append(node.$e);
        
        if (me.selection == null && me.autoSelect)
        {
            me.selectFirstNode();
        }
        
        return node;
    }
    
    /**
     * 添加一个根节点（该节点为第一个根节点），并返回该节点。如果当前没有选中的节点，并且 {@link autoSelect} 属性为 true，那么使用该方法后会选中第一个节点。
     * 
     * @param p_node 要插入的节点，详见 {@link _createNode} 方法的参数 p_node。 
     */
    me.prependNode = function(p_node)
    {
    	var node;
        if ($.isPlainObject(p_node))
        {
        	node = me.entityContainer.create(p_node, {order: false});
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
        me.$root.prepend(node.$e);
        
        if (me.selection == null && me.autoSelect)
        {
            me.selectFirstNode();
        }
        
        return node;
    }
    
    /**
     * 添加一组根节点，并以数组的形式返回添加的这些节点。
     * 
     * @param p_nodes 一个数组，数组中的元素请参见 {@link appendNode} 方法的参数 p_nodes。
     */
    me.appendNodes = function(p_nodes)
    {
        if (p_nodes == null || !$isObject(p_nodes)) return [];
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
    
    /**
     * 清空所有的节点，并触发 {@link onselectionchanged} 事件。
     */
    me.clearNodes = function()
    {
        me.$root.empty();
        me.entityContainer.data = [];
        me.selection = null;
        me.trigger("selectionchanged", { selection: null });
    };
    
    /**
     * 清除已选择的项
     */
    me.clearChecked = function()
    {
         var nodes =  me.getCheckedNodes();
         if($isArray(nodes))
         {
             for(var i=0;i<nodes.length;i++)
             {
                 if(nodes[i]) 
                 {
                     nodes[i].setChecked(false,true)
                 }
             }
             if(me.selection)
             {
                  me.selection.markAsSelected(false);
                  me.selection = null;
             }
         }
    }
    
    /**
     * 刷新树节点。该方法与 {@link load} 方法等同。
     */
    me.refresh = function(p_callback)
    {
        me.load(p_callback);
    };    
    
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
            var T = me.treeNodeType;
            p_node.owner = me;
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
        
        if (me.displayCheckBox)
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
        
        node.owner = me;
        //如果当前树不允许懒加载，则一次性加载所有节点。
        if(!me.isLasyLoad)
        {
            node.isLasyLoad = false;
        }
        if (node.isSelected())
        {
            node.markAsSelected(false);
        }
        return node;
    };
    
    function _contextMenu_item_click(e)
    {
        me.load();
    }
    
    function _menu_item_click(e)
    {
        if (me.selection != null)
        {
            me.selection.refresh();
        }
    }
    
    function _entityContainer_load(p_args)
    {
    	me._isBusy = false;
    	if (p_args != null)
        {
            if (typeof(p_args.parentNode) == "undefined")
            {
                me.selection = null;
                if(me._loadChildren_callback){
                	me._loadChildren_callback(null, p_args.nodes);
                }	
            }
            else
            {
            	if(me._loadChildren_callback){
                	me._loadChildren_callback(p_args.parentNode, p_args.nodes);
                }	
            }
        }
        
        me.$e && me.$e.setBusy(false);
    }
    
    function _entityContainer_loading(p_args)
    {
    	me._isBusy = true;
    	me.$e.setBusy();
    }
   
    /**
     * @ignore
     */
    me._loadChildren_callback = function(p_node, p_nodes)
    {
        var $ul = null;
        if (p_node == null)
        {
            $ul = me.$root;
            _loadRootNode($ul, p_nodes);
        }
        else
        {
            _loadChildNodes(p_node, p_nodes);
        }

        if (me.selection == null && me.autoSelect)
        {
            me.selectFirstNode();
        }
    };
    
    function _loadRootNode($p_ul, p_nodes)
    {
        if (!$isArray(p_nodes))
        {
            return;
        }
        
        for (var i = 0; i < p_nodes.length; i++)
        {
            var jsonNode = $clone(p_nodes[i]);            
            var pantNode = me._createNode(jsonNode);
            if (pantNode == null) continue;
            $p_ul.append(pantNode.$e);
        }
    }
    
    function _loadChildNodes(p_parentNode, p_nodes)
    {
        if ($notEmpty(p_nodes) && $isArray(p_nodes))
        {
            if (p_parentNode != null)
            {
                for (var i = 0; i < p_nodes.length; i++)
                {
                    var jsonNode = $clone(p_nodes[i]);
                    var pantNode = p_parentNode._appendNode(jsonNode);
                }
            }
        }
    }
    
    function _node_expandor_click()
    {
        if (!me.enabled) return;
        
        var li = this.parentNode.parentNode;
        var node = me.getNode(li);
        
        node.toggleExpand();
    }
    
    function _node_checkBox_click()
    {
        if (!me.enabled) return;
        
        var li = this.parentNode.parentNode;
        var node = me.getNode(li);
        
        if (me.displayCheckBox)
        {
            node.toggleChecked(me.checkCascade);
        }
    }
    
    function _node_link_click(e)
    {
        if (!me.enabled) return;
        
        var li = this.parentNode;
        var node = me.getNode(li);

        me.selectNode(node);
        
        me.trigger("nodeclick", { node: node });
    }
    
    function _node_link_dblclick(e)
    {
        if (!me.enabled) return;
        
        var li = this.parentNode;
        var node = me.getNode(li);            
        node.toggleExpand();
        var args = { node: node };              
        me.trigger("nodedoubleclick", args);
    }
    
    function _contextmenu(e)
    {
        if (!me.enabled) return;
        
        if (e.target.tagName != "DIV" && me.nodeMenu != null)
        {
            return true;
        }
        
        if (me.contextMenu != null)
        {
            me.contextMenu.show(e.clientX, e.clientY);
        }
        return false;
    }
    
    function _node_link_contextmenu(e)
    {
        if (!me.enabled) return;
        
        var li = this.parentNode;
        var node = me.getNode(li);
        if (me.selection != node)
        {
            me.selectNode(node);
        }
        if (me.nodeMenu != null)
        {
        	var args =
	        {
	            cancel : false,
	            node : me.selection
	        };
	
	        me.trigger("menushowing", args);
	        if (args.cancel)
	        {
	            return;
	        }
            me.nodeMenu.show(e.clientX, e.clientY);
        }
        return false;
    }
    
    me.endOfClass(arguments); 
    return me;
};
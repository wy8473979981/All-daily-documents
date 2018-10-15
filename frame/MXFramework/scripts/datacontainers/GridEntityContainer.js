$ns("mx.datacontainers");

$import("mx.datacontainers.EntityContainer");
$import("mx.utils.GUIDUtil");

/**
 * 提供一个供 {@link mx.datacontrols.DataGrid} 表格使用的数据容器的类。
 * 
 * @example 以下是一个表格数据容器如何初始化并通过远程服务加载数据的代码示例。 
 * <code language="JavaScript">
 * var container = new mx.datacontainers.GridEntityContainer(
 * {
 *     "baseUrl" : "~/rest/getData"
 * });
 * container.on("load", function()
 * {
 *     alert("onload");//触发 onload 事件。
 * });
 * container.load(paras);//根据指定的参数加载数据。
 * </code>
 * 
 * @example 以下是一个表格数据容器加载本地数据的代码示例。 
 * <code language="JavaScript">
 * var dc = new mx.datacontainers.GridEntityContainer(
 * {
 *     "type" : "local", //声明容器类型为本地数据。
 *     "meta" :
 *     [
 *     {
 *         "name" : "id",
 *         "caption" : "主键"
 *     },
 *     {
 *         "name" : "name",
 *         "caption" : "姓名"
 *     } ], //本地元数据信息。
 *     "data" :
 *     [
 *     {
 *         "id" : "local_1",
 *         "name" : "local_1_name"
 *     },
 *     {
 *         "id" : "local_2",
 *         "name" : "local_2_name"
 *     },
 *     {
 *         "id" : "local_3",
 *         "name" : "local_3_name"
 *     } ] //本地数据信息。
 * });
 * container.on("load", function()
 * {
 *    alert("onload");//触发 onload 事件。
 * });
 * container.load();
 * </code>
 */
mx.datacontainers.GridEntityContainer = function()
{
    var me = $extend(mx.datacontainers.EntityContainer);
    var base = {};

    /**
     * 获取一个数字，表示当前数据容器中的数据条数。
     * 
     * @default 0
     */
    me.itemCount = 0;
    
    /**
     * 获取一个对象数组，表示数据容器中的数据值。
     */
    me.data = [];
    
    /**
     * 获取一个对象，表示数据容器中正在编辑的一行数据
     */
    me.editingItem = null;
    
    /**
     * 获取一个 boolean 值，表示当前数据容器是否允许创建。
     * 
     * @default true
     */
    me.canCreate = true;
    
    /**
     * 获取一个 boolean 值，表示当前数据容器是否允许删除。
     * 
     * @default true
     */
    me.canDelete = true;
    
    /**
     * 容器加载完数据后，将触发该事件。以下参数说明仅包含当前子类的扩展参数，基础参数和其他信息请参照
     * {@link mx.datacontainers.EntityContainer.onload} 事件。
     * 
     * @param itemCounts
     *            一个数字，表示此次加载的数据条数。
     */
    me.onload = null;

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

    /**
     * 当数据容器中有数据对象被删除时，将触发该事件。
     * 
     * @param cancel
     *            一个 Boolean 值，表示是否中止事件。
     * @param IDs
     *            一个数组，包含要删除的数据对象的主键值。
     */
    me.ondeleting = null;

    /**
     * 当数据容器中有数据对象被删除后，将触发该事件。
     * 
     * @param IDs
     *            一个数组，包含要删除的数据对象的主键值。
     */
    me.ondeleted = null;

    /**
     * 当数据容器中的数据对象保存成功后，将触发该事件。调用 {@link save} 方法会触发该事件。
     * 
     * @param result.deleteIDs
     *            一个数组，包含要删除的临时主键。
     * @param result.newData
     *            一个数组，包含带有新主键的新增数据。
     */
    me.onsaved = null;

    // 删除服务返回的删除结果与容器删除结果可能有出入，比如新增数据未保存直接删除的情况。
    // 此数组用于记录组件提交过来的需要删除的数据主键。
    me._deleteIDs = new Array();
    
    /**
     * 提供一个方法，修改表单中某个字段的值。
     * 
     * @overload function(p_entity, p_col, p_value)
     * @overload function(p_entity, p_col, p_value, p_triggerEvent)
     * @param p_entity
     *            一个 json 对象，表示要修改的数据容器中的一条数据；或者一个字符串或数字，表示一条数据的主键值。
     * @param p_col
     *            要修改的字段名。
     * @param p_value
     *            要修改成的值。
     * @param [p_triggerEvent=false]
     *            一个 Boolean 值，表示是否要触发事件。如果该值为 true，则触发事件；反之则不触发。
     */
    base.setValue = me.setValue;
    me.setValue = function(p_entity, p_col, p_value, p_triggerEvent)
    {
        if ($isString(p_entity) || $isNumber(p_entity))
        {
            p_entity = me.getEntityByKey(p_entity);
        }
        base.setValue(p_entity, p_col, p_value, p_triggerEvent);
    };
    
    /**
     * 提供一个方法，使指定数据进入编辑状态。
     * 
     * @param p_key
     *            一个数字或字符串，表示要修改的数据的主键。
     */
    me.startEdit = function(p_key)
    {
        var item = me.getEntityByKey(p_key);

        if ($notEmpty(item))
        {
            item.setValue = function(p_field, p_value)
	        {
	            me.setValue(item, p_field, p_value, true);
	        };
            
            me.editingItem = item;
        }
        
        return item;
    };

    /**
     * 提供一个方法，返回一条数据，这条数据的主键与参数对象的主键值相同。
     * 
     * @param p_entity
     *            一个数据对象，它的主键值会作为在数组中查找数据对象的条件。
     */
    me.getEntity = function(p_entity)
    {
        return me.getEntityByKey(p_entity[me.primaryKey]);
    };

    /**
     * 提供一个方法，根据数据在数组中的位置获取对象。
     * 
     * @param p_index
     *            一个数字，表示数据对象在数组中的位置。
     */
    me.getEntityByIndex = function(p_index)
    {
        if (me.data[p_index])
        {
            return me.data[p_index];
        }
        return null;
    };

    /**
     * 提供一个方法，根据主键获取对应的数据对象。
     * 
     * @param p_key
     *            一个字符串或者数字，表示要查找的数据对象的主键值。
     */
    me.getEntityByKey = function(p_key)
    {
        var results = mx.utils.JsonUtil.getItems(me.data, me.primaryKey, p_key);
        if ($isEmpty(results))
        {
            return {};
        }
        return results[0];
    };
    
    
    /**
     * 添加一个数据对象。
     * 
     * @overload function()
     * @overload function(p_entity)
     * 
     * @param [p_entity]
     *            一个数据对象，包含伪主键或者默认值
     */
    me.create = function(p_entity, p_options)
    {
    	if (!me.canCreate)
    	{
    		// 没有权限
    		me._notAllowedTip();
    		return;
		}
        if ($isEmpty(p_entity))
        {
            p_entity = new Object();
        }
        var args =
        {
            cancel : false,
            entity : p_entity
        };

        me.trigger("creating", args);
        if (args.cancel)
        {
            return;
        }
        var newPk = p_entity[me.primaryKey];
        var isNew = false;
        
        if ($isEmpty(newPk))
        {
            // 生成新主键。
            p_entity[me.primaryKey] = mx.utils.GUIDUtil.newGUID();
            newPk = p_entity[me.primaryKey];
            
            isNew = true;
        }
        
        // 为新增的数据准备存放变更信息的对象。
        me._changedItems[newPk] = new Object();
        me._changedItems[newPk].mxVirtualId = newPk;
        
        for ( var p in p_entity)
        {
        	if (p == me.primaryKey && isNew)
        	{
        		// 新创建的数据记录的主键值为空。
        	}
        	else
        	{
        		me._changedItems[newPk][p] = p_entity[p];
        	}
        }
        var data = me.data;
        if ($notEmpty(p_options) && $notEmpty(p_options.rowNumber))
        {
            var length = data.length;    
            var rowNumber = p_options.rowNumber;
            
            if (length <= 0 || rowNumber < 1)            
                rowNumber = 1;
            else if (rowNumber > length)
                rowNumber = length + 1;
            
            for (var i = length - 1; i >= rowNumber - 1; i--)
            {
                data[i + 1] = data[i];
            }
            data[rowNumber - 1] = p_entity;
            args.rowNumber = rowNumber;
        }
        else
        {
            data.add(p_entity);
        }
        
        me.hasChanged(true);
        var trigger = (p_options && p_options.triggerEvent == false) ? false : true;
        if (trigger)
        {
        	me.trigger("created", args);
        }
        return p_entity;
    };

    base.save = me.save;
    
    /**
     * 删除所有的数据。
     */
    me.removeAll = function()
    {
        var IDs = [];
        for (var i = 0; i < me.data.length; i++)
        {
            IDs.add(me.data[i][me.primaryKey]);
        }
        
        me.remove(IDs);
    };
    
    /**
     * 根据位置删除数据对象。
     * 
     * @overload function(p_index)
     * @overload function(p_index, p_path)
     * 
     * @param p_indexes
     *            一个数字或者多个数字组成的数组，表示要删除的数据对象所在位置。
     * @param [p_path]
     *            一个字符串，表示自定义删除服务的路径。
     */
    me.removeByIndexes = function(p_indexes, p_path)
    {
        var IDs = [];
        if ($isArray(p_indexes))
        {
            for (var i = 0; i < p_indexes.length; i++)
            {
                IDs.add(me.data[p_indexes[i]][me.primaryKey]);
            }
        }
        else
        {
            IDs.add(me.data[p_indexes][me.primaryKey]);
        }
        me.remove(IDs, p_path);
    };

    /**
     * 根据主键删除数据对象。
     * 
     * @overload function(p_ID)
     * @overload function(p_ID, p_path)
     * @overload function(p_ID, p_para, p_path)
     * 
     * @param p_IDs
     *            一个字符串或数字，也可以是多个字符串或数字组成的数组，表示要删除的数据对象主键值。
     * @param [p_para] 
     * 			  一个 JSON 对象，表示删除时传到服务端的键值对参数。
     * @param [p_path]
     *            一个字符串，表示自定义删除服务的路径。
     */
    me.remove = function(p_IDs, p_para, p_path)
    {
    	if (!me.canDelete) 
    	{
    		// 没有权限
    		me._notAllowedTip();
    		return;
		}
        if (me._submitting)
        {
            return;
        }
        me._submitting = true;

        // 要删除的数据主键。
        var IDs = new Array();
        if ($isArray(p_IDs))
        {
            IDs = p_IDs;
        }
        else
        {
            IDs.add(p_IDs);
        }

        var args =
        {
            cancel : false,
            IDs : IDs
        };

        if ($isString(p_para) || $isNumber(p_para))
        {
            p_path = p_para;
            p_para = null;
        }

        me.trigger("deleting", args);
        if (args.cancel)
        {
            return;
        }
        me._deleteIDs = IDs;
        if (me.type == "remote")
        {
            var delUrl = me._makePath("remove","delete",p_path);
            if ($notEmpty(me.client))
            {
                // 对要删除的数据进行筛选， 剔除尚未保存的数据。
                var delIDs = new Array();
                for ( var i = 0; i < IDs.length; i++)
                {
                    if (me.checkSaved(IDs[i]))
                    {
                        delIDs.add(IDs[i]);
                    }
                }
                if (delIDs.length == 0)
                {
                    _delete_callback(
                    {
                        successful : true
                    });
                }
                else
                {
                    var delPara =
                    {
                        "ids" : delIDs
                    };
                    // 模型驱动的情况下，将 clsID 添加到参数中
                    if ($notEmpty(me.mdaParams))
                    {
                        delPara.clsID = me.mdaParams.clsID;
                    }
                    // 接收自定义删除参数。
                    if ($notEmpty(p_para))
                    {
                        delPara = $.extend(delPara, p_para);
                    }
                    var _post = me._getClientPostMode("remove");
                    _post(delUrl, JSON.stringify(delPara), _delete_callback);
                }
            }
        }
        else if (me.type == "local")
        {
            // 删除本地数据。
            _delete_callback(
            {
                successful : true
            });
        }
    };

    /**
     * @ignore
     */
    base._prepareLocalData = me._prepareLocalData;
    me._prepareLocalData = function(p_data, p_meta, p_para)
    {
        var localResult = base._prepareLocalData(p_data, p_meta);
        // 表格特有的属性，数据总条数。
        localResult.resultValue.itemCount = p_data.length;
        // 表格特有的参数，包含分页信息。
        if ($notEmpty(p_para) && $notEmpty(p_para.pageIndex))
        {
            localResult.resultValue.page = {};
            localResult.resultValue.page.pageIndex = p_para.pageIndex;
            localResult.resultValue.page.pageSize = p_para.pageSize;
        }
        return localResult;
    };

    /**
     * @ignore
     */
    base._parseMeta = me._parseMeta;
    me._parseMeta = function(p_result)
    {
    	base._parseMeta(p_result);
        // 是否有对返回数据有 删除和创建权限
    	if (typeof (p_result.canDel) != "undefined")
    	{
    		me.canDelete = p_result.canDel;
		}
    	if (typeof (p_result.canCreate) != "undefined")
    	{
    		me.canCreate = p_result.canCreate;
    	}
    }
    
    /**
     * @ignore
     */
    base._parseData = me._parseData;
    me._parseData = function(p_result)
    {
        base._parseData(p_result);
        // 记录服务端返回的数据条数。
        me.itemCount = p_result.itemCount;
    };

    /**
     * @ignore
     */
    base._resetNewData = me._resetNewData;
    me._resetNewData = function(p_result)
    {
        // 本方法主要用于保存完成后回写新增数据的主键，同时为 onsaved 事件准备参数。
        var resetArgs = new Object();
        resetArgs.deleteIDs = new Array();
        resetArgs.newData = new Array();
        // 删除带有伪主键的新增数据。
        for ( var itemKey in me._changedItems)
        {
            var changedItem = me._changedItems[itemKey];
            if ($isEmpty(changedItem[me.primaryKey]))
            {
                me.data.remove(me.getEntityByKey(itemKey));
                resetArgs.deleteIDs.add(itemKey);
            }
        }
        // 添加返回结果中带有新主键的新增数据。
        var saveResult = p_result.resultValue.items;
        
        if ($isArray(saveResult))
        {
        	for ( var i = 0; i < saveResult.length; i++)
            {
                var newItem = saveResult[i];
                if ($isEmpty(me.getEntityByKey(newItem[me.primaryKey])))
                {
                    me.data.add(newItem);
                    resetArgs.newData.add(newItem);
                }
            }
        }
        
        return resetArgs;
    };

    /**
     * @ignore
     */
    base._setLoadArgs = me._setLoadArgs;
    me._setLoadArgs = function(p_result)
    {
        var args = base._setLoadArgs(p_result);
        // 当前结果集需要分页，一般只有在加载本地数据时才会有此属性。
        if ($notEmpty(p_result.page))
        {
            var pageIndex = parseInt(p_result.page.pageIndex);
            var pageSize = parseInt(p_result.page.pageSize);
            var startRow = (pageIndex - 1) * pageSize;
            var endRow = pageIndex * pageSize;
            args.items = args.items.slice(startRow, endRow);
        }
        args.itemCount = me.itemCount;
        return args;
    };

    function _delete_callback(p_context)
    {
        me._submitting = false;
        if($isEmpty(p_context)){
        	return;
        }
        if (p_context.successful)
        {
            _delete_success(p_context);
        }
        else
        {
        	_delete_error(p_context);
        }
    }

    function _delete_success(p_result)
    {
        for ( var i = 0; i < me._deleteIDs.length; i++)
        {
            var deleteID = me._deleteIDs[i];
            me.data.remove(me.getEntityByKey(deleteID));
            // 清除已删除数据的变更信息。
            if ($notEmpty(me._changedItems[deleteID]))
            {
                me._changedItems[deleteID] = null;
                delete me._changedItems[deleteID];
            }
            // 清除已删除数据的原始信息。
            if ($notEmpty(me._oldData[deleteID]))
            {
                me._oldData[deleteID] = null;
                delete me._oldData[deleteID];
            }
        }
        var args =
        {
            IDs : me._deleteIDs
        };
        me.trigger("deleted", args);
    }

    function _delete_error(p_context)
    {
        me._showError("DELETING", p_context);
    }

    me.endOfClass(arguments);
    return me;
};
$ns("mx.datacontainers");

$import("mx.datacontainers.EntityContainer");
$import("mx.utils.GUIDUtil");

/**
 * 提供一个供 {@link mx.datacontrols.DataForm} 表单使用的数据容器的类。
 * 
 * @example 以下是一个表单数据容器如何初始化并通过远程服务加载数据的代码示例。 
 * <code language="JavaScript">
 * var container = new mx.datacontainers.FormEntityContainer(
 * {
 *    "baseUrl" : "~/rest/dataType", //定义容器的服务路径，一般与容器的数据类型对应。
 *    "primaryKey" : "user_id" //定义数据的主键列名，如果不指定的话默认为"id"。
 * });
 * container.on("load", function()
 * {
 *    alert("onload");//触发 onload 事件。
 * });
 * container.load("1");//根据指定的主键值加载数据。
 * </code>
 * 
 * @example 以下是一个表单数据容器加载本地数据的代码示例。 
 * <code language="JavaScript">
 * var container = new mx.datacontainers.FormEntityContainer(
 * {
 *    "type" : "local",//声明容器类型为本地数据。
 *    "meta" :
 *     [
 *     {
 *         "name" : "id",
 *         "caption" : "主键"
 *     },
 *     {
 *         "name" : "name",
 *         "caption" : "姓名"
 *     } ], //本地元数据信息。
 *    "data" :
 *    {
 *        id : "12",
 *        name : "本地数据12"
 *    }//一个 JSON 对象，表示要加载的数据。
 * });
 * container.on("load", function()
 * {
 *    alert("onload");//触发 onload 事件。
 * });
 * container.load();
 * </code>
 */
mx.datacontainers.FormEntityContainer = function()
{
    var me = $extend(mx.datacontainers.EntityContainer);
    var base = {};
    
    /**
     * 设置或获取一个 boolean 值，表示表单加载时是否从服务端获取字典信息。
	 * 开发时确定字典信息由前端指定，不需要调用服务时，也可以设置为 false。
     */
	me.loadDicts = true;
    
    /**
     * @ignore
     * 
     * 设置或获取一个 json 对象，包含新增数据时要设置的默认值。
     */
    me.defaultValues = null;
    
    base.init = me.init;
    me.init = function()
    {
        base.init();
    };

    /**
     * 提供一个方法，为数据容器加载数据对象。
     * 
     * @overload function()
     * @overload function(p_ID)
     * @overload function(p_data)
     * @overload function(p_ID, p_data)
     * 
     * @param [p_ID]
     *            一个字符串或数字，表示要加载数据的主键。
     * @param [p_data]
     *            一个 JSON 对象，表示加载数据的过滤条件等参数。
     */
    base.load = me.load;
    me.load = function()
    {
        var args = me._parseArgs(arguments);
        // 通过服务加载数据并且 ID 为空，是新增表单的场景。
        if ($isEmpty(args.path) && me.type == "remote")
        {
        	me._loadData = me.loadDicts;
            // 新增表单时,将字符串参数置为 null。
            args.path = "null";
        }
        base.load(args.path, args.para, args.callBack);
    };

    /**
     * 提供一个方法，根据字段名称获取字段值。
     * 
     * @param p_col
     *            一个字符串，表示要获取值的字段名称。
     */
    me.getValue = function(p_col)
    {
        if ($notEmpty(me.data))
        {
            var v = me.data[p_col];
            if(v === undefined)
            {
                 return _getValueForObject(p_col);
            }
            else
            {
               return v;
            }
        }
        return null;
    };
    
    function _getValueForObject(p_col){
         if($isString(p_col) && p_col.indexOf(".")>-1)
           {
            	 var keys = p_col.split(".");
            	 var o = null;
            	 for(var i=0;i<keys.length;i++)
            	 {
            	      var key = keys[i];
            	      if(i==0)
            	      {
            	         o = me.data[key];
            	      }else if(o)
            	      {
            	         o = o[key]; 
            	      }else{
            	         break;
            	      }
            	 }
            	 return o;
            }
            return null;
    }

    /**
     * 提供一个方法，修改表单中某个字段的值。
     * 
     * @overload function(p_col, p_value)
     * @overload function(p_col, p_value, p_triggerEvent)
     * 
     * @param p_col
     *            要修改的字段名。
     * @param p_value
     *            要修改成的值。
     * @param [p_triggerEvent=false]
     *            一个 Boolean 值，表示是否要触发事件。如果该值为 true，则触发事件；反之则不触发。
     */
    base.setValue = me.setValue;
    me.setValue = function(p_col, p_value, p_triggerEvent)
    {
        return base.setValue(me.data, p_col, p_value, p_triggerEvent);
    };

    /**
     * @ignore
     */
    base._parseData = me._parseData;
    me._parseData = function(p_result)
    {
        if ($isEmpty(p_result) || $isEmpty(p_result.items))
        {
            me.data = {};
        }
        else if ($isArray(p_result.items))
        {
            // 表单只有一条数据，而规约中返回的结果是数组。
            me.data = p_result.items[0];
        }
        else
        {
            me.data = p_result.items;
        }
        if ($isEmpty(me.data))
        {
            me.data = new Object();
        }
        if ($isEmpty(me.data[me.primaryKey]))
        {
            // 没有主键值，新增状态。
            var newPk = mx.utils.GUIDUtil.newGUID();
            me.data[me.primaryKey] = newPk;
            // 创建变更记录对象。
            me._changedItems[newPk] = new Object();
            me._changedItems[newPk].mxVirtualId = newPk;
            //设置默认值
            if($notEmpty(me.defaultValues)){
                for(var defCol in me.defaultValues){
                    me.setValue(defCol, me.defaultValues[defCol]);
                }
            }
        }
        else
        {
	        // 如果是复合对象，则需把对象扁平化。
	        base._parseData({items: [me.data]});
			// 扁平化结果是数组结构，取其中惟一的扁平化对象。
			me.data = me.data[0];
        }
        
        // 表单初始化完成后即进入编辑状态。
        me._startEdit();
    };

    /**
     * @ignore
     */
    me._startEdit = function()
    {
        // 进入编辑状态。
        me.data.setValue = function(p_field, p_value)
        {
            me.setValue(p_field, p_value, true);
        };
    };

    /**
     * @ignore
     */
    me._resetNewData = function(p_result)
    {
        // 将后台保存返回结果更新新增数据的主键。
        var saveResult = p_result.resultValue.items;
        if ($isArray(saveResult) && saveResult.length > 0)
        {
        	//后端可能返回整条数据，也可能是部分字段
            me.data = $.extend(me.data, saveResult[0]);
        }
        return saveResult;
    };
    
    /**
     * 获取数据容器的操作状态是否为新增。
     */
    me.isCreate = function()
    {
        return $notEmpty(me.data) && !me.checkSaved(me.data[me.primaryKey]);
    }

    me.endOfClass(arguments); 
    return me;
};
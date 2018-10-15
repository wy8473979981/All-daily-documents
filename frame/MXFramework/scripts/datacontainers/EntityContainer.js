$ns("mx.datacontainers");

$import("mx.datacontainers.EntityContainerBinder");
$import("mx.rpc.RESTClient");
$import("mx.utils.GUIDUtil");

/**
 * 提供一个数据容器的基类。
 * <p>
 * 在 MXFramework 中，使用数据容器作为数据源提供给 {@link mx.datacontrols.DataGrid} 、
 * {@link mx.datacontrols.DataForm} 和 {@link mx.datacontrols.DataTree} 等数据控件。
 * 数据源中的实际数据对象值封装为数据源的 {@link data} 属性； 同时，数据对象的字段类型和校验信息等内容封装为数据源的
 * {@link meta} 属性。
 * </p>
 */
mx.datacontainers.EntityContainer = function()
{
    var me = $extend(MXComponent);
    /**
     * 设置一个 JSON，保存父类的引用。
     */
    var base = {};

    /**
     * 获取数据容器的类型。必须在创建数据容器时设定该属性。
     * <p>
     * 该字段可选的值包括：
     * <ul>
     * <li><b>remote</b></li>
     * <li><b>local</b></li>
     * </ul>
     * </p>
     * 
     * @default remote
     */
    me.type = "remote";

    /**
     * 获取数据容器的资源 URL。请参见 {@link mx.rpc.RESTClient.baseUrl}。
     * {@link type}属性值为remote，{@link baseUrl}属性必须设置，否则可以不用设置
     */
    me.baseUrl = null;

    /**
     * 获取或设置一个 JSON 对象，表示数据容器中各种操作的 path 集合。该字段的字段名表示操作类型，值表示操作路径。
     * 用户可以根据需要改变改变相应的操作路径。
     * <p>
     * 该字段的字段名包括：
     * <ul>
     * <li><b>meta</b></li>
     * <li><b>data</b></li>
     * <li><b>save</b></li>
     * <li><b>remove</b></li>
     * </ul>
     * 当actions中设置某一个属性则会使用action属性的值作为本次请求的操作路径
     * 即将action属性的值作为请求的基准路径。如：actions:{remove:"~/mxcasetest/rest/user/"},
     * 则在me.remove()时会使用~/mxcasetest/rest/user/作为请求的路径，不再使用baseUrl。
     * </p>
     */
    me.actions = {};
    
    var _clientMap = {};
    
    /**
     * @ignore
     * 设置或者获取是否使用action中相应的值作为baseUrl覆盖原有的baseUrl
     * @default false
     */
    me.actionOverideBaseUrl = false;
    
    /**
     * 设置或者获取数据容器是否使用post方式提交查询服务，true：post方式 false：get方式
     * @default false
     */
    me.loadByPost = false;

    /**
     * 获取或设置一个 JSON 对象，用于保存模型驱动所需要的参数。
     */
    me.mdaParams = null;

    /**
     * 获取数据容器的 REST 服务客户端 {@link mx.rpc.RESTClient}，数据容器通过此客户端调用后台服务。
     */
    me.client = null;

    /**
     * 获取一个对象，表示数据容器中的数据值，通常为一个 JSON 对象或数组。
     */
    me.data = null;

    /**
     * 获取一个数组，表示数据容器中的元数据信息，通常包含各个字段的类型及校验信息等内容。
     */
    me.meta = null;

    /**
     * 获取一个数组，表示数据容器中的数据字典。通过字段名称可以获取该字段对应的所有数据字典。
     */
    me.dicts = null;

    /**
     * 获取一个字符串，表示数据的主键（或唯一标识）所在列名。
     * 
     * @default id
     */
    me.primaryKey = "id";

    /**
     * 获取一个 Boolean 值，表示数据容器中是否存在修改过但未保存的数据。 当 {@link insertEntity} 和
     * {@link updateEntity} 方法被调用时，该字段被置为true；当 {@link save}
     * 方法被调用时，该字段被还原为false。
     * 
     * @default false
     */
    me.changed = false;

    /**
     * 一个 boolean 值，表示当前数据容器是否有元数据信息。 少数控件比如树没有元数据信息时，子类重写成 false。
     * 开发时确定元数据信息由前端指定，不需要调用服务时，也可以设置为 false。
     * 
     * @default true
     */
    me.loadMeta = true;

	/**
     * 获取或设置一个 boolean 值，表示当前数据容器是否加载本地数据时使用加载提示动画。
     */
    me.enableLocalMask = false;
    
    /**
     * 获取或设置一个字符串，表示当前容器的操作权限，请求加载请求元数据是传给服务。 
     */
    me.iscID = null;
    
    /**
     * 获取一个 boolean 值，表示当前数据容器是否允许编辑。
     * 
     * @default true
     */
    me.canModify = true;
    
    /**
     * 当数据容器开始加载数据时，将触发该事件。调用 {@link load} 方法时会触发该事件。
     * 
     * @param cancel
     *            一个 Boolean 值，表示是否中止当前的加载动作。
     */
    me.onloading = null;

    /**
     * 当数据容器加载数据成功后，将触发该事件。调用 {@link load} 方法后会触发该事件。
     * 
     * @param columns
     *            一个数组，表示此次加载结果中的元数据信息。
     * @param items
     *            一个数组，表示此次加载的数据结果。
     */
    me.onload = null;

    /**
     * 当数据容器中的数据值发生改变的时候，将触发该事件。
     * 
     * @param cancel
     *            一个 Boolean 值，表示是否中止事件。
     * @param entity
     *            一个 JSON 对象，表示发生值改变的数据对象。
     * @param fieldName
     *            一个字符串，表示发生值改变的列名。
     * @param oldValue
     *            变更之前的值。
     * @param newValue
     *            变更之后的值。
     */
    me.onchanging = null;

    /**
     * 当数据容器中的数据值发生改变后，将触发该事件。
     * 
     * @param cancel
     *            一个 Boolean 值，表示是否中止事件。
     * @param entity
     *            一个 JSON 对象，表示发生值改变的数据对象。
     * @param fieldName
     *            一个字符串，表示发生值改变的列名。
     * @param value
     *            变更之后的值。
     */
    me.onchanged = null;

    /**
     * 当数据容器中的数据对象保存时，将触发该事件。调用 {@link save} 方法会触发该事件。
     * 
     * @param cancel
     *            一个 Boolean 值，表示是否中止事件。
     * @param data
     *            当前数据容器中的数据。
     */
    me.onsaving = null;

    /**
     * 当数据容器中的数据对象保存成功后，将触发该事件。调用 {@link save} 方法会触发该事件。
     * 
     * @param result
     *            一个数组，包含保存的数据结果。
     */
    me.onsaved = null;
    
    /**
     * 当数据容器中的数据对象保存时，如果服务端校验不通过，将触发该事件。
     * 要求服务端在保存失败的时候返回的数据格式如下所示。
     * {successful: false, resultValue:
     * [[
     * {"error":true,"errors":["最后使用时间格式不正确！"],"errorsToDefaulFormatString":"最后使用时间格式不正确！\n","fieldName":"lastTime","messages":[],"msgToDefaulFormatString":""},
     * {"error":true,"errors":["必须为整数，介于0-10000之间"],"errorsToDefaulFormatString":"必须为整数，介于0-10000之间\n","fieldName":"pointCount","messages":[],"msgToDefaulFormatString":""}
     * ]]
     * ,resultHint: ""}
     * ，其中嵌套数组表示一条记录的校验结果，数组内的 JSON 表示一个字段的检验结果。
     */
    me.onvalidate = null;

    /**
     * 当出现错误时，将触发该事件。主要用于取消等待蒙板。
     * 
     * @param message
     *            一个包含错误信息的字符串。
     */
    me.onerror = null;

    // 记录发生变化的行列值信息。
    me._changedItems = {};

    // 记录发生变化的行列原始值信息。
    me._oldData = {};

    // 用于记录最近一次查询使用的参数，作为下次查询的默认参数。
    me._loadDataPara = {};
    me._loadMetaPara = {};

    // 一个 Boolean 值，表示当前数据容器是否正在进行后台处理。
    // 正在进行后台处理的容器不会响应后来的加载、保存等操作，防止多个服务并发可能出现的 bug。
    // 此处理为权宜之计，以后可能会调优成更好的方式。
    me._submitting = false;
    // 记录上次加载的数据类型信息，用于判断是否需要加载元数据。
    me._lastLoad = {};
    // 用于为 获取数据与元数据的两个回调函数提供共享信息。
    me._tempLoadResult = null;
    // 记录本次加载是否改变了数据类型。
    me._changingType = false;
    // 标记本次加载是否通过服务加载数据，特殊情况如初始化新增表单不需要加载服务时可能用到。
    // 本标记是一次性标志，每次加载完成后都会置为 true，保证下次加载是默认加载数据的。
    me._loadData = true;
    // 记录传入的加载回调函数，在触发 onload 事件后执行。
    me._loadCallBack = null;
    // 记录传入的保存回调函数，在保存时，触发 onsaved 事件前执行。
    me._saveCallBack = null;
	
    var _json2flat = null;
    
    // 加载本地数据时的对象控制变量。
    var pendingCall = { timeStamp: null, procID: null };
    
    base.init = me.init;
    me.init = function()
    {
        base.init();
        if (me.type == "remote")
        {
            me.setBaseUrl(me.baseUrl);
        }
            
  	    _json2flat = mx.datacontainers.JSON2Flat({
  	     	meta: me.meta
  	     });
        //_initActions();
    };

    /**
     * 设置 {@link baseUrl} 字段的值。
     */
    me.setBaseUrl = function(p_url)
    {
        me.baseUrl = p_url;
        p_url = mx.mappath(me.baseUrl);
        if ($isEmpty(p_url))
        {
            me.client = null;
        }
        else if ($isEmpty(me.client))
        {
            me.client = new mx.rpc.RESTClient(
            {
                baseUrl : p_url,
                mode: "queue"
            });
        }
        else
        {
            me.client.setBaseUrl(p_url);
        }
    };

    /**
     * 为数据容器加载数据对象。 此方法主要供数据控件调用，一般情况下，不推荐开发人员在业务代码中调用此方法；
     * 特殊情况如多个数据控件绑定同一个数据源时除外。
     * 
     * @overload function()
     * @overload function(p_path)
     * @overload function(p_data)
     * @overload function(p_path, p_data)
     * @overload function(p_path, p_data, p_callBack)
     * @param [p_path]
     *            指定的 REST 服务路径，请参见 {@link mx.rpc.RESTClient.send} 方法。
     * @param [p_data]
     *            一个 JSON 对象，表示加载数据的过滤条件等参数。
     * @param [p_callBack]
     *            一个 方法，表示加载成功后的回调函数。
     */
    me.load = function()
    {
        if (me._submitting)
        {
            return;
        }
        me._submitting = true;
        // 由于各数据容器参数情况不同，同一数据容器的参数也有若干重载情况，此处对参数按类型解析，不判断先后顺序。
        var args = me._parseArgs(arguments);
        var p_path = args.path;
        var p_data = args.para;
        var p_callBack = args.callBack;

        // 保存参数中的回调函数，在加载完成后执行。
        // 此处存在时序 BUG。频繁加载时，最后的回调函数会覆盖之前的，可能会引起异常。
        // 鉴于这种情况出现几率较小，暂时保留此处理方式。
// commented by tiger on 2014/12/10 17:05:52,去掉此种方式        
//        if ($notEmpty(p_callBack))
//        {
//            me._loadCallBack = p_callBack;
//        }
//        else
//        {
//            me._loadCallBack = null;
//        }
//end commented

        var loadingArgs =
        {
            cancel : false
        };
        loadingArgs = $.extend(loadingArgs, me._setLoadingArgs());
        me.trigger("loading", loadingArgs);
        if (loadingArgs.cancel)
        {
            return;
        }
        // 加载之前清空变更信息。
        me.clearChanges();

        // 对参数进行解析，区分加载数据和元数据的参数
        var dataPara = {};
        var metaPara = {};
        if ($notEmpty(p_data))
        {
            // 标识当前参数是否区分数据参数和元数据参数的格式。
            var structured = false;
            if ($notEmpty(p_data.dataParams))
            {
                structured = true;
                dataPara = p_data.dataParams;
            }
            if ($notEmpty(p_data.metaParams))
            {
                structured = true;
                metaPara = p_data.metaParams;
            }
            if (!structured)
            {
                // 如果参数没有格式，则作为数据参数。
                dataPara = p_data;
            }
        }

        if (me.type == "remote")
        {
            if ($notEmpty(me.client))
            {
                // 判断数据类型是否有改变。
                me._changingType = _checkTypeChanged();

                // 数据类型改变，参数以最新为准。
                me._loadDataPara = dataPara;
                me._loadMetaPara = metaPara;

                // 模型驱动的情况下，将 clsID 添加到参数中
                if ($notEmpty(me.mdaParams))
                {
                    me._loadDataPara.clsID = me.mdaParams.clsID;
                    me._loadMetaPara.clsID = me.mdaParams.clsID;
                }
                
                // 清空以前加载的结果。
                me._tempLoadResult = null;
                // 如果数据类型发生改变，需要重新加载元数据。
                if (me._changingType && me.loadMeta)
                {
                    // 根据规约，在类型 URL 后面加上 meta 作为获取元数据的服务地址。
                	var metaPath = me._makePath("meta","meta",null);
                	if($notEmpty(me.iscID) && me.iscID != "-1"){
                		metaPath = (metaPath == null) ? ("/" + me.iscID) : (metaPath + "/" + me.iscID);
                	}
                	// 根据 me.client 属性的 async 属性，设置调用方式是否同步。
                    var _get = _getClientCallMode("meta");

//updated by tiger on 2014/12/10 17:04:09,load()的回调函数跟随AJAX的回调方法走，不使用全局变量，保持一致
//                    _get(metaPath,
//                    {
//                        "params" : JSON.stringify(me._loadMetaPara)
//                    }, _load_meta_callback);
                    _get(metaPath,
                    {
                        "params" : JSON.stringify(me._loadMetaPara)
                    }, function(p_context){
                   		_load_meta_callback(p_context, p_callBack);                    	
                    });
//end updated

                }
                // 一般情况下数据是无条件加载的，特殊情况如初始化新增表单时，可能不需要加载数据。
                if (me._loadData)
                {
                	var restPath = me._makePath("data",null,p_path);
                	var _get = me.loadByPost ? me._getClientPostMode("data") : _getClientCallMode("data");

//updated by tiger on 2014/12/10 17:04:09,load()的回调函数跟随AJAX的回调方法走，不使用全局变量，保持一致
//                	_get(restPath,
//					{
//						"params" : JSON.stringify(me._loadDataPara)
//					}, _load_data_callback);
                	_get(restPath,
					{
						"params" : JSON.stringify(me._loadDataPara)
					}, function(p_context){
						_load_data_callback(p_context, p_callBack);	
					});
//end updated					
                }
                else
                {
                    // 模拟加载结果为空数据的情况。
                    // 目前只用于表单第二次进入新增状态时清空已有数据。
                    var tempContext = {};
                    tempContext.successful = true;
                    tempContext.resultValue = {};
                    tempContext.resultValue.items = null;
                    
					//updated by tiger on 2014/12/10 17:11:37
                    //_load_data_callback(tempContext);
                    _load_data_callback(tempContext, p_callBack);
                    //end updated
                }
            }
        }
        else if (me.type == "local")
        {
            // 加载本地数据。
            var localData = me.data;
            var localMeta = me.meta;
            me.data = null;
            me.meta = null;
            // 将本地数据信息模拟成与后台服务返回结果一样的格式。
            // 各数据容器的服务返回结果格式可能不同，因此模拟过程也可能不同。
            var localCall = function () {
                _load_success(me._prepareLocalData(localData, localMeta, dataPara), p_callBack);
            }

            if (me.enableLocalMask)
            {
                var timeStamp = new Date().getTime();
                if (pendingCall.procID) {
                    clearTimeout(pendingCall.procID)
                };
                pendingCall = { timeStamp: timeStamp, procID: setTimeout(localCall, 500) };
            }
            else
            {
                localCall();
            }
        }
    };
    
    /**
     * 
     * @ignore
     */
    me._makePath = function(p_action,p_defautAction,p_path){
    	var actionPath = (p_action in me.actions) ? me.actions[p_action] : null;
    	if($notEmpty(actionPath)){
    		if(!(p_action in _clientMap))
    			_clientMap[p_action] = new mx.rpc.RESTClient({mode: "queue"});
    		_clientMap[p_action].setBaseUrl(actionPath);
    		return p_path;
    	}
    	return p_path || p_defautAction;
    }

    /**
     * 提供一个方法，修改表单中某个字段的值。
     * 
     * @overload function(p_entity, p_col, p_value)
     * @overload function(p_entity, p_col, p_value, p_triggerEvent)
     * @param p_entity
     *            一个 json 对象，表示要修改的数据容器中的一条数据。
     * @param p_col
     *            要修改的字段名。
     * @param p_value
     *            要修改成的值。
     * @param [p_triggerEvent=true]
     *            一个 Boolean 值，表示是否要触发事件。如果该值为 true，则触发事件；反之则不触发。
     */
    me.setValue = function(p_entity, p_col, p_value, p_triggerEvent)
    {
    	if (p_triggerEvent == undefined)
    	{
    		p_triggerEvent = true;
    	}
    	
    	if (!me.canModify)
    	{
    		// 没有权限
    		me._notAllowedTip();
    		return;
    	}
    	
    	if ($isEmpty(p_entity))
    	{
    		return;
    	}
    	
        var args =
        {
            cancel : false,
            entity : p_entity,
            fieldName : p_col,
            oldValue : p_entity[p_col],
            newValue : p_value
        };
        if (p_triggerEvent)
        {
            me.trigger("changing", args);
        }
        if (args.cancel)
        {
            return;
        }
        // 获取要改变数据的主键。
        var dataPk = p_entity[me.primaryKey];

        if ($isEmpty(me._oldData[dataPk]))
        {
            // 准备存放原始值的对象，可能用于撤销。
            me._oldData[dataPk] = {};
        }
        if ($isEmpty(me._changedItems[dataPk]))
        {
            // 准备存放变更信息的对象。只有修改状态的数据才可能执行此分支。
            me._changedItems[dataPk] = {};
            // 修改状态的数据要将主键提交给后台服务。
            me._changedItems[dataPk][me.primaryKey] = dataPk;
        }

        var entityOldData = me._oldData[dataPk];
        if (!entityOldData[p_col])
        {
            // 记录被修改字段最后一次加载或保存后的原始值，不记录修改过程中产生的数据。
            entityOldData[p_col] = p_entity[p_col];
        }
        p_entity[p_col] = p_value;

        // 记录修改的内容。
        me._changedItems[dataPk][p_col] = p_value;
        me.hasChanged(true);
        args =
        {
            entity : p_entity,
            fieldName : p_col,
            value : p_entity[p_col]
        };
        if (p_triggerEvent)
        {
            me.trigger("changed", args);
        }
        
        return p_entity;
    };

    /**
     * 调用后台服务，将新增和修改的内容保存到数据库。 保存前会调用 {@link validate} 方法检查数据值是否合法。
     * 
     * @overload function()
     * @overload function(p_path)
     * @param [p_path]
     *            指定的 REST 服务路径，请参见 {@link mx.rpc.RESTClient.post} 方法。
     */
    me.save = function()
    {
        if (!me.changed)
        {
            // 没有变更过的信息。
            return;
        }
        // 阻止服务并发。
        if (me._submitting)
        {
            return;
        }
        
        // 由于各数据容器参数情况不同，同一数据容器的参数也有若干重载情况，此处对参数按类型解析，不判断先后顺序。
        var args = me._parseArgs(arguments);
        var p_path = args.path;
        var p_data = args.para;
        var p_callBack = args.callBack;

        // 保存参数中的回调函数，在加载完成后执行。
        // 此处存在时序 BUG。频繁加载时，最后的回调函数会覆盖之前的，可能会引起异常。
        // 鉴于这种情况出现几率较小，暂时保留此处理方式。
//updated by tiger on 2014/12/10 17:29:24,保存的回调函数应和AJAX同步走，消除使用全局一个保存回调
//函数造成的潜在冲突隐患
//        if ($notEmpty(p_callBack))
//        {
//            me._saveCallBack = p_callBack;
//        }
//        else
//        {
//            me._saveCallBack = null;
//        }
//end updated
        
        var savePara = JSON.stringify(_parseSavePara(p_data));

        var args =
        {
            cancel : false,
            data : me.data,
            param: savePara
        };

        me.trigger("saving", args);
        if (args.cancel)
        {
            return;
        }
        var restPath = me._makePath("save","save",p_path);
        if ($notEmpty(me.client))
        {
        	var _post = me._getClientPostMode("save");
        	//updated by tiger on 2014/12/10 17:31:30
        	//_post(restPath, savePara, _save_callback);
        	_post(restPath, savePara, function(p_context){
        		_save_callback(p_context, p_callBack);
        	});
        	//end update
            
            me._submitting = true;
        }
    };

    /**
     * 提供一个方法，用于跟另外一个数据容器绑定，达到数据同步的效果。
     * 
     * @param p_target
     *            一个数据容器，表示要跟当前容器绑定以保持数据同步。
     */
    me.bind = function(p_target)
    {
        mx.datacontainers.EntityContainerBinder.bind(me, p_target);
    };

    /**
     * @deprecated 
     * 提供一个方法，获取数据容器中已改变但未保存的内容对象。     * 
     * 不再建议使用。
     */
    me.getChanges = function()
    {
        return me._changedItems;
    };
    
    /**
     * 提供一个方法，获取数据容器中已改变但未保存的对象数组，对象中仅包含改变的对象属性及值。
     */
    me.getChangedItems = function()
    {
    	var items = [];
    	
    	jQuery.each(me._changedItems, function(index, val) {
    		items.add(val);
        });
    	
    	return items;
    }

    /**
     * 获取或者设置 {@link mx.datacontainers.EntityContainer.changed} 字段的值。
     */
    me.hasChanged = function(p_changed)
    {
        if (arguments.length > 0)
        {
            me.changed = p_changed;
        }
        return me.changed;
    };

    /**
     * 提供一个方法，清除容器中记录的数据改变信息。
     */
    me.clearChanges = function()
    {
        // 重置变更标记。
        me.hasChanged(false);
        // 清空记录的变更信息。
        me._changedItems = {};
        // 清空修改产生的原始值信息。
        me._oldData = {};
    };

    /**
     * 提供一个方法，检查指定数据是否保存过。true 表示数据为修改状态；false表示数据为新增状态，尚未保存。
     * 
     * @param p_id
     *            一个数字或字符串，表示要检查的数据主键值。
     */
    me.checkSaved = function(p_id)
    {
        var isSaved = true;
        if ($notEmpty(me._changedItems[p_id]))
        {
            if ($isEmpty(me._changedItems[p_id][me.primaryKey]))
            {
                isSaved = false;
            }
        }
        return isSaved;
    };

    /**
     * @ignore
     */
    // 由于各数据容器参数情况不同，同一数据容器的参数也有若干重载情况，此处对参数按类型解析，不判断先后顺序。
    me._parseArgs = function(p_args)
    {
        var loadArgs = {};

        if ($notEmpty(p_args))
        {
            for ( var i = 0; i < p_args.length; i++)
            {
                if (p_args[i] == undefined)
                {
                    continue;
                }
                else if ($isString(p_args[i]) || $isNumber(p_args[i]))
                {
                    // 字符串或数字，表示要拼接到服务地址中的内容。
                    loadArgs.path = p_args[i];
                }
                else if ($isFunction(p_args[i]))
                {
                    // 方法体表示加载动作完成后的回调函数。
                    loadArgs.callBack = p_args[i];
                }
                else if ($notEmpty(p_args[i]))
                {
                    loadArgs.para = p_args[i];
                }
            }
        }
        return loadArgs;
    };
    
    /**
     * 提供一个方法，获取待保存的表单数据。
     * @ignore
     */
    me._getSavingData = function()
    {
    	return JSON.stringify(_parseSavePara());
    }
    
    /**
     * 将本地数据信息模拟成与后台服务返回结果一样的格式。
     * 各数据容器的服务返回结果格式可能不同，因此模拟过程也可能不同。
     * @ignore
     */
    me._prepareLocalData = function(p_data, p_meta, p_para)
    {
        var localResult = {};
        // 将本地数据转换为与远程服务规约相同的数据格式。
        localResult.resultValue = {};
        if ($isArray(p_data))
        {
            localResult.resultValue.items = p_data;
        }
        else
        {
            // 本地数据不是数组时（如form），转换为数组。
            localResult.resultValue.items = new Array();
            localResult.resultValue.items.add(p_data);
        }
        
        if ($isArray(me.dicts))
        {
        	localResult.resultValue.dicts = me.dicts;
        }
        
        // 本地元数据信息可能为空。
        if ($notEmpty(p_meta))
        {
            localResult.resultValue.columns = p_meta;
        }
        return localResult;
    };
    
    /**
     * 解析元数据，子类不全部相同
     * @ignore
     */
    me._parseMeta = function(p_result)
    {
    	 // 元数据可能为空。
        if ($notEmpty(p_result.columns))
        {
            me.meta = p_result.columns;
            _json2flat.setMeta(me.meta);
        }
    	 if (typeof (p_result.canModify) != "undefined")
    	{
    		 me.canModify = p_result.canModify;
		}
    }

    /**
     * 将服务返回结果写入容器的属性中。
     * 各容器的查询服务返回值格式及容器本身属性有所差别。
     * @ignore
     */
    me._parseData = function(p_result)
    {
        me.data = _json2flat.jsonFlat(p_result.items);
    };

    /**
     * @ignore
     */
    me._parseDicts = function(p_result)
    {
        me.dicts = p_result.dicts;
        if ($isArray(me.dicts))
        {
            for ( var i = 0; i < me.dicts.length; i++)
            {
                var dict = me.dicts[i];
                if ($.isPlainObject(dict) && typeof (dict.name) != "undefined" && typeof (dict.values) != "undefined")
                {
                    me.dicts[dict.name] = dict.values;
                }
            }
        }
    };

    /**
     * 根据保存服务返回结果定义 onsaved 事件的参数，同时回写新增数据的主键。
     * 各数据控件为新增数据回写主键的处理方式可能不同。
     * @ignore
     */
    me._resetNewData = function(p_result)
    {
        return p_result.resultValue.items;
    };

    /**
     * 为 onload 事件准备参数。各数据控件的事件参数格式可能有差别。
     * @ignore
     */
    me._setLoadArgs = function(p_result)
    {
        var args = {};
        args.columns = me.meta;
        args.items = me.data;
        return args;
    };

    /**
     * 处理错误信息。
     * @ignore
     */
    me._showError = function(p_msgKey, p_context)
    {
    	var msg, errorPage;
    	if($.isPlainObject(p_context))
    	{
    		var msg = p_context.resultHint || mx.msg("ERR_UNKNOWN");
    		var errorPage = p_context.errorPage;
    	}
    	else
    	{
    		p_context = {type:"error"};
    		msg = mx.msg("ERR_UNKNOWN");
    	}
    	// 取消提交状态，否则后续提交动作都无法执行。
    	me._submitting = false;
    	// 抛出事件。
    	var args =
    	{
			"message" : msg,
			cancel : false
    	};
    	me.trigger("error", args);
    	
    	if (args.cancel)
    	{
    		return;
    	}
    	if (p_context.type != "error") 
    	{
    		if (p_context.type == "warn" || p_context.type == "info")
    		{
    			mx.indicate(p_context.type, msg);
    		}
    		else if (typeof(p_context.error) != "undefined" && p_context.error == "timeout")
    		{
    		    mx.indicate("error", mx.msg("REQUEST_TIMEOUT"));
    		}
    		else
    		{
    			mx.indicate("info", msg);
    		}
		}
    	else
    	{
	        // 弹出错误提示窗口。
	        mx.showerror(new Error(mx.err(p_msgKey,
	        [ msg ])), errorPage);
    	}
    };
    
    /**
     * @ignore
     */
    me._notAllowedTip = function()
    {
    	var msg = mx.msg("OPERATION_NOT_ALLOWED");
		var args =
    	{
		    "message" : msg,
			cancel : false
    	};
    	me.trigger("error", args);
    	if (args.cancel)
    	{
    		return;
    	}
		mx.indicate("warn", msg);
    };
    
    /**
     * @ignore
     */
    me._setLoadingArgs = function()
    {
        return {};
    };
    
    /**
     * @ignore
     */
    me._getJsonFlatter = function()
    {
    	return _json2flat;
    }
    
    function _initActions()
    {
    	me.actions["meta"] = me.actions["meta"] ? me.actions["meta"] : "meta";
    	me.actions["data"] = me.actions["data"] ? me.actions["data"] : null;
    	me.actions["save"] = me.actions["save"] ? me.actions["save"] : "save";
    	me.actions["remove"] = me.actions["remove"] ? me.actions["remove"] : "delete";
    }

    // 加载之前，判断数据类型是否有改变，用于控制是否加载元数据。
    function _checkTypeChanged()
    {
        // 没有元数据的数据控件。
        if (!me.loadMeta)
        {
            return false;
        }
        var loadMeta = false;
        if (me._lastLoad.url != me.baseUrl)
        {
            // 自定义开发模式下，基础 URL 改变说明数据类型发生了变化。
            me._lastLoad.url = me.baseUrl;
            loadMeta = true;
        }
        if ($notEmpty(me.mdaParams))
        {
            if (me._lastLoad.clsID != me.mdaParams.clsID)
            {
                // 模型驱动开发模式下，clsID 不同说明数据类型发生了变化。
                me._lastLoad.clsID = me.mdaParams.clsID;
                loadMeta = true;
            }
        }
        else if ($notEmpty(me._lastLoad.clsID))
        {
            // 模型驱动变为自定义开发模式，说明数据类型发生了变化。
            me._lastLoad.clsID = null;
            loadMeta = true;
        }
        return loadMeta;
    }

    // 加载数据服务的回调函数。
    function _load_data_callback(p_context, p_callBack)
    {
        if ($isEmpty(p_context))
            return;
        if (p_context.successful)
        {
            // 定义一个标志，判断元数据是否已经加载好。
            var metaReady = false;
            if ($isEmpty(me._tempLoadResult))
            {
                // 临时结果对象不存在，说明加载元数据的服务尚未完成。
                me._tempLoadResult = p_context;
            }
            else
            {
                // 临时结果对象已存在，说明元数据服务已经回调成功。
                metaReady = true;
                // 将数据信息附加到结果对象中。
                _mergeResult(me._tempLoadResult, p_context);
            }
            // 如果加载的数据类型没有改变（不需要加载元数据）或者元数据已经加载完毕，则按加载成功处理。
            if (!me._changingType || metaReady)
            {
                _load_success(me._tempLoadResult, p_callBack);
            }
        }
        else
        {
            _load_error(p_context);
        }
    }

    // 加载元数据的回调函数。
    function _load_meta_callback(p_context, p_callBack)
    {
        if ($isEmpty(p_context))
            return;
        if (p_context.successful)
        {
            // 服务端元数据指定了主键的情况，以服务端为准
            if ($notEmpty(p_context.resultValue.primaryKey))
            {
                me.primaryKey = p_context.resultValue.primaryKey;
            }
            // 定义一个标志，判断数据服务是否已加载成功。
            var dataReady = false;
            if ($isEmpty(me._tempLoadResult))
            {
                // 临时结果对象不存在，数据服务尚未加载完成。
                me._tempLoadResult = p_context;
            }
            else
            {
                // 临时结果对象已存在，说明数据服务已经加载成功。
                dataReady = true;
                // 将元数据信息附加到结果对象中。
                _mergeResult(me._tempLoadResult, p_context);
            }
            
            // 如果当前不需要加载数据（如新增表单）或者数据已经加载完成，执行加载成功处理。
            if (!me._loadData || dataReady)
            {
                _load_success(me._tempLoadResult, p_callBack);
            }
        }
        else
        {
            _load_error(p_context);
        }
    }

    function _load_success(p_result, p_callBack)
    {   	
        me._submitting = false;
        // 判断返回结果，不允许 itmes 属性为 null ，至少是空数组或者空对象。
        if ($isEmpty(p_result.resultValue))
        {
            throw new Error(mx.err("RESULT_VALUE_EMPTY"));
        }
        // 将服务返回结果写入容器的属性中。
        // 各容器的查询服务返回值格式及容器本身属性有所差别。
        me._parseDicts(p_result.resultValue);
        me._parseMeta(p_result.resultValue);
        me._parseData(p_result.resultValue);
        me._loadData = true;
        // 为 onload 事件准备参数。各数据控件的事件参数格式可能有差别。
        var args = me._setLoadArgs(p_result.resultValue);
        // 加载的数据不为空时，才可以触发load事件
        me.trigger("load", args);	
        
//updated by tiger on 2014/12/10 17:13:17, 使用传递的回调函数        
//        if ($notEmpty(me._loadCallBack))
//        {
//            me._loadCallBack(args);
//        }
        if ($notEmpty(p_callBack))
        {
            p_callBack(args);
        }
//end update
    }

    function _load_error(p_context)
    {
    	me._lastLoad.url = null;
    	me._lastLoad.clsID = null;
        me._showError("LOADING", p_context);
    }

    function _save_callback(p_context, p_callBack)
    {
    	me._submitting = false;
    	if($.isPlainObject(p_context))
    	{
	        // 保存回调函数
//updated by tiger on 2014/12/10 17:34:17,使用传入的回调函数，而非全局回调函数	        
//	        if ($notEmpty(me._saveCallBack))
//	        {
//	            me._saveCallBack(p_context);
//	        }
	        if ($notEmpty(p_callBack))
	        {
	            p_callBack(p_context);
	        }
//end updated	        

	        if (p_context.successful)
	        {
	            _save_success(p_context);
	        }
	        else
	        {
	        	if ((p_context.type == "info" || p_context.type == "warn") && $isArray(p_context.resultValue))
	        	{
	        		me.trigger("validate", {result: p_context.resultValue});
	        	}
	        	else
	        	{
	        		me._showError("SAVING", p_context);	
	        	}
	        }
    	}
    	else
    	{
    		// 未指明的错误。
    		me._showError("SAVING");
    	}
    }

    function _save_success(p_result)
    {
        // 根据保存服务返回结果定义 onsaved 事件的参数，同时回写新增数据的主键。
        // 各数据控件为新增数据回写主键的处理方式可能不同。
        var saveResult = me._resetNewData(p_result);
        // 清除变更记录。
        me.clearChanges();
        var args = {p_result: p_result};
        args.result = saveResult;
        me.trigger("saved", args);
    }

    // 将 Map 结构的变更信息转换成数组。
    function _parseSavePara(p_data)
    {
        // 根据规约，保存参数是一个 JSON 对象。
        if ($isEmpty(p_data))
        {
            p_data = {};
        }
        // 对象里面是一个 JSON 数组，数组中每个元素表示一条数据。
        if (!$isArray(p_data.items))
        {
        	p_data.items = new Array();

	        for (var itemKey in me._changedItems)
	        {
	            p_data.items.add(me._changedItems[itemKey]);
	        }
	        p_data.items = _json2flat.jsonHierarchy(p_data.items);
        }
        else
        {
        	$.each(p_data.items, function(i, item){
        		delete item.mxVirtualId;
        	});
        }
        // 模型驱动的情况下，将 clsID 添加到参数中
        if ($notEmpty(me.mdaParams))
        {
            p_data.clsID = me.mdaParams.clsID;
        }

        return p_data;
    }

    // 将两个服务的结果集合并。
    function _mergeResult(temp, newRes)
    {
        temp.resultValue = $.extend(temp.resultValue, newRes.resultValue);
    }
    
    function _getClientCallMode(p_action)
    {
    	var client = _getClient(p_action);
    	return (me.client.async == null || me.client.async == true) ? client.get : client.getSync;
    }
    
    /**
     * @ignore
     */
    me._getClientPostMode = function(p_action){
    	var client = _getClient(p_action);
    	return client.post;
    }
    
    function _getClient(p_action){
    	var client = me.client;
    	if(p_action in _clientMap)
    		client = _clientMap[p_action];
    	return client;
    }

    me.endOfClass(arguments);
    return me;
};

/**
 * 提供将分层数据扁平化的功能。
 * 
 * @ignore
 */
mx.datacontainers.JSON2Flat = function()
{
	var me = $extend(MXComponent);
	var base = {};
	
	me.meta = null;
	
	var names = [];
	
	base.init = me.init;
	me.init = function()
	{
		base.init();
		_init();
	};
	
	me.setMeta = function(p_meta)
	{
		if ($isEmpty(p_meta))
		{
			return
		}
		me.meta = p_meta;
	    names = jsonPath(me.meta, "$.*.name");
		$.each(names, function(index, name){
			if ($notEmpty(name) && name.contain("."))
			{
				names[index] = name.split(".");
			}
		});
	}
	
	me.clear = function()
	{
		me.meta = null;
		names = [];
	}
	
	/**
	 * 实现JSON对象的扁平化
	 */
	me.jsonFlat = function(p_data)
	{
		if ($isArray(p_data))
		{
			$.each(p_data, function(index, item)
		    {
				_jsonFlat(item);
			});
		}
		else if ($.isPlainObject(p_data))
		{
			_jsonFlat(p_data)
		}
		return p_data;
	};
	
	/**
	 * 实现JSON对象层次化
	 */
	me.jsonHierarchy = function(p_data)
	{
		if ($isArray(p_data))
		{
			$.each(p_data, function(index, p_item)
			{
				_jsonHierarchy(p_item);
			});
		}
		else if ($.isPlainObject(p_data))
		{
			_jsonHierarchy(p_item);
		}
		return p_data;	
	}
	
	function _init()
	{
		me.setMeta(me.meta);
	}
	
	function _jsonFlat(p_item)
	{
		$.each(names, function(index, name)
	    {
			if ($isArray(name))
			{
				var length = name.length;
				var queryString =  "$.";
				for (var i = 0; i < length; i++)
				{
					queryString += (name[i] + ((i == length -1) ? "": "."));
				}
				var data = jsonPath(p_item, queryString);
				if (data)
				{							
					p_item[name.join(".")] = data[0];
				}
			}
		});
		
		$.each(names, function(index, name){
			if ($isArray(name))
			{
				delete p_item[name[0]];
			}
		});
	}
	
	function _jsonHierarchy(p_item)
	{
		for (var key in p_item)
		{
			if (key.contain("."))
			{
				var names = key.split(".");
				var data = p_item;
				var length = names.length;
				for (var i = 0; i < length - 1; i++)
				{
					var name = names[i];
					if ($isEmpty(data[name]))
						data[name] = {};
					data = data[name];
				}
				data[names[length - 1]] = p_item[key];
				delete p_item[key];
			}
		}
	}
	
	me.endOfClass(arguments);
	return me;
};
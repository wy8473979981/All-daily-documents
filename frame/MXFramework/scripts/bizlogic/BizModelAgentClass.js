$ns("mx.bizlogic");

$import("mx.rpc.RESTClient");
/**
 * 提供业务逻辑处理的类。
 * 
 * @example 
 * 以下是一个使用示例。 该示例将说明如何保存自定义模型数据。 
 * <code language="JavaScript">
 * mx.bizlogic.BizModelAgent.validate(
 *     "~/testservice/project/", //资源服务路径
 *     p_data,
 *     p_callback
 * );
 * </code>
 */
mx.bizlogic.BizModelAgentClass = function()
{
    var me = $extend(MXComponent);
    
    /**
     * 数据保存校验后将触发此事件。
     */
    me.onvalidate = null;

    /**
     * 数据保存之前，将触发该事件。
     */
    me.onsaving = null;
    
    /**
     * 数据保存之后，将触发该事件。
     */
    me.onsaved = null;
    
    var base = {};
    
    // 获取 单例 RESTClient
    var _restClient = null;
    function _getRestClient()
    {
    	if (_restClient == null)
    	{
    		_restClient = new mx.rpc.RESTClient();
    	}
    	return _restClient;
    }


    base.init = me.init;
    me.init = function()
    {
        base.init();
    };

    /**
     * 保存一对多模型的数据。
     * 
     * @param p_baseUrl
     *            一个 RESTFUL 风格服务地址，表示资源服务路径。
     * @param p_srcEntity
     *            一个 JSON 对象，表示主表待保存的记录。
     * @param p_tgtEntityName
     *            一个字符串，表示从表模型实体名。   
     * @param p_tgtEntityCols
     *            一个数组，表示从表中和主表对象逻辑关联的记录集合。    
     */
    me.saveOne2Many = function(p_baseUrl, p_srcEntity, p_tgtEntityName, p_tgtEntityCols, p_callBack, p_validateCallBack)
    {
		// 调用模型定义的服务端校验逻辑，如果调用成功，则执行以下内容
		var data = { items: [] };
		
		if ($.isPlainObject(p_srcEntity))
		{
			p_srcEntity[p_tgtEntityName] = p_tgtEntityCols;
			data.items.add(p_srcEntity); 
		}
		else
		{
			mx.indicate("warn", mx.msg("ERR_VALIDATING"));
			return;
		}
		
		// 加上同步的数据校验
		var validateResult = me.validate(p_baseUrl, JSON.stringify(data), p_validateCallBack);
		
        if (!validateResult.successful) 
        {
        	mx.indicate("warn", mx.msg("ERR_VALIDATING"));
        	return;
        }
		
        var savingArgs = {cancel : false};
        me.trigger("saving", savingArgs);
        if (savingArgs.cancel) return;
        
		var saveResult = _getRestClient().post(p_baseUrl + "save", JSON.stringify(data), p_callBack);
        
		var saveArgs = {result: saveResult};
        me.trigger("saved", saveArgs);
    };

    /**
     * 校验已编辑的数据。
     * @overload function(p_baseUrl, p_validateOptions)
     * 				以 p_validateOptions 中 dataGrid 或者 dataForm 的改变项作为校验数据进行校验。
     * 
     * @param p_baseUrl
     *            一个 RESTFUL 风格服务地址，表示校验服务路径。
     * @param [p_data]
     *            一个 JSON 对象，表示待校验的记录。格式为：
     *            如果校验的数据对象字段为 age 和 idcard，则格式为 
     *            "items:[{"age": 10, idcard: "32010001000"}]"
     *            如果待校验数据是表格记录，格式为
     *            "items:[{mxVirtualId: "5587EFAA-465F-F9E2-B4DF-758B96918074","age": 10, idcard: "32010001000"},
     *            {pk: "402894263fad184a013fad2dad800002", "age": 22, idcard: "41010001000"}]"，
     *            其中 mxVirtualId 或者 pk（主键字段名）是必须项。
     *            mxVirtualId 的值如果不为空，表示此项表单数据或者一条表格记录的值是在前端创建的，尚未保存。
     * @param p_validateOptions
     *            校验选项，表示待校验的表单或字段信息，格式为：
     *            {dataForm: p_dataForm, fieldName: p_fieldName}。   
     */
    me.validate = function(p_baseUrl, p_data, p_validateOptions)
    {
    	var validateResult;
    	
    	if($isEmpty(p_validateOptions))
		{
    		p_validateOptions = p_data;
    		p_data = null;
    		var _changedItems = {};
    		_datas = [];
    		if(p_validateOptions.dataForm)
    		{
    			_changeItem = p_validateOptions.dataForm.entityContainer._changedItems;
    		}
        	else if(p_validateOptions.dataGrid)
    		{
        		_changedItems = p_validateOptions.dataGrid.entityContainer._changedItems;
    		}
			$.each(_changedItems, function(i, e){
				_datas.add(e);
			});
			p_data = JSON.stringify({items:_datas});
		}
    	
    	if ($isEmpty(p_baseUrl))
    	{
    		validateResult = {successful: false, resultHint: mx.msg("ERR_VALIDATING")};
    		return validateResult;
    	}
    	if ($isEmpty(p_data))
    	{
    		validateResult = {successful: true};
    		return validateResult;
    	}
    	
    	// 服务端返回的校验结果数据
    	validateResult = _getRestClient().send(p_baseUrl + "validate", "POST",
										p_data, false, p_validateOptions);
    	
    	if ($notEmpty(validateResult) && $notEmpty(validateResult.responseText)) {
        	validateResult = JSON.parse(validateResult.responseText);
        }										
        
        me.trigger("validate", validateResult);
        
        if ($.isPlainObject(p_validateOptions))
        {
        	if(p_validateOptions.dataForm)
    		{
        		validateResult = _handleValidateOptions(validateResult, p_validateOptions);	
    		}
        	else if(p_validateOptions.dataGrid)
    		{
        		validateResult = _validateForGrid(p_validateOptions.dataGrid, p_data,validateResult);
    		}
        }
        
        return validateResult;
    };
    
    // 分析结果，如果校验不通过做出标记。
    function _handleValidateOptions(p_validateResult, p_validateOptions)
    {
    	var result = {successful: true};
    	var form, fieldName;
    	
    	if ($instanceOf(p_validateOptions.dataForm, mx.datacontrols.DataForm))
    	{
    		form = p_validateOptions.dataForm;
    	}
    	
    	if ($isString(p_validateOptions.fieldName))
    	{
    		fieldName = p_validateOptions.fieldName;
    	}
    	
    	var validateResult = p_validateResult;
    	if ($notEmpty(form) && validateResult && validateResult.successful) {
			// 如果校验结果包含错误信息，则将校验错误的字段编辑器边框标红并提示。
			if ($notEmpty(validateResult.resultValue.items) && validateResult.resultValue.items.length > 0)
			{
				var ret = validateResult.resultValue.items[0];
				
				if ($notEmpty(ret) && ret.length > 0)
				{
					if ($notEmpty(fieldName) && $notEmpty(form.getEditor(fieldName)))
					{
						form.getEditor(fieldName).markError(true, ret[0]["errorsToDefaulFormatString"]);
					}
					else
					{
						for (var i = 0; i < ret.length; i++) {
							if (form.getEditor(ret[i]["fieldName"]) != null)
							{
								form.getEditor(ret[i]["fieldName"]).markError(true, ret[i]["errorsToDefaulFormatString"]);
							}
						}
						
						form.entityContainer._submitting = false;
					}
	
					result.successful = false;
				}
			}
		}
		else
		{
			mx.indicate("error", String.format(mx.msg("ERR_VALIDATING"), mx.msg("ERR_SERVICE_INVALID")));

			result.successful = false;
		}
		
		return result;
    }
    
    // p_datas 是验证请求的参数，其 items 属性和返回结果p_validateResult.resultValue.items 一一对应
    function _validateForGrid(p_grid, p_datas, p_validateResult)
    {
    	var result = {successful: true, resultHint:""};
    	// 返回后结果处理
    	var items = p_validateResult.resultValue.items;
    	if(items == null || items.length == null)
		{
    		items = [];
		}
    	// 请求的参数
    	if($isString(p_datas))
		{
    		var datas = JSON.parse(p_datas).items;
		}
    	else
    	{
    		datas = p_datas.items;
    	}
    	// 遍历校验结果
    	for(var i = 0; i < datas.length; i++)
		{
    		var data = datas[i];
    		var item = items[i];
    		var id = data[p_grid.entityContainer.primaryKey] || data["mxVirtualId"];
    		
    		data = _obj2Flat(data);
    		for(var key in data)
    		{
    			var _err = false;
    			var tip = "";

    			for(var j = 0; j < item.length; j++)
    			{
    				if(item[j] && item[j].error && item[j].fieldName == key)
					{
    					_err = true;
    					tip = item[j].errorsToDefaulFormatString;
    					break;
					}
    			}
    			if(_err)
				{
    				result.successful = false;
    				if(typeof key == "string")
    				{
    					p_grid.markError(id, key, true, tip)
    				}
				}
    			else
				{
    				if(typeof key == "string")
    				{
    					p_grid.markError(id, key, false)
    				}
				}
    		}
		}
    	return result;
    }
	
    // 如果是树形机构的数据，需要拉平
	function _obj2Flat(p_data)
	{
		var res = {};
		var arr = _obj2Arr(p_data);
		for(var i = 0; i < arr.length; i++)
		{
			res[arr[i]["key"]] = arr[i]["val"];
		}
		return res;
	}
	
	function _obj2Arr(p_obj)
	{
		var arr = [];
		for(var key in p_obj)
		{
			if($.isPlainObject(p_obj[key]))
			{
				var _ress = _obj2Arr(p_obj[key]);
				for(var i = 0; i < _ress.length; i++)
				{
					arr.push({key:key+"."+_ress[i].key, val:_ress[i].val});
				}
			}
			else
			{
				arr.push({key:key,val:p_obj[key]});
			}
		}
		return arr;
	}
	
    me.endOfClass(arguments); 
    return me;
};

mx.bizlogic.BizModelAgent = new mx.bizlogic.BizModelAgentClass();
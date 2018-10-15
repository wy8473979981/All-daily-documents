$ns("mx.editors");

$import("mx.utils.Validator");

/**
 * 提供所有编辑器的抽象基类。该类的派生类包含：{@link mx.editors.CheckEditor}、{@link mx.editors.ComboEditor}、{@link mx.editors.ListEditor}、{@link mx.editors.UpDownEditor}、{@link mx.editors.TextEditor} 等。
 * 
 * @abstract
 */
mx.editors.Editor = function()
{
    var me = $extend(mx.controls.Control);
    var base = {};

    /**
     * @default 21
     */
    me.height = 21;

    /**
     * 获取或设置一个字符串，表示编辑器未通过校验时，提示信息的位置。
     * <p>
     * 该字段可选的值包括：
     * <ul>
     *      <li><b>left</b></li>
     *      <li><b>right</b></li>
     *      <li><b>top</b></li>
     *      <li><b>bottom</b></li>
     * </ul>
     * </p>
     * 
     * @default bottom
     */
    me.tipPosition = "bottom";
    
    /**
     * 获取编辑器的值。
     * 请使用 {@link setValue} 方法设置该字段的值。
     */
    me.value = null;
    
    /**
     * 获取编辑器的文本值。
     * 请使用 {@link setText} 方法设置该字段的值。
     */
    me.text = null;

    /**
     * 获取编辑器是否只读。
     * 请使用 {@link setReadOnly} 方法设置该字段的值。
     * 请参考 {@link isReadOnly} 和 {@link setReadOnly} 方法。
     *
     * @default false
     */
    me.readOnly = false;

    /**
     * 获取一个字符串，表示 {@link value} 的数据类型。
     * 该字段必须在初始化前设置。
     * <p>
     * 该字段可选的值包括：
     * <ul>
     *      <li><b>string</b></li>
     *      <li><b>int</b></li>
     *      <li><b>number</b></li>
     *      <li><b>double</b></li>
     *      <li><b>float</b></li>
     *      <li><b>date</b></li>
     *      <li><b>datetime</b></li>
     *      <li><b>time</b></li>
     * </ul>
     * </p>
     * 
     * 除了上述值外，在{@link mx.editors.DropDownTreeEditor}中等于需要提交的树节点 PO 类型名称。
     *
     * @default string
     */
    me.valueType = "string";

    /**
     * @ignore
     * 获取编辑器允许的最大值（仅对 Number 类型有效）。
     * 该字段必须在初始化前设置。
     */
    me.max = null;

    /**
     * @ignore
     * 获取编辑器允许的最小值（仅对 Number 类型有效）。
     * 该字段必须在初始化前设置。
     */
    me.min = null;
    
    /**
     * 获取或设置一个字符串，表示验证类型，不支持 {@link mx.editors.FileEditor}}。
     * 该字段可选的值包括：
     * <ul>
     *     <li><b>DIGIT</b> 数字</li>
     *     <li><b>INTEGER</b> 整数</li>
     *     <li><b>FLOAT</b> 浮点数</li>
     *     <li><b>MINUSINTEGER</b> 负整数</li>
     *     <li><b>MINUSFLOAT</b> 负浮点数</li>
     *     <li><b>PLUSINTEGER</b> 正整数</li>
     *     <li><b>PLUSFLOAT</b> 正浮点数</li>
     *     <li><b>CHINESE</b> 中文</li>
     *     <li><b>LETTER</b> 字母</li>
     *     <li><b>ASCII</b> ASCII 码</li>
     *     <li><b>DATE</b> 日期。例如：2007-07-01</li>
     *     <li><b>DATETIME</b> 日期时间。例如：2007-07-01 14:28:32</li>
     *     <li><b>TIME</b> 时间。例如：14:28:32</li>
     *     <li><b>EMAIL</b> 邮箱地址</li>
     *     <li><b>IP</b>  IP 地址</li>
     *     <li><b>MOBILE</b> 手机号码</li>
     *     <li><b>PHONE</b> 电话号码</li>
     *     <li><b>URL</b> 统一资源地址</li>
     *     <li><b>ZIPCODE</b> 邮政编码</li>
     *     <li><b>SQL</b> 是否包含 SQL 关键字</li>
     *     <li><b>IDCARD</b> 身份证号码</li>
     *     <li><b>REGEXP</b> 正则表达式，支持通过指定正则表达式进行校验。</li>
     * </ul>
     *
     * @example
     * <code language="JavaScript">
     * var editor = new mx.editors.TextEditor({
     *     validType: "INTEGER", //验证输入值是整数
     *     validOptions: {minValue: 12, maxValue: 20, validateMessage: "请输入正整数"}
     * });
     * </code>
     */
    me.validType = null;
    
    /**
     * 设置和获取校验参数。该属性与 {@link validType}配合使用。常用参数请参见 {@link mx.utils.ValidatorClass.validator} 的 p_options。
     */
    me.validOptions = null;
    
    /**
     * @ignore
     * 获取一个 Boolean 值，表示编辑器是否通过验证。
     * 
     * @default true
     */
    me.isValidate = true;
    
    /**
     * 获取编辑器验证提示信息。
     * 
     * @default null
     */
    me.validateMessage = null;
    
    /**
     * @ignore
     * 获取编辑器的日期（如“yyyy-MM-dd”）或数字（如“0.00”）格式化字符串。
     * 请使用 {@link setFormatString} 方法设置该字段的值。
     */
    me.formatString = null;

    /**
     * @ignore
     * 获取编辑器的显示值是否与实际值相同。例如，当 {@link DropDownList} 控件的 displayMember 字段和 valueMember 字段不同时，该字段为 true；而多数情况下该字段为 false。
     * 该字段通常由具体的编辑器设定，请不要在程序中直接修改。
     */
    me.differDisplayValue = false;


    /**
     * @ignore
     */
    me.$input = null;

    /**
     * 当编辑器的值发生变化前将触发该事件。通常调用 {@link setValue} 方法（其中 p_triggerEvent 参数必须为 true），后会触发该事件。
     */
    me.onchanging = null;

    /**
     * 当编辑器的值发生变化后将触发该事件。通常调用 {@link setValue} 方法（其中 p_triggerEvent 参数必须为 true），后会触发该事件。
     */
    me.onchanged = null;
    
    /**
     * 一个布尔值，指示在me.init方法中是否触发changed事件，默认是触发的。
     */
    me.enableEventOnInit = true;
    
    var _isInitValue = false;
    
    /**
     * 初始化方法。执行设置样式并初始化属性等操作。
     */
    base.init = me.init;
    me.init = function()
    {
        base.init();        
        _initValidator();
    };
	
	base.dispose = me.dispose;
    me.dispose = function(){		
		me.$e.removeAttr("title");
		if(me.$e.toolTip){
			me.$e.toolTip("destroy");
		}
		$(document).off("keydown",me.__document_keydown);
		if(me.$input){
			me.$input.off();
			me.$input.unbind();
			me.$input.removeAttr("readonly").removeAttr("readOnly");
			me.$input.removeAttr("tabIndex");
			me.$input.removeAttr("disabled")
			me.$input.empty().remove();
			me.$input=null;
			delete me.$input;
		}
		_result=null;		
		base.dispose();
		base=null;
	}
    
    /**
     * @ignore
     */
    me._initDefaultValue = function(p_triggerEvent)
    {
    	 //用来标识是否已经调用过  me._initDefaultValue 方法，这个方法在控件初始化过程中只能执行一次
    	 if(_isInitValue)
     	 {
    		 return;
     	 }
    	 var initValue = me.value;
    	 if(!$isEmpty(initValue))
         {
    		 me.value = null;
    		 if(p_triggerEvent)
    		 {
    			 me.setValue(initValue, true); 
    		 }
    		 else
    	     {
    			 me.setValue(initValue, false);
    	     }
    		 //先保存验证结果
			 var _isValidate = me.isValidate;
			 me.markError(false);
			 me.isValidate = _isValidate;  
         }
         _isInitValue = true;
    }
    
    /**
     * @ignore
     */
    function _initValidator()
    {
		if(!mx.utils.Validator){
			mx.utils.Validator = new mx.utils.ValidatorClass();
		}
    }

    base.setEnabled = me.setEnabled;
    
    /**
     * 请参见 {@link mx.controls.Control.setEnabled} 方法。
     * @overload function(p_enabled)
     * @param p_enabled 一个布尔值，true为控件可用，false为控件禁用
     */
    me.setEnabled = function(p_enabled)
    {
        base.setEnabled(p_enabled);
        me._toggleTip();
        me._refreshState();
    };
    
    /**
     * @ignore
     */
    me._toggleTip = function(){
    	if(me.readOnly || !me.enabled){
    		if($notEmpty(me.value)){
        		me.$e.attr("title",me.text);
        	}
    	}else{
    		me.$e.removeAttr("title");
    	}
    }

    /**
     * 获取一个 Boolean 值，当 {@link enabled} 字段为 false 或 {@link readOnly} 字段为 true 时，返回 true；否则返回 false。
     */
    me.isReadOnly = function()
    {
        return me.readOnly;   
    };

    /**
     * 设置 {@link readOnly} 字段的值。
     * @param p_readOnly 一个布尔值，true表示控件只读
     */
    me.setReadOnly = function(p_readOnly)
    {
        if (typeof(p_readOnly) == "undefined")
        {
            p_readOnly = true;
        }
        me.readOnly = p_readOnly;
        me._toggleTip();
        me._refreshState();
    };
    
    /**
     * 获取编辑器的值。
     * 返回当前编辑器的value值
     */
    me.getValue = function()
    {
    	return me.value;
    };
    
    
    /**
     * 设置 {@link value} 字段的值。
     * @overload function(p_value, p_triggerEvent)
     * @overload function(p_value)
     * @param p_value 指定编辑器的值。
     * @param [p_triggerEvent=false] 指定是否要触发 {@link onchanged} 事件。
     * 触发事件的条件是p_triggerEvent为true并且当前值me.value不等于p_value
     */
    me.setValue = function(p_value, p_triggerEvent)
    {
        if (p_triggerEvent == null)
        {
            p_triggerEvent = false;
        }
        
        var result = me._validateValue(p_value);
        
        _result = $.extend(true, {}, result);
       
        var value = result.value;
        
        p_triggerEvent = p_triggerEvent && !me._isEqual(me.value, value);
        
        var args = {cancel: false, newValue: value};
        if (p_triggerEvent)
        {
            me.trigger("changing", args);
            
            if (args.cancel)
            {
            	me.$input.val(me.text);
                return;
            }
        }
        
        var _tempText = me._formatValue(value);
        me.text = _tempText;
        
        //这个isEqual不能删，因为me.$input.val()时，编辑器会将焦点移动的最后。
        if (me.$input != null && !me._isEqual(_tempText, me.$input.val()))
        {
        	me.$input.val(me.text);
        }

        if (!result.successful)
        {
        	if(me.validateMessage != null){
	            result.hint = me.validateMessage;
	    	}
            me.markError(true, result.hint);
        }
        else
        {
            me.markError(false);
            
            if (!me._isEqual(me.value, value) ||  $notEmpty(value))
            {
                if ($isDate(value) && $isFunction(mx.editors.DateTimeEditor) && $instanceOf(me, mx.editors.DateTimeEditor))
                {	
                    // 服务端需要指定日期的格式，所以此处将所有的日期型的值统一按完整格式处理。
                    me.value = $format(value,_processFormatString(me.formatString));
                }
                else if ($isDate(value) && $isFunction(mx.editors.TimeEditor) && $instanceOf(me, mx.editors.TimeEditor))
                {
                	if (me.valueType == "string")
                	{
                		me.value = me.text;
                	}
                	else
                	{
                		me.value = $format(value, me.formatString != null ? me.formatString : "yyyy-MM-dd HH:mm:ss");
                	}
                }
                else
                {
                    me.value = value;
                    if ($instanceOf(me,mx.editors.NumberEditor))
                    {
                    	var tmp_value = me._parseValue(me.text);
                    	if (tmp_value != me.value)
                    		me.value = tmp_value;
                    }
                }
                if (p_triggerEvent)
                {
                    me.trigger("changed", args);
                }
            }

			//根据最新值更新输入框的状态，取消提示值。
            _toggleInputStatus();
        }
    };

    /**
     *@ignore
     */
    function _processFormatString(p_formatString)
    {
    	if($isString(p_formatString))
    	{
    	    var reg = /[^(yyyy)(MM)(dd)(HH)(mm)(ss)]/g;	
		    function _replace(p_str,a,b,n){
		  	   if(p_str.indexOf(n)!=-1){
		  	      return p_str.replace(a,b);
		  	   }
		  	   return p_str;
		  	}
		    var newstr = p_formatString.replace(reg,"");
		    newstr =_replace(newstr,"yyyy","yyyy-","MM");
		  	newstr =_replace(newstr,"MM","MM-","dd");
		  	newstr =_replace(newstr,"dd","dd ","HH");
		  	newstr =_replace(newstr,"HH","HH:","mm");
		  	newstr =_replace(newstr,"mm","mm:","ss");
		  	return newstr
       }
       else
       {
    	    return  me.valueType == "date" ? "yyyy-MM-dd" : "yyyy-MM-dd HH:mm:ss"
       }
    }

    /**
     * {@exclude mx.editors.FileEditor}
     * 设置编辑器的文本值。编辑器会自动将 p_text 转换为 {@link valueType} 字段表示的数据类型。不支持在子类{@link mx.editors.FileEditor} 中使用
     * @overload function(p_text, p_triggerEvent)
     * @param p_text 一个文本，表示编辑器值的文本表达式。
     * @param [p_triggerEvent=false] 指定是否要触发 {@link onchanged} 事件。
     * 触发事件的条件是p_triggerEvent为true并且当前值me.value不等于p_value
     */
    me.setText = function(p_text, p_triggerEvent)
    {
        me.setValue(p_text, p_triggerEvent);
    };


    /**
     * {@exclude mx.editors.FileEditor}
     * 设置 {@link formatString} 字段的值。不支持在子类{@link mx.editors.FileEditor} 中使用
     * @param p_formatString 一个表示格式的字符串
     */
    me.setFormatString = function(p_formatString)
    {
        me.formatString = p_formatString;
    };
    
    /**
     * {@exclude mx.editors.FileEditor}
     * 让编辑器获得焦点。不支持在子类{@link mx.editors.FileEditor} 中使用
     */
    me.focus = function()
    {
        if (me.$input != null)
        {
            window.setTimeout(function()
            {
            	try
            	{
            		me.$input.focusEnd();
            	}
            	catch(e){}
            }, 200);
        }
    };

    /**
     * {@exclude mx.editors.FileEditor}
     * 让编辑器获得焦点，并全选文本框中的值。不支持在子类{@link mx.editors.FileEditor} 中使用
     */
    me.select = function()
    {
        if (me.$input != null)
        {
            window.setTimeout(function()
            {
                var input = me.$input.get(0);
                if (input != null && input.select != null)
                {
                    input.select();
                }
            }, 200);
        }
    };

    /**
     * {@exclude mx.editors.FileEditor}
     * 让编辑器失去焦点。不支持在子类{@link mx.editors.FileEditor} 中使用
     */
    me.blur = function()
    {
        if (me.$input != null)
        {
            try
            {
                me.$input.get(0).blur();
                me.__input_blur();
            }
            catch (e)
            {

            }
        }
    };

    /**
     * @ignore
     */
    var _result = null;
    /**
     * 标明编辑器的错误状态。
     * @overload function(p_isError, p_errorTip)
     * @param p_isError 一个 Boolean 值，表示是否需要标明为错误状态。
     * @param p_errorTip 一个字符串，表示错误提示信息。
     */
    me.markError = function(p_isError, p_errorTip)
    {
    	me.isValidate = p_isError == true ? false : true;
    	if (p_isError)
        {
            me.$e.addClass("error");
            if (p_errorTip != null)
            {
            	p_errorTip += $notEmpty(me._outOfLengthTip) ? ("\n" + me._outOfLengthTip) : "";
            	me.$e.toolTip({
                    content: p_errorTip,
                	defaultPosition: me.tipPosition
                });
            }            
        }
        else
        {
        	if (me.$e)
        	{
        		me.$e.removeClass("error");
                me.$e.toolTip("destroy");
        	}
        }
    };
    
    /**
     * @ignore
     */
    me._parseValue = function(p_stringValue)
    {
        if (p_stringValue == null || p_stringValue == "")
        {
            return null;
        }
        switch (me.valueType ? me.valueType.toLowerCase() : "string")
        {
            case "int":
                var value = parseInt(p_stringValue, 10);
                if (isNaN(value))
                {
                    throw new Error(mx.err("INPUT_ILLEGAL_INT", [p_stringValue]));
                }
                return value;
            case "number":
            case "float":
            case "double":
                var value = parseFloat(p_stringValue, 10);
                if (isNaN(value))
                {
                    throw new Error(mx.err("INPUT_ILLEGAL_NUM", [p_stringValue]));
                }
                var _checkUtil = mx.utils.CheckUtil;
                if(_checkUtil.isInteger(value) && !$instanceOf(me,mx.editors.TextEditor))
                {
                    value= $format(value,me.formatString);
                }
                if($instanceOf(me,mx.editors.TextEditor))
                {
                	if(p_stringValue.length - p_stringValue.indexOf(".") == 1)
                		return p_stringValue;
                }
                return value;
            case "date":
            case "datetime":
                if (p_stringValue == null || p_stringValue.trim() == "") return null;
                var value = parseDate(p_stringValue);
                if (isNaN(value))
                {
                    throw new Error(mx.err("INPUT_ILLEGAL_DATE_TIME", [p_stringValue]));
                }
                return value;

            case "time":
                if (p_stringValue == null || p_stringValue.trim() == "") return null;

                var timePart = "";
                if (p_stringValue.length <= 2)
                {
                    var h = parseInt(p_stringValue, 10);
                    if (isNaN(h) || h > 23 || h < 0)
                    {
                        h = 0;
                    }
                    timePart = h + ":0:0";
                }
                else
                {
                    var date = parseDate(p_stringValue);
                    if (date == null)
                    {
                        throw new Error(mx.err("INPUT_ILLEGAL_TIME", [p_stringValue]));
                    }
                    timePart = $format(date, "HH:mm:ss");
                }

                var datePart = null;
                if (me.value == null)
                {
                    datePart = new Date();
                    datePart.setFullYear(1900, 0, 1);
                }
                else
                {
                    if ($isDate(me.value))
                    {
                        datePart = me.value;                        
                    }
                    else
                    {
                        datePart = parseDate(me.value);
                    }
                }
                datePart = $format(datePart, "yyyy-MM-dd");

                var result = parseDate(datePart + " " + timePart);
                if (result != null)
                {
                    return result;
                }
                else
                {
                    throw new Error(mx.err("INPUT_ILLEGAL_TIME", [p_stringValue]));
                }

            default:
                return p_stringValue;
        }
    };

    /**
     * @ignore
     */
    me._formatValue = function(p_value)
    {
    	if ($isFunction(me.valueFormatter))
    	{
    		return me.valueFormatter(p_value);
    	}
    	
        return $format(p_value, me.formatString);
    };

    /**
     * @ignore
     */
    me._isEqual = function(p_value1, p_value2)
    {
        return $isEqual(p_value1, p_value2);
    };

    /**
     * 自定义验证规则。
     * <b>可通过重写该方法实现自定义验证的效果。</b>
     * 返回的结果为一个 Boolean 值或者一个 JSON 对象。如“true”、“false”或者“{ successful: false, hint: "验证失败！" }”。
     * 如果返回的是 JSON 对象，“successful”表示是否成功，“hint”表示显示值。
     * 
     * @example
     * <code language="JavaScript">
     * var editor = new mx.editors.TextEditor({
     *     customValidate:function(p_editor){
     *         // TODO: 验证逻辑
     *         // 如果没有验证通过
     *         return { successful:false, hint:"验证失败！" }
     *     }
     * });
     * </code>
     */
    me.customValidate = null;
    
    /**
     * 验证当前editor的值 
     * 返回的结果为一个 Boolean 值或者一个 JSON 对象。如“true”、“false”或者“{ successful: false, hint: "验证失败！" }”。
     * 如果返回的是 JSON 对象，“successful”表示是否成功，“hint”表示显示值。
     * @overload  function(p_markError)
     * @param p_markError 一个布尔值，是否标记错误提示。true表示标记，默认为false
     */
    me.validate = function(p_markError)
    {
    	//取原始 value值做校验，在调用这一次setValue方法后_result就是可用的。
    	//添加下面这个逻辑是因为me.value在大多数编辑器上只保存最后一次正确的值。但需要教研的却是当前的值，这个值在_result._value上可以取到。
    	var _value = _result ? _result._value : me.value;
    	var ret = me._validateValue(_value);
    	if(p_markError==true && ret.successful==false)
    	{
    		me.markError(!ret.successful, ret.hint);	
    	}
    	return ret;
    }
    
    /**
     * @ignore 
     * 清除上次校验结果,并重新设值
     */
    me._clearPreValidateState = function(){
    	if(!me.isValidate){
    		var validate = me.isValidate;
    		me.reset(true);
    		me.markError(false);
    		me.isValidate = validate;
    	}
    	_result = null;
    }
    
    /**
     * @ignore
     */
    me._validateValue = function(p_value)
    {
        var result = { successful: false };
        result.value = p_value;
        //这个变量用来保存未经过处理的原始value值。
        result._value = p_value;
        if ($isString(p_value))
        {
            try
            {
                result.value = me._parseValue(p_value);
            }
            catch (e)
            {
            	result.value = p_value;
                result.successful = false;
                result.hint = e.message;
                return result;
            }
        }
        else if (me.valueType == "date")
        {
            if ($isNumber(p_value))
            {
                result.value = new Date(p_value);
            }
        }
        
        // 如果值重复，不走校验
        if(_result && _result._value === result._value)
        {
			return _result;
        }
        
        var validateResult; 
        var validator = {};
        if ($isFunction(me.customValidate))
        {
             validator.custom = me.customValidate;
        }
        
        if(me.nullable == undefined){
    		me.nullable = true;
    	}
        
        mx.utils.Validator.required =!me.nullable;
        validator.self = mx.utils.Validator.validate;
        
        _handleMaxMinLength();
        
        // 校验先走自定义校验.
        if ($notEmpty(validator.custom))
        {
             validateResult = validator.custom(me, result.value);
        }
        
        // 自定义校验通过再走校验.
        if (!(validateResult === false || ($.isPlainObject(validateResult) && validateResult.successful === false)))
        {
        	var _minLength = (me.validOptions && me.validOptions.minLength) || 0;
        	if(me.nullable && $isEmpty(result.value) && _minLength == 0)
        	{
        		//什么都不做
        	}
        	else if ($notEmpty(validator.self))
        	{
        		validateResult = validator.self(result.value, me.validType, me.validOptions)
        	}
        }
     
        var successful = true;
        var hint = "";
        if ($isBoolean(validateResult))
        {
            if (!validateResult)
            {
                successful = false;
            }
        }
        else if ($.isPlainObject(validateResult))
        {
            if (typeof(validateResult.successful) != "undefined" && !validateResult.successful)
            {
                successful = false;
                hint = validateResult.hint;
            }
        }
        
        if (!successful)
        {
            result.successful = false;
            result.hint = hint;
            return result;
        }

        result.successful = true;
        return result;
    };

    /**
     * @ignore
     */
    me._refreshState = function()
    {
        if (me.$input != null)
        {
            me.$input.attr("disabled",!me.enabled);		
            me.$input.attr("readonly", me.isReadOnly());
            if(me.isReadOnly() === true)
            {
                me.$input.attr("tabIndex",-1);
            }
            else
            {
                me.$input.removeAttr("tabIndex");
            }
        }
        me.$e.toggleClass("disabled", !me.enabled);
        me.$e.toggleClass("readOnly", me.isReadOnly());
    };

    /**
     * @ignore
     */
    me._input_change = function()
    {
        try
        {
            if (me.$input != null)
            {
                me.setText(me.$input.val(), true);
            }
        }
        catch (e)
        {
            mx.indicate("error", e.message);
        }
    };
    
    /**
     * @ignore
     */
    me.__document_keydown = function (e)
    {
    	//获取事件对象
        var elem = e.relatedTarget || e.srcElement || e.target ||e.currentTarget; 
        
        if (e.keyCode == 8)//判断按键为backSpace键
        {
            //获取按键按下时光标做指向的element
            var elem = e.srcElement || e.target || e.currentTarget; 
            
            //判断是否需要阻止按下键盘的事件默认传递
            var name = elem.nodeName;
            
            if (name != 'INPUT' && name != 'TEXTAREA')
            {	
                return _stopIt(e);
            }
            
            var type_e = elem.type.toUpperCase();
            if (name == 'INPUT' && (type_e != 'TEXT' && type_e != 'TEXTAREA' && type_e != 'PASSWORD' && type_e != 'FILE'))
            {
                return _stopIt(e);
            }
            
            if (name=='INPUT' && (elem.readOnly == true || elem.disabled == true))
            {
                return _stopIt(e);
            }
        }
    };
    
    function _stopIt(e)
    {
        if(e.returnValue)
        {
            e.returnValue = false ;
        }
        
        if(e.preventDefault )
        {
            e.preventDefault();
        }                

        e.keyCode = 0;
	    return false;
	}


    /**
     * @ignore
     */
    me.__input_keydown = function(e)
    {
        if (me.readOnly && e.keyCode == 8)
        {
            e.keyCode = 0;
            return false;
        }
    };

    /**
     * @ignore
     */
    me.__input_click = function(e)
    {
        me.$input.on("keydown", me.__input_keydown);
    };

    /**
     * @ignore
     */
    me.__input_blur = function()
    {
        $(document).on("keydown", me.__document_keydown);
        me.$input.off("keydown", me.__input_keydown);
    }

    /**
     * {@exclude mx.editors.FileEditor}
     * 重置编辑器。
     * @overload  function(p_triggerEvent)
     * @param [p_triggerEvent=false] 指定是否要触发 {@link onchanged} 事件。
     */
    me.reset = function(p_triggerEvent)
    {
    	me.markError(false);
        if (p_triggerEvent == null)
        {
            p_triggerEvent = false;
        }
        _result = null;
        if (me.$input != null)
        {
            me.$input.val("");
        }
        if (!me._isEqual(me.value, null))
        {
        	me.value = null;
        	if (p_triggerEvent)
            {
                me.trigger("changed");
            }
        }
        me.value = null;
        _toggleInputStatus();
    };
    
    /**
     *@ignore
     */
    function _toggleInputStatus()
    {
    	if(me.$input == null){
    		return ;
    	}
    	//  当编辑器为文本编辑器或下拉框编辑器时，由于默认会显示提示值，
        // 赋值后需要重置输入框的值。
    	if ($instanceOf(me, mx.editors.TextEditor)
    			|| $instanceOf(me, mx.editors.ComboEditor))
    	{
    		me._toggleInputStatus();
    	}
    }

    /**
     * 处理动态设置的 maxLength 和 minLength 属性，避免个别编辑器中存在 maxLength 造成的不一致问题。
     */
    function _handleMaxMinLength()
    {
        if (me.maxLength && me.maxLength > 0)
        {
            if (me.validOptions)
            {
                if (me.validOptions.maxLength == undefined)
                {
                    me.validOptions.maxLength = me.maxLength;
                }
            }
        	else
            {
                me.validOptions = {maxLength: me.maxLength}
            }
        }
        
        if (me.minLength && me.minLength > 0)
        {
            if (me.validOptions)
            {
                if (me.validOptions.minLength == undefined)
                {
                    me.validOptions.minLength = me.minLength;
                }
            }
        	else
            {
                me.validOptions = {minLength: me.minLength}
            }
        }
    }
    
    me.endOfClass(arguments); 
    return me;
};
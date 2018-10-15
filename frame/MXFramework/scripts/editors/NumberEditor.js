$ns("mx.editors");

$import("mx.editors.UpDownEditor");

/**
 * 提供一个数字编辑器类。
 * 
 * @example
 * 以下是一个创建 {@link mx.editors.NumberEditor} 以及如何使用的示例。
 * <code language="JavaScript">
 * var numberEditor = new mx.editors.NumberEditor({ 
 *     min: 10,
 *     increment: 5,                                
 *     onchanged: _numberEditor_changed        
 * });
 * numberEditor.init();
 *
 * numberEditor.setValue(20);
 *
 * function _numberEditor_changed()
 * {
 *     alert(numberEditor.value);
 * }
 * </code>
 */
mx.editors.NumberEditor = function()
{
	var me = $extend(mx.editors.UpDownEditor);
	var base = {};

    /**
     * 获取一个字符串，表示 {@link value} 的数据类型。参见 {@link mx.editors.Editor.valueType} 字段。
     * 该字段必须在初始化前设置。
     * <p>
     * 该字段允许值包括：
     * <ul>
     *      <li><b>int</b></li>
     *      <li><b>number</b></li>
     *      <li><b>double</b></li>
     *      <li><b>float</b></li>
     * </ul>
     * </p>
     *
     * @default int
     */
    me.valueType = "int";
    
	/**
	 * 获取或设置数字显示框的最小允许值。最小允许值必须是 -9007199254740991 和 9007199254740991 之间的整数，
	 * 否则初始化为 0。
	 * 
	 * @default 0
	 */
	me.min = 0;
	
	/**
	 * 获取或设置数字显示框的最大允许值。最大允许值必须是 -9007199254740991 和 9007199254740991 之间的整数，
	 * 否则初始化为 9007199254740991。
	 * 
	 * @default 9007199254740991
	 */
	me.max = 9007199254740991;
    
    /**
     * 获取格式化字符串的格式，例如 “0.00”。
     * 请使用 {@link setFormatString} 方法设置该字段的值。
     */
    me.formatString = null;
    
	/**
	 * 获取或设置单击向上或向下按钮时，数字显示框递增或递减的值。
	 * 
	 * @default 1
	 */
	me.increment = 1;

	base.init = me.init;
	me.init = function()
	{
		base.init();
		if (me.valueType != "int" && me.valueType != "float" && me.valueType != "double" && me.valueType != "number")
		{
			me.valueType = "int";
		}
		_initMaxAndMin();
		me._initDefaultValue();
		_init();
	};

	/**
	 * 根据 {@link increment} 字段的值递增 {@link mx.editors.Editor.value} 的值。
	 * 
	 * @param [p_triggerEvent=false]
	 *            一个 Boolean 值，表示是否需要触发 {@link mx.editors.Editor.onchanged}
	 *            事件。如果该值为 true，表示需要触发；反之则不触发。
	 */
	me.increaseValue = function(p_triggerEvent)
	{
		if (!me.isValidate || $isEmpty(me.$input.val()))
		{
			// 没有通过验证或者为空时
			if($.isNumeric(me.$input.val()) && parseFloat(me.$input.val()) > me.max)
			{
				me.setValue(me.max, p_triggerEvent);
			}
			else
			{
				me.setValue(me.min, p_triggerEvent);
			}
		}
		else
		{
			me.value = parseFloat(me.value);
			var result = me._validateValue(_FixedValue(me.value + me.increment))
			if (result.successful)
			{
				try
				{
					me.setValue(result.value, p_triggerEvent);
				} 
				catch (e)
				{
				}
			}
		}
	};
	
	function _FixedValue(p_value){
		if($isNumber(me.value)){
			var valuePart = _numberToString(me.value).split(".");
			var fixLength = valuePart.length == 1 ? 0 : valuePart[valuePart.length-1].length;
			if(me.increment){
				var incrementPart = (me.increment + "").split(".");
				var ipFixLength = incrementPart.length == 1 ? 0 : incrementPart[incrementPart.length-1].length;
				fixLength = Math.max(fixLength,ipFixLength);
			}
			var valStr = p_value.toFixed(fixLength);
			return valStr * 1;
		}
		return p_value;
	}
	
	function _numberToString(p_value){
    	var valStr = p_value + "";
    	var regxp = /\-*(\d+(\.\d+)*)e([\+\-])(\d+)/;
    	var matchRet =  valStr.match(regxp);
    	if(matchRet){
    		var numPart = matchRet[1];
    		var flag = matchRet[3]
    		var digitPart = matchRet[4] * 1;
    		var flageIndex = numPart.indexOf(".");
    		var text = numPart.replace(".","");
    		if(flag == "-"){
    			if(flageIndex != -1){
    				if(digitPart < flageIndex)
						text = text.substring(0,flageIndex-digitPart) + "." + text.substring(flageIndex-digitPart);
					digitPart = digitPart - (flageIndex - 1);
    			}
    			for(var i=0;i < digitPart ;i++){
    				text = (i == digitPart -1 ? "0." : "0") + text;
    			}
    		}else{
    			if(flageIndex !=-1){
    				var fixed = numPart.length - flageIndex - 1;
					if(digitPart < fixed)
						text = text.substring(0,flageIndex + digitPart) + "." + text.substring(flageIndex + digitPart);
					digitPart = digitPart - fixed;
    			}
    			for(var i=0;i < digitPart ;i++){
    				text = text + "0";
    			}
    		}
    		return text;
    	}
    	return valStr;
    }
	
	base._formatValue = me._formatValue;
	/**
	 *@ignore 
	 */
	me._formatValue = function(p_value){
		if (!me.isValidate)
			return p_value;
		if (!isNaN(parseFloat(p_value)))
			p_value = parseFloat(p_value);
		var formatValue = base._formatValue(p_value);
		if(typeof p_value == 'number' && !me.formatString){
			formatValue = _numberToString(formatValue);
        }
		return formatValue;
	}

	/**
	 * 根根据 {@link increment} 字段的值递减 {@link mx.editors.Editor.value} 的值。
	 * 
	 * @param [p_triggerEvent=false]
	 *            一个 Boolean 值，表示是否需要触发 {@link mx.editors.Editor.onchanged}
	 *            事件。如果该值为 true，表示需要触发；反之则不触发。
	 */
	me.declineValue = function(p_triggerEvent)
	{
		if (!me.isValidate || $isEmpty(me.$input.val()))
		{
			// 没有通过验证或者为空时
			if($.isNumeric(me.$input.val()) && parseFloat(me.$input.val()) > me.max)
			{
				me.setValue(me.max, p_triggerEvent);
			}
			else
			{
				me.setValue(me.min, p_triggerEvent);
			}
		}
		else
		{
			me.value = parseFloat(me.value);
			var result = me._validateValue(_FixedValue(me.value - me.increment))
			if (result.successful)
			{
				try
				{
					me.setValue(result.value, p_triggerEvent);
				} 
				catch (e)
				{
				}
			}
		}
	};
	
	
	base.setValue = me.setValue;
	me.setValue = function(p_value, p_triggerEvent)
	{
		//这个判断是用来将空字符串转为null，因为数字编辑器不接受空字符串
	    if($isEmpty(p_value))
	    {
	    	p_value = null;
	    }
	    
	    base.setValue(p_value, p_triggerEvent);
	    if (me.value == me.min)
			me.$e.addClass("downButtonDisabled"); 
		else
			me.$e.removeClass("downButtonDisabled");
	    
	    if (me.value == me.max)
			me.$e.addClass("upButtonDisabled"); 
		else
			me.$e.removeClass("upButtonDisabled"); 
	};
	
	function _init()
	{
		me.$input.on("keypress", _input_keypress);
		me.$input.on("keyup", _input_keyup);
		me.$input.on("keydown", _input_keydown);
	}

	function _initMaxAndMin()
	{	
		var tmax,tmin;
		if(me.validOptions){
			if (me.validOptions.maxValue)
				tmax = me.validOptions.maxValue;
			if (me.validOptions.minValue)
				tmin = me.validOptions.minValue;
		}
		if(me.editorOptions && me.editorOptions.validOptions && me.editorOptions.validOptions.DIGIT){
			if (me.editorOptions.validOptions.DIGIT.maxValue)
				tmax = me.editorOptions.validOptions.DIGIT.maxValue;
			if (me.editorOptions.validOptions.DIGIT.minValue)
				tmin = me.editorOptions.validOptions.DIGIT.minValue;
			me.validOptions = me.editorOptions.validOptions;
		}
		
		if(me.editorOptions && me.editorOptions.validOptions && me.editorOptions.validOptions.INTEGER){
			if (me.editorOptions.validOptions.INTEGER.maxValue)
				tmax = me.editorOptions.validOptions.INTEGER.maxValue;
			if (me.editorOptions.validOptions.INTEGER.minValue)
				tmin = me.editorOptions.validOptions.INTEGER.minValue;
			me.validOptions = me.editorOptions.validOptions;
		}
		if (tmax != undefined || tmin != undefined )
		{
			me.max = tmax;
			me.min = tmin;
			if(me.max == undefined)
			{
				me.max = 9007199254740991;
			}
			if(me.min == undefined)
			{
				me.min = 0;
			}
		}
		else
		{
			if(me.max == undefined)
			{
				me.max = 9007199254740991;
			}
			if(me.min == undefined)
			{
				me.min = 0;
			}
			var resultJsonObject={}; 
			var t_validOptions;
			switch (me.valueType)
			{
			case "int":
				me.validType = "INTEGER";
				t_validOptions = {INTEGER:{maxValue: me.max,minValue:me.min}};
				break;
			case "number":
				me.validType = "DIGIT";
				t_validOptions = {DIGIT:{maxValue: me.max,minValue:me.min}};
				break;
			case "float":
				me.validType = "FLOAT";
				t_validOptions = {FLOAT:{maxValue: me.max,minValue:me.min}};
				break;
			case "double":
				me.validType = "FLOAT";
				t_validOptions = {FLOAT:{maxValue: me.max,minValue:me.min}};
				break;
			}
			
	        for(var attr in t_validOptions){  
	            resultJsonObject[attr]=t_validOptions[attr];  
	        }  
	        for(var attr in me.validOptions){  
	            resultJsonObject[attr]=me.validOptions[attr];  
	        }  
			me.validOptions = resultJsonObject;
		}
		
		// 不能为 非数字
		if(isNaN(me.max))
		{
			throw new Error(mx.err("INPUT_ILLEGAL_INT", [me.max]));
		}
		else if(isNaN(me.min))
		{
			throw new Error(mx.err("INPUT_ILLEGAL_INT", [me.min]));
		}
		else
		{
			if(me.min > 9007199254740991 || me.max > 9007199254740991)
			{
				throw new Error(mx.err("INPUT_GREATER_THAN_MAX", [9007199254740991]));	
			}
			else if(me.min < -9007199254740991 || me.max < -9007199254740991)
			{
				throw new Error(mx.err("INPUT_LESS_THAN_MIN", [-9007199254740991]));
			}
			else if(me.max < me.min)
			{
				throw new Error(mx.err("MIN_GREATER_THAN_MAX"));
			}
		}
	}

	// 不接受非法字符，对很多输入法无法拦截
	function _input_keypress(e)
	{
		if (e.which == 45)
		{
			return true;
		}
		if (e.which == 46)
		{
			return true;
		} 
		else
		{
			if ((e.which >= 48 && e.which <= 57 && e.ctrlKey == false && e.shiftKey == false)
					|| e.which == 0 || e.which == 8)
			{
				return true;
			} 
			else
			{
				if (e.ctrlKey == true && (e.which == 99 || e.which == 118))
				{
					return true;
				} 
				else
				{
					return false;
				}
			}
		}
	};
	//检验input中数字是否标准
	function _check_data()
	{
		setTimeout(function(){
			var valStr = me.$input.val() + "";
	    	var regxp1 = /\-*(\d+(\.\d+)*)e([\+\-])(\d+)/;
	    	var regxp2 = /^[+|-]?\d*[\.]?\d*$/;
	    	if (!(regxp1.test(valStr) || regxp2.test(valStr) || /^[+|-]?\d/.test(valStr)))
	    	{
				me.markError(false);
				me.$input.val("");
				//fix bug pms2_667
				me.setText("", true);
	    	}
		},100);
	}
	
	//防止中文状态下输入
	function _input_keydown(e)
	{
		_check_data();
	}
	
	// 键盘输入后验证
	function _input_keyup(e)
	{   
    	var result = me._validateValue(me.$input.val());
		if (result.successful){
			me.markError(false);
		}else{
			me.markError(true, result.hint);
		}
		//触发回车事件
		if(e.keyCode == 13){
			me.trigger("enterkeyup");
		}
		_check_data();		
		return false;
	}
	
	base._validateValue = me._validateValue;
	/**
	 *@ignore 
	 */
	me._validateValue = function(p_value)
	{
	    //先走自己的校验，通过后再走Editor的校验
    	var ret =  _validateValue(p_value);
        if(ret.successful)
    	{
    		if (me.valueType == "float" || me.valueType == "double")
    			if ((/^([+-]?)(\d+)$/).test(p_value))
    				p_value = parseInt(p_value).toFixed(1);
    	    ret = base._validateValue(p_value);
    	}
        //加这句话是确保当value==""时，设置到NumberEditor上的value为null,其实应该不会走。
    	if(ret.value === "")
		{
		    ret.value = null;
		}
		return ret;
	}
	
    
	/**
	 * @ignore
	 * 验证输入值是否合法
	 */
	function _validateValue(p_value)
	{
		var result = { successful: true };
        result.value = p_value;
        // 空不做判断，允许空
		if ($notEmpty(p_value))
		{
			if ($isString(p_value))
	        {
	            try
	            {
	                result.value = me._parseValue(p_value);
	            }
	            catch (e)
	            {
	                result.successful = false;
	                result.hint = e.message;
	            }
	        }
		}
		return result;
	}
	
	me.endOfClass(arguments); 
    return me;
};

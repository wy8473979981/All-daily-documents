$ns("mx.utils");

/**
 * 校验器工具类。根据指定的校验规则类型和相应校验选项校验指定数据是否合规。
 * 
 * @example
 * 以下为 {@link mx.utils.ValidatorClass} 的示例。
 * <code language="JavaScript">
 * mx.utils.Validator = new mx.utils.ValidatorClass();
 * 
 * // 校验身份证码，给出提示。
 * var result = mx.utils.Validator.validate("310212334466", "IDCARD");
 * if (!result.successful)
 * {
 * 	   mx.indicate("info", result.hint);
 * }
 * 
 * // 校验数字。
 * mx.utils.Validator.validate(32, "DIGIT", { minValue: 10, maxValue: 50});
 * </code>
 */
 
mx.utils.ValidatorClass = function()
{
	var me = this;
    
    var _checkUtil = mx.utils.CheckUtil;
    
    /**
     * 常量，表示换行。
     */
    var _CRLF = "\n";
    
    /**
     * 设置校验器是否需要进行非空校验。
     */
    me.required = false;
    
    /**
     * 获取校验的校验规则。一个jSon对象，键值代表了校验名称，值代表了校验名称对应的校验规则的引用
     * 
     * 规则类型包含以下几种。
     * <ul>
     *     <li>NOTNULL</li> 非空
     *     <li>DIGIT</li> 数字
     *     <li>INTEGER</li> 整形
     *     <li>FLOAT</li> 浮点型
     *     <li>MINUSINTEGER</li> 负整数
     *     <li>MINUSFLOAT</li> 负浮点数
     *     <li>PLUSINTEGER</li> 正整数
     *     <li>PLUSFLOAT</li> 正浮点数
     *     <li>CHINESE</li> 中文
     *     <li>LETTER</li> 字母
     *     <li>ASCII</li> 
     *     <li>DATE</li> 日期。例如：2007-07-01
     *     <li>DATETIME</li> 日期时间。例如：2007-07-01 14:28:32
     *     <li>TIME</li>  时间。例如：14:28:32
     *     <li>EMAIL</li> 邮件
     *     <li>IP</li> IP地址
     *     <li>MOBILE</li> 手机号码
     *     <li>PHONE</li> 电话号码
     *     <li>URL</li> 统一资源地址
     *     <li>ZIPCODE</li> 邮编
     *     <li>SQL</li> 
     *     <li>IDCARD</li> 身份证
     *     <li>REGEXP</li> 正则表达式，支持通过指定正则表达式进行校验。
     * </ul>
     */
    me.rules = {
    		NOTNULL: _isNOTNull,
	        DIGIT: _isDigit,
	        INTEGER: _isInteger,
	        MINUSINTEGER: _isMinusInteger,
	        PLUSINTEGER: _isPlusInteger,
	        FLOAT: _isFloat,
	        MINUSFLOAT: _isMinusFloat,
	        PLUSFLOAT: _isPlusFloat,

	        CHINESE: _isChinese,
	        LETTER: _isLetter,
	        ASCII: _isAcsii,
	        
	        DATE: _isDate, 
	        DATETIME: _isDateTime, 
	        TIME: _isTime,
	        
	        EMAIL: _isEmail, 
	        IP: _isIP, 
	        MOBILE: _isMobile, 
	        PHONE: _isPhone, 
	        URL: _isUrl, 
	        ZIPCODE: _isZipCode, 
	        SQL: _isSQL,
	        IDCARD: _isIDCard, 
	        
	        MAXVALUE: _isMaxValue, 
	        MINVALUE: _isMinValue,
	        MINLENGTH: _isMinLength,
	        MAXLENGTH: _isMaxLength,
	        REGEXP: _regularTest
	    }; 
    
    /**
     * 提供一个方法执行校验。
     * @param p_str 表示待校验的字符串。
     * @param p_validType 表示校验类型， 该值为字符串。
     * @param p_options 表示校验参数。常用校验参数有：maxValue, minValue, maxLength, minLength, expression。
     * 					maxValue 表示数字的最大值。该参数在 p_validType 为 DIGIT、INTEGER、MINUSINTEGER、PLUSINTEGER、FLOAT、MINUSFLOAT、PLUSFLOAT 时使用。
     * 					minValue 表示数字的最小值。该参数在 p_validType 为 DIGIT、INTEGER、MINUSINTEGER、PLUSINTEGER、FLOAT、MINUSFLOAT、PLUSFLOAT 时使用。
     * 					expression 表示正则表达式。该参数在 p_validType 为 REGEXP 时使用。
     * 					maxLength 表示字符串的最大长度。
     * 					minLength 表示字符串的最小长度。
     * 					validateMessage 表示验证无效时的提示信息。 
     */
    me.validate = function(p_str, p_validType, p_options)
    {
    	var result = {
            successful: true,
            hint:  mx.msg("INVALID_MESSAGE")
        };
        
        var rules = [];
        var validTypes = [];
        
        if ($notEmpty(p_validType))
        {
        	if ($isString(p_validType))
        	{
        		me.validType = p_validType;
        		
    			validTypes = me.validType.split(",");
    			for (var i = 0; i < validTypes.length; i++) {
    				rules.add(me.rules[validTypes[i]]);
    			}
        	}
        }
            
        if (me.required && $isEmpty(p_str))
        {
        	return $.extend(result, {hint: mx.err("INPUT_NON_NULLABLE"),successful: false});
        }
        else if ($isEmpty(p_str))
        {
        	p_str = null;
        }
        
       
        // 当校验类型为单个时，执行该校验。
        if ($notEmpty(p_options) && $notEmpty(p_options.maxLength))
        {
        	$.extend(result, _isMaxLength(p_str, p_options.maxLength));
        	if (!result.successful)
            {
                if ($notEmpty(p_options.validateMessage))
                {
                    result.hint += _CRLF;
                    result.hint += p_options.validateMessage;
                }
                
                return result;
            }
        }
        if ($notEmpty(p_options) && $notEmpty(p_options.minLength))
        {
        	$.extend(result, _isMinLength(p_str, p_options.minLength));
        	if (!result.successful)
            {
                if ($notEmpty(p_options.validateMessage))
                {
                    result.hint += _CRLF;
                    result.hint += p_options.validateMessage;
                }
                
                return result;
            }
        }
        
        _validateRules(p_str, rules, result, validTypes, p_options);
        
        return result;
    };
    
    /**
     * 根据校验规则进行校验，支持多种校验规则叠加校验。
     * @param p_str 表示待校验的字符串。
     * @param p_rules 表示校验类型对应的校验规则函数引用。
     * @param p_result 表示校验返回结果。值为一个 JSON 对象。
     * @param p_validTypes 表示校验规则标识符，多种规则以逗号分隔。
     * @param p_options 表示校验选项。是一个 JSON 对象。
     */
    function _validateRules(p_str, p_rules, p_result, p_validTypes, p_options)
    {
    	var ruleOption, tmpRet, tmpRet1, tmpRet2;
    	for (var i = 0; i < p_rules.length; i++) {
    		if ($notEmpty(p_options))
    		{
				ruleOption = p_options[p_validTypes[i]];    			
    		}

			if ($isEmpty(ruleOption))
			{
				ruleOption = p_options;
			}
			
			
			if ($notEmpty(ruleOption) && $notEmpty(ruleOption.maxLength))
	        {
				tmpRet1 = _isMaxLength(p_str, ruleOption.maxLength);
	        }
	        if ($notEmpty(ruleOption) && $notEmpty(ruleOption.minLength))
	        {
	        	tmpRet2 = _isMinLength(p_str, ruleOption.minLength);
	        }
	        
			var p_ruleOption = $.extend(true,{},ruleOption);
			tmpRet = p_rules[i](p_str, p_ruleOption);
			
			if ($notEmpty(tmpRet))
			{
				if ($notEmpty(tmpRet1) && !tmpRet1.successful)
				{
					p_result.successful = tmpRet1.successful;
					p_result.hint += _CRLF;
					p_result.hint += tmpRet1.hint;
					tmpRet1.successful = true;
					delete tmpRet1.hint;
				}
				
				if ($notEmpty(tmpRet2) && !tmpRet2.successful) 
				{
					p_result.successful = tmpRet2.successful;
					p_result.hint += _CRLF;
					p_result.hint += tmpRet2.hint;
					tmpRet2.successful = true;
					delete tmpRet2.hint;
				}

				if (!tmpRet.successful)
				{
					p_result.successful = tmpRet.successful;

					if ($notEmpty(ruleOption) && $notEmpty(ruleOption.validateMessage))
					{
						p_result.hint += _CRLF;
						p_result.hint += ruleOption.validateMessage;
					}
					else if ($notEmpty(tmpRet.hint))
					{
						p_result.hint += _CRLF;
						p_result.hint += tmpRet.hint;
						delete tmpRet.hint;
					}
				}
			}
    	}
    	
    	return p_result;
    }
 	
    function _isNOTNull(p_str, p_options)
    {
		var　result = {
			successful: ! _checkUtil.isNull(p_str)
    	};
    	if (!result.successful)
    	{
    		$.extend(result, {hint: mx.err("INPUT_NON_NULLABLE")});
    	}
    	return result;
    }
    
    function _checkValue(p_result,p_str, p_options)
    {
    	p_options.validateMessage = "";
    	var result = p_result;
		if ($notEmpty(p_options))
		{
			if ($notEmpty(p_options.maxValue))
			{
				$.extend(result, _isMaxValue(p_str, p_options.maxValue, true));
				if (!result.successful)
					return result;
			}
			if ($notEmpty(p_options.minValue))
			{
				$.extend(result, _isMinValue(p_str, p_options.minValue, true));
				if (!result.successful)
					return result;
			}
		}
    }
    function _isDigit(p_str, p_options)
    {
    	var　result = {
    		successful: _checkUtil.isDigit(p_str)
    	};
    	if (result.successful)
    	{
    		_checkValue(result, p_str, p_options);	
    	}
    	else
    	{
    		$.extend(result, {hint: mx.msg("ENTER_DIGIT")});
    	}
    	return result;
    }
    
    function _isInteger(p_str, p_options)
    {
    	var　result = {
    		successful: _checkUtil.isInteger(p_str)
    	};
    	if (result.successful)
    	{
    		_checkValue(result, p_str, p_options);	
    	}
    	else
    	{
    		$.extend(result, {hint: mx.msg("ENTER_INTEGER")});
    	}
    	return result;
    }
    
    function _isMinusInteger(p_str, p_options)
    {
    	var　result = {
    		successful: _checkUtil.isMinusInteger(p_str)
    	};
    	if (result.successful)
    	{
    		_checkValue(result, p_str, p_options);
    	}
    	else
    	{
    		$.extend(result, {hint: mx.msg("ENTER_MINUS_INTEGER")});
    	}
    	return result;
    }
    
    function _isPlusInteger(p_str, p_options)
    {
    	var　result = {
    		successful: _checkUtil.isPlusInteger(p_str)
    	};
    	if (result.successful)
    	{
    		_checkValue(result, p_str, p_options);
    	}
    	else
    	{
    		$.extend(result, {hint: mx.msg("ENTER_PLUS_INTEGER")});
    	}
    	return result;
    }
    
    function _isFloat(p_str, p_options)
    {
    	var　result = {
    		successful: _checkUtil.isFloat(p_str)
    	};
    	if (result.successful)
    	{
    		_checkValue(result, p_str, p_options);
    	}
    	else
    	{
    		$.extend(result, {hint: mx.msg("ENTER_FLOAT")});
    	}
    	return result;
    }
    
    function _isMinusFloat(p_str, p_options)
    {
		var　result = {
		successful: _checkUtil.isMinusFloat(p_str)
    	};
    	if (result.successful)
    	{
    		_checkValue(result, p_str, p_options);
    	}
    	else
    	{
    		$.extend(result, {hint: mx.msg("ENTER_MINUS_FLOAT")});
    	}
    	return result;
    }
    
    function _isPlusFloat(p_str, p_options)
    {
		var　result = {
		successful: _checkUtil.isPlusFloat(p_str)
    	};
    	if (result.successful)
    	{
    		_checkValue(result, p_str, p_options);
    	}
    	else
    	{
    		$.extend(result, {hint: mx.msg("ENTER_PLUS_FLOAT")});
    	}
    	return result;
    }
    
    function _isMaxValue(p_str, p_maxValue, p_isFloat)
    {
    	var result = {
    		successful: _checkUtil.isMaxValue(p_str, p_maxValue, p_isFloat)
    	}
    	if (!result.successful)
    	{
    		$.extend(result, {hint: mx.err("INPUT_GREATER_THAN_MAX", [p_maxValue])})
    	}
    	return result;
    }
    
    function _isMinValue(p_str, p_minValue, p_isFloat)
    {
    	var result = {
    		successful: _checkUtil.isMinValue(p_str, p_minValue, p_isFloat)
    	}
    	if (!result.successful)
    	{
    		$.extend(result, {hint: mx.err("INPUT_LESS_THAN_MIN", [p_minValue])});
    	}
    	return result;
    }
    
    function _isMinLength(p_str, p_minLength)
    {
    	var result = {
    		successful: _checkUtil.isMinLength(p_str, p_minLength - 1)
    	}
    	if (!result.successful)
    	{
    		$.extend(result, {hint: mx.err("INPUT_LENGTH_LESS_THAN_MIN", [p_minLength])});
    	}
    	return result;
    }
    
    function _isMaxLength(p_str, p_maxLength)
    {
    	var result = {
    		successful: _checkUtil.isMaxLength(p_str, p_maxLength + 1)
    	}
    	if (!result.successful)
    	{
    		$.extend(result, {hint: mx.err("INPUT_LENGTH_GREATER_THAN_MAX", [p_maxLength])})
    	}
    	return result;
    }
    
    function _isChinese(p_str, p_options)
    {
    	var　result = {
		successful: _checkUtil.isChinese(p_str)
    	};
    	if (!result.successful)
    	{
    		$.extend(result, {hint: mx.msg("ENTER_CHINESE")});
    	}
    	return result;
    }
    
    function _isLetter(p_str, p_options)
    {
    	var　result = {
		successful: _checkUtil.isLetter(p_str)
    	};
    	if (!result.successful)
    	{
    		$.extend(result, {hint: mx.msg("ENTER_LETTER")});
    	}
    	return result;
    }
    
    function _isAcsii(p_str, p_options)
    {
    	var result = {
    		successful: _checkUtil.isAcsii(p_str)
    	}
    	if (!result.successful)
    	{
    		$.extend(result, {hint: mx.err("NON_ASCII")});
    	}
    	return result;
    }
    
    function _isDate(p_str, p_options)
    {
    	var result = {
    		successful: _checkUtil.isDate(p_str)
    	}

    	if (!result.successful)
    	{
    		$.extend(result, {hint: mx.msg("ENTER_DATE")});
    	}
		else
    	{
    		if ($notEmpty(p_options))
    		{
    			$.extend(result, _checkDateLimits(p_str, p_options));
    		}	
    	}

    	return result;
    }
    
    function _isDateTime(p_str, p_options)
    {
    	var result = {
    		successful: _checkUtil.isDateTime(p_str)
    	}

    	if (!result.successful)
    	{
    		$.extend(result, {hint: mx.msg("ENTER_DATETIME")});
    	}
    	else
    	{
    		if ($notEmpty(p_options))
    		{
    			$.extend(result, _checkDateLimits(p_str, p_options));
    		}	
    	}
    	
    	return result;
    }
    
    function _isTime(p_str, p_options)
    {
    	var result = {
    		successful: _checkUtil.isTime(p_str)
    	}
    	if (result.successful)
    	{
    		$.extend(result, _checkTimeMinAndMax(p_str,p_options));
    		if (!result.successful)
        	{
        		return result;
        	}
    	}
    	if (!result.successful)
    	{
    		$.extend(result, {hint: mx.msg("ENTER_TIME")});
    	}
    	return result;
    }
    
    function _checkTimeMinAndMax(p_str,p_options){
    	var result = {
	    		successful: true
	    }
    	if ($notEmpty(p_options) && ($notEmpty(p_options.maxValue) || $notEmpty(p_options.minValue)))
		{	
			var date = new Date();
			date.setHours(0);
			date.setMinutes(0);
			date.setSeconds(0);
			var v = date.clone();
			
			function setTime(p_date,p_param){
				if($isString(p_param)){
	    		    var hms = p_param.split(":");
	    			for(var i=0;i<hms.length;i++){
	    				if(i==0){
	    					p_date.setHours(hms[i]);
	    				}else if(i==1){
	    					p_date.setMinutes(hms[i]); 
	    				}else if(i==2){
	    					p_date.setSeconds(hms[i]);
	    				}else{
	    					break;
	    				}
	    			}   
	    	    }else if($isDate(p_param)){
	    	    	p_date.setHours(p_param.getHours());
	    	    	p_date.setMinutes(p_param.getMinutes()); 
	    	    	p_date.setSeconds(p_param.getSeconds()); 
	    	    }
			}
			//设置待校验时间为date类型
			setTime(v,p_str);
			
			if ($notEmpty(p_options.maxValue))
			{
				var max = date.clone();
			    setTime(max,p_options.maxValue);
    			if(v>max){
 				   result.successful = false;
 				   result.hint =mx.err("INPUT_GREATER_THAN_MAX", [p_options.maxValue]);
 				   return result;
 				}
			}
			if ($notEmpty(p_options.minValue))
			{
				var min = date.clone();
				setTime(min,p_options.minValue);
				if(v<min){
				   result.successful = false;
				   result.hint =mx.err("INPUT_LESS_THAN_MIN", [p_options.minValue]);
				   return result;
				}
			}
		}
    	return result;
    }
    
    function _isEmail(p_str, p_options)
    {
    	var result = {
    		successful: _checkUtil.isEmail(p_str)
    	}
    	if (!result.successful)
    	{
    		$.extend(result, {hint: mx.msg("ENTER_EMAIL")});
    	}
    	return result;
    }
    
    function _isIP(p_str, p_options)
    {
    	var result = {
    		successful: _checkUtil.isIP(p_str)
    	}
    	if (!result.successful)
    	{
    		$.extend(result, {hint: mx.msg("ENTER_IP")});
    	}
    	return result;
    }
    
    function _isMobile(p_str, p_options)
    {
    	var result = {
    		successful: _checkUtil.isMobile(p_str)
    	}
    	if (!result.successful)
    	{
    		$.extend(result, {hint: mx.msg("ENTER_MOBILE")});
    	}
    	return result;
    }
    
    function _isPhone(p_str, p_options)
    {
    	var result = {
    		successful: _checkUtil.isPhone(p_str)
    	}
    	if (!result.successful)
    	{
    		$.extend(result, {hint: mx.msg("ENTER_PHONE")});
    	}
    	return result;
    }
    
    function _isUrl(p_str, p_options)
    {
    	var result = {
    		successful: _checkUtil.isUrl(p_str)
    	}
    	if (!result.successful)
    	{
    		$.extend(result, {hint: mx.msg("ENTER_URL")});
    	}
    	return result;
    }
    
    function _isZipCode(p_str, p_options)
    {
    	var result = {
    		successful: _checkUtil.isZipCode(p_str)
    	}
    	if (!result.successful)
    	{
    		$.extend(result, {hint: mx.msg("ENTER_ZIPCODE")});
    	}
    	return result;
    }
    
   	function _isSQL(p_str, p_options)
   	{
		var result = _checkUtil.isSqlInjection(p_str);
    	if (!result.successful)
    	{
    		$.extend(result, {hint: mx.msg("SQL_INJECTION", {sql: result.hint})});
    	}
    	return result;
   	}
   	
   	function _isIDCard(p_str, p_options)
   	{
   		var result = {
			successful: _checkUtil.isIDCard(p_str)
    	}
    	if (!result.successful)
    	{
    		$.extend(result, {hint: mx.msg("ENTER_IDCARD")});
    	}
    	return result;
   	}
    
   	function _regularTest(p_str, p_options)
   	{
   		var result = {
   			successful: true
   		}
   		
   		if($isEmpty(p_str))
   		{
   			return result;
   		}
   		
   		if ($notEmpty(p_options))
   		{
   			var exp = p_options.expression;
	   		try
	   		{
				result.successful = exp.test(p_str);
	   		}
	   		catch(e)
	   		{
	   			result.successful = false;
	   			result.hint = p_options.validateMessage;
	   		}
   		}
   		return result;
   	}
   	
   	
   	
   	/**
     * 检查日期值是否在指定的区间。
     */
   	function _checkDateLimits(p_value, p_options)
   	{
   		var result = {
   			successful: true
   		}
   		
    	if ($isDate(p_value))
    	{
			p_value = Date.format(p_value);
    	}
   		
   		if ($notEmpty(p_options.maxValue))
		{
			try
			{
				result.successful = parseDate(p_value) <= parseDate(p_options.maxValue);
			}
			catch(e)
			{
				result.successful = false;
			}
			
			if (!result.successful)
	    	{
	    		$.extend(result, {hint: mx.err("INPUT_GREATER_THAN_MAX", [p_options.maxValue])})
	    	}
		}
		
		if (result.successful && $notEmpty(p_options.minValue))
		{
			try
			{
				result.successful = parseDate(p_value) >= parseDate(p_options.minValue);
			}
			catch(e)
			{
				result.successful = false;
			}
			
			if (!result.successful)
	    	{
	    		$.extend(result, {hint: mx.err("INPUT_LESS_THAN_MIN", [p_options.minValue])});
	    	}
		}
		
		return result;
   	}

    return me;
};
$ns("mx.editors");

$import("mx.editors.UpDownEditor");

/**
 * 提供一个时间编辑控件。
 * 
 * @example
 * 以下是一个 {@link mx.editors.TimeEditor} 控件使用示例。
 * <code language="JavaScript">
 * var timeEditor = new mx.editors.TimeEditor({
 *     width: 100,
 *     formatString:"HH:mm"
 * });
 * </code>
 */
mx.editors.TimeEditor = function()
{
	var me = $extend(mx.editors.UpDownEditor);
	var base = {};
	
	 /**
     * 获取一个值，表示 {@link mx.editors.TimeEditor} 的值。
     */
    me.value = null;
    
    /**
     * 详见 {@link mx.editors.Editor.valueType} 字段。
     */
    me.valueType = "time";
    
    /**
     * 获取格式说明符字符，指示如何显示值。请使用 {@link setFormatString} 方法设置该字段的值。<br/>
     * 该字段的可选值包括:
     * <ul>
     *     <li>HH</li>
     *     <li>HH:mm</li>
     *     <li>HH:mm:ss</li>
     * </ul>
     * @default HH:mm:ss
     */
    me.formatString = "HH:mm:ss";
    
    /**
     * @ignore
     */
    me.regex = null;
    
    base.init = me.init;
    me.init = function()
    {
        base.init();
        _init();
        me.$input.on("focus", _onfocus);
        me.$input.on("select", _onselect);
    };

    base.setValue = me.setValue;
    /**
     * @ignore
     */
    me.setValue = function(p_value, p_triggerEvent)
    {
    	var value = p_value;
    	if(me.valueType == "time")
    	{
    		if ($isDate(value))
    		{
    			value = Date.format(value, "HH:mm:ss");
    		}
    		else
    		{
    			value = $format(parseDate(value), me.formatString)
    		}
    	}
    	base.setValue(value, p_triggerEvent);
    }
    
	/**
     * @ignore
	 * 覆盖Editor中的方法，勿删
     */
    me._input_change = function()
    {
       
    };
	
    /**
     * 设置 {@link formatString} 字段的值。
     * @param p_format 一个用来表示时间格式的字符串
     */
    me.setFormatString = function(p_format)
    {
        var format = p_format ? p_format.toLowerCase() : "HH:mm:ss";
        if (format == "hh:mm:ss" || format == "HH:mm:ss")
        {
            me.formatString = "HH:mm:ss";
        }
        else if (format == "hh:mm")
        {
            me.formatString = "HH:mm";
        }
        else if (format == "hh")
        {
            me.formatString = "HH";
        }
        else
        {
            throw new Error(mx.err("UNSUPPORTED_FORMAT", [format]));
        }
        
        var timeStr = "";
        if ($notEmpty(me.value))
        {
        	var val = me.value;
        	if (typeof me.value == 'string')
        	{
        		val = parseDate(val);
        	}
            timeStr = me._formatValue(val);
        }
        me.$input.val(timeStr);
    };
    
    var isIncrease = false;
    /**
     * 将 {@link value} 字段的值增长 1 个单位。
     */
    me.increaseValue = function()
    {
        me.changeValue(_selectedPart, 1);
        isIncrease = true;
    };
    
    /**
     * 将 {@link value} 字段的值减少 1 个单位。
     */
    me.declineValue = function()
    {
        me.changeValue(_selectedPart, -1);
        isIncrease = false;
    };
    
    /**
     * @ignore
     */
    me.changeValue = function(p_part, p_increament)
    {
        var newValue = null;
        if ($isEmpty(me.value))
        {
            newValue = _getDefaultValue();
            
        }
        else
        {
            if ($isString(me.value))
            {
            	if((me.formatString == "HH" || me.formatString == "hh") && !me.value.contain(":"))
            	{
            		newValue = me.value + ":00:00";
            		{
            			newValue = parseDate(newValue);
            		}
            	}
            	else
        		{
            		newValue = parseDate(me.value);
        		}
            }
            else
            {
                newValue = me.value.clone();
            }
        }
        
        
        if (p_part == "H")
        {
        	if(!me.isValidate && ((isIncrease && p_increament == -1)|| (!isIncrease && p_increament == 1)))
            {
        		p_increament = 0;
            }
            newValue.setHours(newValue.getHours() + p_increament);
        }
        else if (p_part == "m")
        {
            newValue.setMinutes(newValue.getMinutes() + p_increament);
        }
        else if (p_part == "s")
        {
            newValue.setSeconds(newValue.getSeconds() + p_increament);
        }
        
        me.setValue(newValue, true);
    };
    
    /**
     * @ignore
     */
    me._formatValue = function(p_value)
    {
    	if($isString(p_value))
    	{
    		p_value = parseDate(p_value);
    	}
        return $format(p_value, me.formatString);
    };
    
    function _init()
    {
    	if ($isEmpty(me.formatString))
    	{
    		me.formatString = "HH:mm:ss";
    	}
    	//_input_selectionchanged();
        me.$input.keydown(_input_selectionchanged).keyup(_input_selectionchanged).mousedown(_input_selectionchanged).mouseup(_input_selectionchanged); 
        me.setFormatString(me.formatString);
		me.$input.on("keypress", _input_keypress);
		me.$input.on("keydown", checkFormat);
		me.$input.on("blur", function(){
			 var val = "";
			 var varArray = me.$input.val().split(":");
			 for(var i=0;i<varArray.length;i++){
				if(varArray[i].length>2){
					val+=varArray[i].replaceAll(" ","")+":";
				}else{
					val+=varArray[i].replaceAll(" ","0")+":";
				}
			 }	
			 me.setValue(val.substring(0,val.length-1),me.$input.val()!=me.value);
		});
    }
    
    function checkFormat(e){
	
		if(e.keyCode == 8 || e.keyCode == 46){
			var start = e.target.selectionStart;
			var end = e.target.selectionEnd;
			var val = e.target.value;
			var len =val.length;
			var cursorPosition = 0;
			if((start == end) && ((e.keyCode == 8 && start==0)||(e.keyCode == 46 && start == len))){
				return;
			}
			if((end - start == 2) && ((e.keyCode == 8 && end==len))){
				return;
			}
			if (start == end || end - start == 2){
				if (e.keyCode == 8){
					if (val.charAt(end-1) == ":")
					{
						event.returnValue=false;
					}
					else 
					{
						var t_end = val.lastIndexOf(":");
						if (start <= t_end )
						{
							if(start == end)
							{
								val = val.substr(0,start-1) +" " + val.substr(end,len) ;
								cursorPosition = -1;
							}
							else
							{
								if(!me.readOnly){
									val = val.substr(0,start) +"  " + val.substr(end,len) ;
								}
								
							}
							event.returnValue = false;
						}
					}
				}
				else if (e.keyCode == 46 )
				{
					if(start == end)
					{
						if (val.charAt(end) == ":")
						{
							event.returnValue=false;
						}
						else
						{
							if(!me.readOnly){
								val=val.substr(0,start) + " " + val.substr(end+1,8)
							};
							event.returnValue = false;
							cursorPosition = 1;
						}
					}
					else
					{
						if(!me.readOnly){
							val=val.substr(0,start) + "  " + val.substr(end,8)
						};
						event.returnValue = false;
						cursorPosition = 2;
					}
				}
			}
			
			if(val.substring(e.target.selectionStart,e.target.selectionEnd).indexOf(":") > -1)
			{
				 event.returnValue=false;
			}
				
			me.$input.val(val);
			me.$input.setCursorPosition(start + cursorPosition);
			
		}
	}

    var _selectedPart = "H";
    function _input_selectionchanged()
    {
        _selectedPart = _getSelectedPart();
    }
    
    
    
    function _getSelectedPart()
    {
    	// ie8中: 如果 input 不在页面中抛异常：由于该控件目前不可见、未启用或其类型不允许，因此无法将焦点移向它。
    	var selectionStart = 0;
    	try
    	{
    		selectionStart = me.$input.getSelection().start;
    	}
    	catch(e)
    	{
    	}
        var p = null;
        if (selectionStart >= me.$input.val().length - 1)
        {
            p = me.formatString.substr(me.formatString.length - 1, 1);
        }
        else
        {
            p = me.formatString.substr(selectionStart, 1);
            if (p == ":")
            {
                p = me.formatString.substr(selectionStart - 1, 1);
            }
        }
        if (p == null || p == "")
        {
            p = "H";
        }
        return p;
    }
    
    function _onfocus()
    {        
        if ($isEmpty(me.$input.val()) && $isEmpty(me.value))
        {
            me.setValue(_getDefaultValue(), true);
        }
    }
    
    // 解决【XM-PMS2.0-610】
    // 填写时、分、秒时，中间冒号不固定，修改时很容易选中冒号，故现场要求将冒号固定住
    function _onselect(){
 	   var selectText = me.$input[0].value.substring(me.$input[0].selectionStart,me.$input[0].selectionEnd);
 	   var startWithColon = ":" == selectText.substring(0,1);
 	   var endWithColon = ":"==selectText.substring(selectText.length-1,selectText.length);
 	   // 被选择的文字开头包含冒号，去掉冒号的选择范围
 	   if(startWithColon && !endWithColon){
 		   me.$input[0].setSelectionRange(me.$input[0].selectionStart+1,me.$input[0].selectionEnd);
 	   // 被选择的文字结尾包含冒号，去掉冒号的选择范围
 	   } else if (!startWithColon && endWithColon ) {
 		   me.$input[0].setSelectionRange(me.$input[0].selectionStart,me.$input[0].selectionEnd-1);
 	   // 被选择的文字开头和结尾都包含冒号，去掉冒号的选择范围
 	   } else if (startWithColon && endWithColon) {
 		   me.$input[0].setSelectionRange(me.$input[0].selectionStart+1,me.$input[0].selectionEnd-1);
 	   }
    }
    
    function _getDefaultValue()
    {
    	var date = new Date();
    	date.setFullYear(1900, 0, 1);
    	if (me.validOptions)
    	{
    		if (me.validOptions.minValue)
    		{
    			setTime(date,me.validOptions.minValue);
    		}
    		else if (me.validOptions.maxValue)
    		{
    			setTime(date,me.validOptions.maxValue);
    		}
    	}
    	return date;
    }
    
    function setTime(p_date,p_param)
    {
		if($isString(p_param))
		{
		    var hms = p_param.split(":");
			for (var i=0;i<hms.length;i++)
			{
				if (i==0)
				{
					p_date.setHours(hms[i]);
				}
				else if (i==1)
				{
					p_date.setMinutes(hms[i]); 
				}
				else if (i==2)
				{
					p_date.setSeconds(hms[i]);
				}
				else
				{
					break;
				}
			}   
	    }
		else if ($isDate(p_param))
		{
	    	p_date.setHours(p_param.getHours());
	    	p_date.setMinutes(p_param.getMinutes()); 
	    	p_date.setSeconds(p_param.getSeconds()); 
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
	    
	me.endOfClass(arguments); 
    return me;
};

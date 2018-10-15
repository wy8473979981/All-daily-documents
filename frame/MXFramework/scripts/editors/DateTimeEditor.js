$ns("mx.editors");

$import("mx.controls.Calendar");
$import("mx.editors.ComboEditor");
$import("mx.controls.Button");

/**
 * 提供一个下拉的日期选择控件。
 * 
 * @example
 * 以下是一个 {@link mx.editors.DateTimeEditor} 控件使用示例。
 * <code language="JavaScript">
 * var dataTimeEditor = new mx.editors.DateTimeEditor({
 *     value: "2012-08-08",
 *     formatString: "yyyy-MM-dd"
 * });
 * </code>
 */
mx.editors.DateTimeEditor = function()
{
    var me = $extend(mx.editors.ComboEditor);
    var base = {};

    /**
     * @default true
     */
    me.postponesDropDown = true;
    
    /**
     * @ignore
     * 显示年月的面板，默认是false
     */
    var _enabledYMPanel = false;

    /**
     * 或设置获取一个字符串，表示 {@link value} 的数据类型。详见 {@link mx.editors.Editor.valueType} 字段。
     * 该字段必须在初始化前设置。
     * <p>
     * 该字段可选的值包括：
     * <ul>
     *      <li><b>date</b>值的格式为"yyyy-MM-dd"</li>
     *      <li><b>datetime</b>值的格式为"yyyy-MM-dd HH:mm:ss"</li>
     * </ul>
     * </p>
     *
     * @default date
     */
    me.valueType = "date";

    /**
     * 获取格式说明符字符，指示如何显示值。请使用 {@link mx.editors.Editor.setFormatString} 方法设置该字段的值。<br/>
     * 该字段的可选值包括:
     * <ul>
     *     <li>yyyy</li>
     *     <li>yyyy-MM</li>
     *     <li>yyyy-MM-dd</li>
     *     <li>yyyy-MM-dd HH</li>
     *     <li>yyyy-MM-dd HH:mm</li>
     *     <li>yyyy-MM-dd HH:mm:ss</li>
     * </ul>
     * 
     * @default yyyy-MM-dd
     */
    me.formatString = "yyyy-MM-dd";
    
    var _formatString = "yyyy-MM-dd";
    
    var _customFormatString = null;
    
    //added by tiger on 2014/9/23 13:31:51
    var _bReset = false;
    //end add
    
    /**
     * 获取一个值，表示是否显示 {@link timeEditor} 对象。如果该值为 true，则显示；反之则不显示。
     * 请使用 {@link setDisplayTime} 方法设置该字段的值。
     * 
     * @default false
     */
    me.displayTime = false;
    
    /**
     * 获取一个 {@link mx.controls.Calendar} 对象，表示下拉的日期控件。
     */
    me.calendar = null;

    /**
     * @ignore
     */
    me.dropDownControl = null;

    /**
     * @default none
     */
    me.dropDownAnimation = "none";

    base.init = me.init;
    base.setFormatString = me.setFormatString;
    me.init = function()
    {
    	_displayTime = me.displayTime;
    	me.setFormatString(me.formatString);
        base.init();
        me.$e.addClass("dateTimeEditor");
        me.$e.attr("id", "dateTimeEditor");
    };
    
    // 记录是属性中设置的me.displayTime值还是根据p_formatString判断设置的me.displayTime值
    var _displayTime = false;
    var reg_ymddhms = /^y{4}(-|\/)m{1,2}(-|\/)d{1,2} h{1,2}:m{1,2}(:s{1,2})?$/i;
    var reg_ymd = /^y{4}(-|\/)m{1,2}((-|\/)d{1,2})?$/i;
    /**
     * 根据指定格式化字符串的设置日期的显示方式。
     * 
     * @param p_formatString 一个字符串，表示日期时间需要表现的格式 {@link formatString} 。
     */
    me.setFormatString = function(p_formatString){
    	_customFormatString = p_formatString;
    	if ($isEmpty(p_formatString)|| !$isString(p_formatString)){
    		_formatString = "yyyy-MM-dd";
    		return;
    	}
    	if (p_formatString.indexOf("ss") > -1)
        {
        	_formatString = "yyyy-MM-dd HH:mm:ss";
        	me.valueType = "datetime";
        	me.displayTime = true;
        }
        else if(p_formatString.indexOf("mm") > -1)
        {
        	_formatString = "yyyy-MM-dd HH:mm";
        	me.valueType = "datetime";
        	me.displayTime = true;
        }
        else if(p_formatString.indexOf("HH") > -1 || p_formatString.indexOf("hh") > -1)
        {
        	_formatString = "yyyy-MM-dd HH";
        	me.valueType = "datetime";
        	me.displayTime = true;
        }
        else if(p_formatString.indexOf("dd") > -1)
        {
        	_formatString = "yyyy-MM-dd";
        	_enabledYMPanel = false;
        }
        else if(p_formatString.indexOf("MM") > -1)
        {
        	_formatString = "yyyy-MM";
        	me.displayTime = false;
        	_enabledYMPanel = true;
        }
        else if(p_formatString.indexOf("yyyy") > -1)
        {
        	_formatString = "yyyy";
        	me.displayTime = false;
        	_enabledYMPanel = true;
        }
    	
    	if (me.validType != null){
    		//此正则匹配yyyy-mm-dd hh:mm:ss 或 yyyy-mm-dd hh:mm
    		if(reg_ymddhms.test(p_formatString)){
    			me.validType = "DATETIME";
    		}else if(reg_ymd.test(p_formatString)){ //此正则匹配yyyy-mm-dd 或 yyyy-mm
    			me.validType = "DATE";
    		}else{
    			me.validType = null;
    		}
    	}
    	
    	me.$input.val($format(parseDate(me.value), _formatString));
    	base.setFormatString(_formatString);
    	if(me.calendar){//改变格式时重新初始化日历显示框
    		me._initDropDownControl(true);
    	}
    	
    };
    
    base.setValue = me.setValue;
    /**
     * @ignore
     */
    me.setValue = function(p_value, p_triggerEvent)
    {
    	// 使传输的值统一为 "yyyy-MM-dd HH:mm:ss" 格式，省略的时间补00:00:00，省略的月份日期补01
    	// 因为日历控件传来的值和手动输入的值，不确定是否格式化成预期的值
    	if(typeof p_value == "string")
    	{
    		p_value = parseDate(p_value);
    	}
    	else if ($isNumber(p_value))
        {
            p_value  = new Date(p_value);
        }
    	var strValue = Date.format(p_value, _formatString);
    	var value = parseDate(strValue);
    	base.setValue(value, p_triggerEvent);
    }
    
    base.setAllowEditing = me.setAllowEditing;
    
    /**
     * @ignore
     */
    me._formatValue = function(p_value){
    	return $format(p_value, _customFormatString);
    }
    
    /**
     * @ignore
     */
    me.setAllowEditing = function(p_allowEditing)
    {
    	base.setAllowEditing(p_allowEditing);
    	if (me.allowEditing == true)
        {
            me.$input.on("focus", function(){
            	if(me.value == null)
            	{
            		me.setValue(new Date(), true);
            	}
            });
            me.$input.on("blur", function(){
            	//me.text = me._formatValue(parseDate(me.value));
            	me.$input.val(me.text);
            });
        }
    }
    
    
    var dropTime = null;
    /**
     * @ignore
     */
    me._initDropDownControl = function(isChange)
    {
        if (me.dropDownControl == null||isChange)
        {
            me.calendar = new mx.controls.Calendar({ 
            	value:me.value || new Date(), 
            	formatString:  _displayTime ? "yyyy-MM-dd HH:mm:ss" : _formatString,
            	displayTime: me.displayTime, 
                ondateclick: _calendar_date_changed
            });
            
            var $timetr = me.calendar.$e.find("tr#timeRow");
            if ($timetr.size() > 0)
            {
                var $td = $timetr.find("td");
                $td.attr("colspan","5");
                var $upDownEditor = $td.find("div.upDownEditor");
                $upDownEditor.css("left", "15px");
                var button = new mx.controls.Button({text:mx.msg("OK"), width:"40px", onclick:_ok_btn_click});
                button.$e.find("input").css("padding",0);
                var $btnTd = $("<td/>");
                $btnTd.attr("colspan","2");
                $btnTd.append(button.$e);
                $timetr.append($btnTd);                
            }
            else
            {
            	me.calendar.$e.find("#monthLabel").on("click", function(){
            		me.calendar.$e.find("div[id=ymSelector]").addClass("ymSelector_displayTime");;
            	});
            	
            	if (_enabledYMPanel)
            	{
            		me.calendar.$e.find("#ok_YM").click(_get_ym);
            		me.calendar.$e.find("#cancel_YM").click(_cancel_ym);
            	}
            	else	
            	{
            		var _$tr = $("<tr>");
                	_$tr.height(30);
                	var btnOk = new mx.controls.Button({text:mx.msg("OK"), width:"60px", onclick:_btn_ok_click});
                	var btnCancel = new mx.controls.Button({text:mx.msg("CANCEL"), width:"60px", onclick:_btn_cancel_click});
                	
                	var _$td = $("<td colspan=3 align=right style='*+padding-left:14px;'/>");
                	var _$td2 = $("<td colspan=3 align=left/>");
            		_$td.append(btnOk.$e);
                	_$td2.append(btnCancel.$e);
                	_$tr.append(_$td).append("<td>").append(_$td2);
            	}
            	
            	me.calendar.$e.find("table").append(_$tr);
            }
        }
        dropTime = new Date();
        me.dropDownControl = me.calendar;
        me.dropDownControl.$e.addClass("mx");
        me.dropDownControl.$e.addClass("dropDown");
    };
    
    /**
     * reset方法，重置日期控件的值
     */
    base.reset = me.reset;
    me.reset = function(){
    	base.reset();
    	me.text = "";
		_bReset = true;
    }
    
    /**
     * @ignore
     * 下拉前重置日历控件的值
     */
    base._beforeDropDown = me._beforeDropDown;
    me._beforeDropDown = function(){    	
    	base._beforeDropDown();
    	
    	if(_bReset && me.calendar){
    		_bReset = false;
    		
    		var now = new Date();
    		
    		if(me.text == ""){
    			me.calendar.setValue(now);
    			if (me.calendar.timeEditor != undefined){
        			me.calendar.timeEditor.setValue(now);
        		}
    		}
    		if(me.text != ""){
    			me.calendar.setValue(me.value);
    			if(me.calendar.timeEditor != null){
    				me.calendar.timeEditor.setValue(me.value);
    			}
    			
    		}
    		
    	}	
    }
    
    
    function _get_ym(e)
    {
    	me.setValue($format(me.calendar.value, me.formatString), true);
    	me.calendar.$e.hide();
    }
    
    function _cancel_ym(e)
    {
    	me.calendar.$e.hide();
    }

    function _calendar_date_changed(e)
    {
        me.setValue(me.calendar.value, true);
        me.hideDropDown();
    }
        
    function _calendar_dayclick(e)
    {
        me.hideDropDown();
    }
    
    function _ok_btn_click(e)
    {
        if ($isEmpty(me.calendar.value))
        {
            if (dropTime != null)
            {
                me.calendar.value = dropTime;
            }
            else
            {
                me.calendar.value = new Date();
            }
            me.setValue($format(me.calendar.value, "yyyy-MM-dd HH:mm:ss"), true);
        }
        else
        {
            me.setValue($format(me.calendar.value, "yyyy-MM-dd") + " " + $format(parseDate(me.calendar.timeEditor.value), "HH:mm:ss"), true);
        }
        
        me.hideDropDown();
    };
    
    function _btn_ok_click(e)
    {
    	var _year_month = me.calendar.$e.find("table>tbody>tr>td#monthLabel").html().trim();
    	var _year = _year_month.split("-")[0];
    	var _month = _year_month.split("-")[1];
    	var _date = me.calendar.$e.find("table>tbody>tr>td.selected").html();
    	if ($notEmpty(_date) && $notEmpty(_date.trim()))
    	{
    		_date = _date.trim();
    	}
    	else
    	{
    		_date = new Date().getDate();
    	}
    	me.setValue(new Date(_year, _month - 1, _date), true);
    	me.hideDropDown();
    }
    
    function _btn_cancel_click(e)
    {
        me.hideDropDown();
    }

    me.endOfClass(arguments); 
    return me;
};
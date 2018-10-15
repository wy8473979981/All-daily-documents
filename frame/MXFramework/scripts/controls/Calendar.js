$ns("mx.controls");

$import("mx.editors.TimeEditor");

/**
 * 提供一个日历控件的类。
 * 
 * @example
 * 以下是创建 {@link mx.controls.Calendar} 的示例。
 * 该示例将说明如何创建一个初始值为当前日期的 {@link mx.controls.Calendar}。
 * <code language="JavaScript">
 * var calendar = new mx.controls.Calendar();
 * </code>
 * 
 * @example
 * 该示例将说明如何创建一个同时显示时间的 {@link mx.controls.Calendar}，并设置日期格式。
 * <code language="JavaScript">
 * var calendar = new mx.controls.Calendar({
 *     displayTime: true,
 *     formatString: "yyyy-mm-dd hh:mm:ss"
 * });
 * </code>
 */
mx.controls.Calendar = function()
{
    var me = $extend(mx.controls.Control);
    var base = {};
    
    var _today = new Date();
    _today = new Date(_today.getFullYear(), _today.getMonth(), _today.getDate());
    
    /**
     * 获取控件当前显示的日期和时间值。请使用 {@link setValue} 方法设置该字段的值。
     */
    me.value = null;
    
    /**
     * 获取格式说明符字符，指示如何显示值。请使用 {@link setFormatString} 方法设置该字段的值。<br/>
     * 该字段的可选值包括:
     * <ul>
     *     <li>yyyy-MM</li>
     *     <li>yyyy-MM-dd</li>
     *     <li>yyyy-MM-dd HH:mm</li>
     *     <li>yyyy-MM-dd HH:mm:ss</li>
     * </ul>
     * 
     * @default yyyy-MM-dd
     */
    me.formatString = "yyyy-MM-dd";
    
    /**
     * 获取一个值，表示是否显示 {@link timeEditor} 对象。如果该值为 true，则显示；反之则不显示。
     * 请使用 {@link setDisplayTime} 方法设置该字段的值。
     * 该属性在初始化时是通过 {@link setFormatString} 决定，在实例化过后可以通过调用 {@link setDisplayTime} 强制显示或者隐藏时间控件。
     * 推荐使用  {@link setFormatString} 方法设置是否显示时间编辑器。
     * 
     * @default false
     */
    me.displayTime = false;
    
    /**
     * 一个 {@link mx.editors.TimeEditor} 对象，表示显示在底部的时间控件。
     */
    me.timeEditor = null;
    
    /**
     * @ignore
     */
    me.eTag = "<div/>";
    
    /**
     * 当该字段的值发生更改后将触发该事件。调用 {@link setValue}(p_value, true) 方法并成功更改字段值后会触发该事件。
     */
    me.onchanged = null;
    
    /**
     * 点击日期某天时触发事件。
     */
    me.ondateclick = null;
    
    /**
     * @ignore
     * 显示年月的面板，默认是false
     */
    var _enabledYMPanel = false;
    
    var _$table = null;
    
    base.init = me.init;
    me.init = function()
    {
        base.init();
        
        me.$e.addClass("calendar");
        
        if(me.formatString == "yyyy-MM" || me.formatString == "yyyy")
        	_enabledYMPanel = true;
        
        if (_enabledYMPanel)
        {
            var value = me.value;
            if ($isEmpty(value))
            {
            	value = $format(new Date(), me.formatString);
            }
            
            me.setValue(value);
            
            _YMPanel_enabled();
        }
        else 
        {
        	_$table = $("<table id=calendarTable/>");
            _$table.append("<tr id=naviRow><td><a href='javascript:void(0)' style='text-decoration:none;' id=prevMonthButton></a></td><td colspan=5 id=monthLabel/><td><a href='javascript:void(0)' style='text-decoration:none;' id=nextMonthButton></a></td></tr>");
            _$table.attr("cellPadding", 0);
            _$table.attr("cellSpacing", 0);
            me.$e.userSelectable(false);
            me.$e.append(_$table);
            for (var w = 0; w < 7; w++)
            {
                var $row = $("<tr/>");
                if (w == 0)
                {
                    $row.attr("id", "weekRow");
                }
                else
                {
                    $row.addClass("dayRow");
                }
                for (var d = 0; d < 7; d++)
                {
                    var $cell = $("<td></td>");
                    if (w == 0)
                    {
                        $cell.text(_getDayName(d));
                    }
                    $row.append($cell);
                }
                _$table.append($row);
            }
            
            me.$("#monthLabel").click(_monthLabel_click);
            me.$(".dayRow td").click(_dayCell_click);
            me.$(".dayRow td").dblclick(_dayCell_dblclick);
            me.$("#prevMonthButton").parent().click(_prevMonthButton_click);
            me.$("#nextMonthButton").parent().click(_nextMonthButton_click);
           
            me.setFormatString(me.formatString);
            
            var value = me.value;
            if ($isEmpty(value))
            {
            	value = $format(new Date(), me.formatString);
            }
            me.setValue(value);
        }
    };
    
    /**
     * 
     * @overload function(p_value)
     * @overload function(p_value,p_triggerEvent)
     *  
     * 设置 {@link value} 字段的值。
     * @param p_value 一个 Date 类型或字符串形式的日期值。
     * @param p_triggerEvent 一个 Boolean 值，表示是否需要触发 {@link onchanged} 事件。如果该值为 true，则触发事件；反之则不触发。
     */
    me.setValue = function(p_value, p_triggerEvent)
    {
        if ($isEmpty(p_value))
        {
            p_value = null;
        }
        if (typeof(p_value) == "string")
        {
            p_value = parseDate(p_value);
        }
        
        var changed = false;
        if (me.value * 1 != p_value * 1)
        {
            changed = true;
        }
        me.value = p_value;
        _navigateTo(p_value.getFullYear(), p_value.getMonth());
          
        me.$(".selected").removeClass("selected");
        
        var nowDateStr = $format(me.value, "yyyy-MM-dd");
        if (me.value != null)
        {
            var $cell = me.$("#" + nowDateStr);
            if ($cell.length)
            {
                $cell.addClass("selected");
                $cell.parent().addClass("selected");
            }
        }
        
        if (me.displayTime && me.timeEditor != null)
        {
        	var nowTimeStr = nowDateStr + " " + Date.format(parseDate(me.timeEditor.value), "HH:mm:ss");
        	me.timeEditor.setValue(parseDate(nowTimeStr), false);
        }
        
        if (p_triggerEvent && changed)
        {
            me.trigger("changed");
        }
    };
    
    /**
     * 设置 {@link formatString} 字段的值。
     * 
     * @param p_format  格式说明符字符，指示如何显示值。
     * 该字段的可选值包括:
     * <ul>
     *     <li>yyyy</li>
     *     <li>yyyy-MM</li>
     *     <li>yyyy-MM-dd</li>
     *     <li>yyyy-MM-dd HH:mm</li>
     *     <li>yyyy-MM-dd HH:mm:ss</li>
     * </ul>
     * 
     */
    me.setFormatString = function(p_format)
    {
        var format = p_format ? p_format.toLowerCase() : "yyyy-mm-dd";
        
        if (format == "yyyy-mm-dd hh:mm:ss")
        {
            me.formatString = "yyyy-MM-dd HH:mm:ss";
            me.setDisplayTime(true);
        }
        else if (format == "yyyy-mm-dd hh:mm")
        {
            me.formatString = "yyyy-MM-dd HH:mm";
            me.setDisplayTime(true);
        }
        else if (format == "yyyy-mm-dd hh")
        {
            me.formatString = "yyyy-MM-dd HH";
            me.setDisplayTime(true);
        }
        else if (format == "yyyy-mm-dd")
        {
            me.formatString = "yyyy-MM-dd";
            me.setDisplayTime(false);
        }
        else if (format == "yyyy-mm")
        {
            me.formatString = "yyyy-MM";
            me.setDisplayTime(false);
        }
        else if (format == "yyyy")
        {
            me.formatString = "yyyy";
            me.setDisplayTime(false);
        }
        else 
        {
            throw new Error("" + p_format + "。");
        }
    };
    
    
    
    var _$timeRow = null;
    /**
     * 设置 {@link displayTime} 字段的值。该方法强制显示时间控件，不管 {@link formatString} 的值。建议使用 {@link setFormatString} 方法控制时间控件的显示。
     * 
     * @param p_displayTime 布尔值 true:显示时间反之不显示
     */
    me.setDisplayTime = function(p_displayTime)
    {
        if (p_displayTime == null)
        {
            p_displayTime = true;
        }
        if(me.formatString == "yyyy-MM" || me.formatString == "yyyy")
        	p_displayTime = false;
        me.displayTime = p_displayTime;
        if (p_displayTime)
        {
            if (_$timeRow == null)
            {
                _$timeRow = $("<tr id=timeRow><td colspan=7></td></tr>");
                
                me.timeEditor = new mx.editors.TimeEditor({
                	enabled: me.enabled,
		            width: 100,
		            formatString: me.formatString.split(" ")[1],
		            value : me.value? me.value: new Date(),
		            left: 35,
		            onchanged: _timeEditor_changed
		        });
                
	            _$timeRow.children("td").append(me.timeEditor.$e);
	            _$table.append(_$timeRow);
            }
            
            if (_$timeRow.is(":hidden"))
            {
        		me.timeEditor.setValue(me.value ? me.value : new Date());
            	_$timeRow.show();
            }
        }
        else
        {
            if (_$timeRow != null)
            {
                _$timeRow.hide();
            }
        }
    };
    
    
    var _year = null;
    var _month = null;
    /**
     * 导航到指定的年月。
     * 
     * @overload function(p_date)
     * @overload function(p_year)
     * @overload function(p_year,p_month)
     * 
     * @param p_year 一个整数（如 2011）表示年。当参数只有 p_year 时，它还可以表示 Date 和字符串（如 2011-03-01）形式的日期值。
     * @param p_month 一个整数表示月份值，一个处于 0 到 11 之间的整数，它代表 Date 对象中的月份值。这个整数并不等于按照惯例来表示月份的数字，而是要比按惯例表示的值小 1。例如 3 表示 4 月份。
     * @param p_date 一个 Date 对象，指定需要导航到的日期。
     */
    me.navigateTo = function(p_year, p_month)
    {
        var year, month, date;
        if (arguments.length == 1)
        {
            if ($isString(p_year))
            {
                date = parseDate(p_year);
            }
            else if ($isNumber(p_year))
            {
                date = parseDate(p_year.toString())
            }
            else if ($isObject(p_year))
            {
                date = p_year;
            }
            
            if ($isEmpty(date))
            {
                date = _today;
            }
            year = date.getFullYear();
            month = date.getMonth();
        }
        else
        {
            year = parseInt(p_year);
            month = parseInt(p_month);
        }
       
        if (_year == year && _month == month)
        {
            return;
        }
        if ($notEmpty(me.value))
        {
        	var day = me.value.getDate(), days = Date.getDaysInMonth(year, month);
        	if (day > days)
        	{
        		day = days;
        	}
        	
        	me.setValue(new Date(year, month, day), true);
        }
    };
    
    
    function _navigateTo(p_year, p_month)
    {
        var monthStart = new Date(p_year, p_month, 1);
        var monthEnd = new Date(p_year, p_month, Date.getDaysInMonth(p_year, p_month));
        
        var startFrom = null;
        if (monthStart.getDay() == 0)
        {
            startFrom = monthStart.addWeeks(-1);
        }
        else
        {
            startFrom = monthStart.addDays(-monthStart.getDay());
        }
        
        var $cells = me.$(".dayRow > td");
        me.$(".selected").removeClass("selected");
        for (var i = 0; i < $cells.length; i++)
        {
            var date = startFrom.addDays(i);
            var $cell = $cells.eq(i);
            
            $cell.toggleClass("outOfRange", date < monthStart || date > monthEnd);
            $cell.toggleClass("today", date * 1 == _today * 1);
            $cell.text(date.getDate());
            $cell.attr("id", $format(date, "yyyy-MM-dd"));
            date = null;
        }
        
        me.$("#monthLabel").text(p_year + "-" + (p_month + 1));
        
        if (me.value)
        {
            var $selected = me.$("#" + $format(me.value, "yyyy-MM-dd"));
            if ($selected.length > 0)
            {
                $selected.addClass("selected");
                $selected.parent().addClass("selected");
            }
        }
        _year = p_year;
        _month = p_month;
    }
    
    /**
     * 导航到下一个月。如果当前为 12 月，则导航到第二年的 1 月。
     */
    me.navigateToNextMonth = function()
    {
        if (!me.enabled) return;
        
        if (_month == 11)
        {
            _month = -1;
            _year++;
        }
        me.navigateTo(_year, _month + 1);
    };
    
    /**
     * 导航到上一个月。如果当前为 1 月，则导航到上一年的 12 月。
     */
    me.navigateToPrevMonth = function()
    {
        if (!me.enabled) return;
        
        if (_month == 0)
        {
            _month = 12;
            _year--;
        }
        me.navigateTo(_year, _month - 1);
    };
    
    
    base.setEnabled = me.setEnabled;
    /**
     * 设置 {@link mx.controls.Control.enabled} 字段的值。
     * 
     * @param p_enabled 布尔值 true：可用反之不可用
     */
    me.setEnabled = function(p_enabled)
    {
        base.setEnabled(p_enabled);
        if (me.timeEditor)
        {
        	me.timeEditor.setEnabled(p_enabled);
        }
    };
    
    
    function _prevMonthButton_click(e)
    {
    	 me.navigateToPrevMonth();
    	 e.stopPropagation();
    }
    
    function _nextMonthButton_click(e)
    {
         me.navigateToNextMonth()
    	 e.stopPropagation();
    }
    
    
    function _getDayName(p_day)
    {
        return mx.msg("DAY_" + p_day);
    }
    
    var _ym_month = 0;
    var _ym_year = 0;
    var _$ymSelector = null;
    
    function _YMPanel_enabled()
    {
        _ym_month = _month;
        _ym_year = _year;
        if (_$ymSelector == null)
        {
            _createYMSelector();
        }
        _initYearSelector(_ym_year);
        _$ymSelector.show();
        _$ymSelector.find("#ymSelector_top #" + _ym_month).addClass("monthSelected");
        _$ymSelector.find("#ymSelector_center #" + _ym_year).addClass("yearSelected");
        if (me.$e.find("table#calendarTable").length != 0)
        {
        	if (me.timeEditor != null) 
        	{
        		_$ymSelector.height(me.$e.find("table#calendarTable").outerHeight() + 14);
        	}
        	else
        	{
        		_$ymSelector.height(me.$e.find("table#calendarTable").outerHeight());
        	}
        }
        if (_enabledYMPanel)
        	_$ymSelector.css("position","relative");
    }
    
    function _monthLabel_click(e)
    {
    	if (!me.enabled) return;
    	_YMPanel_enabled();      
        e.stopPropagation();
    }
    
    function _createYMSelector()
    {
        if (_$ymSelector == null)
        {            
            _$ymSelector = $("<div id='ymSelector'/>");
            
        	_$ymSelector.addClass("ymSelector_displayTime");
            
            var _$ymSelector_top = $("<div id='ymSelector_top'/>");
            _$ymSelector.append(_$ymSelector_top);
            _$ymSelector_top.append($("<div>"+ mx.msg("MONTH") +"</div>"));
            var _$ymSelector_top_month = $("<table/>");
            for (var i = 1; i <= 2; i++)
            {
                var $row = $("<tr/>");
                _$ymSelector_top_month.append($row);
                for (var j = 1; j <= 6; j++)
                {
                    var $td = $("<td/>");
                    $td.attr("id", (i - 1) * 6 + j - 1);
                    $td.text((i - 1) * 6 + j);
                    $row.append($td);
                }
            }
            _$ymSelector_top.append(_$ymSelector_top_month);
            _$ymSelector_top_month.on("click", "td", _selectorMonth_click);
            
            var _$ymSelector_center = $("<div id='ymSelector_center'/>");
            _$ymSelector.append(_$ymSelector_center);
            _$ymSelector_center.append($("<div><a id='yearPrev' href='javascript:void(0)' style='text-decoration:none;'/><a id='yearNext'  href='javascript:void(0)' style='text-decoration:none;'/></a><span>"+ mx.msg("YEAR")+"</span>"));
            var _$ymSelector_center_year = $("<table/>");
            _$ymSelector_center.append(_$ymSelector_center_year);            
            _$ymSelector_center_year.on("click", "td", _selectorYear_click);
            _$ymSelector_center.on("click", "#yearPrev", _selectorYearPrev_click);
            _$ymSelector_center.on("click", "#yearNext", _selectorYearNext_click);
            
            var _$ymSelector_bottom = $("<div id='ymSelector_bottom'/>");
            _$ymSelector.append(_$ymSelector_bottom);
            var _$okInput = $("<input type='button' id='ok_YM' value='" + mx.msg("OK") + "'/>");
            var _$cancelInput = $("<input type='button' id='cancel_YM'value='" + mx.msg("CANCEL") + "'/>");
            _$ymSelector_bottom.append(_$okInput);
            _$ymSelector_bottom.append(_$cancelInput);
            _$okInput.click(_ymSelector_okbtn_click);
            _$cancelInput.click(_ymSelector_cancelbtn_click);
            
            me.$e.append(_$ymSelector);
        }
    }
    
    function _selectorMonth_click(e)
    { 
    	if (!me.enabled) return;
        if (_$ymSelector != null)
        {
            _$ymSelector.find(".monthSelected").removeClass("monthSelected");
            $(e.target).addClass("monthSelected");
            _ym_month = parseInt($(e.target).attr("id"));
        }
        e.stopPropagation();
    }
    
    function _selectorYearPrev_click()
    {
    	if (!me.enabled) return;
        _selectorYearChange(true);
    }
    
    function _selectorYearNext_click()
    {
    	if (!me.enabled) return;
        _selectorYearChange(false);
    }
    
    function _initYearSelector(p_year)
    {
        var $table = _$ymSelector.find("#ymSelector_center table");
        $table.empty();
        for (var i = 1; i <= 3; i++)
        {
            var $row = $("<tr/>");
            $table.append($row);
            for (var j = 1; j <= 4; j++)
            {
                var $td = $("<td/>");
                if (i == 2 && j == 2)
                {
                    $td.attr("id", p_year);
                    $td.text(p_year);
                }
                else
                {
                    var year = (i - 1) * 4 + j;
                    var result = year < 6 ? p_year - (6 - year) : p_year + (year - 6);
                    $td.attr("id", result);
                    $td.text(result);
                }
                $row.append($td);
            }
        }
    }
    
    function _selectorYearChange(p_isPrev)
    {
        if (_$ymSelector != null)
        {
            _$ymSelector.find(".yearSelected").removeClass("yearSelected");
            var $yearTds = _$ymSelector.find("#ymSelector_center td");
            $yearTds.each(function(i){
                var year = parseInt($yearTds.eq(i).text());
                $yearTds.eq(i).attr("id", p_isPrev ? year - 12 : year + 12);
                $yearTds.eq(i).text(p_isPrev ? year - 12 : year + 12);
            });
            
            _$ymSelector.find("#ymSelector_center #" + _ym_year).addClass("yearSelected");
        }
    }
    
    function _selectorYear_click(e)
    {
    	if (!me.enabled) return;
        if (_$ymSelector != null)
        {
            _$ymSelector.find(".yearSelected").removeClass("yearSelected");
            $(e.target).addClass("yearSelected");
            _ym_year = parseInt($(e.target).attr("id")); 
        } 
        e.stopPropagation();
    }
    
    function _ymSelector_okbtn_click(e)
    {
    	if (!me.enabled) return;
        if (_$ymSelector != null)
        {
            me.navigateTo(_ym_year, _ym_month);
            if (_enabledYMPanel)
            {
            	me.setValue($format(""+_ym_year+"-"+(_ym_month+1), me.formatString),true);          	
            }
            else
            {
            	_$ymSelector.hide();
            }
        }
        e.stopPropagation();
    }
    
    function _ymSelector_cancelbtn_click(e)
    {
    	if (!me.enabled) return;
        if (_$ymSelector != null)
        {
        	if (!_enabledYMPanel)
            {
        		_$ymSelector.hide();
            }         		
        }
        
        //点击取消按钮时将选择项清空
        if (_$ymSelector != null)
        {
            _$ymSelector.find(".monthSelected").removeClass("monthSelected");
        }
        
        e.stopPropagation();
    }
    
    function _dayCell_click(e)
    {
        if (!me.enabled) return;
        
        if (me.displayTime)
        {
            var timeValue = me.timeEditor.value;
            if ($isString(timeValue))
            {
                timeValue = parseDate(timeValue);
            }
            me.setValue(this.id + " " + $format(timeValue, me.timeEditor.formatString), true);
        }
        else
        {
            me.setValue(this.id, true);
        }
        
        e.stopPropagation();
    }
    
    function _timeEditor_changed(e)
    {
        if (me.value == null)
        {
            me.value = new Date();
        }
        me.setValue($format(me.value, "yyyy-MM-dd") + " " + $format(parseDate(e.target.value), "HH:mm:ss"), true);
    }
    
    function _dayCell_dblclick() {
    	me.trigger("dateclick");
    }
    
    base.dispose = me.dispose;
    /**
	* 释放对象运行时动态生成的内容（属性、方法、事件）。
	*/
    me.dispose = function()
    {
    	if (me.timeEditor != null)
    	{
    		me.timeEditor.dispose();
    	}
    	
    	me.$("#monthLabel").off();
        me.$(".dayRow td").off();
        me.$(".dayRow td").off();
        me.$("#prevMonthButton").parent().off();
        me.$("#nextMonthButton").parent().off();
            
    	if (_$table != null)
    	{
	    	_$table.empty().remove();
	    	delete _$table;
    	}
    	
    	if (_$timeRow != null)
    	{
	    	_$timeRow.empty().remove();
	    	delete _$timeRow;
    	}
    	
    	if (_$timeRow != null)
    	{
	    	_$timeRow.empty().remove();
	    	delete _$timeRow;
    	}
    	
    	if (_$ymSelector != null)
    	{
    		_$ymSelector.find("div").off();
    		_$ymSelector.find("input").off();
	    	_$ymSelector.empty().remove();
	    	delete _$ymSelector;
    	}
    	
    	_year = null;
        _month = null;
        _ym_year = null;
        _ym_month = null;
        
        delete _year;
        delete _month
        delete _ym_year;
        delete _ym_month
    	
    	base.dispose();
    }
    
    me.endOfClass(arguments); 
    return me;
};
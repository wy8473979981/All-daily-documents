$ns("mx.editors");

$import("mx.editors.Editor");

$import("mx.lib.jquery-mousewheel");

/**
 * 提供一个带有下拉列表的选择控件，通过单击控件上的箭头可显示或隐藏下拉列表。该类的派生类包含：{@link mx.editors.DateTimeEditor}、{@link mx.editors.DropDownEditor} 等。
 * 
 * @abstract
 */
mx.editors.ComboEditor = function()
{
    var me = $extend(mx.editors.Editor);
    var base = {};

    /**
     * @default 145
     */
    me.width = 145;
	   
    /**
     * 获取或者设置一个字符串，该属性表示输入框提示值。
     */
    me.hint = null;
       
    /**
     * 获取一个 Boolean 值，该值表示 {@link mx.editors.ComboEditor} 是否允许用户编辑（编辑功能还受其它属性的限制，参见 {@link mx.editors.DropDownEditor}）。
     * 如果该值为 true，表示允许编辑；反之则不允许。请使用 {@link setAllowEditing} 方法设置该字段的值。
     * 
     * @default false
     */
    me.allowEditing = false;
	
    /**
     * 获取编辑器当前字符转换模式。
     * 该字段必须在初始化前设置。仅支持在 {@link mx.editors.DropDownEditor} 中使用。
     * <p>
     * 该字段可选的值包括：
     * <ul>
     *      <li><b>uppercase</b> - 表示输入字符转换为大写格式</li>
     *      <li><b>lowercase</b> - 表示输入字符转换为小写格式</li>
     * </ul>
     * </p>
     */
    me.textTransform = null;

    /**
     * 获取一个 Boolean 值，该值表示 {@link mx.editors.ComboEditor} 是否显示下拉框按钮。如果该值为 true，表示显示；反之则不显示。
     * 请使用 {@link setAllowDropDown} 方法设置该字段的值。不支持在 {@link mx.editors.AutoCompleteEditor} 中使用。
     * 
     * @default true
     */
    me.allowDropDown = true;

    /**
     * 获取一个 Boolean 值，该值表示 {@link mx.editors.ComboEditor} 的下拉框是否显示。如果该值为 true，表示已显示；反之则隐藏。
     * 不支持在 {@link mx.editors.AutoCompleteEditor} 中使用。
     * @default false
     */
    me.droppedDown = false;

    /**
     * 获取或设置下拉框显示的动画效果。不支持在 {@link mx.editors.AutoCompleteEditor} 中使用。
     * <p>
     * 该字段的可选值包括:
     * <ul>
     * 	   <li><b>none</b> - 无动画效果。</li>
     * 	   <li><b>show</b> - 无动画效果。</li>
     *     <li><b>slideDown</b> - 以滑动的方式显示。</li>
     *     <li><b>fadeIn</b> - 淡入效果。</li>
     * </ul>
     * </p>
     * 
     * @default slideDown
     */
    me.dropDownAnimation = "slideDown";
    
    /**
     * 设置或者获取一个数值或者字符串，该属性表示动画的时间长度。当该属性为数值时，表示毫秒数（例如：1000），当该属性为字符串时，可选参数有"slow" 、"fast" 和 "normal"。
     */
    me.speed = 200;
    

    /**
     * @ignore
     */
    me.dropDownControl = null;

    /**
     * 获取一个 Boolean 值，该值表示是否在初始化时创建下拉框。如果该值为 true，表示在点击下拉按钮时创建；如果为 false，表示在控件初始化时创建。
     * 
     * @default false
     */
    me.postponesDropDown = false;

    /**
     * @ignore
     */
    me.$input = $("<input type='text'>");

    /**
     * @ignore
     */
    me.$dropDownButton = $("<a href='javascript:void(0)' id=dropDownButton><span/></a>");

    var _$deleteContainer = $("<div id=deleteContainer><span/></div>");		
	
    /**
     * @ignore
     */
   	me.$hintInput = null;
    
    var _$inputContainer = null;
    
    /**
     * 当下拉框显示的时候，将触发该事件。通常调用 {@link dropDown} 方法时会触发该事件。
     * 
     * @cancelable
     * @param cancel 一个布尔值，指示是否取消后续处理操作
     */
    me.ondropdown = null;
    
    /**
     * 当删除输入值的时候，将触发该事件。
     *
     */
    me.ondeleted = null;

    base.init = me.init;
    me.init = function()
    {
    	if (me.height > 21)
        {
        	me.height = 21;
        }
    	
    	//IE6与IE7特殊处理
    	if($.isIE67()) {
    		me.height = me.height - 2;
    	}
    	
        base.init();

        me.$e.addClass("comboEditor");
        
        _$inputContainer = $("<div id=inputContainer/>");
        _$inputContainer.append(me.$input);        	 
        me.$e.append(_$inputContainer);        	 
        me.$e.append(me.$dropDownButton);
        _$deleteContainer.attr("title", mx.msg("CLEAR_VALUE"));

        if (!$.browser.msie)
        {
            me.$e.userSelectable(false);
            me.$input.userSelectable(true);
        }

        me.$input.change(me._input_change);
        
        if (!me.postponesDropDown)
        {
            me._initDropDownControl();
        }
        
		if (!me.readOnly && $notEmpty(me.hint))
        {
            me.setHint(me.hint);
        }   
        me.setAllowEditing(me.allowEditing);		 
        me.setAllowDropDown(me.allowDropDown);
        
        me._initDefaultValue();
        if (me.displayValue != null)
        {
            me.setDisplayValue(me.displayValue);
            delete me.displayValue;
        }
        me.setReadOnly(me.readOnly);
        _$inputReadOnly();
        _setHintClass(me.enabled);
        
        me.$input.on("click", me.__input_click);
        me.$input.on("blur", me.blur);
    };
    
    function _$inputReadOnly(){
    	if(me.$input){
    		if(me.allowEditing == false){
        		me.$input.attr("readOnly",true);
        		me.$input.attr("tabIndex",-1);
        	}else{
        		me.$input.removeAttr("readOnly");
        		me.$input.removeAttr("tabIndex");
        	}
    	}
    }
	
    /**
     *  设置输入框提示值
     *  @param p_hint 一个字符串
     */
    me.setHint = function(p_hint)
    {
    	if (me.readOnly === true)
    	{
    		return;	
    	}
    	
    	if ($isEmpty(me.$hintInput))
    	{
    		me.$hintInput = $("<input type='text' class='hint'>");
    		_$inputContainer.append(me.$hintInput);
    		me.$hintInput.userSelectable(false);
    		me.$hintInput.focus($hintInput_onfocus);
    	}
    	me.hint = p_hint;
    	me._toggleInputStatus();
    };
    
    function $hintInput_onfocus(){
    	if(me.allowEditing){
    		me.$hintInput.hide();
    		me.$input.show();
    		me.$input.focus();
    	}else{
    		me.$hintInput.blur();
    	}
    }
    
    
    /**
     * 设置 {@link allowEditing} 字段的值。
     * 
     * @param p_allowEditing 一个 Boolean 值，表示是否允许用户编辑。
     */
    me.setAllowEditing = function(p_allowEditing)
    {
    	me.allowEditing = p_allowEditing;
        me.$e.toggleClass("allowEditing", me.allowEditing);
        _$inputReadOnly();
        
        if (me.allowEditing == false)
        {
        	me.$input.on("focus", _input_focus_handler);
        	me.$input.off("blur", _input_blur_handler);
        }
        else
        {
        	me.$input.off("focus", _input_focus_handler);
        	me.$input.on("blur", _input_blur_handler);
        }
        
        me.$e.off("click");
        me.$dropDownButton.off("click");

        if (me.allowEditing)
        {
            me.$dropDownButton.on("click", me._dropDownButton_click);
        }
        else
        {
            me.$e.on("click", me._dropDownButton_click);
        }

        if (!me.allowEditing && me.nullable != false)
        {				
            me.$e.append(_$deleteContainer);
            _$deleteContainer.click(_deleteContainer_click);	        	 
        }
        else
        {
            _$deleteContainer.remove();
        }
    };
    
    /**
     * 设置 {@link allowDropDown} 字段的值。
     * @param p_allowDropDown 一个 Boolean 值，表示是否显示下拉框按钮。
     */
    me.setAllowDropDown = function(p_allowDropDown)
    {
        me.allowDropDown = p_allowDropDown;
        me.$dropDownButton.toggle(me.allowDropDown);
        if (me.allowDropDown)
        {
            me.$("#inputContainer").css("right", "13px");
        }
        else
        {
            me.$("#inputContainer").css("right", 0);
        }
    };

    base.setValue = me.setValue;
    /**
     * 设置 {@link mx.editors.Editor.value} 字段的值。
     * 
     * @overload function(p_value)
     * @overload function(p_value, p_displayValue)
     * @overload function(p_value, p_triggerEvent)
     * 
     * @param p_value 一个字符串，表示实际值。详见 {@link mx.editors.Editor.value} 字段。
     * @param p_displayValue 一个字符串，表示显示值。
     * @param p_triggerEvent 一个 Boolean 值，表示是否要触发 {@link mx.editors.Editor.onchanged} 事件。
     */
    me.setValue = function(p_value, p_displayValue, p_triggerEvent)
    {
		if (me.allowEditing) 
		{
			if ($isString(p_value)) 
			{
				if ($isEqual(me.textTransform, "lowercase", true)) 
				{
					p_value = p_value.toLowerCase();
				}
				else if ($isEqual(me.textTransform, "uppercase", true)) 
				{
					p_value = p_value.toUpperCase();
				}
			}
		}
		
        if (p_displayValue == null && p_triggerEvent == null)
        {
            base.setValue(p_value);
        }
        else if ($isBoolean(p_displayValue) && p_triggerEvent == null)
        {
            var triggerEvent = p_displayValue;
            base.setValue(p_value, triggerEvent);
        }
        else if (p_displayValue !== undefined && p_triggerEvent === undefined)
        {
            base.setValue(p_value);
            me.setDisplayValue(p_displayValue);
        }
        else if ($isBoolean(p_triggerEvent))
        {
            base.setValue(p_value, p_triggerEvent);
            me.setDisplayValue(p_displayValue);
        }
        me._toggleInputStatus();
        if (me.$e.attr("title") != undefined && me.$e.attr("title").length > 0 && me.text!=me.value)
        	me.$e.attr("title",me.text);
    };

    /**
     * 设置显示值。该方法仅修改显示值，不会修改 {@link mx.editors.Editor.value} 字段的值，也不会触发 {@link mx.editors.Editor.onchanged} 事件。
     * 
     * @param p_displayValue 一个字符串，表示要设置的显示值。
     */
    me.setDisplayValue = function(p_displayValue)
    {
        me.$input.val(p_displayValue);
        me.text = p_displayValue;
    };
    
    /**
     * 设置控件是否可用。
     * @param p_enabled 一个布尔值，true为控件可用，false为控件禁用
     */
    base.setEnabled = me.setEnabled;
    me.setEnabled = function(p_enabled)
    {
        base.setEnabled(p_enabled);
        _setHintClass(p_enabled);
    };
    
    /**
     * 设置控件是否只读。
     * @param p_enabled 一个布尔值，true为控件可用，false为控件禁用
     */
    base.setReadOnly = me.setReadOnly;
    me.setReadOnly = function(p_readOnly)
    {
    	if (me.readOnly)
    		me.allowEditing = false;
        base.setReadOnly(p_readOnly);
        _setHintClass(!p_readOnly);
    };
    
    base.contains = me.contains;
     /**
     * 返回一个 Boolean 值，该值表示控件的容器中是否包含该 JQuery 对象。
     * 
     * @param $p_target 一个 JQuery 对象，或 JQuery 选择器对应的字符串（如“#container”），或 HTML DOM 元素。
     */
    me.contains = function(p_target)
    {
        return (me.dropDownControl != null) && 
        (base.contains(p_target) || $.contains(me.dropDownControl.$e.get(0), $(p_target).get(0)));
    };

    /**
     * 显示下拉框。
     * 
     * @param p_speed 一个数字，表示显示下拉框的毫秒数值（如 1000）。
     */
    me.dropDown = function(p_speed)
    {
        if(me.isReadOnly() || !me.enabled)return;

        if (p_speed == null)
        {
            p_speed = 0;
        }

        var e = { cancel: false };
        me.trigger("dropdown", e);

        if (e.cancel) return;

       
        me._resetDropDownControl();
        if (me.dropDownControl == null) return;

        me._beforeDropDown();

        me.$e.addClass("droppedDown");
        me.droppedDown = true;
        me.$e.dropDown(me.dropDownControl.$e, {speed: p_speed, animation: me.dropDownAnimation}, me._afterDropDown);
        me.dropDownControl.visible = true;
    };

    /**
     * 隐藏下拉框。
     * @param p_speed 一个整数，单位毫秒 参见 {@link dropDown} 方法的参数。
     */
    me.hideDropDown = function(p_speed)
    {
        if (p_speed == null)
        {
            p_speed = 0;
        }

        if (me.dropDownControl != null)
        {
            if(me.droppedDown)
            {
                me.dropDownControl.$e.fadeOut(p_speed);
            }
            else
            {
                me.dropDownControl.$e.hide();
            }
            me.dropDownControl.visible = false;
        }

        me.droppedDown = false;

        me.$e.removeClass("droppedDown");
        
        me._toggleInputStatus();
        
        $(document).off("resize", _document_resize);
    };

    base.dispose = me.dispose;
    
    /**
	* @ignore
	*/
    me.dispose = function()
    {        
        if (me.dropDownControl && me.dropDownControl.$e)
        {			
        	me.dropDownControl.$e.data("control", null);
			me.dropDownControl.dispose();
        }
		
		if(me.$dropDownButton){
			me.$dropDownButton.off();
			me.$dropDownButton.unbind();
			me.$dropDownButton.empty().remove();
			me.$dropDownButton=null;
			delete me.$dropDownButton;
		}
		
		if(_$deleteContainer){
			_$deleteContainer.off();
			_$deleteContainer.unbind();
			_$deleteContainer.removeAttr("title");
			_$deleteContainer.empty().remove();
			_$deleteContainer=null;
			delete _$deleteContainer;
		}
		
		if(me.$hintInput){
			me.$hintInput.off();
			me.$hintInput.unbind();
			me.$hintInput.removeAttr("disabled");
			me.$hintInput.removeAttr("readonly");
			me.$hintInput.empty().remove();
			me.$hintInput=null;
			delete me.$hintInput;
		}		
		
		
		$(document).off("click mousedown", _document_click);
		$(document).off("mousewheel", _combo_mousewheel);
		$(document).off("resize", _document_resize);		
		
		if(_$inputContainer){
			_$inputContainer.off();
			_$inputContainer.unbind();
			_$inputContainer.empty().remove();
			_$inputContainer=null;
			delete _$inputContainer;
		}
		
		base.dispose();
		base=null;
    };
	
    /**
     *@ignore 
     */
    me._toggleInputStatus = function()
    {
    	if ($isEmpty(me.$hintInput))
    		return;	
    	if ($isEmpty(me.text) && $notEmpty(me.hint) && !me.droppedDown)
        {
            me.$hintInput.val(me.hint);
            me.$input.hide();
            me.$hintInput.show();
        }
        else
        {
        	me.$input.show();
            me.$hintInput.hide();
        }
    };
    
    /**
     * @ignore
     * 设置提示信息的样式
     */
    function _setHintClass(p_enabled)
    {
    	if(me.$hintInput != null)
    	{
    		if(p_enabled == false)
        	{
    			me.$hintInput.addClass("hintEnabled");
    			me.$hintInput.val("");
    			me.$hintInput.hide();
        	}
    		else if($isEmpty(me.value))
        	{
    			me.$hintInput.addClass("hint");
    			me.$hintInput.removeClass("hintEnabled");
    			me.$hintInput.val(me.hint);
    			me.$hintInput.show();
        	}
    		
    		me.$hintInput.attr("disabled",!p_enabled);	
    		me.$hintInput.attr("readonly", me.isReadOnly());
    	}
    }
    
    /**
     * @ignore
     */
    me._initDropDownControl = function()
    {

    };

    /**
     * @ignore
     */
    me._resetDropDownControl = function(p_addEvent)
    {
        if (me.dropDownControl == null)
        {
            me._initDropDownControl();
        }
        
        if(p_addEvent === false)
        {
            return;
        }
         // 鼠标点击下拉容器之外的区域，隐藏下拉容器
//        if ($notEmpty(me.dropDownControl) && $notEmpty(me.dropDownControl.$e))
//		{
//			me.dropDownControl.$e.off("mousedown", mousedown_handler);
//			me.dropDownControl.$e.on("mousedown", mousedown_handler);
//		}
    };
    
    function mousedown_handler(e)
    {
		var target = e.target;
		while(target && !$(target).hasClass("dropDown"))
		{
			target = target.parentElement;
		}
		
		if ($isEmpty(target))
		{
			me.dropDownControl.$e.hide();
		}
    }

    /**
     * @ignore
     */
    me._beforeDropDown = function()
    {
         //该方法在显示下拉框之前执行。
    };

    /**
     * @ignore
     */
    me._afterDropDown = function()
    {
        //该方法在显示下拉框之后执行。
    };

    /**
     * @ignore
     */
    me._dropDownButton_click = function(e)
    {        
    	if (me.droppedDown)
        {
            me.hideDropDown();
        }
        else
        {              
            me.dropDown(me.speed);             
            $(document).on("click mousedown", _document_click);
            $(document).on("mousewheel", _combo_mousewheel);
            $(document).on("resize", _document_resize);
        }   
    };
    
    function _input_focus_handler(e)
    {
        me.$input.blur();
    }
    
    function _input_blur_handler(e){
    	//没有出现下拉列表的时候，失去焦点切换显示状态
    	if(!me.droppedDown){
    		me._toggleInputStatus();
    	}
    }

    function _deleteContainer_click(e)
    {
    	//保存validType
    	var _validType = me.validType;
    	//将validType设为空，从而跳过验证
        me.validType = null;
        me.setValue(null, true);
        me.trigger("deleted");
        me.validType = _validType; //setValue后要把验证类型还原回来。
        me.hideDropDown(me.speed);
        e.cancelBubble = true;
        e.stopPropagation();
    };
    
    function _document_click(e)
    {
        var target = e.target;
        if (me.dropDownControl && !me.contains(target))
        {
			//判断是否内嵌dropDownEditor
			if (me.dropDownControl.comboEditors)
			{
				for (var i = 0; i < me.dropDownControl.comboEditors.length; i++)
				{
					if (me.dropDownControl.comboEditors[i].contains(target))
					{
						return;
					}
				}
			}
			if (me.dropDownControl.editors)
			{
				for (var i = 0; i < me.dropDownControl.editors.length; i++)
				{
					if (me.dropDownControl.editors[i].contains(target))
					{
						return;
					}
				}
			}
			
			//判断点击的是否是DropDownGridEditor中的编辑器
			if (me.dataGrid && me.dataGrid.searchBox)
			{
				var editors = me.dataGrid.searchBox.editors;
				for (var i = 0; i < editors.length; i++)
				{
					if (editors[i].contains(target))
					{
						return;
					}
				}
			}
			
			if (me.dropDownControl.$e.get(0) == e.target)
				return;
			
			me.hideDropDown(me.speed);
            
            $(document).off("click mousedown", _document_click);
        }
    }
    
    function _combo_mousewheel(e)
    {
    	var target = e.target;
		if (me.dropDownControl  && !$.contains(me.dropDownControl.$e.get(0), $(target).get(0)))
		{
			//判断点击的是否是DropDownGridEditor中的编辑器
			if (me.dataGrid && me.dataGrid.searchBox)
			{
				var editors = me.dataGrid.searchBox.editors;
				for (var i = 0; i < editors.length; i++)
				{
					if (editors[i].contains(target))
					{
						return;
					}
				}
			}
			
		    me.hideDropDown(me.speed);
		    $(document).off("mousewheel", _combo_mousewheel);
		}
    }
    
    function _document_resize(e)
    {
    	if (me.droppedDown)
    	{
        	if (me.dropDownControl && me.dropDownControl.$e.offset().left != me.$e.offset().left)
        	{
            	me.dropDownControl.setLeft(me.$e.offset().left);
        	}
    	}
    }
    
    me.endOfClass(arguments); 
    return me;
};
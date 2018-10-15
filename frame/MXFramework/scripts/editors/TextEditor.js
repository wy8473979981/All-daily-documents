$ns("mx.editors");

$import("mx.utils.DelayedTask");

/**
 * 提供一个允许用户输入文本的文本框的类。
 * 
 * @example 以下是一个文本编辑器如何初始化的示例。 
 * <code language="JavaScript">
 * var textEditor = new mx.editors.TextEditor(
 * {
 *     "width" : "300px",
 *     "hint" : "test" //指定显示的提示文字。
 * });
 * </code>
 * 
 * @example 以下是一个密码输入框如何初始化的示例。 
 * <code language="JavaScript">
 * var textEditor = new mx.editors.TextEditor(
 * {
 *     "textMode" : "password"
 * });
 * </code>
 */
mx.editors.TextEditor = function()
{
    var me = $extend(mx.editors.Editor);
    var base = {};
    
    /**
     * @default 135
     */
    me.width = 135;

    /**
     * 获取文本框的类型。 请使用 {@link setTextMode} 方法设置该字段的值。
     * <p>
     * 该字段可选的值包括：
     * <ul>
     * <li><b>normal</b></li>
     * <li><b>password</b></li>
     * <li><b>multiline</b></li>
     * </ul>
     * </p>
     * 
     * @default normal
     */
    me.textMode = "normal";
    
    /**
     * 文本框编辑器默认值为空字符串。
     */
    me.value = "";

    /**
     * 文本框为空时，默认显示的提示信息。请使用 {@link setHint} 方法设置该字段的值。
     */
    me.hint = null;       
    
    /**
     * 获取和设置一个 Number 值，表示文本框可输入的字符长度。请使用 {@link setMaxLength} 方法设置该字段的值。
     */
    me.maxLength = null;
    
    /**
     * 获取和设置编辑器title最大字符，超过最大字符后使用弹出层显示。
     *
     * @default 200
     */
    me.maxTitleLength = 200;
    
    /**
     * @ignore 
     * intput容器
     */
    me._$inputContainer = null;
    
    /**
     * 获取和设置一个 Boolean 值，表示是否提示文本框允许输入的字符长度。该字段只有在 {@link maxLength} 字段设置了值后有效。
     * 
     * @default false
     */
    me.allowInputLengthTip = false;
    
    /**
     * 获取和设置一个 Boolean 值，表示chrome浏览器中多行文本是否进行拼写检查。
     * 
     * @default false
     */
    me.spellcheck = false;
    
    /**
     * 当按回车键后触发该事件。
     */
    me.onenterkeyup = null;
	
    var _$hintInput = null;
    
    base.init = me.init;
    me.init = function()
    {
        base.init();
        me.$e.addClass("textEditor");
        me._$inputContainer = $("<div id='inputContainer'/>");
        me.$e.append(me._$inputContainer);
        me.setTextMode(me.textMode);
        me.setMaxLength(me.maxLength);
        
        if(!$isEmpty(me.text) && !$isEmpty(me.value)){
        	me.text = me.value;
        }else if($isEmpty(me.value) && !$isEmpty(me.text)){
        	me.value = me.text;
        }
        
        me._initDefaultValue();
        
        if (me.enabled == false)
        	me.readOnly = true;
        
        if (!me.readOnly && $notEmpty(me.hint))
        {
            me.setHint(me.hint);
        }
        
        me.setReadOnly(me.readOnly);
        if($.isIE67() && !$.isIE6())
        	me.$input.css('padding-left', '0px');
        me.$input.on("blur", _onblur);
        me.$input.on("keyup", _input_keyup);
        me.$input.on("click", me.__input_click);
    };

    /**
     * 设置 {@link textMode} 字段的值。
     * @param p_textMode 
     *  该字段可选的值包括：
     * <ul>
     * <li><b>normal</b></li>
     * <li><b>password</b></li>
     * <li><b>multiline</b></li>
     * </ul>
     */
    me.setTextMode = function(p_textMode)
    {
        me.textMode = p_textMode;

        if (me.$input != null)
        {
            me.$input.unbind();
            me.$input.remove();
            me.$input = null;
        }

        switch (me.textMode.toLowerCase())
        {
            case "multiline":
                me.textMode = "multiline";
                var t_navigator = navigator.userAgent.toLowerCase();
                me.$input = $("<textarea style='width:100%;height:100%;outline:none;overflow-y:auto;'></textarea>");
                if (t_navigator.indexOf("chrome") > -1 && !me.spellcheck) 
                	me.$input = $("<textarea style='width:100%;height:100%;outline:none;overflow-y:auto;'spellcheck='false'></textarea>");
                //判断IE11 在datagrid中无y滚动条
                if((t_navigator.indexOf("trident") > -1 && t_navigator.indexOf("rv") > -1))
                	me.$input = $("<textarea style='width:100%;height:100%;outline:none;overflow-y:auto;white-space:normal'></textarea>");
                if (me.height == 21)
                {
                    // 多行文本框默认高度为75。
                    me.setHeight(75);
                }
                else if($.isIE67())
                {
                	me.setHeight(parseInt(me.height));
                }

				//解决虽然没有闪动光标，但是滚动条不能拖动问题，这里只要点击滚动条就会
				//Textarea就会获取焦点，就会有光标出现，但是点击文本区，则光标消失
				me.$input.on("mouseup",function(){
        			if ($isObject($titleDiv))
        				$titleDiv.hide();
                	if ($isIE() 
                		&& me.enabled == false
                		&& event.offsetX < me.$input.get(0).scrollWidth){
                			me.$input.blur();	
                	}							
					
				});	
				                
                break;
            case "password":
                me.textMode = "password";
                me.$input = $("<input type='password' style='width: 100%;'/>");
                break;
            default:
                me.textMode = "normal";
                me.$input = $("<input type='text' style='width: 100%;'/>");
        }
        me._$inputContainer.append(me.$input);
    };
    
    base.setHeight = me.setHeight;
    /**
     * 设置TextEditor的高度
     * @param p_height 一个代表高度的数字 
     */
    me.setHeight = function(p_height)
    {
    	 base.setHeight(p_height);
    	 
    	 if (typeof (p_height) != "undefined" && null != me.$input
    		 && me.textMode.toLowerCase() == "multiline") {
    		//IE7需要额外处理
         	if($.browser.msie && $.browser.version == "7.0") {
         		me.$input.height(p_height - 4);
         	} else {
         		me.$input.height(p_height);
         	}
         }
    };
    
    base.setReadOnly = me.setReadOnly;
    /**
     * 设置 {@link readOnly} 字段的值。
     * @param p_readOnly 一个布尔值，true表示控件只读
     */
    me.setReadOnly = function(p_readOnly)
    {
    	base.setReadOnly(p_readOnly);
    	me._toggleInputStatus();
    };

    /**
     * 设置 {@link hint} 字段的值。
     * @param p_hint 一个字符串，用来设置提示信息
     */
    me.setHint = function(p_hint)
    {
    	if (me.readOnly === true)
    	{
    		return;	
    	}
    	
    	if ($isEmpty(_$hintInput))
    	{
    		_$hintInput = me.$input.clone();
    		_setHintClass();
    		//_$hintInput.removeAttr("maxLength"); //该写法在IE7下存在问题，
    		//同时设置hint、maxLength后不能输入
    		_$hintInput.get(0).removeAttribute("maxLength");
    		_$hintInput.removeAttr("disabled");
    		_$hintInput.focus(_hintInput_focus);
    		me._$inputContainer.append(_$hintInput);
    	}
        me.hint = p_hint;
        me._toggleInputStatus();
    };
    
    base.setEnabled =  me.setEnabled;
    
    /**
     * 设置 {@link enabled} 字段的值。
     * @param p_enabled 一个布尔值，true表示输入框可用，false表示输入框不可用
     */
    me.setEnabled = function(p_enabled)
    {
    	base.setEnabled(p_enabled);
    	if (me.enabled == true)
    		me.setReadOnly(false);
    	_setHintClass();
    };
    
     /**
     * 让编辑器失去焦点。
     */
    base.blur =  me.blur;
	me.blur = function()
    {
        _onblur();//向文本框中拖入文字时无法触发失去焦点事件
		base.blur();
    };
    
    /**
     * @ignore
     * 设置提示信息的样式
     */
    function _setHintClass()
    {
    	if(_$hintInput!=null)
    	{
    		if(me.enabled == false)
        	{
        		_$hintInput.addClass("hintEnabled");
        		_$hintInput.val("");
        	}
    		else
        	{
        		_$hintInput.addClass("hint");
        		_$hintInput.removeClass("hintEnabled");
        		_$hintInput.val(me.hint);
        	}
    		
    		_$hintInput.attr("disabled",!me.enabled);		
    		_$hintInput.attr("readonly", me.isReadOnly());
    	}	
    }

    /**
     * 设置 {@link maxLength} 字段的值。
     * @param p_maxLength 一个数字，用来设置输入框的最大输入长度
     */
    me.setMaxLength = function(p_maxLength)
    {
        if ($isNumber(p_maxLength) )
        {
            me.maxLength = p_maxLength;
            if (me.validOptions)
            {
                me.validOptions.maxLength = p_maxLength;
            }
            
            if ("normal" == me.textMode || "password" == me.textMode)
            {
                me.$input.attr("maxLength", me.maxLength);
            }
        }
    };
    
    /**
     * @ignore
     */
    me._refreshState = function()
    {
        if (me.$input != null)
        {
        	var _readOnly = false;
        	//兼容IE9在disabled下无滚动条
        	if (navigator.userAgent.indexOf("MSIE 9.0") > -1 && me.textMode == "multiline")
        	{
        		me.$e.removeAttr("disabled");
        		
        		if(me.enabled && !me.isReadOnly())
        		{
        			_readOnly = false
        		}else
        		{
        			_readOnly = true;
        		}
        		
        	}
        	else
        	{	_readOnly = me.isReadOnly();
        		me.$input.attr("disabled",!me.enabled);	
        	}
        	
            me.$input.attr("readonly", _readOnly);
            if(_readOnly === true)
            {
                me.$input.attr("tabIndex",-1);
            }
            else
            {
                me.$input.removeAttr("tabIndex");
            }
        }
        me.$e.toggleClass("disabled", !me.enabled);
        me.$e.toggleClass("readOnly", _readOnly);
      
    };
    
    /**
     *@ignore 
     */
    me._toggleInputStatus = function()
    {
    	if(_$hintInput == null)
    	{
    		return;
    	}
    	
    	var focused = false;
    	try{
    		if (me.$input.is(":focus"))
    		{
    			focused = true;
    		}
    	}catch(e){
    	}
    	
    	if (!focused && $isEmpty(me.value) && $notEmpty(me.hint) && !me.readOnly)
        {
            _$hintInput.val(me.hint);
            me.$input.hide();
            _$hintInput.show();
        }
        else
        {
        	if (!me.$input.is(":visible"))
        	{
        		me.$input.show();
        	}

			if ($notEmpty(_$hintInput))
			{
				_$hintInput.hide();
			}
        }
    };
    
    base.markError = me.markError;
    /**
     * @ignore
     */
    me.markError = function(p_isError, p_errorTip)
    {
    	base.markError(p_isError, p_errorTip);
    	if(me.$e && me.$input)
    	{
	        if (p_isError)
	        {
	        	if(!$.isIE67()) {
	        		me.$e.addClass("error");
	        	} else {
	        		me.$e.removeClass("error");
	        	}
	        	me.$input.addClass("error");
	        	if(_$hintInput) {
	        		_$hintInput.addClass("error");
	        	}
	        }
	        else 
	        {
	        	me.$e.removeClass("error");
	        	me.$input.removeClass("error");
	        	if(_$hintInput) 
	        	{
	        		_$hintInput.removeClass("error");
	        	}
	        }
    	}   
    };
    
    var $titleDiv;
    var isenter = false;
    /**
     * @ignore
     */
	me._toggleTip = function() {
		if (me.readOnly || !me.enabled) {
			if ($notEmpty(me.value)) {
				if (me.text != null && me.text.length > me.maxTitleLength) {
					me.$e.mouseenter(function(e) {
						isenter = true;
						if ($isEmpty($titleDiv)) {
							var editorTextReadOnlyTip = me.$e.parents("body").find("#editorTextReadOnlyTip")
							if (editorTextReadOnlyTip && editorTextReadOnlyTip.length > 0) {
								$titleDiv = editorTextReadOnlyTip.eq(0);
							} else {
								$titleDiv = $("<div id='editorTextReadOnlyTip'/>");
								me.$e.parents("body").append($titleDiv);
							}
						}

						if ($notEmpty(me.text)) {
							var $title = me.text;
							$titleDiv.empty();
							$titleDiv.height("auto");
							$titleDiv.append($title);
							if ($titleDiv.width()>600 )
								$titleDiv.width(600);
							if ($titleDiv.height()>300)
								$titleDiv.height(300);
							if (e.clientX  + $titleDiv.width() >$(document).width())
							{
								$titleDiv.css({
									"left":$(document).width()- $titleDiv.width() -10
								});	
							}else{
								$titleDiv.css({"left" : e.clientX + 10});
							}
								
							if (e.clientY + $titleDiv.height() >$(document).height())
							{
								$titleDiv.css({
									"top":$(document).height() - $titleDiv.height() - 10
								});	
							}else{
								$titleDiv.css({"top" : e.clientY + 10});
							}
								
							setTimeout(function(){
								if(isenter && $titleDiv){
									$titleDiv.show();
								}
							},500);
						}
					});
					me.$e.mouseleave(function(e) {

						var e = e || window.event;
						var x=e.pageX || e.clientX ;
						var y=e.pageY || e.clientY ;
			    		if(x>this.getBoundingClientRect().left
			                    &&x<(this.getBoundingClientRect().left+this.clientWidth)
			                &&y>this.getBoundingClientRect().top
			               &&y<(this.getBoundingClientRect().top+this.clientHeight)){
			    			me.$e.parents("body").on("mousemove",_body_mouseMove);
			           return;
			        }else{
			        	 isenter = false;
			        	 $titleDiv.hide(); 
			        	 me.$e.parents("body").off("mousemove",_body_mouseMove);
			       }
					});
				} else
					me.$e.attr("title", me.text);
			}
		} else {
			isenter = false;
			me.$e.removeAttr("title");
			me.$e.unbind("mouseenter");
			me.$e.unbind("mouseleave");
			me.$e.parents("body").off("mousemove",_body_mouseMove);
			if ($notEmpty($titleDiv)) {
				$titleDiv.remove();
				$titleDiv = null;
			}
		}

	};
	
	function _body_mouseMove(e)
 	{
		var e = e || window.event;
		var x=e.pageX || e.clientX ;
		var y=e.pageY || e.clientY ;
		if (me.$e == undefined )
			return;
		if (!(x > me.$e[0].getBoundingClientRect().left
				&& x < (me.$e[0].getBoundingClientRect().left + me.$e[0].clientWidth)
				&& y > me.$e[0].getBoundingClientRect().top && y < (me.$e[0]
				.getBoundingClientRect().top + me.$e[0].clientHeight))) {
			isenter = false;
			$titleDiv.hide();
			me.$e.parents("body").off("mousemove",_body_mouseMove);
		}
	}
	
    function _onblur()
    {
    	if(me.text != me.$input.val())
    	{
    		if (null == me.text && "" == me.$input.val()) {
    			me.value="";
    		} else {
    			_check_pwContent();
    			me.setValue(me.$input.val(), true);
    		}
    	}
        if (me.hint != null)
        {
        	if(!me.readOnly)
        		me.setHint(me.hint);
        }
        
        if ($isObject($titleDiv) && $titleDiv.length > 0)
		{
		 	$titleDiv.remove();
		 	$titleDiv = null;
		}
        
        me.__input_blur();
    }
	
    function _hintInput_focus()
    {
    	 me.$input.show();
         _$hintInput.hide();
         me.$input.select();
    }
    /**
     *@ignore 
     * 键盘输入后 setvalue
     */
	function _input_keyup(e)
	{
		// 这些键不做延时处理
		if(e.p_ctrlKey || e.altKey || (e.which >= 112 && e.which <= 137) || (e.which >= 33 && e.which <= 45))
		{
			// ctrl，alt 组合键 
			//112-137：F1~F24，Num_Lock，Scroll_Lock
			// 33-45 ：方向，Select， Print，Insert 等
			// 46：Delete
			return false;
		}
		mx.utils.DelayedTask.delay(600, _setValue, me, []);
		//触发回车事件
		if(e.keyCode == 13){
			me.trigger("enterkeyup");
		}
		return false;
	}
	
	function _check_pwContent()
	{
		if (me.textMode == "password")
		{
			if (me.$input.val().length > 0 && me.$input.val().trim() == "")
			{
				mx.indicate("info", "The password editor content is all blank space");
				me.$input.val("");
				me.value = me.text = null;
				return;
			}
		}
	}
	
	function _setValue()
	{
		//由于延迟设值的原因，走到这里时有可能me.$e已经被删除了，导致报错。加个判断
		if(!me.$e)
		{
		    return;
		}
		_check_pwContent();
		me.setValue(me.$input.val(), true);
		
		if (me.allowInputLengthTip && $isNumber(me.maxLength) && me.maxLength > 0)
        {
            var value = me.$input.val();
            var length = me.maxLength - value.length;
            var msg = mx.msg("INPUT_LENGTH_INFO", [length, me.maxLength]);
            
            me.$input.toolTip({
        		activation:"focus",
        		keepAlive:true,
        		content: msg,
        		defaultPosition: me.tipPosition
        	});
            
            me.$input.toolTip().data("toolTip").update(msg);
        }
	}
	
	 base.dispose = me.dispose;
	    /**
		* 释放对象运行时动态生成的内容（属性、方法、事件）。
		*/
	 me.dispose = function()
	 {
		 if ($isObject($titleDiv) && $titleDiv.length > 0)
		 {
		 	$titleDiv.remove();
		 	$titleDiv = null;
		 }
			 
		 var editorTextReadOnlyTip = me.$e.parents("body").find("#editorTextReadOnlyTip")
		 if (editorTextReadOnlyTip)
		 {
			editorTextReadOnlyTip.remove();
		 }
		 
		 me.$e.parents("body").off("mousemove",_body_mouseMove);
		 	 
		 if(_$hintInput){
			_$hintInput.off();
			_$hintInput.unbind();
			_$hintInput.removeAttr("disabled").removeAttr("readonly").empty().remove();
		 }
		 
		 
		 base.dispose();
		 base=null;
	 }
	
    me.endOfClass(arguments); 
    return me;
};
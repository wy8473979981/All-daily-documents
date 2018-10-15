$ns("mx.editors");

/**
 * 提供一个数字编辑器和时间编辑器的基类。该类的派生类包含：{@link mx.editors.NumberEditor}、{@link mx.editors.TimeEditor}。
 * 
 * @abstract
 */
mx.editors.UpDownEditor = function() 
{
	var me = $extend(mx.editors.Editor);
	var base = {};

	/**
	 * @default 80
	 */
	me.width = 80;
	
	/**
	 * 获取或设置一个 Boolean 值，表示向上、向下按钮是否显示。
	 */
	me.displayButton = true;

	/**
	 * @ignore
	 */
	me.$input = $("<input id='inputDomain' type='text'>");

	base.init = me.init;
	me.init = function() 
	{
		base.init();
		_init();
		
	};
	
	base.dispose = me.dispose;
    me.dispose = function(){
		base.dispose();
		base=null;
	}

	/**
	 * @ignore
	 */
	me._upButton_click = function() 
	{
		if (!me.isReadOnly() && me.enabled) 
		{
			me.$input.get(0).blur();
			me.increaseValue(true);
		}
	};

	/**
	 * @ignore
	 */
	me._downButton_click = function() 
	{
		if (!me.isReadOnly() && me.enabled) 
		{
			me.$input.get(0).blur();
			me.declineValue(true);
		}
	};
	
	
	function _init()
	{
		me.$e.addClass("upDownEditor");
		
		if($.isIE67()) {
			var updownEditorTable = $("<table id=updownEditorTable style='width: 100%;'><tr><td id=updownEditorTd>" +
					"<div id=updownEditorDiv></div></td></tr></table>");
			me.$e.append(updownEditorTable);
			var inputContainer = $("<div id=inputContainer></div>");
			inputContainer.append(me.$input);
			updownEditorTable.find("#updownEditorDiv").append(inputContainer);
		} else {
			me.$e.append(me.$input);
		}
		
		if (me.displayButton)
		{
			me.$e.removeClass("upDownEditorHiddenButton");
			var $buttonContainer = $("<div id=buttonContainer/>");
			var $upButton = $("<a href='javascript:void(0)' style='text-decoration:none;' id=upButton><span/></a>");
			var $downButton = $("<a href='javascript:void(0)' style='text-decoration:none;' id=downButton><span/></a>");
	
			$buttonContainer.append($upButton);
			$buttonContainer.append($downButton);
			$buttonContainer.userSelectable(false);
			
			if($.isIE67()) {
				me.$e.find("#updownEditorDiv").append($buttonContainer);
			} else {
				me.$e.append($buttonContainer);
			}
			
			$upButton.mouserepeat(me._upButton_click);
			$downButton.mouserepeat(me._downButton_click);
		}
		else //这里要把me.$e的padding-right设为0.这样会避免在input有背景色时显示有问题
		{
		   me.$e.addClass("upDownEditorHiddenButton");
		}
		me.$input.change(me._input_change);
		me._initDefaultValue();
		me.setReadOnly(me.readOnly);
		
		me.$input.on("click", me.__input_click);
        me.$input.on("blur", me.blur);
	}
	
	base.markError = me.markError;
	/**
     * 标明编辑器的错误状态。
     * 
     * @param p_isError 一个 Boolean 值，表示是否需要标明为错误状态。
     * @param p_errorTip 一个字符串，表示错误提示信息。
     */
    me.markError = function(p_isError, p_errorTip)
    {
    	if($.isIE67()) {
    		var $updownEditor = me.$e.find("#updownEditorDiv");
            me.isValidate = p_isError == true ? false : true;
            if (p_isError)
            {
            	$updownEditor.addClass("error");
                if (p_errorTip != null)
                {
                	$updownEditor.toolTip({
                        content: p_errorTip,
                    	defaultPosition: me.tipPosition
                    });
                }            
            }
            else
            {
            	$updownEditor.removeClass("error");
            	$updownEditor.toolTip("destroy");
            }
    	} else {
    		base.markError(p_isError, p_errorTip);
    	}
    };
	
	me.endOfClass(arguments); 
    return me;
};
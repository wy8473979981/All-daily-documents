$ns("mx.controls");

$import("mx.utils.ClipboardUtil");

/**
 * 提供一个显示错误信息的遮罩。请使用 {@link MX} 的 {@link MX.showerror} 方法来展示错误信息的遮罩。
 * 
 * @example
 * 该示例将说明如何显示错误信息遮罩。
 * <code language="JavaScript">
 * var errorMsg = "Line 23, obj is undefined";
 * //错误信息为字符串
 * mx.showerror(errorMsg);
 * 
 * * var error = new Error("Line 23, obj is undefined");
 * //错误信息为 error 对象
 * mx.showerror(error);
 * </code>
 */
mx.controls.ErrorBox = function()
{
    var me = $extend(mx.controls.Control);
    var base = {};

    /**
     * 获取或设置一个字符串，表示自定义错误页面的地址。自定义错误页面中，展示错误信息的 DOM 元素需要设置 ID 属性为“message”，关闭按钮的 DOM 元素需要设置 ID 属性为“btnClose”。
     */
    me.errorPage = null;
    
    /**
     * 获取或者设置一个 JSON 对象，表示错误信息。例如： {message: "空对象"}。目前该参数只包含一个 message 属性。 使用 @link {setError} 方法设置该参数。
     */
    me.error = {messsage: ""}; 
    
    var _$message = null;
    var _$errorMask = null;

    base.init = me.init;
    me.init = function()
    {
        base.init();

        me.$e.addClass("errorBox");
        me.$e.boxShadow( {
             left:0,
             top:0,
             size:0,
             color:"rgba(0,0,0,0.5)"
        });
        
        if (me.errorPage == null)
        {
            _initErrorBox();
        }
        else
        {
            _initCustomErrorBox();            
        }
    };

    /**
     * 设置错误信息的值。
     * @param [p_error=""] 一个字符串或 JSON 对象（如 { message："错误信息。" }）。
     */
    me.setError = function(p_error)
    {
        error = me.error;        
        if ($isString(p_error))
        {
        	error.message = p_error;
        }
        else if ($.isPlainObject(p_error) && $isString(p_error.message))
        {
        	$.extend(error, p_error);
        }
     
        _$message.text(error.message.trim());
    };

    /**
     * 在顶层显示含有错误信息的容器。
     * @param p_error 参见 {@link setError} 方法的 p_error 参数。
     * @param p_errorPage 一个字符串，表示错误页面的地址。
     */
    me.show = function(p_error, p_errorPage)
    {
        if ($notEmpty(p_errorPage))
        {
            if (me.errorPage != p_errorPage)
            {
                me.errorPage = p_errorPage;
                _load_page(me.errorPage, p_error);
            }
            else
            {
                _show(p_error);
            }
        }
        else
        {
            if (me.errorPage != null && _$message == null)
            {
                _load_page(me.errorPage, p_error);
            }
            else
            {
                _show(p_error);
            }    
        }              
    };
    
    function _load_page(p_page, p_error)
    {
        me.$e.css({
            width:"100%",
            height:"100%",
            top:0,
            left:0,
            margin:0
        });
        me.$e.load(p_page, function(){
            _$message = me.$e.find("#message");
            var $btnClose = me.$e.find("#btnClose");
            $btnClose.on("click", _btnClose_click);
            _show(p_error);
        });
    }
    
    function _show(p_error)
    {
        if ($notEmpty(_$message) && _$message.length > 0)
        {
            me.setError(p_error);
        }
        
        if (_$errorMask == null)
        {
            _$errorMask = $("<div class='errorMask mx'/>");
            _$errorMask.append(me.$e);
        }
        $(document.body).append(_$errorMask);
    }

    function _btnClose_click()
    {
    	if(_$errorMask)
    	{
    		_$errorMask.detach();
    	}
    	else
		{
    		me.hide();
		}
    }

    function _btnCopy_click()
    {
        mx.utils.ClipboardUtil.setText(_$message.val());
    }

    function _initCustomErrorBox()
    {
        me.$e.empty();
    }
    
    var _$content = null;
    function _initErrorBox()
    {
        $content = $("<div id='content'/>");
        $content.append("<div id='warmImg'/>");
        $content.append("<div id='errorImg'/>");
        var $warmMessage = $("<div id='warmMessage'/>");
        $content.append($warmMessage);
        me.$e.append($content);
        me.$e.append("<div id='btnClose'/>");
        
        $warmMessage.html(mx.msg("HTTP_ERROR_MESSAGE"));
        
        
        
        try
        {
            if (!($notEmpty(mx.errorType) && mx.errorType == "friendly"))
            {
                $content.append("<textarea id='message' readonly  />");
                _$message = me.$e.find("#message");
            } 
        }
        catch(e)
        {
            $content.append("<textarea id='message' readonly  />");
            _$message = me.$e.find("#message");
        }
        me.$e.find("#btnClose").click(_btnClose_click);
    }
    
    base.dispose = me.dispose;
    /**
	* 释放对象运行时动态生成的内容（属性、方法、事件）。
	*/
    me.dispose = function()
    {
        me.$e.find("#btnClose").off();
    	 
		if (_$message)
		{
			_$message.off();
			_$message.unbind();
			_$message.empty().remove();
			delete _$message.prevObject;
			_$message = null;
			delete _$message; 
		}
		
		if (_$errorMask)
		{
			_$errorMask.off();
			_$errorMask.unbind();
			_$errorMask.empty().remove();
			delete _$errorMask.prevObject;
			_$errorMask = null;
			delete _$errorMask; 
		}
		
    	base.dispose();
    }
    
    me.endOfClass(arguments); 
    return me;
};
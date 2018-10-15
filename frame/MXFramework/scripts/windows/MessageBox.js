$ns("mx.windows");

$import("mx.controls.Button");
$import("mx.editors.TextEditor");

/**
 * 提供一个消息提示框的类，该类提供了消息对话框的功能逻辑，内置了 {@link mx.windows.Window} 对象负责外观展现。
 * 
 * @example 以下是一个使用消息提示框的示例。
 * <code language="JavaScript">
 * var msgBox = new mx.windows.MessageBox( {
 *		reusable : true,//一个Boolean值，表示弹出窗口是否可重用。
 *		title : "标题",// 一个字符串，表示弹出窗口的标题。
 *		showOkButton : true,//一个Boolean值，表示是否显示确定按纽。
 *		showCancelButton : true,//一个Boolean值，表示是否显示取消按纽。
 *		okButtonText : "确定",//一个字符串，表示第一个按纽名称。
 *		cancelButtonText : "取消",// 一个字符串，表示第二个按纽名称。
 *		message : "提示内容。",//一个字符串，表示弹出窗口的内容。
 *		imgkey : "error",//一个字符串，表示弹出窗口的类型， 支持四种类型：info：提示信息 | warnning：警告信息 | error：错误信息 |prompt：输入框(如果类型是 prompt，可以调用时使用 function(){alert(this.textEditor.text);}来获取输入框的值)
 *		okButtonCallback : function()
 *		{//一个 Function 对象，表示第一个按钮的回调函数。
 *			alert("第一个按纽回调")
 *		},
 *		cancelButtonCallback : function()
 *		{//一个 Function 对象，表示第二个按钮的回调函数。
 *			alert("第二个按纽回调")
 *		}
 *	});
 *
 *	msgBox.setMessage("setMessage");
 *	msgBox.setTitle("setTitle");
 *	msgBox.setOkButtonText("获取prompt的值");
 *	msgBox.setCancelButtonText("canel");
 *	msgBox.setImgkey("prompt");
 * 
 *  msgBox.show( function()
 *	{
 *		if(this.textEditor!=null){
 *			if(this.textEditor.text!=""){
 *				alert(this.textEditor.text);
 *			}else{
 *				alert("输入框值为空");
 *			}
 *		}else{
 *			alert("当前类型不是提示框");
 *		}
 *	}, function()
 *	{
 *		alert("点击cancel的回调函数，此回调是在show方法里定义的");
 *	});
 * </code>
 */
mx.windows.MessageBox = function()
{
	var me = $extend(MXComponent);
	var base = {};

	/**
	 * 获取或设置消息提示框的宽度。
	 */
	me.width = 300;

	/**
	 * 获取或设置消息提示框的高度。
	 */
	me.height = 160;

	/**
	 * 获取或设置消息框标题。
	 */
	me.title = "";

	/**
	 * 获取或设置消息框显示内容。
	 */
	me.message = "";

	/**
	 * @ignore
	 */
	me.left = "center";

	/**
	 * @ignore
	 */
	me.top = "center";

	/**
	 * 获取或设置确定按钮是否显示，默认为显示。
	 */
	me.showOkButton = true ;
	
	/**
	 * 获取或设置取消按钮是否显示，默认为显示。
	 */
	me.showCancelButton = true ;
	
	/**
	 * 获取或设置确定按钮的显示值。
	 * 
	 * @default 确定
	 */
	me.okButtonText = null;

	/**
	 * 获取或设置取消按钮的显示值。
	 * 
	 * @default 取消
	 */
	me.cancelButtonText = null;

	/**
	 * 参见 {@link mx.windows.Window.reusable} 字段。
	 * 
	 * @default true
	 */
	me.reusable = true;

	/**
	 * 点击“确定”按钮后执行的回调函数。
	 */
	me.okButtonCallback = null;

	/**
	 * 点击“取消”按钮后执行的回调函数。
	 */
	me.cancelButtonCallback = null;
	
	/**
	 * 当对话框被关闭后将触发该事件。
	 */
	me.onclose = null;

	/**
	 * 获取或者设置提示框的类型，默认为：info。 支持四种类型：info：提示信息 | warnning：警告信息 | error：错误信息 |
	 * prompt：输入框。
	 */
	me.imgkey = "info";

	/**
	 * 获取或设置窗体的zIndex值，控制窗口的层叠顺序，值大的窗口覆盖值小的窗口,值需大于0
	 */
	me.zIndex = 9999;
	
	/**
	 * @ignore
	 */
	me.okButton = null;

	/**
	 * @ignore
	 */
	me.cancelButton = null;

	/**
	 * @ignore
	 */
	me.windowManager = null;

	/**
	 * @ignore
	 */
	me.textEditor = null;

	var _$messageSpan = null;
	var _msgWin = null;
	var _$top_image = null;
	var $bottom = null;
	var $top = null;
	var $top_left = null;
	var $top_right = null;

	base.init = me.init;
	me.init = function()
	{
		base.init();

		if (me.windowManager == null)
		{
			me.windowManager = new mx.windows.WindowManager();
			me.windowManager.zIndex = me.zIndex;
		}

		if (me.okButton == null)
		{
			if ($isEmpty(me.okButtonText))
			{
				me.okButtonText = mx.msg("OK");
			}
			
			me.okButton = new mx.controls.Button( {
				text : me.okButtonText,
				onclick : me._btnOk_click
			});
		}

		if (me.cancelButton == null)
		{
			if ($isEmpty(me.cancelButtonText))
			{
				me.cancelButtonText = mx.msg("CANCEL");
			}
			
			me.cancelButton = new mx.controls.Button( {
				text : me.cancelButtonText,
				onclick : me._btnCancel_click
			});
		}
		_init();
	};

	/**
	 * 显示消息框。
	 * 
	 * @param [p_okBtnCallback]
	 *            一个 Function 对象，表示确定按钮的回调函数。
	 * @param [p_cancelBtnCallback]
	 *            一个 Function 对象，表示取消按钮的回调函数。
	 */
	me.show = function(p_okBtnCallback, p_cancelBtnCallback)
	{
		_msgWin.$e.addClass("messageBox");

		if ($.isFunction(p_okBtnCallback))
		{
			me.okButtonCallback = p_okBtnCallback;
		}

		if ($.isFunction(p_cancelBtnCallback))
		{
			me.cancelButtonCallback = p_cancelBtnCallback;
		}

		if (_msgWin != null)
		{
			if (me.okButton && !me.okButton.enabled)
			{
				me.okButton.setEnabled(true);
			}
			
			if (me.cancelButton && !me.cancelButton.enabled)
			{
				me.cancelButton.setEnabled(true);
			}
			
			_msgWin.showDialog();
			
			// IE6下初始化body内容大小
	       	if($.isIE6()) {
				_msgWin.on("load", function(){
	            	$top_right.width(_msgWin.$body.width() - $top_left.width());
	            	$top.height(_msgWin.$body.height() - $bottom.height());
				});
			}
		}
	};

	/**
	 * 设置确定按钮的显示值。
	 * 
	 * @param p_text
	 *            一个字符串，表示确定按钮的显示值。
	 */
	me.setOkButtonText = function(p_text)
	{
		if (me.okButton != null)
		{
			me.okButtonText = p_text;
			me.okButton.setText(p_text);
		}
	};

	/**
	 * 设置取消按钮的显示值。
	 * 
	 * @param p_text
	 *            一个字符串，表示取消按钮的显示值。
	 */
	me.setCancelButtonText = function(p_text)
	{
		if (me.cancelButton != null)
		{
			me.cancelButtonText = p_text;
			me.cancelButton.setText(p_text);
		}
	};

	/**
	 * 设置 {@link title} 字段的值。
	 * 
	 * @param p_title
	 *            一个字符串，表示弹出框的标题。
	 */
	me.setTitle = function(p_title)
	{
		if (_msgWin != null)
		{
			me.title = p_title;
			_msgWin.setTitle(me.title);
		}
	};

	/**
	 * 设置 {@link message} 字段的值。
	 */
	me.setMessage = function(p_message)
	{
		if (_$messageSpan != null)
		{
			if (me.imgkey == "prompt")
			{
				me.textEditor = new mx.editors.TextEditor( {
					height : me.height / 2.5 + "px",
					width : me.width / 1.9 + "px",
					textMode : "multiline",
					text:p_message
				});
				_$messageSpan.find("td").empty();
				_$messageSpan.find("td").append(me.textEditor.$e);
			} else if(p_message != null)
			{
				me.message = p_message.toString();
				_$messageSpan.find("td").html(me.message);
			}
		}
	};

	/**
	 * 设置 {@link imgkey} 字段的值。
	 */
	me.setImgkey = function(p_imgkey)
	{
		me.imgkey = p_imgkey;
		me._setImgKeyIcon(me.imgkey);
	};
	
	/**
	 * 获取内部的 {@link mx.windows.Window} 对象}。
	 */
	me.getWindow = function()
	{
		return _msgWin;
	}
	
	/**
	 * @ignore
	 */
	me._btnOk_click = function()
	{
		me.okButton.setEnabled(false);//避免双击
		if ($notEmpty(me.okButtonCallback))
		{
			me.okButtonCallback();
		}

		if (_msgWin != null)
		{
			_close();
		}
	};

	/**
	 * @ignore
	 */
	me._btnCancel_click = function()
	{
		me.cancelButton.setEnabled(false);//避免双击
		if ($notEmpty(me.cancelButtonCallback))
		{
			me.cancelButtonCallback();
		}

		if (_msgWin != null)
		{
			_close();
		}
	};

	/**
	 * @ignore
	 */
	function _close()
	{
		if (me.reusable)
		{
			_msgWin.hide();
		} else
		{
			_msgWin.close();
		}
	}

	/**
	 * @ignore
	 */
	function _init()
	{
		if (_msgWin == null)
		{
			_msgWin = me.windowManager.create( {
				title : me.title,
				displayMaxButton : false,
				resizable : false,
				reusable : me.reusable,
				width : me.width,
				height : me.height,
				left : me.left,
				top : me.top
			});
		}
		
		_msgWin.on("close", _msgWind_close);
		_msgWin.on("hide", _msgWind_close);
		
		$top = $("<div id='top'/>");
		$top_left = $("<div id='top_left'/>");
		$top_right = $("<div id='top_right' class='word_onnewline'/>");
		_$messageSpan = $("<table><tr><td/></tr></table>");
		$top_right.append(_$messageSpan);
		$top.append($top_left);
		$top.append($top_right);

		_$top_image = $("<table class='icontable'><tr><td style='text-align:center;'></td></tr></table>");
		$top_left.append(_$top_image);

		me._setImgKeyIcon(me.imgkey);

		$bottom = $("<div id='bottom'/>");
		me._setBottomButtons(me.showOkButton,me.showCancelButton);

		_msgWin.$body.append($top);
		me.setMessage(me.message);
	}
	
	/**
	 * @ignore
	 * 
	 * 底部按纽显示控制。
	 * 
	 * @param [p_showOkButton]
	 *            一个 Boolean 对象，表示是否显示确定按纽。
	 * @param [p_showCancelButton]
	 *            一个 Boolean 对象，表示是否显示取消按纽。
	 */
	me._setBottomButtons = function(p_showOkButton,p_showCancelButton)
	{
		if(p_showOkButton && p_showCancelButton){
			$bottom.empty();
			if(!me.okButton){
				me.okButton = new mx.controls.Button( {
					text : me.okButtonText,
					onclick : me._btnOk_click
				});
			}			
			me.cancelButton.setText(me.cancelButtonText);
			if(!me.cancelButton){
				me.cancelButton = new mx.controls.Button( {
					text : me.cancelButtonText,
					onclick : me._btnCancel_click
				});
			}			
			if(!$.isIE67()) {
				$bottom.append(me.okButton.$e);
				$bottom.append(me.cancelButton.$e);
			} else {
				$bottom.append(me.cancelButton.$e);
				$bottom.append(me.okButton.$e);
			}
		}else if(p_showOkButton && !p_showCancelButton){
			$bottom.empty();
			if(!me.okButton){
				me.okButton = new mx.controls.Button( {
					text : me.okButtonText,
					onclick : me._btnOk_click
				});
			}			
			$bottom.append(me.okButton.$e);
		}else if(!p_showOkButton && p_showCancelButton){
			if(!me.cancelButton){
				me.cancelButton = new mx.controls.Button( {
					text : me.cancelButtonText,
					onclick : me._btnCancel_click
				});
			}			
			$bottom.append(me.cancelButton.$e);
		}else {
			$bottom.empty();
			$bottom.css({"height":0,"overflow":"hidden"});
			$top.css({"bottom":0,"border":0});
		}
		_msgWin.$body.append($bottom);
	};

	/**
	 * @ignore
	 * 
	 * 设置控件图标显示样式。
	 */
	me._setImgKeyIcon = function(p_imgKey)
	{
		var $span = _$top_image.find("td");
		var symbol;
		switch (p_imgKey)
		{
		case "info":
			symbol = mx.utils.SymbolUtil.getSymbol("info");
			break;
		case "warnning":
			symbol = mx.utils.SymbolUtil.getSymbol("warning");
			break;
		case "error":
			symbol = mx.utils.SymbolUtil.getSymbol("error");
			break;
		case "prompt":
			symbol = mx.utils.SymbolUtil.getSymbol("question");
			me.setMessage(me.message);
			break;
		default:
			symbol = mx.utils.SymbolUtil.getSymbol("info");
			break;
		}
		if (symbol != null)
		{
			$span.text(symbol.text);
		}
	};
	
	function _msgWind_close(e)
	{
		me.trigger("close");
	}
	
	var _disposing=false;
	base.dispose = me.dispose;
    /**
     * 释放对象运行时动态生成的内容（属性、方法、事件）。
     */
    me.dispose = function(){
		_disposing=true;
		if(me.okButton){
			me.okButton.dispose();
		}
		if(me.cancelButton){
			me.cancelButton.dispose();
		}
		if(me.textEditor){
			me.textEditor.dispose();
		}			
		//清除缓存
		if(_$messageSpan){
			_$messageSpan.empty().remove();
			_$messageSpan=null;
			delete _$messageSpan;
		}
		if(_$top_image){
			_$top_image.empty().remove();
			_$top_image=null;
			delete _$top_image;
		}
		if($top_left){
			$top_left.empty().remove();
			$top_left=null;
			delete $top_left;
		}
		if($top_right){
			$top_right.empty().remove();
			$top_right=null;
			delete $top_right;
		}
		if($top){
			$top.empty().remove();
			$top=null;
			delete $top;
		}
		if($bottom){
			$bottom.empty().remove();
			$bottom=null;
			delete $bottom;
		}
		
		if(_msgWin){
			_msgWin.clear();
			if(_disposing){
				_msgWin.dispose();
			}else{
				_msgWin.close();
			}						
			_msgWin=null;
			delete _msgWin;
		}
		
		base.dispose();
	}
	
	me.endOfClass(arguments);
	return me;
};
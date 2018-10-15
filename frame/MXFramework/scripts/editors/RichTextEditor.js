$ns("mx.editors");

$import("mx.lib.jquery-cleditor");
$import("mx.utils.DelayedTask");

/**
 * 提供一个允许用户输入带格式文本的富文本编辑器的类。
 * 
 * @example 以下是一个富文本编辑器如何初始化的示例。 
 * <code language="JavaScript">
 * var rich = new mx.editors.RichTextEditor();
 * </code>
 * @example 以下是一个富文本编辑器上传本地图片，并产生图片链接。 
 * <code>
 * var richTextEditor = new mx.editors.RichTextEditor({
 *		height: 350,
 *		uploadPicture:true,
 *		pictureSavePath:"/123",
 *		uploadFileUrl:"http://127.0.0.1:9000/Exam/mx/servlets/fileUpload",
 *		pictureUrl:"http://127.0.0.1:9000/123/"
 *    });
 * </code>
 */
mx.editors.RichTextEditor = function()
{
	var me = $extend(mx.editors.Editor);
	var base = {};

	/**
     * @ignore
     */
	me.docType = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">';

	/**
     * @ignore
     */
	me.bodyStyle = "margin:4px; font:10pt Arial,Verdana; cursor:text;word-wrap:break-word;height:100%;";

	/**
     * @ignore
     */
	me.controls = "bold italic underline strikethrough subscript superscript | font size "
					+ "style | color highlight removeformat | bullets numbering | outdent "
					+ "indent | alignleft center alignright justify | undo redo | "
					+ "rule image link unlink | cut copy paste pastetext | print source";

	/**
     * @ignore
     */
	me.colors = "FFF FCC FC9 FF9 FFC 9F9 9FF CFF CCF FCF "
				+ "CCC F66 F96 FF6 FF3 6F9 3FF 6FF 99F F9F "
				+ "BBB F00 F90 FC6 FF0 3F3 6CC 3CF 66C C6C "
				+ "999 C00 F60 FC3 FC0 3C0 0CC 36F 63F C3C "
				+ "666 900 C60 C93 990 090 399 33F 60C 939 "
				+ "333 600 930 963 660 060 366 009 339 636 "
				+ "000 300 630 633 330 030 033 006 309 303";
	
	
	/**
     * @ignore
     */
	me.fonts = "Arial,Arial Black,Comic Sans MS,Courier New,Narrow,Garamond,"
				+ "Georgia,Impact,Sans Serif,Serif,Tahoma,Trebuchet MS,Verdana";
	
	
	/**
     * @ignore
     */
	me.sizes = "1,2,3,4,5,6,7";

	/**
	 * @ignore
	 */
	me.styles = [ [  mx.msg("RTE_PARAGRAPH"), "<p>" ], [ mx.msg("RTE_HEADER", [1]), "<h1>" ],
			[  mx.msg("RTE_HEADER", [2]), "<h2>" ], [  mx.msg("RTE_HEADER", [3]), "<h3>" ],
			[  mx.msg("RTE_HEADER", [4]), "<h4>" ], [  mx.msg("RTE_HEADER", [5]), "<h5>" ],
			[  mx.msg("RTE_HEADER", [6]), "<h6>" ] ];

	/**
	 * @ignore
	 */
	me.width = 550;
	
	/**
	 * @ignore
	 */
	me.height = 550;
	
	/**
	 * @ignore
	 */
	me.editorAreaWidth = 500;
	
	/**
	 * @ignore
	 */
	me.editorAreaHeight = 500;
	
	/**
     * 一个字符串，获取或设置 CSS 样式文件的路径。
     */
	me.docCSSFile = "";
	
    /**
     * 获取或设置编辑区弹出窗体标题栏中的文本，没有弹出窗体时设置该属性无效，请在初始化前设置该字段的值。
     */
	me.title = mx.msg("RICHTEXT_EDITOR_TITLE");
	
	/**
	 * 获取一个 Boolean 值，编辑器是否处于编辑状态。
	 */
	me.editing = false;
	
   /**
     * 获取和设置一个 Number 值，表示文本框可输入的字符长度。
     */
    me.maxLength = null;
	
    /**
     * 获取和设置一个windowManager 
     */
    me.windowManager = null;
    
	/**
	 * @ignore
	 */
	me.owner = null;
	/**
	 * 插入图片本地存储的相对地址，同时需要将uap项目配置文件，上传目录：设置为url可访问的目录。
	 */
	me.pictureSavePath = "";
	/**
	 * 上传图片的服务端servlet地址
	 */
	me.uploadFileUrl = "";
	
	/**
	 * 服务器端图片访问的根目录
	 */
	me.pictureUrl = "";
	/*
	 * 是否上传图片， 当为true，需要设置以下属性。
	 * me.pictureSavePath：本地用于上传文件的相对目录，子目录必须能在服务端通过url访问。
	 * me.uploadFileUrl：上传文件是服务端的访问rest请求路径。
	 * me.pictureUrl：通过url访问图片的文件夹路径。
	 * var richTextEditor = new mx.editors.RichTextEditor({
		height: 350,
		uploadPicture:true,
		pictureSavePath:"/123",
		uploadFileUrl:"http://127.0.0.1:9000/Exam/mx/servlets/fileUpload",
		pictureUrl:"http://127.0.0.1:9000/123/"
    });
	 */
	me.uploadPicture = false;
	
	/**
	 * 记录初始化参数
	 */
	var _options = null;
	/**
	 * 记录创建的编辑器对象
	 */
	var _cleditor = null;
	var _$editorArea = null;
	
	var _$editorContainer = null;
	var _editor = null;
	
	var _isLoaded = false;
	
	base._ = me._;    
	me._ = function(p_options)
    {
		_options = $.extend({}, p_options);
		base._(p_options);
    };
	
	base.init = me.init;
	me.init = function()
	{
		if ($.isIE67() && me.width == "100%")
		{
			me.width = "auto";
		}
		
		base.init();
		if($isEmpty(me.value) && !$isEmpty(me.text)){
        	me.value = me.text;
        }else{
        	me.text = me.value;
        }
		_initCleEditor();
		_init();
	};

    
    function getMaxLength(){
    	if(me.validOptions && "maxLength" in me.validOptions){
    		return me.validOptions.maxLength;
    	}else if(me.maxLength && me.maxLength > 0){
    		return me.maxLength;
    	}
    }
    
    base.setValue = me.setValue;
	/**
     * @ignore
     */
    me.setValue = function(p_value, p_triggerEvent)
    {
    	var maxLength = getMaxLength();
    	me._outOfLengthTip = "";
    	if(maxLength != undefined)
    	{
    	    if($isString(p_value) && p_value.length > maxLength)
    	    {
    	         me._outOfLengthTip = mx.msg("RTE_OUTOFLENGTHTIP");
    	    }
    	}
    	
    	base.setValue(p_value, p_triggerEvent);
    	
    	//表格中使用的模式
    	if(_isCellMode()){
    		_setEditorContent(p_value);
    	}else if(_cleditor && _cleditor.$area){
    		var _text = _cleditor.$area.val();
        	if(_text != p_value){
        		_cleditor.$area.val(p_value);
        		_cleditor.refresh();
    		}
    	}
    };
    
    base.reset = me.reset;
    /**
     * 重置编辑器。
     * @param [p_triggerEvent=false] 指定是否要触发 {@link onchanged} 事件。
     */
    me.reset = function(p_triggerEvent)
    {
    	base.reset(p_triggerEvent);
    	//表格中使用的模式
    	if(_isCellMode()){
    		if(_editor){
    			_editor.reset(p_triggerEvent);
    		}
    		_setEditorContent(null);
    	}else if(_cleditor && _cleditor.$area){
    		_cleditor.$area.val("");
			_cleditor.refresh();
    	}
    };
    
	
	function _init()
	{
		//弹出窗口的方式
		if(_isCellMode())
		{
			me.$e.addClass("richTextEditor");
			_$editorContainer = $("<div class='container'>");
			me.$e.append(_$editorContainer);
			_setEditorContent(me.value);
			me.$e.on("click", _startEditing);
		}else
		{
			_createEditorUnderForm();
		}
		
		$(document).on("keydown", me.__document_keydown);
	}
	
	function _setEditorContent(p_value){
		if(_$editorContainer)
			_$editorContainer.html(p_value ? p_value : "");
	}

    function _startEditing()
    {
	    var _parentWin;
	    if(me.windowManager && !$instanceOf(me.windowManager,mx.windows.WindowManager))
	    {
	        me.windowManager = null;
	    }
	    if(me.windowManager==null){
        	if (me.getContext() && me.getContext().windowManager){
        	    _parentWin = me.getContext().windowManager.activeWindow;
		        me.windowManager =  me.getContext().windowManager
        	}else{
        	    me.windowManager = new mx.windows.WindowManager();
        	}
	    } 

	    var _editorWin = me.windowManager.create({
    			    title: me.title,
		            width:me.editorAreaWidth,
					height:me.editorAreaHeight,
		            resizable: false,
		            reusable: false,
		            left: "center",
	            	top: "center"
	    });

		_editorWin.$e.on("click", function(e)
        {
            e.stopPropagation();
        });
        
        _editorWin.on("activate", function(){
        		me.editing = true;
        		var initOption = $.extend({}, _options);
        		delete initOption["parent"];
        		delete initOption["owner"];
        		initOption.width = "100%";
        		initOption.height = "100%";
        		initOption = $.extend(initOption, {value: me.value,readOnly: me.readOnly, enabled: me.enabled})
        		_editor = new mx.editors.RichTextEditor(initOption);
        		_editorWin.addControl(_editor);
	        }
        );
        
        //窗口关闭清理资源
        _editorWin.on("close", function(){
        		me.editing = false;
        		if(_parentWin)
        			_parentWin.activate();
        		_editor = null;
	        }
        );
        _editorWin.showDialog(me._resetText);
        
        if ($notEmpty(_editorWin.$mask))
        {
            _editorWin.$mask.on("click", function(e)
            {
                e.stopPropagation();
            });
        }
    }
    
    /**
     * @ignore
     * 提供一个方法，如果是弹出方式，将弹出框的内容回显到编辑器。
     */
	me._resetText = function()
	{
		if(_editor == null){
		    return;
		}
		//及时更新编辑器的值
		_editor._updateValue();
		var value = _editor.value;
		_editor._hidePopups();
		//设置值
		me.setValue(value, true);
	}
	
	/**
	 *@ignore 
	 *非弹出框使用时编辑方式，如 form 中使用
	 */
	function _createEditorUnderForm(e)
	{
		me.$e.addClass("richTextEditor");
		_$editorArea =$("<textarea/>");
		me.$e.append(_$editorArea);
		
		if(me.value!=null)
		{
			_$editorArea.val(me.value);
		}
		var options = {width: me.width,height: me.height};
		options.owner = me;
		options._blur_callback = _$frame_onblur;
		options._focus_callback = _$frame_onfocus;
		options._keyup_callback = _input_keyup;
		options._editor_loaded_callback = _editor_loaded;
		//创建编辑器
		_cleditor = _$editorArea.cleditor(options)[0];
		// 值改变时 setvalue
		_cleditor.change(_setValue);
	}
	
	function _$frame_onfocus(){
		me.editing = true;
	}
	
	function _$frame_onblur(){
		me.editing = false;
		$(document).on("keydown", me.__document_keydown);
	}
	
	function _editor_loaded(){
		_isLoaded = true;
		if(me.readOnly)
			me.setReadOnly(me.readOnly);
		if(me.enabled == false)
			me.setEnabled(me.enabled);
	}
	
	/**
	 *@ignore
	 * 键盘输入后 setvalue
	 */
	function _input_keyup(e)
	{
		if(e.p_ctrlKey || e.altKey || (e.which >= 112 && e.which <= 137) || (e.which >= 33 && e.which <= 45))
		{
			// ctrl，alt 组合键 
			//112-137：F1~F24，Num_Lock，Scroll_Lock
			// 33-45 ：方向，Select， Print，Insert 等
			// 46：Delete
			return;
		}
		mx.utils.DelayedTask.delay(600, _delaySetValue , me, []);
	}
	
	/**
	 * @ignore
	 */
	me._updateValue = function(){
		if(_cleditor){
			if(_cleditor.sourceMode())
			{
				_cleditor.updateFrame();
			}else
			{
				_cleditor.updateTextArea();
			}
			_setValue();
		}
	}
	
	/**
	 * @ignore
	 */
	me._hidePopups = function(){
		if(_cleditor)
			_cleditor.hidePopups();
	}
	
	/**
	 * @ignore
	 * 延时设置值
	 */
	function _delaySetValue(){
		if(_cleditor){
			if(!_cleditor.sourceMode()){
				_cleditor.updateTextArea();
			}
			_setValue();
		}
	}
	
	function _setValue()
	{
		me.setValue(_cleditor.$area.val(), true)
	}
	
	function _initCleEditor()
	{
		var cleOptions = {
			width: me.editorAreaWidth,
			height: me.editorAreaHeight,
			docType: me.docType,
			bodyStyle: me.bodyStyle,
			controls: me.controls,
			colors: me.colors,
			fonts: me.fonts,
			sizes: me.sizes,
			styles: me.styles,
			docCSSFile: me.docCSSFile
		};
		
		$.extend($.cleditor.defaultOptions,cleOptions);
		
		//工具栏国际化设置
		var buttons = $.cleditor.buttons;
		
		for (var buttonName in buttons )
		{
			var button = buttons[buttonName];
			var title = null;
			switch (buttonName)
			{
				case "alignleft":
					title = mx.msg("RTE_ALIGNLEFT");
					break;
				case "alignright":
					title = mx.msg("RTE_ALIGNRIGHT");
					break;
				case "bold":
					title = mx.msg("RTE_BOLD");
					break;
				case "bullets":
					title = mx.msg("RTE_BULLETS");
					break;
				case "center":
					title = mx.msg("RTE_CENTER");
					break;
				case "color":
					title = mx.msg("RTE_FONT_COLOR");
					break;
				case "copy":
					title = mx.msg("RTE_COPY");
					break;
				case "cut":
					title = mx.msg("RTE_CUT");
					break;
				case "font":
					title = mx.msg("RTE_FONT");
					break;
				case "highlight":
					title = mx.msg("RTE_HIGHLIGHT");
					break;
				case "image":
					title = mx.msg("RTE_INSERT_IMAGE");
					break;
				case "indent":
					title = mx.msg("RTE_INDENT");
					break;
				case "italic":
					title = mx.msg("RTE_ITALIC");
					break;
				case "justify":
					title = mx.msg("RTE_JUSTIFY");
					break;
				case "link":
					title = mx.msg("RTE_INSERT_LINK");
					break;
				case "numbering":
					title = mx.msg("RTE_NUMBERING");
					break;
				case "outdent":
					title = mx.msg("RTE_OUTDENT");
					break;
				case "paste":
					title = mx.msg("RTE_PASTE");
					break;
				case "pastetext":
					title = mx.msg("RTE_PASTE_TEXT");
					break;
				case "print":
					title = mx.msg("RTE_PRINT");
					break;
				case "redo":
					title = mx.msg("RET_REDO");
					break;
				case "removeformat":
					title = mx.msg("RET_REMOVEFORMAT");
					break;
				case "rule":
					title = mx.msg("RET_INSERT_HORIZONTALRULE");
					break;
				case "size":
					title = mx.msg("RTE_FONT_SIZE");
					break;
				case "source":
					title = mx.msg("RET_SHOW_SOURCE");
					break;
				case "strikethrough":
					title = mx.msg("RTE_STRIKETHROUGH");
					break;
				case "style":
					title = mx.msg("RTE_STYLE");
					break;
				case "subscript":
					title = mx.msg("RTE_SUBSCRIPT");
					break;
				case "superscript":
					title = mx.msg("RTE_SUPERSCRIPT");
					break;
				case "underline":
					title = mx.msg("RTE_UNDERLINE");
					break;
				case "undo":
					title = mx.msg("RET_UNDO");
					break;
				case "unlink":
					title = mx.msg("RTE_REMOVE_LINK");
					break;
				case "close":
					title = mx.msg("RTE_CLOSE");
					break;
				case "save":
					title = mx.msg("RTE_SAVE");
					break;
				default:
					break;
			}
			button.title = title;
		}
	}
	
	base.setWidth = me.setWidth;
	me.setWidth = function(p_width){
		base.setWidth(p_width);
		if(_cleditor && typeof (p_width) != "undefined"){
			$.extend(_cleditor.options,{width: p_width});
			_cleditor.$main.css("width", me.width);
			_cleditor.reSize();
		}
	}
	
	base.setHeight = me.setHeight;
	me.setHeight = function(p_height){
		base.setHeight(p_height);
		if(_cleditor && typeof (p_height) != "undefined"){
			$.extend(_cleditor.options,{height: p_height});
			_cleditor.$main.css("height", me.height);
			_cleditor.reSize();
		}
	}
	
	/**
	 * 编辑区获取焦点并选中
	 */
	me.select = function(){
		if(_cleditor && _cleditor.$area){
			_cleditor.focus();
			_cleditor.select();
		}
	}
	
	/**
	 * 获得焦点
	 */
	me.focus = function(){
		if(_cleditor && _cleditor.$area){
			_cleditor.focus();
		}
	}
	
	base.setEnabled = me.setEnabled;
	me.setEnabled = function(p_enabled){
		base.setEnabled(p_enabled);
		//必须等富文本控件加载完
		if(_cleditor && _isLoaded){
			_cleditor.focus();
			_cleditor.disable(!p_enabled);
			_cleditor.offCustomEvent();
			if(me.enabled){
				_cleditor.onCustomEvent();
			}
		}
		me.editing = me.enabled;
	}
	
	base.setReadOnly = me.setReadOnly;
	me.setReadOnly = function(p_readOnly){
		base.setReadOnly(p_readOnly);
		me.setEnabled(!p_readOnly);
	}
    
    function _isCellMode()
    {
        return (me.parent && me.parent.typeName && me.parent.typeName.indexOf("DataGrid") != -1) || me.owner; 
    }
    
    base.dispose = me.dispose;
    /**
	* 释放对象运行时动态生成的内容（属性、方法、事件）。
	*/
    me.dispose = function()
    {
    	if(_cleditor.dispose !=undefined){
    		_cleditor.dispose();
    	}
    	if(_cleditor){
    		
    		_cleditor = null;
    		_$editorArea.data("cleditor", null);
    	}
    	_$editorArea.off().unbind().empty().remove();
        _$editorArea = null;
        _$editorContainer = null;
    	_editor = null;
    	for (var i in _options)
    	{
    		_options[i] = null;
    		delete _options[i];
    	}
    	_options = null;
    	//删除页面中的嵌入式 IFRAME 元素，防止内存泄露。
        me.$e.find("IFRAME").each(function(i, _iframe){
        	try
            {
        		if (_iframe.contentWindow)
                {
                    if ($(_iframe).contents())
                    {
                        $(_iframe).contents().empty();
                    }
                    _iframe.src = "about:blank";
                    _iframe.contentWindow.location.href = "about:blank";
                }
                _iframe.src = "";
                $(_iframe).remove().empty();
                _iframe = null;
            }catch(e){}
        });
        me.controls = null;
    	base.dispose();
    };
	
	me.endOfClass(arguments); 
    return me;
};
$ns("mx.editors");

//CKEDITOR_BASEPATH需在加载ckeditor之前设置
window.CKEDITOR_BASEPATH = mx.rootPath + "/mx/scripts/lib/ckeditor/"; 
$import("mx.lib.ckeditor.ckeditor");

/**
 * 提供一个基于CKEditor允许用户输入带格式文本的富文本编辑器的类。
 * 
 * @example 以下是一个富文本编辑器如何初始化的示例。 
 * <code language="JavaScript">
 * var rich = new mx.editors.RichTextCKEditor({
 * 		width: "600px",
 * 		height: "400px",
 * 		toolbarType: "Full"//默认为Basic
 * });
 * </code>
 */
mx.editors.RichTextCKEditor = function()
{
	var me = $extend(mx.editors.Editor);
	var base = {};

	var _$editorArea = null;
	
	/**
	 * 编辑器宽度
	 * @default "100%"
	 */
	me.width = "100%";
	
	/**
	 * 编辑器编辑区域的高度
	 * @default 100%
	 */
	me.height = "100%";
	
	/**
     * 编辑器toolbar类型，也可以通过{@link options}属性自定义toolbar。
     * <p>
     * 该字段可选的值包括：
     * <ul>
     * <li><b>Basic</b></li>
     * <li><b>Full</b></li>
     * </ul>
     * </p>
     * 
     * @default Basic
     */
	me.toolbarType = "Basic";
	
	/**
	 * 编辑器配置项，参考CKEditor的config配置
	 * @default {}
	 */
	me.options = {};
	
	/**
	 * 编辑器basic toolbar
	 * @ignore
	 */
	me.toolbarBasic =  [
                ['Bold','Italic','Underline','Strike','Subscript','Superscript'],
                ['NumberedList','BulletedList','-','Outdent','Indent'],
                ['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],
                ['Link','Unlink','Anchor'],
                ['Table','HorizontalRule','SpecialChar'],
				'/',
                ['Styles','Format','Font','FontSize'],
                ['TextColor','BGColor'],
                ['Maximize', 'ShowBlocks','-']
             ];
	
	/**
	 * 获取编辑器实例对象
	 * @default null
	 */
	me.editor = null;
	
	/**
	 * 记录初始化参数
	 */
	var _options = null;
	var _editor = null;
	var _$editorContainer = null;
	
	base._ = me._;    
	me._ = function(p_options)
    {
		_options = $.extend({}, p_options);
		base._(p_options);
    };
	
	base.init = me.init;
	me.init = function()
	{
		base.init();
		_init();
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
		}
		else
		{
			var id = "editor_" + mx.random();
			_$editorArea =$("<textarea id='" + id + "' ></textarea>");
			me.$e.css("height", "auto");
			me.$e.append(_$editorArea);
			
			CKEDITOR.config = $.extend(CKEDITOR.config, {width:me.width, height: me.height, toolbar: me.toolbarType == "Basic"? me.toolbarBasic : ""}, me.options);
			CKEDITOR.domReady(function() {
				mx.utils.DelayedTask.delay(500, function() {
						me.editor = CKEDITOR.replace(id);
						
						if (me.value != null) 
						{
							me.editor.setData(me.value);
						}
						
						me.editor.on('change', function( event ) {    
						    var data = this.getData();
						    me._setValue(data, true);
						});
				});
			})
			
		}
		
	}
	
	function _setEditorContent(p_value)
	{
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
	    if (me.windowManager == null) {
        	if (me.getContext() && me.getContext().windowManager){
        	    _parentWin = me.getContext().windowManager.activeWindow;
		        me.windowManager =  me.getContext().windowManager
        	}else{
        	    me.windowManager = new mx.windows.WindowManager();
        	}
	    } 

	    var _editorWin = me.windowManager.create({
    			    title: me.title,
		            resizable: true,
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
        		initOption.height = "320";
        		initOption = $.extend(initOption, {value: me.value,readOnly: me.readOnly, enabled: me.enabled})
        		_editor = new mx.editors.RichTextCKEditor(initOption);
        		_editorWin.addControl(_editor);
	        }
        );
        
        //窗口关闭清理资源
        _editorWin.on("close", function() {
        		me.editing = false;
        		if(_parentWin)
        		{
        			_parentWin.activate();
        		}
        		
        		if (_editor && _editor.editor) 
		    	{
		    		_editor.editor.destroy(true);
		    	}
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
		if (_editor == null)
		{
		    return;
		}
		
		var value = _editor.value;
		if (_editor.editor) 
		{
			value = _editor.editor.getData();
		}
		
		//设置值
		me.setValue(value, true);
	}
    
    base.setValue = me.setValue;
	/**
     * 设置 {@link value} 字段的值。
     * @param p_value 指定编辑器的值。
     */
    me.setValue = function(p_value)
    {
    	if (p_value != me.value)
    	{
    	 	if (me.editor) 
	    	{
	    		me.editor.setData(p_value);
	    	} 
	    	else 
	    	{
	    		me._setValue(p_value, true);
	    	}
    	}
    };
    
    /**
     * @ignore
     */
    me._setValue = function(p_value, p_triggerEvent)
    {
    	var maxLength = getMaxLength();
    	me._outOfLengthTip = "";
    	if (maxLength != undefined)
    	{
    	    if($isString(p_value) && p_value.length > maxLength)
    	    {
    	         me._outOfLengthTip = mx.msg("RTE_OUTOFLENGTHTIP");
    	    }
    	}
    	
    	base.setValue(p_value, p_triggerEvent);
    	_setEditorContent(p_value);
    };
    
    base.setWidth = me.setWidth;
     /**
     * 设置 {@link width} 字段的值。
     * 
     * {@exclude mx.controls.UploadControl}
     * 
     * 
     * @param p_width
     *            控件的高度,可以是数字（如 500）、字符串（如“500px”）.
     */
    me.setWidth = function(p_width)
    {
    	base.setWidth(p_width);
    	if (me.editor)
    	{
    		me.editor.resize(p_width, me.height, true);
    	}
    };

    base.setHeight = me.setHeight;
    /**
     * 设置 {@link height} 字段的值。
     * 
     * @param p_height
     *            控件的高度，可以是数字（如 100），也可以是字符串（如 “100px”）。
     */
    me.setHeight = function(p_height)
    {
    	me.height = p_height;
    	if (me.editor)
    	{
    		me.editor.resize(me.width, parseInt(p_height), true);
    	}
    };
    
    function getMaxLength(){
    	if(me.validOptions && "maxLength" in me.validOptions)
    	{
    		return me.validOptions.maxLength;
    	}
    	else if(me.maxLength && me.maxLength > 0)
    	{
    		return me.maxLength;
    	}
    }
    
    base.reset = me.reset;
    /**
     * 重置编辑器。
     * @overload  function(p_triggerEvent)
     * @param [p_triggerEvent=false] 指定是否要触发 {@link onchanged} 事件。
     */
    me.reset = function(p_triggerEvent)
    {
    	if (me.editor) 
    	{
    		me.editor.setData("");
    	}
    	
    	if (_editor) 
    	{
    		_editor.reset();
    	}
    	
    	base.reset(p_triggerEvent);
    };
    
	
	base.setEnabled = me.setEnabled;
	/**
     * 设置 {@link enabled} 字段的值。
     * @param p_enabled 一个布尔值，true表示输入框可用，false表示输入框不可用
     */
	me.setEnabled = function(p_enabled)
	{
		if (me.editor) 
		{
			me.editor.setReadOnly(!p_enabled);
		}
		base.setEnabled(p_enabled);
	}
	
	base.setReadOnly = me.setReadOnly;
	/**
     * 设置 {@link readOnly} 字段的值。
     * @param p_readOnly 一个布尔值，true表示控件只读
     */
	me.setReadOnly = function(p_readOnly)
	{
		if (me.editor) 
		{
			me.editor.setReadOnly(p_readOnly);
		}
		
		base.setReadOnly(p_readOnly);
		me.setEnabled(!p_readOnly);
	}
    
    /**
     * 让编辑器失去焦点。
     */
    base.blur =  me.blur;
	me.blur = function()
    {
    	if (me.editor) 
    	{
    		var data = me.editor.getData();
			me._setValue(data, true);
    	}
	   
		base.blur();
    };
    
    
    base.dispose = me.dispose;
    /**
	* 释放对象运行时动态生成的内容（属性、方法、事件）。
	*/
    me.dispose = function()
    {
    	if (_$editorArea) 
    	{
    		_$editorArea.remove();
    	}
    	
    	if (me.editor) 
    	{
    		me.editor.destroy(true);
    	}
    	base.dispose();
    };
    
    function _isCellMode()
    {
        return (me.parent && me.parent.typeName && me.parent.typeName.indexOf("DataGrid") != -1) || me.owner;
    }
	
	me.endOfClass(arguments); 
    return me;
};
$ns("mx.editors");

$import("mx.controls.DragDataUploadControl");
$import("mx.controls.DragUploadControl");
$import("mx.controls.Label");
$import("mx.controls.UploadControl");
$import("mx.windows.WindowManager");


/**
 * 提供一个上传图片的类。
 * 
 * @example 以下是一个图片编辑器如何初始化的示例。 
 * <code language="JavaScript">
 * var annex = new mx.editors.PictureManagerEditor(
 * {
 *      filePath: "D:\\testUpload\\inner\\",
 *      windowHeight: 400,
 *      windowWidth: 500,
 *      width: 500,
 *      height: 400,
 *      maxImageHeight:1400,         //允许上传图片高度（px）
 *		maxImageWidth:1400,          //允许上传图片宽度（px）
 *		maxFileSize:100,    //允许上传图片大小（KB）
 *		fileUploaded:a,             //上传之后回调函数
 *      baseUrl:  mx.mappath("~/fileUpload")
 * });
 * 
 * function a(){
 *		alert(1);
 * }
 * </code>
 * 
 * @example 以下是一个在表单中使用图片编辑器的示例 
 * <code language="JavaScript">
 * DataForm = new mx.datacontrols.DataForm({
 *			fields:
 *			[
 *				{name:"id",caption:"id",maxLength:100,editorType:"TextEditor"},
 *				{name:"fname", caption:"fname", nullable:true, dataType:"string"},
 *				{
 *					name : "file2",
 *					caption : "附件2",
 *					editorType : "PictureManagerEditor",
 *					width:100,
 *					height:100,
 *					type : "form",
 *					uploadMode : "file",
 *					tableName : "UAP_EDITOR",
 *					colName : "FILE2",
 *					primaryKey : "ID",
 *					filePath:"D:\\uploadfile\\a"
 *				}
 *			],
 *			entityContainer: formEntityContainer
 *		});
 * });
 * </code>
 */
mx.editors.PictureManagerEditor = function()
{
    var me = $extend(mx.editors.Editor);
    
    
    var base = {};

    /**
     * 设置或获取一个字符串，表示当前编辑器的类型。 当类型为 path 时，表示管理指定目录下的图片； 当类型为 form 或 grid
     * 时，表示管理表单、表格对应的数据的附件。
     * <p>
     * 该字段可选的值包括：
     * <ul>
     * <li><b>path</b></li>
     * <li><b>form</b></li>
     * <li><b>grid</b></li>
     * </ul>
     * </p>
     * @default path
     */
    me.type = "path";

    /**
     * 获取或设置一个字符串，表示后台服务所在路径。MX 框架提供两个服务路径可供选择。
     * mx.mappath("~/../mx/servlets/fileUpload") 是管理指定目录下的文件时的默认服务路径；
     * mx.mappath("~/../mx/servlets/dataFileUpload") 是管理表单、表格对应的数据附件时默认服务路径。
     * 用户可以根据需要使用自己的服务路径。
     */
    me.baseUrl = null;

    /**
     * 设置或获取一个字符串，表示上传图片在服务器上的保存路径。
     * 如果{@link type}属性设置为path，则需要设置该属性
     */
    me.filePath = null;

    /**
     * 设置或获取一个字符串，表示上传控件所属数据的表名。 当控件类型为 form 或 grid 时，此属性有值。
     * 当{@link type}属性的值设置为form或者grid时，需要设置该属性
     */
    me.tableName = "";

    /**
     * 设置或获取一个字符串，表示上传控件所属数据表的主键列名。 当控件类型为 form 或 grid 时，此属性有值。
     * 当{@link type}属性的值设置为form或者grid时，需要设置该属性
     */
    me.primaryKey = "";

    /**
     * 设置或获取一个字符串，表示上传控件所属数据的主键值。 当控件类型为 form 或 grid 时，此属性有意义；若此时此属性没有值，控件不会响应点击事件。
     * 当{@link type}属性的值设置为form或者grid时，需要设置该属性
     */
    me.pkVal = "";

    /**
     * 设置或获取一个字符串，表示上传控件在存储表单数据的表中对应的列名。 当控件类型为 form 或 grid 时，此属性有值。
     * 当{@link type}属性的值设置为form或者grid时，需要设置该属性
     */
    me.colName = "";

    /**
     * 设置或获取一个字符串，表示保存文件的方式。 当控件类型为 form 或 grid 时，此属性有意义。
     * <p>
     * 该字段可选的值包括：
     * <ul>
     * <li><b>file</b>表示文件以磁盘文件方式存储</li>
     * <li><b>blob</b>表示文件以blob 类型存储在系统表的附件表中</li>
     * </ul>
     * </p>
     */
    me.uploadMode = "file";

    /**
     * 设置或获取一个字符串，表示编辑器的默认图标路径。
     * 
     * @default mx.mappath("$theme/images/picture_manager_big.gif");
     */
    me.iconUri = mx.mappath("$theme/images/picture_manager_big.gif");
    
    /**
     * 获取或设置一个数字，表示编辑器的宽。
     * 
     * @default 500
     */
    me.width = 500;
    
    /**
     * 获取或设置一个数字，表示编辑器的高。
     * 
     * @default 400
     */
    me.height = 400;
    
    /**
     * 获取或设置一个数字，表示编辑器编辑窗口的宽。
     * 
     * @default 600
     */
    me.windowWidth = 600;
    
    
    /**
     * 获取或设置一个数字，表示编辑器编辑窗口的高。
     * 
     * @default 400
     */
    me.windowHeight = 500;

    /**
     * 设置或获取一个字符串，表示禁止上传的文件类型，多个扩展名用逗号隔开。
     */
    me.limitTypes = "exe,bat";
    
    /**
     * 设置或获取一个字符串，表示允许上传的文件类型，多个扩展名用逗号隔开。值为 null 时允许上传所有文件。
     */
    me.allowTypes = "jpg,jpeg,gif,png,bmp,tiff";
    
    /**
     * 设置或获取一个数字，表示允许上传的文件大小（KB），0不限制。
     */
    me.maxFileSize = 0;
    
    /**
     * 设置或获取一个数字，表示允许上传的图片高度（像素）,0不限制。
     */
    me.maxImageHeight = 0;
    
    /**
     * 设置或获取一个数字，表示允许上传的图片宽度（像素）,0不限制。
     */
    me.maxImageWidth = 0;
    
    /**
     * 设置一个文件上传完成之后的回调函数。
     */
    me.fileUploaded = null;
    
    /**
     * 上传文件名
     */
    me.fileNames = "";
    
    /**
     * 指示列是否虚拟，如果列是虚拟的话，将不会执行业务表的逻辑
     * 
     * @default false
     */
    me.isVirtual = false;
    
    /**
     * @ignore
     */
    me.vault = null;
    
    /**
     * 图片管理器窗口内容区 
     */
    me.container = null;
    
    /*
     * 返回最后上传的文件名
     */
    me.lastestUploadedFileName = "";
    /*
     * 是否仅仅用于文件上传
     *  @default false
     */
    me.justUpload = false;
    
    /**
     * 设置需要忽略的全局属性设置;如:需要获取全局上传mx.globalUploadMode,只需设置  ignoreGlobalSet = ["globalUploadMode"] 既可
     */
    me.ignoreGlobalSet = [];
    
    base.init = me.init;
    
    me.init = function()
    {
        base.init();
        me.container = new mx.containers.Container();
        _init();
        me.context = me;
        if ($notEmpty(mx.globalUploadMode) &&   !  isIgnoreGlobalSet("globalUploadMode"))
        {   //使用全局上传模式配置覆盖局部配置。
            var uploadMode = ["file","blob","uds"];
            if (uploadMode.contains(mx.globalUploadMode))
            {
                me.uploadMode = mx.globalUploadMode;
            }
        }
        me.vault = new dhtmlXVaultObjectTwin();
        me.vault.onitemuploaded = _itemuploaded;
        me.vault.onitemuploading = _itemuploading;
        me.vault.onRemoveAllItems = _onremoveallitems;
        me.vault.fileUploaded = me.fileUploaded;
        me.vault.isVirtual = me.isVirtual;
        me.vault.setImagePath(mx.mappath("$theme/images/fileupload/"));
        me.vault.setBaseUrl(me.baseUrl);
        me.vault.create(me);
        me._initDefaultValue(false);
        me.setEnabled(me.enabled);
        me.setReadOnly(me.readOnly);
    };
    
   /**
    * @ignore
    */
   me._initDefaultValue = function(p_triggerEvent)
   {
        if(me.vault.isVirtual ===  true &&  !$isEmpty(me.fileNames))
        {
            me.setValue(me.fileNames,p_triggerEvent);
        }
   }

    /**
     * 提供一个方法，设置当前编辑器所属的表单数据的主键值。 当控件类型为 form 或 grid 时，此方法有意义。
     * 
     * @param p_pkVal
     *            一个数字或字符串，表示当前数据的主键值。
     */
    me.setPk = function(p_pkVal)
    {
        me.pkVal = p_pkVal; 
        if(me.vault!=null)
        {
        	me.vault.pkVal = me.pkVal;	
        }        
    };

    /**
     * 提供一个方法供数据组件调用，用于重置子数据的主键，一般在新增数据保存完成后执行。
     * 
     * @param p_items
     *            一个数组，包含保存结果的数据。
     * @param p_pkColName
     *            一个字符串，表示保存结果中主键属性名。
     */
    me.refreshPk = function(p_items, p_pkColName)
    {
        me.vault.refreshPk(p_items, p_pkColName);
    };
    
    base.setValue = me.setValue;
    
    /**
     * 设置上传文件的名称
     * @param p_value 文件名称
     * @param p_triggerEvent 一个布尔值，指示是否触发change事件
     */
    me.setValue = function(p_value, p_triggerEvent)
    {
    	base.setValue(p_value, p_triggerEvent);
    	me.fileNames = p_value;
    	var _val = p_value || "";
		if (me.type != "grid" && $isString(_val))
    	{
    		var _names = _val.split(";");
    		if(_names.length > 1)
    		{
				// 最少有一个文件才能预览 
				var _name = _names[_names.length - 2];
				me.$img.attr("src",_getUri(_name));
    		}
    		else
    		{
				me.$img.attr("src",me.iconUri);
    		}
    	}
		else if(me.type != "grid")
		{
			me.$img.attr("src",me.iconUri);
		}
    };

    /**
     * 提供一个方法，删除图片管理器的图片。
     */
    me.remove = function()
    {
    	me.vault.removeAllItems(false);
    }
    
    me.setEnabled = function(p_enabled)
    {
    	  me.enabled = p_enabled;
    	  if(me.vault !=null)
    	  {
    	       me.vault.enabled = me.enabled;
    	  }
    	  //修改样式
          if (me.container && me.container.$e)
    	  {
    		 me.container.$e.find("#add_file").toggleClass("btnDisable", !p_enabled);
             _downloadBtn(me.enabled);
             _uploadBtn(me.enabled);
             _clearBtn(me.enabled);
    	  }
    }
    
    me.setReadOnly = function(p_readOnly)
    {
    	 me.readOnly = p_readOnly;
    	 if(me.vault !=null)
    	 {
    	       me.vault.readOnly = me.readOnly;
    	 }
    	 //修改样式
         if (me.container && me.container.$e)
    	 {
    	     me.container.$e.find("#add_file").toggleClass("btnDisable",me.readOnly);
    	     if(me.readOnly){
    	     	me.container.$e.find("div.btnAddDiv").hide();
    	     }else{
    	    	me.container.$e.find("div.btnAddDiv").show();
    	     }
             _downloadBtn(me.readOnly);
             _uploadBtn(me.readOnly);
             _clearBtn(me.readOnly);
    	 }
    }
    
    function isIgnoreGlobalSet(p_attrName)
    {
          if($isArray(me.ignoreGlobalSet))
          {
              return me.ignoreGlobalSet.contains(p_attrName);
          }
          return false;
    }

    
    /**
     * @ignore
     * 清空文件后执行 
     */
    function _onremoveallitems(){
    	if(_$showArea && _$showArea[0]){
    		_$showArea.html("");
    	}
    	_addOrUpdate(true);
    	_uploadBtn(false);
    	_clearBtn(false);
    	_downloadBtn(false);
		_state = "empty";
    }

    /**
     * @ignore
     */
    function _init()
    {
    	var _imgTable = "<div><table align=center cellspacing=0><tr><td align=center>"
		                +"<div align=center><img src='" + me.iconUri + "'/></div>"
		                +"</td></tr></table></div>";
    	
		var _$imgTable = $(_imgTable); 
		_$imgTable.children("table").width(me.width).height(me.height);
		me.$img = _$imgTable.find("img").css({"max-width": me.width - 2, "max-height":me.height - 2});
		me.$e.append(_$imgTable);
		me.$e.addClass("pictureManagerEditor");
    	
    	me.$e.on("click", _openUpload);
    	
    	if (me.type == "path")
        {
        	me.baseUrl = me.baseUrl || mx.mappath("~/../mx/servlets/fileUpload");
        }
        else if (me.type == "form" || me.type == "grid")
        {
        	me.baseUrl = me.baseUrl || mx.mappath("~/../mx/servlets/dataFileUpload");
            if ($isEmpty(me.pkVal) && me.parent)
            {
                if (me.type == "form")
                {
                    // 获取表单数据的主键值。
                    me.pkVal = me.parent.entityContainer.data[me.parent.entityContainer.primaryKey];
                }
                else if (me.type == "grid")
                {
                    // 获取表格数据的主键值。
                	if(me.parent.entityContainer && me.parent.entityContainer.editingItem != null)
                	{
                		me.pkVal = me.parent.entityContainer.editingItem[me.parent.entityContainer.primaryKey];
                	}  
                }
            }
            // 主键值为空，说明目前是新增状态。
            if ($isEmpty(me.pkVal))
            {
                me.off("click");
            }
            else
            {
                me.setPk(me.pkVal);
            }
        }
	}
    
    /**
     * @ignore
     * 更新已经上传文件名称
     */
    function _processValue()
    {
    	var names =  me.getUploadedNames();
        if (me.value != names)
        {
            me.setValue(names, true);
        }
    };
    
    /**
     * 提供一个方法，获取上传控件上传成功的文件名字。多个文件名用 “;” 分隔
     */  
     me.getUploadedNames = function()
     {
    	 if (me.justUpload)
 			return;
     	var _fileList = [];
     	var _fileList = me.vault.getUploadedFiles();
     	var fileNames = "";
         for (var i = 0; i < _fileList.length; i++) {
             fileNames += _fileList[i].attName + ";";
         }
         return fileNames;
     }

    /**
     * @ignore
     * 关闭上传文件窗口
     */
    me._closeWindow = function()
    {
    	if (me._uploadWin)
    	{
    		me._uploadWin.hide();
    	}
    } 
     
    /**
     * @ignore
     * 关闭上传文件窗口
     */
    function _closeUpload()
    {
    	if (me._uploadWin)
    	{
    		me._uploadWin.hide();
    	}
    }
    
    me._uploadWin = null; //打开的窗体
    var _parentWin = null; // 父窗体
    var _$showArea = null; // 图片预览的区域
    var _state = "unupload"; // empty, unupload, uploaded
    
    /**
     * @ignore
     * 打开上传文件窗口
     */
    function _openUpload(e)
    {
    	
    	if (me.getContext() && me.getContext().windowManager)
    	{
    		_parentWin = me.getContext().windowManager.activeWindow;
    		me._uploadWin =  me.getContext().windowManager.create(mx.windows.Window,
	        {
    			title: mx.msg("PICTURE_EDITOR_TITLE"),
	            width: me.windowWidth,
	            height: me.windowHeight,
	            resizable: true,
	            reusable: true,
	            left: "center",
	            top: "center",
	            onhide: _upload_win_hide
	        });
    	}
    	else
    	{
	        me._uploadWin = new mx.windows.WindowManager().create(
	        {
	        	title: mx.msg("PICTURE_EDITOR_TITLE"),
	            width: me.windowWidth,
	            height: me.windowHeight,
	            resizable: true,
	            reusable: true,
	            left: "center",
	            top: "center"
	        });
    	}
    	me._uploadWin.$e.resizable(true,{onResize: _resize});
    	me._uploadWin.$e.addClass("pictureManagerEditorWin");
    	me._uploadWin.on("activate", _activate);
    	me._uploadWin.on("resize",_resize);
        me._uploadWin.$e.on("click", function(e)
        {
            e.stopPropagation();
        });
        
        me._uploadWin.addControl(me.container);
        
        // 替换为预览界面
        _uploadBtn(false);
        
        if(me.fileNames && me.fileNames.indexOf(";") > -1)
        {
        	_addOrUpdate(false);
        	_clearBtn(true);
        	_downloadBtn(true);
			_state = "uploaded";
        }
        else
        {
        	_addOrUpdate(true);
        	_clearBtn(false);
        	_downloadBtn(false);
			_state = "empty";
        }
        
    	var _$preview = me.container.$e.find("#preview_container"); 
    	
    	if (_$preview.length == 0)
    	{
	    	var preview = "<div id='preview_container' class='imgContainer' style='width:"+ (me.windowWidth - 36) +"px;height:"+ (me.windowHeight - 108) +"px;'>"
	    	              +"<table id='_img_table' align=center cellspacing=0 style='width:"+ (me.windowWidth - 36) +"px; height:"+ (me.windowHeight - 108) +"px;'>"
	    	              +"<tr><td align=center>"
	    		          +"<div id='_show_area' style='max-width:"+ (me.windowWidth - 36) +"px; max-height:"+ (me.windowHeight - 108) +"px;overflow:hidden;' align=center ></div>"
	    		          +"</td></tr></table></div>"; 
	    	_$preview = $(preview);
	    	_$showArea = _$preview.find("#_show_area");    	
    	}
    	
    	me.container.$e.prepend(_$preview);
    	// 添加事件
    	var _$btnAdd = me.container.$e.find(".btnAddDiv");
    	_$btnAdd.off("click",_addFile).on("click",_addFile);
    	//打开时预览上传后的图片
        me._uploadWin.showDialog(_processValue); 
        
        if ($notEmpty(me._uploadWin.$mask))
        {
            me._uploadWin.$mask.on("click", function(e)
            {
                e.stopPropagation();
            });
        }
        e.stopPropagation();
    }
    
    function _resize(p_args){
    	setTimeout(function(){
    		var width = me._uploadWin.$e.width() - 36;
        	var height = me._uploadWin.$e.height() - 108;
    		if(width > 0 && height > 0){
    			var widthpx = width + "px";
    			var heightpx = height + "px";
    			var $previewContainer = me._uploadWin.$e.find("#preview_container");
    			var $imgTable = $previewContainer.find("#_img_table");
    			var $imgDiv = $previewContainer.find("div#_show_area");
    			var $img = $previewContainer.find("img")
    			$previewContainer.css({width:widthpx,height:heightpx});
    			$imgTable.css({width:widthpx,height:heightpx});
    			$imgDiv.css({"max-width": widthpx,"max-height":heightpx});
    			$img.css({"max-width": widthpx,"max-height":heightpx});
    		}
    	},500);
    }
    
    /**
     * @ignore
     * 打开上传窗口后
     */
    function _activate()
    {
    	// 显示已经有的文件名
    	var p_value = me.fileNames;
    	if($isString(p_value))
    	{
    		var _names = p_value.split(";");
    		if(_names.length > 1)
    		{
	    		// 最少有一个文件才能预览
    			_$showArea.html("<img style='max-width:" + (me.windowWidth - 38) + "px; max-height:" + (me.windowHeight - 110) +"px'/>");
	    		var _name = _names[_names.length - 2];
	    		_$showArea.children("img").attr("src",_getUri(_name));
    		}
    		else
    		{
    			_$showArea.html("");
    		}
    	}
    }
    
    function _upload_win_hide()
    {
    	if(_parentWin)
		{
			_parentWin.activate();
		}
    }
    
    /**
     * @ignore
     * 添加上传文件按钮处理函数
     * 当点击添加时，执行此函数
     */ 
    function _addFile(e)
    {
    	if(!me.vault.allowExecute())
    	{
    	     return;
    	}
    	if(this.allowTypes != null && this.allowTypes != "" && (","+this.allowTypes).indexOf(this.getFileType(file.value)) == -1)
    	{
			return;
		}
    	if(_state == "uploaded" || _state == "unupload")
    	{
    		if(confirm(mx.msg("CONFIRM_UPDATE_PICTURE")))
    		{
    			me.remove();
    		}
    		else
    		{
    			return false;
    		}
    		e.stopPropagation();
    	}
    	var _$file = $(this).children("input:not(:disabled)");
    	_preview(_$file, _$showArea, {width:me.windowWidth - 38, height:me.windowHeight - 110});
    }
    /**
     * @ignore
     * p_$view 渲染出预览的图片，在 ie 中，p_$view 必须是加载后的 // 412/258
     */
    function _preview(p_$file, p_$view, p_scale)
    {
    	if(typeof FileReader === "function")
    	{
    		p_$file.on("change", function(e){
    			var reader = new FileReader();
    			var image = this.files[0];
    			if(image != null)
    			{	
    				if(_allowUpload(image.name))
    				{
    					p_$view.html("");
	    				p_$view.html("<img style='visibility:hidden'/>");
	    				var _$img = p_$view.find("img");
	    				reader.onload = function (e){
    						_$img.attr({src :e.target.result});
    						setTimeout(function(){//火狐需延迟才能准确获取图片的宽度和高度
	    						if(me._allowRatio(_$img.height(),_$img.width())){
		    						_$img.attr("style","max-width:"+p_scale.width+"px;max-height:"+p_scale.height+"px;");
		    						_addOrUpdate(false);
			    					_uploadBtn(true);
			    					_clearBtn(true);
			    					_state = "unupload";
		    					}else{
		    						_$img.remove();
		    					}
    				    	},500);
	    				}
	    				reader.readAsDataURL(image);
    				}
    			}
    		});
    	}
    	else
    	{
    		if(window.navigator.userAgent.indexOf("MSIE") > -1)
    		{
    			var file = p_$file[0];
    		    file.attachEvent("onchange", function() {
    		        var fileList = me.vault.objToArray(me.vault.fileList)
   		    	    var lastIndex = fileList.length-1;
   		    	    if(lastIndex<0)
   		    	    {
   		    	  	  return;
   		    	    }
   		    	    
	   		    	var $img = $("<div>");
	 				$img.css("filter",me._imgloader(path, "image"));
   		            var path = fileList[lastIndex].path;
   		   
    				if(_allowUpload(path))
    				{
    					if(navigator.userAgent.indexOf("MSIE 9.0")>-1){//ie9需延迟一会才能获取到图片尺寸
    						var temp = document.createElement("div");
    				    	(document.body || document.documentElement).appendChild(temp);
    				    	with(temp.runtimeStyle)
    				    	{
    				    		filter = me._imgloader(path,"image");
    				    		zoom = width = height = 1;
    				    		overflow="scroll";
    				    		position = "absolute";
    				    		right = "9999em";
    				    		top = "-9999em";
    				    		border = 0;
    				    	}
    				    	setTimeout(function(){
    				    		var info = 
    					    	{
    					    		height: temp.offsetHeight,
    					    		width: temp.offsetWidth
    					    	};
    				    		temp.parentNode.removeChild(temp);
    				    		if(me._allowRatio(info.height, info.width)){
    				    			var _sizeInfo = _getSizeInfo(p_scale, info);
        							p_$view.html("");
        							$img.appendTo(p_$view);
        							$img[0].style.filter=me._imgloader(path, "scale");
        							$img.width(_sizeInfo.width).height(_sizeInfo.height);
        							_addOrUpdate(false);
        							_uploadBtn(true);
        							_clearBtn(true);
        							_state = "unupload";
    				    		}
    				    	},500); 
    			    	}else{
    			    		var _size = me._getImgSize(path);
    	   		            var _sizeInfo = _getSizeInfo(p_scale, _size);
	    	   		        if(me._allowRatio(_size.height, _size.width)){
	    	   		        	p_$view.html("");
	    	   		        	$img.appendTo(p_$view);
	    	   		        	$img[0].style.filter=me._imgloader(path, "scale");
	    	   		        	$img.width(_sizeInfo.width).height(_sizeInfo.height);
	    	   		        	_addOrUpdate(false);
	        					_uploadBtn(true);
	        					_clearBtn(true);
	        					_state = "unupload";
	    	   		        }
    			    	}
    				}
    		    });
    		}
    	}
    }

    /**
     * @ignore
     * 获取展示图片的大小
     */ 
    function _getSizeInfo(p_sizeInfo, p_imageSize)
    {
    	var info = {};
    	if(p_sizeInfo.width < p_imageSize.width || p_sizeInfo.height < p_imageSize.height)
    	{
    		var scale = p_sizeInfo.width / p_imageSize.width < p_sizeInfo.height / p_imageSize.height ? p_sizeInfo.width / p_imageSize.width : p_sizeInfo.height / p_imageSize.height;
    		info = {width:p_imageSize.width * scale, height:p_imageSize.height * scale};
    	}
    	else
    	{
    		info = p_imageSize;
    	}
    	if(info.width==1 && info.height==1)
    	{
    		info.width = me.windowWidth - 38;
    		info.height= me.windowHeight - 110;
    	}
    	return info;
    }

    /**
     * @ignore
     * 获取图片的大小 ie 专用
     */
    me._getImgSize=function(p_path)
    {
    	var temp = document.createElement("div");
    	(document.body || document.documentElement).appendChild(temp);
    	with(temp.runtimeStyle)
    	{
    		filter = me._imgloader(p_path,"image");
            zoom = width = height = 1;
    		position = "absolute";
    		right = "9999em";
    		top = "-9999em";
    		border = 0;
    	}
    	var info = 
    	{
    		height: temp.offsetHeight,
    		width: temp.offsetWidth
    	};
    	temp.parentNode.removeChild(temp);
    	return info;
    }
    
    /**
     * @ignore
     * ie 专用
     */
    me._imgloader=function(p_path, p_mode)
    {
    	return "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + p_path + "', sizingMethod='" + p_mode + "')";
    }

    /**
     * @ignore
     * 根据文件名找路径
     */
    function _getUri(p_name)
    {
    	var uri = null;
    	var codedName = p_name.replace(/\+/g,"%2B");
	    var codedPath = me.filePath ? me.filePath.replace(/\+/g,"%2B") : "";
	    var pathParam = codedPath ? ("&filePath=" + codedPath) : "";
	    if (me.type == "path")
	    {
	        uri = encodeURI(encodeURI(me.baseUrl + "?option=download&filePath=" + codedPath + "&fileName=" + codedName + "&uploadMode="
                    + me.uploadMode + "&rnd=" + mx.random()));
	    }
	    else if (me.type == "form" || me.type == "grid")
	    {
	        uri = encodeURI(encodeURI(me.baseUrl + "?option=download&tableName=" + me.tableName + "&pkVal=" 
	        		+ me.pkVal + "&colName=" + me.colName + "&fileName=" + codedName + "&uploadMode="
	                + me.uploadMode + pathParam  + "&rnd=" + mx.random()));   
	    }
	    return uri;
    }
    
    /**
     * @ignore
     * 添加|修改 按钮
     */
    function _addOrUpdate(p_add)
    {
    	var _$btn = me.container.$e.find("#add_file");
    	if(!_$btn[0])
    	{
    		return;
    	} 
    	var _html = _$btn.html();
    	if(p_add)
    	{
    		_html = _html.replace(mx.msg("UPLOAD_BTN_UPDATE"), mx.msg("UPLOAD_BTN_ADD"))
    	}
    	else
    	{
    		_html = _html.replace(mx.msg("UPLOAD_BTN_ADD"), mx.msg("UPLOAD_BTN_UPDATE"))
    	}
    	_$btn.html(_html);
    }
    
    /**
     *@ignore
     *下载按钮
     */
    function _downloadBtn(p_enabled){
    	var _$btn = me.container.$e.find("#_download_file");
    	_$btn.toggleClass("btnDisable", !p_enabled);
    }
    
    /**
     *@ignore
     * 上传按钮 
     */
    function _uploadBtn(p_enabled)
    {
    	var _$btn = me.container.$e.find("#_upload_file");
    	_$btn.toggleClass("btnDisable", !p_enabled);
    }
    
    /**
     * @ignore
     * 清空按钮
     */
    function _clearBtn(p_enabled)
    {
    	var _$btn = me.container.$e.find("#_clear_file");
    	if(me.readOnly){
    		_$btn.toggleClass("btnDisable", p_enabled);
    	}else{
    		if(me.enabled){
    			_$btn.toggleClass("btnDisable", !p_enabled);
    		}else{
    			_$btn.toggleClass("btnDisable", p_enabled);
    		}
    		
    	}
    	
    }
    
    /**
     *@ignore
     * 上传完成
     */
    function _itemuploaded()
    {
    	if(_$showArea)
    	{
    		_$showArea.setBusy(false);
    	}
    	_uploadBtn(false);
    	_downloadBtn(true);
		_state = "uploaded";
    }
    
    /**
     *@ignore
     * 上传开始
     */
    function _itemuploading()
    {
    	if(_$showArea)
    	{
    		_$showArea.setBusy();
    	}
    }
    
    /**
     * @ignore
     * 文件是否符合格式
     */ 
    function _allowUpload(p_name)
    {
    	if($isEmpty(p_name))
    	{
    		return false;
    	}
    	var arr = p_name.split(".")
		var _fileType = arr[arr.length - 1];
		return ((","+me.allowTypes).indexOf(_fileType) > -1 && ("," + me.limitTypes).indexOf(_fileType) == -1);
    }
    
    /**
     * @ignore
     * 文件是否符合分辨率
     */ 
    me._allowRatio=function(p_height,p_width)
    {
    	if((me.maxImageHeight>0&&p_height>me.maxImageHeight)||(me.maxImageWidth>0&&p_width>me.maxImageWidth)){
    		mx.indicate("warn",mx.msg("IMAGE_RATIO_ALLOWED",[me.maxImageWidth,me.maxImageHeight]));
    		return false;
    	}
    	return true;
    }
    
    me.endOfClass(arguments);
    return me;
};



//*****************************


var dhtmlXVaultObjectTwin = function() {
	var nav = navigator.appName;
	this.IE = nav.indexOf("Explorer") > -1;
	this.Opera = nav.indexOf("Opera") > -1;
	this.isUploadFile = false;
	this.isUploadFileAll = false;
	this.counter = 1;
	this.idRowSelected = null;
	this.sessionId = null;
	this.baseUrl = null;
	this.imPath = "imgs/";
	this.filePath = "";
	this.tableName = "";
	this.primaryKey = "";
    this.pkVal = "";
    this.colName = "";
    this.uploadMode = "";
    this.limitTypes = "";
    this.allowTypes = null;
    this.isVirtual = false;
    this.readOnly = false;
    this.enabled = true;
	this.strings = {
		preview : mx.msg("UPLOAD_PREVIEW"),
		remove : mx.msg("UPLOAD_REMOVE"),
		upload : mx.msg("UPLOAD"),
		done : mx.msg("UPLOAD_COMPLETE"),
		undone : mx.msg("UPLOAD_UNSTART"),
		error : mx.msg("UPLOAD_ERROR"),
		btnAdd : mx.msg("UPLOAD_BTN_ADD"),
		btnUpload : mx.msg("UPLOAD_BTN_UPLOAD"),
		btnClean : mx.msg("UPLOAD_BTN_CLEAN"),
		btnClose : mx.msg("UPLOAD_BTN_CLOSE"),
		btnDownload : mx.msg("DOWNLOAD")
	};
	this.strings.errors = {
		"TooBig" : mx.msg("UPLOAD_SIZE_LIMIT"),
		"LimitTypes" : mx.msg("FILE_TYPE_LIMITED"),
		"AllowTypes" : mx.msg("FILE_TYPE_ALLOWED"),
		"PostSize" : "Undefined server error. Possible issues:\n- Unicode file name incorrectly processed by the server;\n- File size is bigger than server's post-request limit ({0})."
	};
	this.filesLimit = 0;
	this.fileList = {};
	this.uploadedCount = 0;
	this.progressDemo = null;
	this.inpMAX_FILE_SIZE = null;
	this.MAX_FILE_SIZE = 900 * 1024 * 1024;
	this.inpUPLOAD_IDENTIFIER = null;
	// 记录已经上传的文件名称，分号分隔。
	this.owner = null;
};
dhtmlXVaultObjectTwin.prototype.setBaseUrl = function(p_url) {
    this.baseUrl = p_url;
};
dhtmlXVaultObjectTwin.prototype.setImagePath = function(newPath) {
	this.imPath = newPath;
	this.preLoadImages();
};
dhtmlXVaultObjectTwin.prototype.create = function(uploadEditor) {
    this.owner = uploadEditor;
    this.type = uploadEditor.type;
    this.setFilesLimit(uploadEditor.filesLimit);
    this.limitTypes = uploadEditor.limitTypes;
    this.allowTypes = uploadEditor.allowTypes;
    this.MAX_FILE_SIZE = uploadEditor.maxFileSize * 1024;
    this.maxImageHeight = uploadEditor.maxImageHeight;
    this.maxImageWidth = uploadEditor.maxImageWidth;
    this.filePath = uploadEditor.filePath;
    this.isVirtual = uploadEditor.isVirtual;
    this.readOnly = uploadEditor.readOnly;
    this.enabled = uploadEditor.enabled;
    if(this.type != "path"){
        this.tableName = uploadEditor.tableName;
        this.primaryKey = uploadEditor.primaryKey;
        this.pkVal = uploadEditor.pkVal;
        this.colName = uploadEditor.colName;
    }
    this.uploadMode = uploadEditor.uploadMode;
    
    var p_listHeight = uploadEditor.height - 32;
    this.parentObject = (uploadEditor.container.$e[0]) || uploadEditor.$e[0];
	this.parentObject.style.position = "relative";
	try {
		this.parentObject
				.appendChild("<iframe src='about:blank' id='dhtmlxVaultUploadFrame' name='dhtmlxVaultUploadFrame' style='display:none;position:absolute;left:-1000px;width:1px;height:1px'></iframe>");
	} catch (e) {
	}
	this.containerDiv = document.createElement("div");
	// dhxvlt_panel2border;
	this.containerDiv.style.cssText = "position:absolute;z-index:-1;border:none";
	this.parentObject.appendChild(this.containerDiv);
	this.container = document.createElement("div");
	this.container.style.position = "absolute";
	this.container.style.width = "100%";
	this.container.style.height = "45px";
	this.container.style.bottom = "5px";
	
	var clearPadding = "7px";
	var closeBtnHTML = "";
	if (uploadEditor.context){
		/* 关闭*/
		clearPadding = 0;
		var closeBtnHTML = "<td style='width:78px;height:32px;padding-right: 7px;' align='right'>"
		+ "<div class='dhxvlt_rbtn'><span class='dhxvlt_rbtn3'></span><span class='dhxvlt_rbtn2'><nobr><img src='"
		+ this.imPath
		+ "close.png' style='width:10px;height:10px;margin-top: 6px;'/>"
		+ this.strings.btnClose
		+ "</nobr></span><span class='dhxvlt_rbtn1'></span></div></td>";
	}
	this.container.innerHTML = "<table border='0' style='width:100%;height:32px'>"
			+ "<tr><td style='width:416px' colspan='3' align='center' id='cellContainer'>"
			+ "<div style='width:100%;height:1px'></div>"
			+ "</td></tr>"
			+ "<tr id='_btns'><td style='width:138px;height:32px;padding-left: 10px' align='left'>"
			+

			"<div class='dhxvlt_lbtn'><span class='dhxvlt_lbtn1'></span><span class='dhxvlt_lbtn2' ><nobr id='add_file'><img src='"
			+ this.imPath
			+ "add.gif'/> "
			+ this.strings.btnAdd
			+ "</nobr></span><span class='dhxvlt_lbtn3'></span></div>"
			+ "<div class='btnAddDiv'>"
			+ "<input type='file' id='file' name='file' value='' class='dhxvlt_hidden "
			+ (this.Opera ? "dhxvlt_fo" : "")
			+ "'/></div>"
			+ "</td>"
			+ "<td style='width:138px;height:32px' align='left'>"
			+ "<div class='dhxvlt_lbtn'><span class='dhxvlt_lbtn1'></span><span class='dhxvlt_lbtn2' id='_upload_file'><nobr><img src='"
			+ this.imPath
			+ "upload.gif'/> "
			+ this.strings.btnUpload
			+ "</nobr></span><span class='dhxvlt_lbtn3'></span></div></td>"
			/*下载*/
			+ "<td style='width:138px;height:32px' align='left'>"
			+ "<div class='dhxvlt_lbtn'><span class='dhxvlt_lbtn1'></span><span class='dhxvlt_lbtn2' id='_download_file'><nobr><img src='"
			+ this.imPath
			+ "upload.gif'/> "
			+ this.strings.btnDownload
			+ "</nobr></span><span class='dhxvlt_lbtn3'></span></div></td>"
			/* 清空*/
			+ "<td style='width:138px;height:32px;padding-right: " + clearPadding + ";' align='right'>"
			+ "<div class='dhxvlt_rbtn'><span class='dhxvlt_rbtn3'></span><span class='dhxvlt_rbtn2' id='_clear_file'><nobr><img src='"
			+ this.imPath
			+ "clean.gif'/>"
			+ this.strings.btnClean
			+ "</nobr></span><span class='dhxvlt_rbtn1' id='_close_btn'></span></div></td>"
			/* 关闭*/
			+ closeBtnHTML
			+ "</tr></table>";
	if (this.owner.justUpload){
		$(this.container).find("#_download_file").parent().html("<span>宽度:</span><input id ='pictureWidth'type='text' style='width:30px'><span>px<span>");
    	//$(this.container).find("#_download_file").parent().css("display","none");
		$(this.container).find("#_clear_file").parent().html("<span>高度:</span><input id ='pictureHeight'type='text' style='width:30px'><span>px<span>");
    	//$(this.container).find("#_clear_file").parent().css("display","none");
    }
	this.parentObject.appendChild(this.container);
	var self = this;
	//上传
	this.container.childNodes[0].rows[1].cells[1].childNodes[0].onclick = function() {
		   self.proxyInvoke(self.allowExecute,self.uploadAllItems);
	};
	//清空
	this.container.childNodes[0].rows[1].cells[3].childNodes[0].onclick = function() {
		if (self.owner.justUpload)
			return;
		   self.proxyInvoke(self.allowExecute,self.removeAllItems);
	};
	//下载
	this.container.childNodes[0].rows[1].cells[2].childNodes[0].onclick = function() {
		if (self.owner.justUpload)
			return;
		self.proxyInvoke(self.allowDownload,function(){
			 var _fileList = self.getUploadedFiles();
			 if(_fileList.length > 0){
				self.downLoad(_fileList[0].attName);
			 }	
		 });		
	}
	if (uploadEditor.context){
		this.container.childNodes[0].rows[1].cells[4].childNodes[0].onclick = function() {
			self.close()
		}
	};
	
	this.fileContainer = this.container.childNodes[0].rows[1].cells[0].childNodes[1];
	
	// 由于 IE9 中访问  document.selection.createRange() 会“拒绝访问”，采用辅助手段规避。
	var fileSelectionHiddenArea = document.getElementById("_fileSelectionHiddenArea");
	if (fileSelectionHiddenArea == null)
	{
		var hiddenArea = document.createElement("div");
		$(hiddenArea).attr("id","_fileSelectionHiddenArea");
		$(hiddenArea).css({"width":"1px","height":"1px"});
		fileSelectionHiddenArea = hiddenArea;
		this.fileContainer.appendChild(hiddenArea);
	}
	
	this.currentFile = this.fileContainer.childNodes[0];
	this.currentFile.onchange = function() {
        if (window.navigator.userAgent.indexOf("MSIE") > -1){ 
        	this.select(); 

			document.getElementById("_fileSelectionHiddenArea").focus();
            var fullPath = document.selection.createRange().text; 
        } 
        if(this.value.length>0){
        	self.addFile(fullPath, true)
        }
	};
	if (this.IE && $.browser.version == "8.0") {
		this.uploadForm = document
				.createElement("<form enctype='multipart/form-data' target='dhtmlxVaultUploadFrame' method='post'>")
	} else {
		this.uploadForm = document.createElement("form");
		this.uploadForm.method = "post";
		this.uploadForm.encoding = "multipart/form-data";
		this.uploadForm.target = "dhtmlxVaultUploadFrame"
	};
	this.container.appendChild(this.uploadForm);
	this.inpMAX_FILE_SIZE = document.createElement("input");
	this.inpMAX_FILE_SIZE.type = "hidden";
	this.inpMAX_FILE_SIZE.name = "xMAX_FILE_SIZE";
	this.inpMAX_FILE_SIZE.value = this.MAX_FILE_SIZE;
	this.uploadForm.appendChild(this.inpMAX_FILE_SIZE);
	this.inpUPLOAD_IDENTIFIER = document.createElement("input");
	this.inpUPLOAD_IDENTIFIER.type = "hidden";
	this.inpUPLOAD_IDENTIFIER.name = "UPLOAD_IDENTIFIER";
	this.uploadForm.appendChild(this.inpUPLOAD_IDENTIFIER);
	this.tblListFiles = null;
	// 获取已经上传的文件信息。
	var _fileList = this.getUploadedFiles();
	if (this.owner.justUpload)
		return;
    //设置文件名，供数据组件显示。
    this.owner.fileNames = "";
    for (var i = 0; i < _fileList.length; i++) {
        self.addFile(_fileList[i].attName);
        this.owner.fileNames = this.owner.fileNames + _fileList[i].attName + ";";
    }
};
dhtmlXVaultObjectTwin.prototype.createXMLHttpRequest = function() {
	var xmlHttp = null;
	if (window.ActiveXObject) {
		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP")
	} else if (window.XMLHttpRequest) {
		xmlHttp = new XMLHttpRequest()
	};
	return xmlHttp
};
dhtmlXVaultObjectTwin.prototype.getFileName = function(path) {
	var arr = path.split("\\");
	path = arr[arr.length - 1];
	arr = path.split("/");
	return arr[arr.length - 1]
};

dhtmlXVaultObjectTwin.prototype.getFileType = function(path) {
    var arr = path.split(".");
    return arr[arr.length - 1]
};



dhtmlXVaultObjectTwin.prototype.downLoad = function(fileName, p_id) {
    if($isEmpty(p_id) || document.getElementById("rowListFiles" + p_id).attributes["isUpload"].value == "true"){
        var codedName = fileName.replace(/\+/g,"%2B");
        var codedPath = this.filePath ? this.filePath.replace(/\+/g,"%2B") : "";
        var pathParam = codedPath ? ("&filePath=" + codedPath) : "";
        if(this.type == "path"){
            window.open(encodeURI(encodeURI(this.baseUrl + "?option=download&filePath=" + codedPath + "&fileName=" + codedName + "&uploadMode="
                    + this.uploadMode + "&isVirtual=" + this.isVirtual + "&rnd=" + mx.random())));   
        }else if(this.type == "form" || this.type == "grid"){
            window.open(encodeURI(encodeURI(this.baseUrl + "?option=download&tableName=" + this.tableName + "&pkVal=" + this.pkVal 
            		+ "&colName=" + this.colName + "&fileName=" + codedName + "&uploadMode="
                    + this.uploadMode + "&isVirtual="+this.isVirtual + pathParam + "&rnd=" + mx.random())));   
        }
    }
};

dhtmlXVaultObjectTwin.prototype.enableAddButton = function(enabled) {
	this.currentFile.disabled = !enabled;
	var btn = this.currentFile.parentNode.previousSibling.childNodes[1].childNodes[0].childNodes[0];
	btn.src = this.imPath + (enabled ? "add.gif" : "add_d.gif");
	btn.parentNode.className = enabled ? "" : "dhxvlt_dis"
};
dhtmlXVaultObjectTwin.prototype.checkFilesLimit = function() {
	if (this.filesLimit > 0) {
		var n = this.getTotalFilesCount();
		this.enableAddButton(n < this.filesLimit)
	}
};
dhtmlXVaultObjectTwin.prototype.addFile = function(p_fileName, p_userOper) {
	var self = this;
	if(!self.allowExecute())
	{
	    return;
	}
	// 参数有值是添加已有文件的情况。
	var fileName = p_fileName;
	if (p_userOper) {
		// 手动选择新文件的情况。
		var file = this.currentFile;
		if((this.allowTypes != null && this.allowTypes != "" && (","+this.allowTypes).indexOf(this.getFileType(file.value)) == -1) || file.value == ""){
			// pete_geng 允许访问的类型
			mx.indicate("warn",mx.msg("ERR_FILE_TYPE_LIMITED")+mx.msg("FILE_TYPE_ALLOWED",[this.allowTypes]));
			file.value="";
			return;
		}
		if((","+this.limitTypes).indexOf(this.getFileType(file.value)) >= 0){
		    mx.indicate("warn",mx.msg("ERR_FILE_TYPE_LIMITED")+mx.msg("FILE_TYPE_LIMITED",[this.limitTypes]));
		    file.value="";
		    return;
		}
		if(typeof FileReader === "function"){
			var _imgwidth=0,_imgheight=0;
			var img=file.files[0];
			
			var reader = new FileReader();
			$(self.fileContainer).append("<img id='__hiddenImage' />");
			var _$img = $(self.fileContainer).find("#__hiddenImage");
			reader.onload = function (e){
				_$img.attr({src :e.target.result});
				setTimeout(function(){
					_imgheight=_$img.height();
					_imgwidth=_$img.width();
					_$img.remove();
					if(self.owner._allowRatio(_imgheight,_imgwidth)){
						self.doAddFile(p_fileName,p_userOper);
		    		}else{
		    			self.appendInputFile();
		    			file.disabled = true;
		    			file.style.display = "none";
		    			return;
		    		}
		    	},200); 
			}
			reader.readAsDataURL(img);
    	}else if(window.navigator.userAgent.indexOf("MSIE") > -1){
    		var _size = this.owner._getImgSize(fileName);
    		if(this.owner._allowRatio(_size.height,_size.width)){
    			this.doAddFile(fileName,p_userOper);
    		}else{
    			this.appendInputFile();
    			file.disabled = true;
    			file.style.display = "none";
    			return;
    		}
    	}
	}

	this.checkFilesLimit();
};

//为了方便在FileReader的onload后执行
dhtmlXVaultObjectTwin.prototype.doAddFile = function(p_fileName, p_userOper) {
	var self = this;
	if(!self.allowExecute())
	{
	    return;
	}
	var currentId = this.createId();
	// 参数有值是添加已有文件的情况。
	var fileName = p_fileName;
	if (p_userOper) {
		// 手动选择新文件的情况。
		var file = this.currentFile;
		
		
		file.id = "file" + currentId;
		file.name = file.id;
		try {
			if (file.value == "")
				return;
			if (!this.onAddFile(file.value)) {
				file.value = "";
				return
			}
		} catch (e) {
		};

		this.fileList[currentId] = {
			id : currentId,
			name : file.value,
			path : p_fileName,
			uploaded : false,
			error : false
		};
		file.disabled = true;
		file.style.display = "none";
		this.uploadForm.appendChild(file);
		
		this.appendInputFile();
		
		// 由于 IE9 中访问  document.selection.createRange() 会“拒绝访问”，采用辅助手段规避。
		var fileSelectionHiddenArea = document.getElementById("_fileSelectionHiddenArea");
		if (fileSelectionHiddenArea == null)
		{
			var hiddenArea = document.createElement("div");
			$(hiddenArea).attr("id","_fileSelectionHiddenArea");
			$(hiddenArea).css({"width":"1px","height":"1px"});
			fileSelectionHiddenArea = hiddenArea;
			this.fileContainer.appendChild(hiddenArea);
		}
		fileName = this.getFileName(file.value);
	}

	this.checkFilesLimit();
};

dhtmlXVaultObjectTwin.prototype.appendInputFile = function() {
	var self = this;
	var newInputFile = document.createElement("input");
	newInputFile.type = "file";
	newInputFile.className = "dhxvlt_hidden"
			+ (this.Opera ? " dhxvlt_fo" : "");
	newInputFile.id = "file";
	newInputFile.name = newInputFile.id;
	this.currentFile = newInputFile;

	newInputFile.onchange = function() {
        if (window.navigator.userAgent.indexOf("MSIE") > -1){ 
        	newInputFile.select(); 
        	
			document.getElementById("_fileSelectionHiddenArea").focus();
            var fullPath = document.selection.createRange().text; 
        } 
		return self.addFile(fullPath, true);
	};
	this.fileContainer.appendChild(newInputFile);
};

dhtmlXVaultObjectTwin.prototype.getFileExtension = function(fileName) {
	var ext = "", arr = fileName.split(".");
	if (arr.length > 1)
		ext = arr[arr.length - 1].toLowerCase();
	return ext
};
dhtmlXVaultObjectTwin.prototype.getImgFile = function(fileName) {
	var srcImgPic = this.imPath + "ico_image.png";
	var srcImgVideo = this.imPath + "ico_video.png";
	var srcImgSound = this.imPath + "ico_sound.png";
	var srcImgArchives = this.imPath + "ico_zip.png";
	var srcImgFile = this.imPath + "ico_file.png";
	var valueImgPic = "jpg,jpeg,gif,png,bmp,tiff";
	var valueImgVideo = "avi,mpg,mpeg,rm,move";
	var valueImgSound = "wav,mp3,ogg";
	var valueImgArchives = "zip,rar,tar,tgz,arj";
	var ext = this.getFileExtension(fileName);
	if (ext == "")
		return srcImgFile;
	if (valueImgPic.indexOf(ext) != -1) {
		return srcImgPic
	};
	if (valueImgVideo.indexOf(ext) != -1) {
		return srcImgVideo
	};
	if (valueImgSound.indexOf(ext) != -1) {
		return srcImgSound
	};
	if (valueImgArchives.indexOf(ext) != -1) {
		return srcImgArchives
	};
	return srcImgFile
};
dhtmlXVaultObjectTwin.prototype.createId = function() {
	return this.counter++
};


dhtmlXVaultObjectTwin.prototype.close = function() {
	// 关闭前判断 pete_geng
	var hasUnUploaded = false;
	
	var fileArr = this.objToArray(this.fileList);
	if($isArray(fileArr))
	{
		for(var i=0;i<fileArr.length;i++)
		{
			var file = fileArr[i];
			if(file.uploaded === false)
			{
				hasUnUploaded = true;
				break;
			}
		}
	}
		
	// 执行外部传来的关闭方法
	if (!hasUnUploaded || (hasUnUploaded && confirm(mx.msg("CONFIRM_CLOSE")))) {
		if (this.owner && $.isFunction(this.owner._closeWindow)){
			this.owner._closeWindow();
		}
	}
};
dhtmlXVaultObjectTwin.prototype.removeAllItems = function(isConfirm) {
	if (!this.isUploadFile) {
		isConfirm = (isConfirm == undefined) ? true : isConfirm;
		if(isConfirm === true && !confirm(mx.msg("CONFIRM_DELETE_ALL"))){
			return;
		}
		if (this.owner.justUpload)
			return;
	    // 删除磁盘文件。
	    var xmlHttp = this.createXMLHttpRequest();
	    xmlHttp.open("POST", this.baseUrl, false);
	    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
	    var codedPath = this.filePath ? this.filePath.replace(/\+/g,"%2B") : "";
	    var pathParam = codedPath ? ("&filePath=" + codedPath) : "";
	    if(this.type == "path"){
            xmlHttp.send("option=deleteAll&filePath=" + codedPath + "&uploadMode="
                    + this.uploadMode + "&isVirtual=" + this.isVirtual + "&rnd=" + mx.random());
        }else if(this.type == "form" || this.type == "grid"){
            xmlHttp.send("option=deleteAll&tableName=" + this.tableName + "&primaryKey="
                    + this.primaryKey + "&pkVal=" + this.pkVal + "&colName=" + this.colName + "&uploadMode="
                    + this.uploadMode + "&isVirtual="+this.isVirtual+ pathParam + "&rnd=" + mx.random());
        }
	    
	    if (xmlHttp.status == 200) {
	        if ($notEmpty(xmlHttp.responseText)) {
	            this.fileList = {};
	            this.owner.fileNames = "";
	            this.onRemoveAllItems();
	        }
	    } else {
	        throw "error";
	    }
	};
	this.checkFilesLimit();
};
dhtmlXVaultObjectTwin.prototype.uploadAllItems = function() {
	var flag = -1;
	
	var fileArr = this.objToArray(this.fileList);
	
	if($isArray(fileArr) && fileArr.length >0)
	{
		for (var i = 0; i < fileArr.length; i++) {
			if (fileArr[i].uploaded === false) {
				flag = i;
				if (this.owner && this.owner.parent && this.owner.parent.setBusy){
					this.owner.parent.setBusy();
				}
				break;
			}
		};
		if (flag != -1) {
			this.isUploadFileAll = true;
			var fileItemId = fileArr[i].id;
			this.uploadFile(fileItemId)
		} else {
			if (this.isUploadFileAll)
				try {
					this.onUploadComplete(this.objToArray(this.fileList))
				} catch (e) {
				};
			this.fileList = {};
			this.isUploadFileAll = false;
			if (this.owner && this.owner.parent && this.owner.parent.setBusy){
				this.owner.parent.setBusy(false);
			}
		}
		
	}
};
dhtmlXVaultObjectTwin.prototype.objToArray = function(obj) {
	var res = new Array();
	for (var key in obj) {
		res[res.length] = obj[key]
	};
	return res
};


dhtmlXVaultObjectTwin.prototype.endLoading = function(id, isError) {
	this.isUploadFile = false;
	var f = this.fileList[id];
	if (f) {
		f.error = isError;
		f.uploaded = !isError
	};
	try {
		this.onFileUploaded(f)
	} catch (e) {
	};
	if (isError)
		try {
			this.onUploadComplete(this.objToArray(this.fileList))
		} catch (e) {
		};
	var c = this.getCurrentInputFile(id);
	if (c)
		c.parentNode.removeChild(c)
};
dhtmlXVaultObjectTwin.prototype.startRequest = function(id) {
	var xmlHttp = this.createXMLHttpRequest();
	xmlHttp.open("POST", this.baseUrl, false);
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
	xmlHttp.send("option=startUpload&id=" + id + "&rnd=" + mx.random());
	if (xmlHttp.status == 200) {
		if (!xmlHttp.responseText) {
			throw "error";
		}
		this.sessionId = xmlHttp.responseText;
		this.inpUPLOAD_IDENTIFIER.value = this.sessionId
	} else {
		throw "error"
	}
};
dhtmlXVaultObjectTwin.prototype.sendIdSession = function(id) {
	try {
		var xmlHttp = this.createXMLHttpRequest();
		xmlHttp.open("post", this.baseUrl, false);
		xmlHttp.setRequestHeader("Content-Type",
				"application/x-www-form-urlencoded;charset=UTF-8");
		xmlHttp.send("option=getProgress&sessionId=" + this.sessionId + "&rnd=" + mx.random());
		if (xmlHttp.status == 200) {
			var res = xmlHttp.responseText;
			if (res) {
				var err = res.split(":");
				if (err[0] == -2) {
					var f = document
							.getElementById("dhtmlxVaultUploadFrame");
					if (f)
						f.src = "about:blank";
					alert(this.printf(this.strings.errors["TooBig"],
							err[2], err[3]));
					throw "error";
				}else if (err[0] == -3) {
					alert(this.printf(this.strings.errors["LimitTypes"],
							err[1]));
					throw "error";
				}else if (err[0] == -4) {
					alert(this.printf(this.strings.errors["AllowTypes"],
							err[1]));
					throw "error";
				}else if (err[0] == -5) {
					alert(this.printf(this.strings.errors["TooBig"],
							err[1]));
					throw "error";
				};
					
				res = parseInt(res, 10);
				if (isNaN(res)) {
					throw "error"
				};
				if (res != -1) {
					var self = this;
					try {
						window.setTimeout(function() {
									id = id.toString().replace(/javascript:/gi, '');
									self.sendIdSession(id)
								}, 500)
					} catch (e) {
					}
				} else if (res == -1) {
					this.uploadedCount++;
					this.endLoading(id, false);
					this.showMessageInfo(id, this.strings.done);
					if (this.isUploadFileAll) {
						this.uploadAllItems()
					}
				}
			}
		} else {
			throw "error"
		}
	} catch (e) {
		this.endLoading(id, true);
		this.isUploadFileAll = false;
		this.isUploadFile = false;
		this.showMessageInfo(id, this.strings.error)
	}
};
dhtmlXVaultObjectTwin.prototype.printf = function() {
	var n = arguments.length;
	var str = arguments[0];
	for (var i = 1; i < n; i++) {
		var pattern = "\\{" + (i - 1) + "\\}";
		var re = new RegExp(pattern, "g");
		str = str.replace(re, arguments[i])
	};
	return str;
};
dhtmlXVaultObjectTwin.prototype.showMessageInfo = function(id, msg) {
	mx.indicate("info", msg);
};


dhtmlXVaultObjectTwin.prototype.getFilesCount = function() {
	return this.objToArray(this.fileList).length;
};
dhtmlXVaultObjectTwin.prototype.getTotalFilesCount = function() {
	var count = 0;
	var fileArr = this.objToArray(this.fileList);
	if ($isArray(fileArr)) {
		count = fileArr.length;
	};
	return count
};


dhtmlXVaultObjectTwin.prototype.getFormField = function(type, name) {
	var fields = this.uploadForm.getElementsByTagName("input");
	for (var i = 0; i < fields.length; i++) {
		var f = fields[i];
		if (f.type.toLowerCase() == type && f.name == name) {
			return f
		}
	};
	return null
};
dhtmlXVaultObjectTwin.prototype.getCurrentInputFile = function(id) {
	return this.getFormField("file", "file" + id)
};
dhtmlXVaultObjectTwin.prototype.uploadFile = function(id) {
	if (!this.isUploadFile) {
		
		this.isUploadFile = true;
		var file = this.getCurrentInputFile(id);
		if(file!=null){
			file.disabled = false;
		}else{
			return;
		}
		try {
			this.startRequest(id);
			this.sendIdSession(id)
		} catch (e) {
			this.endLoading(id, true);
			this.isUploadFileAll = false;
			this.isUploadFile = false;
			return
		};
		if (!this.isUploadFile)
			return;
		
		// 上传时 上传 uds 参数时使用setUdsParam
		var udsParam = "";
		var item = {setUdsParam:function(p_params){
			item.udsParam = JSON.stringify(p_params);
		}};
		this.onitemuploading(item);
		if(this.type == "path"){
            this.uploadForm.action = encodeURI(this.baseUrl + "?option=upload&maxFileSize="+this.MAX_FILE_SIZE+"&sessionId="
                + this.sessionId + "&fileName="
                + this.getFileName(this.getCurrentInputFile(id).value)
                + "&userfile=" + this.getCurrentInputFile(id).id + "&filePath="
                + this.filePath + "&uploadMode=" + this.uploadMode + "&isVirtual=" + this.isVirtual + "&rnd=" + mx.random());
            this.owner.lastestUploadedFileName = this.getFileName(this.getCurrentInputFile(id).value);
        }else if(this.type == "form" || this.type == "grid"){
            this.uploadForm.action = encodeURI(this.baseUrl + "?option=upload&maxFileSize="+this.MAX_FILE_SIZE+"&sessionId="
                + this.sessionId + "&tableName="
                + this.tableName + "&primaryKey="
                + this.primaryKey + "&pkVal="
                + this.pkVal + "&colName="
                + this.colName 
                + (this.filePath ? ("&filePath="+ this.filePath) : "")
                + "&uploadMode="
                + this.uploadMode + "&udsParam="
                + udsParam
                +"&isVirtual="+this.isVirtual + "&rnd=" + mx.random());
        }
		this.onitemuploaded();
		var IframeObj = document.createElement("iframe");
		IframeObj.id = "myfrm";
		IframeObj.width = 0;
		IframeObj.height = 0;
		IframeObj.frameborder = 0;
		IframeObj.src = "about:blank";
		IframeObj.name = "myfrm";
		document.body.appendChild(IframeObj);
		window.frames.myfrm.name = "myfrm";

		this.uploadForm.target = "myfrm";

		this.uploadForm.submit();
	}
};
dhtmlXVaultObjectTwin.prototype.preLoadImages = function() {
	var imSrcAr = new Array("add.gif", "add_d.gif", "btn1.gif", "btn2.gif",
			"btn3.gif", "clean.gif", "upload.gif", "delete.gif",
			"ico_file.png", "ico_image.png", "ico_sound.png", "ico_video.png",
			"ico_zip.png", "pb_back.gif", "pb_demoupload.gif", "pb_empty.gif",
			"rowsel.gif");
	var imAr = new Array(imSrcAr.length);
	for (var i = 0; i < imSrcAr.length; i++) {
		imAr[i] = new Image();
		imAr[i].src = this.imPath + imSrcAr[i]
	}
};
dhtmlXVaultObjectTwin.prototype.setFilesLimit = function(limit) {
	var n = parseInt(limit);
	if (!isNaN(n) && n >= 0)
		this.filesLimit = n
};
dhtmlXVaultObjectTwin.prototype.setFormField = function(name, value) {
	if (!this.uploadForm) {
		alert("Please call setFormField() method after create()!");
		return
	};
	var field = this.getFormField("hidden", name);
	if (value === null) {
		if (field)
			this.uploadForm.removeChild(field)
	} else {
		if (!field) {
			field = document.createElement("input");
			field.type = "hidden";
			field.name = name;
			this.uploadForm.appendChild(field)
		};
		field.value = value
	}
};
dhtmlXVaultObjectTwin.prototype.onAddFile = function(fileName) {
	return true
};
dhtmlXVaultObjectTwin.prototype.onUploadComplete = function(files) {
	this.fileUploaded();
    for(var i = 0; i < files.length; i++){
        this.owner.appendFile(this.getFileName(files[i].name));
    }
};
dhtmlXVaultObjectTwin.prototype.onFileUploaded = function(file) {
	file.uploaded = true;
};

dhtmlXVaultObjectTwin.prototype.onRemoveAllItems = function() {
	
};

dhtmlXVaultObjectTwin.prototype.onitemuploading = function(item) {
	
};

dhtmlXVaultObjectTwin.prototype.onitemuploaded = function() {
};

dhtmlXVaultObjectTwin.prototype.fileUploaded = function() {
};


// 返回 fileList [{attName:"", attSize:num}{}]
dhtmlXVaultObjectTwin.prototype.getUploadedFiles = function() {
	// 获取已经上传的文件信息。
	var fileList = [];
	if (this.owner.justUpload)
		return;
	var xmlHttp = this.createXMLHttpRequest();
	xmlHttp.open("POST", this.baseUrl, false);
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
    var codedPath = this.filePath ? this.filePath.replace(/\+/g,"%2B") : "";
    var pathParam = codedPath ? ("&filePath=" + codedPath) : "";
	if(this.type == "path"){
	    xmlHttp.send("option=getFile&filePath=" + codedPath + "&uploadMode=" + this.uploadMode + "&rnd=" + mx.random());
    }else if(this.type == "form" || this.type == "grid"){
        xmlHttp.send("option=getFile&tableName=" + this.tableName + "&pkVal=" + this.pkVal + "&colName=" + this.colName + "&uploadMode="
                + this.uploadMode + pathParam + "&rnd=" + mx.random());
    }
	
	if (xmlHttp.status == 200) {
		if ($notEmpty(xmlHttp.responseText)) {
            //获取已经上传的文件列表。
			try{
				var strCross = ["SCRIPT","<",">","\\","'","&","#","%","+"];
		        for(var i = 0;i<strCross.length;i++){
		        	if(xmlHttp.responseText.indexOf(strCross[i])){
		        		xmlHttp.responseText = xmlHttp.responseText.replace(strCross[i],"");
		        	}
		        }
            	fileList = eval('(' + xmlHttp.responseText + ')');
			}catch (e) {
			}
		}
	}
	return fileList;
};


dhtmlXVaultObjectTwin.prototype.proxyInvoke = function(p_before,p_function,p_args)
{
	  if(p_args==undefined){
		  p_args=[];
	  }
      if(typeof p_before == "function")
      {
           try{
                var ret = p_before.apply(this,p_args);
                if(ret===false) {
                   return;
                }
           }catch(e){
               return;
           }  
      }
      if(typeof p_function == "function")
      {
            p_function.apply(this,p_args);
      }
};

//
dhtmlXVaultObjectTwin.prototype.allowExecute = function()
{
     return this.enabled && !this.readOnly;
}

dhtmlXVaultObjectTwin.prototype.allowDownload = function()
{
     return this.enabled;
}


dhtmlXVaultObjectTwin.prototype.refreshPk = function(p_items, p_pkColName){
    if ($isArray(p_items) && p_items.length > 0){
        var replaceValues = "";
        for(var i = 0; i < p_items.length; i++){
            if($notEmpty(p_items[i].mxVirtualId)){
                replaceValues = replaceValues + p_items[i].mxVirtualId + ":" + p_items[i][p_pkColName] + ";";
            }
        }
        var xmlHttp = this.createXMLHttpRequest();
        xmlHttp.open("POST", this.baseUrl, false);
        xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        var codedPath = this.filePath ? this.filePath.replace(/\+/g,"%2B") : "";
        var pathParam = codedPath ? ("&filePath=" + codedPath) : "";
        xmlHttp.send("option=refreshPk&tableName=" + this.tableName + "&replaceValues=" + replaceValues + pathParam+"&isVirtual="+this.isVirtual + "&rnd=" + mx.random());
        
        if (xmlHttp.status == 200) {
			if ($notEmpty(xmlHttp.responseText)) {
	             return "success";
			}
			else{
				// 刷新主键失败。
			}
			
		}
    }
};

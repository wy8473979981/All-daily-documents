$ns("mx.editors");

$import("mx.controls.DragDataUploadControl");
$import("mx.controls.DragUploadControl");
$import("mx.controls.Label");
$import("mx.controls.UploadControl");
$import("mx.windows.WindowManager");
$import("mx.windows.MessageBox");
$import("mx.controls.ProgressBar");

/**
 * 提供一个显示上传文件信息的类。
 * 
 * @example 以下是一个附件编辑器如何初始化的示例。 
 * <code language="JavaScript">
 * var annex = new mx.editors.FileEditor(
 * {
 *      filePath: "/testUpload/inner/",
 *      windowHeight: "400",
 *      width: "100%",
 *      baseUrl:  mx.mappath("~/fileUpload")
 * });
 * </code>
 * 
 * @example 以下是一个在表单中使用附件编辑器的示例 
 * <code language="JavaScript">
 * var dataForm = new mx.datacontrols.DataForm( {
 *     fields: [ {
 *             name: "deptId",
 *             caption: "DEPT_ID",
 *             editorType: "TextEditor",
 *             visible: false
 *         }, {
 *             name: "deptName",
 *             caption: "DEPT_NAME",
 *             editorType: "FileEditor",//类型为文件编辑器
 *             type: "form",//类型声明为 form
 *             uploadMode: "file",//保存方式为file，文件会保存到服务器指定磁盘路径；为blob会保存到数据库的BLOB类型字段中。
 *             tableName: "DEPT",//数据对应的表名，必须是数据库中的物理表名
 *             primaryKey: "DEPT_ID",//数据表的主键字段名
 *             colName: "DEPT_NAME"//当前字段在数据库中的物理名称
 *         } ],
 *     entityContainer: me.formEntityContainer
 * });
 * </code>
 */
mx.editors.FileEditor = function()
{
    var me = $extend(mx.editors.CustomEditor);
    var base = {};

    /**
     * 获取一个上传控件对象。表示当前文件编辑器使用的上传控件。如果使用 HTML5 批量上传时为 {@link mx.controls.DragDataUploadControl} 类型的对象；
     * 否则为 {@link mx.controls.UploadControl}。请参考 {@link mx.editors.FileEditor.isAdvance} 字段。
     */
    me.uploadControl = null;

    /**
     * 设置或获取一个字符串，表示当前文件编辑器的类型。 当类型为 path 时，表示管理指定目录下的文件； 当类型为 form 或 grid
     * 时，表示管理表单、表格对应的数据的附件。
     * 该属性必须设置
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
     * 设置或获取一个字符串，表示上传文件在服务器上的保存路径。
     * 如果{@link type}属性设置为path，则需要设置该属性
     */
    me.filePath = null;

    /**
     * 设置或获取一个字符串，表示上传控件所属数据的表名。 当控件类型为 form 时，此属性有值。
     * 当{@link type}属性的值设置为form或者grid时，需要设置该属性
     */
    me.tableName = "";

    /**
     * 设置或获取一个字符串，表示上传控件所属数据表的主键列名。 当控件类型为 form 时，此属性有值。
     * 当{@link type}属性的值设置为form或者grid时，需要设置该属性
     */
    me.primaryKey = "";

    /**
     * 设置或获取一个字符串，表示上传控件所属数据的主键值。 当控件类型为 form 时，此属性有意义；若此时此属性没有值，控件不会响应点击事件。
     * 当{@link type}属性的值设置为form或者grid时，需要设置该属性
     */
    me.pkVal = "";

    /**
     * 设置或获取一个字符串，表示上传控件在存储表单数据的表中对应的列名。 当控件类型为 form 时，此属性有值。
     * 当{@link type}属性的值设置为form或者grid时，需要设置该属性
     */
    me.colName = "";

    /**
     * 设置或获取一个字符串，表示保存文件的方式。 当控件类型为 form 时，此属性有意义。
     * <p>
     * 该字段可选的值包括：
     * <ul>
     * <li><b>file</b>表示文件以磁盘文件方式存储</li>
     * <li><b>blob</b>表示文件以blob 类型存储在系统表的附件表中</li>
     * <li><b>uds</b>表示文件存在非结构化系统中</li>
     * <li><b>ftp</b>表示文件存在ftp中，ftp账号等信息需在平台platformconfig中进行配置，添加键值对："MX_FTP_SECURITY = 账户信息"，账户信息是格式为：“主机;端口;用户名;密码”经过AES加密的字符串，密钥请在平台platformconfig中通过MX_FTP_SECURITY_KEY属性进行配置。匿名时用户名、密码可以为空，但是分号不能省略；必须使用{@link filePath}属性设置上传目录。
     * </li>
     * </ul>
     * </p>
     * 
     * @default file
     */
    me.uploadMode = "file";
    
    /**
     * 设置或获取ftp账号等信息，账号信息是格式为：主机;端口;用户名;密码的字符串经过AES加密，密钥请在平台platformconfig中通过MX_FTP_SECURITY_KEY属性进行配置。 当uploadMode为 ftp 时，此属性有意义，优先级高于MX_FTP_SECURITY设置。
     * 
     * @default null
     */
    me.ftpSecurity = null; 

    /**
     * 设置或获取一个字符串或者数字，表示弹出窗口的高度。
     * 
     * @default 350
     */
    me.windowHeight = "350";

    /**
     * 设置或获取一个字符串，表示禁止上传的文件类型，多个扩展名用逗号隔开。
     */
    me.limitTypes = "exe,bat";
    
    /**
     * 设置或获取一个字符串，表示允许上传的文件类型，多个扩展名用逗号隔开。值为 null 时表示允许上传{@link limitTypes}属性值指定类型范围之外的所有文件。
     */
    me.allowTypes = null;
    
    /**
     * 获取或设置一个数字，表示上传文件的大小所允许的最大值，单位 “KB”。如果为“-1”表示无限制。
     */
    me.maxSize = -1;
    
    /**
     * 获取或设置一个数字，表示所有上传文件的大小所允许的最大值，单位“KB”，如果为“-1”表示无限制.
     */
    me.totalMaxSize = -1;
    
    /**
     * @ignore
     */
    me.uploadType = mx.controls.UploadControl;

    /**
     * 设置或获取一个数字，表示允许上传的文件个数。为 0 时表示没有限制。
     */
    me.filesLimit = 0;

    /**
     * 设置或获取一个 Boolean 值，表示是否使用基于 HTML5 的批量上传控件。值为 true 表示使用；为 false 表示不使用；
     * 值为 null 时，{@link mx.editors.FileEditor} 会根据浏览器判断，如果浏览器支持 HTML5 则使用。
     * 该字段必须在初始化前设置。
     */
    me.isAdvance = null;
    
    /**
     * 设置或获取一个 Boolean 值，表示是否使用精简模式。在精简模式下不会显示文件管理弹出框，而是直接选择文件后自动上传。
     * 
     * @default false
     */
    me.isSimple = false;
    
    /**
     * 设置或获取一个 Boolean 值，表示在精简模式下，上传文件之前是否清空旧文件，该属性只有{@link isSimple}属性设置为true时才会生效。
     * 注意：由于精简模式下选择文件会自动上传，所以当该属性设置为true时，重新选择文件之后就会清空旧文件。
     * 
     * @default true
     */
    me.clearBeforeUpload = true;
    
    /**
     * 获取或设置{@link mx.datacontrols.DataGridColumn}或{@link mx.datacontrols.FormField}是否虚拟，
     * 如果值是 true ，则不会提交编辑器的值。
     * 
     * @default false
     */
    me.isVirtual = false;
    
    /**
     * 设置或获取一个 Boolean 值，表示编辑器文本是否自动换行。请使用 {@link setAutoWrap} 方法设置该字段的值。
     * 
     * @default false
     */
    me.autoWrap = false;
    
    /**
     * 获取或设置一个 Boolean 值，该值表示数据项之前是否显示一个选择框。如果该值为 true，则表示显示；反之则不显示。
     * 
     * @default false
     */
    me.displayCheckBox = false;
    
    /**
     * 上传失败时，提示信息。
     * 
     * @default null
     */
    me.uploadErrorMsg = null;
    
    /**
     * 上传项上传之前触发该事件。
     * 
     * @cancelable
     * @param item 
     *              上传项对象，其 setUdsParam 方法参加  {@link mx.controls.DragUploadItem.setUdsParam} 方法。
     * 
     * @example 非结构化上传自定义参数示例
     * <code language="JavaScript">
     *  var fe = new mx.editors.FileEditor({
     *  baseUrl :mx.mappath("~/../mx/servlets/dataFileUpload"),
     *  filePath: "D:/uploadfile/newpath/",
     *  tableName: "T_GOODS",
     *  primaryKey: "id",
     *  pkVal: "402894263e440be8013e44497529000c",
     *  colName: "IMG",
     *  type:"form",
     *  uploadMode: "uds",
     *  
     *  // 非结构化自定义参数可以通过以下方式上传
     *  onitemuploading: function (args){
     *      var udsp = {comp:"公司1", des:"公司描述"};
     *      args.item.setUdsParam(udsp);
     *   }
     *  });
     * </code>
     */
    me.onitemuploading = null;
    
    /**
     * 当选择的文件改变时触发该事件。
     * 
     * @param item 
     *              一个对象，表示当前选中的上传项。
     * 参见 {@link mx.controls.DragDataUploadControl.onselectionchanged} 事件和{@link mx.controls.UploadControl.onselectionchanged} 事件 
     */
    me.onselectionchanged = null;
    
    /**
     * 上传项上传之后触发该事件。
     */
    me.onitemuploaded = null;
    
     /**
     * 上传项上传失败触发该事件。
     */
    me.onitemuploaderror = null;
    
    /**
     * 所有附件上传完毕后触发该事件
     */
    me.onallitemuploaded = null;
    
    /**
     * 设置需要忽略的全局属性设置;如:需要获取全局上传mx.globalUploadMode,只需设置  ignoreGlobalSet = ["globalUploadMode"] 既可
     */
    me.ignoreGlobalSet = [];
    
    var $fileInput = null;
	var progressBar = null;
    var $span = null;
        	
    base.init = me.init;
    me.init = function()
    {
        base.init();
        me.$e.addClass("fileEditor");
        
        if (me.autoWrap)
        {
            me.setAutoWrap(me.autoWrap);
        }
        
        if ($notEmpty(mx.globalUploadMode) && !  isIgnoreGlobalSet("globalUploadMode"))
        {//使用全局上传模式配置覆盖局部配置。
            var uploadMode = ["file","blob","uds","ftp"];
            if (uploadMode.contains(mx.globalUploadMode))
            {
                me.uploadMode = mx.globalUploadMode;
            }
        }
        
        // 浏览器不否支持 HTML5 的情况下，给出提示并自动转换到 JS 版控件;
        if(me.isAdvance == null)
        {
            me.isAdvance = typeof(FileReader) == "undefined" ? false : true;
        }
        
        _initUploadControl();
        
        if (me.isSimple == true)
        {
        	$fileInput = $("<input type='file' class='dhxvlt_hidden' style='z-index:-10;position: relative;top: -20px;'/>");
        	me.$e.append($fileInput);
        	$fileInput.on("change", function(e){
        		if (me.isAdvance) 
        		{
        			var p_files = e.target.files;
        			if (p_files && p_files.length > 0)
        			{
        				if (me.clearBeforeUpload)
        				{
        					var items = me.uploadControl.items;
		        			for (var i = 0; i < items.length; i++)
					        {
					        	me.uploadControl.removeItem(items[i]);
					        }
					        me._resetText();
        				}
        				 
				        var item = me.uploadControl.appendItem(p_files[0]);
				        if (item)
				        {
					        if (progressBar == null)
					        {
					        	progressBar = new mx.controls.ProgressBar({
				                	width: me.$inputContainer.width(),
				                	css:{"position":"absolute","bottom":"0px","height":"2px","border":"none"}
					            });
					            $span = $("<span style='position:absolute;right:25px;top:2px;'/>");
					            $span.text("0.0%");
					            me.$e.append(progressBar.$e);
					            me.$e.append($span);
					            
					            item.progressBar = progressBar;
					            item.$progressSpan = $span;
					        }
					        else
					        {
					        	progressBar.setValue(0);
					        	$span.text("0.0%");
					        	item.progressBar = progressBar;
					        	item.$progressSpan = $span;
					        }
				        }
			            
        				me.uploadControl.uploadAll();
        			}
			       
        		}
        		else if (me.uploadControl.vault)
        		{
        			if (me.clearBeforeUpload)
        			{
        				me.uploadControl.vault.deleteAll();
        				me._resetText();
        			}
        			
        			if ($span == null)
			        {
			            $span = $("<span style='position:absolute;right:25px;top:2px;'/>");
			            $span.text(mx.msg("UPLOAD_UPLOADING"));
			            me.$e.append($span);
			        }
			        else
			        {
			        	$span.text(mx.msg("UPLOAD_UPLOADING"));
			        }
			        
        			me.uploadControl.vault.currentFile = $fileInput.get(0);
        			me.uploadControl.vault._file_change($fileInput.get(0));
        			me.uploadControl.vault.uploadAllItems();
        		}
        	});
	        
        	if (!me.isAdvance)
        	{
        		// 由于 IE9 中访问  document.selection.createRange() 会“拒绝访问”，采用辅助手段规避。
				var fileSelectionHiddenArea = document.getElementById("_fileSelectionHiddenArea");
				if (fileSelectionHiddenArea == null)
				{
					me.$e.append($("<div id='_fileSelectionHiddenArea' style='width:1px;height:1px'></div>"));
				}
				
				me.uploadControl.$e.css("display","none");
	    		me.$e.append(me.uploadControl.$e);
        	}
    	}
        
        if (me.readOnly)
        {
            me.setReadOnly(me.readOnly);
        }
        
        if($.isIE6()) {
            me.$e.resize(function(){
                var $buttonContainer = me.$e.find("> div#customButton");
                me.$inputContainer.css("width", me.$e.width() - $buttonContainer.outerWidth() - 4);
            });
        }
    };
    
    base.setReadOnly = me.setReadOnly;
    me.setReadOnly = function(p_readOnly){

        me.$button.off();
        me.$button.on("click", _onclick);

        base.setReadOnly(p_readOnly);

        me.$button.removeAttr("disabled");

        if(me.uploadControl){
            me.uploadControl.setReadOnly(me.readOnly);
        }
    }

    /**
     * @ignore
     * 提供一个方法，设置当前编辑器所属的表单数据的主键值。 当控件类型为 form 时，此方法有意义。
     * 
     * @param p_pkVal
     *            一个数字或字符串，表示当前数据的主键值。
     */
    me.setPk = function(p_pkVal)
    {
    	me.pkVal = p_pkVal;
		_initUploadControl();
    };

    /**
     * @ignore
     * 提供一个方法供数据组件调用，用于重置子数据的主键，一般在新增数据保存完成后执行。
     * 
     * @param p_items
     *            一个数组，包含保存结果的数据。
     * @param p_pkColName
     *            一个字符串，表示保存结果中主键属性名。
     */
    me.refreshPk = function(p_items, p_pkColName)
    {
        me.uploadControl.refreshPk(p_items, p_pkColName);
    };

    /**
     * @ignore
     */
    base.setValue = me.setValue;
    me.setValue = function(p_value, p_triggerEvent)
    {
        if ($isEmpty(p_value))
        {
            p_value = "";
        }
        base.setValue(p_value, p_triggerEvent);
        var fileHerfs = new Array();
        var fileNames = p_value.split(";");
        for ( var i = 0; i < fileNames.length - 1; i++)
        {
            if (fileNames[i].length > 0)
            {
                var linkEditor = new mx.editors.LinkEditor(
                {
                    "type": "text",
                    "text": fileNames[i] + ";",
                    "autoHref": false,
                    "height": null
                });
                // 使用闭包循环绑定事件。
                var clickFunction = new _downLoadFile(linkEditor.text);
                linkEditor.on("click", clickFunction.func);

                fileHerfs.push(linkEditor.$e);
            }
        }

        me.resetInput(fileHerfs);
    };
    
    /**
     * 设置 {@link autoWrap} 字段的值。
     * 
     * @param p_autoWrap 一个 Boolean 值，表示编辑器本是否自动换行。
     */
    me.setAutoWrap = function(p_autoWrap)
    {
        me.autoWrap = p_autoWrap;
        me.$e.toggleClass("autoWrap", me.autoWrap);
    }
    
    /**
     * @ignore
     */
    me._resetText = function()
    {
        me.uploadControl._markError(false);
        me.uploadControl._removeUploadedErrorFile();
        var names =  me.uploadControl.getUploadedNames();

        if (me.value != names || !me.isValidate)
        {
            me.setValue(names, true);
        }
        
        //避免与编辑表格的document.click事件冲突
		var docclicks = $(document).data('documentClickHandle');
		if(docclicks && docclicks.length>0){	
			$.each(docclicks, function(i,eh){
				$(document).on('click',eh);	
			});
		
			$(document).data('documentClickHandle', null);		
		}		
		     
    };
    
    base.validate = me.validate;
    /**
     * 验证当前editor的值 
     * 返回的结果为一个 Boolean 值或者一个 JSON 对象。如“true”、“false”或者“{ successful: false, hint: "验证失败！" }”。
     * 如果返回的是 JSON 对象，“successful”表示是否成功，“hint”表示显示值。
     * @overload  function(p_markError)
     * @param p_markError 一个布尔值，是否标记错误提示。true表示标记，默认为false
     */
    me.validate = function(p_markError)
    {
    	if (me.isSimple == true)
    	{
    		if (me.isAdvance)
    		{
    			var items = me.uploadControl.items;
				for (var i = 0; i < items.length; i++)
		        {
		        	if(items[i].status == me.uploadControl.uploadStatus.UPLOADING)
		        	{
		        		return {successful: false, hint: mx.msg("UPLOAD_UPLOADING")};
		        	}
		        }
    		}
    		else if (me.uploadControl.vault)
    		{
    			var fileList = me.uploadControl.vault.fileList;
	    		for (var id in fileList)
	    		{
	    			if(!fileList[id].uploaded&& !fileList[id].error)
	    			{
	    				return {successful: false, hint: mx.msg("UPLOAD_UPLOADING")};
	    			}
				}
    		}
    	}
    	
    	return base.validate(p_markError);
    }
    
    function isIgnoreGlobalSet(p_attrName)
    {
          if($isArray(me.ignoreGlobalSet))
          {
              return me.ignoreGlobalSet.contains(p_attrName);
          }
          return false;
    }
    
    function _initUploadControl()
    {
        var dragUpload = null;
        var baseUploadSetting = {
                filePath: me.filePath,
                height: me.windowHeight - 50,
                baseUrl: me.baseUrl,
                filesLimit: me.filesLimit,
                limitTypes: me.limitTypes,
                allowTypes: me.allowTypes,
                uploadErrorMsg: me.uploadErrorMsg,
                uploadMode: me.uploadMode,
                ftpSecurity: me.ftpSecurity,
                maxSize: me.maxSize,
                totalMaxSize: me.totalMaxSize,
                readOnly: me.readOnly,
                enabled: me.enabled,
                displayCheckBox: me.displayCheckBox,
                onclosed: _closeUpload,
                onitemuploaded: _onitemuploaded,
                onallitemuploaded: _onallitemuploaded,
                onitemuploading: _onitemuploading,
                onselectionchanged:_onselectionchanged,
                onitemuploaderror: _onitemuploaderror,
                context: me
            };
        
        var uploadSetting = baseUploadSetting;
        if (me.type == "form" || me.type == "grid")
        {
            me.baseUrl = me.baseUrl || mx.mappath("~/../mx/servlets/dataFileUpload");
            
            _initDataControlConfig();
            
            $.extend(uploadSetting,  {
                baseUrl: me.baseUrl,
                isVirtual:me.isVirtual,
                tableName: me.tableName,
                primaryKey: me.primaryKey,
                pkVal: me.pkVal,
                colName: me.colName
            });
        }
        else
        {
            me.baseUrl = me.baseUrl || mx.mappath("~/../mx/servlets/fileUpload");
        }
        
        uploadSetting.baseUrl = me.baseUrl;
        uploadSetting.type = me.type;
        
        if(me.isAdvance)
        {
            $.extend(uploadSetting,  {
                displayToolBar:true,
                height: me.windowHeight - 50,
                uploadMode: me.uploadMode,
                maxCount: (me.filesLimit == 0) ? -1 : me.filesLimit
            });
            
            me.uploadType = mx.controls.DragDataUploadControl;
        }
        
        me.uploadControl = new me.uploadType(uploadSetting);
        me.setValue(me.uploadControl.fileNames);
        
        if (me.isSimple == true)
        {
        	me.on("click", function(){
        		$fileInput.trigger("click");
        	});
        	
        	me.$inputContainer.on("click", function(){
        		$fileInput.trigger("click");
        	});
        }
        else
        {
        	me.on("click", _openUpload);
        }
    }
    
    /**
     * @ignore
     * 初始化表格或表单控件中的主键、主键值、表名、列名等配置信息。
     */
    function _initDataControlConfig()
    {
        var entityContainer = null;
        if (me.parent)
        {
            entityContainer = me.parent.entityContainer;
            if($isEmpty(me.primaryKey)){
            	me.primaryKey = entityContainer.primaryKey;
            }
        }
        
        if ($isEmpty(me.tableName))
        {
            me.tableName = "temp";
        }
        
        if ($isEmpty(me.colName) && $notEmpty(me.name))
        {
            me.colName = me.name;
        }
        
        if (entityContainer && $isEmpty(me.pkVal))
        {
            if (me.type == "form")
            {
                // 获取表单数据的主键值。
                me.pkVal = entityContainer.data[entityContainer.primaryKey];
            }
            else if (me.type == "grid")
            {
                // 获取表格数据的主键值。
                if (entityContainer && entityContainer.editingItem != null)
                {
                    me.pkVal = entityContainer.editingItem[entityContainer.primaryKey];
                }  
            }
        }
    }

    function _closeUpload()
    {
        if (_uploadWin)
        {
            _uploadWin.hide();
            if(_parentWin)
            {
                _parentWin.activate();
            }
        }
    }
    
    var _uploadWin = null; // 上传的窗体
    var _parentWin = null; // 父窗体
    var _windowManager = null;
    function _openUpload()
    {
        if (me.getContext() && me.getContext().windowManager)
        {
            _parentWin = me.getContext().windowManager.activeWindow;
        }
        if (_windowManager == null)
        {
            _windowManager = new mx.windows.WindowManager({zIndex:999999});
        }
        
        _uploadWin = _windowManager.create(
        {
            title: mx.msg("UPLOAD_TITLE"),
            width: (me.isAdvance && me.type!= "path") ? 550: 453,
            height: me.windowHeight,
            resizable: false,
            reusable: true,
            left: "center",
            top: "center"
        });
        
        //避免上传表格右键菜单的document.click事件与编辑表格的document.click事件冲突
        if($(document).data('events') && $(document).data('events').click){
			var clickhandles = $(document).data('events').click.clone();
			$(document).data('documentClickHandle', clickhandles);			
			$(document).off('click');
		}   
        
        _uploadWin.$e.on("click", function(e)
        {
            e.stopPropagation();
        });
        _uploadWin.addControl(me.uploadControl);
        _uploadWin.showDialog(me._resetText);
        if ($notEmpty(_uploadWin.$mask))
        {
            _uploadWin.$mask.on("click", function(e)
            {
                e.stopPropagation();
            });
        }
    }
   
    function _downLoadFile(fileName)
    {
        this.func = function()
        {
        	if (me.enabled)
        	{
        		me.uploadControl.download(fileName);
        	}
            
        };
    }
    
    function _onclick(e)
    {
        me.trigger("click");
    }
    
    //所有附件上传后
    function _onallitemuploaded(){
    	if (me.isSimple)
    	{
    		me._resetText();
    		if (!me.isAdvance && $span)
    		{
    			$span.text("");
    		}
    	}
    	
        me.trigger("allitemuploaded");
    }
    
    // 上传后
    function _onitemuploaded()
    {
        me.trigger("itemuploaded");
    }
    
    // 上传前
    function _onitemuploading(p_args)
    {
        var args = {cancel:false, item: p_args.item};
        me.trigger("itemuploading",args);
        p_args.cancel = args.cancel;
    }
    
     // 上传失败
    function _onitemuploaderror()
    {
    	if (me.isSimple)
    	{
    		if ($span)
    		{
    			$span.text(mx.msg("UPLOAD_ERROR"));
    		}
    	}
        me.trigger("itemuploaderror");
    }
    
    
    // 上传项选择改变
    function _onselectionchanged(p_args)
    {
        me.trigger("selectionchanged", p_args);
    }
    
    base.dispose = me.dispose;
    me.dispose = function()
    {
    	me.uploadControl.dispose();
    	if (_uploadWin != null)
    		_uploadWin.dispose();
    	if (_windowManager != null)
    		_windowManager.dispose();
		base.dispose();
    }

    me.endOfClass(arguments);
    return me;
};
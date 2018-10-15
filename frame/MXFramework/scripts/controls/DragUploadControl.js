$ns("mx.controls");

$import("mx.controls.ProgressBar");
$import("mx.datacontrols.DataGrid");
$import("mx.io.FileUploader");
$import("mx.lib.jquery-cookie");
$import("mx.windows.WindowManager");
/**
 * 提供一个拖拽上传文件的控件。浏览器仅支持 IE10、FireFox、Chrome。
 * 
 * @example 以下是一个拖拽上传控件如何初始化的示例。
 * <code language="JavaScript">
 * var dragUploadControl = new mx.controls.DragUploadControl({
 *   	url : mx.mappath("~/../mx/servlets/fileUpload"),
 *   	width : 400,
 *   	height : 300,
 *   	params : {
 *   		filePath:"D:/uploadfile/newpath/"}
 *   });
 * </code>
 * 
 * @example 以下是一个拖拽上传控件如何初始化的示例，其中文件作为一张表的一个字段。
 * <code language="JavaScript">
 * var dragUploadControl = new mx.controls.DragUploadControl({
 *   	url : mx.mappath("~/../mx/servlets/dataFileUpload"),
 *   	width : 400,
 *   	height : 300,
 *       params : {
 *			    tableName : "T_GOODS",
 *			    primaryKey : "id",
 *			    pkVal : "402894263e440be8013e44497529000c",
 *			    colName : "IMG",
 *			    uploadMode : "file",
 *	    		filePath:"D:/uploadfile/newpath/"
 *    		}
 *  });
 * </code>
 */
mx.controls.DragUploadControl = function()
{
    var me = $extend(mx.controls.Control);
    var base = {};
    
    /**
     * 参见 {@link mx.datacontrols.DataGrid.displayCheckBox} 属性。
     * 
     * @default false
     */
    me.displayCheckBox = false;
    
    /**
     * 获取或设置一个字符串，表示后台服务所在路径。MX 框架提供两个服务路径可供选择。
     * mx.mappath("~/../mx/servlets/fileUpload") 供管理指定目录下的文件时使用，
     * mx.mappath("~/../mx/servlets/dataFileUpload") 供管理表单、表格对应的数据附件时使用。
     * 用户可以根据需要使用自己的服务路径。
     * 
     * @default mx.mappath("~/../mx/servlets/fileUpload")
     */
    me.url = mx.mappath("~/../mx/servlets/fileUpload");
        
    /**
     * 获取一个集合，包含控件中所有要上传的项（{@link mx.controls.DragUploadItem} 类型）。
     * <b>可以通过“grid.selection.getValue("uploadItem")”获取到 {@link mx.controls.DragUploadItem} 对象。</b>
     * 
     * @item mx.controls.DragUploadItem
     * @index 项在集合中的序号（从 0 开始计数）。
     */
    me.items = [];
    
    /**
     * @ignore
     */
    me.grid = null;
    
    /**
     * 获取或设置一个数字，表示上传项的限制数。如果为“-1”表示无限制；反之限制指定的个数。
     */
    me.maxCount = -1;
    
    /**
     * 设置文件上传服务端需要的参数，参见 {@link mx.io.FileUploader.params} 字段。
     * 只有在初始化控件的时候传入才有效
     */
    me.params = null;
    
    /**
     * 参见 {@link mx.datacontrols.DataGrid.itemMenu} 属性。 
     * 子类DragDataUploadControl中设置该属性无效
     */
    me.itemMenu = null;

    /**
     * 参见 {@link mx.datacontrols.DataGrid.ContextMenu} 属性。
     */
    me.contextMenu = null;
    
    /**
     * 当上传文件服务端处理完成时会触发该事件，并返回相应的值。
     * 
     * @param resultValue 一个字符串，表示服务端处理完成后返回的值。
     */
    me.onuploadcomplete = null;
    
    /**
     * 获取或设置一个数字，表示上传文件的大小所允许的最大值，单位 “KB”。如果为“-1”表示无限制。
     */
    me.maxSize = -1;
    
    /**
     * 获取或设置一个数字，表示所有上传文件的大小所允许的最大值，单位“KB”，如果为“-1”表示无限制.
     */
    me.totalMaxSize = -1;
    
    /**
     * 设置或获取一个字符串，表示禁止上传的文件类型，多个扩展名用逗号隔开。需要先满足 {@link mx.controls.UploadControl.allowTypes}。
     */
    me.limitTypes = "";
    
    /**
     * 设置或获取一个字符串，表示允许上传的文件类型，多个扩展名用逗号隔开。值为 null 时表示允许上传所有文件。
     */
    me.allowTypes = null;
    
    /**
     * @ignore
     */
    me.$tipContainer = null;
    
    /**
     * 指示列是否虚拟，如果列是虚拟的话，将不会执行业务表的逻辑
     * 
     * @default false
     */
    me.isVirtual = false;
    
    /**
     * 设置或获取文件上传控件是否只读，true：只读，不能上传、添加删除文件，只能下载
     * 
     * @default false
     */
    me.readOnly = false;
    
    /**
     * 获取一个 JSON 对象，表示文件的上传状态（UNSTART，UPLOADING，COMPLETE，STOP，ERROR）。
     */
    me.uploadStatus = {
        UNSTART:mx.msg("UPLOAD_UNSTART"),
        UPLOADING:mx.msg("UPLOAD_UPLOADING"),
        COMPLETE:mx.msg("UPLOAD_COMPLETE"), 
        STOP:mx.msg("UPLOAD_STOP"),
        ERROR:mx.msg("UPLOAD_ERROR")
    };
    
    /**
     * 上传失败时，提示信息。
     * 
     * @default null
     */
    me.uploadErrorMsg = null;
    
    /**
     * 上传项 {@link mx.controls.DragUploadItem} 上传之前触发该事件。
     * 
     * @cancelable
     * @param item 
     * 				一个 {@link mx.controls.DragUploadItem} 对象；表示当前将要上传的上传项。
     */
    me.onitemuploading = null;
    
    /**
     * 上传项 {@link mx.controls.DragUploadItem} 上传之后触发该事件。
     */
    me.onitemuploaded = null;
    
    /**
     * 上传项 {@link mx.controls.DragUploadItem} 上传失败触发该事件。
     */
    me.onitemuploaderror = null;
    
    /**
     * 所有上传项 {@link mx.controls.DragUploadItem} 上传之后触发该事件。
     */
    me.onallitemuploaded = null;
    
    /**
     * 当选择的文件改变时触发该事件。
     * 
     * @param item 
     * 				一个 {@link mx.controls.DragUploadItem} 对象，表示当前选中的上传项。
     */
    me.onselectionchanged = null;
    
    /**
     * 内部兼容 HTML5 下载的升级提示窗口。
     */
    var _win = null;

    base.init = me.init;
    me.init = function()
    {
        // 浏览器不否支持 HTML5 的情况下，升级提示
        if (typeof(FileReader) == "undefined")
        {
            _upgrade();
        }
        
        base.init();            
        me.$e.addClass("dragUploadControl");
        
        var params = {option : "upload",isVirtual : me.isVirtual};
        if ($notEmpty(me.params))
        {
        	me.params = $.extend(me.params, params);
        }
        
        me.$tipContainer = $("<div id='tip'><input style='display:none' type='file' name='file' multiple='multiple'/><table cellspacing=0 cellpadding=0><tbody><tr><td align='center'><div><div id='img'/><div id='text'/></div></td></tr></tbody></table></div>");
        me.$tipContainer.addClass("dragUploadControlTip");
        me.$tipContainer.find("#text").text(mx.msg("DRAG_FILE_HERE"));
        me.$e.append(me.$tipContainer);
        var $fileInput = me.$tipContainer.find("input");
        
        function _fileInput_change(e)
        {
        	//非只读情况下 
        	if(!me.readOnly){ 
        		try{
        			_appendFiles(e.target.files);
        		}catch(ex){
        			me._markError(true, mx.msg("UPLOAD_ADVANCE_NOT_SUPPORT"), "bottom");
        		}
	        	//清空file控件的值
	            var file = $(e.target);
	            var fileClone = file.clone().val("");
	            fileClone.on("change", _fileInput_change);
	            $fileInput = fileClone;
	            file.after(fileClone);
	            file.remove();
        	 }
        }
        
        $fileInput.on("change", _fileInput_change);
        
        me.$tipContainer.click(_tipContainer_click);
        $fileInput.click(function(e){
        	e.stopPropagation();
        });
        if (me.itemMenu == null)
        {
            me.itemMenu = {
                items:[
                {
                    name: "uploadItem",
                    text: mx.msg("UPLOAD")
                },   
                "-",
                {
                    name: "deleteItem",
                    text: mx.msg("DELETE")
                }],
                onitemclick: function(e){
                    _executeCommand(e.item.name);
                }
            };
        }
        
        if (me.contextMenu == null)
        {
            me.contextMenu = {
                items:[
                {
                    name: "uploadAll",
                    text: mx.msg("UPLOAD_ALL")
                },
                "-",
                {
                    name: "deleteSelections",
                    text: mx.msg("DELETE_SELECTIONS")
                },
                "-",
                {
                    name: "deleteAll",
                    text: mx.msg("DELETE_ALL")
                }],
                onitemclick: function(e){
                    _executeCommand(e.item.name);
                }
            };
        }
        
        me.grid = new mx.datacontrols.DataGrid({
            columns:[
                { name:"id", caption:"ID" },
                { name:"name", caption:mx.msg("NAME"), width:100 },
                { name:"size", caption:mx.msg("SIZE"), width:80 },
                { 
                    name:"status", 
                    caption:mx.msg("STATUS"), 
                    width:80, 
                    renderCell:function(p_item, $p_cell){                        
                        var uploadItem = p_item.getValue("uploadItem");
                        $p_cell.text(uploadItem.status);
                        uploadItem.$statusCell = $p_cell;
                    }
                },
                { 
                    name:"progress", 
                    caption:mx.msg("PROGRESS"), 
                    width:120, 
                    renderCell:function(p_item, $p_cell){
                        var progressBar = new mx.controls.ProgressBar({
                            width:70
                        });
                        var $span = $("<span style='margin-left:5px;vertical-align:middle;'/>");
                        $span.text("0.0%");
                        $p_cell.append(progressBar.$e);
                        $p_cell.append($span);
                        
                        var uploadItem = p_item.getValue("uploadItem");
                        uploadItem.progressBar = progressBar;
                        uploadItem.$progressSpan = $span;                        
                    }
                }
            ],
            displayCheckBox:me.displayCheckBox,
            itemMenu:me.itemMenu,
            contextMenu:me.contextMenu,
            allowPaging:false,
            displayRowNumber:true,
            enableCellTip: true,
            onselectionchanged:_onselectionchanged,
            onitemchecked:_onselectionchanged
        });
        me.grid.entityContainer.type = "local";
        me.grid.load();
        me.$e.append(me.grid.$e);
        
        me.contextMenu = me.grid.contextMenu;
        
        _refreshDisplayStatus();
        _initDragEvent();
        if(me.readOnly){
        	me.setReadOnly(me.readOnly);
        }
        if (me.enabled === false)
        {
            me.setEnabled(me.enabled);
        }
        me.on("uploadcomplete",_onuploadcomplete);
    };
    
    function _tipContainer_click(){
    	if(!me.readOnly){ 
    		me.$tipContainer.find("input").get(0).click();
    	}
    }
    
    function _onuploadcomplete(){
    	var isAllUploaded = true;
    	$(me.items).each(function(){
    		if(this.status != me.uploadStatus.COMPLETE){
    			isAllUploaded = false;
    			return false;
    		}
    	});
    	if(isAllUploaded)
    		me.trigger("allitemuploaded");
    }
    
    /**
     * @ignore
     * 向 {@link mx.controls.DragUploadControl} 的（{@link items} 集合）添加上传文件对象，并返回该 {@link mx.controls.DragUploadItem} 对象。
     * 
     * @param p_item 一个 File 对象；或者一个 JSON 对象（如 {name:"dbm.doc", size:100}）。
     * 
	 * @example 以下是添加上传文件对象的示例。 
 	 * <code language="JavaScript">
	 *   var item = dragUploadControl.appendItem({ name:"item.doc", size:100, status:dragUploadControl.uploadStatus.UPLOADING});
	 *   item.setProgress(80);
	 * </code>
     */
    me.appendItem = function(p_item)
    {
    	var names = (p_item.name || "").split(".");
    	var suffix = names[names.length - 1].toLowerCase();
    	
    	// 加 "," 防止类似 docx 拦截 doc 的情况
    	if ($notEmpty(me.allowTypes) && ("," + me.allowTypes.toLowerCase() + ",").indexOf("," + suffix + ",") == -1)
    	{
    		me._markError(true,mx.msg("FILE_TYPE_ALLOWED",[me.allowTypes]),"bottom");
    		mx.indicate("info", mx.msg("ERR_FILE_TYPE_LIMITED"));
			return;
    	}
    	//限制类型
    	if($notEmpty(me.limitTypes) && ("," + me.limitTypes.toLowerCase() + ",").indexOf("," + suffix + ",") > -1){
    		me._markError(true,mx.msg("FILE_TYPE_LIMITED",[me.limitTypes]),"bottom");
    		mx.indicate("info", mx.msg("ERR_FILE_TYPE_LIMITED"));
			return;
    	}
    	
    	me._changeErrorState();
    	
    	if (me.maxSize != -1 && p_item.size > me.maxSize * 1024)
    	{
    		mx.indicate("warn", mx.msg("UPLOAD_SIZE_LIMIT", [(me.maxSize + "KB")]));
    		return;
    	}
    	
    	if(me.totalMaxSize != -1){
    		var total = 0;
    		$(me.items).each(function(){
    			total += parseInt(this.size);
    		});
    		total = total + parseInt(p_item.size);
    		if(total > me.totalMaxSize * 1024){
    			mx.indicate("warn", mx.msg("UPLOAD_TOTALSIZE_LIMIT", [(me.totalMaxSize + "KB")]));
        		return;
    		}
    	}
    	
        if (me.maxCount >= 0 && me.items.length >= me.maxCount)
        {
            mx.indicate("warn", mx.msg("UPLOAD_COUNT_LIMIT", [me.maxCount]));
            return;
        }
        
        var item = null;
        if ($.isPlainObject(p_item))
        {
            p_item.owner = me;
            p_item.params = me.params;
            item = new mx.controls.DragUploadItem(p_item);
        }
        else if ($isObject(p_item))
        {
            item = new mx.controls.DragUploadItem({
                params:me.params,
                file:p_item,
                owner:me
            });
        }
        
        if (item != null && me.items[item.getID()] == null)
        {
        	item.on("uploading", _uploading);
        	item.on("uploaded", _uploaded);
        	item.on("uploaderror", _uploaderror);
        	
        	var itemName = item.name;
        	item.name = itemName.replaceAll(",","*").replaceAll(";","?");//对文件名中的英文逗号和分号进行处理
            me.grid.appendItem({ uploadItem:item, id:item.getID(), name:itemName, size:_getSize(item.size), status:item.status });
            me.items[item.getID()] = item;
            me.items.add(item); 
            _refreshDisplayStatus();
        }
        else
        {
        	mx.indicate("info", mx.msg("UPLOAD_REPEATEDLY"));
        }
        
        item.name = itemName;
        return item;
    };
    
    /**
     * @ignore
     */
    me._markError = function(p_isError,p_msg,p_position){
    	var $div = me.$e;
    	if(p_isError){
    		if(p_position == undefined)
    			p_position = "bottom";
    		$div.addClass("error");
    		$div.toolTip({
    			content: p_msg,
    	    	defaultPosition: p_position
    		});
    		//更改z-index
    		$("#toolTip_holder").css("z-index",9999999);
    	}else{
    		$div.removeClass("error");
    		$div.toolTip("destroy");
    	}
    }
    
    /**
     * @ignore
     */
    me._changeErrorState = function(){
    	//检查上传文件列表的上传状态
    	var uploadTypeErrorCount = 0;
    	$(me.items).each(function(){
    		if(this.uploadTypeError){
    			uploadTypeErrorCount ++ ;
    		}
    	});
    	if(uploadTypeErrorCount == 0){
    		me._markError(false);
    	}
    }
    
    /**
     * @ignore
     * 移除上传失败的文件
     */
    me._removeUploadedErrorFile = function(){
    	var i=0;
    	while(i<me.items.length){
    		var item = me.items[i];
    		if(item.status == me.uploadStatus.ERROR){//上传失败
    			me.removeItem(item);
    		}else{
    			i++;
    		}
    	}
    }
    
    
    /**
     * 从 {@link items} 集合中移除指定的 {@link mx.controls.DragUploadItem} 对象。从列表中移除项时，有关移除的项的所有信息均会被删除。若要从集合中移除所有项，请使用 {@link clearItems} 方法。
     * 
     * @param p_item 一个数字（如 0），表示 {@link items} 集合中项的序号；或者一个 {@link mx.controls.DragUploadItem} 对象。
     * 
	 * @example 以下是从 {@link items} 集合中移除指定的 {@link mx.controls.DragUploadItem} 对象的示例。 
 	 * <code language="JavaScript">
 	 * 	// 参数为 {@link mx.controls.DragUploadItem} 对象时的示例
     *	dragUploadControl.removeItem(item);
 	 *  // 参数为数字时的示例
     *	dragUploadControl.removeItem(3);
	 * </code>
     */
    me.removeItem = function(p_item)
    {
        var item = null;
        if (typeof (p_item) == "number")
        {
            item = me.items[p_item];
        }
        else if (typeof (p_item) == "object")
        {
            item = p_item;
        }
                    
        if (item != null)
        {
            var key = item.getID();
            delete me.items[key];
            me.items.remove(item);
            
            me.grid.removeItem(key);
        }
        _refreshDisplayStatus();
    };
    
    /**
     * 从 {@link items} 集合中移除所有项。若要从 {@link mx.controls.DragUploadControl} 中移除单个项，请使用 {@link removeItem} 方法。
     * 
     * @example 以下是从 {@link items} 集合中移除所有项的示例。 
 	 * <code language="JavaScript">
     *	 dragUploadControl.clearItems();
	 * </code>
     */
    me.clearItems = function()
    {
    	var msgBox = new mx.windows.MessageBox( {
	 		reusable : false,
	 		title : mx.msg("TIPS_BOX"),
	 		message : mx.msg("CONFIRM_DELETE_ALL"),
	 		zIndex : 9999999,
	 		imgkey : "info"
	 	});
		
		msgBox.show(function(){
	        while (me.items.length > 0)
	        {
	            me.removeItem(0);
	        }
	        me._markError(false);
		});
    };
    
    /**
     * 删除选择项。
     */
    me.removeCheckedItems = function()
    {
        var IDs = me.grid.getCheckedIDs();
        if(IDs.length <= 0){
        	mx.indicate("info",mx.msg("UPLOAD_FILE_REMOVE"));
        	return ;
        }
        for (var i = 0; i < IDs.length; i++)
        {
            me.removeItem(me.items[IDs[i]]);
        }
    };
    
    /**
     * 上传所有 {@link mx.controls.DragUploadItem} 对应的文件。
     */
    me.uploadAll = function()
    {
        for (var i = 0; i < me.items.length; i++)
        {
        	var item = me.items[i];
        	if(item.file==null){
        		continue;
        	}
            me.items[i].upload(true);
        }
    };
    
    /**
     * @ignore
     * 设置 {@link params} 的值。
     */
    me.setParams = function(p_params)
    {
        if (me.params != p_params)
        {
            me.params = p_params;
        }
    };
    
    function _uploading (p_args)
    {
        var args = {cancel: false, item : p_args.item};
        me.trigger("itemuploading", args);
        p_args.cancel = args.cancel;
    }
    
    function _uploaded ()
    {
    	me.trigger("itemuploaded");
    }
    
    function _uploaderror ()
    {
    	me.trigger("itemuploaderror");
    }
    
    function _getSize(p_size)
    {
        var result = null;
        if (p_size < 1024)
        {
            result = p_size + "B";
        }
        else if (p_size >= 1024 && p_size < 1024*1024)
        {
            result = _toDecimal(p_size/1024) + "KB";
        }
        else
        {            
            result = _toDecimal(p_size/(1024 * 1024)) + "MB";
        }
        return result;
    }
    
    function _toDecimal(p_value)
    {
        var result = parseFloat(p_value);
        result = isNaN(result) ? 0 : Math.round(p_value*100)/100; 
        return result;
    }
    
    function _refreshDisplayStatus()
    {
        if (me.items.length > 0)
        {
            me.$tipContainer.hide();
            me.grid.$e.show();
        }
        else
        {
        	me._markError(false);
            me.$tipContainer.show();
            me.grid.$e.hide();
        }
    }
    
    function _initDragEvent()
    {
        me.$e.on("dragenter", function(event){
            event.stopPropagation(); 
            event.preventDefault();
        });
        
        me.$e.on("dragover", function(event){
            event.stopPropagation(); 
            event.preventDefault();
        });
                    
        try
        {
            me.$e.get(0).addEventListener("drop", _handleDrop, false);
        }
        catch(e)
        {
        }
    }
    
    /**
     * 设置控件是否只读
     */
    me.setReadOnly = function(p_readOnly){
    	if (typeof(p_readOnly) == "undefined")
        {
            p_readOnly = true;
        }
    	_enabledControl(true);
        me.readOnly = p_readOnly;
        //设置grid的邮件菜单
        if(me.grid.itemMenu)
        	me.grid.itemMenu.setEnabled(!me.readOnly);
        me.grid.contextMenu = me.readOnly ? null : me.contextMenu;
        //移除拖拽事件
        me.$e.get(0).removeEventListener("drop", _handleDrop, false);
        if(!me.readOnly){
        	me.$e.get(0).addEventListener("drop", _handleDrop, false);
        }
    }
    
    
    base.setEnabled = me.setEnabled;
    /**
     * 设置控件是否可用
     * 
     * @param p_enabled true：可用  false：不可用
     */
    me.setEnabled = function(p_enabled){
    	base.setEnabled(p_enabled);
    	if(typeof (p_enabled) != "undefined"){
    		_enabledControl(p_enabled);
    	}
    }
    
    function _enabledControl(p_enabled){
    	//移除拖拽事件
		me.$e.get(0).removeEventListener("drop", _handleDrop, false);
		var $loadMask = _createLoadingMask();
		if(p_enabled){
			me.$e.get(0).addEventListener("drop", _handleDrop, false);
			$loadMask.hide();
			$loadMask.detach();
			_refreshDisplayStatus();
		}else{
			if(me.$tipContainer)
				me.$tipContainer.hide();
			me.$e.append($loadMask);
			$loadMask.show();
		}
    }
    
    var _$loadingMask = null;
    function _createLoadingMask(){
    	if(_$loadingMask == null){
    		_$loadingMask = $("<div id='loadingMask'></div>");
    		_$loadingMask.css({
    			"position": "absolute",
    			"z-index": 999999,
    			"background": "black",
    			"left": 0,
    			"right": 0,
    			"top": 0,
    			"bottom": 0
    		});
    		_$loadingMask.opacity(0.1);
    		_$loadingMask.hide();
    	}
    	return _$loadingMask;
    }
      
    function _handleDrop(event)
    {
        event.stopPropagation(); 
        event.preventDefault(); 
    	var files = event.dataTransfer.files;
    	var items = event.dataTransfer.items;
    	
    	// 解决【UAP-1196】
    	// 兼容IE10和IE11和Chrome
		if (files.length == 0 || (items && !items[0].webkitGetAsEntry().isFile)) {
			mx.indicate("info", mx.msg("DRAG_FILE_HERE"));
			return;
		}
		
		//兼容非IE和Chrome浏览器
		if (!(!!window.ActiveXObject || "ActiveXObject" in window) && navigator.userAgent.indexOf("Chrome") == -1)
		{
			try {
				var reader = new FileReader();
				reader.onerror = function(e) {
					mx.indicate("info", mx.msg("DRAG_FILE_HERE"));
					return;
				};
				
				reader.onload = function(e) {
					 _appendFiles(files);
				};
				reader.readAsDataURL(files[0]);
			} catch (e) {
				mx.indicate("info", mx.msg("DRAG_FILE_HERE"));
				return;
			}
		}
		else
		{
			 _appendFiles(files);
		}
		
       
    }
    
    function _appendFiles(p_files)
    {
        for (var i = 0; i < p_files.length; i++)
        {
            me.appendItem(p_files[i]);
        }   
    }
    
    function _executeCommand(p_command)
    {
        switch (p_command)
        {
            case "uploadItem":
                if (me.grid.selection != null)
                {
                    var item = me.grid.selection.getValue("uploadItem");
                    if (item != null)
                    {
                        item.upload(true);
                    }
                }
                break;
            case "deleteItem":
                _deleteSelection();
                break;
            case "uploadAll":
                me.uploadAll();
                break;
            case "deleteSelections":
                if (me.displayCheckBox)
                {
                    _deleteSelections();
                }
                else
                {
                    _deleteSelection();
                }
                break;
            case "deleteAll":
            	me.clearItems();
            	break;
        }
    }
    
    function _deleteSelection()
    {
        if (me.grid.selection != null)
        {
            var item = me.grid.selection.getValue("uploadItem");
            
            var msgBox = new mx.windows.MessageBox( {
    	 		reusable : false,
    	 		title : mx.msg("TIPS_BOX"),
    	 		message : mx.msg("CONFIRM_DELETE", [item.name]),
    	 		zIndex : 9999999,
    	 		imgkey : "info"
    	 	});
    		
    		msgBox.show(function(){
    			me.removeItem(item);    
    		});
                    
        }
    }
    
    function _deleteSelections()
    {
        me.removeCheckedItems();
    }
    
    //文件选择改变时的事件处理函数，将触发 {@link mx.controls.DragUploadControl.onselectionchanged} 事件。
    function _onselectionchanged(e)
    {
    	if(me.displayCheckBox){
    		var names = me.grid.getCheckedIDs();
    		if(names && names.length > 0){
    			var items = new Array();
    			for(var i=0;i<names.length;i++){
    				items[i] = me.items[names[i]]
    			}
    			var args = {item: items};
        		me.trigger("selectionchanged", args);
    		}
    	}else{
    		if(me.grid.selection)
        	{
        		var name = me.grid.selection.getValue("id");
        		var args = {item: me.items[name]};
        		me.trigger("selectionchanged", args);
        	}
    	}
    	
    }
    
    // 浏览器不支持html5时下载插件，或者切换到 isAdvance = false 模式
    function _upgrade()
    {
        if($.cookie('showFileUpgrade') == 'ignore' || $.cookie('upgradeWinTip') == 'yes')
        {
            //用户选择过忽略，不再提示。
            return;
        }
        $.cookie('upgradeWinTip', 'yes');
	    var $upgrader = $("<div></div>");
	    var $tip = $("<span id='tip'>" + mx.msg("UPLOAD_UPGRADE_TIP") + "<span>" + mx.msg("UPLOAD_UPGRADE_IGNORE") + "</span></span>");
	    var $upgrade = $("<div id='upgradeBtn'>" + mx.msg("UPGRADE_BTN") + "</div>")
	    
	    $upgrader.addClass("uploadUpgrade");
	    $upgrade.click(function(){
	    	window.open(mx.mappath("~/../mx/resources/chromeframe/default.htm"));
	    });
	    $upgrader.append($tip);
	    $upgrader.append($upgrade);
	    
	    $tip.find("span").click(function(){
	    	_win.close();
	    });
	    
        var _windowManager = null;
	    if (me.getContext() && me.getContext().windowManager)
	    {
            _windowManager = me.getContext().windowManager;
	    }
	    else
	    {
            _windowManager = new mx.windows.WindowManager();
	    }
        
        _win = _windowManager.create(mx.windows.Window,
        {
            title : mx.msg("TITLE"),
            width : 500,
            height : 400,
            resizable : false,
            reusable : true
        });
        
	    _win.$body.append($upgrader)
        _win.on("close", function(){
        	$.cookie('showFileUpgrade', 'ignore');
        	$.cookie('upgradeWinTip', 'no');
        });
        _win.showDialog();
    }
    
    base.dispose = me.dispose;
    /**
	* 释放对象运行时动态生成的内容（属性、方法、事件）。
	*/
    me.dispose = function()
    {
    	me.$tipContainer.find("input").off();
    	me.$tipContainer.off();
    	me.$tipContainer.empty().remove();
    	
    	if (me.grid != null)
    	{
    		me.grid.off();
    		me.grid.dispose();
    	}
    	
    	if (me.items != null)
    	{
    		for (var i = 0; i < me.items.length; i++)
    		{
    			me.items[i].off();
    			me.items[i].dispose();
    		}
    	}
    	
    	if (_$loadingMask != null)
    	{
    		_$loadingMask.empty().remove();
    		_$loadingMask = null;
    		delete _$loadingMask;
    	}
    	
    	base.dispose();
    }
    
    me.endOfClass(arguments); 
    return me;
};

/**
 * 提供一个上传控件（{@link mx.controls.DragUploadControl} 类型）中的上传项的类。
 */
mx.controls.DragUploadItem = function()
{
    var me = $extend(MXComponent);
    var base = {};
    
    /**
     * 获取或设置一个对象，表示要上传的文件。
     */
    me.file = null; 
    
    /**
     * 获取或设置一个字符串，表示文件名。
     */
    me.name = null;
    
    /**
     * 获取或设置一个数字，表示文件大小（单位：字节）。
     */
    me.size = 0;
    
    /**
     * 获取或设置一个字符串，表示文件类型。
     */
    me.type = null;
    
    /**
     * 获取或设置一个字符串，表示文件的上传状态
     * （DragUploadControl.uploadStatus.UNSTART，DragUploadControl.uploadStatus.UPLOADING，DragUploadControl.uploadStatus.COMPLETE，
     * DragUploadControl.uploadStatus.STOP，DragUploadControl.uploadStatus.ERROR）。
     */
    me.status = null;
    
    /**
     * @ignore
     * 获取或设置一个字符串，表示文件路径。
     */
    me.path = null;
    
    /**
     * 获取或设置一个数字，表示上传的进度（如 50，表示上传了 50%）。
     */
    me.progress = 0;
    
    /**
     * 获取一个 {@link mx.io.FileUploader} 对象。
     */
    me.fileUploader = null;
    
    /**
     * 参见 {@link mx.io.FileUploader.params} 字段。
     */
    me.params = null;
    
    /**
     * @ignore
     */
    me.owner = null;
    
    /**
     * 文件上传之前触发该事件。
     */
    me.onuploading = null;

    /**
     * 文件上传之后触发该事件。
     */
    me.onuploaded = null;
    
    /**
     * 文件上传失败触发该事件。
     */
    me.onuploaderror = null;
    
    base.init = me.init;
    me.init = function()
    {
        base.init();
        
        if (me.file != null)
        {
            me.name = me.file.name;
            me.size = me.file.size;
            me.type = me.file.type;            
        }
        
        if (me.fileUploader == null && me.owner.url != null)
        {
            me.fileUploader = new mx.io.FileUploader({
                file: me.file,
                url: me.owner.url,
                onprogresschange: _progresschange,
                onprogresserror: _progresserror,
                onuploadcomplete: _uploadcomplete
            });
        }
        
        if (me.params != null)
        {
            me.setParams(me.params);
        }
        
        if (me.owner != null)
        {
            me.setStatus(me.status);            
        }
    };
    
    
    var _triggerEvent2Upload; //  是否触发 onuploaded ; 
    /**
     * 开始上传文件。
     * 
	 * @param p_triggerEvent
	 *            一个 Boolean 值，表示是否要触发 {@link onuploaded} 事件。如果该值为
	 *            true，则触发事件。
     */
    me.upload = function(p_triggerEvent)
    {
        if (me.fileUploader && me.file && me.status != me.owner.uploadStatus.COMPLETE && me.status != me.owner.uploadStatus.ERROR)
        {
        	me.params.rnd = mx.random()
            var args = {cancel : false, item : me};
            me.trigger("uploading", args);
            if (args.cancel) return;
            me.fileUploader.upload();
            _triggerEvent2Upload = p_triggerEvent;
        }
    };
    
    /**
     * 取消上传文件。
     * @ignore
     */
    me.cancel = function()
    {
        if (me.fileUploader != null)
        {
            me.fileUploader.cancel();
        }
    };
    
    /**
     * 获取文件名。
     */
    me.getName = function()
    {
        return me.name;
    };
    
    /**
     * 获取文件大小。
     */
    me.getSize = function()
    {
        return me.size;
    };
    
    /**
     * 获取文件类型。
     */
    me.getType = function()
    {
        return me.type;
    };
    
    /**
     * @ignore
     * 获取文件路径。
     */
    me.getPath = function()
    {
        return me.path;
    };
    
    /**
     * @ignore
     */
    me.getID = function()
    {
    	var name = me.name.replaceAll(",","*").replaceAll(",","?");//对文件名中的英文逗号和分号进行处理
        return name + me.size;
    };
    
    /**
     * 设置 {@link params} 的值。
     * 
     * @param p_params 文件上传的参数，参考{@link params}
     */
    me.setParams = function(p_params)
    {
        if (me.params != p_params)
        {
            me.params = p_params;            
        }
        me.fileUploader.setParams(me.params);
    };
    
    /**
     * 设置 {@link params} 的值。
     * 
     * @param p_params 文件上传uds参数
     */
    me.setUdsParam = function(p_params)
    {
    	if (me.params == null)
    	{
    		me.params = {};
    	}
    	me.params.udsParam = p_params;
    	if (me.fileUploader && me.fileUploader.params)
    	{
    		var usdParam = JSON.stringify(p_params);
    		me.fileUploader.params.udsParam = usdParam;
    	}
    };
    
    /**
     * 设置 {status} 字段的值。
     * 
     * @param p_status 一个字符串表示文件上传的状态，值的可选值（DragUploadControl.uploadStatus.UNSTART，DragUploadControl.uploadStatus.UPLOADING，DragUploadControl.uploadStatus.COMPLETE，
     * DragUploadControl.uploadStatus.STOP，DragUploadControl.uploadStatus.ERROR）。
     */
    me.setStatus = function(p_status)
    {
        if ($isEmpty(p_status))
        {
            p_status = me.owner.uploadStatus.UNSTART;
        }
        if (p_status != me.status)
        {
            me.status = p_status;
            if (typeof(me.$statusCell) != "undefined")
            {
                me.$statusCell.text(me.status);
            }
        }
    };
    
    /**
     * 设置 {@link progress} 字段的值。
     * 
     * @param p_percentage 一个数字表示上传进度
     */
    me.setProgress = function(p_percentage)
    {
    	if (me.progressBar)
    	{
	        me.progress = p_percentage;
	        me.progressBar.setValue(p_percentage, false);
	        me.$progressSpan.text(p_percentage + "%");
	    }
    };
    
    function _progresschange(e)
    {       
          if (typeof e == "number")
          {
        	  	//等待后续处理完成之后再通过_progresscomplete显示为100%
        	  	if(e == 100)
        	  		e = 99;
        	  	
        	  	me.setProgress(e);
          	    me.setStatus(me.owner.uploadStatus.UPLOADING);
          }
          else
          {
		        var progress = e.event;
		        if (progress.lengthComputable) 
		        {   
		            var percentage = Math.round((progress.loaded * 100) / progress.total); 
		            
		            //等待后续处理完成之后再通过_progresscomplete显示为100%
		            if(percentage == 100)
		            	percentage = 99;
		            
		            me.setProgress(percentage);
		            me.setStatus(me.owner.uploadStatus.UPLOADING);
		        }  
          }       
    }

    function _progresscomplete(e)
    {
        me.setProgress(100);
        me.setStatus(me.owner.uploadStatus.COMPLETE);
    }
    
    function _progresserror(e)
    {
        mx.indicate("error", mx.msg("UPLOAD_ERROR"));
        me.setStatus(me.owner.uploadStatus.ERROR);
    }   
    
    function _uploadcomplete(e)
    {
        if (me.owner != null)
        {
            if (_triggerEvent2Upload == true)
            {
                me.trigger("uploaded");
            }
            
            var ret = e.resultValue;
            var _fileExt = null;
            if(ret.charAt(2) == ":"){
				_fileExt = ret.substring(3,ret.length);
				ret = parseInt(ret.substring(0,2));
			}
            
            me.uploadTypeError = false;
            // 上传失败 -2
            if (ret == -2 || ret == -3 || ret == -4)
            {
            	me.setProgress(0);
                me.setStatus(me.owner.uploadStatus.ERROR);
                // 上传失败 -3 -4 文件类型非法
                if (ret == -3)
                {
                	me.uploadTypeError = true;
                	mx.indicate("info", mx.msg("FILE_TYPE_LIMITED",[_fileExt]));
                	me.owner._markError(true,mx.msg("FILE_TYPE_LIMITED",[_fileExt]),"bottom");
                }else if(ret == -4){
                	me.uploadTypeError = true;
                	mx.indicate("info", mx.msg("FILE_TYPE_ALLOWED",[_fileExt]));
                	me.owner._markError(true,mx.msg("FILE_TYPE_ALLOWED",[_fileExt]),"bottom");
                }else{
                	if(_fileExt)
                	{
                		me.uploadTypeError = true;
                		mx.indicate("error", _fileExt);
                		me.owner._markError(true,_fileExt,"bottom");
                	}
                	else
                	{
                		if(me.owner.uploadErrorMsg)
                    	{
                    		mx.indicate("error", mx.msg("UPLOAD_ERROR") + "，" + me.owner.uploadErrorMsg);
                    	}
                    	else
                    	{
                    		mx.indicate("error", mx.msg("UPLOAD_ERROR"));
                    	}
                	}
                }
                
                me.trigger("uploaderror");
            }
            else
            {
            	_progresscomplete();
            	if($isFunction(me.owner._refreshFileId)) me.owner._refreshFileId();
            	me.owner.grid.deselectAll();
            }
            
            me.owner.trigger("uploadcomplete", { resultValue:e.resultValue });
        }
    }
    
    base.dispose = me.dispose;
    /**
	* 释放对象运行时动态生成的内容（属性、方法、事件）。
	*/
    me.dispose = function()
    {
    	if (me.fileUploader != null && me.fileUploader.dispose)
    	{
    		me.fileUploader.dispose();
    	}
    	
    	base.dispose();
    }
    
    me.endOfClass(arguments); 
    return me;
};
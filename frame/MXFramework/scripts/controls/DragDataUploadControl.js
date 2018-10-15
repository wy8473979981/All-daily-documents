$ns("mx.controls");

$import("mx.controls.DragUploadControl");
$import("mx.controls.Slideshow");

/**
 * 提供一个拖拽上传文件的控件。浏览器仅支持 IE10、FireFox、Chrome。
 * 
 * @example 以下是一个拖拽上传控件如何初始化的示例。
 * <code language="JavaScript">
 * var dragDataUploadControl = new mx.controls.DragDataUploadControl({
 *   	baseUrl :mx.mappath("~/../mx/servlets/fileUpload"),
 *   	filePath : "D:/uploadfile/newpath/",
 *	    width: 500,
 *	    height: 300
 *   });
 * </code>
 * 
 * @example 以下是一个拖拽上传文件控件如何初始化的示例，其中文件作为一张表的一个字段。
 * <code language="JavaScript">
 *  var dragDataUploadControl = new mx.controls.DragDataUploadControl({
 *   	baseUrl :mx.mappath("~/../mx/servlets/dataFileUpload"),
 *   	filePath : "D:/uploadfile/newpath/",
 *      tableName : "T_GOODS",
 *      primaryKey : "id",
 *      pkVal : "402894263e440be8013e44497529000c",
 *      colName : "IMG",
 *      uploadMode : "file",
 *   	width: 500,
 *   	height: 300
 *   });
 * </code>
 */
mx.controls.DragDataUploadControl = function()
{
    var me = $extend(mx.controls.DragUploadControl);
    var base = {};
    
    /**
     * 获取一个字符串，表示当前已上传及未上传的的文件名，多个文件名用分号分隔。 上传新文件或删除文件后，此字段更新。
     */
    me.fileNames = "";
    
    /**
     * 获取或设置一个字符串，表示后台服务所在路径。MX 框架提供两个服务路径可供选择。
     * mx.mappath("~/../mx/servlets/fileUpload") 供管理指定目录下的文件时使用，
     * mx.mappath("~/../mx/servlets/dataFileUpload") 供管理表单、表格对应的数据附件时使用。
     * 用户可以根据需要使用自己的服务路径。
     * url属性无效，已baseUrl为准
     * 
     * @default mx.mappath("~/../mx/servlets/fileUpload")
     */
    me.baseUrl = mx.mappath("~/../mx/servlets/fileUpload");
    
    /**
     * 参见 {@link mx.io.FileUploader.params} 字段。
     */
    me.params = null;
    
    /**
     * 设置或获取一个字符串，表示上传控件所属数据的表名。 当控件类型为 form 时，此属性有值。
     */
    me.tableName = "";

    /**
     * 设置或获取一个字符串，表示上传控件所属数据表的主键列名。 当控件类型为 form 时，此属性有值。
     */
    me.primaryKey = "";

    /**
     * 设置或获取一个字符串，表示上传控件所属数据的主键值。 当控件类型为 form 时，此属性有意义；若此时此属性没有值，控件不会响应点击事件。
     */
    me.pkVal = "";

    /**
     * 设置或获取一个字符串，表示上传控件在存储表单数据的表中对应的列名。 当控件类型为 form 时，此属性有值。
     */
    me.colName = "";

    /**
     * 设置或获取一个字符串，表示保存文件的方式。 当控件类型为 form 时，此属性有意义。
     * <p>
     * 该字段可选的值包括：
     * <ul>
     * <li><b>file</b></li>
     * <li><b>blob</b></li>
     * <li><b>uds</b></li>
     * <li><b>ftp</b></li>
     * </ul>
     * </p>
     */
    me.uploadMode = "";
    
    /**
     * 设置或获取ftp账号等信息，账号信息是格式为：主机;端口;用户名;密码的字符串经过加密。 当uploadMode为 ftp 时，此属性有意义。
     */
    me.ftpSecurity = null;
    
    /**
     * 设置或获取一个字符串，表示上传文件在服务器上的保存路径。
     */
    me.filePath = null;
    
    /**
     * 获取或设置一个 Boolean 值，表示是否显示工具栏。请在初始化之前设置该字段的值。
     * 
     * @default false
     */
    me.displayToolBar = false;
        
    /**
     * 获取一个 {@link mx.controls.ToolBar} 对象，表示上传控件的工具栏。请使用 {@link setToolBar} 方法设置该字段的值。
     */
    me.toolBar = null;
    
    /**
     * 指示列是否虚拟，如果列是虚拟的话，将不会执行业务表的逻辑
     * 
     * @default false
     */
    me.isVirtual = false;
    
    /**
     * 当控件点击关闭按钮时，将触发该事件。调用 {@link close}方法后会触发该事件。
     */
    me.onclosed = null;
    
    var _split = null;
    
    var _toolBarHeight = 25;
    var _cssTop = 25;
    
    base.init = me.init;
    me.init = function()
    {
        base.init();
        if (me.displayToolBar)
        {
        	me.$e.resize(_$e_onResize);
        	if (me.toolBar)
        	{
        		me.setToolBar(me.toolBar);
        	}
        	else
        	{
        		me.setToolBar(_getTool());
        	}
        }
        me.url = me.baseUrl;
        
        if(me.params == null){
        	me.params = {};
        }
        
        me.params.option = "upload";
        if (me.filePath)
        {
        	me.params.filePath = me.filePath;
        }
        me.params.tableName = me.tableName;
        me.params.primaryKey = me.primaryKey;
        me.params.pkVal = me.pkVal;
        me.params.colName = me.colName;
        me.params.uploadMode = me.uploadMode;
        me.params.ftpSecurity = me.ftpSecurity;
        me.params.isVirtual = me.isVirtual;
        me.grid.on("selectionchanged", _showItemMenu);
        me.grid.on("itemchecked", _showItemMenu);
        // 获取已经上传的文件信息。
        var fileList = _getUploadedFiles();
        for (var i = 0; i < fileList.length; i++) {
            me.appendItem({name : fileList[i].attName, fileId: fileList[i].fileId, size : fileList[i].attSize, status : me.uploadStatus.COMPLETE});
        }
        me.grid.on("load",function(e){
            for (var i = 0; i < me.items.length; i++) {
                me.items[i].setProgress(100);
            }
        });
        
        _appendPreviewColumn();
        if(me.readOnly){
        	me.setReadOnly(me.readOnly);
        }
    };
    
    /**
     * 动态调整grid的大小
     */
    function _$e_onResize(){
    	if(me.displayToolBar && me.grid){
    		var containerHeight = me.$e.outerHeight();
    		var gridHeight = containerHeight - _toolBarHeight;
    		if(me.grid)
    			me.grid.$e.css({height: gridHeight});
    		if(me.$tipContainer)
	    		//设置提示容器距离顶部的高度 25 + 16
	        	me.$tipContainer.css({top: (_toolBarHeight + _cssTop) + "px"});
    	}else{
    		if(me.grid)
    			me.grid.$e.css({height: "100%"});
    		if(me.$tipContainer)
    			me.$tipContainer.css({top: _cssTop + "px"});
    	}
    }
    
    /**
     * @ignore
     * 请参见 {mx.editors.FileEditor.refreshPk} 。
     */
    me.refreshPk = function(p_items, p_pkColName)
    {
        if ($isArray(p_items) && p_items.length > 0){
            var replaceValues = "";
            for(var i = 0; i < p_items.length; i++){
                if($notEmpty(p_items[i].mxVirtualId)){
                    replaceValues = replaceValues + p_items[i].mxVirtualId + ":" + p_items[i][p_pkColName] + ";";
                }
            }
            var pathParam = me.filePath ? ("&filePath=" + me.filePath) : "";
            var ftpSecurityParam = me.ftpSecurity ? ("&ftpSecurity=" + me.ftpSecurity) : "";
            var xmlHttp = _createXMLHttpRequest();
            xmlHttp.open("POST", me.baseUrl, false);
            xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
            xmlHttp.send("option=refreshPk&tableName=" + me.tableName + pathParam + "&uploadMode="
                + me.uploadMode + ftpSecurityParam + "&replaceValues=" + replaceValues 
            		+ "&rnd=" + mx.random());
            
            if (xmlHttp.status == 200 && xmlHttp.responseText) {
                return "success";
            } else {
                throw "error";
            }
        }
    };
    
    /**
     * 提供一个方法，下载指定的文件。
     * 
     * @overload function()
     * @overload function(p_fileName)
     * 
     * @param p_fileName  
     *            要下载的文件名。  如果文件名称，则会下载选中的文件
     */
    me.download = function(p_fileName)
    {
    	if(typeof(p_fileName) == "string")
    	{
    		if (p_fileName.endsWith(";"))
            {
                p_fileName = p_fileName.substring(0, p_fileName.length - 1);
            }
	        var codedName = p_fileName.replace(/\+/g,"%2B").replace(/\#/g,"%23");
	        var pathParam = me.filePath ? ("&filePath=" + me.filePath) : "";
	        var ftpSecurityParam = me.ftpSecurity ? ("&ftpSecurity=" + me.ftpSecurity) : "";
	        window.open(encodeURI(encodeURI(me.baseUrl + "?option=download&tableName=" + me.tableName + "&pkVal=" 
	        		+ me.pkVal + "&colName=" + me.colName + "&fileName=" + codedName + "&uploadMode="
	        		+ me.uploadMode + ftpSecurityParam + pathParam + "&rnd=" + mx.random())));

    	}else{
    		if(me.displayCheckBox){
	    		var IDs = me.grid.getCheckedIDs();
	            if(IDs.length <= 0){
	            	mx.indicate("info",mx.msg("SELECT_ONE_ITEM"));
	            	return ;
	            }
	            p_fileName='';
	            for (var i = 0; i < IDs.length; i++)
	        	{
	            	p_fileName=me.items[IDs[i]].name;
	            	var codedName = p_fileName.replace(/\+/g,"%2B").replace(/\#/g,"%23");
	            	var pathParam = me.filePath ? ("&filePath=" + me.filePath) : "";
	            	var ftpSecurityParam = me.ftpSecurity ? ("&ftpSecurity=" + me.ftpSecurity) : "";
	     	       window.open(encodeURI(encodeURI(me.baseUrl + "?option=download&tableName=" + me.tableName + "&pkVal=" 
	     	    		   + me.pkVal + "&colName=" + me.colName + "&fileName=" + codedName + "&uploadMode="
	     	               + me.uploadMode + ftpSecurityParam + pathParam + "&rnd=" + mx.random())));
	        	}
	    	}else{
	    		var item = me.grid.selection.getValue("uploadItem");
	    		p_fileName = item.name;
	    		var codedName = p_fileName.replace(/\+/g,"%2B").replace(/\#/g,"%23");
	    		var pathParam = me.filePath ? ("&filePath=" + me.filePath) : "";
	    		var ftpSecurityParam = me.ftpSecurity ? ("&ftpSecurity=" + me.ftpSecurity) : "";
	    		window.open(encodeURI(encodeURI(me.baseUrl + "?option=download&tableName=" + me.tableName + "&pkVal=" 
	    				+ me.pkVal + "&colName=" + me.colName + "&fileName=" + codedName + "&uploadMode="
	    				+ me.uploadMode + ftpSecurityParam + pathParam + "&rnd=" + mx.random())));
	    	}
    	}
    };
    
    function _downloadFile(){
    	if(me.displayCheckBox){
    		var IDs = me.grid.getCheckedIDs();
            if(IDs.length <= 0){
            	mx.indicate("info",mx.msg("SELECT_ONE_ITEM"));
            }else{
            	me.download();
            }
    	}else{
    		if(me.grid.selection != null){
        		var item = me.grid.selection.getValue("uploadItem");
        		if(item.status == me.uploadStatus.COMPLETE){
        			me.download();
        		}
        	}else{
        		mx.indicate("info",mx.msg("SELECT_ONE_ITEM"));
        	}
    	}
    }
    
    /**
     * @ignore
     * 请参见 {mx.controls.DragUploadControl.appendItem} 。
     */
    base.appendItem = me.appendItem;
    me.appendItem = function(p_item)
    {
        var newItem = base.appendItem(p_item);
        if (newItem && newItem.name)
        {
        	me.fileNames = me.fileNames + newItem.name + ";";
        }
        return newItem;
    };
    
    /**
     * 请参见 {mx.controls.DragUploadControl.removeItem} 。
     */
    base.removeItem = me.removeItem;
    me.removeItem = function(p_item)
    {
    	if (typeof (p_item) == "number")
        {
            p_item = me.items[p_item];
        }
        
	    var codedName = encodeURIComponent(p_item.name);
        var xmlHttp = _createXMLHttpRequest();
        var pathParam = me.filePath ? ("&filePath=" + me.filePath) : "";
        var ftpSecurityParam = me.ftpSecurity ? ("&ftpSecurity=" + me.ftpSecurity) : "";
        xmlHttp.open("POST", me.baseUrl, false);
        xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        xmlHttp.send("option=delete&tableName=" + me.tableName + "&primaryKey=" + me.primaryKey + pathParam
        		+ "&pkVal=" + me.pkVal + "&colName=" + me.colName + "&fileName=" + codedName + "&uploadMode="
                + me.uploadMode+ftpSecurityParam+"&isVirtual="+me.isVirtual + "&rnd=" + mx.random());
        // 删除幻灯片中图片
        _slideshowItem.remove(_slideshowItem[p_item.name]);
    	delete _slideshowItem[p_item.name];
        // 在页面上删除。
        if (xmlHttp.status == 200 && xmlHttp.responseText) {
            if ($notEmpty(xmlHttp.responseText)) {
                base.removeItem(p_item);
            }
            //更新文件名。
            var fileArray = me.fileNames.split(";");
            for ( var i = 0; i < fileArray.length; i++)
            {
                if (fileArray[i] == p_item.name)
                {
                    fileArray.remove(fileArray[i]);
                    break;
                }
            }
            var nowNames = "";
            for ( var i = 0; i < fileArray.length; i++)
            {
                if ($notEmpty(fileArray[i]))
                {
                    nowNames = nowNames + fileArray[i] + ";";
                }
            }
            me.fileNames = nowNames;
        
        } else {
            throw "error";
        }
    };
    
	/**
	 * 设置 {@link toolBar} 字段的值。
	 * 
	 * @param p_toolBar 一个 {@link mx.controls.ToolBar} 对象，表示上传控件的工具栏。displayToolBar 为 true 可以使用此方法。
	 */
    me.setToolBar = function(p_toolBar)
    {
    	if (me.displayToolBar && p_toolBar && $instanceOf(p_toolBar,mx.controls.ToolBar))
    	{
    		if (me.toolBar)
    		{
    			me.toolBar.$e.remove();	
    		}
    		me.toolBar = p_toolBar;
    		me.$e.prepend(me.toolBar.$e);
    	}
    }
    
    base.setReadOnly = me.setReadOnly;
    me.setReadOnly = function(p_readOnly){
    	base.setReadOnly(p_readOnly);
    	//设置grid的邮件菜单
        if(me.grid.itemMenu)
        	me.grid.itemMenu.setEnabled(true);
        if(me.grid.contextMenu)
        	me.grid.contextMenu.setEnabled(true);
    	//去除选中状态
    	me.grid.deselectAll(false);
    	if(me.displayToolBar && me.toolBar){
    		$(me.toolBar.items).each(function(){
    			if(this.name != "close" && !this.isSeparator){
    				this.setEnabled(!me.readOnly);
    			}
    		});
    	}
    }
    
    /**
     * 提供一个方法，删除选中项文件。
     */
    me.removeSelection = function()
    {
    	if(me.displayCheckBox){
    		var IDs = me.grid.getCheckedIDs();
            if(IDs.length <= 0){
            	mx.indicate("info",mx.msg("UPLOAD_FILE_REMOVE"));
            	return ;
            }
            
            var _message = "";
            if (me.grid.getCheckedItems().length == me.grid.items.length)
            {
            	_message = mx.msg("CONFIRM_DELETE_ALL");
            }
            else
            {
            	var selectName='';
                for (var i = 0; i < IDs.length; i++)
             	{
                 	selectName = selectName + me.items[IDs[i]].name + '，';
             	}
                if(selectName != '')
                {
                 	selectName = selectName.substring(0, selectName.length - 1);
                }
            	_message = mx.msg("CONFIRM_DELETE",[selectName]);
            }
            	
            var msgBox = new mx.windows.MessageBox( {
				reusable : false,
				title : mx.msg("TIPS_BOX"),
				message : _message,
				zIndex : 9999999,
				imgkey : "info"
			});
            msgBox.show(function(){
            	for (var i = 0; i < IDs.length; i++)
            	{
            		me.removeItem(me.items[IDs[i]]);
            		me._changeErrorState();
            	}
            });
    	}else{
    		if (me.grid.selection != null)
    		{
    			var fileName = "";
    			var item = me.grid.selection.getValue("uploadItem");
    			if (typeof (item) == "number")
    			{
    				fileName = me.items[item].name;
    			}
    			else
    			{
    				fileName = item.name;
    			}
    			
    			var msgBox = new mx.windows.MessageBox( {
    				reusable : false,
    				title : mx.msg("TIPS_BOX"),
    				message : mx.msg("CONFIRM_DELETE", [fileName]),
    				zIndex : 9999999,
    				imgkey : "info"
    			});
    			
    			msgBox.show(function(){
    				me.removeItem(item);
    				me._changeErrorState();
    			});
    		}
    		else
    		{
    			mx.indicate("info", mx.msg("SELECT_ONE_ITEM"));
    		}
    	}
    }
    
   /**
    * 提供一个方法，获取上传控件上传成功的文件名字。多个文件名用 “;” 分隔
    */ 
    me.getUploadedNames = function()
    {
    	var _fileList = [];
    	var _fileList = _getUploadedFiles();
    	var fileNames = "";
        for (var i = 0; i < _fileList.length; i++) {
            fileNames += _fileList[i].attName + ";";
        }
        return fileNames;
    }
    
    /**
     * @ignore
     */
    me.close = function()
    {
    	var uploadStatus = 0;
    	$(me.items).each(function(){
    		if(this.status != me.uploadStatus.COMPLETE){
    			uploadStatus ++ ;
    		}
    	});
    	if(uploadStatus > 0){
	    	var __msgBox = new mx.windows.MessageBox( {
		 		reusable : false,
		 		title : mx.msg("TIPS_BOX"),
		 		message : mx.msg("CONFIRM_CLOSE"),
		 		zIndex : 9999999,
		 		imgkey : "info"
		 	});
			
			__msgBox.show(function(){
				me.trigger("closed");
			});
    	}else{
    		me.trigger("closed");
    	}
    	
    }
    
    /**
     * @ignore
     */
    me.preview = function(p_item, p_getURI)
    {
		// 提供一个方法，预览指定文件名的图像文件。p_getURI == true 只获取uri
        var item = p_item.getValue("uploadItem");
    	var fileName = p_item.getValue("name");
        if (item.status == me.uploadStatus.COMPLETE)
        {
        	var codedName = fileName.replace(/\+/g,"%2B").replace(/\#/g,"%23");
        	var pathParam = me.filePath ? ("&filePath=" + me.filePath) : "";
        	var ftpSecurityParam = me.ftpSecurity ? ("&ftpSecurity=" + me.ftpSecurity) : "";
	    	uri = encodeURI(encodeURI(me.baseUrl + "?option=download&tableName=" + me.tableName + "&pkVal=" 
	    			+ me.pkVal + "&colName=" + me.colName + "&fileName=" + codedName + "&uploadMode="
	                + me.uploadMode + ftpSecurityParam + pathParam));
	        if(p_getURI === true)
	        {
	        	var _sItem = {src:uri};
	        	_slideshowItem.add(_sItem);
	        	_slideshowItem[codedName] = _sItem;
	        	return;
	        }
            $img = $("<img src='" + uri + "'/>");
            _previewImg($img);
        }
        else if (item.status == me.uploadStatus.UNSTART)
        {
        	var reader = new FileReader();
        	var htmlImage = null;
			reader.onload = function(e)
			{
				if(p_getURI === true)
				{
					var _sItem = {src:e.target.result};
		        	_slideshowItem.add(_sItem);
		        	_slideshowItem[item.name] = _sItem;
					return;
				}
			    htmlImage = '<img src="'+ e.target.result +'" />';
			    _previewImg($(htmlImage));
			}
			reader.readAsDataURL(item.file);
        }
    }
    
    var _slideshowItem = [];
    var _shlider = null;
    function _slideshow(p_startIndex)
    {
		_shlider = null;
		_shlider = new mx.controls.Slideshow({
	 		auto:true,
	 		direction: "toRight",
	 		items:$clone(_slideshowItem)
 		});
		_shlider.show(p_startIndex);
    }
    
    function _appendPreviewColumn()
    {
    	var preCol = me.grid.appendColumn("picpreview", mx.msg("UPLOAD_PREVIEW"), "75", "center");
    	preCol.renderCell = previewColumn_renderCell;
		me.grid.load();
    }
    
    function previewColumn_renderCell(p_item, $p_cell)
    {
    	var $imgpreview = $("<img/>");
    	
    	var fileName = p_item.getValue("name");
    	if(".jpg,.jpeg,.gif,.png,.bmp,.tiff".indexOf(fileName.substring(fileName.lastIndexOf(".")).toLowerCase()) > -1)
    	{
    		// 放入幻灯片模式
    		me.preview(p_item, true);
    		
	    	$imgpreview.click(function(){
				me.preview(p_item);
	    	});
	    	$imgpreview.attr("src", mx.mappath("$theme/images/fileupload/preview.png"));
	    	$imgpreview[0].title = mx.msg("UPLOAD_PREVIEW");
	    	$imgpreview.css("cursor","pointer");
    	}
    	else
    	{
    		$imgpreview.attr("src", mx.mappath("$theme/images/fileupload/preview2.png"));
	    	$imgpreview[0].title = mx.msg("PREVIEW_NOT_SUPPORT");
    	}
    	$p_cell.append($imgpreview);
    }
    
    function _getTool()
    {
    	var items = [{ name: "add", text: mx.msg("UPLOAD_BTN_ADD"), toolTip: mx.msg("UPLOAD_BTN_ADD"), imageUrl : mx.mappath("$theme/images/fileupload/add.gif"), onclick: _openInput},
                "-",
                { name: "upload", text: mx.msg("UPLOAD"), toolTip: mx.msg("UPLOAD"), imageUrl : mx.mappath("$theme/images/fileupload/upload.gif"), onclick: me.uploadAll},
                "-",
                { name: "remove", text: mx.msg("UPLOAD_REMOVE"), toolTip: mx.msg("UPLOAD_REMOVE"), imageUrl : mx.mappath("$theme/images/fileupload/cut.png"), onclick: me.removeSelection},
                "-",
                { name: "clear", text: mx.msg("UPLOAD_BTN_CLEAN"), toolTip: mx.msg("UPLOAD_BTN_CLEAN"), imageUrl : mx.mappath("$theme/images/fileupload/delete.gif"), onclick: me.clearItems},
                "-",
                { name: "download", text: mx.msg("DOWNLOAD"), toolTip: mx.msg("DOWNLOAD"), imageUrl : mx.mappath("$theme/images/fileupload/download.gif"),enabled:false, onclick: _downloadFile}
            ];
    	if (me.context)
    	{
    		items = items.concat(["-", { name: "close", text: mx.msg("UPLOAD_BTN_CLOSE"), toolTip: mx.msg("UPLOAD_BTN_CLOSE"), imageUrl : mx.mappath("$theme/images/fileupload/close.png"), onclick: me.close}]);
    	}
    	return new mx.controls.ToolBar({items: items});
    };
    
    // 显示菜单
    function _showItemMenu()
    {
    	var downloadToolItem = null;
    	if(me.displayToolBar && me.toolBar){
    		downloadToolItem = me.toolBar.getItemByName("download");
    	}
    	if(downloadToolItem)
			downloadToolItem.setEnabled(false);
    	if(me.grid.itemMenu){
    		me.grid.itemMenu.clearItems();
    		if(!me.displayCheckBox){
	    		if(me.grid.selection){
	    			var item = me.grid.selection.getValue("uploadItem");
	        		// 如果选中项已经上传
	            	if(item.status == me.uploadStatus.COMPLETE)
	            	{	
	            		// 下载
	            		me.grid.itemMenu.appendItem("downloadItem", mx.msg("DOWNLOAD"));
	                    me.grid.itemMenu.getItemByName("downloadItem").on("click", me.download);
	                    if(downloadToolItem)
	            			downloadToolItem.setEnabled(true);
	            	}
	            	// 如果选中项未上传
	            	else if(item.status == me.uploadStatus.UNSTART && !me.readOnly)
	            	{
	            		// 上传
	            		me.grid.itemMenu.appendItem("uploadItem", mx.msg("UPLOAD"));
	            	}
	            	if(!me.readOnly){
	            		// 删除
	                	me.grid.itemMenu.appendItem("deleteItem", mx.msg("DELETE"));
	            	}
	    		}
    		}else{
    			var items = me.grid.getCheckedItems();
    			if(items && items.length > 0){
    				// 下载
            		me.grid.itemMenu.appendItem("downloadItem", mx.msg("DOWNLOAD"));
                    me.grid.itemMenu.getItemByName("downloadItem").on("click", me.download);
                    if(downloadToolItem)
            			downloadToolItem.setEnabled(true);
    			}
    			
    		}
            
    	}
    };
    
    function _getUploadedFiles()
    {
    	var fileList = [];
    	// 获取已经上传的文件信息。
        var xmlHttp = _createXMLHttpRequest();
        xmlHttp.open("POST", me.baseUrl, false);
        var pathParam = me.filePath ? ("&filePath=" + me.filePath) : "";
        var ftpSecurityParam = me.ftpSecurity ? ("&ftpSecurity=" + me.ftpSecurity) : "";
        xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        xmlHttp.send("option=getFile&tableName=" + me.tableName + "&pkVal=" + me.pkVal + "&colName=" + me.colName + "&uploadMode=" 
        		+ me.uploadMode + ftpSecurityParam + pathParam + "&rnd=" + mx.random());
        if (xmlHttp.status == 200) {
            if ($notEmpty(xmlHttp.responseText)) 
            {
            	try
            	{
	                //获取已经上传的文件列表。
            		fileList = $.parseJSON(xmlHttp.responseText);
	                //fileList = eval('(' + xmlHttp.responseText + ')');  
            	}
            	catch(e)
            	{
            	}
            }
        } else {
        }
        return fileList;
    }

    /**
     * @ignore
     */
    me._refreshFileId = function()
    {
    	// 上传成功之后，对item进行处理，加上fileId
        var fileList = _getUploadedFiles();
    	fileList = fileList || [];
    	
    	for (var j = 0; j < me.items.length; j++)
    	{
    		var item = me.items[j];
    		for (var i = 0; i < fileList.length; i++)
    		{
    			if(fileList[i].attName == item.name)
    			{
    				item["fileId"] = fileList[i]["fileId"]; 
    			}
    		}
    	}
    }
    
    function _previewImg($img)
    {
    	if ($img)
    	{
			var _$previewMask = $("<div class='previewMask mx'/>");
			var $maskTable = $("<table id='maskTable' cellspacing=0; border=0;><tr><td align=center></td></tr></table>");
			
	    	var $preview = $("<div class='preview'/>");
	    	var $content = $("<div id='content'/>");
	    	var $btnClose = $("<div id='btnClose'/>");
	    	var $table = $("<table cellspacing=0; border=0; align=center><tr><td align=center></td></tr></table>");
	    	
	    	if(_slideshowItem.length > 1)
	    	{
		    	var $slider = $("<div id='slider'></div>");
		    	$slider[0].title = mx.msg("SLIDESHOW_MODE");
		    	$slider.on("click",_slideshow);
	    	}
	    	
	    	$btnClose.click(function(){_$previewMask.detach();});
	    	$table.find("td").append($img);
	    	$content.append($table);
	    	$preview.append($content);
	    	$preview.append($btnClose);
	    	$preview.append($slider);
	    	
	    	$maskTable.find("td").append($preview);
	    	_$previewMask.append($maskTable);
	    	$(document.body).append(_$previewMask);
	    	_$previewMask.on("click",function(e){
	    		e.stopPropagation();
	    	});
    	}
    }
    
    function _openInput(){
        me.$tipContainer.find("input").get(0).click();
    };
    
    
    function _createXMLHttpRequest(){
        var xmlHttp = null;
        if (window.ActiveXObject) {
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        } else if (window.XMLHttpRequest) {
            xmlHttp = new XMLHttpRequest();
        };
        return xmlHttp;
    };
    
    base.dispose = me.dispose;
    /**
	* 释放对象运行时动态生成的内容（属性、方法、事件）。
	*/
    me.dispose = function()
    {
    	$(document.body).find(".previewMask div").off();
    	if (me.toolBar != null)
    	{
    		me.toolBar.dispose();
    	}
    	
   		delete _slideshowItem;
   		delete _shlider;
    
    	base.dispose();
    }
    
    me.endOfClass(arguments); 
    return me;
};
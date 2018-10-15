// v.1.6 build 9757
/*
 * Copyright DHTMLX LTD. http://www.dhtmlx.com You allowed to use this component
 * or parts of it under GPL terms To use it on other terms or get Professional
 * edition of the component please contact us at sales@dhtmlx.com
 */
var dhtmlXVaultObject = function() {
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
    this.ftpSecurity = null;
    this.limitTypes = "";
    this.allowTypes = "";
    this.isVirtual = false;
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
		btnClose : mx.msg("UPLOAD_BTN_CLOSE")
	};
	this.strings.errors = {
		"TooBig" : "File is too big ({0};bytes).\nMax allowed size is {1}.",
		"PostSize" : "Undefined server error. Possible issues:\n- Unicode file name incorrectly processed by the server;\n- File size is bigger than server's post-request limit ({0})."
	};
	this.filesLimit = 0;
	this.fileList = {};
	this.items = [];
	this.uploadedCount = 0;
	this.progressDemo = null;
	this.inpMAX_FILE_SIZE = null;
	this.MAX_FILE_SIZE = 900 * 1024 * 1024;
	this.inpUPLOAD_IDENTIFIER = null;
	this.uploadErrorMsg = null;
	// 记录已经上传的文件名称，分号分隔。
	this.owner = null;
};
dhtmlXVaultObject.prototype.setBaseUrl = function(p_url) {
    this.baseUrl = p_url;
};
dhtmlXVaultObject.prototype.setImagePath = function(newPath) {
	this.imPath = newPath;
	this.preLoadImages();
};
dhtmlXVaultObject.prototype.create = function(uploadEditor) {
    this.owner = uploadEditor;
    this.type = uploadEditor.type;
    this.ftpSecurity = uploadEditor.ftpSecurity;
    this.setFilesLimit(uploadEditor.filesLimit);
    this.limitTypes = uploadEditor.limitTypes;
    this.allowTypes = uploadEditor.allowTypes;
    this.filePath = uploadEditor.filePath;
    this.maxSize = uploadEditor.maxSize;
    this.uploadErrorMsg = uploadEditor.uploadErrorMsg;
    //所有上传文件的总共大小
    this.totalMaxSize = uploadEditor.totalMaxSize;
    if (this.IE && (this.maxSize != -1 || this.totalMaxSize != -1)) {
    	if(!dhtmlXVaultObject.fso){
    		try{
    			dhtmlXVaultObject.fso = new ActiveXObject("Scripting.FileSystemObject");  
    		}catch(e){}
    	}
    }
    this.isVirtual = uploadEditor.isVirtual;
    if(this.type != "path"){
        this.tableName = uploadEditor.tableName;
        this.primaryKey = uploadEditor.primaryKey;
        this.pkVal = uploadEditor.pkVal;
        this.colName = uploadEditor.colName;
    }
    this.uploadMode = uploadEditor.uploadMode;
	this.ftpSecurity = uploadEditor.ftpSecurity;
    
    var p_listHeight = parseInt(uploadEditor.height) - 32;
    this.parentObject = uploadEditor.$e[0];
	this.parentObject.style.position = "relative";
	try {
		this.parentObject
				.appendChild("<iframe src='about:blank' id='dhtmlxVaultUploadFrame' name='dhtmlxVaultUploadFrame' style='display:none;position:absolute;left:-1000px;width:1px;height:1px'></iframe>");
	} catch (e) {
	}
	this.containerDiv = document.createElement("div");
	this.containerDiv.className = "dhxvlt_panel2border";
	this.containerDiv.style.cssText = "position:absolute;overflow-y:auto;height:"
			+ (p_listHeight - 10)
			+ "px;background-color:#FFFFFF;margin-top:10px;margin-left:10px;z-index:1;width:412px";
	this.parentObject.appendChild(this.containerDiv);
	this.container = document.createElement("div");
	this.container.className = "dhxvlt_panelbg dhxvlt_panelborder";
	this.container.style.position = "absolute";
	
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
	this.container.innerHTML = "<table border='0' width='435px'>"
			+ "<tr><td style='width:416px' colspan='3' align='center' id='cellContainer'>"
			+ "<div style='height:"
			+ p_listHeight
			+ "px'></div>"
			+ "</td></tr>"
			+ "<tr id='_btns'><td style='width:78px;height:32px;padding-left: 8px' align='left'>"
			+

			"<div class='dhxvlt_lbtn'><span class='dhxvlt_lbtn1'></span><span class='dhxvlt_lbtn2'><nobr id='_add_file'><img src='"
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
			/* 清空*/
			+ "<td style='width:138px;height:32px;padding-right: " + clearPadding + ";' align='right'>"
			+ "<div class='dhxvlt_rbtn'><span class='dhxvlt_rbtn3'></span><span class='dhxvlt_rbtn2' id='_clear_file'><nobr><img src='"
			+ this.imPath
			+ "clean.gif'/>"
			+ this.strings.btnClean
			+ "</nobr></span><span class='dhxvlt_rbtn1'></span></div></td>"
			/* 关闭*/
			+ closeBtnHTML
			+ "</tr></table>";
	this.parentObject.appendChild(this.container);
	var self = this;
	this.container.childNodes[0].rows[1].cells[1].childNodes[0].onclick = function() {
		self.uploadAllItems()
	};
	this.container.childNodes[0].rows[1].cells[2].childNodes[0].onclick = function() {
		self.removeAllItems();
		self.changeErrorState();
	};
	if (uploadEditor.context){
		this.container.childNodes[0].rows[1].cells[3].childNodes[0].onclick = function() {
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
	
	this.currentFile.onchange = function(e){self._file_change(this)};
	
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
	this.tblProgressBar = this.createProgressBar();
	this.percentPanel = this.createPercentPanel();
	this.containerDiv.appendChild(this.percentPanel);
	this.progressDemo = this.createProgressDemo();
	// 获取已经上传的文件信息。
	var _fileList = this.getUploadedFiles();
    //设置文件名，供数据组件显示。
    this.owner.fileNames = "";
    for (var i = 0; i < _fileList.length; i++) {
    	self.addFile(_fileList[i].attName,false,_fileList[i].attSize);
        this.owner.fileNames = this.owner.fileNames + _fileList[i].attName + ";";
    }
};

dhtmlXVaultObject.prototype._file_change = function(p_target){
	var self = this ;
	if (window.navigator.userAgent.indexOf("MSIE") > -1){ 
		p_target.select(); 
    	
		document.getElementById("_fileSelectionHiddenArea").focus();
        var fullPath = document.selection.createRange().text; 
        fullPath = fullPath.replace("&","&amp;").replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g, "&quot;").replace(/'/g, "&#039;").replace(/javascript/gi, "");
        
        if (self.IE && ($.browser.version == "9.0" || $.browser.version == "8.0" || $.browser.version == "7.0" || $.browser.version == "6.0")){
    		if (dhtmlXVaultObject.fso){
    			var fileSize = dhtmlXVaultObject.fso.GetFile(fullPath).size;
    		} else {
    			var fileSize = false;
    		}
        }
    }
	
	var isAdded = self.addFile(fullPath, true, fileSize);
	if(!isAdded)
		self._cloneFile(p_target);
}

dhtmlXVaultObject.prototype._cloneFile = function(file){
	var self = this;
	var file = $(file);
    var fileClone = file.clone().val("");
    fileClone.on("change", function(){self._file_change(fileClone.get(0))});
    this.currentFile = fileClone[0];
    file.after(fileClone);
    file.remove();
}

dhtmlXVaultObject.prototype.createXMLHttpRequest = function() {
	var xmlHttp = null;
	if (window.ActiveXObject) {
		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP")
	} else if (window.XMLHttpRequest) {
		xmlHttp = new XMLHttpRequest()
	};
	return xmlHttp
};
dhtmlXVaultObject.prototype.getFileName = function(path) {
	var arr = path.split("\\");
	path = arr[arr.length - 1];
	arr = path.split("/");
	return arr[arr.length - 1];
};

dhtmlXVaultObject.prototype.getFileType = function(path) {
    var arr = path.split(".");
    return arr[arr.length - 1].toLowerCase();
};

dhtmlXVaultObject.prototype.selectItem = function(currentId) {
	var currentRow = this.getCurrentRowListFiles(currentId);
	if (this.idRowSelected) {
		var row = this.getCurrentRowListFiles(this.idRowSelected);
		if (row) {
			if (row.id != currentRow.id) {
				currentRow.className = "dhxvlt_rowsel";
				this.idRowSelected = currentId;
				row.className = "dhxvlt_row"
			} else {
				// currentRow.className = "dhxvlt_row";
				// this.idRowSelected = ""
			}
		} else {
			currentRow.className = "dhxvlt_rowsel";
			this.idRowSelected = currentId;
		}
	} else {
		currentRow.className = "dhxvlt_rowsel";
		this.idRowSelected = currentId;
	}
	var args = {item: this.getItemInfo(this.idRowSelected)}
	this.onitemselected(args);
};

dhtmlXVaultObject.prototype.downLoad = function(fileName, p_id) {
    if($isEmpty(p_id) || document.getElementById("rowListFiles" + p_id).attributes["isUpload"].value == "true"){
        var codedName = fileName.replace(/\+/g,"%2B");
        var codedPath = this.filePath ? this.filePath.replace(/\+/g,"%2B") : "";
        var pathParam = codedPath ? ("&filePath=" + codedPath) : "";
        var ftpSecurityParam = this.ftpSecurity ? ("&ftpSecurity=" + this.ftpSecurity) : "";
        if(this.type == "path"){
            window.open(encodeURI(encodeURI(this.baseUrl + "?option=download&filePath=" + codedPath + "&fileName=" + codedName  + "&uploadMode="
                    + this.uploadMode + ftpSecurityParam + "&" + this.rnd())));   
        }else if(this.type == "form" || this.type == "grid"){
            window.open(encodeURI(encodeURI(this.baseUrl + "?option=download&tableName=" + this.tableName + "&pkVal=" + this.pkVal 
            		+ "&colName=" + this.colName + "&fileName=" + codedName + "&uploadMode="
                    + this.uploadMode + ftpSecurityParam + "&isVirtual="+this.isVirtual + pathParam  + "&" + this.rnd())));   
        }
    }
};

dhtmlXVaultObject.prototype.enableAddButton = function(enabled) {
	this.currentFile.disabled = !enabled;
	var btn = this.currentFile.parentNode.previousSibling.childNodes[1].childNodes[0].childNodes[0];
	btn.src = this.imPath + (enabled ? "add.gif" : "add_d.gif");
	btn.parentNode.className = enabled ? "" : "dhxvlt_dis"
};

dhtmlXVaultObject.prototype.readOnly = function(readOnly) {
	var self = this;
	//禁用添加、上传、清空、删除
	dhtmlXVaultObject.candown=readOnly;
	if(readOnly){
		this.enableAddButton(false);
		//上传
		var uploadDiv = this.container.childNodes[0].rows[1].cells[1].childNodes[0];
		uploadDiv.onclick = null;
		$(uploadDiv).find("nobr").addClass("dhxvlt_dis");
		//清空
		var clearDiv = this.container.childNodes[0].rows[1].cells[2].childNodes[0];
		clearDiv.onclick = null;
		$(clearDiv).find("nobr").addClass("dhxvlt_dis");
		//文件列表
		if(this.tblListFiles){
			var _$fileListTr = $(this.tblListFiles).find("tr[fileItemId]");
			_$fileListTr.each(function(p_index,p_tr){
				var currentId = $(p_tr).attr("fileItemId");//curentID
				var fileName = $(p_tr).attr("fileItemName");
				$(p_tr).find("td[removeCell=removeCell]").children().each(function(p_id,p_ele){
					if($(p_ele).attr("id") == "dhxvlt_icoremove")
						$(p_ele).hide();
					$(p_ele)[0].onclick = null;
				});
			});
		}
	}else{
		if(this.filesLimit <= 0){
			this.enableAddButton(true);
		}else{
			this.checkFilesLimit();
		}
		//上传
		var uploadDiv = this.container.childNodes[0].rows[1].cells[1].childNodes[0];
		uploadDiv.onclick = function() {self.uploadAllItems();};
		$(uploadDiv).find("nobr").removeClass("dhxvlt_dis");
		//清空
		var clearDiv = this.container.childNodes[0].rows[1].cells[2].childNodes[0];
		clearDiv.onclick = function() {self.removeAllItems();};
		$(clearDiv).find("nobr").removeClass("dhxvlt_dis");
		//文件列表
		if(this.tblListFiles){
			var _$fileListTr = $(this.tblListFiles).find("tr[fileItemId]");
			_$fileListTr.each(function(p_index,p_tr){
				var currentId = $(p_tr).attr("fileItemId");//curentID
				var fileName = $(p_tr).attr("fileItemName");//fileName
				$(p_tr).find("td[removeCell=removeCell]").children().each(function(p_id,p_ele){
					if($(p_ele).attr("id") == "dhxvlt_icoremove")
						$(p_ele).show();
					$(p_ele)[0].onclick = function(e){
						self.removeItem(currentId,fileName);
						if(e){
							e.stopPropagation();
						}
					};
				});
			});
		}
	}
}

dhtmlXVaultObject.prototype.checkFilesLimit = function() {
	if (this.filesLimit > 0) {
		var n = this.getTotalFilesCount();
		this.enableAddButton(n < this.filesLimit)
	}
};

dhtmlXVaultObject.prototype.getTotalFileSize = function(){
	var totalSize = 0;
	if(this.tblListFiles){
		var _$fileListTr = $(this.tblListFiles).find("tr[fileItemId]");
		_$fileListTr.each(function(p_index,p_tr){
			var fileSize = $(p_tr).attr("fileItemSize");//文件大小
			if(!fileSize)
				fileSize = 0;
			totalSize += parseInt(fileSize);
		});
	}
	return totalSize;
}

dhtmlXVaultObject.prototype.addFile = function(p_fileName, p_userOper, p_fileSize) {
	var self = this;
	var currentId = this.createId();
	// 参数有值是添加已有文件的情况。
	var fileName = p_fileName;
	if (p_userOper) {
		// 手动选择新文件的情况。
		var file = this.currentFile;
		
		//已添加文件拦截
		var areadyNames = this.getNames();
		var currentName = this.getFileName(file.value);
		if((";" + areadyNames).indexOf(";" + currentName + ";") > -1) {
			mx.indicate("info", mx.msg("UPLOAD_REPEATEDLY"));
			return;
		}
		// 文件大小的限制。
		// 非ie环境下文件大小的判断，或者ie10+
		if (file.files && file.files[0]) {
			//获取上传文件大小
			p_fileSize = file.files[0].size; 
		}
		else if (p_fileSize === false && (this.maxSize != -1 || this.totalMaxSize != -1)){ //ie9及之前版本获取不到fileSize
			//注销此代码，防止在IE浏览器降低安全级别
			if (self.IE && (parseInt($.browser.version) < 10)){
				
			}else{
				mx.indicate("warn", "无法获取添加文件的大小,请降低浏览器的安全级别后重试!");
				return;
			}
			
		}
		
		//判断单个文件的大小是否超出大小限制
		if (this.maxSize != -1 && p_fileSize > this.maxSize * 1024) {
			//注销此代码，防止在IE浏览器降低安全级别
			if (self.IE && (parseInt($.browser.version) < 10)){
				
			}else{
				mx.indicate("warn", mx.msg("UPLOAD_SIZE_LIMIT", [(this.maxSize + "KB")]));
	    		return;
			}
    		
    	}
		
		//增加最大上传大小限制
		if(this.totalMaxSize != -1){
			var totalSize = this.getTotalFileSize();
			totalSize = totalSize + p_fileSize;
			if(this.totalMaxSize * 1024 < totalSize){
				//注销此代码，防止在IE浏览器降低安全级别
				if (self.IE && (parseInt($.browser.version) < 10)){
					
				}else{
					mx.indicate("warn", mx.msg("UPLOAD_TOTALSIZE_LIMIT", [(this.totalMaxSize + "KB")]));
					return;
				}
				
			}
		}
		
		if(this.allowTypes != null && this.allowTypes != "" && (","+this.allowTypes.toLowerCase() + ",").indexOf("," + this.getFileType(file.value) + ",") == -1){
			// pete_geng 允许访问的类型
			// 防止类似 docx 拦截 doc 的情况
			this.markError(true,mx.msg("FILE_TYPE_ALLOWED",[this.allowTypes]),"bottom");
			mx.indicate("info", mx.msg("ERR_FILE_TYPE_LIMITED"));
			return;
		}
		if($notEmpty(this.limitTypes) && ("," + this.limitTypes.toLowerCase() + ",").indexOf("," + this.getFileType(file.value) + ",") >= 0){
			this.markError(true,mx.msg("FILE_TYPE_LIMITED",[this.limitTypes]),"bottom");
			mx.indicate("info", mx.msg("ERR_FILE_TYPE_LIMITED"));
		    return;
		}
		//取消错误状态
//		this.markError(false);
		this.changeErrorState();
		file.id = "file" + currentId;
		file.name = file.id;
		try {
			if (file.value == "")
				return;
			if (!this.onAddFile(file)) {
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
		
		var hiddenArea = document.createElement("div");
		$(hiddenArea).css({"width":"1px","height":"1px"});
		this.fileContainer.appendChild(hiddenArea);
		
		var newInputFile = document.createElement("input");
		newInputFile.type = "file";
		newInputFile.className = "dhxvlt_hidden"
				+ (this.Opera ? " dhxvlt_fo" : "");
		newInputFile.id = "file";
		newInputFile.name = newInputFile.id;
		this.currentFile = newInputFile;
		var self = this;
		newInputFile.onchange = function(e){self._file_change(newInputFile)};
		
		if (self.IE && $.browser.version == "6.0")
		{
			//IE6下得追加到前面，否则由于位置靠下将无法点击
			this.fileContainer.insertBefore(newInputFile, this.fileContainer.firstChild);
		}
		else
		{
			this.fileContainer.appendChild(newInputFile);
		}
		
		
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
	
	var imgFile = this.getImgFile(fileName);
	var containerData = this.containerDiv;
	if (this.tblListFiles == null) {
		this.tblListFiles = this.createTblListFiles();
		containerData.appendChild(this.tblListFiles)
	};
	var rowListFiles = this.tblListFiles
			.insertRow(this.tblListFiles.rows.length);
	rowListFiles.setAttribute("fileItemId", currentId);
	rowListFiles.setAttribute("id", "rowListFiles" + currentId);
	rowListFiles.setAttribute("fileItemSize", p_fileSize + "");//记录文件大小
	rowListFiles.setAttribute("fileItemName", fileName);
	if (p_userOper) {
		rowListFiles.setAttribute("isUpload", "false");
	}else{
		// 参数中存在文件名，说明添加的是已经上传过的文件。
		rowListFiles.setAttribute("isUpload", "true");
	}
	rowListFiles.onclick = function() {
		self.selectItem(currentId);
	};
	//双击下载
	rowListFiles.ondblclick = function() {
		if((!dhtmlXVaultObject.candown))
			self.downLoad(fileName, currentId);
    };
	var cellListFiles = document.createElement("td");
	cellListFiles.align = "center";
	rowListFiles.appendChild(cellListFiles);
	var tblContent = document.createElement("table");
	cellListFiles.appendChild(tblContent);
	tblContent.style.cssText = "border-bottom:1px solid #E2E2E2";
	tblContent.cellPadding = "0px";
	tblContent.cellSpacing = "0px";
	tblContent.border = "0px";
	tblContent.id = "tblContent" + currentId;
	var rowList = tblContent.insertRow(tblContent.rows.length);
	var cellList = document.createElement("td");
	cellList.rowSpan = 2;
	cellList.align = "center";
	if (this.IE) {
		var span = document.createElement("span");
		span.style.cssText = "width:40px;height:40px;display:inline-block;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"
				+ imgFile + " ')";
		cellList.appendChild(span)
	} else {
		cellList.innerHTML = "<img src='" + imgFile + "'/>"
	};
	cellList.style.width = "60px";
	rowList.appendChild(cellList);
	cellList = document.createElement("td");
	cellList.align = "left";
	cellList.vAlign = "bottom";
	cellList.style.cssText = "width:300px;height:30px";
	cellList.innerHTML = "<div class='fileName'><div class='fileName'>"
			+ fileName + "</div></div> ";
	cellList.className = "fileName";
	rowList.appendChild(cellList);
	// 预览  pete_geng
	cellList = document.createElement("td");
	cellList.style.cssText = "width:140px;height:30px";
	if(".jpg,.jpeg,.gif,.png,.bmp,.tiff".indexOf(fileName.substring(fileName.lastIndexOf(".")).toLowerCase()) > -1
		)
	{
		cellList.innerHTML = "<div title='"
				+ this.strings.preview
				+ "' id='dhxvlt_icopreview'></div><a href='javascript:void(0)' class='link dhxvlt_txtpreview'>"
				+ this.strings.preview + "</a>";
		cellList.firstChild.onclick = cellList.childNodes[1].onclick = function(e) {
			self.previewItem(currentId,fileName);
			if (e){
				e.stopPropagation();
			}
		};
	}
	cellList.vAlign = "bottom";
	cellList.align = "center";
	rowList.appendChild(cellList);
	// 删除
	cellList = document.createElement("td");
	cellList.setAttribute("removeCell","removeCell");
	cellList.style.cssText = "width:140px;height:30px";
	cellList.innerHTML = "<div title='"
			+ this.strings.remove
			+ "' id='dhxvlt_icoremove'></div><a href='javascript:void(0)' class='link dhxvlt_txtremove'>"
			+ this.strings.remove + "</a>";
	cellList.firstChild.onclick = cellList.childNodes[1].onclick = function(e) {
		self.removeItem(currentId,fileName);
		self.changeErrorState();
		if(e){
			e.stopPropagation();
		}
	};
	cellList.vAlign = "bottom";
	cellList.align = "center";
	rowList.appendChild(cellList);
	rowList = tblContent.insertRow(tblContent.rows.length);
	cellList = document.createElement("td");
	cellList.align = "left";
	cellList.style.cssText = "width:300px;height:30px";
	rowList.appendChild(cellList);
	cellList = document.createElement("td");
	cellList.style.cssText = "width:140px;height:30px";
	rowList.appendChild(cellList);
	cellList = document.createElement("td");
	cellList.style.cssText = "width:140px;height:30px";
	rowList.appendChild(cellList);
	cellList.innerHTML = "<a href='javascript:void(0)' class='link' style='visibility:hidden'>"
			+ this.strings.upload + "</a>";
	cellList.firstChild.onclick = function() {
		self.uploadFile(currentId);
		return false
	};
	cellList.vAlign = "middle";
	cellList.align = "center";
	rowList.appendChild(cellList);
	if (p_userOper) {
	    this.showMessageInfo(currentId, this.strings.undone);
	    this.showPreviewImg(currentId, true);
	}
	this.checkFilesLimit();
	return true;
};

dhtmlXVaultObject.prototype.markError = function(p_isError,p_msg,p_position) {
	var $div = $(this.containerDiv);
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
};

dhtmlXVaultObject.prototype.changeErrorState = function() {
	var hasTypeErrorFile = false;
	var sef = this;
	if(this.tblListFiles){
		var _$fileListTr = $(this.tblListFiles).find("tr[fileItemId]");
		_$fileListTr.each(function(p_index,p_tr){
			var isTypeError = $(p_tr).attr("uploadTypeError");
			if(isTypeError == "true"){
				hasTypeErrorFile = true;
				return false;
			}
		});
	}
	if(!hasTypeErrorFile){
		this.markError(false);
	}
}

dhtmlXVaultObject.prototype.getFileExtension = function(fileName) {
	var ext = "", arr = fileName.split(".");
	if (arr.length > 1)
		ext = arr[arr.length - 1].toLowerCase();
	return ext
};
dhtmlXVaultObject.prototype.getImgFile = function(fileName) {
	var srcImgPic = this.imPath + "ico_image.png";
	var srcImgVideo = this.imPath + "ico_video.png";
	var srcImgSound = this.imPath + "ico_sound.png";
	var srcImgArchives = this.imPath + "ico_zip.png";
	var srcImgFile = this.imPath + "ico_file.png";
	var srcImgWord = this.imPath + "ico_word.png";
	var srcImgExcel = this.imPath + "ico_excel.png";
	var srcImgPPT = this.imPath + "ico_ppt.png";
	var srcImgPDF = this.imPath + "ico_pdf.png";
	var srcImgTXT = this.imPath + "ico_txt.png";
	var valueImgPic = "jpg,jpeg,gif,png,bmp,tiff";
	var valueImgVideo = "avi,mpg,mpeg,rm,move";
	var valueImgSound = "wav,mp3,ogg";
	var valueImgArchives = "zip,rar,tar,tgz,arj";
	var valueImgWord = "doc,docx";
	var valueImgExcel = "xls,xlsx";
	var valueImgPPT = "ppt,pptx";
	var valueImgPDF = "pdf";
	var valueImgTXT = "txt";
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
	if (valueImgWord.indexOf(ext) != -1) {
		return srcImgWord
	};
	if (valueImgExcel.indexOf(ext) != -1) {
		return srcImgExcel
	};
	if (valueImgPPT.indexOf(ext) != -1) {
		return srcImgPPT
	};
	if (valueImgPDF.indexOf(ext) != -1) {
		return srcImgPDF
	};
	if (valueImgTXT.indexOf(ext) != -1) {
		return srcImgTXT
	};
	return srcImgFile
};
dhtmlXVaultObject.prototype.createId = function() {
	return this.counter++
};
dhtmlXVaultObject.prototype.createTblListFiles = function() {
	var tblListFiles = document.createElement("table");
	tblListFiles.id = "tblListFiles";
	tblListFiles.style.backgroundColor = "#FFFFFF";
	tblListFiles.cellPadding = "0";
	tblListFiles.cellSpacing = "0";
	tblListFiles.border = "0";
	return tblListFiles
};
dhtmlXVaultObject.prototype.removeItem = function(id,fileName) {
	
	var sef = this;
	// 删除磁盘文件。
	var codedName = fileName.replace(/\+/g,"%2B");
	
	var __msgBox = new mx.windows.MessageBox( {
 		reusable : false,
 		title : mx.msg("TIPS_BOX"),
 		message : mx.msg("CONFIRM_DELETE", [codedName]),
 		zIndex : 9999999,
 		imgkey : "info"
 	});
 
   __msgBox.show(function(){
    	var xmlHttp = sef.createXMLHttpRequest();
    	xmlHttp.open("POST", sef.baseUrl, false);
    	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
    	var codedPath = sef.filePath ? sef.filePath.replace(/\+/g,"%2B") : "";
    	var pathParam = codedPath ? ("&filePath=" + codedPath) : "";
    	var ftpSecurityParam = sef.ftpSecurity ? ("&ftpSecurity=" + sef.ftpSecurity) : "";
    	if(sef.type == "path"){
            xmlHttp.send("option=delete&filePath=" + codedPath + "&fileName=" + codedName + "&uploadMode=" + sef.uploadMode + ftpSecurityParam + "&" + sef.rnd());
        }else if(sef.type == "form" || sef.type == "grid"){
            xmlHttp.send("option=delete&tableName=" + sef.tableName + "&primaryKey="
                    + sef.primaryKey + "&pkVal=" + sef.pkVal + "&colName=" + sef.colName + "&fileName=" 
                    + codedName + "&uploadMode=" + sef.uploadMode + ftpSecurityParam + "&isVirtual="+sef.isVirtual+ pathParam  + "&" + sef.rnd());
        }
    	if (xmlHttp.status == 200) {
            if ($notEmpty(xmlHttp.responseText)) {
                // 在页面上删除。
                var r = sef.getCurrentRowListFiles(id);
                r.parentNode.removeChild(r);
                delete sef.fileList[id];
                sef.items.remove(sef.items[fileName]);
                delete sef.items[fileName];
                sef.checkFilesLimit();
                sef.owner.removeFile(fileName);
            }
        } else {
            throw "error";
        }
    });
};
dhtmlXVaultObject.prototype.previewItem = function(p_id,fileName) {
	// 预览 pete_geng
	if (this.fileList[p_id])
	{
		this.owner.preview(this.fileList[p_id]);
	}
	else
	{
		var uri = null;
	    if($isEmpty(p_id) || document.getElementById("rowListFiles" + p_id).attributes["isUpload"].value == "true"){
		    var codedName = fileName.replace(/\+/g,"%2B");
		    var codedPath = this.filePath ? this.filePath.replace(/\+/g,"%2B") : "";
		    var pathParam = codedPath ? ("&filePath=" + codedPath) : "";
		    var ftpSecurityParam = this.ftpSecurity ? ("&ftpSecurity=" + this.ftpSecurity) : "";
		    if(this.type == "path"){
		        uri = encodeURI(encodeURI(this.baseUrl + "?option=download&filePath=" + codedPath + "&fileName=" + codedName + "&uploadMode="
		                + this.uploadMode + ftpSecurityParam + "&" + this.rnd()));
		    }else if(this.type == "form" || this.type == "grid"){
		        uri = encodeURI(encodeURI(this.baseUrl + "?option=download&tableName=" + this.tableName + "&pkVal=" 
		        		+ this.pkVal + "&colName=" + this.colName + "&fileName=" + codedName + "&uploadMode="
		                + this.uploadMode + ftpSecurityParam + "&isVirtual="+this.isVirtual+ pathParam  + "&" + this.rnd()));   
		    }
		}
		this.owner.preview(uri);
	}
};
dhtmlXVaultObject.prototype.close = function() {
	// 关闭前判断 pete_geng
	var hasUnUploaded = false;
	if (this.tblListFiles != null && this.tblListFiles.rows.length > 0) {
		for (var i = 0; i < this.tblListFiles.rows.length; i++) {
			if (this.tblListFiles.rows[i].attributes["isUpload"].value == "false") {
				hasUnUploaded = true;
				break;
			}
		};
	}
	// 执行外部传来的关闭方法
	if (!hasUnUploaded) {
		if (this.owner && $.isFunction(this.owner._closeWindow)){
			this.owner._closeWindow();
		}
	}else{
		var sef = this;
		
		var __msgBox = new mx.windows.MessageBox( {
	 		reusable : false,
	 		title : mx.msg("TIPS_BOX"),
	 		message : mx.msg("CONFIRM_CLOSE"),
	 		zIndex : 9999999,
	 		imgkey : "info"
	 	});
		
		__msgBox.show(function(){
			if (sef.owner && $.isFunction(sef.owner._closeWindow)){
				sef.owner._closeWindow();
			}
		});
	}
};

//删除上传失败的文件项目
dhtmlXVaultObject.prototype.removeErrorFileItem = function(){
	var sef = this;
	if(this.tblListFiles){
		var _$fileListTr = $(this.tblListFiles).find("tr[fileItemId]");
		_$fileListTr.each(function(p_index,p_tr){
			var _$tr = $(p_tr);
			var isUploaded = _$tr.attr("isUpload");
			if(isUploaded == "error"){
				var id = _$tr.attr("fileItemId");
				//更新文本值
				sef.owner.removeFile(sef.getFileName(_$tr.attr("fileItemName")));
				if(sef.fileList[id])
					delete sef.fileList[id];
				_$tr.remove();
			}
		});
	}
}

dhtmlXVaultObject.prototype.removeAllItems = function() {
	if (!this.isUploadFile) {
		var sef = this;
		var __msgBox = new mx.windows.MessageBox( {
	 		reusable : false,
	 		title : mx.msg("TIPS_BOX"),
	 		message : mx.msg("CONFIRM_DELETE_ALL"),
	 		zIndex : 9999999,
	 		imgkey : "info"
	 	});
		
		__msgBox.show(function(){
		    sef.deleteAll();
		});
	};
	this.checkFilesLimit();
};

dhtmlXVaultObject.prototype.deleteAll = function() {
	var sef = this;
    // 删除磁盘文件。
    var xmlHttp = sef.createXMLHttpRequest();
    xmlHttp.open("POST", sef.baseUrl, false);
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
    var codedPath = sef.filePath ? sef.filePath.replace(/\+/g,"%2B") : "";
    var pathParam = codedPath ? ("&filePath=" + codedPath) : "";
    var ftpSecurityParam = sef.ftpSecurity ? ("&ftpSecurity=" + sef.ftpSecurity) : "";
    if(sef.type == "path"){
        xmlHttp.send("option=deleteAll&filePath=" + codedPath  + "&uploadMode="
                + sef.uploadMode + ftpSecurityParam + "&" + sef.rnd());
    }else if(sef.type == "form" || sef.type == "grid"){
        xmlHttp.send("option=deleteAll&tableName=" + sef.tableName + "&primaryKey="
                + sef.primaryKey + "&pkVal=" + sef.pkVal + "&colName=" + sef.colName + "&uploadMode="
                + sef.uploadMode + ftpSecurityParam + "&isVirtual="+sef.isVirtual+ pathParam  + "&" + sef.rnd());
    }
    
    if (xmlHttp.status == 200) {
        if ($notEmpty(xmlHttp.responseText)) {
            // 在页面上删除。
            if (sef.tblListFiles != null) {
                var count = sef.tblListFiles.rows.length;
                if (count > 0) {
                    for (var i = 0; i < count; i++) {
                    	sef.tblListFiles.deleteRow(0);
                    }
                }
            }
            sef.fileList = {};
            sef.items = [];
            sef.owner.fileNames = "";
        }
        
        sef.markError(false);
    } else {
        throw "error";
    }
};

dhtmlXVaultObject.prototype.uploadAllItems = function() {
	var flag = -1;
	if (this.tblListFiles != null) {
		if (this.tblListFiles.rows.length > 0) {
			for (var i = 0; i < this.tblListFiles.rows.length; i++) {
				if (this.tblListFiles.rows[i].attributes["isUpload"].value == "false") {
					flag = i;
					if (this.owner && this.owner.parent && this.owner.parent.setBusy){
						this.owner.parent.setBusy();
					}
					break;
				}
			};
			if (flag != -1) {
				this.isUploadFileAll = true;
				var fileItemId = this.tblListFiles.rows[i].attributes["fileItemId"].value;
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
	}
};
dhtmlXVaultObject.prototype.objToArray = function(obj) {
	var res = new Array();
	for (var key in obj) {
		res[res.length] = obj[key]
	};
	return res
};
dhtmlXVaultObject.prototype.createProgressDemo = function() {
	var srcImgProgress = this.imPath + "pb_demoupload.gif";
	var tblProgress = document.createElement("table");
	tblProgress.cellPadding = "0";
	tblProgress.cellSpacing = "0";
	tblProgress.border = "0";
	tblProgress.style.cssText = "height:10px;width:153px;display:none;";
	tblProgress.id = "progress";
	var row = tblProgress.insertRow(tblProgress.rows.length);
	var cell1 = document.createElement("td");
	cell1.style.cssText = "font-size:1px;border:1px solid #A9AEB3;";
	cell1.innerHTML = "<img src=" + srcImgProgress
			+ " style = 'width:150px;height:8px;'/>";
	row.appendChild(cell1);
	return tblProgress
};
dhtmlXVaultObject.prototype.createProgressBar = function() {
	var srcImgProgress = this.imPath + "pb_back.gif";
	var srcImgEmpty = this.imPath + "pb_empty.gif";
	var tblProgress = document.createElement("table");
	tblProgress.cellPadding = "0";
	tblProgress.cellSpacing = "0";
	tblProgress.border = "0";
	tblProgress.style.cssText = "height:10px;width:149px;border-bottom:0px !important;display:none";
	tblProgress.id = "progress";
	var row = tblProgress.insertRow(tblProgress.rows.length);
	var cell1 = document.createElement("td");
	cell1.style.cssText = "font-size:1px;background-image:url("
			+ srcImgProgress
			+ ");width:150px;height:10px;border:1px solid #A9AEB3";
	cell1.align = "right";
	var img = document.createElement("img");
	img.src = srcImgEmpty;
	img.style.width = "100%";
	img.style.height = "7px";
	cell1.appendChild(img);
	row.appendChild(cell1);
	return tblProgress
};
dhtmlXVaultObject.prototype.createPercentPanel = function() {
	var percentCompleted = document.createElement("div");
	percentCompleted.style.cssText = "font-size:9px;height:8px;position:absolute;left:210px;width:20px;display:none;padding-top:0px";
	percentCompleted.id = "percentCompletedValue";
	return percentCompleted
};
dhtmlXVaultObject.prototype.endLoading = function(id, isError) {
	this.isUploadFile = false;
	this.progressDemo.style.display = "none";
	this.container.appendChild(this.progressDemo);
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
dhtmlXVaultObject.prototype.startRequest = function(id) {
	var xmlHttp = this.createXMLHttpRequest();
	xmlHttp.open("POST", this.baseUrl, false);
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
	xmlHttp.send("option=startUpload&id=" + id  + "&" + this.rnd());
	if (xmlHttp.status == 200) {
		if (!xmlHttp.responseText) {
			throw "error";
		}
		
		//updated by tiger on 2015/7/27 11:36:32,解决恶意代码注入
		var reg = /^[0-9a-zA-Z!\s\S]+$/g;
		if(reg.test(xmlHttp.responseText)){
			this.sessionId = xmlHttp.responseText;
		}else{
			this.sessionId = 'invalid_session_id';
		}	
		//end update
		
		this.inpUPLOAD_IDENTIFIER.value = this.sessionId;
	} else {
		throw "error"
	}
};
dhtmlXVaultObject.prototype.sendIdSession = function(id) {
	try {
		var xmlHttp = this.createXMLHttpRequest();
		xmlHttp.open("post", this.baseUrl, false);
		xmlHttp.setRequestHeader("Content-Type",
				"application/x-www-form-urlencoded;charset=UTF-8");
		xmlHttp.send("option=getProgress&sessionId=" + this.sessionId  + "&" + this.rnd());
		if (xmlHttp.status == 200) {
			var res = xmlHttp.responseText;
			if (res) {
				var err = res.split(":");
				if (err[0] == "error") {
					if (err[1] == -2) {
						var f = document
								.getElementById("dhtmlxVaultUploadFrame");
						if (f)
							f.src = "about:blank";
						alert(this.printf(this.strings.errors["TooBig"],
								err[2], err[3]))
					} else if (err[1] == -3) {
						alert(this.printf(this.strings.errors["PostSize"],
								err[2]))
					};
					throw "error"
				};
				var _fileExt = null;
				if(res.charAt(2) == ":"){
					_fileExt = res.substring(3,res.length);
					res = parseInt(res.substring(0,2));
				}else{
					res = parseInt(res, 10);
				}
				if (isNaN(res)) {
					throw "error"
				};
				if (res == -1) {
					// 上传成功
					this.uploadedCount++;
					this.showMessageInfo(id, this.strings.done);
					this.showPreviewImg(id, true);
					
					//上传成功事件。
					this.onitemuploaded();
					this.endLoading(id, false);
					
					if (this.isUploadFileAll) {
						this.uploadAllItems()
					}
					this.getUploadedFiles();
				} else if (res == -2 || res == -3 || res == -4 || res == -5) {
					// 失败
					this.endLoading(id, true);
					this.isUploadFileAll = false;
					this.isUploadFile = false;
					if(this.uploadErrorMsg){
						this.showMessageInfo(id, this.strings.error+"，"+this.uploadErrorMsg);
					}else{
						this.showMessageInfo(id, this.strings.error);
					}
					
					var tblContent = this.getCurrentTblContent(id);
					tblContent.parentNode.parentNode.attributes["isUpload"].value = "error";
					if (this.owner && this.owner.parent && this.owner.parent.setBusy){
						this.owner.parent.setBusy(false);
					}
					if (res == -3) {
						mx.indicate("info", mx.msg("FILE_TYPE_LIMITED",[_fileExt]));
						this.markError(true,mx.msg("FILE_TYPE_LIMITED",[_fileExt]),"bottom");
						tblContent.parentNode.parentNode.attributes["uploadTypeError"].value = "true";
					}else if(res == -4){
						mx.indicate("info", mx.msg("FILE_TYPE_ALLOWED",[_fileExt]));
						this.markError(true,mx.msg("FILE_TYPE_ALLOWED",[_fileExt]),"bottom");
						tblContent.parentNode.parentNode.attributes["uploadTypeError"].value = "true";
					}else if(res == -2 && _fileExt){
						mx.indicate("info", _fileExt);
						this.markError(true,_fileExt,"bottom");
						tblContent.parentNode.parentNode.attributes["uploadTypeError"].value = "true";
					}else if(res == -5 ){
						this.markError(true,mx.msg("UPLOAD_SIZE_LIMIT",[(this.maxSize + "KB")]),"bottom");
						mx.indicate("info", mx.msg("UPLOAD_SIZE_LIMIT", [(this.maxSize + "KB")]));
						tblContent.parentNode.parentNode.attributes["uploadTypeError"].value = "true";
					}
					this.onitemuploaderror();
				} else {
					var self = this;
					try {						
						window.setTimeout(function() {
							var strCross = ["SCRIPT","<",">","\\","'","&","#","%","+"];
					        for(var i = 0;i<strCross.length;i++){
					        	if(id.toString().indexOf(strCross[i])){
					        		id = id.toString().replace(strCross[i],"");
					        	}
					        }
							self.sendIdSession(id);
						}, 500);
					} catch (e) {
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
		this.showMessageInfo(id, this.strings.error);
		var tblContent = this.getCurrentTblContent(id);
		tblContent.parentNode.parentNode.attributes["isUpload"].value = "error";
	}
};
dhtmlXVaultObject.prototype.printf = function() {
	var n = arguments.length;
	var str = arguments[0];
	for (var i = 1; i < n; i++) {
		var pattern = "\\{" + (i - 1) + "\\}";
		var re = new RegExp(pattern, "g");
		str = str.replace(re, arguments[i])
	};
	return str;
};
dhtmlXVaultObject.prototype.showMessageInfo = function(id, msg) {
	var tblContent = this.getCurrentTblContent(id);
	tblContent.rows[1].cells[0].innerHTML = "<font class='text'>" + msg
			+ "</font>";
	tblContent.rows[1].cells[0].vAlign = "top"
};
dhtmlXVaultObject.prototype.showPreviewImg = function(id, visibility) {
	var tblContent = this.getCurrentTblContent(id);	// pete_geng
	tblContent.rows[0].cells[2].style.visibility = visibility ? 'visible':'hidden';
};
dhtmlXVaultObject.prototype.showProgressInfo = function(perc) {
	this.tblProgressBar.rows[0].cells[0].firstChild.style.width = 100 - perc
			+ "%";
	this.percentPanel.innerHTML = "<nobr>" + perc + "%</nobr>"
};
dhtmlXVaultObject.prototype.getFilesCount = function() {
	return this.tblListFiles && this.tblListFiles.rows
			? this.tblListFiles.rows.length
			: 0
};
dhtmlXVaultObject.prototype.getTotalFilesCount = function() {
	var count = 0;
	if (this.tblListFiles != null) {
		if (this.tblListFiles.rows.length > 0) {
			for (var i = 0; i < this.tblListFiles.rows.length; i++) {
			    //控制所有文件个数。如果要限制每次上传文件个数可添加以下条件。
				//if (this.tblListFiles.rows[i].attributes["isUpload"].value == "false") 
				count++;
				
			}
		}
	};
	return count
};
dhtmlXVaultObject.prototype.getCurrentRowListFiles = function(id) {

	for (var i = 0; i < this.tblListFiles.rows.length; i++) {
		if (this.tblListFiles.rows[i].id == "rowListFiles" + id) {
			return this.tblListFiles.rows[i]
		}
	}
};
dhtmlXVaultObject.prototype.getCurrentTblContent = function(id) {
	for (var i = 0; i < this.tblListFiles.rows.length; i++) {
		if (this.tblListFiles.rows[i].cells[0].firstChild.id == "tblContent"
				+ id) {
			return this.tblListFiles.rows[i].cells[0].firstChild
		}
	}
};
dhtmlXVaultObject.prototype.getFormField = function(type, name) {
	var fields = this.uploadForm.getElementsByTagName("input");
	for (var i = 0; i < fields.length; i++) {
		var f = fields[i];
		if (f.type.toLowerCase() == type && f.name == name) {
			return f
		}
	};
	return null
};
dhtmlXVaultObject.prototype.getCurrentInputFile = function(id) {
	return this.getFormField("file", "file" + id)
};
dhtmlXVaultObject.prototype.uploadFile = function(id) {
	if (!this.isUploadFile) {
		this.selectItem(id);
		var tblContent = this.getCurrentTblContent(id);
		tblContent.parentNode.parentNode.attributes["isUpload"].value = "true";
		//标识是否是上传文件类型导致文件上传失败
		tblContent.parentNode.parentNode.setAttribute("uploadTypeError",false);
		//tblContent.parentNode.parentNode.attributes["uploadTypeError"].value = "false";
		this.isUploadFile = true;
		this.getCurrentInputFile(id).disabled = false;
		this.progressDemo.style.display = "inline";
		this.getCurrentRowListFiles(id).cells[0].firstChild.rows[1].cells[0]
				.appendChild(this.progressDemo);
		try {
			this.startRequest(id);
			this.sendIdSession(id)
		} catch (e) {
			this.endLoading(id, true);
			this.isUploadFileAll = false;
			this.isUploadFile = false;
			tblContent.rows[1].cells[0].innerHTML += "<font class='text'>"
					+ this.strings.error + "</font>";
			tblContent.rows[1].cells[0].vAlign = "top";
			return
		};
		if (!this.isUploadFile)
			return;
		
		// 上传时 上传 uds 参数时使用setUdsParam
		var item = {setUdsParam:function(p_params){
			item.udsParam = JSON.stringify(p_params);
		}};
		var args = {cancel:false, item:item};
		this.onitemuploading(args);
		if(args.cancel) return;
		var s_maxSize = "";
		if (this.maxSize != -1){
			s_maxSize = "&maxFileSize=" + this.maxSize * 1024;
		}
		
		var ftpSecurityParam = this.ftpSecurity ? ("&ftpSecurity=" + this.ftpSecurity) : "";
		var udsParam = args.item.udsParam;
		if(this.type == "path"){
            this.uploadForm.action = encodeURI(this.baseUrl + "?option=upload&sessionId="
                + this.sessionId + "&fileName="
                + this.getFileName(this.getCurrentInputFile(id).value)
                + "&userfile=" + this.getCurrentInputFile(id).id + "&filePath="
                + this.filePath
                + "&uploadMode="
                + this.uploadMode + ftpSecurityParam + "&udsParam="
                + udsParam +s_maxSize
                + "&" + this.rnd());
           
        }else if(this.type == "form" || this.type == "grid"){
            this.uploadForm.action = encodeURI(this.baseUrl + "?option=upload&sessionId="
                + this.sessionId + "&tableName="
                + this.tableName + "&primaryKey="
                + this.primaryKey + "&pkVal="
                + this.pkVal + "&colName="
                + this.colName 
                + (this.filePath ? ("&filePath="+ this.filePath) : "")
                + "&uploadMode="
                + this.uploadMode + ftpSecurityParam + "&udsParam="
                + udsParam + s_maxSize
                +"&isVirtual="+this.isVirtual  
                + "&" + this.rnd());
        }
		
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
dhtmlXVaultObject.prototype.preLoadImages = function() {
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
dhtmlXVaultObject.prototype.setFilesLimit = function(limit) {
	var n = parseInt(limit);
	if (!isNaN(n) && n >= 0)
		this.filesLimit = n
};
dhtmlXVaultObject.prototype.setFormField = function(name, value) {
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
dhtmlXVaultObject.prototype.onAddFile = function(fileName) {
	return true
};
dhtmlXVaultObject.prototype.onUploadComplete = function(files) {
    for(var i = 0; i < files.length; i++){
        this.owner.appendFile(this.getFileName(files[i].name));
    }
};
dhtmlXVaultObject.prototype.onFileUploaded = function(file) {
	var filelistAry = this.objToArray(this.fileList);
	var isAllLoaded = true;
	$(filelistAry).each(function(){
		if(!this.uploaded){
			isAllLoaded = false;
			return false;
		}
	});
	if(isAllLoaded)
		this.onallitemuploaded();
};

//args {item:item, cancel:true}
dhtmlXVaultObject.prototype.onitemuploading = function(args) {
	
};

dhtmlXVaultObject.prototype.onitemuploaded = function() {
};

dhtmlXVaultObject.prototype.onitemuploaderror = function() {
};

// 点选某一项事件处理  onitemselected; args:{item:item}
dhtmlXVaultObject.prototype.onitemselected = function(args) {
};

dhtmlXVaultObject.prototype.getItemInfo = function(id) {
	var item = this.fileList[id];
	if(!item){
		var fileName = $(this.getCurrentTblContent(id)).find("div[class=fileName]:last").text();
		fileName = $.trim(fileName);
		item = this.items[fileName];
	}
	return item;
};

// 返回 fileList [{attName:"", attSize:num}{}]
dhtmlXVaultObject.prototype.getUploadedFiles = function() {
	// 获取已经上传的文件信息。
	var fileList = [];
	var xmlHttp = this.createXMLHttpRequest();
	xmlHttp.open("POST", this.baseUrl, false);
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
    var codedPath = this.filePath ? this.filePath.replace(/\+/g,"%2B") : "";
    var pathParam = codedPath ? ("&filePath=" + codedPath) : "";
    var ftpSecurityParam = this.ftpSecurity ? ("&ftpSecurity=" + this.ftpSecurity) : "";
	if(this.type == "path"){
	    xmlHttp.send("option=getFile&filePath=" + codedPath  + "&uploadMode="
                + this.uploadMode + ftpSecurityParam + "&" + this.rnd());
    }else if(this.type == "form" || this.type == "grid"){
        xmlHttp.send("option=getFile&tableName=" + this.tableName + "&pkVal=" + this.pkVal + "&colName=" + this.colName + "&uploadMode="
                + this.uploadMode + ftpSecurityParam + pathParam  + "&" + this.rnd());
    }
	
	if (xmlHttp.status == 200) {
		if ($notEmpty(xmlHttp.responseText)) {
            //获取已经上传的文件列表。
			try{
				//替换eval 为 parseJSON
				fileList = $.parseJSON(xmlHttp.responseText);
            	//fileList = eval('(' + xmlHttp.responseText + ')');
            	this.items= [];
            	for (var i = 0; i < fileList.length; i++){
            		this.items.add(fileList[i]);
            		this.items[fileList[i].attName] = fileList[i];
            	}
			}catch (e) {
			}
		}
	}
	return fileList;
};

dhtmlXVaultObject.prototype.rnd = function(){
	// 产生随机数
	var rnd = "rnd=" + mx.random();
	return rnd ;
};

dhtmlXVaultObject.prototype.getNames = function(){
	var names = "";
	if (this.owner && this.owner.fileNames){
		names += this.owner.fileNames;
	}
	for(var file in this.fileList){
		if($isObject(this.fileList[file]) && $isString(this.fileList[file]["name"])){
			var name = this.fileList[file]["name"];
			name = this.getFileName(name);
			names += (name + ";")
		}
	}
	return names ;
};

dhtmlXVaultObject.prototype.refreshPk = function(p_items, p_pkColName){
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
        var ftpSecurityParam = this.ftpSecurity ? ("&ftpSecurity=" + this.ftpSecurity) : "";
        xmlHttp.send("option=refreshPk&tableName=" + this.tableName + "&uploadMode="
                + this.uploadMode + ftpSecurityParam +"&replaceValues=" + replaceValues + pathParam+"&isVirtual="+this.isVirtual + "&" + this.rnd());
        
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

dhtmlXVaultObject.prototype.dispose = function() {
	 this.fileList = {};
     this.items = [];
     dhtmlXVaultObject.fso = null;
     
     this.container.childNodes[0].rows[1].cells[1].childNodes[0].onclick = null;
	 this.container.childNodes[0].rows[1].cells[2].childNodes[0].onclick = null;
	 if (this.owner.context){
		this.container.childNodes[0].rows[1].cells[3].childNodes[0].onclick = null
	 }
	 
	 if(this.tblListFiles){
	 	for(var i=0;i<this.tblListFiles.rows.length;i++){
	 		var rowListFiles = this.tblListFiles.rows[i]
	 		rowListFiles.removeAttribute("fileItemId");
			rowListFiles.removeAttribute("id");
			rowListFiles.removeAttribute("fileItemSize");
			rowListFiles.removeAttribute("fileItemName");
			rowListFiles.removeAttribute("isUpload");
			rowListFiles.onclick = null;
			rowListFiles.ondblclick = null;
	 	}
	 }
};
// v.1.6 build 9757

/*
 * Copyright DHTMLX LTD. http://www.dhtmlx.com You allowed to use this component
 * or parts of it under GPL terms To use it on other terms or get Professional
 * edition of the component please contact us at sales@dhtmlx.com
 */
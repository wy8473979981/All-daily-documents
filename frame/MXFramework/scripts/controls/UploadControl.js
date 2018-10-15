$ns("mx.controls");

$import("mx.lib.upload");
$import("mx.windows.MessageBox");

/**
 * 提供一个允许用户上传文件的类。特别注意：在FireFox浏览器下载中文名文件时会出现乱码。
 * 
 * @example 以下是一个文件上传编辑器如何初始化的示例。
 * <code language="JavaScript">
 * var upload = new mx.controls.UploadControl(
 * {
 *      filePath : "D:\\testUpload\\inner\\",
 *      height : 200,
 *      baseUrl : mx.mappath("~/../mx/servlets/fileUpload")
 * });
 * </code>
 */
mx.controls.UploadControl = function()
{
    var me = $extend(mx.controls.Control);
    var base = {};

    /**
     * 设置或获取一个字符串，表示当前上传控件的类型。 当类型为 path 时，表示管理指定目录下的文件； 当类型为 form
     * 时，表示管理表单对应的数据的附件。
     */
    me.type = "path";

    /**
     * 设置或获取控件的高度，不支持百分比设置高度
     */
    me.height = "200";
    
    /**
     * 获取控件的宽度，不能支持设置控件的宽度
     */
    me.width = "435px";

    /**
     * 获取或设置一个字符串，表示后台服务所在路径。MX 框架提供两个服务路径可供选择。
     * mx.mappath("~/../mx/servlets/fileUpload") 供管理指定目录下的文件时使用，
     * mx.mappath("~/../mx/servlets/dataFileUpload") 供管理表单、表格对应的数据附件时使用。
     * 用户可以根据需要使用自己的服务路径。
     * 
     * @default mx.mappath("~/../mx/servlets/fileUpload")
     */
    me.baseUrl = mx.mappath("~/../mx/servlets/fileUpload");

    /**
     * 获取或设置一个字符串，表示上传文件在服务器上的保存路径。
     */
    me.filePath = "";

    /**
     * @ignore
     * 获取一个字符串，表示当前已经上传的文件名，多个文件名用分号分隔。
     */
    me.fileNames = "";

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
     * 设置或获取一个字符串，表示禁止上传的文件类型，多个扩展名用逗号隔开。需要先满足 {@link mx.controls.UploadControl.allowTypes}。
     */
    me.limitTypes = "";
    
    /**
     * 设置或获取一个字符串，表示允许上传的文件类型，多个扩展名用逗号隔开。值为 null 时表示允许上传所有文件。
     */
    me.allowTypes = null;
    
    /**
     * 获取或设置一个数字，表示上传文件的大小所允许的最大值，单位 “KB”。如果为“-1”表示无限制。
     */
    me.maxSize = 1000;
    
    /**
     * 获取或设置一个数字，表示所有上传文件的大小所允许的最大值，单位“KB”，如果为“-1”表示无限制.
     */
    me.totalMaxSize = -1;

    /**
     * 获取一个对象，表示上传组件对应的工具类。
     */
    me.vault = null;
    
    /**
     * 设置或获取一个数字，表示允许上传的文件个数。为 0 时表示没有限制。
     */
    me.filesLimit = 0;
    
    /**
     * 设置或获取文件上传控件是否只读，true：只读，不能上传、添加删除文件，只能下载
     * 
     * @default false
     */
    me.readOnly = false;
    
    /**
     * 设置或获取文件上传控件udsParam,默认为null；
     * 例如：me.udsParam = {comp:"公司1", des:"公司描述"};
     * @default false
     */
    me.udsParam = null;

    /**
     * 当控件点击关闭按钮时，将触发该事件。
     */
    me.onclosed = null;
    
    /**
     * 上传项上传之前触发该事件。
     * 
     * @cancelable
     * @param item 
     * 				上传项对象，其 setUdsParam 方法参加  {@link mx.controls.DragUploadItem.setUdsParam} 方法。
     */
    me.onitemuploading = null;
    
    /**
     * 当选择的文件改变时触发该事件。
     * 
     * @param item 
     * 				一个对象，表示当前选中的文件信息。如果是未上传文件，item 包含未上传文件信息，如{name:"", path:""}；
     * 如果是已上传文件，包含的是服务端文件信息，如{attName:"",attSize:"", fileId:""}。
     */
    me.onselectionchanged = null;

    /**
     * 指示列是否虚拟，如果列是虚拟的话，将不会执行业务表的逻辑
     * 
     * @default false
     */
    me.isVirtual = false;
    
    /**
     * 上传项上传之后触发该事件。
     */
    me.onitemuploaded = null;
    
    /**
     * 上传项上传失败触发该事件。
     */
    me.onitemuploaderror = null;
    
    /**
     * 所有文件上传成功后触发该事件
     */
    me.onallitemuploaded = null;
    
     /**
     * 设置需要忽略的全局属性设置;如:需要获取全局上传mx.globalUploadMode,只需设置  ignoreGlobalSet = ["globalUploadMode"] 既可
     */
    me.ignoreGlobalSet = [];
    
    /**
     * 上传失败时，提示信息。
     * 
     * @default null
     */
    me.uploadErrorMsg = null;
    
    base.init = me.init;
    me.init = function()
    {
        base.init();
        if ($notEmpty(mx.globalUploadMode) &&  !  isIgnoreGlobalSet("globalUploadMode"))
        {   //使用全局上传模式配置覆盖局部配置。
            var uploadMode = ["file","blob","uds","ftp"];
            if (uploadMode.contains(mx.globalUploadMode))
            {
                me.uploadMode = mx.globalUploadMode;
            }
        }
        me.vault = new dhtmlXVaultObject();
        me.vault.onitemuploaded = _onitemuploaded;
        me.vault.onallitemuploaded = _onallitemuploaded;
        me.vault.onitemuploading = _onitemuploading;
        me.vault.onitemuploaderror = _onitemuploaderror;
        me.vault.onitemselected = _onitemselected;
        me.vault.isVirtual = me.isVirtual;
        me.vault.setImagePath(mx.mappath("$theme/images/fileupload/"));
        me.vault.setBaseUrl(me.baseUrl);
        me.vault.create(me);
        if(me.enabled == false){
        	me.setEnabled(me.enabled);
        }
        //设置为只读不让编辑
        if(me.readOnly){
        	me.setReadOnly(me.readOnly);
        }
    };
    
    base.setEnabled = me.setEnabled;
    me.setEnabled = function(p_enabled){
    	base.setEnabled(p_enabled);
    	if(me.vault){
    		me.vault.readOnly(!me.enabled);
    	}
    }
    
    /**
     * @ignore
     */
    me.appendFile = function(p_fileName)
    {
    	if((";" + me.fileNames).indexOf(";" + p_fileName + ";") == -1){
    		me.fileNames = me.fileNames + p_fileName + ";";
    	}
    };

    /**
     * @ignore
     * 删除文件的方法。
     */
    me.removeFile = function(p_fileName)
    {
        var fileArray = me.fileNames.split(";");
        for ( var i = 0; i < fileArray.length; i++)
        {
            if (fileArray[i] == p_fileName)
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
    };
    
    me.setReadOnly = function(p_readOnly){
    	if (typeof(p_readOnly) == "undefined"){
            p_readOnly = true;
        }
        me.readOnly = p_readOnly;
        me.vault.readOnly(me.readOnly);
    }
    
    /**
     * @ignore
     */
    me._markError = function(p_isError,p_msg,p_position){
    	me.vault.markError(p_isError,p_msg,p_position);
    }
    
    /**
     * @ignore
     */
    me._removeUploadedErrorFile = function(){
    	me.vault.removeErrorFileItem();
    }

    /**
     * @ignore
     * 请参见 {mx.editors.FileEditor.refreshPk} 。
     */
    me.refreshPk = function(p_items, p_pkColName)
    {
        me.vault.refreshPk(p_items, p_pkColName);
    };

    /**
     * 提供一个方法，下载指定的文件。
     * 
     * @param p_fileName 要下载的文件名。
     */
    me.download = function(p_fileName)
    {
        if (p_fileName.endsWith(";"))
        {
            p_fileName = p_fileName.substring(0, p_fileName.length - 1);
        }
        me.vault.downLoad(p_fileName);
    };
    
    /**
   	 *@ignore
   	 * 提供一个方法，预览指定的图片。
     */
    me.preview = function(p_imgURI)
    {
    	if (this.enabled == false)
    		return;
    	// p_imgURI 可以是图片的url地址，或者jQuery 元素
    	if(p_imgURI != null)
    	{
    		var $img = null;
    		if (typeof (p_imgURI) == "object")
    		{
    			$img = _localImg(p_imgURI);
    			
    			if(!$isIE()) //只支持ie浏览器
    	    	{
    	    	    return;
    	    	}
    	    	//  获取图片大小
    			//var info = _getSizeInfo(p_imgURI.path);
    			
    			var img = document.createElement("img");
    			(document.body || document.documentElement).appendChild(img);
    			if(img.runtimeStyle)
    			{
    				with(img.runtimeStyle){
    					filter = _imgloader(p_imgURI.path,"image");
    					zoom = width = height = 1;
    					position = "absolute";
    					right = "9999em";
    					top = "-9999em";
    					border = 0;
    				}
    			}
    			//IE9下需要添加延迟才能正确获取图片的大小，因此合并_localImg和_getSizeInfo函数到里面
    			setTimeout(function(){
    				var info = {
    	    				height: img.offsetHeight,
    	    				width: img.offsetWidth
    	    			};
    	    			// 删除临时元素
    	    			img.parentNode.removeChild(img);
    	    			
    	    			if (info.height == 1 && info.width == 1)
    	    			{
    	    				info.width = 800;
    	    				info.height = 600;
    	    			}
    	    			var view = document.createElement("div");
    	    			with(view.style)
    	    			{
    	    				filter = _imgloader(p_imgURI.path,"scale");
    	    				height = info.height + "px";
    	    				width = info.width + "px";
    	    				overflow = "hidden";
    	    			}
    	    			_previewImg($(view));
    			},500);
    			
    		}
    		else if (typeof (p_imgURI) == "string")
    		{
		    	$img = $("<img src='" + p_imgURI + "'/>");
		    	_previewImg($img);
    		}
    	}
    }
    
    /**
    * 提供一个方法，获取上传控件上传成功的文件名字。多个文件名用 “;” 分隔
    */  
    me.getUploadedNames = function()
    {
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
     */
    me._closeWindow = function()
    {
    	me.trigger("closed");
    }
    
    /**
     * 提供一个方法，创建调用后台服务的 HTTP 对象。
     */
    me.createXMLHttpRequest = function(){
        var xmlHttp = null;
        if (window.ActiveXObject) {
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        } else if (window.XMLHttpRequest) {
            xmlHttp = new XMLHttpRequest();
        };
        return xmlHttp;
    };
    
    function isIgnoreGlobalSet(p_attrName)
    {
          if($isArray(me.ignoreGlobalSet))
          {
              return me.ignoreGlobalSet.contains(p_attrName);
          }
          return false;
    }
    
    /**
     * 所有文件上传后触发
     */
    function _onallitemuploaded(){
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
    	var args = {cancel: false, item : p_args.item};
    	if (me.udsParam != null)
    		p_args.item.setUdsParam(me.udsParam);
    	me.trigger("itemuploading",args);
    	p_args.cancel = args.cancel;
    }
    
     // 上传失败
    function _onitemuploaderror()
    {
    	me.trigger("itemuploaderror");
    }
    
    // 文件项选择改变后
    function _onitemselected(p_args)
    {
    	me.trigger("selectionchanged", p_args);
    }
    
    // 显示预览页面
    function _previewImg($img)
    {
    	if($img)
    	{
			var _$previewMask = $("<div class='previewMask mx'/>");
			var $maskTable = $("<table id='maskTable' cellspacing=0; border=0;><tr><td align=center></td></tr></table>");
			
	    	var $preview = $("<div class='preview'/>");
	    	var $content = $("<div id='content'/>");
	    	var $btnClose = $("<div id='btnClose'/>");
	    	var $table = $("<table cellspacing=0; border=0; align=center><tr><td align=center></td></tr></table>");
			
	    	$(document.body).append(_$previewMask);
	    	_$previewMask.append($maskTable);
	    	
	    	$maskTable.find("td").append($preview);
	    	$preview.append($btnClose);
	    	$preview.append($content);
	    	$content.append($table);
	    	$table.find("td").append($img);
	    	
	    	$btnClose.click(function(){_$previewMask.detach();});
	    	_$previewMask.on("click",function(e){
	    		e.stopPropagation();
	    	});
    	}
    }
    
    // 本地图片 ie滤镜
    function _localImg(p_fileInfo)
    {
    	
    }
    
    // ie 获取图片大小
	function _getSizeInfo(p_path)
	{
		
		// 临时元素，计算完成后删除
		
	};
	
    function _imgloader(p_path, p_mode)
    {
		return "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + p_path + "', sizingMethod='" + p_mode + "')";
	};
	
	base.dispose = me.dispose;
    /**
	* 释放对象运行时动态生成的内容（属性、方法、事件）。
	*/
    me.dispose = function()
    {
    	if (me.vault)
    	{
    		me.vault.dispose();
    		me.vault = null;
    		delete me.vault;
    	}
    	
    	base.dispose();
    }
	
    me.endOfClass(arguments);
    return me;
};
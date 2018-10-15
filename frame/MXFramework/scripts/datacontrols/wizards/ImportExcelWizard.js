$ns("mx.datacontrols.wizards");

$import("mx.containers.HSplit");
$import("mx.controls.ToolBar");
$import("mx.controls.DragUploadControl");
$import("mx.datacontrols.DataForm");
$import("mx.windows.WizardWindow");

/**
 * 提供一个导入 Excel 的向导。请使用 {@link mx.windows.WindowManager} 创建。
 */
mx.datacontrols.wizards.ImportExcelWizard = function()
{
    var me = $extend(mx.windows.WizardWindow);
    var base = {};

    /**
     * @ignore
     */
    me.width = 600;
    /**
     * @ignore
     */
    me.height = 500;

    /**
     * 获取或设置预览表格的 {@link mx.datacontainers.EntityContainer.baseUrl} 属性。
     * 初始化该控件时，必须设置该属性
     */
    me.previewGridBaseUrl = null;
    
    /**
     * 参见 {@link mx.io.FileUploader.params} 字段。
     */
    me.params = null;
    
    /**
     * 一个字符串，表示处理 Excel 的服务端地址。
     */
    me.importExcelUrl = "~/../mx/servlets/importExcelServlet";
    
    /**
     * 一个数组，表示需要导入的列信息。数组中每个元素为 JSON 对象（如{ name:"sex", caption:"性别" }）。
     */
    me.importColumns = [];
    
    /**
     * 一个数组，表示需要导入的 Excel 数据读取设置信息。请参考 {@link mx.datacontrols.DataGrid.importExcelOptions}
     */
    me.importExcelOptions = {horizontalBegin : 1, horizontalEnd : 0, 
    						verticalBegin : 1, verticalEnd : 0, 
    						sheetNumber : 1, separatorNum : 0,
    						saveByDefault: true
    						};

    /**
     * 一个回调函数，表示向导完成后执行该方法。
     */
    me.finishCallback = null;
    
    /**
     * 获取一个 {@link mx.datacontrols.DataGrid} 对象，表示预览导入数据的表格。
     * @ignore
     */
    me._previewGrid = null;
    
    var _isShow = false;
    var _dataForm = null;
    base.init = me.init;
    me.init = function()
    {
        base.init();
        me.wizard.on("stepchanging", _step_changing);
        me.wizard.on("finished", _wizard_finished);
        me.wizard.appendSteps([
            {
                name:"optionStep",
                text:mx.msg("OPTIONS"),
                description:mx.msg("IMPORT_EXCEL_WIZARD_OPTION_DESCRIPTION")
            },
            {
                name:"uploadStep",
                text:mx.msg("IMPORT_EXCEL_WIZARD_UPLOAD_EXCEL"),
                description:mx.msg("IMPORT_EXCEL_WIZARD_UPLOAD_EXCEL_DESCRIPTION")
            },
            {
                name:"previewStep",
                text:mx.msg("IMPORT_EXCEL_WIZARD_ANALYSE_RESULT"),
                description:mx.msg("IMPORT_EXCEL_WIZARD_ANALYSE_RESULT_DESCRIPTION")
            }
        ]);
        _initOptionStep();
        _initUploadStep();
        _initPreviewStep();
    };

    base.show = me.show;
    me.show = function()
    {
        base.show();
        
        if (_isShow)
        {
            _impColEditor.checkAll();
            _uploadCtrl.clearItems();
            
            me.wizard.moveTo(0);
        }
        _isShow = true;
    };
    
    var _impColEditor = null;
    me.setImportColumns = function(p_columns)
    {
        me.importColumns = p_columns;
        _optionForm.setFields([
            [
                mx.msg("IMPORT_OPTIONS"),
                {
                    name : "importColumn",
                    caption : mx.msg("IMPORT_COLUMN"),
                    nullable : true,
                    editorType : "ListEditor",
                    displayCheckBox : true,
                    height : 320,
                    items : me.importColumns,
                    displayMember : "caption",
                    valueMember : "name"
                }
            ]
        ]);

        _impColEditor = _optionForm.editors["importColumn"];
        if (_impColEditor != null)
        {
            _impColEditor.on("changed", _impColEditor_changed);
            _impColEditor.checkAll();   
            _impColEditor_changed();
        }        
    };

    /**
     * 预览数据表格的保存方法。可重写。
     */    
    me.previewGridSave = function()
    {
        me._previewGrid.save();
    };
    
    function _executeCommand(p_command)
    {
    	switch (p_command)
    	{
    		case "save":
    			me.previewGridSave();
    			break;
    		case "uploadItem":	
    		    me._previewGrid.clearItems();
    		    _uploadCtrl.uploadAll();
    		    break;
    		case "deleteItem":
    		    me._previewGrid.clearItems();
    		    _uploadCtrl.clearItems();
    		    break;
    	}
    }
    
    var _optionForm = null;
    function _initOptionStep()
    {
        var step = me.wizard.steps["optionStep"];
        if (step != null)
        {
            if (_optionForm == null)
            {
                _optionForm = new mx.datacontrols.DataForm(
                {
                    captionColumnWidth:70
                });
                _optionForm.entityContainer.type = "local";
                _optionForm.load();
                step.addControl(_optionForm);
            }
        }
    }

    var _uploadCtrl = null;
    function _initUploadStep()
    {
        var step = me.wizard.steps["uploadStep"];
        if (step != null)
        {
        	
        	var split = new mx.containers.HSplit({
                rows:"90px,auto",
                resizable:false,
                borderThick:0
            });
        	
        	_dataForm = new mx.datacontrols.DataForm(
			{
				maxCols : 3,
				fields : [["导入选项配置",
						{
							name : "horizontalBegin",
							caption : mx.msg("IMPORT_EXCEL_HORIZONTALBEGIN"),
							value : me.importExcelOptions.horizontalBegin,
							lineBreak : false
						},{
							name : "horizontalEnd",
							caption : mx.msg("IMPORT_EXCEL_END"),
							value : me.importExcelOptions.horizontalEnd,
							lineBreak : false
						},{
							name : "verticalBegin",
							caption : mx.msg("IMPORT_EXCEL_VERTICALBEGIN"),
							value : me.importExcelOptions.verticalBegin,
							lineBreak : false
						},{
							name : "verticalEnd",
							caption : mx.msg("IMPORT_EXCEL_VERTICALEND"),
							value : me.importExcelOptions.verticalEnd,
							lineBreak : false
						},{
							name : "sheetNumber",
							caption : mx.msg("IMPORT_EXCEL_SHEETNUMBER"),
							value : me.importExcelOptions.sheetNumber,
							lineBreak : false
						},{
							name : "separatorNum",
							caption : mx.msg("IMPORT_EXCEL_SEPRATORNUM"),
							value : me.importExcelOptions.separatorNum,
							lineBreak : false
						}
	
				]],
				entityContainer : new mx.datacontainers.FormEntityContainer(
				{
					type : "local"
				})
			});
			_dataForm.load();
            split.addControl(_dataForm);
            if (_uploadCtrl == null)
            {
                _uploadCtrl = new mx.controls.DragUploadControl(
                {
                    maxCount:1,
                    url:mx.mappath(me.importExcelUrl),
                    itemMenu:{
                        items:[
                        {
                            name: "uploadItem",
                            text: mx.msg("ANALYSE_FILE")                            
                        }, 
                        "-",
                        {
                            name: "deleteItem",
                            text: mx.msg("DELETE")
                        }],
                        onitemclick:function(e){
                            _executeCommand(e.item.name);
                        }
                    },
                    contextMenu:
                    {
                        items:
                        [
                        {
                            name: "uploadItem",
                            text: mx.msg("ANALYSE_FILE")
                        }, 
                        "-",
                        {
                            name: "deleteItem",
                            text: mx.msg("DELETE")
                        }],
                        onitemclick:function(e){
                            _executeCommand(e.item.name);
                        }
                    },                    
                    onitemuploading: _itemuploading,
                    onuploadcomplete:_upload_complete
                });
                
                split.addControl(_uploadCtrl, 1);
            }
            step.addControl(split);
        }
    }
    
    function _initPreviewStep()
    {
        var step = me.wizard.steps["previewStep"];
        if (step != null)
        {
        	step.$e.css("padding", "5px");
            if (me._previewGrid == null)
            {
            	var split = new mx.containers.HSplit({
                    rows:"25px,auto",
                    resizable:false,
                    borderThick:0
                });
                
                var bar = new mx.controls.ToolBar({
                    items:[
                        { name:"save", text:mx.msg("SAVE"), enabled: !me.importExcelOptions.saveByDefault}       
                    ],
                    onitemclick:function(){
                		_executeCommand("save");
                	}
                });
                
                split.addControl(bar);
                
                me._previewGrid = new mx.datacontrols.DataGrid({
                    baseUrl:me.previewGridBaseUrl,
                    primaryKey: me.pk,
                    contextMenu:{
                        items:[
                            {
                                name: "save",
                                text: mx.msg("SAVE"),
                                onclick: function(){
                                    _executeCommand("save");
                                }
                            }
                        ]
                    }
                });
                me._previewGrid.entityContainer.type = "local";
                split.addControl(me._previewGrid, 1);
                step.addControl(split);
            }
        }
    }
    
    var _checkedColumns = [];
    function _step_changing(e)
    {
        var step = e.step;
        var nextStep = e.nextStep;
        if (step == null) return;
        
        if (step.name == "optionStep")
        {            
            if (_checkedColumns.length == 0)
            {
                e.cancel = true;
                mx.indicate("info", mx.msg("IMPORT_EXCEL_COLUMN_UNCHECKED"));
            }
        }
        else if (step.name == "uploadStep" && nextStep.name == "previewStep")
        {
			if (_uploadCtrl.items.length == 0)
			{
				e.cancel = true;
				mx.indicate("warn", mx.msg("IMPORT_EXCEL_SELECT_FILE"));
			}   
			if (!me.importExcelOptions.saveByDefault && _uploadCtrl.items.length > 0 && _uploadCtrl.items[0].status != _uploadCtrl.uploadStatus.COMPLETE)
			{
				e.cancel = true;
				mx.indicate("warn", mx.msg("IMPORT_EXCEL_ANALYSE_FILE"));
			}
			
			if (me.importExcelOptions.saveByDefault)
			{
				_uploadCtrl.uploadAll();
			}
        }
    }

    function _impColEditor_changed()
    {
        _checkedColumns = _impColEditor.getCheckedItems();
        var columns = [];
        var strColumns = "";
        var strCaptions = "";
        for (var i = 0; i < _checkedColumns.length; i++)
        {
            var value = _checkedColumns[i].value;
            var text = _checkedColumns[i].text;
            if (i == 0)
            {
                strColumns = value;
                strCaptions = text;
            }
            else
            {
                strColumns += "," + value;
                strCaptions += "," + text;
            }
            columns.add({ name:value, caption:text });
        }
        
        if (me._previewGrid != null)
        {
            me._previewGrid.setColumns(columns);
        }
        
        if (_uploadCtrl != null)
        {
            var params = {};
            if (me.params != null)
            {
                params = me.params;
            }
            params.columnNames = strColumns;
            params.columnCaptions = strCaptions;
            _uploadCtrl.setParams(params);
        }
    }
    
    function _itemuploading(e)
    {
    	//horizontalBegin|horizontalEnd|verticalBegin|verticalEnd|sheetNumber|separatorNum
		var impOptArray = [
			_dataForm.getEditor("horizontalBegin").value,
			_dataForm.getEditor("horizontalEnd").value,
			_dataForm.getEditor("verticalBegin").value,
			_dataForm.getEditor("verticalEnd").value,
			_dataForm.getEditor("sheetNumber").value,
			_dataForm.getEditor("separatorNum").value
		];

    	var _tempParams =
		{
			impOptions: impOptArray.toString()
		};
    	$.extend(e.item.params, _tempParams);
    }
    
    function _upload_complete(e)
    {
    	var result = null;
    	try
    	{
    		result = JSON.parse(e.resultValue);
    		if (typeof(result.successful) != "undefined" && (result.successful == true || result.successful == "true"))
            {
                var items = result.resultValue.items;
                
                var parseResult = true;
                if ($isFunction(me.importExcelOptions.parseExcelCallBack))
    			{
                	parseResult = me.importExcelOptions.parseExcelCallBack(items);
    			}
    			
    			if (parseResult === false)
    			{
    				mx.indicate("error", mx.msg("UPLOAD_ANALYSE_ERROR"));
    				return;
    			}
                
                for (var i = 0; i < items.length; i++)
                {
                    me._previewGrid.entityContainer.create(items[i]);
                }
                
                if (me.importExcelOptions.saveByDefault)
    			{
                	me.previewGridSave();
    			}
                
                me.wizard.moveNext();
                me.wizard.$bottom.find("#btnBack").attr("disabled", true);
            }
    		else
    		{
    			if (_uploadCtrl != null && _uploadCtrl.items.length > 0)
        	    {
        	        _uploadCtrl.items[0].setStatus(_uploadCtrl.uploadStatus.ERROR);
        	        mx.indicate("error", mx.msg("UPLOAD_ANALYSE_ERROR"));
        	    }
    		}
    	}
    	catch (e)
    	{
    	    if (_uploadCtrl != null && _uploadCtrl.items.length > 0)
    	    {
    	        _uploadCtrl.items[0].setStatus(_uploadCtrl.uploadStatus.ERROR);
    	        mx.indicate("error", mx.msg("UPLOAD_ANALYSE_ERROR"));
    	    }
    	}
    }
    
    function _wizard_finished()
    {
        if (me.finishCallback != null)
        {
            me.finishCallback();
        }
    }
    
    me.endOfClass(arguments);
    return me;
};
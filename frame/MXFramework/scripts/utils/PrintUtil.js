$ns("mx.utils");
$import("mx.lib.jqprint");

/**
 * 提供局部元素打印功能：目前仅支持 DataForm 和 单层 DataGrid 打印。 
 *
 * @example 
 * 以下是一个通过 <b>mx.utils.PrintUtil</b> 实现局部元素打印。
 * <code language="JavaScript">
 *  var printCon = new mx.utils.PrintUtil({
 *    	dataControl : dataControl,
 *    	maxCols : 2,
 *    	printHideFields : true
 *   });
 *   printCon.printControl();
 * </code>
 */
mx.utils.PrintUtil = function()
{
    var me = $extend(MXComponent);

    /**
     * 是否打印默认隐藏的字段。
     * 
     * @default true
     */
    me.printHideFields = true;
    
    /**
     * 是否按照原表单样式打印。
     * 
     * @default false
     */
    me.printFormStyle = false;
    
    /**
     * 一个control对象，需要根据此对象生成新的html代码。
     * 目前仅支持 DataForm 和 单层 DataGrid 打印，传入的参数需提前执行加载方法。 
     */
    me.dataControl = null;
    
    /**
     * 设置或获取创建打印预览窗体的窗口管理类对象，{@link mx.windows.WindowManager}
     */
    me.windowManager = null;

    /**
     * 获取和设置单行中元素列数。
     * 
     * @default 默认显示2个元素列
     */
    me.maxCols = 2;
    
    var formpre = null;

    var $prtable = null;

    var colsNumber = 1;
    
    var $tr = null;
    
    var $tdcaption = null; 
    
    var $tdvalue = null;
    
   	var empty_tr = false;
   	
   	//紧凑显示的列数，超过该列数调整行号和复选框的宽度，同时将字体设置为9px
   	var condenseCols = 10;
   	
   	var rowNumberColWidth = "20px";
    
    /**
     * 提供一个方法，打印表单内容。
     * 
     * @param p_preview :
     *            true | false 一个 Boolean 值，表示是否启用打印预览功能，默认 true
     *            true : 表示显示打印预览
     *            false : 表示不显示打印预览，直接打印
     */
    me.printControl = function(p_preview)
    {
    	if(me.dataControl == null)
    	{
    		var msgBox = new mx.windows.MessageBox({
				reusable : false,
				title : mx.msg("PRINT_FAILED"),
				okButtonText : mx.msg("OK"),
				message : mx.msg("PRINT_FAILED_MESSAGE"),
				imgkey : "error",
				showCancelButton : false,
				height:120
			});
			msgBox.show();
			return;
		}
		
        if ($isEmpty(p_preview) || p_preview == true)
        {
            previewPrintControl();
        }
        else
        {
            if($instanceOf(me.dataControl, mx.datacontrols.DataForm) && me.printFormStyle)
        	{
        		printFormStyle(_generatePrintHtml());
        	}
        	else
    		{
        		_generatePrintHtml().jqprint();
    		}
        }
    };
    
    /**
     * @ignore
     * 
     * 根据传入的dataControl类型调用不同的html解析器。
     */
    function _generatePrintHtml()
    {
    	if($instanceOf(me.dataControl, mx.datacontrols.DataForm))
		{
    		if(me.printFormStyle)
    		{
    			return _generateDataFormHtmlStyle();
    		}
    		else
			{
    			return _generateDataFormHtml();
			}
			
    	}
    	else if($instanceOf(me.dataControl, mx.datacontrols.DataGrid))
		{
			if(me.dataControl.$e.hasClass("groupHeaderGrid"))
			{
				return _generateGroupHeaderGridHtml();
			}
			else if(me.dataControl.$e.hasClass("groupLockHeaderGrid"))
			{
			    return _generateGroupLockHeaderGridHtml();
			}
			else
			{
				return _generateDataGridHtml();
			}
    	} 
   	}

	/**
     * @ignore
     * 
     * 解析并重新生成表单中所有字段的html代码。
     */
    function _generateDataFormHtml()
    {
        $(".show_table").empty().remove();
        formpre = me.dataControl.$e;
        $prtable = $("<table cellpadding=0 cellspacing=0 style='table-layout:fixed;width:100%' class='show_table'><tr class='left_empty'><td class='left' style='width:150px;'></td><td></td></tr></table>");
        for (var i = 0; i < me.dataControl.fields.length; i++)
        {
            if ($isArray(me.dataControl.fields[i]))
            {
                // 如果是 fieldGroup 的话，就先输出fieldGroup的标题
                $tr = $("<tr class='fieldGroupTr'><td class='l'></td><td></td></tr>");
                var expandImgUrl = mx.mappath("$theme/images/expand.png");
                $tr.find("td.l").html("<img src=" + expandImgUrl + "><b>" + me.dataControl.fields[i].caption + "</b>");
                $prtable.append($tr);
                _parseArrayType(me.dataControl.fields[i]);
                colsNumber = me.maxCols;
            }
            else if ($isObject(me.dataControl.fields[i]))
            {
            	//打印时，如果第一行不是两个td，会导致页面变形，故此即使没有fieldGroup，也模拟生成fieldGroup的tr。
            	if(!empty_tr)
            	{
	            	$tr = $("<tr class='empty_tr'><td class='l'></td><td></td></tr>");
	                $prtable.append($tr);
	            	empty_tr = true;
	                colsNumber = me.maxCols;
            	}
                
                if (me.printHideFields)
                {
                    _parseObjectType(me.dataControl.fields[i], i, true);
                }
                else
                {
                    _parseObjectType(me.dataControl.fields[i], i, false);
                }
            }
        }

        $prtable.find("tr.fieldGroupTr").css({
            "min-height" : "23px"
        });

        $prtable.find("tr td").css({
            "padding-top" : "5px",
			"padding-right": "25px",
            "padding-bottom" : "5px",
            "vertical-align" : "top"
        });
        
        $prtable.find("tr td.l").css({
            "width" : "150px",
            "font-weight" : "bold",
            "text-align" : "right"
        });
        
        $prtable.find("tr td.t").css({
            "font-weight" : "normal"
        });
        
        var td$inputEditor = $prtable.find("td.inputEditor");
        
        td$inputEditor.find("input").css({
            "width" : "100%",
            "height" : "auto!important",
            "height" : "23px",
            "min-height" : "23px",
            "line-height" : "23px",
            "border" : "1px solid #ccc"
        });
        
        td$inputEditor.find(".listEditor").css({
            "width" : "100%",
            "height" : "auto!important",
            "_min-height" : "23px",
            "border" : "1px solid #ccc"
        });
        
        td$inputEditor.find(".listEditorNew").css({
            "width" : "100%",
            "height" : "auto!important",
            "min-height" : "23px",
            "_height" : "23px",
            "border" : "1px solid #ccc",
            "background-color" : "white"
        });
        
        td$inputEditor.find("div.richTextEditor").css({
            "width" : "100%",
            "height" : "auto!important",
            "min-height" : "80px",
            "_height" : "80px",
            "border" : "1px solid #ccc",
            "background-color" : "white"
        });
        
        td$inputEditor.find("div.richTextEditor .imitationtextarea").css({
            "width" : "100%",
            "height" : "auto!important",
            "min-height" : "78px",
            "_height" : "78px",
            "border" : "none"
        });
        
        td$inputEditor.find("div.listEditorNew").find("input").css({
            "width" : "100%",
            "height" : "auto!important",
            "min-height" : "0px",
            "height" : "0px",
            "line-height" : "0px",
            "border" : "0px",
            "visibility" : "hidden",
            "background-color" : "white"
        });
        
        td$inputEditor.find("div.richTextEditor").find("input").css({
            "width" : "100%",
            "height" : "auto!important",
            "min-height" : "0px",
            "height" : "0px",
            "line-height" : "0px",
            "border" : "0px",
            "visibility" : "hidden",
            "display" : "none",
            "background-color" : "white"
        });
        
        $prtable.find("tr.empty_tr td").css({
            "padding-top" : "0px",
            "padding-bottom" : "0px",
            "overflow" : "hidden",
            "height" : "0"
        });
        
        $prtable.find("tr.empty_tr td.l").css({
            "width" : "150px",
            "overflow" : "hidden"
        });
        
        var $linkEditor = $prtable.find(".LinkEditor");
        $linkEditor.find("input.for_hidden_input").css({
            "padding-top" : "0px",
            "border" : "0",
            "min-height" : "0",
            "line-height" : "0",
            "padding-bottom" : "0px",
            "overflow" : "hidden",
            "height" : "0"
        });
        $linkEditor.find("span#text").css({
            "color" : "#477bab"
        });
        
        $linkEditor.find("span#img").css({
            "width" : "16px",
            "float" : "left",
            "height" : "16px",
            "margin" : "0px"
        });
        
        td$inputEditor.find("div.checkListEditor").find("span#img").css({
            "width" : "16px",
            "float" : "left",
            "height" : "16px",
            "overflow" : "hidden"
        });
        
        td$inputEditor.find("span#img img").css({
            "width" : "16px",
            "height" : "16px",
            "border" : "none"
        });
        
        if(navigator.userAgent.indexOf("MSIE 9.0") > -1)
        {
        	td$inputEditor.find("div.richTextEditor .imitationtextarea").css({
                "height" : "78px",
                "overflow " : "visible"
            });
        }
        
        /**
         * @ignore
         * 
         * 在输出之前处理，如果是一行有多个td的话，就将td放入到一个table中，这样就可以达到所有都自适应的效果。
         */
        $prtable.find("tr").each(function(e)
        {
            var tdLength = $(this).find("td").length;
            if (tdLength > 2)
            {
                var newTable = $("<td colspan='2' style='pading:0;'><div style='width:100%;'><table cellpadding=0 cellspacing=0 style='width:100%;table-layout: fixed;' class='new_table'></table></div></td>");
                var cloneTr = $(this).clone();
                newTable.find("table.new_table").append(cloneTr);
                $(this).empty().append(newTable);
            }
        });

        $prtable.find("input").attr("readonly", "readonly");
        return $prtable;
    }
    
    /**
     * @ignore
     * 
     * 解析原表单中所有字段的html代码。
     */
    function _generateDataFormHtmlStyle()
    {
    	var _form = me.dataControl.$e.clone();
    	var _editors = me.dataControl.editors;
    	
    	// 隐藏customeditor的button
    	_form.css("margin-top","20px");//此行可防止打印时出现空白页
    	_form.find("#customBtn,#dropDownButton,#buttonContainer").hide();
    	_form.find(".hint").siblings("input").show();
    	
    	var _editorDiv = _form.find(".editor > div");
    	_editorDiv.css({"padding" : "0px" , "width" : "100%"});
    	
    	if(_editorDiv.hasClass("disabled"))
    	{
    		_editorDiv.css({"background-color" : "#F6F6F6"});
    	}
    	
    	for(var i = 0; i < _editors.length; i++) 
    	{
    		var _editor = _editors[i];
    		var _text = _editor.text;
    		var _name = _editor.name;
    		
    		var _inputEditor = _form.find("#" + _name + " #inputContainer > input").eq(0);
    		
    		if(_inputEditor.length)
    		{
    			_inputEditor.attr("value" , _text);
    			_inputEditor.siblings().hide();
    			_inputEditor.css({"background":"none"});
    			_inputEditor.parent().css({"width":"100%"});
    		}
    			
    		if (_editor.editorType == "TextEditor")
            {
            	if(_editor.textMode == "multiline")
            	{
            		var _div = _form.find("#" + _name + " .editor > div");
            		_div.css({"border":"1px solid #ADB2B5"});
            		_div.html(_text);
            	}
            } 
    		else if(_editor.editorType == "CheckEditor") 
            {
            	var _divEditor = _form.find("#" + _name + " .editor > .checkEditor");
            	var _checkBox = $("<input class='customCss' type='checkbox' />");
            	_checkBox.hide();
            	if(_divEditor.hasClass("checked")) 
            	{
            		_checkBox.attr("checked" , "true");
            	}
            	_divEditor.children("#img").html(_checkBox);
            }
    		else if(_editor.editorType == "NumberEditor")
    		{
    			var _inputEditor = _form.find("#" + _name + "  #inputDomain").eq(0);
        		
        		if(_inputEditor.length)
        		{
        			_inputEditor.attr("value" , _text);
        			_inputEditor.siblings().hide();
        			_inputEditor.css({"background":"none"});
        			_inputEditor.parent().css({"width":"100%"});
        		}
    		}
    		else if(_editor.editorType == "PictureManagerEditor")
			{
    			var _inputEditor = _form.find("#" + _name + "  .pictureManagerEditor").eq(0);
    			_inputEditor.css({"height":"20px"});
    			_inputEditor.empty();
			}
    		else if(_editor.editorType == "RichTextEditor")
			{
    			var _inputEditor = _form.find("#" + _name + "  .richTextEditor").eq(0);
    			var _textarea = _form.find("#" + _name + "  textarea").eq(0);
    			_textarea.css({width : "100%"  , height : "100%"});
    			_inputEditor.empty();
    			_inputEditor.append(_textarea);
    			_textarea.show();
			}
    		else if(_editor.editorType == "ListEditor")
    		{
    			var _inputEditor = _form.find("#" + _name + "  .listEditor").eq(0);
    			_inputEditor.css({height : "100%"});
    			var _ul = _inputEditor.find("ul");
    			if(_ul)
				{
    				_ul.css({"list-style" : "none" , padding : "0px" , "margin-top" : "3px"});
				}
    			
    			var _a = _inputEditor.find("ul li a");
    			if(_a)
    			{
    				_a.removeAttr("href");
    			}
    		}
    		else if(_editor.editorType == "CheckListEditor")
    		{
    			var _inputEditor = _form.find("#" + _name + "  .checkListEditor").eq(0);
    			_inputEditor.css({height : "100%"});
    		}
    	}
    	return _form;
    }
    
      /**
     * @ignore
     * 
     * 解析并重新生成固定多表头表格中所有字段的html代码。
     */
    function _generateGroupLockHeaderGridHtml()
    {
    	$(".show_table").empty().remove();
        $prtable = $("<table cellpadding=0 cellspacing=0 style='table-layout:fixed;width:100%;border-collapse:collapse;' class='show_table dataGrid'><tr><td class='printHead'></td></tr><tr><td class='printBody'></td></tr></table>");
        var data = me.dataControl.entityContainer.data;
    	var columns = me.dataControl.columns;
    	var $bodyLeftTable = me.dataControl.$bodyLeftTable;
    	var $bodyRightTable = me.dataControl.$bodyRightTable;
    	
    	if ($isEmpty($bodyLeftTable) || $isEmpty($bodyRightTable))
    	{
    		return;
    	}
    	
        var $printBodyTable = $("<table cellpadding=0 cellspacing=0 style='table-layout:fixed;width:100%' class='printBodyTable'/>");
        var $printHeadTable = _generGroupHeadHeadColumn();
        
		var _tempGroupName = null;
		var _tempCount;
		var _tdLength;
		var $leftTrArr = $bodyLeftTable.find("tr");
		var $rightTrArr = $bodyRightTable.find("tr");
        for(var j = 0; j < data.length; j++)
    	{
    		var trGroup = $("<tr/>");
    		var _tempLocalGroupName = data[j][me.dataControl.groupColumn];
    		//如果临时的变量为空，并且在obj里面groupName不为空，就初始化临时groupName。
    		if(_tempLocalGroupName != null && _tempGroupName == null || _tempLocalGroupName !=_tempGroupName)
    		{
    			// 如果是 fieldGroup 的话，就先输出fieldGroup的标题
                var expandImgUrl = mx.mappath("$theme/images/expand.png");
    			
                var _tempKongTr = $("<tr class='kong_tr'></tr>");
    			if(me.dataControl.displayRowNumber)
    			{
    				_tempKongTr.append("<td width='" + (columns.length < condenseCols ? me.dataControl.rowNumberColWidth * 2 : rowNumberColWidth) + "' class='l'></td>");
    			}
    			if(me.dataControl.displayCheckBox)
    			{
    				_tempKongTr.append("<td width='" + (columns.length < condenseCols ? me.dataControl.rowNumberColWidth : rowNumberColWidth) + "'></td>");
    			}
    			$printBodyTable.append(_tempKongTr);
    			
    			_tempGroupName = _tempLocalGroupName;
    			trGroup.append($("<td><img src=" + expandImgUrl + "><b>" + _tempGroupName + "</td>"));
    			$printBodyTable.append(trGroup);
    		}
    		
    		var $trData = $("<tr/>");
    		if(j % 2 != 0)
    		{
	    		var $trData = $("<tr class='even'/>");
    		}
    		//表头中是否显示行号
			if(me.dataControl.displayRowNumber)
    		{
    			$trData.append($("<td class='tdCen' width='" + (columns.length < condenseCols ? me.dataControl.rowNumberColWidth * 2 : rowNumberColWidth) + "'>" + (j+1) + "</td>"));
    		}
    		
    		//表头中是否显示checkbox
    		if(me.dataControl.displayCheckBox)
			{
				$trData.append($("<td class='tdCen' width='" + (columns.length < condenseCols ? me.dataControl.rowNumberColWidth : rowNumberColWidth) + "'><input type='checkbox'name='checkbox'/></td>"));
			}
		    
    		for(var x = 0; x < columns.length; x++)
    		{
    			var _captionName = columns[x].name;
    			if(columns[x].isPrint == false || me.dataControl.primaryKey === _captionName)
    			{
    				continue;
    			}
	    		if(_captionName != me.dataControl._tempColumnName && columns[x].visible)
	    		{
	    			if (columns[x].locked === true)
	    			{
	    				$trData.append($("<td>" + ($($leftTrArr[j].cells[_captionName]).text() || "") + "</td>"));
	    			}
	    			else
	    			{
	    			    $trData.append($("<td>" + ($($rightTrArr[j].cells[_captionName]).text() || "") + "</td>"));
	    			}	
	    		}
    		}
    		
    		trGroup.find("td").attr("colspan", $trData.find("td").length);
			$printBodyTable.append($trData);
    	}
    	
    	 var td$printHead = $prtable.find("td.printHead");
        var td$printBody = $prtable.find("td.printBody");
        
        td$printHead.append($printHeadTable);
        td$printBody.append($printBodyTable);
    	
    	//是否显示统计信息
    	if(me.dataControl.displayStatisticRow)
    	{
	    	var $trStatic = $("<tr><td><table style='width:100%;border:1px solid #E3E8EE;border-top:0;' cellpadding='0' cellspacing='0'><tr class='t'></tr></table></td></tr>");;
	    	for(var i = 0; i < columns.length; i++)
	    	{
		    	//加判断是为了解决有个临时列的问题
	    		var captionParent = columns[i];
	    		if(captionParent.name != "me.dataControl._tempColumnName")
	    		{
	    			var staticV = captionParent.statisticValue;
	    			if(staticV == null) staticV = '';
	    			$trStatic.find("tr.t").append($("<td style='text-align:right;height:23px;padding-right:0px;background-color:#f0f0f0;'>" + staticV + "</td>"));
	    		}
	    	}
	        $prtable.append($trStatic);
    	}
        
    	//是否显示边框
    	if(me.dataControl.displayColSplitLine)
    	{
	        td$printBody.find("tr").find("td").css({
	            "border-right" : "1px solid #E3E8EE",
	            "border-top" : "1px solid #E3E8EE"
	        });
	        
	        $prtable.find("td.printHead").find("tr").find("td").css({
	            border: "1px solid #E3E8EE"
	        });
	        
	        $printHeadTable.find("tr").find("td:first").css({
	            "border-left" : "1px solid #E3E8EE"
	        });
	        $printBodyTable.find("tr").find("td:first").css({
	            "border-left" : "1px solid #E3E8EE"
	        });
	        $printBodyTable.find("tr:last").find("td").css({
	            "border-bottom" : "1px solid #E3E8EE"
	        });
	        //去除上面的border
	        $printBodyTable.find("tr:first").find("td").css({
	            "border-top" : "none"
	        });
    	}
        
    	//设置数据区的格式
        td$printBody.find("tr").find("td").css({
            "height" : "100%"
        });
        
        if (columns.length > condenseCols)
        {
        	 td$printHead.find("tr").find("td").css({
	            "font-size" : "9px"
	         });
	         
        	 td$printBody.find("tr").find("td").css({
	            "font-size" : "9px"
	         });
        }
        
        $printBodyTable.find("tr.even").find("td").css({
            "background-color" : "#FAFAFA"
        });
        
        $prtable.find("table").find("td").css({
            "padding" : "0 2px"
        });
        $prtable.find("table").find("td[class='tdCen']").css({
            "text-align" : "center"
        });
        
        td$printBody.find("tr.kong_tr").find("td").css({
            "border" : "0",
            "height" : "0",
            "overflow" : "hidden"
        });
        
        var tr$groupTr = $prtable.find("tr.groupTr");
        tr$groupTr.find("table").attr({ 
    		cellpadding: "0", 
    		cellspacing: "0" 
        });
        
        tr$groupTr.find("td").css({
            "padding" : "0",
            "vertical-align" : "top",
            "text-align" : "center"
        });
        
        $prtable.find("td.no_child").css({
            "border" : "1px solid #E3E8EE"
        });
        
        $prtable.find("td.has_child").css({
            "border" : "1px solid #E3E8EE"
        });
        
        $prtable.find("div.last_capton").css({
            "padding-left": "5px",
			"padding-right": "5px",
			"white-space": "nowrap",
			"overflow": "hidden",
			"text-overflow": "ellipsis"
        });
        
        _autoWrap();
    	return $prtable;	
    }
    
    /**
     * @ignore
     * 
     * 解析并重新生成多表头表格中所有字段的html代码。
     */
    function _generateGroupHeaderGridHtml()
    {
    	$(".show_table").empty().remove();
        $prtable = $("<table cellpadding=0 cellspacing=0 style='table-layout:fixed;width:100%;border-collapse:collapse;' class='show_table dataGrid'><tr><td class='printHead'></td></tr><tr><td class='printBody'></td></tr></table>");
        var data = me.dataControl.entityContainer.data;
    	var columns = me.dataControl.columns;
    	var $bodyTable = me.dataControl.$bodyTable;
    	
    	if ($isEmpty($bodyTable))
    	{
    		return;
    	}
    	
        var $printBodyTable = $("<table cellpadding=0 cellspacing=0 style='table-layout:fixed;width:100%' class='printBodyTable'/>");
        var $printHeadTable = _generGroupHeadHeadColumn();
        
		var _tempGroupName = null;
		var _tempCount;
		var _tdLength;
		var $trArr = $bodyTable.find("tr");
		var length = $trArr.length < data.length ? $trArr.length : data.length;
        for(var j = 0; j < length; j++)
    	{
    		var trGroup = $("<tr/>");
    		var _tempLocalGroupName = data[j][me.dataControl.groupColumn];
    		//如果临时的变量为空，并且在obj里面groupName不为空，就初始化临时groupName。
    		if(_tempLocalGroupName != null && _tempGroupName == null || _tempLocalGroupName !=_tempGroupName)
    		{
    			// 如果是 fieldGroup 的话，就先输出fieldGroup的标题
                var expandImgUrl = mx.mappath("$theme/images/expand.png");
    			
                var _tempKongTr = $("<tr class='kong_tr'></tr>");
    			if(me.dataControl.displayRowNumber)
    			{
    				_tempKongTr.append("<td width='" + (columns.length < condenseCols ? me.dataControl.rowNumberColWidth * 2 : rowNumberColWidth) + "' class='l'></td>");
    			}
    			if(me.dataControl.displayCheckBox)
    			{
    				_tempKongTr.append("<td width='" + (columns.length < condenseCols ? me.dataControl.rowNumberColWidth : rowNumberColWidth) + "'></td>");
    			}
    			$printBodyTable.append(_tempKongTr);
    			
    			_tempGroupName = _tempLocalGroupName;
    			trGroup.append($("<td><img src=" + expandImgUrl + "><b>" + _tempGroupName + "</td>"));
    			$printBodyTable.append(trGroup);
    		}
    		
    		var $trData = $("<tr/>");
    		if(j % 2 != 0)
    		{
	    		var $trData = $("<tr class='even'/>");
    		}
    		//表头中是否显示行号
			if(me.dataControl.displayRowNumber)
    		{
    			$trData.append($("<td class='tdCen' width='" + (columns.length < condenseCols ? me.dataControl.rowNumberColWidth * 2 : rowNumberColWidth) + "'>" + (j+1) + "</td>"));
    		}
    		
    		//表头中是否显示checkbox
    		if(me.dataControl.displayCheckBox)
			{
				$trData.append($("<td class='tdCen' width='" + (columns.length < condenseCols ? me.dataControl.rowNumberColWidth : rowNumberColWidth) + "'><input type='checkbox'name='checkbox'/></td>"));
			}
		
    		for(var x = 0; x < columns.length; x++)
    		{
    			var _captionName = columns[x].name;
    			if(columns[x].isPrint == false || me.dataControl.primaryKey === _captionName)
    			{
    				continue;
    			}
	    		if(_captionName != me.dataControl._tempColumnName && columns[x].visible)
	    		{
	    			$trData.append($("<td>" + ($trArr[j].cells[_captionName] ? $($trArr[j].cells[_captionName]).text() : "" || "") + "</td>"));
	    		}
    		}
    		
    		trGroup.find("td").attr("colspan", $trData.find("td").length);
			$printBodyTable.append($trData);
    	}
        
        var td$printHead = $prtable.find("td.printHead");
        var td$printBody = $prtable.find("td.printBody");
        
        td$printHead.append($printHeadTable);
        td$printBody.append($printBodyTable);
    	
    	//是否显示统计信息
    	if(me.dataControl.displayStatisticRow)
    	{
	    	var $trStatic = $("<tr><td><table style='width:100%;border:1px solid #E3E8EE;border-top:0;' cellpadding='0' cellspacing='0'><tr class='t'></tr></table></td></tr>");;
	    	for(var i = 0; i < columns.length; i++)
	    	{
		    	//加判断是为了解决有个临时列的问题
	    		var captionParent = columns[i];
	    		if(captionParent.name != me.dataControl._tempColumnName)
	    		{
	    			var staticV = captionParent.statisticValue;
	    			if(staticV == null) staticV = '';
	    			$trStatic.find("tr.t").append($("<td style='text-align:right;height:23px;padding-right:0px;background-color:#f0f0f0;'>" + staticV + "</td>"));
	    		}
	    	}
	        $prtable.append($trStatic);
    	}
        
        
    	//是否显示边框
    	if(me.dataControl.displayColSplitLine)
    	{
	        td$printBody.find("tr").find("td").css({
	            "border-right" : "1px solid #E3E8EE",
	            "border-top" : "1px solid #E3E8EE"
	        });
	        
	        $prtable.find("td.printHead").find("tr").find("td").css({
	            border: "1px solid #E3E8EE"
	        });
	        
	        $printHeadTable.find("tr").find("td:first").css({
	            "border-left" : "1px solid #E3E8EE"
	        });
	        $printBodyTable.find("tr").find("td:first").css({
	            "border-left" : "1px solid #E3E8EE"
	        });
	        $printBodyTable.find("tr:last").find("td").css({
	            "border-bottom" : "1px solid #E3E8EE"
	        });
	        //去除上面的border
	        $printBodyTable.find("tr:first").find("td").css({
	            "border-top" : "none"
	        });
    	}
        
    	//设置数据区的格式
        td$printBody.find("tr").find("td").css({
            "height" : "23px"
        });
        
        if (columns.length > condenseCols)
        {
        	 td$printHead.find("tr").find("td").css({
	            "font-size" : "9px"
	         });
        	
        	 td$printBody.find("tr").find("td").css({
	            "font-size" : "9px"
	         });
        }
        
        $printBodyTable.find("tr.even").find("td").css({
            "background-color" : "#FAFAFA"
        });
        
        $prtable.find("table").find("td").css({
            "padding" : "0 2px"
        });
        $prtable.find("table").find("td[class='tdCen']").css({
            "text-align" : "center"
        });
        
        td$printBody.find("tr.kong_tr").find("td").css({
            "border" : "0",
            "height" : "0",
            "overflow" : "hidden"
        });
        
        var tr$groupTr = $prtable.find("tr.groupTr");
        tr$groupTr.find("table").attr({ 
    		cellpadding: "0", 
    		cellspacing: "0" 
        });
        
        tr$groupTr.find("td").css({
            "padding" : "0",
            "vertical-align" : "top",
            "text-align" : "center"
        });
        
        $prtable.find("td.no_child").css({
            "border" : "1px solid #E3E8EE"
        });
        
        $prtable.find("td.has_child").css({
            "border" : "1px solid #E3E8EE"
        });
        
        $prtable.find("div.last_capton").css({
            "padding-left": "5px",
			"padding-right": "5px",
			"white-space": "nowrap",
			"overflow": "hidden",
			"text-overflow": "ellipsis"
        });
        
        _autoWrap();
    	
    	return $prtable;
    }
    
    var _rowspan = 0;
    function getGroupColumnMaxRowSpan(p_columns,p_rowspan){
    	if(p_rowspan == undefined){
    		_rowspan = p_rowspan = 1;
    	}
    	_rowspan = Math.max(_rowspan,p_rowspan);
    	for(var i=0;i<p_columns.length;i++){
    		if($isArray(p_columns[i].columns)){
    			getGroupColumnMaxRowSpan(p_columns[i].columns, p_rowspan + 1);
    			var isPrint = false;
    			for(var j=0;j<p_columns[i].columns.length;j++){
    				if(p_columns[i].columns[j].isPrint){
    					isPrint = true;
    					break;
    				}
    			}
    			p_columns[i].isPrint = isPrint;
    		}else{
    			var name = p_columns[i].name;
    			if(name == me.dataControl.primaryKey || name == me.dataControl._tempColumnName){//等于主键或临时列
    				p_columns[i].isPrint = false;
    			}else{
    				var column = me.dataControl.columns[name];
        			p_columns[i].isPrint = column.visible && column.isPrint;
    			}
    			
    		}
    	}
    	return _rowspan;
    }
    
    function getLeafNodeCount(p_column){
    	if($isArray(p_column.columns)){
    		var sum = 0;
    		for(var i=0;i<p_column.columns.length;i++){
    			sum = sum + getLeafNodeCount(p_column.columns[i]);
    		}
    		return sum;
    	}else if(p_column.isPrint){
    		return 1;
    	}
    	return 0;
    }
    
    function _generGroupHeadHeadHtml(p_headTable,p_column,p_index){
    	if(p_index == undefined) 
    		p_index = 0;
    	var rows = p_headTable.find("tr").size();//总的行数
    	for(var i=0;i<p_column.length;i++){
        	var column = p_column[i];
        	if(column.isPrint){//打印列
        		var rowSpan = getGroupColumnMaxRowSpan([column]);
        		var colspan = getLeafNodeCount(column);
        		var $td = $("<td align='center' vAlign='middle'><b>" + column.caption + "</b></td>");
        		$td.attr("colSpan", colspan);
        		if(rowSpan > 1){//代表有子列
        			$td.attr("rowSpan",1);
        			_generGroupHeadHeadHtml(p_headTable,column.columns,p_index + 1);
        		}else{//没有子列
        			if(p_index == 0){
        				$td.attr("rowSpan",rows);
        			}else{
        				if(p_index == rows -1){
        					$td.attr("rowSpan",rowSpan);
        				}else{
        					$td.attr("rowSpan",rows - p_index);
        				}
        			}
        		}
        		p_headTable.find("tr[rowIndex="+p_index+"]").append($td);
        	}
        }
    }
    
    function _generGroupHeadHeadColumn(){
    	var $printHeadTable = $("<table cellpadding=0 cellspacing=0 style='table-layout:fixed;width:100%;border-collapse:collapse;' class='printHeadTable'/>");
    	 var _columns = me.dataControl._jsonArrayClone(me.dataControl._columns);
    	 //获取分组grid的深度
    	 var rowspan = getGroupColumnMaxRowSpan(_columns);
    	 //生成行
    	 for(var i=0;i<rowspan;i++){
    		 $printHeadTable.append($("<tr style='height:24px;' rowIndex='"+ i +"' style=''/>"));
    	 }
    	 
         var $trCaption = $printHeadTable.find("tr[rowIndex=0]");
         //表头中是否显示行号
         if(me.dataControl.displayRowNumber)
 		 {
 			$trCaption.append($("<td class='tdCen' rowSpan='" + rowspan + "' width='" + (me.dataControl.columns.length < condenseCols ? me.dataControl.rowNumberColWidth * 2 : rowNumberColWidth) + "'></td>"));
 		 }
 		//表头中是否显示checkbox
         if(me.dataControl.displayCheckBox)
 		{
 			$trCaption.append($("<td class='tdCen' rowSpan='" + rowspan + "' width='" + (me.dataControl.columns.length < condenseCols ? me.dataControl.rowNumberColWidth : rowNumberColWidth) + "'><input type='checkbox'name='checkbox'/></td>"));
 		}
        _generGroupHeadHeadHtml($printHeadTable,_columns);
         return $printHeadTable;
    }
    
	var $printGroupsTable = $("<table><tr class='groupTr'></tr></table>");
    function _generateGridColumns(_localColumns)
    {
        for(var i = 0; i < _localColumns.length; i++ )
        {
        	if($isArray(_localColumns[i].columns))
        	{
        		//还有子菜单
        		$printGroupsTable.find("tr.groupTr").append("<td class='has_child has_" + _localColumns[i].name + "'><div>" + _localColumns[i].caption + "</div></td>");
        		$prtable.find("td.printGroupHead").append($printGroupsTable);
        		_generateGridColumnSon(_localColumns[i].columns,_localColumns[i].name,i);
        	}
        	else
        	{
	        	_generateGridColumnsObj(_localColumns[i]);
        	}
        }
        
    }
    
    function _generateGridColumnsObj(p_c)
    {
    	if(!me.dataControl.displayCheckBox)
    	{
    		if(p_c.name != "id")
    		{
	    		$printGroupsTable.find("tr.groupTr").append("<td class='no_child no_" + p_c.name + "'><div class='last_capton "+ p_c.name +"' id='caption"+ p_c.name +"'>" + p_c.caption + "</div><div class='print_group_content'></div></td>");
	    		$prtable.find("td.printGroupHead").append($printGroupsTable);
	    	}
    	}else
    	{
    		$printGroupsTable.find("tr.groupTr").append("<td class='no_child no_" + p_c.name + "'><div class='last_capton "+ p_c.name +"' id='caption"+ p_c.name +"'>" + p_c.caption + "</div><div class='print_group_content'></div></td>");
    		$prtable.find("td.printGroupHead").append($printGroupsTable);
    	}
    }
    
    function _generateGridColumnSon(p_c,p_className,p_i)
    {
    	if(p_i == undefined)
    	{
    		p_i = "none";
    	}
    	var __table = $("<table><tr class='groupTrSon"+p_i+"'></tr></table>");
    	for(var i = 0; i < p_c.length; i++ )
    	{
	    	if($isArray(p_c[i].columns))
	    	{
	    		__table.find("tr.groupTrSon"+p_i).append("<td class='has_child has_"+ p_c[i].name +"'><div class='"+ p_c[i].name +"' id='caption_"+ p_c[i].name +"'>" + p_c[i].caption + "</div></td>");
	    		$printGroupsTable.find("td.has_" + p_className).append(__table);
	    		_generateGridColumnSon(p_c[i].columns,p_c[i].name);
	    	}
	    	else
	    	{
	    		__table.find("tr.groupTrSon"+p_i).append("<td class='no_child "+ p_c[i].name +"'><div class='last_capton "+ p_c[i].name +"' id='caption"+ p_c[i].name +"'>" + p_c[i].caption + "</div><div class='print_group_content'></div></td>");
	    		$printGroupsTable.find("td.has_" + p_className).append(__table);
	    	}
    	}
    	
    }
    /**
     * 生成DataGrid的表格html 
     */
    function _generateDataGridHtml()
    {  	
    	$(".show_table").empty().remove();
        $prtable = $("<table cellpadding=0 cellspacing=0 style='table-layout:fixed;width:100%;' class='show_table dataGrid'><tr><td class='printHead'></td></tr><tr><td class='printBody'></td></tr></table>");
        var data = me.dataControl.entityContainer.data;
    	var columns = me.dataControl.columns;
    	var $bodyTable = me.dataControl.$bodyTable;
        var $printHeadTable = $("<table cellpadding=0 cellspacing=0 style='table-layout:fixed;width:100%' class='printHeadTable'/>");
        var $printBodyTable = $("<table cellpadding=0 cellspacing=0 style='table-layout:fixed;width:100%' class='printBodyTable'/>");
        var $trCaption = $("<tr id='head' style=''/>");
        
        //表头中是否显示行号
        if(me.dataControl.displayRowNumber)
		{
			$trCaption.append($("<td class='tdCen' width='" + (columns.length < condenseCols ? me.dataControl.rowNumberColWidth * 2 : rowNumberColWidth) + "'></td>"));
		}
		//表头中是否显示checkbox
        if(me.dataControl.displayCheckBox)
		{
			$trCaption.append($("<td class='tdCen' width='" + (columns.length < condenseCols ? me.dataControl.rowNumberColWidth : rowNumberColWidth) + "'><input type='checkbox'name='checkbox'/></td>"));
		}
        //生成表头
    	for(var i = 0; i < columns.length; i++)
    	{
	    	//加判断是为了解决有个临时列的问题
    		var captionParent = columns[i];
    		if(captionParent.isPrint == false || me.dataControl.primaryKey === captionParent.name)
    		{
    			continue;
    		}
    		if(captionParent.name != me.dataControl._tempColumnName && captionParent.visible)
    		{
    			$trCaption.append($("<td><b>" + captionParent.caption + "</b></td>"));
    		}
    	}
        $printHeadTable.append($trCaption);
        
		var _tempGroupName = null;//临时存放分组名称
		var _tempCount;
		var _tdLength;
		
		
		var $trArr = null;
		var $trArr2 = null;
		if($instanceOf(me.dataControl, mx.datacontrols.LockHeaderGrid)){
			$trArr = me.dataControl.$bodyLeftTable.find("tr");
			$trArr2 = me.dataControl.$bodyRightTable.find("tr");
		}else{
			$trArr= $bodyTable.find("tr");
			$trArr2 = $trArr;
		}
		
		var count = data.length;
		if(me.dataControl.allowPaging){
			count = Math.min(count,me.dataControl.pageSize);
		}
		
		//生成内容
        for(var j = 0; j < count; j++)
    	{
    		var trGroup = $("<tr/>");
    		var _tempLocalGroupName = data[j][me.dataControl.groupColumn];
    		
    		//如果临时的变量为空，并且在obj里面groupName不为空，就初始化临时groupName。
    		if(_tempLocalGroupName != null && _tempGroupName == null || _tempLocalGroupName !=_tempGroupName)
    		{
    			// 如果是 fieldGroup 的话，就先输出fieldGroup的标题
                var expandImgUrl = mx.mappath("$theme/images/expand.png");
    			
                var _tempKongTr = $("<tr class='kong_tr'></tr>");
    			if(me.dataControl.displayRowNumber)
    			{
    				_tempKongTr.append("<td width='" + (columns.length < condenseCols ? me.dataControl.rowNumberColWidth * 2 : rowNumberColWidth) + "' class='l'></td>");
    			}
    			if(me.dataControl.displayCheckBox)
    			{
    				_tempKongTr.append("<td width='" + (columns.length < condenseCols ? me.dataControl.rowNumberColWidth : rowNumberColWidth) + "'></td>");
    			}
    			$printBodyTable.append(_tempKongTr);
    			
    			_tempGroupName = _tempLocalGroupName;
    			trGroup.append($("<td><img src=" + expandImgUrl + "><b>" + _tempGroupName + "</td>"));
    			$printBodyTable.append(trGroup);
    		}
    		
    		var $trData = $("<tr/>");
    		if(j % 2 != 0)
    		{
	    		var $trData = $("<tr class='even'/>");
    		}
    		//表头中是否显示行号
			if(me.dataControl.displayRowNumber)
    		{
    			$trData.append($("<td class='tdCen' width='" + (columns.length < condenseCols ? me.dataControl.rowNumberColWidth * 2 : rowNumberColWidth) + "'>" + (j+1) + "</td>"));
    		}
    		
    		//表头中是否显示checkbox
    		if(me.dataControl.displayCheckBox)
			{
				$trData.append($("<td class='tdCen' width='" + (columns.length < condenseCols ? me.dataControl.rowNumberColWidth : rowNumberColWidth) + "'><input type='checkbox'name='checkbox'/></td>"));
			}
    		
		    //生成一行记录
    		for(var x = 0; x < columns.length; x++)
    		{
    			var _captionName = columns[x].name;
    			if(columns[x].isPrint == false || me.dataControl.primaryKey === _captionName)
        		{
        			continue;
        		}
	    		if(_captionName != me.dataControl._tempColumnName && columns[x].visible)
	    		{
	    			var txt = $trArr[j].cells[_captionName] ? $($trArr[j].cells[_captionName]).text() : ($trArr2[j].cells[_captionName] ? $($trArr2[j].cells[_captionName]).text() : "")
	    			txt = txt || "";
	    			$trData.append($("<td>" + txt + "</td>"));
	    		}
    		}
    		
    		trGroup.find("td").attr("colspan", $trData.find("td").length);
			$printBodyTable.append($trData);
    	}
    	
    	//是否显示统计信息
    	if(me.dataControl.displayStatisticRow)
    	{
	    	var $trStatic = $("<tr><td><table style='width:100%;border:1px solid #E3E8EE;border-top:0;' cellpadding='0' cellspacing='0'><tr class='t'></tr></table></td></tr>");;
	    	for(var i = 0; i < columns.length; i++)
	    	{
		    	//加判断是为了解决有个临时列的问题
	    		var captionParent = columns[i];
	    		if(captionParent.name != me.dataControl._tempColumnName)
	    		{
	    			var staticV = captionParent.statisticValue;
	    			if(staticV == null) staticV = '';
	    			$trStatic.find("tr.t").append($("<td style='text-align:right;height:23px;padding-right:0px;background-color:#f0f0f0;'>" + staticV + "</td>"));
	    		}
	    	}
	        $prtable.append($trStatic);
    	}
        
    	$prtable.find("td.printHead").append($printHeadTable);
    	$prtable.find("td.printBody").append($printBodyTable);
    	
    	//是否显示边框
    	if(me.dataControl.displayColSplitLine)
    	{
	        $prtable.find("td.printBody").find("tr").find("td").css({
	            "border-right" : "1px solid #E3E8EE",
	            "border-top" : "1px solid #E3E8EE"
	        });
	        
	        $prtable.find("td.printHead").find("tr").find("td").css({
	            "border-right" : "1px solid #E3E8EE",
	            "border-top" : "1px solid #E3E8EE"
	        });
	        
	        $prtable.find("table.printHeadTable").find("tr").find("td:first").css({
	            "border-left" : "1px solid #E3E8EE"
	        });
	        $prtable.find("table.printBodyTable").find("tr").find("td:first").css({
	            "border-left" : "1px solid #E3E8EE"
	        });
	        
	        $prtable.find("table.printBodyTable").find("tr:last").find("td").css({
	            "border-bottom" : "1px solid #E3E8EE"
	        });
    	}
    	
    	_autoWrap();
        
        $prtable.find("td.printBody").find("tr").find("td").css({
            "height" : "100%"
        });
        
        if (columns.length > condenseCols)
        {
        	 $prtable.find("td.printHead").find("tr").find("td").css({
	            "font-size" : "9px"
	         });
	         
        	 $prtable.find("td.printBody").find("tr").find("td").css({
	            "font-size" : "9px"
	         });
        }
        
        $trCaption.css({
			"position": "static" ,
			"height": "26px",
			"overflow": "hidden",
			"background-color" : "#FAFAFA"
        });
        
        $trCaption.find("td").css({
			"height": "24px"
        });
        
        $prtable.find("table.printBodyTable").find("tr.even").find("td").css({
            "background-color" : "#FAFAFA"
        });
        
        $prtable.find("table").find("td").css({
            "padding" : "0 2px"
        });
        $prtable.find("table").find("td[class='tdCen']").css({
            "text-align" : "center"
        });
        
        $prtable.find("td.printBody").find("tr.kong_tr").find("td").css({
            "border" : "0",
            "height" : "0",
            "overflow" : "hidden"
        });
        
    	return $prtable;
    }
    
    /**
     * @ignore 
     */
    function _autoWrap()
    {
    	//是否自动换行
    	if(me.dataControl.autoWrap){
    		$prtable.find("table").find("td").css({
	            "white-space":"normal",
			    "word-break":"break-all",
			    "word-wrap":"break-word"
        	});
    	}
    }
    
    /**
     * @ignore
     */
    function _parseArrayType(p_fields)
    {
    	//处理一下，如果当前字段不显示的话，就将字段从数据中移除。
    	if(!me.printHideFields)
    	{
    		for (var i = 0; i < p_fields.length; i++)
    		{
    			if(p_fields[i].visible == false)
    			{
    				p_fields.removeAt(i)
    			}
    		}
    	}
    	
        for (var i = 0; i < p_fields.length; i++)
        {
            if ($isArray(p_fields[i]))
            {
                _parseArrayType(p_fields[i]);
            }
            else if ($isObject(p_fields[i]))
            {
                if (me.printHideFields)
                {
                    _parseObjectType(p_fields[i], i, true);
                }
                else
                {
                    _parseObjectType(p_fields[i], i, false);
                }
            }
        }
    }

    /**
     * @ignore
     */
    function _parseObjectType(p_field, p_cycle_index, p_printhidefields)
    {
        if (p_printhidefields)
        {// 如果打印显示所有的隐藏field的话，强制将隐藏的值设置成显示，这样系统就会去解析被隐藏掉的字段，否则系统将会跳过被隐藏的字段。
            p_field.visible = true;
        }
        if (p_field.visible)
        {
            if(p_field.captionVisible){
            	$tdcaption = $("<td width='150px' class='l t' style='text-align:right'/>");
                $tdvalue = $("<td class='inputEditor'/>");
            }else{
            	$tdcaption = null;
            	$tdvalue = $("<td colSpan='2' class='inputEditor'/>");
            }
            $caption = p_field.caption;// 获取表单域标题
            var $fieldValue = findPreviewPropValue(p_field,p_cycle_index);// 获取表单域的值
            
            if (p_field.nullable === false && $tdcaption)
            {
            	$tdcaption.append("<span style='color:red;'>*&nbsp;</span>");
            }
            if($tdcaption)
            	$tdcaption.append($caption + "：&nbsp;");
            $tdvalue.append($fieldValue.clone());

            /**
             * @ignore
             * 
             * 设置断行：需要满足的条件有： 1、此域对象设置有需要断行 2、目前是第几次使用断行的最大列数 3、如果当前域对象是fieldGroup中的第一个属性，则创建tr。
             */
            if (p_field.lineBreak == false && colsNumber < me.maxCols && p_cycle_index > 0)
            {
                //var fatherTR = $prtable.find("tr").last();
                var fatherTR = $prtable.find("tr[class!='fieldGroupTr'][class!='left_empty']").last();
                if(fatherTR.length == 0)
                {
                	$prtable.append($("<tr/>"));
                	fatherTR = $prtable.find("tr[class!='fieldGroupTr'][class!='left_empty']").last();
                }
                else
                {
                	colsNumber = colsNumber + 1;
                }
                
                if($tdcaption)
                	$tdcaption.appendTo(fatherTR);
                $tdvalue.appendTo(fatherTR);
            }
            else
            {
                $tr = $("<tr class='printTr'/>");
                if($tdcaption)
                	$tr.append($tdcaption);
                $tr.append($tdvalue);
                colsNumber = 1;
	            $prtable.append($tr);
            }
        }
    }

    /**
     * @ignore
     * 
     * 根据传入的唯一id（定义时值为：name），获取相对应表单中字段的值。
     */
    function findPreviewPropValue(p_field,p_i)
    {
	    var newHtml = $("<div></div>");
		var $propEditor = formpre.find(".formTable").find("td[id='" + p_field.name + "']").find("div.editor");
		var $propEditor$input, $tdValue;
		if (p_field.editorType == "FileEditor")
		{
			$propEditor$input = $("<div class='LabelEditor mx'></div>").html("<input type='text'/>");
			$propEditor$input.find("input").val($propEditor.text());
			$propEditor$input.find("input").attr("value", $propEditor.text());
            return $propEditor$input;
		}
		else if (p_field.editorType == "RichTextEditor")
        {
            var formField = "";
            if(me.dataControl.entityContainer)
        	formField = me.dataControl.entityContainer.getValue(p_field.name);
            $propEditor$input = $("<div class='richTextEditor mx'></div>");
            $propEditor$input.html("<div>" + (formField || "" )+ "</div>");
            
            return $propEditor$input;
        }
		else if (p_field.editorType == "LinkEditor")
        {
            var formField = me.dataControl.$e.find("#" + p_field.name).find("a");
            var linkImg = formField.find("span#img").css("background-image").replace("url(","").replace(")",""); 
            $propEditor$input = $("<div class='LinkEditor mx'></div>").html("<div><span id='img'><img src=" + linkImg + "></span>&nbsp;<span id='text'>" + formField.find("span#text").html() + "</span></div>" + "<input type='text' class='for_hidden_input'/>");
            return $propEditor$input;
        }
		else if (p_field.editorType == "ListEditor")
        {
        	if(p_field.displayCheckBox)
        	{
	            var formField = me.dataControl.$e.find(".field#" + p_field.name).find("li.checked").find("span#text");
        	}
        	else
        	{
	            var formField = me.dataControl.$e.find(".field#" + p_field.name).find("li.selected").find("span#text");
        	}
  			for(var i = 0; i < formField.length; i++)
  			{
  				newHtml.append("<p>" + $(formField[i]).text() + "</p>");
  			}
            $propEditor$input = $("<div class='listEditorNew mx listEditor"+ p_field.name +"'></div>");
            $propEditor$input.append(newHtml);
            $propEditor$input.append($("<input/>"))
            return $propEditor$input;
        }
		else if (p_field.editorType == "LabelEditor")
        {
            var formField = me.dataControl.$e.find(".field").find("div.editor").find(".labelEditor").find("div.label").find("span").html();
            $propEditor$input = $("<div class='LabelEditor mx'></div>").html("<input type='text'/>");
            $propEditor$input.find("input").val(formField);
            $propEditor$input.find("input").attr("value", formField);
            return $propEditor$input;
        }
		else if (p_field.editorType == "CustomEditor")
        {
            var formField = me.dataControl.$e.find(".field#" + p_field.name).find("div.editor").find(".customEditor").find("input[type='text']").val();
            $propEditor$input = $("<div class='inputEditor mx'></div>").html("<input type='text'/>");
            $propEditor$input.find("input").val(formField);
            $propEditor$input.find("input").attr("value", formField);
            return $propEditor$input;
        }
		else if (p_field.editorType == "TextEditor")
        {
        	if(p_field.textMode == "multiline")
        	{
        		var formField = me.dataControl.$e.find("tr");
        		var id = p_field.name;
    			formField = $(formField).find("#" + id).find("div.editor").find(".textEditor").find("textarea");
	            $tdValue = formField.val();
	            $propEditor$input = $("<div class='TextEditor multiline mx richTextEditor'></div>").html("<div class='imitationtextarea'>"+$tdValue+"</div><input type='text' class='for_hidden_input'/>");
	            $propEditor$input.find("textarea").val($tdValue);
	            $propEditor$input.find("input").val($tdValue);
        		return $propEditor$input;
        	}
        	else if(p_field.textMode == "password")
    		{
        		//input password在IE9下不显示，且在Chrome和Firefox下样式不统一，在此统一显示星号
        		$propEditor$input = $("<div class='TextEditor mx'></div>").html("<input type='text'/>");
        		$propEditor$input.find("input").val("**********");
                $propEditor$input.find("input").attr("value", "**********");
	        	return $propEditor$input;
    		}
        	else
        	{
	        	$propEditor$input = $propEditor.children().find("input");
				$tdValue = $propEditor$input.val();
        	}
        }
		else if (p_field.editorType == "CheckListEditor")
        {
        	var id = p_field.name;
            var formField = me.dataControl.$e.find(".field#" + id).find("div.editor").find(".checkListEditor");
            var spanimg = formField.find("span#img");
            
            var formFieldHtml = $(formField.html());
            formFieldHtml.find("span#img").each(function(i){
           	 	var linkImg = spanimg.eq(i).css("background-image").replace("url(","").replace(")",""); 
                $(this).html("<img src=" + linkImg + ">");
            });
            
        	if (p_field.type == 'radio')
        	{
	            $propEditor$input = $("<div class='checkListEditor mx radio'></div>").html(formFieldHtml);
        	}
        	else
        	{
	            $propEditor$input = $("<div class='checkListEditor mx check'></div>").html(formFieldHtml);
        	}
        }
		else
		{
			$propEditor$input = $propEditor.children().find("input");
			$tdValue = $propEditor$input.val();
		}
		
        $propEditor$input.attr("value", $tdValue);
        return $propEditor$input;
    }

    /**
     * @ignore
     * 
     * 生成打印表单内容预览功能。
     */
    function previewPrintControl()
    {
		var _$printContainer = null;
        $prtable = _generatePrintHtml();
        var toolBar = new mx.controls.ToolBar({
            items : [{
                name : "print",
                text : mx.msg("RTE_PRINT"),
                imageKey : "print",
                onclick : function()
                {	
                	if($instanceOf(me.dataControl, mx.datacontrols.DataForm) && me.printFormStyle)
                	{
                		printFormStyle($prtable);
                	}
                	else
            		{
                		$prtable.jqprint();
            		}
                }
            }]
        });

        if (me.windowManager == null)
        {
        	me.windowManager = new mx.windows.WindowManager({zIndex:9999999});
        }

        var _printWin = me.windowManager.create({
            title : mx.msg("PRINT_PREVIEW_CONTROL"),
            width : "100%",
            height : "100%"
        });
        
        _printWin.append(toolBar);
        _$printContainer = $("<table class='printTable' style='width:100%;margin:0px auto;'><tr><td id='printBody' style='width:100%;'></td></tr></table>");
        _printWin.append(_$printContainer);
        _$printContainer.find("#printBody").append($prtable);
        _printWin.showDialog();
    };
    
    function printFormStyle(_prtable)
    {
    	var _printForm = _prtable.clone();
    	_printForm.find(".field > .container > label").css({
    		display : "block"
    	});
    	
    	_printForm.find(".formTable").css({
    		"margin-top" : "20px"
    	});
    	
    	_printForm.find("fieldset").css({
    		"margin-top" : "20px"
    	});
    	
    	_printForm.find("td").attr("valign","top");
    	
    	if($isIE())
		{
			_printForm.find(".editor").css({
	    		position : "relative",
	    		top : "-21px",
	    		left : "0px",
	    		width : "200px",
	    		"margin-left" : "90px"
	    	});
	    	
    		_printForm.find("label").css({
    			position : "relative",
	    		left : "0px",
	    		width : "90px",
	    		"padding-left" : "0px"
	    	});

			_printForm.find(".container").css({
				"margin-left" : "0px"
	    	});
			
			_printForm.find("input").css({
	    		width : "200px"
	    	});
			
			_printForm.find(".container").each(function(){
				var colspan = $(this).parent("td").attr("colspan");
				if(colspan && colspan > 1)
				{
					$(this).find(".editor").css({
	    				width : "100%",
	    				"margin-left" : "90px"
	    	    	});
					
					$(this).find("input").css({
	    	    		width : "100%"
	    	    	});
				}
			});
		}
    	else if(/(trident)(?:.*rv:([\w.]+))?/.test(navigator.userAgent.toLowerCase()))//IE11
    	{
    		_printForm.find("label").css({
    			position : "relative",
	    		width : "90px",
	    		left : "0px"
	    	});
    		
    		_printForm.find(".editor").css({
	    		position : "relative",
	    		top : "-21px",
	    		left : "0px",
	    		"margin-left" : "90px",
	    		width : "160px"
	    	});
	    	
			_printForm.find("input").css({
	    		width : "160px"
	    	});
			
			_printForm.find(".container").css({
				width :"280px",
				"margin-left" : "0px"
	    	});
			
			_printForm.find(".container").each(function(){
				var colspan = $(this).parent("td").attr("colspan");
				if(colspan && colspan > 1)
				{
					$(this).find(".editor").css({
	    				width : "100%"
	    	    	});
					
					$(this).find("input").css({
	    	    		width : "100%"
	    	    	});
				}
			});
    	}
    	else 
    	{
    		_printForm.find(".editor").css({
	    		position : "relative",
	    		top : "-21px",
	    		left : "-50px"
	    	});
	    	
	    	_printForm.find("label").css({
	    		width : "150px"
	    	});
	    	
	    	_printForm.find("input").css({
	    		width : "240px"
	    	});
	    	
	    	if(window.navigator.userAgent.indexOf("Firefox") > 0)
    		{
	    		_printForm.find("#inputDomain").css({
    				background : "none"
    	    	});
    		}
    	}
    	_printForm.jqprint();
    }
    
    me.endOfClass(arguments);
    return me;
};

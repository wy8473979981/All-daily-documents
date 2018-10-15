$ns("mx.datacontrols");

/**
 * 提供一个数据项列表控件（{@link mx.datacontrols.DataGrid} 类型）中列的类。
 * 要与DataGrid配合使用，不能单独使用
 */
mx.datacontrols.DataGridColumn = function()
{
    var me = $extend(MXComponent);
    var base = {};
    
    
    /**
     * @ignore
     * 获取该对象的父容器的对象，通常是一个 {@link mx.datacontrols.DataGrid} 类的实例。
     */
    me.owner = null;
    
    
    /**
     * @ignore
     */
    me.$bodyCol = $("<col style='display: table-column;' />");
    
    /**
     * @ignore
     */
    me.$headCell = $("<td><div class='first'><span id='caption'/></div></td>");
    
    /**
     * 获取或设置 {@link mx.datacontrols.DataGridColumn} 的名称。
     * 此属性在控件初始化时必须设置
     */
    me.name = null;
    
    /**
     * 获取列中显示的文本。请使用 {@link setCaption} 方法设置该字段的值。
     */
    me.caption = null;
    
    /**
     * 获取或设置列的 {@link caption} 字段的数据类型。该字段必须在初始化前设置。
     * <p>
     * 该字段通常包括:
     * <ul>
     *     <li><b>string</b></li>
     *     <li><b>date</b></li>
     *     <li><b>number</b></li>
     * </ul>
     * </p>
     * 
     * @default string
     */
    me.dataType = "string";
    
    /**
     * 获取或设置一个值，表示该列是否允许排序 true: 可以排序 false: 不可以排序
     * 
     * @default true
     */
    me.allowSorting = true;
    
    /**
     * 获取或设置一个 Boolean 值，该值表示是否按升序或降序对 {@link mx.datacontrols.DataGridColumn} 进行排序。如果该值为
     * true，表示按升序排序；反之则降序。
     * 
     * @default true
     */
    me.sortOrder = true;
    
    /**
     * 获取或设置一个 Boolean 值，表示该列是否固定。如果为 true，表示该列固定；反之则不固定。
     * 
     * @default false
     */
    me.locked = false;
    
    /**
     * 获取或设置格式说明符字符，指示如何显示值。
     * 当 {@link dataType} 的值为数字时，formatString 表示该数字显示的格式（如 “0.0”，表示小数点后保留一位）。当 {@link dataType} 字段为“date”时，详见 {@link mx.controls.Calendar.formatString} 字段；
     */
    me.formatString = null;
    
    /**
     * 获取或设置一个 Boolean 值，表示该列是否只读。如果为 true，表示不可编辑；反之则可编辑。
     * 
     * @default false
     */
    me.readOnly = false;
    
    /**
     * 获取列的宽度。请使用 {@link setWidth} 方法设置该字段的值。
     * @default 120
     */
    me.width = 120;
    
    /**
     * 获取列文本的对齐方式。请使用 {@link setAlign} 方法设置该字段的值。
     */
    me.align = null;
    
    /**
     * 设置列的 CSS 样式。该属性必须为 JSON 对象，如 { color:"blue", "background-color":"red" }。
     */
    me.cssStyle = null;
    
    /**
     * 获取列数据文本的对齐方式。请使用 {@link setDataAlign} 方法设置该字段的值。
     */
    me.dataAlign = null;
    
    /**
     * 获取列统计行的对齐方式。请使用 {@link setStatisticAlign} 方法设置该字段的值。
     */
    me.statisticAlign = null;
    
    /**
     * 获取和设置数据列是否显示。请使用 {@link setVisible} 方法设置该字段的值。
     */
    me.visible = true;
        
    /**
     * 获取或设置编辑器的类型。
     * <p>
     * 该字段可选的值包括：
     * <ul>
     * <li><b>CheckEditor</b></li>
     * <li><b>TextEditor</b></li>
     * <li><b>DateTimeEditor</b></li>
     * <li><b>DropDownEditor</b></li>
     * <li><b>LinkEditor</b></li>
     * <li><b>NumberEditor</b></li>
     * <li><b>TimeEditor</b></li>
     * </ul>
     * </p>
     * 
     * @default TextEditor
     */
    me.editorType = "TextEditor";
    
    /**
     * 一个 JSON 对象，表示数据列对应的编辑器选项，该值可以覆盖已有的 {@link editorType} 属性。
     */
    me.editorOptions = null;
    
    /**
     * 数据字典中真实值对应的属性。
     */
    me.valueMember = "value";
    
    /**
     * 一个函数引用，定义了列中单元格的实际值和显示值的之间的转换逻辑。
     * @returns  显示值。
     */
    me.valueFormatter = null;
    
    /**
     * 一个函数引用，定义了列内单元格的样式设置，可以根据 $p_cell 参数中的值进行 $p_cell 或者 p_item 的样式渲染。
     * 默认的实现的{@link renderCell} 方法中会调用styleFormatter 渲染单元格样式
     * @param p_item 一个 {@link mx.datacontrols.DataGridItem}对象。
     * @param $p_cell 一个{@link mx.datacontrols.DataGridItem}中的单元格 Jquery 包装对象。
     * 
     * @returns void。
     */
    me.styleFormatter = null;
    
    /**
     * 数据字典中显示值对应的属性。
     */
    me.textMember = "text";
    
    /**
     * 获取或设置该列的统计值。请使用 {@link setStatisticValue} 方法设置该字段的值。
     * <b>使用该属性需要将 {@link mx.datacontrols.DataGrid.displayStatisticRow} 属性设置为 true。</b>
     */
    me.statisticValue = null;
    
    /**
     * 数据字典中真实值对应的分隔符。
     */
    me.valueSeperator = ",";
    
    /**
     * 标示列是否可空，默认是可空的(true表示可以为空，false表示不可为空)
     */
    me.nullable = true;
    
    /**
     * 标示列是否重新获取数据源。默认为false
     */
    me.reloadDict = false;
    
    /**
     * 指示字段是否虚拟，如果字段是虚拟的话，其数据将不会与服务器交互
     * 
     * @default false
     */
    me.isVirtual = false;
    
    /**
     * 指示列是否打印。
     * 
     * @default true
     */
    me.isPrint = true;
    
    /**
     * @ignore
     */
    me.isOverrideRenderCell = false;
    
    /**
     * 在me.editorOptions中已经定义，所以舍弃
     * @ignore
     */
    me.items = null;
    
    base.init = me.init;
    me.init = function()
    {
        base.init();
        
        if (me.owner != null && me.owner.displayStatisticRow)
        {
             me.initStatisticCell();
        }
        
        me.$bodyCol.attr("id", me.name);
        me.$headCell.attr("id", me.name);
        
        me.setCaption(me.caption);
        me.initWidth = me.width;
        me.setWidth(me.width);
        me.setAlign(me.align);
        me.setDataAlign(me.dataAlign);
        me.setStatisticAlign(me.statisticAlign);
        if (!me.visible)
        {
            me._initVisible(me.visible);
        }   
        if (me.statisticValue != null)
        {
            me.setStatisticValue(me.statisticValue);
        }
        
        if($notEmpty(me.editorOptions) && $notEmpty(me.editorOptions.editorType))
        {
        	me.editorType = me.editorOptions.editorType;
        }
        
    	if (me.editorType == "DateTimeEditor" && $isEmpty(me.formatString))
    	{
    		me.formatString = "yyyy-MM-dd";
    	}
    	if (me.editorType == "TimeEditor" && $isEmpty(me.formatString))
    	{
    		me.formatString = "HH:mm:ss";
    	}
    };
	
	base.dispose = me.dispose;
    /**
	* 释放对象运行时动态生成的内容（属性、方法、事件）。
	*/
    me.dispose = function(){
		me.owner=null;
		me.off();

		me.$headCell.off();
		me.$headCell.unbind();
		me.$headCell.removeAttr("id").removeAttr("class").removeAttr("style").removeAttr("align");
		me.$headCell.empty().remove();
		me.$headCell=null;
		delete me.$headCell;

		if(me.$statisticCell){
			me.$statisticCell.off();
			me.$statisticCell.unbind();
			
			me.$statisticCell.removeAttr("id").removeAttr("class").removeAttr("style").removeAttr("align");			
			me.$statisticCell.empty().remove();
			
			me.$statisticCell=null;
			delete me.$statisticCell;
		}
		
		me.$bodyCol.off();
		me.$bodyCol.unbind();
		me.$bodyCol.removeAttr("id").removeAttr("class").removeAttr("style").removeAttr("align"); 		
		me.$bodyCol.empty().remove();
		me.$bodyCol=null;
		delete me.$bodyCol;
		
		for(var p in me.editorOptions){
			if(me.editorOptions.hasOwnProperty(p)){
				me.editorOptions[p]=null;
    			delete me.editorOptions[p];
				delete p;
			}
		}
		if(me.items){
			me.items.clear();
			me.items=null;
		}		
		base.dispose();
		base=null;
	}
    
    /**
     * 初始化统计单元格DOM
     */
    me.initStatisticCell = function()
    {
         if(me.$statisticCell == undefined)
         {
            me.$statisticCell = $("<td></td>");
            me.$statisticCell.attr("id", me.name);
         }
    }
    
    
    /**
     * 返回该列在 {@link mx.datacontrols.DataGrid} 的 {@link mx.datacontrols.DataGrid.columns} 集合中的序号（0 代表第一个）。如果该对象的 {@link owner} 字段为空，则返回 -1。
     */
    me.getIndex = function()
    {
        return me.owner != null ? (me.owner.columns.indexOf(me)) : -1;
    };
    
    /**
     * 设置 {@link caption} 字段的值。
     * @param p_caption 一个字符串
     */
    me.setCaption = function(p_caption)
    {
        me.caption = p_caption != null ? p_caption : null;
        me.$headCell.find("span#caption").text(me.caption != null ? me.caption : "");
    };
    
    /**
     * 设置 {@link align} 字段的值。
     * @param [p_align = left] 一个字符串表示文本的对齐方式，如“left”，“right”，“center”。
     */
    me.setAlign = function(p_align)
    {
        if (p_align == null)
        {
            p_align = "left";
        }
        me.align = p_align;
        me.$headCell.attr("align", me.align);
    };
    
    /**
     * 设置 {@link dataAlign} 字段的值。
     * @param [p_dataAlign = left] 一个字符串表示数据文本的对齐方式，如“left”，“right”，“center”。
     */
    me.setDataAlign = function(p_dataAlign)
    {
        if (p_dataAlign == null)
        {
            p_dataAlign = "left";
        }
        me.dataAlign = p_dataAlign;
        me.$bodyCol.attr("align", me.dataAlign);
        me.owner.$bodyTable.find("td#" + me.name).attr("align",me.dataAlign);
    };
    
    /**
     * 设置 {@link statisticAlign} 字段的值。
     * @param [p_statisticAlign = right] 一个字符串表示数据文本的对齐方式，如“left”，“right”，“center”。
     */
    me.setStatisticAlign = function(p_statisticAlign)
    {
        if (me.owner != null && me.owner.displayStatisticRow)
        {
            if (p_statisticAlign == null)
            {
                p_statisticAlign = "right";
            }
            me.statisticAlign = p_statisticAlign;
            me.$statisticCell.attr("align", me.statisticAlign);
        }
    };
    
    /**
     * 设置 {@link width} 字段的值。
     * @param p_width 
     */
    me.setWidth = function(p_width)
    {
        if ($notEmpty(p_width))
        {   
        	//在ie67下，表格的列比其他浏览器多11个像素，在这里通过判断浏览器来去掉。
        	var subValue = $.isIE67()? 11 : 0;
            me.width = (me.width+"") == "auto" ? p_width: parseInt(p_width)-subValue;
        }
        
        me.$bodyCol.css("width", me.width);
        me.$headCell.css("width", me.width);
        if (me.$statisticCell != null && me.$statisticCell.length > 0)
        {
            me.$statisticCell.css("width", me.width);
        }
    };
    
    /**
     * 设置 {@link visible} 字段的值。
     * @param p_visible 一个 Boolean 值，表示列是否可见。
     */
    me.setVisible = function(p_visible)
    {
        if (typeof(p_visible) == "undefined")
        {
            p_visible = true;
        }
        me.visible = p_visible;
        me._initVisible(p_visible);
        if (p_visible == false)
        {
        	// 解决IE6/7下colgroup，引起的双倍数量的列被隐藏的问题
            if(!$.isIE67()) {
            	me.owner.$grid.find("td[id='" + me.name + "']").hide();
            } 
            me.owner.$grid.find("col[id='" + me.name + "']").hide();
        }
        else
        {
            me.owner.$grid.find("td[id='" + me.name + "']").show();
            me.owner.$grid.find("col[id='" + me.name + "']").show();
        }       
    };
    
    /**
     * 设置 {@link statisticValue} 字段的值。
     * 
     * @param p_value 一个字符串，表示要显示的统计值。
     */
    me.setStatisticValue = function(p_value)
    {
        if (me.owner != null && me.owner.displayStatisticRow)
        {
            me.statisticValue = p_value;
            me.$statisticCell.text(p_value);
        }
    };
    
    /**
     * 将指定的值按照 {@link formatString} 字段进行格式化后返回。
     * 
     * @param p_value 一个日期格式，如 “2011-4-1”；或一个数字格式，如 “100.00”。
     * @param p_column 一个 {@link mx.datacontrols.DataGridColumn} 对象。
     */
    me.formatValue = function(p_value)
    {
        if (me.dataType == "date" || me.editorType == "DateTimeEditor" || me.editorType == "TimeEditor")
        {
        	if ($isNumber(p_value))
        	{        		
            	p_value = new Date(p_value);
        	}
            else if ($isString(p_value))
            {
            	p_value = parseDate(p_value);
            }
        }
        var textMode = (me.editorOptions && me.editorOptions.textMode) || me.textMode;
        if(textMode == "password"){
        	if($isString(p_value)){
        		var ret = "";
            	for(var i=0; i<p_value.length; i++){
            		ret += "*";
            	}
            	return ret;
        	}else{
        		return "";
        	}	
        }
       	
        if (me.formatString != null)
        {
            return $format(p_value, me.formatString);
        }
        else
        {
            return p_value != null ? p_value : "";
        }
    };
    
    
    
    /**
     * 将 p_item 中该列的值渲染到 $p_cell 指定的单元格中。
     * 在列表渲染每一个 {@link mx.datacontrols.DataGridItem} 时，会按照 {@link columns} 属性中的顺序依次调用此方法对每一个单元格进行渲染。
     * 该方法默认会从 p_item 中选取 p_item[name] 字段的值，并调用 {@link formatValue} 方法将该值转换为文本并填充至 $p_cell 中。
     * <b>可通过重写该方法实现自定义渲染的效果</b>，详见示例。
     * 
     * @param p_item 由外界传入需要渲染的 {@link mx.datacontrols.DataGridItem} 对象。
     * @param $p_cell 由外界传入的一个 TD 的 JQuery 对象，表示 {@link mx.datacontrols.DataGrid} 控件中 table 的一个单元格。
     * 
     * @example
     * 下列代码重写了默认的 renderCell 逻辑，当该字段的值为 M 时，显示为男子图标；当值为 F 时则显示为女子图标。
     * <code language="JavaScript">
     * var column = dataGrid.appendColumn(
     * {
     *      name: "GENDER",
     *      caption: "性别",
     *      
     *      renderCell: function(p_item, $p_cell)
     *      {
     *          var value = p_item.getValue("GENDER");   // 获取 GENDER 字段的值。
     *          if (value != null)
     *          {
     *              // 根据 value 的值，决定 $p_cell 中的 HTML 内容。
     *              var icon = (value == 'M' ? "male" : "female");
     *              $p_cell.html("<img src='" + $mappath("~/icons/" + icon + ".png") + "'>");
     *          }
     *          else
     *          {
     *              // 如果该值为空，则清空单元格的内容。
     *              $p_cell.empty();
     *          }
     *      }
     * });
     * </code>
     */
    me.renderCell = function(p_item, $p_cell)
    {
        var $text = $p_cell;
        var text = "";
        var value = p_item.getValue(me.name);
        
        if ($isFunction(me.valueFormatter))
        {
        	text = me.valueFormatter(value != null ? value : "");
        	
        	if ($notEmpty($p_cell))
        	{
        		$text.text(text);
        	}
        	else
        	{
        		return text;
        	}
        }
        else
        {
        	if ("DropDownTreeEditor" == me.editorType || "DropDownEditor" == me.editorType
                	|| "CheckListEditor" == me.editorType || "ListEditor" == me.editorType
                	|| "DropDownGridEditor" == me.editorType)
            {
                text = _renderEditorByDict(p_item);
            }
            else
            {
            	if("TimeEditor" == me.editorType && (me.formatString == "HH" || me.formatString == "hh")
            			&& $isString(value) && !value.contain(":"))
        		{
            		text = value + ":00:00";
                    text = me.formatValue(text);
        		}
            	else
        		{
            		text = me.formatValue(value);
        		}
            }
        }
        
        if ($isEmpty($p_cell))
        {
            // TODO:在这种情况下目前没有做自定义样式设置，后期可在DataGridItem中传入字符串，然后将样式插入其中。
        	if (me.editorType == "LinkEditor")
        	{	
        		return text || me.text;
        	} 
            return text;
        }
        else
        {
        	if(me.editorType == "RichTextEditor" || me.editorType == "RichTextCKEditor")
        	{
	            $text.empty();
        		var _$div = $("<div class='editorContainer'>");
	            _$div.append(text);
	            $text.append(_$div);
	            $text.children().on("click",function(){
					$(this).parent("td").click();
					return false;
				});
        	}
        	else if (me.editorType == "CheckEditor")
        	{	
	        	var checkedValue = me.checkedValue || "T";
	        	var disabledUrlValue = me.readOnly ? "_disabled":"";
	        	var imageUrl =  $isEqual(value, checkedValue) ? 
		        	mx.mappath("$theme/images/check_editor_checked"+disabledUrlValue+".png"):
		        	mx.mappath("$theme/images/check_editor_unchecked"+disabledUrlValue+".png");
		        $text.css({backgroundImage: "url(" + imageUrl + ")", backgroundRepeat: "no-repeat", backgroundPositionY: "center"});
        	} 
        	else if (me.editorType == "LinkEditor")
        	{	
        		$text.empty();
                text = text || me.text;
        		$text.append(text);
        	} 
        	else if (me.editorType == "PictureManagerEditor" && $notEmpty(text))
        	{
        		$text.empty();
        		var imgSrc = mx.mappath("$theme/images/picture_manager_small.gif");
        		var img = "<div class='editorContainer' align='center'><img src='" + imgSrc + "'/></div>";
        		$text.append(img);
        		$text.attr("align", "center");
        		$text.children().on("click",function(){
					$(this).parent("td").click();
					return false;
				});
        	} 
        	else
        	{
	            $text.text(text);
	            //将空格替换为&nbsp;以便可以显示多个空格，前面的text方法不能直接修改为html方法，text方法有文本过滤作用
	            $text.html($text.html().replaceAll(" ","&nbsp;"));
        	}
        	
            if (me.cssStyle != null)
            {
                $text.css(me.cssStyle);
            }
            
            if ($isFunction(me.styleFormatter))
            {
            	me.styleFormatter(p_item, $p_cell);
            }
            
            return text;
        }
    };
    
    /**
     * @ignore
     * 
     */
    me._initVisible = function(p_visible)
    {
        if (typeof(p_visible) == "undefined")
        {
            p_visible = true;
        }
        me.visible = p_visible;
        if (p_visible == false)
        {
            me.$headCell.addClass("hidden");
            
            me.$headCell.hide();
            me.$bodyCol.hide();
            
            if (me.$statisticCell != null && me.$statisticCell.length > 0)
            {
                me.$statisticCell.hide();
            }
        }
        else
        {
            me.$headCell.removeClass("hidden");
            me.$headCell.show();
            me.$bodyCol.show();
            
            if (me.$statisticCell != null && me.$statisticCell.length > 0)
            {
                me.$statisticCell.show();
            }
        }
    };
    
    /**
     *@param p_item 由外界传入需要渲染的 {@link mx.datacontrols.DataGridItem} 对象
     */
    function _renderEditorByDict(p_item)
    {
        var text = "";
        if (me.items == null && $notEmpty(me.owner.entityContainer) && $notEmpty(me.owner.entityContainer.dicts)
               && $notEmpty(me.owner.entityContainer.dicts[me.name]))
        {
            me.items = me.owner.entityContainer.dicts[me.name];
        }
        
        if (me.reloadDict && $notEmpty(me.owner.entityContainer) && $notEmpty(me.owner.entityContainer.dicts)
               && $notEmpty(me.owner.entityContainer.dicts[me.name]))
        {
            me.items = me.owner.entityContainer.dicts[me.name];
        }
        if ($notEmpty(me.items))
        {
            var value = p_item.getValue(me.name);
            if (($notEmpty(me.displayCheckBox) && me.displayCheckBox == true)
				|| "CheckListEditor" == me.editorType || "DropDownTreeEditor" == me.editorType
				 || "DropDownGridEditor" == me.editorType || "DropDownEditor" == me.editorType
				  || "CustomEditor" == me.editorType)
            {
            	if ($isBoolean(value))
            	{
            		text = parseBoolean(value) ? mx.msg("CHECKED_VALUE") : mx.msg("UNCHECKED_VALUE");
            	}
            	else
        		{
            		text = _getTextByValue(value);
        		}
            }
            else
            {
                for (var i = 0; i < me.items.length; i++)
                {
                    if (value == me.items[i][me.valueMember])
                    {
                        text = me.items[i][me.textMember];
                        break;
                    }
                }
            }
        }   
        return text;
    }
    
    /**
     *@param p_value 
     */
    function _getTextByValue(p_value)
    {
        var text = "";
        if ($notEmpty(p_value))
        {
            var values = null;
            if ($isArray(p_value))
            {
                values = p_value;
            }
            else
            {
            	if ($isNumber(p_value))
            	{
            		p_value = p_value.toString();
            	}
            	
                values = p_value.split(me.valueSeperator);
            }
            var texts = [];
            for (var i = 0; i < values.length; i++)
            {
                for (var j = 0; j < me.items.length; j++)
                {
                    if (values[i] == me.items[j][me.valueMember])
                    {
                        texts.add(me.items[j][me.textMember]);
                        break;
                    }
                }
            }
            text = texts.join(me.valueSeperator);
        }
        return text;
    }
    
    
    if (arguments.length > 0 && $notEmpty(arguments[0].renderCell))
    {
        me.isOverrideRenderCell = true;
    }
    
    me.endOfClass(arguments); 
    return me;
};
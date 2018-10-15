$ns("mx.datacontrols");

/**
 * 提供一个数据项列表控件（{@link mx.datacontrols.DataGrid} 类型）中的数据项的类。<b>该数据项容器的 HTML 元素为 &lt;TR&gt;</b>。请不要单独使用。
 */
mx.datacontrols.DataGridItem = function()
{
    var me = $extend(MXComponent);
    var base = {};
    
    /**
     * 获取该对象的父容器的对象，通常是一个 {@link mx.datacontrols.DataGrid} 类的实例。
     */
    me.owner = null;     
    
    /**
     * 获取 {@link mx.datacontrols.DataGridItem} 的唯一标识。该字段的值是与 {@link mx.datacontrols.DataGrid.primaryKey} 字段的值有关。
     */
    me.id = null;
    
    /**
     * 获取一个 Boolean 值，表示数据项是否选中。
     * 
     * @default false
     */
    me.checked = false;
    
    /**
     * @ignore
     * 获取一个字符串，表示说明数据项的类型（如“folder”，“role”，“job”等）。该属性的值如果与 {@link mx.datacontrols.DataGrid.images} 集合中的索引值相同，则会显示对应的图片。
     * 请使用 {@link setItemType} 方法设置该字段的值。
     * 
     * @default item
     */
    me.itemType = null;
    
    /**
     * @ignore
     * 获取一个字符串，表示 {@link mx.datacontrols.DataGridItem} 图像的 URL（如“$/icons/save.png”）。请使用 {@link setImageUrl} 方法设置该字段的值。
     */
    me.imageUrl = null;
    
    /**
     * @ignore
     * 获取一个字符串，表示 {@link mx.datacontrols.DataGridItem} 图像的名称。请使用 {@link setImageKey} 方法设置该字段的值。
     */
    me.imageKey = null;
    
    /**
     * 获取一个 JSON 对象，表示数据项的所有的值。请使用 {@link setValues} 方法设置该字段的值。
     */
    me.values = {};
    
    /**
     * 获取一个 布尔值，表示数据项是否可编辑。
     */
    me.enabled = true;
    
    /**
     * 获取数据项（{@link mx.datacontrols.DataGridItem} 类型）容器的 JQuery 对象。数据项容器的 HTML DOM 元素为“tr”。
     */
    me.$e = null;
    
    /**
     * @ignore
     */
    me._$img = null;
    
    base.init = me.init;
    me.init = function()
    {
        base.init();
        
        me._init();
    };
    
    /**
     * 获取当前行是否在新增状态。
     */
    me.isNew = function()
    {
    	return $notEmpty(me.owner) && $notEmpty(me.owner.entityContainer)
                    && $notEmpty(me.values) 
                    && !me.owner.entityContainer.checkSaved(me.values[me.owner.primaryKey]);
    }
    
    /**
     * @ignore
     * 设置 {@link imageUrl} 字段的值。 
     * 
     * @param [p_imageUrl=$/images/space.png] 一个字符串，表示图像的 URL。
     */
    me.setImageUrl = function(p_imageUrl)
    {
        me.imageUrl = p_imageUrl;
        if (p_imageUrl == null)
        {
            p_imageUrl = "$/images/space.png";
        }            
        
        if (me._$img != null)
        {                                
            me._$img.attr("src", mx.mappath(p_imageUrl));
        }            
    };
    
    /**
     * @ignore
     * 设置 {@link imageKey} 字段的值。该方法会在 $/icons 目录中查找相应的 png 图片。
     * 
     * @param [p_imageKey] 一个字符串，表示图片的名称。如 $/icons 目录中有一张图片为“role_48.png”或“role.png”的图片，那么该参数都是“role”。
     */
    me.setImageKey = function(p_imageKey)
    {
        me.imageKey = p_imageKey;
        if (me.imageKey != null)
        {
            if (me.owner != null)
            {
                var imageSize = me.owner.imageSize;
                var url = null;
                if (imageSize == 16)
                {
                    url = "$/icons/" + me.imageKey + ".png";
                }
                else
                {
                    url = "$/icons/" + me.imageKey + "_" + imageSize + ".png";
                }
                me.setImageUrl(url);
            }                
        }
        else
        {
            me.setImageUrl(null);
        }
    };
    
    /**
     * 设置 {@link checked} 字段的值。
     * @param p_checked 一个 Boolean 表示是否选中。
     */
    me.setChecked = function(p_checked)
    {
        if (me.owner != null && me.owner.displayCheckBox)
        {         
            me.checked = p_checked;
            me.$e.toggleClass("checked", me.checked);    
        }            
    };
    
    /**
     * 切换选中状态。
     */
    me.toggleChecked = function()
    {                                    
        me.setChecked(!me.checked);
    };
    
    /**
     * @ignore
     * 设置 {@link itemType} 字段的值。
     * @param p_type 一个字符串，表示说明数据项的类型（如“folder”，“role”，“job”等）。
     */
    me.setItemType = function(p_type)
    {
        me.itemType = p_type;
        me.$e.attr("itemType", me.itemType);
    };
    
    /**
     * 返回该数据项在 {@link mx.datacontrols.DataGrid} 的 {@link mx.datacontrols.DataGrid.items} 集合中的序号（0 代表第一个）。如果该对象的 {@link owner} 字段为空，则返回 -1。
     */
    me.getIndex = function()
    {
        return me.owner != null ? (me.owner.items.indexOf(me)) : -1;
    };
    
    /**
     * 返回指定列序号或列名对应的数据项的值。
     * 
     * @param p_index 一个数字（如 0），表示列的序号；或一个字符串，表示列的名称（{@link mx.datacontrols.DataGridColumn.name} 字段的值）。
     */
    me.getValue = function(p_index)
    {
        if ($isNumber(p_index) && $.isPlainObject(me.values))
        {
            var col = me.owner.columns[p_index];
            return me.values[col.name];
        }
        else
        {
            return me.values[p_index];
        }
    };
    
    me.insertCell = function(p_column)
    {
    	 var col = p_column;
    	 var cell = "<td style='width:" + col.width + (col.width!="auto"?"px":"") + ";";
         // 解决IE6/7下colgroup，引起的双倍数量的列被隐藏的问题
         if(!$.isIE67()) {
         	cell += (col.visible ? "display: table-cell;" : "display:none;");
         }
         cell += "' align=" + col.dataAlign + " id=" + col.name + ">";
    	 
    	 //找到与p_column相邻的列
    	 var index = 0;
    	 var colLeg  =  me.owner.columns.length;
         var $cell = $(cell);
    	 //这个循环是为了找列在表格中的位置
    	 for(var i=0; i<colLeg ;i++)
    	 {
    	       var tmp = me.owner.columns[i];
    	       if(col.name == tmp.name)
    	       {
    	            index = i;
    	       }
    	 }
    	 //插入时分2种情况
    	 //情况1，如果要插入的是第一列，那么$cell就要插到
    	 //rownum列和checkbox列的后面（如果有的话），（id="__temp_Column_rnd__"）列的前面。
    	 if(index==0)
    	 {
    	 	  //取下一列
    	 	  //列的最大索引用值
    	 	  var nextCol = (colLeg >= 1) ? me.owner.columns[1] : null;
    	      if(nextCol == null)
    	      {
    	            me.$e.append($cell);
    	      }
    	      else 
    	      {
    	           me.$e.find("#"+nextCol.name).before($cell);
    	      }
    	 }
    	 else if(index >= 1) //如果不是第一列，就找前一列，将p_column插到后面。
    	 {
    	     //取不为空的上一列
    		 afterCell(index, $cell);
    	 }
         col.renderCell(me, $cell);
    }
    
    function afterCell(index, $cell){
    	 var preCol =  me.owner.columns[index-1];
	 	 if(preCol!=null)
	 	 {
	 		  var pTd = me.$e.find("#"+preCol.name);
	 		  if(pTd.length > 0)
	 		  {
	 			 pTd.after($cell);
	 		  }
	 		  else if(index > 1)
	 		  {
	 			 afterCell(index - 1, $cell);
	 		  }
	 	 }
    }
    
    /**
     * 设置指定列序号或列名对应的数据项的值。
     * 
     * @param p_index 一个数字（如 0）或者列名。
     * @param p_value 一个字符串，表示数据项的值。
     */
    me.setValue = function(p_index, p_value)
    {
    	var colName;
        if ($isNumber(p_index))
		{
		    var col = me.owner.columns[p_index];
		    colName = col.name;
		}
		else if ($isString(p_index))
		{
			colName = p_index
		}
		me.owner.entityContainer.setValue(me.values[me.owner.primaryKey], colName, p_value, true);
    };
    
    
    function _renderCell(p_colName, p_value)
    {
        me.values[p_colName] = p_value;
    
        var $cell = null;
        $cell = me.$e.children("#" + p_colName);
        if ($cell.length > 0)
        {
            var col = me.owner.columns[p_colName];
            col.renderCell(me, $cell);
        }
    }
    
    /**
     * 设置 {@link values} 字段的值。
     * @param p_values 一个 JSON 对象，表示数据项的数据值。
     */
    me.setValues = function(p_values)
    {
        me.values = p_values;
        var cols = me.owner.columns;
        for (var i = 0; i < cols.length; i++)
        {
            var col = cols[i];
            me.setValue(col.name, me.values[col.name]);
        }
    };
    
    /**
     * 更新指定的列的值。
     * 
     * @param p_changeValues 一个 JSON 对象（如{ name: "bruce", age: "25" }），表示需要修改的列的值。
     */
    me.changeValues = function(p_changeValues)
    {
        var cols = me.owner.columns;
        for (var i = 0; i < cols.length; i++)
        {
            var col = cols[i];
            if ($notEmpty(p_changeValues[col.name]))
            {
                me.setValue(col.name, p_changeValues[col.name]);
            }
        }
    };
    
    /**
     * 更新当前项所有字段的显示值。
     */
    me.refresh = function()
    {
        me.setValues(me.values);
    };
    
    /**
     * 请参见 {@link mx.datacontrols.DataGrid.selectItem} 方法。
     * 
     * @param [p_triggerEvent=null] 一个 Boolean 值，表示是否要触发 {@link mx.datacontrols.DataGrid.onselectionchanged} 事件。如果该值为 true，则触发事件；反之则不触发。
     */
    me.select = function(p_triggerEvent)
    {
        if (me.owner != null)
        {
            me.owner.selectItem(me, p_triggerEvent);
        }
    };
    
    /**
     * 请参见 {@link mx.datacontrols.DataGrid.removeItem} 方法。该方法仅当 {@link owner} 字段不为空时有效。
     */
    me.remove = function()
    {
        if (me.owner != null)
        {
            me.owner.removeItem(me);
        }
    };
    
    /**
     * 将当前节点移动到指定的位置。
     * 
     * @param p_index 一个 Number 值，表示节点的索引（0 表示第一个节点）。
     */
    me.moveTo = function(p_index)
    {
        var moved = false;
        var targetItems  = [];
        // TODO:1.Grid 中的 Items 数组中的顺序需要改变。 2.EntityContaienr 中的顺序需要改变。
        var $prevTrs = me.$e.prevAll("tr");
        if ($prevTrs.length < p_index)
        {
            var targetIndex = p_index - $prevTrs.length - 1;
            var $nextTrs = me.$e.nextAll("tr");
            me.$e.insertAfter($nextTrs.eq(targetIndex));
            moved = true;
            for (var i = 0; i <= targetIndex; i++)
            {
                targetItems.add($nextTrs.eq(i).data("item"));
            }
        }
        else if ($prevTrs.length > p_index)
        {
            var targetIndex = $prevTrs.length - p_index - 1;
            me.$e.insertBefore($prevTrs.eq(targetIndex));
            moved = true;
            for (var i = 0; i <= targetIndex; i++)
            {
                targetItems.add($prevTrs.eq(i).data("item"));
            }
        }
        
        //FIX越界问题
        if (moved && me.owner != null && p_index < me.owner.items.length)
        {
        	me._setMovedItem(targetItems, p_index);
        	
            me.owner.trigger("itemindexchanged", { sourceItem:me, targetItems:targetItems });
        }
    };
    
    /**
     * 将当前数据项向上移动一格。如果是第一个数据项则位置不变。
     */
    me.moveUp = function()
    {
        var $prevTrs = me.$e.prevAll("tr");
        if ($prevTrs.length > 0)
        {
            me.moveTo($prevTrs.length - 1);
        }
    };
    
    /**
     * 将当前数据项向下移动一格。如果是最后一个数据项则位置不变。
     */
    me.moveDown = function()
    {
        var $prevTrs = me.$e.prevAll("tr");
        me.moveTo($prevTrs.length + 1);
    };
    
    /**
     * 移动当前行后，重新设置当前数据项的行号和被交换的数据项的行号，以及父类中 items 属性的内部顺序。
     * @ignore
     */
    me._setMovedItem = function(p_targetItems, p_index)
    {
    	if (me.owner.displayCheckBox)
    	{
    		me.$e.find("#rownumber").text(me.owner._getRowNumber(p_index) + 1);

    		$.each(p_targetItems, function(index, item){
				item.$e.find("#rownumber").text(item.owner._getRowNumber(item.$e.prop("rowIndex")) + 1);
			});
    	}
    	
    	me.owner.items.remove(me);
    	me.owner.items.insert(p_index, me);
    }
    
    /**
     * 设置当前数据项的行号。
     * 
     * @p_rownumber 一个数字，表示当前数据项的行号。
     */
    me.setRowNumber = function(p_rownumber)
    {
        if ($notEmpty(p_rownumber) && $isNumber(p_rownumber))
        {
            me.$e.find("td#rownumber").text(p_rownumber);  
            me.$e.find("td#rownumber").attr("title", p_rownumber);
        }
    };
    
    /**
     * 提供一个方法，给指定单元格上标记错误。
     * @param p_colName 一个字符串，表示单元格所在列的列标题。
     * @param p_value 一个 Boolean 值，true 时标记错误，false 时取消标记。
     * @param p_msg 一个字符串，表示提示信息，p_value 为 false 时，可以不传值。
     */
	me.markError = function(p_colName, p_value, p_msg)
	{
		var $cell = me.$e.find("td[id='"+p_colName+"']");
		$cell.toggleClass("cellError", p_value);
		if(p_value)
		{
			$cell.toolTip({
                content: p_msg,
            	defaultPosition: "bottom"
            });
		}
		else
		{
			$cell.toolTip("remove");
		}
	}
	
    /**
     * @ignore
     */
    me._remove = function()
    {
        me.$e.remove();
    };
        
    /**
     * @ignore
     */
    me._init = function()
    {
        var $container = $("<tr/>");
        $container.data("item", me);
        
        if (me.owner != null && me.owner.primaryKey != null)
        {
            me.id = me.values[me.owner.primaryKey];
            $container.attr("id", me.id);
        }
        
        if (me.owner._hasOverrideRenderCell)
        {
            _initContainerByOverrideRenderCell($container);
        }
        else
        {
            _initContainer($container);
        }
        
        //添加enableCellTip功能
        if (me.owner.enableCellTip)
        {
        	$container.find("td").each(function(i, p_cell){
        		_setCellTitle(p_cell);
        	});
        }
        me.$e = $container;
        
        if (me.itemType != null)
        {     
            me.setItemType(me.itemType);   
        }
        if (me.checked == true)
        {     
            me.setChecked(true);                      
        }
        if (me.owner != null && me.owner.displayImage)
        {
            if (me.imageKey != null)
            {                
                me.setImageKey(me.imageKey);
            } 
            else
            {                                           
                me.setImageKey(me.owner.getImageKeyOfItem(me));                                       
            } 
        }         
    };
    
    /**
     *设置DataGridItem是否可编辑
     *p_enabled 一个布尔值，true代表可以编辑，false代表不可编辑
     */
    me.setEnabled = function(p_enabled){
    	if(p_enabled){
    		me.enabled = true;
    	}else{
    		me.enabled = false;
    	}
    }
    
   /**
    * @ignore
     * 初始化行号单元格,如果行号单元格已经存在了，就不重复添加
     * 此方法为内部方法，在表格中调用。
     * 此方法在成功添加单元格后会返回true,其它情况返回false;
     */
    me._initRowNumberCell = function()
    {
         if(me.$e!=null && me.$e[0])
         {
             if(me.$e.children("td#rownumber").length==0)
             {
                  me.$e.prepend("<td id='rownumber'></td>");
                  return true;
             }
         }
         return false;
    }
    
    /**
     * @ignore
     * 初始化复选框单元格,如果复选框单元格已经存在了，就不重复添加
     * 此方法为内部方法，在表格中调用。
     */
    me._initCheckBoxCell = function()
    {
        if(me.$e!=null && me.$e[0])
         {
             if(me.$e.children("td#checkbox").length==0)
             {
             	  var checkBoxTd = "<td id='checkbox'><div><span id='checkBox'/></div></td>";
             	  var rowNumTd = me.$e.children("#rownumber");
             	  if(rowNumTd.length > 0 )
             	  {
             	     rowNumTd.after(checkBoxTd);
             	  }
             	  else
             	  {
             	  	 me.$e.prepend(checkBoxTd);
             	  }
             }
         }
    }
    
    function _initContainer($p_container)
    {
        var tds = "";
        if (me.owner != null && me.owner.displayRowNumber)
        {
            var td = "<td id='rownumber' style='width:" + me.owner.rowNumberColWidth + "px;display: table-cell;'></td>";
            tds += td;
        }
        
        if (me.owner != null && me.owner.displayCheckBox)
        {
            var td = "<td id='checkbox' style='width:25px;display: table-cell;'><div class='first'><span id='checkBox'/></div></td>"
            tds += td;
        }
        
        var cols = me.owner.columns;
        for (var i = 0; i < cols.length; i++)
        {
            var col = cols[i];
            var cell = "<td style='width:" + col.width + (col.width!="auto"?"px":"") + ";";
            // 解决IE6/7下colgroup，引起的双倍数量的列被隐藏的问题
            if(!$.isIE67()) {
            	cell += (col.visible ? "display: table-cell;" : "display:none;");
            }
            cell += "' align=" + col.dataAlign + " id=" + col.name + ">";
            
            if (i == 0 && me.owner.displayImage)
            {
                cell += "<img/><span id='text'/></td>";
                var $cell = $(cell);                                         
                me._$img = $cell.children("img");
                
                me.$e = $p_container;
                col.renderCell(me, $cell);
                tds += $cell.get(0).outerHTML;
            }
            else
            {
                var text = "";
                var $cell = $(cell + "</td>");
                if (col.name != me.owner._tempColumnName)
                {
                    text = col.renderCell(me, $cell);
                }
                
                if(col.editorType == "RichTextEditor" || col.editorType == "RichTextCKEditor")
                {
                    var _div = "<div  class='editorContainer' onclick='$(this).parent(\"td\").click(); return false;'>"
                    tds = tds + cell + _div + text + "</div></td>";
                }
                else if (col.editorType == "PictureManagerEditor")
                {
                    var img = "";
                    if($notEmpty(text))
                    {
                        var imgSrc = mx.mappath("$theme/images/picture_manager_small.gif");
                        var img = "<div class='editorContainer' align='center' onclick='$(this).parent(\"td\").click(); return false;'>"
                            + "<img src=\"" + imgSrc + "\"/></div>";
                    }
                    tds = tds + cell + img + "</td>";
                }
                else
                {
                    if($.isPlainObject(col.cssStyle))
                    {
                        $cell.css(col.cssStyle);
                    }
                    tds += $cell.get(0).outerHTML;
                }
            }
        }   
        var _$tds = $(tds);
        $p_container.append(_$tds);
    }
    
    function _initContainerByOverrideRenderCell($p_container)
    {
        if (me.owner != null && me.owner.primaryKey != null)
        {
            me.id = me.values[me.owner.primaryKey];
            $p_container.attr("id", me.id);
        }
        
        if (me.owner != null && me.owner.displayRowNumber)
        {
            var $td = $("<td id='rownumber' style='width:" + me.owner.rowNumberColWidth + "px;display: table-cell;'></td>");
            $p_container.append($td);
        }
        
        if (me.owner != null && me.owner.displayCheckBox)
        {
            var $td = $("<td id='checkbox' style='width:25px;display: table-cell;'><div class='first'><span id='checkBox'/></div></td>");
            $p_container.append($td);
        }
        var cols = me.owner.columns;
        for (var i = 0; i < cols.length; i++)
        {
            var col = cols[i];
            var $cell = $("<td style='width:" + col.width + (col.width!="auto"?"px":"") + ";display: table-cell;'/>");
            if (i == 0 && me.owner.displayImage)
            {
                $cell = $("<td style='width:" + col.width + (col.width!="auto"?"px":"") + ";display: table-cell;'><img/><span id='text'/></td>");                                         
                me._$img = $cell.children("img");                                         
            }
           
            // 解决IE6/7下colgroup，引起的双倍数量的列被隐藏的问题
            if(!$.isIE67()) {
            	if (!col.visible) {
                	$cell.hide();
                }
            }
            
            $cell.attr("align", cols[i].dataAlign);                                        
            $cell.attr("id", cols[i].name);
            $cell.data("column", cols[i]);
            
            me.$e = $p_container;
            col.renderCell(me, $cell);
            
            $p_container.append($cell);
        }  
    }
    function _setCellTitle(p_cell)
    {
		var cell = p_cell;
		var cellValue = me.values[cell.id];
		if (!$isString(cellValue)) {
			cellValue = cellValue+"";
		}
		if ($notEmpty($(cell).text()))
		{
			$(cell).attr("title", $(cell).text());			
		}
		if (me.owner.columns[cell.id] && $(cell).text().length > me.owner.maxTitleLength) {
			$(cell).removeAttr("title");
			me.owner._richTextCelltip(cell);
		}
    }
	
	base.dispose = me.dispose;
    /**
     * 释放对象运行时动态生成的内容（属性、方法、事件）。
     */
    me.dispose = function()
    {
		me.owner=null;
		me.off();
		try{
			if (me._$img != null)
			{
				me._$img.removeAttr("src");
			}			
			me.$e.find(".editorContainer").off().unbind().remove();
			me.$e.find("td").off().unbind().removeData().remove();	
			
			var _tds=me.$e.children();
			delete _tds.prevObject;
			me.$e.children().removeAttr("id").removeAttr("align").removeAttr("title").removeAttr("class").removeAttr("style").removeData("column");
			_tds.removeData("column");
			try{
				 _tds.tooltip( "dispose" );
			}catch(e){			
			}
			_tds.off();
			_tds.unbind();
			_tds.empty().remove();
			
			me.$e.removeProp("rowIndex").removeAttr("itemType").removeAttr("id").removeData("item");
			me.$e.removeData("item");
			me.$e.removeAttr("alias");
			me.$e.removeAttr("permissionID");
			me.$e.removeAttr("style");
			me.$e.removeAttr("disabled");
			me.$e.removeAttr("class");
			me.$e.removeClass();
			
			me.$e.off();
			me.$e.unbind();		
			me.$e.empty().remove();
			delete me.$e.prevObject;
			me.$e=null;
			delete me.$e;
			
			for(var p in me.values){
				if(me.values.hasOwnProperty(p)){
					me.values[p]=null;
					delete me.values[p];
					delete p;
				}
			}
		}catch(e){
			
		}		
		base.dispose();
		base=null;
    };
    
    me.endOfClass(arguments); 
    return me;
};
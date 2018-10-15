$ns("mx.layouts");

/**
 * 提供一个列式布局。
 * @example 以下是一个ColumnLayout的示例。 
 * <code language="JavaScript">
 * var container1 = new mx.containers.Container({
 *	    layout: "mx.layouts.ColumnLayout",
 *	    height:"200px",
 *	    width:"400px",
 *	    layoutOptions:{columns:[{name:"column1",title:"column1Title",vAlign:"middle",width:0.4},{name:"column2",title:"column2Title",vAlign:"bottom",width:"40%"}]}
 *	});
 *	var textEditor = new mx.editors.TextEditor({
 *		layoutConfigs: {
 *		align:"left",
 *    	columnName:"column1",
 *    	width:20,
 *    	height:30  
 *    }
 * });
 *	var textEditor1 = new mx.editors.TextEditor({
 *		layoutConfigs: {
 *			columnName:"column2",
 *	    	width:200,
 *	    	height:30
 *	    }
 *	});
 *	container1.addControl(textEditor);
 *	container1.addControl(textEditor1);
 * </code>
 * 使用示例请参考 {@link mx.layouts.LayoutFactoryClass.createLayout}。
 */

mx.layouts.ColumnLayout = function()
{
	var me = $extend(mx.layouts.AbstractLayout);
	var base = {};

	me.typeName = "ColumnLayout";
	
	/**
	 * 包含的列,一个jason数组，包含：name、width、height、title等属性
	 */
	me.columns = [];
	
    /**
     * @ignore
     */
	me._init =  function()
	{
		_appendColumn();
		me.owner.on("ctrladded", _container_ctrladded);
		me.owner.on("ctrlremoved", _container_ctrlremoved);
	};
	
	function _appendColumn()
	{
		var $columnTable = $("<div id = 'columnLayoutDiv' width='100%' height='100%'></div>");
		
		if (me.columns.length > 0)
		{	
			var tdWidth = parseInt(me.owner.width)/me.columns.length;
			for (var i = 0; i<me.columns.length; i++)
			{
				var column = me.columns[i];
				
				var $columnDiv = $("<div id='columnDiv' style='float:left;position:relative' ></div>");				
				var $fieldset = $("<fieldset class='columnLayoutField'></fieldset>");
				var $legend = $("<legend class='columnLayoutLegend' align='center'><a id='dropDownButton' class='expand'></a><span class='caption'></span></legend>");
				var name = column.name;
				var $columnContent = $("<div id='content"+name+"' style='width:100%'>");
				me.columns[name] = me.columns[i];				
				
				if (column.width != undefined)
				{
					if (column.width < 1)
					{
						$columnDiv.width(column.width * parseInt(me.owner.width));
					}
					else
						$columnDiv.width(column.width);
				}
				else
					$columnDiv.width(100/me.columns.length + "%");
				$columnDiv.height("100%");
				if (me.columns[i].title != undefined)
				{
					$legend.children("span").text(me.columns[i].title);
				}
				
				if (column.vAlign == undefined)
					column.vAlign = 'top';
				$columnContent.on("resize",_columnContent_resize);
				$columnContent.columnName = name;
								
				var $dropDown = $legend.children("a");
				$dropDown.on("click",_click_expander);
				$fieldset.append($legend);
				$fieldset.append($columnContent);
				$columnDiv.append($fieldset);
				
				$columnTable.append($columnDiv);			
			}
		}
		me.owner.$e.append($columnTable);
		$columnTable.height(me.owner.$e.height());
		if ((me.owner.height+"").indexOf("%") != -1)
			me.owner.$e.on("resize",_resizeAlign);

	}
	
	function _columnContent_resize(e)
	{
		var parentHeight = $(this).parent().height();
		if (navigator.userAgent.indexOf("Mozilla") != -1)
			parentHeight = parentHeight -20;
		var columnName = $(this).attr("id").slice(7,$(this).attr("id").length);
		var vAlign = me.columns[columnName].vAlign;
		if (vAlign == undefined)
			vAlign = 'top';
		if (vAlign =='middle')
		{
			$(this).css("position",'absolute');
			$(this).css("top",(parentHeight-$(this).height())/2);
		}
		if (vAlign =='bottom')
		{
			$(this).css("position",'absolute');
			$(this).css("top",(parentHeight-$(this).height()));
		}
		if ($(this).prev().children("a").attr("class") == 'expand')
		{
			$(this).css("display","");
		}	
	}
	
	function _click_expander(e)
	{
			var $fieldset = $(this).parents("fieldset");
			if ($fieldset.children("div").css("display") != "none")
			{
				$fieldset.parent().css("vertical-align","top");
				$fieldset.height("auto");
				$fieldset.children("div").css("display","none");
				$fieldset.find("a").toggleClass("expand");
			}
			else
			{
				$fieldset.parent().css("vertical-align","inherit");
				$fieldset.height("100%");
				
				$fieldset.find("a").toggleClass("expand");
				$fieldset.children("div").trigger("resize");
			}
	}
	
	function _container_ctrladded(p_child)
	{
		var column = me.columns[p_child.ctrl.layoutConfigs.columnName];
		var layoutWidth = me.owner.layoutOptions.width;
		var options = p_child.ctrl.layoutConfigs,
			width  = parseInt(options.width) > layoutWidth ? parseInt(options.width) : layoutWidth,
			height = options.height > 21 ? options.height : 21,
			align = (options.align == undefined ? "center" : options.align),
			margin = (options.margin == undefined ? "2px" : options.margin),
			columnName = options.columnName;
		var $td = $("<div id='layoutControl'>");
		$td.append(p_child.ctrl.$e).width(width).height(height).attr("align",align).css("margin",margin);
		if ($.isIE67())
		{
			if(align == 'center')
				$td.children().css('float','none');
			if(align == 'right')
				$td.children().css('float','right');
			$td.children().css('position','static');
		}
		if (columnName != undefined && me.owner.$e.find("div#content" + columnName).length > 0)
			me.owner.$e.find("div#content" + columnName).append($td);
	}
	
	function _container_ctrlremoved(p_child)
	{
		if (p_child.ctrl == undefined) return;
		var options = p_child.ctrl.layoutConfigs,
		columnName = options.columnName;
		if (columnName != undefined && me.owner.$e.find("div#content" + columnName).length > 0)
			me.owner.$e.find("div#content" + columnName +">div#layoutControl").each(function (){
				if ($(this).html().length == 0)
					$(this).detach();
			});
	}
	
	function _resizeAlign(e)
	{
		var height = parseInt($(e.target).height());
		var columnDivH = parseInt($(e.target).find("#columnDiv").height());
		$(e.target).find("#columnDiv").height(height);
		if ($.isIE67() && height == 2 *columnDivH)
		{
			height = parseInt($(e.target).height());
			$(e.target).find("#columnDiv").height(columnDivH);
		}	
		var length = $(e.target).find("#columnDiv").length;
		var pWidth = $(e.target).width();
		for (var i = 0; i < length ;i++)
		{
			var width;
			var column = me.columns[i];
			if (column.width != undefined)
			{
				width = column.width;
				if ((width+'').indexOf("%") != -1)
					$($(e.target).find("#columnDiv")[i]).width(parseInt(width)/100 * pWidth);
				if (width < 1)
					$($(e.target).find("#columnDiv")[i]).width(width * pWidth);
				if ((width+'').indexOf("px") != -1 || width >1)
					$($(e.target).find("#columnDiv")[i]).width(width);
			}	
			if (width == undefined)
				$($(e.target).find("#columnDiv")[i]).width(pWidth/length);
		}
		$(e.target).find("#columnDiv").each(function(){
			$(this).find("fieldset > div").trigger("resize")
			});	
	}

	return me.endOfClass(arguments);
};
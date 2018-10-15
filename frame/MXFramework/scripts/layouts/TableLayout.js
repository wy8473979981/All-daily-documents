$ns("mx.layouts");

$import("mx.containers.Panel");
$import("mx.layouts.AbstractLayout");

/**
 * 提供一个表格式布局控件。
 * 
 *  @example 以下是一个TableLayout的示例。 
 *  <code language="JavaScript">
 *   var container1 = new mx.containers.Container({
 *	    layout: "TableLayout",
 *      height:"200px",
 *	    width:"400px",
 *	    layoutOptions: {
 *	    	isShowBorder: true,
 *			rowNumber: 7,
 *			colNumber: 5
 *		}
 *	});
 *	var textEditor1 = new mx.editors.TextEditor({
 *		layoutConfigs: {
 *			rowIndex : 0,
 *			colIndex : 0,
 *			rowSpan: 2,
 *			colSpan: 1
 *	    },
 *	    text: 'test1',
 *	    width: "100%"
 *	});
 *	var textEditor2 = new mx.editors.TextEditor({
 *		layoutConfigs: {
 *			rowIndex : 2,
 *			colIndex : 2,
 *			rowSpan: 3,
 *			colSpan: 3
 *	    },
 *	    text: 'test2',
 *	    width: "160px"
 *	});
 *	container1.addControl(textEditor1);
 *	container1.addControl(textEditor2);
 * </code>
 * 使用示例请参考 {@link mx.layouts.LayoutFactoryClass.createLayout}。
 */
mx.layouts.TableLayout = function()
{
	var me = $extend(mx.layouts.AbstractLayout);
	var base = {};
	
	me.typeName = "TableLayout";
	
	//默认行数
	var _rowNumber = 4;
	
	//默认列数
	var _colNumber = 4;
	
	//是否显示边框,默认为true
	var _isShowBorder = true;
	
	var _$table = null;
	
	//单元格二维数组对象
	var _cells = null;
	
	me._init = function()
	{
		if ($isEmpty(me.owner))
			throw new Error(mx.err("CONTAINTER_NON_NULLABLE"));
		
		me.owner.$container.resize(_container_resize);
		
		
		me.owner.on("ctrladded", _container_ctrladded);
		me.owner.on("ctrlremoved", _container_ctrlremoved);
		
		//行/列的数量设置
		if(me.owner.layoutOptions) {
			if(me.owner.layoutOptions.rowNumber != null)
				_rowNumber = me.owner.layoutOptions.rowNumber;
			if(me.owner.layoutOptions.colNumber!=null)
				_colNumber = me.owner.layoutOptions.colNumber;
			if(me.owner.layoutOptions.isShowBorder!=null)
				_isShowBorder = me.owner.layoutOptions.isShowBorder;
		}
		
		_cells = new Array();
		
		//创建table和布局
		_$table = $("<table style='table-layout:fixed;width:100%;height:100%;'></table>");
		
		if(_isShowBorder == true) {
			_$table.attr('border',1);
			_$table.attr('bordercolor','black');
		} else {
			_$table.attr('border',0);
		}
		
		me.owner.$container.append(_$table); //fixed: $body改为$container
		for(var r = 0; r <  _rowNumber; r++) {
			
			var $row = $("<tr/>");
			_$table.append($row);
			
			_cells[r]=new Array();
			
			for(var c = 0; c< _colNumber; c++) {
				var $cell = $("<td rowspan='1' colSpan='1' style='overflow: hidden;'/>"); //单元格
				var $cellContent = $("<div class='container' style='position: relative;overflow: hidden;'>&nbsp;</div>");  //单元格内容
				$cell.append($cellContent); 
				
         	  	$row.append($cell);
         	  	
         	  	//单元格对象
         	  	_cells[r][c] = {}; 
         	  	_cells[r][c].$tr = $row;  //单元格所属的tr容器
         	  	_cells[r][c].$td = $cell;
         	  	_cells[r][c].$e = $cellContent; //单元格内容<div />
         	  	_cells[r][c].rowIndex = r;
         	  	_cells[r][c].colIndex = c;
         	  	_cells[r][c].rowSpan = 1;
         	  	_cells[r][c].colSpan = 1;
         	  	_cells[r][c].hasContent = false; //单元格是否已经有内容，预留字段
			}
		}
	};
	
	
	//每个单元格的高度
	var _cellHeight = null;
	//每个单元格的宽度
	var _cellWidth = null;
	
	/*
	 * 如果窗口大小改变，重新计算单元格的宽和高
	 */
	me.calculateCells = function() {
		//计算单元格大小
		
		//ie6下，body和container的height一样，导致单元格高度高出容器高度。
		if($.isIE6() &&me.owner.instanceOf(mx.containers.Panel) == true)
		{
			_containerSize.height =_containerSize.height- 21;
		}
		if($.isIE67())
		{
			_containerSize.height =_containerSize.height- 4;
		}
	
		_cellHeight = _containerSize.height / _rowNumber;
		_cellWidth = _containerSize.width / _colNumber;
		if(_isShowBorder && $.isIE67()) {
			//_cellHeight -= 1;
			_cellWidth -= 2;
		}
		
		//修改表格总大小
		_$table.attr('width',_containerSize.width);
		_$table.attr('height',_containerSize.height);
		//ie6下，table的高度设置为100%，就等于body的高度，也就是container的高度.实际应该减去head的高度。
		_$table.css('height',_containerSize.height+'px');
		
		//修改单元格的div大小
		for(var ri = 0; ri < _rowNumber; ri++)
			for(var ci=0;ci < _colNumber; ci++)
				{
					_cells[ri][ci].$td.attr("width",_cellWidth * _cells[ri][ci].colSpan);
					_cells[ri][ci].$td.attr("height",_cellHeight * _cells[ri][ci].rowSpan);
					_cells[ri][ci].$e.css("height",_cellHeight * _cells[ri][ci].rowSpan - 2 + 'px');
					_cells[ri][ci].$e.css('width',_cellWidth * _cells[ri][ci].colSpan - 2 + 'px');
				}
	}

	/*
	 * 添加控件时，如果控件的colSpan>1或者rowSpan>1，合并单元格布局
	 */
	function _mergeCell(p_cell) {
		p_cell.$td.attr('colSpan',p_cell.colSpan);
		p_cell.$td.attr('rowSpan',p_cell.rowSpan);
		
		
		//当前行除了第一个td不移除，其余都移除。
		for(var ci = p_cell.colIndex+1; ci < p_cell.colIndex+p_cell.colSpan; ci++) {
			_cells[p_cell.rowIndex][ci].hasContent = true;
			_cells[p_cell.rowIndex][ci].$td.detach();
		}
		//如果rowSpan>1，则改行的第一个单元格也要移除。
		for(var ri = p_cell.rowIndex+1; ri < p_cell.rowIndex+p_cell.rowSpan; ri++) {
			for(var ci = p_cell.colIndex; ci < p_cell.colIndex+p_cell.colSpan; ci++){
				_cells[ri][ci].$td.detach();
				_cells[ri][ci].hasContent = true;
			}
		}
	}
	
	/*
	 * 删除控件时，如果控件的colSpan>1或者rowSpan>1,拆分单元格
	 */
	function _splitCell(p_cell) {
		
		//当前行,在当前cell后面追加cell。
		for(var ci = p_cell.colIndex+1; ci < p_cell.colIndex+p_cell.colSpan; ci++) {
			_cells[p_cell.rowIndex][ci-1].$td.after(_cells[p_cell.rowIndex][ci].$td);
			//单元格恢复默认状态
			_cellToInit(_cells[p_cell.rowIndex][ci]);
		}
		//如果rowSpan>1，则该行的第一个单元格也要添加。
		for(var ri = p_cell.rowIndex+1; ri < p_cell.rowIndex+p_cell.rowSpan; ri++) {
			var curCell, nextCell;
			curCell = _cells[ri][p_cell.colIndex+p_cell.colSpan-1];
			//为了避免错位，从该行的最后一个单元格向前插入td
			if(p_cell.colIndex+p_cell.colSpan == _colNumber) {
				curCell.$tr.append(curCell.$td);
			}
			else {
				nextCell = _cells[ri][p_cell.colIndex+p_cell.colSpan];
				nextCell.$td.before(curCell.$td);
			}
			_cellToInit(curCell);
			nextCell = curCell;
			for(var ci = p_cell.colIndex+p_cell.colSpan-1; ci > p_cell.colIndex; ci--) {
				curCell = _cells[ri][ci-1];
				nextCell.$td.before(curCell.$td);
				_cellToInit(curCell);
				nextCell = curCell;
			}
		}
		_cellToInit(p_cell);
	}
	
	/**
	 * 单元格恢复为初始状态
	 * 拆分单元格和初始化单元格时调用
	 */
	function _celltoInit(p_cell) {
		p_cell.colSpan = 1;
		p_cell.rowSpan = 1;
		p_cell.$td.attr('colSpan',1);
		p_cell.$td.attr('rowSpan',1);
		p_cell.hasContent = false;
	}
	
	/*
	 * 判断单元格的区域是否和别的单元格重叠
	 * 返回：0：不重叠；1：重叠且单元格大小一致，可以追加控件；2：重叠但是由于单元格大小不一致，无法追加控件
	 */
	function _isOverlap(p_rowIndex, p_colIndex, p_rowSpan, p_colSpan) {
		for(var ri = p_rowIndex; ri< p_rowIndex+p_rowSpan;ri++)
			for(var ci = p_colIndex; ci< p_colIndex+p_colSpan;ci++)
				{
					if(_cells[ri][ci].hasContent == true)
						return true;
				}
		
		return false;
	}
	
	
	var _containerSize = {};
	
	/*
	 * 容器尺寸改变的事件处理函数。
	 */
	function _container_resize(e)
	{
		_containerSize.width = $(e.target).width();
		_containerSize.height = $(e.target).height();
		
		me.calculateCells();
	}
	
	/*
	 * 容器中添加控件的事件处理函数。 
	 * 注意：需要判断layoutconfigs四个参数的类型，是否为空，然后逐一解决。
	 */
	function _container_ctrladded(e)
	{
		var child = e.ctrl;
		//布局参数
		var cellAxis,cellSpans;
		
		//初始化参数
		cellAxis = {
				rowIndex: child.layoutConfigs.rowIndex == null ? 0: child.layoutConfigs.rowIndex,
				colIndex: child.layoutConfigs.colIndex == null ? 0: child.layoutConfigs.colIndex
		};
			
		cellSpans = {
				rowSpan: child.layoutConfigs.rowSpan == null? 1:child.layoutConfigs.rowSpan,
				colSpan: child.layoutConfigs.colSpan == null? 1:child.layoutConfigs.colSpan
		}
		
		//将参数重新赋值给child.layoutConfig.
		child.layoutConfigs = {
			rowIndex: cellAxis.rowIndex,
			colIndex: cellAxis.colIndex,
			rowSpan: cellSpans.rowSpan,
			colSpan: cellSpans.colSpan
		};
						
		//如果坐标无效，抛出异常。因为如果不进行处理，则控件无法成功加入到布局中，会被添加到布局外，不符合预期要求。
		if((cellAxis.rowIndex + cellSpans.rowSpan > _rowNumber || cellAxis.rowIndex<=-1) ||
				(cellAxis.colIndex + cellSpans.colSpan > _colNumber || cellAxis.colIndex<=-1)) {
			throw new Error("容器的rowIndex和colIndex坐标超过表格范围");
		}
		
		//判断单元格重叠合并情况,如果出现重叠，提示错误信息，并将当前准备加入的控件移除。
		if(_isOverlap(cellAxis.rowIndex, cellAxis.colIndex,cellSpans.rowSpan, cellSpans.colSpan) == true) {
			mx.indicate("error","坐标为{"+cellAxis.rowIndex+","+cellAxis.rowIndex+"}的单元格内已经有控件存在，无法再添加新的控件");
			//controlisRemoveForOverlap属性：如果是true，说明是因为坐标重叠移除；如果为false，表示是控件的正常移除
			child.isRemoveForOverlap = true;
			me.owner.removeControl(child);
			return;
		}
		
		child.isRemoveForOverlap = false;
		var curCell = null;
		//如果坐标有效，curCell对象为控件的布局坐标所对应的单元格对象。
		curCell = _cells[cellAxis.rowIndex][cellAxis.colIndex];
		//将单元格之前的内容清除
		curCell.$e.empty();
		//修改单元格对象的colSpan和rowSpan值
		curCell.colSpan = cellSpans.colSpan;
		curCell.rowSpan = cellSpans.rowSpan;
		
		//将控件dom对象加入单元格
		curCell.$e.append(child.$e);
		
		//child.$e.css('position','static');
		
		//对单元格进行td的合并操作
		if(cellSpans.colSpan>1 || cellSpans.rowSpan >1) {
			_mergeCell(curCell);
		}
		
		curCell.hasContent = true;
	}
	
	/*
	 * 容器删除控件的事件处理函数。
	 */
	function _container_ctrlremoved(e)
	{
		
		var child = e.ctrl;
	
		//如果是因为坐标重叠移除控件，不需要进行拆分，直接返回。
		if(child.isRemoveForOverlap == true) {
			return;
		}
		
		//拆分单元格。
		//样式可以不清除，因为下次添加控件时，样式仍然会被重新替换为默认的或用户指定的样式。
		var cellConfigs = e.ctrl.layoutConfigs;
		
		//单元格拆分
		var curCell = _cells[cellConfigs.rowIndex][cellConfigs.colIndex];
		if(cellConfigs.colSpan>1 || cellConfigs.rowSpan >1) {
			_splitCell(curCell);
		} else {
			_cellToInit(curCell);
		}
	}
	
	me.endOfClass(arguments);
	return me;
};

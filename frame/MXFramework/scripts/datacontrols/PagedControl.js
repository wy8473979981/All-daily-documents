$ns("mx.datacontrols");

/**
 * 提供一个帮助需要进行分页的控件（如 {@link mx.datacontrols.DataGrid}）进行分页的控件。
 * 
 * @abstract 
 */
mx.datacontrols.PagedControl = function()
{
    var me = $extend(mx.controls.Control);
    var base = {};
    
    /**
     * 获取和设置一个 Boolean 值，表示是否可以分页。
     * {@exclude mx.datacontrols.ScrollLoadGrid}
     */
    me.allowPaging = true;
    
    /**
     * 获取和设置一个 Number 值，表示当前第几页。
     * {@exclude mx.datacontrols.ScrollLoadGrid}
     * 
     * @default 1
     */
    me.pageIndex = 1;
    
    /**
     * 获取和设置一个 Number 值，表示当前每页允许显示的记录数。
     * {@exclude mx.datacontrols.ScrollLoadGrid}
     * 
     * @default 20
     */
    me.pageSize = 20;
    
    /**
     *  获取和设置一个数组值，表示分页记录数可设置的选项。
     *  {@exclude mx.datacontrols.ScrollLoadGrid}
     */
    me.pageSizeOptions = [{text:"10",value:10},
                          {text:"20",value:20},
                          {text:"30",value:30},
                          {text:"40",value:40},
                          {text:"50",value:50}];
    
    /**
     * 获取一个 Number值，表示当前的总记录数。
     * {@exclude mx.datacontrols.ScrollLoadGrid}
     * 
     * @default 0
     */
    me.itemCount = 0;
    
    /**
     * 当前的页面索引变更时触发该事件。调用 {@link moveToPage} 方法是触发该事件。
     * {@exclude mx.datacontrols.ScrollLoadGrid}
     */
    me.onpageindexchanged = null;
    
    /**
     * 总记录数改变时触发该事件。
     * {@exclude mx.datacontrols.ScrollLoadGrid}
     */
    me.onitemcountchanged = null;
    
    /**
     * 获取当前页第一条数据的索引值。
     * {@exclude mx.datacontrols.ScrollLoadGrid}
     */
    me.getFirstItemIndex = function()
    {
        if (me.pageIndex < 1)
        {
            me.pageIndex = 1;
        }
        
        return me.pageSize * (me.pageIndex - 1);
    };
    
    /**
     * 获取当前的总页数。
     * {@exclude mx.datacontrols.ScrollLoadGrid}
     */
    me.getPageCount = function()
    {
        if (me.itemCount == 0 || typeof(me.itemCount) == "undefined")
        {
            return 1;
        }
        return parseInt((me.itemCount + me.pageSize -1) / me.pageSize);
    };
    
    /**
     * @ignore
     * 设置 {@link itemCount} 字段的值。
     * 这个方法是内部使用的用来设置数据的总数，不能在外部调用。
     * {@exclude mx.datacontrols.ScrollLoadGrid}
     * 
     * @param p_itemCount 一个 Number 值，表示当前的总记录数。
     */
    me.setItemCount = function(p_itemCount)
    {
        if (p_itemCount != me.itemCount || p_itemCount == 0)
        {
            me.itemCount = p_itemCount;
            me.trigger("itemcountchanged");
        }
    };
    
    /**
     * 获取一个 Boolean 值，表示当前是否是第一页。
     * {@exclude mx.datacontrols.ScrollLoadGrid}
     */
    me.isFirstPage = function()
    {
        return me.pageIndex <= 1;
    };
    
    /**
     * 获取一个 Boolean 值，表示当前是否是最后一页。
     * {@exclude mx.datacontrols.ScrollLoadGrid}
     */
    me.isLastPage = function()
    {
        return me.pageIndex >= me.getPageCount();
    };
    
    /**
     * 跳转到某一页。
     * {@exclude mx.datacontrols.ScrollLoadGrid}
     * 
     * @param p_index 一个 Number 值，表示要跳转到第几页。
     */
    me.moveToPage = function(p_index)
    {
        me.pageIndex = p_index;
        me.trigger("pageindexchanged");
    };
    
    /**
     * 跳转到第一页。
     * {@exclude mx.datacontrols.ScrollLoadGrid}
     */
    me.moveToFirstPage = function()
    {
        if (me.pageIndex == 0 || !me.isFirstPage())
        {
            me.moveToPage(1);
        }
    };
    
    /**
     * 跳转到最后一页。
     * {@exclude mx.datacontrols.ScrollLoadGrid}
     */
    me.moveToLastPage = function()
    {
        if (me.pageIndex == 0 || !me.isLastPage())
        {
            me.moveToPage(me.getPageCount());
        }
    };
    
    /**
     * 跳转到下一页。
     * {@exclude mx.datacontrols.ScrollLoadGrid}
     */
    me.moveToNextPage = function()
    {
        if (me.pageIndex == -1 || !me.isLastPage())
        {
            me.moveToPage(me.pageIndex + 1);
        }
    };
    
    /**
     * 跳转到前一页。
     * {@exclude mx.datacontrols.ScrollLoadGrid}
     */
    me.moveToPreviousPage = function()
    {
        if (!me.isFirstPage())
        {
            me.moveToPage(me.pageIndex - 1);
        }
    };
    
    /**
     * 设置 {@link pageSize} 字段的值。同时跳转到第一页。
     * {@exclude mx.datacontrols.ScrollLoadGrid}
     * 
     * @param p_pageSize 一个 Number 值，表示每页可以显示的记录数。
     */
    me.setPageSize = function(p_pageSize)
    {
        me.pageSize = p_pageSize;
        me.moveToPage(1);
    };
	
	base.dispose = me.dispose;
    /**
	* 释放对象运行时动态生成的内容（属性、方法、事件）。
	*/
    me.dispose = function(){
		me.pageSizeOptions.clear();
		
		base.dispose();
		base=null;
	}
    
    me.endOfClass(arguments); 
    return me;
};
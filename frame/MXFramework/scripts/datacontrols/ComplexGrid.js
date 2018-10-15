$ns("mx.datacontrols");

$import("mx.controls.ToolBar");
$import("mx.datacontrols.DataGrid");

/**
 * 提供一个集成工具栏和表格的复合组件。
 * 
 * @example
 * 以下为 {@link mx.datacontrols.ComplexGrid} 的示例。
 * <code language="JavaScript">
 * var grid = new mx.datacontrols.ComplexGrid({
 *     baseUrl: "http://bruce-pc:8892/mx/rest/getData",
 *     create:_grid_create,    // 如果点击“新建”按钮不使用默认的逻辑，可重写
 *     saveData:_grid_save,        // 如果点击“保存”按钮不使用默认的逻辑，可重写
 *     remove:_grid_remove     // 如果点击“删除”按钮不使用默认的逻辑，可重写
 * });
 * 
 * // 向工具栏添加自定义按钮
 * grid.appendToolBarItems([{
 *     name:"exportExcel",
 *     text:"导出 Excel",
 *     onclick:_grid_exportExcel
 * },
 * {
 *     name:"importExcel",
 *     text:"导入 Excel",
 *     onclick:_grid_importExcel
 * }
 * ]);
 * 
 * function _grid_create()
 * {
 * }
 * 
 * function _grid_save()
 * {
 * }
 * 
 * function _grid_remove()
 * {
 * }
 * 
 * function _grid_exportExcel()
 * {
 * }
 * 
 * function _grid_importExcel()
 * {
 * }
 * </code>
 */
mx.datacontrols.ComplexGrid = function()
{
    var me = $extend(mx.datacontrols.DataGrid);
    var base = {};

    /**
     * 获取或设置一个 Boolean 值，表示是否显示工具栏。
     * 
     * @default true
     */
    me.displayToolBar = true;
    
    /**
     * 获取或设置一个 {@link mx.controls.ToolBar} 对象。手动操作toolBar对象按钮的enabled属性时，需在DataGrid的onload回调方法中进行。
     */
    me.toolBar = null;
    
    /**
     * 获取一个内置 toolBar {@link toolBar} 对象的默认高度。
     */
    me.toolBarHeight = 26;
    
    /**
     * 设置 {@link displayColSplitLine} 的字段值。
     */
    me.displayColSplitLine = false;
    
    /**
     * @ignore
     */
    me.imagePosition = "left";
    
    base.init = me.init;
    me.init = function()
    {
        base.init();

        _initToolBar();            

        if (!me.displayToolBar)
        {
            // 注意：此处设置为true，是为了能执行setDisplayToolBar方法内部逻辑。
            me.displayToolBar = true;
            me.setDisplayToolBar(false);
        }
        else
        {
            me.displayToolBar = false;
            me.setDisplayToolBar(true);
        }
        
        _setToolBarItemState();
        
        me.on("load", _setToolBarItemState);
    };
    
    /**
     * @ignore
     */
    me._adjustGridSizeForIE6 = function()
    {
    	if($.isIE6()) {
	        me.$e.resize(function(){
	        	me.$grid.css("height", me.$e.height() - 
	        			(($notEmpty(me.searchBox) && !me.searchBox.$e.is(":hidden")) ? me.searchBox.$e.outerHeight() : 0) - 
	        			(me.displayToolBar ? me.toolBarHeight : 0) -
	        			(me.allowPaging ? me.pageNaviBar.$e.outerHeight() : 0));
	        	me.$body.css("height",me.$grid.height() - me.$head.outerHeight());
	        });
    	}
    }
    
    /**
     * 向工具栏添加按钮。详见 {@link mx.controls.ToolBar.appendItem} 方法。
     */
    me.appendToolBarItem = function(p_item)
    {
        if (me.toolBar != null)
        {
            me.toolBar.appendItem(p_item);
        }
    };
    
    /**
     * 向工具栏添加一组按钮。详见 {@link mx.controls.ToolBar.appendItems} 方法。
	 *
     * @param p_items
     *            一个数组，该数组包含了一组新项。
     */
    me.appendToolBarItems = function(p_items)
    {
        if (me.toolBar != null)
        {
            me.toolBar.appendItems(p_items);
        }
    };
    
    /**
     * 设置 {@link displayToolBar} 字段的值。
     * @param p_displayToolBar 一个 Boolean 值，表示是否显示工具栏。
     */
    me.setDisplayToolBar = function(p_displayToolBar)
    {
        if (me.displayToolBar != p_displayToolBar && me.toolBar != null)
        {
            me.displayToolBar = p_displayToolBar;
            var _top = 0;          
            if (me.displayToolBar)
            {
                me.toolBar.show();
                //动态设定toolsbar下面dom的absolute top位置。
	        	if(me.imagePosition == "up")
	        	{
					me.toolBarHeight = 47;
				}
	        	// if me.searchBox.container == null 说明searchBox就在表格里
                if ($notEmpty(me.searchBox) && me.searchBox.container == null)
                {
                	_top =  me.searchBox.getHeight() + parseInt(me.toolBarHeight);
                }
                else
                {
                	_top = me.toolBarHeight;
                }
            }
            else
            {
                me.toolBar.hide();
               
                if ($notEmpty(me.searchBox)  && me.searchBox.container == null)
                {
                	_top = me.searchBox.getHeight();
                }
                else
                {
                	_top = 0;
                }
            }
            me.$grid.css({
            	top:_top 
       		});
        }
    };
    
    /**
     * 工具栏“新建”按钮对应的默认方法。可重写。
     */
    me.create = function()
    {
        me.appendItem();
        // 点击新建按钮加完一行数据后,新增加的数据行默认选中.
        me.selectItem(me.items.length-1);
        $($('#'+$($(me.items[me.items.length-1].$e)).attr('id')).find('#name')).click();
    };
    
    /**
     * 工具栏“删除”按钮对应的默认方法。可重写。
     */
    me.remove = function()
    {
        me.removeItems(me.getCheckedIDs());
    };
    
    /**
     * 工具栏“保存”按钮对应的默认方法。可重写。
     */
    me.saveData = function()
    {
        me.save();
    };
    
    /**
     * @ignore
     */
    me._toggleSearchBoxShowState = function()
    {
    	if(me.searchBox.container != null)
    	{
    		return;
    	}
        me.searchBox.toggleShowState();
        me.$e.find("#toggleShowBtn").toggleClass("toggleShowBtn");
        me.$e.find("#toggleShowBtn").toggleClass("toggleHideBtn");
        
        var height = me.searchBox.getHeight();

        if (me.displayToolBar)
        {
      	   me.$grid.animate({top : (height + me.toolBarHeight)},"fast");
        }
        else
        {
           me.$grid.animate({top : height},"fast");
        }
    }
    
    function _initToolBar()
    {        
        if (me.toolBar == null)
        {
            me.toolBar = new mx.controls.ToolBar({
            	height : me.toolBarHeight,
            	imagePosition : me.imagePosition,
            	wrapOverflow: false,
                items:[
                {
                    name:"new",
                    text:mx.msg("NEW"),
                    imageKey : "add"
                },
                "-",
                {
                    name:"save",
                    text:mx.msg("SAVE"),
                    imageKey : "save"
                },
                "-",
                {
                    name:"delete",
                    text:mx.msg("DELETE"),
                    imageKey: "delete"
                },
                "-",
                {
                    name:"moveup",
                    text:mx.msg("MOVEUP"),
                    imageKey: "moveUp"
                },
                {
                    name:"movedown",
                    text:mx.msg("MOVEDOWN"),
                    imageKey: "moveDown"
                }
                ],
                onitemclick:_toolBar_item_click,
                oncontrolbuttonclick: _controlbutton_click
            });
        }
        me.$e.prepend(me.toolBar.$e);
    }
    
    function _setToolBarItemState()
    {
        if (me.entityContainer != null && me.toolBar != null)
        {
            var newItem = me.toolBar.items["#new"];
            var saveItem = me.toolBar.items["#save"];
            var deleteItem = me.toolBar.items["#delete"];
            var editItem = me.toolBar.items["#edit"];
            
            if (newItem != null)
            {
                newItem.setEnabled(me.entityContainer.canCreate ? true : false);
            }
            
            if (saveItem != null)
            {
                saveItem.setEnabled(me.entityContainer.canModify ? true : false);
            }
            
            if (editItem != null)
            {
                editItem.setEnabled(me.entityContainer.canModify ? true : false);
            }
            
            if (deleteItem != null)
            {
                deleteItem.setEnabled(me.entityContainer.canDelete ? true : false);
            }
        }
    }
    
    function _toolBar_item_click(e)
    {
        _executeCommand(e.item.name);
    }
    
    function _controlbutton_click()
    {
    	
    	me.$grid.css({
        	top: (parseInt(me.toolBarHeight) < parseInt(me.toolBar.$e.height()) ? parseInt(me.toolBar.$e.height()) : parseInt(me.toolBarHeight)) + "px"
   		});
    }
    
    /**
     *@param p_command 一个字符串，代表要执行的命令    
     */
    function _executeCommand(p_command)
    {
        switch(p_command)
        {
            case "new":
                me.create();
                break;
            case "save":
                me.saveData();
                break;
            case "delete":
                me.remove();
                break;
            case "moveup":
                me.moveUp(true);
                break;
            case "movedown":
                me.moveDown(true);
                break;
        }
    }
    
    //added by tiger on 2014/4/22 17:15:50
    base.dispose = me.dispose;
    me.dispose = function(){
    	me.off();
    	me.toolBar.onitemclick = null;
    	base.dispose();
    }
    //end add
    
    me.endOfClass(arguments);
    return me;
};
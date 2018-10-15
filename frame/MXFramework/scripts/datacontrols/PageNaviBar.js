$ns("mx.datacontrols");

$import("mx.editors.NumberEditor");
$import("mx.editors.TextEditor");

/**
 * 提供一个分页工具条，它要和 {@link mx.datacontrols.PagedControl} 配合使用。帮助有需要进行分页的控件实现分页。
 */
mx.datacontrols.PageNaviBar = function()
{
    var me = $extend(mx.controls.Control);
    var base = {};

    /**
     * 参见 {@link mx.controls.Control} 的 {@link mx.controls.Control.width};
     * 
     * @default 100%
     */
    me.width = "100%";

    /**
     * 参见 {@link mx.controls.Control} 的 {@link mx.controls.Control.height};
     * 
     * @default 25
     */
    me.height = 25;

    /**
     * @ignore
     */
    me.pagedControl = null;

    /**
     * 每页大小的选择器的 Jquery 对象
     */
    me.$pageSizeSelected = null;

    /**
     * 一个 Boolean 值，表示是否显示每页大小选择器。
     * 
     * @default true
     */
    me.displayPageSize = true;

    /**
     * 刷新按钮的 Jquery 对象。
     */
    me.$refreshButton = null;

    /**
     * 一个 Boolean 值，表示是否显示刷新按钮
     * 
     * @default true
     */
    me.displayRefreshButton = true;

    /**
     * 跳转到第一页的按钮的 Jquery 对象。
     */
    me.$firstPageButton = null;

    /**
     * 跳转到上一页的按钮的 Jquery 对象。
     */
    me.$previousPageButton = null;

    /**
     * 跳转到下一页的按钮的 Jquery 对象。
     */
    me.$nextPageButton = null;

    /**
     * 跳转到最后一页的按钮的 Jquery 对象。
     */
    me.$lastPageButton = null;

    /**
     * 一个 Boolean 值，表示是否显示跳转到某一页的输入框。
     * 
     * @default true
     */
    me.displayPageIndex = true;

    /**
     * 显示分页信息的文本框的 Jquery 对象
     */
    me.$pageInfo = null;

    /**
     * 一个 Boolean 值，表示是否显示分页信息的文本框。
     * 
     * @default true
     */
    me.displayPageInfo = true;

    /**
     * 一个 Number 值，表示总记录数。
     * 
     * @default 0
     */
    me.totalRowNum = 0;

    /**
     * 一个 Number 值，表示每页大小。
     * 
     * @default 20
     */
    me.pageSize = 20;

    /**
     * 一个 Number 值，表示总页数。
     * 
     * @default 1
     */
    me.totalPageNum = 1;

    /**
     * 一个 Number 值，表示当前第几页。
     * 
     * @default 1
     */
    me.pageIndex = 1;
    
    /**
     * 设置一个 Boolean 值，表示是否可编辑pageSize编辑框。
     * 
     * @default false
     */
    me.enableEditingPageSize = false;

    var _pageIndexTextEditor = null;
    var _pageSizeEditor = null;

    base.init = me.init;
    me.init = function()
    {
    	if($.isIE67()) {
    		if(me.width == "100%") me.width = null;
    		if(me.height == 25) me.height = null;
    	}
    	
        base.init();

        me.$e.addClass("pageNaviBar");

        if ($notEmpty(me.pagedControl))
        {
            if ($notEmpty(me.pagedControl.pageSize))
            {
                me.pageSize = me.pagedControl.pageSize;
            }
            
            me.enableEditingPageSize = me.pagedControl.enableEditingPageSize;
        }

        _drawPageNaviBar();

        _initBtnMethod();

        _refresh();
        
        me.setEnabled(me.enabled);
        

    };

    /**
     * @ignore
     * 设置 {@link pageSize} 字段的值，同时更新
     * {@link mx.dataControls.PagedControl.pageSize} 字段的值。
     * 
     * @param p_pageSize
     *            一个 Number 值，表示每页的大小。
     */
    me.setPageSize = function(p_pageSize)
    {
        me.pageSize = p_pageSize;
        
        if ($notEmpty(me.pagedControl))
        {
            if (me.pageSize != me.pagedControl.pageSize)
            {
            	if (/^\d+$/.test(p_pageSize)){
            		p_pageSize = parseInt(p_pageSize);
                    me.pagedControl.pageSize = p_pageSize;
            	}else{
            		_pageSizeEditor.setValue(me.pageSize);
            	}
            		
            }
        }
        
        if(me.displayPageSize)
        {
	        _pageSizeEditor.setValue(me.pageSize);
        }
        refreshPageInfo();
    };

    /**
     * @ignore
     * 设置{@link totalRowNum} 字段的值
     * 
     * @param p_totalRowNum
     *            一个 Number 值，表示总记录数。
     */
    me.setTotalRowNum = function(p_totalRowNum)
    {
        me.totalRowNum = p_totalRowNum;
        refreshPageInfo();
    };

    /**
     * @ignore
     * 设置{@link totalPageNum} 字段的值
     * 
     * @param p_totalPageNum
     *            一个 Number 值，表示总分页数。
     */
    me.setTotalPageNum = function(p_totalPageNum)
    {
        me.totalPageNum = p_totalPageNum;
        if (me.displayPageIndex)
        {
            me.$e.find("span#totalPageSize").text(" / " + me.totalPageNum).width(me.totalPageNum.toString().length * 7 + 14);
        }
    };

    /**
     * @ignore
     * 设置{@link pageIndex} 字段的值
     * 
     * @param p_pageIndex
     *            一个 Number 值，表示当前第几页。
     */
    me.setPageIndex = function(p_pageIndex)
    {
        me.pageIndex = p_pageIndex;
        if (me.displayPageIndex)
        {
            _pageIndexTextEditor.setText(p_pageIndex);
             //设置当前页显示框宽度
            _pageIndexTextEditor.setWidth(me.totalPageNum.toString().length * 7 + 7);
        }
    };
    
    /**
     * 获取分页大小设置编辑器。
     */
    me.getPageSizeEditor = function()
    {
    	return _pageSizeEditor;
    }
    
    /**
     * 刷新分页控件
     */
    me.refresh = function()
    {
    	_refresh();
    }

    /**
     * added by tiger on 2015/4/13 11:19:43
     */
    base.dispose = me.dispose;
    me.dispose = function(){
		if(_pageSizeEditor){
			_pageSizeEditor .off();
			_pageSizeEditor.dispose();
		}
		if(me.$pageSizeSelected){
			me.$pageSizeSelected.off();
			me.$pageSizeSelected.unbind();
			me.$pageSizeSelected.empty().remove();
			me.$pageSizeSelected=null;
			delete me.$pageSizeSelected;
		}
		
		if(me.$firstPageButton){
			me.$firstPageButton.off();
			me.$firstPageButton.unbind();
			me.$firstPageButton.empty().remove();
			me.$firstPageButton=null;
			delete me.$firstPageButton;
		}
    	//me.$firstPageButton.off("click");
		
		if(me.$previousPageButton){
			me.$previousPageButton.off();
			me.$previousPageButton.unbind();
			me.$previousPageButton.empty().remove();
			me.$previousPageButton=null;
			delete me.$previousPageButton;
		}
        //me.$previousPageButton.off("click");
		
		if(_pageIndexTextEditor){
			_pageIndexTextEditor.$input.off();
			_pageIndexTextEditor.$input.unbind();
			_pageIndexTextEditor.$e.find("input").off();
			_pageIndexTextEditor.$e.find("input").unbind();
			_pageIndexTextEditor.dispose();
		}
		
		if(me.$lastPageButton){
			me.$lastPageButton.off();
			me.$lastPageButton.unbind();
			me.$lastPageButton.empty().remove();
			me.$lastPageButton=null;
			delete me.$lastPageButton;
		}
        //me.$lastPageButton.off("click");
		
		if(me.$nextPageButton){
			me.$nextPageButton.off();
			me.$nextPageButton.unbind();
			me.$nextPageButton.empty().remove();
			me.$nextPageButton=null;
			delete me.$nextPageButton;
		}
        //me.$nextPageButton.off("click");
		
		if(me.$refreshButton){
			me.$refreshButton.off();
			me.$refreshButton.unbind();
			me.$refreshButton.empty().remove();
			me.$refreshButton=null;
			delete me.$refreshButton;
		}
		//me.$refreshButton.off("click");
		//_pageIndexTextEditor.$e.find("input").off("blur");
		
		if(me.$pageInfo){
			me.$pageInfo.off();
			me.$pageInfo.unbind();
			me.$pageInfo.empty().remove();
			me.$pageInfo=null;
			delete me.$pageInfo;
		}
		me.pagedControl = null;
		me.$e = null;
    	base.dispose();	
    } 


    /**
     * 设置 {@link enabled} 字段的值。
     */
    me.setEnabled = function(p_enabled)
    {         
    	me.enabled = p_enabled;
    	if (!me.$refreshButton) return;
    	me.$refreshButton.toggleClass("disabled", !p_enabled);
    	me.$refreshButton.attr("disabled", !p_enabled);
    	me.$firstPageButton.toggleClass("disabled", !p_enabled);
    	me.$firstPageButton.attr("disabled", !p_enabled);
    	me.$previousPageButton.toggleClass("disabled", !p_enabled);
    	me.$previousPageButton.attr("disabled", !p_enabled);
    	me.$nextPageButton.toggleClass("disabled", !p_enabled);
    	me.$nextPageButton.attr("disabled", !p_enabled);
    	me.$lastPageButton.toggleClass("disabled", !p_enabled);
    	me.$lastPageButton.attr("disabled", !p_enabled);
    	me.$pageInfo.toggleClass("disabled", !p_enabled);
    	me.$pageInfo.attr("disabled", !p_enabled);
    	me.getPageSizeEditor().setEnabled(p_enabled);
    	
    	if (me.displayPageIndex)
    	{
    		_pageIndexTextEditor.setEnabled(p_enabled);
    	}
    };
    
    /**
     * 绘制分页工具条（根据属性将各个按钮等添加到工具条上）。
     */
    function _drawPageNaviBar()
    {
        if (me.displayPageSize)
        {
        	if (me.enableEditingPageSize){
        		_pageSizeEditor = new mx.editors.DropDownEditor(
        	            {
        	                width : 40,
        	                onchanged : _pageSizeEditor_changed,
        	                displayCloseButton: false,
        	                allowEditing:true,
        	                displayMember:"value"
        	            });
        	}else{
                _pageSizeEditor = new mx.editors.DropDownEditor(
                        {
                            width : 40,
                            onchanged : _pageSizeEditor_changed,
                            displayCloseButton: false
                        });
        	}
            
            
            if ($notEmpty(me.pagedControl))
        	{
        		_pageSizeEditor.setItems(me.pagedControl.pageSizeOptions);
        	}
            
            me.$pageSizeSelected = _pageSizeEditor.$e;
            me.$pageSizeSelected.css("float", "left");
            me.$pageSizeSelected.addClass("allowEditing");
            me.$pageSizeSelected.find("div#deleteContainer").remove();
            me.$e.append(me.$pageSizeSelected);
            _addSeparator();
        }

        me.$firstPageButton = $("<span id=firstPage class='btn'/>");
        me.$previousPageButton = $("<span id=previousPage class='btn'/>");

        me.$e.append(me.$firstPageButton);
        me.$e.append(me.$previousPageButton);

        if (me.displayPageIndex)
        {
            _pageIndexTextEditor = new mx.editors.TextEditor(
            {
                width : 24,
                height : 21
            });
            _pageIndexTextEditor.$e.css("display", "inline-block");
            _pageIndexTextEditor.$e.css("float", "left");

            var totalPageNumSpan = $("<span id='totalPageSize'/>");
            totalPageNumSpan.text(" / " + me.totalPageNum);
            _addSeparator();
            me.$e.append(_pageIndexTextEditor.$e);
            me.$e.append(totalPageNumSpan);
            _addSeparator();
        }

        me.$nextPageButton = $("<span id=nextPage class='btn'/>");
        me.$lastPageButton = $("<span id=lastPage class='btn'/>");
        me.$e.append(me.$nextPageButton);
        me.$e.append(me.$lastPageButton);

        if (me.displayRefreshButton)
        {
            _addSeparator();
            me.$refreshButton = $("<span id=refresh class='btn'/>");
            me.$e.append(me.$refreshButton);
        }

        if (me.displayPageInfo)
        {
            me.$pageInfo = $("<span class='pageInfo'/>");
            me.$e.append(me.$pageInfo);
        }
        
        me.$e.find("> span").addClass("pageNaviSpan");
    }

    /**
     * 添加分割条
     */
    function _addSeparator()
    {
        me.$e.append($("<span class='separator'/>"));
    }

    /**
     * 每页大小选择器值变化时触发事件。
     */
    function _pageSizeEditor_changed()
    {
    	if (me.displayPageSize)
        {
	        var pageSize = _pageSizeEditor.value;
	        if ((/^\d+$/).test(pageSize))
	        	me.setPageSize(pageSize);
        }
    	
        me.pagedControl.moveToPage(1);
    }

    /**
     * 初始化各个按钮的方法
     */
    function _initBtnMethod()
    {
        me.$firstPageButton.on("click", getFirstPage);
        me.$previousPageButton.on("click", getPreviousPage);
        me.$lastPageButton.on("click", getLastPage);
        me.$nextPageButton.on("click", getNextPage);
        if(me.displayRefreshButton)
        {
        	me.$refreshButton.on("click", refreshCurrenPage);
        }
        if (me.displayPageIndex)
        {
        	_pageIndexTextEditor.$input.on("keypress", function(e){
        		if (e.which == 45)
        		{
        			return true;
        		}
        		
    			if ((e.which >= 48 && e.which <= 57 && e.ctrlKey == false && e.shiftKey == false)
    					|| e.which == 0 || e.which == 8)
    			{
    				return true;
    			} 
    			else
    			{
    				if (e.ctrlKey == true && (e.which == 99 || e.which == 118))
    				{
    					return true;
    				} 
    				else
    				{
    					return false;
    				}
    			}
        	});
        	
            _pageIndexTextEditor.$input.on("keyup", function(){
        		_check_data();		
        		return false;
            });
            
    		_pageIndexTextEditor.$input.on("keydown", function(){
    			_check_data();
    		});
    		
            _pageIndexTextEditor.$e.find("input").on("blur", function()
            {
                var pageIndex = Number(_pageIndexTextEditor.value);
                if (!$.isNumeric(pageIndex))
                {
                    _pageIndexTextEditor.setText(me.pageIndex);
                    pageIndex = me.pageIndex;
                }
                else if (pageIndex <= 0 || pageIndex > me.totalPageNum)
                {
                    _pageIndexTextEditor.setText(me.pageIndex);
                    pageIndex = me.pageIndex;
                }
                getPageByIndex(pageIndex);
            });
        }

        if ($notEmpty(me.pagedControl))
        {
            me.pagedControl.on("load", _refresh);
        }
    }

    /**
     * 刷新分页信息文本框的信息。
     */
    function refreshPageInfo()
    {
        if ($notEmpty(me.$pageInfo))
        {
            var info = mx.msg("PAGE_NAVI_BAR_INFO",
            {
                totalRowNum : me.totalRowNum,
                pageSize : me.pageSize
            });
            me.$pageInfo.html(info);
        }
    }

    /**
     * 刷新分页工具条。
     */
    function _refresh()
    {
    	if (me.$refreshButton && me.$refreshButton.hasClass("disabled"))
        {
            return;
        }
    	
        if ($notEmpty(me.pagedControl))
        {
            me.totalRowNum = me.pagedControl.itemCount;
            me.totalPageNum = me.pagedControl.getPageCount();
            me.pageIndex = me.pagedControl.pageIndex;

            if ($notEmpty(me.pagedControl) && me.pagedControl._columns 
            	&& me.pagedControl._columns.length != 0 
            	&& me.totalPageNum < me.pageIndex)
            	getFirstPage();
            me.setTotalRowNum(me.totalRowNum);
            me.setTotalPageNum(me.totalPageNum);
            me.setPageIndex(me.pageIndex);

            if (me.displayPageSize)
            {
            	_pageSizeEditor.setValue(me.pageSize);
            }

            if (me.pagedControl.isFirstPage())
            {
                setBtnEnabled(me.$firstPageButton, true);
                setBtnEnabled(me.$previousPageButton, true);
            }
            else
            {
                setBtnEnabled(me.$firstPageButton, false);
                setBtnEnabled(me.$previousPageButton, false);
            }

            if (me.pagedControl.isLastPage())
            {
                setBtnEnabled(me.$nextPageButton, true);
                setBtnEnabled(me.$lastPageButton, true);
            }
            else
            {
                setBtnEnabled(me.$nextPageButton, false);
                setBtnEnabled(me.$lastPageButton, false);
            }

            refreshPageInfo();
        }
    }

    /**
     * 获取下一页的记录。
     */
    function getNextPage()
    {
        if ($notEmpty(me.pagedControl))
        {
            if (!me.$nextPageButton.hasClass("disabled"))
            {
                me.pagedControl.moveToNextPage();
            }
        }
    }

    /**
     * 获取最后一页的记录。
     */
    function getLastPage()
    {
        if ($notEmpty(me.pagedControl))
        {
            if (!me.$lastPageButton.hasClass("disabled"))
            {
                me.pagedControl.moveToLastPage();
            }
        }
    }

    /**
     * 获取上一页的记录。
     */
    function getPreviousPage()
    {
        if ($notEmpty(me.pagedControl))
        {
            if (!me.$previousPageButton.hasClass("disabled"))
            {
                me.pagedControl.moveToPreviousPage();
            }
        }
    }

    /**
     * 获取第一页的记录。
     */
    function getFirstPage()
    {
        if ($notEmpty(me.pagedControl))
        {
            if (!me.$firstPageButton.hasClass("disabled"))
            {
                me.pagedControl.moveToFirstPage();
            }
        }
    }

    function refreshCurrenPage()
    {
    	 if (!me.$refreshButton.hasClass("disabled"))
         {
    		 me.pagedControl.moveToPage(me.pageIndex);
         }
    }

    /**
     * 获取某一页的记录。
     * 
     * @param p_pageIndex 一个 Number 值， 表示跳转到第几页。
     */
    function getPageByIndex(p_pageIndex)
    {
        if (p_pageIndex != me.pageIndex)
        {
            if ($notEmpty(me.pagedControl))
            {
                me.pagedControl.moveToPage(p_pageIndex);
            }
        }
    }

    /**
     * 设置按钮是否可用
     * 
     * @param p_btn 表示按钮的 Jquery 对象。 @param p_enabled 一个 Boolean 值，表示是否可用，如果是
     * true 表示按钮可用，反之则不可用。
     */
    function setBtnEnabled(p_btn, p_enabled)
    {
        p_btn.toggleClass("disabled", p_enabled);
    }

    //检验input中数字是否标准
	function _check_data()
	{
		setTimeout(function(){
			var valStr = _pageIndexTextEditor.$input.val() + "";
	    	if (!/^\d+$/.test(valStr))
	    	{
	    		_pageIndexTextEditor.setText(me.pageIndex);
	    	}
	    	else
	    	{
	    		_pageIndexTextEditor.setText(valStr);
	    	}
		},100);
	}
	
    me.endOfClass(arguments);
    return me;
};
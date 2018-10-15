$ns("mx.controls");

$import("mx.controls.ToolStrip");

/**
 * 提供一个字符图标文本的布局容器。
 * 
 * @example
 * 请参见 {@link mx.controls.ContextMenu} 的示例。
 */
mx.controls.IconTray = function()
{
    var me = $extend(mx.controls.ToolStrip);
    var base = {};

    /**
     * 获取或设置一个值，表示显示字符图标还是普通文本。请参见 {@link mx.utils.SymbolUtilClass}。
     * 
     * @default true
     */
    me.useSymbol = true;
    
    /**
     * 获取或设置一个值，表示字符图标文本的大小。
     * @default 20
     */
    me.symbolSize = 20;
    
    /**
     * 获取一个字符串，表示控件的类型。详见 {@link mx.controls.ToolStrip.toolStripType} 字段。
     * @default iconTray
     */
    me.toolStripType = "iconTray";
    
    base.init = me.init;
    me.init = function()
    {
        base.init();
        me.$e.addClass("iconTray");
        me.on("itemclick",_iconItem_click);
    };

    function _iconItem_click(e)
    {
        if (!me.enabled) return;

        var item = e.item;
        if (item != null && typeof(item) != "undefined" && item.enabled && item.items != null && item.items.length != 0)
        {
            item.dropDown("fast");
            $(document).one("click", _document_click);
        }
    }

    function _document_click(e)
    {
        var _container = me.$e.get(0);
        var target = e.target;
        var p = target;
        var contains = false;
        while (p != null)
        {
            p = p.parentNode;
            if (p == _container)
            {
                contains = true;
                break;
            }
        }

        if (contains)
        {
            var li = null;
            if (target.tagName == "SPAN" || target.tagName == "IMG")
            {
                li = target.parentNode.parentNode;
            }
            else if (target.tagName == "A")
            {
                li = target.parentNode;
            }
            else if (target.tagName == "FONT")
            {
                li = target.parentNode.parentNode.parentNode;
            }

            if (li != null)
            {
                if (li.className == "group" || li.className.indexOf("group ") != -1 || li.className.indexOf(" group") != -1)
                {
                    $(document).one("click", _document_click);
                    return;
                }
            }
        }

        me.hideDropDown();
    }
    
    base.dispose = me.dispose;
    /**
	* 释放对象运行时动态生成的内容（属性、方法、事件）。
	*/
    me.dispose = function()
    {
    	$(document).off("click", _document_click);
    	base.dispose();
    }

    me.endOfClass(arguments); 
    return me;
};
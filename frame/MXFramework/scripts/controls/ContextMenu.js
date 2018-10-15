$ns("mx.controls");

$import("mx.controls.MenuItem");
$import("mx.controls.ToolStrip");

/**
 * 提供一个上下文菜单的类，该上下文菜单使控件能够公开特定于该控件的上下文的功能。
 *
 * @example
 * 以下是一个创建 {@link mx.controls.ContextMenu} 的示例。
 * 该示例将说明如何创建一个 {@link mx.controls.ContextMenu}，如何添加菜单项，以及如何订购菜单项的事件。
 * <code language="JavaScript">
 * var contextMenu = new mx.controls.ContextMenu({
 *     items: [
 *         { name: "new", text: "新建", items: [{ name: "file", text: "文件" }] }, // 菜单项可以嵌套，表示子菜单
 *         { name: "open", text: "打开", imageKey: "open" },  // 使用“$/icons”目录中的“open.png”图片
 *         "-", // 表示分隔符
 *         { name: "close", text: "关闭", enabled: false }
 *     ], // 菜单项集合
 *     onitemclick: _contextMenuItem_click 
 * });
 * contextMenu.show(300, 400); 
 *
 * function _contextMenuItem_click(e)
 * {
 *    alert(e.item.text);
 * }         
 * </code>
 */
mx.controls.ContextMenu = function()
{
    var me =  $extend(mx.controls.ToolStrip);
    var base = {};
    
    /**
     * 获取一个字符串，表示控件的类型。详见 {@link mx.controls.ToolStrip.toolStripType} 字段。
     * 
     * @default contextMenu
     */
    me.toolStripType = "contextMenu";
    
    /**
     * 获取 {@link mx.controls.ToolStrip.items} 集合中项的默认类型。详见 {@link mx.controls.ToolStrip.defaultItemType} 字段。
     * 
     * @default mx.controls.MenuItem
     */
    me.defaultItemType = mx.controls.MenuItem;
    
    /**
     * @ignore
     */
    me.direction = "vertical";
    
    /**
     * 当显示子菜单时将触发该事件。调用 {@link show} 方法时会触发该事件。
     */
    me.ondropdown = null;
    
    /**
     * 当显示子菜单之前，会触发该事件。调用 {@link show} 方法时会触发该事件。
     * 
     * @cancelable
     */
    me.ondroppingdown = null;
    
    base.init = me.init;
    me.init = function()
    {
        base.init();        
        me.$e.addClass("menu");
        me.$e.menuSilde();
    };
    
    /**
     * 显示上下文菜单。该方法会触发 {@link ondropdown} 和 {@link ondroppingdown} 事件。
     * 
     * @param x 一个数字，表示容器左边缘相对于父容器左边缘的距离。
     * @param y 一个数字，表示容器上边缘相对于父容器上边缘的距离。
     * @param speed 三种预定速度之一的字符串（"slow", "normal", or "fast"）或表示动画时长的毫秒数值（如 1000）。
     */
    me.show = function(x, y, speed)
    {
        if (!me.enabled) return;

        if (me.hasChildren())
        {     
            if (me.dropDownChildItem != null)
            {                    
                me.dropDownChildItem.hideDropDown();
            }
            /*
            if (me.owner != null)
            {
                var canDropDown = me.owner.updateItemsVisibility(me.items);
                if (!canDropDown)
                {
                    return;
                }
            }*/
            
            var canDropDown = me.updateItemsVisibility(me.items);
            if (!canDropDown)
            {
                return;
            }
            
            var args = { cancel:false };       
            me.trigger("droppingdown", args);
            if (args.cancel) return;
       
       
            me.$e.popup({left:x, top:y, speed: speed});
            $(document).one("mousedown", _document_click);
            $(document).one("mouseup", _document_click);
            
            me.trigger("ondropdown");
        }
    };
    
    /**
	* 释放对象运行时动态生成的内容（属性、方法、事件）。
	*/
    base.dispose = me.dispose;
    me.dispose = function(){
    	me.$e.find("div").off();
     	$(document).off("mousedown", _document_click);
        $(document).off("mouseup", _document_click);
     	base.dispose();
     }
     
     
    function _document_click(e)
    {            
        var target = e.target
        var $target = $(target);
        var $menu = $target.closest("ul.menu");
        var menu;
        var contains = false;
        
        if ($menu.length > 0)
        {
            menu = $menu.data("control");
	        if ($isEqual(menu, me) || $isEqual(menu.owner, me))
	        {
	            contains = true;
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

            if (li != null)
            {
                if (li.className == "group" || li.className.indexOf("group ") != -1 || li.className.indexOf(" group") != -1)
                {
                    $(document).one("mousedown", _document_click);
                    $(document).one("mouseup", _document_click);
                    return;
                }
            }
            
            if (target == $menu.menuSilde("upButton").get(0) || target == $menu.menuSilde("downButton").get(0))
	        {
	            $(document).one("mousedown", _document_click);
	            $(document).one("mouseup", _document_click);
	            return;
	        }
        }
 
        me.hideDropDown();
        me.$e.hide();
        $(document).off("mousedown", _document_click);
        $(document).off("mouseup", _document_click);
    }
    
    /**
     * 设置 {@link enabled} 字段的值。
     * 
     * {@exclude mx.controls.ErrorBox}
     * {@exclude mx.datacontrols.DataGridSearchBox}
     */
   me.setEnabled = function(p_enabled) {          
        if (typeof (p_enabled) != "undefined") {
            me.enabled = p_enabled;
            me.$e.toggleClass("disabled", !p_enabled);
            if($isArray(me.items) && me.items.lenght !=0){
            	for(var i=0;i<me.items.length;i++){
            		if(!me.items[i].$e.hasClass("separator")){
            			me.items[i].setEnabled(p_enabled);
            		}
            	}
        	}
            me.$e.attr("disabled", !p_enabled);
        }
    };
    
    me.endOfClass(arguments); 
    return me;
};
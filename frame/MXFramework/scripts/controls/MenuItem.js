$ns("mx.controls");

$import("mx.controls.ToolStripItem");

/**
 * 提供一个在 {@link mx.controls.ContextMenu} 和 {@link mx.controls.MainMenu} 控件中显示的菜单项的类。
 */
mx.controls.MenuItem = function()
{
    var me = $extend(mx.controls.ToolStripItem);
    var base = {};
    
    /**
     * 获取或设置一个字符串，表示一个链接地址。该字段在云桌面中会使用到。
     */
    me.url = null;
    
    /**
     * @ignore
     */
    me.extopts = null;
    
    /**
     * 获取或设置一个 Boolean 值，该值表示菜单项中文本字体是否显示粗体。如果该值为 true，表示粗体；反之为正常字体。该字段必须在初始化前设置。也可以使用 {@link markAsDefault} 方法设置该字段的值。
     * 
     * @default false 
     */
    me.isDefault = false;
    
    base.init = me.init;
    me.init = function()
    {
        base.init();
        me.$e.children("a").mouseenter(me._onmouseenter);
        me.$e.mouseleave(me._onmouseleave);
        if (me.isDefault)
        {
            me.markAsDefault(me.isDefault);
        }
    };
    
    /**
     * 设置菜单项中文本字体的粗细。该方法也可以设置 {@link isDefault} 字段的值。
     * 
     * @param [p_default=true] 一个 Boolean 值，表示菜单项中文本字体是否显示粗体。如果该值为 true，表示显示为粗体；反之为正常字体。
     */
    me.markAsDefault = function(p_default)
    {
        if (p_default == null)
        {
            p_default = true;
        }
        me.isDefault = p_default;
        me.$e.children("a").css("font-weight", me.isDefault ? "bold" : "normal");
    };
    
    /**
     * 获取一个 Boolean 值，表示鼠标是否停留在 {@link mx.controls.MenuItem} 上。如果该值为 true，表示鼠标正停留在该菜单项上；反之则没有。
     * 
     * @default false
     */
    me.hovering = false;
    
    /**
     * @ignore
     * 为 {@link mx.controls.MenuItem} 的容器中的“a”标签的 mouseenter 事件绑定的处理函数。
     */
    me._onmouseenter = function()
    {        
        if (!me.enabled) return;
        
        me.hovering = true;
        if (me.parent == null && me.owner.toolStripType == "mainMenu")
        {
            return;
        }
        
        if (me.parent != null && me.parent.dropDownChildItem != null)
        {
            me.parent.dropDownChildItem.$e.removeClass("droppedDown");
            window.setTimeout(function()
            {
                if (me.parent != null && me.parent.dropDownChildItem != null && !me.parent.dropDownChildItem.hovering)
                {
                    me.parent.dropDownChildItem.hideDropDown();
                }
            }, 200);
        }
        else if (me.parent == null && me.owner != null && me.owner.dropDownChildItem != null)
        {
            me.owner.dropDownChildItem.$e.removeClass("droppedDown");
            window.setTimeout(function()
            {
                if (me.owner != null && me.owner.dropDownChildItem != null && !me.owner.dropDownChildItem.hovering)
                {
                    me.owner.dropDownChildItem.hideDropDown();
                }
            }, 200);
        }
        
        if (me.$e.hasClass("group"))
        {
            window.setTimeout(function()
            {
                if (me.hovering)
                {
                    me.dropDown();
                }
            }, 300);
        }
    };
    
    /**
     * @ignore
     * 为 {@link mx.controls.MenuItem} 的容器中的“a”标签的 mouseleave 事件绑定的处理函数。
     */
    me._onmouseleave = function()
    {
        me.hovering = false;
    };
    
    /**
	 * 释放对象运行时动态生成的内容（属性、方法、事件）。
	 */
	base.dispose = me.dispose;
	me.dispose = function()
	{
	 	me.$e.children("a").off();
	 	me.$e.off();
	 	base.dispose();
	}
    
    me.endOfClass(arguments); 
    return me;
};
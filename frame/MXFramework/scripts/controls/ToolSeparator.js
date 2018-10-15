$ns("mx.controls");

/**
 * 表示分割线，用于对 {@link mx.controls.ToolStrip} 的项或者 {@link mx.controls.MainMenu}、 {@link mx.controls.ContextMenu} 控件的子项进行分组。
 */
mx.controls.ToolSeparator = function(p_name)
{
    var me = this;
    
    /**
     * 获取或设置项的名称。
     */
    me.name = p_name != null ? p_name : null;
    
    /**
     * 获取该项的父容器的对象，通常是一个 {@link mx.controls.ToolStrip} 类型的实例。
     */
    me.owner = null;
    
    /**
     * 获取该项的父 {@link mx.controls.ToolStripItem} 对象。如果没有，则为 null。
     */
    me.parent = null;
    
    /**
     * 获取该项是否为分隔符。如果为 true，表示该项为分隔符；反之则不是。
     * 
     * @default true
     */
    me.isSeparator = true;
    
    /**
     * 获取一个 Boolean 值，表示该项是否包含子项。如果该值为 true，表示有子项；反之则没有。
     * 
     * @default false
     */
    me.isGroup = false;
    
    /**
     * 获取该项是否为可见状态。如果该值为 true，则表示可见；反之则不可见。
     * 
     * @default true
     */
    me.visible = true;
    
    /**
     * 初始化。
     */
    me.init = function()
    {
        me.$e = $("<li class=separator><span/></li>");
    };
    
    /**
     * 将该 {@link mx.controls.ToolSeparator} 置为可见，即将 {@link visible} 字段置为 true。
     */
    me.show = function()
    {
        me.$e.css("display", "");
    };
    
    /**
     * 将该 {@link mx.controls.ToolSeparator} 置为不可见，即将 {@link visible} 字段置为 false。
     */
    me.hide = function()
    {
        me.$e.css("display", "none");
    };
    
    /**
     * 设置 {@link visible} 字段的值。
     */
    me.setVisible = function(p_visible)
    {                       
        me.visible = p_visible;
        p_visible ? me.$e.css("display", "") : me.$e.css("display", "none");            
    };
    
    /**
	* 释放对象运行时动态生成的内容（属性、方法、事件）。
	*/
    me.dispose = function()
    {
    	me.$e.empty().remove();
    	me.$e = null;
    	delete me.$e;
    }
    
    me.init();

    return me;
};
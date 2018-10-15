$ns("mx.containers");

/**
 * 提供一个面板容器。
 * 
 * @example
 * 以下是面板容器的使用示例。
 * var panel = mx.containers.Panel({
 *     name: "panel",
 *     title: "面板",
 *     width: 400,
 *     height: 300
 * });
 */
mx.containers.Panel = function()
{
	var me = $extend(mx.containers.Container);
	var base = {};

	/**
     * 请参见 {@link mx.controls.Control.width} 字段。
     */
    me.width = "100%";
    
    /**
     * 请参见 {@link mx.controls.Control.height} 字段。
     */
    me.height = "100%";
    
    /**
     * 获取或设置页面头部高度，一个整形数字，最大高度小于100，不支持百分比设置。
     * 
     * @default 21
     */
    me.headHeight = 21;
    
    /**
     * 获取或设置页面的名称。该字段也是页面的唯一标识。
     * 初始化控件时必须设置该字段
     */
    me.name = null;
    
    /**
     * 获取或设置页面的标题，请使用 {@link setTitle} 方法设置该字段。
     */
    me.title = null;
    
    /**
     * 获取或设置页面的标题字体大小。
     */
    me.titleFontSize = null;
    
    /**
     * 获取或设置页面的标题图片，请使用 {@link setImage} 方法设置该字段。
     */
    me.image = null;
    
    /**
     * 获取一个 Boolean 值,表示页面是否显示标题栏。
     * 
     * @default true
     */
    me.displayHead = true;
    
    /**
     * 获取或设置页面的是否显示边框。
     */
    me.displayBorder = true;
    
    /**
     * 表示页面标题栏的 JQuery 对象。
     */
    me.$head = null;
    
    /**
     * 表示页面主体部分的 JQuery 对象（不包含标题栏的部分）。
     */
    me.$body = null;
    
    /**
     * 初始化方法。执行设置样式并初始化属性等操作。
     */
    base.init = me.init;
    me.init = function()
    {
    	if($.isIE67()) {
    		if(me.width == "100%") me.width = null;
    	}
    	if( me.image == null)
    	{
    		me.$head = $("<div id='head'><div id=title " + (me.titleFontSize != null ? "style='font-size:" + me.titleFontSize + "'" : "") + "/></div>");
    	}
    	else
    	{
    		me.$head = $("<div id='head'><div id=title " + (me.titleFontSize != null ? "style='font-size:" + me.titleFontSize + "'" : "") + "/><img src='" + me.image + "'/></div>");
    	}
    	
        me.$head.css({
            "height":parseInt(me.headHeight) + "px",
            "line-height":parseInt(me.headHeight) + "px"
        });       
        me.$body = $("<div id=body/>");
        me.$container = me.$body;
        
        base.init();
        
        me.$e.attr("id", me.name);
        me.$e.append(me.$head);
        me.$e.append(me.$body);   
        me.$e.addClass("panel");
        
        if (me.displayHead)
        {
            me.$body.css("top", parseInt(me.headHeight) + "px");
        }
        else
        {
            me.$head.hide();
        }

        if (me.title != null)
        {
            me.setTitle(me.title);
        }  
        
        if (!me.displayBorder)
        {
        	me.$e.css("border", "none");
        }
    };
	
    /**
     * 设置 {@link title} 字段的值。
     * 
     * @param p_title 一个字符串，表示页面的标题。
     */
    me.setTitle = function(p_title)
    {
        me.title = p_title;
        if (me.$head != null)
        {
            me.$head.children("#title").text(p_title);
        }
    };
    
    /**
     * 设置 {@link image} 字段的值。
     * 
     * @param p_title 一个字符串，表示页面的标题。
     */
    me.setImageUrl = function(p_image)
    {
    	me.image = p_image;
        if (me.$head != null)
        {
            me.$head.children("img").attr("src", p_image);
        }
    };
    
    /**
     * 设置 {@link title} 字段的值。
     * 
     * @param p_title 一个字符串，表示页面的标题。
     */
    me.setTitleFontSize = function(p_titleFontSize)
    {
        me.titleFontSize = p_titleFontSize;
        if (me.$head != null)
        {
            me.$head.children("#title").css("font-size", p_titleFontSize);
        }
    };
    
     /**
     * 设置 {@link title} 字段的值。
     * 
     * @param p_title 一个字符串，表示页面的标题。
     */
    me.setDisplayBorder = function(p_displayBorder)
    {
        me.displayBorder = p_displayBorder;
        if (me.$e)
        {
        	if (p_displayBorder)
        	{
        		me.$e.css("border", "");
        	}
        	else
        	{
        		me.$e.css("border", "none");
        	}
        }
    };
    
    base.dispose = me.dispose; 
    me.dispose = function(){
		me.$head.off();
		me.$head.unbind();		
		me.$head.empty().remove();				
		me.$body.off();
		me.$body.unbind();
		me.$body.empty().remove();		
		base.dispose();
	}
    
	me.endOfClass(arguments); 
	return me;
};
$ns("mx.editors");

/**
 * 提供一个允许用户点击进行页面跳转或其他操作的链接编辑器的类。
 * 
 * @example 以下是一个自动跳转的链接编辑器如何初始化的示例。 
 * <code language="JavaScript">
 * var linkEditor = new mx.editors.LinkEditor(
 * {
 *     "type" : "imgtext",//指定链接的类型。
 *     "width" : "90px",//指定控件宽度。
 *     "imageKey" : "1",//指定图标名称。
 *     "text" : "测试链接",
 *     "autoHref" : true,//自动跳转。
 *     "hrefUrl" : "http://www.baidu.com"//指定自动跳转的地址。
 * });
 * </code>
 * 
 * @example 以下是一个自定义点击动作的链接编辑器如何初始化的示例。 
 * <code language="JavaScript">
 * var linkEditor = new mx.editors.LinkEditor(
 * {
 *     "type" : "imgtext",//指定链接的类型。
 *     "width" : "90px",//指定控件宽度。
 *     "imageKey" : "1",//指定图标名称。
 *     "text" : "测试链接"
 * });
 * linkEditor.on("click", function()
 * {
 *     alert("click me");//触发点击事件。
 * });
 * </code>
 */
mx.editors.LinkEditor = function()
{
    var me = $extend(mx.editors.Editor);
    var base = {};

    /**
     * 获取链接的类型。 请使用 {@link setType} 方法设置该字段的值。
     * <p>
     * 该字段可选的值包括：
     * <ul>
     * <li><b>text</b></li>
     * <li><b>img</b></li>
     * <li><b>imgText</b></li>
     * </ul>
     * </p>
     * 
     * @default imgText
     */
    me.type = "imgText";

    /**
     * 获取一个 Boolean 值，表示点击链接时是否自动跳转。
     * 
     * @default false
     */
    me.autoHref = false;

    /**
     * 获取一个字符串，表示自动跳转的链接地址。
     * 如果{@link autoHref}属性设置为true，则需要设置本属性
     */
    me.hrefUrl = null;

    /**
     * 获取页面跳转的类型。
     * <p>
     * 该字段可选的值包括：
     * <ul>
     * <li><b>open</b></li>
     * <li><b>location</b></li>
     * </ul>
     * </p>
     * 
     * @default open
     */
    me.hrefType = "open";

    /**
     * 获取一个字符串，表示图标的名称。请使用 {@link setImageKey} 方法设置该字段的值。
     */
    me.imageKey = null;

    /**
     * 获取一个字符串，表示图片所在地址路径。请使用 {@link setImageUrl} 方法设置该字段的值。
     */
    me.imageUrl = null;

    /**
     * 获取一个字符串，表示要显示的文本信息。请使用 {@link setText} 方法设置该字段的值。
     * 
     * @default ""
     */
    me.text = "";

    /**
     * 当控件被点击，并且 {@link autoHref} 属性为 false 时将触发该事件。
     */
    me.onclick = null;

    base.init = me.init;
    me.init = function()
    {
        base.init();
        me.$e.addClass("linkEditor");
        me.setType(me.type);
        me._initDefaultValue();
        me.$e.on("click", me.triggerClick);
    };

    /**
     * 设置 {@link type} 字段的值。
     * @param p_type  
     *  可选值 "text","img","imgText"
     */
    me.setType = function(p_type)
    {
        me.type = p_type;

        if (me.$input != null)
        {
            me.$input.unbind();
            me.$input.remove();
            me.$input = null;
        }
        me.$input = $("<a/>");
        if (me.type != "text")
        {
            me.$input.append($("<span id='img'/>"));
            if ($notEmpty(me.imageKey))
            {
                me.setImageKey(me.imageKey);
            }
            else
            {
                me.setImageUrl(me.imageUrl);
            }
        }
        if (me.type != "img")
        {
            me.$input.append($("<span id='text'/>"));
            if ($notEmpty(me.text))
            {
            	me.setText(me.text);
            }
        }

        me.$e.append(me.$input);
    };

    /**
     * 为控件提供被点击时的处理。当 {@link autoHref} 属性为 false 时，触发控件的 {@link onclick} 事件；当
     * {@link autoHref} 属性为 true 时，根据 {@link hrefType} 属性进行判断：当 {@link hrefType}
     * 属性为 location 时，本页面跳转到 {@link hrefUrl} 指向的页面；当 {@link hrefType} 为 open
     * 时：在IE8环境下，在新窗口中打开 {@link hrefUrl} 指向的页面；在 Chrome 和 FireFox 环境下，在新选项卡中打开
     * {@link hrefUrl} 指向的页面。
     */
    me.triggerClick = function()
    {
        if (me.enabled)
        {
            if (me.autoHref)
            {
                if ($notEmpty(me.hrefUrl))
                {
                    if (me.hrefType == "location")
                    {
                        window.location.href = me.hrefUrl;
                    }
                    else if (me.hrefType == "open")
                    {
                        window.open(me.hrefUrl);
                    }
                }
            }
            else
            {
                me.trigger("click");
            }
        }
    };

    /**
     * 设置 {@link imageKey} 字段的值。该方法会在 $/icons 目录中查找相应的 png 图片。
     * 
     * @param [p_imageKey]
     *            一个字符串，表示图片的名称。
     */
    me.setImageKey = function(p_imageKey)
    {
        me.imageKey = p_imageKey;
        if (me.imageKey != null)
        {
            var url = "$/icons/" + me.imageKey + ".png";
            me.setImageUrl(url);
        }
        else
        {
            me.setImageUrl(null);
        }
    };

    /**
     * 设置 {@link imageUrl} 字段的值。
     * 
     * @param [p_imageUrl=$/images/space.png]
     *            一个字符串，表示图像的 URL。
     */
    me.setImageUrl = function(p_image)
    {
        me.imageUrl = p_image;
        var $img = me.$input.find("#img");
        if (p_image == null || $img.length == 0)
        {
            var defPath = mx.mappath("$/images/space.png");
            $img.css("background-image", "url(" + defPath + ")");
        }
        else
        {
            $img.css("background-image", "url(" + mx.mappath(p_image) + ")");
        }
    };
    
    /**
     * 设置 {@link text} 字段的值。
     * @param p_value 一个文本，表示编辑器值的文本表达式。
     * @param [p_triggerEvent=false] 指定是否要触发 {@link onchanged} 事件。
     * 只有p_triggerEvent为true并且p_value与当前值不相同时才会触发onchanged事件
     */
    base.setValue = me.setValue;
    me.setValue = function(p_value,p_triggerEvent)
    {
        base.setValue(p_value,p_triggerEvent);
        if(!$isEmpty(p_value)){
        	me.text = p_value;
            me.$input.find("#text").text(me.text != null ? me.text : "");
        }
    };

    me.endOfClass(arguments); 
    return me;
};
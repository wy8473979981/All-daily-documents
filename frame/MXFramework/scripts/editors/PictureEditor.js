$ns("mx.editors");

/**
 * @ignore
 * 提供一个允许用户点击选择图片的类。
 * 
 * @example 以下是一个图片编辑器如何初始化的示例。 
 * <code language="JavaScript">
 * var picEditor = new mx.editors.PictureEditor();
 * picEditor.setValue("$theme/images/down_button_pressed.png");
 * </code>
 */
mx.editors.PictureEditor = function()
{
    var me = $extend(mx.editors.Editor);
    var base = {};

    /**
     * 获取控件的宽度。可以是数字（如 500）、字符串（如“500px”或“50%”）。
     * 
     * @default 32
     */
    me.width = "32";

    /**
     * 获取控件的高度。可以是数字（如 500）、字符串（如“500px”或“50%”）。
     * 
     * @default 32
     */
    me.height = "32";

    base.init = me.init;
    me.init = function()
    {
        base.init();
        me.$e.addClass("pictureEditor");
        me.$e.css("position", "relative");
        me._initDefaultValue();

        me.$file = $("<input type='file'>");
        me.$file.hide();
        me.$file.on("change", _img_change);
        me.$e.append(me.$file);

        me.$e.on("dblclick", _img_dblclick);
    };

    /**
     * 设置{@link mx.editors.PictureEditor} 的图片路径。
     * 
     * @param [p_image=mx.mappath("$theme/images/default.png")]。
     *            一个字符串，表示图像的 URL 路径。
     * @param [p_triggerEvent=false]
     *            一个 Boolean 值，表示是否要触发事件。如果该值为 true，则触发事件；反之则不触发。
     */
    base.setValue = me.setValue;
    me.setValue = function(p_image, p_triggerEvent)
    {
        if (me.$img != null)
        {
            me.$img.unbind();
            me.$img.remove();
            me.$img = null;
        }
        me.$img = $("<img/>");
        me.$img.attr("height", me.height);
        me.$img.attr("width", me.width);
        me.$img.css("min-height", me.height);
        me.$img.css("min-width", me.width);
        me.$img.css("max-height", me.height);
        me.$img.css("max-width", me.width);
        if ($notEmpty(p_image))
        {
            me.$img.attr("src", mx.mappath(p_image));
        }
        else
        {
            me.$img.attr("src", mx.mappath("$theme/images/default.png"));
        }
        me.$e.append(me.$img);
        base.setValue(p_image, p_triggerEvent);
    };

    function _img_dblclick()
    {
        if (me.enabled)
        {
            me.$file.trigger("click");
        }
    }

    function _img_change()
    {
        var filePath = me.$file.val();
        var picName = filePath.substring(filePath.lastIndexOf("\\") + 1);
        me.setValue(mx.mappath("$theme/images/" + picName));
    }

    me.endOfClass(arguments);
    return me;
};
$ns("mx.utils");
/**
 * 提供剪贴簿的访问接口。该类在运行时唯一静态实例是 <b>mx.utils.ClipboardUtil</b> 对象。该接口仅对 Internet Explorer 浏览器有效。
 *
 * @example 
 * 以下是一个通过 <b>mx.utils.ClipboardUtil</b> 获取和设置剪贴板中文本的示例。
 * <code language="JavaScript">
 * //获取剪贴板中的文本
 * var text = mx.utils.ClipboardUtil.getText();
 * 
 * //设置剪贴板中的文本
 * mx.utils.ClipboardUtil.setText("我是剪贴板中的文本");
 * </code>
 */
mx.utils.ClipboardUtilClass = function()
{
    var me = this;

    /**
     * 获取当前剪贴簿中存放的文本。如果浏览器不支持，则返回 null。
     */
    me.getText = function()
    {
        if (window.clipboardData)
        {
            return (window.clipboardData.getData('Text'));
        }
        else
        {
            return null;
        }
        
        return null;
    };

    /**
     * 设置当前剪贴簿中的文本为 p_text。
     * 
     * @param p_text 一个文本，表示需要放入剪贴簿的文本。
     */
    me.setText = function(p_text)
    {
        if (window.clipboardData)
        {
            return (window.clipboardData.setData("Text", p_text));
        }
        else
        {
            mx.indicate("error", mx.err("UNSUPPORTED"));
        }
    };

    return me;
};

mx.utils.ClipboardUtil = new mx.utils.ClipboardUtilClass();
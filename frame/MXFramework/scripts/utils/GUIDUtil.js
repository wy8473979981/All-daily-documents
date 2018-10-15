$ns("mx.utils");

/**
 * 提供生成 GUID 的工具类。该类在运行时唯一静态实例是 <b>mx.utils.GUIDUtil</b> 对象。
 * 
 * @example 
 * 以下是一个通过 <b>mx.utils.GUIDUtil</b> 获取一个 GUID 字符串的示例。
 * <code language="JavaScript">
 * //获取一个大写的 32 位的 GUID 串。
 * var newGUID_32 = mx.utils.GUIDUtil.newGUID();
 * 
 * //获取一个小写的 16 位的 GUID 串。
 * var lowwer_GUID_16 = mx.utils.GUIDUtil.newGUID(true, 16);
 * </code>
 */
mx.utils.GUIDUtilClass = function()
{
    var me = this;
    /**
     * 获取一个指定长度和大小写的 GUID 字符串。
     * 
     * @param [p_toLowerCase=false] 一个 Boolean 值，true 表示是否返回小写的 GUID。如果参数为 true，则返回小写的 GUID。反之返回大写的 GUID。
     * 
     * @param [p_length=32] 一个 Number 值，表示返回的 GUID 长度，默认返回的 GUID 长度为 32。
     */
    me.newGUID = function(p_toLowerCase, p_length)
    {
        var toLowerCase = false;
        if (p_toLowerCase != null)
        {
            toLowerCase = p_toLowerCase;
        }
        var length = 32;
        if (p_length != null)
        {
            length = p_length;
        }
        var result = "";
        for ( var i = 1; i <= length; i++)
        {
            var n = Math.floor(Math.random() * 16.0);
            if (n < 10)
            {
                result += n;
            }
            else if (n == 10)
            {
                result += "a";
            }
            else if (n == 11)
            {
                result += "b";
            }
            else if (n == 12)
            {
                result += "c";
            }
            else if (n == 13)
            {
                result += "d";
            }
            else if (n == 14)
            {
                result += "e";
            }
            else if (n == 15)
            {
                result += "f";
            }
            if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
            {
                result += "-";
            }
        }

        if (toLowerCase)
        {
            result = result.toLowerCase();
        }
        else
        {
            result = result.toUpperCase();
        }
        return result;
    };

    return me;
};

mx.utils.GUIDUtil = new mx.utils.GUIDUtilClass();
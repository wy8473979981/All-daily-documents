/**
 * <ul>
 * <li><b>$isBoolean(p_value)</b> - 判断对象是否为Boolean类型。
 * <p>
 * <b>参数：</b>
 * <ul>
 *     <li>p_value - 要对其进行判断的对象。</li>
 * </ul>
 * </p>
 * </li>
 * </ul>
 */
function $isBoolean(p_value)
{
    return typeof(p_value) == "boolean";
};






/**
 * <ul>
 * <li><b>parseBoolean(p_text)</b> - 将字符串转换为Boolean类型。
 * <p>
 * <b>参数：</b>
 * <ul>
 *     <li>p_text - 一个字符串值（忽略大小写），当字符串为“true”或“t”时返回true，否则返回false。</li>
 * </ul>
 * </p>
 * <p>
 * <b>示例：</b>
 * parseBoolean("true");//返回值为Boolean类型的true
 * </p>
 * </li>
 * </ul>
 */
function parseBoolean(p_text)
{
    if (typeof(p_text) == "boolean")
    {
        return p_text;
    }
    t = p_text.toLowerCase();
    return (t == "true") || (t == "t");
};
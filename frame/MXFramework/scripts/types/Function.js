/**
 * <ul>
 * <li><b>$isFunction(p_value)</b> - 判断对象是否为Function类型。
 * <p>
 * <b>参数：</b>
 * <ul>
 *     <li>p_value - 要对其进行判断的对象。</li>
 * </ul>
 * </p>
 * </li>
 * </ul>
 */
function $isFunction(p_value)
{
    return typeof(p_value) == "function";
}
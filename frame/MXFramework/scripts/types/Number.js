/**
 * <ul>
 * <li><b>$isNumber(p_value)</b> - 判断对象是否为Number类型。
 * <p>
 * <b>参数：</b>
 * <ul>
 *     <li>p_value - 要对其进行判断的对象。</li>
 * </ul>
 * </p>
 * </li>
 * </ul>
 */
function $isNumber(p_value)
{
    return typeof(p_value) == "number";
};




/**
 * <ul>
 * <li><b>format(p_value, p_formatString)</b> - 将数值按指定格式进行格式化。
 * <p>
 * <b>参数：</b>
 * <ul>
 *     <li>p_value 		  - 一个数字或字符串类型的数值。</li>
 *     <li>p_formatString - 一个字符串，指定格式。</li>
 * </ul>
 * </p>
 * <p>
 * <b>示例：</b>
 * Number.format(2, "00");//返回值为：02
 * Number.format(2.3, "0");//返回值为：2
 * Number.format(2.3, "0.00");//返回值为：2.30
 * </p>
 * </li>
 * </ul>
 */
Number.format = function(p_value, p_formatString)
{
    if (p_value == null)
    {
        return "";
    }
    if (typeof(p_formatString) == "undefined")
    {
        return p_value + "";
    }
    if (typeof(p_formatString) == "number")
    {
        return p_value + "";
    }
    var string = p_value + "";
    if (p_formatString != null && p_formatString != "")
    {
        var stringParts = string.split('.');
        var formatParts = p_formatString.split('.');

        if (stringParts[0].length < formatParts[0].length)
        {
            stringParts[0] =
                formatParts[0].substring(0, formatParts[0].length - stringParts[0].length) +
                stringParts[0];
        }
        if (formatParts.length == 1)
        {
            return stringParts[0];
        }
        else
        {
            if (stringParts.length > 1)
            {
                while (stringParts[1].length < formatParts[1].length)
                {
                    stringParts[1] += "0";
                }
            }
            else
            {
                stringParts[1] = formatParts[1];
            }
            
            var value = new Number(stringParts[0] + "." + stringParts[1]);
            return value.toFixed(formatParts[1].length);
        }
    }
    else
    {
        return string;
    }
};

//重写toFixed方法  修改规则为四舍五入
Number.prototype.toFixed = function(s) {
	

	var nu = Math.abs(this);
	var changenum = (parseInt(nu * Math.pow(10, s) + 0.5555) / Math.pow(10, s)).toString();
	var index = changenum.indexOf(".");
	if (index < 0 && s > 0) 
	{
		changenum = changenum + ".";
		for (var i = 0; i < s; i++) 
		{
			changenum = changenum + "0";
		}
	} 
	else 
	{
		index = changenum.length - index;
		for (var i = 0; i < (s - index) + 1; i++) 
		{
			changenum = changenum + "0";
		}
	}
	
	if (this < 0) 
	{
		return "-" + changenum;
	}
	return changenum;
};
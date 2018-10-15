/**
 * <ul>
 * <li><b>$isObject(p_value)</b> - 判断对象是否为Object类型。
 * <p>
 * <b>参数：</b>
 * <ul>
 *     <li>p_value - 要对其进行判断的对象。</li>
 * </ul>
 * </p>
 * </li>
 * </ul>
 */
function $isObject(p_value)
{
    return p_value != null && typeof(p_value) == "object";
}

/**
 * <ul>
 * <li><b>$isPlainObject(p_value)</b> - 判断对象是否为{} 或 new Object()或函数的实例对象。
 * <p>
 * <b>参数：</b>
 * <ul>
 *     <li>p_value - 要对其进行判断的对象。</li>
 * </ul>
 * </p>
 * </li>
 * </ul>
 */
function $isPlainObject(p_value)
{
    return $.isPlainObject(p_value);
}




/**
 * <ul>
 * <li><b>$isEmpty(p_value)</b> - 判断对象是否为null、undefined或空字符串。
 * <p>
 * <b>参数：</b>
 * <ul>
 *     <li>p_value - 要对其进行判断的对象。</li>
 * </ul>
 * </p>
 * <p>
 * <b>返回：</b>
 * <ul>
 *     <li>如果p_value为null、undefined或空字符串则返回true，否则返回false</li>
 * </ul>
 * </p>
 * </li>
 * </ul>
 */
function $isEmpty(p_value)
{
    return p_value == null || ((typeof(p_value) == "string" && p_value.trim() == "") || typeof(p_value) == "undefined");
}

/**
 * <ul>
 * <li><b>$notEmpty(p_value)</b> - 判断对象是否不为null、undefined或空字符串。
 * <p>
 * <b>参数：</b>
 * <ul>
 *     <li>p_value - 要对其进行判断的对象。</li>
 * </ul>
 * </p>
 * <p>
 * <b>返回：</b>
 * <ul>
 *     <li>如果p_value不为null、undefined或空字符串则返回true，否则返回false</li>
 * </ul>
 * </p>
 * </li>
 * </ul>
 */
function $notEmpty(p_value)
{
    return !$isEmpty(p_value);
}



/**
 * <ul>
 * <li><b>$format(p_value, p_format)</b> - 将对象值按指定格式进行格式化。
 * <p>
 * <b>参数：</b>
 * <ul>
 *     <li>p_value  - 要对其进行格式化的对象。</li>
 *     <li>p_format - 指定格式。</li>
 * </ul>
 * </p>
 * </li>
 * </ul>
 */
function $format(p_value, p_format)
{
    if ($isString(p_value) && ($isArray(p_format) || $.isPlainObject(p_format) || $isNumber(p_format)))
    {
        return String.format(p_value, p_format);
    }
    if ($isNumber(p_value))
    {
        return Number.format(p_value, p_format);
    }
    else if ($isDate(p_value))
    {
        return Date.format(p_value, p_format);
    }
    else
    {
        return p_value != null ? p_value.toString() : "";
    }
}


/**
 * <ul>
 * <li><b>$isEqual(p_value1, p_value2, p_ignoreCase)</b> - 判断两个对象的值是否相等。
 * <p>
 * <b>参数：</b>
 * <ul>
 *     <li>p_value1  - 要进行判断的对象。</li>
 *     <li>p_value2  - 要进行判断的对象。</li>
 *     <li>p_ignoreCase  - 一个Boolean值，指定是否忽略大小写，tru忽略大小写，false不忽略大小写。此参数可省略，默认值为false</li>
 * </ul>
 * </p>
 * <p>
 * <b>返回：</b>
 * <ul>
 *     <li>如果两个对象的值相等则返回true，否则返回false</li>
 * </ul>
 * </p>
 * </li>
 * </ul>
 */
function $isEqual(p_value1, p_value2, p_ignoreCase)
{
    if (p_ignoreCase == null)
    {
        p_ignoreCase = false;
    }
    if (p_ignoreCase)
    {
        if (typeof(p_value1) == "string")
        {
            p_value1 = p_value1.toLowerCase();
        }
        if (typeof(p_value2) == "string")
        {
            p_value2 = p_value2.toLowerCase();
        }
    }
    
    if ($isArray(p_value1) && $isArray(p_value2))
    {
        if (p_value1.length != p_value2.length) return false;
        for (var i = 0; i < p_value1.length; i++)
        {
            if (!$isEqual(p_value1[i], p_value2[i], p_ignoreCase))
            {
                return false;
            }                     
        }
        return true;
    }
    
    if (p_value1 == p_value2)
    {
        return true;
    }
    if (p_value1 == null && p_value2 != null)
    {
        return false;
    }
    else if (p_value1 != null && p_value2 == null)
    {
        return false;
    }
    else
    {
        return p_value1.valueOf() == p_value2.valueOf();
    }
}

/**
 * <ul>
 * <li><b>$notEqual(p_value1, p_value2, p_ignoreCase)</b> - 判断两个对象的值是否不相等。
 * <p>
 * <b>参数：</b>
 * <ul>
 *     <li>p_value1  - 要进行判断的对象。</li>
 *     <li>p_value2  - 要进行判断的对象。</li>
 *     <li>p_ignoreCase  - 一个Boolean值，指定是否忽略大小写，tru忽略大小写，false不忽略大小写。此参数可省略，默认值为false</li>
 * </ul>
 * </p>
 * <p>
 * <b>返回：</b>
 * <ul>
 *     <li>如果两个对象的值不相等则返回true，否则返回false</li>
 * </ul>
 * </p>
 * </li>
 * </ul>
 */
function $notEqual(p_value1, p_value2, p_ignoreCase)
{
    return !$isEqual(p_value1, p_value2, p_ignoreCase);
}

/**
 * <ul>
 * <li><b>$compare(p_value1, p_value2, p_ignoreCase)</b> - 比较两个对象的值的大小。
 * <p>
 * <b>参数：</b>
 * <ul>
 *     <li>p_value1  - 要进行比较的对象。</li>
 *     <li>p_value2  - 要进行比较的对象。</li>
 *     <li>p_ignoreCase  - 一个Boolean值，指定是否忽略大小写，true忽略大小写，false不忽略大小写。此参数可省略，默认值为false</li>
 * </ul>
 * </p>
 * <p>
 * <b>返回：</b>
 * <ul>
 *     <li>p_value1为String类型时：如果p_value1小于p_value2，则返回小于0的数。如果 p_value1大于p_value2，则返回大于0的数。如果两个值相等则返回0。</li>
 *     <li>p_value1为Number或Date类型时：返回 p_value2 - p_value1 的值差。</li>
 * </ul>
 * </p>
 * </li>
 * </ul>
 */
function $compare(p_value1, p_value2, p_ignoreCase)
{
	if (typeof p_value1 == "undefined")
		p_value1 = null;
	if (typeof p_value2 == "undefined")
		p_value2 = null;	
		
	if (p_value2 === null && p_value1 !== null) return -1;     
	if (p_value1 === null && p_value2 !== null) return 1;
	
    if (p_ignoreCase == null)
    {
        p_ignoreCase = false;
    }
    if (p_ignoreCase)
    {
        if (typeof(p_value1) == "string")
        {
            p_value1 = p_value1.toLowerCase();
        }
        if (typeof(p_value2) == "string")
        {
            p_value2 = p_value2.toLowerCase();
        }
    }
    
    if ($isEqual(p_value1, p_value2))
    {
        return 0;
    }
    else
    {
        if (typeof(p_value1) == "string")
        {
            return p_value1.localeCompare(p_value2);
        }
        else if ($isNumber(p_value1) || $isDate(p_value1))
        {
            return p_value2.valueOf() - p_value1.valueOf();
        }
        else
        {
            return 1;
        }
    }
}

/**
 * <ul>
 * <li><b>$clone(p_obj)</b> - 创建并返回对象的一个副本。
 * <p>
 * <b>参数：</b>
 * <ul>
 *     <li>p_obj  - 要创建副本的对象。</li>
 * </ul>
 * </p>
 * </li>
 * </ul>
 */
function $clone(p_obj)
{
    var result = null;
    if ($isArray(p_obj))
    {
        result = [];
        var i = p_obj.length;
        while (i--)
        {
            result[i] = $clone(p_obj[i]);
        }
        return result;
    } 
    else if ($isObject(p_obj))
    {
 		if (p_obj.constructor == RegExp)
 		{
 			result = new RegExp(p_obj.source);
 		}
    	else
    	{
    		result = {};
	        for (var k in p_obj)
	        {
	            result[k] = $clone(p_obj[k]);
	        }
    	}
        return result;
    } 
    else
    {
        return p_obj;
    }
}  
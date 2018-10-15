/**
 * <ul>
 * <li><b>$isString(p_value)</b> - 判断对象是否为String类型。
 * <p>
 * <b>参数：</b>
 * <ul>
 *     <li>p_value - 要对其进行判断的对象。</li>
 * </ul>
 * </p>
 * </li>
 * </ul>
 */
function $isString(p_value)
{
    return typeof(p_value) == "string";
};




/**
 * <ul>
 * <li><b>format(p_string, p_args)</b> - 将指定的字符串中的格式项替换为指定对象值的文本等效项。。
 * <p>
 * <b>参数：</b>
 * <ul>
 *     <li>p_string   - 指定的字符串。</li>
 *     <li>p_args     - 指定对象。</li>
 * </ul>
 * </p>
 * <p>
 * <b>示例：</b>
 * String.format("~/{0}/scripts/{1}.weblet.js", ["mx", "hello"]);//返回 "~/mx/scripts/hello.weblet.js"
 * </p>
 * </li>
 * </ul>
 */
String.format = function(p_string, p_args)
{
    if (p_string == null)
    {
        return "";
    }
    if (typeof(p_string) != "string")
    {
        p_string = p_string.toString();
    }
    if (p_args == null)
    {
        return p_string;
    }
    
    if (typeof(p_args) == "number")
    {
        var result = new Array(p_args);
        for (var i = 0; i < result.length; i++)
        {
            result[i] = p_string;
        }
        return result.join("");
    }
    
    var result = p_string;
    if (p_string.indexOf("{") != -1 && p_string.indexOf("}") != -1)
    {
        if ($.isArray(p_args) || $.isPlainObject(p_args))
        {
            for (var i in p_args)
            {
                result = result.replace("{" + i + "}", p_args[i]);
            }
        }
    }
    return result;
};



/**
 * <ul>
 * <li><b>replaceAll(p_src, p_tgt)</b> - 使用给定的p_tgt替换此字符串中所有匹配给定正则表达式的子字符串。
 * <p>
 * <b>参数：</b>
 * <ul>
 *     <li>p_src - 用来匹配此字符串的正则表达式。</li>
 *     <li>p_tgt - 用来替换每个匹配项的字符串。</li>
 * </ul>
 * </p>
 * </li>
 * </ul>
 */
String.prototype.replaceAll  = function(p_src, p_tgt){    
	return this.replace(new RegExp(p_src, "gm"), p_tgt);    
}

/**
 * <ul>
 * <li><b>contain(p_subString)</b> - 判断字符串中是否包含指定的字符。
 * <p>
 * <b>参数：</b>
 * <ul>
 *     <li>p_subString - 指定的字符。</li>
 * </ul>
 * </p>
 * <p>
 * <b>返回：</b>
 * <ul>
 *     <li>如果此字符串包含 p_subString，则返回 true，否则返回 false 。</li>
 * </ul>
 * </p>
 * </li>
 * </ul>
 */
String.prototype.contain = function(p_subString)
{
    return this.indexOf(p_subString) != -1;
};

/**
 * <ul>
 * <li><b>startsWith(p_string)</b> - 判断此字符串是否以指定的前缀开始。
 * <p>
 * <b>参数：</b>
 * <ul>
 *     <li>p_string - 指定的字符。</li>
 * </ul>
 * </p>
 * <p>
 * <b>返回：</b>
 * <ul>
 *     <li>如果字符串是以指定的前缀开始，则返回 true；否则返回 false。</li>
 * </ul>
 * </p>
 * </li>
 * </ul>
 */
String.prototype.startsWith = function(p_string)
{
    return this.substring(0, p_string.length) == p_string;
};

/**
 * <ul>
 * <li><b>endsWith(p_string)</b> - 判断此字符串是否以指定的后缀结束。
 * <p>
 * <b>参数：</b>
 * <ul>
 *     <li>p_string - 指定的字符。</li>
 * </ul>
 * </p>
 * <p>
 * <b>返回：</b>
 * <ul>
 *     <li>如果字符串是以指定的后缀结束，则返回 true；否则返回 false。</li>
 * </ul>
 * </p>
 * </li>
 * </ul>
 */
String.prototype.endsWith = function(p_string)
{
    return this.substring(this.length - p_string.length) == p_string;
};

/**
 * <ul>
 * <li><b>trimLeft()</b> - 返回字符串的副本，忽略前导空白。
 * <p>
 * <b>返回：</b>
 * <ul>
 *     <li>此字符串移除了前导空白的副本。</li>
 * </ul>
 * </p>
 * </li>
 * </ul>
 */
String.prototype.trimLeft = function()
{
    return this.replace(/^\s*/, "");
};

/**
 * <ul>
 * <li><b>trimRight()</b> - 返回字符串的副本，忽略尾部空白。
 * <p>
 * <b>返回：</b>
 * <ul>
 *     <li>此字符串移除了尾部空白的副本。</li>
 * </ul>
 * </p>
 * </li>
 * </ul>
 */
String.prototype.trimRight = function()
{
    return this.replace(/\s*$/, "");
};

/**
 * <ul>
 * <li><b>trim()</b> - 返回字符串的副本，忽略尾部空白和尾部空白。
 * <p>
 * <b>返回：</b>
 * <ul>
 *     <li>此字符串移除了尾部空白和尾部空白的副本。</li>
 * </ul>
 * </p>
 * </li>
 * </ul>
 */
String.prototype.trim = function()
{
    return this.trimRight().trimLeft();
};

/**
 * <ul>
 * <li><b>getByteCount()</b> - 返回此字符串的字节长度。
 * </li>
 * </ul>
 */
String.prototype.getByteCount=function()
{
    var text=this.replace(/[^\x00-\xff]/g,"**");
    return text.length;
};

/**
 * <ul>
 * <li><b>containsAsianCharacters()</b> - 判断字符串中是否包含中文字符。
 * <p>
 * <b>返回：</b>
 * <ul>
 *     <li>如果字符串中包含中文字符，则返回 true；否则返回 false。</li>
 * </ul>
 * </p>
 * </li>
 * </ul>
 */
String.prototype.containsAsianCharacters = function()
{
    return (/.*[\u4e00-\u9fa5]+.*$/.test(this));
};
/**
 * <ul>
 * <li><b>$isDate(p_value)</b> - 判断对象是否为Date类型。
 * <p>
 * <b>参数：</b>
 * <ul>
 *     <li>p_value - 要对其进行判断的对象。</li>
 * </ul>
 * </p>
 * </li>
 * </ul>
 */
function $isDate(p_value)
{
    return p_value != null && p_value.constructor == Date;
};






var __regex_yyyyM = /^(\S*)-(\S*)$/;
var __regex_yyyyMD = /^(\S*)-(\S*)-(\S*)$/;
var __regex_Hms = /^(\S*):(\S*):(\S*)$/;
var __regex_Hm = /^(\S*):(\S*)$/;

/**
 * <ul>
 * <li><b>parseDate(p_text)</b> - 将时间字符串转换为Date类型。
 * <p>
 * <b>参数：</b>
 * <ul>
 *     <li>p_text - 一个 Date 类型或字符串形式的日期值。</li>
 * </ul>
 * </p>
 *  * <p>
 * <b>示例：</b>
 * parseDate("2014-8-1 17:33:42");
 * </p>
 * </li>
 * </ul>
 */
function parseDate(p_text)
{
    if (p_text == null || (typeof(p_text) == "string" && p_text.trim() == ""))
    {
        return null;
    }
    if ($isDate(p_text))
    {
       return p_text;
    }
    
    var y = 1900;
    var M = 1;
    var d = 1;
    var H = 0;
    var m = 0;
    var s = 0;
    
    var parts = null;
    var datePart = null;
    var timePart = null;
    p_text = p_text.trim();
    if (p_text.indexOf(" ") != -1)
    {
        parts = p_text.split(" ");
    }
    else if (p_text.indexOf("T") != -1)
    {
        parts = p_text.split("T");
    }
    
    if (parts == null)
    {
        parts = [p_text];
    }
    
    if (parts.length == 1)
    {
        if (parts[0].indexOf(":") != -1)
        {
            timePart = parts[0];
        }
        else
        {
            datePart = parts[0];
        }
    }
    else if (parts.length == 2)
    {
        datePart = parts[0];
        timePart = parts[1];
    }
    
    if (datePart != null)
    {
        var matches = datePart.match(__regex_yyyyMD);
        if (matches == null)
        {
            matches = datePart.match(__regex_yyyyM);
            if (matches != null)
            {
               timePart = null;
            }
            else
            {
                matches = [datePart, datePart];
            }
        }
        if (matches != null)
        {
            if (matches.length >= 2)
            {
                y = parseInt(matches[1], 10);
                if (isNaN(y))
                {
                    y = 1900;
                }
            }
            
            if (matches.length >= 3)
            {
                M = parseInt(matches[2], 10);
                if (isNaN(M) || M > 12 || M <= 0)
                {
                    M = 1;
                }
            }
            
            if (matches.length >= 4)
            {
                var d_max = Date.getDaysInMonth(y, M - 1);
                d = parseInt(matches[3], 10);
                if (isNaN(d) || d <= 0)
                {
                    d = 1;
                }
                else if (d > d_max)
                {
                    d = d_max;
                }
            }
        }
    }
    
    if (timePart != null)
    {
        var matches = timePart.match(__regex_Hms);
        if (matches == null)
        {
            matches = timePart.match(__regex_Hm);
            if (matches == null)
            {
                matches = [timePart, timePart];
            }
        }
        
        if (matches.length >= 2)
        {
            H = parseInt(matches[1], 10);
            if (isNaN(H) || H > 23 || H < 0)
            {
                H = 0;
            }
        }
        
        if (matches.length >= 3)
        {
            m = parseInt(matches[2], 10);
            if (isNaN(m) || m > 60 || m < 0)
            {
                m = 0;
            }
        }
        
        if (matches.length >= 4)
        {
            s = parseInt(matches[3], 10);
            if (isNaN(s) || s > 60 || s < 0)
            {
                s = 0;
            }
        }
    }
    
    return new Date(y, M - 1, d, H, m, s);
};


Date.today = new Date();
Date.today = new Date(Date.today.getFullYear(), Date.today.getMonth(), Date.today.getDate());

/**
 * <ul>
 * <li><b>format(p_value, p_formatString)</b> - 将时间值按指定格式进行格式化。
 * <p>
 * <b>参数：</b>
 * <ul>
 *     <li>p_value        - 一个 Date 类型日期值。</li>
 *     <li>p_formatString - 一个字符串，指定格式。</li>
 * </ul>
 * </p>
 * <p>
 * <b>示例：</b>
 * Date.format(parseDate("2014-8-1 17:33:42"),"yyyy-MM-dd");//返回值为：2014-08-01
 * </p>
 * </li>
 * </ul>
 */
Date.format = function(p_value, p_formatString)
{
    if (p_value != null)
    {
        var text;
        if (!p_formatString)
        {
            text = "yyyy-MM-dd HH:mm:ss";
        }
        else
        {
            text = p_formatString;
        }
        var yy = p_value.getYear();
        var M = p_value.getMonth() + 1;
        var d = p_value.getDate();
        var h = p_value.getHours() % 12;
        var H = p_value.getHours();
        var m = p_value.getMinutes();
        var s = p_value.getSeconds();
    
        var yyyy = p_value.getFullYear();
        var MM = Number.format(M, "00");
        var dd = Number.format(d, "00");
        var hh = Number.format(h, "00");
        var HH = Number.format(H, "00");
        var mm = Number.format(m, "00");
        var ss = Number.format(s, "00");
        text = text.replace("yyyy", yyyy).replace("MM", MM).replace("dd", dd);
        text = text.replace("HH", HH).replace("hh", hh).replace("mm", mm).replace("ss", ss);
        text = text.replace("yy", yy).replace("M", M).replace("d", d);
        text = text.replace("H", H).replace("h", h).replace("m", m).replace("s", s);
        return text;
    }
    else
    {
        return "";
    }
};

/**
 * <ul>
 * <li><b>getDaysInMonth(p_year, p_month)</b> - 获取某一年的某一月的天数。
 * <p>
 * <b>参数：</b>
 * <ul>
 *     <li>p_year  - 一个数值，指定年。</li>
 *     <li>p_month - 一个数值，指定月。</li>
 * </ul>
 * </p>
 * </li>
 * </ul>
 */
Date.getDaysInMonth = function(p_year, p_month)
{
    switch (p_month + 1)
    {
        case 2:
            if ( (p_year % 400 == 0) || (p_year % 4 == 0) && (p_year % 100 != 0))
            {
                return 29;
            }
            else
            {
                return 28;
            }
        case 1: case 3: case 5:
        case 7: case 8: case 10: case 12:
            return 31;
        default:
            return 30;
    }
};

/**
 * <ul>
 * <li><b>addSeconds(p_seconds)</b> - 获取当前时间延长若干秒后的时间。
 * <p>
 * <b>参数：</b>
 * <ul>
 *     <li>p_seconds  - 一个数字，指定秒数。</li>
 * </ul>
 * </p>
 * </li>
 * </ul>
 */
Date.prototype.addSeconds = function(p_seconds)
{
    var ms = this * 1 + p_seconds * 1000;
    var date = new Date(ms);
    return date;
};

/**
 * <ul>
 * <li><b>addMinutes(p_minutes)</b> - 获取当前时间延长若干分钟后的时间。
 * <p>
 * <b>参数：</b>
 * <ul>
 *     <li>p_minutes  - 一个数字，指定分钟数。</li>
 * </ul>
 * </p>
 * </li>
 * </ul>
 */
Date.prototype.addMinutes = function(p_minutes)
{
    return this.addSeconds(p_minutes * 60);
};

/**
 * <ul>
 * <li><b>addHours(p_hours)</b> - 获取当前时间延长若干小时后的时间。
 * <p>
 * <b>参数：</b>
 * <ul>
 *     <li>p_hours  - 一个数字，指定小时数。</li>
 * </ul>
 * </p>
 * </li>
 * </ul>
 */
Date.prototype.addHours = function(p_hours)
{
    return this.addMinutes(p_hours * 60);
};

/**
 * <ul>
 * <li><b>addDays(p_days)</b> - 获取当前时间延长若干天后的时间。
 * <p>
 * <b>参数：</b>
 * <ul>
 *     <li>p_days  - 一个数字，指定天数。</li>
 * </ul>
 * </p>
 * </li>
 * </ul>
 */
Date.prototype.addDays = function(p_days)
{
    return this.addHours(p_days * 24);
};

/**
 * <ul>
 * <li><b>addWeeks(p_weeks)</b> - 获取当前时间延长若干周后的时间。
 * <p>
 * <b>参数：</b>
 * <ul>
 *     <li>p_weeks  - 一个数字，指定周数。</li>
 * </ul>
 * </p>
 * </li>
 * </ul>
 */
Date.prototype.addWeeks = function(p_weeks)
{
    return this.addDays(p_weeks * 7);
};

/**
 * <ul>
 * <li><b>addMonths(p_months)</b> - 获取当前时间延长若干月后的时间。
 * <p>
 * <b>参数：</b>
 * <ul>
 *     <li>p_months  - 一个数字，指定月数。</li>
 * </ul>
 * </p>
 * </li>
 * </ul>
 */
Date.prototype.addMonths = function(p_months)
{
    var copy = new Date(this * 1);
    var months = copy.getMonth() + 1 + p_months;
    
    var years = Math.floor(months / 12);
    
    var year = copy.getFullYear() + years;
    var month = Math.abs(years * 12 - months) % 12;
    var date = copy.getDate();
    var daysInMonth = Date.getDaysInMonth(year, month - 1);
    
    if (date > daysInMonth)
    {
        date = daysInMonth;
    }
    
    copy.setDate(1);
    copy.setFullYear(year);
    copy.setMonth(month - 1);
    copy.setDate(date);
    
    return copy;
};

/**
 * <ul>
 * <li><b>addYears(p_years)</b> - 获取当前时间延长若干年后的时间。
 * <p>
 * <b>参数：</b>
 * <ul>
 *     <li>p_years  - 一个数字，指定年数。</li>
 * </ul>
 * </p>
 * </li>
 * </ul>
 */
Date.prototype.addYears = function(p_years)
{
    var copy = this.addMonths(p_years * 12);
    return copy;
};

/**
 * <ul>
 * <li><b>clone()</b> - 建并返回对象的一个副本。
 * </li>
 * </ul>
 */
Date.prototype.clone = function()
{
    var date = new Date(this * 1);
    return date;
};
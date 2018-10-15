$ns("mx.utils");

/**
 * 提供一个检查字符串格式的工具类。该类在运行时唯一静态实例是 <b>mx.utils.CheckUtil</b> 对象。
 */
mx.utils.CheckUtilClass = function()
{
    var me = this;
    
    /**
     * 提供一个方法，判断参数是否为空。
     * 
     * @param p_str 一个字符串
     *            要检查的值。
     */
    me.isNull = function(p_str)
    {
        if (null == p_str || "" == p_str.trim())
        {
            return true;
        }
        else
        {
            return false;
        }
    };

    /**
     * 提供一个方法，判断参数是否全是数字。
     * 
     * @param p_str 一个字符串
     *            要检查的值。
     */
    me.isDigit = function(p_str)
    {   
    	var patrn = /^[+|-]?\d+[\.]?\d*$/;
    	var patrn2 = /\-*(\d+(\.\d+)*)e([\+\-])(\d+)/;
        return (patrn.test(p_str) || patrn.test(p_str));
    };

    /**
     * 提供一个方法，判断参数是否是整数。
     * 
     * @param p_str 一个字符串
     *            要检查的值。
     */
    me.isInteger = function(p_str)
    {
        var patrn = /^([+-]?)(\d+)$/;
        return patrn.test(p_str);
    };

    /**
     * 提供一个方法，判断参数是否为正整数。
     * 
     * @param p_str 一个字符串
     *            要检查的值。
     */
    me.isPlusInteger = function(p_str)
    {
        var patrn = /^([+]?)(\d+)$/;
        return patrn.test(p_str);
    };

    /**
     * 提供一个方法，判断参数是否为负整数。
     * 
     * @param p_str 一个字符串
     *            要检查的值。
     */
    me.isMinusInteger = function(p_str)
    {
        var patrn = /^-(\d+)$/;
        return patrn.test(p_str);
    };

    /**
     * 提供一个方法，判断参数是否为浮点数。
     * 
     * @param p_str 一个字符串
     *            要检查的值。
     */
    me.isFloat = function(p_str)
    {
        var patrn = /^([+-]?)\d*\.\d+$/;
        return patrn.test(p_str);
    };

    /**
     * 提供一个方法，判断参数是否为正浮点数。
     * 
     * @param p_str 一个字符串
     *            要检查的值。
     */
    me.isPlusFloat = function(p_str)
    {
        var patrn = /^([+]?)\d*\.\d+$/;
        return patrn.test(p_str);
    };

    /**
     * 提供一个方法，判断参数是否为负浮点数。
     * 
     * @param p_str 一个字符串
     *            要检查的值。
     */
    me.isMinusFloat = function(p_str)
    {
        var patrn = /^-\d*\.\d+$/;
        return patrn.test(p_str);
    };

    /**
     * 提供一个方法，判断参数是否仅中文。
     * 
     * @param p_str 一个字符串
     *            要检查的值。
     */
    me.isChinese = function(p_str)
    {
    	if(!$isString(p_str)){
         	return false;
        }
        var patrn = /^[\u4E00-\u9FA5\uF900-\uFA2D]+$/;
        return patrn.test(p_str);
    };
    
    /**
     * 提供一个方法，判断参数是否仅英文字母。
     * 
     * @param p_str 一个字符串
     *            要检查的值。
     */
    me.isLetter = function(p_str)
    {
    	if(!$isString(p_str)){
         	return false;
        }
    	var reg=/^[a-zA-Z]+$/;     
        return reg.test(p_str);
    };

    /**
     * 提供一个方法，判断参数是否仅ACSII字符。
     * 
     * @param p_str 一个字符串
     *            要检查的值。
     */
    me.isAcsii = function(p_str)
    {
    	if(!$isString(p_str)){
         	return false;
        }
        var patrn = /^[\x00-\xFF]+$/;
        return patrn.test(p_str);
    };

    /**
     * 提供一个方法，判断参数是否手机号码。
     * 
     * @param p_str 一个字符串
     *            要检查的值。
     */
    me.isMobile = function(p_str)
    {
    	if(!$isString(p_str)){
         	return false;
        }
        var patrn = /^1\d{10}$/;
        return patrn.test(p_str);
    };

    /**
     * 提供一个方法，判断参数是否电话号码。
     * 
     * @param p_str 一个字符串
     *            要检查的值。
     */
    me.isPhone = function(p_str)
    {
    	if(!$isString(p_str)){
         	return false;
        }
        var patrn = /^(0[\d]{2,3}-)?\d{6,8}(-\d{3,4})?$/;
        return patrn.test(p_str);
    };

    /**
     * 提供一个方法，判断参数是否URL地址。
     * 
     * @param p_str 一个字符串
     *            要检查的值。
     */
    me.isUrl = function(p_str)
    {
    	if(!$isString(p_str)){
         	return false;
        }
    	var patrn = /^((http(s)?|ftp|telnet|news|rtsp|mms):\/\/)?(((\w(\-*\w)*\.)+[a-zA-Z]{2,4})|localhost|(((1\d\d|2([0-4]\d|5[0-5])|[1-9]\d|\d)\.){3}(1\d\d|2([0-4]\d|5[0-5])|[1-9]\d|\d)))(:\d{1,5})?(\/+.*)*$/;
        return patrn.test(p_str);
    };

    /**
     * 提供一个方法，判断参数是否电邮地址。
     * 
     * @param p_str 一个字符串
     *            要检查的值。
     */
    me.isEmail = function(p_str)
    {
    	if(!$isString(p_str)){
         	return false;
        }
        var patrn = /^[\w-]+@[\w-]+(\.[\w-]+)+$/;
        return patrn.test(p_str);
    };

    /**
     * 提供一个方法，判断参数是否邮编。
     * 
     * @param p_str 一个字符串
     *            要检查的值。
     */
    me.isZipCode = function(p_str)
    {
    	if(!$isString(p_str)){
         	return false;
        }
        var patrn = /^\d{6}$/;
        return patrn.test(p_str);
    };

    /**
     * 提供一个方法，判断参数是否合法日期。
     * 该方法可匹配的值类型包括：
     * <ul>
     *      <li><b>yyyy-MM-dd</b></li>
     *      <li><b>yyyy-MM</b></li>
     * </ul>
     * @param p_str 一个字符串或一个日期对象
     *            要检查的值。
     */
    me.isDate = function(p_str)
    {
    	// 由于校验仅处理字符串信息，先将日期类型值转为日期格式字符串
    	if ($isDate(p_str))
    	{
    		try
    		{
    			p_str = Date.format(p_str, "yyyy-MM-dd");
    		}
    		catch(e)
    		{
    			return false;
    		}
    	}
    	
    	if(!$isString(p_str)){
         	return false;
        }
    	
        if (!/^\d{4}((\.|\/|\-)\d{1,2}){1,2}$/.test(p_str))
        {
            return false;
        }
        var r = p_str.match(/\d{1,4}/g);
        if (r == null)
        {
            return false;
        }
    	var d = new Date(r[0], r[1] - 1, r[2]);
        return (d.getFullYear() == r[0] && (d.getMonth() + 1) == r[1] && d.getDate() == r[2]);
       
    };
	
    /**
     * 提供一个方法，判断参数是否是合法日期时间
     * 该方法可匹配的值类型包括：
     * <ul>
     *      <li><b>yyyy-MM-dd hh:mm:ss</b></li>
     *      <li><b>yyyy-MM-dd hh:mm</b></li>
     * </ul>
     * @param p_str 一个字符串或一个日期对象
     *            要检查的值。
     */
    me.isDateTime = function(p_str)
    {
    	// 由于校验仅处理字符串信息，先将日期类型值转为日期格式字符串
    	if ($isDate(p_str))
    	{
    		try
    		{
    			p_str = Date.format(p_str, "yyyy-MM-dd HH:mm:ss");
    		}
    		catch(e)
    		{
    			return false;
    		}
    	}
    	if(!$isString(p_str))
    	{
         	return false;
        }
    	var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2})(:(\d{1,2})){1,2}$/;
        var r = p_str.match(reg);  
        if(r==null)
        {
        	return false;
        }
        else
        {
        	 r = p_str.match(/\d{1,4}/g);
             if (r == null)
             {
                 return false;
             }
             if(r.length < 5)
             {
            	 return false;
             }
             else if(r.length == 5)
             {
            	 var d = new Date(r[0], r[1] - 1, r[2],r[3],r[4]);
            	 return (d.getFullYear() == r[0] 
            	         && (d.getMonth() + 1) == r[1] 
            	         && d.getDate() == r[2] 
            	         && d.getHours() == r[3] 
            	         && d.getMinutes() == r[4]);
             }
             else if(r.length > 5)
             {
            	 d = new Date(r[0], r[1] - 1, r[2],r[3],r[4],r[5]);
            	 return (d.getFullYear() == r[0] 
    	         && (d.getMonth() + 1) == r[1] 
    	         && d.getDate() == r[2] 
    	         && d.getHours() == r[3] 
    	         && d.getMinutes() == r[4]
            	 && d.getSeconds() == r[5]);
             }
             else
             {
            	 return false; 
             }
        }   
    };
    
    /**
     * 提供一个方法，半段参数是否为合法时间 (hh:mm:ss)
     * @param p_str 一个字符串或一个日期对象
     */    
    me.isTime = function(p_str)  
	{   
    	if ($isDate(p_str))
    	{
    		try
    		{
    			p_str = p_str.toTimeString().split(" ")[0];
    		}
    		catch(e)
    		{
    			return false;
    		}
    	}
    	if(!$isString(p_str)){
         	return false;
        }
	    var reg=/^(20|21|22|23|[0-1]\d)(\:[0-5][0-9]){0,2}$/;
	    return reg.test(p_str);
	};     

    /**
     * 提供一个方法，判断 SQL WHERE 从句中参数是否包含 SQL 关键字，用于防止 SQL 注入攻击。
     * 
     * @param p_str 一个字符串
     *            要检查的值。
     */
    me.isSqlInjection = function(p_str)
    {
    	var regex = /(\sand\s)|(\sor\s)|(\slike\s)|(select\s)|(insert\s)|(delete\s)|(update\s[\s\S].*\sset)|(create\s)|(\stable)|(\sexec)|(declare)|(\struncate)|(\smaster)|(\sbackup)|(\smid)|(\scount)|(\sadd\s)|(\salter\s)|(\sdrop\s)|(\sfrom\s)|(\struncate\s)|(\sunion\s)|(\sjoin\s)|(')/;
        var result = [];
        var successful = !regex.test(p_str);
        var matches = p_str.match(regex);
        var hint = p_str;
        if (matches && matches[0])
        {
        	hint = matches[0];
        }
        
        return {successful: successful, hint: hint};
    };
    
    /**
     * 提供一个方法，判断字符串是否为 IP 地址。
     * @param p_str 一个字符串
     */
    me.isIP = function(p_str)
	{
    	if(!$isString(p_str)){
         	return false;
        }
    	var patrn = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-4])$/;
    	return patrn.test(p_str);
    };
    
      /**
     * 提供一个方法，判断字符串是否为身份证号码。
     * @param p_str 一个字符串
     */
    me.isIDCard = function(p_str)
	{
    	if(!$isString(p_str)){
         	return false;
        }
        var patrn = /^((11|12|13|14|15|21|22|23|31|32|33|34|35|36|37|41|42|43|44|45|46|50|51|52|53|54|61|62|63|64|65|71|81|82|91)\d{4})((((19|20)(([02468][048])|([13579][26]))0229))|((20[0-9][0-9])|(19[0-9][0-9]))((((0[1-9])|(1[0-2]))((0[1-9])|(1\d)|(2[0-8])))|((((0[1,3-9])|(1[0-2]))(29|30))|(((0[13578])|(1[02]))31))))((\d{3}(x|X))|(\d{4}))$/;    
        return patrn.test(p_str);
    };
   	
    /**
     * 检查给定参数是否小于指定的最大值。
     * 
     * @param p_num, 一个数字或数字类型的字符串，表示待检查的数字。
     * @param p_maxValue, 一个数字，表示允许的最大阈值。
     * @param p_isFloat, 一个布尔值，表示是否按浮点值进行比较。
     */
    me.isMaxValue = function(p_num, p_maxValue, p_isFloat)
    {
    	if (me.isDigit(p_num))
    	{
    		if (typeof p_isFloat == "undefined")
    		{
    			p_isFloat = false;
    		}
    		var value = p_isFloat ? parseFloat(p_num): parseInt(p_num);
    		var maxValue = p_isFloat ? parseFloat(p_maxValue): parseInt(p_maxValue);
    		return value > maxValue ? false: true;
    	}
    	return false;
    };
    
    /**
     * 检查给定参数是否大于指定的最小值。
     * 
     * @param p_num, 一个数字或数字类型的字符串，表示待检查的数字。
     * @param p_minValue, 一个数字，表示允许的最小阈值。
     * @param p_isFloat, 一个布尔值，表示是否按浮点值进行比较。
     */
    me.isMinValue = function(p_num, p_minValue, p_isFloat)
    {
    	if (me.isDigit(p_num))
    	{
    		if (typeof p_isFloat == "undefined")
    		{
    			p_isFloat = false;
    		}
    		var value = p_isFloat ? parseFloat(p_num): parseInt(p_num);
    		var minValue = p_isFloat ? parseFloat(p_minValue): parseInt(p_minValue);
    		return value < minValue ? false: true;
    	}
    	return false;
    };
    
    /**
     * 检查给定字符串参数是否小于指定长度。
     * 
     * @param p_str, 一个字符串，表示待检查的字符串。
     * @param p_maxLength, 一个数字，表示字符串的最大长度。
     */
    me.isMaxLength = function(p_str, p_maxLength)
    {
		if(p_str == null)
		{
			p_str = "";
		}
		var str = p_str;
    	if (! $isString(p_str))
    	{
    		str = p_str.toString();
    	}
    	var maxLength = parseInt(p_maxLength);
    	return str.length >= maxLength? false : true;
    };
    
    /**
     * 检查给定字符串参数是否大于指定长度。
     * 
     * @param p_str, 一个字符串，表示待检查的字符串。
     * @param p_minLength, 一个数字，表示字符串的最小长度。
     */
    me.isMinLength = function(p_str, p_minLength)
    {
		if(p_str == null)
		{
			p_str = "";
		}
		var str = p_str;
    	if (! $isString(p_str))
    	{
    		str = p_str.toString();
    	}
    	var minLength = parseInt(p_minLength);
    	return str.length <= minLength? false : true;
    };
    
    return me;
};

mx.utils.CheckUtil = new mx.utils.CheckUtilClass();
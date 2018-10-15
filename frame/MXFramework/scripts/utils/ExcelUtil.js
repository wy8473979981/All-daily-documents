$ns("mx.utils");

/**
 * 提供一个 Excel 的工具类。该类在运行时唯一静态实例是 <b>mx.utils.ExcelUtil</b> 对象。
 */
mx.utils.ExcelUtil = function()
{
    var me = this;
    
    /**
     * 获取或设置导出 Excel 时对应的服务地址。
     */
    me.baseUrl = "~/../mx/servlets/exportExcelServlet";
    
    /**
     * 获取或设置导出 Excel 时服务端需要的参数。
     * 该属性为一个 JSON 对象，如（{ tableName:"t_user", columnNames:"name,age,gender", columnCaptions:"姓名,年龄,性别", pageIndex:1, pageSize:20, filter:"gender='男' and age=25", fileName:"用户表格"}）。
     * 其中 tableName 表示表名称、columnNames 表示数据库列名（以逗号隔开）、columnCaptions 表示导出 Excel 的标题（以逗号隔开）、pageIndex 表示导出第几页的数据（第一页为 1）、pageSize 表示每页的条数、filter 表示过滤条件、fileName 表示导出的文件名。
     * <b>这些参数中必须要传的为：</b>tableName、columnCaptions。
     * 也支持po类的方式导出,如：（{ poName:"com.sgcc.uap.User", poColumnNames:"name,age,gender", columnCaptions:"姓名,年龄,性别", pageIndex:1, pageSize:20, filter:"gender='男' and age=25", fileName:"用户表格"}）。
     * 其中poName 标记实体的类名 poColumnNames：标识需要导出的实体的属性名
     * <b>这些参数中必须要传的为：</b>poName、poColumnNames。
     */
    me.params = null;
    
    /**
     * 设置 {@link baseUrl} 的值。
     */
    me.setBaseUrl = function(p_baseUrl)
    {
        if (me.baseUrl != p_baseUrl)
        {
            me.baseUrl = p_baseUrl;
        }
    };
    
    /**
     * 设置 {@link params} 的值。
     * @param p_params 一个json对象 { tableName:"t_user", columnNames:"name,age,gender", columnCaptions:"姓名,年龄,性别", pageIndex:1, pageSize:20, filter:"gender='男' and age=25", fileName:"用户表格"}
     */
    me.setParams = function(p_params)
    {
        if (me.params != p_params)
        {
            me.params = p_params;
        }
    };
    
    /**
     * 根据指定的参数导出 Excel 表格。 
     */
    me.exportExcel = function()
    {
    	if (me.baseUrl != null)
        {
            var params = "";
            if ($.isPlainObject(me.params))
            {
                if (typeof(me.params.fileName) != "undefined")
                {
                    me.params.fileName = encodeURIComponent(encodeURIComponent(me.params.fileName));
                }
                
                if (typeof(me.params.columnCaptions) != "undefined")
                {
                    me.params.columnCaptions = encodeURIComponent(encodeURIComponent(me.params.columnCaptions));
                }
                
                if (typeof(me.params.filter) != "undefined")
                {
                    me.params.filter = encodeURIComponent(encodeURIComponent(me.params.filter));
                }
                
                for (var key in me.params)
                {
                    if (params == "")
                    {
                        params += key + "=" + me.params[key];
                    }
                    else
                    {
                        params += "&" + key + "=" + me.params[key];
                    }
                }

                if (typeof (me.params.tableName) != "undefined" || typeof (me.params.poName) != "undefined")
                {
                    window.open(mx.mappath(me.baseUrl) + ($isEmpty(params) ? "" : "?" + params), "_parent");
                }
            }
        }
    };
    
    return me;
};
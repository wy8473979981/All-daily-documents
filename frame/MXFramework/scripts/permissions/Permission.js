$ns("mx.permissions");

$import("mx.rpc.RESTClient");

/**
 * 提供一个权限对象的类。
 */
mx.permissions.Permission = function()
{
    var me = $extend(MXComponent);
    
    var base = {};
    
    /**
     * 获取或设置一个字符串，表示获取权限的服务地址。
     */
    me.baseUrl = "~/../iscintegrate/rest/iscservice/";
    
    /**
     * 获取或设置一个字符串，表示权限标识。
     */
    me.iscID = null;
    
    /**
     * 获取或设置一个 JSON 数组或 JSON 对象，表示权限数据。
     */
    me.value = null;
    
    var _client = null;
    
    base.init = me.init;
    me.init = function()
    {
        base.init();
        if ("-1" != me.iscID)
        {
	        if (me.value == null)
	        {
	            if (_client == null)
	            {
	                _client = new mx.rpc.RESTClient({
	                    baseUrl:me.baseUrl
	                });
	            }
	            me.value = _client.getSync(me.iscID);
	        }
        }
    };
    
    /**
     * 将权限对象绑定到指定的控件上或者控件内部的组件上。
     * 
     * @param p_control 指定的控件。
     */
    me.bindControl = function(p_control)
    {
    	if ($notEmpty(me.value))
    	{
	        me._bindControl(me.value, p_control);
    	}
    };
    
    /**
     * @ignore
     */
    me._bindControl = function(p_value, p_control)
    {
        if (typeof(p_value.alias) != "undefined")
        {
            var readOnly = p_value.readOnly;
            var visible = p_value.visible;
            var ctrl = null;
            var iscCode = p_control.alias || p_control.permissionID;
            
            if (iscCode == p_value.alias)
            {
                ctrl = p_control;
            }
            else
            {
            	ctrl = p_control.findControl(p_value.alias);
                if (ctrl == null)
                {
                	ctrl = p_control.findControlByPermissionID(p_value.alias);
                }
            }
            
            if ($notEmpty(ctrl))
            {
            	if (ctrl.length > 1)
            	{
            		for ( var i = 0; i < ctrl.length; i++) {
						var ctl = ctrl[i];
						ctl.setEnabled(!readOnly);
						ctl.setVisible(visible);	
					}
            	}
            	else
            	{
            		ctrl.setEnabled(!readOnly);
                	ctrl.setVisible(visible);	
            	}
            }
        }
        
        if ($isArray(p_value.children))
        {
            for (var i = 0; i < p_value.children.length; i++)
            {
                me._bindControl(p_value.children[i], p_control);
            }
        }
    };
    
    me.endOfClass(arguments); 
    return me;
};
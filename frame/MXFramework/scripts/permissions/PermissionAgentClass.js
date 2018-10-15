$ns("mx.permissions");

$import("mx.rpc.RESTClient");

/**
 * 提供一个权限代理的类。
 */
mx.permissions.PermissionAgentClass = function()
{
    var me = $extend(MXObject);
    
    /**
     * 获取或设置一个字符串，表示获取权限的服务地址。
     */
    me.baseUrl = "~/../iscintegrate/rest/iscservice/";
    
    /**
     * 获取一个 {@link mx.permissions.Permission} 对象，表示当前获取的权限对象。
     */
    me.currentPermission = null;
    
    var _client = null;

    /**
     * 获取权限。
     * 
     * @param p_iscID 一个字符串，表示权限标识。
     */
    me.getPermission = function(p_iscID)
    {
        var permission = null;
        if (_client == null)
        {
            _client = new mx.rpc.RESTClient({
                baseUrl:me.baseUrl
            });
        }
        
        if ($notEmpty(p_iscID))
        {
            var value = _client.getSync(p_iscID);
            me.currentPermission = new mx.permissions.Permission({
                value: value
            });
            
            permission = me.currentPermission;
        }
        
        return permission;
    };
    
    /**
     * 为指定的控件设置权限。
     * @param p_permission 一个字符串，表示权限标识；或者一个 {@link mx.permissions.Permission} 对象。
     * @param p_control 一个 {@link mx.controls.Control} 对象。表示要设置权限的控件；或要设置其内部的组件。
     */
    me.setPermission = function(p_permission, p_control)
    {
    	if (p_permission != "-1") 
    	{
	        if ($isString(p_permission))
	        {
	            me.getPermission(p_permission);
	            me.currentPermission.bindControl(p_control);
	        }
	        else
	        {
	            p_permission.bindControl(p_control);
	        }
    	}
    };
    
    me.endOfClass(arguments); 
    return me;
};

mx.permissions.PermissionAgent = new mx.permissions.PermissionAgentClass();
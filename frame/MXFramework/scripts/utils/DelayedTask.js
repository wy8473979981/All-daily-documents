$ns("mx.utils");

/**
 * 提供一个延时执行的类。
 * @example
 * 以下为示例。
 * <code language="JavaScript">
 * 		function todo()
 * 		{
 * 			alert("delay 5 s");
 * 		}
 * 		mx.utils.DelayedTask.delay(5000, todo);
 * </code>
 */
mx.utils.DelayedTaskClass = function(p_fn, p_scope, p_args)
{
    var me = this;
    var id = null;
    
    /**
     * 提供延时执行一个函数的功能。
     * @param p_delay : Number
     * 				延时的毫秒数。
     * @param [p_newFn] : Function
     * 				(optional) 覆盖构造函数中待执行的函数。
     * @param p_newScope : Object
     * 				(optional) 覆盖构造函数中的范围对象。
     * @param p_newArgs : Array
     * 				(optional) 覆盖构造函数中的参数。
     */
    me.delay = function(p_delay, p_newFn, p_newScope, p_newArgs)
    {
        me.cancel();
        p_fn = p_newFn || p_fn;
        p_scope = p_newScope || p_scope;
        p_args = p_newArgs || p_args;
        id = setInterval(call, p_delay);
    };

    /**
     * 取消上一次延时执行的超时。
     * 
     * @return void
     */
    me.cancel = function()
    {
        if(id)
        {
            clearInterval(id);
            id = null;
        }
    };
    
    /**
     * @ignore
     */
    function call()
	{
		clearInterval(id);
        id = null;
        p_fn.apply(p_scope, p_args || []);
    };
};

mx.utils.DelayedTask = new mx.utils.DelayedTaskClass();
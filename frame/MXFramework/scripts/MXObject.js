/**
 * 表示 MX 框架中所有类的基类。在 MX 框架中所有的控件类、工具类等都派生自本类，向外暴露出类型信息、对象状态相关的方法和属性。
 * 
 * @abstract
 */
MXObject = function()
{
    var me = this;

    /**
     * @ignore
     */
    me.__class__ = MXObject;

    /**
     * @ignore
     */
    me.__superClasses__ = [];

    /**
     * 获取一个 Boolean 值，表示对象是否已被创建。
     * 
     * @default false
     */
    me.constructed = false;

    /**
     * 获取一个 Boolean 值，表示对象是否已被释放。
     * 
     * @default false
     */
    me.disposed = false;

    me._ = function(p_options)
    {
        if (me.canConstruct())
        {
            if ($.isPlainObject(p_options))
            {
                var isEventDispatcher = typeof (me.on) == "function";
                for ( var key in p_options)
                {
                    var option = p_options[key];
                    if (isEventDispatcher && typeof (me[key]) == "object"
                            && typeof (option) == "function"
                            && key.startsWith("on"))
                    {
                        me.on(key.substr(2), option);
                    }
                    else
                    {
                        me[key] = option;
                    }

                    option = null;
                    p_options[key] = null;
					delete p_options[key];
                }				
            }
            me.constructed = true;

            p_options = null;
        }
    };

    /**
     * 获取对象的类型信息。
     */
    me.getClass = function()
    {
        return me.__class__;
    };

    /**
     * 获取一个 Boolean 值，表示当前对象是否可创建。
     */
    me.canConstruct = function()
    {
        return !me.constructed;
    };

    /**
     * 获取一个 Boolean 值，表示当前对象是否是指定类或其派生类的实例。
     * 
     * @param p_class
     *            一个类（如 mx.controls.Control）。
     */
    me.instanceOf = function(p_class)
    {
        if (p_class == me.__class__)
        {
            return true;
        }
        else if (p_class == Object || p_class == MXObject)
        {
            return true;
        }
        else
        {
            return me.__superClasses__.indexOf(p_class) != -1;
        }
    };

    /**
     * @ignore
     */
    me.endOfClass = function(p_arguments)
    {
        if (me.__class__.caller != $extend)
        {
            me._(p_arguments[0]);
        }
        return me;
    };

    /**
	* 释放对象运行时动态生成的内容（属性、方法、事件）。
	*/
    me.dispose = function()
    {
    	me.__superClasses__.clear();
        me.disposed = true;		
		for(var p in me){
    		if(me.hasOwnProperty(p)){
				if(me[p] && me[p].constructor == MXEvent){
	        		me[p].clear();
	        	}
				me[p]=null;
    			delete me[p];
				delete p;
    		}    		
    	}
		me=null;
		delete me;
    };

    me.endOfClass(arguments); 
    return me;
};
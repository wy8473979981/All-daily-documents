$ns("mx.utils");

/**
 * 提供对象池，有关对象池的概念请跳转至<a href='http://www.ibm.com/developerworks/cn/java/l-common-pool/'>Jakarta Commons Pool</a>。
 * 
 * @param p_createObjectHandler 一个 Function 对象，指定创建新对象的方法。详见 {@link createObjectHandler} 方法。
 * @param [p_poolSize=5] 指定对象池可缓存对象的最大个数。
 * 
 *  @example 
 * 以下是一个通过 {@link mx.utils.ObjectPool} 创建一个 {@link mx.controls.Button} 对象池的示例。
 * <code language="JavaScript">
 * 
 * //创建一个池大小为 10 的 {@link mx.controls.Button} 对象池。
 * var buttonObjectPool = mx.utils.ObjectPool(mx.controls.Button, 10);
 * </code>
 */
mx.utils.ObjectPool = function(p_createObjectHandler, p_poolSize)
{
    var me = this;
    
    var _pool = [];
    
    /**
     * 获取或设置池中可缓存的最大个数。
     * @default 5
     */
    me.poolSize = (p_poolSize ? p_poolSize : 5);
    
    
    /**
     * 获取一个 Function 对象，表示创建新对象的方法。该字段由构造方法传入。该方法的原型为 function(p_objectPool, p_context)，其中 p_objectPool 表示调用池对象本身，而 p_context 则表示由 getObject 方法带入的上下文对象。
     */
    me.createObjectHandler = (p_createObjectHandler ? p_createObjectHandler : null);
    
    
    /**
     * 总是返回一个可用的对象。如果当前池中已缓存了对象，则将其从池中取出并返回；如果当前池中没有可用的对象，则会自动调用 {@link createObjectHandler} 方法创建一个新对象，并将其返回。
     * @param [p_context] 需要带入 createObjectHandler 中的上下文对象。
     */
    me.getObject = function(p_context)
    {
        if (_pool.length == 0)
        {
            var obj = me.createObjectHandler(me, p_context);
            return obj;
        }
        return _pool.pop();            
    };
    
    /**
     * 回收指定的对象。
     * @param p_object 需要被回收的对象。该对象的类型必须与池中对象一致，并且保证被回收后仍然可重复使用。
     */
    me.passivateObject = function(p_object)
    {
        if (p_object)
        {
            if (_pool.length >= me.poolSize)
            {
                p_object = null;
                return false;
            }
            else
            {
                _pool.push(p_object);
                return true;
            }
        }
    };
    
    
    /**
     * 返回一个 Object[] 数组，表示包含池中所有缓存的对象。
     */
    me.getPooledObjects = function()
    {
        return _pool;
    };
    
    return me;
};
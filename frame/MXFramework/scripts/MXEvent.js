/**
 * 表示 MX 框架中的事件类。事件有自己的声明周期，包括声明、订购、退购、触发等。通常事件包含一个方法集合；集合中的每个方法在事件触发时都会被执行。
 */
MXEvent = function()
{
    var me = this;

    /**
     * 获取监听事件的方法集合。请使用 {@link addEventListener}、{@link insertEventListener} 或 
     * {@link removeEventListener} 方法向集合中添加或移除监听。
     * 
     * @item function
     * @index 监听方法在集合中的顺序（从 0 开始计数）。
     */
    me.listeners = [];

    /**
     * 将监听方法添加到集合 {@link listeners} 的末尾。
     * 
     * @param p_listener
     *            一个 function 对象。
     */
    me.addEventListener = function(p_listener)
    {
        if (typeof (p_listener) == "function" && !me.listeners.contains(p_listener))
        {
            me.listeners.add(p_listener);
        }
    };

    /**
     * 将监听方法添加到集合 {@link listeners} 的指定位置。
     * 
     * @param p_index
     *            新方法在集合中的位置。
     * @param p_listener
     *            一个 function 对象。
     */
    me.insertEventListener = function(p_index, p_listener)
    {
        if (typeof (p_listener) == "function" && !me.listeners.contains(p_listener))
        {
            me.listeners.insert(p_index, p_listener);
        }
    };

    /**
     * 从 {@link listeners} 集合中移除指定的 function 对象。
     * 
     * @param p_listener
     *            一个 function 对象。
     */
    me.removeEventListener = function(p_listener)
    {
        return me.listeners.remove(p_listener);
    };

    /**
     * 清空 {@link listeners} 集合中所有的 function 对象。
     */
    me.clear = function()
    {
        me.listeners.clear();
    };

    /**
     * 执行所有的监听当前事件的方法。
     * 
     * @param e
     *            执行监听方法所需的参数。
     */
    me.fire = function(e)
    {
        for ( var i = 0; i < me.listeners.length; i++)
        {
            me.listeners[i](e);
        }
    };

    return me;
};
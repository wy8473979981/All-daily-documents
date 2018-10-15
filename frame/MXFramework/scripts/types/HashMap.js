$ns("mx.types");

/**
 * 提供一个哈希表对象。
 * 
 * @example 以下是一个创建 {@link mx.types.HashMap} 的示例。 该示例将说明如何创建一个
 *          {@link mx.types.HashMap}，以及如何向其中添加数据、获取数据和删除数据。
 *          <code language="JavaScript">
 * //创建 hashMap 对象
 * var hashMap = new mx.types.HashMap();
 * //向 hsahMap 中添加数据。
 * hashMap.setItem("zs","500");
 * //hashMap中可以添加任意对象
 *  var button = new mx.controls.Button({
 *     text: "按钮名称"
 * });
 * hashMap.setItem("button",button);
 * 
 * //获取 hashMap 中的对象
 * var buttonTemp = hashMap.getItem("button");
 * 
 * //删除 hashMap 中的对象
 * hashMap.removeItem("button");
 * </code>
 */
mx.types.HashMap = function()
{
    var me = this;

    /**
     * 元素个数。
     * 
     * @default 0
     */
    me.length = 0;

    /**
     * 获取数据集。
     */
    me.items = {};

    for ( var p in arguments[0])
    {
        if (arguments[0].hasOwnProperty(p))
        {
            me.items[p] = arguments[0][p];
            me.length++;
        }
    }

    /**
     * 设置哈希表元素。
     * 
     * @param p_key
     *            键。
     * @param p_value
     *            值，可以是任意对象。
     */
    me.setItem = function(p_key, p_value)
    {
        var previous = undefined;
        if (me.hasItem(p_key))
        {
            previous = me.items[p_key];
        }
        else
        {
            me.length++;
        }
        me.items[p_key] = p_value;
        return previous;
    };

    /**
     * 获取哈希表元素。
     * 
     * @param p_key
     *            键。
     */
    me.getItem = function(p_key)
    {
        return me.hasItem(p_key) ? me.items[p_key] : undefined;
    };

    /**
     * 获取一个 Boolean 值，判断哈希表是否包含哈希元素。
     * 
     * @param p_key
     *            键。
     */
    me.hasItem = function(p_key)
    {
        return me.items.hasOwnProperty(p_key);
    };

    /**
     * 删除哈希表元素。
     * 
     * @param p_key
     *            键。
     */
    me.removeItem = function(p_key)
    {
        if (me.hasItem(p_key))
        {
            previous = me.items[p_key];
            me.length--;
            delete me.items[p_key];
            return previous;
        }
        else
        {
            return undefined;
        }
    };

    /**
     * 获取由哈希表的键组成的一个数组。
     */
    me.keys = function()
    {
        var keys = [];
        for ( var k in me.items)
        {
            if (me.hasItem(k))
            {
                keys.push(k);
            }
        }
        return keys;
    };

    /**
     * 获取由哈希表的值组成的一个数组。
     */
    me.values = function()
    {
        var values = [];
        for ( var k in me.items)
        {
            if (me.hasItem(k))
            {
                values.push(me.items[k]);
            }
        }
        return values;
    };

    /**
     * 遍历处理哈希表。
     * 
     * @param p_fn
     *            每个哈希表元素的处理方法。
     */
    me.each = function(p_fn)
    {
        for ( var k in me.items)
        {
            if (me.hasItem(k))
            {
                p_fn(k, me.items[k]);
            }
        }
    };

    /**
     * 清除哈希表。
     */
    me.clear = function()
    {
        me.items = {};
        me.length = 0;
    };

    return me;
};
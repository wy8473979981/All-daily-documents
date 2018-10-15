/**
 * <ul>
 * <li><b>$isArray(p_value)</b> - 判断对象是否为数组类型。
 * <p>
 * <b>参数：</b>
 * <ul>
 *     <li>p_value - 要对其进行判断的对象。</li>
 * </ul>
 * </p>
 * </li>
 * </ul>
 */
function $isArray(p_value)
{
    return p_value != null && (typeof(p_value) == "object" && typeof(p_value.length) == "number" && typeof(p_value.swap) == "function");
};







/**
 * <ul>
 * <li><b>addAll(p_array)</b> - 将另一个数组中的所有元素追加到当前数组中。
 * <p>
 * <b>参数：</b>
 * <ul>
 *     <li>p_array - 被追加的数组。</li>
 * </ul>
 * </p>
 * </li>
 * </ul>
 */
Array.prototype.addAll = function(p_array){
	if(!$isArray(p_array))
		return this;
	for(var i = 0 ; i < p_array.length ; i++){
		this.push(p_array[i]);
	}
	return this;
}

/**
 * <ul>
 * <li><b>indexOf(p_item)</b> - 返回元素在数组中的索引值。
 * <p>
 * <b>参数：</b>
 * <ul>
 *     <li>p_item - 要获取索引值的元素。</li>
 * </ul>
 * </p>
 * </li>
 * </ul>
 */
Array.prototype.indexOf = function(p_item)
{
    for (var i = 0; i < this.length; i++)
    {
        if (this[i] == p_item)
        {
            return i;
        }
    }
    return -1;
};

/**
 * <ul>
 * <li><b>first(i)</b> - 返回数组中的第i个元素。
 * <p>
 * <b>参数：</b>
 * <ul>
 *     <li>i - 一个数字，数组中的索引值。</li>
 * </ul>
 * </p>
 * </li>
 * </ul>
 */
Array.prototype.first = function(i)
{
    if (this.length == 0) return null;
    
    if (typeof(i) != "number")
    {
        i = 0;
    }
    if (i >= this.length)
    {
        i = this.length - 1;
    }
    return this[i];
};

/**
 * <ul>
 * <li><b>last(i)</b> - 返回数组中的倒数第i个元素。
 * <p>
 * <b>参数：</b>
 * <ul>
 *     <li>i - 一个数字，数组中的索引值。</li>
 * </ul>
 * </p>
 * </li>
 * </ul>
 */
Array.prototype.last = function(i)
{
    if (this.length == 0) return null;
    
    if (typeof(i) != "number")
    {
        i = 0;
    }
    if (this.length - i - 1 >= 0)
    {
        return this[this.length - i - 1];
    }
    else
    {
        return this[0];
    }
};

/**
 * <ul>
 * <li><b>contains(p_item)</b> - 判断一个对象在数组中是否存在。
 * <p>
 * <b>参数：</b>
 * <ul>
 *     <li>p_item - 要判断的对象。</li>
 * </ul>
 * </p>
 * <p>
 * <b>返回：</b>
 * <ul>
 *     <li>如果数组中存在p_item元素则返回true，否则返回false。</li>
 * </ul>
 * </p>
 * </li>
 * </ul>
 */
Array.prototype.contains = function(p_item)
{
    return this.indexOf(p_item) != -1;
};

/**
 * <ul>
 * <li><b>add(p_item)</b> - 将一个对象添加到数组中的最后位置。
 * <p>
 * <b>参数：</b>
 * <ul>
 *     <li>p_item - 要添加的对象。</li>
 * </ul>
 * </p>
 * </li>
 * </ul>
 */
Array.prototype.add = function(p_item)
{
    return this[this.length] = p_item;
};

/**
 * <ul>
 * <li><b>insert(p_startIndex , p_item)</b> - 将一个对象添加到数组中的指定位置。
 * <p>
 * <b>参数：</b>
 * <ul>
 *     <li>p_startIndex - 一个数字，指定要添加的位置索引值。</li>
 *     <li>p_item       - 要添加的对象。</li>
 * </ul>
 * </p>
 * </li>
 * </ul>
 */
Array.prototype.insert = function(p_startIndex, p_item)
{
    return this.splice(p_startIndex, 0, p_item);
};

/**
 * <ul>
 * <li><b>insertBefore(p_item , p_beforeItem)</b> - 将一个对象添加到数组中的指定元素之前。
 * <p>
 * <b>参数：</b>
 * <ul>
 *     <li>p_item 			  - 要添加的对象。</li>
 *     <li>p_beforeItem       - 指定元素。</li>
 * </ul>
 * </p>
 * </li>
 * </ul>
 */
Array.prototype.insertBefore = function(p_item, p_beforeItem)
{
    var index = this.indexOf(p_beforeItem);
    if (index == -1)
    {
        return false;
    }
    
    this.insert(index, p_item);
    return true;
};

/**
 * <ul>
 * <li><b>insertAfter(p_item , p_afterItem)</b> - 将一个对象添加到数组中的指定元素之后。
 * <p>
 * <b>参数：</b>
 * <ul>
 *     <li>p_item 			 - 要添加的对象。</li>
 *     <li>p_afterItem       - 指定元素。</li>
 * </ul>
 * </p>
 * </li>
 * </ul>
 */
Array.prototype.insertAfter = function(p_item, p_afterItem)
{
    var index = this.indexOf(p_afterItem);
    if (index == -1)
    {
        return false;
    }
    else if (index == this.length)
    {
        this.add(p_item);
        return true;
    }
    else
    {
        this.insert(index + 1, p_item);
        return true;
    }
};

/**
 * <ul>
 * <li><b>remove(p_item)</b> - 删除数组中的指定元素。
 * <p>
 * <b>参数：</b>
 * <ul>
 *     <li>p_item 	- 要删除的元素。</li>
 * </ul>
 * </p>
 * </li>
 * </ul>
 */
Array.prototype.remove = function(p_item)
{
    return this.removeAt(this.indexOf(p_item));
};

/**
 * <ul>
 * <li><b>removeAt(p_index)</b> - 删除数组中指定位置的元素。
 * <p>
 * <b>参数：</b>
 * <ul>
 *     <li>p_index 	- 一个数字，元素索引值。</li>
 * </ul>
 * </p>
 * </li>
 * </ul>
 */
Array.prototype.removeAt = function(p_index)
{
    if (p_index >= 0 && p_index < this.length)
    {
        this.splice(p_index, 1);
        return true;
    }
    else
    {
        return false;
    }
};

/**
 * <ul>
 * <li><b>removeLast(p_index)</b> - 删除数组中倒数第p_index个元素。
 * <p>
 * <b>参数：</b>
 * <ul>
 *     <li>p_index 	- 一个数字，元素索引值。</li>
 * </ul>
 * </p>
 * </li>
 * </ul>
 */
Array.prototype.removeLast = function(p_index)
{
    if (this.length == 0) return;
    
    if (typeof(p_index) != "number")
    {
        p_index = 0;
    }
    
    var i = this.length - p_index - 1;
    this.removeAt(i);
};

/**
 * <ul>
 * <li><b>clear()</b> - 清空数组元素。
 * </li>
 * </ul>
 */
Array.prototype.clear = function()
{
    if (this.length > 0)
    {
        this.splice(0, this.length);
    }
};

/**
 * <ul>
 * <li><b>clone()</b> - 建并返回对象的一个副本。
 * </li>
 * </ul>
 */
Array.prototype.clone = function()
{
    return this.slice(0, this.length);
};

/**
 * <ul>
 * <li><b>swap(p_item1 , p_item2)</b> - 将数组中两个元素的位置互换。
 * <p>
 * <b>参数：</b>
 * <ul>
 *     <li>p_item1 	- 数组元素。</li>
 *     <li>p_item2 	- 数组元素。</li>
 * </ul>
 * </p>
 * </li>
 * </ul>
 */
Array.prototype.swap = function(p_item1, p_item2)
{
    var index1 = this.indexOf(p_item1);
    var index2 = this.indexOf(p_item2);   
    
    this[index1] = p_item2;
    this[index2] = p_item1;
};
$ns("mx.layouts")

$import("mx.layouts.AnchorLayout");
$import("mx.layouts.AbsoluteLayout");
$import("mx.layouts.ColumnLayout");
$import("mx.layouts.TableLayout");

/**
 * 提供布局器工厂类。该类在运行时唯一静态实例是 <b>mx.layouts.LayoutFactory</b> 对象。详见 {@link mx.layouts.LayoutFactoryClass.createLayout} 方法示例。
 */
mx.layouts.LayoutFactoryClass = function()
{
	var me = $extend(MXObject);
	
	/**
     * 根据指定的类型和选项创建布局器。
     * @param p_layoutType
     * 一个字符串，表示布局器类型（区分大小写）。如果该类型属于 {@link mx.layouts} 命名空间，可以省略为类型名称（如 mx.layouts.AnchorLayout 可简称为“AnchorLayout”）；否则需要给出完整的类型名称（如“mx.layouts.AnchorLayout”），详见<b>示例 1</b>。
     * 此外，该参数也可以为一个类型对象，详见<b>示例 2</b>。
     * 
     * <p>
     * 该参数常见值包括:
     * <ul>
     *     <li>{@link mx.layouts.AnchorLayout}</li>
     * </ul>
     * </p>
     * 
     * @exception
     * 
     * @param [p_options] 一个 JSON 对象，包含创建编辑器的参数及初始值。如“{ dataType: "number", max: 10, min: 0 }”。
     * 
     * 
     * @example
     * <code language="JavaScript">
     * var layout = null;
     * 
     * // 使用类型的全名称创建布局器
     * layout = mx.layouts.LayoutFactory.createLayout("mx.layouts.AnchorLayout", {owner: container});
     * 
     * // mx.layouts 命名空间下的布局器，可直接使用类型名称
     * layout = mx.layouts.LayoutFactory.createLayout("AnchorLayout", {owner: container});
     * </code>
     * 
     * 
     * @example
     * <code language="JavaScript">
     * // 在代码开头需要显示导入类型 
     * $import("sample.layouts.MyLayout");
     * 
     * ...
     * 
     * // 可以将类型对象直接作为 p_layoutType 参数传递。
     * var layout = mx.layouts.LayoutFactory.createLayout(
     *     sample.layouts.MyLayout,
     *     { myProperty1: "some value", myProperty2: "some value" }
     * );
     * </code>
     */
	me.createLayout = function(p_layoutType, p_options)
	{
		var layoutType = null;
		var layoutClass = null;
		var layoutInstance = null;
		
        if ($isString(p_layoutType))
        {
            if (p_layoutType.indexOf(".") == -1)
            {
                layoutType = "mx.layouts." + p_layoutType;
            }
            else
            {
            	layoutType = p_layoutType;
            }
            try
            {
                layoutClass = eval('('+layoutType+')');
            }
            catch (e)
            {
                throw new Error(mx.err("ERR_UNKNOWN_LAYOUT_TYPE", [p_layoutType]));
            }
        }
      	else if ($isFunction(p_layoutType))
      	{
      		layoutClass = p_layoutType;
      	}
        if ($isFunction(layoutClass))
        {
            layoutInstance = new layoutClass(p_options);
        }
        
        return layoutInstance;
	}
	me.endOfClass(arguments);
	return me;
};

mx.layouts.LayoutFactory = new mx.layouts.LayoutFactoryClass();
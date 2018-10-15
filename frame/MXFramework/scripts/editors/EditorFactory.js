$ns("mx.editors");

$import("mx.editors.CheckEditor");
$import("mx.editors.CustomEditor");
$import("mx.editors.DateTimeEditor");
$import("mx.editors.DropDownGridEditor");
$import("mx.editors.DropDownEditor");
$import("mx.editors.DropDownTreeEditor");
$import("mx.editors.LabelEditor");
$import("mx.editors.LinkEditor");
$import("mx.editors.ListEditor");
$import("mx.editors.NumberEditor");
$import("mx.editors.TextEditor");
$import("mx.editors.TimeEditor");
$import("mx.editors.PictureEditor");
$import("mx.editors.PictureManagerEditor");
$import("mx.editors.RichTextEditor");
$import("mx.editors.CheckListEditor");
$import("mx.editors.FileEditor");
$import("mx.editors.ConditionFilterEditor");
$import("mx.editors.AutoCompleteEditor");
$import("mx.editors.SliderEditor");
$import("mx.editors.RichTextCKEditor");

/**
 * 提供编辑器工厂类。该类在运行时唯一静态实例是 <b>mx.editors.EditorFactory</b> 对象。详见 {@link mx.editors.EditorFactoryClass.createEditor} 方法示例。
 */
mx.editors.EditorFactoryClass = function()
{
    var me = $extend(MXObject);
    
    /**
     * 根据指定的类型和选项创建编辑器。
     * @param p_editorType
     * 一个字符串，表示编辑器类型（区分大小写）。如果该类型属于 {@link mx.editors} 命名空间，可以省略为类型名称（如 mx.editors.CheckEditor 可简称为“CheckEditor”）；否则需要给出完整的类型名称（如“mx.editors.CheckEditor”），详见<b>示例 1</b>。
     * 此外，该参数也可以为一个类型对象，详见<b>示例 2</b>。
     * 
     * <p>
     * 该参数常见值包括:
     * <ul>
     *     <li>{@link mx.editors.CheckEditor}</li>
     *     <li>{@link mx.editors.DateTimeEditor}</li>
     *     <li>{@link mx.editors.DropDownEditor}</li>
     *     <li>{@link mx.editors.ListEditor}</li>
     *     <li>{@link mx.editors.NumberEditor}</li>
     *     <li>{@link mx.editors.TextEditor}</li>
     *     <li>{@link mx.editors.TimeEditor}</li>
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
     * var editor = null;
     * 
     * // 使用类型的全名称创建编辑器
     * editor = mx.editors.EditorFactory.createEditor("mx.editors.CheckEditor", { checkedValue: "T", uncheckedValue: "F" });
     * 
     * // mx.editors 命名空间下的编辑器，可直接使用类型名称
     * editor = mx.editors.EditorFactory.createEditor("CheckEditor", { checkedValue: "T", uncheckedValue: "F" });
     * </code>
     * 
     * 
     * @example
     * <code language="JavaScript">
     * // 在代码开头需要显示导入类型 
     * $import("sample.editors.MyEditor");
     * 
     * ...
     * 
     * // 可以将类型对象直接作为 p_editorType 参数传递。
     * var editor = mx.editors.EditorFactory.createEditor(
     *     sample.editors.MyEditor,
     *     { myProperty1: "some value", myProperty2: "some value" }
     * );
     * </code>
     */
    me.createEditor = function(p_editorType, p_options)
    {
        var editorType = p_editorType;
        if ($isString(p_editorType))
        {
            if (p_editorType.indexOf(".") == -1)
            {
                p_editorType = "mx.editors." + p_editorType;
            }
            
            try
            {
                editorType = eval('('+p_editorType+')');
            }
            catch (e)
            {
                throw new Error(mx.err("UNKNOWN_EDITOR_TYPE", [p_editorType]));
            }
        }
        
        if (editorType == null)
        {
            editorType = mx.editors.TextEditor;
        }
        
        var editor = null; 
        if ($isFunction(editorType))
        {
            editor = new editorType(p_options);
        }
        
        return editor;
    };
    
    me.endOfClass(arguments); 
    return me;
};

mx.editors.EditorFactory = new mx.editors.EditorFactoryClass();
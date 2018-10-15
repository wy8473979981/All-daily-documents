$ns("mx.editors");

$import("mx.editors.ComplexConditionEditor");
$import("mx.editors.ComboEditor");

/**
 * @ignore
 * 提供一个下拉的高级查询控件。该控件与 {@link mx.datacontrols.DataGridSearchBox} 配合使用。
 */
mx.editors.ConditionFilterEditor = function()
{
    var me = $extend(mx.editors.ComboEditor);
    var base = {};

    /**
     * @default true
     */
    me.postponesDropDown = true;

    
    /**
     * 获取或设置编辑器的类型
     * 
     * @default TextEditor
     */
    me.editorType = "TextEditor";


    
    /**
     * 获取一个 {@link mx.editors.ComplexConditionEditor} 对象，表示下拉的条件编辑器。
     */
    me.complexConditionEditor = null;

    /**
     * @ignore
     */
    me.dropDownControl = null;

    /**
     * @default none
     */
    me.dropDownAnimation = "none";

    base.init = me.init;
    me.init = function()
    {
        base.init();
        //这下面两句代码，在setAllowEditing方法里已经做了。
        //如果在这里继续做的话，会导致allowEditing设为false时，样式不正确
        //me.$e.addClass("allowEditing");
        //me.$e.find("div#deleteContainer").remove();
    };

    /**
     * 获取编辑器对应的 Json 类型的值。
     */
    me.getJsonValue = function()
    {
        if ($notEmpty(me.complexConditionEditor))
            return me.complexConditionEditor.getJsonValue();
    }
    
    /**
     *@ignore 
     */ 
    me._initDropDownControl = function()
    {
        if (me.dropDownControl == null)
        {
            me.complexConditionEditor = new mx.editors.ComplexConditionEditor({
                name:me.name,
                editorType:me.editorType,
                editorOptions : me.editorOptions,
                onsureclick:_sureClick});
            me.dropDownControl = me.complexConditionEditor;
            me.dropDownControl.$e.addClass("mx");
            me.dropDownControl.$e.addClass("dropDown");
        }
    };
    
    base.reset = me.reset;
    
    me.reset = function(p_triggerEvent)
    {
    	if ($notEmpty(me.complexConditionEditor))
        {
            me.complexConditionEditor.reset(p_triggerEvent);
        }
        base.reset(p_triggerEvent);
    };
    
    base._resetDropDownControl = me._resetDropDownControl;
    /**
     *@ignore
     */
    me._resetDropDownControl = function()
    {
        base._resetDropDownControl(false);
    };

    function _sureClick(event)
    {
        me.setValue(me.complexConditionEditor.value, true);
        me.hideDropDown();
    }
    me.endOfClass(arguments); 
    return me;
};
$ns("mx.editors");

$import("mx.editors.EditorFactory");

/**
 * @ignore
 * 提供一个设置复杂条件的编辑器。
 */
mx.editors.ComplexConditionEditor = function()
{
    var me = $extend(mx.editors.Editor);
    var base = {};

    /**
     * @default 325px
     */
    me.width = "325px";
    
    /**
     * @default 62px
     */
    me.height = "62px";
    
    /**
     * 获取一个集合，包含编辑器中所包含的编辑器（{@link mx.editors.Editor}）。
     * 
     * @item mx.editors.Editor
     * @index 编辑器在集合中的序号（从 0 开始计数）。
     */
    me.editors = [];
    
    /**
     * 获取一个集合，包含编辑器中所包含的下拉框编辑器（{@link mx.editors.DropDownEditor}）。
     * 
     * @item mx.editors.Editor
     * @index 编辑器在集合中的序号（从 0 开始计数）。
     */
    me.comboEditors = [];
    
    /**
     * 获取或设置编辑器的类型
     * 
     * @default TextEditor
     */
    me.editorType = "TextEditor";
    
    /**
     * @ignore
     */
    me._$table = null;
    
    /**
     * @ignore
     */
    me._$composeRadioEditor = null;
    
    /**
     * @ignore
     */
    me._$columnComposeRadioEditor = null;
    
    /**
     * 编辑器确定按钮点击后触发该事件。
     */
    me.onsureclick = null;
    
    /**
     * 数据类型为 string 时所对应的查询条件表达式列表。"^" 表示‘包含’、 "*" 表示‘开始包含’、"&" 表示‘结尾包含’、"=" 表示‘等于’、"<>" 表示‘不等于’。
     */
    me.stringComboEditorItem = [
                                { name: mx.msg("LIKE"), value: "^" },
                                { name: mx.msg("START_WITH"), value: "*" },
                                { name: mx.msg("END_WITH"), value: "&" },
                                { name: mx.msg("EQUALS"), value: "=" },
                                { name: mx.msg("NOT_EQUAL"), value: "<>" }
                            ];
    /**
     * 数据类型为时间或数值时所对应的查询条件表达式列表。"=" 表示‘等于’、 "<>" 表示‘不等于’、">" 表示‘大于’、">=" 表示‘大于或等于’、"<" 表示‘小于’、"<=" 表示‘小于或等于’。
     */
    me.notStringComboEditorItem = [
                                { name: mx.msg("EQUALS"), value: "=" },
                                { name: mx.msg("NOT_EQUAL"), value: "<>" },
                                { name: mx.msg("GT"), value: ">" },
                                { name: mx.msg("GTE"), value: ">=" },
                                { name: mx.msg("LT"), value: "<" },
                                { name: mx.msg("LTE"), value: "<=" }
                            ];
    
    base.init = me.init;
    me.init = function()
    {
        base.init();
        me.$e.addClass("complexConditionEditor");
        
        me._$table = $("<table><tr id='columnJunctionTr'></tr><tr id='btnTr'></tr></table>");
        me.$e.append(me._$table);
        _addNewCondition();
        _initControlBtn();
    };
    
    /**
     * 获取编辑器对应的 Json 类型的值。
     */
    me.getJsonValue = function()
    {
        _okClick(false);
        
        var jsonValue = {};
        var criterions = [];
        for (var i = 0; i < me.editors.length; i++)
        {
            if (me.editors[i].value != null && me.editors[i].value !== '')
            {
                var ele = {};
                ele.fieldName = me.name;
                ele.operator = me.comboEditors[i].value;
                ele.value = me.editors[i].value;
                criterions.add(ele);
            }
        }
        jsonValue.criterions = criterions;
        jsonValue.junction = me._$composeRadioEditor.value
        jsonValue.columnJunction = me._$columnComposeRadioEditor.value;
        return jsonValue;
    }

    base.reset = me.reset;
    me.reset = function(p_triggerEvent)
    {
        for (var i = 0; i < me.editors.length; i++)
        {
            me.editors[i].reset(p_triggerEvent);
        }
        base.reset(p_triggerEvent);
    }
    

    /**
     * 请参见 {@link mx.controls.Control.setEnabled} 方法。
     * @param p_enabled 一个布尔值，true为控件可用，false为控件禁用
     */
    me.setEnabled = function(p_enabled)
    {
    	if(p_enabled === true)
    	{
    	    me.enabled = true;
    	}
        else
    	{
    	     me.enabled = false;
    	}
    	   
        for(var i=0;i<me.editors.length;i++)
        {
            var editor = me.editors[i];
            if(editor)
            {
                editor.setEnabled(me.enabled);
            }
        }
        for(var i=0;i<me.comboEditors.length;i++)
        {
            var comboEditor = me.comboEditors[i];
            if(comboEditor)
            {
                comboEditor.setEnabled(me.enabled);
            }
        }
        if(me._$columnComposeRadioEditor)
        {
            me._$columnComposeRadioEditor.setEnabled(me.enabled);
        }
        if(me._$composeRadioEditor) 
        {
             me._$composeRadioEditor.setEnabled(me.enabled);
        }
    };
    
    /**
     * 设置 {@link readOnly} 字段的值。
     * @param p_readOnly 一个布尔值，true表示控件只读
     */
    me.setReadOnly = function(p_readOnly)
    {
    	 if(p_readOnly === true)
    	 {
    	      me.readOnly = true;
    	 }
    	 else
    	 {
    	      me.readOnly = false;	 
    	 }
       
         for(var i=0;i<me.editors.length;i++)
         {
            var editor = me.editors[i];
            if(editor)
            {
                editor.setReadOnly(me.readOnly);
            }
         }
         for(var i=0;i<me.comboEditors.length;i++)
         {
            var comboEditor = me.comboEditors[i];
            if(comboEditor)
            {
                comboEditor.setReadOnly( me.readOnly);
            }
          }
         if(me._$columnComposeRadioEditor)
         {
            me._$columnComposeRadioEditor.setReadOnly(me.readOnly);
         }
         if(me._$composeRadioEditor) 
         {
             me._$composeRadioEditor.setReadOnly(me.readOnly);
         }
    };
    
    function _initControlBtn()
    {
        me._$columnComposeRadioEditor = new mx.editors.CheckListEditor(
        {
            type:"radio", 
            items:[
                {text: mx.msg("AND"), value: "and",checked:true},
                {text: mx.msg("OR"), value: "or"}
            ]
        });
        
        var tdTop = $("<td colspan='2' class='complexTd'></td>");
        var tdLab = $("<td class='complexTd'></td>");
        tdLab.append("<span>" + mx.msg("COLUMN_OPERATOR") + ":</span>");
        tdTop.append(me._$columnComposeRadioEditor.$e);
        me._$table.find("tr#columnJunctionTr").append(tdLab).append(tdTop);
        
        me._$composeRadioEditor = new mx.editors.CheckListEditor(
                 {
                     type:"radio", 
                     items:[
                         {text: mx.msg("AND"), value: "and",checked:true},
                         {text: mx.msg("OR"), value: "or"}
                         ]
                 });
        var td1 = $("<td class='complexTd'></td>");
        td1.append(me._$composeRadioEditor.$e);
        
        var td2 = $("<td colspan='2' align='right' style='padding-right:5px;' class='complexTd'></td>");
        var btnOk = new mx.controls.Button({ width: 60, text: mx.msg("OK")});
        btnOk.on("click", _okClick); 
        
        var btnAdd = new mx.controls.Button({ right:"10px",width: 60, text: mx.msg("NEW")});
        btnAdd.on("click",_addNewCondition); 
        td2.append(btnAdd.$e);
        td2.append(btnOk.$e);
        
        me._$table.find("tr#btnTr").append(td1).append(td2);
    }
    
    function _addNewCondition()
    {
    	if(me.isReadOnly() || !me.enabled)return;
        var newTr = $("<tr></tr>");
        var item = null;
        if (me.editorType == "TextEditor")
        {
            item = me.stringComboEditorItem;
        }
        else
        {
            item = me.notStringComboEditorItem;
        }
        var conditionDropDownEditor = new mx.editors.DropDownEditor(
        {
            displayMember: "name",
            valueMember: "value",
            width:"100px",
            items: item
        }); 
         
        conditionDropDownEditor.setValue(item[0].value);
        conditionDropDownEditor.$e.find("div#deleteContainer").remove();
        var td1 = $("<td  width='110px' class='complexTd'></td>");
        td1.append(conditionDropDownEditor.$e);
        me.comboEditors.add(conditionDropDownEditor);
        newTr.append(td1);
        
        var options = {width: "185px"};
        $.extend(options,me.editorOptions);
        options.width = "185px";
        var editor = mx.editors.EditorFactory.createEditor(me.editorType, options);
        me.editors.add(editor);
        var td2 = $("<td class='complexTd'></td>");
        td2.append(editor.$e);
        newTr.append(td2);
        
        
        var delBtn = $("<div class='delBtn'></div>");
        delBtn.on("click", removeCondition)
        var td3 = $("<td align='center' width='25px'  style='padding-right:5px;' class='complexTd'></td>");
        td3.append(delBtn);
        newTr.append(td3);
        
        me._$table.find("tr#btnTr").before(newTr);
        var height = me.$e.height();
        height = height + 28;
        me.$e.height(height);
        
    }
    
    function removeCondition(event)
    {
    	if(me.isReadOnly() || !me.enabled)return;
        var $target = $(event.target);
        var $tr = $target.parent("td").parent("tr");
        var index = $tr.index() - 1;
        me.editors.removeAt(index);
        me.comboEditors.removeAt(index);
        $tr.remove();
        var height = me.$e.height();
        height = height - 24;
        me.$e.height(height);
        event.stopPropagation(event);
    }
    
    function _okClick(p_triggerEvent)
    {
    	if(me.isReadOnly() || !me.enabled)return;
        var valueText = "";
        
        for (var i = 0; i < me.editors.length; i++)
        {
            if (me.editors[i].value != null && me.editors[i].value !== '')
            {
                var operatorStr = me.comboEditors[i].value;
                var value = me.editors[i].value
                if (i == me.editors.length - 1)
                {
                    valueText = valueText + operatorStr + me.editors[i].value;
                }
                else
                {
                    valueText = valueText + operatorStr + me.editors[i].value + ",";
                }
                
            }
        }
        if (me._$composeRadioEditor.value == 'or')
        {
            valueText = "[" + valueText + "]";
        }
        
        me.setValue(valueText);
        
        if (p_triggerEvent)
        {
            me.trigger("sureclick");
        }
        
    }
    
    me.endOfClass(arguments); 
    return me;
};
$ns("mx.datacontrols");

$import("mx.utils.PrintUtil");
$import("mx.datacontainers.FormEntityContainer");
$import("mx.editors.EditorFactory");
$import("mx.windows.WindowManager");

/**
 * 提供一个表单控件的类。
 * 
 * @example
 * 以下是一个 {@link mx.datacontrols.DataForm} 表单如何表示分组与默认展开的代码示例。{@link mx.datacontrols.DataForm.fields} 集合中的每个对象如果为数组，则该对象就表示了一个分组。每个对象数组的第一个值表示分组的标题；第二个值如果是一个 Boolean 值，表示是否默认展开（如果为空，则默认展开）。
 * 该示例中包含两个分组，分别为“基本信息”与“隐私信息”。其中“基本信息”分组默认为展开，“隐私信息”分组默认为隐藏。
 * <code language="JavaScript">
 * var userData = { id: "a1", name: "小明", age: 26, gender: "m", birthday: parseDate("1984-3-1") };
 * var userMeta = [
 *      {name: "id", caption: "ID", nullable: false, readOnly: true},
 *      {name: "age", caption: "年龄", nullable: true},
 *      {name: "gender", caption: "性别", nullable: true},
 *      {name: "birthday", caption: "出生日期", nullable: true}
 * ];
 * var formEntityContainer = new mx.datacontainers.FormEntityContainer( { data: userData, meta: userMeta, type: "local"} ); // 表单数据容器为 mx.datacontainers.FormEntityContainer 类型
 * formEntityContainer.primaryKey = "id" ; // 定义表单数据容器的主键，通常为“id”
 * 
 * var form = new mx.datacontrols.DataForm({
 *     width: 500,
 *     
 *     fields: [
 *          [
 *              "基本信息", //第一个分组的标题
 *              false, //是否展开，非必须
 *              true,  //是否显示，非必须
 *              { name: "id", caption: "标识", readOnly: true },
 *              { name: "name", caption: "名称", nullable: false },
 *              { name: "gender", caption: "性别", editorType: "DropDownEditor", allowEditing: false, displayMember: "name", valueMember: "id",  items: [ { name: "男", id: "m" }, { name:"女", id: "f" } ] }
 *          ], //第一个分组
 *          [
 *              "隐私信息", //第二个分组的标题
 *              false, //默认不展开
 *              { name: "birthday", caption: "生日", editorType: "DateTimeEditor", formatString: "yyyy-MM-dd", allowEditing: false },
 *              { name: "age", caption: "年龄", editorType: "NumberEditor", max: 100, min: 18 }
 *          ] //第二个分组
 *     ],
 *     entityContainer: formEntityContainer // 绑定表单数据容器
 * });
 * formEntityContainer.load(); // 表单数据容器加载数据源
 * form.printForm(); //打印表单内容 : 参数为一个 Boolean 值，表示是否开户打印预览功能，默认是true，默认启用打印预览功能。
 * 
 * </code>
 * 
 * @example 
 * 以下示例演示远程数据加载：
 * <code language="JavaSript">
 * var entityContainer = new mx.datacontainers.FormEntityContainer({
 * 	   baseUrl: mx.mappath("~/user"), //数据加载服务地址
 * 	   type: "remote" //指定数据加载类型，默认为remote，可以不指定。
 * });
 * 
 * var form = new mx.datacontrols.DataForm({
 * 	   entityContainer: entityContainer,
 *     fields: [
 *         { name: "userName", caption: "用户名", nullable: false },
 *         { name: "realName", caption: "姓名", nullable: false }
 *     ]
 * });
 * 
 * form.load(); //执行数据加载
 * 
 * </code>
 * 
 * @example
 * 以下演示本地数据加载：
 * <code language="JavaSript">
 * var entityContainer = new mx.datacontainers.FormEntityContainer({
 * 	   type: "local",//指定数据加载类型，默认为remote
 * 	   // 元数据定义
 * 	   meta: [
 * 				{name: "id", caption: "用户唯一标识", readOnly: true},
 * 				{name: "username", caption: "姓名"}
 * 			 ],
 *     //数据源
 *     data: { id: "jacksprow", username: "杰克船长"}
 * });
 * 
 * var form = new mx.datacontrols.DataForm({
 * 	   entityContainer: entityContainer
 * });
 * 
 * form.load(); //执行数据加载
 * </code>
 */
mx.datacontrols.DataForm = function()
{
    var me = $extend(mx.controls.Control);
    var base = {};

    /**
     * 获取当前类型实例的类的类型。
     */
    me.typeName = "DataForm";
    
    /**
     * 详见 {@link mx.datacontrols.DataGrid.baseUrl} 属性。
     * 只有当{@link entityContainer} 属性对应的数据容器对象的type属性值为local时，可以不需要设置该属性，其它情况下必须设置
     */
    me.baseUrl = null;

    /**
     * 详见 {@link mx.datacontrols.DataGrid.primaryKey} 属性。
     * 此属性必须在初始化控件时设置
     */
    me.primaryKey = null;

    /**
     * 获取一个 {@link mx.datacontainers.FormEntityContainer} 对象（通常是
     * {@link mx.datacontainers.FormEntityContainer} 类型），表示表单的数据源。 请使用
     * {@link setEntityContainer} 方法设置该字段的值。
     */
    me.entityContainer = null;
    
    /**
     * 是否打印默认隐藏的字段。
     * 
     * @default false
     */
    me.printHideFields = false;

    /**
     * 获取一个具有层次关系的集合，包含当前表单中所有字段（{@link mx.datacontrols.FormField}）和字段分组（{@link mx.datacontrols.FormFieldGroup}）信息。
     * 另请参考 {@link allFields} 字段。
     * 
     * @item mx.datacontrols.FormField 或 mx.datacontrols.FormFieldGroup
     * @index 数字或字段名称（{@link mx.datacontrols.FormField.name}）。
     */
    me.fields = [];
    
    /**
     * 获取一个集合，包含表单中所有的编辑器（{@link mx.datacontrols.FormFieldGroup} 类型）。
     *
     * @item mx.datacontrols.FormFieldGroup
     * @index FormFieldGroup的name或FormFieldGroup在集合中的序号（从 0 开始计数）。
     * 
     *  {@exclude mx.datacontrols.SkinDataForm}
     */
    me.groups = [];

    /**
     * 获取一个集合，包含表单中所有的编辑器（{@link mx.editors.Editor} 类型）。
     * 
     * @item mx.editors.Editor
     * @index 编辑器的标识或编辑器在集合中的序号（从 0 开始计数）。
     */
    me.editors = [];

    /**
     * 获取或者设置一个 Boolean 值，该属性表示是否需要显示表单中的主键字段。
     * 
     * {@exclude mx.datacontrols.SkinDataForm}
     */
    me.displayPrimaryKey = false;

    /**
     * 获取标题列的宽度。
     * 
     * {@exclude mx.datacontrols.SkinDataForm}
     * 
     * @default 120
     * 
     */
    me.captionColumnWidth = 120;
    
    /**
     * 获取或设置form保存时，提示中是否显示错误字段的caption。
     */
    me.hintWithCaption = true;

    /**
     * 当验证表单输入时将触发该事件。调用 {@link validate} 方法时会触发该事件。<b>可通过订购该事件，实现对表单的自定义验证</b>。
     * 
     * @param successful
     *            指定是否成功通过验证。默认为 true。
     * @param hint
     *            指定没有通过验证的原因。默认为 null。
     * 
     * 
     * @example
     * 下面是一段创建用户的 Form 代码，除需进行必填字段校验外，还需校验两次输入是否一致，这时需要订购
     *          {@link onvalidate} 事件进行自定义验证的开发:
     *  <code language="JavaScript">
     * var entityContainer = new mx.datacontainers.FormEntityContainer(
     * 		baseUrl: mx.mappath("~/user")
     * );
     * var form = new mx.datacontrols.DataForm({
     * 	   entityContainer: entityContainer,
     *     fields: [
     *         { name: "userName", caption: "用户名", nullable: false },
     *         { name: "num", caption: "号码", nullable: false },
     *         { name: "confirmNum", caption: "确认号码", nullable: false }
     *     ]
     * });
     * entityContainer.load();
     * 
     * form.on("validate", function(e)
     * {
     * 	   // e.param，待校验的表单数据。
     * 	   // e.dataForm，当前表单信息。
     *     var entityContainer = form.entityContainer;
     *     if (entityContainer.getValue("num") != entityContainer.getValue("confirmNum"))
     *     {
     *         // 通过事件参数传递校验结果
     *         e.successful = false;
     *         e.hint = "两次输入不一致。"; 
     *     }
     * });
     * </code>
     */
    me.onvalidate = null;
    
    /**
     * 一个Boolean值，表示是否忽略隐藏编辑器的校验,如果为true，则忽略，false为校验
     * @default true
     */
    me.ignoreCheckOnHide = true;
    
    /**
     * 一个Boolean值，表示按enter键时，表单是否在可以编辑的editor之间切换，类似tab键。
     * 如果为true，则切换，false为不切换
     * @default false
     */
    me.editorEnterNavigate = false;
    
    /**
     * 一个Boolean值，表示当隐藏编辑器时后面的的编辑器是否向前对齐。
     *  @default false
     */
    me.autoAlign = false;

    /**
     * 当数据容器开始加载数据时，将触发该事件。调用 {@link load} 方法时会触发该事件。
     * 
     * @param cancel
     *            一个 Boolean 值，表示是否中止当前的加载动作。
     */
    me.onloading = null;

    /**
     * 加载数据之后，表单渲染之前将触发该事件。
     * 
     * @param fields 一个代表列信息的数组，如 [
     *                            {"name":"id","caption":"id","nullable":false,"length":32,"maxLength":100,"precision":3,"readOnly":false,"editorType":"TextEditor","dataType":"string","textMode":"","locked":false,"visible":true},
     *                            {"name":"name","caption":"名称","nullable":false,"length":32,"maxLength":100,"precision":3,"readOnly":false,"editorType":"TextEditor","dataType":"string","textMode":"","locked":false,"visible":true}
     *                         ]
     * @param cancel 一个 Boolean 值，表示是否中止当前的渲染动作。
     */
    me.onrendering = null;

    /**
     * 当表单加载完数据后触发该事件。
     */
    me.onload = null;

    /**
     * 当表单提交是触发该事件。
     */
    me.onsubmit = null;

    /**
     * 获取和设置单行中最大列宽度总数。
     * 
     * {@exclude mx.datacontrols.SkinDataForm}
     * 
     * @default 2
     */
    me.maxCols = 2;

    /**
     * 设置或获取一个函数，用来自定义表单中字段的标题显示方式。
     * 函数需要返回一个 JQquey 对象或者一个 HTML 片段，返回值将用作字段的标题。
     * 
     * @param p_field 表单中的一个字段。
     * @returns  一个 JQquey 对象或者一个 HTML 片段，将替换当前字段的标题。
     * 
     * {@exclude mx.datacontrols.SkinDataForm}
     * 
     */
    me.fieldCaptionRender = null;
    // 本地定义的字段
    var _localFields = [];

    

    /**
     * 初始化方法。执行设置样式并初始化属性等操作。
     */
    base.init = me.init;
    me.init = function()
    {
        base.init();
        me.$e.addClass("dataForm");
  
        _localFields = $clone(me.fields);
		
        if (me.$e.tag() == "form")
        {
            me.$e.submit(function()
                    {
                        me.trigger("submit");
                        return false;
                    });
        }

        if ($isEmpty(me.entityContainer))
        {
            me.entityContainer = new mx.datacontainers.FormEntityContainer({
                        baseUrl : me.baseUrl,
                        primaryKey : me.primaryKey
                    });
        }
        me.setEntityContainer(me.entityContainer);

    };

    /**
     * 加载数据。
     * 
     * @overload function(p_id, p_callback)
     * @overload function(p_data, p_callback)
     * @overload function(p_callback)
     * 
     * @param [p_id]
     *            一个字符串，表示表单数据的唯一标识。
     * @param [p_data]
     *            一个 JSON 对象，表示查询参数。
     * @param [p_callback]
     *            一个 Function 对象，表示回调函数。
     * 
     * @exmaple 以下示例表示表单数据加载。
     * <code language="JavaScript">
     * var dataForm = new mx.datacontainers.DataForm();
     * dataForm.load("12345", {name: "小明"}, function(){
     * 		alert("load callback!");
     * }); 
     * 
     * dataForm.load("12345", function(){
     * 		alert("load callback!");
     * });
     *
     * dataForm.load({name: "小明"}, function(){
     * 		alert("load callback!");
     * });
     * </code>
     */
    me.load = function(p_id, p_data, p_callback)
    {
        if ($isEmpty(me.entityContainer))
        {
            mx.showerror(new Error(mx.err("LOADING",
                    ["EntityContainer is Undefined"])));
            return;
        }
        else if ($isEmpty(me.entityContainer.baseUrl)
                && "remote" == me.entityContainer.type)
        {
            mx.showerror(new Error(mx.err("LOADING",
                    ["EntityContainer BaseUrl is Undefined"])));
            return;
        }

        var args = {
            cancel : false
        };

        me.trigger("loading", args);
        if (args.cancel)
            return;

        var id = null;
        var data = null;
        var callback = null;
        if ($isEmpty(p_id) || $isString(p_id) || $isNumber(p_id))
        {
            id = p_id;
            if ($isEmpty(p_data) || $.isPlainObject(p_data))
            {
                data = p_data;

                if ($isFunction(p_callback))
                {
                    callback = p_callback;
                }
            }
            else if ($isFunction(p_data))
            {
                callback = p_data;
            }
        }
        else if ($.isPlainObject(p_id))
        {
            data = p_id;

            if ($isFunction(p_data))
            {
                callback = p_data;
            }
        }
        else if ($isFunction(p_id))
        {
            callback = p_id;
        }

        var filterColumns = _getQueryColumnsStr(me.fields);

        if ($notEmpty(data))
        {
            if ($isEmpty(data.dataParams) && $isEmpty(data.metaParams))
            {
                var data2 = {};
                data2.dataParams = data;
                data = data2;
                data2 = null;
            }
        }

        if ($notEmpty(filterColumns) && $isString(filterColumns))
        {
            if ($isEmpty(data))
            {
                data = {
                    metaParams : {
                        columns : filterColumns
                    },
                    dataParams : {
                        columns : filterColumns
                    }
                };
            }
            else
            {
                _setFilterColumns(data.metaParams, filterColumns, data, "metaParams");
                _setFilterColumns(data.dataParams, filterColumns, data, "dataParams");
            }
        }
        if ($notEmpty(me.entityContainer))
        {
            me.$e.setBusy();
            me.entityContainer.load(id, data, callback);
        }
    };
    
    /**
     * 获取表单是否在新增状态。
     */
    me.isNew = function()
    {
    	return $notEmpty(me.entityContainer) && me.entityContainer.isCreate();
    }

    /**
     * 保存表单数据.
     * 
     *  @overload function()
     *  保存修改的数据。
     *  
     *  @overload function(p_data)
     *  @param [p_data], 指定的表单中数据。数据格式为: {items: [{colA:"abc", colB: "edf"}]}
     *  
     *  @overload function(p_data, p_callback)
     *  @param [p_callback], 保存后执行的回调函数。
     */
    me.save = function(p_data, p_callback)
    {
        var result = me.validate(p_data);
        if (result.successful)
        {
            me.entityContainer.save(p_data, p_callback);
        }
        else
        {
            if ($notEmpty(result.hint))
            {
            	if (me.hintWithCaption)
            		mx.indicate("info", result.hint);
            	else
            		mx.indicate("info", result.p_hint);
            }
        }
    };

    /**
     * 返回一个编辑器（{@link mx.editors.Editor} 类型）。
     * 
     * @param p_fieldName
     *            一个数字，或编辑器的标识（如 “birthday”）。
     */
    me.getEditor = function(p_fieldName)
    {
        var e = me.editors[p_fieldName];
        return e != null ? e : null;
    };

    /**
     * 选中指定字段的编辑器。
     */
    me.selectEditor = function(p_fieldName)
    {
        var e = me.getEditor(p_fieldName);
        if (e != null)
        {
            e.focus();
            e.select();
        }
        return e;
    };

    /**
     * 设置 {@link entityContainer} 字段的值。
     */
    me.setEntityContainer = function(p_entityContainer)
    {
        if ($notEmpty(me.entityContainer)
                && me.entityContainer != p_entityContainer)
        {
            me.entityContainer.off("load", me._entityContainer_load);

            me.entityContainer.off("changing", me._entityContainer_changing);
            me.entityContainer.off("changed", me._entityContainer_changed);
            me.entityContainer.off("saving", me._entityContainer_saving);
            me.entityContainer.off("saved", me._entityContainer_saved);
            me.entityContainer.off("error", me._entityContainer_error);
            me.entityContainer.off("validate", me._entityContainer_validate);
        }

        me.entityContainer = p_entityContainer;

        if ($notEmpty(me.entityContainer))
        {
            me.entityContainer.on("load", me._entityContainer_load);
            me.entityContainer.on("changing", me._entityContainer_changing);
            me.entityContainer.on("changed", me._entityContainer_changed);
            me.entityContainer.on("saving", me._entityContainer_saving);
            me.entityContainer.on("saved", me._entityContainer_saved);
            me.entityContainer.on("error", me._entityContainer_error);
            me.entityContainer.on("validate", me._entityContainer_validate);
        }
    };

    var _fields = [];
    /**
     * 设置 {@link fields} 字段的值。
     */
    me.setFields = function(p_fields)
    {
    	//释放editor资源,防止RichTextEditor内存泄露
    	$(me.editors).each(function(){
    		this.parent = null;
            this.dispose();
    	});
    	
    	me.$e.empty();
        me.groups = [];
        var fields = null;
        if ($isArray(p_fields) && typeof(p_fields.caption) != "undefined")
        {
            fields = p_fields;
        }
        else
        {
            fields = me._parseFields(p_fields);
        }
        $.each(_fields, function(index, field)
                {
                    fields[field.name] = field;
                });
        _fields = [];
        me.fields = fields;
        me.editors.clear();

        var $table = me._createTable();
        me.$e.append($table);
        me._renderFields(me.fields, $table);
    };

    base.setEnabled = me.setEnabled;
    me.setEnabled = function(p_enabled)
    {
        if (p_enabled == "undefined")
        {
            p_enabled = true;
        }
        
        me.enabled = p_enabled;
        me.$e.toggleClass("disabled", !p_enabled);

        for (var i = 0; i < me.editors.length; i++)
        {
            var editor = me.editors[i];
            _setEditorEnable(editor,p_enabled); 
        }
    };

    /**
     * 设置表单中字段是否可空。
     * 
     * @param p_fieldName
     *            一个字符串，表示字段信息的标识。
     * @param p_nullable
     *            一个 Boolean 值，指定字段是否允许空。
     */
    me.setFieldNullable = function(p_fieldName, p_nullable)
    {
        var field = me.fields[p_fieldName];
        if (field != null)
        {
            field.nullable = p_nullable;

            var editor = me.getEditor(p_fieldName);
            if (editor != null)
            {
                editor.nullable = field.nullable;
                editor._clearPreValidateState();

                var caption = "";
                if ($isFunction(me.fieldCaptionRender))
            	{
            		caption = me.fieldCaptionRender(field);
            	}
                else
                {
                	caption = field.caption + ":";
	                if (!field.nullable)
	                {
	                	caption = "<span class=red>* </span>" + caption;
                    }
                }
                me._getFieldCell(p_fieldName).find("label").html(caption);
            }
        }
    };

    /**
     * 设置表单中字段信息的标题。
     * {@exclude mx.datacontrols.SkinDataForm}
     * 
     * @param p_fieldName
     *            一个字符串，表示字段信息的标识。
     * @param p_caption
     *            一个字符串，指定字段的标题。
     */
    me.setFieldCaption = function(p_fieldName, p_caption)
    {
        var field = me.fields[p_fieldName];
        if (field != null)
        {
            field.caption = p_caption;

            var editor = me.getEditor(p_fieldName);
            if (editor != null)
            {
            	var caption = "";
            	if ($isFunction(me.fieldCaptionRender))
            	{
            		caption = me.fieldCaptionRender(field);
            	}
            	else
            	{
            		caption = p_caption + ":";
                if (field.nullable)
                {
                    caption = "* " + caption;
                }
            	}
                me._getFieldCell(p_fieldName).find("label").html(caption);
            }
        }
    };

    /**
     * 设置表单中字段信息的可见性。
     * 
     * @param p_fieldName
     *            一个字符串，表示字段信息的标识。
     * @param p_visible
     *            一个 Boolean 值，表示是否可见。如果该值为 true，表示字段信息可见；反之则不可见。
     */
    me.setFieldVisible = function(p_fieldName, p_visible)
    {
        var field = me.fields[p_fieldName];
        if (field != null)
        {
            var $cell = me._getFieldCell(p_fieldName);
            var editor = me.getEditor(p_fieldName);
            $cell.css("display", p_visible ? "" : "none");
            editor.setVisible(p_visible);
            field.visible = p_visible;
            
            //如果自动对齐字段则进行重新渲染
            if (me.autoAlign)
            {
            	me.setFields(me.fields);
            	me._setFieldValues();
            }
        }
    };
    
    /**
     * 设置表单中字段标题的可见性。
     * 
     * {@exclude mx.datacontrols.SkinDataForm}
     * 
     * @param p_fieldName
     *            一个字符串，表示字段信息的标识。
     * @param p_visible
     *            一个 Boolean 值，表示是否可见。如果该值为 true，表示字段信息可见；反之则不可见。        
     */
    me.setFieldCaptionVisible = function(p_fieldName, p_visible){
    	var field = me.fields[p_fieldName];
    	if(field){
    		var $cell = me._getFieldCell(p_fieldName);
    		$cell.find("div.editor").css("marginLeft", p_visible ? me.captionColumnWidth : "0px");
    		var $label = $cell.find("label");
    		$label.css("width",p_visible ? me.captionColumnWidth : "0px");
    		if(p_visible)
    			$label.show();
    		else
    			$label.hide();
    		field.captionVisible = p_visible;
    	}
    }
    
    /**
     * 设置表单中分组的可见性。
     * 
     * {@exclude mx.datacontrols.SkinDataForm}
     * 
     * @param p_name 
     *            一个字符串或数字,FormFiledGroup的name值,或是FormFiledGroup在表单中的索引
     * @param p_visible
     *            一个 Boolean 值，表示是否可见。如果该值为 true，表示字段信息可见；反之则不可见。
     */
    me.setGroupVisible = function(p_name, p_visible)
    {
    	var group = me.groups[p_name];
        if(group != undefined){
        	group.setVisible(p_visible);
        }
    };
    
    /**
     * 设置表单中分组的标题。
     * {@exclude mx.datacontrols.SkinDataForm}
     * 
     * @param p_name 
     *            一个字符串或数字,{@link FormFiledGroup} 的{@link FormFiledGroup.name}值,或是FormFiledGroup在表单中的索引。
     * @param p_new_caption
     *            一个字符串。表示group的新caption。
     */
    me.setGroupCaption = function(p_name, p_new_caption)
    {
    	var group = me.groups[p_name];
        if(group!= undefined){
        	group.setCaption(p_new_caption);
        }
    };

    /**
     * 设置字段信息中编辑器（{@link mx.editors.Editor} 类型）的
     * {@link mx.editors.Editor.readOnly} 属性的值。
     * 
     * @param p_fieldName
     *            一个字符串，表示字段信息的标识。
     * @param p_readOnly
     *            一个 Boolean 值，表示是否只读。如果该值为 true，表示只读；反之为可编辑。
     */
    me.setFieldReadOnly = function(p_fieldName, p_readOnly)
    {
        var field = me.fields[p_fieldName];
        if (field != null)
        {
            field.readOnly = p_readOnly;

            var editor = me.getEditor(p_fieldName);
            if (editor != null)
            {
                editor.setReadOnly(field.readOnly);
            }
        }
    };

    /**
     * 设置字段信息中编辑器（{@link mx.editors.Editor} 类型）的
     * {@link mx.controls.Control.enabled} 属性的值。
     * 
     * @param p_fieldName
     *            一个字符串，表示字段信息的标识。
     * @param p_enabled
     *            一个 Boolean 值，详见 {@link mx.controls.Control.setEnabled} 方法的参数。
     */
    me.setFieldEnabled = function(p_fieldName, p_enabled)
    {
        var field = me.fields[p_fieldName];
        if (field != null)
        {
            field.enabled = p_enabled;

            var editor = me.getEditor(p_fieldName);
            if (editor != null)
            {
            	_setEditorEnable(editor,field.enabled);
            }
        }
    };

    /**
     * 执行验证表单的逻辑。 返回一个对象（如 { successful: true }），该对象的 successful 属性表示该表单通过验证；
     * 如果返回对象为 { successful: false, hint: "描述错误原因。", fieldName: "错误字段名称" }，其中
     * fieldName 是可选字段，是出错字段的 {@link mx.datacontrols.FormField.name}，原因由 hint
     * 描述。 该方法将触发 {@link onvalidate} 事件，<b>可通过该事件进行自定义数据校验</b>，详见该事件示例。
     * 
     * @param p_data
     *            待校验的表单数据。
     * @param [p_withoutIndication=false]
     *            指定是否需要采用提示。
     */
    me.validate = function(p_data, p_withoutIndication)
    {
        if (p_withoutIndication == null)
        {
            p_withoutIndication = false;
        }

        me.blur();

        var result = {successful:true};

        for (var i = 0; i < me.editors.length; i++)
        {
            var editor = me.editors[i];
            //如果设置忽略隐藏editor校验，并且eidtor是不可见的，就跳过校验
            if(me.ignoreCheckOnHide && editor.visible == false)
            {
            	continue;
            }
            var _result = editor.validate(true);
            result = $clone(_result);            
            if(result.successful == false)
            {
            	var p_hint = result.hint;
            	result.hint = (editor.caption ? editor.caption + "：" : "") + result.hint;
            	result.fieldName = editor.fieldName;
            	if (!p_withoutIndication)
                {
                	editor.markError(true, p_hint);
                	result.p_hint = p_hint;
                }
            	break;
            }
        }

        if (result.successful)
        {
        	if ($isEmpty(p_data))
        	{
        		p_data = me.entityContainer._getSavingData();
        	}
        	
        	var args = {dataForm: me, param: p_data};
        	$.extend(result, args);
        	
            me.trigger("validate", result);
        }

        return result;
    };

    /**
     * 触发所有编辑器（{@link mx.editors.Editor} 类型）的 focus 事件。
     */
    me.focus = function()
    {
        if (me.editors.length > 0)
        {
            for (var i = 0; i < me.editors.length; i++)
            {
                if (!me.editors[i].readOnly)
                {
                    me.editors[i].focus();
                    break;
                }
            }
        }
    };

    /**
     * 触发所有编辑器（{@link mx.editors.Editor} 类型）的 blur 事件。
     */
    me.blur = function()
    {
        if (me.editors.length > 0)
        {
            for (var i = 0; i < me.editors.length; i++)
            {
                if (!me.editors[i].readOnly)
                {
                    me.editors[i].blur();
                }
            }
        }
    };

    /**
     * 提供一个方法，判断表单是否有修改过但未保存的信息。
     */
    me.hasChanged = function()
    {
        return me.entityContainer.hasChanged();
    };

    /**
     * 提供一个方法，获取表单中当前数据的主键。
     */
    me.getId = function()
    {
        return me.entityContainer.data[me.entityContainer.primaryKey];
    };
    
    /**
     * 提供一个方法，打印表单内容。
     * 
     * @param p_preview :
     *            true | false 一个 Boolean 值，表示是否启用打印预览功能，默认 true
     *            true : 表示显示打印预览
     *            false : 表示不显示打印预览，直接打印
     * @param p_windowManager : 用于创建打印预览窗口的{@link mx.windows.WindowManager}对象,
     *                          如果不传入则控件默认生成一个windowManager对象，
     *            
     * {@exclude mx.datacontrols.SkinDataForm}
     * 
     */
    me.printForm = function(p_preview, p_windowManager, p_printOptions)
    {
    	var printOptions = {
        		dataControl : me,
        		maxCols : me.maxCols,
        		printHideFields : me.printHideFields
        	};
    	
    	if ($isEmpty(p_preview)){
    		p_preview = true;
        }else if($.isPlainObject(p_preview)){
        	$.extend(printOptions, p_preview);
        	p_preview = true;
        }else if($instanceOf(p_preview,mx.windows.WindowManager)){
        	printOptions.windowManager = p_preview;
        	p_preview = true;
        }
    	
		if($instanceOf(p_windowManager,mx.windows.WindowManager)){
			printOptions.windowManager = p_windowManager;
		}else if($.isPlainObject(p_windowManager)){
			$.extend(printOptions, p_windowManager);
		}
    	
    	if ($.isPlainObject(p_printOptions))
    	{
    		$.extend(printOptions, p_printOptions);
    	}
    	
    	var printUtil = new mx.utils.PrintUtil(printOptions);
    	
    	printUtil.printControl(p_preview);
    };

    var _fieldCells = [];
    /**
     * @ignore
     */
    me._getFieldCell = function(p_fieldName)
    {
        if (_fieldCells[p_fieldName] != null)
        {
            return _fieldCells[p_fieldName];
        }
        else
        {
            var fieldNameEsc = p_fieldName.replace(/\./g, "\\.");
            var $cell = me.$("td#" + fieldNameEsc);
            _fieldCells.add($cell);
            _fieldCells[p_fieldName] = $cell;
            return $cell;
        }
    };

    /**
     * @ignore
     */
    me._parseFields = function(p_options)
    {
        var result = null;
        if ($isArray(p_options))
        {
            result = me._parseFieldGroup(p_options);
            if(me.groups[result.name]!=undefined){
            	 throw new Error(mx.err("DUPLICATED_ITEM",
            	            [ result.name ])); 
            }
            if(result.name != undefined){
            	 me.groups.add(result);
                 me.groups[result.name] = result;
            }  
        }
        else if ($.isPlainObject(p_options))
        {
            result = me._parseField(p_options);
        }
        return result;
    };

    /**
     * @ignore
     */
    me._parseFieldGroup = function(p_options)
    {
        var result = new mx.datacontrols.FormFieldGroup();
        for (var i = 0; i < p_options.length; i++)
        {
            var o = p_options[i];
            var e = null;
            if (typeof(o) == "string" && i == 0)
            {
                result.caption = o;
                result.name = o;
            }
            else if (typeof(o) == "boolean" && i == 1)
            {
                result.defaultExpanded = o;
            }
            else if (typeof(o) == "boolean" && i == 2)
            {
                result.visible = o;
            }
            else
            {
                e = me._parseFields(o);
            }
            if (e != null)
            {
                result.add(e);
            }
        }
        return result;
    };

    /**
     * @ignore
     */
    me._parseField = function(p_options)
    {
        var field = new mx.datacontrols.FormField();
        $.extend(field, p_options);
        if ($isEmpty(field.editorType))
        {
            field.editorType = "TextEditor";
        }
        if ($isEmpty(field.fieldName) && $isEmpty(field.name))
        {
        	if (field.editorType != "LabelEditor")
    		{
        		throw new Error(mx.err("FIELDNAME_NON_NULLABLE"));
    		}
        }
        if ($isEmpty(field.fieldName) && $notEmpty(field.name))
        {
            field.fieldName = field.name;
        }
        if ($notEmpty(field.fieldName) && $isEmpty(field.name))
        {
            field.name = field.fieldName;
        }
        if ($notEmpty(field.name))
        {
            _fields.add(field);
        }
        return field;
    };

    /**
     * @ignore
     */
    me._renderFields = function(p_fields, $p_table, p_level)
    {
        var level = p_level || 1;
        for (var i = 0; i < p_fields.length; i++)
        {
            var f = p_fields[i];

            if ($isArray(f) && $notEmpty(f.caption))
            {
                var _$group = me._renderFieldGroup(f, $p_table, level);
                if(me.groups[f.name] != undefined){
                	me.groups[f.name].$e = _$group;
                }
            }
            else
            {
                me._renderField(f, $p_table, level)
            }
        }
    };

    /**
     * @ignore
     */
    me._createTable = function()
    {
        var $table = $("<table cellspacing=0 cellpadding=0 class='formTable'><tbody/></table>");
        return $table;
    };

    /**
     * @ignore
     */
    me._editor_changed = function(e)
    {
        // 当编辑器的值发生变化将触发changed事件，调用表单数据容器实现数据源的更新。
        var ed = e.target;
        var fn = ed.fieldName;
        var filed =  me.fields[fn];
        if(filed!=undefined && filed.isVirtual){ //如果字段是虚拟的,则不通知数据源其数据的变更，以阻止将其数据提交到服务器
        	return;
        }
        if (me.entityContainer != null && ed.isValidate == true)
        {
        	if ($instanceOf(e.target,mx.editors.ListEditor) && me.entityContainer.data[fn] == ed.value) return;
            me.entityContainer.setValue(fn, ed.value, true);
        }
    };

    function _mergeFields(p_fields)
    {
        me.fields = $clone(_localFields);

        if ($isEmpty(p_fields) || p_fields.length <= 0)
        {
            var primaryField = mx.utils.JsonUtil.getItem(me.fields, "name",
                    me.entityContainer.primaryKey, 3);
            if ($notEmpty(primaryField))
            {
                primaryField.readOnly = true;
                primaryField.nullable = false;
                primaryField.visible = me.displayPrimaryKey;
            }
        }
        else
        {
            var args = {
                fields : p_fields,
                cancel : false
            };
            me.trigger("rendering", args);
            if (args.cancel)
            {
                return;
            }
            $.each(p_fields, function(index, p_field)
            {
                var field = _getLocalField(p_field.name);
                if ($notEmpty(field))
                {
                	//删除json对象中key为length的属性及值。
                    for (i in p_field)
                    {
                        if (i == "length")
                        {
                            delete p_field[i];
                        }
                    }

                    $.each(p_field, function(p_key, p_value)
                    {

                        if ($isEmpty(field[p_key])
                                || $isEqual(p_key, "readOnly")
                                || $isEqual(p_key, "maxLength")
                                || $isEqual(p_key, "nullable"))
                        {
                            field[p_key] = p_value;
                        }
                    });
                }
                else
                {
                    field = p_field;
                    me.fields.add(field);
                }
                if ($isEqual(field.name, me.entityContainer.primaryKey))
                {
                    field.readOnly = true;
                    field.nullable = false;
                    field.visible = me.displayPrimaryKey;
                }
            });
        }
    }

    // 获取本地定义的表单项
    function _getLocalField(p_fieldName)
    {
        var field = null;
        if ($notEmpty(p_fieldName))
        {
            var field = mx.utils.JsonUtil.getItem(me.fields, "name",
                    p_fieldName);
            if ($isEmpty(field))
            {
                field = mx.utils.JsonUtil.getItem(me.fields, "name",
                        p_fieldName, 2);
            }
        }
        return field;
    }

    /**
     * @ignore
     * 设置表单项的值
     */
    me._setFieldValues = function()
    {
        for (var i = 0; i < me.editors.length; i++)
        {
            var editor = me.editors[i];
            // 没有字典时，无法通过实体容器设置编辑器的默认值，需要通过编辑器设置CheckListEditor等列表的默认值。
            var _editorHasDicts = false; 
	        if ($instanceOf(editor, mx.editors.DropDownEditor)
	                || $instanceOf(editor, mx.editors.CheckListEditor)
	                || $instanceOf(editor, mx.editors.ListEditor)
	                || $instanceOf(editor, mx.editors.AutoCompleteEditor))
	        {
	        	
	            if ($isEmpty(editor.items) || editor.items.length == 0 || (editor.items.length == 1 && editor.displayNullValue === true))
	            {
	                if ($notEmpty(me.entityContainer.dicts)
	                        && $notEmpty(me.entityContainer.dicts[editor.fieldName]))
	                {
	                	 editor
	                            .appendItems(me.entityContainer.dicts[editor.fieldName]);
	                	 _editorHasDicts = true;
	                }
	            }
	        }
	        else if ($instanceOf(editor, mx.editors.DropDownTreeEditor)
	                || $instanceOf(editor, mx.editors.DropDownGridEditor))
	        {
	            if ($isEmpty(editor.dicts) || editor.dicts.length == 0)
	            {
	                if ($notEmpty(me.entityContainer.dicts)
	                         && $notEmpty(me.entityContainer.dicts[editor.fieldName]))
	                {
	                	 editor
	                            .appendDicts(me.entityContainer.dicts[editor.fieldName]);
	                	 _editorHasDicts = true;
	                }
	            }
	        }           
	         
	        if(me.entityContainer != null && me.entityContainer.isCreate())
	        {
	        	// 新建时，设置默认值
         		if(me.entityContainer.canModify && editor.isValidate == true)
         		{
         			// 从外部传入 Dicts 的编辑器在 appendDicts 之后需要setValue，设置选中状态等。
         			if (_editorHasDicts)
         			{
         				editor.setValue(editor.value);
         			}
         			
         			// 如果数据容器有值，则写入编辑器。
         			if(!$isEmpty(me.entityContainer.getValue(editor.name)))
         			{
         				editor.setValue(me.entityContainer.getValue(editor.name));
         			}
         			// 如果数据容器没值，编辑器有值，写入数据容器
         			else if (!$isEmpty(editor.value))
         			{
         				me.entityContainer.setValue(editor.name, editor.value, false);
         			}
         		}
	        }
	        else
	        {
	        	// 编辑时设置值
	        	if (!editor.isVirtual)
				{
					var value = me.entityContainer.getValue(editor.fieldName);

					if (typeof(value) != "undefined")
					{
						editor.setValue(value);
					}
				}
	        }
        }
        //清除编辑器的错误标记
         _clearEditorMarkError();
    }
    
    /**
     * @ignore
     */
    me._entityContainer_load = function(e)
    {
    	if (me.disposing)
        {
        	// 解决控件被父控件删除，但回调函数异步触发引发的问题
        	return;
        }
        
        me.$e.setBusy(false);
        var fields = e.columns;
        me.fields = [];
        _fieldCells = [];
        _mergeFields(fields);

        if ($notEmpty(me.fields))
        {
            me.setFields(me.fields);
            me._setFieldValues();
        }

        
        if (!me.enabled || !me.entityContainer.canModify)
        {
            me.setEnabled(false);
        }
        me.trigger("load");
        
        if (me.editorEnterNavigate)
        {
        	var inputs = me.$e.find("input[class!=hint][tabindex!=-1][display!=none]"); 
            for (i = 0; i < inputs.length; i++) { 
            	if ($(inputs[i]).attr("tabindex") == -1)
            		continue;
            	$(inputs[i]).attr("tab",i + 1);
            	inputs[i].onkeyup = function(e){ 
            		if (e.keyCode == 13) { 
            			var index = parseInt($(e.target).attr("tab"));
            			e.target.blur();
            			if (index == inputs.length)
            				index = 0;
            			for (var j =0; j < inputs.length; j++) { 
            				if (inputs[j].getAttribute("tab") == index + 1 + "") 
            				{
            					if ($(inputs[j]).css("display") == "none")
            					{
            						index++;
            						continue;
            					}
            					inputs[j].focus();
            				}	
            			} 
            		} 
            	}
            }
        }
    };

    /**
     * @ignore
     */
    me._entityContainer_changing = function(e)
    {
        // TODO： 数据源发生更新前触发changing事件，在事件处理函数中添加字段验证逻辑以及其他相关逻辑。
    };
    
    /**
     * @ignore
     */
    me._entityContainer_changed = function(e)
    {
        // 数据源更新完毕后触发changed事件
        var editor = me.editors[e.fieldName];
        if ($notEmpty(editor) && editor.$e)
        {
            editor.setValue(e.value);
        }
    };

    /**
     * @ignore
     */
    me._entityContainer_error = function(e)
    {
        me.$e.setBusy(false);
    };
    
    /**
     * @ignore
     * 对校验失败的字段域边框标红并提示。
     */
    me._entityContainer_validate = function(e)
    {
    	var result = e.result;
    	
    	if ($isArray(result))
    	{
    		var t = result[0];
    		
    		if ($isArray(t))
    		{
    			var f;
    			$.each(t, function(i, o){
	    			f = me.getEditor(o.fieldName);
	    			if ($notEmpty(f))
	    			{
	    				f.markError(true, o.errorsToDefaulFormatString);
	    			}
	    		});
    		}
    	}
    	me.$e.setBusy(false);
    };

    /**
     * @ignore
     */
    me._entityContainer_saved = function(e)
    {
        me.$e.setBusy(false);
        // 保存数据成功后执行

        // 重置新增数据的主键值
        for (var i = 0; i < me.editors.length; i++)
        {
            if ($isFunction(me.editors[i].refreshPk) && ($instanceOf(me.editors[i],mx.editors.FileEditor) || $instanceOf(me.editors[i],mx.editors.PictureManagerEditor)))
            {
                // 编辑器提供刷新主键的方法接口。
                if ($isArray(e.result) && e.result.length > 0)
                {
                    //指定目录上传不需要刷新主键值
                	if(me.editors[i].type != "path")
                		me.editors[i].refreshPk(e.result,me.entityContainer.primaryKey);
                    me.editors[i].setPk(e.result[0][me.entityContainer.primaryKey]);
                }
            }
        }
    };

    /**
     * @ignore
     */
    me._entityContainer_saving = function(e)
    {
        me.$e.setBusy();
    };

    base.dispose = me.dispose;
    me.dispose = function()
    {
        me.setEntityContainer(null);
		me.$e.find("label").off().unbind().removeData().remove();
        if (me.editors != null)
        {
            for (var i = 0; i < me.editors.length; i++)
            {
                var editor = me.editors[i];
                editor.parent = null;
                editor.dispose();
                editor = null;
            }
            me.editors.clear();
            me.editors = null;
        }
        if (me.fields != null)
        {
            me.fields.clear();
            me.fields = null;
        }
		
		if(me.groups){
			for(var i=0;i<me.groups.length;i++){
				var group=me.groups[i];
				delete me.groups[group.name];
				group=null;
			}
			me.groups.clear();
			me.groups=null;
		}

        base.dispose();
		base=null;
    };

    var _initColumns = null;
    function _getInitColumns(p_fields)
    {
        if (_initColumns == null)
        {
            _initColumns = _getColumnsFromFields(p_fields);
        }

        return _initColumns;
    }

    function _getColumnsFromFields(p_fields)
    {
        var columns = [];
        if ($notEmpty(p_fields))
        {
            for (var i = 0; i < p_fields.length; i++)
            {
                var field = p_fields[i];
                if ($isArray(field))
                {
                    for (var j = 0; j < field.length; j++)
                    {
                        if ($.isPlainObject(field[j]))
                        {
                            columns.add(field[j].name);
                        }
                    }
                }
                else if ($.isPlainObject(field))
                {
                    columns.add(field.name);
                }
            }
        }
        return columns;
    }

    function _getQueryColumnsStr(p_fields)
    {
        var queryColumns = _getInitColumns(p_fields);
        if (queryColumns.length > 0)
        {
            return queryColumns.join(",");
        }

        return null;
    }

    function _setFilterColumns(p_params, p_filterColumns, p_data, p_type)
    {
        if ($isEmpty(p_params))
        {
            p_data[p_type] = {columns : p_filterColumns};
        }
        else
        {
            if ($isEmpty(p_params.columns))
            {
                p_params.columns = p_filterColumns;
            }
            else
            {
                if ($isString(p_params.columns))
                {
                    var filterCols = p_filterColumns.split(",");
                    var cols = p_params.columns.split(",");

                    var length = filterCols.length;
                    for (var i = 0; i < length; i++)
                    {
                        if (!cols.contains(filterCols[i]))
                        {
                            cols.add(filterCols[i]);
                        }
                    }
                    p_params.columns = cols.join(",");

                    filterCols.length = 0;
                    cols.length = 0;
                    filterCols = null;
                    cols = null;
                }
                else
                {
                    throw new Error(mx.err("ERR_UNSUPPORTED_FORMAT",
                            [p_params.columns]));
                }
            }
        }
    }
    
    /**
     * @ignore
     */
    me._renderFieldGroup = function(p_fields, $p_table, p_level)
    {
        var $row = $("<tr/>");
        var $cell = $("<td>").addClass('fieldGroup').attr("colSpan", 1);
        $row.append($cell);

        var $dl = $("<dl><dt/><dd/></dl>");
        $cell.append($dl);

        var $dd = $dl.children("dd");
        var $table = me._createTable();
        me._renderFields(p_fields, $table, p_level + 1);
        $dd.append($table);

        $dl.children("dt").text(p_fields.caption);
        $dl.expandable({
                    expanded : p_fields.defaultExpanded
                });
        
        if (!p_fields.visible)
        {
            $row.hide();
        }
        
        $p_table.append($row);
        return $row;
    }
    
    /**
     * @ignore
     */
    me._renderField = function(p_field, $p_table, p_level)
    {
        var editor = _createEditor(p_field);
        
        //当字段隐藏且表单字段自动对齐时不添加td
        if (me.autoAlign && p_field.visible === false)
        {
        	return;
        }
        
        var $row = null;
        var lineBreak = p_field.lineBreak;
        var $cell = $("<td class='field'/>");
        var $label = null;

        $cell.attr("id", p_field.name);
        $cell.attr("colSpan", p_field.colSpan);
        if (p_field.highlight) 
        {
        	 $cell.css("backgroundColor", p_field.highlight);
        }

        var $container = $("<div class='container'/>");
        
        if(!$.isIE67()) {
        	$container.css({
                "marginLeft" : 15 * (2 - p_level),
                "marginRight" : 5
            });
        }

        $cell.append($container);
        
        var $editor = $("<div class='editor'/>").css({
                    "marginLeft" : p_field.captionVisible ? me.captionColumnWidth : "0px"
                });
                
        if (p_field.highlight) 
        {
        	 $cell.css("backgroundColor", p_field.highlight);
        }
        
        if (!editor.instanceOf(mx.editors.CheckEditor))
        {
        	$label = $("<label/>").css({
                "width" : p_field.captionVisible ? me.captionColumnWidth : "0px"
            });
            
            if (p_field.highlight) 
	        {
	        	 $label.css("backgroundColor", p_field.highlight);
	        }
        	
        	if(!p_field.captionVisible)
        		$label.hide();

        	var labelText = "";
        	if ($isFunction(me.fieldCaptionRender))
        	{
        		labelText = me.fieldCaptionRender(p_field);
        	}
        	else
        	{
        		labelText = (p_field.nullable == false ? "<span class='red'>*</span> " : "") + p_field.caption + ":";
        	}
        	$label.html(labelText);
			$label.get(0).title = p_field.caption;
        	
            $container.append($label);
        }
        $container.append($editor);
        if ($notEmpty(editor))
        {
            $editor.append(editor.$e);
        }

        // 获取表单项所在Tr
        if ($isEqual(p_field.name, me.entityContainer.primaryKey))
        {
        	$row = $("<tr/>");
        	$p_table.prepend($row);
        	$p_table.append($("<tr/>"));
        }
        else if ($p_table.find("tr").length == 0 
                || (_getCols($p_table.find(">tbody>tr").last()) + p_field.colSpan > me.maxCols)
                || lineBreak)

        {
            $row = $("<tr/>");
            $p_table.append($row);
        }
        else
        {
            $row = $p_table.find(">tbody>tr").last();
        }
        $row.append($cell);
        if (p_field.visible == false)
        {
            $cell.css("display", "none");
        }
    }
    
    /**
     * 用来清除编辑器的错误标记。但不会更改编辑器的验证结果
     */
    function _clearEditorMarkError()
    {
         if($isArray(me.editors))
         {
              for(var i=0;i< me.editors.length;i++)
             {
                  var editor = me.editors[i];
                  if(editor!=null && editor.isValidate === false)
                  {
                          //先保存验证结果
                         var _isValidate = editor.isValidate;
                         editor.markError(false);
                         editor.isValidate = _isValidate;  
                  }
             }
         }
    };

    function _getCols(p_elem)
    {
        var tag = p_elem.tag();
        var col = 0;
        if ($isEqual(tag, 'td'))
        {
            col = p_elem.attr("colSpan");
        }
        else if ($isEqual(tag, 'tr'))
        {
            p_elem.children("td").each(function(i)
                    {
                        col += this.colSpan;
                    });
        }
        return col;
    }

    function _createEditor(p_options)
    {
		if (p_options.name == me.primaryKey || p_options.name == me.entityContainer.primaryKey)
		{
			p_options.readOnly = true;
		}
        var options = $.extend($clone(p_options), {
		                    "parent" : me,
		                    enabled : me.enabled ? p_options.enabled : me.enabled
		                });
        
        if ($notEmpty(options) && $.isPlainObject(options.editorOptions))
        {
        	options = $.extend(options, options.editorOptions);
        }

		var changeHandler = null;
        if ($notEmpty(options.onchanged))
        {
        	changeHandler = options.onchanged;
        }
        
        options.onchanged = me._editor_changed;
        var editor = new mx.editors.EditorFactory.createEditor(
                options.editorType, options);
        
        if ($notEmpty(editor))
        {
			editor.on("changed", changeHandler);
            me.editors[editor.name] = editor;
            me.editors.add(editor);
        }
        return editor;
    }
    
    function _setEditorEnable(p_editor,p_enabled)
    {
    	if(!$instanceOf(p_editor,mx.editors.Editor))
    	{
    		return;
    	}
    	if($instanceOf(p_editor,mx.editors.CustomEditor))
        {
    		p_editor.setEnabledInput(p_enabled);
    		p_editor.setEnabled(p_enabled);	
        }
        else
        {
        	p_editor.setEnabled(p_enabled)	
        }    
    }

    me.endOfClass(arguments);
    return me;
};

/**
 * 提供一个表单字段信息的类。
 */
mx.datacontrols.FormField = function()
{
    var me = {};

    /**
     * 获取字段的名称。
     * 
     * @default null
     */
    me.name = null;

    /**
     * 获取字段的名称。通常与 {@link name } 字段的值相同。
     * 
     * @default null
     */
    me.fieldName = null;

    /**
     * 获取字段的标题。 在运行时请使用 {@link mx.datacontrols.DataForm.setFieldCaption}
     * 方法改变该字段的值。
     * 
     * @default null
     */
    me.caption = null;

    /**
     * 获取字段是否只读。 在运行时请使用 {@link mx.datacontrols.DataForm.setFieldReadOnly}
     * 方法改变该字段的值。
     * 
     * @default false
     */
    me.readOnly = false;

    /**
     * 获取字段是否可见。 在运行时请使用 {@link mx.datacontrols.DataForm.setFieldVisible}
     * 方法改变该字段的值。
     * 
     * @default true
     */
    me.visible = true;
    
    /**
     * 获取该字段的标题是否可见, 在运行时请使用 {@link mx.datacontrols.DataForm.setFieldCaptionVisible}
     * 
     * @default true
     */
    me.captionVisible = true;

    /**
     * 获取字段是否可空。 在运行时请使用 {@link mx.datacontrols.DataForm.setFieldNullable}
     * 方法改变该字段的值。
     * 
     * @default true
     */
    me.nullable = true;

    /**
     * 获取字段是否可用。 在运行时请使用 {@link mx.datacontrols.DataForm.setFieldEnabled}
     * 方法改变该字段的值。
     * 
     * @default true
     */
    me.enabled = true;

    /**
     * 获取字段的编辑器类型。<br/> 该字段的可选值包括:
     * <ul>
     * <li>CheckEditor</li>
     * <li>ComboEditor</li>
     * <li>DateTimeEditor</li>
     * <li>DropDownEditor</li>
     * <li>ListEditor</li>
     * <li>NumberEditor</li>
     * <li>PictureEditor</li>
     * <li>RichTextEditor</li>
     * <li>RichTextCKEditor</li>
     * <li>TextEditor</li>
     * <li>TimeEditor</li>
     * <li>UpDownEditor</li>
     * <li>SliderEditor</li>
     * </ul>
     * 
     * @default null
     */
    me.editorType = null;

    /**
     * 获取字段的宽度。
     * 
     * @default 100%
     */
    me.width = "100%";

    /**
     * 获取一个 Boolean 值，该值表示字段是否换行排列。
     * 
     * @default true
     */
    me.lineBreak = true;

    /**
     * 获取和设置字段列跨度属性。
     * 
     * @default 1
     */
    me.colSpan = 1;
    
    /**
     * 指示字段是否虚拟，如果字段是虚拟的话，其数据将不会与服务器交互
     * 
     * @default false
     */
    me.isVirtual = false;
    
     /**
     * 获取字段的高亮值。
     * 
     * @default null
     */
    me.highlight = null;

    return me;
};

/**
 * 提供一个表单字段分组的信息的集合类。
 * 
 * @item mx.datacontrols.FormField
 * @index 字段信息 {@link mx.datacontrols.FormField} 在集合中的序号（从 0 开始计数）。
 */
mx.datacontrols.FormFieldGroup = function()
{
    var me = [];
    
    /**
     * 只读属性，group的name 其值等于分组的标题caption,用于标识唯一的FormFieldGroup.
     */
    me.name= null;
    
    /**
     * 获取字段分组的标题。
     */
    me.caption = null;
    
    /**
     * 只读属性，group 是否显示，默认是显示的 
     */
    me.visible = true; 
    
    /**
     * group 的jquery对像,是一个tr的jquery对像 
     */
    me.$e = null;

    /**
     * 获取一个 Boolean，表示字段分组是否默认展开。
     * 
     * @default true
     */
    me.defaultExpanded = true;
    
    /**
     * 设置caption
     * @param p_caption FormFieldGroup的名称,如:"设备信息"
     */
    me.setCaption = function(p_caption){
    	if($isString(p_caption)){
    		me.caption = p_caption;
    	}
    	if(me.$e!=undefined){
    		me.$e.find("dt:first").text(p_caption);
    	}
    }
    
    /**
     * 设置visible
     * @param p_visible 设置group 显示或就隐藏 
     */
    me.setVisible = function(p_visible){
    	 if(me.$e!=undefined){
    		if(p_visible == true){
    		   me.$e.css("display","");
    		   me.visible = p_visible;
    		}else if(p_visible == false){
    		   me.$e.css("display","none");
    		   me.visible = p_visible;
    		}
     	}
    }

    return me;
};
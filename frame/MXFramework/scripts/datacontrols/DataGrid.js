$ns("mx.datacontrols");

$import("mx.controls.ContextMenu");
$import("mx.datacontrols.DataGridColumn");
$import("mx.datacontrols.DataGridItem");
$import("mx.datacontrols.PagedControl");
$import("mx.datacontrols.PageNaviBar");
$import("mx.datacontrols.wizards.ImportExcelWizard");
$import("mx.editors.EditorFactory");
$import("mx.datacontainers.GridEntityContainer");
$import("mx.datacontrols.DataGridSearchBox");
$import("mx.utils.ExcelUtil");

/**
 * 提供一个显示数据表格的控件。
 * 
 * @example
 * 以下为 {@link mx.datacontrols.DataGrid} 的示例。
 * <b>说明了如何调用 Rest 服务获取表格的数据然后在客户端构造表格。</b>
 * <code language="JavaScript">
 * var dataGrid = new mx.datacontrols.DataGrid({
 *     baseUrl: "http://bruce-pc:8892/mx/rest/getData"
 * });
 * </code>
 * 
 * @example
 * 以下为 {@link mx.datacontrols.DataGrid} 的示例。<b>说明了如何创建一个带查询框的表格。</b>
 * <code language="JavaScript">
 * //创建一个带查询框的表格，查询框有姓名，学校，学院，性别四个查询条件，其中性别查询条件为下拉框。
 *  var dataGrid = new mx.datacontrols.DataGrid({
 *     baseUrl: "http://bruce-pc:8892/mx/rest/getData",
 *     searchBox: {
 *                  initHidden: false,
 *                  fields: [
 *                             {
 *                                 name: "name",
 *                                 caption: "姓名"
 *                             },
 *                             {
 *                                 name: "school",
 *                                 caption: "学校"
 *                             },
 *                             {
 *                                 name: "xueyuan",
 *                                 caption: "学院"
 *                             },
 *                                 
 *                             { 
 *                                 name: "sex",
 *                                 caption: "性别" ,
 *                                 editorType: "DropDownEditor" 
 *                             }
 *                       ]
 *                   }
 * });
 * </code>
 * 
 * @example
 * 以下为 {@link mx.datacontrols.DataGrid} 的示例。<b>说明了如何创建一个每页10条数据，列允许排序，第一列显示 CheckBox，不显示表格列分割线的表格</b>
 * <code language="JavaScript">
 * //创建一个每页10条数据，列允许排序，第一列显示 CheckBox，不显示表格列分割线的表格。
 *  var dataGrid = new mx.datacontrols.DataGrid({
 *     baseUrl: "http://bruce-pc:8892/mx/rest/getData",
 *     displayColSplitLine: false,//不显示表格列分割线
 *     pageSize: 10,//每页10条数据
 *     height:"80%",
 *     allowSorting:true,//列允许排序
 *     displayCheckBox:true,//第一列显示 CheckBox
 *     columns:  [
 *                 {
 *                     name: "name",
 *                     caption: "姓名",
 *                     width:150,
 *                     align:"right",
 *                     dataAlign:"center"
 *                 },
 *                 {
 *                     name: "school",
 *                     caption: "学校"
 *                 },
 *                 {
 *                     name: "xueyuan",
 *                     caption: "学院"
 *                 }
 *           ]
 * });
 * </code>
 * 
 * @example
 * 以下为 {@link mx.datacontrols.DataGrid} 的示例。<b>说明了如何创建一个个性化列头的表格。</b>
 * <code language="JavaScript">
 * //创建一个姓名列列头标题靠右显示，数据居中显示的表格，宽度为150px。
 *  var dataGrid = new mx.datacontrols.DataGrid({
 *     baseUrl: "http://bruce-pc:8892/mx/rest/getData",
 *     columns:  [
 *                 {
 *                     name: "name",
 *                     caption: "姓名",
 *                     width:150,
 *                     align:"right",
 *                     dataAlign:"center"
 *                 },
 *                 {
 *                     name: "school",
 *                     caption: "学校"
 *                 },
 *                 {
 *                     name: "xueyuan",
 *                     caption: "学院"
 *                 }
 *           ]
 * });
 * </code>
 * 
 * @example
 * 以下为 {@link mx.datacontrols.DataGrid} 的示例。<b>说明了如何创建一个可编辑的表格，并且自定义渲染单元格。</b>
 * <code language="JavaScript">
 * //创建一个可编辑的表格，性别列的值为“1”时，显示为“男”，否则显示为“女”。并且性别列进行编辑时显示为下拉框。其他默认为文本框。
 * var sexData =  [
 *                       { text: "男", value: "1" },
 *                       { text: "女", value: "2" }
 *                   ];
 *  var dataGrid = new mx.datacontrols.DataGrid({
 *     baseUrl: "http://bruce-pc:8892/mx/rest/getData",
 *     allowEditing: true,
 *     columns:  [
 *                 {
 *                     name: "name",
 *                     caption: "姓名",
 *                     width:150,
 *                     align:"right",
 *                     dataAlign:"center"
 *                 },
 *                 {
 *                     name: "school",
 *                     caption: "学校"
 *                 },
 *                 {
 *                     name: "xueyuan",
 *                     caption: "学院"
 *                 },
 *                 { 
 *                     name: "sex", caption: "性别", 
 *                     width:"auto",
 *                     renderCell: function(p_item, $p_cell)
 *                     {
 *                           var value = null;
 *                           if (parseInt(p_item.getValue("sex")) == 1) 
 *                           {
 *                               value = "男";
 *                           }
 *                           else
 *                           {
 *                               value = "女";
 *                           }
 *                           $p_cell.text(value);
 *                     },
 *                     editorType: "DropDownEditor",
 *                     editorOptions: {items: sexData}
 *                 }
 *           ]
 * });
 * </code>
 */
mx.datacontrols.DataGrid = function()
{
    var me = $extend(mx.datacontrols.PagedControl);
    var base = {};
    
    /**
     * 获取当前类型实例的类的类型。
     */
    me.typeName = "DataGrid";

    /**
     * 获取一个 {@link mx.datacontainers.EntityContainer} 对象（通常是 {@link mx.datacontainers.GridEntityContainer} 类型），表示表格的数据源。
     * 请使用 {@link setEntityContainer} 方法设置该字段的值。
     */
    me.entityContainer = null;
    
    /**
     * 获取一个 {@link mx.datacontrols.PageNaviBar} 对象。
     * 表示当前 {@link mx.datacontrols.DataGrid} 的分页工具条。
     */
    me.pageNaviBar = null;
    
    /**
	 * 设置表格是否延迟渲染 
	 */
	me.lazyRender = false;
	
	/**
	 * 设置表格延迟渲染时,每次渲染的数据大小，如果同时需要分页，请设置pageSize的值为该属性值得整数倍。
	 */
	me.lazyRenderSize = 50;
    
    /**
     * 参见 {@link mx.controls.Control} 的  {@link mx.controls.Control.width} 属性。 
     * @default auto
     */
    me.width = "auto";

    /**
     * 获取或设置序号列的宽度。
     * 
     * @default 25
     */
    me.rowNumberColWidth = 25;
    
    /**
     * 获取或设置序号列的名称。
     * 
     * @default 空
     */
    me.rowNumberColCaption = "";
    
    /**
     * 参见 {@link mx.controls.Control} 的  {@link mx.controls.Control.height} 属性。 
     *  
     * @default 100%
     */
    me.height = "100%";

    /**
     * 获取和设置一个集合，用于创建含控件中显示的所有 {@link mx.datacontrols.DataGridColumn}。
     * 
     * @item mx.datacontrols.DataGridColumn
     * @index 列的名称（{@link mx.datacontrols.DataGridColumn.name}）或列在集合中的序号（从 0
     *        开始计数）。
     */
    me.columns = [];
    
    /**
     * 获取或设置一个  {@link mx.datacontrols.DataGridSearchBox} 对象.
     */
    me.searchBox = null;
    
    /**
     * 获取一个集合，包含数据项列表中所有的项（{@link mx.datacontrols.DataGridItem} 类型）。请使用
     * {@link setItems} 方法设置该字段的值。
     * 
     * @item mx.datacontrols.DataGridItem
     * @index 数据项在集合中的序号（从 0 开始计数）。
     */
    me.items = [];

    /**
     * @ignore
     * 
     * 获取一个集合，包含 {@link mx.datacontrols.DataGrid} 中所有使用的图片。
     * 
     * @item JSON 对象（如 { name: "folder", value: "folder" }）
     * @index JSON 对象在集合中的序号（从 0 开始计数）或 JSON 对象的 name 属性值。
     */
    me.images = [];
    
    /**
     * 请参见 {@link mx.datacontainers.EntityContainer.baseUrl} 属性。<b>如果 DataGrid 的 {@link entityContainer} 由外界创建，那么该属性不需要设置；
     * 否则只有当{@link entityContainer} 属性对应的数据容器对象的type属性值为local时,可以不需要设置该属性，其它情况下必须设置。</b>
     */
    me.baseUrl = null;

    /**
     * 获取或设置一个属性，该属性对应的值将用作 {@link mx.datacontrols.DataGrid} 中数据项的 id 值，表示主键唯一值。
     * 此属性必须在初始化控件时设置
     * @default id
     */
    me.primaryKey = "id";
    
    /**
     * 获取或设置一个属性，用于声明是否有主键，若声明为无主键，则使用appendItem时数据有可能重复添加
     * @default true
     */
    me.hasPrimaryKey = true;    

    /**
     * 获取一个对象，表示 {@link mx.datacontrols.DataGrid} 中当前选定的数据项（{@link mx.datacontrols.DataGridItem}类型）。
     * <b>该属性特指背景色选中的行所在的数据项。</b>
     */
    me.selection = null;

    /**
     * 获取一个集合，表示 {@link mx.datacontrols.DataGrid} 中当前选定的所有数据项（{@link mx.datacontrols.DataGridItem}类型）的集合。
     * <b>注意：该数组不是勾选项的集合。如果需要获取勾选项的集合，请使用 {@link getCheckedItems()} 方法。</b>
     */
    me.selections = [];

    /**
     * 获取或设置一个值，表示当列表中没有选中项的时候，是否自动选择第一个数据项。如果该值为 true，则自动选择；反之则不自动选择。
     * {@exclude mx.datacontrols.GroupItemGrid}
     * @default false
     */
    me.autoSelect = false;
   
    /**
     * 获取或设置一个 Boolean 值，表示是否使用向上快捷键（ctrl+↑）或向下快捷键（ctrl+↓）移动表格行。
     * {@exclude mx.datacontrols.GroupItemGrid}
     * @default false
     */
    me.moveByShortcutKey = false;
    
    /**
     * 获取或设置一个boolean值，表示是否通过使用tab键来切换编辑的单元格
     * 该属性仅在 {@link mx.datacontrols.DataGrid}、 {@link mx.datacontrols.GroupHeaderGrid}可用。
     * 
     * @default false
     */
    me.toEditCellByTabKey = false;
    
    /**
     * 获取或设置表格数据行是否自动换行。
     * 该属性仅在 {@link mx.datacontrols.DataGrid}、 {@link mx.datacontrols.GroupHeaderGrid}可用。
     * 
     * @default false
     */
    me.autoWrap = false;

    /**
     * 获取或设置一个 Boolean 值，该值表示数据项之前是否显示一个选择框。如果该值为 true，则表示显示；反之则不显示。请使用
     * {@link setDisplayCheckBox} 方法设置该字段的值。
     * 
     * @default false
     */
    me.displayCheckBox = false;
    
    /**
     * 获取或设置一个 Boolean 值，该值表示数据项之前是否显示行号。如果该值为 true，则表示显示；反之则不显示。请使用
     * {@link setDisplayRowNumber} 方法设置该字段的值。
     * 
     * @default false
     */
    me.displayRowNumber = false;
    
    /**
     * 获取或设置一个 Boolean 值，该值表示表格是否显示统计行。如果该值为 true，则表示显示；反之则不显示。
     * 请使用 {@link setDisplayStatisticRow} 方法设置该字段的值。
     * 如果需要设置某列的统计值，请使用 {@link mx.datacontrols.DataGridColumn.setStatisticValue} 方法，或者使用
     * {@link mx.datacontrols.DataGridColumn.statisticValue} 属性设置初始统计值。
     * 
     * @default false
     */
    me.displayStatisticRow = false;
    
    /**
     * 获取或设置一个 Boolean 值，该值表示是否显示主键列。
     * @default false
     */
    me.displayPrimaryKey = false;

    /**
     * 获取一个 Boolean 值，表示表格控件是否允许编辑。
     * @default false
     */
    me.allowEditing = false;

    /**
     * 获取或设置一个 Boolean 值，表示所有列是否允许排序。
     * @default false
     */
    me.allowSorting = false;

    /**
     * 获取或设置一个 Boolean 值，表示是否允许多列排序。
     */
    me.allowMultipleSorting = false;
    
    /**
     * 获取或设置一个字符串，表示需要多列排序的列名称（如“age,gender,name”），以逗号分隔，排序顺序为从左向右。
     */
    me.multipleSortColumns = null;
    
    /**
     * 获取上一次进行排序的列（{@link mx.datacontrols.DataGridColumn} 类型）。
     */
    me.sortColumn = null;

    /**
     * 获取或设置一个 Boolean 值，该值表示是否按升序或降序对 {@link mx.datacontrols.DataGrid} 控件中的数据项进行排序。如果该值为
     * true，表示按升序排序；反之则降序。
     * 
     * @default true
     */
    me.sortOrder = true;
    
    /**
     * 获取或设置一个字符串，表示请求服务时的排序条件。如“NAME ASC, AGE DESC”。
     */
    me.sorter = null;
    
    /**
     * 获取或设置表格的过滤条件。请使用 {@link setFilter} 方法设置该字段的值。该属性是一个字符串或者是一个 JSON 对象，该属性与 {@link searchParamType} 属性有关。
     * 当 {@link searchParamType} 属性为 string 时，该属性是字符串或者 JSON 对象，例如："name='jacky'&age=23" 或者 {name: "jacky", age: 23}, 此时 {@link mx.datacontrols.DataGrid} 执行简单查询；
     * 当 {@link searchParamType} 属性为 json 时，该属性是 JSON 对象， 该 JSON 对象必须遵循高级查询格式规范, 例如： 
     * {criterions: [
     *     {fieldName: "age", value: 18, operator: ">"},
     *     {fieldName: "age", value: 60, operator: "<"}
     * ], junction： "and", columnJunction: "and"} 表示对属性名为 “age” 的列设置过滤条件： 18 < age < 60。
     */
    me.filter = null;
    
    /**
     * 获取或设置表格的查询条件类型。json 表示查询参数filter 的值采用 Json 对象的形式传递。string 表示查询参数 filter 的值采用字符串的形式传递。
     * 该字段必须在初始化前设置。
     * <p>
     * 该字段可选的值包括：
     * <ul>
     *      <li><b>json</b></li>
     *      <li><b>string</b></li>
     * </ul>
     * </p>
     */
    me.searchParamType = "string";
    
    /**
     * 获取或设置一个 Boolean 值，该值表示是否可以调整 {@link mx.datacontrols.DataGrid} 控件中列的宽度。如果该值为 true，表示可以调整；反之则不可以。
     * 
     * @default true
     */
    me.allowAdjusting = true;
    
    /**
     * 获取或设置一个 Boolean 值，该值表示是否可以调整 {@link mx.datacontrols.DataGrid} 控件中列的宽度。如果该值为 true，表示可以调整；反之则不可以。
     * 该属性和 {@link allowDraggingColumn}  属性意义相同。
     * allowDraging在设置false的同时要设置me.allowDraggingColumn为false才可以使列头顺序不能拖动，只要有一个为true，列头的顺序就是可以改变的。
     * @default true
     * 
     * {@exclude mx.datacontrols.GroupHeaderGrid}、{@exclude mx.datacontrols.LockHeaderGrid}、{@exclude mx.datacontrols.GroupLockHeaderGrid}
     */
    me.allowDraging = true;
    
    /**
     * 获取或设置一个 Boolean 值，该值表示是否可以调整 {@link mx.datacontrols.DataGrid} 控件中的列头的顺序。如果该值为
     * true，表示可以调整；反之则不可以。
     * allowDraggingColumn在设置false的同时要设置allowDraging为false才可以使列头顺序不能拖动，只要有一个为true，列头的顺序就是可以改变的。
     * 
     * {@exclude mx.datacontrols.GroupHeaderGrid}、{@exclude mx.datacontrols.LockHeaderGrid}、{@exclude mx.datacontrols.GroupLockHeaderGrid}
     */
    me.allowDraggingColumn = true;
    
    /**
     * 获取或设置一个 Boolean 值，该值表示是否可以拖动 {@link mx.datacontrols.DataGrid.DataGridItem} 项。
     * 
     * {@exclude mx.datacontrols.GroupItemGrid}
     * @default true
     */
    me.allowDraggingItem = false;
    
    /**
     * 获取或设置一个 Boolean 值，表示表格是否要隔行变色。
     * 
     * @default true
     */
    me.allowInterlacedRow = true;
    
    /**
     * 指示是否使用列宽百分比自适应
     * 
     * @default false
     */
    me.usePercentage = false;
    
    /**
     * 是否打印默认隐藏的字段。
     * {@exclude mx.datacontrols.GroupItemGrid}
     * @default false
     */
    me.printHideFields = false;
    
    /**
     * 获取或设置一个 Boolean 值，表示表格是否使用选中后编辑。
     * 
     * @default false
     */
    me.editOnSelected = false;
    
    /**
     * 获取当前表格激活的编辑器,如果没有，返回null
     * 
     * @default null
     */
    me.activeEditor = null;

    /**
     * @ignore
     * 获取 {@link mx.datacontrols.DataGridItem} 图片的大小。该字段必须在初始化前设置。
     * 
     * @default 16
     */
    me.imageSize = 16;

    /**
     * 获取一个 Boolean 值，表示是否显示列头。请使用 {@link setDisplayHead} 方法设置该字段的值。
     * 
     * @default true
     */
    me.displayHead = true;
    
    /**
     * 获取一个 Boolean 值，表示是否显示列的分割线。
     * 
     * @default true
     */
    me.displayColSplitLine = true;

    /**
     * @ignore
     * 获取一个 Boolean 值，表示是否需要在 {@link mx.datacontrols.DataGridItem}
     * 中显示图标。该字段必须在初始化前设置。
     * 
     * @default false
     */
    me.displayImage = false;
    
    /**
     * 一个 {@link mx.controls.ContextMenu} 对象，表示控件的右键菜单。
     */
    me.contextMenu = null;
    
    /**
     * 一个 {@link mx.controls.ContextMenu} 对象，表示表头的右键菜单。
     */
    me.headContextMenu = null;
    
    /**
     * 一个布尔值，指示是否启用表头上下文菜单
     */
    me.enableHeadContextMenu = true;

    /**
     * 一个 {@link mx.controls.ContextMenu} 对象，表示数据项的右键菜单。
     */
    me.itemMenu = null;
    
    /**
     * @ignore
     * 一个布尔值，指示数据在保存之前是否校验空值
     */
    me.validateOnSaving = false;
    
    /**
     * 获取一个 Boolean 值，表示是否显示titile属性。请使用 {@link setEnableCellTip} 方法设置该字段的值。
     * 
     * @default false
     */
    me.enableCellTip = false;
    
    /**
     * 设置一个 Boolean 值，在allowPaging添加分页控件情况下，表示是否可编辑分页控件pageSize编辑框。
     * 
     * @default false
     */
    me.enableEditingPageSize = false;
	
    /**
     * 获取和设置一个字符串，该属性表示表格数据保存成功后的提示信息。当用户设置为空或者空字符串时，保存动作发生后将不提示信息。
     * @default mx.msg("SAVE_SUCCESS")
     */
    me.saveMessage = mx.msg("SAVE_SUCCESS");
    
    
    /**
     * 当控件当前的选择项发生改变后，将触发该事件。调用 {@link selectItem}、 {@link removeItem}、
     * {@link deselectItem} 等方法后会触发该事件。
     */
    me.onselectionchanged = null;

    /**
     * 当控件当前的选择项发生改变的时候，将触发该事件。调用 {@link selectItem} 方法时会触发该事件。
     * 
     * @cancelable
     * @param item
     *            一个 {@link mx.datacontrols.DataGridItem} 对象，即将被选择的项。
     */
    me.onselectionchanging = null;
    
    /**
     * 当列表项被创建后，将触发该事件。
     * 
     * @param item
     *            一个 {@link mx.datacontrols.DataGridItem} 对象。
     */
    me.onitemcreated = null;
    
    /**
     * 当列表项被从DOM中删除后，将触发该事件。
     * 
     */
    me.onitemremoved = null;

    /**
     * 当单击列表中项的时候，将触发该事件。
     * 
     * @param item
     *            一个 {@link mx.datacontrols.DataGridItem} 对象，被单击的项。
     */
    me.onitemclick = null;

    /**
     * 当双击列表中项的时候，将触发该事件
     * 
     * @param item
     *            一个 {@link mx.datacontrols.DataGridItem} 对象，被双击的项。
     */
    me.onitemdoubleclick = null;

    /**
     * 当数据项的选中状态发生改变后，将触发该事件。
     * 
     * @param item
     *            一个 {@link mx.datacontrols.DataGridItem} 对象。
     */
    me.onitemchecked = null;

    /**
     * 当数据项进行编辑时，将触发该事件。此时单元格内编辑器尚未创建。
     * 
     * @cancelable
     * @param column 一个 {@link mx.datacontrols.DataGridColumn} 对象。
     * @param item 一个 {@link mx.datacontrols.DataGridItem} 对象。
     */
    me.oncellediting = null;
    
    /**
     * 当数据项的某个单元格内编辑器被创建前，将触发该事件。
     * 
     * @param column 一个 {@link mx.datacontrols.DataColumn} 对象。
     * @param editorOptions 一个 JSON 对象,表示创建编辑器时所需的参数。
     */
    me.oneditorcreating = null;
    
    /**
     * 当数据项的某个单元格内编辑器被创建激活后，将触发该事件。
     * 
     * @param editor 一个 {@link mx.editors.Editor} 对象。
     */
    me.oneditorcreated = null;
    
    /**
     * 当数据项进行编辑后，将触发该事件。
     * 
     * @param column 一个 {@link mx.datacontrols.DataGridColumn} 对象。
     * @param item 一个 {@link mx.datacontrols.DataGridItem} 对象。
     * @param cell 一个 Jquery 对象，表示当前编辑的单元格（TD）。
     */
    me.oncelledited = null;
    
    /**
     * 当数据容器开始加载数据时，将触发该事件。调用 {@link load} 方法时会触发该事件。
     * 
     * @param cancel
     *            一个 Boolean 值，表示是否中止当前的加载动作。
     */
    me.onloading = null;
    
    /**
     * 当数据项索引发生改变的时候，将触发该事件。通常调用 {@link moveItem}、{@link mx.datacontrols.DataGridItem.moveUp}、{@link mx.datacontrols.DataGridItem.moveDown}、{@link mx.datacontrols.DataGridItem.moveTo} 方法时会触发该事件。
     * 
     * @param sourceItem 一个 {@link mx.datacontrols.DataGridItem} 对象，即移动的源数据项。
     * @param targetItems 一组 {@link mx.datacontrols.DataGridItem} 对象集合，即被移动的目标数据项集合。
     */
    me.onitemindexchanged = null;
    
    /**
     * 当数据加载完后，将触发该事件。
     */
    me.onload = null;
    
    /**
     * 当数据校验完后，将触发该事件。
     */
    me.onvalidate = null;
    
    /**
     * @ignore
     */
    me.$grid = null;
    
    /**
     * @ignore
     */
    me.$head = null;

    /**
     * @ignore
     */
    me.$headTable = null;

    /**
     * @ignore
     */
    me.$body = null;

    /**
     * @ignore
     */
    me.$bodyTable = null;
    
    /**
     * 原始的元数据列头信息
     * @ignore
     */
    me._columns = [];
    
    /**
     * @ignore
     * 表格记录的默认值
     */
    me.itemDefaultData = null;
    
    /**
     * @ignore
     * 获取一个 Boolean 值，表示是否有重写 renderCell 方法的列。
     */
    me._hasOverrideRenderCell = false;
    
    /**
     * @ignore
     * 获取一个 Boolean 值，表示是否选中全部页的数据。
     */
    me._allPageSelected = false;
    
    /**
     * @ignore
     * 获取一个 Boolean 值，表示是否启用多选CHECKBOX。
     */
    me.multiCheck = false;
    
    /**
     * 获取单元格title最大字符。
     *
     * @default false
     */
    me.maxTitleLength = 200;
    
    /**
     * 获取或设置解析文件的范围。
     * 一个 JSON 对象（如 {horizontalBegin : 1, horizontalEnd : 0, verticalBegin : 1, verticalEnd : 0, sheetNumber : 1, separatorNum : 0}; ）
     * <p>
     * 参数说明。
     * <ul>
     * <li>horizontalBegin : 开始行,默认值 1</li>
     * <li>horizontalEnd : 结束行,默认值 0,表示不设置结束行</li>
     * <li>verticalBegin : 开始列,默认值 1</li>
     * <li>verticalEnd : 结束列,默认值 0，表示不设置结束列</li>
     * <li>sheetNumber : 解析excel的第几个sheet页,默认值 1</li>
     * <li>separatorNum : 解析真正数据行，默认是为0，即从表头下面一行开始解析。</li>
     * <li>saveByDefault : 一个 boolean 值，默认是 true，表示选择 Excel 后，点击下一步是否直接保存。</li>
     * <li>parseExcelCallBack : 一个函数对象，表示服务端解析 Excel 后，处理返回数据的回调函数。</li>
     * </ul>
     */
    me.importExcelOptions = {};
    var _defalutimportExcelOptions = {horizontalBegin : 1, horizontalEnd : 0, verticalBegin : 1, verticalEnd : 0, sheetNumber : 1, separatorNum : 0, saveByDefault: true};
    
    /**
     * 获取或设置 Boolean 值，表示是否在本地缓存用户对于列宽度、顺序、显示的调整。开启该功能时，请设置{@link cacheAdjustPrefix}和{@link alias}属性值。
     */
    me.cacheAdjust = false;
    
    /**
     * 获取或设置 一个字符串，表示本地缓存用户对于列宽度、顺序、显示的调整时存储时的key前缀，完整的key由cacheAdjustPrefix与alias拼接而成以确保唯一性。
     */
    me.cacheAdjustPrefix = null;
    
    /**
     * 获取一个 Boolean 值，表示是否采用列信息覆写元数据。
     * @ignore
     */
    var _hasChangeColumns2Meta = false;
    
    /**
     * 用来记录me.$e的前一次的宽度
     * @ignore
     */
    var _preWidth = 0;
    
    /**
     *  该属性为只读属性，表头行号列是否已经初始化。
     *  @ignore
     */
    me._isInitRowNumber = false;
    
    /**
     *  me._isInitCheckBox 用来标示表头复选框列是否已经初始化。
     *  @ignore
     */
    me._isInitCheckBox = false;
    
    /**
     *此变量用来标示clearEditor方法是否在调用中。
     *@ignore
     */
    var _clearEditoring = false;

    /**
     *此变量用来标示DataGrid是否在销毁中。
     *@ignore
     */
    var _disposing = false;
    
    /**
     * 判断是否有元数据。
     * @ignore
     */
    var hasMeta = false;
    
    var _loadCallBack = null;
    
    var $titleDiv;
    
    /**
	 * @ignore
	 * 用来记录调用setItems时传入的数据。 
	 */
	var itemsData = [];
	
	/**
	 * @ignore
	 * 用来记录原始设置的lazyRenderSize。 
	 */
	var _lazyRenderSize = 50;
    
    /**
     * 在初始化列时用来控制隐藏和显示列的条件对象
     * resizeWidth用来标识是否调用过resizeColumns方法 
     * setItems用来标识是否调用过setItems方法 
     */
    var condition = {resizeWidth:false,setItems:false};
    /**
     * @ignore
     * 临时列名称
     */
    me._tempColumnName = "__temp_Column_rnd__";
    
    base.init = me.init;
    me.init = function()
    {
    	if($.isIE67()) {
    		if(me.width == "auto") me.width = null;
    		if(me.height == "100%") me.height = null;
    		me._tempColumnName = "temp_Column_rnd__";
    	}
    	
        base.init();
        me._init(); 
        me.setEnabled(me.enabled);
    };
    
    /**
     * @ignore
     */
    me._createItem = function(p_item)
    {
    	if(me.clearEditor()===false)
    	{
    	   return null;
    	}
        var item = null;
        if ($.isPlainObject(p_item))
        {
            item = new mx.datacontrols.DataGridItem(
            {
                owner: me,
                values: p_item
            });
        }
        else if ($instanceOf(item, mx.datacontrols.DataGridItem))
        {
            item = p_item;
            item.owner = me;
        }
        if ($notEmpty(item) && !item.initialized)
        {
            item.init();
        }
		
		if (!me.enabled)
        {
        	item.setEnabled(me.enabled);
        }
		
        return item;
    };
    
    /**
     * 向 {@link mx.datacontainers.EntityContainer} 请求添加一行数据，成功后再调用 {@link me._appendItem} 方法。
     * 
     * @param p_item 一个 JSON 对象（如 { name:"bruce", value:"lee" }，“name”和“value”为列（{@link mx.datacontrols.DataGridColumn}
     *            类型）的 {@link mx.datacontrols.DataGridColumn.name} 字段值）。
     */
    me.appendItem = function(p_item)
    {
    	me.clearEditor();
    	if (me.entityContainer && me.entityContainer.editingItem != null)
    		me.entityContainer.editingItem = null;
    	//如果p_item没有定义，说明是新增。
    	if(p_item == undefined)
    	{
    	   p_item = me.getItemDefaultData();
    	}
        if ($isArray(p_item))
        {
            for ( var i = 0; i < p_item.length; i++)
            {
                if ($notEmpty(me.entityContainer))
                {
                    me.entityContainer.create(p_item[i]);
                }
                else
                {
                    me._appendItem(p_item[i]);
                }
            }
        }
        else
        {
            if ($notEmpty(me.entityContainer))
            {
                me.entityContainer.create(p_item);
            }
            else
            {
                me._appendItem(p_item);
            }
        }
    };
    
    /**
     * @ignore
     * 向 {@link mx.datacontrols.DataGrid} 的数据项列表（{@link items} 集合）添加数据项，并返回该 {@link mx.datacontrols.DataGridItem} 对象。
     * 如果创建失败，则不返回{@link mx.datacontrols.DataGridItem} 对象。
     * @param p_item
     *            一个 JSON 对象（如 { name:"bruce", value:"lee" }，“name”和“value”为列（{@link mx.datacontrols.DataGridColumn}
     *            类型）的 {@link mx.datacontrols.DataGridColumn.name} 字段值）或一个
     *            {@link mx.datacontrols.DataGridItem} 对象。
     */
    me._appendItem = function(p_item)
    {
        var item = me._createItem(p_item);
        if(item == null)
        {
            return;
        }
        
        if(me._synItem(item))
        {
            return;
        }
        me.items.add(item);
        me.$bodyTable.append(item.$e);
        if(me.allowInterlacedRow && me.items.length % 2 == 0)
        {
            item.$e.addClass("even");
        }
        
        if (me.displayRowNumber)
        {
            item.$e.find("td#rownumber").text(me._getRowNumber(me.items.length));
            item.$e.find("td#rownumber").attr("title",me._getRowNumber(me.items.length));
        }

        if (me.autoSelect && me.selection == null)
        {
            me.selectNextItem();
        }
       
        var args = {"item": item};
        me.trigger("itemcreated", args);
        
        if (!me.lazyRender)
        {
        	_refreshPageNaviBar();
            _resetCheckAllStatus();
    		_resizeBodyScroll();
        }
        
        return item;
    };
    
    /**
     * @ignore
     * 同步item中的数据到数据源。
     */
    me._synItem = function(p_item)
    {
         //如果主键未定义，则创建通过数据源创建数据，这里只需要把数据同步到数据源既可
        if($isEmpty(p_item.values[me.primaryKey]))
		{
			if(me.hasPrimaryKey){
				me.entityContainer.create(p_item.values,{triggerEvent:false});
				//这里需要对item重新初始化，因为此时的item生成的tr中没有id
				if(p_item.$e.data("item")){
					p_item.off();
					p_item.$e.off();
					p_item.$e.unbind();
					p_item.$e.empty().remove();					
					p_item.$e.removeData("item");
				}
				p_item.init();
			}
		}
		else
		{
			//如果数据源已有数据，需要做合并操作
			var entity = me.entityContainer.getEntityByKey(p_item.values[me.primaryKey]);
			if (!$isEmpty(entity) )
			{
				for(var name in p_item.values)
				{
					if(p_item.values[name] !== entity[name])
					{
					    var value = $clone(p_item.values[name]);
				        p_item.setValue(name,value);
					}	
				}
			}
			else
			{
				 me.entityContainer.create(p_item.values,{triggerEvent:false});
				 if(p_item.$e.data("item")){
					p_item.off();
					p_item.$e.off();
					p_item.$e.unbind();
					p_item.$e.empty().remove();					
					p_item.$e.removeData("item");
				}
				 p_item.init();
			}
		}
        return false;
    }
    
   
    /**
     * 在指定行后插入一个数据项,并返回数据实体。
     * @param p_row 一个数字，表示指定行的行号。
     * @param p_item
     *            一个 JSON 对象（如 { name:"bruce", value:"lee" }，“name”和“value”为列（{@link mx.datacontrols.DataGridColumn}
     *            类型）的 {@link mx.datacontrols.DataGridColumn.name} 字段值）
     */
    me.insertItem = function(p_row, p_item)
    {
        var entityContainer = me.entityContainer;
        var entity = null;
        if ($notEmpty(entityContainer) && $isNumber(p_row))
        {
            entity = entityContainer.create(p_item, {rowNumber: p_row})
        }
        return entity;
    };
    
    /**
     * @ignore
     */
    me._insertItem = function(p_row, p_item)
    {
        var argLength = arguments.length;
        var row = 1;
        var item = null;
        var items = me.items;
        var length = items.length;
        
        var setRow = function(p_row)
        {
            if (length <= 0 || p_row < 1)            
                row = 1;
            else if (p_row > length)
                row = length + 1;
            else 
                row = p_row;
        };
        switch (argLength)
        {
		    case 1:
		        if ($isObject(p_row))
		        {
		            item = me._createItem(p_row);
		        }
		        break;
		    case 2:
		        if ($isNumber(p_row) && $isObject(p_item))
		        {
		            setRow(p_row);
		            item = me._createItem(p_item);
		        }
		        break;
		    default:
		        break;
        }
		
        if ($notEmpty(item))
		{
		    item = me.__insertItem(row, item);
		    me.selectItem(item);
		}
          
        _resetCheckAllStatus();
        _resizeBodyScroll();
        return item;
    }
    
    /**
     * @ignore
     */
    me.__insertItem = function(p_row, p_item)
    {
        var item = me.items[p_row - 1];
        var items = me.items;
        var length = items.length; 
        var row = p_row;
        for (var i = length - 1; i >= row - 1; i--)
        {
            me.items[i + 1] = me.items[i];
        }
        me.items[row - 1] = p_item;
        if ($isEmpty(item))
        {
             me.$bodyTable.append(p_item.$e);
        }
        else
        {
             item.$e.before(p_item.$e);
        }
        
        if (me.lazyRender)
        {
        	var _pageIndexTemp = _pageIndex;
        	if (_pageIndexArr && _pageIndexArr.length > 0)
			{
				_pageIndexTemp = _pageIndexArr[0];
			}
        	var rowNumber = (_pageIndexTemp + (_isPageBottom ? 1 : 2)) *  me.lazyRenderSize - me.items.length + (_isPageBottom ? _lastPageSize : 0) + 1;
        	if(me.allowInterlacedRow && rowNumber % 2 == 0)
            {
        		p_item.$e.addClass("even");
            }
        	
        	if (me.displayRowNumber)
            {
            	p_item.$e.find("td#rownumber").text(me._getRowNumber(rowNumber));
            	p_item.$e.find("td#rownumber").attr("title",me._getRowNumber(rowNumber));
            }        	
        }
        else
        {
        	_refreshItems();
        }
        
        return p_item;
    };
    
    var _removeCallBack = null;
    /**
     * 向 {@link mx.datacontainers.EntityContainer} 请求删除数据，成功后再调用 {@link removeItem} 方法。
     * 
     * @param p_items  一个数组，指定要删除的数据对象，数组可以由字符串 ID 组成，ID 表示所要删除的数据的主键值。
     *                 也可以由 {@link mx.datacontrols.DataGridItem} 类型的对象组成，或是由表示数据索引的数字。
     * @param [p_callback = null] 一个回调的函数。
     * 
     * @param [p_isReload = true] 设置一个 Boolean 值，该参数表示删除成功后是否刷新当前页数据。
     * 
     * @example 以下是为 {@link mx.datacontrols.DataGrid} 删除一组数据的示例。 
     * <code language="JavaScript">
     * 
     * //用索引删除数据
     * dataGrid.removeItems([1,2,3]);
     * 
     * //用主键删除数据
     * var checkedIDs = dataGrid.getCheckedIDs();
     * dataGrid.removeItems(checkedIDs); 
     * 
     * //用选中的数据项删除数据
     * var checkedItems = dataGrid.getCheckedItems();
     * dataGrid.removeItems(checkedItems);
     * </code>
     */
    var _isReload = true;

    me.removeItems = function(p_items, p_callback, p_isReload)
    {
    	var argSize = arguments.length;
   		
    	switch (argSize)
    	{
    		case 3:
    			if ($isBoolean(p_isReload))
    				_isReload = p_isReload;
    		case 2:
    			if ($isFunction(p_callback))
    				_removeCallBack = p_callback;
    			else if ($isBoolean(p_callback))
    				_isReload = p_callback;
    		case 1:
    			if ($isArray(p_items))
    			{
    				break;
    			}
    			else
    			{
    				_isReload = true;
    				_removeCallBack = null;
    				return;
    			}
    		default:
    			return;
    	}
        me.clearEditor();
        
        var IDs = [];
        var indexs = [];
        for (var i = 0; i < p_items.length; i++)
        {
        	if ($instanceOf(p_items[i],mx.datacontrols.DataGridItem))
            {
                IDs.add(p_items[i].values[me.primaryKey]);
            }
            else if ($.isPlainObject(p_items[i]))
            {
                IDs.add(p_items[i][me.primaryKey]);
            }
            else if ($isString(p_items[i]))
            {
                IDs.add(p_items[i]);
            }
            else if ($isNumber(p_items[i]))
            {
                indexs.add(p_items[i]);
            }
            else
            {
                IDs.add(p_items[i].id);
            }
        }
        if ($notEmpty(me.entityContainer))
        {
            if (IDs.length > 0)
            {
                _requestEntityContainer(IDs, "remove");
            }
            
            if (indexs.length > 0)
            {
                _requestEntityContainer(indexs, "removeByIndexs");
            }
        }
    };
    
    /**
     * 向 {@link mx.datacontainers.EntityContainer} 请求删除一行数据，成功后再调用 {@link removeItem} 方法。
     * 
     * @param p_item  可以是一个字符串主键，或是数字索引，也可以是 {@link mx.datacontrols.DataGridItem} 类型的对象，指定要删除的数据对象。
     * @param [p_callback = null] 一个回调的函数。
     * 
     * @example 以下是为 {@link mx.datacontrols.DataGrid} 删除一行数据的示例。 
     * <code language="JavaScript">
     * //用索引删除数据
     * dataGrid.removeItem(1);
     * 
     * //用主键删除数据
     * dataGrid.removeItem("id_123"); 
     * 
     * //用选中的数据项删除数据
     * dataGrid.removeItem(dataGrid.selection);
     * </code>
     */
    me.removeItem = function(p_item, p_callback)
    {
        if($isEmpty(p_item) || $isFunction(p_item))
        {
            return;
        }
        
        me.removeItems([p_item], p_callback);    
    };
    
    
    var _saveCallBack = null;
    /**
     * 向 {@link mx.datacontainers.EntityContainer} 请求保存数据。
     * 
     * @param [p_data = null] 一个 JSON 对象，表示用户自定义需要保存的参数。
     * @param [p_callback = null] 一个回调的函数。
     * {@exculde mx.datacontrols.ScrollLoadGrid}
     */
    me.save = function(p_data, p_callback)
    {
    	// 编辑器未通过校验，不保存。
        var _validate = me.clearEditor();
        if (_validate === false) return;
        var data = null;
        
        if ($notEmpty(p_data) && $isFunction(p_data))
        {
            p_callback = p_data;
            data = null;
        }
        else if ($notEmpty(p_data) && $.isPlainObject(p_data))
        {
            data = p_data;
        }
        
        if ($notEmpty(p_callback))
        {
            _saveCallBack = p_callback; 
        }
        else
        {
            _saveCallBack = null;
        }
        
        if ($notEmpty(me.entityContainer))
        {
            _requestEntityContainer(data, "save");
        }
    };
    
    
    /**
     * 向 {@link mx.datacontainers.EntityContainer} 加载数据。
     * 
     * @param [p_data = null] 一个 JSON 对象，表示用户自定义需要保存的参数。
     * @param [p_callback = null] 一个回调的函数。
     */
    me.load = function(p_data, p_callback)
    {
    	if ($isEmpty(me.entityContainer))
        {
            mx.showerror(new Error(mx.err("LOADING",["EntityContainer is Undefined"])));
            return ;
            
        }
        else if ($isEmpty(me.entityContainer.baseUrl) && "remote" == me.entityContainer.type)
        {
            mx.showerror(new Error(mx.err("LOADING",["EntityContainer BaseUrl is Undefined"])));
            return ;
        }
        
        
        var args = {cancel : false};
        me.trigger("loading", args);
        if (args.cancel) return;
        
        var data = null;
        
        if ($notEmpty(p_data) && $isFunction(p_data))
        {
            p_callback = p_data;
        }
        else if ($notEmpty(p_data) && $.isPlainObject(p_data))
        {
            data = p_data;
        }
        
        
        if ($notEmpty(p_callback))
        {
            _loadCallBack = p_callback; 
        }
        else
        {
            _loadCallBack = null;
        }

        var args = {metaParams:null, dataParams:null};
        if($notEmpty(data))
        {
            if ($isEmpty(data.metaParams) && $isEmpty(data.dataParams))
            {
                args.dataParams = data;
            }
            else
            {
                args = $.extend(args, data);
            }
        }

        if (me.allowPaging)
        {
            var pageSize = me.pageSize;
            
            var page = {pageIndex:me.pageIndex, pageSize:pageSize};
            args.dataParams = $.extend(page, args.dataParams);
            
            if (args.dataParams.pageIndex && me.pageIndex != args.dataParams.pageIndex)
        	{
            	me.pageIndex = args.dataParams.pageIndex;
        	}
            
            if (args.dataParams.pageSize && me.pageSize != args.dataParams.pageSize)
        	{
            	if (!me.lazyRender)
            	{
            		me.pageSize = args.dataParams.pageSize;
            		me.pageNaviBar.pageSize = me.pageSize;
            	}
        	}
        }
        
        if (me.lazyRender && me.entityContainer.type == "remote")
        {
        	if(me.allowPaging)
        	{
        		if(me.pageSize < _lazyRenderSize || me.pageSize % _lazyRenderSize != 0)
        		{
        			me.lazyRenderSize = me.pageSize;
        		}
        		else
        		{
        			me.lazyRenderSize = _lazyRenderSize;
        		}
        	}
        	var page = {pageIndex: (me.pageIndex - 1) * parseInt(me.pageSize / me.lazyRenderSize) + (_pageIndex < 1 ? 1 : _pageIndex), pageSize: me.lazyRenderSize};
            args.dataParams = $.extend(args.dataParams,page);
        }
        else if(me.lazyRender && me.entityContainer.type == "local")
        {
        	me.entityContainer.enableLocalMask = true;
        }
        
        var filterParam = _getFilterParam();
        if ($notEmpty(me.searchBox) && !me.searchBox.allowSqlKeyQuery && me.searchBox._isSqlInject){
        	return;
        }
        if ($notEmpty(filterParam))
        {
            var filter = { filter: filterParam};
            args.dataParams = $.extend(filter, args.dataParams);
        }
        
        if ($notEmpty(me.sorter))
        {
            var sorter = {sorter:me.sorter};
            args.dataParams = $.extend(sorter, args.dataParams);
        }
        
        if ($notEmpty(me._columns))
        {
            var columnsFilter = "";
            var columnNames = me._getColunmsNames();
            columnsFilter = columnNames.join(",");
            var columns1 = {columns:columnsFilter};
            var columns2 = {columns:columnsFilter};
            args.metaParams = $.extend(columns1, args.metaParams);
            args.dataParams = $.extend(columns2, args.dataParams);
        }
        
        _editingCloumnName = null;
    	_editingItem = null;
    	_editing = false;
    	me.activeEditor = null;
    	_columnEditors = new mx.types.HashMap();
        
        _requestEntityContainer(args);
        me.$e.trigger("resize");
    };
    
    /**
     * @ignore
     * 获取表格的列名集合 
     */
    me._getColunmsNames = function()
    {
    	var columnNames = []
    	for (var i = 0; i < me._columns.length; i++)
        {
            var column = me._columns[i];
            processColumn(columnNames,column);
        }
    	return columnNames;
    }
    
    /**
     * 设置 {@link enableCellTip} 的字段值。
     * 
     * @param p_enableCellTip 一个 Boolean 值，表示是否要显示表格cell的title属性。
     */
    me.setEnableCellTip = function(p_enableCellTip)
    {
    	me.enableCellTip = p_enableCellTip;
    	var $bodyTableCells = me.$bodyTable.find("td");
    	var $bodyTableCell;
    	if(p_enableCellTip)
    	{
    		for(var i = 0; i < $bodyTableCells.length; i++)
    		{
    			$bodyTableCell = $($bodyTableCells[i]);
    			
    			if ($notEmpty($bodyTableCell.text()))
				{
    				if ($bodyTableCell.text().length > me.maxTitleLength)
    	        	{
        				me._richTextCelltip($bodyTableCells[i]);
    	        	}
        			else
        			{
        				$bodyTableCell.attr("title",$bodyTableCell.text());		
        			}	
				}
    		}
    	}
    	else
    	{
    		me.$bodyTable.find("td").removeAttr("title");
    		me.$bodyTable.find("td").unbind("mouseenter");
    		me.$bodyTable.find("td").unbind("mouseleave");
    		if ($notEmpty($titleDiv))
    		{
    			$titleDiv.empty();
    		}
    	}
    };
    
    /**
     * 设置 {@link enabled} 字段的值。
     */
    me.setEnabled = function(p_enabled)
    {    
    	if (!me.$bodyTable) return;
    	me.enabled = p_enabled;
        me.$e.toggleClass("disabled", !p_enabled);
        me.$bodyTable.attr("disabled", !p_enabled);
        
        if (typeof (p_enabled) != "undefined")
        {
        	//设置临时列样式，由于css中使用id选择器优先级较高，此处使用内联样式
            if(me.$bodyTable)
            {
            	if(p_enabled)
                	me.$bodyTable.find("#"+me._tempColumnName).css({"background-color":"","border":""});
                else
                	me.$bodyTable.find("#"+me._tempColumnName).css({"background-color":"#F0F0F0","border":"1px solid #F0F0F0"});
            }
        }
		
		if($isArray(me.items))
        {
             for (var i=0; i < me.items.length; i++)
             {
                  me.items[i].setEnabled(me.enabled);
             }
        }
    };
    
    /**
     * @ignore
     */
    me._richTextCelltip = function(p_cell)
    {
		var $p_cell = $(p_cell);
    	$p_cell.mouseenter(
			 function (e) {
				 var text = $p_cell.text();
				 $p_cell.toolTip({
					maxWidth:"600px",
		       		activation:"hover",
		       		keepAlive:true,
		       		isCellTip:true
		       	}).data("toolTip").update($p_cell.text());
		
			 }).mouseleave(function(e){
				 $p_cell.toolTip().data("toolTip").hide()
			 });
    };
    
    /**
     * 设置 {@link entityContainer} 的字段值。
     * 
     * @param p_entityContainer 一个 {@link mx.datacontainers.EntityContainer} 对象（通常是 {@link mx.datacontainers.GridEntityContainer} 类型），表示表单的数据源。
     */
    me.setEntityContainer = function(p_entityContainer)
    {
        if ($notEmpty(p_entityContainer))
        {
            if ($notEmpty(me.entityContainer))
            {
            	me.entityContainer.off("loading", _entityContainer_loading);
                me.entityContainer.off("load", _entityContainer_load);
                me.entityContainer.off("changing", _entityContainer_changing);
                me.entityContainer.off("changed", _entityContainer_changed);
                me.entityContainer.off("creating", _entityContainer_creating);
                me.entityContainer.off("created", _entityContainer_created);
                me.entityContainer.off("deleted", _entityContainer_deleted);
                me.entityContainer.off("saving", _entityContainer_saving);
                me.entityContainer.off("saved", _entityContainer_saved);
                me.entityContainer.off("validate", _entityContainer_validate);
                me.entityContainer.off("error", _entityContainer_error);
            }
            me.entityContainer = p_entityContainer;
            if($notEmpty(p_entityContainer.primaryKey) && p_entityContainer.primaryKey != "id")
            {
                me.primaryKey = p_entityContainer.primaryKey;
            }
            else
            {
            	p_entityContainer.primaryKey = me.primaryKey;
            }
            
            me.entityContainer.on("loading", _entityContainer_loading);
            me.entityContainer.on("load", _entityContainer_load);
            me.entityContainer.on("changing", _entityContainer_changing);
            me.entityContainer.on("changed", _entityContainer_changed);
            me.entityContainer.on("creating", _entityContainer_creating);
            me.entityContainer.on("created", _entityContainer_created);
            me.entityContainer.on("deleted", _entityContainer_deleted);
            me.entityContainer.on("saving", _entityContainer_saving);
            me.entityContainer.on("saved", _entityContainer_saved);
            me.entityContainer.on("validate", _entityContainer_validate);
            me.entityContainer.on("error", _entityContainer_error);
        }
    };
    
   

    /**
     * 设置 {@link displayHead} 的字段值。
     * 
     * @param p_displayHead 一个 Boolean 值，表示是否要显示表格的列头。
     */
    me.setDisplayHead = function(p_displayHead)
    {
        me.displayHead = p_displayHead;
        if (p_displayHead)
        {
        	me.$body.css("borderTopColor", ""); 
        	me.$body.css("borderTopStyle", "");
        	me.$body.css("borderTopWidth", "");
            me.$head.show();
            me.$("#upRightBg").show();
            if(_$toggleShowBtn!=null)
            {
                _$toggleShowBtn.show();
            }
        }
        else
        {
        	me.$body.css("borderTopColor", me.$head.css("borderTopColor")); 
        	me.$body.css("borderTopStyle", me.$head.css("borderTopStyle"));
        	me.$body.css("borderTopWidth", me.$head.css("borderTopWidth"));
        	me.$head.css("display","none"); 
        	me.$("#upRightBg").hide();
        	if(_$toggleShowBtn!=null)
        	{
        	    _$toggleShowBtn.hide();
        	}
        	
        }
        me._setBodyTop();
    };
    
    /**
     * 设置 {@link displayColSplitLine} 的字段值。
     *  
     * @param p_displayColSplitLine 一个 Boolean 值，表示是否要显示列的分割线。
     */
    me.setDisplayColSplitLine = function(p_displayColSplitLine)
    {
        me.displayColSplitLine = p_displayColSplitLine;
        me.$e.toggleClass("hideColSplitLine", !me.displayColSplitLine);
    };
    

    /**
     * 设置 {@link displayStatisticRow} 的字段值。
     * 
     * @param p_displayStatisticRow 一个 Boolean 值，表示是否要显示统计行。
     */
    me.setDisplayStatisticRow = function(p_displayStatisticRow)
    {
        me.displayStatisticRow = p_displayStatisticRow;
        if(!me.$statisticRow)
        {
            me._initStatisticRow();
        }
        if (me.displayStatisticRow)
        {
            me.$statisticRow.show();
        }
        else
        {
            me.$statisticRow.hide();
        }
    };
    
    /**
     * 设置 {@link displayRowNumber} 的字段值。
     * 此方法只在构造参数中高displayRowNumber为true时有效
     * @param p_displayRowNumber 一个 Boolean 值，表示是否要要在表格第一列显示行号。
     */
    me.setDisplayRowNumber = function(p_displayRowNumber)
    {
        me.displayRowNumber = p_displayRowNumber;
        //初始化行号表头
        me._initRowNumber(); 
        //如果行号表头未初始化，直接返回
        if(!me._isInitRowNumber)
        {
            return;
        }
        
        if($isArray(me.items))
        {
           //_hasCreate用来判断是否有新的行号单元格被创建，如果有，需要刷新行号
           var _hasCreate = false;
           for(var i=0;i<me.items.length;i++)
	       {
	           var item = me.items[i];
	           if(item!=null && item._initRowNumberCell != undefined)
	           {
	                _hasCreate =  item._initRowNumberCell();
	           }
	       }
	       if(_hasCreate)
	       {
	       	 //刷新行号
	       	  _refreshItems();
	       } 
        }     
        if (me.displayRowNumber)
        {
            me.$e.addClass("rowNumberDataGrid");
            me.$headTable.find("tr>td#rownumber").show();
            me.$body.find("colgroup>col#rownumber").show();
            if(!$.isIE67())
            {
            	me.$body.find("tr>td#rownumber").show();
            }
            else
            {
                me.$body.find("tr>td#rownumber").css("border-right","1px");
            }       
        }
        else
        {
            me.$e.removeClass("rowNumberDataGrid");
            me.$headTable.find("tr>td#rownumber").hide();
            me.$body.find("colgroup>col#rownumber").hide();
            if(!$.isIE67())
            {
            	me.$body.find("tr>td#rownumber").hide();
            }
            else
            {
               me.$body.find("tr>td#rownumber").css("border-right","0px");
            }
        } 
    };
    
    /**
     * 设置 {@link displayCheckBox} 的字段值。
     * 
     * @param p_displayCheckBox 一个 Boolean 值，表示是否要要在表格第一列显示 CheckBox 控件。
     */
    me.setDisplayCheckBox = function(p_displayCheckBox)
    {
        me.displayCheckBox = p_displayCheckBox;
        //初始化复选框表头
        me._initCheckBox();
        //判断复选框表头是否已经初始化，如果没有初始化，直接返回
        if(!me._isInitCheckBox)
        {
            return;
        }
        //设置数据行上的复选框
        if($isArray(me.items))
        {
           for(var i=0;i<me.items.length;i++)
	       {
	           var item = me.items[i];
	           if(item!=null && item._initCheckBoxCell != undefined)
	           {
	                item._initCheckBoxCell();
	           }
	       }
        } 
        
        if (me.displayCheckBox)
        {
              me.$e.addClass("checkDataGrid");
              me.$headTable.find("tr>td#checkbox").show();
              me.$body.find("colgroup>col#checkbox").show();
              if(!$.isIE67())
              {
		           me.$body.find("tr>td#checkbox").show();
              }
              else
              {
                   me.$body.find("tr>td#checkbox").css("border-right","1px");
              }
        }
        else
        {
            me.$e.removeClass("checkDataGrid");
            me.$headTable.find("tr>td#checkbox").hide();
            me.$body.find("colgroup>col#checkbox").hide();
        	// 解决IE6/7下colgroup，引起的双倍数量的列被隐藏的问题
        	 if(!$.isIE67())
        	 {
			      me.$body.find("tr>td#checkbox").hide();
             }
             else
             {
                 me.$body.find("tr>td#checkbox").css("border-right","0px");
             }   
        }
    };

    /**
     * @ignore
     * 向 {@link images} 集合中添加图片。
     * 
     * @param p_image
     *            一个 JSON 对象（如 { name: "role", value: "role" }）。
     */
    me.appendImage = function(p_image)
    {
        if (typeof (me.images[p_image.name]) != "undefined")
        {
            throw new Error(mx.err("DUPLICATED_ITEM",
            [ p_image.name ]));
        }

        if (p_image != null && p_image.name != null)
        {
            me.images.add(p_image);
            me.images[p_image.name] = p_image;
        }
    };

    /**
     * @ignore
     * 向 {@link images} 集合中添加一组图片。
     * 
     * @param p_images
     *            一个数组，包含一组图片。
     */
    me.appendImages = function(p_images)
    {
        if ($isArray(p_images))
        {
            for ( var i = 0; i < p_images.length; i++)
            {
                me.appendImage(p_images[i]);
            }
        }
    };

    /**
     * @ignore
     * 设置 {@link images} 字段的值。该方法首先会清空 {@link images} 集合的值。
     * 
     * @param p_images
     *            一个数组，包含一组图片。
     */
    me.setImages = function(p_images)
    {
        me.clearImages();
        me.appendImages(p_images);
    };

    /**
     * @ignore
     * 清空 {@link images} 集合。
     */
    me.clearImages = function()
    {
        while (me.images.length > 0)
        {
            me.images[0].remove();
            delete me.images[me.images[0].name];
        }
    };

    /**
     * 向 {@link mx.datacontrols.DataGrid} 的 {@link columns} 集合中添加一个列，并返回表示该列的
     * {@link mx.datacontrols.DataGridColumn} 对象。
     * 
     * @overload function(p_column)
     * 
     * @param p_column
     *            一个 {@link mx.datacontrols.DataGridColumn} 对象，表示要添加的列。
     * @param p_name
     *            一个 JSON 对象（如 { name:"class", text:"类", dataType:"string",
     *            width:150, align:"center" }），表示
     *            {@link mx.datacontrols.DataGridColumn} 的一组属性值；或一个字符串，表示
     *            {@link mx.datacontrols.DataGridColumn} 对象的
     *            {@link mx.datacontrols.DataGridColumn.name} 字段的值。
     * @param [p_text]
     *            一个字符串，表示 {@link mx.datacontrols.DataGridColumn} 对象的
     *            {@link mx.datacontrols.DataGridColumn.text} 字段的值。
     * @param [p_width]
     *            一个数字（如 500）或字符串（如“500px”或“50%”），表示列的宽度。
     * @param [p_align]
     *            一个字符串，表示列中文本的对齐方式。可以为“left”左对齐、“right”右对齐、“center”居中对齐、“justify”两端对齐。
     * 
     * @example 以下是为 {@link mx.datacontrols.DataGrid} 添加一个列的示例。 
     * <code language="JavaScript">
     *    dataGrid.appendColumn("gender", "性别", "150", "center");
     *    dataGrid.appendColumn({ name: "gender", caption: "性别" });
     *    dataGrid.appendColumn(column); // column 为一个 DataGridColumn 对象
     * </code>
     */
    me.appendColumn = function(p_name, p_caption, p_width, p_align)
    {        
    	var _p_name = $clone(p_name);
    	var _p_caption = $clone(p_caption);
    	var _p_width = $clone(p_width);
    	var _p_align = $clone(p_align);
    	
        var column = me._createColumn(p_name, p_caption, p_width, p_align);
        column.owner = me;
        
        me._appendColumn(column);
        
        // 单独调用appendColumn时需将列信息添加到me._columns中，否则移动列时会导致在me._columns中到不到该列信息
        var _column = null;
        if ($isObject(_p_name))
        {
        	if ($.isPlainObject(_p_name))
            {
        		_column = _p_name;
            }
        	else if ($instanceOf(_p_name, mx.datacontrols.DataGridColumn))
        	{
        		_column = 
                {
                    name : _p_name.name,
                    caption : _p_name.caption,
                    width : _p_name.width,
                    align : _p_name.align
                };
        	}
        }
        else
        {
        	_column = 
            {
                name : _p_name,
                caption : _p_caption,
                width : _p_width,
                align : _p_align
            };
        }
        
        var _hasColumn = false;
        for (var i = 0; i < me._columns.length; i++)
        {
            if(_column.name == me._columns[i].name)
            {
            	_hasColumn = true;
            }
        }
        if (!_hasColumn && _column.name != me._tempColumnName)
        {
        	 me._columns.add(_column);
        }
        
        if (me.usePercentage && me.$e.parent().length != 0)
        {
        	if(column.widthPercentage == undefined)
			  {
        		column.widthPercentage = parseInt(column.initWidth)/100;
			  }
        	var width = me.$e.width();
        	var columnWidth = width *  column.widthPercentage;
        	column.setWidth(columnWidth);
        }
        return column;
    };
    
    /**
     * 在指定位置插入列。
     * @param p_position 表示插入的位置。通常是 {@link mx.datacontrols.DataGridColumn} 对象的索引。
     * @param p_column 表示待插入的列，是一个 {@link mx.datacontrols.DataGridColumn} 对象 或者 JSON对象。
     * @param p_direction 一个 Boolean 值，表示插入的方向，为true表示后插入，为false表示前插入。
     */
    me.insertColumn = function(p_position, p_column, p_direction)
    {
    	var p_columnClone = $clone(p_column);
    	
    	if (me.columns[p_column.name] != undefined)
    	{
    		throw new Error( mx.err("DUPLICATED_ITEM", [ p_column.name ]) );
    	}
    	
        var length = $notEmpty(me.columns[me._tempColumnName]) ? me.columns.length: me.columns.length - 1;
        var argsLength = arguments.length;
        var position = 0;
        var column = null;
        var direction = true;
        var setPosition = function(p_position)
        {
            if (length <= 0 || p_position < 0)  
                position = 0;
            else if (p_position >= length)
                position = length - 1;
            else
                position = p_position;
        };
        var setColumn = function(p_column)
        {
            if ($.isPlainObject(p_column) || $instanceOf(p_column, mx.datacontrols.DataGridColumn))
            {
                column = me._createColumn(p_column);
            }
        };
        switch (argsLength)
        {
            case 1:
                if ($isObject(p_position))
                {
                    setColumn(p_position)
                }
                break;
            case 2:
                if ($isNumber(p_position) && $isObject(p_column))
                {
                    setPosition(p_position);  
                    setColumn(p_column);
                }
                break;
            case 3:
                if ($isNumber(p_position) && $isObject(p_column) && $isBoolean(p_direction))
                {
                    setPosition(p_position);  
                    setColumn(p_column);
                    direction = p_direction;
                }
                break;
            default:
                break;
        }

        if ($notEmpty(column))
        {
            column = me._insertColumn(position, column, direction);  
            if($isArray(me.items))
            {
                 for(var i=0;i<me.items.length;i++)
                 {
                      var item = me.items[i];
                      if($instanceOf(item,mx.datacontrols.DataGridItem))
                      {
                            item.setValue(column.name,column.value);
                            item.insertCell(column,p_position);
                      }
                 }
            }
        }
        
        var index = me.columns.indexOf(column);
        me._columns.insert(index , p_columnClone);
        return column;
    };
    
    
     /**
     * 在指定位置后插入列。
     * @param p_position 表示插入的位置。通常是 {@link mx.datacontrols.DataGridColumn} 对象的索引。
     * @param p_column 表示待插入的列，是一个 {@link mx.datacontrols.DataGridColumn} 对象 或者 JSON对象。
     */
    me.insertColumnAfter = function(p_position, p_column)
    {
        me.insertColumn(p_position, p_column, true);   
    };
    
     /**
     * 在指定位置前插入列。
     * @param p_position 表示插入的位置。通常是 {@link mx.datacontrols.DataGridColumn} 对象的索引。
     * @param p_column 表示待插入的列，是一个 {@link mx.datacontrols.DataGridColumn} 对象 或者 JSON对象。
     */
    me.insertColumnBefore = function(p_position,p_column)
    {
        me.insertColumn(p_position, p_column, false);   
    };
    
    /**
     * @ignore
     */
    me._insertColumn = function(p_position, p_column, p_direction)
    {
        me._configColumn(p_column);
        var pColumn = me.columns[p_position];
        var columns = me.columns;
        var length = columns.length;
        var index = ( p_direction && length > 0 ) ? p_position + 1: p_position;
        for (var i = length - 1; i >=　index; i--)
        {
            columns[i + 1] = columns[i];
        }
        columns[index] = p_column;
        columns[p_column.name] = p_column;
        if (p_direction)
        {
             p_column.$headCell.insertAfter(pColumn.$headCell);
             p_column.$bodyCol.insertAfter(pColumn.$bodyCol);
             if (me.displayStatisticRow)
             {
                p_column.$statisticCell.insertAfter(pColumn.$statisticCell);
             }
        }
        else
        {
             p_column.$headCell.insertBefore(pColumn.$headCell);
             p_column.$bodyCol.insertBefore(pColumn.$bodyCol);
             if (me.displayStatisticRow)
             {
                p_column.$statisticCell.insertBefore(pColumn.$statisticCell);
             }
        }     
        
        return p_column;
    };
    
    /**
     * @ignore
     */
    me._createColumn = function(p_name, p_caption, p_width, p_align)
    {
        if (typeof (me.columns[p_name]) != "undefined" || typeof (me.columns[p_name.name]) != "undefined")
        {
            throw new Error(mx.err("DUPLICATED_ITEM",
            [ $isString(p_name) ? p_name: p_name.name ]));
        }
        var column = null;
        if ($isObject(p_name))
        {
            if ($.isPlainObject(p_name))
            {
                p_name.owner = me;
                column = me._createInheritColumn(p_name);
            }
            else
            {
                column = p_name;
            }
        }
        else
        {
            column = me._createInheritColumn(
            {
                name : p_name,
                caption : p_caption,
                width : p_width,
                align : p_align,
                owner : me
            });
        }
        return column;
    };
    
    /**
     * @ignore
     */
    me._createInheritColumn = function(p_option)
    {
    	return new mx.datacontrols.DataGridColumn(p_option);
    }
    
    /**
     * @ignore
     */
    me._configColumn = function(p_column)
    {
         //调整列宽
        if(me.allowAdjusting)
        {
            var adjustCol_left = $("<span class='adjustCol_left'/>");
            var adjustCol_right = $("<span class='adjustCol_right'/>");
            p_column.$headCell.children("div").prepend(adjustCol_left);
            p_column.$headCell.children("div").append(adjustCol_right);
            adjustCol_left.on("mousedown", me._adjustColumn_mousedown);
            adjustCol_right.on("mousedown", me._adjustColumn_mousedown);
            adjustCol_left.on("click", me._adjustColumn_click);
            adjustCol_right.on("click", me._adjustColumn_click);
        }
        if(me.allowDraggingColumn || me.allowDraging)
        {
            p_column.$headCell.children("div").on("mousedown", _dragColumn_mousedown);
        }
        if(me.allowSorting)
        {
            var sortOrderSpan = $("<span id='sortOrderSpan'/>");
            p_column.$headCell.children("div").append(sortOrderSpan);
        }
        
        // 判断是否有重写 renderCell 方法
        if (p_column.isOverrideRenderCell)
        {
            me._hasOverrideRenderCell = true;
        }
    }
    
    /**
     * @ignore
     */
    me._appendColumn = function(p_column)
    {
        me._configColumn(p_column);
        if (me.columns[me._tempColumnName] != null)
        {
            var tepColumn = me.columns[me._tempColumnName];
            var length = me.columns.length;
            me.columns[length] = tepColumn;
            me.columns[length - 1] = p_column;
            
            p_column.$headCell.insertBefore(me.columns[me._tempColumnName].$headCell);
            p_column.$bodyCol.insertBefore(me.columns[me._tempColumnName].$bodyCol);
            if (me.displayStatisticRow)
            {
                p_column.$statisticCell.insertBefore(me.columns[me._tempColumnName].$statisticCell);
            }
        }
        else
        {
            me.columns.add(p_column);
            me.$headTable.find("> tbody > tr").append(p_column.$headCell);
            me.$bodyTable.children("colgroup").append(p_column.$bodyCol);
            if (me.displayStatisticRow)
            {
               me.$statisticTable.find("> tbody > tr").append(p_column.$statisticCell);
            }
        }
        me.columns[p_column.name] = p_column;
        
        if(p_column.name == me.primaryKey)
        {
        	p_column.readOnly = true;
        	if (!me.displayPrimaryKey)
        		p_column.setVisible(false);
        }
        
        if($isArray(me.items))
        {
             for(var i=0;i<me.items.length;i++)
             {
                  var item = me.items[i];
                  if($instanceOf(item,mx.datacontrols.DataGridItem))
                  {
                        item.setValue(p_column.name,p_column.value);
                        item.insertCell(p_column,me.columns.length);
                  }
             }
        }
    };
    
    /**
     * 向 {@link mx.datacontrols.DataGrid} 的 {@link columns} 集合中添加一组列。
     * 
     * @param p_columns
     *            一个数组，该数组包含了一组 {@link mx.datacontrols.DataGridColumn} 对象。
     * 
     * @example 以下是为 {@link mx.datacontrols.DataGrid} 添加一组
     *          {@link mx.datacontrols.DataGridColumn} 的示例。 <code>
     * dataGrid.appendColumns([
     *     { name: "gender", text: "性别" },
     *     { name: "age", text: "年龄" }
     * ]);       
     * </code>
     */    
    me.appendColumns = function(p_columns)
    {
        if (!$isArray(p_columns) || p_columns.length == 0)
        {
            return;
        }
        
        if (me.usePercentage && me.$e.parent().length == 0 
        		&& me.entityContainer.type == "remote" 
        			&& me.entityContainer.loadMeta)
        {
        	return;
        }
        
        for ( var i = 0; i < p_columns.length; i++)
        {
            if ($isString(p_columns[i]))
            {
                me.appendColumn(p_columns[i], p_columns[i]);
            }
            else if ($.isPlainObject(p_columns[i]) || $isObject(p_columns[i]))
            {
                me.appendColumn(p_columns[i]);
            }
        }
    };

    /**
     * 设置 {@link columns} 字段的值。该方法首先会清空 {@link columns} 集合。
     * 
     * @param p_columns 一个数组，该数组包含了一组 {@link mx.datacontrols.DataGridColumn} 对象。
     */
    me.setColumns = function(p_columns)	
    {
    	if(me.lazyRender && (_isPageBottom || _pageIndex > 1 || (_pageIndex <= 1 && _isScrollUp )))
    	{
    		return;
    	}
    	
    	if(!me.lazyRender || (me.lazyRender && _pageIndex == 1 && !_isPageBottom && !_isScrollUp))
    	{
    		 me.clearColumns();
    		 if(me.lazyRender && _pageIndex == 1 && !_isPageBottom && $notEmpty(me.$body))
    		 {
 				me.$body.scrollTop(0);
 			 }
    	}
    	
        me._columns = me._jsonArrayClone(p_columns);
        if (p_columns.length > 0)
        {
        	if(!me._hasTempColumn(p_columns))
        	{
        	    p_columns.add({
	                name: me._tempColumnName,
	                caption: " ",
	                readOnly:true,
	                width:"auto"
        	    });
        	}
        	if(me._isUsePercentage(p_columns))
        	{
        	     me._hideColumns(p_columns);
        	}
            me.appendColumns(me._jsonArrayClone(p_columns));
        }
        //初始化列宽百分比
        me._initColumnsPercentage();
        me._trigger_body_scroll();
    };
    
    /**
	 * @ignore
	 */
    me._trigger_body_scroll = function()
    {
    	me.$body.trigger("scroll");
    }
    
    /**
	 * @ignore
	 */
    me._isUsePercentage = function(p_columns)
    {
        if(me.usePercentage===true)
        {
            return true;  
        }
        else
        {
             for(var i=0;i<p_columns.length;i++)
             {
                   var col = p_columns[i];
                   if(col.columns){
                       var ret = me._isUsePercentage(col.columns);
                       if(ret==true)
                       {
                           return true;
                       }
                   }
                   else if($isString(col.width) && (col.width.indexOf("%") > -1))
                   {
                        return true;
                   }
             }
             return false;
        }
    }
    
     /**
     *  @ignore
     */
    me._hasTempColumn =  function(p_columns)
    {
        if($isArray(p_columns))
        {
              for(var i=0;i<p_columns.length;i++)
              {
                   var col = p_columns[i];
                   if(col!=null && col.name === me._tempColumnName)
                   {
                       return true;
                   }
              }
        }
        return false;
    }
    
    /**
     * @ignore
     */
    me._initColumnsPercentage = function()
    {
    	//如果使用百分比，则重新计算列的宽度,在使用百分比的情况下，
    	//设置列上width为数字xx或"xx%",都将以百分比来计算，设为"xxpx",将不处理，就按像素值来处理
        if (me.usePercentage)
        {
        	for (var i=0;i<me.columns.length;i++)
            {
        		var col = me.columns[i];
        	    setColumnPercentage(col);
            } 	
        }
        else  //在未设置usePercentage的情况下，将默认处理设置宽度为"xxx%"的列
        {
        	var needBindResize = false;
            for (var i=0;i<me.columns.length;i++)
            {
        		var col = me.columns[i];
        		setColumnPercentage(col);
        		if(col.widthPercentage)
        		{
        		    needBindResize = true;
        		}
            }
            if(needBindResize && me.$e)
            {
                me.$e.resize(me._resizeColumns);
            }
        }
        
        // 由于_initColumnsPercentage 会在加载前后多次调用，触发 resize 事件，导致me._resizeColumns的多次执行。
        // 因此全局变量 _preWidth 的值不准确， 每次 resize 前需要清空上一次记录的表格宽度。
       _preWidth = 0;
        me.$e.trigger('resize')
    }

    
    /**
     * @ignore 
     */
    function setColumnPercentage(p_column)
    {
    	if(me.usePercentage)
    	{
    	      if($isString(p_column.initWidth) && (p_column.initWidth.indexOf("px") > -1 || p_column.initWidth == "auto"))
			  {
					  return;
			  }
			  if(p_column.widthPercentage == undefined)
			  {
				  p_column.widthPercentage = parseInt(p_column.initWidth)/100;
			  }
    	}
    	else
    	{
    	      if($isString(p_column.initWidth) && (p_column.initWidth.indexOf("%") > -1))
    	      {
    	            if(p_column.widthPercentage == undefined)
					 {
						  p_column.widthPercentage = parseInt(p_column.initWidth)/100;
					 }
    	      }
    	}   
    }
    
    /**
     * @ignore
     */
    me._resizeColumns = function(event)
    {
    	 //IE8中，第一次取不到width的值，导致后续的计算错误
    	 var w = me.$e.width();
    	 if(w==0)
    	 {
    		return;
    	 }
        
         //如果当前的宽与上次的宽一样。则返回，加一个逻辑是为了解决在拖动列宽时，会重置列宽的问题
         if(w == _preWidth){
        	 return;
         }
         _preWidth = w;
    	 var width =  w-19;
		 var sub = 0;
		 if(me.displayRowNumber)
	     {
			 sub += me.rowNumberColWidth;
	     }
		 if(me.displayCheckBox)
		 {
			 sub += 25;
		 }
		 
		 width -= sub;
		 for(var i=0;i<me.columns.length;i++)
		 { 
			 var col = me.columns[i];
			 if( col.widthPercentage == undefined)
		     {
				 continue;
		     }
			 var colWidth = width * col.widthPercentage;
			 col.setWidth(parseInt(colWidth));
		 }
		 condition.resizeWidth = true;
         me._showColumns();
    }

    
    /**
     * 从 {@link columns} 集合中移除所有列。
     */
    me.clearColumns = function()
    {
    	me.clearItems();
    	while (me.columns.length > 0)
        {
            me.removeColumn(0);
        }
        
        me._columns = [];
        me._setBodyTop();
    };
    
    /**
     * @ignore
     */
    me._removeColumn = function(p_column)
    {
    	if ($notEmpty(p_column.$headCell))
        {
            p_column.$headCell.remove();
            p_column.$bodyCol.remove();
            if (typeof(p_column.$statisticCell) != "undefined" && p_column.$statisticCell.length > 0)
            {
                p_column.$statisticCell.remove();
            }
        }
        me.$body.find("td[id='" + p_column.name + "']").remove();
    }
    
    /**
     * 从 {@link columns} 集合中移除指定的 {@link mx.datacontrols.DataGridColumn} 对象。
     * 若要从列表中移除所有列，请使用 {@link clearColumns} 方法。
     * 
     * @param p_column
     *            一个数字（如 0），表示 {@link columns} 集合中列的序号；或者一个
     *            {@link mx.datacontrols.DataGridColumn} 对象。
     */
    me.removeColumn = function(p_column)
    {
        var column = null;            
        if($isNumber(p_column) || $isString(p_column))
        {
            column = me.columns[p_column];
        }        
        else if($isObject(p_column))
        {
            column = p_column;
        }
        if ($isEmpty(column))
        	return;
        //me._removeColumn(column)        
        for (var i = 0; i < me._columns.length; i++)
        {
            if(column.name == me._columns[i].name)
            {
				if(me._columns[i]&&me._columns[i].dispose){
					me._columns[i].dispose();
				}
                me._columns.removeAt(i);
                break;
            }
        }
        // 解决【XM-PMS2.0-598】
        if (me.$bodyTable) {
        	me.$bodyTable.find("#" + me._tempColumnName).width("auto");
        }
		
		delete me.columns[column.name];
        me.columns.remove(column);        
		column.dispose();
    };
    
    /**
     * 设置 {@link items} 字段的值。该方法首先会清空 {@link items} 集合。
     * 
     * @param p_items
     *            一个数组，该数组包含了一组 {@link mx.datacontrols.DataGridItem} 对象。
     */
    var _lastPageHeight = 0;
    var _tablebodyHeight = 0;
    var _lastPageSize = 0;
    me.setItems = function(p_items)
    {
    	if (!me.lazyRender ||(me.lazyRender && _pageIndex == 1 && !_isPageBottom && !_isScrollUp))
        {
    		itemsData = p_items;
        	index = 0;
        	me.clearItems();
			if (me.lazyRender && $notEmpty(me.$body) && _pageIndex == 1 && !_isPageBottom && !_isScrollUp)
			{
				p_items = getSubItems();
				me.$body.scrollTop(0);
			}
        }
    	
    	if (me.lazyRender && _isScrollUp)
    	{
    		if ($isArray(p_items))
            {
                for (var i = p_items.length -1; i >= 0; i--)
                {
                    me._insertItem(p_items[i]);
                }
            }
    	}
    	else
    	{
    		me._appendItems(p_items);
    	}
        
        if (me.lazyRender && !me.allowPaging && me.items.length/me.lazyRenderSize > 2)
    	{
        	if (_isScrollUp)
        	{
        		var l = me.items.length;
        		var size = l - me.lazyRenderSize - (_isPageBottom ? _lastPageSize : 0);
        		for (var j= l - 1; j >= size; j--)
                {
                    _removeItem(me.items[j]);
                }
        	}
        	else if (_pageIndex > 2)
        	{
        		for (var i = 0;i < me.lazyRenderSize; i++)
                {
                    _removeItem(0);
                }
        	}
    	}
        
        if (me.lazyRender && $notEmpty(me.$bodyTable))
        {
        	var height = 1;
        	if (me.allowPaging)
        	{
	        	//延迟加载同时允许分页时，使用temp_body_w撑开纵向滚动条，使延迟加载时滚动条不是随着数据的增加而逐渐变小
	        	if (!me.isLastPage())
	        	{
	        		height = me.$bodyTable.height() / _pageIndex * (parseInt(me.pageSize / me.lazyRenderSize) - _pageIndex);
	        	}
	        	else
	        	{
	        		height = me.$bodyTable.height() / _pageIndex * (parseInt((me.itemCount - me.pageSize * (me.pageIndex - 1)) / me.lazyRenderSize) - _pageIndex);
	        	}
        	}
        	else
        	{
        		if(_pageIndex == 1 && !_isPageBottom && !_isScrollUp)
        		{
        			_tablebodyHeight = me.$bodyTable.height();
        		}
        		
        		if (p_items.length == me.lazyRenderSize)
        		{
            		if (_pageIndex > 1)
            		{
            			var marginTop = _tablebodyHeight * (_pageIndex - (_isScrollUp ? 1 : 2));
            			
            			if (_isPageBottom)
            			{
            				 marginTop = marginTop + _tablebodyHeight - _lastPageHeight;
            				_isPageBottom = false;
            			}
            			
            			if (me.$body.scrollTop() - marginTop > _tablebodyHeight)
            			{
            				marginTop = marginTop + (me.$body.scrollTop() - marginTop - _tablebodyHeight);
            			}
            			me.$bodyTable.css("marginTop", marginTop);
            		}
            		else
            		{
            			me.$bodyTable.css("marginTop", 0);
            		}
        		}
        		else
        		{
        			_lastPageSize = p_items.length;
        			_lastPageHeight = parseInt(_tablebodyHeight * (p_items.length / me.lazyRenderSize));
            		if (_pageIndex > 1)
            		{
            			me.$bodyTable.css("marginTop", _tablebodyHeight * (_pageIndex - (_isScrollUp ?  1 : 2)) + _lastPageHeight);
            		}
            		else
            		{
            			me.$bodyTable.css("marginTop",0);
            		}
        		}
        		
        		height = _tablebodyHeight * (parseInt(me.itemCount / me.lazyRenderSize) - _pageIndex - (_isScrollUp ? 1 : 0));
        	}
        	
        	me.$body.find("#temp_body_w").height(height > 0 ? height : 1);
        	
        	_pageIndexArr.removeAt(0);
        }

        condition.setItems = true;
        me._showColumns();
        if(me.entityContainer.type == "local")
        {
        	setTimeout(function(){
				try{
					if (me.$e)
					{
						me.$e.setBusy(false);
					}
				}catch(e){
					
				}				
				},500);
        }
    };
    
    
    /**
     * @ignore
     * 用来把构造列的json对象中的visible属性设为隐藏，从而使所有列都隐藏
     */
    me._hideColumns = function(p_columns)
    {
//        condition.resizeWidth = false;
//        condition.setItems = false;
//        for(var i=0;i<p_columns.length;i++)
//	    {
//           var col = p_columns[i];
//           if(col.columns)
//           {
//                me._hideColumns(col.columns);
//           }
//           else if(col && col.name != me._tempColumnName)
//           {
//              col.initVisible =  (typeof  col.visible == "undefined" ? true : col.visible);
//              col.visible = false;
//           }
//	    }
    }
    
    
     /**
      * @ignore
     * 用来把通过hideColumns隐藏的列都显示出来。
     * 这个方法会调用两次，但只会执行一次，这是通过condition对象来控制的
     * 只有当resizeColumns方法和setItems方法都调用过后，才会执行真正的处理逻辑
     */
    me._showColumns = function()
    {
//         if(condition.resizeWidth===true 
//            && condition.setItems ===true)
//         {
//                for(var i=0;i<me.columns.length;i++)
//		        {
//		        	var col = me.columns[i];
//			        if(col.initVisible)
//					{
//						  if(col.initVisible===true)
//						        col.setVisible(true);
//						  delete col.initVisible;
//				    }
//		        }
//         }
    }
    
    /**
     * 从 {@link items} 集合中移除所有数据项。仅仅操作了当前页的dom对象，EntityContainer数据未变化。
     * 若要从 {@link mx.datacontrols.DataGrid} 中移除单个数据项，请使用 {@link removeItem} 方法。
     */
    me.clearItems = function()
    {
        while (me.items.length > 0)
        {
            _removeItem(0);
        }

		_resetCheckAllStatus();
    };

    /**
     * 选择 {@link mx.datacontrols.DataGrid} 列表中的指定的数据项。
     * 
     * @param p_item
     *            一个数字（如 0），表示 {@link items} 集合中数据项的序号；或者一个
     *            {@link mx.datacontrols.DataGridItem} 对象。
     * @param [p_triggerEvent=true]
     *            一个 Boolean 值，表示是否要触发 {@link onselectionchanged} 事件。如果该值为
     *            true，则触发事件；反之则不触发。
     */
    me.selectItem = function(p_item, p_triggerEvent)
    {
        var item = null;
        if ($isNumber(p_item))
        {
            item = me.items[p_item];
        }
        else if ($isObject(p_item))
        {
            item = p_item;
        }

        if (me.selection == item) return;

        var args =
        {
            cancel : false,
            item : item
        };
        me.trigger("selectionchanging", args);
        if (args.cancel) return;
        
        me.deselectAll(false);
        
        me.selection = item;

        me._selectItem(item);

        if (!me.selections.contains(item))
        {
            me.selections.add(item);
        }
        
        if (p_triggerEvent != false)
        {
            me.trigger("selectionchanged");
        }
    };
    
    /**
     * @ignore
     */
    me._selectItem = function(p_item)
    {
        if (p_item != null)
        {
            p_item.$e.addClass("selected");
            
            _scrollItemInotoView();

            me.$body.unbind("resize");
            me.$body.on("resize", function(e){
            	_scrollItemInotoView();
            	me.$body.unbind("resize");
            });
        }
    };
    
    /**
     * 设置选中所有项。
     * @param [p_triggerEvent=true]
     *            一个 Boolean 值，表示是否要触发 {@link onselectionchanged} 事件。如果该值为
     *            true，则触发事件；反之则不触发。
     */
    me.selectAll = function(p_triggerEvent)
    {
        for(var i = 0; i < me.items.length; i++)
        {
            me.items[i].setChecked(true);
            if(!me.selections.contains(me.items[i]))
            {
                me.selections.add(me.items[i]);
            }
        }
        
        me._toggleSelected(true);
        
        if (p_triggerEvent != false)
        {
            me.trigger("selectionchanged");
        }
    };
    
    /**
     * @ignore
     * 设置所有行的选中状态。
     */
    me._toggleSelected = function(p_selected)
    {
        if (p_selected == true)
        {
           me.$bodyTable.find(">tbody>tr").addClass("selected");
        }
        else
        {
           me.$bodyTable.find(">tbody>tr.selected").removeClass("selected");
        }
    };
    
    /**
     * 清除对 {@link mx.datacontrols.DataGrid} 中指定项的选定。该方法只有当指定项与 {@link selection}
     * 字段相同时，才有效。
     * 
     * @param p_item
     *            一个 {@link mx.datacontrols.DataGridItem} 对象，表示要清除对该项的选定。
     * @param [p_triggerEvent=true]
     *            一个 Boolean 值，表示是否要触发 {@link onselectionchanged} 事件。如果该值为
     *            true，则触发事件；反之则不触发。
     */
    me.deselectItem = function(p_item, p_triggerEvent)
    {
        if (p_item == null) return;

        if (me.selections.contains(p_item))
        {
            me.selections.remove(p_item);
        }

        if (me.selection == p_item && me.selections.length > 0)
        {
            me.selection = me.selections.last();
        }
        else
        {
            me.selection = null;
        }

        me._deselectItem(p_item);

        if (p_triggerEvent != false)
        {
            me.trigger("selectionchanged");
        }
    };

    /**
     * @ignore
     */
    me._deselectItem = function(p_item)
    {
        p_item.$e.removeClass("selected");
    };
    
    /**
     * 清除对 {@link mx.datacontrols.DataGrid} 当前的选中项的选定。使用该方法后，{@link selection}
     * 字段变为空。
     * 
     * @param [p_triggerEvent=true]
     *            一个 Boolean 值，表示是否要触发 {@link onselectionchanged} 事件。如果该值为
     *            true，则触发事件；反之则不触发。
     */
    me.deselectAll = function(p_triggerEvent)
    {
        if (me.selection == null && me.selections.length == 0) return;

        me.selection = null;
        me.selections.clear();
        
        me._toggleSelected(false);
        
        if (p_triggerEvent != false)
        {
            me.trigger("selectionchanged");
        }
    };

    /**
     * 选中当前选中项的下一个数据项。如果当前没有选中项，则选中第一个数据项；如果当前的选中项是最后一项，则不做任何改变。
     */
    me.selectNextItem = function()
    {
        var index = -1;
        if (me.selection != null)
        {
            index = me.selection.getIndex();
        }
        else
        {
            if (me.items.length > 0)
            {
                me.selectItem(0);
                return;
            }
        }

        if (index == me.items.length - 1)
        {
            return;
        }
        else
        {
            index++;
        }

        me.selectItem(index);
    };

    /**
     * 选中当前选中项的前一个数据项。如果当前没有选中项或选中项是第一个，则不做任何改变。
     */
    me.selectPreviousItem = function()
    {
        var index = 0;
        if (me.selection != null)
        {
            index = me.selection.getIndex();
        }

        if (index == 0)
        {
            return;
        }
        else
        {
            index--;
        }

        me.selectItem(index);
    };
    
    /**
     * 不提供默认校验逻辑，允许自定义扩展。
     * 返回值格式为 {successful: true|false, hint: "校验提示信息"}
     */
    me.validate = function()
    {
    	//todo
    };
    

    /**
     * 将所有的数据项设为选中状态。
     */
    me.checkAll = function()
    {
        if (me.displayCheckBox)
        {
            for ( var i = 0; i < me.items.length; i++)
            {
                if (!me.items[i].checked)
                {
                    me.items[i].toggleChecked();
                }
            }
            me._checkAll();
        }
    };

    /**
     * @ignore
     */
    me._checkAll = function()
    {
        me.$headTable.find("tr").eq(0).toggleClass("checked", true);
    };
    
    /**
     * 将所有的数据项设为未选中状态。
     */
    me.uncheckAll = function()
    {
    	me._allPageSelected = false;
        if (me.displayCheckBox)
        {
            for ( var i = 0; i < me.items.length; i++)
            {
                if (me.items[i].checked)
                {
                    me.items[i].toggleChecked();
                }
            }
            me._uncheckAll();
        }
    };

    /**
     * @ignore
     */
    me._uncheckAll = function()
    {
        me.$headTable.find("tr").eq(0).toggleClass("checked", false);
    };
    
    /**
     * 获取所有选中的数据项集合。
     */
    me.getCheckedItems = function()
    {
        var $trs = me.$bodyTable.find("tr.checked");
        var items = [];
        $trs.each(function()
        {
            var item = $.data(this, "item");
            if(!$isEmpty(item))
            {
               items.add(item);
            }
        });
        return items;
    };
    
    /**
     * 获取所有选中项的 ID 的集合。
     */
    me.getCheckedIDs = function()
    {
        var primaryKeyColumn = _getColumnOptions(me._columns,me.primaryKey);
        if (primaryKeyColumn == null) return [];
        var $trs = me.$bodyTable.find("tr.checked");
        var ids = [];
        $trs.each(function()
        {
            var item = $.data(this, "item");
            // 注意：此处需要加一个空引号，表示转为字符串。因为 id 存在数字的可能。
            var id = item.id + "";
            ids.add(id);
        });
        return ids;
    };
    
    /**
     * 将指定的数据项移动到指定的索引位置。也可以使用 {@link mx.datacontrols.DataGridItem} 的 {@link mx.datacontrols.DataGridItem.moveTo} 和 
     * {@link mx.datacontrols.DataGridItem.moveUp}、{@link mx.datacontrols.DataGridItem.moveDown} 方法。 
     * 
     * @param p_item 一个 {@link mx.datacontrols.DataGridItem} 对象。
     * @param p_index 一个数字，表示移动的索引位置。
     */
    me.moveItem = function(p_item, p_index)
    {
        p_item.moveTo(p_index);
    };
    
    /**
     * {@link mx.datacontrols.DataGrid.multipleSortColumns} 属性的数组形式
     * @ignore
     */
    me._multipleSortColumns = [];
    
    /**
     * 将指定列的数据项进行排序。
     * 
     * @param p_column
     *            一个数字（如 0），表示列在集合中的序号；或一个字符串，表示列的名称；或一个
     *            {@link mx.datacontrols.DataGridColumn} 对象。
     * @param [p_order]
     *            一个 Boolean 值，表示按升序或降序排序。请参见 {@link sortOrder} 字段。
     */
    me.sort = function(p_column, p_order)
    {
        if (!me.allowSorting && !me.allowMultipleSorting) return;
        if (!$isBoolean(p_order))
        {
            p_order = me.sortOrder;
        }
        var column = null;
        if ($isNumber(p_column) || $isString(p_column))
        {
            column = me.columns[p_column];
        }
        else if ($isObject(p_column))
        {
            column = p_column;
        }

        if (column != null && !column.allowSorting)
        {
            return;
        }

        if (me.sortColumn != null)
        {
            if (me.allowSorting && !me.allowMultipleSorting)
            {
                me.sortColumn.$headCell.removeClass("sort");
                me.sortColumn.$headCell.removeClass("ascend");
                me.sortColumn.$headCell.removeClass("descend");
            }
        }
        
        if (column != null && me.allowMultipleSorting)
        {
            column.$headCell.removeClass("sort");
            column.$headCell.removeClass("ascend");
            column.$headCell.removeClass("descend");
        }
        
        me.sortColumn = column;
        me.sortOrder = p_order;
        
        if ($notEmpty(me.sortColumn))
        {
        	me.sortColumn.sortOrder = p_order;
            me.sortColumn.$headCell.addClass("sort");
            me.sortOrder ? me.sortColumn.$headCell.addClass("ascend") : me.sortColumn.$headCell.addClass("descend");
            
            var compareFunction;
            
            if (me.allowMultipleSorting && $notEmpty(me.multipleSortColumns))
	        {
	            me._multipleSortColumns = me.multipleSortColumns.split(",");
	            $.each(me._multipleSortColumns, function(index, col){
	                col = $.trim(col);
	            });
                compareFunction = me._compareMultipleItems;
	        }
	        else
	        {
                compareFunction = me._compareItems
	        }
            
            me._sort(compareFunction);
        }
    };
    
    /**
     * 将指定多列的数据项进行排序。
     * 
     * @param p_columns
     *            一个数字数组，表示列在集合中的序号；或一个字符串数组，表示列的名称；或一个
     *            {@link mx.datacontrols.DataGridColumn} 对象数组。
     * @param [p_orders]
     *            一个 Boolean 值，表示按升序或降序排序。请参见 {@link sortOrder} 字段。
     */
    me.sorts = function(p_columns, p_order)
    {
    	if(p_columns!=null&&p_columns.length>0){
    		for(var i=p_columns.length-1;i>=0;i--){
				me.sort(p_columns[i],p_order);
    		}
    	}
    }
    
    /**
     * @ignore
     */
    me._sort = function(p_compareFunction)
    {
        var item, items = me.items, length = items.length;
        
        items.sort(p_compareFunction);
        me.$bodyTable.children("tbody").remove();

        for ( var i = 0; i < length; i++)
        {
            item = items[i];
            me.$bodyTable.append(item.$e);
            item.$e.data("item", item);

            if (me.displayRowNumber)
            {
                item.$e.find("td#rownumber").text(me._getRowNumber(i+1));
                item.$e.find("td#rownumber").attr("title",me._getRowNumber(i+1));
            }
            
            if(me.allowInterlacedRow && i % 2 == 1)
            {
                item.$e.addClass("even");
            }
            else
            {
                item.$e.removeClass("even");
            }
        }
    };
    
    /**
     * @ignore
     * 获取DataItem的行号。
     */
    me._getRowNumber = function(p_index)
    {
    	if(me.lazyRender)
    	{
    		if(_isScrollUp)
    		{
    			return  p_index;
    		}
    		else
    		{
    			var _pageIndexTemp = _pageIndex;
    			if (_pageIndexArr && _pageIndexArr.length > 0)
    			{
    				_pageIndexTemp = _pageIndexArr[0];
    			}
    			p_index = (_pageIndexTemp - 1) * me.lazyRenderSize + (p_index%me.lazyRenderSize == 0 ? me.lazyRenderSize : (p_index % me.lazyRenderSize));
    		}
    		
    	}
        return (me.pageIndex-1) * me.pageSize + p_index;
    }
    
    /**
     * @ignore
     * 返回一个值，指出在当前的区域设置中两个对象（{@link mx.datacontrols.DataGridItem} 类型）是否相同。 如果
     * p_item1 排序在 p_item2 之前，那么返回 –1；如果 p_item1 排序在 p_item2 之后，则返回 +1。如果返回值为
     * 0，那就说明这两个对象是相同的。
     * 
     * @param p_item1
     *            一个 {@link mx.datacontrols.DataGridItem} 对象。
     * @param p_item2
     *            将与 p_item1 进行比较的 {@link mx.datacontrols.DataGridItem} 对象。
     */
    me._compareItems = function(p_item1, p_item2)
    {
        if (me.sortColumn != null)
        {
            var sortIndex = me.sortColumn.getIndex();
            if (sortIndex != -1)
            {
                var value1 = p_item1.getValue(sortIndex);
                var value2 = p_item2.getValue(sortIndex);
                
                if ($isEqual(me.sortColumn.editorType,  "DateTimeEditor"))
                {
                	value1 = parseDate(value1);
                	value2 = parseDate(value2);
                }
                
                var result = $compare(value1, value2);
                return me.sortOrder ? -result : result;
            }
        }
        return 0;
    };

    /**
     * @ignore
     * 详见 {@link mx.datacontrols.DataGrid._compareItems}。
     */
    me._compareMultipleItems = function(p_item1, p_item2)
    {    
        var result = 0;
        if (me.sortColumn != null && me._multipleSortColumns.length > 0)
        {
            var isEqual = false;
            for (var i = 0; i < me._multipleSortColumns.length; i++)
            {
                if (me.sortColumn.name == me._multipleSortColumns[i])
                {
                    isEqual = true;
                    break;
                }
            }
            
            if (isEqual)
            {
                result = me.__compareMultipleItems(p_item1, p_item2);
            }
            else
            {
                result = me._compareItems(p_item1, p_item2);
            }
        }
        
        return result;
    };
    
    /**
     * @ignore
     */
    me.__compareMultipleItems = function(p_item1, p_item2)
    {
        var result = 0;
        var columnName = null;
        for (var i = 0; i < me._multipleSortColumns.length; i++)
        {
            var isEqual = false;
            columnName = me._multipleSortColumns[i];
            if (columnName == me.sortColumn.name)
            {
                isEqual = true;
            }
          
            var value1 = p_item1.getValue(columnName);
            var value2 = p_item2.getValue(columnName);
            
            if ($isEqual(me.columns[columnName].editorType,  "DateTimeEditor"))
            {
            	value1 = parseDate(value1);
            	value2 = parseDate(value2);
            }
            var result = $compare(value1, value2);
            
            if (result != 0 || isEqual)
            {
                break;
            }
        }
        
        return me.columns[columnName].sortOrder ? -result : result;
    };

    /**
     * @ignore
     * 根据指定的 {@link mx.datacontrols.DataGridItem}，获取
     * {@link mx.datacontrols.DataGridItem.imageKey} 字段的值。
     * 
     * @example 以下是重写该方法的示例。 
     * <code> 
     * base.getIconKeyOfItem = me.getIconKeyOfItem;
     * me.getIconKeyOfItem = function(p_item)
     * {
     *     if (p_item.getValue("isPKCol") == "T")
     *     {
     *         return "primary_key";
     *     }
     *     else
     *     {
     *         return base.getIconKeyOfItem(p_item);
     *     }
     * };
     * </code>
     */
    me.getImageKeyOfItem = function(p_item)
    {
        if (p_item == null) return null;

        if (me.images[p_item.itemType] != null)
        {
            return me.images[p_item.itemType].value;
        }
        else
        {
            return null;
        }
    };
    
    /**
     * 提供一个方法，判断表单是否有修改过但未保存的信息。
     * @returns
     */
    me.hasChanged = function()
    {
        return me.entityContainer.hasChanged();
    };
    
    /**
     * 设置 {@link filter} 字段的值
     * @param p_filter 一个字符串或 Json 对象，表示查询的参数。
     * @param [p_override=true] 一个 Boolean 值，表示是否覆盖原先的 {@link filter} 字段的值。
     */
    me.setFilter = function(p_filter, p_override)
    {
        if ($isEmpty(p_override))
        {
            p_override = true;
        }
        if ($isString(p_filter))
        {
            if (p_override)
            {
                me.filter = p_filter;
            }
            else
            {
                if ($notEmpty(me.filter))
                {
                    me.filter = me.filter + "&" + p_filter;
                }
                else
                {
                    me.filter = p_filter;
                }
            }
        }
        else
        {
            if (p_override)
            {
                me.filter = p_filter;
            }
            else
            {
                me.filter = $.extend(me.filter, p_filter);
            }
        }
    };
   
    /**
     * 将表格数据导出为 Excel 表格。
     * 
     * @param [p_exportHandler] 一个 {@link mx.utils.ExcelUtil} 对象。
     * @param [p_params] 一个 JSON 对象，请参见 {@link mx.utils.ExcelUtil.params} 属性。
     * 
     * @example
     * 以下为使用平台默认的 Handler 执行导出 Excel 的示例。
     * <code language="JavaScript">
     * dataGrid.exportExcel({tableName:"uap_bm", columnNames:"BMMC,BMJL", columnCaptions:"部门名称,部门经理", filter:"BMMC='研发中心'", fileName:"部门人员表格"});
     * </code>
     * 
     * @example
     * 以下为使用自定义的 Handler 执行导出 Excel 的示例。
     * <code language="JavaScript">
     * var excelHandler = new mx.utils.ExcelUtil();
     * excelHandler.setBaseUrl("~/customServlet");
     * excelHandler.setParams({tableName:"uap_bm", columnNames:"BMMC,BMJL", columnCaptions:"部门名称,部门经理", filter:"BMMC='研发中心'", fileName:"部门人员表格"});
     * excelHandler.exportExcel();
     * </code>
     */
    me.exportExcel = function(p_exportHandler, p_params)
    {
        var excelHandler = null;
        var params = null;
        if (p_params == null)
        {
            if ($.isPlainObject(p_exportHandler))
            {
                params = p_exportHandler;
                excelHandler = _getExcelUtilHandler();
            }
            else if ($notEmpty(p_exportHandler))
            {
                excelHandler = p_exportHandler;
                params = excelHandler.params;
            }
            else
            {
                excelHandler = _getExcelUtilHandler();
                params = excelHandler.params;
            }
        }
        else
        {
            excelHandler = p_exportHandler;
            params = p_params;
        }
        excelHandler.setParams(params);
        excelHandler.exportExcel();
    };
    
    base.setPageSize = me.setPageSize;
    me.setPageSize = function(p_pageSize)
    {
        base.setPageSize(p_pageSize);
        if(me.pageNaviBar != null)
        {
	        me.pageNaviBar.setPageSize(p_pageSize);
        }
    };
    
    /**
     * 打开导入 Excel 表格的向导窗口，并返回该向导。
     * 
     * @param [p_windowManager] 一个 {@link mx.windows.WindowManager} 对象。可以根据 {@link mx.weblets.Weblet} 的 {@link mx.weblets.Weblet.context} 属性获取到该对象。
     * @param [p_url] 一个字符串，表示处理 Excel 的服务地址。平台默认提供了解析 Excel 文件的服务，但需求不能满足时需要自定义服务。
     * @param [p_callback] 一个回调函数，当向导完成后执行该方法。
     */
    me.showImportExcelWizard = function(p_windowManager, p_url, p_callback)
    {
    	var _importExcelWizard = null;
    	if (!mx.io.FileUploader.isSupported())
        {
            _upgrade();
        	return;
        }
        
        var windowManager;
        if (me.getContext())
        {
        	windowManager = me.getContext().windowManager;
        }
        
        var url = null;
        var callback = null;
        if ($notEmpty(p_callback))
        {
            windowManager = p_windowManager;
            url = p_url;
            callback = p_callback;
        }
        else if ($notEmpty(p_url))
        {
            if ($isString(p_url))
            {
                windowManager = p_windowManager;
                url = p_url;
            }
            else if ($isFunction(p_url))
            {
                if ($isString(p_windowManager))
                {
                    url = p_windowManager;
                    windowManager = me.getContext().windowManager;
                }
                else if ($notEmpty(p_windowManager))
                {
                    windowManager = p_windowManager;
                }
                callback = p_url;
            }
        }
        else
        {
            if ($isString(p_windowManager))
            {
                windowManager = me.getContext().windowManager;
                url = p_url;
            }
            else if ($isFunction(p_windowManager))
            {
                windowManager = me.getContext().windowManager;
                callback = p_windowManager;
            }
            else if ($notEmpty(p_windowManager))
            {
                windowManager = p_windowManager;
            }
        }
        
        $.extend(_defalutimportExcelOptions, me.importExcelOptions);
        
        var importOption = {
				                reusable : false,
				                importExcelOptions: _defalutimportExcelOptions,
				                previewGridBaseUrl : me.entityContainer.baseUrl,
				                pk: me.entityContainer.primaryKey,
				                left: "center",
				                top: "center"
            			   };
        
        if (url != null)
        {
        	importOption.importExcelUrl = url;
        }
        
        _importExcelWizard = windowManager.create(mx.datacontrols.wizards.ImportExcelWizard, importOption);

        
        if (callback != null)
        {
            _importExcelWizard.finishCallback = callback;
        }
        
        var columns = [];
        for (var i = 0; i < me.columns.length; i++)
        {
            if (me.columns[i].name != me._tempColumnName && me.columns[i].name != me.primaryKey)
            {
                columns.add({ name:me.columns[i].name, caption:me.columns[i].caption });
            }
        }
        _importExcelWizard.setImportColumns(columns);
        _importExcelWizard.show();
        return _importExcelWizard;
    };
    
    /**
     * @ignore
     */
    me._init = function()
    {                
        me.$e.addClass("dataGrid");

        me._initGrid();
        
      //设置用来撑出滚动条的div
        if(me.$head)
        {
        	 me.$headTable.resize(function(){
        		 var height = 1;
        		 if (me.lazyRender)
        		 {
        			 height =  me.$body.find("#temp_body_w").height();
        		 }
        		 
            	 me.$body.find("#temp_body_w").remove();
            	 var width = me.$headTable.width();
            	 
            	 // IE6下该宽度需要扣除竖直滚动条宽度
            	 if($.isIE6()) {
            		 width -= 16;
            	 }
            	 //IE9下列宽减1
            	 if (/msie\s9/i.test(navigator.userAgent)){
            		 width -= 1;
            	 }
            	 me.$body.append("<div id='temp_body_w' style='width:"+width+"px;height:"+height+"px;font-size:0px;border:none;'></div>");				 
            });
        }

        
        if (me.autoWrap)
        {
            me.$e.addClass("autowrap");
        }
        
        me._initRowNumber();        
        me._initCheckBox();
        
        if(me.allowPaging)
        {
        	if ($notEmpty(me.pageNaviBar))
        	{
        		me.pageNaviBar.pagedControl = me;
        		me.pageNaviBar.pagedControl.on("load", me.pageNaviBar.refresh);
				me.pageNaviBar.getPageSizeEditor().setItems(me.pageSizeOptions);
				me.setPageSize(me.pageNaviBar.pageSize);
        	}
        	else
        	{
				me.pageNaviBar = new mx.datacontrols.PageNaviBar({pagedControl:me});
        	}
        	
        	me.$e.append(me.pageNaviBar.$e);
        	me.$grid.css("bottom", "25px");
        	me.on("pageindexchanged", _pageindexchanged);
        }
        //如果使用列宽百分比,绑定处理程序
        if(me.usePercentage)
        {
        	me.$e.resize(me._resizeColumns);
        }
        
        if (me.displayStatisticRow)
        {
            me._initStatisticRow();
        }
        me.setDisplayColSplitLine(me.displayColSplitLine);
        
        //查询框
        if($notEmpty(me.searchBox))
        {
            me._setSearchBox(me.searchBox);
        }
        
        if ($isArray(me.images))
        {
            var images = me.images;
            me.images = [];
            me.appendImages(images);
        } 
        
        me._initMenu();
        me._initEntityContainer();
        me._initColumns();
        _resizeBodyScroll();
	
        if (!me.displayHead)
        {
            me.setDisplayHead(me.displayHead);
        }
        
        _lazyRenderSize = me.lazyRenderSize;
        
        // IE6调整大小，为兼容IE6
        me._adjustGridSizeForIE6();
    };
    
    /**
     * @ignore
     * IE6调整大小，为兼容IE6
     */
    me._adjustGridSizeForIE6 = function()
    {
    	if($.isIE6()) {
	        me.$e.resize(function(){
	        	me.$grid.css("height", me.$e.height() - 
	        			(($notEmpty(me.searchBox) && !me.searchBox.$e.is(":hidden")) ? me.searchBox.$e.outerHeight() : 0) - 
	        			(me.allowPaging ? me.pageNaviBar.$e.outerHeight() : 0));
	        	me.$body.css("height",me.$grid.height() - me.$head.outerHeight());
	        });
    	}
    }
    
    /**
     * @ignore
     */
    me._initGrid = function()
    {
    	if(me.usePercentage)
    	{
    		//IE6与IE7, 设置的宽度不包含border、padding、margin的大小，需要额外处理
        	if($.isIE67()) {
        		me.$e.css({"width":"99.5%",'margin':"0px","padding":"0px"});
        	} else {
        		me.$e.css({"width":"100%",'margin':"0px","padding":"0px"});
        	}
    	}
        me.$e.append("<div id=grid>" +
                "<div id=head><table class='headTable' cellspacing=0 cellpadding=0><tbody><tr></tr></tbody></table></div>" +
                "<div id=body><table class='bodyTable' cellspacing=0 cellpadding=0><colgroup/></table></div>" +
                "<div id='upRightBg'></div>" +
                "</div>");
		
        
        var $grid = me.$("#grid");
        
        me.$grid = $grid;
        
        var $head = me.$("#head");
        $head.userSelectable(false);
		delete $head.prevObject;
        me.$head = $head;
        
        me.$headTable = $head.children("table"); 
		delete me.$headTable.prevObject;
		
        var scrollBarWidth = mx.getScrollBarWidth();
        $head.css("margin-right", scrollBarWidth.horizontal);
        var $upRightBg = me.$("#upRightBg");
        $upRightBg.css("width", scrollBarWidth.horizontal);
        delete scrollBarWidth.horizontal;
		delete scrollBarWidth.vertical;
        delete scrollBarWidth;
		
        var $body = me.$("#body");
        me.$body = $body;
        
        if(me.lazyRender)
		{
		   	me.$body.scroll(scrollRender);
		}
        
        me.$bodyTable = $body.children("table");
        $body.scroll(me._body_scroll);
        
        $(document).keyup(me._keydown);
        
        if (me.allowMultipleSorting)
        {
            me.allowSorting = true;
        }
        
        if (me.allowSorting)
        {
            me.$headTable.on('click', "tr>td>div", me._headTable_click);
        }
        
        if (me.allowDraggingItem)
        {
            me.$bodyTable.mousedown(_dragItem_mousedown);
        }
        
        me.$bodyTable.on('click', "tr", me._bodyTable_click);
        me.$bodyTable.dblclick(me._bodyTable_dbclick);
        if ($notEmpty(me.contextMenu) || $notEmpty(me.itemMenu) || me.enableHeadContextMenu)
        {
            me.$e.contextmenu(_bodyTable_contextmenu);
        }
        
        if(me.allowEditing)
        {
            me.$bodyTable.on("click", "tr>td", me._body_cell_click);            
        }
    };
    
    /**
     * 设置是否可编辑 {@link allowEditing}
     * 
     * @param p_editing boolean值，true：可编辑 false 不可编辑
     */
    me.setAllowEditing = function(p_editing){
    	if(typeof (p_editing) != "undefined"){
    		me.allowEditing = p_editing;
    		if(me.$bodyTable){
    			me.$bodyTable.off("click", "tr>td", me._body_cell_click);
    			if(me.allowEditing)
    				me.$bodyTable.on("click", "tr>td", me._body_cell_click);
    		}
    	}
    }
    
    /**
     * @ignore
     */
    me._initColumns = function()
    {
    	
    	me._loadCacheAdjust();
        me._columns = me._jsonArrayClone(me.columns);
        me.columns = [];
        me.setColumns(me._jsonArrayClone(me._columns));
    };
    
    
    /**
     * @ignore
     */
    me._initCheckBox = function()
    {
    	if(me._isInitCheckBox)
    	{
    	    return;
    	}
        if(me.displayCheckBox)
        {
			if(me.$headTable.find("tr>td#checkbox").length==0)
        	{
        	    me.$e.addClass("checkDataGrid");
        	    var div = $("<div id='checkBoxOption' style='display:none;width: 140px;position: absolute;left: 0;top: 23px;border: 1px solid #bcbcbc;padding: 5px 7px;;z-index: 10;  width: 66px; left: 10px; top: 31px;font:12px/1.33 Verdana;background-color:white' onmouseout=\"$(this).css(\'display\',\'none\')\" onmouseover=\"$(this).css(\'display\',\'block\')\"><ul style='list-style-type:none;margin:0;padding:0;'><li><a title='全选当前页' href='#' style='text-decoration:none;display: list-item;' onmouseover='this.style.cssText=\"background-color:#f2f2f2; text-decoration:none;\"'  onmouseout='this.style.cssText=\"color:none;text-decoration:none\"' name='current'>全选当前页</a></li><li><a title='选择全部' href='#' style='text-decoration:none;' onmouseover='this.style.cssText=\"background-color:#f2f2f2; text-decoration:none;\"'  onmouseout='this.style.cssText=\"color:none;text-decoration:none\"' name='all'>选择全部</a></li><li><a title='取消全选' href='#' style='text-decoration:none;' onmouseover='this.style.cssText=\"background-color:#f2f2f2; text-decoration:none;\"'  onmouseout='this.style.cssText=\"color:none;text-decoration:none\"' name='off'>取消全选</a></li></ul></div> ");
        	    $(div).find('a').each(function(){$(this).click(me._item_checkBox_click)});
        	    document.body.appendChild(div[0]);
        	    //var checkTd = "<td style='width:25px;' id='checkbox'><div class='first'><span id='checkBox' onmouseover=\"$(\'#checkBoxOption\').css(\'top\',$(this).getTop(this)+25);$(\'#checkBoxOption\').css(\'left\',$(this).getLeft(this)-3)\;$(\'#checkBoxOption\').css(\'display\',\'block\')\" onmouseout=\"$(\'#checkBoxOption\').css(\'display\',\'none\')\"></div></td>";
        	    if (me.multiCheck) {
        	    	var checkTd = "<td style='width:25px;' id='checkbox'><div class='first'><span id='checkBox' onmouseover=\"$(\'#checkBoxOption\').css(\'top\',$(this).getRect(this).top+24);$(\'#checkBoxOption\').css(\'left\',$(this).getRect(this).left-3)\;$(\'#checkBoxOption\').css(\'display\',\'block\')\" onmouseout=\"$(\'#checkBoxOption\').css(\'display\',\'none\')\"/></div></td>";
        	    } else {
        	    	var checkTd = "<td style='width:25px;' id='checkbox'><div class='first'><span id='checkBox'/></div></td>";
        	    }
        	    var checkCol = "<col style='width:25px;' id='checkbox'/>";
        		var rowNumTd =  me.$headTable.find("td#rownumber");
        		if(rowNumTd.length==0)
        		{
		            me.$headTable.find("> tbody > tr").prepend(checkTd);
		            me.$bodyTable.children("colgroup").prepend(checkCol);
        		}
        		else
        		{
        		     rowNumTd.after(checkTd);
        		     me.$bodyTable.find("col#rownumber").after(checkCol);
        		}
       		me.$e.on("click", "tr>td>div>#checkBox", me._item_checkBox_click);
       		me.$e.on("change", "tr>td>div>select", me._item_checkBox_click);
			
        	me._isInitCheckBox = true;
        	}        
        }
    };
    
    
    /**
     * @ignore
     */
    me._initRowNumber = function()
    {
    	if(me._isInitRowNumber)
    	{
    	    return;
    	}
        if(me.displayRowNumber)
        {
			if(me.$headTable.find("td#rownumber").length==0)
        	{
        	    me.$e.addClass("rowNumberDataGrid");
	            var rowNumTd = "<td id='rownumber' style='width:" + me.rowNumberColWidth + "px;text-align:center;'><span id='rownumber' class='first' style='line-height:24px;'>" + me.rowNumberColCaption + "</span></td>";
	            var rowNumCol = "<col id='rownumber' style='width:" + me.rowNumberColWidth + "px;'/>";
	            me.$headTable.find("> tbody > tr").prepend(rowNumTd);
	            me.$bodyTable.children("colgroup").prepend(rowNumCol);
	            me._isInitRowNumber = true;
        	}
        }
    };
    
    /**
     * @ignore
     */
    me._initStatisticRow = function()
    {
        me.$statisticRow = $("<div id='statisticRow'><table cellspacing=0 cellpadding=0><tbody><tr></tr></tbody></table></div>");
        me.$statisticTable = me.$statisticRow.find("table");
        if (me.displayRowNumber)
        {
            me.$statisticTable.find("> tbody > tr").append("<td id='rownumber' style='width:" + me.rowNumberColWidth + "px;display: table-cell;'/>");
        }
        
        if (me.displayCheckBox)
        {
            me.$statisticTable.find("> tbody > tr").append("<td id='checkbox' style='width:25px;display: table-cell;'/>");
        }
        
        me.$body.append(me.$statisticRow);
        me.setDisplayStatisticRow(me.displayStatisticRow);
    };
    
    var _$toggleShowBtn = null;
    
    /**
     * 设置DataGrid的DataGridSearchBox控件
     * @param p_searchBox  一个 mx.datacontrols.DataGridSearchBox 实例
     */
    me.setSearchBox = function(p_searchBox)
    {
    	if($instanceOf(p_searchBox, mx.datacontrols.DataGridSearchBox))
        {
    		
    		//先清除已有的查询框
    		if(me.searchBox != null)
    		{
    			if(me.searchBox!= null && $instanceOf(me.searchBox.container,mx.containers.Container))
    			{
    				me.searchBox.container.removeControl(me.searchBox,true);
    			}
    			
    		    me.$e.find(".dataGridSearchBox").remove();
    			
    			me.searchBox = null;
    		}
    		
    		if($instanceOf(p_searchBox.container,mx.containers.Container))
    		{		
    			p_searchBox._isHidden = true;
    			p_searchBox.container.addControl(p_searchBox);
    		}
    		else
    		{	
        		me.$grid.before(p_searchBox.$e);
    		}

    		me.searchBox = p_searchBox;
    		me.searchBox.pagedControl = me;
    		me.searchBox.on("fieldadd",_initGridTop);
    		me.searchBox.setFields();
    	    me.searchBox.on("searchparamchanged", _searchParamChanged);
    	    me._initSearchBoxToggle();
    	    $(function(){
    	    	_initGridTop();
    	    });
    	    
        }
    }
    
    /**
     * @ignore
     */
    me._getHeadheight = function(){
    	return 24;
    }
    
    /**
     * @ignore
     */
    me._setBodyTop = function()
    {
    	 	
        if(me.displayHead)
 	    {
        	 var _bodyTop = me._getHeadheight();
             me.$body.css("top",_bodyTop);
             me.$("#upRightBg").height(_bodyTop);
 	    }
 	    else
 	    {
 	       me.$body.css("top",0);
 	       me.$("#upRightBg").height(0);
 	    }   
    }
    
    /**
     * 设置DataGrid中id为grid的div的top值。
     * 
     * @ignore
     */
    function _initGridTop()
    {
    	 if(me.setDisplayToolBar)
 		{
 	        var _displayToolBar = me.displayToolBar;
 	        me.displayToolBar = !me.displayToolBar;
 	        me.setDisplayToolBar(_displayToolBar);
 	        me.displayToolBar = _displayToolBar;
 		}
 		else
 		{
 			if(me.searchBox!=null && me.searchBox.container == null)
 		    {
 	 			 me.$grid.css("top",me.searchBox.getHeight());	
 		    }
 		}
    }
    
    /**
     * @ignore
     */
    me._setSearchBox = function(p_searchBox)
    {
        var searchBox = null;
        if($.isPlainObject(p_searchBox))
        {
            searchBox = new mx.datacontrols.DataGridSearchBox(p_searchBox);
        }
        else
        {
            searchBox = p_searchBox;
        }
        me.setSearchBox(searchBox);
    };
    
    /**
     * @ignore
     */
    me._initSearchBoxToggle = function()
    {
    	if(_$toggleShowBtn!=null)
    	{
    		return;
    	}
    	
    	_$toggleShowBtn = $("<div id='toggleShowBtn'/>");
        
        if (me.searchBox.allowHiding)
        {
          //在标题的最右边增加一个关闭和展开查询框的按钮
            _$toggleShowBtn.toggleClass("toggleShowBtn");
            _$toggleShowBtn.on("click", me._toggleSearchBoxShowState);
            if(me.searchBox.container==null)
            {
               me.$grid.append(_$toggleShowBtn);
            }        
        }
        
        if (me.searchBox.initHidden == false)
        {
            _$toggleShowBtn.toggleClass("toggleHideBtn");
            _$toggleShowBtn.toggleClass("toggleShowBtn");
        }
    }
    
    /**
     * @ignore
     */
    me._initEntityContainer = function()
    {
        if ($isEmpty(me.entityContainer))
        {
            var options = {};
            options = {primaryKey:me.primaryKey, baseUrl:me.baseUrl};
            me.entityContainer = new mx.datacontainers.GridEntityContainer(options);
        }
        me.setEntityContainer(me.entityContainer);
    };
    
    /**
     * @ignore
     */
    me._initMenu = function()
    {
        if ($.isPlainObject(me.contextMenu))
        {
            me.contextMenu = new mx.controls.ContextMenu(me.contextMenu);
        }
        if ($.isPlainObject(me.itemMenu))
        {
            me.itemMenu = new mx.controls.ContextMenu(me.itemMenu);
        }
    };
     
    /**
     * 初始化表头上下文菜单对像  
     * 
     *	@ignore
     */
    me._init_head_contextmenu = function(){
    	if(me.headContextMenu == null){
    		me.headContextMenu = new mx.controls.ContextMenu({
      	      items: [
      	          { name: "selectColumn", text: mx.msg("DATAGRID_SELECT_COLUMNS")},
      	          { name: "selectPrintColumn", text: mx.msg("DATAGRID_SELECT_PRINT_COLUMNS")}
      	       ],
      	onitemclick: function(arg){
	      	    	 var item = arg.item;
	      	    	 if(item.parent)
	      	    	 {
	      	    		 if(item.parent.name == "selectColumn")
		      	    	 {
		      	    		item.toggleChecked();
			      	    	 var col = me.columns[item.name];
			      	    	 if(!$isEmpty(col))
			      	    	 {
			      	    		 col.setVisible(item.checked);
			      	    		 me._saveCacheAdjust();
			      	    	 } 
		      	    	 }
		      	    	 else if(item.parent.name == "selectPrintColumn")
		      	         {
		      	    		item.toggleChecked(); 
		      	    		var col = me.columns[item.name];
			      	    	if(!$isEmpty(col)){
			      	    		 col.isPrint = item.checked;
			      	    	} 
		      	         } 
	      	    	 }	
      	       } 
            });
    		//初始化选择列的二级菜单
    		var selectItem = me.headContextMenu.getItemByName("selectColumn");
    		for(var i=0;i<me.columns.length;i++){
    			var column = me.columns[i];
    			if($isEmpty(column.caption) || column.name == me.primaryKey){
    				 continue;
    			}
    			var item = new mx.controls.ToolStripItem({name:column.name,text:column.caption,checked:column.visible,toolTip:column.caption}); 
    			selectItem.appendItem(item);
    			item.$e.mouseup(function(e){e.stopPropagation();});
    		}
    		//初始化选择打印列的二级菜单
    		var selectPrintItem = me.headContextMenu.getItemByName("selectPrintColumn");
    		for(var i=0;i<me.columns.length;i++){
    			var column = me.columns[i];
    			if($isEmpty(column.caption) || column.name == me.primaryKey){
    				 continue;
    			}
    			var item = new mx.controls.ToolStripItem({name:column.name,text:column.caption,checked:column.isPrint,toolTip:column.caption}); 
    			selectPrintItem.appendItem(item);
    			item.$e.mouseup(function(e){e.stopPropagation();});
    		}
    	}
    	return me.headContextMenu;
    };
    
    /**
     * @ignore
     */
    me._checkAllPageData = function(){
    	
    	me._allPageSelected=true;me.checkAll();
    }
    
    /**
     * @ignore
     */
    me._item_checkBox_click = function(e)
    {
        if (!me.enabled) return;
        var tr = this.parentNode.parentNode.parentNode;
        var head = tr.parentNode.parentNode.parentNode;
        var item = null;
        var $tr = $(tr);
        if ((head != null && head.id == "head") || this.nodeName == "A" )
        {
            var checked = $tr.hasClass("checked");
//            this.name ==  'all' ? me._checkAllPageData() : (this.name == 'off' ? me.uncheckAll() : me.checkAll()) ;
            if (this.nodeName == "SPAN") {
            	checked == true ? me.uncheckAll() : me.checkAll();
            } else {
            	this.name ==  'all' ? me._checkAllPageData() : (this.name == 'off' ? me.uncheckAll() : me.checkAll()) ;
            }
        }
        else
        {
            item = $.data(tr, "item");
            if (me.displayCheckBox && item != null)
            {
                item.toggleChecked();
            }
            
           _resetCheckAllStatus();
        }
        
        me.trigger("itemchecked",
        {
            item : item
        });
        if (this.name=="all" || this.name == "current" || this.name == "off") {
        	$('#checkBoxOption').css('display','none');
        }
    };
    
    /**
     * @ignore
     */
    me._bodyTable_dbclick = function(e)
    {
        if (!me.enabled) return;

        var row = e.target;
        var bodyTable = me.$bodyTable.get(0);
        while (!(row.tagName == "TR" && row.parentNode != null && row.parentNode.parentNode == bodyTable))
        {
            row = row.parentNode;
            if (row == null)
            {
                return;
            }
        }
        var item = $.data(row, "item");
        if (item != null)
        {
            me.trigger("itemdoubleclick",
            {
                item : item
            });
        }
    };

    /**
     * @ignore
     */
    me._bodyTable_click = function(e)
    {
        if (!me.enabled) return;
        
        var row = e.target;
        var bodyTable = me.$bodyTable.get(0);
        while (!(row.tagName == "TR" && row.parentNode != null && row.parentNode.parentNode == bodyTable))
        {
            if ($notEmpty(row.id) && row.id == me._tempColumnName) return;
            row = row.parentNode;
            if (row == null)
            {
                return;
            }
        }

        var item = $.data(row, "item");

        if (item != null)
        {
            me.trigger("itemclick",
            {
                item : item
            });

            if (!me.selections.contains(item))
            {
                me.selectItem(item);
            }
            else if (me.selections.contains(item) && !e.ctrlKey)
            {
                me.selectItem(item);
            }
            else if (e.ctrlKey)
            {
                me.deselectItem(item);
            }
        }
    };

    /**
     * @ignore
     */
    me._headTable_click = function(e)
    {
        if (!me.enabled || !me.allowSorting) return;

        var cell = e.target;
        while (cell.tagName != "TD")
        {
            cell = cell.parentNode;
            if (cell == null)
            {
                return;
            }
        }
        if (me._tempColumnName == cell.id) return;
        var sortOrder;
        if (me.sortColumn != null && me.sortColumn.name == cell.id)
        {
            sortOrder = !me.sortOrder;
        }
        else
        {
            sortOrder = true;
        }
        me.sort(cell.id, sortOrder);
    };

    
    var _dragobj = null;
    /**
     * @ignore
     */
    me._adjustColumn_mousedown = function(e)
    {
        var $target = $(e.target); 
        $(document).css("cursor", "e-resize"); 
        $(document).on("mousemove", me._adjustColumn_mousemove);
        $(document).on("mouseup", me._adjustColumn_mouseup);
        var $td_left = null;
        var $td_right = null;
        if($target.hasClass("adjustCol_left"))
        {
            $td_left = $target.parent().parent().prev();
            $td_right = $target.parent().parent();
            if($td_left.hasClass("hidden"))
            {
                $td_left = $td_left.prev();
            }
        }
        else
        {
            $td_left = $target.parent().parent();
            $td_right = $target.parent().parent().next();
            if($td_right.hasClass("hidden"))
            {
                $td_right = $td_right.next();
            }
        }
        $target.leftTd = $td_left;
        $target.leftTdWidth = $td_left.outerWidth();
        $target.rightTd = $td_right;
        $target.rightTdWidth = $td_right.outerWidth(); 
        
        $target.totalWidth = $target.leftTdWidth + $target.rightTdWidth; 
        if($td_left.parent()) 
        {
            $target.mouseDownX = e.clientX; 
        }
        else
        {
            $target.mouseDownX = e.pageX; 
        } 
        _dragobj = $target;
        me.$e.userSelectable(false);
        e.stopPropagation();
    };
    
    /**
     * @ignore
     */
    me._adjustColumn_mousemove = function(event)
    {
        var e = event||window.event; 
        if(_dragobj == null)
        {
            return false; 
        }
        
        if(!_dragobj.mouseDownX)
        {
            return false; 
        }
            
        var leftWidth = _dragobj.leftTdWidth + e.clientX - _dragobj.mouseDownX;
        
        
        
        //列的宽度不能小于 10px
        if (leftWidth > 10)
        { 
            var leftColId = _dragobj.leftTd.attr("id");
            var leftColumn = me.columns[leftColId];
            
            var rightColId = _dragobj.rightTd.attr("id");
            var rightColumn = me.columns[rightColId];
            
            if ($isEmpty(leftColumn) || $isEmpty(rightColumn))
            {
                return;
            }
            
            
            for (var i = 0; i < me._columns.length; i++)
            {
                if (leftColId == me._columns[i].name)
                {
                   if (me.usePercentage)
                   {
                	   var tmp_leftWidth = parseInt(parseFloat(me.columns[i].width)/parseFloat(me.$e.width())*100);
                	   $.extend(me._columns[i], {width:tmp_leftWidth});
                   }
                   else
                	   $.extend(me._columns[i], {width:leftWidth});
                   break;
                }
            }
            
            //IE6&IE7自动调整单元格中editor的宽度
            if($.isIE67()){
            	me._adjustColumn_editorWidth(_dragobj,leftWidth);
            }
            leftColumn.setWidth(leftWidth);
            _resizeBodyScroll();
            
            if (me.$headTable && me.$bodyTable)
            {
				var headTableTempColumnWidth = me.$headTable.find("#" + me._tempColumnName).width();
    			if (headTableTempColumnWidth > 0)
    			{
    				if ($.isIE6())
    				{   //解决IE6的表头拖拽不对齐问题 
    					me.$headTable.width(me.$headTable.width() - 17);
    				}
    				else if($.browser.msie && $.browser.version == 9)
    				{	//解决IE9的表头拖拽不对齐问题
    					me.$bodyTable.find("#" + me._tempColumnName).width(headTableTempColumnWidth);
    				}
    			}
    			else
    			{
    				if($.browser.msie && $.browser.version == 9)
    				{	//解决IE9的表头拖拽不对齐问题
    					me.$bodyTable.find("#" + me._tempColumnName).css("width", "auto");
    				}
    			}
            }
            
            if(me.$body != null)
            {
            	me.$body.find("#temp_body_w").width(me.$headTable.width());
    			if (/msie\s9/i.test(navigator.userAgent))
    			{
    				me.$body.find("#temp_body_w").width(me.$headTable.width()-1);
           	    }
            }
            	
        }
    };
    
    /**
     * @ignore
     */
    me._adjustColumn_editorWidth = function(p_dragobj,leftWidth){
    	var leftColId = _dragobj.leftTd.attr("id");
    	//查找bodyTable
    	var $bodyTable = p_dragobj.closest("table").parent().next().children("table");
    	var $tbodyTDs = $bodyTable.find("td#" + leftColId);
		me._autoResizeEditorWidth($tbodyTDs.children("div"),leftWidth);
    }
    
    /**
     * @ignore
     * 动态调整单元格中deitor的宽度自适应
     */
    me._autoResizeEditorWidth = function(p_$obj,p_width){
    	p_$obj.each(function(){
    		$(this).css("width",p_width);
    	});
    }
    
    /**
     * @ignore
     */
    me._adjustColumn_mouseup = function()
    {
        if(_dragobj == null) return false; 
        _dragobj.mouseDownX = 0; 
        $(document).css("cursor", "default"); 
        _dragobj = null; 
        $(document).off("mousemove", me._adjustColumn_mousemove);
        $(document).off("mouseup", me._adjustColumn_mouseup);
        me.$e.userSelectable(true);
        
        me._saveCacheAdjust();
    };
    
    /**
     * @ignore
     */
    me._adjustColumn_click = function(e)
    {
        e.stopPropagation();
    };
    
    /**
     * @ignore
     * 表格滚动
     */
    me._body_scroll = function(e)
    {
        //表头更随滚动
        me.$head.scrollLeft(e.target.scrollLeft);
    };
    
    /**
     * @ignore
     * 向 {@link mx.datacontrols.DataGrid} 的数据项列表（{@link items} 集合）添加一组数据项。
     * 
     * @param p_items
     *            一个数组，该数组包含了一组 {@link mx.datacontrols.DataGridItem} 对象。
     */
    me._appendItems = function(p_items)
    {
        if ($isArray(p_items))
        {
            for (var i = 0; i < p_items.length; i++)
            {
                me._appendItem(p_items[i]);
            }
        }
    }
    
    /**
     * @ignore
     * 
     * 加载数据。使用该方法之前请确认 {@link entityContainer} 属性不为空。
     * 该方法会在 {@link entityContainer} 加载数据触发 {@link entityContainer.onload} 事件后自动调用。
     */
    me._load = function(p_data)
    {
        var meta = [];
        var data = [];
        var itemCount = 0;
        if ($notEmpty(p_data))
        {
            meta = me._jsonArrayClone(p_data.columns);
            itemCount = p_data.itemCount; 
            data = me._jsonArrayClone(p_data.items);
            
            if ($notEmpty(data))
            {
                if (me.allowPaging && data.length > me.pageSize)
                {
                    while (data.length > me.pageSize)
                    {
                        data.removeAt(data.length - 1);
                    }
                }
            }
        }
        
        if ($notEmpty(meta) && meta.length > 0 && !_hasChangeColumns2Meta)
        {
            var columns = me._jsonArrayClone(me._columns);
            columns = me._mergerColumns(columns, meta, "name");
        	me._columns = me._jsonArrayClone(columns);
        
            //设置 dataGrid 的列头
            if (columns.length > 0)
            {                
                me.setColumns(columns);
            }
        }
        
        //设置总记录数
        if ($notEmpty(itemCount))
        {
            me.setItemCount(itemCount);
        }
        
        //设置 dataGrid 的数据
        if ($notEmpty(data))
        {
            me.setItems(data);
        }
        
        if ($notEmpty(me.searchBox))
        {
            me.searchBox._updateEditor();
        }
        
        if (!me.enabled || !me.entityContainer.canModify)
        {
            me.setEnabled(false);
        }
        
        if( me.lazyRender && p_data && p_data.items && p_data.items.length!=0){
			me.trigger("load");
		} else {
			me.trigger("load");
		}
        
        _resizeBodyScroll();
    }
    
    function _requestEntityContainer(p_args, p_requestType)
    {
    	me.clearEditor(); 
    	
        if ($isEmpty(p_requestType))
        {
            p_requestType = "load";
        }
        if (p_requestType == "load")
        {
        	me.$e.setBusy();
            me.entityContainer.load(p_args);
        }
        else if (p_requestType == "remove")
        {
            me.$e.setBusy();
            me.entityContainer.remove(p_args);
        }
        else if (p_requestType == "removeByIndexs")
        {
            me.$e.setBusy();
            me.entityContainer.removeByIndexes(p_args);
        }
        else if (p_requestType == "save")
        {
            me.entityContainer.save(p_args);
        }
    }
    
    /**
     * @ignore
     */
    me._toggleSearchBoxShowState = function()
    {
    	if(me.searchBox.container != null)
    	{
    		return;
    	}
        me.searchBox.toggleShowState();
        _$toggleShowBtn.toggleClass("toggleHideBtn");
        _$toggleShowBtn.toggleClass("toggleShowBtn");
    	var height = me.searchBox.getHeight();
       
        me.$grid.animate({top : height},"fast");  
    }
    
    function _bodyTable_contextmenu(e)
    {
        if (!me.enabled) return false;

        var row = e.target;
        //判断是否在表头点击了鼠标右键
        if($(row).parents("#head")[0]){
        	
        	if(me.enableHeadContextMenu){
        		me._init_head_contextmenu();
        		me.headContextMenu.show(e.clientX, e.clientY);
        		return;
        	}	
        }
        var bodyTable = me.$bodyTable.get(0);
        while (!(row.tagName == "TR" && row.parentNode != null && row.parentNode.parentNode == bodyTable))
        {
            row = row.parentNode;
            if (row == null)
            {
                break;
            }
        }
        if (row != null)
        {
            var item = $.data(row, "item");
            if (item != null)
            {
                if (me.itemMenu != null)
                {
                    me.selectItem(item);
                    me.itemMenu.show(e.clientX, e.clientY);
                }
                return false;
            }
        }
        if (me.contextMenu != null)
        {
            me.contextMenu.show(e.clientX, e.clientY);
        }
        return false;
    }
    /**
     * @ignore
     */
    me._keydown = function(p_event)
    {
    	if (!me.enabled) return;

        if (me.moveByShortcutKey)
        {
	        if (p_event.ctrlKey)
			{
				if (p_event.keyCode == 38)
				{
					me.moveUp();
				}
				
				if (p_event.keyCode == 40)
				{
					me.moveDown();
				}
			}
        }
        
        if(me.toEditCellByTabKey){
        	if(p_event.keyCode == 9){
        		_document_click();
        		me._body_cell_tab(p_event);
        	}
        }
    }

    me._getEditingNextCell = function(p_arg, v){
     	if(!p_arg)return;
     	var column = null;
     	var $target = p_arg;
     	if(v==1){
     		if("rownumbercheckbox".indexOf($target.attr('id'))>-1){
         		$target = $target.next();
         	}
     	}else if(v==0){
     		$target = $target.next();
     	}
     	column = _getTdColumn($target);
     	if('__temp_Column_rnd__'.indexOf($target.attr('id'))>-1){
 			me.selectNextItem();
 			var $targetP = $target.parent();
 			var $targetNP = $targetP.next();
 			var $targetNC = $targetNP.children();
 			$target = $targetNC.first();
 			$target = me._getEditingNextCell($targetNC.first(), 1);
 		}else if("rownumbercheckbox".indexOf($target.attr('id'))>-1){
 			$target = me._getEditingNextCell($target, 0);
 		}else if($notEmpty(column) && (!column.visible || column.readOnly)){
 			$target = me._getEditingNextCell($target, 0);
 		}
         return $target;
     }
          
    me._editingNextCell={};
    var _editingCloumnName = null;
    var _editingItem = null;
    var _editing = false;
    var _columnEditors = new mx.types.HashMap();
    
    /**
     * @ignore
     * 表格可编辑时，按下tab进行单元格切换操作
     */
    me._body_cell_tab = function(e)
    {
    	if(me.isEditorLocked()) 
    	{
    		return;
    	}
    		
        if (!me.enabled || !me.allowEditing) return;
        var $target = me._getEditingNextCell(me._editingNextCell._enc, 0);
        if($notEmpty($target)&& $target.is("td"))
        {
        	me._scrollIntoView($target);
            var column = _getTdColumn($target);
            
            if ($notEmpty(column) && !column.readOnly)
            {
                if (_editing == true)
                {
					//如果ret==false说明editor的输入不合法
                    if(me.clearEditor(e) === false) return;
                }
                
                _editingItem = $target.parent().data("item");
                if(!_editingItem.enabled){
                	return;
                }
                var args = {
                    cancel: false,
                    item: _editingItem,
                    column: column
                };
                
                me.trigger("cellediting", args);
                
                if (args.cancel)
                {
                    _editingItem = null;
                    return;
                }
                
                if (_editingItem && _editingItem != me.selection)
				{
					me.selectItem(_editingItem);
					
					if (me.editOnSelected)
					{
						return;
					}
				}
                
                _editingCloumnName = column.name;
                var value = _editingItem.values[_editingCloumnName];
                
                me.entityContainer.startEdit(_editingItem.id);
                var editor = null;
                if($isEmpty(_columnEditors.getItem(_editingCloumnName)))
                {
                    var options = {};
                    var columns = me._jsonArrayClone(me._columns);
                    var editorOption = _getColumnOptions(columns, _editingCloumnName);
                    if ($notEmpty(editorOption) && $.isPlainObject(editorOption.editorOptions))
                    {
                    	options = $.extend(true, options, editorOption, editorOption.editorOptions);
                    }
                    else
                    {
                    	options = $.extend(true, options, editorOption);
                    }
                    
                    
                    //有的编辑器在创建时就需要表格信息，如文件编辑器。
                    options.parent = me;
                    options.width = "100%";
                    var editorType = options.editorType;
                    if($isEqual(editorType, "PictureManagerEditor") || $isEqual(editorType, "PictureEditor")|| $isEqual(editorType, "FileEditor"))
                    	options.height = 21;
                    if ($isEqual(editorType, "CheckEditor"))
                    	options.displayCaption = false;
                    if ($isEqual(editorType, "RichTextEditor") || $isEqual(editorType, "RichTextCKEditor"))
                    {
                    	options.height = 21;
                    	options.owner = true;
                    }
                    
                    var args = {
                    	column: column,
                        editorOptions: options
                    };
                    me.trigger("editorcreating", args);
                        
                    editor = mx.editors.EditorFactory.createEditor(editorType, options);
                    if ($instanceOf(editor, mx.editors.DropDownEditor)||
                        $instanceOf(editor, mx.editors.CheckListEditor)||
                        $instanceOf(editor, mx.editors.AutoCompleteEditor)||
                        $instanceOf(editor, mx.editors.ListEditor))
                    {
                        if ($isEmpty(editor.items) || editor.items.length == 0)
                        {
                            if ($notEmpty(me.entityContainer.dicts) && $notEmpty(me.entityContainer.dicts[_editingCloumnName]))
                            {
                                editor.appendItems(me.entityContainer.dicts[_editingCloumnName]);
                            }
                        }    
                    }
                    else if ($instanceOf(editor, mx.editors.DropDownTreeEditor)||
	                        $instanceOf(editor, mx.editors.DropDownGridEditor)) 
					{
						if ($isEmpty(editor.dicts) || editor.dicts.length == 0) 
						{
							if ($notEmpty(me.entityContainer.dicts)
									&& $notEmpty(me.entityContainer.dicts[_editingCloumnName])) 
							{
								editor.appendDicts(me.entityContainer.dicts[_editingCloumnName]);
							}
						}
					}
			
                    _columnEditors.setItem(_editingCloumnName, editor);
                }
                else
                {
                    editor = _columnEditors.getItem(_editingCloumnName);
                    
                    if ($instanceOf(editor, mx.editors.DropDownEditor)||
                            $instanceOf(editor, mx.editors.ListEditor))
                    {
                    	if ($isEmpty(editor.items) || editor.items.length == 0) 
						{
	                        if ($notEmpty(me.entityContainer.dicts) && $notEmpty(me.entityContainer.dicts[_editingCloumnName]))
	                        {
	                        	editor.clearItems();
	                            editor.appendItems(me.entityContainer.dicts[_editingCloumnName]);
	                        }
						}
                    }
                    else if ($instanceOf(editor, mx.editors.DropDownTreeEditor)||
	                        $instanceOf(editor, mx.editors.DropDownGridEditor)) 
					{
                    	if ($isEmpty(editor.dicts) || editor.dicts.length == 0) 
						{
							if ($notEmpty(me.entityContainer.dicts)
									&& $notEmpty(me.entityContainer.dicts[_editingCloumnName])) 
							{
								editor.appendDicts(me.entityContainer.dicts[_editingCloumnName]);
							}
						}
					}
                    
                    if($isFunction(editor.setPk)){
                        editor.setPk(_editingItem.id); 
                    }
                } 
                
                $target.addClass("editing");
                editor.focus();
                editor.reset();
                editor.setValue(value);
                editor.setVisible(true);
                //绑定编辑器的change事件
                editor.off("changed",editor_changed_handler);
                editor.on("changed",editor_changed_handler);
                
                //IE6&IE7自动调整单元格中editor的宽度
                if($.isIE67()){
                	me._autoResizeEditorWidth(editor.$e,$target.width());
                }
                
                var args = {
                	column: column,
                    editor: editor
                };
                me.trigger("editorcreated", args);
                
                $target.html(editor.$e);
                _editing = true;
                //设置当前激活的编辑器
                me.activeEditor = editor;
                
                if (editor.editorType == "CheckEditor")
				{
					$target.css({backgroundImage: "none"})
					editor.$e.children("span").trigger("click");
				}
				
                $(document).on("click", _document_click);
            }
            else
            {
                return;
            }
        }
        else if($notEmpty($target) && $target.is("span#checkBox"))
        {
            return;
        }
        
        me._editingNextCell["_enc"] = $target;
        e.stopPropagation();
    }
    
    /**
     * @ignore
     * 表格可编辑时，点击表格触发事件
     */
    me._body_cell_click = function(e)
    {
    	if(me.isEditorLocked()) 
    	{
    		return;
    	}
    		
        if (!me.enabled || !me.allowEditing) return;
        var $target = $(e.target);
        if($target.is("td"))
        {
        	me._editingNextCell["_enc"] = $target;
        	me._scrollIntoView($target);
            var column = _getTdColumn($target);
            if ($notEmpty(column) && !column.readOnly)
            {
                if (_editing == true)
                {
					//如果ret==false说明editor的输入不合法
                    if(me.clearEditor(e) === false) return;
                }
                
                _editingItem = $target.parent().data("item");
                if(!_editingItem.enabled){
                	return;
                }
                var args = {
                    cancel: false,
                    item: _editingItem,
                    column: column
                };
                
                me.trigger("cellediting", args);
                
                if (args.cancel)
                {
                    _editingItem = null;
                    return;
                }
                
                if (_editingItem && _editingItem != me.selection)
				{
					me.selectItem(_editingItem);
					
					if (me.editOnSelected)
					{
						return;
					}
				}
                
                _editingCloumnName = column.name;
                var value = _editingItem.values[_editingCloumnName];
                
                me.entityContainer.startEdit(_editingItem.id);
                var editor = null;
                if($isEmpty(_columnEditors.getItem(_editingCloumnName)))
                {
                    var options = {};
                    var columns = me._jsonArrayClone(me._columns);
                    var editorOption = _getColumnOptions(columns, _editingCloumnName);
                    if ($notEmpty(editorOption) && $.isPlainObject(editorOption.editorOptions))
                    {
                    	options = $.extend(true, options, editorOption, editorOption.editorOptions);
                    }
                    else
                    {
                    	options = $.extend(true, options, editorOption);
                    }
                    
                    
                    //有的编辑器在创建时就需要表格信息，如文件编辑器。
                    options.parent = me;
                    options.width = "100%";
                    var editorType = options.editorType;
                    if($isEqual(editorType, "PictureManagerEditor") || $isEqual(editorType, "PictureEditor")|| $isEqual(editorType, "FileEditor"))
                    	options.height = 21;
                    if ($isEqual(editorType, "CheckEditor"))
                    	options.displayCaption = false;
                    if ($isEqual(editorType, "RichTextEditor") || $isEqual(editorType, "RichTextCKEditor"))
                    {
                    	options.height = 21;
                    	options.owner = true;
                    }
                    
                    var args = {
                    	column: column,
                        editorOptions: options
                    };
                    me.trigger("editorcreating", args);
                        
                    editor = mx.editors.EditorFactory.createEditor(editorType, options);
                    if ($instanceOf(editor, mx.editors.DropDownEditor)||
                        $instanceOf(editor, mx.editors.CheckListEditor)||
                        $instanceOf(editor, mx.editors.AutoCompleteEditor)||
                        $instanceOf(editor, mx.editors.ListEditor))
                    {
                        if ($isEmpty(editor.items) || editor.items.length == 0)
                        {
                            if ($notEmpty(me.entityContainer.dicts) && $notEmpty(me.entityContainer.dicts[_editingCloumnName]))
                            {
                                editor.appendItems(me.entityContainer.dicts[_editingCloumnName]);
                            }
                        }    
                    }
                    else if ($instanceOf(editor, mx.editors.DropDownTreeEditor)||
	                        $instanceOf(editor, mx.editors.DropDownGridEditor)) 
					{
						if ($isEmpty(editor.dicts) || editor.dicts.length == 0) 
						{
							if ($notEmpty(me.entityContainer.dicts)
									&& $notEmpty(me.entityContainer.dicts[_editingCloumnName])) 
							{
								editor.appendDicts(me.entityContainer.dicts[_editingCloumnName]);
							}
						}
					}
			
                    _columnEditors.setItem(_editingCloumnName, editor);
                }
                else
                {
                    editor = _columnEditors.getItem(_editingCloumnName);
                    
                    if ($instanceOf(editor, mx.editors.DropDownEditor)||
                            $instanceOf(editor, mx.editors.ListEditor))
                    {
                    	if ($isEmpty(editor.items) || editor.items.length == 0) 
						{
	                        if ($notEmpty(me.entityContainer.dicts) && $notEmpty(me.entityContainer.dicts[_editingCloumnName]))
	                        {
	                        	editor.clearItems();
	                            editor.appendItems(me.entityContainer.dicts[_editingCloumnName]);
	                        }
						}
                    }
                    else if ($instanceOf(editor, mx.editors.DropDownTreeEditor)||
	                        $instanceOf(editor, mx.editors.DropDownGridEditor)) 
					{
                    	if ($isEmpty(editor.dicts) || editor.dicts.length == 0) 
						{
							if ($notEmpty(me.entityContainer.dicts)
									&& $notEmpty(me.entityContainer.dicts[_editingCloumnName])) 
							{
								editor.appendDicts(me.entityContainer.dicts[_editingCloumnName]);
							}
						}
					}
                    
                    if($isFunction(editor.setPk)){
                        editor.setPk(_editingItem.id); 
                    }
                } 
                
                $target.addClass("editing");
                editor.focus();
                editor.reset();
                editor.setValue(value);
                editor.setVisible(true);
                //绑定编辑器的change事件
                editor.off("changed",editor_changed_handler);
                editor.on("changed",editor_changed_handler);
                
                //IE6&IE7自动调整单元格中editor的宽度
                if($.isIE67()){
                	me._autoResizeEditorWidth(editor.$e,$target.width());
                }
                
                var args = {
                	column: column,
                    editor: editor
                };
                me.trigger("editorcreated", args);
                
                $target.html(editor.$e);
                _editing = true;
                //设置当前激活的编辑器
                me.activeEditor = editor;
                
                if (editor.editorType == "CheckEditor")
				{
					$target.css({backgroundImage: "none"})
					editor.$e.children("span").trigger("click");
				}
				
                $(document).on("click", _document_click);
            }
            else
            {
                return;
            }
        }
        else if($target.is("span#checkBox"))
        {
            return;
        }
        
        e.stopPropagation();
    }
    
    function _document_click(e)
    {
    	me.clearEditor(e);
    }
    
    function editor_changed_handler(e)
    {
        var editor = e.target;
        var $td = editor.$e.parent();
    	//修改cell状态样式
    	$td.addClass("gridDirtyCell");
    }
    
    /**
     * @ignore
     * 创建列编辑器
     * @param p_column DataGridColumn对象
     */
    me._createColumnEditor = function(p_column)
    {
    	var options = {};
        var column = $clone(p_column);
        if ($notEmpty(column) && $.isPlainObject(column.editorOptions))
        {
        	options = $.extend(true, options, column, column.editorOptions);
        }
        else
        {
        	options = $.extend(true, options, column);
        }
        options.parent = me;
        var editor = mx.editors.EditorFactory.createEditor(column.editorType, options);
        return editor;
    }
    
    /**
     * @ignore
     * 获取一行记录的的默认值
     * 返回一个 JSON 对象（如 { name:"bruce", value:"lee" }，“name”和“value”为列（{@link mx.datacontrols.DataGridColumn}
     * 类型）的 {@link mx.datacontrols.DataGridColumn.name} 字段值）。
     */
    me.getItemDefaultData = function()
    {
    	if(me.itemDefaultData != null)
    	{
    		return $clone(me.itemDefaultData);
    	}
    	var _defaultData = {};
    	for(var i=0; i < me._columns.length; i++)
    	{
    		var column = me._columns[i];
    		//新建数数里，过虑掉id列和虚拟列
    		if(column.name == me.primaryKey || column.isVirtual)
    		{
    			continue;
    		}
    		var editor = me._createColumnEditor(column);	
    		if(editor && editor.isValidate)
    		{
    			_defaultData[column.name] = editor.getValue();
    		}
    	}
    	me.itemDefaultData =  $clone(_defaultData);
    	return _defaultData;
    }

    /**
     * 编辑状态下，清除编辑器
     * {@exculde mx.datacontrols.ScrollLoadGrid}
     */
    me.clearEditor = function()
    {
    	try
    	{
    		    //加这个逻辑是为了解决clearEditor方法会同时被调用的问题
    		    if(_clearEditoring == true)
    		    {
    		    	return;
    		    }
    		    _clearEditoring = true;
    		    if(!_editing || $isEmpty(_editingItem)) 
    	        {
    	        	return; 
    	        }
    	        
    	        if(me.isEditorLocked())
    	        {
    	        	return;
    	        }
    	        var editor = _columnEditors.getItem(_editingCloumnName);

                if(editor == null){
                   return;
                }
    	        //如果编辑器的校验没通过，则不清除,并返回false;
    	        if(!editor.isValidate)
    	        {
    	        	editor.focus();
    	        	return false;
    	        }
    	        // 解决富文本编辑器在编辑状态，工具栏的点击可能使编辑器清除问题
    	        if ($instanceOf(editor, mx.editors.RichTextEditor) && editor.editing)
    	        {
    	        	return false;
    	        }
    	        if ($instanceOf(editor, mx.editors.ComboEditor))
    	        {
    	            var target = null;
    	            var evt = arguments[0];
    	            if ($notEmpty(evt))
    	            {
    	                target = evt.target;
    	            }
    	            if ($isEmpty(target) || !editor.contains(target))
    	            {
    	                editor.hideDropDown();
    	            }
    	            else
    	            {
    	                return;
    	            }
    	        }
    	        
    	        var rowItem = _editingItem;
    	        var value = editor.value;        
    	        var $td = editor.$e.parent();
    	        var column = _getTdColumn($td);
    	        if(column && $notEmpty(me.entityContainer))
    	        {
    	            var keyVal = _editingItem.values[me.primaryKey];
    	            if ($notEmpty(me.entityContainer.getEntityByKey(keyVal)))
    	            {
    	            	if(column.isVirtual === true){ //如果是虚拟列，则更新DataGridItem中的值，但不能更新数据源里的数据
    	            		_editingItem.values[_editingCloumnName] = value;
    	            	}
    	            	var oldVal = me.entityContainer.getEntityByKey(keyVal)[_editingCloumnName];
    		            if (oldVal == value)
    		            {
    		                me._changeEditorToText(_editingCloumnName);
    		            }
    		            else
    		            {
    		            	if(column.isVirtual === true){ //如果是虚拟列，则不与服务器交互
    		            		me._changeEditorToText(_editingCloumnName);
    		            	}
    		            	else
    		            	{
    		            		me.entityContainer.setValue(keyVal, column.name, value, true);
    		            	}
    		            }
    	            }
    	        }
    	        else
    	        {
    	            editor.$e.detach();
    	            
    	            if ($notEmpty(column))
    	        	{
    	            	column.renderCell(_editingItem, $td);
    	        	}
    	            _editingItem = null;
    	        }
    	        
    	        $td.removeClass("editing");  
    	        me.trigger("celledited", {column: column, item: rowItem, cell: $td});
    	        if (me.enableCellTip)
    	        {
    	        	if ($td.text().length > me.maxTitleLength)
    	        	{
    	        		return;
    	        	}
    	        	else
    	        	{
    	        		$td.attr("title",$td.text());
    	        	}
    	        }
    	        	
    	        _editing = false;
    	        //清除当前的编辑器
    	        me.activeEditor = null;
    	}
    	finally
    	{
    		_clearEditoring = false;
    	}
    };
    

    
   
    /**
     * @ignore
     */
    me._changeEditorToText = function(p_fieldName)
    {
        var editor = _columnEditors.getItem(p_fieldName);
        if ($notEmpty(editor) && typeof(editor) != "undefined")
        {
            editor.$e.detach();
            
            if ($notEmpty(editor.$input))
        	{
            	editor.$input.val("");
        	}
        }
        
        var $td = _editingItem.$e.find("td[id='" + p_fieldName + "']");
        if ($isEmpty($td))
        {
            _editingItem = null;
            return;
        }
        
        var column = _getTdColumn($td);
        if ($notEmpty(column))
    	{
        	column.renderCell(_editingItem, $td);
    	}
        //清空非空校验提示
        if(!$isEmpty($td.text())){
        	var tr_id = _editingItem.$e.attr("id");
        	me.markError(tr_id,p_fieldName,false);
        }

        if ($isEqual(p_fieldName, _editingCloumnName))
        {
        	_editingItem = null;
        	_editingCloumnName = null;
        }
    }
    
    /**
     * @ignore
     */
    me._getEditingItem = function()
    {
    	return _editingItem;
    }
    
    var _locked = false;
    /**
     * 锁定当前激活的编辑器，如果返回true表示锁定成功，反之锁定失败
     */
    me.lockEditor =  function()
    {
    	if(_editing)
    	{
    		_locked = true;
    	}
    	return _locked;
    }
    
    /**
     * 解除对当前编辑器的锁定
     */
    me.unLockEditor = function()
    {
    	_locked = false;
    }
    
    /**
     * 判断当前激活编辑器是否是锁定的。如果是true则是锁定状态，反之是未锁定
     * 当编辑处于锁定状态，将会一直保持在其对应的单元格上，直到解锁为止
     */
    me.isEditorLocked = function()
    {
    	return _locked;
    }
    
    /**
     * @ignore
     */
    me._getColumnEditors = function()
    {
    	return _columnEditors;
    }
    
    /**
     * 当前页变更后触发
     * 
     * @ignore
     */
    function _pageindexchanged()
    {
    	_isPageBottom = false;
    	_pageIndex = 1;
    	
        var args = {};
        var pageIndex = me.pageIndex;
        var pageSize = me.pageSize;
        args = {pageIndex:pageIndex, pageSize:pageSize};
        me.load(args);
        if (me._allPageSelected == true) {
        	$(me.$e.find("#checkBox")[0]).click();
        }
        
    }
    
    /**
     * 查询条件变更后触发
     */
    function _searchParamChanged()
    {
        me.load();
    }
    
    /**
     *在数据创建中调用，加入这个处理是因为，如果在创建数据的过程中要先清理掉当前表格的编辑状态。
     *如果清除编辑器出错，则中止新数据的创建过程，如果不清除，由于_editingItem没有切换，可能会造成在调用renderCell时，渲染出错的情况 
     * 
     */
    function _entityContainer_creating(p_options)
    {
        if(me.clearEditor() === false)
        {
            p_options.cancel=true;
        }
    }
    
    
    function _entityContainer_created(p_options)
    {
        if ($isEmpty(p_options.rowNumber))
            me._appendItem(p_options.entity);
        else
            me._insertItem(p_options.rowNumber, p_options.entity);
    }
    
    function _entityContainer_deleted(p_options)
    {
        me.$e.setBusy(false);
        var ids = p_options.IDs;
        if(me.allowPaging && _isReload)
        {
            if(me.entityContainer.data.length == 0 && me.pageIndex > 1)
            {
                me.pageIndex = me.pageIndex-1;
            }
            var args = {pageIndex:me.pageIndex, pageSize:me.pageSize};
            me.load(args);
        }
        else
        {
            for(var i=0; i< ids.length; i++)
            {
                for(var j=0; j< me.items.length; j++)
                {
                    if(ids[i] == me.items[j].id)
                    {
                        _removeItem(me.items[j]);
                        break;
                    }
                }
            }
            //刷新items
            _refreshItems();
            _resetCheckAllStatus();
            
            //如果编辑中的Item被删除，变更_editing状态
            if (_editingItem != null && ids.contains(_editingItem.id))
            {
            	_editing = false;
            }
            
        }
        if ($notEmpty(_removeCallBack))
        {
            _removeCallBack(); 
        }
    }
    
    function _entityContainer_saving(p_options)
    {
    	//记录未通过非空校验的行数
    	if(me.validateOnSaving == false){
    		return;
    	}
    	var _count = 0;
    	var param = eval('('+p_options.param+')');   
    	for(var i=0; i<param.items.length; i++){
			var item = param.items[i];
			if(_hasNewDataNullValue(item)){
				_count++;
			}
			
			if(_hasUpdateDataNullValue(item)){
				_count++;
			}
		}
    	
		if(_count == 0)
		{
			me.$e.setBusy();
		  
			var result = _validateData();
			if ($notEmpty(result) && !result.successful)
			{
				// 校验失败，取消保存，取消保存忙碌状态。
				p_options.cancel = true;
				me.$e.setBusy(false);
			}
		}else
		{
			p_options.cancel = true;
			mx.indicate("error", mx.msg("ERR_INPUT_NON_NULLABLE"));
		}
    }

    function _validateData()
    {
    	var result = 
    	{
    		successful : true
    	};
    	 
    	$.extend(result, me.validate());
    	
    	me.trigger("validate", result);
    	
    	return result;
    }
    
    /**
     * 校验新增数据是否有非空列的值为空的
     * @param item 
     */
    function _hasNewDataNullValue(p_item){
    	if($isEmpty(p_item) || p_item.mxVirtualId == undefined){
    		return false;
    	}
    	var errorRow = {};
    	errorRow[me.primaryKey] = p_item.mxVirtualId;
    	errorRow.nullCells = new Array();
    	for(var i=0; i< me.columns.length;i++){
    	   var col = me.columns[i];
    	   
    	   if(col != undefined && col.nullable != undefined && !col.nullable){
    		    if(col.name == me.primaryKey){
        		   continue;
        	    }
    			var value = p_item[col.name] !== undefined ? p_item[col.name] : _getValueForObject(col.name,p_item);
    			if($isEmpty(value)){
    				errorRow.nullCells.add(col);
    			}
           }	   
    	}
    	
    	me._markCellNotNull(errorRow);
    	
    	if(errorRow.nullCells.length>0){
    		return true;
    	}else{
    		return false;
    	}
    }
    
    /**
     * 校验更新数据是否有非空列的值为空的
     * @param item 
     */
    function _hasUpdateDataNullValue(p_item){
    	if(p_item[me.primaryKey] == undefined){
    		return false;
    	}
    	var errorRow = {};
    	errorRow[me.primaryKey] = p_item[me.primaryKey];
    	errorRow.nullCells = new Array();
    	
        for(var i=0; i< me.columns.length;i++){
        	
    	   var col = me.columns[i];
    	   
    	   if(col != undefined && col.nullable != undefined && !col.nullable){
    		    if(col.name == me.primaryKey){
        		   continue;
        	    }
        	    if($isString(col.name) && p_item.hasOwnProperty(col.name))
        	    {
        	        var value = p_item[col.name] !== undefined ? p_item[col.name] : _getValueForObject(col.name,p_item);
	    			if($isEmpty(value)){
	    				errorRow.nullCells.add(col);
	    			}
        	    }
            }	   
    	}
    	
    	me._markCellNotNull(errorRow);
    	
    	if(errorRow.nullCells.length>0){
    		return true;
    	}else{
    		return false;
    	}
    }
    
  
    
    /**
     *@ignore
     *通过名称找到其在对象中的值 
     *@param p_key 对象属性名
     *@param p_item 待查找的对象
     */
    function _getValueForObject(p_key,p_item){
         if($isString(p_key) && p_key.indexOf(".")>-1 && $.isPlainObject(p_item))
           {
            	 var keys = p_key.split(".");
            	 var o = null;
            	 for(var i=0;i<keys.length;i++)
            	 {
            	      var key = keys[i];
            	      if(i==0)
            	      {
            	         o = p_item[key];
            	      }else if(o)
            	      {
            	         o = o[key]; 
            	      }else{
            	         break;
            	      }
            	 }
            	 return o;
            }
            return null;
    }
    
    /**
     * @ignore
     * 将值为空的非空列单元格标记出来 
     */
    me._markCellNotNull = function(p_error_row){
    	for(var i=0;i<p_error_row.nullCells.length;i++){
    		me.markError(p_error_row[me.primaryKey], p_error_row.nullCells[i].name, true, p_error_row.nullCells[i].caption+mx.msg("ERR_INPUT_NON_NULLABLE"));
    	}
    }
    
    /**
     * 设置 DataGrid 的某一行是否可编辑 
     * p_id DataGridItem 的 id 或是其的索引值
     * p_enabled 一个布尔值，true 代表可编辑，false 代表不可编辑
     * {@exclude mx.datacontrols.GroupItemGrid}
     */
    me.setItemEnabled = function(p_id, p_enabled){
    	var item = me._findItemById(p_id) || me.items[p_id];
    	if(item!=null){
    		item.setEnabled(p_enabled);
    	}
    }
    
    /**
     * @ignore
     * 对服务端校验失败的字段下边框标红色曲线并提示。
     */
    function _entityContainer_validate(e)
    {
    	var result = e.result;
    	
    	if ($isArray(result))
    	{
    		var r;
    		var items = me.entityContainer.getChangedItems();
    		
    		for (var i = 0, l = result.length; i < l; i++) {
    			r = result[i];
    			if ($isArray(r) && r.length > 0)
	    		{
	    			$.each(r, function(j, o){
	    				me.markError(_getItemPkVal(items[i]), o.fieldName, true, o.errorsToDefaulFormatString);
		    		});
	    		}
    			else
				{
    				delete items[i];
				}
    		}
    		
    		me.$e.setBusy(false);
    	}
    }
    
    /**
     * @ignore
     * 获取实体容器对象中的主键值。
     * @param p_item 数据实体容器中值改变的数据对象。
     * @returns pkVal.
     */
    function _getItemPkVal(p_item)
    {
    	var item = p_item;
    	var pkVal;
    	
    	if ($notEmpty(item))
    	{
    		if (item["mxVirtualId"])
			{
    			pkVal = item["mxVirtualId"];
			}
			else
			{
				pkVal = item[me.primaryKey];
			}
    	}
    	
    	return pkVal;
    }
    
    function _entityContainer_saved(p_options)
    {
        me.$e.setBusy(false);
        
        if ($notEmpty(me.saveMessage))
        { 	 
        	mx.indicate("info", me.saveMessage);
        }
       
        //重置新增数据的主键值
        for ( var i = 0; i < me.columns.length; i++)
        {
            var resetEditor = _columnEditors.getItem(me.columns[i].name);
            if(resetEditor && $isFunction(resetEditor.refreshPk)){
                //编辑器提供刷新主键的方法接口。
                if ($isArray(p_options.result.newData) && p_options.result.newData.length > 0){
                    resetEditor.refreshPk(p_options.result.newData, me.entityContainer.primaryKey);
                }
            }          
        }
        if(me.allowPaging)
        {
            var args = {pageIndex:me.pageIndex, pageSize:me.pageSize};
            me.load(args);
        }
        else
        {
            var deleteIds = p_options.result.deleteIDs;
            var newDatas = p_options.result.newData;
            if($notEmpty(deleteIds))
            {
                for(var i=0; i< deleteIds.length; i++)
                {
                    for(var j=0; j< me.items.length; j++)
                    {
                        if(deleteIds[i] == me.items[j].$e.attr("id"))
                        {
                            _removeItem(me.items[j]);
                            break;
                        }
                    }
                }
            }
            if($notEmpty(newDatas))
            {
                me._appendItems(newDatas);
            }
            me.selectItem(me.items.length-1);
            //清除单元格修改标记
            if(me.$e)
            {
                 me.$e.find(".gridDirtyCell").removeClass("gridDirtyCell");
            }
        }
        
        if ($notEmpty(_saveCallBack))
        {
            _saveCallBack(p_options.p_result); 
        }
    }
    
    function _entityContainer_error(p_options)
    {
        //去除遮罩。
        me.$e.setBusy(false);
    }
    
    /**
     * 通过 td 单元格的 Jquery对象获取 DataGridColumn 对象 
     */
    function _getTdColumn(p_td)
    {
        var column = me.columns[p_td.attr("id")];
        return column;
    }
    
    
    
    var _$dragCol = null;
    function _dragColumn_mousedown(e)
    {
        var div = e.target;
        while (!(div.tagName == "DIV" && div.parentNode != null))
        {
            div = div.parentNode;
            if (div == null)
            {
                return;
            }
        }
        
        if($(div).parent("#"+me._tempColumnName).length == 1)
        {//最后的空列不可移动
        	return;
        }
        
        _$dragCol = $(div).clone();
        _$dragCol.append("<span class=rejustInsert id=allowInsertFlag/>");
        _$dragCol.$td = $(div).parent();
        
        $(document).on("mousemove", _dragColumn_mousemove);
        $(document).on("mouseup", _dragColumn_mouseup);
        $(div).parent().append(_$dragCol);
        
        _$dragCol.addClass("colProxy");
        _$dragCol.css("width", $(div).width()+10);
        _$dragCol.css("height", $(div).height());
        var position = $(div).position();
        var offset = $(div).offset();
        
        _$dragCol.css("left", position.left);
        
        _$dragCol.mouseDownX = e.clientX;
        _$dragCol.position = position;
        _$dragCol.offset = offset;
    }
    
    var _draging = false;
    var _$spanInsert = null;
    function _dragColumn_mousemove(event)
    {
        var e = event||window.event; 
        if($notEmpty(_$dragCol))
        {
            var offsetX = e.clientX - _$dragCol.mouseDownX;
            if(!_draging && offsetX < 25 && offsetX > -25)
            {
                return;
            }
            else
            {
                _draging = true;
            }
            
            var offsetLeft = _$dragCol.position.left + e.clientX - _$dragCol.mouseDownX + me.$body.scrollLeft();
            
            _$dragCol.addClass("colProxyMove");
            _$dragCol.css("left", offsetLeft);
            for(var i = 0 ; i < me.columns.length; i++)
            {
                var mousePosition = e.clientX;
                var $td = me.columns[i].$headCell;
                var offset = $td.offset();
                var position = $td.position();
                if(offset.left == 0) continue;
                var $next = null;
                if(_$dragCol.$td.next().length == 0)
                {
                    $next = _$dragCol.$td;
                }
                else
                {
                    $next = _$dragCol.$td.next();
                }
                if((mousePosition - 10) < offset.left && (mousePosition + 10) > offset.left  
                    && _$dragCol.$td.offset().left != $td.offset().left
                    && $next.offset().left != $td.offset().left)
                {
                    if($isEmpty(_$spanInsert))
                    {
                        _$spanInsert = $("<div class='mx dataGrid insertFlag'/>");
                        _$dragCol.children("span#allowInsertFlag").removeClass("rejustInsert");
                        _$dragCol.children("span#allowInsertFlag").addClass("acceptInsert");
                        $('body').append(_$spanInsert);
                    }
                    _$spanInsert.css("left", offset.left - 7);
                    _$spanInsert.css("top", offset.top - 11);
                    _$dragCol.$insertTd = $td;
                    break;
                }
                else
                {
                    if($notEmpty(_$spanInsert))
                    {
                        _$spanInsert.remove();
                        _$spanInsert = null;
                        _$dragCol.children("span#allowInsertFlag").removeClass("acceptInsert");
                        _$dragCol.children("span#allowInsertFlag").addClass("rejustInsert");
                    }
                }
            }
        }
    }
    
    
    function _dragColumn_mouseup()
    {
        $(document).off("mousemove", _dragColumn_mousemove);
        $(document).off("mouseup", _dragColumn_mouseup);
        
        if($isEmpty(_$dragCol)) return;
        
        if($isEmpty(_$spanInsert))
        {
            _$dragCol.remove();
            _$dragCol = null;
            return;
        }
        
        var dragTdId = _$dragCol.$td.attr("id");
        var insertTdId = _$dragCol.$insertTd.attr("id");
        
        var column = null;
        
        for (var i = 0; i < me._columns.length; i++)
        {
            if(dragTdId == me._columns[i].name)
            {
                column = me._columns[i];
                me._columns.removeAt(i);
                break;
            }
        }
        
        if (insertTdId == me._tempColumnName)
        {
            me._columns.add(column);
        }
        else
        {
            for (var i = 0; i < me._columns.length; i++)
            {
                if (insertTdId == me._columns[i].name)
                {
                    me._columns.insertBefore(column, me._columns[i]);
                    break;
                }
            }
        }
        
        
        _$dragCol.$td.insertBefore(_$dragCol.$insertTd);
        var $tds = me.$body.find("td[id='" + dragTdId + "']");
        var $insertTds = me.$body.find("td[id='" + insertTdId + "']");

        $tds.each(function(k){
            $tds.eq(k).insertBefore($insertTds.eq(k));
        });
        
        var $cols = me.$body.find("col[id='" + dragTdId + "']");
        var $colsTarget = me.$body.find("col[id='" + insertTdId + "']");
        $cols.each(function(i){
            $cols.eq(i).insertBefore($colsTarget.eq(i));
        });
        
    	var _dragC = me.columns[dragTdId];
        me.columns.remove(me.columns[dragTdId]);
        me.columns.insertBefore(_dragC, me.columns[insertTdId]);
        
        _$dragCol.remove();
        _$dragCol = null;
        _draging = false;
        
        if($notEmpty(_$spanInsert))
        {
            _$spanInsert.remove();
            _$spanInsert = null;
        }       
        
        me._saveCacheAdjust();
    }
    
    /**
     * 拖动行，交换行位置，交换 me.items 中的元素索引，重置间隔行颜色和行号。
     */
    var _dragItem = null, _dropItem = null, _$cloneMoveItem = null, _mouseY = 0, _srcY = 0, _criticalDragValue = 5;
    function _dragItem_mousedown(e)
    {
        if (e.which >= 2 || !me.enabled) return;
        me.$e.userSelectable(false);
        
        var target = e.target;
        while (!(target.tagName == "TR" && target.parentNode != null && target.tagName != "TABLE"))
        {                 
            target = target.parentNode;
            if (target == null)
            {                   
                return;
            }
        } 
        
        _dragItem = $.data(target, "item");
        
        if (_dragItem != null)
        {
            _srcY = me.$bodyTable.absolutePosition().top;
            _mouseY = e.clientY;      
            me.$body.one("mouseup", _dragItem_mouseup);
            me.$body.on("mousemove", _dragItem_mousemove);   
        }
    }
    
	var _$cloneMoveTable = null;
    function _dragItem_mousemove(e)
    {
        var offsetY = e.clientY - _mouseY;
		var _$cloneMoveTableWidth = null;
        if (Math.abs(offsetY) > _criticalDragValue)
        {
            if (_$cloneMoveItem == null)
            {
				_$cloneMoveItem = _dragItem.$e.clone(true);
				_$cloneMoveItem.find("td#" + me._tempColumnName).remove();

				if (me.displayRowNumber)
				{
					_$cloneMoveItem.find("td#rownumber").css({"width": me.rowNumberColWidth});
				}
				
				if (me.displayCheckBox)
				{
					_$cloneMoveItem.find("td div span#checkBox").closest("td").css({"width": "25px"});
				}
				
				_$cloneMoveTable = $("<table cellspacing=\"0\" cellpadding=\"0\"></table>");

				if (me.columns[me._tempColumnName] != null)
				{
					var $tempCol =  _dragItem.$e.find("#"+me._tempColumnName);
					var tempColWidth = $.isIE67() ? $tempCol.width() : $tempCol.outerWidth();
					_$cloneMoveTableWidth = me.$bodyTable.width() - tempColWidth;
				}
				
				_$cloneMoveTable.css({"position": "absolute", "height": "23px", "width": _$cloneMoveTableWidth + "px", "left": 0, "top": e.clientY - _srcY - (_$cloneMoveItem.height()/2) , "table-layout": "fixed"});
                
				_$cloneMoveTable.append(_$cloneMoveItem);

				_$cloneMoveItem.find(">td").each(function(index, domFile){
					var $dom = $(domFile);
					var domId = $dom.attr("id");
					$dom.css("overflow", "hidden");
					//列的宽度有可能会被改变，所以这里要重新设置一下。
					 $dragTd = _dragItem.$e.find("#"+domId);
				     var tdw = $.isIE67() ? $dragTd.width() : $dragTd.outerWidth();
					 if(tdw!=0){
					    $(domFile).css("width",tdw);
					 }
					 
					 if ($.isIE67() && me.columns[domId] != null && !me.columns[domId].visible)
					 {
						 $dom.css("display", "none");
					 }
					 
				});
				me.$body.append(_$cloneMoveTable);
                me.$bodyTable.css("cursor", "move");
            }
        }
        if (_$cloneMoveItem != null)
        {   
			var tr = findDropTargetRow(_$cloneMoveItem.get(0), e.clientY - (_$cloneMoveItem.height()/2));

			if (tr != null)
			{
				_dropItem = $.data(tr, "item");
				_$cloneMoveTable.css({"background-color":"white",  "position": "absolute", "height": "23px", "width": _$cloneMoveTableWidth + "px", "left": 0, "top": e.clientY - _srcY - (_$cloneMoveItem.height()/2), "table-layout": "fixed" });
			}
        }  
    }
    
    function _dragItem_mouseup(e)
    {
    	me.$body.off("mouseup");
        me.$body.off("mousemove");
        me.$bodyTable.css("cursor", "default");
        
        me.$e.userSelectable(true);

        if (_$cloneMoveItem != null)
        {
            _$cloneMoveTable.remove();      
			_$cloneMoveTable = null;
            _$cloneMoveItem = null;
        }

		if (_dragItem == _dropItem || _dropItem == null)
		{
			_dragItem = _dropItem = null;
			return;
		}

        if (_dropItem != null && _dragItem != null)
        {
            var $prevTrs = _dropItem.$e.prevAll("tr");
            _dragItem.moveTo($prevTrs.length);
			
			me.items.clear();

			if (me.allowInterlacedRow)
			{
				var rows = me.$bodyTable.get(0).rows;
				var row, item;
				for (var i=0; i<rows.length; i++)
				{
					row = rows[i];
					item = $.data(row, "item");
					
					if(i % 2 == 1)
					{
						item.$e.addClass("even");
					}
					else
					{
						item.$e.removeClass("even");
					}

					item.$e.find("td#rownumber").text(me._getRowNumber(i+1));
					item.$e.find("td#rownumber").attr("title",me._getRowNumber(i+1));

					me.items.add(item);
				}
			}
        }
        
        me.selectItem(_dragItem, true);
        
        _dragItem = null;
        _dropItem = null;
    }
    
	function findDropTargetRow(draggedRow, y) {
        var rows = me.$bodyTable.get(0).rows;
        for (var i=0; i<rows.length; i++) {
            var row = rows[i];
            var rowY = me._getPosition(row).y;
            var rowHeight = parseInt(row.offsetHeight)/2;
            if (row.offsetHeight == 0) {
                rowY = me._getPosition(row.firstChild).y;
                rowHeight = parseInt(row.firstChild.offsetHeight)/2;
            }
            // 由于插入在 drop 元素之前，因此需要偏移目标元素二分之一行高
            if ((y > rowY - rowHeight) && (y < (rowY + rowHeight))) {
                // 判断目标行，如果是目标元素是当前行，忽略；反之返回目标行
				if (row == draggedRow) {return null;}
                return row;
            }
        }
        return null;
    }

	/**
     * 获取鼠标的页面坐标。
     * @param p_ev 鼠标移动事件。
     */
    function mouseCoords(p_ev){
        if(p_ev.pageX || p_ev.pageY){
            return {x:p_ev.pageX, y:p_ev.pageY};
        }
        return {
            x:p_ev.clientX + document.body.scrollLeft - document.body.clientLeft,
            y:p_ev.clientY + document.body.scrollTop  - document.body.clientTop
        };
    }

	/**
     * 根据目标元素和鼠标事件，获取鼠标相对目标元素的偏移量。
     * @param p_target 鼠标移动至的目标元素。
     * @param p_ev 鼠标移动事件。
     */
    function getMouseOffset(p_target, p_ev) {
        p_ev = p_ev || window.event;

        var docPos    = me._getPosition(target);
        var mousePos  = mouseCoords(p_ev);
        return {x:mousePos.x - docPos.x, y:mousePos.y - docPos.y};
    }

    /**
     * @ignore
     * 根据 DOM 树和偏移量计算元素位置。
     */
    me._getPosition = function(e){
        var left = 0;
        var top  = 0;
        
        if (e.offsetHeight == 0) {
            e = e.firstChild; // a table cell
        }

        while (e.offsetParent){
            left += e.offsetLeft;
            top  += e.offsetTop;
            e     = e.offsetParent;
        }

        left += e.offsetLeft;
        top  += e.offsetTop;

        return {x:left, y:top};
    } //拖动行相关操作完成。
     

    
    /**
     * @ignore
     * 将客户端的 {@link columns} 与服务端的 {@link columns} 合并，有相同的信息以客户端为标准。返回合并后的 {@link columns} 信息。
     * 
     * @param p_clientColumn 一个数组，表示客户端的 {@link columns} 信息。
     * @param p_serverColumn 一个数组，表示服务端的 {@link columns} 信息。
     * @param p_keyField 一个字符串，表示用于标识是否是相同列的字段名称。
     */
    me._mergerColumns = function(p_clientColumn, p_serverColumn, p_keyField)
    {
        if (!$isArray(p_clientColumn))
        {
            p_clientColumn = [];
        }
        if (!$isArray(p_serverColumn))
        {
            p_serverColumn = [];
        }
        
        //过滤掉元数据里没有，且不是虚拟列的column
        _filterClientColumn(p_clientColumn, p_serverColumn, p_keyField);
        
        $.each(p_serverColumn, function(i, serCol)
        {
        	var keyField = serCol[p_keyField];
        	var inClientColumns = false;
        	$.each(p_clientColumn, function(j, cliCol)
        	{	
        		if ($isEqual(cliCol[p_keyField], keyField))
        		{
        			var readOnly = typeof(serCol.readOnly) != "undefined" ? serCol.readOnly : null;
        			var visible = null;
        			if(!me.cacheAdjust)
        			{
        				visible = typeof(serCol.visible) != "undefined" ? serCol.visible : null;
        			}
        			else
        			{
        				visible = typeof(cliCol.visible) != "undefined" ? cliCol.visible : (typeof(serCol.visible) != "undefined" ? serCol.visible : null);
        			}
                    p_clientColumn[j] = $.extend(serCol, cliCol);
                    if (readOnly != null)
                    {
                        p_clientColumn[j].readOnly = readOnly;
                    }
                    
                    if (visible != null)
                    {
                        p_clientColumn[j].visible = visible;
                    }
                    inClientColumns = true;
        		}
        	});
        	
        	if (!inClientColumns)
        	{
        		p_clientColumn.add(p_serverColumn[i]);
        	}
        });
        
        return p_clientColumn;
    }
    
    /**
     * 过滤本地定义的列信息,这个方法会过滤掉本地定义的不包含在元数据里的列，但不会过滤掉虚拟列
     */
    function _filterClientColumn(p_clientColumn, p_serverColumn, p_keyField)
    {
    	if($isArray(p_clientColumn) && $isArray(p_serverColumn))
        {
    		for(var i=0;i<p_clientColumn.length;i++)
        	{
        		if(p_clientColumn[i].isVirtual &&  p_clientColumn[i].isVirtual === true)
        		{
        			continue;
        		}
        		var filed = p_clientColumn[i][p_keyField];
        		var inMeta = false;
        	    for(var j=0;j<p_serverColumn.length;j++)
        	    {
        	    	if(filed == p_serverColumn[j][p_keyField])
        	    	{
        	    		inMeta = true;
        	    		break;
        	    	}
        	    }
        	    
        	    if(!inMeta)
        	    {
        	    	p_clientColumn.removeAt(i--);
        	    }
        	}
        }	
    }
    
	function _resizeBodyScroll()
	{
		if (me.$body)
		{
			var isAdd = true; // 是否要添加临时行
			if (me.items.length > 0 || me.displayStatisticRow)
			{
				// 有 items 或者有统计行并且显示，删除临时行
				isAdd = false;
			}
			
			if (isAdd)
			{
				// 只添加一个临时行
				if (me.$bodyTable.find("#__temp_scroll__").length == 0)
				{
					var __temp_scroll__ = $("<tr id=__temp_scroll__ style='visibility:hidden;'><td style='border:none'>&nbsp;</td></tr>");
					me.$bodyTable.append(__temp_scroll__);
				}

				if ($isIE())
				{
					//me.$bodyTable.width(me.$head.get(0).scrollWidth);
				}
			}
			else
			{
				me.$bodyTable.find("#__temp_scroll__").remove();
			}
		}
	}
	
	
	/**
	 * @ignore
	 */
	me._tableDiv = function()
	{
		return me.$bodyTable;
	};
	
	function _resetCheckAllStatus()
	{
		var $tableDiv = me._tableDiv();
		if ($notEmpty($tableDiv))
		{
			var trsCount = $tableDiv.find("tr").length;
			var checkedTrsCount = $tableDiv.find("tr.checked").length;
			if (trsCount > 0 && trsCount == checkedTrsCount)
			{
				me._checkAll();
			}
			else
			{
				me._uncheckAll();
			}
		}
		else
		{
			me._uncheckAll();
		}
	}
	
	/**
	 * 获取指定列的参数定义。
	 */
	function _getColumnOptions(p_columns, p_colName)
	{
	    var cols = p_columns;
	
	    for (var i = 0; i < cols.length ;  i++) 
	    {
	        if (cols[i].name == p_colName)
	        {
	            return cols[i];
	        }
	        else if ($.isArray(cols[i].columns))
	        {
	            var options =  _getColumnOptions(cols[i].columns, p_colName);
	            if(options!=null)
	            {
	                 return options;
	            }
	        }
	    }
	    return null;
	}
	
	/**
     * 提供上移勾选行的方法，如果没有勾选行，则上移当前选中行。
     * 
     * @param p_needSelectedTip 一个 Boolean 值，表示上移时如果没有选择行是否给出提示，默认为 false，不给出提示。
     * @exclude {mx.datacontrols.SrollLoadGrid}
     */
	me.moveUp = function(p_needSelectedTip)
	{
		if (me.displayCheckBox)
		{
			var checkedItems = me.getCheckedItems();
			if (checkedItems.length > 0 && me.items.indexOf(checkedItems[0]) == 0)
			{
				return;
			}

			if (checkedItems.length <= 0 && p_needSelectedTip)
			{
				mx.indicate("info", mx.msg("DATAGRID_SELECT_MOVE_ROWS"));
			}
			
			for (var i = 0; i < checkedItems.length; i++)
			{
				checkedItems[i].moveUp();
			}
		}
		else
		{
			if ($notEmpty(me.selection))
			{
				me.selection.moveUp();
			}
			else if(p_needSelectedTip)
			{
				mx.indicate("info", mx.msg("DATAGRID_SELECT_MOVE_ROWS"));
			}
		}
	};
	
	/**
     * 提供下移勾选行的方法，如果没有勾选行，则下移当前选中行。
     * 
     * @param p_needSelectedTip 一个 Boolean 值，表示下移时如果没有选择行是否给出提示，默认为 false，不给出提示。
     * @exclude {mx.datacontrols.SrollLoadGrid}
     */
	me.moveDown = function(p_needSelectedTip)
	{
		if (me.displayCheckBox)
		{
			var checkedItems = me.getCheckedItems();
			if (checkedItems.length > 0 &&
					me.items.indexOf(checkedItems[checkedItems.length-1]) == me.items.length-1)
			{
				return;
			}
			
			if (checkedItems.length <= 0 && p_needSelectedTip)
			{
				mx.indicate("info", mx.msg("DATAGRID_SELECT_MOVE_ROWS"));
			}
			
			for (var i = checkedItems.length-1; i >= 0; i--)
			{
				checkedItems[i].moveDown();
			}
		}
		else
		{
			if ($notEmpty(me.selection))
			{
				me.selection.moveDown();
			}
			else if(p_needSelectedTip)
			{
				mx.indicate("info", mx.msg("DATAGRID_SELECT_MOVE_ROWS"));
			}
		}
	};
	
	
	 /**
     * 提供一个方法，打印表格内容。
     *  {@exclude mx.datacontrols.ScrollLoadGrid }
     *  {@exclude mx.datacontrols.GroupItemGrid  }
     * @param p_preview :
     *            true | false 一个 Boolean 值，表示是否启用打印预览功能，默认 true
     *            true : 表示显示打印预览
     *            false : 表示不显示打印预览，直接打印
     */
    me.printGrid = function(p_preview)
    {
    	//TODO : 打印数据  me.entityContainer.data; me.columns;列
    	if ($isEmpty(p_preview))
        {
    		p_preview = true;
        }
    	var printUtil = new mx.utils.PrintUtil({
    		dataControl : me,
    		maxCols : 2,
    		printHideFields : me.printHideFields
    	});
    	
    	printUtil.printControl(p_preview);
    };

	
	
	/**
     * 获取表格列上定义的编辑器集合 {@link mx.types.HashMap} 。
     */
	me.getColumnEditors = function()
	{
		return _columnEditors;
	};
	
	/**
     * 提供一个方法，给指定单元格上标记错误。
     *      
     * @param p_itemId 一个字符串，表示单元格所行的 id 
     * @param p_colName 一个字符串，表示单元格所在列的列标题。
     * @param p_value 一个 Boolean 值，true 时标记错误，false 时取消标记。
     * @param p_msg 一个字符串，表示提示信息，p_value 为 false 时，可以不传值。
     * {@exclude mx.datacontrols.GroupItemGrid}
     */
	me.markError = function(p_itemId, p_colName, p_value, p_msg)
	{
		var item = me._findItemById(p_itemId);
		
		if ($notEmpty(item))
		{
			item.markError(p_colName, p_value, p_msg);
		}
	}
	
	/**
	 * @ignore
	 */
	me._findItemById = function(p_itemId)
	{
		for(var i = 0 ; i < me.items.length; i++)
		{
			if(me.items[i].id == p_itemId)
			{
				return me.items[i];
			}
		}
	}
	
	/**
     * @ignore
     */
    me._jsonArrayClone = function(p_array)
    {
        var result = null;
        if ($isArray(p_array))
        {
            result = [];
            for ( var i = 0; i < p_array.length; i++)
            {
                var col = $.extend({}, p_array[i]);
                if ($notEmpty(col.editorOptions)) 
                {
                	col.editorOptions = $clone(col.editorOptions);
                }
                result.add(col);
            }
        }
        return result;
    };
    
    /**
     * 编辑状态下，清除编辑器。
     */
    function _entityContainer_loading(e)
    {
    	if (!me.entityContainer.loadMeta && $isEmpty(me.entityContainer.meta)
    		&& $.isArray(me._columns))
    	{
    		// 元数据以客户端为主时，如果没有定义元数据，则将客户端的列信息作为实际的元数据信息。
    		me.entityContainer.meta = me._columns;
    		var jsonFlatter = me.entityContainer._getJsonFlatter();
    		if ($notEmpty(jsonFlatter))
    		{
    			jsonFlatter.setMeta(me._columns);
    		}
    		
    		_hasChangeColumns2Meta = true; 
    	}
    }
    
    
    function _entityContainer_load(p_options)
    {
    	if (me.disposing)
        {
    		// 解决控件被父控件删除，但回调函数异步触发引发的问题.
        	return;
        }
    	
        // 载入之后，原有的 entityContainer 属性被重写，需要重置数据容器。
        me.entityContainer = p_options.target;
        
        me._load(p_options);
        
        me.$e.setBusy(false);
        
        if ($notEmpty(_loadCallBack))
        {
            _loadCallBack(p_options); 
        }
    }
    
    function _entityContainer_changing()
    {
    }
    
    function _entityContainer_changed(p_options)
    {
    	try
    	{
	    	var fieldName = p_options.fieldName;
	        var newValue = p_options.value;
	            
            var id = p_options.entity[me.primaryKey];
            
            if (me.$bodyTable != null)
            {
            	_editingItem = me.$body.find("tr[id='" + id + "']").data("item");
            }
            else
            {
            	if (me.$bodyLeftTable.find("tr[id='" + id + "']").length > 0)
            	{
            		_editingItem = me.$bodyLeftTable.find("tr[id='" + id + "']").data("item");
            	}
            	else
            	{
            		_editingItem = me.$bodyRightTable.find("tr[id='" + id + "']").data("item");
            	}
            }
            
            if ($isEmpty(_editingItem)) return;
        
	        _editingItem.values[fieldName] = newValue;
	        
	        me._changeEditorToText(fieldName);
    	}
    	finally//这么写是因为在新那建过程中有可能会通过entityContainer.setValue去设置其它字段的数据，这时应该将_editingItem置空，否则在渲染cell时会出问题
    	{
    	    if(_editing == false)
	        {
	           _editingItem = null;  
	        }
    	}  
    }
    
    function _upgrade()
    {
	    var $upgrader = $("<div></div>");
	    var $tip = $("<span id='tip'>" + mx.msg("DATAGRID_UPGRADE_TIP") + "</span>");
	    var $upgrade = $("<div id='upgradeBtn'>" + mx.msg("UPGRADE_BTN") + "</div>")
	    
	    $upgrader.addClass("dataGridUpgrade");
	    $upgrade.click(function(){
	    	window.open(mx.mappath("~/../mx/resources/chromeframe/default.htm"));
	    });
	    $upgrader.append($tip);
	    $upgrader.append($upgrade);
	    
	 	var win = new mx.windows.WindowManager().create(
	    {
	            title : mx.msg("DATAGRID_IMPORT"),
	            width : 500,
	            height : 400,
	            resizable : false,
	            reusable : true
	    });
	    win.$body.append($upgrader)
        win.showDialog();
    }
    
    var _excelUtil = null;
    function _getExcelUtilHandler()
    {
        if (_excelUtil == null)
        {
            _excelUtil = new mx.utils.ExcelUtil();
        }
        
        return _excelUtil;
    }
    
    /**
     * 获取查询参数。查询参数包括查询框中的查询参数和 {@link filter} 字段中的查询参数。
     */
    function _getFilterParam()
    {
        var filterParam = "";
        if ($notEmpty(me.searchBox))
        {
            if ("json" == me.searchParamType)
            {
                filterParam =  me.searchBox.getJsonSearchParam();
            }
            else
            {
                filterParam =  me.searchBox.getSearchParam();
            }
        }
        
        if ($notEmpty(me.filter))
        {
            if ("json" == me.searchParamType)
            {
                if (filterParam.length > 0)
                {
                	if ($isArray(me.filter))
                	{
                		for (var i = 0; i < me.filter.length; i++)
                		{
                			filterParam.add(me.filter[i]);
                		}
                	}
                	else
                	{
                		filterParam.add(me.filter);
                	}
                }
                else
                {
                	filterParam = me.filter;
                }
            }
            else
            {
                var myFilterParam = "";
                if ($.isPlainObject(me.filter))
                {
                    for ( var key in me.filter)
                    {
                        var value = me.filter[key];
                        myFilterParam = myFilterParam + "&" + key + "=" + value;
                    }
                    
                    if ($notEmpty(filterParam))
                    {
                        filterParam = filterParam + myFilterParam;
                    }
                    else
                    {
                        filterParam = myFilterParam.substring(1, myFilterParam.length);
                    }
                }
                else if ($isString(me.filter))
                {
                    if ($notEmpty(filterParam))
                    {
                        filterParam = filterParam + "&" + me.filter;
                    }
                    else
                    {
                        filterParam = me.filter;
                    }
                }
            }
        }
        return filterParam;       
    }
    
    /**
     * 从 {@link items} 集合中移除指定的 {@link mx.datacontrols.DataGridItem}
     * 对象，若该对象是控件当前的选中项，则触发 {@link onselectionchanged}
     * 事件。从列表中移除项时，有关移除的项的所有信息均会被删除。若要从列表中移除所有项，请使用 {@link clearItems} 方法。
     * 
     * @param p_item
     *            一个数字（如 0），表示 {@link items} 集合中数据项的序号；或者一个
     *            {@link mx.datacontrols.DataGridItem} 对象。
     */
    function _removeItem(p_item)
    {
        me.clearEditor();
        var item = null;
        if ($isNumber(p_item))
        {
            item = me.items[p_item];
        }
        else if ($isObject(p_item))
        {
            item = p_item;
        }

        if (item != null)
        {
            var selectionChanged = false;
            if (me.selection == item)
            {
                selectionChanged = true;
                me.selection = null;
            }
            if (me.selections.contains(item))
            {
                selectionChanged = true;
                me.selections.remove(item);
            }

            item.owner = null;
            me.items.remove(item);
            
            if (!_disposing)
            {
            	_resizeBodyScroll();

            	if (selectionChanged)
            	{
                	me.trigger("selectionchanged");
            	}
				item._remove();
				me.trigger("itemremoved");
            }
            if(_disposing){				
				item.dispose();
				delete item;
			} 
        }
    }
    
    function _refreshItems()
    {
        var items = me.items;
        $.each(items, function(index, item){
              if(me.allowInterlacedRow)
              {
                  (index + 1) % 2 ? item.$e.removeClass("even") : item.$e.addClass("even");       
              }
              if (me.displayRowNumber)
              {
                    item.$e.find("td#rownumber").text(me._getRowNumber(index+1));
                    item.$e.find("td#rownumber").attr("title", me._getRowNumber(index+1));
              }
        });
        
        _refreshPageNaviBar();
    }
    
    function _refreshPageNaviBar(p_itemsCountChanged)
    {
    	if (me.pageNaviBar)
    	{
    		if (me.entityContainer.type == "local")
    		{
    			me.pageNaviBar.setTotalRowNum(me.entityContainer.data.length);
    		}
    		else
    		{
    			// keep logic
    		}
    	}
    }
    
    /**
     * 递归方法，用来获取多表头最后一级的列名
     * @param p_columnNames 一个数组，用来保存列名
     * @param p_column 多表头的列。
     */
    function processColumn(p_columnNames,p_column)
    {
        if(!$isArray(p_columnNames)|| $isEmpty(p_column))
        {
            return;
        }
        if(p_column.columns != undefined && $isArray(p_column.columns))
        {
            for(var i=0;i<p_column.columns.length;i++)
            {
                processColumn(p_columnNames,p_column.columns[i]);
            }
        }
        else
        {
            p_columnNames.add(p_column.name);
        }
    }
    
    function _scrollItemInotoView()
    {
    	if (me.selection && me.selection.$e
    			&& (me.selection.$e.offset().top > (me.$body.offset().top + me.$body.height())
        				||(me.selection.$e.offset().top < me.$body.offset().top)))
		{
		    me.selection.$e.scrollIntoView();
		}
    }
    
    /**
     * @ignore
     * 本方法进行横向滚动条判断使单元格进入视图
     */
    me._scrollIntoView = function(p_target)
    {
    	var availableWidth = me.$body.scrollLeft() +  me.$body.outerWidth();
        if (p_target[0].offsetLeft + p_target.outerWidth() > availableWidth)
        {
            me.$body.scrollLeft(p_target[0].offsetLeft + p_target.outerWidth());
        }
        else if(p_target[0].offsetLeft < me.$body.scrollLeft())
        {
        	me.$body.scrollLeft(p_target[0].offsetLeft);
        }
    }
    
    /**
	 *@ignore
	 *用来记录当前延迟渲染数据索引 
	 */
	var index = 0;
	function getSubItems()
	{	
		var start = me.lazyRenderSize * (_pageIndex - 1) > itemsData.length ? -1 : me.lazyRenderSize * (_pageIndex - 1);
		var end = (start + me.lazyRenderSize) > itemsData.length ? itemsData.length : (start + me.lazyRenderSize);
		if(start == -1 || start == end)
		{
			itemsData = [];
		     return [];	
		}
		index++;
	    return  itemsData.slice(start,end);
	}
	
	var _pageIndex = 1;//存储延迟加载的页码
	var _pageIndexArr = [];//由于拖动滚动条时_pageIndex变化太快，当返回items时_pageIndex已经改变，此时得到的rownumber是错误的，此数组按顺序存储页码
	var _isPageBottom = false;//记录页面是否滚动到底部
	var _isScrollUp = false;//是否页面是否向上滚动
	var _spageIndex = 0;//记录滚动条滚动太快是有scrollTop计算出的页码
    function scrollRender()
    {
    	//延迟加载同时支持分页时，为了保持纵向滚动条不是随着数据增加而缩小，使用另一种算法
		var sh = me.$body[0].scrollHeight - parseInt(me.$body.find("#temp_body_w").height()) - parseInt(me.$body.height());
		var ch = parseInt(me.$body.scrollTop());
		var bh = sh - parseInt(me.$bodyTable.height()) + parseInt(me.$body.height());
    	
		if (ch > 0 && (ch >= sh || ch < bh))
        {
			  _spageIndex = 0;
			  if (_isScrollUp && ch >= sh)
			  {
				  _pageIndex++;
			  }
			  else if(!_isScrollUp && ch < bh)
			  {
				  _pageIndex--;
			  }
			
			  if (ch >= sh)
			  {
				  _isScrollUp = false;
			  }
			  else
			  {
				  _isScrollUp = true;
			  }
			  
			  if (me.allowPaging && me.lazyRenderSize * _pageIndex >= me.pageSize)
			  {
				  _isPageBottom = true;
				  me.$body.find("#temp_body_w").height(1);
			  }
			  else if (me.lazyRenderSize * _pageIndex >= me.itemCount)
			  {
				  _isPageBottom = true;
			  }
			  
			  if (_isScrollUp || !_isPageBottom)
			  {
				  if (_isScrollUp)
				  {
					  _pageIndex--;
				  }
				  else
				  {
					  _pageIndex++;
				  }
				  
				  if (parseInt((ch - sh) / _tablebodyHeight) > 0)
				  {
					  _spageIndex = Math.ceil(ch / _tablebodyHeight);
					  if (_spageIndex > Math.ceil(me.itemCount / me.lazyRenderSize))
					  {
						  _spageIndex = Math.ceil(me.itemCount / me.lazyRenderSize);
					  }
				  }
				  
				  if (me.entityContainer.type == "local")
				  {
					  me.$e.setBusy();
					  if (!_isScrollUp && _spageIndex - _pageIndex > 1)
					  {
						  _pageIndex = _spageIndex - 1;
						  _pageIndexArr.add(_pageIndex);
						  var subItem = getSubItems();
			              me.setItems(subItem);
			              me.trigger("load");
						  _pageIndex = _spageIndex;
					  }
					  
					  _pageIndexArr.add(_pageIndex);
					  var subItem = getSubItems();
		              me.setItems(subItem);
		              me.trigger("load");
				  }
				  else if (parseInt(me.$body.scrollTop()) > 0 && _pageIndex >0 )
				  {
					  //当滚动条拖动太快时，为了保证数据的连续性，需连续加载两页数据
					  if (!_isScrollUp && _spageIndex - _pageIndex > 1)
					  {
						  _pageIndex = _spageIndex - 1;
						  //当滚动条拖动太快时，由于前面的页加载数据时被锁定，造成无法加载最新页，此处手动打开，以后可能得优化
						  if (me.entityContainer._submitting)
						  {
							  me.entityContainer._submitting =false;
						  }
						  _pageIndexArr.add(_pageIndex);
						  me.load({pageIndex: me.pageIndex, pageSize: me.lazyRenderSize});
						  _pageIndex = _spageIndex;
					  }
					  _pageIndexArr.add(_pageIndex);
					  if (me.entityContainer._submitting)
					  {
						  me.entityContainer._submitting =false;
					  }
					  me.load({pageIndex: me.pageIndex, pageSize: me.lazyRenderSize});
				  }
			  }
        }
	}
    
    var _tempcolumns = {}; //存储列名与序号的对应关系，在本地存储时使用序号而不用列名以节省空间
    /**
     * @ignore
     * 缓存表格调整，包括列宽度、顺序、显示的调整
     */
    me._saveCacheAdjust = function()
    {
    	if (me.cacheAdjust && me.cacheAdjustPrefix && me.alias)
        {
    		var columnsStr = "";
            for (var i = 0; i < me.columns.length; i++)
            {
            	if(me.columns[i].name == me._tempColumnName)
            	{
            		continue;
            	}
            	columnsStr = columnsStr + _tempcolumns[me.columns[i].name] + ":" + (me.columns[i].visible ? 1 : 0) + ":" + me.columns[i].width + ",";
            }
            
            var key = me.cacheAdjustPrefix + me.alias;
    		
            if(window.localStorage)
            {
            	localStorage.setItem(key, columnsStr);
            }
            else
            {
            	$.cookie(key, columnsStr, {expires: 36500});
            }
        }
    }
    
    /**
     * @ignore
     * 初始加载已缓存的表格调整
     */
    me._loadCacheAdjust = function()
    {
    	if(me.cacheAdjust && me.cacheAdjustPrefix && me.alias)
    	{
    		 for(var k = 0; k < me.columns.length; k++)
			 {
				_tempcolumns[me.columns[k].name] = k;
    		 }
    		
    		 var key = me.cacheAdjustPrefix + me.alias;
    		 
    		 if(window.localStorage)
             {
    			var cookieStr = localStorage.getItem(key);
             }
             else
             {
            	 var cookieStr = $.cookie(key);
             }
    		 
        	 if(cookieStr)
        	 {
        		var tempArr = [];
        		var cookieArr = cookieStr.split(",");
        		for(var i = 0; i < cookieArr.length - 1; i++)
        		{
        			for(var j = 0; j < me.columns.length; j++)
        			{
        				var temp = cookieArr[i].split(":");
            			if(temp[0] == j)
            			{
            				tempArr[i] = me.columns[j];
            				tempArr[i].visible = temp[1] == 1 ? true : false;
            				tempArr[i].width = temp[2];
            			}
            		}
        		}
        		
        		if (tempArr.length > 0 && tempArr.length == me.columns.length) 
				{
					me.columns = tempArr;
				}
        	 }
    	}
    }
    
    /**
	* 清除本地用户的调整缓存。
	*/
    me.clearCacheAdjust = function()
    {
    	if(me.cacheAdjust && me.cacheAdjustPrefix && me.alias)
    	{
    		 var key = me.cacheAdjustPrefix + me.alias;
    		 
    		 if(window.localStorage)
             {
    			localStorage.removeItem(key);
             }
             else
             {
            	 $.cookie(key, null);
             }
    	}
    }
    
    base.dispose = me.dispose;
    /**
	* 释放对象运行时动态生成的内容（属性、方法、事件）。
	*/
    me.dispose = function()
    {
		_disposing = true;
		me.$e.find("col").off().unbind().removeData().remove();
		me.$e.find("span").off().unbind().removeData();
		me.$e.find("td").off().unbind().removeData();
    	//清除单元格
		me.clearColumns();	
		
		//清除编辑器
		_columnEditors.clear();
		_columnEditors=null;
		delete _columnEditors;
		
		//清除缓存
		//me.clearCacheAdjust();
		//清除数据
		itemsData.clear();
		itemsData=null;
		delete itemsData;
		_defalutimportExcelOptions=null;
		delete _defalutimportExcelOptions;
		condition=null;
		delete condition;
		_pageIndexArr.clear();
		_pageIndexArr=null;
		delete _pageIndexArr;
		_tempcolumns=null;
		delete _tempcolumns;
    	
    	me.off();
    	
    	//数据容器销毁,added by tiger on 2015/4/2 17:12:37
    	if(me.entityContainer.off != undefined){
    		me.entityContainer.off();
    	}
    	me.entityContainer = null; //added by tiger on 2015/4/7 21:22:09 
		
        //解除绑定在document上的事件
        $(document).off("keyup",me._keydown);
        $(document).off("click", _document_click);
		$(document).off("mousemove", me._adjustColumn_mousemove);
        $(document).off("mouseup", me._adjustColumn_mouseup);
        $(document).off("mousemove", _dragColumn_mousemove);
		$(document).off("mouseup", _dragColumn_mouseup);
		
		//销毁选择
		if(me.displayCheckBox){
			$("#checkBoxOption a").off().unbind().removeData().remove();
			$("#checkBoxOption li").off().unbind().removeData().remove();
			$("#checkBoxOption ul").off().unbind().removeData().remove();			
			$("#checkBoxOption").empty().remove();
		}
		
        //searchBox 销毁
        if(me.searchBox){
        	me.searchBox.off();
        	me.searchBox.dispose();
        	me.searchBox = null;  //added by tiger on 2015/4/7 21:22:09 
			delete me.searchBox;
        }
        
        //pageNaviBar销毁
        if(me.pageNaviBar){ 
        	if(me.pageNaviBar.pagedControl){	         	
	        	me.pageNaviBar.pagedControl.off();
				me.pageNaviBar.pagedControl = null;     		
        	}
        	
        	me.pageNaviBar.off();
			me.pageNaviBar.dispose();  
			me.pageNaviBar = null; 
			me.pageNaviBar = null; //added by tiger on 2015/4/7 21:22:09
			delete me.pageNaviBar;
        }
        
        //菜单销毁
        if(me.contextMenu){
	        me.contextMenu.off();
	        me.contextMenu.dispose();         	
	        me.contextMenu = null;  //added by tiger on 2015/4/7 21:22:09
			delete me.contextMenu;
        }

		if(me.itemMenu){
			me.itemMenu.off();
	        me.itemMenu.dispose();	
	        me.itemMenu = null; //added by tiger on 2015/4/7 21:22:09 
		}
        
        //表头，表体销毁
		if (me.$headTable)
		{
			me.$headTable.off();
	        me.$headTable.unbind();
			me.$headTable.removeAttr("cellspacing").removeAttr("cellpadding").removeAttr("className").removeAttr("class");
			
			$("*",me.$headTable).each(function(){
				jQuery.event.remove(this);
				jQuery.removeData(this);
			});
			var _child=me.$headTable.find("div");
			delete _child.prevObject;
			_child.off();
			_child.unbind();
			me.$headTable.off('click', "tr>td>div", me._headTable_click);
			me.$headTable.unbind("resize");
			me.$headTable.empty().remove();			
	        me.$headTable = null; //added by tiger on 2015/4/7 21:22:09 
			delete me.$headTable;
			
			me.$head.off();
			me.$head.unbind();
			me.$head.removeAttr("style").removeClass().removeAttr("id");
			me.$head.empty().remove();
		}
		if(me.$bodyTable){
			me.$bodyTable.off();
			me.$bodyTable.unbind();
			me.$bodyTable.removeAttr("id").removeAttr("disabled").removeAttr("class").removeAttr("style");
			me.$bodyTable.off('click', "tr", me._bodyTable_click);
			var _child=me.$bodyTable.find("td");
			delete _child.prevObject;
			_child.off();
			_child.unbind();
			me.$bodyTable.off("click", "tr>td", me._body_cell_click);			
			me.$bodyTable.empty().remove();			
			delete me.$bodyTable;
		}
		
		if (me.$body)
		{
			me.$body.off();
			me.$body.unbind();
			$("*",me.$body).each(function(){
				jQuery.event.remove(this);
				jQuery.removeData(this);
			});
			me.$body.unbind("resize");
			me.$body.empty().remove();		
	        me.$body = null; //added by tiger on 2015/4/7 21:22:09 
			delete me.$body;
		}
		
		if(me.$("#upRightBg").length>0){
			me.$("#upRightBg").off();
			me.$("#upRightBg").unbind();
			me.$("#upRightBg").empty().remove();
		}
		
		if(_$toggleShowBtn){
			_$toggleShowBtn.off();
			_$toggleShowBtn.unbind();
			_$toggleShowBtn.empty().remove();
		}
		
        base.dispose();
		base=null;
    };
    _disposing = false;
    me.endOfClass(arguments); 
    return me;
};
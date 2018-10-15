$ns("mx.datacontainers");

$import("mx.datacontainers.GridEntityContainer");
$import("mx.datacontainers.FormEntityContainer");
$import("mx.datacontainers.TreeEntityContainer");

/**
 * 提供一个提供数据容器之间常用互动关系的类。
 */
mx.datacontainers.EntityContainerBinder = function()
{
    var me = this;

    // 此对象包含所有类型的数据容器。对象的属性名用来映射方法，属性值为具体的数据容器类。
    var entityContainers = {};
    entityContainers.form = mx.datacontainers.FormEntityContainer;
    entityContainers.grid = mx.datacontainers.GridEntityContainer;
    entityContainers.tree = mx.datacontainers.TreeEntityContainer;

    /**
     * 提供一个方法，用于绑定两个数据容器。根据数据容器的类名，执行对应的函数完成绑定操作。
     * 
     * @param p_base
     *            两个数据容器，类型及次序不限。
     * @param p_target
     *            两个数据容器，类型及次序不限。
     */
    me.bind = function(p_base, p_target)
    {
        var baseClass = _getClassKey(p_base);
        var targetClass = _getClassKey(p_target);
        var func = eval("("+"_" + baseClass + "_" + targetClass+")");
        func(p_base, p_target);
    };

    function _getClassKey(p_container)
    {
        for ( var p in entityContainers)
        {
            if (p_container.instanceOf(entityContainers[p]))
            {
                return p;
            }
        }
    }

    // 绑定表格数据容器与表单数据容器
    function _grid_form(base, target)
    {
        var formClass = mx.datacontainers.FormEntityContainer;
        if (target.instanceOf(formClass))
        {
            // 表格数据发生改变时，如果绑定的表单中显示同一条数据，则表单数据也发生改变。
            base.on("changed", function(args)
            {
                var changedDataPk = args.entity[base.primaryKey];
                var formPk = target.data[target.primaryKey];
                if (formPk == changedDataPk)
                {
                    // 注意此处不触发 onchanged 事件，否则会无限互相触发。
                    target.setValue(args.fieldName, args.value);
                }
            });
            // 表单数据发生改变时，表格中对应的数据也发生改变。
            target.on("changed", function(args)
            {
                var formPk = target.data[target.primaryKey];
                var changeEntity = base.getByKey(formPk);
                // 注意此处不触发 onchanged 事件，否则会无限互相触发。
                base.setValue(changeEntity, args.fieldName, args.value);
            });
        }
    }

    function _form_grid(base, target)
    {
        _grid_form(target, base);
    }
    return me;
};

mx.datacontainers.EntityContainerBinder = new mx.datacontainers.EntityContainerBinder();
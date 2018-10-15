$ns("mx.windows");

$import("mx.containers.Wizard");

/**
 * 表示一个包含向导对象的窗体，同时它还是一个 {@link mx.windows.Window}
 * 窗体。当用户点击“取消”和“完成”的按钮时，将会关闭该窗体。该窗体对应的 HTML 页面中必须包含一个向导
 * {@link mx.containers.Wizard}。
 * 
 * @example 以下是一个向导如何初始化并添加步骤的示例。 
 * <code language="JavaScript">
 * var wizard = new mx.containers.Wizard();//初始化向导对象。
 * 
 * var step1 = new mx.containers.WizardStep(
 * {
 *     "name" : "step1",
 *     "text" : "text of step1",
 *     "description" : "description of step1"
 * });
 * wizard.appendStep(step1);//添加第一个步骤。
 *  
 * var step2 = new mx.containers.WizardStep(
 * {
 *     "name" : "step2",
 *     "text" : "text of step2",
 *     "description" : "description of step2"
 * });
 * wizard.appendStep(step2);//添加第二个步骤。
 * 
 * //初始化向导窗口。
 * var window = new mx.windows.WindowManager().create(mx.windows.WizardWindow, {"wizard":wizard});
 * </code>
 */
mx.windows.WizardWindow = function()
{
    var me = $extend(mx.windows.Window);
    var base = {};

    /**
     * 获取窗体的宽度，可以是数字（如 500）、字符串（如“500px”或“50%”）。
     * 
     * @default 450
     */
    me.width = 450;

    /**
     * 获取窗体的高度，可以是数字（如 500）、字符串（如“500px”或“50%”）。
     * 
     * @default 400
     */
    me.height = 400;

    /**
     * 获取一个 {@link mx.containers.Wizard} 对象，表示当前窗体的向导对象。
     */
    me.wizard = null;
    
    /**
     * 覆写父类 {@link mx.windows.Window} 中的属性，向导窗体默认可以重用。
     */
    me.reusable = true;

    /**
     * 当向导取消，即 {@link mx.containers.Wizard} 的
     * {@link mx.containers.Wizard.oncancelled} 事件被触发时，将触发该事件。
     */
    me.onwizardcancelled = null;

    /**
     * 当向导完成，即 {@link mx.containers.Wizard} 的
     * {@link mx.containers.Wizard.onfinished} 事件被触发时，将触发该事件。
     */
    me.onwizardfinished = null;

    base.init = me.init;
    me.init = function()
    {
        base.init();
        me.ajax = false;
        if (me.wizard == null)
        {
            me.wizard = new mx.containers.Wizard(
            {
                oncancelled : _cancelled,
                onfinished : _finished
            });
        }
        else
        {
            me.wizard.on("cancelled", _cancelled);
            me.wizard.on("finished", _finished);
        }

        me.$body.append(me.wizard.$e);
    };
	
	base.dispose = me.dispose;
    /**
	* 释放对象运行时动态生成的内容（属性、方法、事件）。
	*/
    me.dispose = function(){
		me.wizard.dispose();
		base.dispose();
	}

    function _cancelled()
    {
        me.trigger("wizardcancelled");
        _close();
    }

    function _finished()
    {
        me.trigger("wizardfinished");
        _close();
    }

    function _close()
    {
        if (me.reusable)
        {
            me.hide();
        }
        else
        {
            me.dispose();
        }
    }
    
    me.endOfClass(arguments); 
    return me;
};
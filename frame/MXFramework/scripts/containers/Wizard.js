$ns("mx.containers");

/**
 * 提供向导控件。示例及其他信息请参见 {@link mx.containers.WizardStep} 和
 * {@link mx.windows.WizardWindow} 类。
 */
mx.containers.Wizard = function()
{
    var me = $extend(mx.controls.Control);
    var base = {};

    /**
     * 获取组件的宽度，可以是数字（如 500）、字符串（如“500px”或“50%”）。
     * 
     * @default auto
     */
    me.width = "auto";

    /**
     * 获取组件的高度，可以是数字（如 500）、字符串（如“500px”或“50%”）。
     * 
     * @default 100%
     */
    me.height = "100%";

    /**
     * 获取一个集合，包含当前向导控件中的所有步骤（{@link mx.containers.WizardStep}）。
     * 
     * @item mx.containers.WizardStep
     * @index 步骤的名称（{@link mx.containers.WizardStep.name}）或步骤在集合中的序号（从 0
     *        开始计数）。
     */
    me.steps = [];

    /**
     * 获取一个 {@link mx.containers.WizardStep} 对象，表示当前正在进行的步骤。请使用 {@link moveTo}
     * 方法设置 activeStep 步骤。另请参见 {@link mx.containers.WizardStep.activate} 方法。
     */
    me.activeStep = null;

    /**
     * @ignore
     */
    me.$head = null;

    /**
     * 一个表示向导主体部分的 JQuery 对象。
     */
    me.$body = null;

    /**
     * @ignore
     */
    me.$bottom = null;
    
    /**
     * 获取或设置向导页的切换模式。
     * 可设的值为。
     * <ul>
     * 	<li>
     * 		detach 表示切换为非选中状态时将向导页体从当前 DOM 上下文中移除。
     * 	</li>
     * 	<li>
     * 		hide   表示切换为非选中状态时将向导页体从当前 DOM 上下文中隐藏。
     * 	</li>
     * </ul>
     * 
     * @default detach 
     */
    me.stepToggleMode = "detach";

    /**
     * 当用户在向导中点击“上一步”、“下一步”按钮或在程序中调用 {@link moveTo} 方法时，将触发该事件。
     * 
     * @cancelable
     * @param step 一个 {@link mx.containers.WizardStep} 对象。
     * @param nextStep 一个 {@link mx.containers.WizardStep} 对象，表示下一步的向导。
     */
    me.onstepchanging = null;
    
    /**
     * 当用户在向导中点击“上一步”、“下一步”按钮或在程序中调用 {@link moveTo} 方法后，将触发该事件。
     */
    me.onstepchanged = null;

    /**
     * 当用户在向导中点击“取消”按钮或在程序中调用 cancel 方法后，将触发该事件。
     */
    me.oncancelled = null;

    /**
     * 当用户在向导中点击“完成”按钮或在程序中调用 finish 方法后，将触发该事件。
     */
    me.onfinished = null;

    /**
     * 初始化方法。执行设置样式并初始化属性等操作。
     */
    base.init = me.init;
    me.init = function()
    {
    	if($.isIE67()) {
    		if(me.width == "auto") me.width = "100%";
    	}
    	
        base.init();
        me.$e.addClass("wizard");
        var htmlStr = "<div id='head'><dl><dt/><dd/></div>"
                + "<div id='body'/>"
                + "<div id='bottom'>"
                + "<div id='buttonGroup'>"
                + "<button id='btnBack' disabled/><button id='btnNext' disabled/>"
                + "<button id='btnFinish' disabled/><button id='btnCancel'/>"
                + "</div>" + "</div>";
        me.$e.html(htmlStr);

        me.$head = me.$e.children("#head");
        me.$body = me.$e.children("#body");
        me.$bottom = me.$e.children("#bottom");

        me.$bottom.find("#btnBack").text("< " + mx.msg("BACK")).click(function()
        {
            me.moveBack();
        });

        me.$bottom.find("#btnNext").text(mx.msg("NEXT") + " >").click(function()
        {
            me.moveNext();
        });

        me.$bottom.find("#btnFinish").text(mx.msg("FINISH")).click(function()
        {
            me.finish();
        });

        me.$bottom.find("#btnCancel").text(mx.msg("CANCEL")).click(function()
        {
            me.cancel();
        });

        if (me.steps == null)
        {
            me.steps = [];
        }
        else
        {
            var steps = me.steps;
            me.steps = [];
            for (var i = 0; i < steps.length; i++)
            {
                me.appendStep(steps[i]);
            }
        }
        
        // IE6调整初始化body大小
        if($.isIE6() && me.$body) {
        	me.$e.resize(function(){
        		me.$body.css({
        			height: me.$e.height() - me.$head.outerHeight() - me.$bottom.outerHeight()
        		});
        	});
        }
    };
	
	base.dispose = me.dispose;
    /**
	* 释放对象运行时动态生成的内容（属性、方法、事件）。
	*/
    me.dispose = function(){
		if (me.steps != null)
        {
            for ( var i = 0; i < me.steps.length; i++)
            {
                var page = me.steps[i];
                if($notEmpty(page))
                {
                	me.steps[page.name] = null;
                	delete me.steps[page.name];
                	
                	page.dispose();
                	page = null;
                	me.steps[i] = null;
                }
            }
            me.steps.clear();
        }
		
		base.dispose();
	}
    
    /**
     * 设置 {@link enabled} 字段的值。
     * 
     * @param p_enabled : 布尔值 true：控件可用反之不可用
     */
    me.setEnabled = function(p_enabled) {
		if (typeof (p_enabled) != "undefined")
        {
            me.enabled = p_enabled;  
            me.$e.toggleClass("disabled", !p_enabled);
            if(me.$bottom == null)
            {
            	return;
            }
            _refreshButtons();
        }
	};

    /**
     * 向 {@link steps} 字段的集合中追加一个步骤。
     * 
     * @param p_step
     *            一个 {@link mx.containers.WizardStep} 对象，表示需要追加的步骤。
     */
    me.appendStep = function(p_step)
    {
        var step = null;

        if ($.isPlainObject(p_step))
        {
            step = new mx.containers.WizardStep(p_step);
        }
        else
        {
            step = p_step;
        }
        
        if (!step.initialized)
        {
            step.init();
        }
		
        if ($notEmpty(me.steps[step.name]))
        {
        	throw new Error(mx.err("DUPLICATED_ITEM", [ step.name ])); 
        }
        me.steps.add(step);
        if ($notEmpty(step.name))
        {
            me.steps[step.name] = step;
        }
        step.owner = me;

        if (me.steps.length == 1)
        {
            me.moveTo(0);
        }
        else
        {
            _refreshButtons();
        }
    };

    /**
     * 向 {@link steps} 字段的集合中追加一组步骤。
     * @param p_steps 一个 {@link mx.containers.WizardStep} 对象集合。
     */
    me.appendSteps = function(p_steps)
    {
        for (var i = 0; i < p_steps.length; i++)
        {
            me.appendStep(p_steps[i]);
        }
    };
    
    /**
     * 获取一个 Boolean 值，表示当前向导是否允许用户返回到上一步。
     */
    me.canMoveBack = function()
    {
        if (me.activeStep == null)
        {
            return false;
        }

        return me.activeStep.allowMoveBack && me.activeStep.getLastStep() != null;
    };

    /**
     * 获取一个 Boolean 值，表示当前向导是否允许用户前进到下一步。
     */
    me.canMoveNext = function()
    {
        if (me.activeStep == null)
        {
            return false;
        }

        return me.activeStep.getNextStep() != null;
    };

    /**
     * 获取一个 Boolean 值，表示是否允许用户完成该向导。
     */
    me.canFinish = function()
    {
        if (me.activeStep == null)
        {
            return false;
        }

        return me.activeStep.getIndex() == me.steps.length - 1 || me.activeStep.allowFinish;
    };

    /**
     * 将当前向导移到指定的步骤。
     * <p>
     * 该方法将依次触发：
     * <ul>
     * <li>当前步骤的 {@link mx.containers.WizardStep.onstepchanging} 事件。</li>
     * <li>当前步骤的 {@link mx.containers.WizardStep.ondeactivate} 事件。</li>
     * <li>p_step 参数指定的下一步骤的 {@link mx.containers.WizardStep.onactivate} 事件。</li>
     * <li>向导控件的 {@link mx.containers.Wizard.onstepchanged} 事件。</li>
     * </ul>
     * </p>
     * 
     * @overload function(p_step)
     * @overload function(p_step, p_moveBack)
     * 
     * 
     * @param p_step
     *            指定的步骤，该参数可以是表示步骤的名称的一个字符串，或一个表示步骤序号的数字（从 0 开始计数），或一个
     *            {@link mx.containers.WizardStep} 对象。
     * @param [p_moveBack=false]
     *            指定向导移动的方向。如果是后退移动，则必须指定为 true。
     */
    me.moveTo = function(p_step, p_moveBack)
    {
        var step = null;
        if (typeof (p_step) == "object")
        {
            step = p_step;
        }
        else
        {
            step = me.steps[p_step];
        }
        if (step == null)
        {
            return;
        }

        if (me.activeStep != null)
        {
            var args = { cancel:false, step:me.activeStep, nextStep:step };
            me.trigger("stepchanging", args);
            if (args.cancel)
            {
                return;
            }
        }
        
        var lastStep = me.activeStep;

        if (me.activeStep)
        {
            me.activeStep.active = false;
            me.activeStep.trigger("deactivate");
            
            if (me.stepToggleMode == "hide")
            {
            	me.activeStep.$e.hide();
            }
            else
            {
            	me.activeStep.$e.detach();
            }
        }

        me.activeStep = step;
        
        if (me.stepToggleMode == "hide")
        {
        	me.activeStep.$e.show();
        }
        
        if (!p_moveBack && lastStep)
        {
            me.activeStep.lastStep = lastStep;
        }

        me.$body.append(me.activeStep.$e);

        me.activeStep.active = true;
        me.refresh();

        me.activeStep.trigger("activate");
        me.trigger("stepchanged");
    };

    /**
     * 将当前向导移到下一个步骤。当用户点击“下一步”按钮时将执行该方法。请参见 {@link mx.containers.Wizard.moveTo}
     * 方法。
     */
    me.moveNext = function()
    {
        if (!me.canMoveNext())
        {
            return;
        }

        me.moveTo(me.activeStep.getNextStep());
    };

    /**
     * 将当前向导移到上一个步骤。当用户点击“上一步”按钮时将执行该方法。请参见 {@link mx.containers.Wizard.moveTo}
     * 方法。
     */
    me.moveBack = function()
    {
        if (!me.canMoveBack())
        {
            return;
        }

        me.moveTo(me.activeStep.getLastStep(), true);
    };

    /**
     * 完成当前向导。当用户点击“完成”按钮时将执行该方法。该方法将依次触发 {@link onfinished} 事件。
     */
    me.finish = function()
    {
        me.trigger("finished");
    };

    /**
     * 取消当前向导。当用户点击“取消”按钮时将执行该方法。该方法将依次触发 {@link oncancelled} 事件。
     */
    me.cancel = function()
    {
        me.trigger("cancelled");
    };

    /**
     * 刷新当前向导。向导的标题栏和按钮等状态均会被刷新。
     * @ignore
     */
    me.refresh = function()
    {
        _refreshButtons();
        if(me.activeStep.text != null)
        	me.$head.find("dt").text(me.activeStep.text);
        if(me.activeStep.description != null)
        	me.$head.find("dd").text(me.activeStep.description);
    };

    function _refreshButtons()
    {
    	if (me.enabled == true) {
			me.$bottom.find("#btnBack").enabled(me.canMoveBack());
			me.$bottom.find("#btnNext").enabled(me.canMoveNext());
			me.$bottom.find("#btnFinish").enabled(me.canFinish());
		}
		if (me.enabled == false) {
			me.$bottom.find("#btnBack").enabled(false);
			me.$bottom.find("#btnNext").enabled(false);
			me.$bottom.find("#btnFinish").enabled(false);
		}
    }

    me.endOfClass(arguments); 
    return me;
};



/**
 * 表示向导控件（{@link mx.containers.Wizard}）中的一个步骤。可通过 owner
 * 属性获取该步骤所属的向导。示例及其他信息请参见 {@link mx.containers.Wizard} 和
 * {@link mx.windows.WizardWindow} 类。
 */
mx.containers.WizardStep = function()
{
    var me = $extend(mx.containers.Container);
    var base = {};

    /**
     * 获取一个 {@link mx.containers.Wizard} 对象，表示该步骤所属的向导。
     */
    me.owner = null;

    /**
     * 表示向导控件的名称，该名称可被用作 {@link mx.containers.Wizard.steps} 字段的索引。
     */
    me.name = null;

    /**
     * 获取当前向导步骤的正标题。请使用 {@link setText} 方法设置该字段的值。
     */
    me.text = null;

    /**
     * 获取当前向导步骤的副标题。请使用 {@link setDescription} 方法设置该字段的值。
     */
    me.description = null;

    /**
     * 获取一个 Boolean 值，表示当前步骤是否处于激活状态，在一个向导（{@link mx.containers.Wizard}）中同一时刻仅会有一个激活步骤。
     */
    me.active = false;

    /**
     * 获取或设置当前向导步骤是否允许用户移至上一步。
     * 
     * @default true
     */
    me.allowMoveBack = true;

    /**
     * 获取或设置当前向导步骤是否允许用户完成该向导。
     * 
     * @default false
     */
    me.allowFinish = false;

    /**
     * 获取或设置一个 {@link mx.containers.WizardStep} 对象，表示当前向导的上一步骤。如果为 null 则表示由
     * Wizard 控件自动决定。请参见 {@link getLastStep} 方法。
     */
    me.lastStep = null;

    /**
     * 当向导步骤被激活后（即所在向导移动到当前步骤后），将触发该事件。
     */
    me.onactivate = null;

    /**
     * 当向导步骤为激活状态（即 {@link active} 属性为 true）并且当前向导即将移动到下一步骤前，将触发该事件。
     */
    me.ondeactivate = null;

    /**
     * 初始化方法。执行设置样式并初始化属性等操作。
     */
    base.init = me.init;
    me.init = function()
    {
        base.init();
        me.$e.attr("id", me.name);
        me.setDescription(me.description);
        me.$e.addClass("wizardStep");
    };

    /**
     * 设置 {@link text} 字段的值。
     */
    me.setText = function(p_text)
    {
        me.text = p_text;
        if (me.active && me.owner)
        {
        	me.owner.$head.find("dt").text(me.text);
        }
    };

    /**
     * 设置 {@link description} 字段的值。
     */
    me.setDescription = function(p_description)
    {
        me.description = p_description;
        if (me.active && me.owner)
        {
        	me.owner.$head.find("dd").text(me.description);
        }
    };

    /**
     * 获取一个 {@link mx.containers.WizardStep} 对象，表示当前步骤的上一步。 如果 {@link lastStep}
     * 字段的值为空并且不是第一个步骤，则返回上一个步骤；如果该字段不为空，则返回该字段所指定的步骤。
     */
    me.getLastStep = function()
    {
        var index = me.getIndex();
        if (index == 0)
        {
            return null;
        }
        
        if (me.lastStep == null)
        {
            if (index > 0)
            {
                return me.owner.steps[index - 1];
            }
        }
        return me.lastStep;
    };

    /**
     * 获取一个 {@link mx.containers.WizardStep} 对象，表示当前步骤的下一步。
     * 如果当前步骤不是最后一个步骤，则返回下一个步骤。
     */
    me.getNextStep = function()
    {
        var index = me.getIndex();
        if (index > -1 && index < me.owner.steps.length - 1)
        {
            return me.owner.steps[index + 1];
        }
        return null;
    };

    /**
     * 获取一个整数，表示当前步骤在所属向导中的序号（从 0 开始计数）。
     */
    me.getIndex = function()
    {
        if (me.owner != null)
        {
            return me.owner.steps.indexOf(me);
        }
        else
        {
            return -1;
        }
    };

    /**
     * 将向导的正文内容部分设置为当前步骤。该方法会触发多个事件，详见 {@link mx.containers.Wizard.moveTo} 方法。
     */
    me.activate = function()
    {
        if (me.owner != null)
        {
            me.owner.moveTo(me);
        }
    };

    me.endOfClass(arguments); 
    return me;
};
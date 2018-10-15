/**
 * 表示 MX 框架中所有组件的基类。 在 MX
 * 框架中控件、编辑器、容器控件、视图、视图控制器等均为组件。通常组件向外暴露出属性、方法和事件，并有自己的生命周期。
 * 组件的生命周期包括实例化、初始化，通常在实例化的过程中会自动初始化； 也可以通过将 {@link autoInit} 属性设置为
 * false，在实例化过程中不自动初始化，而是在程序中手动调用 {@link init} 方法进行初始化。
 * 
 * @abstract
 */
MXComponent = function()
{
    var me = $extend(MXObject);
    var base = {};
    
    
    /**
     * 获取组件的唯一标识。
     */
    me.id = null;
    
    /**
     * 获取一个 Boolean 值，表示是否需要在实例化时自动调用 {@link init} 方法。
     * 
     * @default true
     */
    me.autoInit = true;
    
    /**
     * 获取一个 Boolean 值，表示是否已经初始化。
     * 
     * @default false
     */
    me.initialized = false;
    
    /**
     * 设置AOP前置通知。在指定织入点创建一个前置通知。通知在被织入的方法之前执行，不能改变原方法的行为或阻止它执行。
     * 
     * 该字段的值为一个Object对象或对象数组，对象格式为：
     * 
     * {method:"方法名称", callback: function(args) { }}
     * 
     * 其中method为被织入的方法，callback为通知方法，args为被织入方法的参数值。
     * 
     * 
     * @example 以下是一个示例
     * 
     * <code language="JavaScript">
     * var textEditor = new mx.editors.TextEditor(
     * {
     *     beforeMethod : {method: "setValue", callback:function(args) { 
	 *			alert(args); //args为setValue方法的参数值
	 *	   }}
     * });
     * </code> 
     * 
     * @default null
     */
	me.beforeMethod = null;
	
	/**
     * 设置AOP后置通知。在指定织入点创建一个后置通知。通知在被织入的方法之后执行。
     * 
     * 该字段的值为一个Object对象或对象数组，对象格式为：
     * 
     * {method:"方法名称", callback: function(val) { }}
     * 
     * 其中method为被织入的方法，callback为通知方法，val为被织入方法的返回值。
     * 
     * @example 以下是一个示例
     * 
     * <code language="JavaScript">
     * var textEditor = new mx.editors.TextEditor(
     * {
     *     afterMethod : {method: "setValue", callback:function(val) { 
	 *			alert(val); //val为setValue方法的返回值
	 *	   }}
     * });
     * </code>
     * 
     * @default null
     */
	me.afterMethod = null;
	
	/**
     * 设置AOP环绕通知。在指定切入点处创建一个环绕通知，此类型的通知通过调用innovation.proceed()能够控制切入点方法的执行，也能在函数执行前更改它的参数。
     * 
     * 该字段的值为一个Object对象或对象数组，对象格式为：
     * 
     * {method:"方法名称", callback: function(invocation) { 
     * 		return invocation.proceed(); 
     * }}
     * 
     * 其中method为被织入的方法，callback为通知方法，invocation包含一个proceed()方法和两个属性：argurments（被织入方法的参数）及method（被织入方法的名称）。
     * 
     * 
     * @example 以下是一个示例
     * 
     * <code language="JavaScript">
     * var textEditor = new mx.editors.TextEditor(
     * {
     *     aroundMethod : {method:"setValue", callback: function(invocation) { 
	 *			alert(invocation.arguments[0]); //invocation.arguments为setValue方法的参数值，也可通过invocation.arguments修改setValue方法的参数值
	 *			var rv = invocation.proceed();//调用方法
	 *			alert(invocation.method);//invocation.method为setValue方法的名称
	 *			return rv;
	 *	   }}
     * });
     * </code> 
     * 
     * @default null
     */
	me.aroundMethod = null;
	
	/**
     * 设置AOP引入。此通知的方法将替代被织入的方法。
     * 
     * 该字段的值为一个Object对象或对象数组，对象格式为：
     * 
     * {method:"方法名称", callback: function() { }}
     * 
     * 其中method为被织入的方法，callback为通知方法。
     * 
     * @example 以下是一个示例
     * 
     * <code language="JavaScript">
     * var textEditor = new mx.editors.TextEditor(
     * {
     *     introductionMethod : {method:"setValue", callback:function() { 
	 *			alert("setValue方法已被替换"); 
	 *	   }}
     * });
     * </code>
     * 
     * @default null
     */
	me.introductionMethod = null;
    
    base._ = me._;    
    me._ = function(p_options)
    {
        if (me.canConstruct())
        {
            base._(p_options);
            
            //AOP
			if(me.beforeMethod)
			{
				if(me.beforeMethod instanceof Array)
				{
					for(var o in me.beforeMethod)
					{
						if(me.beforeMethod[o].method && me.beforeMethod[o].callback)
						{
							$.aop.before( 
						       {target: me, method: me.beforeMethod[o].method}, 
						       me.beforeMethod[o].callback
					        );
						}
					}
				}
				else if(me.beforeMethod.method && me.beforeMethod.callback)
				{
					$.aop.before( 
				        {target: me, method: me.beforeMethod.method}, 
				        me.beforeMethod.callback
			        );
				}
			}
			
			if(me.afterMethod)
			{
				if(me.afterMethod instanceof Array)
				{
					for(var o in me.afterMethod)
					{
						if(me.afterMethod[o].method && me.afterMethod[o].callback)
						{
							$.aop.after( 
						       {target: me, method: me.afterMethod[o].method}, 
						       me.afterMethod[o].callback
					        );
						}
					}
				}
				else if(me.afterMethod.method && me.afterMethod.callback)
				{
					$.aop.after( 
				        {target: me, method: me.afterMethod.method}, 
				        me.afterMethod.callback
			        );
				}
			}
			
			if(me.aroundMethod)
			{
				if(me.aroundMethod instanceof Array)
				{
					for(var o in me.aroundMethod)
					{
						if(me.aroundMethod[o].method && me.aroundMethod[o].callback)
						{
							$.aop.around( 
						       {target: me, method: me.aroundMethod[o].method}, 
						       me.aroundMethod[o].callback
					        );
						}
					}
				}
				else if(me.aroundMethod.method && me.aroundMethod.callback)
				{
					$.aop.around( 
				        {target: me, method: me.aroundMethod.method}, 
				        me.aroundMethod.callback
			        );
				}
			}
			
			if(me.introductionMethod)
			{
				if(me.introductionMethod instanceof Array)
				{
					for(var o in me.introductionMethod)
					{
						if(me.introductionMethod[o].method && me.introductionMethod[o].callback)
						{
							$.aop.introduction( 
						       {target: me, method: me.introductionMethod[o].method}, 
						       me.introductionMethod[o].callback
					        );
						}
					}
				}
				else if(me.introductionMethod.method && me.introductionMethod.callback)
				{
					$.aop.introduction( 
				        {target: me, method: me.introductionMethod.method}, 
				        me.introductionMethod.callback
			        );
				}
			}
            
            if (me.autoInit)
            {
                me.init();
            }
        }
    };
   
    /**
     * 初始化。
     */
    me.init = function()
    {
        me.initialized = true;
    };
    
    /**
     * 订购事件。
     * 
     * @param p_eventType  事件类型。
     * @param p_function  事件处理函数。
     * 
     * @example 
     * 下面的示例订购了 component 组件的 valuechanged 事件。 
     * <code language="JavaScript">
     * MyComponent = function()
     * {
     *     var me = $extend(MXComponent);
     *     
     *     // 声明 valuechanged 事件。
     *     me.onvaluechanged = null;
     *     
     *     me.endOfClass(arguments); return me;
     * }
     * 
     * var component = new MyComponent();
     * component.on("valuechanged", function(e) {
     *     alert(e.target + "'s value changed.");
     * });
     * </code>
     * 
     * @example 
     * 上一示例也可以通过在实例化组件时，通过构造参数实现订购事件。 
     * <code language="JavaScript">
     * var component = new MyComponent({
     *     onvaluechanged: function(e)
     *     {
     *         alert(e.target + "'s value changed.");
     *     }
     * });
     * </code>
     * 
     */
    me.on = function(p_eventType, p_function)
    {
        var eventType = "on" + p_eventType;
        if (typeof(me[eventType]) == "undefined")
        {
            return;
        }
        if (me[eventType] == null)
        {
            me[eventType] = new MXEvent();
        }
        me[eventType].addEventListener(p_function);
    };
    
    /**
     * 退购事件。
     * 
     * @param [p_eventType = null]
     *            事件类型。如果参数为 null，则退购所有事件。
     * @param [p_function = null]
     *            事件处理函数。如果参数为 null，则退购 p_eventType 类型的所有事件。
     * 
     * @example 
     * 下面的示例退购了 component 组件的一个 click 事件。 
     * <code language="JavaScript">
     * MyComponent = function()
     * {
     *     var me = $extend(MXComponent);
     *     
     *     // 声明 valuechanged 事件。
     *     me.onclick = null;
     *     
     *     me.endOfClass(arguments); return me;
     * }
     * 
     * function _component_click(e)
     * {
     *     alert(e.target + " is clicked.");
     *     component.off("click", _component_click);
     * }
     * 
     * var component = new MyComponent();
     * component.on("click", _component_click);
     * </code>
     * 
     * @example 
     * 下面的示例退购了 component 组件的所有 click 事件。 
     * <code language="JavaScript">
     *      var component = new MyComponent();
     *      component.off("click");
     * </code>
     * 
     * @example 
     * 下面的示例退购了 component 组件的所有事件。 
     * <code language="JavaScript">
     *      var component = new MyComponent();
     *      component.off();
     * </code>
     * 
     */
    me.off = function(p_eventType, p_function)
    {
        if (p_eventType == null && p_function == null)
        {
            for (var name in this)
            {
                if (this[name] != null && this[name].constructor == MXEvent)
                {
                    this[name].clear();
                    this[name] = null;
                }
            }
        }
        else
        {
            var eventType = "on" + p_eventType;
            if (typeof(me[eventType]) == "undefined")
            {
                return;
            }
            
            if (me[eventType] != null)
            {
                if (p_function != null)
                {
                    me[eventType].removeEventListener(p_function);
                }
                else
                {
                    me[eventType].clear();
                }
            }
        }
    };
    
    /**
     * 返回一个 Boolean 值，表示指定的 p_eventType 类型的事件是否已订购。返回值为 true，表示已订购；反之则没有。
     * 
     * @param p_eventType 事件类型。
     */
    me.hasBound = function(p_eventType)
    {
        var eventType = "on" + p_eventType;
        if (typeof(me[eventType]) == "undefined")
        {
            return false;
        }
        if (me[eventType] != null)
        {
            return me[eventType].listeners.length > 0;
        }
        else
        {
            return false;
        }
    };
    
    /**
     * 触发事件。
     * 
     * @param p_eventType 事件类型。
     * @param p_args 事件参数。事件参数中默认有两个属性“target”和“type”，分别表示事件触发者和触发的事件类型。
     */
    me.trigger = function(p_eventType, p_args)
    {
        var eventType = "on" + p_eventType;
        if (typeof(me[eventType]) == "undefined")
        {
            return;
        }
        
        if (me[eventType] != null)
        {
            var e = null;
            if (p_args != null)
            {
                e = p_args;
            }
            else
            {
                e = {};
            }
            e.target = me;
            
            e.type = p_eventType;
            
            me[eventType].fire(e);
        }
    };
    
    base.instanceOf = me.instanceOf;
    /**
     * 返回一个 Boolean 值，表示组件是否为指定的类型的子类或本身。
     * 
     * @param p_class 指定的类型。
     */
    me.instanceOf = function(p_class)
    {
        if (p_class == MXComponent)
        {
            return true;
        }
        return base.instanceOf(p_class);
    };
    
    base.dispose = me.dispose;
    /**
     * 释放对象运行时动态生成的内容（属性、方法、事件）。
     */
    me.dispose = function()
    {
        me.off();
		me.removeJQuryCache();
        base.dispose();
		base=null;
		delete base;
    };
	/**
	* 释放JQuery对象中如$("<div/>")等DOM引用
	*/
	me.removeJQuryCache=function(fragment){
		if(jQuery&&jQuery.fragments){
			for(var p in jQuery.fragments){
				if(jQuery.fragments.hasOwnProperty(p)){					
					jQuery.fragments[p]=null;
					delete jQuery.fragments[p];
				}
			}
		}		
	}
		    
    me.endOfClass(arguments); 
    return me;
};
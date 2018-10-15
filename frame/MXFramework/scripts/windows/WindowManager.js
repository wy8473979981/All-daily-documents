$ns("mx.windows");

$import("mx.utils.ObjectPool");
$import("mx.windows.AjaxWindow");
$import("mx.windows.IFrameWindow");
$import("mx.windows.Window");
$import("mx.windows.WizardWindow");

/**
 * 提供一个负责创建窗体的类。
 */
mx.windows.WindowManager = function()
{
    var me = $extend(MXComponent);
    var base = {};
    
    /**
     * 获取控件当前所属 {@link mx.weblets.Weblet} 的上下文信息（ {@link mx.weblets.WebletContext} 类型）。
     */
    me.context = null;
    
    /**
     * 获取一个 {@link mx.windows.Window} 数组，包含全局所有窗体。
     * 
     * @item mx.windows.Window
     */
    me.windows = [];
    
    
    /**
     * 获取一个 {@link mx.windows.Window} 对象，表示当前处于激活状态的窗体。在同一时刻全局有且只有一个激活窗体。
     */
    me.activeWindow = null;

    /**
     * 全局事件。当有窗体通过 {@link create} 方法被创建后将触发该事件。
     * 
     * @param window 被创建的窗体({@link mx.windows.Window})对象。
     */
    me.oncreate = null;
    
    /**
     * 全局事件。当有窗体通过 show、showDialog 等方法显示后将触发该事件。
     * 
     * @param window 显示的窗体({@link mx.windows.Window})对象。
     */
    me.onshown = null;
    
    /**
     * 全局事件。当窗体通过 close、hide 等方法隐藏后将触发该事件。
     * 
     * @param window 被隐藏的窗体({@link mx.windows.Window})对象。
     */
    me.onhide = null;
    
    /**
     * 全局事件。当窗体通过 close 方法关闭后将触发该事件。
     * 
     * @param window 被关闭的窗体({@link mx.windows.Window})对象。
     */
    me.onclose = null;
    
    /**
     * 全局事件。当窗体被激活后将触发该事件。
     * 
     * @param window 被激活的窗体({@link mx.windows.Window})对象。
     */
    me.onactivate = null;
    
    base.init = me.init;
    me.init = function()
    {
        base.init();
    };
    
    /**
     * 创建一个窗体（{@link mx.windows.Window} 或任意派生类的实例），并将其返回。
     * 
     * @param [p_windowClass=mx.windows.Window] 窗体的类型。如 mx.windows.Window。
     * @param [p_options] 一个 JSON 对象，表示创建窗体时所需的参数。
     *
     * @example
     * 创建一个默认的空窗体。
     * <code language="JavaScript">
     * var win = new mx.windows.WindowManager().create();
     * </code>
     * 
     * @example
     * 根据指定参数创建窗体。
     * <code language="JavaScript">
     * var win = new mx.windows.WindowManager().create({ title: "新窗体", width: 500, height: 400 });
     * </code>
     * 
     *  @example
     * 根据指定参数创建 IFrameWindow 窗体。
     * <code language="JavaScript">
     * var win = new mx.windows.WindowManager().create({url:"http://www.baidu.com", ajax:false, title: "新窗体", width: 500, height: 400 });
     * </code>
     */
    me.create = function(p_windowClass, p_options)
    {
        var T = mx.windows.Window;
        var options = {};
        
        if (p_options != null)
        {            
            options = p_options;
            T = p_windowClass;
        }
        else
        {
            if ($isFunction(p_windowClass))
            {
                T = p_windowClass;
            }
            else if ($.isPlainObject(p_windowClass))
            {
                options = p_windowClass;
            }
        }
        
        if (options.url != null)
        {
        	if (T != mx.windows.IFrameWindow)
        	{
        		T = (options.ajax == true || typeof(options.ajax) == "undefined") ? mx.windows.AjaxWindow : mx.windows.IFrameWindow;
        	}
        }
       
        options.context = me.context;
        options.windowManager = me;
        var win = new T(options);
        
        me.trigger("create", { window:win });
        return win;
    };
    
    /**
     * 根据视图创建一个窗体（{@link mx.windows.Window} 或任意派生类的实例），并将其返回。
     * 
     * @param p_view  一个 {@link mx.views.View} 对象。
     * @param [p_options] 一个 JSON 对象，表示创建窗体时所需的参数。
     */
    me.createFromView = function(p_view, p_options)
    {
        var options = null;
        if ($.isPlainObject(p_options))
        {
            options = p_options;
        }
        else
        {
            options = {};
        }
        
        options.view = p_view;
        var win = me.create(mx.windows.Window, options);
        return win;
    };
    
    /**
     * 根据视图控制器创建一个窗体（{@link mx.windows.Window} 或任意派生类的实例），并将其返回。
     * 
     * @param p_viewController  一个 {@link mx.views.ViewController} 对象；或者一个字符串，表示视图控制器的命名空间（如：“dbm.views.DetailViewController”或者“views.DetailViewController”，可以不写 Weblet 的名称）。
     * @param [p_options] 一个 JSON 对象，表示创建窗体时所需的参数。
     */
    me.createFromViewController = function(p_viewController, p_options)
    {
        var options = null;
        if ($.isPlainObject(p_options))
        {
            options = p_options;
        }
        else
        {
            options = {};
        }
        
        options.viewController = p_viewController;
        var win = me.create(mx.windows.Window, options);
        return win;
    };
    
    /**
     * 隐藏所有窗体。
     */
    me.hideAll = function()
    {
        for (var i = 0; i < me.windows.length; i++)
        {
            if (me.windows[i].visible)
            {
                me.windows[i].hide();
            }
        }
    };
    
    /**
     * 关闭所有窗体。
     */
    me.closeAll = function()
    {
        while (me.windows.length > 0)
        {
            var result = me.windows.last().close();
            if (result == false)
            {
                return false;
            }
        }
        return true;
    };
    
    
    var _maskPool = null;
    /**
     * @ignore
     */
    me._createMask = function(p_options)
    {
        if (_maskPool == null)
        {
            _maskPool = new mx.utils.ObjectPool(me._newMask);
        }
        var $mask = _maskPool.getObject();


        ((p_options && p_options.$container) ? p_options.$container : me.$container).append($mask);

        $mask.css("zIndex", me.zIndex++);
        $mask.css(p_options);
        return $mask;
    };

    /**
     * @ignore
     */
    me._newMask = function()
    {
        return $("<div class='mx mask'/>");
    };

    /**
     * @ignore
     */
    me._hideMask = function($p_mask)
    {
        $p_mask.fadeOut("fast", function()
        {
            $p_mask.remove();
        });
        if (_maskPool != null)
        {
            _maskPool.passivateObject($p_mask);
        }
    };

    /**
     * @ignore
     */
    me.zIndex = 1;
    
    /**
     * @ignore
     */
    me._topZIndex = function(p_window)
    {
        return me.zIndex++;
    };
    
    var _winPos = { x: -1, y: -1, offsetX: 30, offsetY: 30 };
    /**
     * @ignore
     */
    me._nextWindowPosition = function(p_window)
    {
        if (me.windows != null  &&  me.windows.length <= 1)
        	_winPos = { x: -1, y: -1, offsetX: 30, offsetY: 30 };
        if ((_winPos.x == -1 && _winPos.y == -1))
        {
            var result = me._centerWindowPosition(p_window);
            _winPos.x = result.left;
            _winPos.y = result.top;
            return result;
        }
        else
        {
            //计算当前可见的窗体的个数
            var visibleWindows = 0;
            for (var i = 0; i < me.windows.length; i++)
            {
                if (true == me.windows[i].visible)
                {
                    visibleWindows++;
                }
            }
            if (visibleWindows == 0)
            {
                var result = me._centerWindowPosition(p_window);
                _winPos.x = result.left;
                _winPos.y = result.top;
                return result;
            }
            
            _winPos.x += _winPos.offsetX;
            _winPos.y += _winPos.offsetY;

            if (_winPos.x + p_window.$e.width() > me.$container.width() - Math.abs(_winPos.offsetX))
            {
                _winPos.offsetX = -_winPos.offsetX;
            }
            else if (_winPos.x < Math.abs(_winPos.offsetX))
            {
                _winPos.offsetX = -_winPos.offsetX;
                _winPos.x = Math.abs(_winPos.offsetX);
            }

            if (_winPos.y + p_window.$e.height() > me.$container.height() - Math.abs(_winPos.offsetY))
            {
                _winPos.offsetY = -_winPos.offsetY;
            }
            else if (_winPos.y < Math.abs(_winPos.offsetY))
            {
                _winPos.offsetY = -_winPos.offsetY;
                _winPos.y = Math.abs(_winPos.offsetY);
            }
            return { left: _winPos.x, top: _winPos.y };
        }
    };
    
    /**
     * @ignore
     */
    me._centerWindowPosition = function(p_window)
    {
        var $container = null;

        if (p_window.$mask != null)
        {
            $container = p_window.$mask;
        }
        else
        {
            $container = me.$container;
        }

        var w = p_window.$e.width();
        if (typeof(w) == "string" && w.endsWith("%"))
        {
            w = $container.width() * parseInt(w) / 100;
        }

        var h = p_window.$e.height();
        if (typeof(h) == "string" && h.endsWith("%"))
        {
            h = $container.height() * parseInt(h) / 100;
        }

        var x = ($container.width() - w) / 2;
        var y = ($container.height() - h) / 2;

        if (x < 0)
        {
            x = 0;
        }

        if (y < 0)
        {
            y = 0;
        }

        return { left: x, top: y };
    };
    
    if (me.$container == null)
    {
        me.$container = $(document.body);
    }
    
    /**
     * 用来保存活动的窗口 
     */
    var _activeWindowStack = [];
    
     /**
     *@ignore
     *将活动的窗口推入堆栈
     */
    me._pushActiveWindow = function(p_window)
    {
    	 //如果窗口已经存在，先删除，再添加到队尾
    	 if(_activeWindowStack.contains(p_window))
    	 {
    	      _activeWindowStack.remove(p_window);
    	 }
    	 _activeWindowStack.add(p_window);
    }
    
    /**
     *@ignore
     *将活动的窗口弹出堆栈
     *如果没有活动的窗口，返回null
     */
    me._popActiveWindow = function()
    {
         var win = _activeWindowStack[ _activeWindowStack.length-1 ]; 
         _activeWindowStack.removeLast();
         return (typeof win == "undefined") ? null : win;
    }
      
    /**
     *@ignore
     * 将窗口从堆栈中移除。
     */
    me._removeActiveWindow = function(p_window)
    {
        if(arguments.length==1)
        {
            _activeWindowStack.remove(p_window);
        }
    }
    
    me.endOfClass(arguments); 
    return me;
};
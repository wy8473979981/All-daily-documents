$ns("mx.windows");

$import("mx.views.ViewPort");

/**
 * 提供所有窗体的基类。通常请使用 {@link mx.windows.WindowManager.create} 方法来创建窗体。
 */
mx.windows.Window = function()
{
    var me = $extend(mx.views.ViewPort);
    var base = {};

    /**
     * 获取窗体的宽度，可以是数字（如 500）、字符串（如“500px”或“50%”）。请使用 {@link setWidth}、{@link resizeTo} 方法设置该字段的值。
     * 
     * @default 640
     */
    me.width = 640;

    /**
     * 获取窗体的高度，可以是数字（如 500）、字符串（如“500px”或“50%”）。请使用 {@link setHeight}、{@link resizeTo} 方法设置该字段的值。
     * 
     * @default 480
     */
    me.height = 480;
    
    /**
     * @ignore
     * 获取窗体的初始显示状态。
     * 
     * @default false
     */
    me.visible = false;

    /**
     * 获取或设置一个 Boolean 值，表示窗体是否处于激活状态。
     * 
     * @default false
     */
    me.activated = false;
    
    /**
     * 获取窗体的左边缘与浏览器左边缘之间的距离，除使用数字（如 100）或字符串（如“100px”、“50%”）等绝对位置外，还可以使用“center”字符串来表示水平方位居中显示。请使用 {@link moveTo} 方法设置该字段的值。
     * 
     * @default auto
     */
    me.left = "auto";

    /**
     * 获取窗体的上边缘与浏览器上边缘之间的距离，除使用数字（如 100）或字符串（如“100px”、“50%”）等绝对位置外，还可以使用“center”字符串来表示水平方位居中显示。请使用 {@link moveTo} 方法设置该字段的值。
     * 
     * @default auto
     */
    me.top = "auto";

    /**
     * @ignore
     * 详见 {@link mx.controls.Control.position} 属性。
     * 
     * @default absolute
     */
    me.position = "absolute";
    
    /**
     * 获取窗体标题栏中的文本。请使用 {@link setTitle} 方法设置该字段的值。
     */
    me.title = null;

    /**
     * 获取窗体状态栏中的文本。请使用 {@link setStatus} 方法设置该字段的值。stuats 字段仅当 {@link displayStatus} 字段为 true 时，才能看见状态栏中的内容。
     */
    me.status = null;

    /**
     * 获取窗体是否正处于正在加载状态，如果该值为 true，则窗体的状态栏中会显示一个正在加载的图标。请使用 {@link setStatus} 方法设置该字段的值。
     * 
     * @default false
     */
    me.isLoading = false;

    /**
     * 获取窗体是否正处于忙碌状态，如果该值为 true，则会自动将 {@link isLoading} 字段设置为 true，并且窗体会变暗，同时阻止用户对该窗体的所有操作。请使用 {@link setBusy} 方法设置该字段的值。
     * 
     * @default false
     */
    me.isBusy = false;

    /**
     * 获取或设置当前窗体是否可被重复使用。当用户点击“关闭”按钮时，如果该值为 true，会调用 {@link hide} 方法隐藏窗体；如果为 false，则会调用 {@link close} 方法关闭窗体，并销毁其中的所有元素。
     * 
     * @default false
     */
    me.reusable = false;

    /**
     * 获取一个字符串，表示当前窗体的状态。请使用 {@link setWindowState} 方法设置该字段的值。
     * <p>
     * 该字段的可选值包括:
     * <ul>
     *     <li><b>normal</b> - 正常状态。窗体的大小取决于 {@link width} 和 {@link height} 字段的值。</li>
     *     <li><b>maximize</b> - 最大化状态。窗体自动撑满父容器。</li>
     * </ul>
     * </p>
     * @default normal
     */
    me.windowState = "normal";

    /**
     * 获取是否可以由用户自定义窗体大小。如果为 false，则 {@link displayMaxButton} 字段会被设置为 false。该字段必须在初始化前设置。
     * 
     * @default true
     */
    me.resizable = true;
    
    /**
     * 获取当前窗口是否使用ajax的方式加载窗口的内容， true：ajax方式加载页面 false：Iframe方式加载页面
     * 
     * @default true
     */
    me.ajax = true;

    /**
     * 获取一个 Boolean 值，表示窗体是否可拖动。
     * 
     * @default true
     */
    me.movable = true;
    
    /**
     * @ignore
     * 设置窗体是否在最顶层弹出。该属性通常在 IFrameWindow 中需要弹出新窗体时使用。
     * 
     * @default false
     */
    me.isTopWindow = false;
    
    /**
     * 获取一个 {@link mx.windows.Window} 对象，表示当前窗体的父窗体对象。通常当一个窗体通过 {@link showDialog} 方法作为对话框打开时，会带入一个 p_owner 参数表示该对话框的父窗体。
     */
    me.owner = null;

    /**
     * 获取或设置窗体的边框样式。该字段必须在初始化前设置。
     * <p>
     * 该字段的可选值包括:
     * <ul>
     *     <li><b>normal</b> - 正常状态。</li>
     *     <li><b>borderless</b> 或 <b>none</b> - 没有标题栏、边框和状态栏。</li>
     * </ul>
     * </p>
     * @default normal
     */
    me.frameBorder = "normal";

    /**
     * 获取一个 Boolean 值，表示窗体是否显示标题栏。
     * 
     * @default true
     */
    me.displayHead = true;
    
    /**
     * 获取或设置是否显示状态栏。该字段必须在初始化前设置。
     * 
     * @default false
     */
    me.displayStatus = false;

    /**
     * 获取或设置是否显示“最大化”、“关闭”等控制按钮。该字段必须在初始化前设置。
     * 
     * @default true
     */
    me.displayControlBox = true;

    /**
     * 获取或设置是否显示“最小化”按钮。该字段必须在初始化前设置。
     * 
     * @default false
     */
    me.displayMinButton = false;
    
    /**
     * 获取或设置是否显示“最大化”按钮。当 {@link resizable} 字段为 false 时，该字段会被自动置为 false。该字段必须在初始化前设置。
     * 
     * @default true
     */
    me.displayMaxButton = true;

    /**
     * 获取或设置是否显示“关闭”按钮。该字段必须在初始化前设置。
     * 
     * @default true
     */
    me.displayCloseButton = true;

    /**
     * 获取一个值，表示当前窗体是否已完成加载。请参考 {@link onload} 事件。
     * 
     * @default false
     */
    me.isLoaded = false;

    /**
     * @ignore
     * 一个 {@link mx.controls.ToolBar} 对象，{@link mx.controls.ToolBar.toolBarType} 为 “quickBoolBar”，表示显示在状态栏中的快速工具栏。
     */
    me.quickToolBar = null;

    /**
     * @ignore
     */
    me.windowManager = null;

    /**
     * @ignore
     */
    me.$title = null;

    /**
     * 表示标题栏的 JQuery 对象。
     */
    me.$head = null;

    /**
     * 表示窗体主体部分的 JQuery 对象（不包含标题栏、状态栏的部分）。
     */
    me.$body = null;

    /**
     * @ignore
     * 表示状态栏的 JQuery 对象。
     */
    me.$statusBar = null;



    /**
     * 当窗体加载后将触发该事件。当窗体被实例化并调用 {@link init} 进行初始化后，第一次显示在浏览器之前，将触发该事件。该事件在 Window 的全生命周期中仅会触发一次，通常第一次调用 {@link show}、{@link showDialog} 方法后首先会触发该事件，然后才会触发 {@link onshown} 事件。
     */
    me.onload = null;

    /**
     * 当窗体被激活后将触发该事件。
     */
    me.onactivate = null;

    /**
     * 当窗体在客户端展现后将触发该事件。通常调用 {@link show} 和 {@link showDialog} 等方法后会触发该事件。通常第一次调用 {@link show}、{@link showDialog} 方法后首先会触发该事件，然后才会触发 {@link onshown} 事件。
     */
    me.onshown = null;

    /**
     * 当窗体被隐藏或关闭后将触发该事件。通常调用 {@link hide} 和 {@link close} 等方法后会触发该事件。
     */
    me.onhide = null;

    /**
     * 当窗体被隐藏或关闭前将触发该事件。通常调用 {@link hide} 和 {@link close} 等方法前会触发该事件。
     * 
     * @cancelable
     */
    me.onhiding = null;

    /**
     * 当前窗体被关闭后将触发该事件。通常调用 {@link close} 方法后会触发该事件。
     */
    me.onclose = null;

    /**
     * 当窗体被关闭前将触发该事件。通常调用 {@link close} 等方法前会触发该事件。
     * 
     * @cancelable
     */
    me.onclosing = null;
    
    /**
     * 当窗体重置大小后将触发该事件。
     */
    me.onresize = null;

    base.init = me.init;
    
    var initCompleted = false;
    /**
     * 初始化窗体。
     */
    me.init = function()
    {
        me.$body = $("<div id=body class=windowsBody/>");
        me.$container = me.$body;
        base.init();

        if (me.windowManager == null)
        {
            throw new Error(mx.err("WINDOWMANAGER_NON_NULLABLE"));
        }
        
        me.windowManager.windows.add(me);
        
        if (me.frameBorder == "borderless" || me.frameBorder == "none")
        {
            me.resizable = false;
        }

        if (!me.resizable)
        {
            me.displayMaxButton = false;
        }
        else
        {
            me.$e.resizable(true);
        }

        if (me.frameBorder == "borderless" || me.frameBorder == "none")
        {
            _initBorderlessFrame();
        }
        else
        {
            _initNormalFrame();
        }
        
        me.$e.bind("mousedown", _window_focusin);

        if (me.title != null)
        {
            me.setTitle(me.title);
        }
        
        me.setStatus(me.status, me.isBusy);
        
        if (me.windowState != "normal")
        {
            me.setWindowState(me.windowState);
        }
        
        if (me.enabled == false)
        {
            me.setEnabled(false);
        }
        
        // IE6、7下初始化body大小
        if($.isIE67() && me.$body) {
        	me.$e.resize(function(){
            	if(me.$e.hasClass("maximize")) {
            		me.$body.css({
            			width: me.$e.width(),
            			height: me.$e.height() - me.$head.outerHeight()-32
            		});
            		if (me.$statusBar)
            		{
            			me.$statusBar.css({width: me.$e.width()});
                		me.$statusBar.css('margin-left','0');
            		}
            	} else {
            		me.$body.css({
            			width: me.$e.width() - parseInt(me.$body.css("margin-left")) - parseInt(me.$body.css("margin-right")) - 2,
            			height: me.$e.height() - (me.$head ? me.$head.outerHeight() : 0) - parseInt(me.$body.css("margin-bottom")) - parseInt(me.$body.css("bottom")) - 2
            		});
            		
            		if (me.$statusBar)
            		{
            			me.$statusBar.css({width: me.$e.width() - parseInt(me.$body.css("margin-left")) - 14});
            		}
            		
            	}
        	});
        }
        initCompleted = true;
    };

    /**
     * 设置 {@link title} 字段的值。
     */
    me.setTitle = function(p_title)
    {
        me.title = p_title;
        if (me.$title != null)
        {
            me.$title.text(me.title);
        }
    };

    /**
     * 设置窗体的状态 {@link status} 字段的值。
     * 
     * @param p_status: 窗体的状态状态栏显示的文本
     * @param [p_isBusy]  {@link isBusy}字段饿值，设置窗体是否处于忙碌状态
     */
    me.setStatus = function(p_status, p_isBusy)
    {
        me.status = p_status;
        if (me.$statusBar != null && $notEmpty(me.status))
        {
            me.$statusBar.children("span").text(me.status);
        }
        if (typeof(p_isBusy) != "undefined")
        {
            me.setBusy(p_isBusy);
        }
    };

    /**
     * 设置 {@lilnk padding} 字段的值。
     */
    me.setPadding = function(p_padding)
    {
        me.padding = p_padding;
        me.$body.css("padding", me.padding);
    };


    /**
     * @ignore
     */
    me.$loadingMask = null;

    /**
     * 设置 {@link isBusy} 字段的值。
     */
    me.setBusy = function(p_busy, p_indication)
    {
        if (p_busy == null)
        {
            p_busy = true;
        }
        me.isBusy = p_busy;
        me.setLoading(me.isBusy);

        if (me.isBusy)
        {
            if (me.$body != null && me.$loadingMask == null)
            {
                me.$loadingMask = $("<div id='loadingMask'><img/><div style='color:white'/></div>");
                me.$loadingMask.opacity(0.1);
                me.$loadingMask.find("img").attr("src",mx.mappath("$theme/images/loading_32.gif"));
                me.$loadingMask.hide();
            }
            me.$loadingMask.find("div").text(p_indication != undefined ? p_indication : "");
            me.$e.append(me.$loadingMask);
            if (me.$head != null)
            {
                me.$loadingMask.css("top", me.$head.height());
            }
            me.$loadingMask.show();
        }
        else
        {
            if (me.$loadingMask != null)
            {
                me.$loadingMask.hide();
                me.$loadingMask.detach();
            }
        }
    };

    /**
     * 设置 {@link isLoading} 字段的值。
     */
    me.setLoading = function(p_isLoading)
    {
        if (p_isLoading == null)
        {
            p_isLoading = true;
        }

        me.isLoading = p_isLoading;

        if (me.$statusBar != null)
        {
            me.$statusBar.children("img").attr("src", mx.mappath(me.isLoading ? "$/images/window_loading.gif" : "$/images/space.png"));
        }
    };

    /**
     * 在当前窗体中显示一个快速提示，通常该提示会在数秒后自动消失。
     * @param p_type 一个字符串，表示提示的类型。如“info”、“warn”、“error”等，请参见 {@link mx.utils.SymbolUtilClass.getSymbol} 类。
     * @param p_message 指定提示的信息。
     * @param [p_options] 目前暂未使用。
     */
    me.indicate = function(p_type, p_message, p_options)
    {
        if (me.$body == null)
        {
            return;
        }

        if (p_options == null)
        {
            p_options = {};
        }
        p_options.$container = me.$e;
        
        mx.indicate(p_type, p_message, p_options);
    };


    /**
     * @ignore
     */
    me.originalRectangle = {};

    /**
     * 设置 {@link windowState} 字段的值。
     */
    me.setWindowState = function(p_windowState)
    {
        if (me.windowState != p_windowState || !me.isLoaded)
        {
            me.windowState = p_windowState;
            if (me.windowState == "maximize")
            {                
                me.originalRectangle = { left: me.left, top: me.top, width: me.$e.width(), height: me.$e.height() };
                me.$e.addClass("maximize");
                try{
                	me.$e.animate(
                            {left: 0, top: 0, width: "100%", height: "100%"}, 200, function() {
                            	// IE6、7下调整body大小
                                if($.isIE67()) {
                                	//IE6下，如果window的height设置为100%，在有的特定场景下，并不会被撑开，高度为0，window不显示。为了避免这种情况，设置height值。
        	                    	if($.isIE6) {
	                                	me.$e.css({
	        	                			height: me.$e.parent().height()
	        	                		});
        	                    	}
        	                    	me.$body.css({
        	                			width: me.$e.width(),
        	                			height: me.$e.height() - me.$head.outerHeight()
        	                		});
        	                    	
                                }
                            }
                        );
                }catch(e){
                }
            }
            else
            {                
                me.$e.removeClass("maximize");
                if ("auto" == me.originalRectangle.left)
                {
                    var x = (me.$e.parent().width() - me.width) / 2;
                    if (x < 0) x = 0;
                    me.originalRectangle.left = x;
                }
                if ("auto" == me.originalRectangle.top)
                {
                    var y = (me.$e.parent().height() - me.height) / 2;
                    if (y < 0) y = 0;
                    me.originalRectangle.top = y;                    
                }
               
                try{
                	me.$e.animate(me.originalRectangle, 400, function() {
                    	// IE6、7下初始化body大小
                        if($.isIE67()) {
                    		me.$body.css({
                    			width: me.$e.width() - parseInt(me.$body.css("margin-left")) - parseInt(me.$body.css("margin-right")) - 2,
                    			height: me.$e.height() - me.$head.outerHeight() - parseInt(me.$body.css("margin-bottom")) - parseInt(me.$body.css("bottom")) - 2
                    		});
                        }
                    });
                }catch(e){
                }
            }
            
            me.trigger("resize", {window: me});
        }
    };

    /**
     * 获取当前窗体作为对话框时返回的值。请使用 {@link setDialogResult} 方法设置该字段的值。请参见 {@link showDialog} 方法。
     */
    me.dialogResult = null;

    /**
     * 设置 {@link dialogResult} 字段的值。在调用该方法后，会自动关闭对话框（当 {@link reusable} 字段为 true 时，将调用 {@link hide} 方法；否则调用 {@link close} 方法）。请参见 {@link showDialog} 方法。
     */
    me.setDialogResult = function(p_dialogResult)
    {
        if (typeof(p_dialogResult) == "undefined")
        {
            p_dialogResult = null;
        }
        me.dialogResult = p_dialogResult;

        if (me.reusable)
        {
            me.hide();
        }
        else
        {
            me.close();
        }
    };

    /**
     * 打开当前窗口，同时会被默认置为激活状态。该方法会依次触发 {@link onactivate} 和 {@link onshown} 事件。
     */
    me.show = function()
    {
        if (!me.initialized)
        {
             me.init();
        }

        me._show();
        me.$e.fadeIn("fast");
    };


    /**
     * @ignore
     */
    me.$mask = null;

    /**
     * @ignore
     */
    me.maskOptions = { opacity: 0.6, backgroundColor: null };

    /**
     * @ignore
     */
    me.dialogCallback = null;

    /**
     * 将当前窗口以独占对话框的形式打开。该方法会依次触发 {@link onactivate} 和 {@link onshown} 事件。
     * @param [p_owner] 指定对话框的父窗体。对象类型为mx.windows.Window或者为mx.windows.Window对象的子类
     * @param [p_dialogCallback] 一个 Function 对象，表示对话框的回调方法。当对话框关闭后，将调用 p_dialogCallback 代表的方法，并将当前窗体作为参数传递，方法的原型为 function(p_dialog)，p_dialog 参数即为当前窗体对象，可通过 p_dialog.dialogResult 字段获取对话框的返回值，该返回值是通过 {@link setDialogResult}} 设置的。
     */
    me.showDialog = function(p_owner, p_dialogCallback)
    {
        if (!me.initialized)
        {
             me.init();
        }

        if ($isFunction(p_owner))
        {
            me.dialogCallback = p_owner;
            p_owner = null;
        }
        else
        {
            me.dialogCallback = ($isFunction(p_dialogCallback) ? p_dialogCallback : null);
        }

        me.owner = p_owner;
        if (me.owner != null && typeof(me.owner.dialogCallback) != "undefined")
        {
            me.owner.showingDialog = me;
        }

        me.maskOptions.$container = null;
        if (p_owner != null && typeof(p_owner.jquery) == "undefined")
        {
            if (p_owner.$body)
            {
                me.maskOptions.$container = p_owner.$e;
            }
            else
            {
                if (me.owner != null)
                {
                    me.maskOptions.$container = $(me.owner);
                }
            }
        }
        else
        {
            me.maskOptions.$container = p_owner;
        }

        if (me.maskOptions.$container == null)
        {
        	if ($notEmpty(me.getContext()) && $notEmpty(me.getContext().rootViewPort)) {
        		me.maskOptions.$container = me.getContext().rootViewPort;
        	} else {
        		me.maskOptions.$container = me.windowManager.$container;
        	}
        }

        if (me.$mask == null)
        {
            me.$mask = me.windowManager._createMask(me.maskOptions);
        }

        if (me.owner != null && me.owner.$head != null)
        {
            me.$mask.css("top", me.owner.$head.height());
        }

        me.$mask.hide();
        me.$mask.fadeTo(
            "fast",
            me.maskOptions.opacity,
            function()
            {
                me._show();

                if (me.top == 0 && (me.frameBorder == "borderless" || me.frameBorder == "none"))
                {
                    me.$e.css("top", - me.height / 2);
                    me.$e.show();
                    me.$e.animate({
                        top: 0
                    },
                    200);
                }
                else
                {
                    me.$e.fadeIn("fast");
                }
            }
        );
    };

    /**
     * 将当前窗体隐藏，但不关闭，请参见 {@link reusable} 字段。该事件将依次触发 {@link onhiding}、{@link onhide} 事件。
     * @param [p_callback] 一个 Function 对象，表示窗体隐藏后的回调方法。
     */
    me.hide = function(p_callback)
    {
        var args = { cancel: false };
        me.trigger("hiding", args);
        if (args.cancel)
        {
            return false;
        }

        if ($isFunction(me.dialogCallback))
        {
            me.dialogCallback(me);
            me.dialogCallback = null;
            me.dialogResult = null;
        }

        if (me.$mask)
        {
            me.windowManager._hideMask(me.$mask);
            me.$mask = null;
        }
        
        if ($isEmpty(me.$e)) return;
		var _fadeout= function()
        {
            me.visible = false;
            me.trigger("hide");
            me.windowManager.trigger("hide", {window:me});

            if (me.owner != null && $isFunction(me.owner.activate))
            {
                if (typeof(me.owner.showingDialog) != "undefined")
                {
                    me.owner.showingDialog = null;
                }
                me.owner.activate();
                me.owner = null;
            }  
                        
            activePreActiveWindow();

            if ($isFunction(p_callback))
            {
                p_callback({target:me});
            }
            
            if (me.$e != null)
            {
            	try{
            		me.$e.detach();
            	}catch(e){}
            }
        }
        
		if(_disposing){
			_fadeout();
		}else{
			me.$e.fadeOut("fast", _fadeout);
		}
		_fadeout=null;
    };
    
    /**
     * @ignore 
     * 激活上一个窗口
     */
    function activePreActiveWindow()
    {
    	//这句说明window已初始化完成了。这是为了防止因window在初始化过程中调用
    	//hide方法引起不必要的window切换,而可能导致的错误 
    	if(initCompleted)
    	{    
    		me.windowManager._removeActiveWindow(me);
    		var preWin = me.windowManager._popActiveWindow();
    		if (preWin && preWin.visible ===  true)
			{
			    preWin.activate();
			}
    	}
    };

    var que = [];
    /**
     * 关闭当前窗体，并销毁其中的所有元素，请参见 {@link reusable} 字段。该方法会自动调用 {@link hide} 方法，并会依次触发 {@link onclosing}、{@link onhiding}、 {@link onhide} 和 {@link onclose} 事件。
     */
    me.close = function()
    {
    	   if (me.reusable)
	       {
	            me.hide();
	       }
	       else
	       {
	    	   que.add({});
	    	   if(que.length>1)
	    	   {
	    	       return;
	    	   }
	    	   var args = { cancel: false };
	           me.trigger("closing", args);
	           if (args.cancel)
	           {
	               return false;
		       }
		        	
		        var windows = me.windowManager.windows;
		
		        if (me.windowManager.activeWindow == me)
		        {
		            me.windowManager.activeWindow = null;
		        }
		        
		        windows.remove(me);
		        //jzm fixed at 2014-5-28
		        me.windowManager._removeActiveWindow(me);
		
		        me.hide(function()
		        {
		            me.trigger("close");
		            me.windowManager.trigger("close", {window:me});
		            
		            if (me.$title != null)
		            {
		                me.$title.empty().remove();
						me.$title=null;
						delete me.$title;
		            }
		            if (me.$head != null)
		            {
						if (me.displayMinButton){
							var min=me.$head.find("#windowMinStateButton");
							delete min.prevObject;
							min.off();
							min.unbind();
							min.empty().remove();
							delete min;
						}
						if (me.displayMaxButton){
							var max=me.$head.find("#windowStateButton");
							delete max.prevObject;
							max.off();
							max.unbind();
							max.empty().remove();
							delete max;
						}
						if (me.displayCloseButton){
							var clse=me.$head.find("#closeButton");
							delete clse.prevObject;
							clse.off();
							clse.unbind();
							clse.empty().remove();
							delete clse;
						}
						var box=me.$head.find("#controlBox");
						delete box.prevObject;
						box.off();
						box.unbind();
						box.empty().remove();
						delete box;
		            	me.$head.off("dblclick",_btnWindowState_click);
						me.$head.unbind();
		                me.$head.empty().remove();
						me.$head=null;
						delete me.$head;
		            }
		            if (me.$body != null)
		            {
		            	var iframes = me.$body.find('iframe');
						delete iframes.prevObject;
		            	iframes.each(function(i,iframe){
		            		iframe.onbeforeunload = null;
		            		$clearIframeLeak(iframe);         		
		            	});
		
		            	iframes.remove();
		            	iframes = null;
		                me.$body.empty().remove();
						me.$body=null;
						delete me.$body;
		            }
		            if (me.$statusBar != null)
		            {
		                me.$statusBar.empty().remove();
						me.$statusBar=null;
						delete me.$statusBar;
		            }
		            
		            if(me.$e){
			 	    	var $stateBtn = me.$e.find("div[id=head] span[id=windowStateButton]");
						delete $stateBtn.prevObject;
				    	var $minBtn = me.$e.find("div[id=head] span[id=windowMinStateButton]");
						delete $minBtn.prevObject;
				    	
						if($minBtn){
							$minBtn.off("click",_butWindowMinState_click);
							$minBtn=null;
							delete $minBtn;
						}
						if($stateBtn){
							$stateBtn.off("click",_btnWindowState_click);
							delete $stateBtn;					
						}   
						 
			            //added by tiger on 2014/4/28 11:00:15
			            me.maskOptions.$container = null;
			            me.maskOptions = null;
			            me.$loadingMask && me.$loadingMask.empty().remove();
		
			            me.$container = null;
			            me.$mask && me.$mask.getPooledObjects().clear();
			            me.$mask = null;
			            //end add				
		            }
		            
					me.$e.off();
					me.$e.unbind();
					me.$e.empty().remove();
					me.$e=null;
		
		            delete me.$e;
		            delete me.$body;
		            delete me.$head;
		            delete me.$title;
		            delete me.$statusBar;
		            
		            //先释放已知的资源，后释放剩余的资源
					if(!_disposing){
						me.dispose();
					}        
		        });
			}
	        return true;
    };

    /**
     * 将当前窗体置为最上层窗体。
     */
    me.bringToFront = function()
    {
        me.$e.css("zIndex", me.windowManager._topZIndex(me));
    };


    /**
     * 将当前窗体置为激活状态。在该方法中会自动调用 {@link bringToFront} 方法，并会触发 {@link onactivate} 事件。
     */
    me.activate = function()
    {        
        if (me.showingDialog != null)
        {
            me.showingDialog.activate();
            return;
        }

        me.activated = true;
        
        me.bringToFront();
        if (me.windowManager.activeWindow != null)
        {
            if (me.windowManager.activeWindow == me)
            {
                return;
            }
            me.windowManager.activeWindow.activated = false;
            me.windowManager.activeWindow.$e.removeClass("active");
            me.windowManager.activeWindow.__createTempMark();
        }

        me.$e.addClass("active");
        me.__removeTempMark();
        
        me.windowManager.activeWindow = me;
        me.windowManager._pushActiveWindow(me);
        me.trigger("activate");
        me.windowManager.trigger("activate", {window:me});
    };


    /**
     * 向当前窗体追加指定的 JQuery 对象、元素或控件。
     * @param $p_element 需要追加的对象。该对象可以是一个 JQuery 对象、HTML 元素（如 DIV 元素）或所有派生自 {@link mx.controls.Control} 类型的控件（如 DataGrid、DataTree 等控件）。
     */
    me.append = function($p_element)
    {
        me.$body.append(me.$wrap($p_element));
    };
   
    
    /**
     * 释放 Window 对象运行时动态生成的内容（属性、方法、事件）。
     */
	var _disposing = false;
    base.dispose = me.dispose; 
    me.dispose = function()
    {	
		_disposing = true;
		if(_disposing && me.visible)
		{
			me.close();
		}
		
		que.clear();
		delete que;
		me.windowManager=null;	
    	me.off();
		me.clear();
    	base.dispose();
		base=null;
    }
    
    /**
     * @ignore
     */
	me.setRight = function()
	{
	}

    /**
     * @ignore
     */
    me._show = function(p_triggerOnloadEvent)
    {
        if (p_triggerOnloadEvent == null)
        {
            p_triggerOnloadEvent = true;
        }
        
        if (me.owner != null)
        {
            me.owner.$body.append(me.$e);
            if (me.$mask != null)
            {
                var pos = me.windowManager._centerWindowPosition(me);
                me.left = pos.left;
            }
        }
        else if ($notEmpty(me.getContext()) && $notEmpty(me.getContext().rootViewPort))
        {
            var viewPort = me.getContext().rootViewPort;
            viewPort.$e.append(me.$e);
        }
        else
        {
            me.$e.addClass("mx");
            $('body').append(me.$e);
        }
        
        if ("maximize" == me.windowState)
        {
            me.$e.css("left", 0);
            me.$e.css("top", 0);
        }
        else
        {
            if (me.left == "auto" || me.top == "auto")
            {
                var pos = me.windowManager._nextWindowPosition(me);
                if (me.left == "auto")
                {
                    me.left = pos.left;
                }
                if (me.top == "auto")
                {
                    me.top = pos.top;
                }
            }

            if (me.left == "center" || me.top == "center")
            {
                var hor = me.left == "center" ? true : false;
                var ver = me.top == "center" ? true : false;
                me.$e.centralize(hor, ver);
            }
            me.$e.css("left", me.left);
            me.$e.css("top", me.top);
            me.originalRectangle.left = me.left;
            me.originalRectangle.top = me.top; 
        }
        
        // IE6、7下初始化body大小
        if($.isIE67()) {
        	if(me.$e.hasClass("maximize")) {
        		me.$body.css({
        			width: me.$e.width(),
        			height: me.$e.height() - me.$head.outerHeight()
        		});
        	} else {
        		me.$body.css({
        			width: me.$e.width() - parseInt(me.$body.css("margin-left")) - parseInt(me.$body.css("margin-right")) - 2,
        			height: me.$e.height() -(me.$head ? me.$head.outerHeight() : 0) - parseInt(me.$body.css("margin-bottom")) - parseInt(me.$body.css("bottom")) - 2
        		});
        	}
        }
        
        if (p_triggerOnloadEvent && !me.isLoaded)
        {
            me.isLoaded = true;
            me.trigger("load");
        }

        me.trigger("shown");
        me.windowManager.trigger("shown", {window:me});
        
        me.activate();

        me.visible = true;
    };

    function _initNormalFrame()
    {
        me.$e.addClass("window");
        
        if (me.displayHead)
        {
            me.$head = $("<div id=head class=windowsHead></div>");
            me.$title = $("<div id=title/>");
            me.$head.append(me.$title);
            if (me.displayControlBox)
            {
                var $controlBox = $("<div id=controlBox></div>");
                me.$head.append($controlBox);
                
                if (me.displayMinButton)
                {
                    $controlBox.addClass("min");
                    var $windowMinStateButton = $("<a href='javascript:void(0);' id=windowMinStateButton class=controlBoxButton/>");
                    $controlBox.append($windowMinStateButton);
                    $windowMinStateButton.click(_butWindowMinState_click);
                }
                
                if (me.displayMaxButton)
                {
                    var $windowStateButton = $("<a href='javascript:void(0);' id=windowStateButton class=controlBoxButton/>");
                    $controlBox.append($windowStateButton);
                    $windowStateButton.click(_btnWindowState_click);
                }
                
                if (me.displayCloseButton)
                {
                    var $closeButton = $("<a href='javascript:void(0);' id=closeButton class=controlBoxButton/>");
                    $controlBox.append($closeButton);
                    $closeButton.click(_btnClose_click);
                }
            }
            me.$e.append(me.$head);
        }
        else
        {
            me.$e.addClass("nohead");
        }
                
        me.$e.append(me.$body);
        
        if (me.displayStatus)
        {
            me.$body.css("bottom","25px");
        	me.$statusBar = $("<div id=statusBar><img src='" + mx.mappath("$/images/space.png") + "'/><span/></div>");
        }
        
        me.$e.append(me.$statusBar);
        if (me.displayHead)
        {
            me.$head.userSelectable(false);
            if (me.movable)
            {
                me.$head.mousedown(_head_mousedown);
            }
            me.$head.dblclick(_btnWindowState_click);
        }        
    }
    
    base.setEnabled = me.setEnabled;
    me.setEnabled = function(p_enabled){
    	base.setEnabled(p_enabled);
    	var $stateBtn = me.$e.find("div[id=head] a[id=windowStateButton]");
    	var $minBtn = me.$e.find("div[id=head] a[id=windowMinStateButton]");
    	
    	$stateBtn.off("click",_btnWindowState_click);
		$minBtn.off("click",_butWindowMinState_click);
    	if(me.enabled){
    		$stateBtn.on("click",_btnWindowState_click);
    		$minBtn.on("click",_butWindowMinState_click);
    	}
    	if(me.displayHead){
            if ($notEmpty(me.$head))
            {
                me.$head.off("dblclick",_btnWindowState_click);
            }
    		
    		if(me.enabled)
    			me.$head.on("dblclick",_btnWindowState_click);
    	}
    	me.$e.resizable(me.enabled);
    }

    function _initBorderlessFrame()
    {
        me.$e.addClass("borderlessWindow");        
        me.$e.append(me.$body);
    }



    function _window_focusin()
    {
        if (!me.activated)
        {
            me.activate();
        }
    }

    function _btnWindowState_click()
    {
        if (!me.displayMaxButton || !me.displayControlBox)
        {
            return;
        }

        if (me.$e.hasClass("maximize"))
        {
            me.setWindowState("normal");
        }
        else
        {
            me.setWindowState("maximize");
        }
    }

    function _butWindowMinState_click()
    {
        me.$e.css("display", "none");
    }
    
    function _btnClose_click()
    {
        if (me.reusable)
        {
            me.hide();
        }
        else
        {
            me.close();
        }
    }

    var _mouseX = 0, _mouseY = 0, _srcX = 0, _srcY = 0;
    var _viewPortTop = 0;
    var _viewPortBottom = 0;
    function _head_mousedown(e)
    {
        if (e.target.className == "controlBoxButton" || me.windowState != "normal") return;

        me.$e.addClass("dragging");
        _mouseX = e.clientX;
        _mouseY = e.clientY;
        var left = parseInt(me.$e.css("left"));
        var top = parseInt(me.$e.css("top"));
        _srcX = isNaN(left) ? 0 : left;
        _srcY = isNaN(top) ? 0 : top;
        
        if ($notEmpty(me.getContext()))
        {
            var viewPort = me.getContext().rootViewPort;
            if ($notEmpty(viewPort))
            {
                var offset = viewPort.$e.offset();
                _viewPortTop = offset.top;
                _viewPortBottom = offset.top + viewPort.$e.height();
            }
        }
        
        _getDocument().one("mouseup", _head_mouseup);
        _getDocument().on("mousemove", _head_mousemove);
        _getDocument().userSelectable(false);
        me.__createTempMark();
    }

    function _head_mousemove(e)
    {
        var offsetX = e.clientX - _mouseX;
        var offsetY = e.clientY - _mouseY;
        
        if (e.clientY > _viewPortTop && e.clientY < document.body.clientHeight)
        {
            me.moveTo(_srcX + offsetX, _srcY + offsetY);
        }
        else if (e.clientY < _viewPortTop)
        {
            me.moveTo(_srcX + offsetX, me.top);
        }
        else if (e.clientY > _viewPortBottom)
        {
            me.moveTo(_srcX + offsetX, me.top);
        }
    }

    function _head_mouseup(e)
    {
        _getDocument().userSelectable(true);
        me.$e.removeClass("dragging");
        _getDocument().off("mousemove", _head_mousemove);
        me.__removeTempMark();        
    }
    
    var _tempMark = null;
    /**
     * @ignore
     */
    me.__createTempMark = function()
    {
        if ($isEmpty(_tempMark))
        {
            _tempMark = $("<div style='width:100%;height:100%;position:absolute;top:0;left:0;'/>");
        }
        me.$body.append(_tempMark);
    };
    
    /**
     * @ignore
     */
    me.__removeTempMark = function()
    {
        if ($notEmpty(_tempMark))
        {
            _tempMark.detach();
        }
    };
    
    function _getDocument()
    {
        if (me.isTopWindow)
        {
            if (typeof(window.parent) == "undefined")
            {
                return $(document);
            }
            else
            {
                return $(window.parent.window.document);
            }
        }
        else
        {
            return $(document);
        }
    }

    function _getDocumentBody()
    {
        if (me.isTopWindow)
        {
            if (typeof(window.parent) == "undefined")
            {
                return $(document.body);
            }
            else
            {
                return $(window.parent.window.document.body);
            }
        }
        else
        {
            return $(document.body);
        }
    }
    
    me.endOfClass(arguments); 
    return me;
};
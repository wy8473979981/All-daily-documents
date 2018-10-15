$ns("mx.controls");

/**
 * 提供一个幻灯片预览控件的类。
 * 
 * @example 
 * 以下是一个创建 {@link mx.controls.Slideshow} 的示例。 
 * 该示例将说明如何创建一个 {@link mx.controls.Slideshow}。 
 * <code language="JavaScript">
 * var slider = new mx.controls.Slideshow({
 *		auto:true,
 *		direction: "toLeft",
 *		items:[{src:"http://gsky:8080/mxframe/dbm/resources/images/workbench.png"},
 *				{src:"http://gsky:8080/mxframe/dbm/resources/images/login.png"},
 *				{src:"http://gsky:8080/mxframe/dbm/resources/images/mx.png"}]
 * });
 * var button = new mx.controls.Button({
 *       text: "show",
 *       onclick: function(){
 *       slider.show();
 *       }
 *   });
 * </code>
 */
mx.controls.Slideshow = function()
{
    var me = $extend(MXComponent);
    var base = {};

    /**
     * 获取或设置一个数字，表示幻灯片滑动的速度，单位为毫秒。
     * 
     * @default 1000
     */
    me.speed = 1000;
    
    /**
     * 获取一个数字，表示幻灯片滑动的停留时间，单位为毫秒。请使用 {@link setPause} 方法设置该字段的值。
     * 
     * @default 2000
     */
	me.pause = 2000;
	
	/**
     * 获取一个 Boolean 值，表示幻灯片是否自动滑动。请使用 {@link setAuto} 方法设置该字段的值。
     * 
     * @default true
     */
	me.auto = true;
	
    /**
     * 获取一个 Boolean 值，表示是否显示左右按钮，请在初始化之前设置该字段的值。
	 * 
     * @default true
     */
	me.wizardButton = true;
	
	/**
     * 获取一个 Boolean 值，表示是否显示播放按钮，请在初始化之前设置该字段的值。
	 * 
     * @default true
     */
	me.playButton = true;
		
	/**
     * 获取一个数组，表示是否显示播放按钮可选择的幻灯片停留时间，请在初始化之前设置该字段的值。
	 * 
     * @default true
     */
	me.pauseTimes = [2000, 3000, 7000];
	
	/**
     * 设置一个字符串，表示幻灯片滑动的方向。
     * 
     * <p>
     * 该字段可选的值包括：
     * <ul>
     *      <li><b>toRight</b></li>
     *      <li><b>toLeft</b></li>
     * </ul>
     * </p>
     */
    me.direction = "toRight";
    
    /**
     * 获取和设置一个集合，用于创建含控件中要展示的 {@link mx.controls.SlideshowItem}。
     */
    me.items = [];
    
    /**
     * 获取一个 {@link mx.controls.SlideshowItem} 对象，
     * 表示当前滑动的幻灯片，如果一个滑入，一个滑出，则表示滑入的。
     */
    me.currentItem = null;
    
   	/**
   	 * @ignore
   	 */
    me.$e = null;
    
    /**
     * @ignore
     */
    me.$stage = null;
    
    /**
     * 提供一个方法，开始预览。本方法是幻灯片预览的入口。
     * 
     * @param p_startIndex 指定显示内容的索引，从0开始
     */
	me.show = function (p_startIndex)
	{
		// 初始化舞台
		me.$e = $("<div class='slideshow mx'><table id=slideshowTable align='center' cellspacing=0; border=0;><tr><td align=center></td></tr></table></div>");
		me.$stage = $("<div id='imgStage' align='center'/>");
		
		$(document.body).append(me.$e);
		me.$e.find("td").append(me.$stage);
		
		// 关闭按钮
		var $btnClose = $("<div id='btnClose'/>");
		$btnClose.click(function(){me.setAuto(false);me.$e.detach();});
		me.$e.append($btnClose);
		
		// 左右按钮
		if(me.wizardButton)
		{
			_initPreNextBtn();
		}
		// 播放按钮
		if(me.playButton)
		{
			_initTimeBtn();
		}
		// 每张幻灯片
		_initItems();
		
		// 播放第一张
		if(!me.currentItem)
		{
			me.showNext(p_startIndex);
		}
		
		// IE6下调整Stage高度
        if($.isIE6()) {
        	me.$stage.css("height", me.$e.height());
        	me.$e.resize(function(){
        		if(me.$e.height() != 0) {
        			me.$stage.css("height", me.$e.height());
        		}
        	});
        }
	}
	
    var _interval = null;
    /**
     * 提供一个方法，滑动预览，或者停止预览，当 {@link auto} 字段的值为 true 时可以滑动预览。
     * 
     * @param [p_slide = true] 一个 Boolean 值，值为 true 时，开始滑动预览；为 false 时，停止滑动。
     */
	me.slide = function(p_slide)
	{
		if(p_slide === false)
		{
			if(_interval != null)
			{
				clearInterval(_interval);
			}
		}
		else
		{
			if(me.auto)
			{
				if(_interval != null)
				{
					clearInterval(_interval);
				}
		 		_interval = setInterval(me.showNext, me.pause);
			}
		}
	}

	/**
     * 提供一个方法，预览下一张幻灯片。
     */
    me.showNext = function (p_startIndex)
    {
    	if(!_isPlaying())
    	{
	    	var startStyle = _getStyle(me.direction, "start");
	    	var pauseStyle = _getStyle(me.direction, "pause");
			var finishStyle = _getStyle(me.direction, "finish");
			
			if(me.currentItem)
			{
	    		me.slide(false);
				me.currentItem.play(me.speed, pauseStyle, finishStyle);
				me.currentItem.nextItem.play(me.speed, startStyle, pauseStyle, me.slide);
			}
			else if(me.items.length > 0)
			{
	    		me.slide(false);
	    		if(typeof p_startIndex == "number" && p_startIndex > -1 && p_startIndex < me.items.length)
	    		{
					me.items[p_startIndex].play(me.speed, startStyle, pauseStyle, me.slide);
	    		}
	    		else
	    		{
					me.items[0].play(me.speed, startStyle, pauseStyle, me.slide);
	    		}
			}
    	}
    }
    
    /**
     * 提供一个方法，预览上一张幻灯片。
     */
    me.showPre =  function()
    {
    	if(!_isPlaying() && me.currentItem)
    	{
	    	var startStyle = _getStyle(me.direction, "start");
	    	var pauseStyle = _getStyle(me.direction, "pause");
			var finishStyle = _getStyle(me.direction, "finish");
			
			if(me.currentItem)
			{
	    		me.slide(false);
				me.currentItem.play(me.speed, pauseStyle, startStyle);
				me.currentItem.preItem.play(me.speed, finishStyle, pauseStyle, me.slide);
			}
			else if(me.items.length > 0)
			{
	    		me.slide(false);
				me.items[me.items.length - 1].play(me.speed, finishStyle, pauseStyle, me.slide);
			}
    	}
    }
    
    /**
     * 设置 {@link pause} 字段的值。
     * 
     * @param p_pause 一个数字，表示幻灯片停留的时间，单位为毫秒。
     */
    me.setPause = function(p_pause)
    {
    	me.pause = p_pause;
    	if(me.auto)
    	{
    		me.slide();
    	}
    }
    
    /**
     * 设置 {@link auto} 字段的值。
     * 
     * @param [p_auto = true] 一个 Boolean 值，表示幻灯片是否自动滑动。
     */
    me.setAuto = function(p_auto)
    {
    	if(typeof p_auto == "undefined")
    	{
    		p_auto = true;
    	}
    	me.auto = p_auto;
    	me.slide(p_auto);
    }
    
	function _initPreNextBtn()
	{
		if(me.direction == "toTop" || me.direction == "toBottom")
		{
			var $leftOrTopBtn = $("<a id=topBtn></a>");
			var $rightOrBottomBtn = $("<a id=bottomBtn></a>");
		}
		else
		{
			$leftOrTopBtn = $("<a id=leftBtn></a>");
			$rightOrBottomBtn = $("<a id=rightBtn></a>");
		}
		$leftOrTopBtn.on("click", _leftOrTopBtn);
		$rightOrBottomBtn.on("click", _rightOrBottomBtn);
		me.$stage.append($leftOrTopBtn);
		me.$stage.append($rightOrBottomBtn);
	}
	
	function _initTimeBtn()
	{
		var $playBtn = $("<span id=palyBtn><span></span/>" + mx.msg("PLAY") + "</span>");
		var $checkItems = $("<span id=checkItems><span id=stop></span></span>");
		var $crntTime = $("<span id='crntTime'>" + me.pause / 1000 + "秒</span>");
		$checkItems.find("#stop").get(0).title = mx.msg("PAUSE");
		$crntTime.css({top:1}).appendTo($checkItems);
		
		// 初始化时是显示播放还是暂停
		if(me.auto)
		{
			$playBtn.hide();
		}
		else
		{
			$checkItems.hide();
		}
		for(var i = 0; i< me.pauseTimes.length; i ++)
		{
			var $pause = $("<span class=pauseItem>" + me.pauseTimes[i] / 1000 + "秒</span>");
			$pause.css({"top": i * 20 + 20, display:"none"});
			$pause.attr("pauseTime", me.pauseTimes[i]);
			// 选择时间
			$pause.click(function(){
				var _pauseTime = $(this).attr("pauseTime")
				me.setPause(_pauseTime);
				$checkItems.find(".pauseItem").hide();
				$crntTime.text($(this).text());
			});
			$checkItems.append($pause);
		}
		// 播放
		$playBtn.click(function(){
			me.setAuto(true);
			$(this).hide();	
			$checkItems.css("display", "block");
		});
		// 暂停
		$checkItems.find("#stop").click(function(){
			me.setAuto(false);
			$checkItems.hide();	
			$playBtn.css("display", "block");
		});
		// 开始选择时间
		$crntTime.mouseover(function(){
			if($checkItems.find(".pauseItem").is(":hidden"))
			{
				$checkItems.find(".pauseItem").css("display", "block");
			}
		});
		$checkItems.find(".pauseItem").mouseover(function(){
			if($checkItems.find(".pauseItem").is(":hidden"))
			{
				$checkItems.find(".pauseItem").css("display", "block");
			}
		});
		$crntTime.mouseout(function(){
			if(!$checkItems.find(".pauseItem").is(":hidden"))
			{
				$checkItems.find(".pauseItem").hide();
			}
		});
		$checkItems.find(".pauseItem").mouseout(function(){
			if(!$checkItems.find(".pauseItem").is(":hidden"))
			{
				$checkItems.find(".pauseItem").hide();
			}
		});
		me.$stage.append($playBtn);
		me.$stage.append($checkItems);
	}
	
	function _initItems()
	{
		// 初始化items
		if (!me.items) me.items = [];
		for(var i = 0; i < me.items.length; i++)
		{
			if($.isPlainObject(me.items[i]))
			{
				me.items[i] = new mx.controls.SlideshowItem(me.items[i]);
			}
		}
		for(var i = 0; i < me.items.length; i++)
		{
			var _len = me.items.length;
			var _next= (i + 1) % _len;
			var _pre = (i + _len - 1) % _len;
			me.items[i].preItem = me.items[_pre];
			me.items[i].nextItem = me.items[_next];
			me.items[i].index = i;
			
			me.items[i].on("playing", _playing); // currentItem
			_adjust(me.items[i]);
			me.$stage.append(me.items[i].$e);
		}
	}
    
	// 开始进入
    function _playing(e)
    {
    	// 舞台上至少有一个 对象，不需要赋空，
    	// 如果退出，先退出后上台，不管退出还是上台都触发这个事件
    	me.currentItem = e.item;
    }
    
    // 点击向左 或向上按钮
    function _leftOrTopBtn(e)
    {
    	if (me.direction == "toRight" || me.direction == "toBottom")
    	{
    		me.showPre();
    	}
    	else
    	{
    		me.showNext();
    	}
    }
    
    // 点击向右 或向下按钮
    function _rightOrBottomBtn(e)
    {
    	if (me.direction == "toTop" || me.direction == "toLeft")
    	{
    		me.showPre();
    	}
    	else
    	{
    		me.showNext();
    	}
    }
    	
	function _adjust(p_item)
	{
		if(p_item && p_item.$e)
		{
			p_item.$e.css(_getStyle(p_item.direction, "start"));
		}
	}
	
	function _isPlaying()
	{
		for(var i = 0; i < me.items.length; i++)
		{
			if(me.items[i].isPlaying)
			{
				return true;
			}
		}
		return false;
	}

	// p_actionType : "start", "pause", "finish"
	function _getStyle(p_direction, p_actionType)
	{
		var style = {};
    	var _stage_width = me.$stage.width() || 800;
		var _stage_height = me.$stage.height() || 600;
		if (p_actionType == "start")
		{
			if(p_direction == "toTop")
			{
				style = {"top": _stage_height + "px"};
			}
			else if(p_direction == "toLeft")
			{
				style = {"left": _stage_width + "px"};
			}
			else if(p_direction == "toBottom")
			{
				style = {"bottom": _stage_height + "px"};
			}
			else
			{
				style = {"right": _stage_width + "px"};
			}
		}
		else if(p_actionType == "pause")
		{
			if(p_direction == "toTop")
			{
				style = {"top": 0};
			}
			else if(p_direction == "toLeft")
			{
				style = {"left": 0};
			}
			else if(p_direction == "toBottom")
			{
				style = {"bottom": 0};
			}
			else
			{
				style = {"right": 0};
			}
		}
		else if(p_actionType == "finish")
		{
			if(p_direction == "toTop")
			{
				style = {"top": - _stage_height + "px"};
			}
			else if(p_direction == "toLeft")
			{
				style = {"left": - _stage_width + "px"};
			}
			else if(p_direction == "toBottom")
			{
				style = {"bottom": - _stage_height + "px"};
			}
			else
			{
				style = {"right": - _stage_width + "px"};
			}
		}
		return style;
	}
	
	base.dispose = me.dispose;
    /**
	* 释放对象运行时动态生成的内容（属性、方法、事件）。
	*/
    me.dispose = function()
    {
    	me.off(); 
		clearInterval(_interval);
		
		if(me.items != null && me.items.length > 0)
		{
			for(var i = 0; i < me.items.length; i++)
			{
				 me.items[i].dispose();
			}
		}
		
		if (me.$stage)
		{
			me.$stage.off();
			me.$stage.unbind();
			me.$stage.empty().remove();
			delete me.$stage.prevObject;
			me.$stage = null;
			delete me.$stage; 
		}
		
		if (me.$e)
		{
			me.$e.off();
			me.$e.unbind();
			me.$e.removeAttr("id");
			me.$e.removeAttr("alias");
			me.$e.removeAttr("style");
			me.$e.removeAttr("class");
			me.$e.removeClass();
			
			//将DOM对象的引用切断，下面代码回收内存的同时会影响功能，因为有些DOM元素的固有方法和属性被删除。
			if ($isIE())
            {
                var elem = me.$e.get(0);			        	
                if(elem){
                	var events = ["onresizeend","onblur","onkeydown","ondragstart","onscroll","onpropertychange",
                					"ondragenter","onmouseup","oncontextmenu","onbeforeupdate","onreadystatechange","onmouseenter",
                					"onresize","onselectstart","ondragend","onfocus","onmouseover",
                					"ondblclick","onkeypress","onmousewheel","onkeyup","onmovestart",
                					"onmouseout","oncellchange","onmousedown","onmouseleave","onclick","ondrag","onresizestart",
                					"onchange","onerror","onload","onselect"];
                    var es = elem.getElementsByTagName("*");
                    var e0;
                    try{
                        for(var i=0; i < es.length; i++){
                            e0  = es[i];

                            // 事件置空
                            for(var j=0; j < events.length; j++){
                                if(e0[events[j]])
                                    e0[events[j]] = null;
                            }

                            e0 = null;
                        }	
                    }catch(e){};
                }	
            }
			
			$("*",me.$e).each(function(){
				jQuery.event.remove(this);
				jQuery.removeData(this);
			});			
			
			me.$e.find("#btnClose").off();
			me.$e.find("a").off();
			me.$e.find("span").off();
			
			me.$e.empty().remove();
			delete me.$e.prevObject;
			me.$e = null;
			delete me.$e;  
		}
		
    	base.dispose();
    }
	
    me.endOfClass(arguments); 
    return me;
};

/**
 * 提供一个幻灯片项的对象类。表示幻灯片中的某一帧，封装了一个嵌入图片的图层。
 */
mx.controls.SlideshowItem = function()
{
    var me = $extend(MXComponent);
    var base = {};

    /**
     * 设置或者获取一个字符串，表示幻灯片预览的图片路径，请在初始化之前设置该字段的值。
     */
    me.src = "";
    
    /**
     * 获取一个 Boolean 值，表示 {@link mx.controls.SlideshowItem} 是否在滑动。
     */
    me.isPlaying = false;
    
    /**
     * @ignore
     */
    me.$e = null;
    
    /**
     * 幻灯片开始滑动时，将触发该事件。调用 {@link paly} 方法时会触发该事件。
     * 
     * @cancelable
     * @param item
     *            一个 {@link mx.controls.SlideshowItem} 对象，表示当前滑动的幻灯片。
     * @param fromStyle
     *             一个 JSON 对象，表示幻灯片滑动的开始位置。
     * @param animateStyle
     *            一个 JSON 对象，表示幻灯片滑动的终止位置。
     */
    me.onplaying = null;
    
    /**
     * 幻灯片滑动完成时，将触发该事件。调用 {@link paly} 方法时会触发该事件。
     * 
     * @param item
     *            一个 {@link mx.controls.SlideshowItem} 对象，表示当前滑动的幻灯片。
     */
    me.onplayed = null;
    
    /**
     * @ignore
     */
    
    base.init = me.init;
    me.init = function()
    {
    	base.init();
    	me._init();
    }
    
    /**
     * @ignore
     */
    me._init = function()
    {
    	var eTag = "<div class=imgBox><table align=center cellspacing=0><tr><td align=center>"
					+"<div align=center><img src='" + me.src + "'/></div>"
					+"</td></tr></table></div>";
		me.$e = $(eTag);
    }
    
    /**
     * 向 {@link mx.datacontainers.EntityContainer} 滑动。
     * 
     * @param p_speed  一个数字，表示幻灯片滑动的速度，单位为毫秒。
     * @param p_fromStyle 一个 JSON 对象，表示幻灯片滑动的开始位置。例：{left: "100px"}
     * @param p_animateStyle 一个 JSON 对象，表示幻灯片滑动的终止位置。例：{left: "600px"}
     * @param [p_callback] 一个回调的函数。 幻灯片滑动完成时调用。
     */
    me.play = function (p_speed, p_fromStyle, p_animateStyle, p_complete)
	{
		var playingArgs = {item: me, fromStyle: p_fromStyle, animateStyle: p_animateStyle, cancel: false};
	    me.trigger("playing", playingArgs);
	    if (playingArgs.cancel) return;
	    
	    me.isPlaying = true;
	    
	    var fromStyle = playingArgs.fromStyle;
	    var animateStyle = playingArgs.animateStyle;
	    
	    me.$e.css(playingArgs.fromStyle);
		me.$e.animate(
			animateStyle, 
			{ queue:false, duration:p_speed, complete:function(){
					if(!_disposing)
					{
						me.isPlaying = false;
						var playedArgs = {item : me};
					    me.trigger("played", playedArgs);
					    if($isFunction(p_complete))
					    {
					    	p_complete();
					    }
					}
				}
			}
		);
	}
	
	var _disposing = false;
	base.dispose = me.dispose;
    /**
	* 释放对象运行时动态生成的内容（属性、方法、事件）。
	*/
    me.dispose = function()
    {
    	_disposing = true;
    	me.off(); 
		if (me.$e)
		{
			me.$e.off();
			me.$e.unbind();
			
			$("*",me.$e).each(function(){
				jQuery.event.remove(this);
				jQuery.removeData(this);
			});			
			
			me.$e.empty().remove();
			delete me.$e.prevObject;
			me.$e = null;
			delete me.$e;  
		}
		
    	base.dispose();
    }
	
    me.endOfClass(arguments); 
    return me;
};
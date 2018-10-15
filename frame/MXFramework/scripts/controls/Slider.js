$ns("mx.controls");

/**
 * 提供支持多个进度滑动、选择的类。
 * 
 * @example
 * 以下是一个创建 {@link mx.controls.Slider} 的示例。
 * <code language="JavaScript">
 * var slider = new mx.controls.Slider({
 *     showProcessTips : true,
 *     width : "90%",
 *     labelCaption : "labelCaption:",
 *     labelWidth : 120,
 *     increment : 1,
 *     minValue : 0,
 *     maxValue : 100,
 *     sliderValues : [20,50,80]
 * });
 * slider.reset();//重置为初始值
 * slider.on("changed",function(e){
 *     //可通过 e.curSliderObj 获取此数组对象;
 *     //获取数组值分别为: e.curSliderObj[sliderBtn || percent];
 * });
 * </code>
 */
mx.controls.Slider = function()
{
	var me = $extend(mx.controls.Control);
	var base = {};

	/**
	 * 获取或者设置是否显示当前进度值。
	 * @default true
	 */
	me.showProcessTips = true;
	
	/**
	 * 获取或者设置slider最外层的宽，详见 {@link width} 字段的值。
	 * @default 100%
	 * @param width
	 * 				一个字符串： "100%" || "500px"
	 */
	me.width = "100%";

	/**
	 * 获取或者设置左侧文字的宽度。
	 * @default 0 
	 */
	me.labelWidth = 0;

	/**
	 * 获取或者设置标签文字。
	 */
	me.labelCaption = "";
	
    /**
     * 获取或者设置slider的最小值（值为整数）。
     * @default 0
     */
    me.minValue = 0;
	
    /**
     * 获取或者设置slider的最大值（值为整数）。
     * @default 100
     */
    me.maxValue = 100;

    /**
     * 获取或者设置slider移动的步长（值为整数）。
     * @default 1
     */
    me.increment = 1;
	
	/**
	 * 获取或者设置slider的默认值。
	 * @default 0
	 * 可设置的值为：数字 || 数组。
	 * 此数组中的值必须为大于等于0的整数，并且后一个值应比前一个值大。如: [10,20,30,40]
	 * 如果设定了最小值和最大值，此值大于等到最小值，并且小于等于最大值。
	 * 如果设定了步长(increment)，则此数组中的值必须是步长的倍数。例如:步长设置为5，则数组中的值应该为 ： 5 * n，并且要遵守最小值和最大值的规范。
	 */
	me.sliderValues = 0;
	
    /**
     * 当滑动按纽改变时触发该事件。
     */
    me.onchanged = null;
    
	/**
	 * @ignore
	 * 生成一个随机数，slider外层容器及每个滑动按纽的id使用到了些随机数。
	 */
	var roundId = Math.round(mx.random() * new Date().getTime());
	
	/**
	 * @ignore
	 * 最外层的容器
	 */
	var $slider = null;
	
	/**
	 * @ignore
	 * 点击拖动的A标签对象
	 */
	var $slider_controls = [];
	
	/**
	 * @ignore
	 * 上面百分比的容器
	 */
	var $percent = null;
	
	/**
	 * @ignore
	 * 最外层的容器的html
	 */
	var sliderHtml = null;
	
	/**
	 * @ignore
	 * 最外层的table对象
	 */
	var $table = null;
	
	/**
	 * @ignore
	 * 当订购onchanged事件时，返回当前滑动当前按纽对象及当前滑动按纽百分比值。
	 */
	var curSliderObj = [];

	var origZindexArr = [];
	var startEvtX = 0;
	var startEvtY = 0;
	var startSliderButLeft = 0;
	var startSliderButTop = 0;
	var newZindex = 2000;
	var origValue = null;
	
	var $processContainer = $("<div id='process_wrap'/>");
	
	base.init = me.init;
	me.init = function()
	{
		var temp;
		if(me.increment < 1) me.increment = 1;
		base.init();
		me.$e.addClass("slider");
		_createTable();
		
		if (me.maxValue < me.minValue)
		{
			temp = me.minValue;
			me.minValue = me.maxValue;
			me.maxValue = temp;
		}
		sortValues();
		origValue = $clone(me.sliderValues);
	};
	
	
	function _createTable(){
		$table = $("<table width='100%'><tbody><tr><td class='leftDistance' width='" + me.labelWidth + "'>" + me.labelCaption + "</td><td class='r'></td></tr></tbody></table>");
	}

	
	/**
	 * @ignore
	 * 将slider的值重新排序：
	 * 从小到大顺序，
	 * 将值不符合最小值和最大值的值过滤掉。
	 */
	function sortValues(){
		//根据初始值的类型和数量生成拖动按纽。
		if(typeof me.sliderValues == "number" || typeof me.sliderValues == "string")
		{
			me.sliderValues = parseInt(me.sliderValues);
			me.sliderValues >= me.maxValue ? me.sliderValues = me.maxValue : me.sliderValues = me.sliderValues;
			me.sliderValues <= me.minValue ? me.sliderValues = me.minValue : me.sliderValues = me.sliderValues;
			
			if(me.sliderValues % me.increment != 0)
			{
				if(me.sliderValues < me.increment)
				{
					me.sliderValues += me.increment;
				}
				me.sliderValues = getRemainder(me.increment, me.sliderValues);
			}
			generateSliderHtmlAll(me.sliderValues);
		}
		else if(typeof me.sliderValues == "object")
		{
			//根据数组长度生成动态生成滑动按纽，如果长度为0，则默认生成一个滑动按纽，初始值为0。 
			for(var i = 0; i < me.sliderValues.length; i++)
			{
				if(typeof me.sliderValues[i] == "string")
				{
					me.sliderValues[i] = parseInt(me.sliderValues[i]);
				}
				//处理slider的值不在最大值和最小值中间的的话，就重新设置此值。
				if(me.sliderValues[i] == 0 && me.increment > 1) me.sliderValues[i] += me.minValue + me.increment;

				me.sliderValues[i] >= me.maxValue ? me.sliderValues[i] = me.maxValue : me.sliderValues[i] = me.sliderValues[i];
				
				me.sliderValues[i] <= me.minValue ? me.sliderValues[i] = me.minValue : me.sliderValues[i] = me.sliderValues[i];
				
				if(me.sliderValues[i] % me.increment != 0)
				{
					if(me.sliderValues[i] < me.increment)
					{
						me.sliderValues[i] += me.increment;
					}
					me.sliderValues[i] = getRemainder(me.increment, me.sliderValues[i]);
				}
			}
			me.sliderValues.sort(function(a,b){ return a-b});
			
			if(me.sliderValues.length >= 1)
			{
				generateSliderHtmlAll();
			}
			else
			{
				generateSliderHtmlAll(0);
			}
		}
	}
	
	/**
	 * @ignore
	 * 根据步长，重新设置slider的值。
	 */
	function getRemainder(p_increment,p_value)
	{
		var getRemainder = p_value % p_increment;
		if(p_value < p_increment)
		{
			return p_value += getRemainder; 
		}
		else
		{
			return p_value -= getRemainder; 
		}
	}
	
	/**
	 * 获取slider的当前值
	 * @return 获取当前值字符串，多个值之间使用逗号分隔
	 */
	me.getValue = function()
	{
		var valStr = "";
		for(var i = 0; i < me.sliderValues.length; i ++)
		{
			valStr = valStr + "," + me.sliderValues[i];
		}
		return valStr.substr(1,valStr.length);
	};
	
	/**
	 * @overload function(p_value)
	 * @overload function(p_value,p_triggerEvent)
	 * 
	 * 设置slider的值，
	 * p_value：可设置的值为：数字 || 数组。
	 * p_triggerEvent: true 触发onchanged事件，false不触发
	 */
	me.setValue = function(p_value,p_triggerEvent){
		if (p_triggerEvent == null)
        {
            p_triggerEvent = false;
        }
		if(!_isEquals(p_value)){
			me.sliderValues = p_value;
			me.$e.empty();
			_createTable();
			sortValues();
			origValue = $clone(me.sliderValues);
			if(p_triggerEvent)
				me.trigger("changed");
		}
	}
	
	/**
	 * 设置slider是否可用
	 * 
	 * @param p_enabled true 可用 false 不可用
	 */
	base.setEnabled = me.setEnabled;
	me.setEnabled = function(p_enabled){
		base.setEnabled(p_enabled);
		for(var i = 0; i < $slider_controls.length; i++){
			var e = e || window.event;
			$($slider_controls[i][0]).off("mousedown", _sliderControl_startDrag);
		}
		if(me.enabled){
			for(var i = 0; i < $slider_controls.length; i++){
				var e = e || window.event;
				$($slider_controls[i][0]).on("mousedown", _sliderControl_startDrag);
			}
		}
	}
	
	
	function _isEquals(p_value){
		var value = [];
		if(typeof p_value == 'number'){
			value.add(p_value);
		}else if($isArray(p_value)){
			value = p_value;
		}
		if(value.length != me.sliderValues.length){
			return false;
		}
		for(var i=0;i<value.length;i++){
			if(value[i] != me.sliderValues[i]){
				return false;
			}
		}
		return true;
	}
	
	
	/**
	 * 重置slider的初始值。
	 */
	me.reset = function()
	{
		me.sliderValues = $clone(origValue);
		initialPercent(true,origZindexArr);
	};

	/**
	 * @ignore
	 * 动态生成控制按纽。
	 * p_value : 为一个数字
	 */
	function generateSliderHtmlAll(p_value)
	{
		//p_value : 如果用户传入一个数字，则将数字转换成数组对象来动态生成滑动按纽。
		if(p_value != undefined)
		{
			me.sliderValues = [p_value];
		}

		$slider = $('<div id="slider_' + roundId + '" class="slider_w" minValue='+me.minValue+' maxValue='+me.maxValue+' increment='+me.increment+'></div>');
		//动态添加slider的滑动按纽 id生成的名字规则是：sliderControl_ + 随机id（roundId为全局） + 下划线 + 数组值长度下标
		var zIndex;
		for(var i = 0; i < me.sliderValues.length; i++){
			zIndex = 1000 + (+i);
			if(me.sliderValues[i] == me.maxValue) zIndex = zIndex - i*2;
			$slider_controls[i] = $("<a attr='"+me.sliderValues[i]+"' class='slder_control' id='sliderControl_"+ roundId + '_' + i +"' style='z-index:" + zIndex + "'/>");
			$slider.append($slider_controls[i]);
		}
		
		initialPercent();
		$table.find("td.r").append($slider);
		me.$e.append($table);
		
		var $body = $(document.body);
		$processContainer.append($("<p>&nbsp;</p>"));
		$body.prepend($processContainer);

		var _sliderControls = $slider.find("a");
		for(var i = 0; i < _sliderControls.length; i++)
		{
			origZindexArr[i] = _sliderControls[i].style.zIndex;
		}
		
		sliderHtml = $slider[0];
		slider("slider_" + roundId,$slider_controls);
	}
	
	/**
	 * @ignore
	 * 为每个滑动按纽绑定mousedown事件。
	 */
	function slider(sliderBtn,$slider_controls)
	{
		for(var i = 0; i < $slider_controls.length; i++){
			var e = e || window.event;
			$($slider_controls[i][0]).on("mousedown", _sliderControl_startDrag);
		}
	};
	
	function _sliderControl_startDrag(e){
		var e = e || window.event;
		startDrag(e,this);
	}
	
	/**
	 * @ignore
	 * 动态初始化每个滑动按纽的进度。
	 */
	function initialPercent(p_setDefault,p_zIndex)
	{
		if(p_setDefault){
			if(typeof(me.sliderValues) == "number") me.sliderValues = [me.sliderValues];
			for(var i = 0; i < $slider_controls.length; i ++)
			{
				var initialLeft = parseInt(((me.sliderValues[i] - me.minValue) / (me.maxValue - me.minValue)) * 100);
				$($slider_controls[i]).animate({
				    left : initialLeft + "%",
				    "z-index" : p_zIndex[i]
				 }, 1000);
			}
		}
		else
		{
			for(var i = 0; i < $slider_controls.length; i ++)
			{
				var initialLeft = parseInt(((me.sliderValues[i] - me.minValue) / (me.maxValue - me.minValue)) * 100);
				$($slider_controls[i]).css({
					left : initialLeft + "%"
				});
			}
		}
	}; 

	/**
	 * @ignore
	 * 鼠标点击时，再绑定此对象的mousemove和mouseup事件 
	 */
	var distanceTemp = 0;
	function startDrag(p_evt,p_sliderBtn)
	{
		if (me.enabled === false) return;
		var sliderBtn = p_evt.target;
		var _currentIndex = parseInt((sliderBtn.id).charAt((sliderBtn.id).length-1));//获得当前对象在整个数组中的下标

		distanceTemp = me.sliderValues[_currentIndex];
		
		startEvtX = p_evt.clientX;
		startEvtY = p_evt.clientY;
		startSliderButLeft = sliderBtn.offsetLeft;
		startSliderButTop = sliderBtn.offsetTop;
		
		if (sliderBtn.setCapture && !$isIE())
		{
			sliderBtn.onmousemove = doDrag;
			sliderBtn.onmouseup = stopDarg;
			sliderBtn.setCapture();
		}
		else
		{
			$(document).on("mousemove", function(){
				doDrag(sliderBtn,p_sliderBtn);
			});
			
			$(document).on("mouseup", function(){
				stopDarg(sliderBtn,p_sliderBtn);
			});
		}
	}
	
	var processMove = 1;//进度是根据鼠标位置，但进度停止需要根据滑动按纽来决定。
	function doDrag(e, p_sliderBtn)
	{
		var sliderBtn;
		if(e && $notEmpty(e.target) && e.target.setCapture != undefined)
		{
			sliderBtn = e.target;
			e = e || window.event;
		}
		else
		{
			sliderBtn = p_sliderBtn;
			e = window.event;
		}
		//给当前滑动按纽增加一个class名称，如果以后需要扩展当前按纽样式用此类即可。
		$(sliderBtn).siblings("a").removeClass("activityControl");
		$(sliderBtn).addClass("activityControl");
		
		var _currentIndex = parseInt((sliderBtn.id).charAt((sliderBtn.id).length-1));//获得当前对象在整个数组中的下标
		var leftDistance = e.clientX - startEvtX + startSliderButLeft;
		var canMoveWidth = sliderHtml.offsetWidth - sliderBtn.offsetWidth;// 可以移动的最大值，屏幕内容宽度减去移动物体的宽度。
		
		if (leftDistance < 0) /* 阻止超出浏览器可视宽度 */
		{
			leftDistance = 0;
		}
		else if (leftDistance > canMoveWidth)
		{
			leftDistance = canMoveWidth;
		}
		
		var PercentValue =leftDistance / canMoveWidth ;//计算出当前移动的百分比
		var temValue =  parseInt(PercentValue * (me.maxValue - me.minValue)) + me.minValue; 
		PercentValue = parseInt(PercentValue * 100);
		
		//处理滑动按纽的不能滑动越界。 
		if($notEmpty(me.sliderValues[_currentIndex - 1]))
		{
			if( me.sliderValues[_currentIndex] <= me.sliderValues[_currentIndex - 1]){
				PercentValue = parseInt(sliderBtn.previousSibling.style.left);
				me.sliderValues[_currentIndex] = me.sliderValues[_currentIndex - 1];
				districtValue = me.sliderValues[_currentIndex];
				processMove = 0;
			}
		}
		if($notEmpty(me.sliderValues[_currentIndex + 1]))
		{
			if(me.sliderValues[_currentIndex] >= me.sliderValues[_currentIndex + 1]){
				PercentValue = parseInt(sliderBtn.nextSibling.style.left);
				me.sliderValues[_currentIndex] = me.sliderValues[_currentIndex + 1];
				districtValue = me.sliderValues[_currentIndex];
				processMove = 0;
			}
		}
		var curBtnValue;
		if((distanceTemp + me.increment - temValue) % me.increment == 0)
		{
			//滑动时设置滑动按纽的位置
			sliderBtn.style.left = PercentValue + "%";
			curBtnValue = temValue;
			if (me.showProcessTips && processMove)
			{
				$processContainer[0].innerHTML = curBtnValue;
				var eclientX = e.clientX;
				var getBntPos = getAbsoluteLeft(sliderBtn.offsetParent);
				if(e.clientX <= getBntPos)
				{
					eclientX = getBntPos + 10;
				}
				if(e.clientX >= getBntPos + canMoveWidth)
				{
					eclientX = getBntPos + canMoveWidth + 10;
				}
				$processContainer.css({ "left": eclientX - 10 + "px", "top": getAbsoluteTop(sliderBtn.offsetParent) - 25 + "px", "display": "block", "cursor": "default"});
			}
			
			if(curBtnValue > me.sliderValues[_currentIndex + 1])
			{
				curBtnValue = me.sliderValues[_currentIndex + 1]
			}
			if(curBtnValue < me.sliderValues[_currentIndex - 1])
			{
				curBtnValue = me.sliderValues[_currentIndex - 1]
			}
			me.sliderValues[_currentIndex] = curBtnValue;				
		}
		processMove = 1;
		me.trigger("changed", { curSliderObj: { sliderBtn: sliderBtn, percent : curBtnValue} });
	}
	
	function stopDarg(e,p_sliderBtn)
	{
		var processL = document.getElementById("process_wrap");//解决滑动时选择最外层的进度导致下次移动可能失败。
		processL.click();
		var sliderBtn;
		if(e.target.setCapture != undefined)
		{
			sliderBtn = e.target;
		}
		else
		{
			sliderBtn = p_sliderBtn;
		}
		
		//解决滑动按纽重叠时无法滑动:只要移动，就把当前的zIndex加1，这样无论在前后或者中间重叠，最后一次移动的总在最上面。
		newZindex += 1;
		sliderBtn.style.zIndex = newZindex;
		
		var percent = $table.find("div").find(".percent");
		$processContainer.css("display","none");
		if (sliderBtn.releaseCapture && !$isIE())
		{
			sliderBtn.onmousemove = null;
			sliderBtn.onmouseup = null;
			sliderBtn.releaseCapture();
		}
		else
		{
			$(document).off();
			if (!$isIE())
			{
				p_sliderBtn.removeEventListener("mousemove", doDrag, true);
				p_sliderBtn.removeEventListener("mouseup", stopDarg, true);
			}
		}
	}

	function getAbsoluteLeft(obj)
	{
		if(!obj){return null;}
		    var mendingOb = obj;
		    var mendingLeft = mendingOb .offsetLeft;
		    while( mendingOb != null && mendingOb .offsetParent != null && mendingOb .offsetParent.tagName != "BODY" ){
		      mendingLeft += mendingOb .offsetParent.offsetLeft;
		      mendingOb = mendingOb .offsetParent;
		    }
		return mendingLeft ;
	}
	
	function getAbsoluteTop(obj)
	{
		if(!obj){return null;}
		var mendingOb = obj;
		var mendingTop = mendingOb .offsetTop;
		while( mendingOb != null && mendingOb .offsetParent != null && mendingOb .offsetParent.tagName != "BODY" ){
		    mendingTop += mendingOb .offsetParent.offsetTop;
		    mendingOb = mendingOb .offsetParent;
		}
		return mendingTop ;
	}

	base.dispose = me.dispose;
    /**
	* 释放对象运行时动态生成的内容（属性、方法、事件）。
	*/
    me.dispose = function()
    {
    	if ($slider != null)
    	{
    		$slider.off();
    		$slider.empty().remove();
    		$slider = null;
    	}
    	
    	if (sliderHtml != null)
    	{
    		sliderHtml = null;
    	}
    	
    	if ($table != null)
    	{
    		$table.off();
    		$table.empty().remove();
    		$table = null;
    	}
    	
    	if ($processContainer != null)
    	{
    		$processContainer.off();
    		$processContainer.empty().remove();
    		$processContainer = null;
    	}
    	
    	curSliderObj = null;
		origZindexArr = null;
    	
    	base.dispose();
    }
	
	me.endOfClass(arguments);
	return me;
};
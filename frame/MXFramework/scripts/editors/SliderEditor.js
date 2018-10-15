$ns("mx.editors");
$import("mx.controls.Slider");

/**
 * @ignore
 * 提供一个允许用户拖动进度的类。
 * 
 * @example 以下是一个滑动条编辑器如何初始化的示例。 
 * <code language="JavaScript">
 * var sliderEditor = new mx.editors.SliderEditor(
 * {
 *    name : "slider",
 *    editorType : 'SliderEditor',
 *    showProcessTips : true,
 *    minValue : 20,
 *    width : "100%",
 *    maxValue : 90,
 *    increment : 1,
 *    value : [21,30,40]
 * });
 * </code>
 */
mx.editors.SliderEditor = function()
{
    var me = $extend(mx.editors.Editor);
    var base = {};
    
	/**
	 * 获取或者设置是否显示当前进度值。
	 * @default true
	 */
	me.showProcessTips = true;
	
	/**
	 * 获取或者设置slider最外层的宽，详见 {@link width} 字段的值。
	 * @default 90%
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
	 * 获取或者设置编辑器的默认值，请参考 {@link mx.controls.Slider.sliderValues} 。
	 * @default 0
	 */
	me.value = 0;
	
    /**
     * 当滑动按纽改变时触发该事件。
     */
    me.onchanged = null;
	
    /**
     * 获取或者设置slider移动的步长（值为整数）。
     * @default 1
     */
    me.increment = 1;
	
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
    
    var Slider;
    base.init = me.init;
    me.init = function()
    {
        Slider = new mx.controls.Slider({
		    showProcessTips : me.showProcessTips,
		    width : "90%",
		    labelCaption : me.labelCaption,
		    labelWidth : me.labelWidth,
		    increment : me.increment,
		    minValue : me.minValue,
		    maxValue : me.maxValue,
		    sliderValues : me.value,
		    onchanged : _slider_onchanged
		});
        base.init();
        me.$e.addClass("SliderEditor");
        me.$e.append(Slider.$e);
    };
    
    function _slider_onchanged(p_args){
    	var value = Slider.getValue();
    	base.setValue(value,true);
    }
    
    /**
     * 获取SliderEditor的值,多个值以逗号分隔。
     */
    me.getValue = function ()
    {
    	return Slider.getValue();
    };
    
    base.setValue = me.setValue;
    /**
     * 设置SliderEditor的值,value的值可以是 数字、逗号分隔德尔字符串或者是数组,值范围的具体约束可以参考 {@ mx.controls.Slider.sliderValues}
     * @param p_value 指定编辑器的值。
     * @param [p_triggerEvent=false] 指定是否要触发 {@link onchanged} 事件。
     * 触发事件的条件是p_triggerEvent为true并且当前值me.value不等于p_value
     */
    me.setValue = function(p_value, p_triggerEvent){
    	Slider.setValue(typeof p_value == 'string' ? p_value.split(",") : p_value, p_triggerEvent);
    	if(p_triggerEvent == null || p_triggerEvent == false)
    		base.setValue(Slider.getValue());
    }
    
    base.setEnabled = me.setEnabled;
    me.setEnabled = function(p_enabled)
    {          
        base.setEnabled(p_enabled);
        Slider.setEnabled(p_enabled);
    }
    
    base.setReadOnly = me.setReadOnly;
    me.setReadOnly = function(p_readOnly){
        base.setReadOnly(p_readOnly);
        me.setEnabled(!me.readOnly);
    };
    
    me.endOfClass(arguments); 
    return me;
};
/*输入节点*/
$(function() {

	function getStyle(obj) {
		if(document.currentStyle) {
			return obj.currentStyle;
		} else {
			return window.getComputedStyle(obj, false)
		}
	}
	var box2height = document.getElementsByClassName("box2")[0];
	var oo = getStyle(box2height);
	debugger
	console.log(oo.height)

})

(function() {

	function getStyle(obj, attr) {
		if(obj.currentStyle) {
			return isNaN(parseFloat(obj.currentStyle[attr])) ? obj.style[attr] = 0 : obj.currentStyle[attr];
		} else {
			return isNaN(parseFloat(getComputedStyle(obj, null)[attr])) ? obj.style[attr] = 0 : getComputedStyle(obj, null)[attr];
		}
	}
	var box2height = document.getElementsByClassName("box2")[0];
	var oo = getStyle(box2height, "height");

	console.log(oo)

})

//element:需要获取样式的目标元素;name:样式属性
function getStyle(element, name) {
	var computedStyle;
	try {
		computedStyle = document.defaultView.getComputedStyle(element, null);
	} catch(e) {
		computedStyle = element.currentStyle;
	}
	if(name != "float") {
		return computedStyle[name];
	} else {
		return computedStyle["cssFloat"] || computedStyle["styleFloat"];
	}
}
//element:需要设置样式的目标元素;name:样式属性;value:设置值
function setStyle(element, name, value) {
	if(name != "float") {
		element.style[name] = value;
	} else {
		element.style["cssFloat"] = value;
		element.style["styleFloat"] = value;
	}
}
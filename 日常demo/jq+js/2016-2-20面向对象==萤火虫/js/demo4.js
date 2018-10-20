$(function(){
	var total = 100;
	var firewom = [];
	for(var i = 0;i<total;i++){
		firewom[i] = new Firewom();
		firewom[i].showPoint().show().move();
	}
	
	/*var fireworm = new Firewom();
	alert(fireworm.showPoint().pointX)
	fireworm.showPoint().show().move();*/
	//alert(fireworm.speed().speedRunTime);
});
//构造函数方式 + 原型
function Firewom(){
	this.element = $('<img src="img/1.jpg" />');
}

Firewom.prototype.showPoint = function(){
	this.pointX = Math.random()*($("div").width()-18);
	this.pointY = Math.random()*($("div").height()-18);
	return this;//方便该对象在其他地方调用
}

Firewom.prototype.show = function(){
	this.element.css({"top":this.pointY+"px","left":this.pointX+"px"});
	$("div").append(this.element);
	return this;
}

Firewom.prototype.speed = function(){
	this.speedRunTime = Math.round(Math.random()*10+5)*1000;
	return this;
}


Firewom.prototype.move = function(){
	var _self = this;
	this.element.animate({"top":this.pointY+"px","left":this.pointX+"px"},this.speedRunTime,function(){
		_self.showPoint().speed().move();
	});
	
}

$(function(){
	var fireworm = new Object();
	/*function creatFire(){
		var img  = document.createElement("img");
		img.setAttribute("src","img/1.jpg");
		return img;
	}*/
	fireworm.element = $('<img src="img/1.jpg"/>');
	
	fireworm.point = {
		pointX:100,
		pointY:100
	}
	fireworm.showPoint = function(){
		var x = Math.random()*($("div").width()-18);
		var y = Math.random()*($("div").height()-18);
		var point = {
			pointX:x,
			pointY:y
		}
		return point;
	}
	
	fireworm.show = function(){
		this.element.css({"top":this.showPoint().pointY+"px","left":this.showPoint().pointX+"px"});
		$("div").append(this.element);
	}
	fireworm.speed = function(){
		var speedRunTime = Math.round(Math.random()*10)*1000;//转换成秒
		return speedRunTime;
	}
	
	fireworm.move = function(){
		var _self = this;
		this.element.animate({"top":this.showPoint().pointY+"px","left":this.showPoint().pointX+"px"},this.speed(),function(){
			_self.move();
		});
	}
	
	fireworm.show();
	fireworm.move();
	var fireworm1 = new Object();
	/*function creatFire(){
		var img  = document.createElement("img");
		img.setAttribute("src","img/1.jpg");
		return img;
	}*/
	fireworm1.element = $('<img src="img/1.jpg"/>');
	
	fireworm1.point = {
		pointX:100,
		pointY:100
	}
	fireworm1.showPoint = function(){
		var x = Math.random()*($("div").width()-18);
		var y = Math.random()*($("div").height()-18);
		var point = {
			pointX:x,
			pointY:y
		}
		return point;
	}
	fireworm1.speed = function(){
		var speedRunTime = Math.round(Math.random()*10)*1000;
		return speedRunTime;
	}
	
	fireworm1.show = function(){
		this.element.css({"top":this.showPoint().pointY+"px","left":this.showPoint().pointX+"px"});
		$("div").append(this.element);
	}
	
	
	fireworm1.move = function(){
		var _self = this;
		this.element.animate({"top":this.showPoint().pointY+"px","left":this.showPoint().pointX+"px"},this.speed(),function(){
			_self.move();
		});
	}
	
	fireworm1.show();
	fireworm1.move();
	//alert(fireworm.element);
});

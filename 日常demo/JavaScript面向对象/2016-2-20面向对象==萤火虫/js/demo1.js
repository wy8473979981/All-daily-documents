$(function(){
	var total = 100;
	var fireworm = [];
	for(var i = 0;i<total;i++){
		fireworm[i] = new Object();
	/*function creatFire(){
		var img  = document.createElement("img");
		img.setAttribute("src","img/1.jpg");
		return img;
	}*/
	fireworm[i].element = $('<img src="img/1.jpg"/>');
	
	fireworm[i].point = {
		pointX:100,
		pointY:100
	}
	fireworm[i].showPoint = function(){
		var x = Math.random()*($("div").width()-18);
		var y = Math.random()*($("div").height()-18);
		var point = {
			pointX:x,
			pointY:y
		}
		return point;
	}
	
	fireworm[i].show = function(){
		this.element.css({"top":this.showPoint().pointY+"px","left":this.showPoint().pointX+"px"});
		$("div").append(this.element);
	}
	fireworm[i].speed = function(){
		var speedRunTime = Math.round(Math.random()*10+5)*1000;
		return speedRunTime;
	}
	
	fireworm[i].move = function(){
		var _self = this;
		this.element.animate({"top":this.showPoint().pointY+"px","left":this.showPoint().pointX+"px"},this.speed(),function(){
			_self.move();
		});
	}
	
	fireworm[i].show();
	fireworm[i].move();
		
	}
	
	
	

});

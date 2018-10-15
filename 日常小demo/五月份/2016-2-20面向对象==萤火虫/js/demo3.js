$(function() {
	var total = 100;
	var fireworm = [];

	for (var i = 0; i < total; i++) {
	/*	fireworm[i] = fly();
		fireworm[i].show();
		fireworm[i].move();*/
		fireworm[i] = new Fireworm();
		fireworm[i].show();
		fireworm[i].move();
	}
});

//构造函数方式
function  Fireworm(){
	this.element = $('<img src="img/1.jpg"/>');
	this.point = {
		pointX: 100,
		pointY: 100
	}
	this.showPoint = function() {
		var x = Math.random() * ($("div").width() - 18);
		var y = Math.random() * ($("div").height() - 18);
		var point = {
			pointX: x,
			pointY: y
		}
		return point;
	}

	this.show = function() {
		this.element.css({
			"top": this.showPoint().pointY + "px",
			"left": this.showPoint().pointX + "px"
		});
		$("div").append(this.element);
	}
	this.speed = function() {
		var speedRunTime = Math.round(Math.random() * 10 + 5) * 1000;
		return speedRunTime;
	}

	this.move = function() {
		var _self = this;
		this.element.animate({
			"top": this.showPoint().pointY + "px",
			"left": this.showPoint().pointX + "px"
		}, this.speed(), function() {
			_self.move();
		});
	}
}


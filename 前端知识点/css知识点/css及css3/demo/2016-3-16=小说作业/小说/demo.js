$(function(){
	var count = 0;
	if(localStorage.getItem("count") === null){
		count = 1;
		localStorage.setItem("count",count);
		//console.log(localStorage.getItem("count"));
		$(".count").html(localStorage.getItem("count"));
	}else{
		count = parseInt(localStorage.getItem("count"));
		//console.log(count);
		count++;
		localStorage.setItem("count",count);
		$(".count").html(localStorage.getItem("count"));
	}
	$(".set").on("click",function(){
		$(".container ul").show();
	});
	$(".content").on("click",function(){
		$(".container ul").hide();
	});
	
	
	
	
	
	if(localStorage.getItem("size") !== null){
		$(".content p").css("font-size",localStorage.getItem("size")+"px");
	}
	var size = $(".content p").css("font-size");
	console.log(size);
	$("#smallSize").on("click",function(){
		if(localStorage.getItem("size") === null){
			localStorage.setItem("size",size);
		}else{
			var sizeNum = parseInt(localStorage.getItem("size"));
			$(".content p").css("font-size",sizeNum+"px");
			sizeNum -= 2;
			localStorage.setItem("size",sizeNum);
			if(sizeNum < 12){
				sizeNum = 12;
				localStorage.setItem("size",sizeNum);
				alert("已是最小字体");
			}
		}
	});
	$("#bigSize").on("click",function(){
		if(localStorage.getItem("size") === null){
			localStorage.setItem("size",size);
		}else{
			var sizeNum = parseInt(localStorage.getItem("size"));
			sizeNum += 2;
			localStorage.setItem("size",sizeNum);
			$(".content p").css("font-size",sizeNum+"px");
			if(sizeNum > 24){
				sizeNum = 24;
				localStorage.setItem("size",sizeNum);
				alert("已是最大字体");
			}
		}
	});
	if(localStorage.getItem("color") !== null && localStorage.getItem("bgColor") !== null){
		$(".main").css({"background":localStorage.getItem("bgColor"),"color":localStorage.getItem("color")});
	}
	$(".skin span").eq(0).on("click",function(){
		var bgColor = $(this).css("background");
		var color = $(this).css("color");
		localStorage.setItem("color",color);
		localStorage.setItem("bgColor",bgColor);
		$(".main").css({"background":bgColor,"color":color});
	});
	$(".skin span").eq(1).on("click",function(){
		var bgColor = $(this).css("background");
		var color = $(this).css("color");
		localStorage.setItem("color",color);
		localStorage.setItem("bgColor",bgColor);
		$(".main").css({"background":bgColor,"color":color});
	});
	$(".skin span").eq(2).on("click",function(){
		var bgColor = $(this).css("background");
		var color = $(this).css("color");
		localStorage.setItem("color",color);
		localStorage.setItem("bgColor",bgColor);
		$(".main").css({"background":bgColor,"color":color});
	});
});

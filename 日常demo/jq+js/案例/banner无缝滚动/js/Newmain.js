
//$(function() {
//	movePic();
//});
//
//function movePic() {
//	var num = $('.weichuangyi_span span').length;
//	var $span = $('.weichuangyi_span p span');
//	var $oUl = $(".weichuangyi_ul");
//	var $oLi = $oUl.children();
//
//	var oLiLength = $oLi.length;
//	var $width = $oLi.width();
//	var index = 0;
//	var resWidth = $width * oLiLength;
//	var timer = '';
//	var $left;
//	var spanIndex;
//	$oUl.width(resWidth);
//	moveAuto();
//
//	function moveAuto() {
//		clearInterval(timer);
//		timer = setInterval(function() {
//			$(".weichuangyi_right").click();
//		}, 2000);
//	}
//	$(".weichuangyi_right").on("click", function() {
//		nextOrPrev(1);
//	});
//
//	$(".weichuangyi_left").on("click", function() {
//		nextOrPrev(-1);
//	});
//
//	function nextOrPrev(direction) {
//		clearInterval(timer);
//		switch (direction) {
//			case 1:
//				if (index == (oLiLength-1)) {
//					index = 0;
//					$oUl.css("left", 0);
//				}
//				index++;
//				break;
//
//			case -1:
//				if (index == 0) {
//					index = (oLiLength-1);
//					$oUl.css("left", -index * $width);
//				}
//				index--;
//				break;
//		}
//		$left = -index * $width;
//		$oUl.animate({
//			"left": $left
//		}, 200, function() {
//			moveAuto();
//		});
//		changeClass();
//	}
//

//	function changeClass() {
//		spanIndex = index;
//		spanIndex = spanIndex == (oLiLength-1) ? 0 : index;
//		$span.eq(spanIndex).addClass("weichuangyi_span_one").siblings().removeClass("weichuangyi_span_one");
//	}
//	$span.on("click", function() {
//		var $index = $(this).index();
//		index = $index;
//		$span.eq($index).addClass("weichuangyi_span_one").siblings().removeClass("weichuangyi_span_one");
//		$left = -$index * $width;
//		$oUl.animate({
//			"left": $left
//		}, 200);
//	});
//}


$(function(){
	movePic();
	
});
function movePic(){
	
	var $oUl = $(".weichuangyi_ul");
	var $span = $(".weichuangyi_span span");
	var spanLength = $span.length;
	var $oLi = $oUl.children();
	var oLiLenght = $oLi.length;
	
	var oLiWidth = $oLi.width();
	var oUlWidth = oLiWidth*oLiLenght;	
	$oUl.width(oUlWidth);
	
	var index = 0;
	var timer = '';
	var $left;
	var spanIndex;
	
	moveAuto();
	
	function moveAuto(){
		clearInterval(timer);
		timer = setInterval(function(){
			$(".weichuangyi_right").click();
		},2000);
	}
	$(".weichuangyi_left").on("click",function(){
			nextOrPrev(-1);
	});
		
	$(".weichuangyi_right").on("click",function(){
		nextOrPrev(1);
	});
		
	function nextOrPrev(direction){
		clearInterval(timer);
		switch (direction){
			case 1:
				if(index == (oLiLenght-1)){
					index = 0;
					$oUl.css("left",0);
				}
				index++;
				break;
			case -1:
				if(index == 0){
					index = (oLiLenght-1);
					$oUl.css("left",-index*oLiWidth);
				}
				index--;
				break;
		}
		$left = -index*oLiWidth;
		$oUl.animate({
			'left' : $left
		},500,function(){
			moveAuto();
		});
		spanChangeClass();
	}
		
	function spanChangeClass(){
		spanIndex = index;
		spanIndex = spanIndex == (oLiLenght-1) ? 0 : index;
		$span.eq(spanIndex).addClass("weichuangyi_span_one").siblings().removeClass("weichuangyi_span_one");
	}
	$span.on("click",function(){
		var $index = $(this).index();
		index = $index;
		$span.eq(index).addClass("weichuangyi_span_one").siblings().removeClass("weichuangyi_span_one");
		$left = -index*oLiWidth;
		$oUl.animate({
			'left' : $left
		},500);
	});
}




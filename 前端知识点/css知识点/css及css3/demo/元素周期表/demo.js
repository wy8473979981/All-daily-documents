$(function(){
	var $tdList = $(".tabOne tr td");
	$tdList.hover(function(){
		
		$(this).css({"opacity":"1","boxShadow":"0px 0px 10px #666"});
	},function(){
		$(this).css({"opacity":"0.7","boxShadow":"0px 0px 1px #666"});
		$(this).find(".box").css({"display":"none","zIndex":"0"});
	});
	
	$tdList.on("click",function(){
		$(this).find(".box").css({"display":"block","zIndex":"1"});
	})
	
	
	
	
	
	
	
	
	
	
	
});

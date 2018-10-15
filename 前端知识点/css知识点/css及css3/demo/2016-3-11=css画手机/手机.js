$(function(){
	var time = new Date();
	console.log(time);
	var hours = time.getHours();
	var minutes = time.getMinutes();
	$(".span4").html(hours+":"+minutes);
	
	$(".home").on("click",function(){
		$(".show").css({"filter":"alpha(opacity=100)","opacity":"1"});
		$(".phone .pingmu .show p").html("");
	});
	
	
	
	
});
$(function(){
	var tel  = "tel";
	var passWord = "passWord";
	var isLogin = "isLogin";
	
	
	
	$(".footer div").on("click",function(){
		$(this).addClass("color").siblings().removeClass("color");
	});
	$(".tipInfo").on("click",function(){
		if(localStorage.getItem(isLogin) == "1"){
			window.location = "userCenter/userCenter_login.html";
		}else if(localStorage.getItem(isLogin) !== "1"){
			window.location = "userCenter/userCenter_noLogin.html";
		}
	});
	
	
	
	
});

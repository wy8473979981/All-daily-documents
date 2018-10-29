var dataUrl = "http://localhost:8080/Proxy/FootBall/";
function Toast(str,time){
	$("#toast").html(str);
	$("#toast").show();
	setTimeout(function(){
		$("#toast").hide();
	},time);
}

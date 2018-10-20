$(function(){
	var $getCode = $(".register .right");
	$getCode.on("click",function(){
		$(this).html(Math.ceil(Math.random() * 8999)+1000);
	});
	
	var arrayP = new Array();
	arrayP[0] = "手机号格式不正确";
	arrayP[1] = "验证码不正确";
	arrayP[2] = "密码格式不正确";
	arrayP[3] = "两次密码输入不一致";
	

	//实例化对象
	var contact = new Object;
	
	$(".btn").on("click",function(){
		contact.tel = $("#tel").val();
		contact.passWord = $("#passWord").val();
		contact.isLogin = "0";
		var str = JSON.stringify(contact);
		
		var code = $("#code").val();
		var rePassWord = $("#rePassWord").val();
		var telExp = new RegExp(/^1(3|5|7|8|9)\d{9}$/);
		var passWordExp = new RegExp(/^[\w\.\-]{5,15}$/);
		
	
		if( telRegExp(contact.tel,telExp) == false){
			$(".model").css({"display":"block"});
			$(".model").html(arrayP[0]);
		}else if(code !== $getCode.html()){
			$(".model").css({"display":"block"});
			$(".model").html(arrayP[1]);
		}else if( PassReg(contact.passWord,passWordExp) == false){
			$(".model").css({"display":"block"});
			$(".model").html(arrayP[2]);
		}else if( rePassWord !== contact.passWord){
			$(".model").css({"display":"block"});
			$(".model").html(arrayP[3]);
		}else if(localStorage.getItem(contact.tel) !== null){
			$(".model").css({"display":"block"});
			$(".model").html("用户名重复");
		}else{
			console.log(contact.tel);
			localStorage.setItem(contact.tel,str);
			window.location = "login.html";
		}
	});
	/**
	 * 
	 * @param {Object} $ele
	 * @param {Object} Exp
	 *
	 * dec:判断手机号的方法
	 */
	function telRegExp($ele,Exp){
		if(Exp.test($ele) == true){
			return true;
		}else{
			return false;
		}
	}
	/**
	 * 
	 * @param {Object} $ele
	 * @param {Object} Exp
	 * 
	 * dec:判断密码号的方法
	 */
	function  PassReg($ele,Exp){
		if(Exp.test($ele) == true){
			return true;
		}else{
			return false;
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
});

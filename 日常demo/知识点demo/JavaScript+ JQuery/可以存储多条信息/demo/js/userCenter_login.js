$(function(){
	var thisIndex=0;
	
	var arrayP = new Array();
	arrayP[0] = "原密码不正确";
	arrayP[1] = "密码格式不正确";
	arrayP[2] = "两次密码输入不一致";
	var passWordExp = new RegExp(/^[\w\.\-]{5,15}$/);
	
	//获取localStorage并且放到数组中，给每条加个ID
	var arrayB = [];
	for (var i = 0; i < localStorage.length; i++) {
		var info = localStorage.key(i);
		var str = localStorage.getItem(info);
		var contact = JSON.parse(str);
		arrayB.push(contact);
	}
	
	$(".footer div").on("click",function(){
		$(this).addClass("color").siblings().removeClass("color");
	});
	
	//判断是哪个账户登录
	for(var i = 0; i < arrayB.length; i++){
		if( arrayB[i].isLogin == "1"){
			$(".user .userA").html(arrayB[i].tel);
			thisIndex = i;//获取当前账户的下标
		}
	}

	//弹出修改密码
	$(".infoList").eq(2).on("click",function(){
		$(".modal").css({"display":"block"});
	});	
	
	//确定
	$("#sure").on("click",function(){
		var oldPwdVal = $("#password").val();
		var newPwdVal = $("#repassword").val();
		var newAgainPwdVal = $("#aginpassword").val();
		
		if(arrayB[thisIndex].passWord !== oldPwdVal){
			console.log(oldPwdVal);
			$(".model").css({"display":"block"});
			$(".model").html(arrayP[0]);
		}else if( PassReg(newPwdVal,passWordExp,arrayP[2]) == false){
			$(".model").css({"display":"block"});
			$(".model").html(arrayP[1]);
		}else if( newPwdVal !== newAgainPwdVal){
			$(".model").css({"display":"block"});
			$(".model").html(arrayP[2]);
		}else{
			
			//更新当前账号的localStorage
			var contact = new Object;
			contact.tel = arrayB[thisIndex].tel;
			contact.passWord = $("#password").val();
			contact.isLogin = "0";
			var str = JSON.stringify(contact);
			localStorage.setItem(contact.tel,str);
			
			window.location = "../login.html";
		}
	});
	
	//推出修改密码
	$("#esc").on("click",function(){
		$(".modal").css({"display":"none"});
	});	
	
	
	
	/**
	 * 
	 * @param {Object} $ele
	 * @param {Object} Exp
	 * @param {Object} show
	 * dec:判断密码号的方法
	 */
	function  PassReg($ele,Exp,show){
		if(Exp.test($ele) == true){
			$(".model").css({"display":"none"});
			return true;
		}else{
			return false;
		}
	}
	
	
	
	
	
	
	
	
	
	
});

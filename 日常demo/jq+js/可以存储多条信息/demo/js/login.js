$(function() {
	var arrayP = new Array();
	arrayP[0] = "手机号不正确";
	arrayP[1] = "密码不正确";
	
	//获取localStorage并且放到数组中，给每条加个ID
	var arrayB = [];
	for (var i = 0; i < localStorage.length; i++) {
		var info = localStorage.key(i);
		var str = localStorage.getItem(info);
		var contact = JSON.parse(str);
		arrayB.push(contact);
	}
	
	$(".btn").on("click", function() {
		var telVal = $("#tel").val();
		var passwordVal = $("#password").val();
		
		for (var j = 0; j < arrayB.length; j++) {
			if (telVal == arrayB[j].tel) {//判断手机号
				$(".model").css({"display": "none"});
				if(passwordVal == arrayB[j].passWord){//手机号正确时，判断密码
					$(".model").css({"display":"none"});
					//更新当前账号的localStorage
					var contact = new Object;
					contact.tel = $("#tel").val();
					contact.passWord = $("#password").val();
					contact.isLogin = "1";
					var str = JSON.stringify(contact);
					localStorage.setItem(contact.tel,str);

					window.location = "userCenter/userCenter_login.html";
				}else{
					$(".model").css({"display":"block"});
					$(".model").html(arrayP[1]);
				}
				return;
			} else {
				$(".model").css({"display": "block"});
				$(".model").html(arrayP[0]);
			}
		}
	});
});
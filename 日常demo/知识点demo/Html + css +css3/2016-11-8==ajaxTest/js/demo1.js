//var msg = document.getElementById("msg");
//var xhr = createXHR();
////alert(xhr)
//xhr.open("GET","demo1.php",false);
//xhr.send()
////alert(xhr.responseText)
//msg.innerHTML = xhr.responseText;
//在ie中，第一次读取之后，就将你的数据做了缓存，第二次调用的时候就将第一次的值默认为最新值
//怎么解决？
//var msg = document.getElementById("msg");
//var xhr = createXHR();
////alert(xhr)
//xhr.open("GET","demo1.php?random="+Math.random(),false);
//xhr.send()
////alert(xhr.responseText)
//msg.innerHTML = xhr.responseText;
//


addEvent(document,"click",function(){
	var msg = document.getElementById("msg");
	var xhr = createXHR();
	//alert(xhr)
	xhr.open("GET","demo1.php?random="+Math.random(),false);
	xhr.send()
	//alert(xhr.responseText)
	msg.innerHTML = xhr.responseText;
})


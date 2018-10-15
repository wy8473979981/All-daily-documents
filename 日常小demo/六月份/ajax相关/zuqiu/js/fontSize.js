document.documentElement.style.fontSize = document.documentElement.clientWidth / 6.4  < 50 ? 50 : document.documentElement.clientWidth / 6.4 + 'px';	
window.onresize = function(){
	document.documentElement.style.fontSize = document.documentElement.clientWidth / 6.4  < 50 ? 50 : document.documentElement.clientWidth / 6.4 + 'px';

}



/*console.log(document.documentElement.style.fontSize);*/

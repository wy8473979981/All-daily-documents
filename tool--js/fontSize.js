/*对浏览器窗口监听，设置基本字号*/
document.documentElement.style.fontSize = document.documentElement.clientWidth / 6.4  < 50 ? 50 : document.documentElement.clientWidth / 6.4 + 'px';
window.onresize = function(){
	document.documentElement.style.fontSize = document.documentElement.clientWidth / 6.4  < 50 ? 50 : document.documentElement.clientWidth / 6.4 + 'px';

}


/*6.4是根据设计稿640px/100的来的，
 	实时当前屏幕除以6.4后，
 	全局元素尺寸就按1rem就等于100px来设计
 	实时当前屏幕除以6.4后 < 50 表示是最小屏幕320px
*/
/*console.log(document.documentElement.style.fontSize);*/

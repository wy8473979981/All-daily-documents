var windowHeight = $(window).height(),
	$body = $("body");
$body.css("height", windowHeight);
var startX, startY, moveEndX, moveEndY, X, Y;

$("body").on("touchstart", function(e) {
	e.preventDefault();
	startX = e.originalEvent.changedTouches[0].pageX,
		startY = e.originalEvent.changedTouches[0].pageY;
});
$("body").on("touchmove", function(e) {
	e.preventDefault();
	moveEndX = e.originalEvent.changedTouches[0].pageX,
		moveEndY = e.originalEvent.changedTouches[0].pageY,
		X = moveEndX - startX,
		Y = moveEndY - startY;

	if(Math.abs(X) > Math.abs(Y) && X > 0) {
		alert("left 2 right");
	} else if(Math.abs(X) > Math.abs(Y) && X < 0) {
		alert("right 2 left");
	} else if(Math.abs(Y) > Math.abs(X) && Y > 0) {
		alert("top 2 bottom");
	} else if(Math.abs(Y) > Math.abs(X) && Y < 0) {
		alert("bottom 2 top");
	} else {
		alert("just touch");
	}
});
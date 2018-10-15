
function getEle(){};
getEle.prototype.getId = function(getId){
	return document.getElementById(getId);
}
getEle.prototype.getTagName = function(getTagName,oParent){
	return ( oParent || document).getElementsByTagName(getTagName);
}
getEle.prototype.getClassName = function(getClassName){
	var TagName = document.getElementsByTagName("*");
	var Array = [];
	for(var i=0;i<TagName.length;i++){
		if(TagName[i].getAttribute('class') === getClassName){
		Array.push(TagName[i]);
		}
	}
		return Array;
}
getEle.prototype.getName = function(getName){
	return document.getElementsByName(getName);
}



















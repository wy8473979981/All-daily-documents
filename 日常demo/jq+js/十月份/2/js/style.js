window.onload = function() {
	ageSort();
	areaSort();

}

function ageSort() {
	var agebtn = document.getElementById('age');
	agebtn.onclick = function() {
		sortStr('age');
	}
}

function areaSort() {
	var areabtn = document.getElementById('area');
	areabtn.onclick = function() {
		sortStr('area');
	}
}

function sortStr(opear) {
	var bodyone = document.getElementById('body-one');
	var trs = bodyone.getElementsByTagName('tr');
	var array = [];
	for(var i = 0; i < trs.length; i++) {
		array.push(trs[i]);
	}

	if(opear === 'age') {
		array.sort(function(tr1, tr2) {
			var age1 = parseInt(tr1.children[2].innerHTML);
			var age2 = parseInt(tr2.children[2].innerHTML);
			if(age1 < age2) {
				return -1;

			} else {
				return 1;
			}
		});
	} else {
		array.sort(function(tr1, tr2) {
			debugger
			var area1 = tr1.children[3].innerHTML;
			var area2 = tr2.children[3].innerHTML;
			return area1.localeCompare(area2);
		});
	}
	for(var i = 0; i < array.length; i++) {
		bodyone.appendChild(array[i]);
	}

}


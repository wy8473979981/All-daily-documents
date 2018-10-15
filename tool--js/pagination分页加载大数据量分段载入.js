var items_per_page = 20;
var num_entries = 0;

$(function() {

	ProList(1); //初始载入列表

	initPagination(); //页码显示
});

function initPagination() {
	$("#Pagination").pagination(num_entries, {
		callback: pageselectCallback,
		items_per_page: items_per_page,
		prev_text: "前一页",
		next_text: "后一页"
	});
};

function pageselectCallback(page_index, jq) {

	ProList(page_index);

}

function sorta(filtera) {

	var src = $("[alt=" + filtera + "]").attr('src');
	name = filtera;

	if ($("[alt=" + filtera + "]").attr('src') == '../images/bottom.png') {
		$("[alt=" + filtera + "]").attr('src', '../images/top.png');
		sort = "asc";
	} else {
		$("[alt=" + filtera + "]").attr('src', '../images/bottom.png');
		sort = "desc";
	}

	ProList(1);
}

function ProList(pageindexs) {

	$.ajax({
		cache: false,
		async: false,
		type: "POST",
		data: {
			pageIndex: pageindexs,
			name: name,
			sort: sort
		},

		url: "http://localhost:3399/InstitutionsSambo/Hander/GGYDHandler.ashx",
		success: function(data) {
			$("#con").empty().append(data);
		}
	})
	pagelist();
}

function pagelist() {
	$.ajax({
		cache: false,
		async: false,
		type: "POST",
		url: "http://localhost:3399/InstitutionsSambo/Hander/GGYDPageHandler.ashx",
		success: function(dataa) {
			num_entries = dataa;
		}
	});
}
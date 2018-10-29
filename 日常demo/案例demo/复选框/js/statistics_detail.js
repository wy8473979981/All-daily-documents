var obj = {};

obj.initTable = function(){
    $.get("/email/statisticDetail",function(result){
        var str = "";
        if(result.length != 0){
            for (var i = 0; i < result.length; i++) {
                str += "<tr>";
                str += "<td><input type='checkbox' name='single' value='"+result[i].id+"' onclick='obj.checkSingle()' /></td>";
                str += "<td>"+result[i].mailId+"</td>";
                str += "<td>"+result[i].status+"</td>";
                str += "<td>"+result[i].listCount+"</td>";
                str += "</tr>";
            }
        }
        $("#data").empty();
        $("#data").append(str);
    });
};

/**
 * 全选或全不选
 */
obj.checkAll = function(){
    var isCheck = "";
    if($("#all").attr('checked') == true){
        isCheck = "checked";
    }
    var inputs = document.getElementsByTagName("input");
    for(var i = 0; i < inputs.length; i++) {
        if(inputs[i].type == "checkbox") {
            inputs[i].checked = isCheck;
        }
    }
};

/**
 * 单选
 */
obj.checkSingle = function(){
    var count = 0;
    var inputs = $('input[name="single"]');
    for(var i = 0; i < inputs.length; i++) {
        if(inputs[i].checked == true) {
            count ++;
        }
    }
    if(count == inputs.length) {    
        $("#all").attr("checked", true);
    } else { 
        $("#all").attr("checked", false);
    } 
};

obj.count = function(){
    var array = new Array();
    var inputs = $('input[name="single"]');
    for(var i = 0; i < inputs.length; i++) {
        if(inputs[i].checked == true) {
            array.push(inputs[i].value);
        }
    }
    location.href = "statistics.html?ids=" + array;
};

$(document).ready(function(){
    obj.initTable();
    $("#all").click(obj.checkAll);
    $("#btn").click(obj.count);
});
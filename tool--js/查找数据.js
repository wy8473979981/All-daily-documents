function __jumpPage$!tableid(page){
        sublime.showLoadingbar($(".main-content"));
        #if("$!tableid"!="")
            var __pageControl = $("#$!tableid");
        #else
        var __pageControl = $("#data");
        #end
        var form = __pageControl.parent("form");
        var param = {};
        var inputs = $.find("input");
        $.each(inputs, function(i,input){
            param[input.name] = input.value;
        });
        param.curPage = page;
        param.tableId = "$!tableid";
        $.post(form.attr("action"), param, function (data) {
            if(!data){ return false;}
            #if("$!tableid"!="")
            $("#$!tableid tbody").html(data);
            #else
            $("#data tbody").html(data);
            #end
            $("#__pageLeft$!tableid").html("第"+$("#pageNo$!tableid").val()+"/"+$("#totalPage$!tableid").val()+"页，每页显示"+$("#pageSize$!tableid").val()+"条，共"+$("#totalCount$!tableid").val()+"条数据");
            $("#__pageControl$!tableid").html("<li id=\"__pageFirst$!tableid\" class=\"disabled\"><a href=\"javascript:;\">首页</a></li>" +
                    "<li id=\"__pagePre$!tableid\" class=\"disabled\"><a href=\"javascript:;\">上一页</a></li>" +
                    "<li id=\"__pageNext$!tableid\" class=\"disabled\"><a href=\"javascript:;\">下一页</a></li>" +
                    "<li id=\"__pageLast$!tableid\" class=\"disabled\"><a href=\"javascript:;\">末页</a></li>");
            if(parseInt($("#pageNo$!tableid").val())>1){
                $("#__pageFirst$!tableid").removeClass("disabled");
                $("#__pagePre$!tableid").removeClass("disabled");
                $("#__pageFirst$!tableid a").on("click",function(){
                    __jumpPage$!tableid(1);
                });
                $("#__pagePre$!tableid a").on("click",function(){
                    __jumpPage$!tableid(parseInt($("#pageNo$!tableid").val())-1);
                });
            }else{
                $("#__pageFirst$!tableid").addClass("disabled");
                $("#__pagePre$!tableid").addClass("disabled");
                $("#__pageFirst$!tableid a").off("click");
                $("#__pagePre$!tableid a").off("click");
            }
            if(parseInt($("#totalPage$!tableid").val()) > parseInt($("#pageNo$!tableid").val())){
                $("#__pageNext$!tableid").removeClass("disabled");
                $("#__pageLast$!tableid").removeClass("disabled");
                $("#__pageNext$!tableid a").on("click",function(){
                    __jumpPage$!tableid(parseInt($("#pageNo$!tableid").val())+1);
                });
                $("#__pageLast$!tableid a").on("click",function(){
                    __jumpPage$!tableid(parseInt($("#totalPage$!tableid").val()));
                });
            }else{
                $("#__pageNext$!tableid").addClass("disabled");
                $("#__pageLast$!tableid").addClass("disabled");
                $("#__pageNext$!tableid a").off("click");
                $("#__pageLast$!tableid a").off("click");
            }
            sublime.closeLoadingbar($(".main-content"));
            return false;
        });
    }
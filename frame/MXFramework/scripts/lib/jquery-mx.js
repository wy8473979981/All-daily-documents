(function($){



// *****************************************************************
// * 属性                                                          *
// *****************************************************************
$.fn.tag = function()
{
	if ($notEmpty(this.get(0)))
	{
		var tagName = this.get(0).tagName;
	    if ($notEmpty(tagName))
	    {
	        return tagName.toLowerCase();
	    }
	}
	
	return null;
};

$.fn.setEnabled = function(p_enabled)
{
    if (typeof(p_enabled) == "undefined")
    {
        p_enabled = true;
    }
    if (typeof(p_enabled) == "boolean")
    {
        this.attr("disabled", !p_enabled);
    }
};
$.fn.enabled = $.fn.setEnabled;




// *****************************************************************
// * 事件                                                          *
// *****************************************************************
$.fn.contextmenu = function(fn)
{
    if ($isFunction(fn))
    {
        return this.bind("contextmenu", fn);
    }
    else if (fn == null)
    {
        this.trigger("contextmenu");
    }
};

$.fn.mouserepeat = function(fn)
{
    if ($isFunction(fn))
    {
        this.bind("mousedown", function(args)
        {
            var e = {target:this, type: "mouserepeat", e: args};
            fn(e);
            var timer = window.setInterval(function(){ fn(e); }, 250);
            $(this).one("mouseleave", function()
            {
                if (timer != null)
                {
                    window.clearInterval(timer);
                    timer = null;
                }
            });
            $(document).one("mouseup", function()
            {
                if (timer != null)
                {
                    window.clearInterval(timer);
                    timer = null;
                }
            });
        });
    }
};






//*****************************************************************
//* 方法                                                          *
//*****************************************************************


$.fn.centralize = function(p_horizontal, p_vertical)
{
    if (this.parent().length == 0) return;

    if (arguments.length == 1)
    {
        p_vertical = false;
    }
    if (arguments.length == 0 || arguments.length >= 2)
    {
        if (p_horizontal == null)
        {
            p_horizontal = true;
        }
        if (p_vertical == null)
        {
            p_vertical = true;
        }
    }

    if (p_horizontal || p_vertical)
    {
        this.css("position", "absolute");
    }
    
    if (p_horizontal)
    {
        var x = (this.parent().width() - this.width()) / 2;
        if (x < 0) x = 0;
        this.css("left", x);
    }

    if (p_vertical)
    {
        var y = (this.parent().height() - this.height()) / 2;
        if (y < 0) y = 0;
        this.css("top", y);
    }
};

$.fn.absolutePosition = function()
{
    var result = {top:0, left:0};
    var offsetParent = this.get(0);
    var parent = this.get(0);

    while(offsetParent != null)
    {
        if ($.browser.mozilla)
        {
              if (offsetParent.offsetTop > 0)
              {
                  result.top += offsetParent.offsetTop;
              }
              if (offsetParent.offsetLeft > 0)
              {
                  result.left += offsetParent.offsetLeft;
              }
        }
        else
        {
            result.top += offsetParent.offsetTop;  
            result.left += offsetParent.offsetLeft;
        }       
        offsetParent = offsetParent.offsetParent;
    }
    
    while (parent != null)
    {
        if (!isNaN(parent.scrollTop))
        {
            result.top -= parent.scrollTop;
            result.left -= parent.scrollLeft;

            if (!$.browser.msie)
            {
                var $parent = $(parent);
                var borderLeftWidth = parseInt($parent.css("border-left-width"));
                
                if (!isNaN(borderLeftWidth))
                {                     
                    result.left += borderLeftWidth;
                }
                var borderTopWidth = parseInt($parent.css("border-top-width"));
                if (!isNaN(borderTopWidth))
                {
                    result.top += borderTopWidth;
                }
            }           
        }
        parent = parent.parentNode;
    }
    
    return result;
};

$.fn.scrollIntoView =function()
{
    $(this).each(function(i){
        $(this).get(i).scrollIntoView();
    });
};

$.fn.popup = function(p_options, p_callback)
{
    var options = {left: 0, top: 0, offsetWidth: null, offsetHeight: null, animation:"fadeIn", speed: 0};
    var availableHeight = $(document).scrollTop() + $(window).height();
    var availableWidth = $(document).scrollLeft() +  $(window).width();
    
    if (p_options != null)
    {
        $.extend(options, p_options);   
    }           
    
    var $me = this.get(0);
    $me.style.position = "absolute";
    $me.style.zIndex = 99999999;
    $me.style.display = "none";
    
    document.body.appendChild($me);
   
    if (options.left + this.width() > availableWidth)
    {
        if (options.offsetWidth == null)
        {
            options.left = availableWidth - this.width();
        }
        else
        {
            options.left -= this.width() - options.offsetWidth; 
        }
    }   
    
    if (options.top + this.outerHeight() > availableHeight)
    {
        if (options.offsetHeight == null)
        {
            if (this.outerHeight() > availableHeight)
            {
                options.top = 0;
                options.height = availableHeight;
            }
            else
            {
                options.top -=  this.outerHeight();
                options.top = options.top < 0 ? 0: options.top;
            }
        }
        else
        {           
            options.top -= options.offsetHeight + this.outerHeight();
        }
    }

    
    
    this.css(options);
    
    this.animationShow(options, p_callback);
    
    return this;
};


$.fn.animationShow = function(p_options, p_callback)
{
    var options = {animation:"fadeIn", speed: 0};
    
    if (p_options != null)
    {
        $.extend(options, p_options);   
    }      
    
    switch (options.animation.toLowerCase())
    {
        case "none":
            this.show();
            if ($isFunction(p_callback))
            {
                p_callback();
            }
            break;
        case "show":
            this.show(options.speed, p_callback);
            break;
        case "slidedown":
            this.slideDown(options.speed, p_callback);
            break;
        default:
            this.fadeIn(options.speed, p_callback);
    }
    
    return this;
};

$.fn.animationHide = function(p_options, p_callback)
{
    var options = {animation:"fadeOut", speed: 0};
    
    if (p_options != null)
    {
        $.extend(options, p_options);   
    }      
    
    switch (options.animation.toLowerCase())
    {
        case "none":
            this.hide();
            if ($isFunction(p_callback))
            {
                p_callback();
            }
            break;
        case "hide":
            this.hide(options.speed, p_callback);
            break;
        case "slideup":
            this.slideUp(options.speed, p_callback);
            break;
        default:
            this.fadeOut(options.speed, p_callback);
    }
    
    return this;
};

$.fn.dropDown = function($p_dropDownContainer, p_options, p_callback)
{
    var options = {animation:"slideDown", speed: 0};
    
    if (p_options != null)
    {
        $.extend(options, p_options);   
    }        
  
    //var pos = this.absolutePosition();
    var pos = this.offset();
    options.left = pos.left;
    options.top = pos.top + this.outerHeight();
    if (!(navigator.userAgent.indexOf("Chrome")>0))
    {
    	options.top = pos.top + this.outerHeight() - this.parents("body").scrollTop();
    }

    options.offsetWidth = this.outerWidth();
    options.offsetHeight = this.outerHeight();
    
    $p_dropDownContainer.popup(options, p_callback);
    
    return this;
};

$.fn.movable = function(p_handleSelector)
{
    var $e = $(this);
    
    var $handle = null;
    if (p_handleSelector == null)
    {
        $handle = this;
    }
    else
    {
        $handle = $e.find(p_handleSelector);
    }
    
    $handle.css("cursor", "default");
    $handle.userSelectable(false);
    
    $handle.on("mousedown", function(e1){
        var originMousePos = { x: e1.clientX, y: e1.clientY };
        var originPos = { x: parseInt($e.css("left")), y: parseInt($e.css("top")) };
        var originUserSelectable = $(document.body).userSelectable(); 
        $(document.body).userSelectable(false);
        
        var mousemove = function(e2)
        {
            $e.css("left", originPos.x + (e2.clientX - originMousePos.x));
            $e.css("top", originPos.y + (e2.clientY - originMousePos.y));
        };
        $(document.body).on("mousemove", mousemove);
        
        $(document.body).one("mouseup", function(e2){
            $(document.body).userSelectable(originUserSelectable);
            $(document.body).off("mousemove", mousemove);
        });
    });
};

$.fn.expandable = function(p_title, p_options)
{
    var $dl = null;
    var $dt = null;
    var $dd = null;
    if (this.tag() != "dl")
    {
        $dd = this.wrapAll("<dd/>").parent();
        $dl = $dd.wrapAll("<dl/>").parent();
        $dt = $dl.prepend("<dt/>").children("dt");
    }
    else
    {
        $dl = this;
        if ($dl.children("dd").length != 0)
        {
            $dd = $dl.children("dd");
        }
        else
        {
            return;
        }

        if ($dl.children("dt").length != 0)
        {
            $dt = $dl.children("dt");
        }
        else
        {
            return;
        }
    }

    var options = {expanded:true, className:"expandable", speed:"fast"};

    if (arguments.length == 1 && typeof(p_title) == "string")
    {
        $dt.text(p_title);
    }
    else if (arguments.length == 1 && typeof(p_title) == "object")
    {
        $.extend(options, p_title);
    }
    else if (arguments.length == 2)
    {
        $dt.text(p_title);
        $.extend(options, p_options);
    }
    $dt.userSelectable(false);
    $dl.addClass(options.className);

    if (options.expanded)
    {
        $dl.addClass("expanded");
        $dd.show();
    }
    else
    {
        $dl.removeClass("expanded");
        $dd.hide();
    }

    $dt.click(function(e){
        var $dt = $(e.target);
        var $dl = $dt.parent();
        var $dd = $dl.children("dd");
        if ($dl.tag() == "dl")
        {
            if ($dl.hasClass("expanded"))
            {
                $dd.slideUp(options.speed, function(){
                    $dl.removeClass("expanded");
                });
            }
            else
            {
                $dd.slideDown(options.speed, function(){
                    $dl.addClass("expanded");
                });
            }
        }
    });

    return $dl;
};

/**
 * 设置指定的容器是否处于忙碌状态。
 * 
 * @param [p_isBusy=true] 一个 Boolean 值，表示是否需要设置为忙碌状态。
 */
$.fn.setBusy = function(p_isBusy,p_content)
{
    var busy = $isBoolean(p_isBusy) ? p_isBusy : true;
    
    if (busy)
    {
        var $mark = $("<div class='busying mx'/>");
        var $loading_msg = $("<div class='loading-msg'>")
        if (p_content == undefined)
        {
        	p_content = mx.msg("LOADING_MSG");
        	$mark.append($loading_msg.append(p_content));
        }
        else
        {
        	$mark.append($loading_msg.append(p_content));
        }
        $loading_msg.css("left",(p_content.length/2+2)*parseInt(this.css("fontSize")));
        $mark.append("<span/>");
        var height = this.height();
        var width = this.width();
        var subDivs = this.find("div");
        var index = 99999;
        if ($notEmpty(subDivs))
        {
            for (var i = 0; i < subDivs.length; i++)
            {
                var tempIndex = $(subDivs[i]).css("zIndex");
                if (tempIndex > index)
                {
                    index = tempIndex;
                }
            }
        }
        $mark.css("zIndex", index + 1);
        this.append($mark);
    }
    else
    {
        var $mark = this.children("div.busying");
        if ($notEmpty($mark))
        {
            $mark.remove();
        }
    }
};


$.fn.setCursorPosition = function(position){
    if(this.length == 0) return this;
    return $(this).setSelection(position, position);
}

$.fn.setSelection = function(selectionStart, selectionEnd) {
    if(this.length == 0) return this;
    input = this[0];

    if (input.createTextRange) {
        var range = input.createTextRange();
        range.collapse(true);
        range.moveEnd('character', selectionEnd);
        range.moveStart('character', selectionStart);
        range.select();
    } else if (input.setSelectionRange) {
        input.focus();
        input.setSelectionRange(selectionStart, selectionEnd);
    }

    return this;
}

$.fn.focusEnd = function(){
    this.setCursorPosition(this.val().length);
}



// ******************************************************************
// *  改变大小                                                                                                                                                  *
// ******************************************************************

$.fn.resizable = function(p_resizable, p_options)
{
    var target = this.eq(0);
   	target.removeClass("resizable");
    target.children("#resizableRight").remove();
    target.children("#resizableBottom").remove();
    target.children("#resizableSizeGrip").remove();
    if (!p_resizable)
    {
        return;
    }

    var options = {
        min: { width: 0, height: 0 },
        max: { width: $(document).width(), height: $(document).height() },
        resizeHorizon: true,
        resizeVertical: true,
        sizeGrip: {width:8, height:8},
        onResize: function() {},
        onStop: function() {}
    };

    $.extend(options, p_options);

    var pos = target.get(0).style.position;
    if (pos != "absolute" && pos != "relative")
    {
        target.get(0).style.position = "relative";
    }

    target.addClass("resizable");
    var resize = {
        resize:function(e)
        {
            var resizeData = e.data.resizeData;

            var width = Math.min(Math.max(e.clientX - resizeData.offLeft + resizeData.width, resizeData.min.width), options.max.width);
            var height = Math.min(Math.max(e.clientY - resizeData.offTop + resizeData.height, resizeData.min.height), options.max.height);
            if (resizeData.resizeX && resizeData.resizeHorizon) target.width(width);
            if (resizeData.resizeY && resizeData.resizeVertical) target.height(height);

            resizeData.onResize(e);
        },
        stop:function(e)
        {
            e.data.resizeData.onStop(e);
            $(document.body).userSelectable(true);
            target.userSelectable(true);
            target.find("div#__tempMark").remove();
            $(document).unbind("mousemove", resize.resize);
        },
        mousedown:function(e)
        {
            var resizeData = {
                width: target.width(),
                height: target.height(),
                offLeft: e.clientX,
                offTop: e.clientY,
                min: options.min,
                max: options.max,
                resizeHorizon: options.resizeHorizon,
                resizeVertical: options.resizeVertical,
                onResize: options.onResize,
                onStop: options.onStop,
                resizeX: e.data.resizeX,
                resizeY: e.data.resizeY
            };
            e.stopPropagation();
            $(document.body).userSelectable(false);
            target.userSelectable(false);
            var _tempMark = $("<div id='__tempMark' style='width:100%;height:100%;position:absolute;top:0;left:0;'/>");
            target.append(_tempMark);
            $(document).bind("mousemove", { resizeData:resizeData }, resize.resize);
            $(document).one("mouseup", { resizeData:resizeData }, resize.stop);
        }
    };

    var $rightDiv = null, $bottomDiv = null, $rbDiv = null;
    
    //增加border样式，在IE7下没有border属性，将导致左、右、NW方向大小缩放操作无法获取操作点
    if (options.resizeHorizon)
    {
        if ($.browser.msie)
        {
            $rightDiv = $("<div id='resizableRight' style='border:solid 1px transparent;position:absolute; bottom:0; top:0; right:0; width:2px;_height:100%; z-index:9999; background-color:transparent; filter:alpha(opacity=0); cursor:e-resize;'/>");
        }
        else
        {
            $rightDiv = $("<div id='resizableRight' style='border:solid 1px transparent;position:absolute; bottom:0; top:0; right:0; width:2px; z-index:9999; cursor:e-resize;'/>");
        }

        target.append($rightDiv);
        $rightDiv.bind("mousedown", { resizeX: true, resizeY: false }, resize.mousedown);
    }

    if (options.resizeVertical)
    {
        if ($.browser.msie)
        {
            $bottomDiv = $("<div id='resizableBottom' style='border:solid 1px transparent;position:absolute; bottom:0; left:0; right:0; height:2px;_width:100%; z-index:9999; background-color:transparent; filter:alpha(opacity=0); cursor:n-resize;'/>");
        }
        else
        {
            $bottomDiv = $("<div id='resizableBottom' style='border:solid 1px transparent;position:absolute; bottom:0; left:0; right:0; height:2px; z-index:9999; cursor:n-resize;'/>");
        }

        target.append($bottomDiv);
        $bottomDiv.bind("mousedown", { resizeX: false, resizeY: true }, resize.mousedown);
    }

    if (options.resizeHorizon || options.resizeVertical)
    {
    	/*IE7下会导致在容器空间足够的情况下仍然有滚动条出现,需要将小缩放方块位置上移*/
    	var bottom = $.isIE67() ? "5px" : "0px";
    	    	
        $rbDiv = $("<div id='resizableSizeGrip' style='border:solid 1px transparent;position:absolute; bottom:" + bottom + "; right:0; z-index:9999; cursor:nw-resize;'/>");

        if($.isIE67())
        	$rbDiv.css("filter","alpha(opacity=0)");
        
        $rbDiv.width(options.sizeGrip.width + 3);
        $rbDiv.height(options.sizeGrip.height + 3);
        target.append($rbDiv);
        
        if ($rightDiv != null)
        {
            $rightDiv.css("bottom", (options.sizeGrip.height + 1) + "px");
        }
        if ($bottomDiv != null)
        {
            $bottomDiv.css("right", (options.sizeGrip.width + 1) + "px");
        }

        $rbDiv.bind("mousedown", { resizeX: true, resizeY: true }, resize.mousedown);
    }
    return this;
};




 // ******************************************************************
 // * 高级 CSS 效果                                                  *
 // ******************************************************************

 $.fn.opacity = function(p_opacity)
 {
     var opacity = 0.5;
     if (p_opacity != null)
     {
         opacity = p_opacity;
     }
     if ($.browser.msie && parseInt($.browser.version) <= 8)
     {
         this.css("filter", "progid:DXImageTransform.Microsoft.BasicImage(opacity=" + opacity + ")")
     }
     else
     {
         this.css("opacity", opacity);
         this.css("webkitOpacity", opacity);
         this.css("MozOpacity", opacity);
     }
     return this;
 };

 $.fn.gradient = function(p_options)
 {
     var options = {
         startColor: "",
         endColor: "",
         direction: "vertical"
     };

     if (p_options)
     {
         $.extend(options, p_options);
     }

     if ($.browser.msie)
     {
         this.css("filter", "progid:DXImageTransform.Microsoft.Gradient(Enabled=true,startColorStr=" + options.startColor + ",endColorStr=" + options.endColor + ",gradientType=" + (options.direction == "vertical" ? 0 : 1) + ")");
     }
     else if ($.browser.mozilla)
     {
         if (options.direction == "vertical")
         {
             this.css("background", "-moz-linear-gradient(-90deg, " + options.startColor + ", " + options.endColor + ")");
         }
         else if (options.direction == "horizontal")
         {
             this.css("background", "-moz-linear-gradient(0, " + options.startColor + ", " + options.endColor + ")");
         }
     }
     else if ($.browser.safari)
     {
         if (options.direction == "vertical")
         {
             this.css("background", "-webkit-gradient(linear,0% 0%, 0% 100%, from(" + options.startColor + "), to(" + options.endColor + "))");
         }
         else if (options.direction == "horizontal")
         {
             this.css("background", "-webkit-gradient(linear,0% 0%, 100% 0%, from(" + options.startColor + "), to(" + options.endColor + "))");
         }
     }

     return this;
 };

 $.fn.borderRadius = function(p_options)
 {
     if ($.browser.msie && parseInt($.browser.version) <= 8)
     {
         return this;
     }
     this.css("webkitBackgroundClip", "padding-box");

     var options = {
         topLeft: 0,
         topRight: 0,
         bottomLeft: 0,
         bottomRight: 0
     };

     if (p_options == null)
     {

     }
     else if (typeof(p_options) == "object")
     {
         $.extend(options, p_options);
     }
     else if (typeof(p_options) == "number")
     {
         options.topLeft = p_options;
         options.bottomLeft = p_options;
         options.topRight = p_options;
         options.bottomRight = p_options;
     }
     else if (typeof(p_options) == "string")
     {
         this.css("MozBorderRadius", p_options);
         this.css("borderRadius", p_options);
         this.css("webkitBorderRadius", p_options);
         return this;
     }

     var borderRadius = options.topLeft + "px " + options.topRight + "px " + options.bottomRight + "px " + options.bottomLeft + "px";
     this.css("borderRadius", borderRadius);
     this.css("MozBorderRadius", borderRadius);
     this.css("webkitBorderRadius", borderRadius);

     return this;
 };

 $.fn.boxShadow = function(p_options)
 {
     var options = {
         style: "",
         left:  0,
         top:   0,
         size:  0,
         color: "rgba(0,0,0,0.5)"
     };

     if (p_options)
     {
         $.extend(options, p_options);
     }

     if ($.browser.msie && parseInt($.browser.version) <= 8)
     {

     }
     else
     {
         var boxShadow = options.style + " " + options.left + "px " + options.top + "px " + options.size + "px " + options.color;
         this.css("boxShadow", boxShadow);
         this.css("webkitBoxShadow", boxShadow);
         this.css("MozBoxShadow", boxShadow);
     }
     return this;
 };
 
 $.fn.boxSizing = function(p_boxSizing)
 {
     this.css("boxSizing", p_boxSizing);
     return this;
 };

 $.fn.textShadow = function(p_options)
 {
     if ($.browser.msie && parseInt($.browser.version) <= 8)
     {
         return this;
     }

     var options = {
             left:  0,
             top:   0,
             color: "black"
         };

     if (p_options)
     {
         $.extend(options, p_options);
     }

     var textShadow = options.left + "px " + options.top + "px " + options.color;
     this.css("textShadow", textShadow);

     return this;
 };

 $.fn.userSelectable = function(p_selectable)
 {
     if (p_selectable == null)
     {
         _selectable = true;
     }



     if (!p_selectable)
     {
         if ($.browser.mozilla)
         {
             this.css("MozUserSelect", "-moz-none");
         }
         else
         {
             this.bind("selectstart", function(e){
             	if (e.target.tagName != "TEXTAREA" &&  e.target.tagName != "INPUT" )
             	{
             		return false; 
             	}
             });
             this.css("-webkit-user-select", "none");
         }
     }
     else
     {
         if ($.browser.mozilla)
         {
             this.css("MozUserSelect", "");
         }
         else
         {
             this.unbind("selectstart");
             this.css("-webkit-user-select", "");
         }
     }

     return this;
 };
 
 
 $.fn.rotate = function(angle,whence) {
     var p = this.get(0);

     // we store the angle inside the image tag for persistence
     if (!whence) {
         p.angle = ((p.angle==undefined?0:p.angle) + angle) % 360;
     } else {
         p.angle = angle;
     }
     
     var rotation = 0;
     if (p.angle >= 0) {
          rotation = Math.PI * p.angle / 180;
     } else {
          rotation = Math.PI * (360+p.angle) / 180;
     }
     var costheta = Math.round(Math.cos(rotation) * 1000) / 1000;
     var sintheta = Math.round(Math.sin(rotation) * 1000) / 1000;
     //alert(costheta+","+sintheta);
  
     if (document.all && !window.opera) {
         var canvas = document.createElement('img');

         canvas.src = p.src;
         canvas.height = p.height;
         canvas.width = p.width;

         canvas.style.filter = "progid:DXImageTransform.Microsoft.Matrix(M11="+costheta+",M12="+(-sintheta)+",M21="+sintheta+",M22="+costheta+",SizingMethod='auto expand')";
     } else {
         var canvas = document.createElement('canvas');
         if (!p.oImage) {
             canvas.oImage = new Image();
             canvas.oImage.src = p.src;
         } else {
             canvas.oImage = p.oImage;
         }

         canvas.style.width = canvas.width = Math.abs(costheta*canvas.oImage.width) + Math.abs(sintheta*canvas.oImage.height);
         canvas.style.height = canvas.height = Math.abs(costheta*canvas.oImage.height) + Math.abs(sintheta*canvas.oImage.width);

         var context = canvas.getContext('2d');
         context.save();
         if (rotation <= Math.PI/2) {
             context.translate(sintheta*canvas.oImage.height,0);
         } else if (rotation <= Math.PI) {
             context.translate(canvas.width,-costheta*canvas.oImage.height);
         } else if (rotation <= 1.5*Math.PI) {
             context.translate(-costheta*canvas.oImage.width,canvas.height);
         } else {
             context.translate(0,-sintheta*canvas.oImage.width);
         }
         context.rotate(rotation);
         context.drawImage(canvas.oImage, 0, 0, canvas.oImage.width, canvas.oImage.height);
         context.restore();
     }
     canvas.id = p.id;
     canvas.angle = p.angle;
     if (p.canvas != undefined)
     {
         p.canvas.parentNode.replaceChild(canvas, p.canvas);
         p.canvas = canvas;
     }
     else
     {
         p.parentNode.replaceChild(canvas, p);
         p.canvas = canvas;
     }
 };
 
 $.fn.rotateTo = function(angle,whence) {
     var p = this.get(0);
     p.angle = angle;
     
     var rotation = 0;
     if (p.angle >= 0) {
          rotation = Math.PI * p.angle / 180;
     } else {
          rotation = Math.PI * (360+p.angle) / 180;
     }
     var costheta = Math.round(Math.cos(rotation) * 1000) / 1000;
     var sintheta = Math.round(Math.sin(rotation) * 1000) / 1000;
  
     if (document.all && !window.opera) {
         var canvas = document.createElement('img');

         canvas.src = p.src;
         canvas.height = p.height;
         canvas.width = p.width;

         canvas.style.filter = "progid:DXImageTransform.Microsoft.Matrix(M11="+costheta+",M12="+(-sintheta)+",M21="+sintheta+",M22="+costheta+",SizingMethod='auto expand')";
     } else {
         var canvas = document.createElement('canvas');
         if (!p.oImage) {
             canvas.oImage = new Image();
             canvas.oImage.src = p.src;
         } else {
             canvas.oImage = p.oImage;
         }

         canvas.style.width = canvas.width = Math.abs(costheta*canvas.oImage.width) + Math.abs(sintheta*canvas.oImage.height);
         canvas.style.height = canvas.height = Math.abs(costheta*canvas.oImage.height) + Math.abs(sintheta*canvas.oImage.width);

         var context = canvas.getContext('2d');
         context.save();
         if (rotation <= Math.PI/2) {
             context.translate(sintheta*canvas.oImage.height,0);
         } else if (rotation <= Math.PI) {
             context.translate(canvas.width,-costheta*canvas.oImage.height);
         } else if (rotation <= 1.5*Math.PI) {
             context.translate(-costheta*canvas.oImage.width,canvas.height);
         } else {
             context.translate(0,-sintheta*canvas.oImage.width);
         }
         context.rotate(rotation);
         context.drawImage(canvas.oImage, 0, 0, canvas.oImage.width, canvas.oImage.height);
         context.restore();
     }
     canvas.id = p.id;
     canvas.angle = p.angle;
     if (p.canvas != undefined)
     {
         p.canvas.parentNode.replaceChild(canvas, p.canvas);
         p.canvas = canvas;
     }
     else
     {
         p.parentNode.replaceChild(canvas, p);
         p.canvas = canvas;
     }
 };

 $.fn.rotateRight = function(angle) {
     this.rotate(angle==undefined?90:angle);
 };

 $.fn.rotateLeft = function(angle) {
     this.rotate(angle==undefined?-90:-angle);
 };
 
 

 })(jQuery);














(function($) {

// jQuery on an empty object, we are going to use this as our Queue
var ajaxQueue = $({});

$.ajaxQueue = function( ajaxOpts ) {
    var jqXHR,
        dfd = $.Deferred(),
        promise = dfd.promise();

    // run the actual query
    function doRequest( next ) {
        jqXHR = $.ajax( ajaxOpts )
            .done( dfd.resolve )
            .fail( dfd.reject )
            .then( next, next );
    }

    // queue our ajax request
    ajaxQueue.queue( doRequest );

    // add the abort method
    promise.abort = function( statusText ) {

        // proxy abort to the jqXHR if it is active
        if ( jqXHR ) {
            return jqXHR.abort( statusText );
        }

        // if there wasn't already a jqXHR we need to remove from queue
        var queue = ajaxQueue.queue(),
            index = $.inArray( doRequest, queue );

        if ( index > -1 ) {
            queue.splice( index, 1 );
        }

        // and then reject the deferred
        dfd.rejectWith( ajaxOpts.context || ajaxOpts, [ promise, statusText, "" ] );
        return promise;
    };

    return promise;
};

})(jQuery);






//******************************************************************
//* 选择区域                                                       *
//******************************************************************

(function() {

 var fieldSelection = {

     getSelection: function() {

         var e = this.jquery ? this[0] : this;

         return (

             /* mozilla / dom 3.0 */
             ('selectionStart' in e && function() {
                 var l = e.selectionEnd - e.selectionStart;
                 return { start: e.selectionStart, end: e.selectionEnd, length: l, text: e.value.substr(e.selectionStart, l) };
             }) ||

             /* exploder */
             (document.selection && function() {

                 e.focus();

                 var r = document.selection.createRange();
                 if (r == null) {
                     return { start: 0, end: e.value.length, length: 0 }
                 }

                 var re = e.createTextRange();
                 var rc = re.duplicate();
                 re.moveToBookmark(r.getBookmark());
                 rc.setEndPoint('EndToStart', re);

                 return { start: rc.text.length, end: rc.text.length + r.text.length, length: r.text.length, text: r.text };
             }) ||

             /* browser not supported */
             function() {
                 return { start: 0, end: e.value.length, length: 0 };
             }

         )();

     },

     replaceSelection: function() {

         var e = this.jquery ? this[0] : this;
         var text = arguments[0] || '';

         return (

             /* mozilla / dom 3.0 */
             ('selectionStart' in e && function() {
                 e.value = e.value.substr(0, e.selectionStart) + text + e.value.substr(e.selectionEnd, e.value.length);
                 return this;
             }) ||

             /* exploder */
             (document.selection && function() {
                 e.focus();
                 document.selection.createRange().text = text;
                 return this;
             }) ||

             /* browser not supported */
             function() {
                 e.value += text;
                 return this;
             }

         )();

     }

 };

 jQuery.each(fieldSelection, function(i) { jQuery.fn[i] = this; });

})();








//******************************************************************
//*文本选择插件                                                                                                                                             *
//******************************************************************
$.fn.selection = function(start, end) {
	if (start !== undefined) {
		return this.each(function() {
			if( this.createTextRange ){
				var selRange = this.createTextRange();
				if (end === undefined || start == end) {
					selRange.move("character", start);
					selRange.select();
				} else {
					selRange.collapse(true);
					selRange.moveStart("character", start);
					selRange.moveEnd("character", end);
					selRange.select();
				}
			} else if( this.setSelectionRange ){
				this.setSelectionRange(start, end);
			} else if( this.selectionStart ){
				this.selectionStart = start;
				this.selectionEnd = end;
			}
		});
	}
	var field = this[0];
	if ( field.createTextRange ) {
		var range = document.selection.createRange(),
			orig = field.value,
			teststring = "<->",
			textLength = range.text.length;
		range.text = teststring;
		var caretAt = field.value.indexOf(teststring);
		field.value = orig;
		this.selection(caretAt, caretAt + textLength);
		return {
			start: caretAt,
			end: caretAt + textLength
		}
	} else if( field.selectionStart !== undefined ){
		return {
			start: field.selectionStart,
			end: field.selectionEnd
		}
	}
};






//******************************************************************
//* AJAX                                                           *
//******************************************************************

jQuery.extend({
    getSync: function( url, data, type) {
        if ( jQuery.isFunction( data ) ) {
            type = type || callback;
            callback = data;
            data = null;
        }

        var result = null;
        var req = jQuery.ajax({
            async: false,
            type: "GET",
            url: url,
            data: data,
            dataType: type,
            success: function(p_result) { result = p_result; }
        });
        return result;
    },


    getJSONSync: function( url, data) {
        return jQuery.getSync(url, data, "json");
    },
    
    
    postSync: function( url, data, type) {
        if ( jQuery.isFunction( data ) ) {
            type = type || callback;
            callback = data;
            data = {};
        }

        var result = null;
        var req = jQuery.ajax({
            async: false,
            type: "POST",
            url: url,
            data: data,
            dataType: type,
            success: function(p_result) { result = p_result; }
        });
        return result;
    }
});



//******************************************************************
//* 提示框插件                                                     *
//******************************************************************
(function($){
	$.fn.toolTip = function(options) {
		if (typeof options == "string")
		{
			var args = arguments, 
				method = options;
			Array.prototype.shift.call(args);
			return this.each(function() {
				var toolTip = $(this).data('toolTip');
				if (toolTip && toolTip[method])
					toolTip[method].apply(toolTip, args);
			});
		}
		
		//属性设置
		var defaults = { 
			activation: "hover",
			keepAlive: false,
			maxWidth: "200px",
			edgeOffset: 3,
			defaultPosition: "bottom",
			delay: 400,
			fadeIn: 200,
			fadeOut: 200,
			disabled: false,
			attribute: "title",
			content: false, // html标签和字符串
		  	enter: function(){},
		  	exit: function(){}
	  	};
	 	
	 	var opts = $.extend(defaults, options);
		
		$.toolTip = function(p_elem, p_opt)
		{
			this.opts = p_opt;
			this.org_elem = $(p_elem);
			this.org_elem.data("toolTip", this);
			
			//创建ToolTip DOM元素，并将其渲染到页面中
			if($("#toolTip_holder").length <= 0)
			{
				this.toolTip_holder = $('<div id="toolTip_holder" class="mx" style="max-width:'+ opts.maxWidth +';word-break:break-all"></div>');
				this.toolTip_content = $('<div id="toolTip_content"></div>');
				this.toolTip_arrow = $('<div id="toolTip_arrow"></div>');
				$("body").append(this.toolTip_holder.html(this.toolTip_content).prepend(this.toolTip_arrow.html('<div id="toolTip_arrow_inner"></div>')));
			} 
			else 
			{
				this.toolTip_holder = $("#toolTip_holder");
				this.toolTip_content = $("#toolTip_content");
				this.toolTip_arrow = $("#toolTip_arrow");
			}
			
			this.toolTip_holder.data("toolTip", this);
			
			if (this.opts.content)
			{
				this.org_title = this.opts.content;
			}
			else 
			{
				this.org_title = this.org_elem.attr(this.opts.attribute);
			}
			this.timeout = false;
			this.init();
		};
		
		$.toolTip.prototype = {
			init: function()
			{
				
				if (this.org_title != "")
				{
					if (!this.opts.content)
					{
						this.org_elem.removeAttr(this.opts.attribute); //remove original Attribute
					}
					
					if (this.opts.activation == "hover")
					{
						this.org_elem.bind("mouseover.toolTip", function(){
							$(this).data("toolTip").show();
						});
						
						this.org_elem.bind("mouseout.toolTip", function(){
							if (!$(this).data("toolTip").opts.keepAlive)
								{
									$(this).data("toolTip").hide();
								}
						});
					} 
					else if (this.opts.activation == "focus")
					{	
						this.org_elem.bind("focus.toolTip", function(){
							$(this).data("toolTip").show();
						});
						
						this.org_elem.bind("blur.toolTip", function(){
							$(this).data("toolTip").hide();
						});
					} 
					else if (this.opts.activation == "click")
					{
						this.org_elem.bind("click.toolTip", function(){
							$(this).data("toolTip").show();
							return false;
						});
						
						this.org_elem.bind("mouseout.toolTip", function(){
							if(!$(this).data("toolTip").opts.keepAlive){
								$(this).data("toolTip").hide();
							}
						});
						
						if (this.opts.keepAlive)
						{
							this.toolTip_holder.bind("mouseout.toolTip", function(){
								$(this).data("toolTip").hide();
							});
						}
					}
				}
			},
			show: function()
			{
				function HTMLEncode(p_str){
					if(!p_str)
						return "";
					p_str = p_str + "";
					var s = "";  
			        s = p_str.replace(/</g, "&lt;");  
			        s = s.replace(/>/g, "&gt;");  
			        s = s.replace(/ /g, "&nbsp;");  
			        s = s.replace(/\'/g, "'");  
			        s = s.replace(/\"/g, "&quot;");  
			        s = s.replace(/\n/g, "<br/>");  
			        return s;  
				}
				if (this.opts.disabled)
					return true;
				this.opts.enter.call(this.org_elem);
				var tmp_tip_h = this.toolTip_holder.outerHeight();
				this.toolTip_content.html(HTMLEncode(this.org_title));
				var tip_w = this.toolTip_holder.outerWidth();
				var tip_h = this.toolTip_holder.outerHeight();
				this.toolTip_holder.hide().removeAttr("class").css("margin","0");
				this.toolTip_arrow.removeAttr("style");
				
				var top = parseInt(this.org_elem.offset()['top']);
				var left = parseInt(this.org_elem.offset()['left']);
				var org_width = parseInt(this.org_elem.outerWidth());
				var org_height = parseInt(this.org_elem.outerHeight());
				
				if (this.opts.isCellTip != undefined && this.opts.isCellTip) 
					tip_h = tmp_tip_h;
				var w_compare = Math.round((org_width - tip_w) / 2);
				var h_compare = Math.round((org_height - tip_h) / 2);
				var marg_left = Math.round(left + w_compare);
				var marg_top = Math.round(top + org_height + this.opts.edgeOffset);
				var t_class = "";
				var arrow_top = "";
				var arrow_left = Math.round(tip_w - 12) / 2;

				if(opts.defaultPosition == "bottom"){
					t_class = "_bottom";
				} else if(this.opts.defaultPosition == "top"){ 
					t_class = "_top";
				} else if(this.opts.defaultPosition == "left"){
					t_class = "_left";
				} else if(this.opts.defaultPosition == "right"){
					t_class = "_right";
				}
				
				var right_compare = (w_compare + left) < parseInt($(window).scrollLeft());
				var left_compare = (tip_w + left) > parseInt($(window).width());
				
				if((right_compare && w_compare < 0) || (t_class == "_right" && !left_compare) || (t_class == "_left" && left < (tip_w + this.opts.edgeOffset + 5))){
					t_class = "_right";
					arrow_top = Math.round(tip_h - 13) / 2;
					arrow_left = -12;
					marg_left = Math.round(left + org_width + this.opts.edgeOffset);
					marg_top = Math.round(top + h_compare);
				} else if((left_compare && w_compare < 0) || (t_class == "_left" && !right_compare)){
					t_class = "_left";
					arrow_top = Math.round(tip_h - 13) / 2;
					
					if ($.browser.msie){
						arrow_left =  Math.round(tip_w)+8;
						marg_left = Math.round(left - (tip_w + this.opts.edgeOffset + 19));
					}else{
						arrow_left =  Math.round(tip_w - 10);
						marg_left = Math.round(left - (tip_w + this.opts.edgeOffset + 12));
					}
					
					marg_top = Math.round(top + h_compare);
				}

				var top_compare = (top + org_height + this.opts.edgeOffset + tip_h + 8) > parseInt($(window).height() + $(window).scrollTop());
				var bottom_compare = ((top + org_height) - (this.opts.edgeOffset + tip_h + 8)) < 0;
				
				if(top_compare || (t_class == "_bottom" && top_compare) || (t_class == "_top" && !bottom_compare)){
					if(t_class == "_top" || t_class == "_bottom"){
						t_class = "_top";
					} else {
						t_class = t_class+"_top";
					}
					
					if ($.browser.msie){
						arrow_top = tip_h+5;
						marg_top = Math.round(top - (tip_h + 12 + this.opts.edgeOffset));
						marg_left = marg_left - 10;
						arrow_left = arrow_left + 6;
					}else{
						if(tip_h < 50){
							arrow_top = tip_h-3;
							marg_top = Math.round(top - (tip_h + 8 ));
						}else{
							arrow_top = tip_h;
							marg_top = Math.round(top - (tip_h + 15 ));
						}
					}
					
				} else if(bottom_compare | (t_class == "_top" && bottom_compare) || (t_class == "_bottom" && !top_compare)){
					if(t_class == "_top" || t_class == "_bottom"){
						t_class = "_bottom";
					} else {
						t_class = t_class+"_bottom";
					}
					arrow_top = -12;						
					marg_top = Math.round(top + org_height + this.opts.edgeOffset);
				}
			
				if(t_class == "_right_top" || t_class == "_left_top"){
					marg_top = marg_top + 5;
				} else if(t_class == "_right_bottom" || t_class == "_left_bottom"){		
					marg_top = marg_top - 5;
				}
				if(t_class == "_left_top" || t_class == "_left_bottom"){	
					marg_left = marg_left + 5;
				}
				if (this.opts.isCellTip != undefined && this.opts.isCellTip) 
				{
					if(marg_top < 0 )
						marg_top = 0;
					if (marg_left < 0)
						marg_left = 0;
				}
				this.toolTip_arrow.css({"margin-left": arrow_left+"px", "margin-top": arrow_top+"px"});
				this.toolTip_holder.css({"margin-left": marg_left+"px", "margin-top": marg_top+"px"}).attr("class","tip"+t_class).addClass("mx");
				this.toolTip_holder.stop(true,true).fadeIn(this.opts.fadeIn);
			},
			display: function()
			{
                this.toolTip_holder.stop(true,true).fadeIn(this.opts.fadeIn);
			},
			hide: function()
			{
				if (this.opts.disabled)
						return true;
				this.toolTip_holder.fadeOut(opts.fadeOut);
				this.opts.exit.call(this.org_elem);
			},
			disable: function() 
			{
				this.opts.disabled = true;
			},
			enable: function() 
			{
				this.opts.disabled = false;
			},
			update: function(p_content)
			{
				if (this.opts.disabled)
					return true;
				if (p_content)
				{
					this.opts.content = p_content;
					this.org_title = p_content;
					this.show();
				}
			},
			destroy: function()
			{
				this.toolTip_holder.remove();
				delete this.toolTip_holder;
				this.org_title = null;
				this.timeout = null;
				this.opts = null;
				this.org_elem.removeData("toolTip");
				this.org_elem.unbind(".toolTip");
			},
			remove:function(){
				this.org_elem.removeData("toolTip");
				this.org_elem.unbind(".toolTip");
			}
		};
			
			
		return this.each(function(){
			new $.toolTip(this, opts);
		});
	};
})(jQuery); 


//******************************************************************
// div,span等控件resize监听事件 
//******************************************************************
(function($, h, c)
        {
            var a = $([]), e = $.resize = $.extend($.resize, {}), i, k = "setTimeout", j = "resize", d = j
                    + "-special-event", b = "delay", f = "throttleWindow";
            e[b] = 250;
            e[f] = true;
            $.event.special[j] =
            {
                setup : function()
                {
                    if (!e[f] && this[k])
                    {
                        return false
                    }
                    var l = $(this);
                    a = a.add(l);
                    $.data(this, d,
                    {
                        w : l.width(),
                        h : l.height()
                    });
                    if (a.length === 1)
                    {
                        g()
                    }
                },
                teardown : function()
                {
                    if (!e[f] && this[k])
                    {
                        return false
                    }
                    var l = $(this);
                    a = a.not(l);
					delete a.prevObject;
                    l.removeData(d);
					
                    if (!a.length)
                    {
                        clearTimeout(i)
                    }
                },
                add : function(l)
                {
                    if (!e[f] && this[k])
                    {
                        return false
                    }
                    var n;
                    function m(s, o, p)
                    {
                        var q = $(this), r = $.data(this, d);
                        r.w = o !== c ? o : q.width();
                        r.h = p !== c ? p : q.height();
                        n.apply(this, arguments)
                    }
                    if ($.isFunction(l))
                    {
                        n = l;
                        return m
                    }
                    else
                    {
                        n = l.handler;
                        l.handler = m
                    }
                }
            };
            function g()
            {
                i = h[k](function()
                {
					var _beak=false;
                    a.each(function()
                    {
                        var n = $(this), m = n.width(), l = n.height(), o = $.data(
                                this, d);
					    try{
							if(this != window && this != document && n.parent().length==0){								
								n.context=null;
								delete n.context;
								n=null;
								_beak=true;
								return false;
							}
							if (m !== o.w || l !== o.h)
							{
								n.trigger(j,
								[ o.w = m, o.h = l ])
							}
						}catch(e){
							
						}
                    });
					if(!_beak){
						g();
					}                  
                }, e[b])
            }
        })(jQuery, this);
//******************************************************************
//判断浏览器是不是IE67
//******************************************************************
(function($){
   $.isIE67 = function(){
         if( $.browser.msie && ($.browser.version == "6.0" || $.browser.version == "7.0") && (!document.documentMode || (document.documentMode && document.documentMode < 8))){
             return true;
         }else{
             return false;
         }
   };
   
   $.isIE6 = function(){
        if($.browser.msie && $.browser.version == "6.0"){
        	 return true;
        }else{
             return false;
        }
   };
})(jQuery);



(function($){
    
    var options = {
        step: 20
    };
    
    var methods = {
        "upButton": function(){
            return $(this).find("div.upbutton");
        },
        "downButton": function(){
            return $(this).find("div.downbutton");
        },
        "init": function(){
            return this.each(function(){
                init($(this));            
            });
        }
    };
    
    function init($target)
    {    
        var timer = null;
        
        var $upButton = $("<div class='upbutton'/>").css({
            position: "absolute",
            width: "100%",
            height: 10,
            top: 0,
            zIndex: 9999,
            display: "none",
            backgroundImage: "url(" + mx.mappath("$theme/images/dockpage_top_hidebutton.png") + ")",
            backgroundRepeat: "no-repeat",
            backgroundPositionX: "center",
            backgroundPositionY: "top"
        });
        var $downButton = $("<div class='downbutton'/>").css({
            position: "absolute",
            width: "100%",
            zIndex: 9999,
            height: 10,
            bottom: 0,
            display: "none",
            backgroundImage: "url(" + mx.mappath("$theme/images/dockpage_top_showbutton.png") + ")",
            backgroundRepeat: "no-repeat",
            backgroundPositionX: "center",
            backgroundPositionY: "bottom"
        });
        
       
        $target.css({
            "overflow": "hidden"
        });
        
        $target.mouseenter(_target_mouseenter);
        $target.mouseleave(_target_mouseleave);
//        $upButton.mousedown(_upButton_mousedown);
//        $upButton.mouseup(_upButton_mouseup);
//        $downButton.mouseup(_downButton_mouseup);
//        $downButton.mousedown(_downButton_mousedown);
        $target.append($upButton);
        $target.append($downButton);
        
        
	    function _target_mouseenter(e)
	    {
	        var $target = $upButton.parent(),
	            scrollHeight = $target.prop("scrollHeight"), height = $target.outerHeight(),
                scrollTop = $target.scrollTop();

            $upButton.css("top", scrollTop);
            $downButton.css("bottom", -scrollTop);
            
	        if (scrollHeight > height)
	        {
	            $upButton.show();
	            $downButton.show();
	        }
            $upButton.mousedown(_upButton_mousedown);
	        $upButton.mouseup(_upButton_mouseup);
	        $downButton.mouseup(_downButton_mouseup);
	        $downButton.mousedown(_downButton_mousedown);
	    }
	    
	    function _target_mouseleave(e)
	    {
            window.clearInterval(timer);
            $upButton.off("mousedown", _upButton_mousedown);
            $upButton.off("mouseup", _upButton_mouseup);
            $downButton.off("mouseup", _downButton_mouseup);
            $downButton.off("mousedown", _downButton_mousedown);
            
	        $upButton.hide();
	        $downButton.hide();
	    }
	    
	    function _upButton_mousedown(e)
	    {
	        timer = window.setInterval(_upButton_refresh, 100);
	    }
	    
	    function _upButton_mouseup(e)
	    {
	        window.clearInterval(timer);
	    }
	    
	    function _upButton_refresh()
	    {
	        var top = parseInt($upButton.css("top")),
	            bottom = parseInt($downButton.css("bottom")),
	            $target = $upButton.parent(), 
	            scrollTop = $target.scrollTop(), 
	            step = options.step;
	        
	        if (scrollTop > 0)
	        {
	            $upButton.css("top", top - step);
		        $downButton.css("bottom",bottom + step);
		        $target.scrollTop(scrollTop - step);
	        }
	    }
	    
	    function _downButton_mousedown(e)
	    {
	        timer = window.setInterval(_downButton_refresh, 100);
	    }
	    
	    function _downButton_mouseup(e)
	    {
	        window.clearInterval(timer);
	    }
	    
	    function _downButton_refresh()
	    {
	        var bottom = parseInt($downButton.css("bottom")),
	            top =  parseInt($upButton.css("top")),
	            $target =$downButton.parent(),
	            scrollTop = $target.scrollTop(), 
	            height = $target.outerHeight(),
	            scrollHeight = $target.prop("scrollHeight"),
	            step = options.step;
	        if (scrollTop + height < scrollHeight)
	        {
	            $downButton.css("bottom", bottom - step);
		        $upButton.css("top", top + step);
		
		        $target.scrollTop(scrollTop + step);   
	        }
	    }
    }
    
    
    $.fn.menuSilde = function(p_options)
    {
        var method;
        if ($.isPlainObject(p_options) || !p_options)
        {
             $.extend(options, p_options);
             method = methods["init"];
        }
        else if ($isString(p_options) && methods[p_options])
        {
            method = methods[p_options];
        }
        
        if (method)
        {
            return method.call(this);
        }
       
    }
    
    //获取元素的纵坐标 
    $.fn.getTop = function(e){ 
	    var offset=e.offsetTop; 
	    if(e.offsetParent!=null) offset+=$(this).getTop(e.offsetParent); 
	    return offset; 
    }
    
    //获取元素的横坐标 
    $.fn.getLeft = function(e){ 
	    var offset=e.offsetLeft; 
	    if(e.offsetParent!=null) offset+=$(this).getLeft(e.offsetParent); 
	    return offset; 
    }
    
    // 获取元素距离浏览器周边的位置
    $.fn.getRect = function ( elements ){ 
	    var rect = elements.getBoundingClientRect(); 
	    var clientTop = document.documentElement.clientTop; 
	    var clientLeft = document.documentElement.clientLeft; 
	    return {												// 兼容ie多出的两个px 
		    top : rect.top - clientTop, 						// 距离顶部的位置 
		    bottom : rect.bottom - clientTop, 					// 距离顶部加上元素本身的高度就等于bottom的位置 
		    left : rect.left - clientLeft, 						// 距离左边的位置 
		    right : rect.right - clientLeft 					// 距离右边的位置就是 距离左边的位置加上元素本身的宽度 
	    }; 
    };
}) (jQuery)    
(function($) {
    //==============
    // jQuery Plugin
    //==============
    $.cleditor = {
        // Define the defaults used for all new cleditor instances
        defaultOptions: {
            width: 500, // width not including margins, borders or padding
            height: 250, // height not including margins, borders or padding
            controls: // controls to add to the toolbar
                "bold italic underline strikethrough subscript superscript | font size " +
                "style | color highlight removeformat | bullets numbering | outdent " +
                "indent | alignleft center alignright justify | undo redo | " +
                "rule image link unlink | cut copy paste pastetext | print source",
            colors: // colors in the color popup
                "FFF FCC FC9 FF9 FFC 9F9 9FF CFF CCF FCF " +
                "CCC F66 F96 FF6 FF3 6F9 3FF 6FF 99F F9F " +
                "BBB F00 F90 FC6 FF0 3F3 6CC 3CF 66C C6C " +
                "999 C00 F60 FC3 FC0 3C0 0CC 36F 63F C3C " +
                "666 900 C60 C93 990 090 399 33F 60C 939 " +
                "333 600 930 963 660 060 366 009 339 636 " +
                "000 300 630 633 330 030 033 006 309 303",
            fonts: // font names in the font popup
                "Arial,Arial Black,Comic Sans MS,Courier New,Narrow,Garamond," +
                "Georgia,Impact,Sans Serif,Serif,Tahoma,Trebuchet MS,Verdana",
            sizes: // sizes in the font size popup
                "1,2,3,4,5,6,7",
            styles: // styles in the style popup
                [
                ["Paragraph", "<p>"],
                ["Header 1", "<h1>"],
                ["Header 2", "<h2>"],
                ["Header 3", "<h3>"],
                ["Header 4", "<h4>"],
                ["Header 5", "<h5>"],
                ["Header 6", "<h6>"]
            ],
            useCSS: false, // use CSS to style HTML when possible (not supported in ie)
            docType: // Document type contained within the editor
                '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">',
            docCSSFile: "", // CSS file used to style the document contained within the editor
            bodyStyle: "margin:4px; font:10pt Arial,Verdana; cursor:text;white-space:normal;height:100%;" // style to assign to document body contained within the editor
        },

        // Define all usable toolbar buttons - the init string property is 
        //   expanded during initialization back into the buttons object and 
        //   seperate object properties are created for each button.
        //   e.g. buttons.size.title = "Font Size"
        buttons: {
            // name,title,command,popupName (""=use name)
            init: "bold,,|" +
                "italic,,|" +
                "underline,,|" +
                "strikethrough,,|" +
                "subscript,,|" +
                "superscript,,|" +
                "font,,fontname,|" +
                "size,Font Size,fontsize,|" +
                "style,,formatblock,|" +
                "color,Font Color,forecolor,|" +
                "highlight,Text Highlight Color,hilitecolor,color|" +
                "removeformat,Remove Formatting,|" +
                "bullets,,insertunorderedlist|" +
                "numbering,,insertorderedlist|" +
                "outdent,,|" +
                "indent,,|" +
                "alignleft,Align Text Left,justifyleft|" +
                "center,,justifycenter|" +
                "alignright,Align Text Right,justifyright|" +
                "justify,,justifyfull|" +
                "undo,,|" +
                "redo,,|" +
                "rule,Insert Horizontal Rule,inserthorizontalrule|" +
                "image,Insert Image,insertimage,url|" +
                "link,Insert Hyperlink,createlink,url|" +
                "unlink,Remove Hyperlink,|" +
                "cut,,|" +
                "copy,,|" +
                "paste,,|" +
                "pastetext,Paste as Text,inserthtml,|" +
                "print,,|" +
                "source,Show Source"
        },

        // imagesPath - returns the path to the images folder
        imagesPath: function() {
            return imagesPath();
        }
    };

    // cleditor - creates a new editor for each of the matched textareas
    $.fn.cleditor = function(options) {

        // Create a new jQuery object to hold the results
        var $result = $([]);

        // Loop through all matching textareas and create the editors
        this.each(function(idx, elem) {
            if (elem.tagName == "TEXTAREA") {
                var data = $.data(elem, CLEDITOR);
                if (!data) data = new cleditor(elem, options);
                $result = $result.add(data);
            }
        });
        

        // return the new jQuery object
        return $result;

    };

    function isIE() {
        if (!!window.ActiveXObject || "ActiveXObject" in window)
            return true;
        else
            return false;
    }

    //==================
    // Private Variables
    //==================

    var

    // Misc constants
        BACKGROUND_COLOR = "backgroundColor",
        BUTTON = "button",
        BUTTON_NAME = "buttonName",
        CHANGE = "change",
        CLEDITOR = "cleditor",
        CLICK = "click",
        DISABLED = "disabled",
        DIV_TAG = "<div>",
        TRANSPARENT = "transparent",
        UNSELECTABLE = "unselectable",
        CUSTOM_BLUR = "custom_blur",
        CUSTOM_FOCUS = "custom_focus",
        CUSTOM_KEYUP = "custom_keyup",
        CUSTOM_KEYDOWN = "custom_keydown",

        CUSTOM_LOADED = "custom_editor_loaded",

        // Class name constants
        MAIN_CLASS = "cleditorMain", // main containing div
        TOOLBAR_CLASS = "cleditorToolbar", // toolbar div inside main div
        GROUP_CLASS = "cleditorGroup", // group divs inside the toolbar div
        BUTTON_CLASS = "cleditorButton", // button divs inside group div
        DISABLED_CLASS = "cleditorDisabled", // disabled button divs
        DIVIDER_CLASS = "cleditorDivider", // divider divs inside group div
        POPUP_CLASS = "cleditorPopup", // popup divs inside body
        LIST_CLASS = "cleditorList", // list popup divs inside body
        COLOR_CLASS = "cleditorColor", // color popup div inside body
        PROMPT_CLASS = "cleditorPrompt", // prompt popup divs inside body
        MSG_CLASS = "cleditorMsg", // message popup div inside body

        // Test for ie
        ie = $.browser.msie || isIE(),
        ie6 = /msie\s6/i.test(navigator.userAgent),
        iege11 = /(trident)(?:.*rv:([\w.]+))?/.test(navigator.userAgent.toLowerCase()) && (navigator.userAgent.toLowerCase().indexOf("rv:11.0") > 0),
        ie9 = /msie\s9/i.test(navigator.userAgent),

        // Test for iPhone/iTouch/iPad
        iOS = /iphone|ipad|ipod/i.test(navigator.userAgent),

        // Popups are created once as needed and shared by all editor instances
        popups = {},

        // Used to prevent the document click event from being bound more than once
        documentClickAssigned,

        // Local copy of the buttons object
        buttons = $.cleditor.buttons;

    //===============
    // Initialization
    //===============

    // Expand the buttons.init string back into the buttons object
    //   and create seperate object properties for each button.
    //   e.g. buttons.size.title = "Font Size"
    $.each(buttons.init.split("|"), function(idx, button) {
        var items = button.split(","),
            name = items[0];
        buttons[name] = {
            stripIndex: idx,
            name: name,
            title: items[1] === "" ? name.charAt(0).toUpperCase() + name.substr(1) : items[1],
            command: items[2] === "" ? name : items[2],
            popupName: items[3] === "" ? name : items[3]
        };
    });
    delete buttons.init;

    //============
    // Constructor
    //============

    // cleditor - creates a new editor for the passed in textarea element
    cleditor = function(area, options) {
    	this.owner = options.owner;
        var editor = this;
        // Get the defaults and override with options
        editor.options = options = $.extend({}, $.cleditor.defaultOptions, options);

        //    if($.isFunction(options._blur_callback)){
        //      editor.customBlur(options._blur_callback);
        //    }

        // Hide the textarea and associate it with this editor
        var $area = editor.$area = $(area)
            .hide()
            .data(CLEDITOR, editor)
            .blur(function() {
                //Update the iframe when the textarea loses focus
                updateFrame(editor, true);
                //触发自定义的失去焦点事件
                editor.customBlur();
            });

        // Create the main container and append the textarea
        var $main = editor.$main = $(DIV_TAG)
            .addClass(MAIN_CLASS)
            .width(options.width)
            .height(options.height);

        // Create the toolbar
        var $toolbar = editor.$toolbar = $(DIV_TAG)
            .addClass(TOOLBAR_CLASS)
            .appendTo($main);

        // Add the first group to the toolbar
        var $group = $(DIV_TAG)
            .addClass(GROUP_CLASS)
            .appendTo($toolbar);

        // Add the buttons to the toolbar
        $.each(options.controls.split(" "), function(idx, buttonName) {
            if (buttonName === "") return true;

            // Divider
            if (buttonName == "|") {

                // Add a new divider to the group
                var $div = $(DIV_TAG)
                    .addClass(DIVIDER_CLASS)
                    .appendTo($group);

                // Create a new group
                $group = $(DIV_TAG)
                    .addClass(GROUP_CLASS)
                    .appendTo($toolbar);
            }

            // Button
            else {
                // Get the button definition
                var button = buttons[buttonName];

                // Add a new button to the group
                var $buttonDiv = $(DIV_TAG)
                    .data(BUTTON_NAME, button.name)
                    .addClass(BUTTON_CLASS)
                    .attr("title", button.title)
                    .bind(CLICK, $.proxy(buttonClick, editor)) //注册按钮的点击事件
                    .appendTo($group)
                    .hover(hoverEnter, hoverLeave); //注册按钮的鼠标进入鼠标移开事件

                // Prepare the button image
                var map = {};
                if (button.css) map = button.css;
                else if (button.image) map.backgroundImage = imageUrl(button.image);
                if (button.stripIndex) map.backgroundPosition = button.stripIndex * -24;
                $buttonDiv.css(map);

                // Add the unselectable attribute for ie
                if (ie)
                    $buttonDiv.attr(UNSELECTABLE, "on");

                // Create the popup
                if (button.popupName)
                    createPopup(button.popupName, options, button.popupClass,
                        button.popupContent, button.popupHover);
            }
        });

        // Add the main div to the DOM and append the textarea
        $main.insertBefore($area).append($area);

        // Bind the document click event handler
        if (!documentClickAssigned) {
            $(document).click(function(e) {
                // Dismiss all non-prompt popups
                var $target = $(e.target);
                if (!$target.add($target.parents()).is("." + PROMPT_CLASS))
                    hidePopups();
            });
            documentClickAssigned = true;
        }

        $main.on("resize", function() {
            refresh(editor);
        });
        // Create the iframe and resize the controls
        refresh(editor);
    };

    //===============
    // Public Methods
    //===============

    var fn = cleditor.prototype,

        // Expose the following private functions as methods on the cleditor object.
        // The closure compiler will rename the private functions. However, the
        // exposed method names on the cleditor object will remain fixed.
        methods = [
            ["clear", clear],
            ["disable", disable],
            ["execCommand", execCommand],
            ["focus", focus],
            ["hidePopups", hidePopups],
            ["sourceMode", sourceMode, true],
            ["refresh", refresh],
            ["select", select],
            ["selectedHTML", selectedHTML, true],
            ["selectedText", selectedText, true],
            ["showMessage", showMessage],
            ["updateFrame", updateFrame],
            ["updateTextArea", updateTextArea],
            ["reSize", reSize],
            ["offCustomEvent", offCustomEvent],
            ["onCustomEvent", onCustomEvent]
        ];

    $.each(methods, function(idx, method) {
        fn[method[0]] = function() {
            var editor = this,
                args = [editor];
            // using each here would cast booleans into objects!
            for (var x = 0; x < arguments.length; x++) {
                args.push(arguments[x]);
            }
            var result = method[1].apply(editor, args);
            if (method[2]) return result;
            return editor;
        };
    });

    // change - shortcut for .bind("change", handler) or .trigger("change")
    fn.change = function(handler) {
        var $this = $(this);
        return handler ? $this.bind(CHANGE, handler) : $this.trigger(CHANGE);
    };

    fn.customBlur = function(handler) {
        var $this = $(this);
        if ($.isFunction(handler)) {
            return $this.bind(CUSTOM_BLUR, handler);
        } else if (typeof(handler) == "boolean" && !handler) {
            return $this.unbind(CUSTOM_BLUR)
        } else if (typeof(handler) == 'undefined') {
            return $this.trigger(CUSTOM_BLUR);
        }
    };

    fn.customFocus = function(handler) {
        var $this = $(this);
        if ($.isFunction(handler)) {
            return $this.bind(CUSTOM_FOCUS, handler);
        } else if (typeof(handler) == "boolean" && !handler) {
            return $this.unbind(CUSTOM_FOCUS)
        } else if (typeof(handler) == 'undefined') {
            return $this.trigger(CUSTOM_FOCUS);
        }
    };

    fn.customKeyup = function(handler) {
        var $this = $(this);
        if ($.isFunction(handler)) {
            return $this.bind(CUSTOM_KEYUP, handler);
        } else if (typeof(handler) == "boolean" && !handler) {
            return $this.unbind(CUSTOM_KEYUP)
        } else if (typeof(handler) == 'undefined') {
            return $this.trigger(CUSTOM_KEYUP);
        }
    };

    fn.customKeydown = function(handler) {
        var $this = $(this);
        if ($.isFunction(handler)) {
            return $this.bind(CUSTOM_KEYDOWN, handler);
        } else if (typeof(handler) == "boolean" && !handler) {
            return $this.unbind(CUSTOM_KEYDOWN)
        } else if (typeof(handler) == 'undefined') {
            return $this.trigger(CUSTOM_KEYDOWN);
        }
    };

    fn.customLoaded = function(handler) {
        var $this = $(this);
        if ($.isFunction(handler)) {
            return $this.bind(CUSTOM_LOADED, handler);
        } else if (typeof(handler) == "boolean" && !handler) {
            return $this.unbind(CUSTOM_LOADED)
        } else if (typeof(handler) == 'undefined') {
            return $this.trigger(CUSTOM_LOADED);
        }
    };

    //===============
    // Event Handlers
    //===============

    //按钮的响应处理函数
    // buttonClick - click event handler for toolbar buttons
    function buttonClick(e) {
        var editor = this,
            buttonDiv = e.target,
            buttonName = $.data(buttonDiv, BUTTON_NAME),
            button = buttons[buttonName],
            popupName = button.popupName,
            popup = popups[popupName];

        // Check if disabled
        if (editor.disabled || $(buttonDiv).attr(DISABLED) == DISABLED)
            return;

        // Fire the buttonClick event
        var data = {
            editor: editor,
            button: buttonDiv,
            buttonName: buttonName,
            popup: popup,
            popupName: popupName,
            command: button.command,
            useCSS: editor.options.useCSS
        };

        if (button.buttonClick && button.buttonClick(e, data) === false)
            return false;

        // Toggle source
        if (buttonName == "source") {

            // Show the iframe
            if (sourceMode(editor)) {
                delete editor.range;
                editor.$area.hide();
                editor.$frame.show();
                buttonDiv.title = button.title;
            }

            // Show the textarea
            else {
                editor.$frame.hide();
                editor.$area.show();
                buttonDiv.title = "Show Rich Text";
            }

            // Enable or disable the toolbar buttons
            // IE requires the timeout
            setTimeout(function() {
                refreshButtons(editor);
            }, 100);

        }

        // Check for rich text mode
        else if (!sourceMode(editor)) {

            // Handle popups
            if (popupName) {
                var $popup = $(popup);

                // URL
                if (popupName == "url") {

                    // Check for selection before showing the link url popup
                    if (buttonName == "link" && selectedText(editor) === "") {
                        showMessage(editor, mx.msg("RET_INSERT_LINK") + ".", buttonDiv);
                        return false;
                    }

                    // Wire up the submit button click event handler
                    $popup.children(":button")
                        .unbind(CLICK)
                        .bind(CLICK, function(e) {
                            e.stopPropagation();
                            e.preventDefault();
                            // Insert the image or link if a url was entered
                            var $text = $popup.find(":text"),
                                url = $.trim($text.val());
                            if (url !== "" && url !== "http://")
                                execCommand(editor, data.command, url, null, data.button);

                            // Reset the text, hide the popup and set focus
                            if (!(e.target.id=="openLocalPicture")){
                            	$text.val("http://");
                                hidePopups();
                                focus(editor);
                            }
                            
                            

                        });

                }

                // Paste as Text
                else if (popupName == "pastetext") {

                    // Wire up the submit button click event handler
                    $popup.children(":button")
                        .unbind(CLICK)
                        .bind(CLICK, function(e) {
                            e.stopPropagation();
                            e.preventDefault();
                            // Insert the unformatted text replacing new lines with break tags
                            var $textarea = $popup.find("textarea"),
                                text = $textarea.val().replace(/\n/g, "<br />");
                            if (text !== "")
                                execCommand(editor, data.command, text, null, data.button);

                            // Reset the text, hide the popup and set focus
                            $textarea.val("");
                            hidePopups();
                            focus(editor);

                        });

                }

                // Show the popup if not already showing for this button
                if (buttonDiv !== $.data(popup, BUTTON)) {
                    
                    if (popupName == "url" && options.owner.uploadPicture){
                    	$popup.find("#openLocalPicture").get(0).click();
                    }
                    else
                    	showPopup(editor, popup, buttonDiv);
                    return false; // stop propagination to document click
                }

                // propaginate to documnt click
                return;

            }

            // Print
            else if (buttonName == "print")
                editor.$frame[0].contentWindow.print();

            // All other buttons
            else if (!execCommand(editor, data.command, data.value, data.useCSS, buttonDiv))
                return false;

        }

        // Focus the editor
        focus(editor);

    }

    // hoverEnter - mouseenter event handler for buttons and popup items
    function hoverEnter(e) {
        var $div = $(e.target).closest("div");
        $div.css(BACKGROUND_COLOR, $div.data(BUTTON_NAME) ? "#FFF" : "#FFC");
    }

    // hoverLeave - mouseleave event handler for buttons and popup items
    function hoverLeave(e) {
        $(e.target).closest("div").css(BACKGROUND_COLOR, "transparent");
    }

    // popupClick - click event handler for popup items
    function popupClick(e) {
        e.stopPropagation();
        e.preventDefault();
        var editor = this,
            popup = e.data.popup,
            target = e.target;

        // Check for message and prompt popups
        if (popup === popups.msg || $(popup).hasClass(PROMPT_CLASS))
            return;

        // Get the button info
        var buttonDiv = $.data(popup, BUTTON),
            buttonName = $.data(buttonDiv, BUTTON_NAME),
            button = buttons[buttonName],
            command = button.command,
            value,
            useCSS = editor.options.useCSS;

        // Get the command value
        if (buttonName == "font")
        // Opera returns the fontfamily wrapped in quotes
            value = target.style.fontFamily.replace(/"/g, "");
        else if (buttonName == "size") {
            if (target.tagName == "DIV")
                target = target.children[0];
            value = target.innerHTML;
        } else if (buttonName == "style")
            value = "<" + target.tagName + ">";
        else if (buttonName == "color")
            value = hex(target.style.backgroundColor);
        else if (buttonName == "highlight") {
            value = hex(target.style.backgroundColor);
            if (ie) command = 'backcolor';
            else useCSS = true;
        }

        // Fire the popupClick event
        var data = {
            editor: editor,
            button: buttonDiv,
            buttonName: buttonName,
            popup: popup,
            popupName: button.popupName,
            command: command,
            value: value,
            useCSS: useCSS
        };

        if (button.popupClick && button.popupClick(e, data) === false)
            return;

        // Execute the command
        if (data.command && !execCommand(editor, data.command, data.value, data.useCSS, buttonDiv))
            return false;

        // Hide the popup and focus the editor
        hidePopups();
        focus(editor);

    }

    //==================
    // Private Functions
    //==================

    // checksum - returns a checksum using the Adler-32 method
    function checksum(text) {
        var a = 1,
            b = 0;
        for (var index = 0; index < text.length; ++index) {
            a = (a + text.charCodeAt(index)) % 65521;
            b = (b + a) % 65521;
        }
        return (b << 16) | a;
    }

    // clear - clears the contents of the editor
    function clear(editor) {
        editor.$area.val("");
        updateFrame(editor);
    }

    // createPopup - creates a popup and adds it to the body
    function createPopup(popupName, options, popupTypeClass, popupContent, popupHover) {

        // Check if popup already exists
        if (popups[popupName])
            return popups[popupName];

        // Create the popup
        var $popup = $(DIV_TAG)
            .hide()
            .addClass(POPUP_CLASS)
            .appendTo("body");
        // Add the content

        // Custom popup
        if (popupContent)
            $popup.html(popupContent);

        // Color
        else if (popupName == "color") {
            var colors = options.colors.split(" ");
            if (colors.length < 10)
                $popup.width("auto");
            $.each(colors, function(idx, color) {
                $(DIV_TAG).appendTo($popup)
                    .css(BACKGROUND_COLOR, "#" + color);
            });
            popupTypeClass = COLOR_CLASS;
        }

        // Font
        else if (popupName == "font")
            $.each(options.fonts.split(","), function(idx, font) {
                $(DIV_TAG).appendTo($popup)
                    .css("fontFamily", font)
                    .html(font);
            });

        // Size
        else if (popupName == "size")
            $.each(options.sizes.split(","), function(idx, size) {
                $(DIV_TAG).appendTo($popup)
                    .html("<font size=" + size + ">" + size + "</font>");
            });

        // Style
        else if (popupName == "style")
            $.each(options.styles, function(idx, style) {
                $(DIV_TAG).appendTo($popup)
                    .html(style[1] + style[0] + style[1].replace("<", "</"));
            });

        // URL
        else if (popupName == "url") {
        	if (options.owner.uploadPicture){
        		$popup.html(mx.msg('RTE_ENTER_URL') + ':<br><input type=text value="http://" size=35><br><input type=button value="' + mx.msg('RTE_SUBMIT') + '">' + '<input type=button value="open" id ="openLocalPicture">');
        	}
        	else
        		$popup.html(mx.msg('RTE_ENTER_URL') + ':<br><input type=text value="http://" size=35><br><input type=button value="' + mx.msg('RTE_SUBMIT') + '">');
            popupTypeClass = PROMPT_CLASS;
            var t_baseurl = mx.mappath("~/../mx/servlets/fileUpload");
            var t_pictureUrl = mx.rootPath + "/tmpfiles";
           if (document.getElementById("openLocalPicture") != null){
        	   document.getElementById("openLocalPicture").onclick = function(){
            	   var uploadFileUrl = "";
            	   var pictureSavePath = ""; 
            	   if (options.owner != undefined){
            		   if (options.owner.pictureSavePath.length > 0){
            			   pictureSavePath = options.owner.pictureSavePath;
            		   }else{
            			   pictureSavePath = "\tmp_files";
            		   }
            		   if (options.owner.uploadFileUrl.length > 0){
            			   uploadFileUrl = options.owner.uploadFileUrl;
            			   t_baseurl = uploadFileUrl;
            		   }else{
            			   uploadFileUrl = t_baseurl;
            		   }
            		   if (options.owner.pictureUrl.length > 0){
            			   pictureUrl = options.owner.pictureUrl;
            			   t_pictureUrl = pictureUrl;
            		   }else{
            			   pictureUrl = t_pictureUrl;
            		   }
            	   }
            	   var annex = new mx.editors.PictureManagerEditor({
           			filePath : pictureSavePath,
           			windowHeight : 400,
           			windowWidth : 500,
           			width : 50,
           			height : 40,
           			baseUrl : t_baseurl,
           			justUpload:true
           		});
            	   annex.$e.trigger("click");
            	   $popup.css("display","none");
            	   annex._uploadWin.on("hiding",_hiding);
            	   function _hiding(){
            		   if (annex.lastestUploadedFileName.length > 0){
            			   $popup.find("input[type='text']").val(t_pictureUrl + annex.lastestUploadedFileName);
            			   $popup.find("input[type='button']").get(0).click();
            		   }
            	   }
               }
           }
        }
        // Paste as Text
        else if (popupName == "pastetext") {
            $popup.html(mx.msg('RET_PASTE_TEXT') + '.<br /><textarea cols=40 rows=3></textarea><br /><input type=button value=' + mx.msg('RTE_SUBMIT') + '>');
            popupTypeClass = PROMPT_CLASS;
        }
        
        // Add the popup type class name
        if (!popupTypeClass && !popupContent)
            popupTypeClass = LIST_CLASS;
        $popup.addClass(popupTypeClass);

        // Add the unselectable attribute to all items
        if (ie) {
            $popup.attr(UNSELECTABLE, "on")
                .find("div,font,p,h1,h2,h3,h4,h5,h6")
                .attr(UNSELECTABLE, "on");
        }

        // Add the hover effect to all items
        if ($popup.hasClass(LIST_CLASS) || popupHover === true)
            $popup.children().hover(hoverEnter, hoverLeave);

        // Add the popup to the array and return it
        popups[popupName] = $popup[0];
        return $popup[0];

    }
    
    // disable - enables or disables the editor
    function disable(editor, disabled) {
        // Update the textarea and save the state
        if (disabled) {
            editor.$main.addClass("disabled");
            editor.$area.attr(DISABLED, DISABLED);
            $(editor.doc.body).css("background-color", "#F0F0F0");
            editor.disabled = true;
        } else {
            editor.$main.removeClass("disabled");
            editor.$area.removeAttr(DISABLED);
            $(editor.doc.body).css("background-color", "");
            delete editor.disabled;
        }
        // Switch the iframe into design mode.
        // ie6 does not support designMode.
        // ie7 & ie8 do not properly support designMode="off".
        try {
            if (ie) editor.doc.body.contentEditable = !disabled;
            else editor.doc.designMode = !disabled ? "on" : "off";
        }
        // Firefox 1.5 throws an exception that can be ignored
        // when toggling designMode from off to on.
        catch (err) {}

        // Enable or disable the toolbar buttons
        refreshButtons(editor);

    }

    // execCommand - executes a designMode command
    function execCommand(editor, command, value, useCSS, button) {

        // Restore the current ie selection
        restoreRange(editor);

        // Set the styling method
        if (!ie) {
            if (useCSS === undefined || useCSS === null)
                useCSS = editor.options.useCSS;
            editor.doc.execCommand("styleWithCSS", 0, useCSS.toString());
        }

        // Execute the command and check for error
        var success = true,
            description;
        if (ie && command.toLowerCase() == "inserthtml") {
            if ($(editor.doc).find("body").text().length == 0 || editor.range == null) {
                $(editor.doc).find("body").text(value);
            } else {
                if (editor.doc.selection && editor.doc.selection.type != "Control") {
                    editor.range[0].pasteHTML(value);
                } else if (getContentWindow(editor).getSelection) { //兼容ie11
                    var sel = getSelection(editor);
                    var range = editor.range[0];
                    var el = editor.doc.createTextNode(value);
                    var frag = editor.doc.createDocumentFragment(),
                        node, lastNode;
                    lastNode = frag.appendChild(el);
                    var firstNode = frag.firstChild;
                    range.insertNode(frag);
                    // Preserve the selection
                    if (lastNode) {
                        range = range.cloneRange();
                        range.setStartAfter(lastNode);
                        range.collapse(true);
                        sel.removeAllRanges();
                        sel.addRange(range);
                    }
                    editor.updateTextArea();
                }
            }
        } else if (ie && (command == "undo" || command == "redo")) {
            editor.doc.execCommand(command, false, "none");
            editor.doc.execCommand(command, false, "none"); //由于在updateTextArea方法中有赋值操作，此处需执行两次

            if (editor.sourceMode()) {
                editor.updateFrame();
            } else {
                editor.updateTextArea();
            }
            $(editor).triggerHandler(CHANGE);
        } else {
            try {
                if (command.toLowerCase() == "insertimage" && ie9) {
                    editor.doc.body.focus();
                    editor.range[0].select();
                }

                success = editor.doc.execCommand(command, 0, value || null);
            } catch (err) {
                description = err.description;
                success = false;
            }
            if (!success) {
                if ("cutcopypaste".indexOf(command) > -1)
                    showMessage(editor, "For security reasons, your browser does not support the " +
                        command + " command. Try using the keyboard shortcut or context menu instead.",
                        button);
                else
                    showMessage(editor, (description ? description : "Error executing the " + command + " command."),
                        button);
            }
            if (success){
            	var theObj='<img src="'+value+'"width="'+$("#pictureWidth").val() +'px" height="' + $("#pictureHeight").val() +'px" >';
            	
            	//iframeID.document.execCommand('InsertImage',false,url);
            	reg=new RegExp('<img src="'+value+'">','ig');
            	editor.doc.body.innerHTML=editor.doc.body.innerHTML.replace(reg,theObj);
            }
        }

        // Enable the buttons
        refreshButtons(editor);
        return success;

    }

    // focus - sets focus to either the textarea or iframe
    function focus(editor) {
        setTimeout(function() {
            if (sourceMode(editor)) editor.$area.focus();
            else editor.$frame[0].contentWindow.focus();
            refreshButtons(editor);
        }, 0);
    }

    // getRange - gets the current text range object
    function getRange(editor) {
        var selection = getSelection(editor);
        if (selection) {
            try {
                if (ie) {
                    var range = null;
                    try {
                        range = selection.createRange();
                    } catch (e) { //兼容ie11
                        range = selection.getRangeAt(0);
                    }
                    return range;
                }
                return selection.getRangeAt(0);
            } catch (e) {}
        }
        return null;
    }

    // getSelection - gets the current text range object
    function getSelection(editor) {
        if (ie) {
            if (editor.doc) {
                var selection = editor.doc.selection;
                if (typeof(selection) == "undefined") { //兼容ie11
                    selection = editor.$frame[0].contentWindow.getSelection();
                }
                return selection;
            }
            return null;
        }

        if (editor.$frame[0].contentWindow) {
            return editor.$frame[0].contentWindow.getSelection();
        }
    }

    // Returns the hex value for the passed in string.
    //   hex("rgb(255, 0, 0)"); // #FF0000
    //   hex("#FF0000"); // #FF0000
    //   hex("#F00"); // #FF0000
    function hex(s) {
        var m = /rgba?\((\d+), (\d+), (\d+)/.exec(s),
            c = s.split("");
        if (m) {
            s = (m[1] << 16 | m[2] << 8 | m[3]).toString(16);
            while (s.length < 6)
                s = "0" + s;
        }
        return "#" + (s.length == 6 ? s : c[1] + c[1] + c[2] + c[2] + c[3] + c[3]);
    }

    // hidePopups - hides all popups
    function hidePopups() {
        $.each(popups, function(idx, popup) {
            $(popup)
                .hide()
                .unbind(CLICK)
                .removeData(BUTTON);
        });
    }

    // imagesPath - returns the path to the images folder
    function imagesPath() {
        var cssFile = "jquery.cleditor.css",
            href = $("link[href$='" + cssFile + "']").attr("href");
        return href.substr(0, href.length - cssFile.length) + "images/";
    }

    // imageUrl - Returns the css url string for a filemane
    function imageUrl(filename) {
        return "url(" + imagesPath() + filename + ")";
    }

    function offCustomEvent(editor) {
        var options = editor.options;
        var contentWindow = getContentWindow(editor);
        if (contentWindow) {
            try {
                if ($.isFunction(options._blur_callback))
                    editor.customBlur(false);
                if ($.isFunction(options._focus_callback))
                    editor.customFocus(false);
                if ($.isFunction(options._keyup_callback))
                    editor.customKeyup(false);
                if ($.isFunction(options._editor_loaded_callback))
                    editor.customLoaded(false);
            } catch (e) {}
        }
    }

    function onCustomEvent(editor) {
        var options = editor.options;
        var contentWindow = getContentWindow(editor);
        if (contentWindow) {
            try {
                //绑定前先清空  
                offCustomEvent(editor);
                if ($.isFunction(options._blur_callback))
                    editor.customBlur(options._blur_callback);
                if ($.isFunction(options._focus_callback))
                    editor.customFocus(options._focus_callback);
                if ($.isFunction(options._keyup_callback))
                    editor.customKeyup(options._keyup_callback);
                if ($.isFunction(options._editor_loaded_callback))
                    editor.customLoaded(options._editor_loaded_callback);
            } catch (e) {}
        }
    }

    var _isloaded = false;
    // refresh - creates the iframe and resizes the controls
    function refresh(editor) {
        _isloaded = false;
        var $main = editor.$main;
        if (editor.$frame) {
            if (ie) {
                _iframe_onload(editor);
            } else {
                updateFrame(editor);
                reSize(editor);
            }
        } else {
            // Create a new iframe
            var iframeStr = '<iframe frameborder="0" src="' + mx.mappath("$/html/blank.html") + '?rnd=' + mx.random() + '">';
            var $frame = editor.$frame = $(iframeStr)
                .hide().appendTo($main);
            if (ie) { //ie浏览器
                $frame.one("load", function() {
                    _iframe_onload(editor);
                    editor.customLoaded();
                });
            } else {
                $frame.on("load", function() {
                    _isloaded = true;
                    _iframe_onload(editor);
                    editor.customLoaded();
                });
            }
        }
    }

    function createVoidIframe(editor) {
        var $frame = editor.$frame;
        var options = editor.options;
        //先清除原来的iframe
        if ($frame) {
            $frame.attr("src", "");
            try {
                //清除事件
                offCustomEvent(editor);
            } catch (e) {} finally {
                $frame.remove();
            }
            if (ie) {
                CollectGarbage();
                setTimeout(function() {
                    CollectGarbage();
                }, 2000);
            }
        }
        var iframeStr = '<iframe frameborder="0" src="javascript:true;">';
        var $frame = editor.$frame = $(iframeStr).hide().appendTo(editor.$main);
    }

    function getContentWindow(editor) {
        var $frame = editor.$frame;
        var contentWindow = null;
        try {
            contentWindow = $frame[0].contentWindow;
        } catch (e) {}
        return contentWindow;
    }

    function getDoc(editor) {
        var doc = null;
        var contentWindow = getContentWindow(editor);
        if (contentWindow) {
            try {
                doc = editor.doc = contentWindow.document;
            } catch (e) {
                //重新创建一个iframe
                createVoidIframe(editor);
                //重新获取window对象
                contentWindow = getContentWindow(editor);
                if (contentWindow) {
                    try {
                        doc = editor.doc = contentWindow.document;
                    } catch (e) {}
                }
            }
        }
        return doc;
    }

    function writeDoc(editor) {
        var doc = getDoc(editor);
        if (doc) {
            var options = editor.options;
            doc.open();
            doc.write(
                options.docType +
                '<html style="height:95%">' + '<head><style>a{color:#0066CC;text-decoration:none;}a:hover{text-decoration:underline;}</style>' + 
                ((options.docCSSFile === '') ? '' : '<link rel="stylesheet" type="text/css" href="' + options.docCSSFile + '" />') +
                '</head><body style="' + options.bodyStyle + '"></body></html>'
            );
            
            doc.close();
        }
    }

    function _bindOnlyOneEvent(p_obj, p_type, p_function) {
        p_obj.unbind(p_type, p_function);
        p_obj.bind(p_type, p_function);
    }

    function _iframe_onload(editor) {
        // Load the iframe document content
        var options = editor.options;
        var contentWindow = getContentWindow(editor);

        var vloaded = ie ? contentWindow : (contentWindow && _isloaded);

        if (vloaded) {
            //获得doc对象
            var doc = getDoc(editor);
            //重新获取window对象
            contentWindow = getContentWindow(editor);

            var $frame = editor.$frame;
            $frame.attr("src", "");
            var $doc = $(doc);
            
            //注册用户自定义事件
            onCustomEvent(editor);

            writeDoc(editor);

            function _editor_$doc_click() {
                focus(editor);
            }

            // Work around for bug in IE which causes the editor to lose
            // focus when clicking below the end of the document.
            if (ie)
                _bindOnlyOneEvent($doc, "click", _editor_$doc_click);

            // Load the content
            updateFrame(editor);

            // Bind the ie specific iframe event handlers
            if (ie) {
                // Save the current user selection. This code is needed since IE will
                // reset the selection just after the beforedeactivate event and just
                // before the beforeactivate event.
                function _editor_$doc_bbsk(e) {
                    // Flag the editor as inactive
                    if (e.type == "beforedeactivate")
                        editor.inactive = true;
                    // Get rid of the bogus selection and flag the editor as active
                    else if (e.type == "beforeactivate") {
                        if (!editor.inactive && editor.range && editor.range.length > 1)
                            editor.range.shift();
                        delete editor.inactive;
                    }
                    // Save the selection when the editor is active
                    else if (!editor.inactive) {
                        if (!editor.range)
                            editor.range = [];
                        editor.range.unshift(getRange(editor));
                        // We only need the last 2 selections
                        while (editor.range.length > 2)
                            editor.range.pop();
                    }
                }

                _bindOnlyOneEvent($doc, "beforedeactivate beforeactivate selectionchange keypress", _editor_$doc_bbsk);

                function _editor_$frame_focus() {
                    restoreRange(editor);
                }
                _bindOnlyOneEvent($frame, "focus", _editor_$frame_focus);
            }

            function _editor_$doc_blur() {
                updateTextArea(editor, true);
                //触发自定义的失去焦点事件
                editor.customBlur();
            }

            // Update the textarea when the iframe loses focus
            _bindOnlyOneEvent(ie ? $(contentWindow) : ($.browser.mozilla ? $doc : $(contentWindow)), "blur", _editor_$doc_blur);

            // Enable the toolbar buttons as the user types or clicks
            function _editor_$doc_click2() {
                hidePopups();
                editor.customFocus(); //触发自定义的focus事件
            }

            function _editor_$doc_keyup() {
                refreshButtons(editor);
                editor.customKeyup(); //触发自定义事件
            }
            
            function _editor_$doc_keydown(e) {
            	var $parentDiv = $frame.closest('div.cleditorMain.disabled');
                var isDisabled = $parentDiv.length > 0 ? true : false;
                if (isDisabled && e.keyCode == 8) {
                    e.keyCode = 0;
                    
                    if(e.returnValue){
                        e.returnValue = false;
                    }
                    if(e.preventDefault ){
                        e.preventDefault();
                    }                

                    return false;
                }
                editor.customKeydown(); //触发自定义事件
            }

            function _editor_$doc_mouseup() {
                refreshButtons(editor);
            }

            _bindOnlyOneEvent($doc, "click", _editor_$doc_click2);
            _bindOnlyOneEvent($doc, "keyup", _editor_$doc_keyup);
            _bindOnlyOneEvent($doc, "keydown", _editor_$doc_keydown);
            _bindOnlyOneEvent($doc, "mouseup", _editor_$doc_mouseup);

            // Show the textarea for iPhone/iTouch/iPad or
            // the iframe when design mode is supported.
            if (iOS) editor.$area.show();
            else $frame.show();
            // Wait for the layout to finish - shortcut for $(document).ready()
            reSize(editor);
        }
    }

    function reSize(editor) {
        if (editor.doc) {
            var $toolbar = editor.$toolbar,
                $group = $toolbar.children("div:last"),
                wid = editor.$main.width();
            var options = editor.options;
            var $frame = editor.$frame;
            var $main = editor.$main;
            // Resize the toolbar
            var hgt = $group.offset().top + $group.outerHeight() - $toolbar.offset().top + 1;
            $toolbar.height(hgt);

            // Resize the iframe
            hgt = (/%/.test("" + options.height) ? $main.height() : parseInt(options.height)) - hgt;
            $frame.width(wid).height(hgt);

            // Resize the textarea. IE6 textareas have a 1px top
            // & bottom margin that cannot be removed using css.
            editor.$area.width(wid).height(ie6 ? hgt - 2 : hgt);

            // Switch the iframe into design mode if enabled
            disable(editor, editor.disabled);

            if (iege11) {
                focus(editor);
            }
            // Enable or disable the toolbar buttons
            //refreshButtons(editor);
        }
    }

    // refreshButtons - enables or disables buttons based on availability
    function refreshButtons(editor) {
        // Webkit requires focus before queryCommandEnabled will return anything but false
        if (!iOS && $.browser.webkit && !editor.focused) {
            if (editor.$frame[0] && editor.$frame[0].contentWindow) {
                editor.$frame[0].contentWindow.focus();
            }
            window.focus();
            editor.focused = true;
        }

        // Get the object used for checking queryCommandEnabled
        var queryObj = editor.doc;
        if (ie) {
            if (editor.doc.selection && editor.doc.selection.type != "Control") {
                queryObj = getRange(editor);
            } else if (getContentWindow(editor).getSelection) { //兼容ie11
                queryObj = editor.doc;
            }
        }
        // Loop through each button
        var inSourceMode = sourceMode(editor);
        $.each(editor.$toolbar.find("." + BUTTON_CLASS), function(idx, elem) {

            var $elem = $(elem),
                button = $.cleditor.buttons[$.data(elem, BUTTON_NAME)],
                command = button.command,
                enabled = true;

            // Determine the state
            if (editor.disabled)
                enabled = false;
            else if (button.getEnabled) {
                var data = {
                    editor: editor,
                    button: elem,
                    buttonName: button.name,
                    popup: popups[button.popupName],
                    popupName: button.popupName,
                    command: button.command,
                    useCSS: editor.options.useCSS
                };
                enabled = button.getEnabled(data);
                if (enabled === undefined)
                    enabled = true;
            } else if (ie && (command == "undo" || command == "redo")) {
                enabled = editor.doc.queryCommandEnabled(command);
            } else if (((inSourceMode || iOS) && button.name != "source") ||
                (ie && (command == "undo" || command == "redo")))
                enabled = false;
            else if (command && command != "print") {
                if (ie && command == "hilitecolor")
                    command = "backcolor";
                // IE does not support inserthtml, so it's always enabled
                if (!ie || command != "inserthtml") {
                    try {
                        enabled = queryObj.queryCommandEnabled(command);
                    } catch (err) {
                        enabled = false;
                    }
                }
            }
            // Enable or disable the button
            if (enabled) {
                if (ie && command == "undo") { //由于从文本框输入到给area赋值有600毫秒的延迟，所以此处undo按钮的显示也延迟600毫秒，防止undo太快出现无法redo的现象
                    setTimeout(function() {
                        $elem.removeClass(DISABLED_CLASS);
                        $elem.removeAttr(DISABLED);
                    }, 600);
                } else {
                    $elem.removeClass(DISABLED_CLASS);
                    $elem.removeAttr(DISABLED);
                }
            } else {
                $elem.addClass(DISABLED_CLASS);
                $elem.attr(DISABLED, DISABLED);
            }
        });

    }

    // restoreRange - restores the current ie selection
    function restoreRange(editor) {
        try {
            if (iege11)
                getSelection(editor).addRange(editor.range[0]);
            else if (ie && editor.range)
                editor.range[0].select();
        } catch (e) {}
    }

    // select - selects all the text in either the textarea or iframe
    function select(editor) {
        setTimeout(function() {
            if (sourceMode(editor)) editor.$area.select();
            else execCommand(editor, "selectall");
        }, 0);
    }

    // selectedHTML - returns the current HTML selection or and empty string
    function selectedHTML(editor) {
        restoreRange(editor);
        var range = getRange(editor);
        if (ie && range)
            return range.htmlText;
        var layer = $("<layer>")[0];
        layer.appendChild(range.cloneContents());
        var html = layer.innerHTML;
        layer = null;
        return html;
    }

    // selectedText - returns the current text selection or and empty string
    function selectedText(editor) {
        restoreRange(editor);
        var range = getRange(editor);
        if (range) {
            if (ie) return getRange(editor).text;
            return getSelection(editor).toString();
        }
    }

    // showMessage - alert replacement
    function showMessage(editor, message, button) {
        var popup = createPopup("msg", editor.options, MSG_CLASS);
        popup.innerHTML = message;
        showPopup(editor, popup, button);
    }

    // showPopup - shows a popup
    function showPopup(editor, popup, button) {

        var offset, left, top, $popup = $(popup);

        // Determine the popup location
        if (button) {
            var $button = $(button);
            offset = $button.offset();
            left = --offset.left;
            top = offset.top + $button.height();
        } else {
            var $toolbar = editor.$toolbar;
            offset = $toolbar.offset();
            left = Math.floor(($toolbar.width() - $popup.width()) / 2) + offset.left;
            top = offset.top + $toolbar.height() - 2;
        }

        // Position and show the popup
        hidePopups();
        $popup.css({
                left: left,
                top: top
            })
            .show();

        // Assign the popup button and click event handler
        if (button) {
            $.data(popup, BUTTON, button);
            $popup.bind(CLICK, {
                popup: popup
            }, $.proxy(popupClick, editor));
        }

        // Focus the first input element if any
        setTimeout(function() {
            $popup.find(":text,textarea").eq(0).focus().select();
        }, 100);

    }

    // sourceMode - returns true if the textarea is showing
    function sourceMode(editor) {
        return editor.$area.is(":visible");
    }

    // updateFrame - updates the iframe with the textarea contents
    function updateFrame(editor, checkForChange) {

        var code = editor.$area.val();
        if ("<br>" == code && iege11) {
            code = "";
        }

        options = editor.options;
        updateFrameCallback = options.updateFrame;
        var $body = $(editor.doc).find("body");


        // Check for textarea change to avoid unnecessary firing
        // of potentially heavy updateFrame callbacks.
        if (updateFrameCallback) {
            var sum = checksum(code);
            if (checkForChange && editor.areaChecksum == sum)
                return;
            editor.areaChecksum = sum;
        }

        // Convert the textarea source code into iframe html
        var html = updateFrameCallback ? updateFrameCallback(code) : code;

        // Prevent script injection attacks by html encoding script tags
        html = html.replace(/<(?=\/?script)/ig, "&lt;");

        // Update the iframe checksum
        if (options.updateTextArea)
            editor.frameChecksum = checksum(html);

        // Update the iframe and trigger the change event
        if (html != $body.html()) {
            $body.html(html);
            $(editor).triggerHandler(CHANGE);
        }

    }

    // updateTextArea - updates the textarea with the iframe contents
    function updateTextArea(editor, checkForChange) {
        var html = $(editor.doc.body).html();
        if (("<br>" == html || "<p><br></p>" == html) && iege11)
            html = "";
        options = editor.options;
        updateTextAreaCallback = options.updateTextArea,
            $area = editor.$area;

        if ("<p>&nbsp;</p>" == html.toLowerCase()) {
            html = "";
            $(editor.doc.body).html(html);
        }

        // Check for iframe change to avoid unnecessary firing
        // of potentially heavy updateTextArea callbacks.
        if (updateTextAreaCallback) {
            var sum = checksum(html);
            if (checkForChange && editor.frameChecksum == sum)
                return;
            editor.frameChecksum = sum;
        }

        // Convert the iframe html into textarea source code
        var code = updateTextAreaCallback ? updateTextAreaCallback(html) : html;

        // Update the textarea checksum
        if (options.updateFrame)
            editor.areaChecksum = checksum(code);

        // Update the textarea and trigger the change event
        if (code != $area.val()) {
            if ("<br>" == code && iege11)
                code = "";
            $area.val(code);
            $(editor).triggerHandler(CHANGE);
        }
    }

})(jQuery);

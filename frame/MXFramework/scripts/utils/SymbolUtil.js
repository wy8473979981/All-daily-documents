$ns("mx.utils");

/**
 * 提供一个工具类，用来将指定的英文单词转换为对应的 Mono 风格图标。该类在运行时唯一静态实例是 <b>mx.utils.SymbolUtil</b> 对象。
 * 
 * @example 
 * 以下是一个通过 <b>mx.utils.SymbolUtil</b> 将一个英文单词转换为对应 Mono 风格图标的示例。
 * <code language="JavaScript">
 * var $span = $("<span/>");
 * var symbol = mx.utils.SymbolUtil.getSymbol("add");
 * if (symbol != null)
 * {
 *     $span.css("fontFamily", symbol.font);
 *     $span.css("fontSize", "16px");
 *     $span.text(symbol.text);
 * }
 * </code>
 */
mx.utils.SymbolUtilClass = function()
{
    var me = this;
    
    /**
     * 返回一个 JSON 对象，用来表示指定的文本对应的图标字体和字符。
     * 
     * @param
     * p_name 一个字符串，指定的图标字符名称：
     * <p>
     *   <ul>
     *     <li>left</li>
     *     <li>right</li>
     *     <li>up</li>
     *     <li>down</li>
     *     <li>list</li>
     *     <li>listview</li>
     *     <li>detail</li>
     *     <li>add</li>
     *     <li>plus</li>
     *     <li>remove</li>
     *     <li>minus</li>
     *     <li>upload</li>
     *     <li>download</li>
     *     <li>search</li>
     *     <li>setting</li>
     *     <li>settings</li>
     *     <li>tool</li>
     *     <li>tools</li>
     *     <li>home</li>
     *     <li>fav</li>                 
     *     <li>favorite</li>
     *     <li>favourite</li>
     *     <li>star</li>
     *     <li>question</li>
     *     <li>help</li>                    
     *     <li>cloud</li>                    
     *     <li>user</li>
     *     <li>role</li>
     *     <li>time</li>
     *     <li>clock</li>
     *     <li>date</li>                    
     *     <li>calendar</li>                    
     *     <li>meter</li>
     *     <li>performance</li>                    
     *     <li>tag</li>                    
     *     <li>tags</li>
     *     <li>feed</li>
     *     <li>rss</li>
     *     <li>key</li>                                      
     *     <li>password</li>
     *     <li>love</li>
     *     <li>heart</li>
     *     <li>welcome</li>                  
     *     <li>cube</li>
     *     <li>object</li>
     *     <li>shop</li>
     *     <li>file</li>
     *     <li>doc</li>
     *     <li>document</li>
     *     <li>folder</li>
     *     <li>image</li>               
     *     <li>picture</li>
     *     <li>chart</li>
     *     <li>curve</li>
     *     <li>mail</li>              
     *     <li>message</li>
     *     <li>info</li>
     *     <li>warn</li>
     *     <li>warning</li>           
     *     <li>error</li>
     *     <li>forbid</li>
     *     <li>forbidden</li>
     *     <li>loading</li>                
     *     <li>busy</li>
     *     <li>waiting</li>
     *     <li>alarm</li>
     *     <li>new</li>          
     *     <li>create</li>
     *     <li>delete</li>
     *     <li>send</li>
     *     <li>refresh</li>           
     *     <li>ok</li>
     *     <li>save</li>
     *     <li>check</li>
     *     <li>complete</li>              
     *     <li>finish</li>
     *     <li>edit</li>
     *     <li>lock</li>
     *     <li>unlock</li>
     *     <li>dialog</li>
     *   </ul>
     * </p>
     */
    me.getSymbol = function(p_name)
    {
        if (p_name == null) return null;
        
        var font = "pictos";
        var text = null;
        switch (p_name.toLowerCase())
        {
            case "left":
                text = "[";
                break;
            case "right":
                text = "]";
                break;
            case "up":
                text = "{";
                break;
            case "down":
                text = "}";
                break;
        
        
            case "list":
            case "listview":
                text = "l";
                break;
            case "detail":
            case "detailview":
                text = "n";
                break;
                
            case "add":
            case "plus":
                text = "&";
                break;
            case "remove":
            case "minus":
                text = "_";
                break;
                
            
            case "upload":
                text = "c";
                break;
            case "download":
                text = "~";
                break;
                
            case "search":
                text = "s";
                break;
            case "setting":
            case "settings":
                text = "y";
                break;
            case "tool":
            case "tools":
                text = "x";
                break;
            case "home":
                text = "H";
                break;
            case "fav":
            case "favorite":
            case "favourite":
            case "star":
                text = "S";
                break;    
            case "question":
            case "help":
                text = "?";
                break;
            case "cloud":
                text = "C";
                break;
            case "user":
                text = "U";
                break;
            case "users":
            case "role":
                text = "g";
                break;
            case "time":
            case "clock":
                text = "t";
                break;        
            case "date":
            case "calendar":
                text = "\\";
                break;
            case "meter":
            case "performance": 
                text = ",";
                break;
            case "tag":
            case "tags":
                text = "z";
                break;
            case "feed":
            case "rss":
                text = "f";
                break;
            case "key":
            case "password":
                text = "K";
                break;
            case "love":
            case "heart":
            case "welcome":
                text = "k";
                break;
            case "cube":
            case "object":
                text = "b";
                break;
            case "shop":
                text = "$";
                break;     
            case "file":
                text = "F";
                break;
            case "doc":
            case "document":
                text = "N";
                break;
            case "folder":
                text = "o";
                break;
            case "image":
            case "picture":
                text = "P";
                break;
            case "chart":
                text = "Z";
                break;
            case "curve":
                text = "Y";
                break;
            case "mail":
            case "message":
                text = "M";
                break;
                
                
                
            case "info":
                text = "i";
                break;
            case "warn":
            case "warning":
                text = "!";
                break;       
            case "error":
                text = "D";
                break;
            case "forbid":
            case "forbidden":
                text = "d";
                break;
            case "loading":
            case "busy":
            case "waiting":
                text = "t";
                break;
            case "alarm":
                text = ":";
                break;

            case "new":
            case "create":
                text = "&";
                break;
            case "delete":
                text = "*";
                break;
            case "send":
                text = "R";
                break;
            case "refresh":
                text = "r";
                break;
            case "ok":
            case "save":
            case "check":
                text = "2";
                break;
            case "complete":
            case "finish":
                text = "^";
                break;
            case "edit":
                text = "W";
                break;
            case "lock":
                text = "(";
                break;
            case "unlock":
                text = ")";
                break;
            case "dialog":
                text = ".";
                break;
        }
        if (text != null)
        {
            return { font:font, text: text };
        }
        else
        {
            return null;
        }
    };
    
    return me;
};

mx.utils.SymbolUtil = new mx.utils.SymbolUtilClass(); 
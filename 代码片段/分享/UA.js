!function(e, r) {
    "use strict";
    "function" == typeof define ? define("UA/1.0.0/UA", [], function(o) {
        return r(e, o)
    }) : "object" == typeof exports ? module.exports = r(e) : window.UA = r(e)
}(window, function() {
    "use strict";
    var e = window.document
      , r = window.navigator
      , o = r.userAgent.toLowerCase()
      , i = e.documentMode
      , n = window.chrome || !1
      , s = {
        agent: o,
        isIE: /msie/.test(o),
        isGecko: -1 !== o.indexOf("gecko") && o.indexOf("like gecko") < 0,
        isWebkit: -1 !== o.indexOf("webkit"),
        isStrict: "CSS1Compat" === e.compatMode,
        os: {},
        supportSubTitle: function() {
            return "track"in e.createElement("track")
        },
        supportScope: function() {
            return "scoped"in e.createElement("style")
        },
        ieVersion: function() {
            try {
                return o.match(/msie ([\d.]+)/)[1] || 0
            } catch (e) {
                return console.log("error"),
                i
            }
        },
        operaVersion: function() {
            var e = "0";
            try {
                window.opera ? e = o.match(/opera.([\d.]+)/)[1] : -1 !== o.indexOf("opr") && (e = o.match(/opr\/([\d.]+)/)[1])
            } catch (r) {
                console.log("error"),
                e = 0
            }
            return e
        },
        versionFilter: function() {
            if (1 === arguments.length && "string" == typeof arguments[0]) {
                var e = arguments[0]
                  , r = e.indexOf(".");
                if (-1 !== r) {
                    var o = e.indexOf(".", r + 1);
                    if (-1 !== o)
                        return e.substr(0, o)
                }
                return e
            }
            return 1 === arguments.length ? arguments[0] : 0
        }
    };
    try {
        if (-1 !== o.indexOf("macintosh"))
            s.os = "Mac";
        else if (-1 !== o.indexOf("windows"))
            s.os = "Windows";
        else if (-1 !== o.indexOf("iphone") || -1 !== o.indexOf("ipad") || -1 !== o.indexOf("ios")) {
            s.os = "ios";
            try {
                s.osVer = parseInt(o.match(/os\s+\d+(_\d+)*/g)[0].match(/\d+/g)[0])
            } catch (t) {
                s.osVer = "9"
            }
        } else
            -1 === o.indexOf("android") && -1 === o.indexOf("adr") && -1 === o.indexOf("linux;") || (s.os = "android");
        s.isIE ? s.type = "IE" : window.opera || -1 !== o.indexOf("opr") ? s.type = "Opera" : -1 !== o.indexOf("chrome") ? s.type = "Chrome" : -1 !== o.indexOf("firefox") ? s.type = "Firefox" : -1 !== o.indexOf("safari") && window.openDatabase ? s.type = "Safari" : s.type = "unknow",
        "IE" === s.type ? s.version = s.ieVersion() : "Firefox" === s.type ? s.version = o.match(/firefox\/([\d.]+)/) ? o.match(/firefox\/([\d.]+)/)[1] : "0" : "Chrome" === s.type ? s.version = o.match(/chrome\/([\d.]+)/) ? o.match(/chrome\/([\d.]+)/)[1] : "0" : "Opera" === s.type ? s.version = s.operaVersion() : "Safari" === s.type ? s.version = o.match(/version\/([\d.]+)/) ? o.match(/version\/([\d.]+)/)[1] : "0" : s.version = "0",
        s.shell = function() {
            var r = "track"in e.createElement("track")
              , i = "unknow";
            if (-1 !== o.indexOf("micromessenger"))
                s.version = o.match(/micromessenger\/([\d.]+)/)[1] || s.version,
                i = "微信客户端";
            else if (-1 !== o.indexOf("qq/"))
                s.version = o.match(/qq\/([\d.]+)/)[1] || s.version,
                i = "QQ客户端";
            else if (-1 !== o.indexOf("weibo"))
                s.version = o.match(/weibo__([\d.]+)/)[1] || s.version,
                i = "微博客户端";
            else if (-1 !== o.indexOf("qzone/"))
                s.version = o.match(/qzone\/([\d.]+)/)[1] || s.version,
                i = "QQZone客户端";
            else if (/firefox\/|fxios\//.test(o))
                s.version = o.match(/(?:firefox\/|fxios\/)(\d+\.\d+)?/) && o.match(/(?:firefox\/|fxios\/)(\d+\.\d+)?/)[1] || s.version,
                i = "火狐浏览器";
            else if (-1 !== o.indexOf("ucbrowser/"))
                s.version = o.match(/ucbrowser\/([\d.]+)/)[1] || s.version,
                i = "UC浏览器";
            else if (-1 !== o.indexOf("qqbrowser/"))
                s.version = o.match(/qqbrowser\/([\d.]+)/)[1] || s.version,
                i = "QQ浏览器";
            else if (-1 !== o.indexOf("sogou"))
                s.version = o.match(/browser\/([\d.]+)/)[1] || s.version,
                i = "搜狗浏览器";
            else if (-1 !== o.indexOf("maxthon"))
                s.version = o.match(/maxthon\/([\d.]+)/)[1] || s.version,
                i = "傲游浏览器";
            else if (-1 !== o.indexOf("baidubrowser"))
                s.version = o.match(/baidubrowser\/([\d.]+)/)[1] || o.match(/chrome\/([\d.]+)/)[1],
                i = "百度浏览器";
            else if (-1 !== o.indexOf("lbbrowser") || -1 !== o.indexOf("liebaofast"))
                s.version = o.match(/lbbrowser\/([\d.]+)/) && o.match(/lbbrowser\/([\d.]+)/)[1] || o.match(/liebaofast\/([\d.]+)/) && o.match(/liebaofast\/([\d.]+)/)[1],
                i = "猎豹浏览器";
            else if (/samsungbrowser\//.test(o))
                s.version = o.match(/samsungbrowser\/([\d.]+)/) && o.match(/samsungbrowser\/([\d.]+)/)[1],
                i = "三星浏览器";
            else if (-1 !== o.indexOf("qhbrowser"))
                s.version = o.match(/qhbrowser\/([\d.]+)/) && o.match(/qhbrowser\/([\d.]+)/)[1] || s.version,
                i = "360浏览器";
            else if (-1 !== o.indexOf("crios"))
                s.version = o.match(/crios\/([\d.]+)/) && o.match(/crios\/([\d.]+)/)[1] || s.version,
                i = "Chrome";
            else if (n && "Opera" !== s.type) {
                if (r) {
                    s.version = o.match(/qhbrowser\/([\d.]+)/) && o.match(/qhbrowser\/([\d.]+)/)[1] || s.version;
                    var t = parseInt(s.version);
                    i = (t > 48 || 10 > t) && r ? "Chrome" : "360浏览器"
                }
            } else if ("ios" === s.os) {
                var a = o.match(/safari\/([\d.]+)/) && parseInt(o.match(/safari\/([\d.]+)/)[1]);
                i = a > 1e3 ? "other" : s.type
            } else
                i = "other";
            return i
        }
        ,
        s.name = s.shell(),
        s.version = s.versionFilter(s.version)
    } catch (t) {
        console.error("error:", t)
    }
    return s
});

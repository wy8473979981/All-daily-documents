!function(e, i) {
    "use strict";
    "function" == typeof define ? define("superShare/1.0.1/superShare", ["jquery", "UA/1.0.0/UA"], function(t) {
        t("jquery");
        return e.UA = t("UA/1.0.0/UA"),
        i(e, t)
    }) : "object" == typeof exports ? module.exports = i(e) : window.SuperShare = i(e)
}(window, function(e, i) {
    function t(i) {
        function t(e, i) {
            var t, a, s;
            for (a in i)
                s = i[a],
                t = new RegExp("(" + a + "=)[^&]+","i"),
                e.match(t) ? e = e.replace(t, "$1" + s) : e += e.indexOf("?") === -1 ? "?" + a + "=" + s : "&" + a + "=" + s;
            return e
        }
        function s(e) {
            var i = document.createElement("div");
            i.style.visibility = "hidden",
            i.innerHTML = '<iframe src= "' + e + '" scrolling="no" width="1" height="1"></iframe>',
            document.body.appendChild(i),
            setTimeout(function() {
                i && i.parentNode && i.parentNode.removeChild(i)
            }, 5e3)
        }
        i = i || {};
        var r = this;
        if (this.url = i.url || document.location.href || "",
        this.title = i.title || $("title").text() || "",
        this.desc = i.desc || $("meta[name=description]").attr("content") || this.title,
        this.image = i.image || "",
        this.from = i.from || "\u623f\u5929\u4e0b",
        this.newsid = i.newsid || "",
        this.sohupassport = i.passport || "",
        this.appList = {
            sinaweibo: ["kSinaWeibo", "SinaWeibo", 11, "\u65b0\u6d6a\u5fae\u535a"],
            wechatfriends: ["kWeixin", "WechatFriends", 1, "\u5fae\u4fe1\u597d\u53cb"],
            wechattimeline: ["kWeixinFriend", "WechatTimeline", "8", "\u5fae\u4fe1\u670b\u53cb\u5708"],
            qq: ["kQQ", "QQ", "4", "QQ\u597d\u53cb"],
            qzone: ["kQZone", "QZone", "3", "QQ\u7a7a\u95f4"]
        },
        this.successCallback = i.successCallback || "",
        this.failCallback = i.failCallback || "",
        this.timer = null,
        this.timer2 = null,
        this.ua = window.UA,
        !window.UA)
            return void console.error("\u8bf7\u5f15\u5165UA.js");
        var o = navigator.userAgent.toLowerCase();
        "\u5fae\u4fe1\u5ba2\u6237\u7aef" === this.ua.name && (this.url += "&source=weixin_fx"),
        this.msgObj = $('<div id="msg"><p>\u5206\u4eab\u5931\u8d25\uff01\u8bf7\u76f4\u63a5\u590d\u5236\u94fe\u63a5\u5e76\u6253\u5f00\u5ba2\u6237\u7aef\u8fdb\u884c\u5206\u4eab\uff01</p></div>');
        var n = $(document.body);
        this.msgObj.css({
            position: "fixed",
            left: "50%",
            top: "90%",
            zIndex: 1999,
            textAlign: "center",
            width: "11rem",
            background: "rgba(0, 0, 0, 0.6)",
            padding: "0.5rem",
            marginLeft: "-5.5rem",
            marginTop: "-4rem",
            borderRadius: "0.4rem",
            color: "#fff",
            fontSize: "14px",
            display: "none"
        }).appendTo(n),
        this.imgUrl = i.imgUrl+"/images/wap/",
        // 包含朋友圈 微信好友 QQ好友 QQ空间 新浪微博
        // this.shareFloat = $('<div class="share-s1 none"><h2>\u5206\u4eab\u5230</h2><div class="shareCon"><ul><li class="sns" data-app="wechattimeline"><a href="javascript:;"><i class="pyq"></i><p>\u670b\u53cb\u5708</p></a></li><li class="sns" data-app="wechatfriends"> <a href="javascript:;"><i class="wx"></i><p>\u5fae\u4fe1\u597d\u53cb</p></a></li><li class="sns" data-app="qq"><a href="javascript:;"><i class="qq"></i><p>QQ\u597d\u53cb</p></a></li></ul><ul><li class="sns" data-app="qzone"><a href="javascript:;"><i class="zoom"></i><p>QQ\u7a7a\u95f4</p></a></li><li class="sns" data-app="sinaweibo"><a href="javascript:;"><i class="wb"></i><p>\u65b0\u6d6a\u5fae\u535a</p></a></li></ul></div><div class="btn"><a href="javascript:;">\u53d6\u6d88</a></div></div>'),
        // 包含朋友圈 微信好友 QQ好友
        this.shareFloat = $('<div class="share-s1 none"><h2>\u5206\u4eab\u5230</h2><div class="shareCon"><ul><li class="sns" data-app="wechattimeline"><a href="javascript:;"><i class="pyq"></i><p>\u670b\u53cb\u5708</p></a></li><li class="sns" data-app="wechatfriends"> <a href="javascript:;"><i class="wx"></i><p>\u5fae\u4fe1\u597d\u53cb</p></a></li><li class="sns" data-app="qq"><a href="javascript:;"><i class="qq"></i><p>QQ\u597d\u53cb</p></a></li></ul></div><div class="btn"><a href="javascript:;">\u53d6\u6d88</a></div></div>'),
        this.safariFloat = $('<div class="share-s2 bg2 none"><div class="pic3"><img src="' + this.imgUrl + 'share_a1.png" width="100%"><img src="' + this.imgUrl + 'share_a2.png" width="100%"><img src="' + this.imgUrl + 'share_a3.png" width="100%"><img src="' + this.imgUrl + 'share_a4.png" width="100%"></div><a href="javascript:;" class="share-btn"><img src="' + this.imgUrl + 'share_know.png"></a></div>'),
        this.weixinFloat = $('<div class="share-bg" onclick="$(\'.share-bg\').fadeOut(200);"></div>');
        this.otherFloat = $('<div class="share-s2 none"><div class="share-b"><a href="javascript:;" class="share-btn"><img src="' + this.imgUrl + 'share_know.png"></a><div class="pic2"><img src="' + this.imgUrl + 'share_pic2.png" width="100%"></div></div></div>'),
        this.floatMask = $('<div class="float-mask"></div>'),
        this.shareFloat.appendTo(n).find(".btn").on("click", function() {
            r.hideFloat()
        }),
        this.safariFloat.appendTo(n),
        this.weixinFloat.appendTo(n),
        this.otherFloat.appendTo(n),
        this.floatMask.appendTo(n),
        this.safariFloat.add(this.weixinFloat).add(this.otherFloat).find(".share-btn").on("click", function() {
            $(".share-s2").hide()
        }),
        this.hideFloat = function() {
            r.shareFloat.hide(),
            r.floatMask.removeClass("mask-visible")
        }
        ,
        this.showMsg = function(e, i, t) {
            e = e || "\u4fe1\u606f\u6709\u8bef\uff01",
            i = i || 1500;
            var a = this;
            a.msgObj.find("p").html(e),
            a.msgObj.fadeIn(),
            clearTimeout(a.timer),
            a.timer = setTimeout(function() {
                a.msgObj.fadeOut(),
                t && t()
            }, i)
        }
        ,
        this.showObj = function(e, i, t) {
            i = i || "";
            var a = this;
            e.fadeIn(),
            i && (clearTimeout(a.timer2),
            a.timer2 = setTimeout(function() {
                e.fadeOut(),
                t && t()
            }, i))
        }
        ,
        this.getVersion = function(e) {
            var i = e.split(".");
            return parseFloat(i[0] + "." + i[1])
        }
        ,
        this.shareWebQzone = function() {
            var i = "http://openmobile.qq.com/api/check2?page=qzshare.html&loginpage=loginindex.html&logintype=qzone"
              , t = this.desc.substring(0, 200)
              , a = ["title=" + encodeURIComponent(this.title), "imageUrl=" + encodeURIComponent(this.image), "desc=" + encodeURIComponent(t), "summary=" + encodeURIComponent(t), "url=" + this.url, "successUrl=" + this.url, "failUrl=" + this.url, "callbackUrl=" + this.url].join("&");
            e.location.href = i + "&" + a
        }
        ,
        this.shareto = function(i) {
            var a, r = this.url, o = this, n = this.ua, h = this.title, l = this.desc, c = this.image, d = this.from, p = this.failCallback, m = 0;
            if ("qzone" === i) {
                r = Base64Obj.encode(t(r, {
                    source: "qqkj_fx"
                })),
                c = Base64Obj.encode(c),
                h = Base64Obj.encode(h),
                l = Base64Obj.encode(l),
                d = Base64Obj.encode(d);
                var f = {
                    android: "mqqapi://share/to_qzone?src_type=app&version=1&file_type=news&req_type=1",
                    ios: "mqqapi://share/to_fri?file_type=news&src_type=app&version=1&generalpastboard=1&shareType=1&cflag=1&objectlocation=pasteboard&callback_type=scheme&callback_name=QQ41AF4B2A&"
                };
                Date.now();
                "android" === n.os ? "UC\u6d4f\u89c8\u5668" === n.name ? s(t(f.android, {
                    url: r,
                    image_url: c,
                    title: h,
                    description: l,
                    app_name: d
                })) : e.location.href = t(f.android, {
                    url: r,
                    previewimageUrl: c,
                    title: h,
                    description: l,
                    thirdAppDisplayName: d
                }) : "Safari" !== n.name ? e.location.href = t(f.ios, {
                    url: r,
                    previewimageUrl: c,
                    title: h,
                    description: l,
                    thirdAppDisplayName: d
                }) : o.showObj(o.safariFloat),
                setTimeout(function() {
                    p && p(),
                    "Chrome" === n.name || "android" === n.os && "\u706b\u72d0\u6d4f\u89c8\u5668" === n.name ? o.showObj(o.weixinFloat) : "Safari" !== n.name && o.showObj(o.otherFloat)
                }, 1e3)
            } else if ("qq" === i)
                r = t(r, {
                    source: "qq_fx"
                }),
                "Safari" !== n.name ? e.location.href = t("mqqapi://share/to_fri?src_type=web&version=1&file_type=news", {
                    share_id: "1101685683",
                    title: Base64Obj.encode(h),
                    thirdAppDisplayName: Base64Obj.encode("\u623f\u5929\u4e0b"),
                    url: Base64Obj.encode(r)
                }) : o.showObj(o.safariFloat),
                setTimeout(function() {
                    p && p(),
                    "Chrome" === n.name || "android" === n.os && "\u706b\u72d0\u6d4f\u89c8\u5668" === n.name ? o.showObj(o.weixinFloat) : "Safari" !== n.name && o.showObj(o.otherFloat)
                }, 1e3);
            else if ("wechatfriends" === i || "wechattimeline" === i)
                if ("QQ\u6d4f\u89c8\u5668" === n.name) {
                    i = this.appList[i][2];
                    var u = {
                        url: r,
                        title: h,
                        img_url: c,
                        to_app: i,
                        cus_txt: h + " @\u623f\u5929\u4e0b "
                    };
                    browser && browser.app && browser.app.share ? browser.app.share(u) : console.log("QQBrowser native share bypass.")
                } else {
                    r = t(r, {
                        shareApp: i,
                        source: "wechatfriends" === i ? "weixinhaoyou_fx" : "weixinpengyouquan_fx"
                    }),
                    "Safari" !== n.name ? "ios" === n.os && n.osVer > 8 ? e.location.href = "mttbrowser://url=" + r : s("mttbrowser://url=" + r) : o.showObj(o.safariFloat);
                    var g = function b() {
                        m += 1,
                        m < 3 ? (clearTimeout(a),
                        a = setTimeout(b, 600)) : (p && p(),
                        "Chrome" === n.name || "android" === n.os && "\u706b\u72d0\u6d4f\u89c8\u5668" === n.name ? o.showObj(o.weixinFloat) : "Safari" !== n.name && o.showObj(o.otherFloat))
                    };
                    a = setTimeout(g, 600)
                }
            else if ("sinaweibo" === i) {
                r = t(r, {
                    source: "xinlangweibo_fx"
                });
                var w = t("http://service.weibo.com/share/mobile.php?", {
                    title: h,
                    url: r,
                    appkey: "3427098291",
                    pic: c,
                    ralateUid: "",
                    count: "",
                    size: "middle"
                });
                e.location.href = "https://passport.weibo.cn/signin/login?entry=mweibo&res=wel&wm=3349&r=" + encodeURIComponent(w)
            }
        }
        ,
        this.pinganWifiShareTo = function(i) {
            var a = t(this.url, {
                _once_: h.shareback + i + "_pinganwifi"
            });
            if (console.log("inter pingan wifi"),
            "sohuwd" === i) {
                var s;
                s = "undefined" == typeof gallery ? 3 : 4,
                e.location.href = t("http://h5.t.sohu.com/feed/share", {
                    url: a,
                    id: this.newsid,
                    type: s,
                    title: this.title,
                    pic: this.image,
                    passport: this.sohupassport
                })
            } else
                e.location.href = t("pawifishare://", {
                    method: "sohuShare",
                    shareType: i,
                    title: Base64Obj.encode(this.title || ""),
                    url: Base64Obj.encode(a),
                    subtitle: Base64Obj.encode(this.desc || ""),
                    imgurl: Base64Obj.encode(this.image || "")
                })
        }
        ,
        this.shareWechatByQQBrowser = function() {
            var i = e.location.href.match(/shareApp=(\w+)/i);
            if (i) {
                var t = i[1];
                $.isFunction(history.replaceState) && (history.replaceState(null, document.title, location.href.replace(/&shareApp=wechatfriends/g, "")),
                history.replaceState(null, document.title, location.href.replace(/&shareApp=wechattimeline/g, "")),
                r.shareto(t))
            }
        }
        ;
        var l = {
            lower: "//3gimg.qq.com/html5/js/qb.js",
            higher: "//jsapi.qq.com/get?api=app.share"
        }
          , c = {
            uc: "",
            qq: ""
        };
        c.qq = "QQ\u6d4f\u89c8\u5668" === r.ua.name ? this.getVersion(o.split("mqqbrowser/")[1]) : 0,
        c.uc = "UC\u6d4f\u89c8\u5668" === r.ua.name ? this.getVersion(o.split("ucbrowser/")[1]) : 0,
        this.loadqqApi = function(e) {
            var i = c.qq < 5.4 ? l.lower : l.higher
              , t = document.createElement("script")
              , a = document.getElementsByTagName("body")[0];
            t.src = i,
            a.appendChild(t),
            t.onload = function() {
                e && e()
            }
        }
        ,
        this.shareByUC = function() {
            var e = t(r.url, {
                source: "weixinpengyouquan_fx"
            });
            "undefined" != typeof ucweb ? ucweb.startRequest("shell.page_share", [r.title, r.desc, e, "", "", "", ""]) : "undefined" != typeof ucbrowser && ucbrowser.web_share(r.title, r.desc, e, "", "", "", "")
        }
        ,
        this.shareByQQ = function(e) {
            var i = t(r.url, {
                source: "weixinpengyouquan_fx"
            })
              , a = {
                url: i,
                title: r.title,
                description: r.desc,
                img_url: "android" === r.ua.os ? "" : r.image,
                toApp: e || "",
                cusTxt: r.title + " @\u623f\u5929\u4e0b"
            };
            "undefined" != typeof browser ? "undefined" != typeof browser.app && browser.app.share(a) : "undefined" != typeof window.qb && window.qb.share(a)
        }
        ,
        this.shareBytdApp = function() {
            var e = this;
            /SFLand_iOS/i.test(o) ? shareiOS(e.url, e.title, e.image) : /SFLand_Android/i.test(o) && jsObj.shareAndroid(e.url, e.title, e.image)
        }
        ,
        this.updateConfig = function(e) {
            this.url = e.url || document.location.href || "",
            this.title = e.title || $("title").text() || "",
            this.desc = e.desc || $("meta[name=description]").attr("content") || this.title,
            this.image = e.image || "",
            this.from = e.from || "\u623f\u5929\u4e0b",
            this.successCallback = e.successCallback || "",
            this.failCallback = e.failCallback || ""
        }
        ,
        this.init = function() {
            var e = this.ua;
            "QQ\u6d4f\u89c8\u5668" === e.name ? r.loadqqApi(function() {
                r.shareWechatByQQBrowser()
            }) : "UC\u6d4f\u89c8\u5668" === e.name && (e.version = this.getVersion(o.split("ucbrowser/")[1]))
        }
        ,
        this.init(),
        $(".sns").on("click", function(e) {
            var i = $(this).attr("data-app");
            r.hideFloat(),
            "PinganWifi" === r.ua.name ? r.pinganWifiShareTo(i) : r.shareto(i, e)
        }),
        r.floatMask.on("click", function() {
            r.hideFloat()
        }),
        $(".share").on("click", function() {
            var e = r.ua;
            a && a.isFangApp ? r.weixinFloat.show() : /SFLand_iOS|SFLand_Android/i.test(o) ? r.shareBytdApp() : "\u5fae\u4fe1\u5ba2\u6237\u7aef" === e.name || "\u5fae\u535a\u5ba2\u6237\u7aef" === e.name || "QQ\u5ba2\u6237\u7aef" === e.name || "QQZone\u5ba2\u6237\u7aef" === e.name ? r.weixinFloat.show() : "UC\u6d4f\u89c8\u5668" === e.name && ("android" === e.os && e.version < 11 || "ios" === e.os) ? r.shareByUC() : "QQ\u6d4f\u89c8\u5668" === e.name ? r.shareByQQ() : (r.floatMask.addClass("mask-visible"),
            r.shareFloat.show())
        })
    }
    var a = null
      , s = window.seajs;
    return s && s.data && s.data.vars && (a = s.data.vars),
    e.Base64Obj = {
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        encode: function(e) {
            var i, t, a, s, r, o, n, h = "", l = 0;
            for (e = Base64Obj._utf8_encode(e); l < e.length; )
                i = e.charCodeAt(l++),
                t = e.charCodeAt(l++),
                a = e.charCodeAt(l++),
                s = i >> 2,
                r = (3 & i) << 4 | t >> 4,
                o = (15 & t) << 2 | a >> 6,
                n = 63 & a,
                isNaN(t) ? o = n = 64 : isNaN(a) && (n = 64),
                h = h + this._keyStr.charAt(s) + this._keyStr.charAt(r) + this._keyStr.charAt(o) + this._keyStr.charAt(n);
            return h
        },
        decode: function(e) {
            var i, t, a, s, r, o, n, h = "", l = 0;
            for (e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); l < e.length; )
                s = this._keyStr.indexOf(e.charAt(l++)),
                r = this._keyStr.indexOf(e.charAt(l++)),
                o = this._keyStr.indexOf(e.charAt(l++)),
                n = this._keyStr.indexOf(e.charAt(l++)),
                i = s << 2 | r >> 4,
                t = (15 & r) << 4 | o >> 2,
                a = (3 & o) << 6 | n,
                h += String.fromCharCode(i),
                64 != o && (h += String.fromCharCode(t)),
                64 != n && (h += String.fromCharCode(a));
            return h = Base64Obj._utf8_decode(h)
        },
        _utf8_encode: function(e) {
            e = e.replace(/\r\n/g, "\n");
            for (var i = "", t = 0; t < e.length; t++) {
                var a = e.charCodeAt(t);
                128 > a ? i += String.fromCharCode(a) : a > 127 && 2048 > a ? (i += String.fromCharCode(a >> 6 | 192),
                i += String.fromCharCode(63 & a | 128)) : (i += String.fromCharCode(a >> 12 | 224),
                i += String.fromCharCode(a >> 6 & 63 | 128),
                i += String.fromCharCode(63 & a | 128))
            }
            return i
        },
        _utf8_decode: function(e) {
            for (var i = "", t = 0, a = c1 = c2 = 0; t < e.length; )
                a = e.charCodeAt(t),
                128 > a ? (i += String.fromCharCode(a),
                t++) : a > 191 && 224 > a ? (c2 = e.charCodeAt(t + 1),
                i += String.fromCharCode((31 & a) << 6 | 63 & c2),
                t += 2) : (c2 = e.charCodeAt(t + 1),
                c3 = e.charCodeAt(t + 2),
                i += String.fromCharCode((15 & a) << 12 | (63 & c2) << 6 | 63 & c3),
                t += 3);
            return i
        }
    },
    t
});


// 所有分享，调用时需实例AllShare，并init方法
function AllShare(){
    
}
AllShare.prototype.init = function(obj){
    // 设置微信分享
    new Wechat_api({
        shareJson: {
            title: obj.name, // 分享标题
            link: obj.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: obj.image, // 分享图标
        }
    })

    /* 外部浏览器分享 测试代码start */
    new SuperShare({
        title: obj.name, // 分享标题
        url: obj.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        image: obj.image, // 分享图标
        desc: obj.desc,
        imgUrl: obj.imgBaseUrl
    });
    /* 外部浏览器分享 测试代码end */
}
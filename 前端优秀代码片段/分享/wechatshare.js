var weiXinShare = {
    init: function (e) {
        var n = window.location.href;
        n = encodeURIComponent(n);
        var t = window.location.protocol + "//" + window.location.host + "/mobile/index.php?act=mshop&op=signurl&client_type=ajax&sign_url=" + n + "&callback=";
        this.getJSONP(t, function (e) {
            var n = e.datas, t = n.timestamp, i = n.noncestr, o = n.signature, a = n.appid;
            wx.config({
                debug: !1,
                appId: a,
                timestamp: t,
                nonceStr: i,
                signature: o,
                jsApiList: ["checkJsApi", "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone", "getNetworkType", "hideOptionMenu", "showOptionMenu", "chooseWXPay"]
            })
        }), this.ready(e)
    }, getJSONP: function (e, n) {
        var t = "callback" + +new Date, i = document.createElement("script");
        i.type = "text/javascript", i.charset = "UTF-8", i.src = e + t, heads = document.head || document.getElementsByTagName("head")[0];
        var o = heads.appendChild(i);
        setTimeout(function () {
            window[t] = function (e) {
                try {
                    i.onload = i.onreadystatechange = function () {
                        n && n(e)
                    }
                } catch (e) {
                } finally {
                    setTimeout(function () {
                        heads && i.parentNode && o.parentNode.removeChild(o), window[t] = null
                    }, 3e3)
                }
            }
        }, 0)
    }, ready: function (e) {
        wx.ready(function () {
            wx.onMenuShareTimeline({
                title: e.title, desc: e.desc, link: e.link, imgUrl: e.imgUrl, trigger: function (e) {
                }, success: function (e) {
                }, cancel: function (e) {
                }, fail: function (e) {
                }
            }), wx.onMenuShareAppMessage({
                title: e.title,
                desc: e.desc,
                link: e.link,
                imgUrl: e.imgUrl,
                trigger: function (e) {
                },
                success: function (e) {
                }
            }), wx.error(function (e) {
                alert(e.errMsg)
            }), wx.onMenuShareQQ({
                title: e.title, desc: e.desc, link: e.link, imgUrl: e.imgUrl, success: function () {
                }, cancel: function () {
                }
            })
        })
    }
};

(function(w){
    var wx_URL = '/index.php/Tjj/wx/share';
    function Wechat_api(params){
        this.shareJson = params.shareJson;
        // console.log(this.shareJson)
        this.config();
    };
    // 配置
    Wechat_api.prototype.config = function(){
        var self = this;
        var _url = self.shareJson.link ? self.shareJson.link : window.location.href;
        $.get(wx_URL, {url: _url.replace(/"/g,'%22')} ,function(data){
            // console.log(data);
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: data.appId, // 必填，公众号的唯一标识
                timestamp: data.timestamp, // 必填，生成签名的时间戳
                nonceStr: data.nonceStr, // 必填，生成签名的随机串
                signature: data.signature,// 必填，签名
                jsApiList: data.jsApiList // 必填，需要使用的JS接口列表
            });
            self.ready();
        },'json')
    };
    // ready方法
    Wechat_api.prototype.ready = function(){
        var self = this;
        wx.ready(function(){
            self.shareJson && Object.keys(self.shareJson).length > 0 ? self.share() : '';
        })
    };
    Wechat_api.prototype.pay = function(params){
        var self = this;
        wx.chooseWXPay({
            // appId: self.appId, // 必填，公众号的唯一标识
            timestamp: params.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr: params.nonceStr, // 支付签名随机串，不长于 32 位
            package: params.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
            signType: params.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: params.paySign, // 支付签名
            success: function (res) {
                // 支付成功后的回调函数
                typeof params.success == 'function' ? params.success(res) : '';
            }
        });
    }
    // 分享
    Wechat_api.prototype.share = function(){
        var self = this;
        console.log(self)
        // 朋友
        wx.onMenuShareAppMessage({
            title: self.shareJson.title ? self.shareJson.title : document.title, // 分享标题
            desc: self.shareJson.desc ? self.shareJson.desc : '精品好货，物美价廉，尽在淘集集', // 分享描述
            link: self.shareJson.link ? self.shareJson.link : window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: self.shareJson.imgUrl ? self.shareJson.imgUrl : '../../../wap/images/tjj_logo.png', // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户确认分享后执行的回调函数
                typeof self.shareJson.success == 'function' ? self.shareJson.success() : null;
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                typeof self.shareJson.cancel == 'function' ? self.shareJson.cancel() : null;
            }
        });
        // 朋友圈
        wx.onMenuShareTimeline({
            title: self.shareJson.title ? self.shareJson.title : document.title, // 分享标题
            link: self.shareJson.link ? self.shareJson.link : window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: self.shareJson.imgUrl ? self.shareJson.imgUrl : '../../../wap/images/tjj_logo.png', // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                typeof self.shareJson.success == 'function' ? self.shareJson.success() : null;
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                typeof self.shareJson.cancel == 'function' ? self.shareJson.cancel() : null;
            }
        });
        // QQ
        wx.onMenuShareQQ({
            title: self.shareJson.title ? self.shareJson.title : document.title, // 分享标题
            desc: self.shareJson.desc ? self.shareJson.desc : '精品好货，物美价廉，尽在淘集集', // 分享描述
            link: self.shareJson.link ? self.shareJson.link : window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: self.shareJson.imgUrl ? self.shareJson.imgUrl : '../../../wap/images/tjj_logo.png', // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                typeof self.shareJson.success == 'function' ? self.shareJson.success() : null;
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                typeof self.shareJson.cancel == 'function' ? self.shareJson.cancel() : null;
            }
        });
        //分享到腾讯微博
        wx.onMenuShareWeibo({
            title: self.shareJson.title ? self.shareJson.title : document.title, // 分享标题
            desc: self.shareJson.desc ? self.shareJson.desc : '精品好货，物美价廉，尽在淘集集', // 分享描述
            link: self.shareJson.link ? self.shareJson.link : window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: self.shareJson.imgUrl ? self.shareJson.imgUrl : '../../../wap/images/tjj_logo.png', // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                typeof self.shareJson.success == 'function' ? self.shareJson.success() : null;
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                typeof self.shareJson.cancel == 'function' ? self.shareJson.cancel() : null;
            }
        });
        // 分享到QQ空间
        wx.onMenuShareQZone({
            title: self.shareJson.title ? self.shareJson.title : document.title, // 分享标题
            desc: self.shareJson.desc ? self.shareJson.desc : '精品好货，物美价廉，尽在淘集集', // 分享描述
            link: self.shareJson.link ? self.shareJson.link : window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: self.shareJson.imgUrl ? self.shareJson.imgUrl : '../../../wap/images/tjj_logo.png', // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                typeof self.shareJson.success == 'function' ? self.shareJson.success() : null;
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                typeof self.shareJson.cancel == 'function' ? self.shareJson.cancel() : null;
            }
        });
    }
    w.Wechat_api = Wechat_api;
})(window)
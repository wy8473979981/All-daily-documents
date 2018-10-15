//微信分享接口
//必须首先加载下面的官方js文件
//<script src="https://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
//传参格式为对象

var weiXinShare =
{
    init:function(datas)
    {
        var sign_url = window.location.href;
        sign_url = encodeURIComponent(sign_url);
        var host = window.location.protocol + '//' + window.location.host;
        var url = host + "/mobile/index.php?act=mshop&op=signurl&client_type=ajax&sign_url=" + sign_url +"&callback=";

        this.getJSONP(url,function(result)
        {
            var sign = result.datas;

            var timestamp = sign.timestamp,
                nonceStr = sign.noncestr,
                signature = sign.signature,
                appid = sign.appid;

            wx.config({
                debug: false,
                appId: appid,
                timestamp: timestamp,
                nonceStr: nonceStr,
                signature: signature,
                jsApiList: [
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'onMenuShareQZone',
                    'getNetworkType',
                    'hideOptionMenu',
                    'showOptionMenu',
                    'chooseWXPay'
                ]
            });
        });
        this.ready(datas);
    },
    getJSONP:function (url,callback)
    {
        var cn = "callback"+(+new Date()),
            s = document.createElement("script");
        s.type = "text/javascript";
        s.charset = "UTF-8";
        s.src = url+cn,
            heads= document.head || document.getElementsByTagName('head')[0];
        var sp=heads.appendChild(s);

        setTimeout(function()
        { //利用计时器 变成异步
            window[cn] = function(data)
            {
                try {
                    s.onload = s.onreadystatechange=function(){
                        callback && callback(data);
                    }
                }
                catch (e) {
                }
                finally
                {
                    setTimeout(function(){
                        if(heads&&s.parentNode){
                            sp.parentNode.removeChild(sp);   //最重销毁
                        }
                        window[cn]=null;
                    },1000);
                }
            };
        },0);
    },

    ready:function(data)
    {
        wx.ready(function()
        {
            //分享朋友圈  / 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
            wx.onMenuShareTimeline({
                title: data.title, // 分享标
                desc: data.desc,
                link:data.link,    //cookie读取
                imgUrl: data.imgUrl ,// 分享图标
                trigger: function (res) { 	// 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                },
                success: function (res) {
                    data.success && data.success();
                },
                cancel: function (res) {
                    //alert('已取消'+res);
                },
                fail: function (res) {
                    //alert(JSON.stringify(res));
                }
            });

            //分享给好友
            wx.onMenuShareAppMessage({
                title: data.title, // 分享标
                desc: data.desc,
                link:data.link,    //cookie读取
                imgUrl: data.imgUrl ,// 分享图标
                trigger: function (res) {
                    // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                },
                success: function (res) {
                    data.success && data.success();
                }
            });

            wx.error(function (res) {
                alert(res.errMsg);
            });
            //QQ分享
            wx.onMenuShareQQ({
                title: data.title, // 分享标题
                desc:  data.desc, // 分享描述
                link: data.link, // 分享链接
                imgUrl: data.imgUrl, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                    data.success && data.success();
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });

        })
    }
};





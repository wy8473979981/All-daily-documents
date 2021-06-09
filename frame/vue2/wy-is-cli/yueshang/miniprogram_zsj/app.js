//app.js
import main_config from "./config.js"
global.regeneratorRuntime = require('./lib/regenerator/runtime-module')
App({
  onLaunch: function (options) {
    // 展示本地存储能力
    let _app = this;
    //_app.globalData.userBind = wx.getStorageSync("userBind") || false;
    _app.globalData.openid = wx.getStorageSync("openid");
    _app.globalData.scene = options.scene + '';
  },
  globalData: {
    openid: "oQ9Ig5b1UeCrM_IEKYimDAY0S09o",
    userInfo: null,
    detailInfo: null,//通过/merchantOpen_web/regist/getCurrentUserInfo.htm 取到的绑定信息
    userBind: false,
    authorize: true,//微信授权
    globalInfo: "test",
    openidCB: null
  },
  onPageNotFound(res) {
    wx.redirectTo({
      url: 'pages/404/404'
    }) // 如果是 tabbar 页面，请使用 wx.switchTab
  }
  // 测试
  // "appid": "wx6e4e67db1c379371",
  // 生产
  // "appid": "wxae172c30338872f2",
})
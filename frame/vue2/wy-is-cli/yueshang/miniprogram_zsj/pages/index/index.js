// pages/index/index.js
const {
  getUnviewCount,
  ysRequest
} = require('../../utils/util.js')
import main_config from "../../config.js"
// var plugin = requirePlugin("myPlugin")
var t = getApp()

Page({
  /** 
   * 页面的初始数据
   */
  data: {
    value: 12,
    global: {},
    gridNavs: [{
        icon: "/static/images/assets/p8.png",
        name: "销售提报",
        link: "/pages/operate/daily/daily",
        type: '0'
      },

      {
        icon: "/static/images/assets/p1.png",
        name: "加班申请",
        link: "/pages/service/overtime/overtime",
        type: '3'
      },
      {
        icon: "/static/images/assets/p2.png",
        name: "放行申请",
        link: "/pages/service/goods/goods",
        type: '4'
      }, {
        icon: '/static/images/assets/p9.png',
        name: '广播申请',
        link: '/pages/service/broadcast/broadcast',
        type: '5'
      },

      {
        icon: "/static/images/assets/p0.png",
        name: "账单",
        link: "/pages/operate/bill/bill",
        type: '2'
      },

    ],
    app: null
  },
  goShops() {
    wx.navigateTo({
      url: '/pages/usercenter/shopList/shopList'
    })
  },
  submit(e) {
    let link = e.currentTarget.dataset.link;
    let type = e.currentTarget.dataset.type;
    if (type == '0') {
      this.verifyRule("2", link);
      // this.sendFormId(e.detail.formId)
    } else if (type == '1') {
      this.getInfo();
    } else if (type == '2') {
      console.log('账单');
      this.verifyRule("1", link);
    } else {
      this.verifyRule("3", link);
    }
  },

  verifyRule: function (type, link) {
    ysRequest({
      url: `merchantOpen_web/bill/billDetail.htm`,
      method: 'post',
      params: {
        "type": type,
        "clerkId": this.data.global.clerkId
      },
      succ: (res) => {
        console.log(res, '----请求回参')
        if (res.code == '0') {
          if (type == "2") {
            this.isReport()
          } else {
            wx.navigateTo({
              url: link
            })
          }
        } else {
          wx.showToast({
            icon: 'none',
            title: res.msg
          })
        }
      }
    })
  },
  sendFormId: function (formId) {
    wx.request({
      method: 'POST',
      url: `${main_config.baseUrl}merchantOpen_web/gatherMessage/gatherFormId.htm`,
      data: {
        "version": "1.0",
        "timestamp": new Date().getTime(),
        "sign": main_config.sign,
        "params": {
          "openId": this.data.global.openid,
          "formId": formId
        }
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res, '----type 0---')
      }
    })
  },
  // 监测是否 销售额上报
  getInfo: function () {
    wx.showLoading({
      title: '加载中',
    })
    let _this = this
    wx.request({
      method: 'POST',
      url: `${main_config.baseUrl}merchantOpen_web/sale/commission/getInfo.htm`,
      data: {
        "version": "1.0",
        "timestamp": new Date().getTime(),
        "sign": main_config.sign,
        "params": {
          "clerkId": this.data.global.clerkId
        }
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading()
        if (res.data.code == '0') {
          wx.navigateTo({
            url: '/pages/service/sale/sale?data=' + JSON.stringify(res.data.data)
          });
        } else if (res.data.code == '1') {
          wx.showToast({
            icon: 'none',
            title: res.data.msg
          })
        }
      }
    })
  },
  // 监测是否 销售提报
  isReport: function () {
    wx.showLoading({
      title: '加载中',
    })
    let _this = this
    let apps = getApp();
    let c_data = {
      "version": "1.0",
      "timestamp": new Date().getTime(),
      "sign": main_config.sign,
      "params": {
        "contNo": apps.globalData.detailInfo.contNo
      }
    }
    console.log(c_data)
    wx.request({
      method: 'POST',
      url: `${main_config.baseUrl}finance_web/sale/day/report.htm`,
      data: {
        data: JSON.stringify(c_data)
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 默认值
      },
      success(res) {

        wx.hideLoading()
        if (res.data.code == '0') {


          let isReport = res.data.data.isReport
          _this.setData({
            saleYmd: res.data.data.saleYmd
          })
         /* wx.navigateTo({
            url: "/pages/operate/daily/daily?saleYmd=" + res.data.data.saleYmd
          }); */
          if (isReport == '0') { // 去提报
            wx.navigateTo({
              url: "/pages/operate/daily/daily?saleYmd=" + res.data.data.saleYmd
            });
          } else if (isReport == '1') { // 已提报
            wx.navigateTo({
              url: "/pages/operate/dailyList/dailyList?saleYmd=" + res.data.data.saleYmd
            });

          } else if (isReport == '2') { // 提报超时
            wx.navigateTo({
              url: "/pages/operate/dailyerror/dailyerror?saleYmd=" + res.data.data.saleYmd
            });
          }
        } else if (res.data.code == '1') {
          wx.showToast({
            icon: 'none',
            title: res.data.msg
          })
        }
      }
    })
  },
  // 检查是否用户失效
  isInvalid: function () {
    let _this = this
    wx.request({
      method: 'POST',
      url: `${main_config.baseUrl}merchantOpen_web/account/check.htm`,
      data: {
        "version": "1.0",
        "timestamp": new Date().getTime(),
        "sign": main_config.sign,
        "params": {
          "openId": this.data.global.openid,
          "clerkId": this.data.global.clerkId
        }
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code == '1') {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false,
            complete() {
              wx.redirectTo({
                url: '/pages/login/login'
              })
            }
          })
        }
      }
    })
  },
  onLoad(options) {
    // 获取未读数量
    const {
      pdContId,
      pdMallId,
      clerkOpenId,
      clerkId,
      shortName,
      brandName,
      storeNo,
      openId,
      clerkRole,
      bindTel,
      broadcastApplyAdvanceTime,
      overtimeApplyAdvanceTime,
      releaseApplyAdvanceTime
    } = getApp().globalData.detailInfo
    this.setData({
      global: {
        clerkId,
        pdContId,
        pdMallId,
        openid: openId,
        clerkOpenId,
        shortName,
        brandName,
        storeNo,
        broadcastApplyAdvanceTime,
        overtimeApplyAdvanceTime,
        releaseApplyAdvanceTime
      }
    });

    // plugin.setData({
    //   merchantId: this.data.global.pdContId,
    //   openid: this.data.global.openid,
    //   projectid: this.data.global.pdMallId,
    //   isshopmanager: clerkRole === '2'?'0': '1',
    //   service: '2',
    //   account: bindTel
    // })
  },
  onShow: function () {
    this.isInvalid()
    getUnviewCount(0, this.data.global.clerkOpenId)
  }
})
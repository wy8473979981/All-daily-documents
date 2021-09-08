// pages/index/index.js
const { getUnviewCount, ysRequest } = require('../../utils/util.js')
import main_config from "../../config.js"
var plugin = requirePlugin("myPlugin")
var t = getApp()

Page({
  /** 
   * 页面的初始数据
   */
  data: {
    value: 12,
    global: {},
    gridNavs: [
      {
        icon: "/static/images/assets/p8.png",
        name: "销售提报",
        link: "/pages/operate/daily/daily",
        type: '0'
      },
      // {
      //   icon: "/static/images/assets/p8.png",
      //   name: "月销售额提报",
      //   link: "/pages/operate/monthReport/monthReport",
      //   type: '10'
      // },
      // {
      //   icon: "/static/images/assets/p8.png",
      //   name: "销售额上报",
      //   link: "/pages/service/sale/sale",
      //   type: '1'
      // },
      {
        icon: "/static/images/assets/p1.png",
        name: "加班申请",
        link: "/pages/service/overtime/overtime",
        type: '3'
      }, {
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
        icon: "/static/images/assets/p4.png",
        name: "报修申请",
        link: "/pages/service/project/project",
        type: '6'
      },
      {
        icon: "/static/images/assets/p3.png",
        name: "投诉申请",
        link: "/pages/service/complain/complain",
        type: '7'
      }
      ,
      {
        icon: "/static/images/assets/p0.png",
        name: "账单支付",
        link: "/pages/operate/bill/bill",
        type: '2'
      },
      {
        icon: "/static/images/assets/billing.png",
        name: "在线开票",
        link: "/pages/billing/billList/list",
        type: '2'
      },
      {
        icon: "/static/images/assets/p5.png",
        name: "活动申请",
        link: "/components/activity/activity",
        type: '99'
      }, {
        icon: "/static/images/assets/p10.png",
        name: "调查问卷",
        link: "/pages/question/question",
        type: '8'
      }, {
        icon: "/static/images/assets/p11.png",
        name: "举报平台",
        link: "/pages/service/reportList/reportList",
        type: '9'
      }
      // {
      //   icon: "/static/images/assets/p6.png",
      //   name: "店员管理",
      //   link: "/pages/usercenter/employee/employee",
      //   type: '6'
      // }
    ],
    app: null
  },
  goShops() {
    wx.navigateTo({
      url: '/pages/usercenter/shopList/shopList'
    })
  },
  submit(e) {
    let _this = this;
    let link = e.currentTarget.dataset.link;
    let type = e.currentTarget.dataset.type;
    if(type == '10'){
      this.isMonthReport();
    } else if(type == '0'){
      this.isReport()
      this.sendFormId(e.detail.formId)
    } else if (type == '1') {
      this.getInfo()
    } else if (type == '2') {
      wx.request({
        method: 'POST',
        url: `${main_config.baseUrl}merchantOperation_web/bill/billDetail.htm`,
        data: {
          "version": "1.0",
          "timestamp": new Date().getTime(),
          "sign": main_config.sign,
          "params": {
            'feeTypes': 'zj',
            "clerkId": this.data.global.clerkId,
            "mallId":this.data.global.mallId
          }
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log(res);
          if (res.data.code == '0') {

            // 判断跳转到新页面还是旧页面

            let showNewOrOldStatus = _this.data.global.showNewOrOldStatus;
            if(showNewOrOldStatus === '0'){
              wx.navigateTo({
                url: "/pages/operate/billOld/billOld"
              })
            } else {
              wx.navigateTo({
                url: link
              })
            }
            
            
          } else {
            wx.showToast({
              icon: 'none',
              title: res.data.data,
              duration: 2000
            })
          }
        }
      })


      // ysRequest({
      //   url: 'merchantOperation_web/bill/billDetail.htm',
      //   method: 'post',
      //   params: {
      //     'feeTypes': 'zj',
      //     "clerkId": this.data.global.clerkId
      //   },
      //   succ: (res) => {
      //     if (res.code == '0') {
      //       wx.navigateTo({
      //         url: link
      //       })
      //     } else {
      //       wx.showToast({
      //         icon: 'none',
      //         title: res.data
      //       })
      //     }
      //   }
      // })
    } else if (type == '8') {
      this.getMerQuestionnaireInfoStatus();
    } else {
      if (this.data.global.isElecard == '1'){
        wx.navigateTo({
          url: link
        })
      } else {
        wx.showToast({
          icon: 'none',
          title: '暂无权限',
          duration: 2000
        })
      }
    }
  },

  sendFormId: function (formId) {
    wx.request({
      method: 'POST',
      url: `${main_config.baseUrl}merchantService_web/gatherMessage/gatherFormId.htm`,
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
      url: `${main_config.baseUrl}merchantOperation_web/sale/commission/getInfo.htm`,
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
    wx.request({
      method: 'POST',
      url: `${main_config.baseUrl}merchantOperation_web/sale/day/report.htm`,
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
          let isReport = res.data.data.isReport
          _this.setData({
            saleYmd: res.data.data.saleYmd
          })
          
          if (isReport == '0') { // 去提报
            wx.navigateTo({
              url: "/pages/operate/daily/daily?saleYmd=" + res.data.data.saleYmd
            });
          } else if (isReport == '1') { // 已提报
            wx.navigateTo({
              url: "/pages/operate/dailyfinish/dailyfinish?saleYmd=" + res.data.data.saleYmd
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
    // 监测是否 月销售额提报
    isMonthReport: function () {
      wx.showLoading({
        title: '加载中',
      })
      let _this = this
      wx.request({
        method: 'POST',
        url: `${main_config.baseUrl}merchantService_web/sale/commission/getInfo.htm`,
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
          let list = res.data.data ? res.data.data : false
          if(!list || list.length < 1){
            wx.showToast({
              icon: 'none',
              title: '请联系管理员'
            })
            return
          }
          if (res.data.code == '0') {
            let isReport = list[0].isReport
            
            _this.setData({
              saleYmd: list[0].rightTime
            })
            
            if (isReport == '1') { // 去提报
              wx.navigateTo({
                url: `/pages/operate/monthReport/monthReport?saleYmd=${list[0].rightTime}&id=${list[0].id}`
              });
            } else if (isReport == '2') { // 已提报
              wx.navigateTo({
                url: `/pages/operate/monthReportFinish/monthReportFinish?saleYmd=${list[0].rightTime}&id=${list[0].id}`
              });
            } 
            // else if (isReport == '3') { // 提报超时
            //   wx.navigateTo({
            //     url: "/pages/operate/monthReportError/monthReportError?saleYmd=" + list[0].reportTimeDesc
            //   });
            // }
          } else if (res.data.code == '1') {
            wx.showToast({
              icon: 'none',
              title: res.data.msg
            })
          }
        }
      })
    },
  // 问卷调查权限
  getMerQuestionnaireInfoStatus: function () {
    if(this.data.global.clerkRole == '2') {
      wx.showToast({
        icon: 'none',
        title: '请联系店长填写'
      })
      return false;
    }
    wx.request({
      method: 'POST',
      url: `${main_config.baseUrl}merchantService_web/merQuestionnaire/getMerQuestionnaireInfoStatus.htm`,
      data: {
        "version": "1.0",
        "timestamp": new Date().getTime(),
        "sign": main_config.sign,
        "params": {
          "merQuestionnaireId": '1',
          "mallId": this.data.global.mallId,
          "clerkOpenId": this.data.global.clerkOpenId,
          "clerkId": this.data.global.clerkId
        }
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        if (res.data.code == '0') {
          if (res.data.data.status == '1') {
            wx.redirectTo({
              url: '/pages/question/question'
            })
          } else {
            wx.showToast({
              icon: 'none',
              title: '调查问卷已填写'
            })
          }
        } else {
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
      url: `${main_config.baseUrl}merchantRegist_web/account/check.htm`,
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
    const { pdContId, isElecard, pdMallId, mallId, clerkOpenId, clerkName, clerkId, shortName, brandName, storeNo, openId, clerkRole, bindTel, broadcastApplyAdvanceTime, overtimeApplyAdvanceTime, releaseApplyAdvanceTime, showNewOrOldStatus } = getApp().globalData.detailInfo
    this.setData({
      global: {
        clerkId,
        clerkRole,
        clerkName,
        pdContId,
        pdMallId,
        isElecard,
        mallId,
        openid: openId,
        clerkOpenId,
        shortName,
        brandName,
        storeNo,
        broadcastApplyAdvanceTime,
        overtimeApplyAdvanceTime,
        releaseApplyAdvanceTime,
        showNewOrOldStatus
      }
    });
    
    plugin.setData({
      merchantId: this.data.global.pdContId,
      openid: this.data.global.openid,
      projectid: this.data.global.pdMallId,
      isshopmanager: clerkRole === '2'?'0': '1',
      service: '2',
      account: bindTel,
      operatorName:this.data.global.clerkName
    })
  },
  onShow: function () {
    this.isInvalid()
    getUnviewCount(0, this.data.global.clerkOpenId)
  }
})
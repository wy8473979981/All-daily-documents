// pages/operate/month/month.js
let service = require("../../../static/js/service.js")
const { ysRequest } = require('../../../utils/util.js')
import main_config from "../../../config.js"
var t = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: 31
  },
  // 监测是否提报
  isReport: function () {
    let _this = this
    wx.request({
      method: 'POST',
      url: `${main_config.baseUrl}merchantOperation_web/sale/month/report.htm`,
      data: {
        "version": "1.0",
        "timestamp": new Date().getTime(),
        "sign": main_config.sign,
        "params": {
          "clerkId": t.globalData.detailInfo.clerkId,
          "openId": t.globalData.detailInfo.openId
        }
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        if (res.data.code == '0') {
          let isReport = res.data.data.isReport
          if (isReport == '1') { // 已提报
            wx.redirectTo({
              url: "/pages/operate/monthfinish/monthfinish"
            });
          } else if (isReport == '2') { // 提报超时
            wx.redirectTo({
              url: "/pages/operate/montherror/montherror"
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
  category: function () {
    let _this = this
    wx.request({
      method: 'POST',
      url: `${main_config.baseUrl}merchantOperation_web/sale/day/list.htm`,
      data: {
        "version": "1.0",
        "timestamp": new Date().getTime(),
        "sign": main_config.sign,
        "params": {
          "clerkId": t.globalData.detailInfo.clerkId,
          'saleYm': ''
        }
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        _this.setData({
          saleYmd: res.data.saleYmd
        })
      }
    })
  },
  confirm: function (e) {
    /**
     * 待开发
     * 
     * url: 'merchantOperation_web/sale/report.htm'
     */
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.isReport()
    this.category()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
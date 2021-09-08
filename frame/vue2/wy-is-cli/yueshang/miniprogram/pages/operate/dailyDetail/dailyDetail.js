// pages/service/overtime/overtime.js
let service = require("../../../static/js/service.js");
import main_config from "../../../config.js"
var t = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    saleYmd: '',
    year: '',
    month: '',
    day: '',
    items: {},
    paths: [],
    globalData: {}
  },
  getData: function () {
    let _this = this
    wx.request({
      method: 'POST',
      url: `${main_config.baseUrl}merchantOperation_web/sale/update/category/detail.htm`,
      data: {
        "version": "1.0",
        "timestamp": new Date().getTime(),
        "sign": main_config.sign,
        "params": {
          "contNo": t.globalData.detailInfo.contNo,
          "clerkId": t.globalData.detailInfo.clerkId,
          "openId": t.globalData.detailInfo.openId,
          "saleYmd": this.data.saleYmd
        }
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        let paths = res.data.paths|| ''
        if(paths!=='') {
          _this.setData({
            paths: paths.split(';')
          })
        }
        _this.setData({
          items: res.data.data[0]
        })
      }
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src
    let urls = []
    urls.push(current)
    wx.previewImage({
      current: current,
      urls: urls
    })
  },
  confirm: function (e) {
    let _this = this
    wx.request({
      method: 'POST',
      url: `${main_config.baseUrl}merchantOperation_web/sale/day/update/check`,
      data: {
        "version": "1.0",
        "timestamp": new Date().getTime(),
        "sign": main_config.sign,
        "params": {
          "mallId": t.globalData.detailInfo.mallId,
          "clerkId": t.globalData.detailInfo.clerkId,
          "saleYmd": this.data.saleYmd
        }
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code == '0') {
          if (res.data.data == '1') {
            wx.navigateTo({
              url: '/pages/operate/dailyEdit/dailyEdit?saleYmd=' + _this.data.saleYmd
            })
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })
          }
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
    // wx.navigateTo({
    //   url: '/pages/operate/dailyEdit/dailyEdit?saleYmd=' + this.data.saleYmd
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      year: (new Date()).getFullYear(),
      month: options.saleYmd.slice(4, 6),
      day: options.saleYmd.slice(-2),
      saleYmd: options.saleYmd
    })
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
    this.setData({
      globalData: t.globalData
    })
    console.log(t.globalData)
    this.getData()
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
// pages/message.js
import main_config from "../../../config.js"
let service = require("../../../static/js/service.js");
const {ysRequest} = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 1,
    item: [],
    daily: [],
    month: [],
    icon_no_data: '../../../static/images/icon_no_data.png'
  },
  // clickTab: function (e) {
  //   var index = e.currentTarget.dataset.current
  //   this.setData({
  //     currentTab: index
  //   })
  //   if(index == '1'){
  //     this.setData({
  //       items: this.data.daily
  //     })
  //   }else {
  //     this.setData({
  //       items: this.data.month
  //     })
  //   }
  // },
  // 获取数据
  getData: function (e) {
    ysRequest({
      url: 'merchantOpen_web/sale/day/record.htm',
      params: {
        'contNo': getApp().globalData.detailInfo.contNo,
        'clerkId': getApp().globalData.detailInfo.clerkId,
        'openId': getApp().globalData.detailInfo.openId
      },
      succ: res => {
        let data = res.data.data
        let arr = []
        for (let i in data) {
          arr.push({
            key: i,
            newArr: data[i]
          })
        }
        console.log(arr)
        this.setData({
          items: arr || []
        })
      }
    })
  },
  detail: function (e) {
    let saleYmd = e.currentTarget.dataset.item.saleYmd
    let url = '/pages/operate/dailyDetail/dailyDetail?saleYmd=' + saleYmd
    wx.navigateTo({
      url: url
    })
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
    this.getData()
    // this.setData({
    //   items: this.data.daily
    // })
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
    var _this = this
    // wx.showLoading({
    //   title: '加载中',
    // })
    // this.setData({
    // })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // var _this = this
    // wx.showLoading({
    //   title: '加载中',
    // })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
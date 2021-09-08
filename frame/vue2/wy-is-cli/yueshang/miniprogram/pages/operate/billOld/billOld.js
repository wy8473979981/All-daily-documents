// pages/operate/billOld/billOld.js
import main_config from "../../../config.js"
const {ysRequest} = require('../../../utils/util.js')
var t = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 'zj',
    tabs: [{
      id: 'zj',
      name: '租金'
    }, {
      id: 'wg',
      name: '物管费'
    }, {
      id: 'sd',
      name: '水电'
    }, {
      id: 'qt',
      name: '其他'
    }],
    globalData: {},
    lists: {}
  },
  clickTab: function (e) {
    var id = e.currentTarget.dataset.current
    this.setData({
      currentTab: id
    })
    this.getData()
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },
  getData: function () {
    ysRequest({
      url: 'merchantOperation_web/bill/billDetail',
      method: 'post',
      params: {
        'feeTypes': this.data.currentTab,
        "clerkId": t.globalData.detailInfo.clerkId
      },
      succ: res => {
        console.log(res, '----bill回参')
        if (res.code == '0') {
          this.setData({
            lists: res.data
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: res.msg
          })
        }
      }
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
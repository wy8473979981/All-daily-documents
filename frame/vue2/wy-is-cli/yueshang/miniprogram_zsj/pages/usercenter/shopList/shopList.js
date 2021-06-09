// pages/service/requestNote/requestNote.js
import main_config from "../../../config.js"
const {ysRequest} = require('../../../utils/util.js')
var t = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    arrow_right: '../../../static/images/icon_arrow_right.png',
    items: [],
    globalData: {}
  },
  goUrl(e) {

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
    this.setData({
      globalData: t.globalData
    })
    ysRequest({
      url: 'merchantOpen_web/merClerkInfo/currentUserInfoList.htm',
      method: 'post',
      params: {
        "bindTel": t.globalData.detailInfo.mobile
      },
      succ: res => {
        this.setData({
          items: res.data || []
        })
      }
    })
  },
  select (e) {
    let id = e.currentTarget.dataset.id
    ysRequest({
      url: 'merchantOpen_web/merClerkInfo/changeCont.htm',
      method: 'post',
      params: {
        "openId": t.globalData.detailInfo.openId,
        'id': id
      },
      succ: res => {
        wx.reLaunch({
          url: '/pages/index_bridge/index_bridge'
        })
      }
    })
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
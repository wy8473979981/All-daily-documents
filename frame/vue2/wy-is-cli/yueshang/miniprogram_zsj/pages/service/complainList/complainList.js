// pages/message.js
import main_config from "../../../config.js"
const {ysRequest} = require('../../../utils/util.js')
var t = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 1,
    items: []
  },
  clickTab: function(e) {
    var index = e.currentTarget.dataset.current
    this.setData({
      currentTab: index
    })
    this.getData()
  },
  // 跳转详情界面
  goLink: function(e) {
    var item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/service/complainDetail/complainDetail?item=' + JSON.stringify(item),
    })
  },
  // 获取数据
  getData: function(e){
    const params = {
      "mallId": t.globalData.detailInfo.mallId,
      'clerkId': t.globalData.detailInfo.clerkId,
      'status': this.data.currentTab,
      "itemsPerPage": '10',
      'page': '1'
    }
    ysRequest({
      url: 'merchantOpen_web/advise/list.htm',
      params,
      succ: res => {
        this.setData({
          items: res.data || []
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getData()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    var _this = this
    this.setData({
      items: []
    })
    ysRequest({
      url: 'merchantOpen_web/complaints/getComplaintsList.htm',
      params: {
        "mallId": t.globalData.detailInfo.mallId,
        'type': this.data.currentTab,
        'phone': t.globalData.detailInfo.bindTel,
        "shopId": t.globalData.detailInfo.clerkOpenId,
        "pageNum": '10',
        'pageNo': '1'
      },
      succ: res => {
        wx.stopPullDownRefresh()
        this.setData({
          items: res.data || []
        })
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    ysRequest({
      url: 'merchantOpen_web/complaints/getComplaintsList.htm',
      params: {
        "mallId": t.globalData.detailInfo.mallId,
        'type': this.data.currentTab,
        'phone': t.globalData.detailInfo.bindTel,
        "shopId": t.globalData.detailInfo.clerkOpenId,
        "pageNum": '10',
        'pageNo': '2'
      },
      succ: res => {
        let data = this.data.items.concat(res.data)
        this.setData({
          items: data
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
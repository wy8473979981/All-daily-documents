// pages/message.js
var t = getApp()
import main_config from "../../../config.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: '0',
    pages: 0,
    page: 1,
    items: [],
    globalData: [],
    pullUpstatus: true,
    noData: false,
    icon_no_data: '../../../static/images/icon_no_data.png'
  },
  clickTab: function (e) {
    var index = e.currentTarget.dataset.current
    this.setData({
      currentTab: index,
      page: 1,
      items: []
    })
    this.getData(1)
  },
  // 跳转详情界面
  goLink: function (e) {
    var that = this
    var item = e.currentTarget.dataset.item
    var params = JSON.stringify(item)
    wx.navigateTo({
      url: '../msgDetail/msgDetail?params=' + params,
    })
  },
  getData: function (page) {
    var _this = this
    _this.setData({
      globalData: t.globalData
    })
    ysRequest({
      url: 'merchantService_web/serviceAll/list.htm',
      method: 'post',
      params: {
        "clerkId": t.globalData.detailInfo.clerkId,
        "status": this.data.currentTab,
        "page": page
      },
      succ: (res) => {
        let items = this.data.items.concat(res.data.list)
        wx.stopPullDownRefresh()
        this.setData({
          pullUpstatus: true,
          items: items || [],
          pages: Math.ceil(res.data.count / 20)
        })
        if (this.data.items.length == 0) {
          this.setData({
            noData: true
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
    this.setData({
      items: []
    })
    this.getData(1)
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
    this.setData({
      items: [],
      page: 1
    })
    this.getData(1)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.pullUpstatus) {
      this.setData({
        pullUpstatus: false
      })
      this.data.page++
      this.getData(this.data.page)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
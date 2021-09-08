// pages/operate/dailyfinish/dailyfinish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    saleYmd: '',
    date: '',
    id: ''
  },
  // 跳转详情界面
  detail: function (e) {
    // let url = '/pages/operate/monthReportDetail/monthReportDetail?saleYmd=' + this.data.saleYmd
    let url = `/pages/operate/monthReportDetail/monthReportDetail?saleYmd=${this.data.saleYmd}&id=${this.data.id}`
    wx.navigateTo({
      url: url
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let date = options.saleYmd.replace('-', '年') + '月'
    let id = options.id;
    this.setData({
      saleYmd: options.saleYmd,
      date,
      id
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
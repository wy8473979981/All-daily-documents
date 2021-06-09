// pages/service/requestNote/requestNote.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arrow_right: '../../../static/images/icon_arrow_right.png',
    qrcode: '../../../static/images/icon_home_blue.png',
    btnSta: true
  },
  goUrl(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.path
    })
  },
  urge() {
    this.setData({
      btnSta: !this.data.btnSta
    })
    wx.showToast({
      title: '催办成功',
      icon: 'success',
      duration: 2000
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
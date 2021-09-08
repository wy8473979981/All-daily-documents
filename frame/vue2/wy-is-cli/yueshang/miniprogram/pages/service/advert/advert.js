// pages/service/overtime/overtime.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['网络类', '清洁卫生', '设备设施', '停车场'],
    array1: ['货品', '道具', '建材'],
    typeIndex: 0,
    typeIndex1: 0,
    startTime: '11:11',
    endTime: '12:23',
    date: '2016-09-01',
    tipsShow: false
  },
  bindPickerChange: function (e) {
    this.setData({
      typeIndex: e.detail.value
    })
  },
  bindPickerChange1: function (e) {
    this.setData({
      typeIndex1: e.detail.value
    })
  },
  bindstartTimeChange: function (e) {
    this.setData({
      startTime: e.detail.value
    })
  },
  bindendTimeChange: function (e) {
    this.setData({
      endTime: e.detail.value
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  goUrl: function (e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.path
    })
  },
  confirm: function (e) {
    this.setData({
      tipsShow: !this.data.tipsShow
    })
    if (!this.data.tipsShow) {
      wx.showToast({
        title: '提交成功',
        icon: 'success',
        duration: 2000
      })
    }
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
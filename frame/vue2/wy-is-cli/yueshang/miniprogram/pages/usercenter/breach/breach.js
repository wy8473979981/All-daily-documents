// pages/usercenter/breach/breach.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      {
        id: "f001",
      
        name: "提前闭店",
        fee: -520.00,
        status:"unpay",
        time: "2017/09/06"

      },
      {
        id: "f002",

        name: "延迟开店",
        fee: -520.00,
        status: "paid",
        time: "2017/09/05"

      },
      {
        id: "f003",

        name: "延迟开店",
        fee: -520.00,
        status: "unpay",
        time: "2017/09/04"

      },
      {
        id: "f004",

        name: "提前闭店",
        fee: -520.00,
        status: "unpay",
        time: "2017/09/06"

      }

    ],
  },

  //show breach detail
  showBreachDetail(e) {
    console.log(e);
    let id = 1;
    wx.navigateTo({

      url: `/pages/usercenter/breach-detail/breach-detail?id=${id}`
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
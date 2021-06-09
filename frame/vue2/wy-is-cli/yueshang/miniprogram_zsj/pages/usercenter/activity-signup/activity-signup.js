// pages/usercenter/activity-signup/activity-signup.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      items:[
        {
          "checked": false,
          "name": "餐饮类七夕优惠节",
          "activityStart": "2018/05/08",
          "activityEnd":"2018/05/30",
          "desc":"此活动针对餐饮类商铺， 为七夕情人节做优惠促销活动，整体优惠力度需根据商场标准进行调控"
        },
        {
          "checked": false,
          "name": "餐饮类七夕优惠节2",
          "activityStart": "2018/05/08",
          "activityEnd": "2018/05/30",
          "desc": "此活动针对餐饮类商铺， 为七夕情人节做优惠促销活动，整体优惠力度需根据商场标准进行调控"
        }
      ]
  },
  checkboxChange(e){
      console.log(e);
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
// pages/usercenter/activity/activity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:1,
    items:[
        {
          id:"aid-001",
          title:"宝龙广场2周年庆",
          status:"goingon",
          statusName:"进行中",
          activityType:"促销活动",
          start:"2018.03.24",
          end:"2018.03.30",
          image: "../../../static/images/assets/figure.jpg"
        },
        {
          id: "aid-002",
          title: "六一儿童届展厅大促销互动",
          status: "outdate",
          statusName: "已过期",
          activityType: "促销活动",
          start: "2018.03.24",
          end: "2018.03.30",
          image: "../../../static/images/assets/figure.jpg"
        },
        {
          id: "aid-003",
          title: "六一儿童届展厅大促销互动",
          status: "goingon",
          statusName: "进行中",
          activityType: "促销活动",
          start: "2018.03.24",
          end: "2018.03.30",
          image: "../../../static/images/assets/figure.jpg"
        },
    ],
    scrollTop: 100
  },
  clickTab(e){
     console.log(e) 
     this.setData({
       currentTab : e.target.dataset.current
     })
  },
  upper: function (e) {
    console.log(e)
  },
  lower: function (e) {
    console.log(e)
  },
  showActivityDetail(e) {
      console.log(e);
      let id = 1;
      wx.navigateTo({
        url: `/pages/usercenter/activity-detail/activity-detail?id=${id}`
      });
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
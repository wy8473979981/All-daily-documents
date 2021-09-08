var t = getApp()
const { getUnviewCount, ysRequest } = require('../../../utils/util.js')
Page({
  data: {
    name:"刘建军",
    title:"店长",
    figure:"../../../static/images/usercenter_avatar.png" ,
    global: {}
  },
  onLoad () {
    const { pdContId, pdMallId, clerkOpenId, clerkId, shortName, brandName, storeNo, openId, clerkRole, clerkName } = getApp().globalData.detailInfo

    this.setData({
      global: {
        clerkId,
        pdContId,
        pdMallId,
        openid: openId,
        clerkOpenId,
        shortName,
        brandName,
        storeNo,
        clerkRole,
        clerkName
      }
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    getUnviewCount(4, this.data.global.clerkOpenId)
  }
})
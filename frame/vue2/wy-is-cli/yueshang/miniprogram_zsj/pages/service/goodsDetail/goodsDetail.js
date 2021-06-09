// pages/service/requestNote/requestNote.js
import main_config from "../../../config.js"
import { urgeService } from '../../../requests/apis.js'
const {ysRequest} = require('../../../utils/util.js')
const { regeneratorRuntime } = global
var t = getApp()

Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    arrow_right: '../../../static/images/icon_arrow_right.png',
    qrcode: '../../../static/images/icon_home_blue.png',
    statusCode: 0,
    serviceId: '',
    items: {},
    globalData: {},
    goodsType: [],
    info: {
      applicationNo: null,
      statusName: null,
      brandName: null,
      storeNos: null,
      clerkName: null,
      phoneNumber: null
    },
    disableSubmit: false
  },
  goUrl(e) {
    wx.navigateTo({
      url: '/pages/service/evaluate/evaluate?serviceId=' + this.data.serviceId
    })
  },
  // 催办
  async urge() {
    const params = {
      params: {
        mallId: this.data.globalData.mallId,
        brandName: this.data.globalData.brandName,
        clerkId: this.data.globalData.clerkId,
        clerkName: this.data.globalData.clerkName,
        serviceId: this.data.serviceId
      }
    }
    console.log(params, '催办入参')
    if (this.data.disableSubmit) return
    this.setData({
      disableSubmit: true
    })
    const res = await urgeService(params)
    if (res.code === '0') {
      setTimeout(() => {
        wx.navigateBack()
      }, 2000)
    } else {
      this.setData({
        disableSubmit: false
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.serviceId)
    this.setData({
      serviceId: options.serviceId
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
    const {mallId, brandName, clerkId, clerkName} = getApp().globalData.detailInfo
    this.setData({
      globalData: { mallId, brandName, clerkId, clerkName }
    })
    ysRequest({
      url: 'merchantOpen_web/release/detail.htm',
      params: {
        "clerkId": this.data.globalData.clerkId,
        "serviceId": this.data.serviceId
      },
      succ: res => {
        if (res.code === '0') {
          const { applicationNo,
            statusName,
            brandName,
            storeNos,
            clerkName,
            phoneNumber } = res.data
          this.setData({
            info: {
              applicationNo,
              statusName,
              brandName,
              storeNos,
              clerkName,
              phoneNumber
            },
            items: res.data || [],
            goodsType: res.data.goodsType.split(','),
            statusCode: res.data.statusCode.substr(-1, 1)
          })
        }
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
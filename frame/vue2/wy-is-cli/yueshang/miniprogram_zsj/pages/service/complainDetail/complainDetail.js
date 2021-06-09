// pages/service/requestNote/requestNote.js
import main_config from "../../../config.js"
const {ysRequest} = require('../../../utils/util.js')
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
    globalData: {},
    items: {},
    images: [],
    info: {
      applicationNo: null,
      statusName: null,
      brandName: null,
      storeNos: null,
      clerkName: null,
      phoneNumber: null
    }
  },
  goUrl(e) {
    wx.navigateTo({
      url: '/pages/service/evaluate/evaluate?serviceId=' + this.data.serviceId
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src
    let urls = []
    urls.push(current)
    wx.previewImage({
      current: current,
      urls: urls
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
    this.setData({
      globalData: t.globalData
    })
    ysRequest({
      url: 'merchantOpen_web/advise/detail.htm',
      method: 'post',
      params: {
        "clerkId": t.globalData.detailInfo.clerkId,
        "serviceId": this.data.serviceId
      },
      succ: res => {
        if (res.code === '0') {
          const {
            number, creator, phoneNumber, status
          } = res.data.adviseInfo
          this.setData({
            info: {
              applicationNo: number,
              statusName: status,
              brandName: t.globalData.detailInfo.brandName,
              storeNos: t.globalData.detailInfo.storeNo,
              clerkName: creator,
              phoneNumber
            },
            items: res.data || [],
            images: res.data.adviseImgs || [],
            replyImgs: res.data.replyImgs || [],
            statusCode: res.data.adviseInfo.statusCode.substr(-1, 1)
          })
        }
      }
    })
  }
})
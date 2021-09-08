// pages/service/requestNote/requestNote.js
var t = getApp()
const { ysRequest } = require('../../../utils/util.js')
import main_config from "../../../config.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: {},
    reportId: '',
    serviceId: '',
    images: []
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var item = JSON.parse(options.item)
    this.setData({
      reportId: item.reportId,
      serviceId: item.serviceId
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      globalData: t.globalData
    })
    console.log(this.data.globalData.detailInfo.path)
    ysRequest({
      url: 'merchantService_web/report/detail.htm',
      params: {
        // "clerkId": t.globalData.detailInfo.clerkId,
        "serviceId": this.data.serviceId,
        "reportId": this.data.reportId
      },
      succ: res => {
        if (res.code === '0') {
          this.setData({
            items: res.data
          })
          let imgList = res.data.reportImgs
          if (imgList.length!=0) {
            this.setData({
              images: imgList
            })
          }
        }
      }
    })
  }
})
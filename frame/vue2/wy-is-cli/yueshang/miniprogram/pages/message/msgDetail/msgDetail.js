// pages/msgDetail/msgDetail.js
import main_config from "../../../config.js"
let service = require("../../../static/js/service.js");
const {ysRequest} = require('../../../utils/util.js')
var t = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {},
    data: {},
    msgType: '2' // 1显示按钮 2不显示
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var data = JSON.parse(options.params)
    this.setData({
      item: data,
      msgType: options.msgType
    })
  },

  getData: function () {
    ysRequest({
      url: 'merchantMain_web/MessageNotifyAndNeed/find.htm',
      params: {
        'id': this.data.item.id,
        'type': this.data.item.type,
        'clerkId': t.globalData.detailInfo.clerkId,
        'clerkOpenId': t.globalData.detailInfo.clerkOpenId
      },
      succ: res => {
        if (res.code == '0') {
          this.setData({
            data: res.params[0]
          })
        } else {
          wx.showToast({
            title: res.msg,
            duration: 2000
          })
        }
      }
    })
  },
  update: function () {
    var _this = this
    wx.request({
      method: 'POST',
      url: `${main_config.baseUrl}merchantMain_web/MessageNotifyAndNeed/update.htm`,
      data: {
        "version": "1.0",
        "timestamp": new Date().getTime(),
        "sign": main_config.sign,
        "params": {
          'merannouncementClerkId': this.data.item.merannouncementClerkId
        }
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log('更新消息状态')
      }
    })
  },
  goUrl:function () {
    let type = this.data.item.informationType
    let serviceId = this.data.item.businessId
    let path = ''
    if (type == '2001') {
      path = '/pages/service/overtimeDetail/overtimeDetail?serviceId=' + serviceId
    } else if (type == '2002') {
      path = '/pages/service/goodsDetail/goodsDetail?serviceId=' + serviceId
    } else if(type == '2003') {
      path = '/pages/service/broadcastDetail/broadcastDetail?serviceId=' + serviceId
    } else if (type == '2004') {
      path = '/pages/service/complainDetail/complainDetail?serviceId=' + serviceId
    } else if (type == '2006') {
      path = '/pages/service/projectDetail/projectDetail?serviceId=' + serviceId
    } else if (type === '2010') {
      path = `/pages/activityEnrol/activityEnrol?id=${serviceId}`
    }
    wx.navigateTo({
      url: path
    })
  },
  onShow: function () {
    this.getData()
    this.update()
  }
})
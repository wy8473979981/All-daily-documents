import main_config from "../../../config.js"
const {ysRequest} = require('../../../utils/util.js')
var t = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon_full_flower: '../../../static/images/icon_full_star.png',
    icon_empty_flower: '../../../static/images/icon_empty_star.png',
    score0: [],
    score1: [],
    score2: [],
    attitude: 0,
    respond: 0,
    quality: 0,
    remark: '',
    serviceId: '',
    globalData: {}
  },

  rating: function (e) {
    let id = Number(e.currentTarget.dataset.id) + 1
    console.log(id)
    let type = e.currentTarget.dataset.type
    let full = this.data.icon_full_flower
    let empty = this.data.icon_empty_flower
    let score = [full, full, full, full, full, empty, empty, empty, empty, empty]
    let init = score.splice(5-id, 5)
    if(type == 0) {
      this.setData({
        score0: init,
        attitude: id
      })
    } else if (type == 1) {
      this.setData({
        score1: init,
        respond: id
      })
    } else if (type == 2) {
      this.setData({
        score2: init,
        quality: id
      })
    }
  },
  bindKeyInput: function (e) {
    this.setData({
      remark: e.detail.value
    })
  },
  confirm () {
    ysRequest({
      url: 'merchantOpen_web/serviceAll/evaluate.htm',
      method: 'post',
      params: {
        'clerkId': this.data.globalData.detailInfo.clerkId,
        'serviceId': this.data.serviceId,
        'attitude': this.data.attitude,
        'respond': this.data.respond,
        'quality': this.data.quality,
        'remark': this.data.remark
      },
      succ: (res) => {
        if (res.code == '0') {
          wx.showToast({
            title: '成功',
            icon: 'success',
            mask: true,
            duration: 2000
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 2000)
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none',
            mask: true,
            duration: 2000
          })
        }
      }
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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      globalData: t.globalData
    })
    // 初始化分数
    let empty = this.data.icon_empty_flower
    let score = [empty, empty, empty, empty, empty]
    this.setData({
      score0: score,
      score1: score,
      score2: score
    })
  }
})
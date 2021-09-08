const app = getApp()
const utils = require('../../utils/util.js')
Page({
  data: {
    test: '5',
    info: {},
    list: [],
    isExpire: false,
    cancelStatusStr: '',
    disableSubmit: false
  },
  preview(e) {
    const url = e.target.dataset.src
    wx.previewImage({
      urls: [url]
    })
  },
  onLoad (options) {
    const info = JSON.parse(options.info)
    const expire = info.expire.split('/')
    const expireTime = new Date(expire[0], expire[1] - 1, expire[2]).getTime()
    const list = JSON.parse(options.list).map(item => {
      return {
        ...item,
        tagStatus: ['1', '5'].includes(item.registrationStatus) ? "success": ''
      }
    })
    console.log(list, '---list3421----')
    const cancelStatus = info.cancelStatus

    this.setData({
      list,
      info: info,
      isExpire: utils.isExpire(expireTime)
    })
    console.log(this.data.info, '取消状态')
  },
  onChoose (e) {
    const { id, registrationStatus2 } = e.currentTarget.dataset.item
    const list = this.data.list
    list.forEach(item => {
      if (item.id === id) {
        if (['1', '5'].includes(item.registrationStatus2)) {
          item.registrationStatus2 = '2'
        } else if (item.registrationStatus2 === '2') {
          item.registrationStatus2 = '5'
        }
      }
    })
    this.setData({
      list
    })
  },
  // 取消报名前校验
  checkParam(choosed) {
    if (choosed.length === 0) {
      wx.showToast({
        title: '请选择取消的活动',
        icon: 'none'
      })
      return false
    }
    return true
  },

  // 取消报名
  onQuit () {
    const choosed = this.data.list.filter(item => item.registrationStatus2 === '2')
    if (this.data.disableSubmit) return
    if (!this.checkParam(choosed)) return
    const { clerkId, clerkOpenId } = app.globalData.detailInfo
    const params = {
      clerkOpenId, clerkId, activityId: this.data.info.id, ids: choosed.map(item => item.id).join(',')
    }
    this.setData({
      disableSubmit: true
    })
    utils.ysRequest({
      url: 'merchantMain_web/mobileActivities/cancelRegistration.htm',
      method: 'post',
      params,
      succ: function (res) {
        if (res.code === '0') {
          wx.showToast({
            title: '取消报名成功',
            icon: 'none',
            duration: 2000,
            complete () {
              setTimeout(() => {
                wx.navigateBack()
              }, 2000)
            }
          })
        } else {
          this.setData({
            disableSubmit: false
          })
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
        }
      },
      fail: err => {
        this.setData({
          disableSubmit: false
        })
      }
    })
  }
})
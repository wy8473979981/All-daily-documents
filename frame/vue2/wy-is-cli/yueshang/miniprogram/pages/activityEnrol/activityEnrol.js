const app = getApp()
const utils = require('../../utils/util.js')
Page({
  data: {
    info: {},
    list: [],
    available: false,
    canEnrol: false,
    txtRealContent: 'fasdfasdf',
    disableSubmit: false
  },
  preview (e) {
    const url = e.target.dataset.src
    wx.previewImage({
      urls: [url]
    })
  },
  onLoad (options) {
    this.setData({
      id: options.id
    })
    this.getDetail()
  },
  getDetail () {
    const { clerkId, clerkOpenId } = app.globalData.detailInfo
    const params = {
      clerkOpenId, clerkId, activityId: this.data.id
    }
    utils.ysRequest({
      url: 'merchantMain_web/mobileActivities/queryActivities.htm',
      method: 'post',
      params,
      succ: (res) => {
        console.log(res, '报名详情')
        if (res.code === '0') {
          const { merActivities, list } = res.params[0]
          const info = {
            imgUrl: merActivities.path,
            statusStr: merActivities.effectiveStatus === '1' ? '进行中' : '已结束',
            status: merActivities.effectiveStatus === '1' ? 'success' : '',
            title: merActivities.activityName,
            type: merActivities.activityType === '1' ? '促销活动' : '推广活动',
            time: merActivities.startTimes + '-' + merActivities.endTimes,
            expire: merActivities.signUpDates,
            id: merActivities.id,
            // effectiveStatus: merActivities.effectiveStatus,
            signUpDate: merActivities.signUpDate
          }
          const parsedList = list.map(i => {
                return {
                  title: i.activityName,
                  time: `${i.startDates}-${i.endDates}`,
                  content: i.activityDesc,
                  activityId: i.activityId,
                  id: i.id,
                  registrationStatus2: i.registrationStatus,   // 页面选择 取消选择
                  registrationStatus: i.registrationStatus,    // 显示用
                  hasEnroled: i.registrationStatus === '1',
                  tagStatus: i.registrationStatus === '1' ? 'success': '',
                  remark: i.remark
                }
              })
          this.setData({
            info,
            list: parsedList,
            available: merActivities.signUpDate > Date.now(),
            canEnrol: list.filter(item => item.registrationStatus === '2').length>0
          })
          console.log(this.data.available, '是否能报名')
        } else {
          wx.showToast({
            icon: 'none',
            title: res.msg
          })
        }
      }
    })
  },
  checkParams () {
    const hasEnroled = this.data.list.filter(item => item.hasEnroled)
    if (hasEnroled.length === this.data.list.length) {
      wx.showToast({
        title: '已报全部活动',
        icon: 'none'
      })
      return false
    }
    console.log(this.data.list, '--list')
    const choosed1 = this.data.list.filter(item => item.registrationStatus2 === '1')
    if (choosed1.length === 0) {
      wx.showToast({
        title: '请选择子活动',
        icon: 'none'
      })
      return false
    }
    return true
  },
  // 报名
  onTap () {
    if (this.data.disableSubmit) return
    if (!this.checkParams()) return
    const choosed = this.data.list.filter(item => item.registrationStatus2 === '1' && !item.hasEnroled)
    const remarkList = choosed.map(item => item.remark)
    const activitySubIds = choosed.map(item => item.id).join(',')
    const { clerkId, clerkOpenId } = app.globalData.detailInfo
    /**
     * clerkOpenId
     * activityId
     * clerkId
     * remarkList
     * activitySubIds
     * merchantMain_web/mobileActivities/signUpOperating.htm
     */
    const params = {
      clerkOpenId, clerkId, activityId: this.data.info.id, remarkList, activitySubIds
    }
    this.setData({
      disableSubmit: true
    })

    utils.ysRequest({
      url: 'merchantMain_web/mobileActivities/signUpOperating.htm',
      method: 'post',
      params,
      succ: function (res) {
        if (res.code === '0') {
          wx.showToast({
            title: '报名成功',
            icon: 'none',
            complete() {
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
  },

// 输入备注信息
  onInput (e) {
    const id = e.currentTarget.dataset.id
    const val = e.detail.value
    const list = this.data.list.map(item => {
      return {
        ...item,
        remark: item.id === id ? val : item.remark
      }
    })
    this.setData({
      list
    })
  },
  // 选择操作
  onChoose (e) {
    const {id, hasEnroled} = e.currentTarget.dataset.item
    if (hasEnroled) {
      wx.showToast({
        title: '已报该活动',
        icon: 'none'
      })
      return
    }
    const list = this.data.list
    list.forEach(item => {
      if (item.id === id) {
        if (item.registrationStatus2 === '1') {
          item.registrationStatus2 = '2'
        } else if (item.registrationStatus2 === '3' || item.registrationStatus2 === '2') {
          item.registrationStatus2 = '1'
        }
      }
    })
    this.setData({
      list
    })
  }
})
import main_config from "../../../config.js"
const {
  ysRequest
} = require('../../../utils/util.js')
let service = require("../../../static/js/service.js")
const today = service.formateDate(new Date(), '-')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    actionStart: '',
    actionEnd: '',
    date: '',
    startDate: '',
    endDate: '',
    time: '00:00',
    content: '',
    imgList: [],
    globalData: {},
    picNum: true,
    disableSubmit: false,
    warningComp: null,
    startTimeBegin: '00:00'
  },
  dateChange: function(e) {
    const curTime = {
      hour: new Date().getHours(),
      minute: new Date().getMinutes()
    }
    this.setData({
      date: e.detail.value,
      startTimeBegin: e.detail.value === today ? `${curTime.hour + parseInt(this.data.globalData.releaseApplyAdvanceTime)}:${curTime.minute + 1}` : '00:00'
    })
  },
  timeChange: function(e) {
    this.setData({
      time: e.detail.value
    })
  },
  actionStartChange: function(e) {
    this.setData({
      actionStart: e.detail.value
    })
  },
  actionEndChange: function(e) {
    this.setData({
      actionEnd: e.detail.value
    })
  },
  bindKeyInput: function(e) {
    this.setData({
      content: e.detail.value
    })
  },
  upload() {
    let _this = this
    service.upload().then(function(res) {
      let data = (JSON.parse(res.data)).data
      let imgList = _this.data.imgList
      imgList.push(data)
      _this.setData({
        imgList: imgList
      })
      if (imgList.length == 5) {
        _this.setData({
          picNum: false
        })
      }
    })
  },
  del(e) {
    let id = e.currentTarget.dataset.index
    let imgList = this.data.imgList
    imgList.splice(id, 1)
    this.setData({
      imgList: imgList
    })
    if (imgList.length < 5) {
      this.setData({
        picNum: true
      })
    }
  },
  previewImage: function(e) {
    var current = e.target.dataset.src
    let urls = []
    urls.push(current)
    wx.previewImage({
      current: current,
      urls: urls
    })
  },
  checkParams () {
    // 时间校验
    let date = this.data.date.split('-')
    let time = this.data.time.split(':')
    const target = new Date(date[0] * 1, (date[1] - 1) * 1, date[2] * 1, time[0] * 1, time[1] * 1, 0)
    const distance = Number(this.data.globalData.broadcastApplyAdvanceTime) * 3600 * 1000
    if (target.getTime() < distance + Date.now()) {
      this.data.warningComp.showWarning({
        warningTxt: `需提前${this.data.globalData.broadcastApplyAdvanceTime}小时申请`
      })
      return false
    }
    if (this.data.content === '') {
      this.data.warningComp.showWarning({
        warningTxt: '请输入广播内容'
      })
      return false
    }
    return true
  },
  submit: function() {
    var _this = this
    let imgList = []
    if (this.data.disableSubmit) return
    if (!this.checkParams()) return
    this.setData({
      disableSubmit: true
    })
    for (var i = 0; i < _this.data.imgList.length; i++) {
      imgList.push(_this.data.imgList[i].path)
    }

    const params = {
      "clerkId": this.data.globalData.clerkId,
      "actionStart": this.data.actionStart,
      "brandName": this.data.globalData.brandName,
      "openId": this.data.globalData.openId,
      "actionEnd": this.data.actionEnd,
      'broadcastTime': this.data.date + ' ' + this.data.time,
      'specialNotes': this.data.content,
      'images': imgList
    }
    ysRequest({
      url: 'merchantOpen_web/broadcast/application.htm',
      method: 'post',
      params,
      succ: (res) => {
        if (res.code === '0') {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 2000)
        } else {
          this.setData({
            disableSubmit: false
          })
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
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

  onLoad () {
    const { brandName, openId, clerkId, storeNo, clerkName, bindTel, broadcastApplyAdvanceTime } = getApp().globalData.detailInfo
    this.setData({
      warningComp: this.selectComponent('#warningComp'),
      globalData: { brandName, openId, clerkId, storeNo, clerkName, bindTel, broadcastApplyAdvanceTime }
    })
  },
  onShow: function() {
    const curTime = {
      hour: new Date().getHours(),
      minute: new Date().getMinutes()
    }
    let nowDate = service.formateDate(new Date(), '-')
    let startDate = service.formateDate(new Date(), '-', -10)
    let endDate = service.formateDate(new Date(), '-', 10)
    this.setData({
      date: nowDate,
      actionStart: nowDate,
      actionEnd: nowDate,
      startDate: nowDate,
      endDate: endDate,
      startTimeBegin: `${curTime.hour + parseInt(this.data.globalData.broadcastApplyAdvanceTime)}:${curTime.minute + 1}`,
      time: `${curTime.hour + parseInt(this.data.globalData.broadcastApplyAdvanceTime)}:${curTime.minute + 1}`,
    })
  }
})
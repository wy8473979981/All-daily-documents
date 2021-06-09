// pages/service/overtime/overtime.js
let service = require("../../../static/js/service.js")
const {ysRequest} = require('../../../utils/util.js')
import main_config from "../../../config.js"
var t = getApp()
// 10.10.136.82:9092
Page({

  /**
   * 页面的初始数据
   */
  data: {
    types: [],
    typesIndex: 0,
    subject: '',
    imgList: [],
    content: '',
    globalData: {},
    picNum: true,
    default_avatar: '../../../static/images/usercenter_avatar.png',
    disableSubmit: false
  },
  goUrl: function (e) {
    wx.navigateTo({
      url: '/pages/service/complainList/complainList'
    })
  },
  bindPickerChange: function (e) {
    var index = Number(e.detail.value)
    this.setData({
      typesIndex: index,
      subject: this.data.types[index].id
    })
    console.log(this.data.types[index].id)
  },
  bindKeyInput: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  upload() {
    let _this = this
    service.upload().then(function (res) {
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
  previewImage: function (e) {
    var current = e.target.dataset.src
    let urls = []
    urls.push(current)
    wx.previewImage({
      current: current,
      urls: urls
    })
  },
  checkParams () {
    if (!this.data.content) {
      this.data.warningComp.showWarning({
        warningTxt: '投诉内容不能为空'
      })
      return false
    }
    return true
  },
  submit: function () {
    var _this = this
    // 内容为空
    if (this.data.disableSubmit) return
    if (!this.checkParams()) return 
    this.setData({
      disableSubmit: true
    })
    let imgList = []
    for (var i = 0; i < _this.data.imgList.length; i++) {
      imgList.push({
        "name": '',
        "path": _this.data.imgList[i].path,
        "size": '',
        "suffix": ''
      })
    }
    const params = {
      "clerkName": this.data.globalData.detailInfo.clerkName,
      "advise": this.data.content,
      "adviseAttList": imgList,
      "brandName": this.data.globalData.detailInfo.brandName,
      "clerkId": this.data.globalData.detailInfo.clerkId,
      "mallId": this.data.globalData.detailInfo.mallId,
      "subject": this.data.subject,
      "type": '1'
    }
    ysRequest({
      url: 'merchantOpen_web/advise/add.htm',
      method: 'post',
      params,
      succ: (res) => {
        if (res.code == 0) {
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
            icon: 'none',
            title: res.msg,
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
    this.setData({
      warningComp: this.selectComponent('#warningComp')
    })
  },
  onShow: function () {
    this.setData({
      globalData: t.globalData
    })
    ysRequest({
      url: 'merchantOpen_web/advise/getSubject.htm',
      succ: res => {
        this.setData({
          subject: res.data.subject[res.data.subject.length - 1].id,
          types: res.data.subject.reverse() || []
        })
      }
    })
  }
})
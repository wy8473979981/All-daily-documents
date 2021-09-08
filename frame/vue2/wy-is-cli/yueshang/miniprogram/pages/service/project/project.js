var t = getApp()
import main_config from "../../../config.js"
const {ysRequest} = require('../../../utils/util.js')
let service = require("../../../static/js/service.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeIndex: 0,
    types: [],
    globalData: {},
    imgList: [],
    description: '',
    special: '',
    picNum: true
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
  bindKeyInput: function (e) {
    let type = e.currentTarget.dataset.type
    if(type == 1) {
      this.setData({
        description: e.detail.value
      })
    } else{
      this.setData({
        special: e.detail.value
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
  bindPickerChange: function (e) {
    this.setData({
      typeIndex: e.detail.value
    })
  },
  checkParams () {
    if (!this.data.description) {
      this.data.warningComp.showWarning({
        warningTxt: '请填写故障描述'
      })
      return false
    }
    return true
  },
  submit: function (e) {
    if (this.data.disableSubmit) return
    if (!this.checkParams()) return
    this.setData({
      disableSubmit: true
    })
    let demain = this.data.globalData.detailInfo.path
    let imgList = []
    for (var i = 0; i < this.data.imgList.length; i++) {
      imgList.push(demain + this.data.imgList[i].path)
    }
    const params = {
      "clerkId": this.data.globalData.detailInfo.clerkId,
      "repairType": 1 + Number(this.data.typeIndex),
      "repairDesc": this.data.description,
      'images': imgList
    }
    ysRequest({
      url: 'merchantService_web/repair/application.html',
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      warningComp: this.selectComponent('#warningComp')
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
      url: 'merchantService_web/repair/repairDic.htm',
      method: 'post',
      succ: res => {
        let tempArr = res.data.list.reverse()
        let arr = []
        tempArr.forEach(function (el) {
          arr.push({
            'value': el.value - 1,
            'name': el.name
          })
        })
        this.setData({
          types: arr
        })
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
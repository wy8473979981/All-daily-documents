// pages/service/overtime/overtime.js
let service = require("../../../static/js/service.js");
import main_config from "../../../config.js"
const {ysRequest} = require('../../../utils/util.js')
var t = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    warningComp: null,
    imgList: [],
    id: 0,
    saleYmStart: '',
    saleYmEnd: '',
    hanshui: '',
    shuilv: '',
    shuie: '',
    shuihou: '',
    jingxiao: '',
    category: {},
    globalData: {}
  },
  bindinput: function (e) {
    let type = e.currentTarget.dataset.type
    let value = e.detail.value
    if (type == 'hanshui') {
      this.setData({
        hanshui: value
      })
    } else if (type == 'shuilv') {
      this.setData({
        shuilv: value
      })
    } else if (type == 'shuie') {
      this.setData({
        shuie: value
      })
    } else if (type == 'shuihou') {
      this.setData({
        shuihou: value
      })
    } else if (type == 'jingxiao') {
      this.setData({
        jingxiao: value
      })
    }
  },
  del(e) {
    let id = e.currentTarget.dataset.index
    let imgList = this.data.imgList
    imgList.splice(id, 1)
    this.setData({
      imgList: imgList
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
  upload(e) {
    let _this = this
    service.upload().then(function (res) {
      let imgList = _this.data.imgList
      imgList.push({ name: '', path: JSON.parse(res.data).data.fullPath })
      _this.setData({
        imgList: imgList
      })
    })
  },
  submit: function (e) {
    this.confirm(e.detail.formId)
  },
  confirm: function (id) {
    let hanshui = this.data.hanshui
    let shuilv = this.data.shuilv
    let shuie = this.data.shuie
    let shuihou = this.data.shuihou
    let jingxiao = this.data.jingxiao
    if (!hanshui) {
      this.data.warningComp.showWarning({
        warningTxt: '请输入含税销售额'
      })
      return false
    }
    if (!shuilv) {
      this.data.warningComp.showWarning({
        warningTxt: '请输入税率'
      })
      return false
    }
    if (!shuie) {
      this.data.warningComp.showWarning({
        warningTxt: '请输入税额'
      })
      return false
    }
    if (!shuihou) {
      this.data.warningComp.showWarning({
        warningTxt: '请输入税后销售额'
      })
      return false
    }
    if (!jingxiao) {
      this.data.warningComp.showWarning({
        warningTxt: '请输入净销售额'
      })
      return false
    }
    let imgList = []
    for (var i = 0; i < this.data.imgList.length; i++) {
      imgList.push(this.data.imgList[i].path)
    }
    const params = {
      "clerkId": t.globalData.detailInfo.clerkId.toString(),
      "id": this.data.id,
      "formId": id,
      "openId": this.data.globalData.detailInfo.openId,
      "taxRate": this.data.shuilv,
      'containTaxAmount': this.data.hanshui,
      'rateOfAmount': this.data.shuie,
      "afterTaxAmount": this.data.shuihou,
      "netAmount": this.data.jingxiao,
      'attachmentStr': imgList.toString()
    }
    ysRequest({
      url: 'merchantOperation_web/sale/commission/saveInfo.htm',
      params,
      succ: res => {
        if (res.code == '0') {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
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
    let data = JSON.parse(options.data)
    this.setData({
      id: data.id,
      saleYmStart: data.saleYmStart,
      saleYmEnd: data.saleYmEnd,
      hanshui: data.containTaxAmount || '',
      shuilv: data.taxRate || '',
      shuie: data.rateOfAmount || '',
      shuihou: data.afterTaxAmount || '',
      jingxiao: data.netAmount || '',
      imgList: data.attachmentList,
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
    let _this = this
    _this.setData({
      globalData: t.globalData
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
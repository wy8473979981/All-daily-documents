// pages/service/overtime/overtime.js
let service = require("../../../static/js/service.js");
import main_config from "../../../config.js"
const {
  ysRequest
} = require('../../../utils/util.js')
var t = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    warningComp: null,
    imgList: [],
    dateStr: '',
    money: '',
    num: '',
    orginDate: '',
    picNum: true,
    category: {},
    globalData: {},
    disableSubmit: false,
	goodsName:''
  },
  bindinput: function (e) {
    let type = e.currentTarget.dataset.type
    let value = e.detail.value
    if (type == 'money') {
      this.setData({
        money: value
      })
    }else if(type == 'goodsName') {
		this.setData({
		  goodsName: value
		})
	} else {
      this.setData({
        num: value
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
  upload(e) {
    let _this = this
    let id = e.target.dataset.id
    service.upload().then(function (res) {
      let imgList = _this.data.imgList
      imgList.push({
        name: '',
        path: JSON.parse(res.data).data.fullPath
      })
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
  category: function () {
    ysRequest({
      url: 'merchantOpen_web/sale/category.htm',
      params: {
        "clerkId": t.globalData.detailInfo.clerkId,
        'openId': t.globalData.openid
      },
      succ: res => {
        this.setData({
          category: res
        })
      }
    })
  },
  submit: function (id) {
    if (this.data.disableSubmit) return
    let num = this.data.num
    let money = this.data.money
    if (!money) {
      this.data.warningComp.showWarning({
        warningTxt: '请输入销售额'
      })
      return false
    }
    if (!num) {
      this.data.warningComp.showWarning({
        warningTxt: '请输入销售笔数'
      })
      return false
    }
    // let imgList = []
    // for (var i = 0; i < this.data.imgList.length; i++) {
    //   imgList.push(this.data.imgList[i].path)
    // }
    // if (imgList.length < 1) {
    //   this.data.warningComp.showWarning({
    //     warningTxt: '请上传日结算单'
    //   })
    //   return false
    // }
    this.setData({
      disableSubmit: true
    })
    wx.showLoading({
      title: '提交中',
      mask: true
    })
    const _this = this;
    let c_data = {
      "version": "1.0",
      "timestamp": new Date().getTime(),
      "sign": main_config.sign,
      "clerkId": t.globalData.detailInfo.clerkId.toString(),
      'contNo': t.globalData.detailInfo.contNo.toString(),
	  "goodsName":this.data.goodsName,
      // 'paths': imgList.toString().replace(/\,/g, ';'),
      // "formId": id,
      "list": [{
        'saleYmd': this.data.orginDate,
        // 'monthId': this.data.category.data[0].monthId.toString(),
        // 'dayId': this.data.category.data[0].dayId.toString(),
        'count': num,
        'sale': money,
        // 'categoryCode': this.data.category.data[0].categoryCode
      }]
    }
    wx.request({
      method: 'POST',
      url: `${main_config.baseUrl}finance_web/sale/day/add.htm`,
      data: {
        data: JSON.stringify(c_data)
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 默认值
      },
      success(res) {
        wx.hideLoading()
        console.log(res, '----日销售提报回参')
        if (res.data.code == '0') {
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
          // _this.setData({
          //   disableSubmit: false
          // })
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail() {
        wx.hideLoading()
        wx.showToast({
          title: '请求失败',
          icon: 'fail',
          duration: 2000
        })
        _this.setData({
          disableSubmit: false
        })
      }
      //   },
      // complete(){
      //   wx.showToast({
      //     title: '请求失败',
      //     icon: 'fail',
      //     duration: 2000
      //   })
      //   wx.hideLoading()
      // }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let date = options.saleYmd
    this.setData({
      orginDate: date,
      dateStr: date.slice(0, 4) + '/' + date.slice(4, 6) + '/' + date.slice(6, 8),
      warningComp: this.selectComponent('#warningComp')
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      globalData: t.globalData
    })
    // console.log(this.data.globalData.detailInfo)
    // this.category()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

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
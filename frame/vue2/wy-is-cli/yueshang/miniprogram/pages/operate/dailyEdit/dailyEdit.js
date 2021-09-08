// pages/service/overtime/overtime.js
let service = require("../../../static/js/service.js");
import main_config from "../../../config.js"
var t = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: [],
    dateStr: '',
    money: '',discountMoney: '',beforeDiscountMoney: '',
    num: '',
    saleYmd: '',
    picNum: true,
    items: {},
    category: {},
    globalData: {},
    warningComp: null
  },
  bindinput: function (e) {
    let type = e.currentTarget.dataset.type
    let value = e.detail.value
    if (type == 'money') {
      this.setData({
        money: value,
        beforeDiscountMoney: this.data.discountMoney != `` ? (value - 0 + (this.data.discountMoney - 0)) : this.data.beforeDiscountMoney
      })
    } else if(type == 'num'){
      this.setData({
        num: value
      })
    }else if(type == 'discountMoney'){
      this.setData({
        discountMoney: value,
        beforeDiscountMoney: this.data.money != `` ? (value - 0 + (this.data.money - 0)) : this.data.beforeDiscountMoney
      })
    }else if(type == 'beforeDiscountMoney'){
      this.setData({
        beforeDiscountMoney: value
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
      imgList.push({ name: '', path: JSON.parse(res.data).data.fullPath })
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
  getData: function () {
    let _this = this
    wx.request({
      method: 'POST',
      url: `${main_config.baseUrl}merchantOperation_web/sale/update/category/detail.htm`,
      data: {
        "version": "1.0",
        "timestamp": new Date().getTime(),
        "sign": main_config.sign,
        "params": {
          "contNo": t.globalData.detailInfo.contNo,
          "clerkId": t.globalData.detailInfo.clerkId,
          "openId": t.globalData.detailInfo.openId,
          "saleYmd": this.data.saleYmd
        }
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        let paths = res.data.paths || ''
        let imgList=[]
        if (paths !== '') {
          paths.split(';').forEach(function (path) {
            imgList.push({
              path: path
            })
          })
        }

        _this.setData({
          imgList: imgList,
          num: res.data.data[0].count,
          money: res.data.data[0].sale,
          discountMoney: res.data.data[0].tenantDiscountAmount,
          beforeDiscountMoney:  res.data.data[0].tenantBeforeDiscountAmount,
          items: res.data.data[0]
        })
      }
    })
  },
  category: function () {
    let _this = this
    wx.request({
      method: 'POST',
      url: `${main_config.baseUrl}merchantOperation_web/sale/category.htm`,
      data: {
        "version": "1.0",
        "timestamp": new Date().getTime(),
        "sign": main_config.sign,
        "params": {
          "clerkId": t.globalData.detailInfo.clerkId,
          'openId': t.globalData.openid
        }
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        _this.setData({
          category: res.data
        })
      }
    })
  },
  confirm: function (e) {
    let num = this.data.num
    let money = this.data.money
    console.log(money)
    let discountMoney = this.data.discountMoney
    let beforeDiscountMoney = this.data.beforeDiscountMoney
    if (!money && money !=0) {
      this.data.warningComp.showWarning({
        warningTxt: '请输入实际销售额（折扣后）'
      })
      return false
    }
    if (!discountMoney && discountMoney != 0) {
      this.data.warningComp.showWarning({
        warningTxt: '请输入折扣金额'
      })
      return false
    }
    if (!beforeDiscountMoney && beforeDiscountMoney != 0) {
      this.data.warningComp.showWarning({
        warningTxt: '请输入销售额（折扣前）'
      })
      return false
    }
    if (!num && num != 0) {
      this.data.warningComp.showWarning({
        warningTxt: '请输入销售笔数'
      })
      return false
    }
    let imgList = []
    for (var i = 0; i < this.data.imgList.length; i++) {
      imgList.push(this.data.imgList[i].path)
    }
	wx.showLoading({
	  title: '提交中',
	  mask: true
	})
    wx.request({
      method: 'POST',
      url: `${main_config.baseUrl}merchantOperation_web/sale/day/add.htm`,
      data: {
        "version": "1.0",
        "timestamp": new Date().getTime(),
        "sign": main_config.sign,
        "clerkId": t.globalData.detailInfo.clerkId.toString(),
        'paths': imgList.toString().replace(/\,/g, ';'),
        "list": [{
          'saleYmd': this.data.category.saleYmd,
          'monthId': this.data.category.data[0].monthId.toString(),
          'dayId': this.data.category.data[0].dayId,
          'count': num,
          'sale': money,
          'discountMoney':discountMoney,
          'beforeDiscountMoney':beforeDiscountMoney,
          'categoryCode': this.data.category.data[0].categoryCode
        }]
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
		  wx.hideLoading()
        console.log(res)
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
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      },
	  fail () {
	    wx.hideLoading()
	    wx.showToast({
	      title: '提交请求失败,请稍后重试',
	      icon: 'none',
	      duration: 2000
	    })
	  }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let date = options.saleYmd
    this.setData({
      saleYmd: date,
      dateStr: date.slice(0, 4) + '/' + date.slice(4, 6) + '/' + date.slice(6, 8),
      warningComp: this.selectComponent('#warningComp')
    })
    let _this = this
    _this.setData({
      globalData: t.globalData
    })
    _this.category()
    _this.getData()
  }
})
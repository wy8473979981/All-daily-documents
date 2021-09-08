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
    dateStr: '',
    money: '',
    discountMoney:'',
    beforeDiscountMoney:'',
    num: '',
    picNum: true,
    category: {},
    globalData: {},
    disableSubmit: false,
	popView: true,
	popCont: 6
  },
  bindinput: function (e) {
    let type = e.currentTarget.dataset.type
    let value = e.detail.value
    if (type == 'money') {
      this.setData({
        money: value,
        beforeDiscountMoney: this.data.discountMoney != `` ? (value - 0 + (this.data.discountMoney - 0)) : value
      })
    } else if(type == 'num'){
      this.setData({
        num: value
      })
    }else if(type == 'discountMoney'){
      this.setData({
        discountMoney: value,
          beforeDiscountMoney: this.data.money != `` ? (value - 0 + (this.data.money - 0)) : value
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
      if (res.data && JSON.parse(res.data).data){
        if (JSON.parse(res.data).data.fullPath){
          imgList.push({ name: '', path: JSON.parse(res.data).data.fullPath })
        }else{
          console.log('fullPath = NULL')
        }
      }else{
        console.log("res.data or res.data.data = NULL")
      }
      _this.setData({
        imgList: imgList
      })
	  // console.log(imgList)
      if (imgList.length == 5) {
        _this.setData({
          picNum: false
        })
      }
    })
  },
  category: function (){
    ysRequest({
      url: 'merchantOperation_web/sale/category.htm',
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
    let discountMoney = this.data.discountMoney
    let beforeDiscountMoney = this.data.beforeDiscountMoney
    if (!money && money != 0) {
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
    if (imgList.length < 1) {
      this.data.warningComp.showWarning({
        warningTxt: '请上传日结算单'
      })
      return false
    }
    // wx.showLoading({
    //   title: '提交中',
    //   mask: true
    // })
	let $this = this
	this.setData({
		popView: false,
		popCont: 6
	})
	let timeSt = setInterval(function(){
		let cn = $this.data.popCont - 1
		console.log(cn)
		if(cn<=0){
			clearInterval(timeSt)
			$this.setData({
				popView: true,
				popCont: 6
			})
		}else{
			$this.setData({
				popCont: cn
			})
		}
	},1000)
    wx.request({
      method: 'POST',
      url: `${main_config.baseUrl}merchantOperation_web/sale/day/add.htm`,
      data: {
        "version": "1.0",
        "timestamp": new Date().getTime(),
        "sign": main_config.sign,
        "clerkId": t.globalData.detailInfo.clerkId.toString(),
        'paths': imgList.toString().replace(/\,/g, ';'),
        // "formId": id,
        "list": [{
          'saleYmd': this.data.category.saleYmd,
          'monthId': this.data.category.data[0].monthId.toString(),
          'dayId': this.data.category.data[0].dayId.toString(),
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
        // wx.hideLoading()
		clearInterval(timeSt)
		$this.setData({
			popView: true,
			popCont: 6
		})
        console.log(res, '----日销售提报回参')
        if (res.data.code == '0') {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          })
		  $this.setData({
		    disableSubmit: true
		  })
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 2000)
        } else {
          // this.setData({
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
        // wx.hideLoading()
		// this.setData({
		//   disableSubmit: false
		// })
		clearInterval(timeSt)
		$this.setData({
			popView: true,
			popCont: 6
		})
        wx.showToast({
          title: '当前时段提交人数较多请稍后再试',
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
      dateStr: date.slice(0,4) + '/' + date.slice(4, 6) + '/' + date.slice(6,8),
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
    this.category()
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

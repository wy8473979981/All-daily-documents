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
    money: '',
    num: '',
    saleYmd: '',
    picNum: true,
    items: {},
    category: {},
    globalData: {},
    warningComp: null,
	goodsId:'',
	goodsName:'',
	status:''
  },
  bindinput: function (e) {
    let type = e.currentTarget.dataset.type
    let value = e.detail.value
    if (type == 'money') {
      this.setData({
        money: value
      })
    } else {
      this.setData({
        num: value
      })
    }
  },
  del(e) {
    console.log(e)
    let {
      id,
      index
    } = e.currentTarget.dataset;
    let _this = this;
    let c_data = {
      "action": 1003,
      "id": id,
    }
    wx.request({
      method: 'POST',
      url: `${main_config.baseUrl}financial_service/sdk/platform/file/api`,
      data: c_data,
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 默认值
      },
      success(res) {
        console.log(res)
        if (res.data.code == 200) {
          let imgList = _this.data.imgList;
          imgList.splice(index, 1)
          _this.setData({
            imgList: imgList
          })
          if (imgList.length < 3) {
            _this.setData({
              picNum: true
            })
          }
        }
      }
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
    let _this = this;
    let id = e.target.dataset.id;
    let param = 'TBYYE_' + t.globalData.detailInfo.contNo + '_' + this.data.saleYmd;
    service.zsjFileUpload(param).then(function (res) {
      console.log(res);
      let imgList = _this.data.imgList;
      imgList.push({
        id: JSON.parse(res.data).data.id,
        path: `${main_config.baseUrl}${JSON.parse(res.data).data.path}`
      })
      _this.setData({
        imgList: imgList
      })
      if (imgList.length == 3) {
        _this.setData({
          picNum: false
        })
      }
    })
  },
  getData: function () {
    let _this = this
    console.log(t.globalData)
    let c_data = {
      "version": "1.0",
      "timestamp": new Date().getTime(),
      "sign": main_config.sign,
      "params": {
        "contNo": t.globalData.detailInfo.contNo,
        "clerkId": t.globalData.detailInfo.clerkId,
        "openId": t.globalData.detailInfo.openId,
        "saleYmd": this.data.saleYmd
      }
    }
    wx.request({
      method: 'POST',
      url: `${main_config.baseUrl}finance_web/sale/update/category/detail.htm`,
      data: {
        data: JSON.stringify(c_data)
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 默认值
      },
      success(res) {
        console.log(res)
        // let paths = res.data.paths || ''
        // let imgList=[]
        // if (paths !== '') {
        //   paths.split(';').forEach(function (path) {
        //     imgList.push({
        //       path: path
        //     })
        //   })
        // }
        _this.setData({
          // imgList: imgList,
          contNo: res.data.data.contNo,
          num: res.data.data.count,
          money: res.data.data.sale,
          items: res.data.data,
		  goodsName:res.data.goodsName,
		  goodsId:res.data.goodsId
        })
      }
    })
  },
  loadImgData() {
    let _this = this
    let c_data = {
      "action": 1001,
      "category": 'WX_TBYYE',
      "targetId": 'TBYYE_' + t.globalData.detailInfo.contNo + '_' + this.data.saleYmd,
      "size": 1000,
    }
    wx.request({
      method: 'POST',
      url: `${main_config.baseUrl}financial_service/sdk/platform/file/api`,
      data: c_data,
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 默认值
      },
      success(res) {
        console.log(res)
        let imgList = res.data.data.results.map(list => {
          return {
            id: list.id,
            path: main_config.baseUrl + list.path
          }
        })
        console.log(imgList)
        // let imgList = []
        // if (paths !== '') {
        //   paths.split(';').forEach(function (path) {
        //     imgList.push({
        //       path: path
        //     })
        //   })
        // }
        _this.setData({
          imgList: imgList,
        })
      }
    })
  },
  // category: function () {
  //   let _this = this
  //   wx.request({
  //     method: 'POST',
  //     url: `${main_config.baseUrl}merchantOpen_web/sale/category.htm`,
  //     data: {
  //       "version": "1.0",
  //       "timestamp": new Date().getTime(),
  //       "sign": main_config.sign,
  //       "params": {
  //         "clerkId": t.globalData.detailInfo.clerkId,
  //         'openId': t.globalData.openid
  //       }
  //     },
  //     header: {
  //       'content-type': 'application/json' // 默认值
  //     },
  //     success(res) {
  //       _this.setData({
  //         category: res.data
  //       })
  //     }
  //   })
  // },
  confirm: function (e) {
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
    let imgList = []
    for (var i = 0; i < this.data.imgList.length; i++) {
      imgList.push(this.data.imgList[i].path)
    }
    console.log(imgList)
    if (imgList.length < 1) {
      this.data.warningComp.showWarning({
        warningTxt: '请上传图片'
      })
      return false
    }
    let c_datas = {
      "version": "1.0",
      "timestamp": new Date().getTime(),
      "sign": main_config.sign,
      "clerkId": t.globalData.detailInfo.clerkId.toString(),
      'contNo': t.globalData.detailInfo.contNo.toString(),
      // 'paths': imgList.toString().replace(/\,/g, ';'),
      'saleYmd': this.data.saleYmd,
      "list": [{
        'saleYmd': this.data.saleYmd,
        // 'monthId': this.data.category.data[0].monthId.toString(),
        // 'dayId': this.data.category.data[0].dayId,
        'count': num,
        'sale': money,
        // 'categoryCode': this.data.category.data[0].categoryCode
      }]
    }
    wx.request({
      method: 'POST',
      url: `${main_config.baseUrl}finance_web/sale/day/add.htm`,
      data: {
        data: JSON.stringify(c_datas)
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 默认值
      },
      success(res) {
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
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let date = options.saleYmd
    console.log(date)
    this.setData({
      saleYmd: date,
      dateStr: date.slice(0, 4) + '/' + date.slice(4, 6) + '/' + date.slice(6, 8),
      warningComp: this.selectComponent('#warningComp'),
	  status:options.status == '已提交' ? true:false,
	  goodsName:options.goodsName
    })
	if(options.status == '已提交') {
		wx.setNavigationBarTitle({
		  title: '日销售录入详情' 
		})
	}else {
		wx.setNavigationBarTitle({
		  title: '修改日销售录入' 
		})
	}
    let _this = this
    _this.setData({
      globalData: t.globalData
    })
    // _this.category()
    _this.getData()
    // 读取图片
    _this.loadImgData()
  }
})
// pages/service/overtime/overtime.js
let service = require("../../../static/js/service.js");
import main_config from "../../../config.js"
var t = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reportTimeDesc: '', // 上报日期
    tenantAmount: '', // 已盖章销售额
    tenantCount: '', // 笔数
    imgList: [],
    globalData:{},
    warningComp: '',
    picNum: true
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
      imgList.push(JSON.parse(res.data).data.fullPath)
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
  bindinput: function (e) {
    let type = e.currentTarget.dataset.type
    let value = e.detail.value
    if (type == 'tenantAmount') {
      this.setData({
        tenantAmount: value
      })
    } else if(type == 'tenantCount'){
      this.setData({
        tenantCount: value
      })
    }
  },
  getData(){
    let _this = this;
    let id = this.data.id;
    wx.request({
      method: 'POST',
      url: `${main_config.baseUrl}merchantService_web/sale/commission/getInfoDetail.htm`,
      data: {
        "version": "1.0",
        "timestamp": new Date().getTime(),
        "sign": main_config.sign,
        "params": {
          id,
          "clerkId": t.globalData.detailInfo.clerkId,
        }
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log('获取详情数据:  ', res);
        let pageData = res.data.data || {};
        let {tenantAmount='', tenantCount='', reportTimeDesc, attachmentList} = pageData
        let imgList = [];
        if (attachmentList && attachmentList.length > 0) {
          attachmentList.forEach(item => {
            imgList.push(item.path)
          })
        }
        let date = reportTimeDesc.slice(0, 10);
        let arr = date.split('-');
        reportTimeDesc = arr[0] + '年' + arr[1] + '月' + arr[2] + '日'

        _this.setData({
          tenantAmount,
          tenantCount,
          imgList,
          reportTimeDesc
        })
      }
    })
  },
  submit: function () {
  
 
    let {tenantAmount, tenantCount} = this.data;
   
    if(tenantAmount === '') {
      this.data.warningComp.showWarning({
        warningTxt: '请输入已盖章销售额'
      })
      return false
    }

    if(tenantCount === '') {
      this.data.warningComp.showWarning({
        warningTxt: '请输入笔数'
      })
      return false
    }
   
    let imgList = []
    for (var i = 0; i < this.data.imgList.length; i++) {
      imgList.push(this.data.imgList[i])
    }
    if (imgList.length < 1) {
      this.data.warningComp.showWarning({
        warningTxt: '请上传盖章版销售额图片'
      })
      return false
    }
    wx.showLoading({
      title: '提交中',
      mask: true
    })
  
    wx.request({
      method: 'POST',
      url: `${main_config.baseUrl}merchantService_web/sale/commission/saveInfo.htm`,
      data: {
        "version": "1.0",
        "timestamp": new Date().getTime(),
        "sign": main_config.sign,
        params:{
          clerkId: t.globalData.detailInfo.clerkId.toString(),
          id: this.data.id, //提报记录id
          attachmentStr: imgList.join(), // 附件图片
          tenantAmount: this.data.tenantAmount, // 提报销售金额
          tenantCount : this.data.tenantCount //提报销售笔数
        }
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading()
	
        if (res.data.code == '0') {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(() => {
            wx.switchTab({
              url: '/pages/index/index'
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
      fail() {
        wx.hideLoading()
        wx.showToast({
          title: '提交失败',
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
    this.setData({
      id: options.id,
      globalData: t.globalData,
      warningComp: this.selectComponent('#warningComp')
    })
    this.getData()
  }
})
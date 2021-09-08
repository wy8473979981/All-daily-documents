const { ysRequest } = require('../../../utils/util.js')
import reg from '../../../utils/verify.js'
import main_config from "../../../config.js"
var t = getApp()
let service = require("../../../static/js/service.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: Number,
    contNo: '',
    bindTel: '',
    clerkName: '',
    idNo: '',
    sexIndex: 0,
    sex: 'F',
    clerkPhotoList: [],
    cardPhoto: [],
    healthCardList: [],
    sexArray: [
      {
        id: 0,
        name: '女'
      },
      {
        id: 1,
        name: '男'
      },
    ],
    warningComp: null,
    disableSubmit: false,
    entryTimeStr: "",
    isSales: true,
    isElecard: true,
    picNum0: true,
    picNum1: true,
    picNum2: true
  },

  bindPickerChange(e) {
    this.setData({
      sexIndex: e.detail.value
    })
    if (this.data.sexIndex == 0) {
      this.setData({
        sex: 'F'
      })
    } else {
      this.setData({
        sex: 'M'
      })
    }
  },
  bindKeyInput: function (e) {
    console.log(e.detail.value)
    // 获取某个输入框
    let type = e.target.dataset.key
    if (type == 'phone') {
      this.setData({
        bindTel: e.detail.value
      })
    } else if (type == 'name') {
      this.setData({
        clerkName: e.detail.value
      })
    } else if (type == 'numberId') {
      this.setData({
        idNo: e.detail.value
      })
    }
  },
  // switch开关
  switchChange(e) {
    let id = e.target.dataset.id
    if (id == 0) {
      this.setData({
        isSales: e.detail.value
      })
    } else {
      this.setData({
        isElecard: e.detail.value
      })
    }
  },
  upload0(e) {
    let _this = this
    let id = e.target.dataset.id
    service.upload().then(function (res) {
      let clerkPhotoList = _this.data.clerkPhotoList
      clerkPhotoList.push({ name: '', path: JSON.parse(res.data).data.fullPath })
      _this.setData({
        clerkPhotoList: clerkPhotoList
      })
      if (clerkPhotoList.length == 1) {
        _this.setData({
          picNum0: false
        })
      }
    })
  },
  upload1(e) {
    let _this = this
    let id = e.target.dataset.id
    service.upload().then(function (res) {
      console.log(res)
      let cardPhoto = _this.data.cardPhoto
      cardPhoto.push({ name: '', path: JSON.parse(res.data).data.fullPath })
      _this.setData({
        cardPhoto: cardPhoto
      })
      if (cardPhoto.length >= 2) {
        _this.setData({
          picNum1: false
        })
      }
    })
  },
  upload2(e) {
    let _this = this
    let id = e.target.dataset.id
    service.upload().then(function (res) {
      let healthCardList = _this.data.healthCardList
      healthCardList.push({ name: '', path: JSON.parse(res.data).data.fullPath })
      _this.setData({
        healthCardList: healthCardList
      })
      if (healthCardList.length >= 2) {
        _this.setData({
          picNum2: false
        })
      }
    })
  },
  del(e) {
    let id = e.currentTarget.dataset.index
    let type = e.currentTarget.dataset.type
    let clerkPhotoList = this.data.clerkPhotoList
    let cardPhoto = this.data.cardPhoto
    let healthCardList = this.data.healthCardList
    if (type == 0) {
      clerkPhotoList.splice(id, 1)
      this.setData({
        clerkPhotoList: clerkPhotoList
      })
      if (clerkPhotoList.length == 0) {
        this.setData({
          picNum0: true
        })
      }
    } else if (type == 1) {
      cardPhoto.splice(id, 1)
      this.setData({
        cardPhoto: cardPhoto
      })
      if (cardPhoto.length < 2) {
        this.setData({
          picNum1: true
        })
      }
    } else if (type == 2) {
      healthCardList.splice(id, 1)
      this.setData({
        healthCardList: healthCardList
      })
      if (healthCardList.length < 2) {
        this.setData({
          picNum2: true
        })
      }
    }
  },

  // 提交前校验
  checkParams(params) {
    if (!service.checkForm.phone(params.bindTel)) {
      this.data.warningComp.showWarning({
        warningTxt: '请填写正确的电话号码'
      })
      return false
    }
    if (!params.clerkName) {
      this.data.warningComp.showWarning({
        warningTxt: '请填写姓名'
      })
      return false
    }
    if (!reg.idNo.test(params.idNo)) {
      this.data.warningComp.showWarning({
        warningTxt: '请输入正确的身份证号'
      })
      return false
    }
    if (params.cardPhoto.length < 2) {
      this.data.warningComp.showWarning({
        warningTxt: '请上传正反面的身份证照片'
      })
      return false
    }
    return true
  },
  addEmployee() {
    let _this = this
    let id = _this.data.id
    let clerkOpenId = t.globalData.detailInfo.clerkOpenId
    let clerkName = _this.data.clerkName
    let sex = _this.data.sex
    let contNo = _this.data.contNo
    let bindTel = _this.data.bindTel
    let entryTimeStr = +new Date(_this.data.entryTimeStr)
    let isSales = Boolean(String(_this.data.isSales))
    let isElecard = Boolean(String(_this.data.isElecard))
    let clerkPhotoList = _this.data.clerkPhotoList
    let cardPhoto = _this.data.cardPhoto
    let healthCardList = _this.data.healthCardList
    let idNo = _this.data.idNo

    const params = {
      "id": id,
      "clerkOpenId": clerkOpenId,
      'clerkName': clerkName,
      'sex': sex,
      'contNo': contNo,
      'bindTel': bindTel,
      'entryTimeStr': entryTimeStr,
      'isSales': isSales,
      'isElecard': isElecard,
      'clerkPhotoList': clerkPhotoList,
      'cardPhoto': cardPhoto,
      'healthCardList': healthCardList,
      'idNo': idNo
    }
    if (this.data.disableSubmit) return
    if (!this.checkParams(params)) return
    this.setData({
      disableSubmit: true
    })
    ysRequest({
      url: 'merchantRegist_web/merClerkInfo/updateMerClerkInfo.htm',
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
              delta: 2
            })
          }, 2000)
        } else {
          this.setData({
            disableSubmit: false
          })
          wx.showToast({
            title: res.msg,
            icon: 'success',
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
    // wx.showLoading({
    //   title: '提交中',
    // })
    // wx.request({
    //   method: 'POST',
    //   url: `${main_config.baseUrl}merchantRegist_web/merClerkInfo/updateMerClerkInfo.htm`,
    //   data: {
    //     "version": "1.0",
    //     "timestamp": new Date().getTime(),
    //     "sign": main_config.sign,
    //     "params": {

    //     }
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success(res) {
    //     wx.hideLoading()
    //     if (res.data.code == 0) {
    //       wx.showToast({
    //         title: '成功',
    //         icon: 'success',
    //         duration: 2000
    //       })
    //       setTimeout(() => {
    //         wx.navigateBack({
    //           delta: 2
    //         })
    //       }, 2000)
    //     } else {
    //       wx.showToast({
    //         title: res.data.msg,
    //         icon: 'success',
    //         duration: 2000
    //       })
    //     }
    //   }
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let items = JSON.parse(options.item)
    console.log(items)
    let clerkPhotoList = [], cardPhoto = [], healthCardList = []
    for (let i = 0; i < items.clerkPhotoList.length; i++) {
      clerkPhotoList.push({
        name: '',
        path: items.clerkPhotoList[i].path
      })
    }
    for (let i = 0; i < items.cardPhoto.length; i++) {
      cardPhoto.push({
        name: '',
        path: items.cardPhoto[i].path
      })
    }
    for (let i = 0; i < items.healthCardList.length; i++) {
      healthCardList.push({
        name: '',
        path: items.healthCardList[i].path
      })
    }
    console.log(healthCardList)
    this.setData({
      id: items.id,
      bindTel: items.bindTel,
      clerkName: items.clerkName,
      idNo: items.idNo,
      contNo: items.contNo,
      clerkPhotoList: clerkPhotoList,
      cardPhoto: cardPhoto,
      healthCardList: healthCardList,
      entryTimeStr: items.entryTimeStr,
      isElecard: Boolean(Number(items.isElecard)),
      isSales: Boolean(Number(items.isSales)),
      warningComp: this.selectComponent('#warningComp')
    })
    if (items.sex == 'M') {
      this.setData({
        sexIndex: 1
      })
    } else {
      this.setData({
        sexIndex: 0
      })
    }
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
    let nowDate = service.formateDate(new Date(), '-')
    let startDate = service.formateDate(new Date(), '-', -10)
    let endDate = service.formateDate(new Date(), '-', 10)
    console.log(startDate, endDate)
    this.setData({
      entryTimeStr: nowDate,
      startDate: startDate,
      endDate: endDate
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
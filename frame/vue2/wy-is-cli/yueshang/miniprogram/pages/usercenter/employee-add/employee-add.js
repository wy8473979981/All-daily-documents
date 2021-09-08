const { ysRequest } = require('../../../utils/util.js')
import main_config from "../../../config.js"
import reg from '../../../utils/verify.js'
var t = getApp()
let service = require("../../../static/js/service.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    name: '',
    numberId: '',
    sexIndex: 0,
    sex: 'F',
    photos0: [],
    photos1: [],
    photos2: [],
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
    date: '',
    startDate: '',
    endDate: '',
    isSales: true,
    isElecard: true,
    picNum0: true,
    picNum1: true,
    picNum2: true,
    disableSubmit: false
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
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindKeyInput: function (e) {
    console.log(e.detail.value)
    // 获取某个输入框
    let type = e.target.dataset.key
    if (type == 'phone') {
      this.setData({
        phone: e.detail.value
      })
    } else if (type == 'name') {
      this.setData({
        name: e.detail.value
      })
    } else if (type == 'numberId') {
      this.setData({
        numberId: e.detail.value
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
      let photos0 = _this.data.photos0
      photos0.push({name:'', path:JSON.parse(res.data).data.fullPath})
      _this.setData({
        photos0: photos0
      })
      if (photos0.length == 1) {
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
      let photos1 = _this.data.photos1
      photos1.push({ name: '', path: JSON.parse(res.data).data.fullPath })
      _this.setData({
        photos1: photos1
      })
      if (photos1.length >= 2) {
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
      let photos2 = _this.data.photos2
      photos2.push({ name: '', path: JSON.parse(res.data).data.fullPath })
      _this.setData({
        photos2: photos2
      })
      if (photos2.length >= 2) {
        _this.setData({
          picNum2: false
        })
      }
    })
  },
  del (e) {
    let id = e.currentTarget.dataset.index
    let type = e.currentTarget.dataset.type
    let photos0 = this.data.photos0
    let photos1 = this.data.photos1
    let photos2 = this.data.photos2
    if(type == 0) {
      photos0.splice(id, 1)
      this.setData({
        photos0: photos0
      })
      if (photos0.length == 0) {
        this.setData({
          picNum0: true
        })
      }
    } else if(type == 1) {
      photos1.splice(id, 1)
      this.setData({
        photos1: photos1
      })
      if (photos1.length < 2) {
        this.setData({
          picNum1: true
        })
      }
    } else if (type == 2) {
      photos2.splice(id, 1)
      this.setData({
        photos2: photos2
      })
      if (photos2.length < 2) {
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

  // 新增员工
  addEmployee() {
    var _this = this
    let phone = this.data.phone
    let idCard = this.data.numberId
    let name =  this.data.name

    const params = {
      "clerkOpenId": t.globalData.detailInfo.clerkOpenId,
      'clerkName': name,
      'sex': _this.data.sex,
      'contNo': t.globalData.detailInfo.contNo,
      'bindTel': phone,
      'entryTime': +new Date(_this.data.date),
      'idNo': idCard,
      'isSales': Number(_this.data.isSales).toString(),
      'isElecard': Number(_this.data.isElecard).toString(),
      'clerkPhotoList': _this.data.photos0,
      'cardPhoto': _this.data.photos1,
      'healthCardList': _this.data.photos2
    }
    if (this.data.disableSubmit) return 
    if (!this.checkParams(params)) return
    this.setData({
      disableSubmit: true
    })
    ysRequest({
      url: 'merchantRegist_web/merClerkInfo/insertMerClerkInfo.htm',
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
    this.setData({
      warningComp: this.selectComponent('#warningComp')
    })
  },
  onShow: function () {
    let nowDate = service.formateDate(new Date(), '-')
    let startDate = service.formateDate(new Date(), '-', -10)
    let endDate = service.formateDate(new Date(), '-', 10)
    this.setData({
      date: nowDate,
      startDate: startDate,
      endDate: endDate
    })
  }
})
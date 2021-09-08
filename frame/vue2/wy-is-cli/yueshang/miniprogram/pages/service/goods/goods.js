import main_config from "../../../config.js"
const { ysRequest } = require('../../../utils/util.js')
let service = require("../../../static/js/service.js")
const today = service.formateDate(new Date(), '-')
Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    goodsType: '',
    goodsName: '',
    copyer: [],
    typeIndex1: 2,
    enterType: '',
    startTime: '00:00',
    date: '',
    startDate: '',
    endDate: '',
    disableSubmit: false,
    showRadio: false,
    goodsNum: 1,
    globalData: {},
    type1: [
      { name: '2', value: '出场', checked: 'true' },
      { name: '1', value: '进场' }
    ],
    type2: [
      { name: '0', value: '物品进场', checked: 'true' },
      { name: '1', value: '装修进场' }
    ],
    startTimeBegin: '00:00'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    radioChange1(e) {
      if (e.detail.value == 2) {
        this.setData({
          typeIndex1: 2,
          showRadio: false,
          enterType: ''
        })
      } else {
        this.setData({
          typeIndex1: 1,
          showRadio: true,
          enterType: '物品进场'
        })
      }
      console.log(this.data.typeIndex1)
    },
    radioChange2(e) {
      if (e.detail.value == 0) {
        this.setData({
          enterType: '物品进场'
        })
      } else {
        this.setData({
          enterType: '装修进场',
        })
      }
      console.log(this.data.enterType)
    },
    startTime: function (e) {
      this.setData({
        startTime: e.detail.value
      })
    },
    bindDateChange: function (e) {
      const curTime = {
        hour: new Date().getHours(),
        minute: new Date().getMinutes()
      }
      this.setData({
        date: e.detail.value,
        startTimeBegin: e.detail.value === today ? `${curTime.hour + parseInt(this.data.globalData.releaseApplyAdvanceTime)}:${curTime.minute + 1}` : '00:00'
      })
    },
    inputGoodsNum: function (e) {
      this.setData({
        goodsNum: e.detail.value
      })
    },
    goUrl: function (e) {
      wx.navigateTo({
        url: '/pages/service/goodsTypePicker/goodsTypePicker?date=' + this.data.date
      })
    },

    // 校验参数
    checkParams() {

      // 时间校验
      let date = this.data.date.split('-')
      let time = this.data.startTime.split(':')
      const target = new Date(date[0] * 1, (date[1] - 1)*1, date[2]*1, time[0]*1, time[1]*1, 0)
      const distance = Number(this.data.globalData.releaseApplyAdvanceTime) * 3600 * 1000 
      if (target.getTime() < distance + Date.now()) {
        this.selectComponent('#warningComp').showWarning({
          warningTxt: `需提前${this.data.globalData.releaseApplyAdvanceTime}小时申请`
        })
        return false
      }
      if (!this.data.goodsType) {
        this.selectComponent('#warningComp').showWarning({
          warningTxt: '申请货品类型不能为空'
        })
        return false
      }
      return true
    },
    submit: function () {
      var _this = this
      let ccToClerks = []
      let newArr = _this.data.copyer
      for (let i = 0; i < newArr.length; i++) {
        ccToClerks.push(newArr[i].id)
      }
      if (this.data.disableSubmit) return
      if (!this.checkParams()) return
      this.setData({
        disableSubmit: true
      })
      const params = {
        "clerkId": this.data.globalData.clerkId,
        "applyStart": this.data.date + ' ' + this.data.startTime,
        "type": this.data.typeIndex1,
        // "type": (Number(_this.data.typeIndex1)+1).toString(),
        // "formId": id,
        "brandName": this.data.globalData.brandName,
        "openId": this.data.globalData.openId,
        "enterType": this.data.enterType,
        "goodsType": this.data.goodsType,
        "goodsCount": this.data.goodsNum,
        'remark': this.data.remark
      }

      ysRequest({
        url: 'merchantService_web/release/application.htm',
        method: 'post',
        params,
        succ: (res) => {
          if (res.code == '0') {
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
    // 监听申请说明输入
    bindKeyInput(e) {
      const value = e.detail.value
      this.setData({
        remark: value
      })
    }
  },
  pageLifetimes: {
    show () {
      const curTime = {
        hour: new Date().getHours(),
        minute: new Date().getMinutes()
      }
      let nowDate = service.formateDate(new Date(), '-')
      let startDate = service.formateDate(new Date(), '-', -10)
      let endDate = service.formateDate(new Date(), '-', 10)
      const { brandName, openId, clerkId, storeNo, clerkName, bindTel, releaseApplyAdvanceTime} = getApp().globalData.detailInfo
      this.setData({
        date: nowDate,
        startDate: nowDate,
        endDate: endDate,
        startTimeBegin: `${curTime.hour + parseInt(releaseApplyAdvanceTime)}:${curTime.minute + 1}`,
        startTime: `${curTime.hour + parseInt(releaseApplyAdvanceTime)}:${curTime.minute + 1}`,
        globalData: { brandName, openId, clerkId, storeNo, clerkName, bindTel, releaseApplyAdvanceTime }
      })
      console.log(this.data.startTimeBegin, '---全局')
    }
  }
})

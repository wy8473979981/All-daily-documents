var t = getApp()
import main_config from "../../../config.js"
let service = require("../../../static/js/service.js")
const { ysRequest } = require('../../../utils/util.js')
const today = service.formateDate(new Date(), '-')
Component({
  options: {
    styleIsolation: 'apply-shared'
  },

  /**
   * 组件的初始数据
   */
  data: {
    types: [],
    name: '',
    num: '',
    phone: '',
    typeIndex: 0,
    startTime: '00:00',
    endTime: '24:00',
    date: '',
    startDate: '',
    endDate: '',
    remark: '',
    isChecked: false,
    globalData: {},
    disableSubmit: false,
    startTimeBegin: '00:00',
    isToday: true
  },

  pageLifetimes: {
    show() {
      const curTime = {
        hour: new Date().getHours(),
        minute: new Date().getMinutes()
      }
      console.log(curTime, '---curtime')
      let nowDate = service.formateDate(new Date(), '-')
      // let startDate = service.formateDate(new Date(), '-', -10)
      // let startDate = '2001-07-01'
      let endDate = service.formateDate(new Date(), '-', 10)
      const { clerkId, brandName, openId, broadcastApplyAdvanceTime, overtimeApplyAdvanceTime, storeNo, clerkName, bindTel } = getApp().globalData.detailInfo
      let startTimeBegin = new Date().getHours() + parseInt(overtimeApplyAdvanceTime) + 1
      this.setData({
        date: nowDate,
        startDate: nowDate,
        endDate: endDate,
        startTimeBegin: `${curTime.hour + parseInt(overtimeApplyAdvanceTime)}:${curTime.minute + 1}`,
        startTime: `${curTime.hour + parseInt(overtimeApplyAdvanceTime)}:${curTime.minute + 1}`,
        globalData: {
          clerkId, brandName, openId, broadcastApplyAdvanceTime, overtimeApplyAdvanceTime, storeNo, clerkName, bindTel
        },
      })
      console.log(this.data.startTimeBegin, '---开始')
      var _this = this
      ysRequest({
        url: 'merchantService_web/overtime/getMerOvertimeType.htm',
        method: 'post',
        params: {},
        succ: res => {
          this.setData({
            types: res.data.type.reverse() || []
          })
        }
      })
    }
  },
  methods: {
    bindKeyInput: function (e) {
      let key = e.currentTarget.dataset.key
      if (key == 'name') {
        this.setData({
          name: e.detail.value
        })
      } else if (key == 'phone') {
        this.setData({
          phone: e.detail.value
        })
      } else if (key == 'num') {
        this.setData({
          num: e.detail.value
        })
      } else if (key == 'remark') {
        this.setData({
          remark: e.detail.value
        })
      }
    },
    switchChange: function (e) {
      this.setData({
        isChecked: !this.data.isChecked
      })
    },
    // 切换日期
    bindDateChange: function (e) {
      const curTime = {
        hour: new Date().getHours(),
        minute: new Date().getMinutes()
      }
      this.setData({
        date: e.detail.value,
        startTimeBegin: e.detail.value === today ? `${curTime.hour + parseInt(this.data.globalData.overtimeApplyAdvanceTime)}:${curTime.minute + 1}`: '00:00'
      })
    },
    bindPickerChange: function (e) {
      this.setData({
        typeIndex: e.detail.value
      })
    },
    // 切换开始时间
    bindTimeStart: function (e) {
      this.setData({
        startTime: e.detail.value
      })
    },
    bindTimeEnd: function (e) {
      this.setData({
        endTime: e.detail.value
      })
    },

    // 入参校验
    checkParams() {
      // 时间校验
      let date = this.data.date.split('-')
      let time = this.data.startTime.split(':')
      const target = new Date(date[0] * 1, (date[1] - 1) * 1, date[2] * 1, time[0] * 1, time[1] * 1, 0)
      const distance = Number(this.data.globalData.overtimeApplyAdvanceTime) * 3600 * 1000
      if (target.getTime() < distance + Date.now()) {
        this.selectComponent('#warningComp').showWarning({
          warningTxt: `需提前${this.data.globalData.overtimeApplyAdvanceTime}小时申请`
        })
        return false
      }
      if (parseInt(this.data.startTime.split(':')[0]) > parseInt(this.data.endTime.split(':')[0])) {
        this.selectComponent('#warningComp').showWarning({
          warningTxt: '结束时间不能小于开始时间'
        })
        return false
      }
      // 校验
      if (!this.data.name) {
        this.selectComponent('#warningComp').showWarning({
          warningTxt: '请填写现场负责人'
        })
        return false
      }
      if (!service.checkForm.phone(this.data.phone)) {
        this.selectComponent('#warningComp').showWarning({
          warningTxt: '请填写正确的电话号码'
        })
        return false
      }
      if (!this.data.num) {
        this.selectComponent('#warningComp').showWarning({
          warningTxt: '请填写工作人数'
        })
        return false
      }
      if (!this.data.remark) {
        this.selectComponent('#warningComp').showWarning({
          warningTxt: '请填写申请说明'
        })
        return false
      }
      return true
    },
    // 加班提交
    confirm: function (id) {
      var _this = this
      if (this.data.disableSubmit) return
      if (!this.checkParams()) return
      const params = {
        "clerkId": this.data.globalData.clerkId,
        "personInCharge": this.data.name,
        "phone": this.data.phone,
        "overtimePersonNum": this.data.num,
        "brandName": this.data.globalData.brandName,
        "openId": this.data.globalData.openId,
        "hasOuterPerson": '0',
        "overtimeBegin": this.data.date + ' ' + this.data.startTime,
        'overtimeEnd': this.data.date + ' ' + this.data.endTime,
        'overtimeType': (Number(this.data.typeIndex) + 1).toString(),
        'remark': this.data.remark
      }
      this.setData({
        disableSubmit: true
      })
      ysRequest({
        url: 'merchantService_web/overtime/application.htm',
        method: 'post',
        params,
        succ: (res) => {
          if (res.code === '0') {
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 2000
            })
            wx.hideLoading()
            wx.navigateBack({
              delta: 1
            })
          } else {
            wx.showToast({
              icon: 'none',
              title: res.msg || '请求失败',
              duration: 2000
            })
            this.setData({
              disableSubmit: false
            })
          }
        },
        fail: (res) => {
          this.setData({
            disableSubmit: false
          })
        }
      })
    },
  }
})

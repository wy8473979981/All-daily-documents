import main_config from "../../../config.js"
import {urgeService} from '../../../requests/apis.js'
const { ysRequest } = require('../../../utils/util.js')
const { regeneratorRuntime } = global
var t = getApp()
Component({
  data: {
    arrow_right: '../../../static/images/icon_arrow_right.png',
    qrcode: '../../../static/images/icon_home_blue.png',
    statusCode: 0,
    serviceId: '',
    globalData: {},
    items: {},
    info: {
      applicationNo: null,
      statusName: null,
      brandName: null,
      storeNos: null,
      clerkName: null,
      phoneNumber: null
    },
    disableSubmit: false
  },
  lifetimes: {
    created () {
      // this.setData({
        
      // })
    }
  },
  pageLifetimes: {
    show () {
      const pages = getCurrentPages()
      const {options} = pages.pop()
      const { clerkId, mallId, brandName, clerkName } = getApp().globalData.detailInfo
      this.setData({
        serviceId: options.serviceId,
        globalData: {
          clerkId, mallId, brandName, clerkName
        }
      })
      ysRequest({
        url: 'merchantOpen_web/overtime/detail.htm',
        params: {
          "clerkId": this.data.globalData.clerkId,
          "serviceId": this.data.serviceId
        },
        succ: res => {
          if (res.code === '0') {
            const {
              applicationNo,
              statusName,
              brandName,
              storeNos,
              clerkName,
              phoneNumber
            } = res.data
            this.setData({
              info: {
                applicationNo,
                statusName,
                brandName,
                storeNos,
                clerkName,
                phoneNumber
              },
              items: res.data || [],
              statusCode: res.data.statusCode.substr(-1, 1)
            })
          }
        }
      })
    }
  },
  methods: {
    goUrl(e) {
      wx.navigateTo({
        url: '/pages/service/evaluate/evaluate?serviceId=' + this.data.serviceId
      })
    },
    // 催办
    async urge() {
      const params = {
        params: {
          mallId: this.data.globalData.mallId,
          brandName: this.data.globalData.brandName,
          clerkId: this.data.globalData.clerkId,
          clerkName: this.data.globalData.clerkName,
          serviceId: this.data.serviceId
        }
      }
      if (this.data.disableSubmit)return
      this.setData({
        disableSubmit: true
      })
      const res = await urgeService(params)
      if (res.code === '0') {
        setTimeout(() => {
          wx.navigateBack()
        }, 2000)
      } else {
        this.setData({
          disableSubmit: false
        })
      }
    }
  }
})
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
    disableSubmit: false,
	//评价
	pingjia: [
		{src:'../../../static/images/icon_empty_star.png',id:1},
		{src:'../../../static/images/icon_empty_star.png',id:2},
		{src:'../../../static/images/icon_empty_star.png',id:3},
		{src:'../../../static/images/icon_empty_star.png',id:4},
		{src:'../../../static/images/icon_empty_star.png',id:5}
	],
	pingjia_sudu: [],
	pingjia_zhiliang: [],
	pingjia_taidu: [],
    userClerkId: null
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
        },
        userClerkId:clerkId
      })
      ysRequest({
        url: 'merchantService_web/overtime/detail.htm',
        params: {
          "clerkId": this.data.globalData.clerkId,
          "serviceId": this.data.serviceId
        },
        succ: res => {
			console.log(res)
          if (res.code === '0') {
            const {
              applicationNo,
              statusName,
              brandName,
              storeNos,
              clerkName,
              phoneNumber,
                clerkId
            } = res.data
            this.setData({
              info: {
                applicationNo,
                statusName,
                brandName,
                storeNos,
                clerkName,
                phoneNumber,
                  clerkId
              },
              items: res.data || [],
              statusCode: res.data.statusCode.substr(-1, 1)
            })
			this.changeStar(1,res.data.respond)
			this.changeStar(2,res.data.quality)
			this.changeStar(3,res.data.attitude)
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
    },
	changeStar: function(type,num){
		let oriar = []
		for(let i=0;i<this.data.pingjia.length;i++){
			oriar[i] = {}
			oriar[i].id = i+1
			if(i<=(num-1)){
				oriar[i].src = '../../../static/images/icon_full_star.png'
			}else{
				oriar[i].src = '../../../static/images/icon_empty_star.png'
			}
		}
		if(type==1){
			this.setData({
				pingjia_sudu: oriar
			})
		}
		if(type==2){
			this.setData({
				pingjia_zhiliang: oriar
			})
		}
		if(type==3){
			this.setData({
				pingjia_taidu: oriar
			})
		}
		return;
	}
  }
})
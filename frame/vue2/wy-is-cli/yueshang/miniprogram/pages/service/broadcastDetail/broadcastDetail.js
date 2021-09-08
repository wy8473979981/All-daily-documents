import main_config from "../../../config.js"
import {urgeService} from '../../../requests/apis.js'
const {ysRequest} = require('../../../utils/util.js')
const { regeneratorRuntime } = global

var t = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    arrow_right: '../../../static/images/icon_arrow_right.png',
    qrcode: '../../../static/images/icon_home_blue.png',
    serviceId: '',
    statusCode: 0,
    date: [],
    globalData: {},
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
    if (this.data.disableSubmit) return
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      serviceId: options.serviceId
    })
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
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const {mallId, brandName, clerkId, clerkName, path } = getApp().globalData.detailInfo
    this.setData({
      globalData: { mallId, brandName, clerkId, clerkName, path },
      userClerkId:clerkId
    })
    ysRequest({
      method: 'post',
      url: 'merchantService_web/broadcast/detail.htm',
      params: {
        "clerkId": this.data.globalData.clerkId,
        "serviceId": this.data.serviceId
      },
      succ: (res) => {
        console.log(res, '----广播详情')
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
            date: res.data.broadcastTime.split(' '),
            statusCode: res.data.statusCode.substr(-1, 1)
          })
		  this.changeStar(1,res.data.respond)
		  this.changeStar(2,res.data.quality)
		  this.changeStar(3,res.data.attitude)
        }
      }
    })
  }
})
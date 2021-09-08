// pages/service/requestNote/requestNote.js
var t = getApp()
const {ysRequest} = require('../../../utils/util.js')
import main_config from "../../../config.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arrow_right: '../../../static/images/icon_arrow_right.png',
    qrcode: '../../../static/images/icon_home_blue.png',
    btnSta: true,
    statusCode: 0,
    serviceId: '',
    globalData: {},
    items: {},
    images: [],
    info: {
      applicationNo: null,
      statusName: null,
      brandName: null,
      storeNos: null,
      clerkName: null,
      phoneNumber: null
    },
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
      // url: e.currentTarget.dataset.path
      url: '/pages/service/evaluate/evaluate?serviceId=' + this.data.serviceId
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
  urge() {
    this.setData({
      btnSta: !this.data.btnSta
    })
    wx.showToast({
      title: '催办成功',
      icon: 'success',
      duration: 2000
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
      const {clerkId} = getApp().globalData.detailInfo
    this.setData({
      globalData: t.globalData,
      userClerkId:clerkId
    })
    ysRequest({
      url: 'merchantService_web/repair/detail.htm',
      params: {
        "clerkId": t.globalData.detailInfo.clerkId,
        "serviceId": this.data.serviceId
      },
      succ: res => {
        if (res.code === '0') {
          const {
            number,
            statusName,
            storeNos,
            clerkName,
            phoneNumber,
            clerkId
          } = res.data.merServiceAllBO
          this.setData({
            info: {
              applicationNo: number,
              statusName,
              brandName: t.globalData.detailInfo.brandName,
              storeNos,
              clerkName,
              phoneNumber,
              clerkId
            },
            items: res.data || [],
            statusCode: res.data.merServiceAllBO.statusCode.substr(-1, 1)
          })
		  this.changeStar(1,res.data.respond)
		  this.changeStar(2,res.data.quality)
		  this.changeStar(3,res.data.attitude)
          let imgList = res.data.imgUrl
          if (imgList) {
            this.setData({
              images: res.data.imgUrl.split(';')
            })
          }
        }
      }
    })
  }
})
var t = getApp()
const { getUnviewCount, ysRequest } = require('../../../utils/util.js')
import main_config from "../../../config.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    global: {},
    iconLists: [{
      name: '加班申请',
      icon: '../../../static/images/assets/icon_overtime.png',
      url: '/pages/service/overtime/overtime'
    }, {
      name: '放行申请',
      icon: '../../../static/images/assets/icon_goods.png',
      url: '/pages/service/goods/goods'
    }, {
      name: '广播申请',
      icon: '../../../static/images/assets/icon_boardcast.png',
      url: '/pages/service/broadcast/broadcast'
    },{
      name: '报修申请',
      icon: '../../../static/images/assets/icon_fixed.png',
      url: '/pages/service/project/project'
    }, {
      name: '投诉申请',
      icon: '../../../static/images/assets/icon_opinion.png',
      url: '/pages/service/complain/complain'
    }
    ], 
    // {
    //   name: '推广位申请',
    //     icon: '../../../static/images/assets/icon_advert.png',
    //   url: '/pages/service/advert/advert'
    // }, {
    //   name: '工程报修申请',
    //     icon: '../../../static/images/assets/icon_fixed.png',
    //   url: '/pages/service/project/project'
    // }],
    items: [],
    scrollTop: 0,
    arrow_right: '../../../static/images/icon_arrow_right.png',
    icon_no_data: '../../../static/images/icon_no_data.png',
    userClerkId: null
  },
  upper: function(e) {
  },
  lower: function(e) {
  },
  scroll: function(e) {
  },
  goPage: function(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.path
    })
  },
  goEvaluate(e) {
    wx.navigateTo({
      url: '/pages/service/evaluate/evaluate?serviceId=' + e.currentTarget.dataset.id
    })
  },
  goUrl: function(e) {
    // 1001：加班  1002：物品放行 1003：广播  1004：推广位  1005: 工程保修  1006：投诉与建议
    let type = e.currentTarget.dataset.type
    let serviceId = e.currentTarget.dataset.serviceid
    let path = ''
    switch (type) {
      case "1001":
        path = '/pages/service/overtimeDetail/overtimeDetail?serviceId=' + serviceId
        break;
      case "1002":
        path = '/pages/service/goodsDetail/goodsDetail?serviceId=' + serviceId
        break;
      case "1003":
        path = '/pages/service/broadcastDetail/broadcastDetail?serviceId=' + serviceId
        break;
      case "1004":
        path = ''
        break;
      case "1005":
        path = '/pages/service/projectDetail/projectDetail?serviceId=' + serviceId
        break;
      case "1006":
        path = '/pages/service/complainDetail/complainDetail?serviceId=' + serviceId
        break;
      default:
        path = '/pages/404/404'
    }
    wx.navigateTo({
      url: path
    })
  },

  onLoad () {
    const { pdContId, pdMallId, clerkOpenId, clerkId, shortName, brandName, storeNo, openId } = getApp().globalData.detailInfo

    this.setData({
      global: {
        clerkId,
        pdContId,
        pdMallId,
        openid: openId,
        clerkOpenId,
        shortName,
        brandName,
        storeNo
      },
      userClerkId:clerkId
    });
  },
  onShow: function() {
    getUnviewCount(1, this.data.global.clerkOpenId)
    var _this = this
    ysRequest({
      url: 'merchantService_web/serviceAll/lastest.htm',
      params: {
        "clerkId": this.data.global.clerkId,
        "count": '10'
      },
      succ: res => {
        this.setData({
          items: res.data.list || []
        })
      }
    })
  }
})
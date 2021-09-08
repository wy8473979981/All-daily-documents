// pages/service/index/index.js
let Charts = require('../../../utils/wx-charts.js')
var t = getApp()
const { getUnviewCount, ysRequest } = require('../../../utils/util.js')
import main_config from "../../../config.js"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    global: {},
    items: [],
    scrollTop: 0,
    icon_no_data: '../../../static/images/icon_no_data.png'
  },
  upper: function (e) {
  },
  lower: function (e) {
  },
  scroll: function (e) {
  },
  goPage: function (e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.path
    })
  },
  salesChart: function (e) {
    var _this = this
    wx.request({
      method: 'POST',
      url: `${main_config.baseUrl}merchantOperation_web/sale/salesChart.htm`,
      data: {
        "version": "1.0",
        "timestamp": new Date().getTime(),
        "sign": main_config.sign,
        "params": {
          'contNo': this.data.global.contNo
          // 'contNo': 'SYFXZZ18029'
        }
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        let data = res.data
        let current = []
        let last = []
        let dataList = res.data.dataList
        data.current.forEach(function(val){
          if(val == null) {
            current.push(0)
          } else {
            current.push(val)
          }
        })
        data.last.forEach(function (val) {
          if (val == null) {
            last.push(0)
          } else {
            last.push(val)
          }
        })
        new Charts({
          canvasId: 'canvas',
          type: 'line',
          extra: {
            lineStyle: 'curve' //线条的形状（弧形）
          },
          categories: dataList,
          series: [{
            name: '近7天销售额',
            data: current
          }, {
            name: '去年同期',
            data: last
          }],
          yAxis: {
            format: function (val) {
              return val + '万';
            }
          },
          width: wx.getSystemInfoSync().windowWidth,
          height: 200
        })
      }
    })
  },
  getData: function (e) {
    wx.showLoading({
      title: '加载中',
    })
    var _this = this
    wx.request({
      method: 'POST',
      url: `${main_config.baseUrl}merchantOperation_web/sale/day/record.htm`,
      data: {
        "version": "1.0",
        "timestamp": new Date().getTime(),
        "sign": main_config.sign,
        "params": {
          'contNo': this.data.global.contNo,
          'clerkId': this.data.global.clerkId,
          'openId': this.data.global.openid
        }
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log('success')
        wx.hideLoading()
        let data = res.data.data
        let arr = []
        for (let i in data) {
          arr.push({
            key: i,
            newArr: data[i]
          })
        }
        _this.setData({
          items: arr || []
        })
      }
    })
  },
  detail: function (e) {
    let saleYmd = e.currentTarget.dataset.item.saleYmd
    let url = '/pages/operate/dailyDetail/dailyDetail?saleYmd=' + saleYmd
    wx.navigateTo({
      url: url
    })
  },
  goUrl: function (e) {
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
        path = ''
        break;
      case "1006":
        path = ''
        break;
      default:
        path = '/pages/404/404'
    }
    wx.navigateTo({
      url: path
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { pdContId, pdMallId, clerkOpenId, clerkId, shortName, brandName, storeNo, contNo, openId } = getApp().globalData.detailInfo

    this.setData({
      global: {
        contNo,
        clerkId,
        pdContId,
        pdMallId,
        openid: openId,
        clerkOpenId,
        shortName,
        brandName,
        storeNo
      }
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    getUnviewCount(2, this.data.global.clerkOpenId) // 0627隐藏
    this.salesChart()
    this.getData()
  }
})

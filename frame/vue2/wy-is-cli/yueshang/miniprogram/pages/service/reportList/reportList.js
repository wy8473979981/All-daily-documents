// pages/message.js
var t = getApp()
const { ysRequest } = require('../../../utils/util.js')
import main_config from "../../../config.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: { id: '', name: '全部'},
    showTabLists: false,
    tabs: [{
      id: '', name: '全部'
    },{
      id: 100701,
      name: '已提交'
    }, {
      id: 100702,
      name: '已失效'
    }, {
      id: 100703,
      name: '处理中'
    }, {
      id: 100704,
      name: '已完成'
    }],
    pages: 0,
    page: 1,
    items: [],
    globalData: [],
    pullUpstatus: true,
    noData: false,
    icon_no_data: '../../../static/images/icon_no_data.png'
  },
  showTabsFn: function () {
    this.setData({
      showTabLists: !this.data.showTabLists
    })
  },
  selectTab: function (e) {
    var item = e.currentTarget.dataset.item
    this.setData({
      currentTab: item,
      items: [],
      showTabLists: !this.data.showTabLists,
      page: 1
    })
    this.getData()
  },
  // 跳转详情界面
  goLink: function (e) {
    var that = this
    var item = e.currentTarget.dataset.item
    var key = e.currentTarget.dataset.key
    if(key == 'add') {
      wx.navigateTo({
        url: '../report/report',
      })
    } else {
      wx.navigateTo({
        url: '../reportDetail/reportDetail?item=' + JSON.stringify(item),
      })
    }
  },
  getData: function () {
    this.setData({
      globalData: t.globalData
    })
    ysRequest({
      url: 'merchantService_web/report/list.htm',
      method: 'post',
      params: {
        "clerkId": t.globalData.detailInfo.clerkId,
        "statusCode": this.data.currentTab.id,
        "mallId": this.data.globalData.detailInfo.mallId,
        "page": this.data.page,
        "itemsPerPage": 10
      },
      succ: (res) => {
        if(res.data) {
          let items = this.data.items.concat(res.data)
          wx.stopPullDownRefresh()
          this.setData({
            pullUpstatus: true,
            items: items || [],
            pages: Math.ceil(res.data.count / 10)
          })
        }
        if (this.data.items.length == 0) {
          this.setData({
            noData: true
          })
        } else {
          this.setData({
            noData: false
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    this.setData({
      items: []
    })
    this.getData(1)
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
    this.setData({
      items: [],
      page: 1
    })
    this.getData(1)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.pullUpstatus) {
      this.setData({
        pullUpstatus: false,
        page: this.data.page + 1
      })
      
      this.getData(this.data.page)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
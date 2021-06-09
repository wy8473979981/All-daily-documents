import main_config from "../../../config.js"
const {ysRequest} = require('../../../utils/util.js')
let t = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [],
    checkedId: [],
    figure: "../../../static/images/usercenter_avatar.png",
  },
  checkboxChange: function (e) {
    let curId = e.currentTarget.dataset.item.id
    let newArr = this.data.checkedId
    newArr.push(curId)
    for(let i = 0; i<newArr.length-1;i++){
      if(newArr[i] == curId){
        newArr.splice(i,1)
        newArr.pop(curId)
      }
    }
    this.setData({
      checkedId: newArr
    })
  },
  confirm: function () {
    let newArr = []
    for(let i = 0;i<this.data.checkedId.length;i++){
      for(let j = 0; j< this.data.items.length;j++){
        if (this.data.items[j].id==this.data.checkedId[i]){
          newArr.push(this.data.items[j])
        }
      }
    }
    let pages = getCurrentPages()
    let prevPage = pages[pages.length - 2]
    prevPage.setData({
      copyer: newArr
    })
    console.log(newArr)
    wx.navigateBack({
      delta: 1
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
    ysRequest({
      url:'merchantOpen_web/merClerkInfo/getMerClerkInfoList.htm',
      params: {
        "clerkOpenId ": t.globalData.detailInfo.clerkOpenId
      },
      succ: res => {
        let data = res.data.params
        this.setData({
          items: data || []
        })
      }
    })
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
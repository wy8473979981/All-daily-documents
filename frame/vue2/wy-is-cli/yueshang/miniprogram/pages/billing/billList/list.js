const {ysRequest} = require('../../../utils/util.js')
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 'invoiceReceList',
    tabs: [{
      id: 'invoiceReceList',
      name: '未开票'
    }, {
      id: 'invoiceList',
      name: '已开票'
    }],

    invoiceReceList: [],

    invoiceList: [],
  },

  clickTab(e) {
    var type = e.currentTarget.dataset.current
    this.setData({
      currentTab: type
    })
    this.getList(type)
  },

  getList(type) {
    // merchantOperation_web/bill/invoiceReceList.htm 未开票
    // merchantOperation_web/bill/invoiceList.htm 已开票
    const { clerkId } = app.globalData.detailInfo
    ysRequest({
      url: `merchantOperation_web/bill/${type}.htm`,
      method: 'post',
      params: {
        clerkId
      },
      succ: res => {
        this.setData({
          [type]: res.data
        })
      },
    })
  },

  goToBilling() {
    wx.navigateTo({
      url: '/pages/billing/billing/billing',
    })
  },

  handleSelect(e) {
    const currentItem = e.target.dataset.current;
    let list = this.data.invoiceReceList;
    list.find(item => item.id === currentItem.id).isChecked = !list.find(item => item.id === currentItem.id).isChecked;
    this.setData({ invoiceReceList: [...list] })
  },

  handleSubmit() {
    const selectedList = this.data.invoiceReceList.filter(item => item.isChecked)
    if (selectedList.length === 0) {
      wx.showToast({
        title: '请先选择',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (selectedList[0].invoiceType == 1) {
      wx.showToast({
        title: '暂未上线电子专票，请联系管理员',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (this.validateEmpty(selectedList) && this.validateIsSame(selectedList)) {
      app.globalData.billingList = selectedList
      this.goToBilling()
    }
  },

  seeDetail(e) {
    const currentItem = e.currentTarget.dataset.item;
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.downloadFile({
      url: currentItem.invoiceUrl,      //要预览的PDF的地址
      success: function (res) {     
        wx.hideLoading()                      
        if (res.statusCode === 200) {                     //成功
          var Path = res.tempFilePath                     //返回的文件临时地址，用于后面打开本地预览所用
          wx.openDocument({
            filePath: Path,                               //要打开的文件路径
            showMenu: true,
            fileType: 'pdf',
            success: function (res) {
              console.log('打开PDF成功');
            }
          })
        }
      },
      fail: function (res) {
        console.log(res);                                  //失败
        wx.hideLoading()
      }
    })
  },

  validateEmpty(validateList) {
    const validateKeys = ['payeeUnitReceiptId', 'maxAmount', 'uscc', 'taxClassifiCode', 'receiveName', 'reviewer', 'drawer', 'companyName', 'feeType', 'taxRate']
    const isNotEmpty = validateList.every(item => validateKeys.every(key => !!item[key]))
    if (!isNotEmpty) {
      wx.showToast({
        title: '开票信息未维护，请联系商场人员',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    return true;
  },

  validateIsSame(validateList) {
    const validateData = {
      feeType: validateList[0].feeType,
      taxRate: validateList[0].taxRate,
      payeeUnitReceiptId: validateList[0].payeeUnitReceiptId
    }
    const isSame = validateList.every(item => Object.keys(validateData).every(key => validateData[key] === item[key]))
    if (!isSame) {
      wx.showToast({
        title: '请勾选同一费用项',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    return true;
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getList('invoiceReceList')
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
    this.getList('invoiceReceList')
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
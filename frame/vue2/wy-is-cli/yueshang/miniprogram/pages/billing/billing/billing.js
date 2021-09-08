const {ysRequest} = require('../../../utils/util.js')
const app = getApp();
Page({
  data: {
    currentType: 'office',
    focusType: '',
    invoiceTitle: '',
    creditCode: '',
    remark:'',
    money: 0
  },

  handleRemarkInput: function (e) {
    this.setData({
      remark: e.detail.value
    })
  },

  handleSelect(e) {
    const type = e.currentTarget.dataset.type
    this.setData({
      currentType: type
    })
    // if (type === 'personal') {
    //   this.setData({
    //     creditCode: ''
    //   })
    // }
  },

  handleFocus(e) {
    const type = e.currentTarget.dataset.type
    setTimeout(() => {
      this.setData({
        focusType: type
      })
    }, 150)
  },
  handleClear(e) {
    const type = e.currentTarget.dataset.type
    this.setData({
      [type]: ''
    })
  },
  handleInput(e) {
    const type = e.currentTarget.dataset.type
    this.setData({
      [type]: e.detail.value
    })
  },
  handleBlur(e) {
    setTimeout(() => {
      this.setData({
        focusType: ''
      })
    }, 100)
  },

  handleSubmit() {
    let title = '';
    if (this.data.currentType === 'office') {
      if (!this.data.invoiceTitle || !this.data.creditCode) {
        title = '经销商不能为空，请联系商场人员'
      }
    } else {
      if (!this.data.invoiceTitle) {
        title = '经销商不能为空，请联系商场人员'
      }
    }
    
    wx.showToast({
      title,
      icon: 'none',
      duration: 2000
    })

    !title && this.sendData()
  },

  sendData() {
    const { clerkId } = app.globalData.detailInfo
    ysRequest({
      url: 'merchantOperation_web/bill/makeInvoice.htm',
      method: 'post',
      params: {
        clerkId,
        companyType: this.data.currentType === 'office' ? 1 : 0,
        invoiceTitle: this.data.invoiceTitle,
        creditCode: this.data.creditCode,
        remark: this.data.remark,
        invoiceList: app.globalData.billingList
      },
      succ: res => {
        wx.showModal({
          title: '',
          content: res.msg,
          showCancel: false,
          confirmText: '我知道了',
          success (res) {
            if (res.confirm) {
              wx.navigateBack({
                delta: 1
              })
            }
          }
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const billList = app.globalData.billingList;
    const totalMoney = billList.map(item => item.invoiceAmount).reduce((acc, total) => {
      return ((acc * 100 + total * 100) / 100).toFixed(2)
    }, 0)
    this.setData({
      invoiceTitle: billList[0].invoiceTitle,
      creditCode: billList[0].creditCode,
      remark: billList[0].remark,
      money: totalMoney
    })
  },
})
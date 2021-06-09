import main_config from "../../../config.js"
const {ysRequest} = require('../../../utils/util.js')
var t = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
	ifAdmin: false,
	ifMyself: false,
    item: [],
    figure: "../../../static/images/usercenter_avatar.png",
  },
  makePhoneCall (e) {
    let _this = this
    let phone = e.currentTarget.dataset.phone
    let name = e.currentTarget.dataset.name
    wx.showModal({
      title: '拨打电话',
      content: name + ' ' + phone,
      showCancel: true,
      success: res=>{
        wx.makePhoneCall({
          phoneNumber: phone,
        })
      },
      fail: res => {}
    })
  },
  delEmployee(e){
    let _that = this;
    if (t.globalData.detailInfo.clerkRole == 2) {
      wx.showModal({
        content: '请联系店长'
      })
      return false
    }
    wx.showModal({
      title: "确认删除？",
      content: "操作不可撤销",
      showCancel: true,

      success: (res) => {
        if (res.confirm) {
          ysRequest({
            url: 'merchantOpen_web/merClerkInfo/merClerkInfoDel.htm',
            params: {
              "id": e.currentTarget.dataset.id
            },
            succ: res => {
              wx.showToast({
                title: '成功',
                icon: 'success',
                duration: 2000
              })
              setTimeout(() => {
                wx.navigateBack({
                  delta: 1
                })
              }, 2000)
            }
          })
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }

      },
      fail: () => {
        // console.log("fail...");
      }
    })
  },
  editEmployee(){
    if (t.globalData.detailInfo.clerkRole == 2) {
      wx.showModal({
        content: '请联系店长'
      })
      return false
    }
    let item = this.data.item
    wx.navigateTo({
      url: '/pages/usercenter/employee-edit/employee-edit?item=' + JSON.stringify(item)
    })
  },
  updatePassWord() {
	  console.log(t.globalData)
    // if (t.globalData.detailInfo.clerkRole == 2) {
    //   wx.showModal({
    //     content: '请联系店长'
    //   })
    //   return false
    // }
    // let item = this.data.item
    wx.navigateTo({
      url: '/pages/usercenter/employee-changePw/employee-cpw'
    })
  },
  resetPassWord(){
	  let ids = this.data.item.id
	  const params = {
	  	id: ids
	  };
	  ysRequest({
	  	url: 'merchantOpen_web/merClerkInfo/resetPassword.htm',
	  	method: 'post',
	  	params,
	  	succ: (res) => {
	  		if(res.code==0){
	  			wx.showToast({
	  			  icon: 'success',
	  			  title: '密码重置成功'
	  			})
	  		}else{
	  			wx.showToast({
	  			  image: '../../../static/images/icon_tips_error.png',
	  			  title: res.msg
	  			})
	  		}
	  	},
	  	fail: err => {
	  		wx.showToast({
	  		  image: '../../../static/images/icon_tips_error.png',
	  		  title: '修改密码失败'
	  		})
	  	}
	  })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  // console.log(options.item)
	  // console.log(t.globalData.detailInfo)
	  let paramsData = JSON.parse(options.item)
	if(t.globalData.detailInfo.clerkRole == 1){
		this.setData({
		  ifAdmin: true
		})
	}
	if(paramsData.id == t.globalData.detailInfo.clerkId){
		this.setData({
		  ifMyself: true
		})
	}
    this.setData({
      item: paramsData
    })
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
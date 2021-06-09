var t = getApp()
const { getUnviewCount, ysRequest } = require('../../../utils/util.js')
Page({
  data: {
    name:"刘建军",
    title:"店长",
    figure:"../../../static/images/usercenter_avatar.png" ,
    global: {}
  },
  onLoad () {
    const { pdContId, pdMallId, clerkOpenId, clerkId, shortName, brandName, storeNo, openId, clerkRole, clerkName } = getApp().globalData.detailInfo

    this.setData({
      global: {
        clerkId,
        pdContId,
        pdMallId,
        openid: openId,
        clerkOpenId,
        shortName,
        brandName,
        storeNo,
        clerkRole,
        clerkName
      }
    });
  },
  loginOut(){
	  let ids = t.globalData.detailInfo.clerkId
	  let opens = t.globalData.detailInfo.openId
	  let params = {
		  id: ids,
		  openId: opens
	  }
	  ysRequest({
	  	url: 'merchantOpen_web/merClerkInfo/signOut.htm',
	  	method: 'post',
	  	params,
	  	succ: (res) => {
	  		if(res.code==0){
	  			wx.showToast({
	  			  icon: 'success',
	  			  title: '退出成功',
	  			  success:function(){
	  				  setTimeout(function() {
						  wx.navigateTo({
							  url: "/pages/login/login"
						  })
					  }, 1600);
	  			  }
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
	  		  title: '退出失败'
	  		})
	  	}
	  })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    getUnviewCount(4, this.data.global.clerkOpenId)
  }
})
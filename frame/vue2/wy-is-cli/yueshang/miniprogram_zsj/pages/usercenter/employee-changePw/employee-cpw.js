const { ysRequest } = require('../../../utils/util.js')
import reg from '../../../utils/verify.js'
import main_config from "../../../config.js"
var t = getApp()
let service = require("../../../static/js/service.js");
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		oldPassword: '',
		newPassword: '',
		secondNewPassword: '',
		warningComp: null,
	},
	bindKeyInput: function(e) {
		// console.log(e.detail.value)
		// 获取某个输入框
		let type = e.target.dataset.key
		if (type == 'oldPawssword') {
			this.setData({
				oldPassword: e.detail.value
			})
		} else if (type == 'newPawssword') {
			this.setData({
				newPassword: e.detail.value
			})
		} else if (type == 'secondNewPawssword') {
			this.setData({
				secondNewPassword: e.detail.value
			})
		}
	},
	checkParams() {
		if (!this.data.oldPassword) {
			this.data.warningComp.showWarning({
				warningTxt: '请输入旧密码'
			})
			return false
		}
		if (!this.data.newPassword) {
			this.data.warningComp.showWarning({
				warningTxt: '请输入新密码'
			})
			return false
		}
		if (!this.data.secondNewPassword) {
			this.data.warningComp.showWarning({
				warningTxt: '请输入确认新密码'
			})
			return false
		}
		if ( this.data.newPassword!== this.data.secondNewPassword) {
			this.data.warningComp.showWarning({
				warningTxt: '两次密码不一致'
			})
			return false
		}
		return true
	},
	changePWSub() {
		if (!this.checkParams()) return
		let ids = t.globalData.detailInfo.clerkId;
		let np = this.data.newPassword;
		let op = this.data.oldPassword
		const params = {
			id: ids,
			newPassWord: np,
			originalPassword: op
		};
		ysRequest({
			url: 'merchantOpen_web/merClerkInfo/updateClerkPassword.htm',
			method: 'post',
			params,
			succ: (res) => {
				if(res.code==0){
					wx.showToast({
					  icon: 'success',
					  title: '密码修改成功',
					  success:function(){
						  setTimeout(function() {wx.navigateBack()}, 1600);
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
				  title: '修改密码失败'
				})
			}
		})
	},
	onLoad() {
		this.setData({
		  warningComp: this.selectComponent('#warningComps')
		})
	},
	onShow: function() {}
})

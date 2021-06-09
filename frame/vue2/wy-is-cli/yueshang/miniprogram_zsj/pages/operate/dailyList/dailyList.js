// pages/operate/dailyList/dailyList.js
let service = require("../../../static/js/service.js");
import main_config from "../../../config.js"
const {
	ysRequest
} = require('../../../utils/util.js')
var t = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		month: '',
		day: '',
		saleYmd: '',
		dataList:[]
	},
	// 跳转详情界面
	detail: function(e) {
		/* let url = '/pages/operate/dailyDetail/dailyDetail?saleYmd=' + this.data.saleYmd
		wx.navigateTo({
			url: url
		}) */
		let status = e.currentTarget.dataset.value
		let goodsName = e.currentTarget.dataset.goodsname
		wx.navigateTo({
		  url: '/pages/operate/dailyEdit/dailyEdit?saleYmd=' + this.data.saleYmd + '&status=' + status + '&goodsName=' +goodsName
		})
	},
	getData: function() {
		let c_data = {
			"version": "1.0",
			"timestamp": new Date().getTime(),
			"sign": main_config.sign,
			"clerkId": t.globalData.detailInfo.clerkId.toString(),
			'contNo': t.globalData.detailInfo.contNo,
			"salesDate": this.data.saleYmd.substr(0, 4) + '-' + this.data.saleYmd.substr(4, 2) + '-' +
				this.data.saleYmd.substr(6, 2)
		}
		let that = this
		wx.request({
			method: 'POST',
			url: `${main_config.baseUrl}finance_web/sale/day/list/goods.htm`,
			data: {
				data: JSON.stringify(c_data)
			},
			header: {
				'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 默认值
			},
			success(res) {
				that.setData({
					dataList:res.data.data
				})
			}
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		console.log(options.saleYmd)
		this.setData({
			saleYmd: options.saleYmd,
			month: options.saleYmd.slice(4, 6),
			day: options.saleYmd.slice(-2)
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {
		this.getData()
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})

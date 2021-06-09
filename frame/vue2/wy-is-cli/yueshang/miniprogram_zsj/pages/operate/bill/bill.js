// pages/operate/bill/bill.js
import main_config from "../../../config.js"
const {ysRequest} = require('../../../utils/util.js')
var t = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 'zj',
    tabs: [],
    minTabs: [{
      idx: 1,
      name: '历史账单',
    },{
      idx: 2,
      name: '未来账单',
    }],
    activeMinTab: 1,
    globalData: {},
    lists: {},
    ulData:[],
    selectName: '',
    selectIndex: '',
    selectStatus: false,
    allNum:0,
    totalAmountHistory:0,
    pNum: 0,
    typeList1: [
      // {
      //   id: 0,
      //   name: '默认'
      // },
      // {
      //   id: 1,
      //   name: '当前月'
      // }, 
      {
        id: 3,
        name: '3个月内'
      }, {
        id: 6,
        name: '6个月内'
      }],
    showTypeList1: false,
    btnShow: true,
    typeName: '3个月内',
    showTypeId: 0
  },
  clickTab: function (e) {
    var id = e.currentTarget.dataset.current
    this.setData({
      currentTab: id
    })
    this.getData(this.data.selectIndex)
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },
  clickMinTabs(e) {
    var idx = e.currentTarget.dataset.idx
    this.setData({
      activeMinTab: idx
    })
    if (idx === 1) { //历史账单 加载默认
      this.setData({
        showTypeId: 0,
      })
    }
    if (idx === 2) { //未来账单 下拉选择
      this.setData({
        typeName: '3个月内',
        showTypeId: 3,
      })
    }
    this.getData(this.data.selectIndex)
  },
  toggleSelect(){
	  this.setData({
		  selectStatus: !this.data.selectStatus
	  })
  },
  select(e) {
    const { id, name } = e.currentTarget.dataset.item
    this.setData({
      typeName: name,
      showTypeId: id,
      showTypeList1: false
    })
    this.getData(this.data.selectIndex)
  },
  showType1() {
    this.setData({
      showTypeList1: !this.data.showTypeList1
    })
  },
  getData: function (name) {
    ysRequest({
      url: 'financial_service/sdk/platform/financial/api/billDetail',
      method: 'post',
      params: {
        'feeTypes': this.data.currentTab,
        // "contNo": t.globalData.detailInfo.contNo,
        "contNo": name,
        "showTypeId": this.data.showTypeId
      },
      succ: res => {
        console.log(res, '----bill回参')
        if (res.code == '0') {
          this.setData({
            lists: res.data
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: res.msg
          })
        }
      }
    })
  },
  getSelectDownData: function () {
	  let companyIds = t.globalData.detailInfo.companyId
    let $this = this
    
    if(companyIds){
		ysRequest({
		  url: 'financial_service/sdk/platform/financial/api/getProjectResult',
		  method: 'post',
		  params: {
		    'companyId': companyIds
		  },
		  succ: res => {
		    console.log(res, '----选择框回参')
		    if (res.code == '0') {
		      $this.setData({
		        ulData: res.data.list,
            allNum: res.data.totalAmount,
            totalAmountHistory: res.data.totalAmountHistory,
            pNum: res.data.contracts
		      })
			  // const { contNo, brandName } = res.data.list[0]
			  let contNo = res.data.list[0].contNo;
        let brandName = res.data.list[0].brandName

			  $this.setData({
			    selectName: brandName,
				selectIndex: contNo,
				tabs: res.data.list[0].fees,
				currentTab: res.data.list[0].fees.length>0?res.data.list[0].fees[0].feeNo:''
			  })
			  $this.getData(contNo)
		    } else {
		      wx.showToast({
		        icon: 'none',
		        title: res.msg
		      })
		    }
		  }
		})
	}
	else{
		let reWriteData = [{
			contNo:t.globalData.detailInfo.contNo,
			brandName:t.globalData.detailInfo.companyName,
			storeNos:t.globalData.detailInfo.storeNo
		}]
		this.setData({
		  ulData: reWriteData,
		  selectIndex: t.globalData.detailInfo.contNo
		})
		console.log(this.data.ulData)
		const { contNo, brandName } = this.data.ulData[0]
		this.setData({
		  selectName: brandName,
		  tabs: this.data.ulData[0].fees
    })
		this.getData(contNo)
	}
  },
  selectIt(e){
	  let contNo = e.currentTarget.dataset.item.contNo
	  let brandName = e.currentTarget.dataset.item.brandName
	  let tabArray = e.currentTarget.dataset.item.fees
	  console.log(e.currentTarget.dataset.item)
	  this.setData({
	    selectName: brandName,
		selectStatus: !this.data.selectStatus,
		selectIndex: contNo,
		tabs: tabArray,
		currentTab: tabArray[0].feeNo
	  })
	  this.getData(contNo)
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
	  // const { contNo, brandName } = this.data.ulData[0]
	  // this.setData({
	  //   selectName: brandName
	  // })
	  // this.selectIt()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.getData()
	this.getSelectDownData()
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
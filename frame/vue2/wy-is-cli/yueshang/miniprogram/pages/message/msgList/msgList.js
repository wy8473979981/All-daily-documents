const { getUnviewCount, ysRequest } = require('../../../utils/util.js')
import behaviors from '../../../behaviors/index.js'
Component({
  behaviors,
  data: {
    countShow: 0,
    typeList1: [
      {
        id: '',
        name: '全部'
      }, {
        id: 2001,
        name: '加班申请'
      }, {
        id: 2002,
        name: '放行申请'
      }, {
        id: 2003,
        name: '广播申请'
      }, {
        id: 2004,
        name: '投诉申请'
      }, {
        id: 2006,
        name: '报修申请'
      }, {
        id: 2010,
        name: '活动申请'
      }],
    showTypeList1: false,
    btnShow: true,
    global: {},
    items: [],
    tabVal: 0,
    tabList: [
      { text: '提醒', params: { type: 1 }, id: 0 },
      { text: '通知', params: { type: 2 }, id: 1 }
    ],
    params: { type: 1, informationType: '' },
    resultList: [
      // {theme: '主题', createDate: '2019', content: '内容'}
    ],
    typeName: '全部'
  },
  lifetimes: {
    created() {
      const { pdContId, pdMallId, clerkOpenId, clerkId, shortName, brandName, storeNo, openId, clerkRole, bindTel } = getApp().globalData.detailInfo
      this.setData({
        global: {
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
    }
  },
  pageLifetimes: {
    show() {
      getUnviewCount(3, this.data.global.clerkOpenId)
      this.getData()
    }
  },

  methods: {
    select(e) {
      const { id, name } = e.currentTarget.dataset.item
      this.setData({
        typeName: name,
        'params.informationType': id,
        showTypeList1: false
      })
      this.getData()
    },
    // 展开提醒筛选
    showType1() {
      this.setData({
        showTypeList1: !this.data.showTypeList1
      })
    },
    changeTabCb(e) {
      const needRefresh = this.data.tabVal !== e.data.id
      this.setData({
        tabVal: e.data.id,
        'params.type': e.data.params.type,
        btnShow: e.data.params.type === 1,
        showTypeList1: e.data.params.type === 1 ? this.data.showTypeList1 : false
      })
      if (needRefresh) {
        this.getData()
      }
    },
    // 获取列表数据
    getData(v) {
      console.log('get data  消息---页面加载')

      const _this = this
      let params = {
        clerkId: this.data.global.clerkId, clerkOpenId: this.data.global.clerkOpenId,
        type: this.data.params.type,
        informationType: this.data.tabVal === 0 ? this.data.params.informationType : null
      }
      ysRequest({
        url: 'merchantMain_web/MessageNotifyAndNeed/find.htm',
        method: 'post',
        params,
        succ(res) {
          if (res.code === '0') {
            let data = res.params || []
            _this.setData({
              resultList: data
            })
          } else {
            wx.showToast({
              title: res.msg,
              icon: 'none'
            })
          }
        }
      })
    }
  }
})
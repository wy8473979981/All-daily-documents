const tab = Behavior({
  behaviors: [],
  properties: {
    myBehaviorProperty: {
      type: String
    }
  },
  data: {
    curTabInfo: {}
  },
  methods: {
    changeTab(e) {
      console.log(e, 'e')
      this.setData({
        curTabInfo: e.detail
      })
      const list = this.data.tabList.map(item => {
        return { ...item, active: item.id === e.detail.id }
      })
      this.setData({
        tabList: list
      })
      this.changeTabCb && this.changeTabCb(this.data.curTabInfo)
    }
  }
})

const collapse = Behavior({})

const picker = Behavior({
  data: {
    todayTimestamp: new Date().setHours(0, 0, 0)
  },
  methods: {
    // 限制日期为今天
    /**
     * origin   起始日期
     * target   目标日期
     * succ     成功回调
     */
    limitDate({origin, target, succ, fail}) {
      console.log(origin, target, succ, '----date limit')
      if (origin.getTime() > target.getTime()) {
        fail && fail()
        return false
      }
      return true
      // if (date.getTime() < this.data.todayTimestamp) {
      //   this.data.warningComp.showWarning({
      //     warningTxt: '不能选择以前的日期'
      //   })
      //   return false
      // } else if (date.getTime() === this.data.todayTimestamp) {
      //   this.setData({
      //     choosedToday: true
      //   })
      // } else {
      //   this.setData({
      //     choosedToday: false
      //   })
      // }
      // return true
    },
    limitTime(target, distance) {
      if (this.data.choosedToday && Date.now() + distance > target.getTime()) {
        this.data.warningComp.showWarning({
          warningTxt: '加班申请时间从三小时后起'
        })
        return false
      }
      return true
    }
  }
})

const request = Behavior({
  methods: {
    urge () {
      console.log(ysRequest, '---请求')
    }
  }
})

const behaviors = [tab, collapse, request]
export default behaviors
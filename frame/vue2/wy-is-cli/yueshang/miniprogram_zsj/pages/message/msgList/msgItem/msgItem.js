// pages/message/msgList/msgComp/msgComp.js
Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  properties: {
    items: {
      type: Array
    },
    msgType: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    goLink(e) {
      var item = e.currentTarget.dataset.item
      var params = JSON.stringify(item)
      wx.navigateTo({
        url: `/pages/message/msgDetail/msgDetail?params=${params}&msgType=${this.properties.msgType}`,
      })
    }
  }
})

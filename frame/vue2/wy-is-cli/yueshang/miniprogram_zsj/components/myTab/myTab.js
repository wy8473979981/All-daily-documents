// components/myTab/myTab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabList: {
      type: Array
    },
    tabVal: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  // data: {
  //   idx:0
  // },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTap (e) {
      // this.setData({
      //   idx: e.currentTarget.dataset.index
      // })
      const { value, index} = e.currentTarget.dataset
      this.triggerEvent('changeTab', { data: value, val: index})
    }
  }
})
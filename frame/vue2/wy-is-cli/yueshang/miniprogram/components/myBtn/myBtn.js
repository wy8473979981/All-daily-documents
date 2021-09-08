// components/myBtn/myBtn.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bgColor: {
      type: String
    },
    txt: {
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
    onTap () {
      this.triggerEvent('myTap')
    }
  }
})

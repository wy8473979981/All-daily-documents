// components/tag/tag.js
Component({
  properties: {
    statusStr: {
      type: String,
      require: true,
      observer (n, o) {
        console.log(n, o, 'ob1')
      }
    },
    status: {
      type: String,
      observer(n, o) {
        console.log(n, o, 'ob2')
      }
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

  }
})

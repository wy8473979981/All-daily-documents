// components/nodata/nodata.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    txt: {
      type: String,
      value: '暂无数据'
    }
  },

  lifetimes: {
    attached () {
    }
  },
  pageLifetimes: {
    show () {
      console.log('show no data')
    }
  },
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

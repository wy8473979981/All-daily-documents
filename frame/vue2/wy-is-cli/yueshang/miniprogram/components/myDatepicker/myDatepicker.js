// components/myDatepicker/myDatepicker.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    startDate: {
      type: String
    },
    endDate: {
      type: String
    },
    current: {
      type: String,
      observe (nv, ov) {
        console.log(nv, ov, '----current---')
      } 
    }
  },

  lifetimes: {
    attached ()  {
      console.log(this.properties, '==属性')
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindDateChange (e) {
      console.log(e, '---日期change')
    }
  }
})

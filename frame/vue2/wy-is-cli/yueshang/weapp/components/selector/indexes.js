Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: [],
      observer(newValue) {
        this.setData({
          'component.list': newValue.map(group => {
            return {
              alpha: group.label,
              ...group,
              subItems: group.items.map(item => {
                return {
                  name: item.label,
                  ...item
                }
              })
            }
          }).filter(group => group.subItems.length)
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    component: {
      list: []
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSelected(e) {
      this.triggerEvent('selected', e.detail.item);
    }
  }
})
// components/common/header.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    tabs: {
      type: Array,
      value: [],
      observer(newValue) {
        if (newValue.length) {
          const tabs = newValue.map(item => {
            return {
              label: item.label,
              value: JSON.stringify(item.value || item)
            };
          });
          this.setData({
            'component.tabs': tabs,
          });
        }
      }
    },
    tabActiveIndex: {
      type: Number,
      value: 0,
      observer(newValue) {
        console.log(newValue);
        this.setData({
          'component.tabActiveIndex': newValue
        });
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    component: {
      tabs: [],
      tabActiveIndex: 0
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTabClick(e) {
      const { index, value } = e.target.dataset;
      this.setData({
        'component.tabActiveIndex': index
      });
      this.triggerEvent('tab-changed', { value: JSON.parse(value), index });
    }
  }
})
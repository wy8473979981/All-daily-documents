// components/selector/datepicker.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    fields: {
      type: String,
      value: 'day'
    },
    range: {
      type: Boolean,
      value: false
    },
    fromKey: {
      type: String,
      value: 'from'
    },
    toKey: {
      type: String,
      value: 'to'
    },
    fromDate: {
      type: String,
      observer(value) {
        this.setData({
          'component.from': value
        })
      }
    },
    toDate: {
      type: String,
      observer(value) {
        this.setData({
          'component.to': value
        })
      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    component: {
      from: null,
      to: null
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onFromDateChanged(e) {
      const value = e.detail.value;
      this.setData({
        'component.from': value
      });
      
      const event = { value };
      if (this.data.range) {
        event.value = {
          [this.data.fromKey]: value,
          [this.data.toKey]: this.data.component.to
        }
      }
      this.triggerEvent('changed', event);
    },
    onToDateChanged(e) {
      const value = e.detail.value;
      this.setData({
        'component.to': value
      });
      
      const event = { value };
      if (this.data.range) {
        event.value = {
          [this.data.fromKey]: this.data.component.from,
          [this.data.toKey]: value
        }
      }
      this.triggerEvent('changed', event);
    }
  }
})

const app = getApp();

const cacheKey = 'project-selector-selected';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    page: {
      type: String,
      value: '/pages/common/project-selector'
    },
    disabled: {
      type: Boolean,
      value: false
    },
    hideAll: {
      type: Boolean,
      value: false
    },
    disabledAll: {
      type: Boolean,
      value: false
    },
    selected: {
      type: Object,
      value: null,
      observer(newValue) {
        if (newValue) {
          this.setData({
            'component.selected': {
              label: newValue.label,
              value: newValue.value
            }
          });
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    component: {
      selected: {
        label: "全部",
        value: null
      }
    }
  },

  methods: {
    onClick() {
      if (this.data.disabled) {
        return;
      }
      const { disabledAll, hideAll } = this.data;
      app.page.go(this.data.page, { disabledAll, hideAll });
    },
    emit() {
      this.triggerEvent('selected', this.data.component.selected);
    }
  },

  pageLifetimes: {
    show() {
      const selected = app.cache.get(cacheKey, null)
      app.cache.clear(cacheKey);
      this.setData({
        'component.selected': selected || this.data.component.selected,
      });
      if (selected) {
        this.emit();
      }
    }
  }
})
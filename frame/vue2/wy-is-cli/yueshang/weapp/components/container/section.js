// components/container/section.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String
    },
    subtitle: {
      type: String
    },
    collapseable: {
      type: Boolean,
      value: false
    },
    url: {
      type: String,
      value: null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    collapsed: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toggleCollapse() {
      if (!this.data.collapseable) return;
      this.setData({ collapsed: !this.data.collapsed });
    },
    onSectionClick() {
      if (this.data.url) {
        const app = getApp();
        app.page.go(this.data.url);
      }
    }
  }
})

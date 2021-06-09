// components/myWarning/myWarning.js
Component({
  observers: {
    visible (val) {
      if (val) {
        setTimeout(() => {
          this.hideWarning()
        }, 2000)
      }
    }
  },
  data: {
    visible: false,
    txt: ''
  },
  methods: {
    showWarning({ warningTxt }) {
      this.setData({
        visible: true, txt: warningTxt
      })
    },
    hideWarning() {
      this.setData({
        visible: false, txt: ''
      })
    },
  }
})

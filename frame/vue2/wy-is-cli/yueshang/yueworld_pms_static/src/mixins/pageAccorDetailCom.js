/*
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:  详情页子组件mixins
 */
import cloneDeep from 'lodash/cloneDeep'
const pageAccorDetailCom = {
  methods: {
  },
  props: {
    // 数据更新
    update: {
      type: Number,
      default: 0
    }
  },
  watch: {
    // 监听更新
    update: {
      deep: true,
      immediate: true,
      handler(val) {
        if (!this[this.$attrs.dataKey]) return
        this.currentFormData = cloneDeep(this[this.$attrs.dataKey])
      }
    },
    currentFormData: {
      deep: true,
      handler(val) {
        if (!this[this.$attrs.dataKey]) return
        this.$emit('change', { ...this.currentFormData })
      }
    }
  },
  data() {
    return {
      currentFormData: {}
    }
  }
}

export default pageAccorDetailCom


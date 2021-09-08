<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: 状态-搜索组件
-->
<template>
  <div class="flex-al-center mb-8">
    <ysn-btn type="reset" class="mr-16 nameBtn">{{ name }}</ysn-btn>
    <ysn-btn
      v-if="hasAll"
      :type="currentValue.length === 0 ?'primary':'info'"
      @click="chooseAll"
    >全部</ysn-btn>
    <div v-if="hasAll" class="mx-12 border" />
    <ysn-btn
      v-for="(item,index) in config"
      :key="index"
      :type="(
        isRadio?
          currentValue===item.value
          :
          currentValue.includes(item.value)
      )?'primary':'info'"
      class="mr-8"
      width="134px"
      @click="chooseItem(item)"
    >
      {{ item.label }} {{ item.statusNum?`(${item.statusNum})`:'' }}
    </ysn-btn>
  </div>
</template>

<script>
export default {
  name: 'YsnStatusSearch',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    // 状态配置项
    config: {
      type: Array,
      default: () => []
    },
    // 名称
    name: {
      type: String,
      default: ''
    },
    // 是否有全部
    hasAll: {
      type: Boolean,
      default: true
    },
    // 是否单选
    isRadio: {
      type: Boolean,
      default: false
    },
    // 默认value
    value: {
      type: [Array, String, Number],
      default: ''
    }
  },
  data() {
    return {
      currentValue: [],
      isEmit: false // 是否发起emit
    }
  },
  watch: {
    currentValue: {
      handler(val) {
        if (this.isEmit) {
          this.$emit('change', val)
        }
      },
      deep: true
    }
  },
  mounted() {
    this.initCurrentValue()
    this.$nextTick(() => {
      this.isEmit = true
    })
  },
  methods: {
    // 初始化
    initCurrentValue() {
      if (this.value instanceof Array) {
        this.currentValue = JSON.parse(JSON.stringify(this.value))
      } else {
        this.currentValue = this.value
      }
    },
    // 选择/取消
    chooseItem(item) {
      let { currentValue } = this

      // 单选直接赋值
      if (this.isRadio) {
        currentValue = item.value
      } else {
        // 多选

        currentValue = this.checkboxChooseItem(item)
      }
      this.currentValue = currentValue
    },
    // 多选选择值
    checkboxChooseItem(item) {
      let { currentValue } = this
      console.log(currentValue)
      // 防止传入的是个string
      if (typeof currentValue === 'string') {
        currentValue = []
      }
      // 已有状态
      if (currentValue.includes(item.value)) {
        // 去除已选择
        currentValue = currentValue.filter(_item => _item !== item.value)
      } else {
        currentValue.push(item.value)
      }
      // 全部取消后视为选择全部
      if (currentValue.length === 0 || currentValue.length === this.config.length) {
        currentValue = []
      }
      return currentValue
    },
    // 选择全部 需求:选中全部后传空
    chooseAll() {
      this.currentValue = []
    }
  }
}
</script>
<style scoped>
  .border{
    height: 12px;
    width: 1px;
    background: #E5E2DE;
  }
  .nameBtn{
    width: 70px;
  }
</style>


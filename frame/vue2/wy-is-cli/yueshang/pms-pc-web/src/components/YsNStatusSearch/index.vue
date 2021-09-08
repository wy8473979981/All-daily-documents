<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: 状态-搜索组件
-->
<template>
  <div class="flex-al-center mb-24">
    <ysn-btn type="reset" class="mr-16">{{ name }}</ysn-btn>
    <ysn-btn
      v-if="hasAll"
      :type="value.length === 0?'primary':'info'"
      @click="chooseAll"
    >全部</ysn-btn>
    <div v-if="hasAll" class="mx-12 border" />
    <ysn-btn
      v-for="(item,index) in config"
      :key="index"
      :type="(
        isRadio?
        value===item.value
        :
        value.includes(item.value)
      )?'primary':'info'"
      class="mr-8"
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
    isRadio:{
      type:Boolean,
      default:false
    },
    value:{
      type:[Array,String,Number],
      default: "",
    }
  },
  data() {
    return {
       currentValue: this.value,
    }
  },

  methods: {
    // 选择/取消
    chooseItem(item) {
      let { currentValue } = this

      // 单选直接赋值
      if(this.isRadio){
        currentValue = item.value
      }else{
        currentValue = this.checkboxChooseItem(item)
      }
      this.currentValue = currentValue
    },
    // 单选选择值
    checkboxChooseItem(item){
      let { currentValue } = this
      // 已有状态
      if (currentValue.includes(item.value)) {
        // 去除已选择
        currentValue = currentValue.filter(_item => _item !== item.value)
      } else {
        currentValue.push(item.value)
      }
      
      // 全部取消后视为选择全部
      if (currentValue.length === 0) {
        currentValue = []
      }
      return currentValue
    },
    // 选择全部 需求:选中全部后传空
    chooseAll() {
      this.currentValue = []
    }
  },
  watch: {
    value: {
      handler(val) {
        this.currentValue = val;
      },
      deep: true,
    },

    currentValue: {
      handler(val) {
        this.$emit("change", val);
      },
      deep: true,
    },
  },
}
</script>
<style scoped>
  .border{
    height: 12px;
    width: 1px;
    background: #E5E2DE;
  }
</style>


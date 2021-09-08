<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
-->
<template>
  <div>
    <span v-for="(item,index) in config" :key="index">
      <br v-if="index>0&&index%4===0">
      <div class="font-color mr-16 font-14 d-inline-block mt-8">
        <div class="d-flex flex-ju-al-center">
          {{ item.text }}
          <span class="font-color-blue font-16 ml-4 text-weight-bold ">{{ formatterStr(item.value,item.decimal) || '--' }}</span>
        </div>
      </div>
    </span>

  </div>
</template>
<script>
import { formatNumber } from '@/utils'
export default {
  name: 'YsnTableDesc',
  props: {
    // 配置参数
    config: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {

    }
  },
  methods: {
    // 格式化
    formatterStr(val = '', decimal) {
      if (this.isNumber(val)) {
        return formatNumber(parseFloat(val), 'ten-thousand', decimal)
      }
      return val
    },
    // 判断是否是数字
    isNumber(val) {
      const regPos = /^\d+(\.\d+)?$/ // 非负浮点数
      const regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/ // 负浮点数
      if (regPos.test(val) || regNeg.test(val)) {
        return true
      } else {
        return false
      }
    }
  }

}
</script>
<style lang="scss" scoped>
.font-color{
    color:#050101;
}
.font-color-blue{
    color:#1C4C7F;
}
</style>

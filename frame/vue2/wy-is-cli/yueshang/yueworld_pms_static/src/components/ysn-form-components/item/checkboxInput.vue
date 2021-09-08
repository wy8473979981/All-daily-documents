/*
 * @Author: xueyx
 * @LastEditors: xueyx
 * @Description:
*/

<template>
  <!-- 全选 -->
  <div>
    <el-checkbox
      v-if="$attrs.checkAll"
      v-model="checkAllData"
      v-bind="$attrs"
      :indeterminate="form[$attrs.prop].length>0&&form[$attrs.prop].length<$attrs.list.length"
      @change="handleCheckAllChange"
    >
      全选
    </el-checkbox>
    <el-checkbox-group
      v-model="form[$attrs.prop]"
      v-bind="$attrs"
      @change="($attrs.change && $attrs.change(form)) || ''"
    >
      <el-checkbox
        v-for="(item, index) in $attrs.list"
        :key="'checkbox' + index"
        :label="item[$attrs.listKey || 'value']"
      >
        {{ item[$attrs.listName || 'label'] }}

        <el-input
          v-if="item.isShow"
          v-model="item.model"
          :disabled="item.disabled"
          :placeholder="item.placeholder"
          :style="'margin-left: 10px;width:' + ($attrs.modelWidth ? $attrs.modelWidth : '200px')"
          :min="0"
          clearable
          type="number"
          @input="forceUpdate"
          @change="(val) => { item.model = (val < 0 ? 0 : item.model);if($attrs.changeInput) { $attrs.changeInput(item.value, item.model)} }"
        />
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>
<script>
export default {
  name: 'ItemCheckboxInput',
  props: {
    form: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      checkAll: false
    }
  },
  computed: {
    checkAllData: {
      get() {
        // 特殊数据处理，采用联动
        this.form[this.$attrs.prop] = this.mapPurchaseChannelVal(this.form[this.$attrs.prop], this.$attrs.list, 'set')
        // 监听是否权限
        if (this.form[this.$attrs.prop].length === this.$attrs.list.length) {
          return true
        }
        if (this.form[this.$attrs.prop].length === 0) {
          return false
        }
        return this.checkAll
      },
      set(value) {
        this.checkAll = value
      }
    }
  },
  methods: {
    // 强制刷新input，解决嵌套问题
    forceUpdate() {
      this.$forceUpdate()
    },
    handleCheckAllChange(val) {
      const list = this.$attrs.list.map(item => item.value)
      this.form[this.$attrs.prop] = val ? list : []
    },
    // 映射渠道传值
    mapPurchaseChannelVal(channelArr, opt, type) {
      const arr = []
      for (const item of opt) {
        const trueVal = typeof item.trueValue === 'string' && item.trueValue !== '' ? item.trueValue : item.value
        const fakeVal = item.value
        if (channelArr.includes(type === 'set' ? fakeVal : trueVal)) {
          if (type === 'set') {
            arr.push(trueVal)
          } else {
            arr.includes(fakeVal) ? '' : arr.push(fakeVal)
          }
        }
      }
      return arr
    }
  }
}
</script>

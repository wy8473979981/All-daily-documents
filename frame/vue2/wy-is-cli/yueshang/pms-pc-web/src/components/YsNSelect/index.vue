<template>
  <div :class="['x-select', { 'custom-display': customDisplay }]" @mouseenter="isHover = true" @mouseleave="isHover = false">
    <ys-n-icon v-if="customDisplay" :class="{hover: isHover}" v-bind="customDisplay"></ys-n-icon>
    <el-select v-model="currentValue" :collapse-tags="customDisplay ? true : $attrs['collapse-tags']" :placeholder="$attrs.placeholder || '请选择'" size="small" v-bind="$attrs" v-on="$listeners">
      <div v-if="tips" :class="['x-select--tips', { 'has-circle': hasCircle }]">{{tips}}</div>
      <el-option
        v-for="item in currentOptions"
        :key="item.key"
        :label="item.label"
        :value="item.key"
        :disabled="item.disabled">
        <span v-if="item.circle" :style="{'background-color': item.circle}" class="x-select--circle"></span>
        <span :class="['x-select--label', { 'has-circle': hasCircle, 'had-circle': item.circle }]">{{ item.label }}</span>
      </el-option>
    </el-select>
  </div>
</template>

<script>
import isFunction from 'lodash/isFunction'
import has from 'lodash/has'
export default {
  name: 'YsNSelect',

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    tips: String, // select 的选项提示，如最多可以选择多少，或者提示该选项的作用

    value: [String, Number, Array],

    options: {
      type: [Array, Function],
      required: true
    },

    selectAll: [Boolean, Object, Function], // 是否有全部选中选项，默认没有，可以直接true，放进去一个全部，选中值为空，如果给一个对象，则使用对象放在头部

    customDisplay: { // 不使用input的下拉框，用icon和文字代替触发下拉选择, 需要基础的 icon label
      type: Object,
    },

    multipleMin: { // 多选时最低选择数量
      type: Number,
      default: 0
    }

  },

  data() {
    return {
      currentValue: has(this.$attrs, 'multiple') ? [] : '',
      isHover: false,
    }
  },

  computed: {
    currentOptions() {
      let defaultOptions = isFunction(this.options) ? this.options() : this.options
      let options = []
      if (this.selectAll) {
        options = typeof this.selectAll === 'boolean' ? [{ label: '全部', key: '' }, ...defaultOptions] : (isFunction(this.selectAll) ? [this.selectAll(), ...defaultOptions] : [this.selectAll, ...defaultOptions])
      } else {
        options = defaultOptions
      }

      if (this.multipleMin > 0 && has(this.$attrs, 'multiple') && this.currentValue.length <= this.multipleMin) {
        options = options.map((option) => {
          if (this.currentValue.includes(option.key)) {
            return Object.assign({}, option, { disabled: true })
          }
          return option
        })
      }

      return options
    },

    hasCircle() {
      let defaultOptions = isFunction(this.options) ? this.options() : this.options
      return defaultOptions.some(item => item.circle)
    }
  },

  watch: {
    currentValue: {
      handler(val, oldValue) {
        let returnValue = val
        if (this.selectAll && has(this.$attrs, 'multiple')) {
          const selectAllValue = typeof this.selectAll === 'boolean' ? '' : this.selectAll.key;

          if (val.includes(selectAllValue) && !oldValue.includes(selectAllValue) && this.currentOptions.length > 1 ) {
            // 新增了全部
            returnValue = this.currentOptions.map(item => item.key)
          } else if (val.includes(selectAllValue) && val.length < this.currentOptions.length && oldValue.includes(selectAllValue) && this.currentOptions.length > 1 ) {
            // 取消了某个选项
            const i = returnValue.indexOf(selectAllValue)
            returnValue = this.currentValue.splice(i, 1)
          } else if (!val.includes(selectAllValue) && val.length == this.currentOptions.length - 1 && oldValue.includes(selectAllValue) && this.currentOptions.length > 1 ) {
            // 取消了全部
            returnValue = []
          } else if (!val.includes(selectAllValue) && val.length == this.currentOptions.length - 1 && !oldValue.includes(selectAllValue) && this.currentOptions.length > 1 ) {
            // 所有子选项全部选中
            returnValue = this.currentOptions.map(item => item.key)
          }
        }
        
        this.$emit('change', returnValue)
        this.$emit('select-change', returnValue)
      },
      deep: true
    },

    value: {
      handler(val) {
        this.currentValue = val;
      },
      deep: true,
      immediate: true
    }
  }

}
</script>

<style lang="scss" scoped>
.x-select {

  &--tips {
    color: $tipsColor;
    padding: 10px 14px;
    font-size: 14px;

    &.has-circle {
      padding-left: 36px;
    }
  }

  &--circle {
    float: left;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    margin-top: 12px;
    margin-right: 6px;
  }

  &--label {
    float: left;

    &.has-circle {
      padding-left: 16px;
    }

    &.had-circle {
      padding-left: 0;
    }
  }

  &.custom-display {
    height: 20px;
    overflow-y: hidden;
    display: flex;
    align-items: center;
    position: relative;

    .el-select {
      // visibility: hidden;
      position: absolute;
      top: 0;
      opacity: 0;
      height: 20px;
      // min-width: 120px;
      overflow: hidden;

      &:before {
        content: '';
        height: 50px;
        width: 100%;
        display: block;
        background: #000;
        position: absolute;
        top:0;
        left: 0;
        z-index: 2;
        opacity: 0;
        cursor: pointer;
      }

      .el-select__tags {
        display: none;
      }
    }
  } 
}

</style>
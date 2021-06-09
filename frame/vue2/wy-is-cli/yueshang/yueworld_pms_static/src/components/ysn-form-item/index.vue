<template>
  <div class="flex-wrap">
    <el-form-item
      v-for="(item, index) in configList"
      v-show="!(packUp&&item.packUp)"
      :key="'form-item' + index"
      :label="item.label"
      :label-width="setWidth(item, index)"
      :prop="item.prop"
      :class="(item.span && 'col-' + colVal * item.span) || `col-${colVal}`"
    >
      <div :style="{ width: item.width || itemWidth }">
        <components
          :is="'item-' + item.itemType"
          v-if="!item.hasSlot && item.itemType !== 'text'"
          :form="form"
          :disabled="item.disabled || disabled"
          :clearable="item.clearable || clearable"
          v-bind="{ ...item }"
        ></components>
        <span v-else-if="!item.hasSlot && item.itemType === 'text'">
          {{ (item.formatter && item.formatter(form)) || form[item.prop] }}
      </span>
        <slot v-else v-bind="item" :name="item.prop"></slot>
      </div>
    </el-form-item>
    <el-form-item v-if="$slots.default" label-width="0px" class="flex-auto slot">
      <slot></slot>
    </el-form-item>
  </div>
</template>

<script>
import itemInput from './item/input'
import itemDatePicker from './item/datePicker'
import itemSelect from './item/select'
import itemRadio from './item/radio'
import itemCheckbox from './item/checkbox'
// TODO: 加入Int组件、 增加dateRanger组件
export default {
  name: 'YsnFormItem',
  components: {
    itemCheckbox,
    itemInput,
    itemRadio,
    itemSelect,
    itemDatePicker
  },
  props: {
    config: { type: Array, default: () => [] }, // 配置文件
    form: {
      type: Object, default: () => {
      }
    }, // 传进来的共享的form表单值对象
    rules: { type: Object, default: () => ({}) }, // 传进来的共享的form验证规则
    column: { type: Number, default: 4 }, // 总的col布局
    itemWidth: { type: String, default: '100%' }, // form-item项的宽度
    disabled: { type: Boolean, default: false },
    clearable: { type: Boolean, default: false },
    packUp: { type: Boolean, default: false } // 控制展开收起
  },
  data() {
    return {
      configdata: []
    }
  },
  computed: {
    // 组件内部config
    configList() {
      return this.config
    },
    // 整体列数对应的col
    colVal() {
      return 24 / this.column
    },
    labelWidth() {
      // rowList每一行的数据，初始化的时候给一个二维数组，并制定第一个参数为new Array（）
      // columnList每一列的数据
      const rowList = [new Array(this.column)]
      const columnList = []
      // count用来计算是否换行新增rowList的数组元素空数组，用来填补二维数组空位
      // index代表的是rowList的当前操作项的下标
      let count = 0
      let index = 0
      this.config.forEach((e, i, arr) => {
        count += e.span || 1
        rowList[index][count - (e.span || 1)] = { name: e.label, prop: e.prop, index: i }
        if (count + ((arr[i + 1] || {}).span || 1) > this.column && arr[i + 1]) {
          rowList.push(new Array(this.column))
          index++
          count = 0
        }
      })
      // 行数据转列数据
      rowList.forEach(e => {
        for (let i = 0; i < e.length; i++) {
          if (!columnList[i]) {
            columnList[i] = []
          }
          columnList[i].push(e[i])
        }
      })
      // 取出每一列最大值nameLength
      // 取出每一列的index下标
      return columnList.map(e => {
        const nameLength = Math.max.apply(
          null,
          e.map(el => (el && this.charCode(el.name).length / 4) || 0)
        )
        let hasRules = false
        e.map(el => {
          if (el && el.name && this.rules[el.prop] && this.rules[el.prop][0].required) {
            hasRules = true
          }
        })
        const indexList = e.map(el => el && el.index)
        return { nameLength, indexList, hasRules }
      })
    }
  },
  created() {

  },
  methods: {
    // 通过labelWidth获取对应index里面的值
    setWidth(item, index) {
      // 增加rules为入参，判断当前项是否有必填校验，如果有那么width加上11px；
      const val = this.labelWidth.find(e => e.indexList.includes(index))
      const rulesWidth = val.hasRules ? 11 : 0
      return val.nameLength * 14 + rulesWidth + 16 + 'px'
    },
    // 将字符串转为16进制值，汉子转4位，英文字母和数组转2位
    charCode: str => str.split('').reduce((total, e) => total + e.codePointAt(0).toString(16), '')
  }
}
</script>
<style lang="scss">
  .el-form-item__label{
    font-size: 12px;
    color: #050101;
    line-height: 17px;
  }
  .el-form-item--small .el-form-item__label{
    line-height: 17px;
  }
  .el-form--label-top .el-form-item__label{
    padding: 0px 0 7px 10px;
  }
  .el-form-item--small.el-form-item{
    margin-bottom: 16px;
  }
  .el-input__inner,.el-input--small .el-input__inner{
    background: #EFEDEA;
    border-radius: 16px;
    font-size: 14px;
    font-weight: 400;
    color: #050101;
  }
  .el-date-editor .el-range-input,.el-select-dropdown__item,.el-select-dropdown__item.hover, .el-select-dropdown__item:hover,.el-select-dropdown__item.selected{
    color: #050101;
    font-weight: 400;
  }
  label{
    font-weight: 400
  }
  .el-select-dropdown__item,.el-select-dropdown,.el-select-dropdown__list,.el-range-editor--small .el-range-input{
    background-color: #EFEDEA;
  }
  .el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
    background: #E5E2DE;
  }
  .el-select-dropdown__item{
    padding-right: 14px;
  }
  .el-form-item__error{
    display: none;
  }
</style>

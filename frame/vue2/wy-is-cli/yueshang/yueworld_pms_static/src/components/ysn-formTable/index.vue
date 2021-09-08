
<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: 表单表格
-->
<template>
  <el-form ref="ysnForm" class="ysn-form" :model="data" :rules="rules">
    <ysn-table
      :data="data[prop]"
      :column="column"
      :checkbox="false"
      :show-slots="slotsList"
      :show-operation="add"
      :operation-width="operationWidth"
      operation-label=""
      v-bind="$attrs"
      v-on="$listeners"
    >
      <!-- 动态插槽 -->
      <template v-for="(item,index) in colmAll" :slot="Object.keys(item)[0]" slot-scope="scope">
        <el-form-item
          v-if="!item.hasSlot&&item.type!='index'"
          :key="'default_'+index"
          :prop="`${prop}[${scope.$index}][${Object.keys(item)[0]}]`"
          :rules="getRules(item)"
        >
          <div :style="{ width: item.itemConfig?item.itemConfig.width: itemWidth }">
            <template v-if="item.itemType !== 'text'&&item.itemType">
              <components
                :is="'item-' + item.itemType"
                :form="data[prop][scope.$index]"
                :disabled="item&&item.disabled?item.disabled:false"
                :can-operate="item.canOperate"
                clearable
                :prop="Object.keys(item)[0]"
                v-bind="{ ...item,...item.itemConfig }"
                :index="scope.$index"
              />
            </template>
            <span v-else>
              {{ (item.formatter && item.formatter(data[prop][scope.$index])) || formatter(item,data[prop][scope.$index][Object.keys(item)[0]]) || data[prop][scope.$index][Object.keys(item)[0]] }}
            </span>
          </div>
        </el-form-item>
        <!-- 自定义插槽 -->
        <template v-else-if="item.type!='index'">
          <slot v-bind="scope" :name="Object.keys(item)[0]" />
        </template>

        <template v-if="item.type==='index'">
          {{ scope.$index+1 }}
        </template>

      </template>
      <template v-for="slotsItem in showSlots" :slot="slotsItem" slot-scope="scope">
        <slot v-bind="scope" :name="slotsItem" />
      </template>

      <template v-if="add" #default="scope">
        <!-- 增加行 -->
        <p v-if="scope.row&&!scope.row.disabled">
          <span v-if="scope.$index===0&&firstRowAdd" class="operation add-icon" @click="addData" />
          <span v-else class="operation minus-icon" @click="minusData(scope)" />
          <slot v-bind="scope" name="otherBtn" />
        </p>

      </template>

    </ysn-table>
  </el-form>
</template>

<script>
import itemInput from './item/input'
import itemDatePicker from './item/datePicker'
import itemSelect from './item/select'
import itemRadio from './item/radio'
import itemCheckbox from './item/checkbox'
import itemFileUpload from './item/fileUpload.vue'
import itemPlannerDialog from './item/plannerDialog.vue'
import itemCascaderDialog from './item/cascaderDialog.vue'
import itemSelectDialog from './item/selectDialog.vue'
import itemTreeDialog from './item/treeDialog.vue'
import ItemChooseContract from './item/chooseContract.vue'
import ItemOptionFeename from './item/optionFeename.vue'
import ItemContNo from './item/contNo.vue'
import ItemMonthPicker from './item/monthPicker.vue'

import { deepClone, formatNumber } from '@/utils/index'

export default {
  name: 'YsnFormTable',
  components: {
    itemCheckbox,
    itemInput,
    itemRadio,
    itemSelect,
    itemDatePicker,
    itemFileUpload,
    itemPlannerDialog,
    itemCascaderDialog,
    itemSelectDialog,
    itemTreeDialog,
    ItemChooseContract,
    ItemOptionFeename,
    ItemContNo,
    ItemMonthPicker
  },
  model: {
    prop: 'data',
    event: 'dataChange'
  },
  props: {
    column: { type: Array, default: () => [] }, // 配置文件
    // 数据
    data: {
      type: Object,
      default: () => {}
    },
    // 必填 数据prop
    prop: {
      type: String,
      default: ''
    },
    // 表单校验
    rules: {
      type: Object,
      default: () => {}
    },
    // 是否有添加删除功能
    add: {
      type: Boolean,
      default: false
    },
    // 首行是否为新增
    firstRowAdd: {
      type: Boolean,
      default: true
    },
    // 定义其他插槽列表
    showSlots: {
      type: Array,
      default: () => []
    },
    // 是否为必填表单
    required: {
      type: Boolean,
      default: false
    },
    // 加行时默认数据对象
    defaultObj: {
      type: Function,
      default: () => {
        return {}
      }
    },
    itemWidth: { type: String, default: '100%' }, // form-item项的宽度
    // 操作行宽度
    operationWidth: {
      type: String,
      default: '100px'
    }
  },
  data() {
    return {
    }
  },
  computed: {

    // 遍历子集Colm
    colmAll() {
      const colm = deepClone(this.column)
      colm.forEach(item => {
        if (item.tableList) {
          item.tableList.forEach((tableItem, index) => {
            colm.push(tableItem)
          })
        }
        // delete item.tableList
      })
      return colm
    },
    // 遍历子集Colm
    colmList() {
      const colm = []
      this.column.forEach(item => {
        if (item.tableList) {
          item.tableList.forEach((tableItem) => {
            colm.push(tableItem)
          })
        }
      })
      return colm
    },
    // 插槽
    slotsList() {
      // const slotsList = this.column.map(item => Object.keys(item)[0])
      const slotsList = []
      this.column.forEach(item => {
        slotsList.push(Object.keys(item)[0])
        if (item.tableList) {
          item.tableList.forEach((tableItem) => {
            slotsList.push(Object.keys(tableItem)[0])
          })
        }
      })
      return [...slotsList, ...this.showSlots]
    }
  },
  watch: {
    data: {
      deep: true,
      immediate: true,
      handler(val) {
        if (this.add && val[this.prop].length === 0 && this.required) {
          const obj = this.defaultObj()
          val[this.prop].push(obj)
        }
      }
    }
  },
  methods: {
    getSlots(column) {
      let slots = []
      column.map(item => {
        slots.push(Object.keys(item)[0])
        if (item.tableList) {
          slots = [...slots, ...this.getSlots(item.tableList)]
        }
      })
      return slots
    },
    // 获取form-item的rules
    getRules(item) {
      if (!this.rules) return null
      return this.rules[Object.keys(item)[0]]
    },
    // 新增一行
    addData() {
      const obj = this.defaultObj()
      this.data[this.prop].push(JSON.parse(JSON.stringify(obj)))
    },
    // 删除
    minusData(scope) {
      this.$emit('changeDate', scope)
      const idx = scope.$index
      this.data[this.prop].splice(idx, 1)
      // 重置校验信息
      this.$nextTick(() => {
        if (this.$refs['ysnForm'] !== undefined) {
          this.$refs['ysnForm'].clearValidate()
        }
      })
    },
    // 格式化
    formatter(column, v) {
      if (v === null || v === undefined) return '-'
      let value = v
      const { type } = column
      if (value !== '') {
        if (type === 'money') {
          value = formatNumber(value)
        } else if (type === 'ten-thousand') {
          value = formatNumber(value, 'ten-thousand')
        } else if (type === 'number' || type === 'area') {
          value = formatNumber(value)
        } else if (type === 'rate') {
          value = formatNumber(value, 'rate')
        } else if (type === 'date-d') {
          // value = value
        }
      }

      return value
    },
    // 校验
    validate(callback) {
      return new Promise(reslove => {
        this.$refs['ysnForm'].validate((valid) => {
          console.log('校验', valid, callback)
          if (!valid) {
            // 光标移动到第一个未填写的表单
            setTimeout(() => {
              const isError = document.getElementsByClassName('is-error')
              isError[0].querySelector('input').focus()
            }, 50)
          }
          callback && callback(valid)
          reslove(valid)
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.ysn-form{
    ::v-deep  .el-input--medium .el-input__inner{
        height: 24px;
        line-height: 24px;
    }
}
.operation{
  width: 24px;
  height: 24px;
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
}
</style>

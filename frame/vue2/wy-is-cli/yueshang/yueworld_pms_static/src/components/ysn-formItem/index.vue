<template>
  <div class="flex-wrap ysn-form" :class="text ? 'text' : ''">
    <el-form-item
      v-for="(item, index) in configList"
      :key="'form-item' + index"
      :label-width="setWidth(item, index)"
      :label="item.label"
      :prop="item.prop"
      :style="{
        width: !autoWidth
          ? (item.span && colVal * item.span + '%') || colVal + '%'
          : 'auto',
      }"
      class="pr-8 pb-10 mb-8"
      :class="labelPosition === 'left' && item.label ? 'leftLabel' : ''"
      :rules="item.rules"
      :required="item.disabled ? false : item.required"
    >
      <div :style="{ width: item.width || itemWidth }">
        <components
          :is="
            Array.isArray(item.itemType)
              ? 'item-' + item.itemType[item.itemIndex]
              : 'item-' + item.itemType
          "
          v-if="!item.hasSlot && item.itemType !== 'text'"
          :form="form"
          :info-text="item.infoText || ''"
          :disabled="item.disabled || disabled"
          :clearable="item.clearable || clearable"
          v-bind="{ ...item }"
        />
        <span v-else-if="!item.hasSlot && item.itemType === 'text'">
          {{
            (item.formatter && item.formatter(form)) || form[item.prop] || '--'
          }}
        </span>
        <slot v-else v-bind="item" :name="item.prop" />
      </div>
      <!-- label插槽 -->
      <template v-if="item.hasLabelSlot || Array.isArray(item.itemType)" #label>
        <template v-if="item.hasLabelSlot">
          <slot v-bind="item" :name="item.prop + 'Label'" />
        </template>
        <!-- 表示切换类型 -->
        <template v-else-if="Array.isArray(item.itemType)">
          <label
            :for="item.prop"
            class="el-form-item__label el-form-item_custom"
            @click="changeIndex(item)"
          >{{ item.label
          }}<i :class="[item.iconName || 'el-icon-sort el-change-icon']" /></label>
        </template>
      </template>
    </el-form-item>
    <el-form-item
      v-if="$slots.default"
      label-width="0px"
      class="flex-auto slot"
    >
      <slot />
    </el-form-item>
  </div>
</template>

<script>
import itemInput from './item/input'
import itemDatePicker from './item/datePicker'
import itemSelect from './item/select'
import itemRadio from './item/radio'
import itemCheckbox from './item/checkbox'
import itemFileUpload from './item/fileUpload.vue'
import itemFileUploadFile from './item/fileUploadFile.vue'
import ItemCascaderDialog from './item/cascaderDialog.vue'
import ItemChoiceContractDialog from './item/choiceContractDialog.vue'
import ItemShopDialog from './item/shopDialog.vue'
import ItemPlannerDialog from './item/plannerDialog.vue'
import ItemSelectDialog from './item/selectDialog.vue'
import ItemTreeDialog from './item/treeDialog.vue'
import ItemProcessingDialog from './item/processingDialog.vue'
import ItemSelectBusiness from './item/selectBusiness'
import ItemContractDialog from './item/contractDialog'
import ItemMonthPicker from './item/monthPicker.vue'
import ItemCheckboxInput from './item/checkboxInput.vue'
import ItemTimePicker from './item/timePicker.vue'
import ItemPhone from './item/phone.vue'
import ItemConversionDialog from './item/conversionDialog'
import ItemChooseNotSubject from './item/chooseNotSubject.vue'

export default {
  name: 'YsnFormItem',
  components: {
    itemCheckbox,
    ItemPhone,
    itemInput,
    itemRadio,
    itemSelect,
    itemDatePicker,
    itemFileUpload,
    itemFileUploadFile,
    ItemCascaderDialog,
    ItemChoiceContractDialog,
    ItemShopDialog,
    ItemPlannerDialog,
    ItemSelectDialog,
    ItemTreeDialog,
    ItemProcessingDialog,
    ItemSelectBusiness,
    ItemContractDialog,
    ItemMonthPicker,
    ItemCheckboxInput,
    ItemTimePicker,
    ItemConversionDialog,
    ItemChooseNotSubject
  },
  props: {
    config: { type: Array, default: () => [] }, // 配置文件
    form: {
      type: Object,
      default: () => {}
    }, // 传进来的共享的form表单值对象
    rules: { type: Object, default: () => ({}) }, // 传进来的共享的form验证规则
    column: { type: Number, default: 4 }, // 总的col布局
    itemWidth: { type: String, default: '100%' }, // form-item项的宽度
    disabled: { type: Boolean, default: false },
    clearable: { type: Boolean, default: true },
    // label位置
    labelPosition: {
      type: String,
      default: 'top'
    },
    // 是否自动宽度
    autoWidth: {
      type: Boolean,
      default: false
    },
    // 是否文字展示
    text: {
      type: Boolean,
      default: false
    }
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
      return 100 / this.column
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
        rowList[index][count - (e.span || 1)] = {
          name: e.label || '',
          prop: e.prop,
          index: i
        }
        if (
          count + ((arr[i + 1] || {}).span || 1) > this.column &&
          arr[i + 1]
        ) {
          rowList.push(new Array(this.column))
          index++
          count = 0
        }
      })
      // 行数据转列数据
      rowList.forEach((e) => {
        for (let i = 0; i < e.length; i++) {
          if (!columnList[i]) {
            columnList[i] = []
          }
          columnList[i].push(e[i])
        }
      })
      // 取出每一列最大值nameLength
      // 取出每一列的index下标
      return columnList.map((e) => {
        const nameLength = Math.max.apply(
          null,
          e.map((el) => (el && this.charCode(el.name).length / 4) || 0)
        )
        let hasRules = false
        e.map((el) => {
          if (
            el &&
            el.name &&
            this.rules[el.prop] &&
            this.rules[el.prop][0].required
          ) {
            hasRules = true
          }
        })
        const indexList = e.map((el) => el && el.index)
        return { nameLength, indexList, hasRules }
      })
    }
  },
  created() {},
  methods: {
    // 通过labelWidth获取对应index里面的值
    setWidth(item, index) {
      // 增加rules为入参，判断当前项是否有必填校验，如果有那么width加上11px；
      const val = this.labelWidth.find((e) => e.indexList.includes(index))
      const rulesWidth = val.hasRules ? 11 : 0
      return val.nameLength * 14 + rulesWidth + 16 + 'px'
    },
    // 将字符串转为16进制值，汉子转4位，英文字母和数组转2位
    charCode: (str) =>
      str
        .split('')
        .reduce((total, e) => total + e.codePointAt(0).toString(16), ''),

    /**
     * @param {Object} item
     * @desc:切换类型
     */
    changeIndex(item) {
      const itemTypeLength = item.itemType.length
      item.itemIndex < itemTypeLength - 1
        ? item.itemIndex++
        : (item.itemIndex = 0)
    }
  }
}
</script>
<style lang="scss" scoped>
.ysn-form .el-form-item {
  margin-bottom: 8px;
  // display: flex;
  // align-items: center;
  .el-change-icon {
    transform: rotate(90deg);
  }
  .el-form-item_custom {
    cursor: pointer;
    i {
      margin-left: 2px;
    }
  }
}
</style>

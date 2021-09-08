<!--
 * @Description:
 * @Author: wyz
 * @LastEditors: wyz
-->
<template>
  <div>
    <el-form ref="rulesForm" :model="currentFormData" label-position="top" size="small" :rules="rulesForm">
      <ysn-formItem :form="currentFormData" :config="configData" :column="$attrs.column" clearable>
        <template #leaseArea>
          <!--          <el-tooltip :content="getValue||'请选择'" placement="top" effect="dark">-->
          <!--            <div>-->
          <!--              <ysn-inputTag v-popover:popover :data-list="form[$attrs.prop]" v-bind="$attrs" :list="currentDataList" @tagClose="tagClose" />-->
          <!--            </div>-->
          <!--          </el-tooltip>-->
        </template>
        <template #decoratePeriod>
          <el-input :value="decoratePeriodCal()" :disabled="true" />
        </template>
      </ysn-formItem>
    </el-form>
  </div>
</template>
<script>
import pageAccorDetailCom from '@mixins/pageAccorDetailCom'

export default {
  name: 'BusinessAffairs',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'businessAffairs',
    event: 'change'
  },
  props: {
    businessAffairs: {
      type: Object,
      default: () => {
      }
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    // 合同时间大于等于交付日
    return {
      currentVal: [], // 展示的数据
      currentDataList: [], // 全部子级数据
      treeData: [], // 树形数据
      rulesForm: {}
    }
  },
  computed: {
    configData() {
      const that = this
      // 装修结束日大于装修开始日
      const decorationPickerOptions = {
        disabledDate(time) {
          if (that.currentFormData.decorationEnterDate) {
            return new Date(that.currentFormData.decorationEnterDate).getTime() > time.getTime() + 1000 * 60 * 60 * 24
          }
        }
      }
      // 合同结束日大于合同开始日
      const contPickerOptions = {
        disabledDate(time) {
          if (that.currentFormData.contBeginDate) {
            const milliseconds = time.getTime() + 1000 * 60 * 60 * 24
            const beginDate = that.data.beginDate
            let result = new Date(that.currentFormData.contBeginDate).getTime() > milliseconds || // 大于合同开始时间
                new Date(that.currentFormData.appointDate).getTime() > milliseconds || // 大于交付日
                new Date(that.currentFormData.decorationEnterDate).getTime() > milliseconds // 大于交付日
            Object.keys(beginDate).forEach((key) => {
              if (typeof beginDate[key] === 'string') {
                result = result || new Date(beginDate[key]).getTime() + 1000 * 60 * 60 * 24 > milliseconds
              }
            })
            return result
          }
        }
      }
      // 开业日大于装修结束日
      const openPickerOptions = {
        disabledDate(time) {
          if (that.currentFormData.contBeginDate) {
            return new Date(that.currentFormData.contBeginDate).getTime() > time.getTime() + 1000 * 60 * 60 * 24
          }
        }
      }
      return [
        {
          itemType: 'cascaderDialog',
          prop: 'leaseArea',
          label: '租赁区域',
          placeholder: '请输入',
          width: '206px',
          list: this.$PUBFN.getOptionsList('globalSearchList'),
          listName: 'label',
          listValue: 'value',
          multiple: true,
          change: this.changeLeaseArea,
          disabled: !this.data.essentialData.contNo
        },
        {
          itemType: 'input',
          prop: 'spaceEquityNature',
          label: '产权类型',
          placeholder: '请输入',
          width: '206px',
          disabled: true
        },
        {
          itemType: 'select',
          prop: 'isRentShop',
          label: '是否分铺计租',
          placeholder: '请输入',
          width: '206px',
          list: this.$PUBFN.getOptionsList('isRentShop'),
          listName: 'label',
          listValue: 'value',
          disabled: true
        },
        {
          itemType: 'select',
          prop: 'areaIdType',
          label: '计租面积类型',
          placeholder: '请输入',
          width: '206px',
          list: this.$PUBFN.getOptionsList('rentaType'),
          listName: 'label',
          listValue: 'value',
          disabled: !this.data.essentialData.contNo
        },
        {
          itemType: 'input',
          prop: 'spaceFormatNamePlan',
          label: '规划业态',
          placeholder: '请输入',
          width: '206px',
          disabled: true
        },
        {
          itemType: 'input',
          prop: 'spaceGrossArea',
          label: '建筑面积(m²)',
          placeholder: '请输入',
          width: '206px',
          disabled: true
        },
        {
          itemType: 'input',
          prop: 'spaceNetArea',
          label: '套内面积(m²)',
          placeholder: '请输入',
          width: '206px',
          disabled: true
        },
        {
          itemType: 'input',
          prop: 'meterRentArea',
          label: '计租面积(m²)',
          placeholder: '请输入',
          width: '206px',
          disabled: true
        },
        {
          itemType: 'datePicker',
          placeholder: '请输入',
          type: 'date',
          prop: 'appointDate',
          label: '交付日',
          valueFormat: 'yyyy-MM-dd',
          change: this.changeAppointDate,
          disabled: !this.data.essentialData.contNo
        },
        {
          itemType: 'datePicker',
          placeholder: '请输入',
          type: 'date',
          prop: 'decorationEnterDate',
          label: '装修进场日',
          valueFormat: 'yyyy-MM-dd',
          disabled: !this.data.essentialData.contNo
        },
        {
          itemType: 'datePicker',
          placeholder: '请输入',
          type: 'date',
          prop: 'decorateEndDate',
          label: '装修结束日',
          valueFormat: 'yyyy-MM-dd',
          pickerOptions: decorationPickerOptions,
          disabled: !this.data.essentialData.contNo
        },
        { itemType: 'input', prop: 'decoratePeriod', label: '装修期', width: '206px', hasSlot: true,
          disabled: !this.data.essentialData.contNo },
        {
          itemType: 'datePicker',
          placeholder: '请输入',
          type: 'date',
          prop: 'contBeginDate',
          label: '合同开始日期',
          valueFormat: 'yyyy-MM-dd',
          disabled: !this.data.essentialData.contNo
        },
        {
          itemType: 'datePicker',
          placeholder: '请输入',
          type: 'date',
          prop: 'contEndDate',
          label: '合同结束日期',
          valueFormat: 'yyyy-MM-dd',
          pickerOptions: contPickerOptions,
          disabled: !this.data.essentialData.contNo
        },
        {
          itemType: 'input',
          prop: 'rentYears',
          label: '租期',
          placeholder: '请输入',
          width: '206px',
          disabled: true
        },
        {
          itemType: 'datePicker',
          placeholder: '请输入',
          type: 'date',
          prop: 'openDate',
          label: '开业日',
          valueFormat: 'yyyy-MM-dd',
          pickerOptions: openPickerOptions,
          disabled: !this.data.essentialData.contNo
        }
      ]
    }
  },
  methods: {
    // 装修期计算
    decoratePeriodCal() {
      if (!this.currentFormData.decorationEnterDate || !this.currentFormData.decorateEndDate) {
        return 0
      }
      const startDate = new Date(Date.parse(this.currentFormData.decorationEnterDate)).getTime()
      const endDate = new Date(Date.parse(this.currentFormData.decorateEndDate)).getTime()
      return ((endDate - startDate) / 1000 / 3600 / 24)
    },
    // 交付日
    changeAppointDate(v) {
      this.currentFormData.decorationEnterDate = v
      this.currentFormData.decorateEndDate = ''
      this.currentFormData.contBeginDate = v
      this.currentFormData.contEndDate = ''
    }
  }
}
</script>


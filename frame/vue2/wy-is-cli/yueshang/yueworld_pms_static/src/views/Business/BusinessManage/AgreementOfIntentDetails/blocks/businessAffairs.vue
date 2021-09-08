<!--
 * @Description:
 * @Author: zengcheng
 * @Date: 2021-06-30 14:10:09
 * @LastEditors: fhj
 * @LastEditTime: 2021-08-05 16:51:06
-->
<template>
  <div>
    <ysn-displayInfo
      :data="currentFormData"
      :config="configData"
      :column="4"
    />
  </div>
</template>
<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
import { businessAffairsRule } from '../rules'
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
      default: () => {}
    }
  },
  data() {
    // 合同时间大于等于交付日
    return {
      businessAffairsRule: businessAffairsRule,
      configData: [
        { itemType: 'select', prop: 'leaseArea', label: '租赁区域', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value', multiple: true, change: this.changeLeaseArea, hasSlot: true, formatter: row => {
          console.log(row, '13123213x')
          return 123
        } },
        { itemType: 'input', prop: 'spaceEquityNature', label: '产权类型', placeholder: '请输入', width: '206px', disabled: true },
        { itemType: 'select', prop: 'isRentShop', label: '是否分铺计租', placeholder: '请输入', width: '206px', list: [], listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'areaIdType', label: '计租面积类型', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value', change: this.changeAreaIdType },
        { itemType: 'input', prop: 'spaceFormatNamePlan', label: '规划业态', placeholder: '请输入', width: '206px', disabled: true },
        { itemType: 'input', prop: 'spaceGrossArea', label: '建筑面积(m²)', placeholder: '请输入', width: '206px', disabled: true },
        { itemType: 'input', prop: 'spaceNetArea', label: '套内面积(m²)', placeholder: '请输入', width: '206px', disabled: true },
        { itemType: 'input', prop: 'meterRentArea', label: '计租面积(m²)', placeholder: '请输入', width: '206px', disabled: true },
        { itemType: 'datePicker', placeholder: '请输入', type: 'date', prop: 'appointDate', label: '交付日', valueFormat: 'yyyy-MM-dd', change: this.changeAppointDate },
        { itemType: 'datePicker', placeholder: '请输入', type: 'date', prop: 'decorationEnterDate', label: '装修进场日', valueFormat: 'yyyy-MM-dd' },
        { itemType: 'datePicker', placeholder: '请输入', type: 'date', prop: 'decorateEndDate', label: '装修结束日', valueFormat: 'yyyy-MM-dd' },
        { itemType: 'datePicker', placeholder: '请输入', type: 'date', prop: 'openDate', label: '开业日', valueFormat: 'yyyy-MM-dd' },
        { itemType: 'datePicker', placeholder: '请输入', type: 'date', prop: 'contBeginDate', label: '合同开始日期', valueFormat: 'yyyy-MM-dd' },
        { itemType: 'datePicker', placeholder: '请输入', type: 'date', prop: 'contEndDate', label: '合同结束日期', valueFormat: 'yyyy-MM-dd' },
        { itemType: 'input', prop: 'decoratePeriod', label: '装修期', placeholder: '请输入', width: '206px', disabled: true },
        { itemType: 'input', prop: 'rentYears', label: '租期', placeholder: '请输入', width: '206px', disabled: true },
        { itemType: 'datePicker', placeholder: '请输入', type: 'date', prop: 'meterRentBeginDate', label: '租金起计日', valueFormat: 'yyyy-MM-dd' },
        { itemType: 'datePicker', placeholder: '请输入', type: 'date', prop: 'managementBeginDate', label: '物管费起计日', valueFormat: 'yyyy-MM-dd' }
      ]
    }
  },
  computed: {
    productNoYn() {
      // 是否禁止输入框
      return this.$attrs.column === 4
    },
    configData2() {
      var that = this
      // 装修结束日大于装修开始日
      const pickerOptions = {
        disabledDate(time) {
          if (that.currentFormData.decorationEnterDate) {
            return new Date(that.currentFormData.decorationEnterDate).getTime() > time.getTime() + 1000 * 60 * 60 * 24
          }
        }
      }
      // 开业日范围大于装修结束日
      const pickerOption = {
        disabledDate(time) {
          if (that.currentFormData.decorateEndDate) {
            return new Date(that.currentFormData.decorateEndDate).getTime() > time.getTime() + 1000 * 60 * 60 * 24
          }
        }
      }
      let list = []
      if (that.currentFormData.leaseArea.length > 1) {
        list = [
          { itemType: 'select', prop: 'isRentShop', label: '是否分铺计租', placeholder: '请输入', width: '206px', list: that.$PUBFN.getOptionsList('distributionType'), listName: 'label', listValue: 'value' }
        ]
      }
      if (that.currentFormData.leaseArea.length === 1) {
        list = [
          { itemType: 'select', prop: 'isRentShop', label: '是否分铺计租', placeholder: '请输入', width: '206px', list: that.$PUBFN.getOptionsList('distribution_Type'), listName: 'label', listValue: 'value' }
        ]
      }
      if (that.currentFormData.leaseArea.length === 0) {
        list = [
          { itemType: 'select', prop: 'isRentShop', label: '是否分铺计租', placeholder: '请输入', width: '206px', list: [], listName: 'label', listValue: 'value' }
        ]
      }
      return [
        { itemType: 'select', prop: 'leaseArea', label: '2222租赁区域', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value', multiple: true, change: this.changeLeaseArea, hasSlot: true, formatter: row => {
          console.log(row)
        } },
        { itemType: 'input', prop: 'spaceEquityNature', label: '产权类型', placeholder: '请输入', width: '206px', disabled: true },
        ...list,
        // { itemType: 'select', prop: 'isRentShop', label: '是否分铺计租', placeholder: '请输入', width: '206px', list: [], listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'areaIdType', label: '计租面积类型', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value', change: this.changeAreaIdType },
        { itemType: 'input', prop: 'spaceFormatNamePlan', label: '规划业态', placeholder: '请输入', width: '206px', disabled: true },
        { itemType: 'input', prop: 'spaceGrossArea', label: '建筑面积(m²)', placeholder: '请输入', width: '206px', disabled: true },
        { itemType: 'input', prop: 'spaceNetArea', label: '套内面积(m²)', placeholder: '请输入', width: '206px', disabled: true },
        { itemType: 'input', prop: 'meterRentArea', label: '计租面积(m²)', placeholder: '请输入', width: '206px', disabled: true },
        { itemType: 'datePicker', placeholder: '请输入', type: 'date', prop: 'appointDate', label: '交付日', valueFormat: 'yyyy-MM-dd', change: this.changeAppointDate },
        { itemType: 'datePicker', placeholder: '请输入', type: 'date', prop: 'decorationEnterDate', label: '装修进场日', valueFormat: 'yyyy-MM-dd' },
        { itemType: 'datePicker', placeholder: '请输入', type: 'date', prop: 'decorateEndDate', label: '装修结束日', valueFormat: 'yyyy-MM-dd', pickerOptions: pickerOptions },
        { itemType: 'datePicker', placeholder: '请输入', type: 'date', prop: 'openDate', label: '开业日', valueFormat: 'yyyy-MM-dd', pickerOptions: pickerOption },
        { itemType: 'datePicker', placeholder: '请输入', type: 'date', prop: 'contBeginDate', label: '合同开始日期', valueFormat: 'yyyy-MM-dd' },
        { itemType: 'datePicker', placeholder: '请输入', type: 'date', prop: 'contEndDate', label: '合同结束日期', valueFormat: 'yyyy-MM-dd' },
        { itemType: 'input', prop: 'decoratePeriod', label: '装修期', placeholder: '请输入', width: '206px', disabled: true },
        { itemType: 'input', prop: 'rentYears', label: '租期', placeholder: '请输入', width: '206px', disabled: true },
        { itemType: 'datePicker', placeholder: '请输入', type: 'date', prop: 'meterRentBeginDate', label: '租金起计日', valueFormat: 'yyyy-MM-dd' },
        { itemType: 'datePicker', placeholder: '请输入', type: 'date', prop: 'managementBeginDate', label: '物管费起计日', valueFormat: 'yyyy-MM-dd' }
      ]
    },
    addlist() {
      return this.currentFormData.leaseArea
    }
  },
  watch: {
    'addlist'(newValue, oldValue) {
      console.log(newValue, oldValue)
      this.currentFormData.leaseArea = newValue
    }
  },
  mounted() {
  },
  methods: {
    // 分铺计租
    changeLeaseArea(v) {
      console.log(v)
      console.log(this.configData)
      this.currentFormData.spaceFormatNamePlan = '根据铺位带出'
      this.currentFormData.spaceGrossArea = '根据铺位带出'
      this.currentFormData.spaceNetArea = '根据铺位带出'
      this.currentFormData.meterRentArea = '根据铺位带出'
      // if (v.leaseArea.length > 1) {
      //   this.currentFormData.isRentShop = ''
      //   // this.configData[2].list = this.$PUBFN.getOptionsList('distributionType')
      //   return
      // }
      // if (v.leaseArea.length === 0) {
      //   this.currentFormData.isRentShop = ''
      //   return
      // }

      // this.configData[2].list = this.$PUBFN.getOptionsList('distribution_Type')
      this.currentFormData.isRentShop = '1'
    },
    // 交付日
    changeAppointDate(v) {
      console.log(v)
      this.currentFormData.decorationEnterDate = v
      this.currentFormData.contBeginDate = v
      console.log(this.currentFormData)
    },
    // 计算面积类型
    changeAreaIdType() {
      console.log('计算面积类型')
    }

  }

}
</script>


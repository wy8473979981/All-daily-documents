<!--
 * @Description:
 * @Author: zengcheng
 * @Date: 2021-06-30 14:10:09
 * @LastEditors: zengcheng
 * @LastEditTime: 2021-08-13 15:28:57
-->
<template>
  <div>
    <el-form ref="rulesForm" :key="uoapde" :model="currentFormData" label-position="top" size="small" :rules="rules" :disabled="productNoYn">
      <ysn-formItem :key="uoapde" :form="currentFormData" :config="configData" :column="$attrs.column" clearable />
    </el-form>
  </div>
</template>
<script>
import { spacingText } from '@/utils/index'
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
  //  开业日大于装修结束日
    const openDatestr = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error(''))
      }

      if (this.currentFormData.decorateEndDate && value) {
        if (!this.timeSize(value, this.currentFormData.decorateEndDate)) {
          return callback(new Error('开业日大于装修结束日'))
        }
        callback()
      }
    }
    //  合同开始日期大于等于交付日
    const contBeginDatestr = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error(''))
      }

      if (this.currentFormData.appointDate && value) {
        const x = new Date(value)
        const j = new Date(this.currentFormData.appointDate)
        if (x < j) {
          return callback(new Error('合同开始日期大于等于交付日'))
        }
        callback()
      }
    }
    // 装修开始日
    const decorateEnd = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error(''))
      }

      if (this.currentFormData.decorateEndDate && value) {
        if (!this.dateCompare(value, this.currentFormData.decorateEndDate)) {
          return callback(new Error('装修进场日不能大于装修结束日'))
        }
        callback()
      }
    }
    // 合同结束日
    const contEnd = (rule, value, callback) => {
      if (!this.currentFormData.appointDate || !this.currentFormData.contBeginDate || !this.currentFormData.decorationEnterDate || !this.currentFormData.meterRentBeginDate || !this.currentFormData.managementBeginDate) {
        return callback(new Error('交付日,合同开始时间,装修进场日,租金起计日,物管费起计日不能为空'))
      }
      if (this.currentFormData.appointDate) {
        if (!this.dateCompare(this.currentFormData.appointDate, value)) {
          return callback(new Error('合同结束日大于等于交付日'))
        }
      }
      if (this.currentFormData.contBeginDate) {
        if (!this.dateCompare(this.currentFormData.contBeginDate, value)) {
          return callback(new Error('合同结束日大于等于合同开始时间'))
        }
      }
      if (this.currentFormData.decorationEnterDate) {
        if (!this.dateCompare(this.currentFormData.decorationEnterDate, value)) {
          return callback(new Error('合同结束日大于等于装修进场日'))
        }
      }
      if (this.currentFormData.meterRentBeginDate) {
        if (!this.dateCompare(this.currentFormData.meterRentBeginDate, value)) {
          return callback(new Error('合同结束日大于等于租金起计日'))
        }
      }
      if (this.currentFormData.managementBeginDate) {
        if (!this.dateCompare(this.currentFormData.managementBeginDate, value)) {
          return callback(new Error('合同结束日大于等于物管费起计日'))
        }
      }
      callback()
    }

    // 合同时间大于等于交付日
    return {
      uoapde: 0,
      strtime: '',
      add: 0,
      businessAffairsRule: businessAffairsRule,
      rules: {
        leaseArea: [{ required: true, message: '租赁区域不能为空' }],
        isRentShop: [{ required: true, message: '是否分铺计租不能为空' }],
        areaIdType: [{ required: true, message: '计租面积类型' }],
        spaceFormatNamePlan: [{ required: true, message: '规划业态不能为空' }],
        spaceGrossArea: [{ required: true, message: '建筑面积不能为空' }],
        spaceNetArea: [{ required: true, message: '套内面积不能为空' }],
        meterRentArea: [{ required: true, message: '计租面积不能为空' }],
        appointDate: [{ required: true, message: '交付日不能为空' }],
        decorationEnterDate: [{ validator: decorateEnd, required: true, message: '装修进场日不能为空' }],
        decorateEndDate: [{ required: true, message: '装修结束日不能为空' }],
        openDate: [{ validator: openDatestr, required: true, message: '开业日不能为空' }],
        contBeginDate: [{ validator: contBeginDatestr, required: true, message: '合同开始日不能为空' }],
        contEndDate: [{ validator: contEnd, required: true, message: '合同结束日不能为空' }],
        decoratePeriod: [{ required: true, message: '装修期不能为空' }],
        rentYears: [{ required: true, message: '租期不能为空' }],
        meterRentBeginDate: [{ required: true, message: '租金起计日不能为空' }],
        managementBeginDate: [{ required: true, message: '物管费起计日不能为空' }]
      }
    }
  },
  computed: {
    productNoYn() {
      // 是否禁止输入框
      return this.$attrs.column === 4
    },
    configData() {
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
      console.log(that.currentFormData.leaseArea.length)
      // console.log(that.currentFormData.leaseArea.length)
      if (that.currentFormData.leaseArea.length > 1) {
        list = [
          { itemType: 'select', prop: 'isRentShop', label: '是否分铺计租', placeholder: '请选择', width: '206px', list: that.$PUBFN.getOptionsList('distributionType'), listName: 'label', listValue: 'value' }
        ]
      }
      if (that.currentFormData.leaseArea.length === 1) {
        list = [
          { itemType: 'select', prop: 'isRentShop', label: '是否分铺计租', placeholder: '请选择', width: '206px', list: that.$PUBFN.getOptionsList('distribution_Type'), listName: 'label', listValue: 'value' }
        ]
      }
      if (that.currentFormData.leaseArea.length === 0) {
        list = [
          { itemType: 'select', prop: 'isRentShop', label: '是否分铺计租', placeholder: '请选择', width: '206px', list: that.$PUBFN.getOptionsList('distribution_Type'), listName: 'label', listValue: 'value' }
        ]
      }

      console.log(list)
      return [
        { itemType: 'cascaderDialog', prop: 'leaseArea', label: '租赁区域', placeholder: '请选择', width: '206px', multiple: true, change: this.changeLeaseArea },
        { itemType: 'input', prop: 'spaceEquityNature', label: '产权类型', placeholder: '自动带出', width: '206px', disabled: true },
        ...list,
        // { itemType: 'select', prop: 'isRentShop', label: '是否分铺计租', placeholder: '请输入', width: '206px', list: [], listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'areaIdType', label: '计租面积类型', placeholder: '请选择', width: '206px', list: this.$PUBFN.getOptionsList('rentaType'), listName: 'label', listValue: 'value', change: this.changeAreaIdType },
        { itemType: 'input', prop: 'spaceFormatNamePlan', label: '规划业态', placeholder: '餐饮', width: '206px', disabled: true },
        { itemType: 'input', prop: 'spaceGrossArea', label: '建筑面积(m²)', placeholder: '请输入', width: '206px', disabled: true },
        { itemType: 'input', prop: 'spaceNetArea', label: '套内面积(m²)', placeholder: '请输入', width: '206px', disabled: true },
        { itemType: 'input', prop: 'meterRentArea', label: '计租面积(m²)', placeholder: '请输入', width: '206px', disabled: true },
        { itemType: 'datePicker', placeholder: '请输入', type: 'date', prop: 'appointDate', label: '交付日', width: '206px', valueFormat: 'yyyy-MM-dd', change: this.changeAppointDate },
        { itemType: 'datePicker', width: '206px', placeholder: '请输入', type: 'date', prop: 'decorationEnterDate', label: '装修进场日', valueFormat: 'yyyy-MM-dd', change: this.changedecorationEnterDate },
        { itemType: 'datePicker', placeholder: '请输入', type: 'date', prop: 'decorateEndDate', label: '装修结束日', width: '206px', valueFormat: 'yyyy-MM-dd', pickerOptions: pickerOptions, change: this.changeDecorationEnterDate },
        { itemType: 'datePicker', width: '206px', placeholder: '请输入', type: 'date', prop: 'openDate', label: '开业日', valueFormat: 'yyyy-MM-dd', pickerOptions: pickerOption },
        { itemType: 'datePicker', width: '206px', placeholder: '请输入', type: 'date', prop: 'contBeginDate', label: '合同开始日期', valueFormat: 'yyyy-MM-dd', change: this.contBeginDate },
        { itemType: 'datePicker', width: '206px', placeholder: '请输入', type: 'date', prop: 'contEndDate', label: '合同结束日期', valueFormat: 'yyyy-MM-dd', change: this.changeContEndDate },
        { itemType: 'input', prop: 'decoratePeriod', label: '装修期', placeholder: '请输入', width: '206px', disabled: true },
        { itemType: 'input', prop: 'rentYears', label: '租期', placeholder: '请输入', width: '206px', disabled: true },
        { itemType: 'datePicker', placeholder: '请输入', type: 'date', prop: 'meterRentBeginDate', label: '租金起计日', width: '206px', valueFormat: 'yyyy-MM-dd' },
        { itemType: 'datePicker', width: '206px', placeholder: '请输入', type: 'date', prop: 'managementBeginDate', label: '物管费起计日', valueFormat: 'yyyy-MM-dd' },
        { itemType: 'fileUpload', prop: 'fileUpload', label: '平面落位图', btnText: '上传', width: '428px', isSearch: true, actionUrl: '', limitNum: 4, span: 4, infoText: '上传5M以内的图片格式的文件' }
      ]
    }
  },
  // watch: {
  //   'currentFormData.appointDate'(value) {
  //     if (value) {
  //       console.log('111')
  //     }
  //   }
  // },
  methods: {
    // 分铺计租
    changeLeaseArea(v) {
      console.log(v)
      console.log(this.configData)
      this.currentFormData.spaceFormatNamePlan = '根据铺位带出'
      this.currentFormData.spaceGrossArea = '根据铺位带出'
      this.currentFormData.spaceNetArea = '根据铺位带出'
      this.currentFormData.meterRentArea = '72'
      if (v.length === 1) {
        this.currentFormData.isRentShop = 1
        console.log(this.currentFormData)
      }
      // this.currentFormData.isRentShop = '1'
    },
    // 交付日
    changeAppointDate(v) {
      this.add++
      this.currentFormData.decorationEnterDate = v
      this.currentFormData.contBeginDate = v
      this.currentFormData.meterRentBeginDate = v // 租金起计日
      this.currentFormData.managementBeginDate = v // 物管费起计日

      if (this.add !== 1) {
        this.currentFormData.decorateEndDate = ''
        this.currentFormData.openDate = ''
        this.currentFormData.contEndDate = ''
        return
      }
      console.log(this.currentFormData)
    },
    // 计算面积类型
    changeAreaIdType() {
      console.log('计算面积类型')
    },
    // ok(data) {
    //   console.log(data)
    //   // this.currentFormData.leaseArea = data
    //   if (data.length === 1) {
    //     this.currentFormData.isRentShop = '1'
    //     return
    //   }
    // },
    // 装修结束日
    changeDecorationEnterDate() {
      // this.currentFormData.decorationEnterDate // 进场日
      // decorateEndDate结束 日子
      // 计算租期
      this.currentFormData.decoratePeriod = spacingText(this.currentFormData.decorateEndDate, this.currentFormData.decorationEnterDate)
      // rentYears('121', '2323') {
      //   return spacingText('12', '232',)
      // },

      // const tian = (24 * 60 * 60 * 1000)
      // const day = (new Date(this.currentFormData.decorateEndDate).getTime() - new Date(this.currentFormData.decorationEnterDate).getTime()) / tian
      // // console.log(day)
      // this.currentFormData.decoratePeriod = `${day}天`
    },
    // 装修进场日
    changedecorationEnterDate() {
      console.log('1111')
      console.log(spacingText(this.currentFormData.decorateEndDate, this.currentFormData.decorationEnterDate))
      this.currentFormData.decoratePeriod = spacingText(this.currentFormData.decorateEndDate, this.currentFormData.decorationEnterDate)
      console.log(this.currentFormData)
    },
    // 合同开始日期
    contBeginDate(v) {
      this.currentFormData.meterRentBeginDate = v // 租金起计日
      this.currentFormData.managementBeginDate = v // 物管费起计日
      this.currentFormData.rentYears = spacingText(this.currentFormData.contEndDate, this.currentFormData.contBeginDate)
    },
    // 合同结束日期
    changeContEndDate() {
      this.currentFormData.rentYears = spacingText(this.currentFormData.contEndDate, this.currentFormData.contBeginDate)

      // this.currentFormData.contBeginDate // 开始
      // this.currentFormData.contEndDate // 结束
      // const tian = (24 * 60 * 60 * 1000)
      // console.log(this.currentFormData.contBeginDate, this.currentFormData.contEndDate)
      // console.log(new Date(this.currentFormData.contBeginDate).getTime())
      // console.log(new Date(this.currentFormData.contEndDate).getTime())
      // 2021-7-17 ～2021-7-18 算两天租期
      // var day = (new Date(this.currentFormData.contEndDate).getTime() - new Date(this.currentFormData.contBeginDate).getTime() + tian) / tian
      // 2021-7-17 ～2021-7-18 算一天租期
      // const day = (new Date(this.currentFormData.contEndDate).getTime() - new Date(this.currentFormData.contBeginDate).getTime()) / tian
      // console.log(day)
      // this.currentFormData.rentYears = day % 365 === 0 ? day / 365 + '年' : day % 30 === 0 ? day / 30 + '个月' : day + '天'
    }
  }

}
</script>


<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
-->
<template>
  <el-form ref="rulesForm" :model="currentFormData" label-position="top" size="small">
    <ysn-formItem :form="currentFormData" :config="configData" :column="5" clearable>
      <template #effectiveDateLabel>
        生效起始日期
        <el-tooltip class="item" effect="dark" :content="`需晚于原铺位最晚合同结束日期${data.contEndDate?':'+data.contEndDate:''}`" placement="top">
          <i class="el-icon-warning" style="color:#6F120C"></i>
        </el-tooltip>
      </template>
    </ysn-formItem>
  </el-form>
</template>
<script>
import PUBFN from '@/utils/pubFn'
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
export default {
  name: 'From',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'baseInfo',
    event: 'change'
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          otherArea: []
        }
      }
    },
    baseInfo: {
      type: Object,
      default: () => {
        return {
          otherArea: []
        }
      }
    }
  },
  data() {
    return {
      configData: [ // 新单元表单配置
        { itemType: 'select', width: '206px', prop: 'buildingName', label: '楼栋', required: true, list: PUBFN.getOptionsList('allFlo') },
        { itemType: 'select', width: '206px', prop: 'floorName', label: '楼层', required: true, list: PUBFN.getOptionsList('allFlos') },
        { itemType: 'input', width: '206px', prop: 'spaceId', label: '商铺编码', disabled: true, placeholder: '—自动带入—' },
        { itemType: 'input', width: '206px', prop: 'spaceName', label: '铺位号', required: true },
        { itemType: 'select', width: '206px', prop: 'spaceType', label: '商业类型', required: true, list: PUBFN.getOptionsList('spaceTypeOpenClose') },
        { itemType: 'select', width: '206px', prop: 'spaceEquityNature', label: '产权性质', required: true, list: PUBFN.getOptionsList('propertyType') },
        { itemType: 'select', width: '206px', prop: 'spaceLocation', label: '商铺属性', required: true, list: PUBFN.getOptionsList('shopsType') },
        { itemType: 'select', width: '206px', prop: 'nameTodo', label: '规划业态', required: true, list: PUBFN.getOptionsList('contType') }, // todo:待确认字段
        { itemType: 'select', width: '206px', prop: 'areaType', label: '计租面积类型', required: true, list: PUBFN.getOptionsList('areaType'), change: this.areaTypeChange },
        { itemType: 'input', width: '206px', prop: 'leasableArea', label: '计租面积(m²)', disabled: true, placeholder: '—自动带入—' },
        { itemType: 'input', width: '206px', prop: 'spaceGrossArea', label: '建筑面积(m²)', required: true, inputType: 'Number', change: this.areaTypeChange },
        { itemType: 'input', width: '206px', prop: 'spaceNetArea', label: '套内面积(m²)', required: true, inputType: 'Number', change: this.areaTypeChange },
        { itemType: 'datePicker', width: '206px', prop: 'effectiveDate', label: '生效起始日期', required: true, placeholder: '请选择日期', change: this.datsPickerChange, hasLabelSlot: true },
        { itemType: 'checkbox', width: '206px', prop: 'otherArea', label: '计入统计', list: PUBFN.getOptionsList('sumType') }
        // { itemType: 'input', width: '206px', prop: 'standardDeposit', label: '租赁保证金标准(元)', required: true, inputType: 'Number' },
        // { itemType: 'input', width: '206px', prop: 'standardDecorationDeposit', label: '装修保证金标准(元)', required: true, inputType: 'Number' },
        // { itemType: 'input', width: '206px', prop: 'standardRentFreePeriod', label: '免租期(天)', required: true }
      ]
    }
  },
  watch: {
    // 是否选择项目
    'data.baseInfo.programName': {
      deep: true,
      immediate: true,
      handler(val) {
        // 未选择项目
        if (!val) {
          this.configData[0].disabled = true
          this.configData[0].placeholder = '请先选择项目'
          return
        }
        this.configData[0].disabled = false
        this.configData[0].placeholder = '请选择楼栋'
      }
    },
    // 是否选择楼栋
    'currentFormData.buildingName': {
      deep: true,
      immediate: true,
      handler(val) {
        // 未选择楼栋
        if (!val) {
          this.configData[1].disabled = true
          this.configData[1].placeholder = '请先选择楼栋'
          return
        }
        this.configData[1].disabled = false
        this.configData[1].placeholder = '请选择楼层'
      }
    }
  },
  mounted() {
    console.log('currentFormData', this.baseInfo, this.currentFormData)
  },
  methods: {
    /** *
     * 生效日期变化
     * @param val
     */
    datsPickerChange(val) {
      // fix:change事件之后 页面组件值可能还没有更新
      this.$nextTick(() => {
        this.triggerParentData()
      })
    },
    /** *
     * 触发页面的预算价格计算
     */
    triggerParentData() {
      let parent = this.$parent
      // 遍历寻找父组件
      while (parent.$vnode.tag.indexOf('OpenCloseShopsAdd') === -1) {
        parent = parent.$parent
      }
      // 触发父组件预算价格计算方法
      if (parent.getBudGetData) {
        parent.getBudGetData()
      }
    },
    // 记租面积自动带入
    areaTypeChange() {
      // fix:change事件之后 页面组件值可能还没有更新
      this.$nextTick(() => {
        if (this.currentFormData.areaType === 1) {
          this.currentFormData.leasableArea = this.currentFormData.spaceGrossArea || ''
        } else if (this.currentFormData.areaType === 2) {
          this.currentFormData.leasableArea = this.currentFormData.spaceNetArea || ''
        }
      })
    }
  }
}
</script>

<!--
 * @Description:
 * @Author: zengcheng
 * @Date: 2021-06-30 14:47:51
 * @LastEditors: zengcheng
 * @LastEditTime: 2021-07-26 00:22:43
-->
<template>
  <div>
    <el-form ref="rulesForm" :key="idx" :model="currentFormData" label-position="top" size="small" :rules="rule" :disabled="productNoYn">
      <ysn-formItem :form="currentFormData" :config="configData" :column="$attrs.column" clearable />
    </el-form>

  </div>
</template>
<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
import { rule } from '../rules'
export default {
  name: 'EssentialData',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'essentialData',
    event: 'change'
  },
  props: {
    essentialData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      idx: 1,
      rule: rule,
      configData: [ // 新单元表单配置
        { itemType: 'select', prop: 'programName', label: '项目名称', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('projectName'), listName: 'label', listValue: 'value', change: this.progName },
        { itemType: 'input', prop: 'intentProtocolName', label: '意向名称', placeholder: '请输入', width: '206px' },
        { itemType: 'shopDialog', prop: 'tenantName', label: '商家名称', placeholder: '请输入', width: '206px', change: () => { this.idx++ } },
        { itemType: 'select', prop: 'brandName', label: '品牌名', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('brand'), listName: 'label', listValue: 'value', change: this.changeBrandName },
        { itemType: 'input', prop: 'brandFormatName', label: '签约业务', placeholder: '签约业务根据', width: '206px', disabled: true },
        { itemType: 'input', prop: 'programOperateStatus', label: '经营状态', placeholder: '筹备', width: '206px', disabled: true },
        { itemType: 'select', prop: 'taxTypeId', label: '计税类型', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('taxType'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'centralizedId', label: '统收类型', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'signedId', label: '合同签署', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('contractSign'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'attributeId', label: '合同属性', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('contractType'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'textType', label: '文本类型', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('texts'), listName: 'label', listValue: 'value' }

      ],
      rulesForm: { // 表单验证
        BuildingName: [{ required: true, message: '请输入必填项' }]
      }
    }
  },
  computed: {
    productNoYn() {
      // 是否禁止输入框
      return this.$attrs.column === 4
    }
  },
  methods: {
    progName(val) {
      console.log(val)
      this.idx++
      // TODO 先写死 后面需要通过过滤器
      this.currentFormData.programOperateStatus = '根据项目名称带出来' + val.programName
      console.log(this.currentFormData.programOperateStatus)
    },
    // 品牌带出签约业态
    changeBrandName(val) {
      this.idx++
      this.currentFormData.brandFormatName = '根据品牌带出来的' + val.brandName
    }
  }

}
</script>

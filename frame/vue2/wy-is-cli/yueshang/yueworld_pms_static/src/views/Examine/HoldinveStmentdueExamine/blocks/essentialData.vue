<!--
 * @Description:
 * @Author: zengcheng
 * @Date: 2021-06-30 14:47:51
 * @LastEditors: zengcheng
 * @LastEditTime: 2021-07-18 16:59:24
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
      configData: [ // 新单元表单配置
        { itemType: 'select', prop: 'programName', label: '项目名称', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value', change: this.progName },
        { itemType: 'input', prop: 'intentProtocolName', label: '意向名称', placeholder: '请输入', width: '206px' },
        { itemType: 'select', prop: 'tenantName', label: '商家名称', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'brandName', label: '品牌名', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
        { itemType: 'input', prop: 'brandFormatName', label: '签约业务', placeholder: '请输入', width: '206px', disabled: true },
        { itemType: 'input', prop: 'programOperateStatus', label: '经营状态', placeholder: '请输入', width: '206px', disabled: true },
        { itemType: 'select', prop: 'taxTypeId', label: '计税类型', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'centralizedId', label: '统收类型', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'signedId', label: '合同签署', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('contractSigning'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'attributeId', label: '合同属性', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'textType', label: '文本类型', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' }

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
  mounted() {
    console.log(this.pageAccorDetailCom)
  },
  methods: {
    progName(val) {
      console.log(this.essentialrele)
      // TODO 先写死 后面需要通过过滤器
      // eslint-disable-next-line vue/no-mutating-props
      this.essentialData.programOperateStatus = '开业'
    }
  }

}
</script>

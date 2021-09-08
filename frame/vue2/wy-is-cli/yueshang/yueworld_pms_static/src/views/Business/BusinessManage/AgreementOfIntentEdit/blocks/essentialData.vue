<!--
 * @Description:
 * @Author: zengcheng
 * @Date: 2021-06-30 14:47:51
 * @LastEditors: zengcheng
 * @LastEditTime: 2021-07-15 15:33:52
-->
<template>
  <div>
    <el-form ref="rulesForm" :model="essentialData" label-position="top" size="small" :rules="rule" :disabled="productNoYn">
      <ysn-formItem :form="essentialData" :config="configData" :column="$attrs.column" clearable>
        <!-- <template #tenantName>
          <ysn-dialog title="请选择商家">
            <el-input v-model="input" placeholder="请输入内容" />
          </ysn-dialog>
        </template> -->
      </ysn-formItem>
    </el-form>

  </div>
</template>
<script>
import { rule } from '../rules'
export default {
  name: 'EssentialData',
  components: {},
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
      rule: rule,
      configData: [ // 新单元表单配置
        { itemType: 'select', prop: 'programName', label: '项目名称', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value', change: this.progName },
        { itemType: 'input', prop: 'intentProtocolName', label: '合同名称', placeholder: '请输入', width: '206px' },
        { itemType: 'input', prop: 'contNoIntent', label: '意向编号', placeholder: '请输入', width: '206px' },
        { itemType: 'select', prop: 'tenantName', label: '商家名称', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'brandName', label: '品牌名', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
        { itemType: 'input', prop: 'brandFormatName', label: '签约业务', placeholder: '请输入', width: '206px', disabled: true },
        { itemType: 'input', prop: 'programOperateStatus', label: '经营状态', placeholder: '请输入', width: '206px', disabled: true },
        { itemType: 'select', prop: 'taxTypeId', label: '计税类型', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('taxType'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'centralizedId', label: '收银类型', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'signedId', label: '合同签署', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('contractSign'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'attributeId', label: '合同属性', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('contractType'), listName: 'label', listValue: 'value' },
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

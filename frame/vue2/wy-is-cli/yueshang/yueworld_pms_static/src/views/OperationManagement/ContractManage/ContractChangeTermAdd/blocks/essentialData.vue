<!--
 * @Author: wyz
 * @LastEditors: wyz
 * @Description:合同变更-新增-基础信息
-->

<template>
  <el-form ref="rulesForm" :model="currentFormData" label-position="top" size="small" :rules="rulesForm">
    <!-- 信息模块-->
    <ysn-formItem :form="currentFormData" :config="configData" :column="4" clearable />
  </el-form>
</template>
<script>
import pageAccorDetailCom from '@mixins/pageAccorDetailCom'

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
      default: () => {
      }
    }
  },
  data() {
    return {
      rulesForm: { // 表单验证
        contNo: [{ required: true, message: '合同编号不能为空' }]
      }
    }
  },
  computed: {
    configData() {
      return [
        // 详情配置
        {
          itemType: 'choiceContractDialog',
          prop: 'contNo',
          label: '合同编号',
          required: true,
          placeholder: '请选择',
          change: this.contractNoChange
        },
        {
          itemType: 'input',
          prop: 'programName',
          label: '项目名称',
          placeholder: '请输入',
          disabled: true
        },
        {
          itemType: 'input',
          inputType: 'autoValue',
          prop: 'contNoIntent',
          label: '意向编号',
          disabled: true
        },
        {
          itemType: 'shopDialog',
          prop: 'tenantName',
          label: '商家名称',
          placeholder: '请选择',
          multiple: false,
          disabled: !this.currentFormData.contNo
        },
        {
          itemType: 'select',
          prop: 'brandName',
          label: '品牌名',
          placeholder: '请选择',
          list: this.$PUBFN.getOptionsList('brandName'),
          listName: 'label',
          listValue: 'value',
          multiple: false,
          disabled: !this.currentFormData.contNo
        },
        {
          itemType: 'input',
          inputType: 'autoValue',
          prop: 'brandFormatName',
          label: '签约业态',
          disabled: true
        },
        {
          itemType: 'input',
          inputType: 'autoValue',
          prop: 'programOperateStatus',
          label: '经营状态',
          disabled: true
        },
        {
          itemType: 'select',
          prop: 'programOperateStatus',
          label: '计税类型',
          placeholder: '请选择',
          list: this.$PUBFN.getOptionsList('taxType'),
          listName: 'label',
          listValue: 'value',
          multiple: false,
          disabled: !this.currentFormData.contNo
        },
        {
          itemType: 'select',
          prop: 'centralizedId',
          label: '统收类型',
          placeholder: '请选择',
          list: [],
          listName: 'label',
          listValue: 'value',
          multiple: false,
          disabled: !this.currentFormData.contNo
        },
        {
          itemType: 'select',
          prop: 'attributeId',
          label: '合同属性',
          placeholder: '请选择',
          list: this.$PUBFN.getOptionsList('attribute'),
          listName: 'label',
          listValue: 'value',
          multiple: false,
          disabled: !this.currentFormData.contNo
        },
        {
          itemType: 'select',
          prop: 'signedId',
          label: '合同签署',
          placeholder: '请选择',
          list: this.$PUBFN.getOptionsList('signed'),
          listName: 'label',
          listValue: 'value',
          multiple: false,
          disabled: !this.currentFormData.contNo
        }
        // {
        //   itemType: 'select',
        //   prop: 'textType',
        //   label: '文本类型',
        //   placeholder: '请选择',
        //   list: this.$PUBFN.getOptionsList('texts'),
        //   listName: 'label',
        //   listValue: 'value',
        //   multiple: false
        // }
      ]
    }
  },
  methods: {
    // 合同编号change
    contractNoChange(val) {
      const datas = {
        contNo: val.contNo
      }
      this.$parent.$parent.$parent.$parent.contractChangeDetail(datas)
    }
  }

}
</script>

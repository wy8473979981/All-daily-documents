<!--
 * @Author: wyz
 * @LastEditors: wyz
 * @Description: 合同变更-合同应收调整新增-基本信息
-->
<template>
  <el-form
    ref="rulesForm"
    :model="currentFormData"
    label-position="top"
    size="small"
    :rules="rulesForm"
  >
    <ysn-formItem :form="currentFormData" :config="configData" :column="5" clearable>
      <template #remark>
        <el-input
          v-model="currentFormData.remark"
          type="textarea"
          placeholder="请输入内容"
          max-length="300"
          :disabled="!currentFormData.contNo"
          resize="none"
        />
      </template>
    </ysn-formItem>
  </el-form>
</template>
<script>
import pageAccorDetailCom from '@mixins/pageAccorDetailCom'
import PUBFN from '@utils/pubFn'
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
      rulesForm: {
        choiceContractDialog: [{ required: true, message: '合同编号不能为空' }],
        programName: [{ required: true, message: '项目名称不能为空' }]
      }
    }
  },
  computed: {
    configData() {
      const that = this
      // 开业日大于装修结束日
      const pickerOptions = {
        disabledDate(time) {
          if (that.currentFormData.contBeginDate) {
            return new Date(that.currentFormData.contBeginDate).getTime() > time.getTime() + 1000 * 60 * 60 * 24
          }
        }
      }
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
          itemType: 'select',
          prop: 'programName',
          label: '项目名称',
          placeholder: '请选择项目',
          list: PUBFN.getOptionsList('programName'),
          listName: 'label',
          listValue: 'value',
          multiple: false,
          disabled: !this.currentFormData.contNo
        },
        {
          itemType: 'input',
          inputType: 'autoValue',
          prop: 'brandName',
          label: '品牌名称',
          disabled: true
        },
        {
          itemType: 'input',
          inputType: 'autoValue',
          prop: 'tenantName',
          label: '商户名称',
          disabled: true
        },
        {
          itemType: 'input',
          inputType: 'autoValue',
          prop: 'contBeginDate',
          label: '合同开始日期',
          disabled: true
        },
        {
          itemType: 'input',
          inputType: 'autoValue',
          prop: 'contEndDate',
          label: '合同结束日期',
          pickerOptions: pickerOptions,
          disabled: true
        },
        {
          itemType: 'input',
          inputType: 'autoValue',
          prop: 'spaceName',
          label: '铺位号',
          disabled: true
        },
        {
          itemType: 'input',
          inputType: 'autoValue',
          prop: 'spaceLeasableArea',
          label: '计租面积(m²)',
          disabled: true
        },
        {
          itemType: 'input',
          hasSlot: true,
          prop: 'remark',
          label: '变更原因',
          width: '435px',
          span: 5
        }
      ]
    }
  },
  methods: {
    // 合同编号change
    contractNoChange(val) {
      this.currentFormData.programName = val.programName
      this.currentFormData.contNo = val.contNo
      this.currentFormData.brandName = val.brandName
      this.currentFormData.tenantName = val.tenantName
      this.currentFormData.contBeginDate = val.contBeginDate
      this.currentFormData.contEndDate = val.contEndDate
      this.currentFormData.spaceName = val.spaceName
      this.currentFormData.spaceLeasableArea = val.spaceLeasableArea
    }
  }
}
</script>

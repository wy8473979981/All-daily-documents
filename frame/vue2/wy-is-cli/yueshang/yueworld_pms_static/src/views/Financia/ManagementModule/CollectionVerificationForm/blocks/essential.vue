<!--
 * @Author: fzx
 * @LastEditors: fzx
 * @Description:收款单-编辑-核销-基本信息
-->
<template>
  <el-form ref="rulesForm" :model="essential" class="elForm" label-position="top" size="small" :rules="rulesForm">
    <div v-if="$route.query.unknownType == 1" class="notFind" @click="notFind">找不到商家/企业?</div>
    <ysn-formItem :form="essential" :config="configData" :column="4" clearable />
    <Enclosure
      :is-show-dialog="isShowDialog"
      :disabled="false"
      :notfind="essential"
      @closeDialog="closeDialog"
    />
  </el-form>
</template>
<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
import Enclosure from './item/enclosure.vue'
export default {
  name: 'Essential',
  components: {
    Enclosure
  },
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'essential',
    event: 'change'
  },
  props: {
    essential: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      notfind: '',
      isShowDialog: false,
      configDataOne: [ // 新单元表单配置
        { itemType: 'input', prop: 'tenantName', label: '商户名称', inputType: 'autoValue', disabled: true, width: '206px', listName: 'label' }
      ],
      configDataTwo: [ // 新单元表单配置
        { itemType: 'select', prop: 'tenantName', label: '商户名称', placeholder: '请选择', width: '206px', list: this.$PUBFN.getOptionsList('transFerinmer'), listName: 'label' },
        { itemType: 'input', prop: 'programName', label: '项目名称', inputType: 'autoValue', disabled: true, width: '206px', listName: 'label' },
        { itemType: 'input', prop: 'verificationPerson', label: '核销人员', inputType: 'autoValue', disabled: true, width: '206px', listName: 'label' },
        { itemType: 'input', prop: 'receivedAmount', inputType: 'autoValue', label: '可核销金额(元)', disabled: true, width: '206px', type: 'money' },
        { itemType: 'input', prop: 'verificationType', label: '核销状态', inputType: 'autoValue', disabled: true, width: '206px', listName: 'label' },
        { itemType: 'datePicker', prop: 'verificationDate', label: '核销日期', placeholder: '请选择', width: '206px', listName: 'label', change: this.datePickerChange }
      ],
      rulesFormOne: { // 表单验证
        verificationDate: [{ required: true, message: '请输入必填项' }]
      },
      rulesFormTwo: { // 表单验证
        tenantName: [{ required: true, message: '请输入必填项' }],
        verificationDate: [{ required: true, message: '请输入必填项' }]
      }
    }
  },
  computed: {
    // 根据 未名款项的是否来动态配置组件
    configData() {
      if (this.$route.query.unknownType === 2) {
        return [...this.configDataOne, ...this.configDataTwo.slice(-5)]
      } else if (this.$route.query.unknownType === 1) {
        // 未名款项为是时， 将商户名称数据清空
        this.essential.tenantName = ''
      }
      return [...this.configDataTwo]
    },
    // 根据 未名款项的是否来动态配置验证规则
    rulesForm() {
      if (this.$route.query.unknownType === 2) {
        return { ...this.rulesFormOne }
      }
      return { ...this.rulesFormTwo }
    }
  },
  created() {
    this.$route.query.unknownType = Number(this.$route.query.unknownType)
  },
  methods: {
    notFind() {
      this.isShowDialog = true
    },
    closeDialog() {
      this.isShowDialog = false
    },
    datePickerChange() {
      if (!this.essential.tenantName) {
        this.$message.error('请先选择商户名称')
        this.essential.verificationDate = new Date()
        return
      }
    }
  }
}
</script>
<style scoped>
.elForm{
  position: relative;
}
  .notFind{
    font-size: 12px;
    color: #6F120C;
    position: absolute;
    left: 110px;
    top: 2px;
  }
  .notFind:hover{
    cursor:pointer;
  }
</style>

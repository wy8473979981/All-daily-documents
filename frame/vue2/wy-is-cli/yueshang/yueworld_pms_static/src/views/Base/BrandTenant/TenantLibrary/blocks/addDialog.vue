<!--
 * @Author: shuyuan
 * @LastEditors: fhj
 * @Description:商家库
-->
<template>
  <div>
    <ysn-dialog
      :title="dialogType === 'add' ? '新增' : '编辑' "
      width="920px"
      :is-show-dialog="isShowDialog"
      :external="isShowDialog"
      @cancel="cancel"
    >
      <ysn-btn class="mr-8">编辑</ysn-btn>
      <template #contain>
        <div>
          <el-form ref="rule" :model="data" label-position="top" size="small" :rules="rules">
            <ysn-formItem
              :form="data"
              :config="configData()"
              :column="4"
              clearable
            />
            <ysn-flod title="品牌授权" :show-flod="false">
              <ysn-formTable
                ref="tenantBrandTable"
                v-model="data"
                :rules="rules"
                prop="tenantBrand"
                :column="tenantBrandColumnEdit"
                :default-obj="()=>{ return {attachment:[]}}"
                add
              />
            </ysn-flod>
            <ysn-flod title="业务联系人信息" :show-flod="false">
              <ysn-formTable
                ref="tenantContactsTable"
                v-model="data"
                :rules="rules"
                prop="tenantContacts"
                :column="tenantContactsColumnEdit"
                add
              />
            </ysn-flod>
            <ysn-flod title="证照管理" :show-flod="false">
              <ysn-formTable
                ref="formTable"
                v-model="data"
                prop="tenantLicense"
                :column="tenantLicenseColumnEdit"
                add
              />
            </ysn-flod>
            <ysn-flod title="合同信息" :show-flod="false">
              <ysn-formItem
                :form="data"
                :config="contractColumnEdit"
                :column="4"
                clearable
              />
            </ysn-flod>
            <ysn-flod title="开票信息" :show-flod="false">
              <ysn-formTable
                ref="formTable"
                v-model="data"
                prop="tenantLetter"
                :column="tenantLetterColumn"
                add
              />
            </ysn-flod>
            <ysn-flod title="诚信记录" :show-flod="false">
              <ysn-formTable
                ref="formTable"
                v-model="data"
                prop="tenantCredit"
                :column="tenantCreditColumn"
                add
              />
            </ysn-flod>
          </el-form>
        </div>
      </template>
      <!-- 按钮 -->
      <template #btn>
        <div v-if="dialogType === 'edit'" class="flex-ju-end mt-40">
          <ysn-btn class="mr-8" @click="handlerAudit(1)">提交审核</ysn-btn>
          <ysn-btn class="mr-8" @click="handlerAudit(2)">发起审核</ysn-btn>
          <ysn-btn type="info" class="mr-8" @click="handlerAudit(3)">保存</ysn-btn>
          <ysn-btn type="info">审核记录</ysn-btn>
        </div>
        <div v-if="dialogType === 'add'" class="flex-ju-end mt-40">
          <ysn-btn class="mr-8" @click="handlerAudit(1)">提交审核</ysn-btn>
          <ysn-btn class="mr-8" @click="handlerAudit(2)">发起审核</ysn-btn>
          <ysn-btn type="info" @click="handlerAudit(3)">保存</ysn-btn>
        </div>
      </template>
    </ysn-dialog>
  </div>
</template>

<script>
import { tenantBrandColumnEdit, tenantContactsColumnEdit, tenantLicenseColumnEdit, contractColumnEdit, tenantLetterColumn, tenantCreditColumn } from './dialpgCongif'
export default {
  name: 'Dialog',
  props: {
    isShowDialog: { type: Boolean, default: false }, // 弹窗控制
    outClose: { type: Boolean },
    dialogType: {
      type: String,
      default: 'add' // add=新增，edit=编辑， details=详情
    },
    formData: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      rules: {
        programName: [{ required: true, message: '', trigger: 'blur' }],
        tenantName: [{ required: true, message: '', trigger: 'blur' }],
        tenantType: [{ required: true, message: '', trigger: 'blur' }],
        tenantCompanyQuailty: [{ required: true, message: '', trigger: 'blur' }],
        tenantTaxpayerType: [{ required: true, message: '', trigger: 'blur' }],
        tenantCompanyName: [{ required: true, message: '', trigger: 'blur' }],
        tenantNaturalPerson: [{ required: true, message: '', trigger: 'blur' }],
        tenantUnifiedSocialCreditCode: [{ required: true, message: '', trigger: 'blur' }],
        brandName: [{ required: true, message: '' }],
        tenantContractName: [{ required: true, message: '' }],
        tenantContractPerson: [{ required: true, message: '' }],
        tenantContactsPerson: [{ required: true, message: '' }],
        tenantContactsMobile: [{ required: true, message: '' }],
        tenantNaturalPersonId: [{ required: true, message: '' }],
        tenantLegalPerson: [{ required: true, message: '' }]
      },
      // 品牌授权
      tenantBrandColumnEdit: tenantBrandColumnEdit.call(this),
      // 业务联系人信息
      tenantContactsColumnEdit: tenantContactsColumnEdit.call(this),
      // 证照管理
      tenantLicenseColumnEdit: tenantLicenseColumnEdit.call(this),
      // 合同信息
      contractColumnEdit: contractColumnEdit.call(this),
      // 开票信息
      tenantLetterColumn: tenantLetterColumn.call(this),
      // 诚信记录
      tenantCreditColumn: tenantCreditColumn.call(this)
    }
  },
  computed: {
    data() {
      return this.formData
    }
  },
  methods: {
    configData() {
      const listForm = [
        { itemType: 'select', placeholder: '请选择', prop: 'programName', label: '所属项目', list: this.$PUBFN.getOptionsList('projectList'), listName: 'label', listValue: [] },
        { itemType: 'input', placeholder: '--自动带入--', prop: 'tenantId', label: '商家编码', disabled: true },
        { itemType: 'input', placeholder: '请输入', prop: 'tenantName', label: '商家名称' },
        { itemType: 'select', placeholder: '请选择', prop: 'tenantType', label: '商家性质', list: this.$PUBFN.getOptionsList('enterpriseType'), listName: 'label', listValue: [] },
        { itemType: 'select', placeholder: '请选择', prop: 'tenantCompanyQuailty', label: '商家属性', list: this.$PUBFN.getOptionsList('tenantCompanyQuailty'), listName: 'label', listValue: [] },
        { itemType: 'select', placeholder: '请选择', prop: 'tenantTaxpayerType', label: '纳税人类型', list: this.$PUBFN.getOptionsList('tenantTaxpayerType'), listName: 'label', listValue: [] }
      ]
      console.log(this.formData)
      if (this.formData.tenantType === 1) {
        return [
          ...listForm,
          { itemType: 'input', placeholder: '请输入', prop: 'tenantNaturalPerson', label: '自然人姓名' },
          { itemType: 'input', placeholder: '请输入', prop: 'tenantNaturalPersonId', label: '身份证号' },
          { itemType: 'input', placeholder: '请输入', prop: 'tenantContactsMobile', label: '手机', inputType: 'Number', numberConfig: { min: 0, max: 999999999999999, decimal: 0 }}
        ]
      } else {
        return [
          ...listForm,
          { itemType: 'input', placeholder: '请输入', prop: 'tenantCompanyName', label: '公司名称' },
          { itemType: 'input', placeholder: '请输入', prop: 'tenantLegalPerson', label: '法定代表人' },
          { itemType: 'input', placeholder: '请输入', prop: 'tenantUnifiedSocialCreditCode', label: '统一社会信用代码' }
        ]
      }
    },
    // 右上角关闭
    cancel() {
      this.$emit('cloneDialog')
    },
    validateFrom(formRef) {
      return new Promise((resolve, reject) => {
        this.$refs[formRef].validate((valid, failedObj) => {
          if (valid) {
            resolve(true)
          } else {
            resolve(false)
          }
        })
      }
      )
    },
    async handlerAudit(type) { // 保存跳转到变更列表
      // const { form, dialogType } = this
      // 编辑审核逻辑
      try {
        const ruleFormValid = await this.validateFrom('rule')
        const tenantBranValid = await this.validateFrom('tenantBrandTable')
        const tenantContactsValid = await this.validateFrom('tenantContactsTable')
        if (ruleFormValid && tenantContactsValid && tenantBranValid) {
          if (type === 1) {
            this.$message({ message: '提交成功', type: 'success' })
          } else if (type === 2) {
            this.$message({ message: '发起成功', type: 'success' })
          } else {
            this.$message({ message: '保存成功', type: 'success' })
          }
          // await brandLibraryApi.brandLibrarySave(form)
          await this.$router.push({
            name: 'TenantLibraryChange'
          })
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

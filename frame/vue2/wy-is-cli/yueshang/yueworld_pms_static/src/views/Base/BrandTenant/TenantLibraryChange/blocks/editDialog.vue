<!--
 * @Author: shuyuan
 * @LastEditors: shuyuan
 * @Description:商家变更列表
-->
<template>
  <div>
    <ysn-dialog
      :title=" '编辑' "
      width="920px"
      :is-show-dialog="isShowDialog"
      :external="isShowDialog"
      @cancel="cancel"
    >
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
                prop="tenantBrand"
                :column="tenantBrandColumnEdit"
                :rules="rules"
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
            <ysn-flod v-if="data.checkStatus===4 && data.checkStatusName.indexOf('OA') === -1" title="审核记录" :show-flod="false">
              <ysn-table :data="examineTableData.tableData1" :column="examineColumn" :checkbox="false" />
            </ysn-flod>
          </el-form>
        </div>
      </template>
      <!-- 按钮 -->
      <template #btn>
        <div class="flex-ju-end mt-40">
          <ysn-btn v-if="data.checkStatusName.indexOf('OA') === -1" class="mr-8" @click="handlerAudit(1)">提交审核</ysn-btn>
          <ysn-btn v-if="data.checkStatusName.indexOf('OA') !== -1 || data.checkStatus === 1" class="mr-8" @click="handlerAudit(2)">发起审核</ysn-btn>
          <ysn-btn type="info" class="mr-8" @click="handlerAudit(3)">保存</ysn-btn>
          <ysn-btn v-if="data.checkStatusName.indexOf('OA') !== -1" type="info" class="mr-8" @click="auditRecord">审核记录</ysn-btn>
          <ysn-confirm
            title="提示"
            width="484px"
            top="120px"
            :content="`是否确认删除?`"
            tip="此操作将永久删除,不可撤回,请谨慎操作"
            @confirm="deleteBox"
          >
            <ysn-btn class="mr-12" type="delete">删除</ysn-btn>
          </ysn-confirm>
        </div>
      </template>
    </ysn-dialog>
  </div>
</template>

<script>
import {
  tenantBrandColumnEdit,
  tenantContactsColumnEdit,
  tenantLicenseColumnEdit,
  contractColumnEdit,
  tenantLetterColumn,
  tenantCreditColumn,
  examineColumn } from './dialpgCongif'
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
        brandName: [{ required: true, message: '' }]
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
      tenantCreditColumn: tenantCreditColumn.call(this),
      // 审核记录
      examineColumn: examineColumn.call(this),
      examineTableData: {
        tableData1: [{
          examine1: 'xxx',
          examine2: 'xxxx',
          examine3: 'xxxx'
        },
        {
          examine1: 'xxxx',
          examine2: 'xxxxx',
          examine3: 'xxxx'
        }]
      }
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
    // 删除
    deleteBox() {
      const that = this
      // const datas = {
      //   id: this.id
      // }
      // baseBusinessApi.shopOnePriceAuditDelete(datas).then(res => {
      //   that.$message({ message: '删除成功', type: 'success' })
      //   setTimeout(() => {
      //     that.$router.go(-1)
      //   }, 1000)
      // })
      that.$message({ message: '删除成功', type: 'success' })
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
        if (ruleFormValid) {
          if (type === 1) {
            this.$message({ message: '提交成功', type: 'success' })
          } else if (type === 2) {
            this.$message({ message: '发起成功', type: 'success' })
          } else if (type === 3) {
            this.$message({ message: '保存成功', type: 'success' })
          }
          // await brandLibraryApi.brandLibrarySave(form)
          this.$emit('cloneDialog')
        }
      } catch (e) {
        console.log(e)
      }
    },
    auditRecord() { // 审核记录
      this.$router.push({ name: 'TenantLibraryChangeExamine', query: { id: this.data.id, status: this.data.checkStatus }})
    }
  }
}
</script>

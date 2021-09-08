<template>
  <div>
    <ysn-dialog title="编辑" width="920px" @cancel="cancel">
      <ysn-btn class="mr-8">编辑</ysn-btn>
      <template #contain>
        <el-form ref="rule" :model="editList.formData" label-position="top" size="small" :rules="rules">
          <ysn-formItem
            :form="editList.formData"
            :config="configData"
            :column="4"
            clearable
          />
        </el-form>
        <!-- <ysn-title title="联系人信息" class="mt-16 mb-8" /> -->
        <ysn-flod title="联系人信息" :show-flod="false">
          <ysn-formTable
            ref="formTab"
            v-model="wholeObj"
            prop="contactsTableData"
            :column="formTableConfig"
            :rules="formTableRules"
            add
          />
        </ysn-flod>
        <!-- <ysn-title title="证照管理" class="mt-16 mb-8" /> -->
        <ysn-flod title="证照管理" :show-flod="false">
          <ysn-formTable
            ref="formTable"
            v-model="wholeObj"
            prop="licenceTableData"
            :column="formLicenseConfig"
            add
          />
        </ysn-flod>
        <!-- <ysn-title title="合同信息" class="mt-16 mb-8" /> -->
        <ysn-flod title="合同信息" :show-flod="false">
          <el-form ref="ruleForm" :model="contractFormData" label-position="top" size="small" :rules="rules">
            <ysn-formItem
              :form="editList.contractFormData"
              :config="contractConfigData"
              :column="4"
              clearable
            />
          </el-form>
        </ysn-flod>

        <!-- <ysn-title title="开票信息" class="mt-16 mb-8" /> -->
        <ysn-flod title="开票信息" :show-flod="false">
          <ysn-formTable
            ref="formTable"
            v-model="wholeObj"
            prop="billingTableData"
            :column="billingTableConfig"
            add
          />
        </ysn-flod>
        <ysn-flod title="诚信记录" :show-flod="false">
          <!-- <ysn-title title="诚信记录" class="mt-16 mb-8" /> -->
          <ysn-formTable
            ref="formTable"
            v-model="wholeObj"
            prop="sincerityTableData"
            :column="sincerityTableConfig"
            add
          />
        </ysn-flod>
      </template>
      <!-- 按钮 -->
      <template #btn>
        <div class="flex-ju-end mt-40">
          <ysn-btn class="mr-8" @click="examine">发起审核</ysn-btn>
          <ysn-btn type="info" @click="validate">保存</ysn-btn>
        </div>
      </template>
    </ysn-dialog>
  </div>
</template>

<script>
export default {
  name: 'DialogTable',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    editList: { type: Object, defult: () => {} }
  },
  data() {
    return {

      // 表格表单全量数据
      // wholeObj: {
      //   // 联系人数据
      //   tableData: [
      //     { tenantContactsPerson: '', tenantContactsTitle: '', tenantContactsTel: '', tenantLetterheadTel: '', tenantContactsEmail: '', tenantContactsFax: '', tenantLetterheadAddress: '' }
      //   ],
      //   // 证照管理数据
      //   licence: [
      //     { tenantLicenseType: '', tenantLicenseCode: '', tenantLicenseEffectiveStartDate: '', tenantLicenseEffectiveEndDate: '', tenantLicenseStatus: '', tenantLicenseAttachment: '' }
      //   ],
      //   // 开票信息数据
      //   billingTableData: [{ tenantLetterhead: '', tenantLetterheadUnifiedSocialCreditCode: '', tenantLetterheadAddress: '', tenantLetterheadTel: '', tenantLetterheadBankname: '', tenantLetterheadBankaccount: '' }],
      //   // 诚信记录数据
      //   sincerityTableData: [{ tenantCreditRecord: '', tenantCreditRecordDetail: '' }]
      // },
      // 联系人表单配置
      formTableConfig: [
        { tenantContactsPerson: '姓名', itemType: 'input', required: true },
        { tenantContactsTitle: '职位', itemType: 'input' },
        { tenantContactsTel: '固定电话', itemType: 'input' },
        { tenantLetterheadTel: '手机', itemType: 'input', required: true },
        { tenantContactsEmail: '邮箱', itemType: 'input' },
        { tenantContactsFax: '传真', itemType: 'input' },
        { tenantLetterheadAddress: '地址', itemType: 'input' }
      ],
      // 证照管理表单配置
      formLicenseConfig: [
        { tenantLicenseType: '证照类型', itemType: 'input' },
        { tenantLicenseCode: '证照编号', itemType: 'input' },
        // { tenantLicenseEffectiveStartDate: '有效期开始时间', itemType: 'input' },
        { tenantLicenseEffectiveStartDate: '有效期开始时间', itemType: 'datePicker', type: 'date', valueFormat: 'yyyy-MM-dd' },
        // { tenantLicenseEffectiveEndDate: '有效期结束时间', itemType: 'input' },
        { tenantLicenseEffectiveEndDate: '有效期结束时间', itemType: 'datePicker', type: 'date', valueFormat: 'yyyy-MM-dd' },
        { tenantLicenseStatus: '证照状态', itemType: 'input' },
        { tenantLicenseAttachment: '证照照片', itemType: 'fileUpload', attachment: '上传', canOperate: true }
      ],
      // 开票信息表单配置
      billingTableConfig: [
        { tenantLetterhead: '开票名称', itemType: 'input' },
        { tenantLetterheadUnifiedSocialCreditCode: '统一社会信用代码', width: '140px', itemType: 'input' },
        { tenantLetterheadAddress: '地址', itemType: 'input' },
        { tenantLetterheadTel: '电话', itemType: 'input' },
        { tenantLetterheadBankname: '开户行', itemType: 'input' },
        { tenantLetterheadBankaccount: '开户账号', itemType: 'input' }
      ],
      // 诚信记录表单配置
      sincerityTableConfig: [
        { tenantCreditRecord: '诚信记录类别', width: '200px', itemType: 'input' },
        { tenantCreditRecordDetail: '内容描述', width: '600px', itemType: 'input' }
      ],
      //  表单表格验证
      formTableRules: {
        tenantContactsPerson: [{ required: true, message: '' }],
        tenantLetterheadTel: [{ required: true, message: '' }]
      },
      formData: {

      },
      enterprise: 0, // 企业性质
      // 表格数据
      contractFormData: {}, // 合同信息数据
      contractConfigData: [
        { itemType: 'input', prop: 'tenantContractName', label: '合同抬头', placeholder: '请选择' },
        { itemType: 'input', prop: 'tenantContractAddress', label: '合同地址', placeholder: '请选择' },
        { itemType: 'input', prop: 'tenantContractTel', label: '合同电话', placeholder: '请选择' },
        { itemType: 'input', prop: 'tenantContractPerson', label: '合同联系人', placeholder: '请选择' },
        { itemType: 'input', prop: 'tenantContractFax', label: '合同传真', placeholder: '请选择' },
        { itemType: 'input', prop: 'tenantContractEmail', label: '合同邮箱', placeholder: '请选择' },
        { itemType: 'input', prop: 'tenantContractPostcode', label: '合同邮编', placeholder: '请选择' }
      ]

    }
  },
  computed: {
    wholeObj() {
      console.log(this.editList)
      return this.editList
    },

    rules() {
      const list = {
        programName: [{ required: true, message: '' }],
        tenantName: [{ required: true, message: '' }],
        s1: [{ required: true, message: '' }],
        tenantCompanyQuailty: [{ required: true, message: '' }],
        tenantTaxpayerType: [{ required: true, message: '' }],
        // 合同
        tenantContractName: [{ required: true, message: '' }],
        tenantContractPerson: [{ required: true, message: '' }]
      }

      if (this.enterprise === 0) {
        return {
          ...list,
          tenantLegalPerson: [{ required: true, message: '' }],
          tenantUnifiedSocialCreditCode: [{ required: true, message: '' }]
        }
      }
      return {
        ...list,
        tenantNaturalPerson: [{ required: true, message: '' }],
        tenantNaturalPersonId: [{ required: true, message: '' }],
        tenantContactsMobile: [{ required: true, message: '' }]
      }
    },
    configData() {
      const listForm = [
        { itemType: 'input', prop: 'programName', label: '所属项目', placeholder: '请选择' },
        { prop: 'tenantId', itemType: 'input', placeholder: '请选择', label: '企业编码', disabled: true },
        { itemType: 'input', placeholder: '请选择', prop: 'tenantName', label: '企业名称' },
        { itemType: 'select', prop: 's1', label: '企业性质', placeholder: '请选择全部楼栋', list: this.$PUBFN.getOptionsList('enterpriseType'), listName: 'label', listValue: [], change: this.changeEnterprise }, // TODO 字段未找到
        { itemType: 'input', placeholder: '请选择', prop: 'tenantCompanyQuailty', label: '企业属性' },
        { itemType: 'input', placeholder: '请选择', prop: 'tenantTaxpayerType', label: '纳税人类型' }
      ]
      if (this.enterprise === 0) {
        return [
          ...listForm,
          { itemType: 'input', placeholder: '请选择', prop: 'tenantCompanyName', label: '公司名称' },
          { itemType: 'input', placeholder: '请选择', prop: 'tenantLegalPerson', label: '法定代表人' },
          { itemType: 'input', placeholder: '请选择', prop: 'tenantUnifiedSocialCreditCode', label: '统一社会信用代码' }
        ]
      }
      return [
        ...listForm,
        { itemType: 'input', placeholder: '请选择', prop: 'tenantNaturalPerson', label: '自然人姓名' },
        { itemType: 'input', placeholder: '请选择', prop: 'tenantNaturalPersonId', label: '身份证号' },
        { itemType: 'input', placeholder: '请选择', prop: 'tenantContactsMobile', label: '手机' }
      ]
    }
  },
  mounted() {
    // this.func()
  },
  methods: {
    changeEnterprise(val) {
      // console.log(val.s1)
      this.enterprise = val.s1
    },

    validate() {
      // console.log(this.verification())
      // this.$refs['formTab'].validate()
      this.$refs.rule.validate((valid, failedObj) => {
        console.log(failedObj)
        console.log(valid)
        if (valid) {
          // 在这里添加提交代码
        } else {
          // 光标定位在以一个校验不通过项
          setTimeout(() => {
            var isError = document.getElementsByClassName('is-error')
            isError[0].querySelector('input').focus()
          }, 100)
        }
      })

      // this.verification().then(function(res) {
      //   console.log(res)
      // })
    },
    // 审核
    examine() {
      console.log(this.wholeObj)
      this.$router.push({ name: 'EnterpriseLibraryChange' })
    },
    // 右上角关闭
    cancel() {
      this.$emit('cloneDialog')
    }
  }
}
</script>

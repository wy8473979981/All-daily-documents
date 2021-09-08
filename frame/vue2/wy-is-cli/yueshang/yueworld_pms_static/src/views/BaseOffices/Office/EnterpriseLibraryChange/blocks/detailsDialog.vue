<template>
  <div>
    <ysn-dialog
      title="详情"
      width="920px"
      :is-show-dialog="isShowDialog"
      :external="isShowDialog"
      @closeDialog="closeDialog"
    >
      <template #contain>
        <ysn-displayInfo
          class="mt-8"
          :data="editList.formData"
          :config="configData"
          :column="4"
        />
        <!-- <ysn-title title="联系人信息" class="mt-16 mb-8" /> -->
        <ysn-flod title="联系人信息" :show-flod="false">
          <ysn-table
            :checkbox="false"
            :data="editList.contactsTableData"
            :column="contactsTableConfig"
            select-key="id"
          />
        </ysn-flod>
        <!-- <ysn-title title="证照管理" class="mt-16 mb-8" /> -->
        <ysn-flod title="证照管理" :show-flod="false">
          <ysn-table
            :checkbox="false"
            :data="editList.licenceTableData"
            :column="licenceTableConfig"
            select-key="id"
          />
        </ysn-flod>
        <!-- <ysn-title title="合同信息" class="mt-16 mb-8" /> -->
        <ysn-flod title="合同信息" :show-flod="false">
          <ysn-displayInfo
            class="mt-8"
            :data="editList.contractFormData"
            :config="contractConfigData"
            :column="4"
          />
        </ysn-flod>
        <!-- <ysn-title title="开票信息" class="mt-16 mb-8" /> -->
        <ysn-flod title="开票信息" :show-flod="false">
          <ysn-table
            :checkbox="false"
            :data="editList.billingTableData"
            :column="billingTableConfig"
            select-key="id"
          />
        </ysn-flod>

        <!-- <ysn-title title="诚信记录" class="mt-16 mb-8" /> -->
        <ysn-flod title="诚信记录" :show-flod="false">
          <ysn-table
            :checkbox="false"
            :data="editList.sincerityTableData"
            :column="sincerityTableConfig"
            select-key="id"
          />
        </ysn-flod>
        <!-- <ysn-title title="审核记录" class="mt-16 mb-8" /> -->
        <ysn-flod title="审核记录" :show-flod="false">
          <ysn-table
            :checkbox="false"
            :data="editList.examineData"
            :column="examineConfig"
            select-key="id"
          />
        </ysn-flod>
      </template>
      <!-- 按钮 -->
      <template #btn>
        <div class="flex-ju-end mt-40">
          <!-- <ysn-btn class="mr-8" @click="examine">编辑</ysn-btn> -->
          <!-- <EditDoalog :edit-list="editList" @cloneDialog="cloneDialog" /> -->
          <ysn-btn class="mr-8" @click="btnStatus">审核记录</ysn-btn>
          <ysn-btn class="mr-16" @click="btnStatus">同意</ysn-btn>
          <ysn-btn type="delete" @click="remove">删除</ysn-btn>
        </div>
      </template>
    </ysn-dialog>
    <ysn-confirm
      ref="delete"
      title="提示"
      width="484px"
      top="120px"
      content="是否删除?"
      confirm-text="取消"
      cancel-text="确定"
      @cancel="deleteData"
    />
  </div>
</template>

<script>
// import EditDoalog from './editDoalog.vue'
export default {
  name: 'DialogTable',
  // components: { EditDoalog },
  props: {
    isShowDialog: { type: Boolean, default: false },
    editList: { type: Object, default: () => {} }
  },
  data() {
    return {
      formData: {},
      configData: [
        { prop: 'programName', label: '所属项目' },
        { prop: 'tenantId', label: '企业编码' },
        { prop: 'tenantName', label: '企业名称' },
        { prop: 's1', label: '企业性质' }, // TODO 字段未找到
        { prop: 'tenantCompanyQuailty', label: '企业属性' },
        { prop: 'tenantTaxpayerType', label: '纳税人类型' },
        { prop: 'tenantCompanyName', label: '公司名称' },
        { prop: 'tenantLegalPerson', label: '法定代表人' },
        { prop: 'tenantUnifiedSocialCreditCode', label: '统一社会信用代码' }
      ],
      enterprise: '0', // 企业性质
      contactsTableData: [// 联系人信息数据
        { tenantContactsPerson: '', tenantContactsTitle: '', tenantContactsTel: '', tenantLetterheadTel: '', tenantContactsEmail: '', tenantContactsFax: '', tenantLetterheadAddress: '' }
      ], // 表格数据
      contactsTableConfig: [// 联系人配置
        { tenantContactsPerson: '姓名', isShowSlots: true, width: '140px' },
        { tenantContactsTitle: '职位', isShowSlots: true, width: '140px' },
        { tenantContactsTel: '固定电话', isShowSlots: true, width: '140px' },
        { tenantLetterheadTel: '手机', isShowSlots: true, width: '140px' },
        { tenantContactsEmail: '邮箱', isShowSlots: true, width: '140px' },
        { tenantContactsFax: '传真', isShowSlots: true, width: '140px' },
        { tenantLetterheadAddress: '地址', isShowSlots: true, width: '140px' }
      ],
      licenceTableData: [
        { tenantLicenseType: '', tenantLicenseCode: '', tenantLicenseEffectiveStartDate: '', tenantLicenseEffectiveEndDate: '', tenantLicenseStatus: '', tenantLicenseAttachment: '' }
      ], // 证照数据
      licenceTableConfig: [// 证照配置
        { tenantLicenseType: '证照类型', isShowSlots: true },
        { tenantLicenseCode: '证照编号', isShowSlots: true },
        { tenantLicenseEffectiveStartDate: '有效期开始时间', isShowSlots: true },
        { tenantLicenseEffectiveEndDate: '有效期结束时间', isShowSlots: true },
        { tenantLicenseStatus: '证照状态', isShowSlots: true },
        { tenantLicenseAttachment: '证照照片', isShowSlots: true }
      ],
      contractFormData: {}, // 合同信息数据
      contractConfigData: [
        { itemType: 'input', prop: 'tenantContractName', label: '合同抬头', placeholder: '请输入' },
        { itemType: 'input', prop: 'tenantContractAddress', label: '合同地址', placeholder: '请输入' },
        { itemType: 'input', prop: 'tenantContractTel', label: '合同电话', placeholder: '请输入' },
        { itemType: 'input', prop: 'tenantContractPerson', label: '合同联系人', placeholder: '请输入' },
        { itemType: 'input', prop: 'tenantContractFax', label: '合同传真', placeholder: '请输入' },
        { itemType: 'input', prop: 'tenantContractEmail', label: '合同邮箱', placeholder: '请输入' },
        { itemType: 'input', prop: 'tenantContractPostcode', label: '合同邮编', placeholder: '请输入' }
      ],
      billingTableData: [{ tenantLetterhead: '', tenantLetterheadUnifiedSocialCreditCode: '', tenantLetterheadAddress: '', tenantLetterheadTel: '', tenantLetterheadBankname: '', tenantLetterheadBankaccount: '' }], // 开票信息数据
      billingTableConfig: [
        { tenantLetterhead: '开票名称', isShowSlots: true },
        { tenantLetterheadUnifiedSocialCreditCode: '统一社会信用代码', width: '140px', isShowSlots: true },
        { tenantLetterheadAddress: '地址', isShowSlots: true },
        { tenantLetterheadTel: '电话', isShowSlots: true },
        { tenantLetterheadBankname: '开户行', isShowSlots: true },
        { tenantLetterheadBankaccount: '开户账号', isShowSlots: true }
      ],
      sincerityTableData: [{ tenantCreditRecord: '', tenantCreditRecordDetail: '' }], // 诚信记录数据
      sincerityTableConfig: [
        { tenantCreditRecord: '诚信记录类别', isShowSlots: true, width: '200px' },
        { tenantCreditRecordDetail: '内容描述', isShowSlots: true, width: '600px' }
      ],
      examineData: [],
      examineConfig: [ // 审核记录
        { tenantCreditRecord: 'xxx', width: '200px' },
        { tenantCreditRecord: 'xxx', width: '200px' },
        { tenantCreditRecord: 'xxx', width: '200px' }
      ]
    }
  },
  computed: {
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

      if (this.enterprise === '0') {
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
    }
    // configData() {
    //   const listForm = [
    //     { itemType: 'input', prop: 'programName', label: '所属项目', placeholder: '请选择' },
    //     { prop: 'tenantId', itemType: 'input', placeholder: '请选择', label: '企业编码', disabled: true },
    //     { itemType: 'input', placeholder: '请选择', prop: 'tenantName', label: '企业名称' },
    //     { itemType: 'select', prop: 's1', label: '企业性质', placeholder: '请选择全部楼栋', list: this.$PUBFN.getOptionsList('enterpriseType'), listName: 'label', listValue: [], change: this.changeEnterprise }, // TODO 字段未找到
    //     { itemType: 'input', placeholder: '请选择', prop: 'tenantCompanyQuailty', label: '企业属性' },
    //     { itemType: 'input', placeholder: '请选择', prop: 'tenantTaxpayerType', label: '纳税人类型' }
    //   ]
    //   if (this.enterprise === '0') {
    //     return [
    //       ...listForm,
    //       { itemType: 'input', placeholder: '请选择', prop: 'tenantCompanyName', label: '公司名称' },
    //       { itemType: 'input', placeholder: '请选择', prop: 'tenantLegalPerson', label: '法定代表人' },
    //       { itemType: 'input', placeholder: '请选择', prop: 'tenantUnifiedSocialCreditCode', label: '统一社会信用代码' }
    //     ]
    //   }
    //   return [
    //     ...listForm,
    //     { itemType: 'input', placeholder: '请选择', prop: 'tenantNaturalPerson', label: '自然人姓名' },
    //     { itemType: 'input', placeholder: '请选择', prop: 'tenantNaturalPersonId', label: '身份证号' },
    //     { itemType: 'input', placeholder: '请选择', prop: 'tenantContactsMobile', label: '手机' }
    //   ]
    // }
  },
  mounted() {

  },
  methods: {
    changeEnterprise(val) {
      // console.log(val.s1)
      this.enterprise = val.s1
    },

    closeDialog() {
      this.$emit('cloneDialog')
    },
    cloneDialog() {
      this.$emit('cloneDialog')
    },
    btnStatus() {
      this.$emit('cloneDialog')
    },
    remove() {
      this.$refs.delete.handleVisible()
    },
    deleteData() {
      this.$emit('cloneDialog')
    },
    // 编辑
    examine() {

      // this.formData // 表单数据
      // this.contactsTableData // 联系人数据
      // this.licenceTableData // 证照数据
      // this.contractFormData // 合同信息数据
      // this.billingTableData // 开票信息
      // this.sincerityTableData // 诚信记录数据
      // console.log(this.formData, '表单数据')
      // console.log(this.contactsTableData, '联系人数据')
      // console.log(this.licenceTableData, '证照数据')
      // console.log(this.contractFormData, '合同信息数据')
      // console.log(this.billingTableData, '开票信息')
      // console.log(this.sincerityTableData, '诚信记录数据')
    }
  }
}
</script>

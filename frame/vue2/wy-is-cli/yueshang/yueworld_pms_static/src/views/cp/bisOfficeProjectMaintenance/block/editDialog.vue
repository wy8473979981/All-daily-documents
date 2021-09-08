<!--
 * @Author: fhj
 * @LastEditors: zengcheng
 * @Description:
-->
<template>
  <div>
    <ysn-dialog
      title="编辑"
      width="920px"
      :is-show-dialog="isShowDialog"
      :external="isShowDialog"
      @closeDialog="closeDialog"
    >
      <!-- <ysn-btn class="mr-8">新增</ysn-btn> -->
      <template #contain>
        <div>
          <el-form ref="rule" :model="wholeObj.formData" label-position="top" size="small" :rules="rules">
            <ysn-formItem
              :form="wholeObj.formData"
              :config="configData"
              :column="4"
              clearable
            />
          </el-form>

          <ysn-tabs
            dynamic
            :list="tabs_list"
            :active="tab_active"
            @change="handleChange"
            @toggle="handleToggle"
          />
          <ysn-title title="合同甲方信息一" class="mt-16 mb-8" />
          <el-form v-for="(item,index) in wholeObj.contractFormData" v-show="index==tab_active" :key="index" :ref="'ruleForm'+index" :model="wholeObj.contractFormData[tab_active]" label-position="top" size="small" :rules="contractRule">
            <ysn-formItem
              :form="item"
              :config="contractConfigData"
              :column="4"
              clearable
            />
          </el-form>
          <ysn-title title="银行账户信息" class="mt-16 mb-8" />
          <ysn-formTable
            ref="formTable"
            v-model="wholeObj"
            prop="account"
            :column="accountInformation"
            :rules="bankAccount"
            add
          />

        </div>
      </template>
      <!-- 按钮 -->
      <template #btn>
        <div class="flex-ju-end mt-40">
          <ysn-btn type="info" class="mr-16" @click="validate">提交修改</ysn-btn>
          <ysn-btn type="delete" @click="validate">删除</ysn-btn>
        </div>
      </template>
    </ysn-dialog>
  </div>
</template>

<script>
export default {
  name: 'EditDialog',
  props: {
    isShowDialog: { type: Boolean }
  },
  data() {
    return {
      tab_active: 0,
      tabs_list: [{ label: '第一单元' }],
      rules: {
        programRegion: [{ required: true, message: '' }],
        programCity: [{ required: true, message: '' }],
        programName: [{ required: true, message: '' }],
        programId: [{ required: true, message: '' }],
        programNameShort: [{ required: true, message: '' }],
        programPropertyType: [{ required: true, message: '' }],
        programOperateStatus: [{ required: true, message: '' }],
        programType: [{ required: true, message: '' }],
        programGrossArea: [{ required: true, message: '' }],
        programLeasableArea: [{ required: true, message: '' }],
        programOpeningDate: [{ required: true, message: '' }],
        programEquityNature: [{ required: true, message: '' }],
        programManager: [{ required: true, message: '' }],
        programManagerTel: [{ required: true, message: '' }]
      },
      contractRule: {
        firstpartyName: [{ required: true, message: '' }],
        firstpartyAddress: [{ required: true, message: '' }],
        firstpartyTel: [{ required: true, message: '' }],
        firstpartyUnifiedSocialCreditCode: [{ required: true, message: '' }],
        firstpartyLegalPerson: [{ required: true, message: '' }]
      },
      bankAccount: {
        firstpartyAccountName: [{ required: true, message: '' }],
        firstpartyBankName: [{ required: true, message: '' }],
        firstpartyBankAccount: [{ required: true, message: '' }]
      },
      // 表格表单全量数据
      wholeObj: {
        // 表单数据
        formData: { attachment: [], programPic: [] },
        // 合同信息表单数据
        contractFormData: [
          { firstpartyName: '', firstpartyAddress: '', firstpartyTel: '', firstpartyUnifiedSocialCreditCode: '', firstpartyEmail: '',
            firstpartyMailAddress: '', firstpartyFax: '', firstpartyPostcode: '',
            firstpartyLegalPerson: '' }
        ],
        // 联系人数据
        account: [
          { tenantContactsPerson: '', tenantContactsTitle: '', tenantContactsTel: '' }
        ]
      },
      configData: [
        { itemType: 'input', prop: 'programRegion', label: '区域名称', placeholder: '请选择', list: this.$PUBFN.getOptionsList('enterpriseType'), listName: 'label', listValue: [], span: 2, width: '200px' },
        { prop: 'programCity', itemType: 'select', placeholder: '请选择', label: '城市名称', list: this.$PUBFN.getOptionsList('enterpriseType'), listName: 'label', listValue: [], span: 2, width: '200px' },
        { itemType: 'input', placeholder: '请输入', prop: 'programName', label: '项目名称' },
        { itemType: 'input', placeholder: '请输入', prop: 'programId', label: '项目编码', disabled: true },
        { itemType: 'input', placeholder: '请输入', prop: 'programNameShort', label: '项目简称' },
        { itemType: 'select', prop: 'programPropertyType', label: '物业管理类型', placeholder: '请选择', list: this.$PUBFN.getOptionsList('enterpriseType'), listName: 'label', listValue: [] },
        { itemType: 'select', prop: 'programOperateStatus', label: '营业状态', placeholder: '请选择', list: this.$PUBFN.getOptionsList('enterpriseType'), listName: 'label', listValue: [] },
        { itemType: 'select', prop: 'programType', label: '经营类型', placeholder: '请选择', list: this.$PUBFN.getOptionsList('enterpriseType'), listName: 'label', listValue: [] },
        { itemType: 'input', placeholder: '请输入', prop: 'programGrossArea', label: '建筑面积(m)', disabled: true },
        { itemType: 'input', placeholder: '请输入', prop: 'programLeasableArea', label: '计租面积(m)', disabled: true },
        { itemType: 'datePicker', placeholder: '请输入', type: 'date', prop: 'programOpeningDate', label: '开业日期', valueFormat: 'yyyy-MM-dd' },
        { itemType: 'select', prop: 'programEquityNature', label: '产权性质', placeholder: '请选择', list: this.$PUBFN.getOptionsList('enterpriseType'), listName: 'label', listValue: [] },
        { itemType: 'input', placeholder: '请输入', prop: 'programManager', label: '负责人' },
        { itemType: 'input', placeholder: '请输入', prop: 'programManagerTel', label: '联系电话' },
        { itemType: 'input', type: 'textarea', prop: 'programAddress', label: '项目地址', placeholder: '请输入', span: 2 },
        { itemType: 'input', type: 'textarea', prop: 'remark', label: '备注', placeholder: '请输入', span: 2 },
        { itemType: 'fileUpload', prop: 'attachment', label: '附件', btnText: '上传', width: '428px', isSearch: true, actionUrl: '', limitNum: 4, span: 2 },
        { itemType: 'fileUpload', prop: 'programPic', label: '项目简图', btnText: '上传', width: '428px', isSearch: true, actionUrl: '', limitNum: 4, span: 2 }
      ],
      contractConfigData: [
        { itemType: 'input', placeholder: '请输入', prop: 'firstpartyName', label: '合同甲方抬头' },
        { itemType: 'input', placeholder: '请输入', prop: 'firstpartyAddress', label: '合同甲方地址' },
        { itemType: 'input', placeholder: '请输入', prop: 'firstpartyTel', label: '合同甲方电话' },
        { itemType: 'input', placeholder: '请输入', prop: 'firstpartyUnifiedSocialCreditCode', label: '合同甲方社会信用代码' },
        { itemType: 'input', placeholder: '请输入', prop: 'firstpartyEmail', label: '合同甲方邮箱' },
        { itemType: 'input', placeholder: '请输入', prop: 'firstpartyMailAddress', label: '合同甲方邮寄地址' },
        { itemType: 'input', placeholder: '请输入', prop: 'firstpartyFax', label: '合同甲方传真' },
        { itemType: 'input', placeholder: '请输入', prop: 'firstpartyPostcode', label: '合同甲方邮编' },
        { itemType: 'input', placeholder: '请输入', prop: 'firstpartyLegalPerson', label: '合同甲方法定代表人' }

      ],
      accountInformation: [
        { firstpartyAccountName: '开户名称', itemType: 'input', required: true },
        { firstpartyBankName: '开户行名称', itemType: 'input', required: true },
        { firstpartyBankAccount: '开户行账号', itemType: 'input', required: true }

      ]

    }
  },

  mounted() {
    // this.func()
  },
  methods: {

    closeDialog() {
      this.$emit('closeDialog')
    },
    handleChange(event) {
      console.log(event.name)
      this.tab_active = parseInt(event.name)
    },
    handleToggle(type, index) {
      if (type === 'plus') {
        this.tabs_list.push({
          label: `第${this.tabs_list.length + 1}单元`
        })
        this.wholeObj.contractFormData.push({
          firstpartyName: '', firstpartyAddress: '', firstpartyTel: '', firstpartyUnifiedSocialCreditCode: '', firstpartyEmail: '',
          firstpartyMailAddress: '', firstpartyFax: '', firstpartyPostcode: '',
          firstpartyLegalPerson: ''
        })
      } else {
        this.tab_active = this.tab_active === index ? 0 : this.tab_active - 1
        this.tabs_list.splice(index, 1)
        this.tabs_list = this.tabs_list.map((item, index) => ({
          label: `第${index + 1}单元`
        }))
        this.wholeObj.contractFormData.splice(index, 1)
      }
    },
    validate() {
      // console.log(this.wholeObj)
      // console.log(this.$refs)
      this.verification(this.$refs)
    },

    examine() {
      console.log(this.$refs['formTab'].validate())
      this.$refs['formTab'].validate((valid, fobj) => {
        console.log(valid, fobj)
      })
    }
  }
}
</script>

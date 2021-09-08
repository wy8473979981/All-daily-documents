<!--
 * @Author: shuyuan
 * @LastEditors: shuyuan
 * @Description:商家库
-->
<template>
  <div>
    <ysn-dialog
      :title="'详情' "
      width="920px"
      :is-show-dialog="isShowDialog"
      :external="isShowDialog"
      @closeDialog="closeDialog"
    >
      <template #contain>
        <div>
          <el-form ref="rule" :model="data" label-position="top" size="small">
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
                :column="tenantBrandColumnDetails"
              >
                <template #attachment="scope">
                  <a
                    v-for="(item,index) in scope.row.attachment"
                    :key="index"
                    class="link-type"
                    target="_blank"
                    :href="item.url"
                  >
                    <span class="el-icon-document" />
                    {{ item.name }}
                  </a>
                </template>
              </ysn-formTable>
            </ysn-flod>
            <ysn-flod title="业务联系人信息" :show-flod="false">
              <ysn-table :data="data.tenantContacts" :column="tenantContactsColumnDetails" :checkbox="false" />
            </ysn-flod>
            <ysn-flod title="证照管理" :show-flod="false">
              <ysn-formTable
                ref="formTable"
                v-model="data"
                prop="tenantLicense"
                :column="tenantLicenseColumnDetails"
              >
                <template #tenantLicenseAttachment="scope">
                  <a
                    v-for="(item,index) in scope.row.tenantLicenseAttachment"
                    :key="index"
                    class="link-type"
                    target="_blank"
                    :href="item.url"
                  >
                    <span class="el-icon-document" />
                    {{ item.name }}
                  </a>
                </template>
              </ysn-formTable>
            </ysn-flod>
            <ysn-flod title="合同信息" :show-flod="false">
              <ysn-formItem
                :form="data"
                :config="contractColumnDetails"
                :column="4"
                clearable
              />
            </ysn-flod>
            <ysn-flod title="开票信息" :show-flod="false">
              <ysn-table :data="data.tenantLetter" :column="tenantLetterColumn" :checkbox="false" />
            </ysn-flod>
            <ysn-flod title="诚信记录" :show-flod="false">
              <ysn-table :data="data.tenantCredit" :column="tenantCreditColumn" :checkbox="false" />
            </ysn-flod>
          </el-form>
        </div>
      </template>
      <!-- 按钮 -->
      <template #btn>
        <div v-if="dialogType === 'details'" class="flex-ju-end mt-40">
          <addDialog v-if="data.checkStatus===3" :form-data="data" @cloneDialog="cloneDialog" />
          <ysn-btn type="info" @click="validate">审核记录</ysn-btn>
        </div>
      </template>
    </ysn-dialog>
  </div>
</template>

<script>
import { tenantBrandColumnDetails, tenantContactsColumnDetails, tenantLicenseColumnDetails, contractColumnDetails, tenantLetterColumn, tenantCreditColumn } from './dialpgCongif'
import addDialog from './addDialog'
export default {
  name: 'Dialog',
  components: {
    addDialog
  },
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
      // 品牌授权
      tenantBrandColumnDetails: tenantBrandColumnDetails.call(this),
      // 业务联系人信息
      tenantContactsColumnDetails: tenantContactsColumnDetails.call(this),
      // 证照管理
      tenantLicenseColumnDetails: tenantLicenseColumnDetails.call(this),
      // 合同信息
      contractColumnDetails: contractColumnDetails.call(this),
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
        { itemType: 'text', placeholder: '请选择', prop: 'programName', label: '所属项目', list: this.$PUBFN.getOptionsList('projectList'), listName: 'label', listValue: [] },
        { itemType: 'text', placeholder: '--自动带入--', prop: 'tenantId', label: '商家编码', disabled: true },
        { itemType: 'text', placeholder: '请输入', prop: 'tenantName', label: '商家名称' },
        { itemType: 'text', placeholder: '请选择', prop: 'tenantType', label: '商家性质', list: this.$PUBFN.getOptionsList('enterpriseType'), listName: 'label', listValue: [] },
        { itemType: 'text', placeholder: '请选择', prop: 'tenantCompanyQuailty', label: '商家属性', list: this.$PUBFN.getOptionsList('tenantCompanyQuailty'), listName: 'label', listValue: [] },
        { itemType: 'text', placeholder: '请选择', prop: 'tenantTaxpayerType', label: '纳税人类型', list: this.$PUBFN.getOptionsList('tenantTaxpayerType'), listName: 'label', listValue: [] }
      ]
      console.log(this.formData)
      if (this.formData.tenantType === 1) {
        return [
          ...listForm,
          { itemType: 'text', placeholder: '请输入', prop: 'tenantNaturalPerson', label: '自然人姓名' },
          { itemType: 'text', placeholder: '请输入', prop: 'tenantNaturalPersonId', label: '身份证号' },
          { itemType: 'text', placeholder: '请输入', prop: 'tenantContactsMobile', label: '手机' }
        ]
      } else {
        return [
          ...listForm,
          { itemType: 'text', placeholder: '请输入', prop: 'tenantCompanyName', label: '公司名称' },
          { itemType: 'text', placeholder: '请输入', prop: 'tenantLegalPerson', label: '法定代表人' },
          { itemType: 'text', placeholder: '请输入', prop: 'tenantUnifiedSocialCreditCode', label: '统一社会信用代码' }
        ]
      }
    },
    closeDialog() {
      this.$emit('cloneDialog')
    },
    cloneDialog() {
      this.$emit('cloneDialog')
    },
    // 保存
    handleVisible() {
      this.$emit('closeDialog')
    },
    validate() {
      this.verification(this.$refs).then(res => {
        this.$emit('close')
      })
    }
  }
}
</script>

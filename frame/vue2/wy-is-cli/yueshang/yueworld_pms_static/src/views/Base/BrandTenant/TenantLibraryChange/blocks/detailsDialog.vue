<!--
 * @Author: shuyuan
 * @LastEditors: shuyuan
 * @Description:商家变更列表
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
                prop="tenantBrand"
                :column="tenantBrandColumnDetails"
                :rules="rules"
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
            <ysn-flod v-if="data.checkStatusName.indexOf('OA') === -1" title="审核记录" :show-flod="false">
              <ysn-table :data="examineTableData.tableData1" :column="examineColumn" :checkbox="false" />
            </ysn-flod>
          </el-form>
        </div>
      </template>
      <!-- 按钮 -->
      <template #btn>
        <div class="flex-ju-end mt-40">
          <div v-if="data.checkStatusName.indexOf('OA') === -1 && data.checkStatus !==3 ">
            <ysn-btn class="mr-8" @click="handlerAudit">同意</ysn-btn>
            <ysn-btn type="delete" @click="reject">驳回</ysn-btn>
          </div>
          <div v-if="data.checkStatusName.indexOf('OA') !== -1">
            <ysn-btn class="mr-8" @click="auditRecord">审核记录</ysn-btn>
          </div>
        </div>
      </template>
    </ysn-dialog>
  </div>
</template>

<script>
import {
  tenantBrandColumnDetails,
  tenantContactsColumnDetails,
  tenantLicenseColumnDetails,
  contractColumnDetails,
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
        { itemType: 'text', prop: 'programName', label: '所属项目' },
        { itemType: 'text', prop: 'tenantId', label: '商家编码' },
        { itemType: 'text', prop: 'tenantName', label: '商家名称' },
        { itemType: 'text', prop: 'tenantType', label: '商家性质' },
        { itemType: 'text', prop: 'tenantCompanyQuailty', label: '商家属性' },
        { itemType: 'text', prop: 'tenantTaxpayerType', label: '纳税人类型' }
      ]
      if (this.data.tenantType === 1) {
        return [
          ...listForm,
          { itemType: 'text', prop: 'tenantNaturalPerson', label: '自然人姓名' },
          { itemType: 'text', prop: 'tenantNaturalPersonId', label: '身份证号' },
          { itemType: 'text', prop: 'tenantContactsMobile', label: '手机' }
        ]
      } else {
        return [
          ...listForm,
          { itemType: 'text', prop: 'tenantCompanyName', label: '公司名称' },
          { itemType: 'text', prop: 'tenantLegalPerson', label: '法定代表人' },
          { itemType: 'text', prop: 'tenantUnifiedSocialCreditCode', label: '统一社会信用代码' }
        ]
      }
    },
    closeDialog() {
      this.$emit('cloneDialog')
    },
    handlerAudit() { // 保存
      this.$emit('cloneDialog')
    },
    reject() { // 驳回
      this.$emit('cloneDialog')
    },
    auditRecord() { // 审核记录
      this.$router.push({ name: 'TenantLibraryChangeExamine', query: { id: this.data.id, status: this.data.checkStatus }})
    }
  }
}
</script>

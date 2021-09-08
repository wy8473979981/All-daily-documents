<!--
 * @Author: shuyuan
 * @LastEditors: shuyuan
 * @Description: 品牌库
-->
<template>
  <div>
    <ysn-dialog
      :title="'详情' "
      width="920px"
      :out-close="outClose"
      :is-show-dialog="isShowDialog"
      :external="isShowDialog"
      @closeDialog="closeDialog"
    >
      <template #contain>
        <div>
          <el-form ref="rule" :model="data" label-position="top" size="small">
            <ysn-formItem
              :form="data"
              :config="configDataDitails"
              :column="4"
              clearable
            >
              <template #brandLogo>
                <a
                  v-for="(item,index) in data.brandLogo"
                  :key="index"
                  class="link-type"
                  target="_blank"
                  :href="item.url"
                >{{ item.name }}</a>
              </template>
            </ysn-formItem>
            <ysn-flod title="联系人信息" :show-flod="false">
              <ysn-table :data="data.brandContacts" :column="formTableColumnDetails" :checkbox="false" />
            </ysn-flod>
            <ysn-flod v-if="dialogType != 'add'" title="合作商家" :show-flod="false">
              <ysn-table :data="data.business" :column="businessColumn" :checkbox="false" />
            </ysn-flod>
            <ysn-flod v-if="dialogType != 'add'" title="合作项目" :show-flod="false">
              <template #action>
                <el-checkbox>未解约合同</el-checkbox>
              </template>
              <ysn-table :data="data.project" :column="projectColumn" :checkbox="false" />
            </ysn-flod>
            <ysn-flod v-if="data.checkStatusName.indexOf('OA') === -1" title="审核记录" :show-flod="false">
              <ysn-table :data="examineTableData.tableData1" :column="examineColumn" :checkbox="false" />
            </ysn-flod>
            </ysn-formitem></el-form>
        </div>
      </template>
      <!-- 按钮 -->
      <template #btn>
        <div class="flex-ju-end mt-40">
          <div v-if="data.checkStatusName.indexOf('OA') === -1 && data.checkStatus !==3 ">
            <ysn-btn class="mr-8" @click="handlerAudit(1)">同意</ysn-btn>
            <ysn-btn type="delete" @click="reject">驳回</ysn-btn>
          </div>
          <div v-if="data.checkStatusName.indexOf('OA') !== -1">
            <ysn-btn @click="auditRecord">审核记录</ysn-btn>
          </div>
        </div>
      </template>
    </ysn-dialog>
  </div>
</template>

<script>
import { configDataDitails, formTableColumnDetails, businessColumn, projectColumn, examineColumn } from './dialpgCongif'
export default {
  name: 'Dialog',
  props: {
    isShowDialog: { type: Boolean, default: false }, // 弹窗控制
    outClose: { type: Boolean },
    dialogType: {
      type: String,
      default: 'edit' // add=新增，edit=编辑， details=详情
    },
    formData: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      // 业务联系人信息
      formTableColumnDetails: formTableColumnDetails.call(this),
      // 合作商家信息
      businessColumn: businessColumn.call(this),
      // 合作项目信息
      projectColumn: projectColumn.call(this),
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
      },
      configDataDitails: configDataDitails.call(this),
      projectConfigData: [
        { itemType: 'select', prop: 'action', label: '', hasSlot: true }
      ]
    }
  },
  computed: {
    data() {
      return this.formData
    }
  },
  methods: {
    // 保存
    handleVisible() {
      this.$emit('closeDialog')
    },
    editInfo() { // 更改为编辑
      this.$props.dialogType = 'edit'
    },
    closeDialog() {
      this.$emit('cloneDialog')
    },
    cloneDialog() {
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
      // await brandLibraryApi.brandLibrarySave(form)
      if (type === 1) {
        this.$message({ message: '已同意', type: 'success' })
      } else if (type === 2) {
        this.$message({ message: '驳回成功', type: 'success' })
      }
      this.$emit('cloneDialog')
    },
    reject() { // 驳回
      this.$emit('cloneDialog')
    },
    auditRecord() { // 审核记录
      this.$router.push({ name: 'BrandLibraryChangeExamine', query: { id: this.data.id, status: this.data.checkStatus }})
    }
  }
}
</script>

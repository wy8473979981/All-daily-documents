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
                >
                  {{ item.name }}
                </a>
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
          </el-form>
        </div>
      </template>
      <!-- 按钮 -->
      <template #btn>
        <!-- 详情操作按钮 -->
        <div v-if="dialogType === 'details'" class="flex-ju-end mt-40">
          <addDialog v-if="data.checkStatus===3" :form-data="data" @cloneDialog="cloneDialog" />
          <ysn-btn type="info">审核记录</ysn-btn>
        </div>
      </template>
    </ysn-dialog>
  </div>
</template>

<script>
import { configDataDitails, formTableColumnDetails, businessColumn, projectColumn } from './dialpgCongif'
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
      formTableData: {
        tableData1: []
      },
      // 合作商家信息
      businessColumn: businessColumn.call(this),
      businessTableData: {
        tableData1: []
      },
      // 合作项目信息
      projectColumn: projectColumn.call(this),
      projectTableData: {
        tableData1: []
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
    async handlerAudit() { // 保存跳转到变更列表
      await this.$router.push({
        name: 'BrandLibraryChange'
      })
    },
    closeDialog() {
      this.$emit('cloneDialog')
    },
    cloneDialog() {
      this.$emit('cloneDialog')
    },
    validate() {
      this.verification(this.$refs).then(res => {
        this.$emit('closeDialog')
      })
    }
  }
}
</script>

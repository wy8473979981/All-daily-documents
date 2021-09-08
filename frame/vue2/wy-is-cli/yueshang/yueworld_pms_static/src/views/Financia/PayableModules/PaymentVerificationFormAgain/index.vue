<!--
 * @Author: jllk
 * @LastEditors: jllk
 * @Description:付款核销单-详情审核中
-->
<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="Receivable"
      v-model="formData"
      :config="pageConfig"
      :has-menu="hasMenu"
      :update="update"
      persmission="PaymentVerificationFormEdit"
    >
      <!-- 操作按钮 -->
      <template #btn>
        <ysn-btn class="mr-12" @click="AgreeClick()">同意</ysn-btn>
        <ysn-btn class="mr-12" @click="Dismissed()">驳回</ysn-btn>
        <ysn-btn type="info" class="mr-12" @click="Object.assign(Managedialog, { visible: true, record: {} })">
          附件信息
        </ysn-btn>
      </template>
    </ysn-pageAccorDetail>
    <!-- 同意弹窗 -->
    <AgreeAddDialog
      :is-show-dialog="AgreeAdd.visible"
      :form-data="AgreeAdd.record"
      @closeDialog="Object.assign(AgreeAdd, { visible: false, record: {} })"
    />
    <!-- 驳回弹窗 -->
    <DismissedAddDialog
      :is-show-dialog="DismissedAdd.visible"
      :form-data="DismissedAdd.notes"
      @closeDialog="Object.assign(DismissedAdd, { visible: false, notes: {} })"
    />
    <!--附件管理 -->
    <Managedialog
      :is-show-dialog="Managedialog.visible"
      :form-data="Managedialog.record"
      @closeDialog="Object.assign(Managedialog, { visible: false, record: {} })"
    />
  </div>
</template>

<script>
import AgreeAddDialog from './blocks/AgreeAdd.vue'
import DismissedAddDialog from './blocks/DismissedAdd.vue'
import Managedialog from './blocks/Managedialog.vue'
import { PayableApi } from '@/api'
import { pageConfig } from './config'
export default {
  name: 'PaymentVerificationFormAgain',
  components: {
    AgreeAddDialog,
    DismissedAddDialog,
    Managedialog
  },
  props: {},
  data() {
    return {
      update: 0, // 更新视图用
      hasMenu: false, // 是否显示左侧菜单
      //   左侧按钮导航配置
      pageConfig: pageConfig.call(this),
      // 进场装修详情页面id
      id: null,
      // 统一数据
      formData: {
        baseInfo: {},
        baseInfoPayment: {},
        baseInfoBilling: {},
        detailedData: {
          tableData: []
        }
      },
      // 同意弹窗
      AgreeAdd: {
        visible: false,
        record: {}
      },
      // 驳回弹窗
      DismissedAdd: {
        visible: false,
        notes: {}
      },
      // 附件信息弹窗
      Managedialog: {
        visible: false,
        record: {}
      }
    }
  },
  created() {
    if (this.$route.query.id) {
      const datas = {
        id: this.$route.query.id
      }
      this.id = this.$route.query.id
      this.receivableDetails(datas) // 详情数据接口
    }
  },
  methods: {
    // 弹出同意弹窗
    AgreeClick(record) {
      Object.assign(this.AgreeAdd, { visible: true, record })
    },
    // 弹出驳回弹窗
    Dismissed(notes) {
      Object.assign(this.DismissedAdd, { visible: true, notes })
    },
    // 详情数据接口
    receivableDetails(datas) {
      const that = this
      PayableApi.PaymentVerificationFormAgain(datas).then(res => {
        if (res) {
          that.formData.baseInfo = res.baseInfo
          that.formData.baseInfoPayment = res.baseInfoPayment
          that.formData.baseInfoBilling = res.baseInfoBilling
          that.formData.detailedData.tableData = res.detailedData
        }
        that.update++
      })
    }
  }
}
</script>

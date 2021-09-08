<!--
 * @Author: sdy
 * @LastEditors: sdy
 * @Description:处理单详情
-->
<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="ProcessingDetail"
      v-model="formData"
      :config="pageConfig"
      :has-menu="hasMenu"
      :update="update"
    >
      <template #btn>
        <ysn-btn v-if="block" @click="navToExamine">审核记录</ysn-btn>
        <template v-if="examine">
          <ysn-btn class="mr-12" @click="AgreeClick()">同意</ysn-btn>
          <ysn-btn type="delete" class="mr-12" @click="Dismissed()">驳回</ysn-btn>
        </template>
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
  </div>

</template>

<script>
import { processingApi } from '@/api'
import { pagesConfig } from './config'
import AgreeAddDialog from './blocks/AgreeAdd.vue'
import DismissedAddDialog from './blocks/DismissedAdd.vue'
export default {
  name: 'ProcessingDetail',
  components: {
    AgreeAddDialog,
    DismissedAddDialog
  },
  props: {},
  data() {
    return {
      update: 0, // 更新视图用
      hasMenu: false, // 是否显示左侧菜单
      block: false,
      examine: true,
      // 进场装修详情页面id
      id: 1,
      // 统一数据
      formData: {
        detailInfo: { // 详情数据
          tenantName: '', // 商家/企业
          programName: '', // 项目名称
          dealNo: '', // 处理编号
          brandName: '', // 品牌名称
          dealDate: '', // 处理日期
          attachment: '' // 附件
        },
        listSecond: {
          tableData: [
            { feeName: '' }, // 费项
            { payee: '' }, // 收款单位
            { dealType: '' }, // 处理类型
            { temporaryReceiptsBalanceOne: '' }, // 可用余额
            { dealAmountOne: '' }, // 处理金额
            { dealReason: '' }// 处理原因
          ]
        },
        firstCountList: {
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
      }
    }
  },
  created() {
    this.pageConfig = pagesConfig(this)
    if (this.$route.query.id) {
      const datas = {
        id: this.$route.query.id
      }
      this.id = this.$route.query.id
      this.processingDetails(datas) // 详情数据接口
      if (datas.id === 5) {
        this.examine = false
      }
    }
  },
  methods: {
    AgreeClick(record) {
      Object.assign(this.AgreeAdd, { visible: true, record })
    },
    Dismissed(notes) {
      Object.assign(this.DismissedAdd, { visible: true, notes })
    },
    // 详情数据接口
    processingDetails(datas) {
      const that = this
      processingApi.processingDetails(datas).then(res => {
        if (res) {
          that.id = res.id
          that.formData.detailInfo = res.list[0]
          that.formData.listSecond.tableData = res.listSecond
          that.formData.firstCountList.tableData = res.tableData
        }
        that.update++
        if (this.id === 3 || this.id === 7) {
          this.block = true
          this.examine = false
        }
      })
    },
    // 审批跳转
    navToExamine() {
      this.$router.push({ name: 'ProcessingDetailExamine', query: { id: this.$route.query.id }})
    }
  }
}
</script>


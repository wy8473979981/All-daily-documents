<!--
 * @Author: fzx
 * @LastEditors: fzx
 * @Description: 费用调整单详情页
-->
<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="pageDetail"
      v-model="formData"
      :config="pageConfig"
      :has-menu="hasMenu"
      :update="update"
    >
      <!-- 操作按钮 拿到状态判断 -->
      <template v-if="!isOA" #btn>
        <ysn-btn v-if="adopt" class="ml-8" type="info" @click="Object.assign(Managedialog, { visible: true, record: {} })">附件信息</ysn-btn>
        <!-- 同意弹窗 -->
        <AgreeOrNoDialog type="agree" @over="examineOver">
          <ysn-btn v-if="!adopt" class="mr-8 ml-8">同意</ysn-btn>
        </AgreeOrNoDialog>
        <!-- 驳回弹窗 -->
        <AgreeOrNoDialog type="reject" @over="examineOver">
          <ysn-btn v-if="!adopt" class="mr-8 ml-8" type="delete">驳回</ysn-btn>
        </Agreeornodialog>
        <ysn-btn v-if="!adopt" class="ml-8" type="reset" @click="Object.assign(Managedialog, { visible: true, record: {} })">附件信息</ysn-btn>
      </template>
      <template v-else #btn>
        <ysn-btn class="ml-8" type="info" @click="history">审核记录</ysn-btn>
        <ysn-btn class="ml-8" type="info" @click="Object.assign(Managedialog, { visible: true, record: {} })">附件信息</ysn-btn>
      </template>
      <!-- 附件信息弹窗 -->
    </ysn-pageAccorDetail>
    <Managedialog
      :is-show-dialog="Managedialog.visible"
      :form-data="Managedialog.record"
      @closeDialog="Object.assign(Managedialog, { visible: false, record: {} })"
    />
  </div>
</template>

<script>
import { adjustmentCost } from '@/api/adjustmentCost.js'
import { pageConfig } from './config'
import AgreeOrNoDialog from './blocks/AgreeOrNoDialog.vue'
import Managedialog from './blocks/Managedialog.vue'
export default {
  name: 'ReceivableLightlyDetail',
  components: {
    AgreeOrNoDialog, Managedialog
  },
  props: {},
  data() {
    return {
      // 附件信息弹窗
      Managedialog: {
        visible: false,
        record: {}
      },
      // 是否为OA
      isOA: false,
      // 是否审核通过
      adopt: false,
      update: 0, // 更新视图用
      hasMenu: false, // 是否显示左侧菜单
      auditStatus: '', // 状态
      id: null, // 进场装修详情页面id
      // 统一数据
      formData: {
        detailInfo: { // 详情数据
          contNo: '', // 合同编号
          programName: '', // 项目名称
          tenantName: '', // 商家名称
          brandName: '', // 品牌名称
          leaseArea: ''// 租赁区域
        },
        countData: {
          derateAmount: '', // 汇总数据
          tableData: [] // 表格数据
        },
        firstCountList: {
          tableData: []
        }
      }
    }
  },
  created() {
    this.pageConfig = pageConfig(this)
    if (this.$route.query.id) {
      const datas = {
        id: this.$route.query.id
      }
      this.AdjustmentCostDetail(datas) // 详情数据接口
    }
    if (Number(this.$route.query.status) === 4 || Number(this.$route.query.status) === 5) {
      this.isOA = true
    }
    if (Number(this.$route.query.status) === 3) {
      this.adopt = true
    }
  },
  methods: {
    // 同意 驳回点击
    examineOver() {
      this.$router.push({ name: 'AdjustmentCost' })
    },
    // 审核记录点击
    history() {
      this.$router.push({ name: 'AdjustmentCostExamine' })
    },
    // 详情数据接口
    AdjustmentCostDetail(datas) {
      const that = this
      adjustmentCost.getAdjustmentCostDetail(datas).then(res => {
        if (res.detailInfo) {
          that.formData.detailInfo = res.detailInfo
        }
        if (res.countData !== undefined) {
          that.formData.countData.tableData = res.countData.tableData
          that.formData.countData.adjustAmount = res.countData.adjustAmount
        }
        if (res.firstCountList !== undefined && res.firstCountList.length > 0) {
          that.formData.firstCountList.tableData = res.firstCountList
        }
        that.update++
      })
    }
  }
}
</script>

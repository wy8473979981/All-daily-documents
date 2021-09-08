<!--
 * @Author: fzx
 * @LastEditors: fzx
 * @Description: 费用调整单详情页 审核记录
-->
<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="pageDetail"
      v-model="formData"
      :config="pageConfig"
      :has-menu="hasMenu"
      :update="update"
      :accessory="'true'"
      examine="AdjustmentCostExamine"
      @examineOver="examineOver"
    />
  </div>
</template>

<script>
import { adjustmentCost } from '@/api/adjustmentCost.js'
import { pageConfig } from './config'
export default {
  name: 'AdjustmentCostExamine',
  props: {},
  data() {
    return {
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
    //  默认获取id为1的数据
    const datas = {
      id: 1
    }
    this.AdjustmentCostDetail(datas) // 详情数据接口
    if (this.$route.query.status === '审核通过') {
      this.adopt = true
    }
  },
  methods: {
    // 同意驳回跳转
    examineOver() {
      this.$message.success({ message: '操作成功' })
      this.$router.push({ name: 'AdjustmentCost' })
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

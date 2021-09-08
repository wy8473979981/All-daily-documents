/*
 * @Author: xiaoxie
 * @Date: 2021-07-26 15:45:07
 * @Last Modified by: xiaoxie
 * @Last Modified time: 2021-07-30 09:45:33
 */
// 凭证汇总详情页面
<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="pageDetail"
      v-model="formData"
      :config="pageConfig"
      :has-menu="hasMenu"
      :update="update"
    >
      <!-- 操作按钮 -->
      <template #btn>
        <ysn-btn v-if="status===4" class="mr-12" type="danger" @click="tipBox()">红冲凭证</ysn-btn>
        <ysn-btn class="mr-12" type="info" @click="viewSource()">查看源代码</ysn-btn>
      </template>
    </ysn-pageAccorDetail>
  </div>
</template>
<script>
import { pageConfig } from './config'
import { marginProcessingApi } from '@/api'
export default {
  name: 'VoucherSummaryDetail',
  props: {},
  data() {
    return {
      update: 0, // 更新视图用
      hasMenu: false, // 是否显示左侧菜单
      //   左侧按钮导航配置
      pageConfig: pageConfig.call(this),
      status: null,
      // 详情id
      id: 0,
      // 统一数据
      formData: {
        baseInfo: {
          // 主信息
          accountName: '', // 账套名称
          accrualDate: '', // 凭证日期
          thirdVoucherId: '', // 第三方凭证号
          ibTypeId: '', // 收付类型
          debitAmount: '', // 借方金额
          crebditAmount: '', // 租赁区域
          uploadDate: '', // 上传时间
          uploadUser: '', // 上传人'
          voucherType: '', // '凭证类型
          templateType: '' // 来源类型
        },
        // 分录信息
        detailedData: {
          tableData: [
          ], // 表格数据
          tableConfig: [ // 表单配置
            { t0: '序号', type: 'index', width: 50, sortable: true, showFixed: true },
            { subjectId: '科目代码', sortable: true },
            { subjectName: '科目名称', sortable: true },
            { assistingName: '辅助核算', sortable: true },
            { direction: '方向', sortable: true },
            { debitAmount: '借方金额', type: 'money', sortable: true },
            { crebditAmount: '贷方金额', type: 'money', sortable: true },
            { abstract: '摘要', sortable: true },
            { cashflow: '现金流量', sortable: true },
            { enterSeq: '对应分录号', width: 120, sortable: true },
            { receiptNumber: '单据号', width: 120, sortable: true },
            { templateNumber: '来源模板', width: 120, sortable: true }
          ]
        }
      }
    }
  },
  created() {
    if (this.$route.query.id) {
      const datas = {
        id: this.$route.query.id
      }
      this.status = this.$route.query.status
      this.voucherSummaryDetailBox(datas) // 详情数据接口
    }
  },
  methods: {
    // 详情数据接口
    voucherSummaryDetailBox(datas) {
      const that = this
      marginProcessingApi.voucherSummaryDetail(datas).then(res => {
        if (res.baseInfo) {
          that.formData.baseInfo = res.baseInfo
        }
        if (res.detailedData && res.detailedData.tableData !== undefined && res.detailedData.tableData.length > 0) {
          that.formData.detailedData.tableData = res.detailedData.tableData
        }
        that.update++
      })
    },
    // 查看源码
    viewSource() {
      if (this.formData.detailedData.tableConfig.length === 12) {
        const obj = { desc: '描述', sortable: true, fixedWidth: 120 }
        this.formData.detailedData.tableConfig.splice(4, 0, obj)
      } else {
        this.formData.detailedData.tableConfig.splice(4, 1)
      }
      this.update++
    },
    // 提示框
    tipBox() {
      const that = this
      this.$message({ message: '红冲凭证', type: 'success' })
      setTimeout(() => {
        that.$router.go(-1)
      }, 1000)
    }

  }
}
</script>

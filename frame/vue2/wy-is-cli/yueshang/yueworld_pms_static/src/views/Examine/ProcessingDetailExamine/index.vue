<!--
 * @Author: sdy
 * @LastEditors: sdy
 * @Description:暂收款处理单审核记录
-->
<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="ProcessingDetail"
      v-model="formData"
      :config="pageConfig"
      :has-menu="hasMenu"
      :update="update"
      examine="ProcessingDetail"
      @examineOver="examineOver"
    >
      <template #topLeft>
        <span class="mr-24">{{ formData.detailInfo.programName }}</span>
        <span class="mr-24">{{ formData.detailInfo.brandName }}</span>
        <span class="mr-24">{{ formData.detailInfo.tenantName }}</span>
      </template>
    </ysn-pageAccorDetail>
  </div>

</template>

<script>
import { processingApi } from '@/api'
import { pageConfig } from './config'
export default {
  name: 'ProcessingDetail',
  props: {},
  data() {
    return {
      update: 0, // 更新视图用
      hasMenu: false, // 是否显示左侧菜单
      pageConfig: pageConfig.call(this),
      block: false,
      examine: true,
      // 进场装修详情页面id
      id: 1,
      // 统一数据
      formData: {
        detailInfo: { // 基本信息
          tenantName: '', // 商家/企业
          programName: '', // 项目名称
          dealNo: '', // 处理编号
          brandName: '', // 品牌名称
          dealDate: '', // 处理日期
          attachment: '' // 附件
        },
        // 处理明细
        listSecond: {
          tableData: [
            { feeName: '' }, // 费项
            { payee: '' }, // 收款单位
            { dealType: '' }, // 处理类型
            { temporaryReceiptsBalanceOne: '' }, // 可用余额
            { dealAmountOne: '' }, // 处理金额
            { dealReason: '' }// 处理原因
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
      this.id = this.$route.query.id
      this.processingDetails(datas) // 详情数据接口
    }
  },
  methods: {
    // 详情数据接口
    processingDetails(datas) {
      const that = this
      processingApi.processingDetails(datas).then(res => {
        if (res) {
          that.id = res.id
          that.formData.detailInfo = res.list[0]
          that.formData.listSecond.tableData = res.listSecond
        }
        that.update++
      })
    },
    // 同意驳回跳转
    examineOver() {
      this.$router.push({ name: 'ProcessingList' })
    }
  }
}
</script>


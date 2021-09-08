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
        <ysn-btn class="mr-12" @click="tipBox()">上传凭证</ysn-btn>
        <ysn-btn class="mr-12" @click="tipBox()">保存</ysn-btn>
      </template>
    </ysn-pageAccorDetail>
  </div>
</template>
<script>
import { pageConfig } from './config'
import { marginProcessingApi } from '@/api'
export default {
  name: 'VoucherSummaryEdit',
  props: {},
  data() {
    return {
      update: 0, // 更新视图用
      hasMenu: false, // 是否显示左侧菜单
      //   左侧按钮导航配置
      pageConfig: pageConfig.call(this),
      editStatus: false,
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
          ] // 表格数据
        }
      }
    }
  },
  created() {
    if (this.$route.query.id) {
      const datas = {
        id: this.$route.query.id
      }
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
    tipBox() {
      const that = this
      this.$message({ message: '成功', type: 'success' })
      setTimeout(() => {
        that.$router.go(-1)
      }, 1000)
    }
  }
}
</script>

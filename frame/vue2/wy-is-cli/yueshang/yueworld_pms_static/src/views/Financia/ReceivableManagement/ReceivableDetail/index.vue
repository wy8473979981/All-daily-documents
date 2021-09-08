/*
 * @Author: sdy
 * @LastEditors: xueyx
 * @Description:应收账单详情
*/
<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="Receivable"
      v-model="formData"
      :config="pageConfig"
      :has-menu="hasMenu"
      :update="update"
      persmission="ReceivableDetail"
    >
      <!-- 操作按钮 -->
      <template #btn>
        <ysn-btn class="mr-8">打印账单</ysn-btn>
      </template>
    </ysn-pageAccorDetail>

  </div>
</template>

<script>
import { processingApi } from '@/api'
import { pageConfig } from './config'
export default {
  name: 'ReceivableDetail',
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
        baseInfo: {}, // 基础信息
        payableInfo: { // 应缴款项
          tableData: []
        },
        userInfo: {}, // 收款账户信息
        personInfo: { // 收款账户信息
          tableData: []
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
      this.receivableDetails(datas) // 详情数据接口
    }
  },
  mounted() {
  },
  methods: {
    // 详情数据接口
    receivableDetails(datas) {
      const that = this
      processingApi.receivableDetails(datas).then(res => {
        if (res) {
          that.formData.baseInfo = res.baseInfo
          that.formData.payableInfo.tableData = res.payableInfo
          that.formData.userInfo = res.userInfo
          that.formData.personInfo.tableData = res.personInfo
          that.update++
        }
      })
    }

  }
}
</script>

/*
 * @Author: xiaoxie
 * @Date: 2021-07-28 10:27:57
 * @Last Modified by: xiaoxie
 * @Last Modified time: 2021-08-26 11:30:10
 */
// 保证金处理单审批记录
<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="MarginProcessingExamine"
      v-model="formData"
      :config="pageConfig"
      :has-menu="hasMenu"
      :update="update"
      examine="MarginProcessingExamine"
    >
      <template #topLeft>
        <!-- 显示文字 -->
        <span class="mr-24">{{ formData.baseInfo.programName }}</span>
        <span class="mr-24">{{ formData.baseInfo.leaseArea }}</span>
        <span class="mr-24">{{ formData.baseInfo.brandName }}</span>
        <span class="mr-24">{{ formData.baseInfo.tenantName }}</span>
      </template>
    </ysn-pageAccorDetail>
  </div>
</template>
<script>
import { pageConfig } from './config'
import { marginProcessingApi } from '@/api'
export default {
  name: 'MarginProcessingExamine',
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
          // 详情数据
          contNo: '', // 合同编号
          programName: '', // 项目
          marginNo: '', // 处理单号
          brandName: '', // 品牌
          tenantName: '', // 商家
          leaseArea: '', // 租赁区域
          actionDate: '' // 处理日期
        },
        // 费用信息
        detailedData: {
          tableData: [
          ] // 表格数据
        },
        examineData: {
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
      this.marginProcessingDetailBox(datas) // 详情数据接口
    }
  },
  methods: {
    // 详情数据接口
    marginProcessingDetailBox(datas) {
      const that = this
      marginProcessingApi.marginProcessingDetail(datas).then(res => {
        if (res.baseInfo) {
          that.formData.baseInfo = res.baseInfo
        }
        if (res.detailedData) {
          that.formData.detailedData = res.detailedData
        }
        that.update++
      })
    }
  }
}
</script>

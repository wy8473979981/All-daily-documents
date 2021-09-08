<!--
 * @Author: wyz
 * @LastEditors: wyz
 * @Description:合同解约-审核
-->
<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="pageDetail"
      v-model="formData"
      :config="pageConfig"
      :has-menu="hasMenu"
      :update="update"
      examine="ContractTerminationExamine"
      @examineOver="examineOver"
    >
      <template #topLeft>
        <!-- 显示文字 -->
        <span class="mr-24">{{ formData.baseInfo.programName }}</span>
        <span class="mr-24">{{ formData.baseInfo.spaceName }}</span>
        <span class="mr-24">{{ formData.baseInfo.brandName }}</span>
        <span class="mr-24">{{ formData.baseInfo.tenantName }}</span>
      </template>
    </ysn-pageAccorDetail>
  </div>
</template>
<script>
import { contractTerminationApi } from '@/api'
import { pageConfig } from './config'
export default {
  name: 'ContractTerminationExamine',
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
          programName: '', // 项目名称
          contNo: '', // 合同编号
          tenantName: '', // 商家/企业
          brandName: '', // 品牌名称
          leaseArea: '', // 租赁区域
          floorGrossArea: '', // 建筑面积
          contType: '', // 合同类型
          spaceLeasableArea: '', // 计租面积（㎡）
          contBeginDate: '', // 合同开始日期
          contEndDate: '', // 合同结束日期
          clearType: '', // 解约类型
          contFallDate: '', // 解约日期
          remark: '' // 备注说明
        },
        financialData: {
          showDetail: false,
          tableData: [],
          balanceList: [],
          receivableAndUnReceivableList: [],
          advancePaymentList: []
        }
      },
    }
  },
  created() {
    this.contractTerminationDetail() // 详情数据接口
  },
  methods: {
    // 获取详细数据
    contractTerminationDetail() {
      const that = this
      contractTerminationApi.contractTerminationDetail({ id: 1 }).then(res => {
        if (res.programAndBusinessInfo) {
          that.formData.programAndBusinessInfo = res.programAndBusinessInfo
        }
        if (res.financialData) {
          that.formData.financialData = res.financialData
          that.formData.financialData.showDetail = true
        }
        that.update++
      })
    },
    // 审核完毕
    examineOver() {
      this.$router.back()
    }
  }
}
</script>

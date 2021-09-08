<!--
 * @Author: wyz
 * @LastEditors: wyz
 * @Description:合同解约-详情
-->
<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="pageDetail"
      v-model="formData"
      :config="pageConfig"
      :has-menu="hasMenu"
      :update="update"
      accessory-disable
      accessory="AgreementOfintent"
      persmission="ContractTerminationDetail"
      @change="detailChange"
    >
      <!-- 操作按钮 -->
      <template #btn>
        <ysn-btn class="mr-12" @click="auditRecord">审核记录</ysn-btn>
      </template>
    </ysn-pageAccorDetail>
  </div>
</template>
<script>
import { contractTerminationApi } from '@/api'
import { pageConfig } from './config'
export default {
  name: 'ContractTerminationDetail',
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
        programAndBusinessInfo: {
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
          remark: '', // 备注说明
          type: ''
        },
        financialData: {
          showDetail: false,
          tableData: [],
          balanceList: [],
          receivableAndUnReceivableList: [],
          advancePaymentList: []
        },
        attachmentList: {
          tableData: []
        }
      },
      isShowDialog: false
    }
  },
  created() {
    if (this.$route.query.id) {
      const datas = {
        id: this.$route.query.id
      }
      this.id = this.$route.query.id
      this.contractTerminationDetail(datas) // 详情数据接口
      this.editStatus = true
    }
  },
  methods: {
    // 获取详细数据
    contractTerminationDetail(datas) {
      const that = this
      contractTerminationApi.contractTerminationDetail(datas).then(res => {
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
    auditRecord() {
      this.$router.push({
        name: 'ContractTerminationExamine',
        query: {
          id: this.formData.programAndBusinessInfo.id
        }
      })
    },
    // 数据变化事件
    detailChange(val) {
      this.formData = val
    },
  }
}
</script>

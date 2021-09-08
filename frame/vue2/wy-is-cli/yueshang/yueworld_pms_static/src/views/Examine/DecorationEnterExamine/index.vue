<!--
 * @Author: xiaoxie
 * @LastEditors: fhj
 * @Description:进场装修详情页面
-->
<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="pageDetail"
      v-model="formData"
      :config="pageConfig"
      :has-menu="hasMenu"
      :update="update"
      examine="DecorationEnterExamine"
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
import { investmentApi } from '@/api'
import { pageConfig } from './config'
export default {
  name: 'DecorationEnterDetail',
  props: {},
  data() {
    return {
      update: 0, // 更新视图用
      hasMenu: false, // 是否显示左侧菜单
      //   左侧按钮导航配置
      pageConfig: pageConfig.call(this),
      // 进场装修详情页面id
      id: null,
      // 数据
      formData: {
        baseInfo: {
        // 详情数据
          contractNo: '', // 合同编号
          programName: '', // 项目名称
          tenantName: '', // 商家名称
          spaceName: '', // 铺位号
          brandName: '', // 品牌名称
          spaceLeasableArea: '', // 计租面积（㎡）
          contBeginDate: '', // 合同开始日期
          contEndDate: '', // 合同结束日期
          decorationEnterDate: '', // 装修进场日期
          decorateEndDate: '', // 装修结束日期
          acceptanceDate: '', // 验收日期
          expectOpenDate: '', // 预计开业日期
          description: '' // 备注说明
        },
        // 费用信息
        feeInformationData: {
          tableData: [

          ], // 表格数据
          tableConfig: [ // 表单配置
            { feeName: '费用类型' },
            { depositArAmount: '应收金额(元)' },
            { receivedMoney: '实收金额(元)' },
            { owedMoney: '欠收金额(元)' }
          ]
        },
        // 进场装修相关资料
        attachmentList: {
          tableData: [{ attachment: [] }]
        }
      }
    }
  },
  created() {
    if (this.$route.query.id) {
      const datas = {
        id: this.$route.query.id
      }
      this.decorationEnterDetailBox(datas) // 详情数据接口
    }
  },
  methods: {
    // 详情数据接口
    decorationEnterDetailBox(datas) {
      const that = this
      investmentApi.decorationEnterDetail(datas).then(res => {
        if (res.baseInfo) {
          that.formData.baseInfo = res.baseInfo
        }
        if (res.feeInformationData && res.feeInformationData.tableData !== undefined && res.feeInformationData.tableData.length > 0) {
          that.formData.feeInformationData.tableData = res.feeInformationData.tableData
        }
        if (res.attachmentList && res.attachmentList.tableData !== undefined && res.attachmentList.tableData.length > 0) {
          that.formData.attachmentList.tableData = res.attachmentList.tableData
        }
        that.update++
      })
    },
    // 审核记录
    handlerClick() {

    }

  }
}
</script>

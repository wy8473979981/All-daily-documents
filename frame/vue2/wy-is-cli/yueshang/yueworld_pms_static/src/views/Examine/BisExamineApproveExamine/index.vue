<!--
 * @Author: xueyx
 * @LastEditors: fhj
 * @Description:开业审批详情页
-->
<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="pageDetail"
      v-model="formData"
      :config="pageConfig"
      :has-menu="hasMenu"
      :update="update"
      examine="BisExamineApprove"
    >
      <template #topLeft>
        <!-- 显示文字 -->
        <span class="mr-24">{{ formData.detailInfo.programName }}</span>
        <span class="mr-24">{{ formData.detailInfo.spaceName }}</span>
        <span class="mr-24">{{ formData.detailInfo.brandName }}</span>
        <span class="mr-24">{{ formData.detailInfo.tenantName }}</span>
      </template>

    </ysn-pageAccorDetail>

  </div>
</template>

<script>
import { approveApi } from '@/api'
import { pageConfig } from './config'
export default {
  name: 'BisExamineApproveExamine',
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
        detailInfo: { // 详情数据
          contractNo: '', // 合同编号
          programName: '', // 项目名称
          tenantName: '', // 商家名称
          spaceName: '', // 铺位号
          brandName: '', // 品牌名称
          spaceLeasableArea: '', // 计租面积（㎡）
          contBeginDate: '', // 合同开始日期
          contEndDate: '', // 合同结束日期
          description: '' // 备注说明
        },
        countData: {
          tableData: [] // 表格数据
        },
        firstCountList: {
          tableData: [] // 表格数据

        },
        formTableData: {
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
      this.bisExamineApproveDetail(datas) // 详情数据接口
    }
  },
  mounted() {
  },
  methods: {
    async handlerClick() {
      // const res = await this.$refs.pageDetail.valiFormDate()
    },
    // 详情数据接口
    bisExamineApproveDetail(datas) {
      const that = this
      approveApi.bisExamineApproveDetail(datas).then(res => {
        if (res.detailInfo) {
          that.formData.detailInfo = res.detailInfo
        }
        if (res.countList !== undefined && res.countList.length > 0) {
          that.formData.countData.tableData = res.countList
        }
        if (res.firstCountList !== undefined && res.firstCountList.length > 0) {
          that.formData.firstCountList.tableData = res.firstCountList
        }
        if (res.materialList !== undefined && res.materialList.length > 0) {
          that.formData.formTableData.tableData = res.materialList
        }
        that.update++
      })
    }

  }
}
</script>

<!--
 * @Author: xueyx
 * @LastEditors: xueyx
 * @Description:应收减免详情页
-->
<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="pageDetail"
      v-model="formData"
      :config="pageConfig"
      :has-menu="hasMenu"
      :update="update"
      examine="ReceivableLightlyExamine"
      @examineOver="examineOver"
    >
      <template #topLeft>
        <span class="mr-24">{{ formData.detailInfo.programName }}</span>
        <span class="mr-24">{{ formData.detailInfo.leaseArea }}</span>
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
  name: 'ReceivableLightlyExamine',
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
    this.receivableLightlyDetail() // 详情数据接口
  },
  mounted() {
  },
  methods: {
    async handlerClick() {
      // const res = await this.$refs.pageDetail.valiFormDate()
    },
    // 详情数据接口
    receivableLightlyDetail(datas) {
      const that = this
      approveApi.getReceivableLightlyDetail({ id: 1 }).then(res => {
        if (res.detailInfo) {
          that.formData.detailInfo = res.detailInfo
        }
        if (res.countData !== undefined) {
          that.formData.countData.tableData = res.countData.tableData
          that.formData.countData.derateAmount = res.countData.derateAmount
        }
        if (res.firstCountList !== undefined && res.firstCountList.length > 0) {
          that.formData.firstCountList.tableData = res.firstCountList
        }
        that.update++
      })
    },
    // 改变分页   //TODO 暂无思路
    comChange(val) {
      console.log(val)
    },
    examineOver() {
      this.$router.back()
    }
  }
}
</script>

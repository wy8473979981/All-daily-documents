/*
 * @Author: xueyx
 * @LastEditors: xueyx
 * @Description:应收减免详情页
 */
<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="pageDetail"
      v-model="formData"
      :config="pageConfig"
      :has-menu="hasMenu"
      :update="update"
      :accessory="'true'"
      :examine-page="OA?'ReceivableLightlyExamine':''"
      @comChange="comChange"
    >
      <!-- 操作  -->
      <template v-if="!OA&&!finish" #btn>
        <AgreeOrNoDialog type="agree" @over="examineOver">
          <ysn-btn class="mx-12">同意</ysn-btn>
        </AgreeOrNoDialog>
        <AgreeOrNoDialog type="reject" @over="examineOver">
          <ysn-btn class="mr-12" type="delete">驳回</ysn-btn>
        </AgreeOrNoDialog>
      </template>
    </ysn-pageAccorDetail>

  </div>
</template>

<script>
import { approveApi } from '@/api'
import { pagesConfig } from './config'
import AgreeOrNoDialog from './blocks/AgreeOrNoDialog.vue'
export default {
  name: 'ReceivableLightlyDetail',
  components: {
    AgreeOrNoDialog
  },
  props: {},
  data() {
    return {
      update: 0, // 更新视图用
      hasMenu: false, // 是否显示左侧菜单
      //   左侧按钮导航配置
      pageConfig: null,
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
        firstCountList: { // 审核记录
          tableData: []
        }
      },
      // 判断是否为OA页面
      OA: null,
      // 是否审核完成
      finish: null
    }
  },
  created() {
    if (this.$route.query.id) {
      const datas = {
        id: this.$route.query.id
      }
      this.receivableLightlyDetail(datas) // 详情数据接口
    }
  },
  mounted() {
  },
  methods: {
    // 同意驳回按钮
    examineOver() {
      this.$router.push({ name: 'ReceivableLightly' })
    },
    // 详情数据接口
    receivableLightlyDetail(datas) {
      const that = this
      approveApi.getReceivableLightlyDetail(datas).then(res => {
        this.OA = res.OA
        this.finish = res.finish
        // 动态配置页面布局方法
        this.pageConfig = pagesConfig(this)
        if (res.detailInfo) {
          that.formData.detailInfo = res.detailInfo
        }
        if (res.countData.tableData && res.countData.tableData.length > 0) {
          that.formData.countData.tableData = res.countData.tableData
          that.formData.countData.derateAmount = res.countData.derateAmount
        }
        if (!this.OA) {
          if (res.firstCountList.tableData && res.firstCountList.tableData.length > 0) {
            that.formData.firstCountList = res.firstCountList
          }
        }
        that.update++
      })
    },
    // 改变分页   //TODO 暂无思路
    comChange(val) {
      console.log(val)
    }
  }
}
</script>

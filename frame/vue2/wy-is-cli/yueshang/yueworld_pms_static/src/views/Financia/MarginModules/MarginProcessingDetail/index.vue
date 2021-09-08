/*
 * @Author: xiaoxie
 * @Date: 2021-07-20 10:02:27
 * @Last Modified by: xiaoxie
 * @Last Modified time: 2021-08-27 11:31:34
 */

// 保证金处理单详情页面
<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="pageDetail"
      v-model="formData"
      :config="pageConfig"
      :has-menu="hasMenu"
      :update="update"
      :examine-page="examinePageUrl"
      :examine="examinePage"
      :examine-btn="examineBtn"
    >
      <template v-if="checkStatus==2&&!oaStatus" #btn>
        <ExamineDialog type="agree" @over="examineOver">
          <ysn-btn class="mx-12">同意</ysn-btn>
        </ExamineDialog>
        <ExamineDialog type="reject" @over="examineOver">
          <ysn-btn class="mr-12" type="delete">驳回</ysn-btn>
        </ExamineDialog>
      </template>
    </ysn-pageAccorDetail>

  </div>
</template>
<script>
import { pageConfig } from './config'
import { marginProcessingApi } from '@/api'
import ExamineDialog from './blocks/ExamineDialog.vue'
export default {
  name: 'MarginProcessingDetail',
  components: { ExamineDialog },
  data() {
    return {
      update: 0, // 更新视图用
      hasMenu: false, // 是否显示左侧菜单
      editStatus: false,
      // 详情id
      id: 0,
      checkStatus: null, // 页面状态
      oaStatus: false,
      examinePageUrl: null,
      examinePage: '',
      examineBtn: false, // 同意驳回的按钮
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
            { feeName: '', accountName: '', type: '申请冲抵', balance: '', mayApllyAmount: '', amount: '', reason: '' }
          ] // 表格数据
        },
        // 审核记录
        examineData: {
          tableData: []
        }
      }
    }
  },
  computed: {
    // 左侧按钮导航配置
    pageConfig: function() {
      return pageConfig.call(this, this.hasMenu, this.oaStatus)
    }
  },
  created() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.checkStatus = this.$route.query.checkStatus
      this.oaStatus = this.$route.query.oaStatus
      if (this.$route.query.oaStatus) {
        // 草稿
        this.examinePageUrl = 'MarginProcessingExamine'
      }
      if (this.checkStatus === 2 && !this.oaStatus) {
        this.examinePage = 'MarginProcessingExamine'
      }
      if (this.checkStatus === 3 && !this.oaStatus) {
        this.examinePage = 'MarginProcessingExamine'
      }
      const datas = { id: this.$route.query.id }
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
        if (res.detailedData && res.detailedData.tableData !== undefined && res.detailedData.tableData.length > 0) {
          that.formData.detailedData.tableData = res.detailedData.tableData
        }
        that.update++
      })
    },
    examineOver() {
      this.$router.push({ name: 'MarginProcessingList' })
    }
  }
}
</script>

/*
 * @Author: xueyx
 * @LastEditors: xueyx
 * @Description:应收减免新增编辑页
*/
<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="pageDetail"
      v-model="formData"
      :config="pageConfig"
      :has-menu="hasMenu"
      :update="update"
      :examine-page="OA?'ReceivableLightlyExamine':''"
      @comChange="comChange"
    >
      <!-- 操作  -->
      <template #btn>
        <ysn-btn v-if="!id || id===1 || id===6" class="mr-8" type="primary" @click="handlerClick">发起审核</ysn-btn>
        <ysn-btn v-if="!id || id===1 || !OA ||id===5 " class="mr-8" type="primary" @click="handlerClick">提交审核</ysn-btn>
        <ysn-btn class="mr-8" type="info" @click="handlerClick">暂存</ysn-btn>
        <ysn-confirm
          v-if="id"
          title="提示"
          width="484px"
          top="120px"
          :content="`是否确认删除?`"
          tip="此操作将永久删除,不可撤回,请谨慎操作"
          @confirm="deleteBox"
        >
          <ysn-btn class="mr-12" type="delete">删除</ysn-btn>
        </ysn-confirm>
        <AccessoryDialog>
          <ysn-btn type="reset">附件管理</ysn-btn>
        </AccessoryDialog>
      </template>
    </ysn-pageAccorDetail>

  </div>
</template>

<script>
import { approveApi } from '@/api'
import AccessoryDialog from './blocks/AccessoryDialog.vue'

import { pagesConfig } from './config'
export default {
  name: 'ReceivableLightlyAdd',
  components: {
    AccessoryDialog
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
      // 是否为OA数据
      OA: true
    }
  },
  created() {
    this.pageConfig = pagesConfig(this)
    if (this.$route.query.id) {
      const datas = {
        id: this.$route.query.id
      }
      this.id = this.$route.query.id
      this.receivableLightlyDetail(datas) // 详情数据接口
    }
  },
  mounted() {
  },
  methods: {
    // change事件
    comChange(val) {
      this.formData.countData.tableData = val
    },
    // 删除
    deleteBox() {
      this.$message({ message: '删除成功', type: 'success' })
      setTimeout(() => {
        this.$router.push({ name: 'ReceivableLightly' })
      }, 1000)
    },
    // 提交事件
    async handlerClick() {
      console.log(this.$refs.pageDetail)
      const res = await this.$refs.pageDetail.valiFormDate()
      if (res) {
        if (!this.moneyCompare()) {
          return
        }
        this.$message({ message: '操作成功', type: 'success' })
        setTimeout(() => {
          this.$router.push({ name: 'ReceivableLightly' })
        }, 1000)
      }
    },
    // 如果减免金额大于等于申请减免金额 则可以提交。反之不行。提示：申请减免金额超过可减免金额 不可减免。
    moneyCompare() {
      const list = this.$refs.pageDetail.currentFormData.countData.tableData
      if (!list || list.length === 0) {
        this.$message({ message: '请添加减免明细', type: 'error' })
        return
      }
      let derateAmountNum = 0 // 减免金额总和
      let applyDerateAmountNum = 0 // 申请减免金额总和
      list.forEach(item => {
        derateAmountNum += Number(item.DerateAmount)
        applyDerateAmountNum += Number(item.applyDerateAmount)
      })
      if (derateAmountNum >= applyDerateAmountNum) {
        return true
      } else {
        this.$message({ message: '申请减免金额超过可减免金额,不可减免', type: 'error' })
        return
      }
    },
    // 详情数据接口
    receivableLightlyDetail(datas) {
      const that = this
      approveApi.getReceivableLightlyDetail(datas).then(res => {
        that.OA = res.OA
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
    }

  }
}
</script>

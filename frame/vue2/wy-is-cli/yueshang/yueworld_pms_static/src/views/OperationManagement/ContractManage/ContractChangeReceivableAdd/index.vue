<!--
 * @Author: wyz
 * @LastEditors: fhj
 * @Description:合同变更-合同应收调整新增
-->
<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="pageDetail"
      v-model="formData"
      :config="pageConfig"
      :has-menu="hasMenu"
      :update="update"
      persmission="ContractChangeReceivableAdd"
      accessory="AgreementOfintent"
      @change="detailChange"
    >
      <!-- 操作按钮 -->
      <template #btn>
        <ysn-btn class="mr-12" @click="saveBox(1)">发起审核</ysn-btn>
        <ysn-btn class="mr-12" type="info" @click="saveBox(0)">暂存</ysn-btn>
      </template>
    </ysn-pageAccorDetail>
  </div>
</template>
<script>
import { contractChangeApi } from '@/api'
import { pageConfig } from './config'
export default {
  name: 'ContractChangeAdditionTermAdd',
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
        essentialData: {
          // 详情数据
          programName: '', // 项目名称
          contNo: '', // 合同编号
          brandName: '', // 品牌名称
          tenantName: '', // 商户名称
          contBeginDate: '', // 合同开始日期
          contEndDate: '', // 合同结束日期
          spaceName: '', // 铺位号
          spaceLeasableArea: '', // 计租面积（㎡）
          remark: '' // 变更原因
        },
        receivableDefinite: {
          tableData: [{
            receivableNo: '', // 应收编号
            feeName: '', // 费项
            paymentDate: '', // 账期
            financialDate: '', // 权责月
            changeFinancialDate: '', // 变更权责月
            receivableTime: '', // 应收日期
            changeReceivableTime: '', // 变更应收日期
            receivableAmount: '', // 应收金额(元)
            changeReceivableAmount: '', // 变更应收金额(元)
            subAmount: '' // 已减免金额
          }]
        },
        attachment: []
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
      this.contractChangeReceivableDetail(datas) // 详情数据接口
      this.editStatus = true
    }
  },
  methods: {
    // 获取详细数据
    contractChangeReceivableDetail(datas) {
      const that = this
      contractChangeApi.contractChangeReceivableDetail(datas).then(res => {
        if (res.essentialData) {
          that.formData.essentialData = res.essentialData
        }
        if (res.receivableDefinite) {
          that.formData.receivableDefinite = res.receivableDefinite
        }
        that.update++
      })
    },
    // 暂存
    saveBox(submitType) {
      const that = this
      if (!this.formData.essentialData.contNo) {
        that.$message({ message: '请先选择项目', type: 'warning' })
        return
      }
      this.$nextTick(async() => {
        // 校验是否符合规则
        const res = await this.$refs.pageDetail.valiFormDate()
        if (res) {
          if (that.editStatus) {
            that.formData.submitType = 2
            that.formData.id = that.id
          } else {
            that.formData.submitType = submitType
          }
          that.contractChangeReceivableSave(that.formData)
        }
      })
    },
    // 保存的请求
    contractChangeReceivableSave(datas) {
      const that = this
      contractChangeApi.contractChangeReceivableSave(datas).then(res => {
        if (res) {
          that.$message({ message: '提交成功', type: 'success' })
          setTimeout(() => {
            that.$router.go(-1)
          }, 1000)
        }
      })
    },
    // 数据变化事件
    detailChange(val) {
      this.formData = val
    }
  }
}
</script>

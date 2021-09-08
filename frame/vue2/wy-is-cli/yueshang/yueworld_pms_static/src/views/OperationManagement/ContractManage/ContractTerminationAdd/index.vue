<!--
 * @Author: wyz
 * @LastEditors: fhj
 * @Description:合同解约-新增
-->
<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="pageDetail"
      v-model="formData"
      :config="pageConfig"
      :has-menu="hasMenu"
      :update="update"
      persmission="ContractTerminationAdd"
      accessory="AgreementOfintent"
      @change="detailChange"
      @comChange="getFinancialData"
    >
      <!-- 操作按钮 -->
      <template #btn>
        <ysn-btn class="mr-12" @click="saveBox(1)">发起审核</ysn-btn>
        <ysn-btn class="mr-12" type="info" @click="saveBox(0)">暂存</ysn-btn>
        <ysn-confirm
          v-if="id!==0"
          title="提示"
          width="484px"
          top="120px"
          :content="`是否确认删除?`"
          tip="此操作将永久删除,不可撤回,请谨慎操作"
          @confirm="deleteBox"
        >
          <ysn-btn class="mr-12" type="delete">删除</ysn-btn>
        </ysn-confirm>
      </template>
    </ysn-pageAccorDetail>
  </div>
</template>
<script>
import { contractTerminationApi } from '@/api'
import { pageConfig } from './config'
export default {
  name: 'ContractTerminationAdd',
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
          remark: '' // 备注说明
        },
        financialData: {
          showDetail: false,
          tableData: [],
          balanceList: [{}],
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
    // 删除
    deleteBox() {
      const that = this
      const datas = {
        id: this.$route.query.id
      }
      contractTerminationApi.contractTerminationDelete(datas).then(res => {
        that.$message({ message: '删除成功', type: 'success' })
        setTimeout(() => {
          that.$router.go(-1)
        }, 1000)
      })
    },
    // 暂存
    saveBox(submitType) {
      const that = this
      if (!this.formData.programAndBusinessInfo.contNo) {
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
          that.contractTerminationSave(that.formData)
        }
      })
    },
    // 保存的请求
    contractTerminationSave(datas) {
      const that = this
      contractTerminationApi.contractTerminationSave(datas).then(res => {
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
    },
    // 获取到解约时间的财务信息
    getFinancialData() {
      const that = this
      const datas = {
        contFallDate: that.formData.programAndBusinessInfo.contFallDate,
        id: that.formData.programAndBusinessInfo.id
      }
      contractTerminationApi.contractTerminationFinancialData(datas).then(res => {
        if (res) {
          that.formData.financialData = res.financialData
          that.formData.financialData.showDetail = true
          that.update++
        }
      })
    }
  }
}
</script>

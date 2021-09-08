<!--
 * @Author: wyz
 * @LastEditors: fhj
 * @Description:合同变更-补充条款新增
-->
<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="pageDetail"
      v-model="formData"
      :config="pageConfig"
      :has-menu="hasMenu"
      :update="update"
      persmission="ContractChangeAdditionTermDetail"
      accessory-disable
      accessory="AgreementOfintent"
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
        termChange: {
          beforeChangeContTerms: '',
          afterChangeContTerms: '',
          tableData: [{
            changeItem: '变更前',
            contractTerm: ''
          }, {
            changeItem: '变更后',
            contractTerm: ''
          }]
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
      this.contractChangeAdditionTermDetail(datas) // 详情数据接口
      this.editStatus = true
    }
  },
  methods: {
    // 获取详细数据
    contractChangeAdditionTermDetail(datas) {
      const that = this
      contractChangeApi.contractChangeAdditionTermDetail(datas).then(res => {
        if (res.essentialData) {
          that.formData.essentialData = res.essentialData
        }
        if (res.termChange) {
          that.formData.termChange = res.termChange
          that.formData.termChange.tableData = [{
            changeItem: '变更前',
            contractTerm: ''
          }, {
            changeItem: '变更后',
            contractTerm: ''
          }]
        }
        that.update++
      })
    },
    auditRecord() {
      // this.$router.push({
      //   name: 'ContractTerminationExamine',
      //   query: {
      //     id: this.formData.programAndBusinessInfo.id
      //   }
      // })
    },
    // 数据变化事件
    detailChange(val) {
      this.formData = val
    }
  }
}
</script>

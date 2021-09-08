<!--
 * @Author: sdy
 * @LastEditors: sdy
 * @Description:暂收款转换单审核记录
-->
<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="ConversionDetail"
      v-model="formData"
      :config="pageConfig"
      :has-menu="hasMenu"
      :update="update"
      examine="ConversionDetail"
      @examineOver="examineOver"
    >
      <template #topLeft>
        <span class="mr-24">{{ formData.detailInfo.programName }}</span>
        <span class="mr-24">转出商家：{{ formData.detailInfo.rollTenantName }}</span>
        <span class="mr-24">转入商家：{{ formData.detailInfo.intoTenantName }}</span>
      </template>
    </ysn-pageAccorDetail>
  </div>
</template>

<script>
import { processingApi } from '@/api'
import { pageConfig } from './config'

export default {
  name: 'ConversionDetail',
  props: {},
  data() {
    return {
      update: 0, // 更新视图用
      hasMenu: false, // 是否显示左侧菜单
      //   左侧按钮导航配置
      pageConfig: pageConfig.call(this),
      // 进场装修详情页面id
      id: 1,
      // 统一数据
      formData: {
        detailInfo: { // 转换信息
          programName: '', // 项目名称
          rollTenantName: '', // 转出商家
          rollBrandName: '', // 转出品牌名
          intoTenantName: '', // 转入商家
          intoBrandName: '', // 转入品牌名
          ConversionDate: '', // 转换日期
          description: '' // 备注
        },
        listSecond: { // 转换明细
          tableData: []
        },
        lisThird: { // 冲抵核销明细
          tableData: [
            { feeName: '' },
            { receivableNo: '' },
            { receivableTime: '' },
            { financialDate: '' },
            { receivableAmount: '' },
            { applyDerateAmountTotal: '' },
            { unverifiedAmount: '' },
            { OffsetAmount: '' }
          ]
        }
      }
    }
  },
  created() {
    if (this.$route.query.id) {
      const datas = {
        id: this.$route.query.id
      }
      this.id = this.$route.query.id
      this.conversionDetails(datas) // 详情数据接口
    }
  },
  methods: {
    // 详情数据接口
    conversionDetails(datas) {
      const that = this
      processingApi.conversionDetails(datas).then(res => {
        if (res) {
          that.id = res.id
          that.formData.detailInfo = res.list[0]
          that.formData.listSecond.tableData = res.listSecond
          that.formData.lisThird.tableData = res.lisThird
        }
        that.update++
      })
    },
    // 同意驳回跳转
    examineOver() {
      this.$router.push({ name: 'Conversionlist' })
    }
  }
}
</script>


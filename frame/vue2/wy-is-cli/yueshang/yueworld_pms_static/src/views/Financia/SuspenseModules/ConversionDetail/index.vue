<!--
 * @Author: sdy
 * @LastEditors: sdy
 * @Description:转换单详情
-->
<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="ConversionDetail"
      v-model="formData"
      :config="pageConfig"
      :has-menu="hasMenu"
      :update="update"
    >
      <template #btn>
        <ysn-btn v-if="block" @click="navToExamine">审核记录</ysn-btn>
        <template v-if="examine">
          <ysn-btn class="mr-12" @click="AgreeClick()">同意</ysn-btn>
          <ysn-btn type="delete" class="mr-12" @click="Dismissed()">驳回</ysn-btn>
        </template>
      </template>
    </ysn-pageaccordetail>
    <!-- 同意弹窗 -->
    <AgreeAddDialog
      :is-show-dialog="AgreeAdd.visible"
      :form-data="AgreeAdd.record"
      @closeDialog="Object.assign(AgreeAdd, { visible: false, record: {} })"
    />
    <!-- 驳回弹窗 -->
    <DismissedAddDialog
      :is-show-dialog="DismissedAdd.visible"
      :form-data="DismissedAdd.notes"
      @closeDialog="Object.assign(DismissedAdd, { visible: false, notes: {} })"
    />
  </div>

</template>

<script>
import { processingApi } from '@/api'
import { pagesConfig } from './config'
import AgreeAddDialog from './blocks/AgreeAdd.vue'
import DismissedAddDialog from './blocks/DismissedAdd.vue'
export default {
  name: 'ConversionDetail',
  components: {
    AgreeAddDialog,
    DismissedAddDialog
  },
  props: {},
  data() {
    return {
      update: 0, // 更新视图用
      hasMenu: false, // 是否显示左侧菜单
      // 进场装修详情页面id
      id: 1,
      block: false,
      examine: true,
      // 统一数据
      formData: {
        detailInfo: { // 详情数据
          programName: '', // 项目名称
          rollTenantName: '', // 转出商家
          rollBrandName: '', // 转出品牌名
          intoTenantName: '', // 转入商家
          intoBrandName: '', // 转入品牌名
          ConversionDate: '', // 转换日期
          description: '' // 备注
        },
        listSecond: {
          tableData: []
        },
        lisThird: { tableData: [
          { feeName: '' },
          { receivableNo: '' },
          { receivableTime: '' },
          { financialDate: '' },
          { receivableAmount: '' },
          { applyDerateAmountTotal: '' },
          { unverifiedAmount: '' },
          { OffsetAmount: '' }
        ] },
        firstCountList: {
          tableData: []
        }
      },
      // 同意弹窗
      AgreeAdd: {
        visible: false,
        record: {}
      },
      // 驳回弹窗
      DismissedAdd: {
        visible: false,
        notes: {}
      }
    }
  },
  created() {
    this.pageConfig = pagesConfig(this)
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
    async handlerClick() {
    },
    AgreeClick(record) {
      Object.assign(this.AgreeAdd, { visible: true, record })
    },
    Dismissed(notes) {
      Object.assign(this.DismissedAdd, { visible: true, notes })
    },
    // 获取详情数据
    conversionDetails(datas) {
      const that = this
      processingApi.conversionDetails(datas).then(res => {
        if (res) {
          that.id = res.id
          that.formData.detailInfo = res.list[0]
          that.formData.listSecond.tableData = res.listSecond
          that.formData.lisThird.tableData = res.lisThird
          that.formData.firstCountList.tableData = res.listFourth
        }
        that.update++
        // 判断按钮线上
        if (this.id === 2 || this.id === 3) {
          this.block = true
          this.examine = false
        }
        if (this.id === 7) {
          this.examine = false
        }
      })
    },
    // 审批跳转
    navToExamine() {
      this.$router.push({ name: 'ConversionDetailExamine', query: { id: this.$route.query.id }})
    }
  }
}
</script>


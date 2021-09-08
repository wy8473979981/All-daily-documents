<!--
 * @Author: jllk
 * @LastEditors: jllk
 * @Description:付款核销单-详情审核通过
-->
<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="Receivable"
      v-model="formData"
      :config="pageConfig"
      :has-menu="hasMenu"
      :update="update"
      persmission="PaymentVerificationFormEdit"
    >
      <!-- 操作按钮 -->
      <template #btn>
        <ysn-btn class="mr-12" @click="AntiClick()">反核销</ysn-btn>
        <ysn-btn type="info" class="mr-12" @click="Object.assign(Managedialog, { visible: true, record: {} })">
          附件信息
        </ysn-btn>
      </template>
    </ysn-pageAccorDetail>
    <!--附件信息 -->
    <Managedialog
      :is-show-dialog="Managedialog.visible"
      :form-data="Managedialog.record"
      @closeDialog="Object.assign(Managedialog, { visible: false, record: {} })"
    />
  </div>
</template>

<script>
// 请求api
import { PayableApi } from '@/api'
import { pageConfig } from './config'
import Managedialog from './blocks/Managedialog.vue'
export default {
  name: 'PaymentVerificationFormEdit',
  components: { Managedialog },
  props: {},
  //   列表数据
  data() {
    return {
      update: 0, // 更新视图用
      hasMenu: false, // 是否显示左侧菜单
      //   左侧按钮导航配置
      pageConfig: pageConfig.call(this),
      // 进场装修详情页面id
      id: null,
      // 附加信息弹窗
      Managedialog: {
        visible: false,
        record: {}
      },
      // 统一数据
      formData: {
        baseInfo: {}, // 基本信息
        baseInfoPayment: {}, // 付款信息
        detailedData: { // 表格数据
          tableData: []
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
      this.receivableDetails(datas) // 详情数据接口
    }
  },
  methods: {
    // 详情数据接口
    receivableDetails(datas) {
      const that = this
      PayableApi.PaymentVerificationFormEdit(datas).then(res => {
        if (res) {
          that.formData.baseInfo = res.baseInfo
          that.formData.baseInfoPayment = res.baseInfoPayment
          that.formData.detailedData.tableData = res.detailedData
        }
        that.update++
      })
    },
    // 反核销点击事件
    AntiClick() {
      this.$router.push({ name: 'PaymentVerificationForm', query: { id: this.$route.query.id }})
    }

  }
}
</script>

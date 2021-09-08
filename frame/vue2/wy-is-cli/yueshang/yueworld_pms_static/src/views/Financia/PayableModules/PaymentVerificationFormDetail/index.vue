
<!--
 * @Author: jllk
 * @LastEditors: jllk
 * @Description:付款核销单-编辑驳回/红冲
-->
<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="pageDetail"
      v-model="formData"
      :config="pageConfig"
      :has-menu="hasMenu"
      :update="update"
      persmission="PaymentVerificationFormDetail"
    >

      <!-- 操作按钮 -->
      <template #btn>
        <ysn-btn class="mr-12" @click="save('save')">暂存</ysn-btn>
        <ysn-btn class="mr-12" @click="save('send-check')">重新提交</ysn-btn>
        <ysn-btn type="info" class="mr-12" @click="Object.assign(Managedialog, { visible: true, record: {} })">
          附件管理
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
import { PayableApi } from '@/api'
import { pageConfig } from './config'
import Managedialog from './blocks/Managedialog.vue'
export default {
  name: 'PaymentVerificationFormDetail',
  components: { Managedialog },
  props: {},
  data() {
    return {
      update: 0, // 更新视图用
      hasMenu: false, // 是否显示左侧菜单
      //   左侧按钮导航配置
      pageConfig: pageConfig.call(this),
      //   editStatus: false,
      // 详情id
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
        baseInfoBilling: {}, // 收款信息
        detailedData: { tableData: [] } // 表格数据
      }
    }
  },
  created() {
    if (this.$route.query.id) {
      const datas = {
        id: this.$route.query.id
      }
      this.id = this.$route.query.id
      this.decorationEnterDetailBox(datas) // 详情数据接口
    }
  },
  methods: {
    // 详情数据接口
    decorationEnterDetailBox(datas) {
      const that = this
      PayableApi.PaymentVerificationFormDetail(datas).then(res => {
        if (res) {
          that.formData.baseInfo = res.baseInfo
          that.formData.baseInfoPayment = res.baseInfoPayment
          that.formData.baseInfoBilling = res.baseInfoBilling
          that.formData.detailedData.tableData = res.detailedData
        }
        that.update++
      })
    },
    // 保存/重新提交点击事件
    save(type) {
      const that = this
      that.$nextTick(async() => {
        const res = await that.$refs.pageDetail.valiFormDate()
        if (res) {
          if (type === 'save') {
            that.formData.submitType = 0
          } else if (type === 'sand-check') {
            that.formData.submitType = 1
          }
          that.PaymentVerificationFormaddSubmit(that.formData)
        }
      })
    },
    PaymentVerificationFormaddSubmit(datas) {
      const that = this
      PayableApi.PaymentVerificationFormaddSubmit(datas).then(res => {
        if (res) {
          that.$message({ message: '提交成功', type: 'success' })
          setTimeout(() => {
            that.$router.go(-1)
          }, 1000)
        }
      })
    }
  }
}
</script>


<!--
 * @Author: jllk
 * @LastEditors: jllk
 * @Description:付款核销单-编辑草稿
-->
<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="pageDetail"
      v-model="formData"
      :config="pageConfig"
      :has-menu="hasMenu"
      :update="update"
      persmission="PaymentVerificationFormadd"
      @comChange="comChange"
    >

      <!-- 操作按钮 -->
      <template #btn>
        <ysn-btn class="mr-12" type="primary" @click="save('send-check')">提交审核</ysn-btn>
        <ysn-btn class="mr-12" @click="save('save')">暂存</ysn-btn>
        <ysn-btn type="info" class="mr-12" @click="Object.assign(Managedialog, { visible: true, record: {} })">
          附件管理
        </ysn-btn>
        <ysn-confirm
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
    <!--附件管理 -->
    <Managedialog
      :is-show-dialog="Managedialog.visible"
      :form-data="Managedialog.record"
      @closeDialog="Object.assign(Managedialog, { visible: false, record: {} })"
    />
  </div>
</template>
<script>
// 请求apiManagedialog
import { PayableApi } from '@/api'
import { pageConfig } from './config'
import Managedialog from './blocks/Managedialog.vue'
export default {
  name: 'PaymentVerificationFormadd',
  components: { Managedialog },
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
      // 附件管理弹窗
      Managedialog: {
        visible: false,
        record: {}
      },
      // 统一数据
      formData: {
        baseInfo: {},
        baseInfoPayment: {},
        detailedData: {
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
      this.decorationEnterDetailBox(datas) // 详情数据接口
      this.editStatus = true
    }
  },
  methods: {
    // change事件
    comChange(val) {
      this.formData.detailedData.tableData = val
    },
    // 暂存和提交审核按钮点击事件
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
    },
    // 删除
    deleteBox() {
      this.$message({ message: '删除成功', type: 'success' })
      setTimeout(() => {
        this.$router.push({ name: 'PaymentVerificationForm' })
      }, 1000)
    },
    // 详情数据接口
    decorationEnterDetailBox(datas) {
      const that = this
      PayableApi.PaymentVerificationFormadd(datas).then(res => {
        if (res) {
          that.formData.baseInfo = res.baseInfo
          that.formData.baseInfoPayment = res.baseInfoPayment
          that.formData.baseInfoBilling = res.baseInfoBilling
          that.formData.detailedData.tableData = res.detailedData
        }
        that.update++
      })
    }
  }
}
</script>

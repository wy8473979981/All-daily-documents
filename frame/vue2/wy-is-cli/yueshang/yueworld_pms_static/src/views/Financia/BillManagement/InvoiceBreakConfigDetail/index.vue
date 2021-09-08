/*
 * @Author: xueyx
 * @LastEditors: xueyx
 * @Description:
*/

<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="pageDetail"
      v-model="formData"
      :config="pageConfig"
      :has-menu="false"
      :update="update"
      @comChange="comChange"
    >
      <!-- 操作按钮 -->
      <template #btn>
        <ysn-btn class="mr-8" @click="saveEvent">保存</ysn-btn>
        <ysn-btn class="mr-8" type="info" @click="copyEvent" v-if="!isCopy">复制</ysn-btn>
<!--        <span class="mr-8 plain-bt" @click="deleteEvent">删除</span>-->
        <ysn-confirm
            v-if="$route.query.id && !isCopy"
            title="提示"
            width="484px"
            top="120px"
            :content="`是否确认删除?`"
            tip="此操作将永久删除,不可撤回,请谨慎操作"
            @confirm="deleteEvent"
        >
          <ysn-btn class="mr-12" type="delete">删除</ysn-btn>
        </ysn-confirm>
      </template>
    </ysn-pageAccorDetail>
  </div>
</template>

<script>
import { pageConfig, getInvoiceBreakConfigDetail } from './config'
export default {
  name: 'InvoiceListDetail',
  data() {
    return {
      update: 0, // 更新视图用
      isCopy: false, // 是否点击复制按钮
      //   左侧按钮导航配置
      pageConfig: pageConfig.call(this),
      formData: {
        baseInfo: { // 基本信息
          ruleName: '', // 模板名称
          createdDate: '', // 创建时间
          updated: ''// 更新时间
        },
        rulesInfo: {
          levelId: '', // 模板级别
          programName: '', // 项目名称
          accountName: '', // 套账
          ruleTypes: [], // 模板类别
          limit: ''// 限额
        }
      }
    }
  },
  created() {
    if (this.$route.query.id) {
      this.invoiceBreakConfigDetail({
        id: this.$route.query.id
      }) // 详情数据接口
    }
  },
  methods: {
    /**
    * @method invoiceOfListDetail
    * @returns  null
    * @desc 详情数据接口
    */
    async invoiceBreakConfigDetail(datas) {
      const res = await getInvoiceBreakConfigDetail(datas)
      this.formData.baseInfo = res.baseInfo
      this.formData.rulesInfo = res.rulesInfo
      this.update++
    },
    /**
    * @method saveEvent
    * @returns
    * @desc ⽅法描述
    */
    async saveEvent() {
      const res = await this.$refs.pageDetail.valiFormDate()
      if (res) {
        this.$message.success('操作成功')
        this.$router.push({ name: 'InvoiceBreakConfig' })
      }
    },
    /**
    * @method copyEvent
    * @returns
    * @desc ⽅法描述
    */
    async copyEvent() {
      // console.log('copyEvent', await this.validateForm(), this.formData)
      this.isCopy = true
    },
    /**
    * @method deleteEvent
    * @returns
    * @desc ⽅法描述
    */
    deleteEvent() {
      // console.log('deleteEvent', await this.validateForm(), this.formData)
      this.$message.success('删除成功')
      this.$router.push({ name: 'InvoiceBreakConfig' })
    },
    comChange(val) {
      this.formData = { ...this.formData, ...val }
      this.update++
    }
  }
}
</script>
<style lang="scss">
.plain-bt {
  color: #6F120C;
  line-height: 32px;
  cursor: pointer;
}
</style>

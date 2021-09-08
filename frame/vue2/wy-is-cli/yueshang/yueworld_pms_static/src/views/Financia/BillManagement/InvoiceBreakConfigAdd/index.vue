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
      </template>
    </ysn-pageAccorDetail>
  </div>
</template>

<script>
import { pageConfig } from './config'
export default {
  name: 'InvoiceBreakConfigAdd',
  data() {
    return {
      update: 0, // 更新视图用
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
  },
  methods: {
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
  line-height: 32px
}
</style>

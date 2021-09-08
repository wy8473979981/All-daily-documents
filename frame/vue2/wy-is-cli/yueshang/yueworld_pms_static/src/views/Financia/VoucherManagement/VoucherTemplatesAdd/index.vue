/*
 * @Author: xiaoxie
 * @Date: 2021-08-03 14:48:16
 * @Last Modified by: xiaoxie
 * @Last Modified time: 2021-08-25 10:25:10
 */
<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="pageDetail"
      v-model="formData"
      :config="pageConfig"
      :has-menu="hasMenu"
      :update="update"
      @change="detailChange"
    >
      <!-- 操作按钮 -->
      <template #btn>
        <ysn-btn class="mr-12" @click="saveBox">保存</ysn-btn>
        <ysn-btn v-if="editStatus" class="mr-12" @click="copyClick">复制</ysn-btn>
        <ysn-confirm
          v-if="editStatus"
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
import { meterApi } from '@/api/voucherTemplatesAdd'
import { pageConfig } from './config'
export default {
  name: 'VoucherTemplatesAdd',
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
        // 基本信息
        baseInfo: {
          templateNumber: '', // 模板名称
          creatDate: '', // 创建时间
          update: '' // 修改时间
        },
        // 匹配规则
        formMatchData: {
          ibTypeId: '', // 收付类型
          storeTypes: '', // 铺位类型
          paymentTypeName: '', // 收款方式
          derateType: '', // 减免类型
          levelId: '', // 模板级别
          accountName: '', // 账套名称
          isAgentReceivced: '', // 是否代收
          isBackAgentReceivced: '', // 是否被代收
          isBeforVer: '', // 是否提前核销
          isAfterPaid: '', // 是否后付
          abstract: '', // 征收类型
          isInvoice: '', // 是否已开票
          spaceEquityNature: '' // 产权性质
        },
        functionData: {
          isSplit: '', // 是否拆分
          splitType: '', // 拆分类型
          isMerge: '', // 是否合并分录
          mergRule: '', // 合并规则
          mergRuleArr: [], // 合并规则数组
          isOffset: '' // 是否冲抵
        },
        // 分录规则
        entryRulesData: {
          tableData: [
          ] // 表格数据
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
      this.voucherTemplatesEdit(datas) // 详情数据接口
      this.editStatus = true
    }
  },
  methods: {
    // 暂存
    saveBox(submitType) {
      const that = this
      this.$nextTick(async() => {
        // 校验是否符合规则
        const res = await this.$refs.pageDetail.valiFormDate()
        if (res) {
          that.savefeeBox(that.formData)
        }
      })
    },
    // 保存的请求
    savefeeBox(datas) {
      const that = this
      meterApi.feeSave(datas).then(res => {
        if (res.code === 200) {
          that.$message({
            message: '保存成功',
            type: 'success'
          })
          that.$router.push({ name: 'VoucherTemplates' })
        }
      })
    },
    // 根据ID查找数据
    voucherTemplatesEdit(data) {
      const that = this
      meterApi.details(data).then(res => {
        if (res) {
          that.formData = res
          that.update++
        }
      })
    },
    // 删除
    deleteBox() {
      const that = this
      meterApi.delete({ id: this.id }).then(res => {
        if (res.code === '200') {
          that.$message({
            message: '删除成功',
            type: 'success'
          })
          that.$router.push({ name: 'VoucherTemplates' })
        }
      })
    },
    // 详情数据变化
    detailChange(form) {
      console.log(form)
      this.formData = { ...form }
    },
    // 复制
    copyClick() {

    }
  }
}
</script>

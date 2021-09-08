<!--
 * @Author: fzx
 * @LastEditors: fzx
 * @Description:核销单-新增
-->
<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="pageDetail"
      v-model="formData"
      :config="pageConfig"
      :has-menu="hasMenu"
      :update="update"
    >
      <!-- 操作按钮 -->
      <template #btn>
        <ysn-btn v-if="!isApproved" @click="agree">同意</ysn-btn>
        <ysn-btn v-if="!isApproved" class="ml-8" type="delete" @click="bohui">驳回</ysn-btn>
        <ysn-btn v-if="isApproved" @click="reverse">反核销</ysn-btn>
      </template>
    </ysn-pageAccorDetail>
  </div>
</template>
<script>
// 请求api
import { collectionList } from '@/api'
import { pageConfig } from './config'

export default {
  name: 'VerificationDetails',
  props: {},
  data() {
    return {
      isApproved: false,
      id: 0,
      hasMenu: true, // 是否显示左侧菜单
      flag: false,
      // 统一数据
      formData: {
        essential: {},
        collectionInformation: { },
        business: {},
        provisionalCollection: {
          tableData: []
        },
        offset: {
          tableData: []
        },

        receivableDeduction: {
          tableData: []
        },
        writeOffDetails: {
          tableData: []
        },
        writeOffHistory: {
          tableData: []
        }
      },
      update: 0
    }
  },
  created() {
    this.pageConfig = pageConfig(this)
    // 审核状态
    var status = Number(this.$route.query.status)
    // status=1为审核通过
    if (status === 1) {
      this.isApproved = true
    }
    this.id = this.$route.query.id
    if (this.$route.query.id) {
      this.isEdit = true
      const datas = {
        id: this.$route.query.id
      }
      this.verificationDetails(datas) // 详情数据接口
    }
  },
  methods: {
    // 详情数据接口
    verificationDetails(datas) {
      const that = this
      collectionList.verificationDetails(datas).then(res => {
        if (res) {
          that.formData = res.list
        }
        that.update++
      })
    },
    agree() {
      this.$message.success({ message: '操作成功' })
      this.$router.push({ name: 'VerificationList' })// 跳转到核销单列表页
    },
    bohui() {
      this.$message.success({ message: '驳回成功' })
      this.$router.push({ name: 'VerificationList' })// 跳转到核销单列表页
    },
    // 反核销
    reverse() {
      this.$message.success({ message: '反核销成功' })
      this.$router.push({ name: 'VerificationList' })// 跳转到核销单列表页
    }
  }
}
</script>

/*
 * @Author: xueyx
 * @LastEditors: xueyx
 * @Description:欠费明细
*/
<template>
  <div>
    <ysn-dialog
      :title="'推送滞纳金'"
      :width="'1012px'"
      :top="'120px'"
      :is-show-dialog="isShowDialog"
      :external="isShowDialog"
      :is-determine="false"
      :is-cancel="false"
      :out-close="outClose"
      @closeDialog="closeDialog"
    >
      <template #contain>
        <div>
          <div class=" title pb-8">滞纳金明细</div>
          <!-- 表格 -->
          <ysn-formTable
            ref="rulesForm"
            v-model="list"
            prop="tableData"
            :column="tableConfig"
            :first-row-add="false"
          />
          <!-- 分页组件 -->
          <ysn-page
            :page="page"
            :total="list.tableData.length"
          />
        </div>
      </template>
      <template #btn>
        <ysn-btn class="mr-8" type="primary" @click="sureBtn">推送滞纳金</ysn-btn>
      </template>
    </ysn-dialog>
  </div>
</template>
<script>
import { approveApi } from '@/api'
import { tableConfigDialog } from '../config'
export default {
  name: 'LateFeeDialog',
  components: { },
  props: {
    isShowDialog: { type: Boolean, default: false } // 弹窗控制
  },
  // 表单数据
  data() {
    return {
      outClose: true, // 关闭弹窗
      tableConfig: tableConfigDialog.call(this),
      // 推送滞纳金数据
      list: {
        tableData: []
      },
      page: {
        pageNo: 1,
        pageSize: 10
      }
    }
  },
  mounted() {
    approveApi.getDuePlatformPush().then(res => { // 获取弹窗数据
      this.list.tableData = res.list
    })
  },
  methods: {
    // 确定按钮
    sureBtn() {
      this.$message({
        type: 'success',
        message: '推送成功'
      }, 2000)
      this.closeDialog()
    },
    // 关闭
    closeDialog() {
      this.$emit('closeDialog')
    }
  }
}
</script>
<style scoped>
.title{
    color:#050101;
    font-size:14px;
    font-weight: bold;
}
</style>

<template>
  <div>
    <ysn-dialog
      title="净销售额调整"
      :is-show-dialog="isShowDialog"
      :external="isShowDialog"
      :out-close="outClose"
      width="1000px"
      @closeDialog="closeDialog"
    >
      <template #contain>
        <ysn-pageAccorDetail
          ref="pageDetail"
          v-model="currentFormData"
          :config="netSalesVolumeConfig"
          :has-menu="hasMenu"
          :update="update"
          :hidden-btn="true"
          @comChange="detailChange"
        />
      </template>
      <template #btn>
        <div class="text-right">
          <ysn-btn class="mr-8" @click="preservation">提交调整</ysn-btn>
        </div>
      </template>
    </ysn-dialog>
  </div>
</template>

<script>

import { netSalesVolumeConfig } from './config'

export default {
  name: 'NetSalesVolumeChange',
  props: {
    isShowDialog: { type: Boolean, default: false }, // 弹窗控制
    formData: { type: Object, default: () => {} }
  },
  data() {
    return {
      outClose: true,
      hasMenu: false,
      update: 0,
      netSalesVolumeConfig: netSalesVolumeConfig.call(this),
      currentFormData: {},
      commitData: {}
    }
  },
  watch: {
    formData: {
      deep: true,
      immediate: true,
      handler(val) {
        this.currentFormData = JSON.parse(JSON.stringify(val))
      }
    }
  },
  methods: {
    closeDialog() {
      this.$emit('closeDialog')
    },
    detailChange(val) {
      this.currentFormData.netSalesVolume.tableList[0] = val
    },
    preservation() {
      (this.$refs.pageDetail.$refs.netSalesVolume[0].$refs.formTable.validate(res => {
        if (this.currentFormData.netSalesVolume.tableList[0].attachment.length <= 0) {
          this.$message.warning('请上传附件')
          return
        }
        if (res) {
          this.$emit('commitChange', this.currentFormData.netSalesVolume.tableList[0])
        }
      }))
    }
  }
}
</script>

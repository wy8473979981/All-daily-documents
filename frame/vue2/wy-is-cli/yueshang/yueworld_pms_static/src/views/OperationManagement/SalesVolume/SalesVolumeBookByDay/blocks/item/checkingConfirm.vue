<template>
  <div>
    <ysn-dialog
      title="详情"
      :is-show-dialog="isShowDialog"
      :external="isShowDialog"
      :out-close="outClose"
      width="400px"
      @closeDialog="closeDialog"
    >
      <template #contain>
        <div>
          <!-- <el-form ref="rulesForm" label-position="left">
            <ysn-formItem :form="currentFormData" :column="1" :config="tableConfig" label-position="left" />
          </el-form> -->
          <el-table
            :data="currentFormData.tableList"
          >
            <el-table-column
              prop="classification"
              label=""
              width="180"
            />
            <el-table-column
              prop="confirmSalesVolumeOld"
              label="原"
            />
            <el-table-column
              prop="confirmSalesVolumeNew"
              label="现"
            />
          </el-table>
          <div class="ysn-form text" style="margin-top:10px">
            修改理由：{{ currentFormData.resonForChange }}
          </div>
        </div>
      </template>
      <template #btn />
    </ysn-dialog>
  </div>
</template>

<script>

export default {
  name: 'CheckingConfirm',
  props: {
    isShowDialog: { type: Boolean, default: false }, // 弹窗控制
    formData: { type: Object, default: () => {} }
  },
  data() {
    return {
      outClose: true,
      currentFormData: {}
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
    preservation() {
      this.$emit('preservation')
    }
  }
}
</script>

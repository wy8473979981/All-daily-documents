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
          <el-form ref="rulesForm" :model="currentFormData" label-position="left">
            <ysn-formItem :form="currentFormData" :column="1" :config="tableConfig" label-position="left" />
          </el-form>
        </div>
      </template>
      <template #btn>
        <ysn-btn @click="onChange">确认</ysn-btn>
      </template>
    </ysn-dialog>
  </div>
</template>

<script>

export default {
  name: 'CheckConfirm',
  props: {
    isShowDialog: { type: Boolean, default: false }, // 弹窗控制
    formData: { type: Object, default: () => {} }
  },
  data() {
    return {
      outClose: true,
      currentFormData: {},
      tableConfig: []
    }
  },
  watch: {
    formData: {
      deep: true,
      immediate: true,
      handler(val) {
        this.formatList()
      }
    }
  },
  methods: {
    closeDialog() {
      this.$emit('closeDialog')
    },
    formatList() {
      this.tableConfig = []
      this.formData.tableList.forEach(e => {
        this.$set(this.currentFormData, e.classificationNo, e.confirmSalesVolume)
        // this.currentFormData['confirmSalesVolume' + i] = e.confirmSalesVolume
        this.tableConfig.push({
          label: e.classification + '(元)：',
          prop: e.classificationNo.toString(),
          itemType: 'input',
          inputType: 'Number',
          type: 'money',
          required: true
        })
      })
      this.currentFormData.id = this.formData.id
      this.currentFormData.idx = this.formData.idx
    },
    onChange() {
      this.$refs.rulesForm.validate(res => {
        if (res) {
          this.$emit('commitChange', this.currentFormData)
        }
      })
    }
  }
}
</script>

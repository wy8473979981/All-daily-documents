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
          <el-form ref="rulesForm" label-position="left">
            <ysn-formItem :form="currentFormData" :column="1" :config="tableConfig" label-position="left" />
          </el-form>
        </div>
      </template>
      <template #btn />
    </ysn-dialog>
  </div>
</template>

<script>

export default {
  name: 'CheckVolumeTwo',
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
        // this.currentFormData = JSON.parse(JSON.stringify(val))
        this.formatList()
      }
    }
  },
  methods: {
    closeDialog() {
      this.$emit('closeDialog')
    },
    preservation() {
      this.$emit('preservation')
    },
    formatList() {
      this.tableConfig = []
      this.formData.tableList.forEach((e, i) => {
        this.tableConfig.push({
          label: e.classification + '(元)：',
          prop: i.toString(),
          itemType: 'text'
        })
        this.currentFormData[i] = e.volumeTwo
      })
    }
  }
}
</script>

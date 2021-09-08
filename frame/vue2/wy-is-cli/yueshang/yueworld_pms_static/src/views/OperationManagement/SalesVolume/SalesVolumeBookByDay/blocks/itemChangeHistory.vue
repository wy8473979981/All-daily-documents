<template>
  <div>
    <ysn-dialog
      title="历史调整记录"
      :is-show-dialog="isShowDialog"
      :external="isShowDialog"
      :out-close="outClose"
      width="1000px"
      @closeDialog="closeDialog"
    >
      <template #contain>
        <div>
          <ysn-table
            :checkbox="false"
            :data="currentFormData.tableList"
            :column="tableConfig"
            :show-operation="false"
          />
        </div>
      </template>
      <template #btn />
    </ysn-dialog>
  </div>
</template>

<script>

export default {
  name: 'ItemChangeHistory',
  props: {
    isShowDialog: { type: Boolean, default: false }, // 弹窗控制
    formData: { type: Object, default: () => {} }
  },
  data() {
    return {
      outClose: true,
      hasMenu: false,
      update: 0,
      currentFormData: {},
      tableConfig: [
        { reviseDate: '调整日期', itemType: 'text' },
        { confirmSalesVolumeOld: '原复核销售额(元)', itemType: 'text' },
        { confirmSalesVolumeNew: '修改后销售额(元)', itemType: 'text' },
        { difference: '差额(元)', itemType: 'text' },
        { resonForChange: '修改理由', itemType: 'text' }
      ]
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
    }
  }
}
</script>

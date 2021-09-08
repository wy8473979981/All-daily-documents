<template>
  <div>
    <ysn-dialog
      title="变更金额调整"
      :is-show-dialog="isShowDialog"
      :external="isShowDialog"
      :out-close="outClose"
      width="1000px"
      @closeDialog="closeDialog"
    >
      <template #contain>
        <div>
          <ysn-formTable
            ref="formTable"
            v-model="currentFormData"
            prop="tableList"
            :type="1"
            :column="tableConfig"
            :show-operation="false"
            :rules="tableRule"
          />
        </div>
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
import { formatNumber } from '@/utils/index'

export default {
  name: 'ItemChange',
  props: {
    isShowDialog: { type: Boolean, default: false }, // 弹窗控制
    formData: { type: Object, default: () => {} }
  },
  data() {
    return {
      outClose: true,
      hasMenu: false,
      update: 0,
      currentFormData: {
        tableList: []
      },
      tableConfig: [
        { confirmSalesVolumeOld: '原复核销售额(元)', itemType: 'text', width: '150px', formatter: item => { return formatNumber(item.confirmSalesVolumeOld) } },
        { confirmSalesVolumeNew: '修改后销售额(元)', itemType: 'input', type: 'money', inputType: 'Number', width: '150px', required: true, listeners: { input: this.onChange }},
        { difference: '差额(元)', itemType: 'text' },
        { resonForChange: '修改理由', itemType: 'input', width: '150px', required: true },
        { attachment: '附件', itemType: 'fileUpload', actionUrl: '', span: 2, required: true, width: '150px', canOperate: true }
      ],
      tableRule: {
        confirmSalesVolumeNew: [{ required: true, message: '请填写修改后销售额' }],
        resonForChange: [{ required: true, message: '请填写修改理由' }],
        attachment: [{ required: true, message: '请选择附件' }]
      }
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
      this.$refs.formTable.validate(res => {
        if (this.currentFormData.tableList[0].attachment.length <= 0) {
          this.$message.warning('请上传附件')
          return
        }
        if (res) {
          this.$emit('commitChange', Object.assign(this.currentFormData.tableList[0], { id: this.formData.id, idx: this.formData.idx }))
        }
      })
    },
    onChange() {
      this.currentFormData.tableList[0].difference = this.accSub(this.currentFormData.tableList[0].confirmSalesVolumeNew, this.currentFormData.tableList[0].confirmSalesVolumeOld)
    },
    accSub(arg1, arg2) {
      var r1, r2, max, min
      try { r1 = arg1.toString().split('.')[1].length } catch (e) { r1 = 0 }
      try { r2 = arg2.toString().split('.')[1].length } catch (e) { r2 = 0 }
      max = Math.pow(10, Math.max(r1, r2))
      // 动态控制精度长度
      min = (r1 >= r2) ? r1 : r2
      return ((arg1 * max - arg2 * max) / max).toFixed(min)
    }
  }
}
</script>

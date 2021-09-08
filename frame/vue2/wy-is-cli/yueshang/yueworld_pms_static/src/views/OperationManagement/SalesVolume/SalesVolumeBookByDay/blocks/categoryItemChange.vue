<template>
  <div>
    <ysn-dialog
      title="变更金额对比"
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
          >
          <!-- <ysn-formTable
            :checkbox="false"
            :data="currentFormData.tableList"
            :column="tableConfig"
            :show-operation="false"
            v-bind="tableOrderConfig"
          > -->
            <!-- <template #resonForChange="scope">
              <div class="ysn-form text">
                <el-input v-model="currentFormData.tableList[scope.$index].resonForChange" />
              </div>
            </template>
            <template #confirmSalesVolumeNew="scope">
              <div class="ysn-form text">
                <el-input
                  v-model="currentFormData.tableList[scope.$index].confirmSalesVolumeNew"
                  v-onlyNumber="{model:['currentFormData','tableList',scope.$index,'confirmSalesVolumeNew']}"
                  @change="onChange(scope)"
                />
              </div>
            </template>
            <template #fj>
              <ysn-btn type="text">
                上传
              </ysn-btn>
            </template> -->
          </ysn-formTable>
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
  name: 'CategoryItemChange',
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
        { classification: '品类', itemType: 'text' },
        { confirmSalesVolumeOld: '原复核销售额(元)', itemType: 'text', width: '150px', formatter: item => { return formatNumber(item.confirmSalesVolumeOld) } },
        { confirmSalesVolumeNew: '修改后销售额(元)', itemType: 'input', type: 'money', inputType: 'Number', width: '150px', required: true, listeners: { input: this.onChange }},
        { difference: '差额(元)', itemType: 'text' },
        { resonForChange: '修改理由', itemType: 'input', width: '150px', required: true },
        { attachment: '附件', itemType: 'fileUpload', actionUrl: '', span: 2, required: true, width: '150px', canOperate: true }
      ],
      tableOrderConfig: {
        checkbox: false, // 继承el-table所有属性,ysn-table的属性
        showOperation: false,
        operationWidth: '200',
        showSlots: ['fj', 'confirmSalesVolumeNew', 'resonForChange']
      },
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
        val.tableList.forEach((e, i) => {
          const item = {
            classification: e.classification,
            confirmSalesVolumeOld: e.confirmSalesVolume,
            confirmSalesVolumeNew: '',
            difference: '',
            resonForChange: '',
            classificationNo: e.classificationNo,
            attachment: e.attachment,
            index: i
          }
          this.$set(this.currentFormData.tableList, i, item)
        })
      }
    }
  },
  methods: {
    closeDialog() {
      this.$emit('closeDialog')
    },
    preservation() {
      this.$refs.formTable.validate(res => {
        if (res) {
          this.$emit('commitChange', this.currentFormData)
        }
      })
    },
    onChange(item) {
      this.currentFormData.tableList[item.index].difference = this.accSub(item.confirmSalesVolumeNew, item.confirmSalesVolumeOld)
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

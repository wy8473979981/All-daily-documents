<template>
  <div>
    <!-- 表格 -->
    <ysn-formTable
      ref="formTable"
      v-model="currentFormData"
      prop="tableList"
      :checkbox="false"
      :type="1"
      :column="tableConfig"
      :show-operation="false"
      :rules="tableRule"
    >
      <!-- <template #resonForChange>
        <div class="ysn-form text">
          <el-input v-model="currentFormData.tableList[0].resonForChange" @change="resonForChangeUpdate" />
        </div>
      </template> -->
      <!-- <template #netSalesVolumeNew>
        <div class="ysn-form text">
          <el-input
            v-model="currentFormData.tableList[0].netSalesVolumeNew"
            v-onlyNumber="{model:['currentFormData','tableList', 0,'netSalesVolumeNew']}"
            @change="netSalesVolumeChange"
          />
        </div>
      </template> -->
    </ysn-formTable>
  </div>
</template>

<script>
import pageAccorDetailCom from '@mixins/pageAccorDetailCom'
import { formatNumber } from '@/utils/index'

export default {
  name: 'NetSalesVolumeForm',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'netSalesVolume',
    event: 'change'
  },
  props: {
    netSalesVolume: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      tableConfig: [
        { netSalesVolumeOld: '原净销售额(元)', itemType: 'text', width: '150px', formatter: item => { return formatNumber(item.netSalesVolumeOld) } },
        { netSalesVolumeNew: '修改后净销售额(元)', itemType: 'input', type: 'money', inputType: 'Number', required: true, width: '150px', listeners: { input: this.netSalesVolumeChange }},
        { difference: '差额(元)', itemType: 'text', width: '150px' },
        { resonForChange: '修改理由', itemType: 'input', required: true, width: '150px' },
        { attachment: '附件', itemType: 'fileUpload', actionUrl: '', span: 2, required: true, width: '150px', canOperate: true }
      ],
      tableRule: {
        netSalesVolumeNew: [{ required: true, message: '请填写修改后净销售额' }],
        resonForChange: [{ required: true, message: '请填写修改理由' }],
        attachment: [{ required: true, message: '请选择附件' }]
      }
    }
  },
  methods: {
    netSalesVolumeChange() {
      this.currentFormData.tableList[0].difference = this.accSub(this.currentFormData.tableList[0].netSalesVolumeNew, this.currentFormData.tableList[0].netSalesVolumeOld)
      this.$emit('comChange', this.currentFormData.tableList[0])
    },
    resonForChangeUpdate() {
      this.$emit('comChange', this.currentFormData.tableList[0])
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


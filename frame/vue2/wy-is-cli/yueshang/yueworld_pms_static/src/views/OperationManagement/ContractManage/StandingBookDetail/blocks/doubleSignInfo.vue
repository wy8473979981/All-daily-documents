<!--
 * @Author: wyz
 * @LastEditors: fhj
 * @Description: 合同变更-预览-保证金
-->

<template>
  <div v-if="currentFormData.tableList !==undefined && currentFormData.tableList.length > 0 ">
    <ysn-formTable
      :key="index"
      ref="formTable"
      v-model="currentFormData"
      prop="tableList"
      :type="1"
      :column="formTableConfig"
      :rules="formTableRules"
    />
    <div class="mt-16" style="float:right">
      <ysn-btn v-if="showConfig" @click="send">确认</ysn-btn>
    </div>
  </div>
</template>

<script>
import pageAccorDetailCom from '@mixins/pageAccorDetailCom'
import { standingBookApi } from '@/api'

export default {
  name: 'DoubleSignInfoTable',
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'doubleSignInfo',
    event: 'change'
  },
  props: {
    doubleSignInfo: {
      type: Object, default: () => {}
    }
  },
  data() {
    return {
      index: 1,
      contractStates: '',
      showConfig: false,
      formTableRules: { // 表单验证
        doubleSignDate: [{ required: true, message: '请选择双签日期' }],
        attachment: [{ required: true, message: '请选择附件' }]
      },
      formTableConfig: [ // 表单配置
        { doubleSignDate: '双签日期', sortable: false, itemType: 'datePicker', required: true, fixedWidth: 206 },
        { attachment: '附件', itemType: 'fileUpload', actionUrl: '', span: 2, required: true }
      ]
    }
  },
  mounted() {
    this.contractStates = this.$route.query.contractStates
    this.showConfig = this.contractStates === '待审核'
    this.$set(this.formTableConfig[1], 'canOperate', this.showConfig)
    for (let i = 0; i < this.currentFormData.tableList[0].attachment.length; i++) {
      this.$set(this.currentFormData.tableList[0].attachment[i], 'canOperate', false)
    }
    if (!this.showConfig) {
      this.$set(this.formTableConfig[0], 'itemType', 'text')
    }
  },
  methods: {
    send() {
      this.$refs['formTable'].validate((valid) => {
        if (this.currentFormData.tableList[0].attachment.length <= 0) {
          this.$message.warning('请上传附件')
          return
        }
        if (valid) {
          const datas = {
            id: this.$route.query.id,
            doubleSignDate: this.currentFormData.tableList[0].doubleSignDate
          }
          standingBookApi.standingBookDoubleSignPush(datas).then(res => {
            if (res) {
              if (res.success) {
                for (let i = 0; i < this.currentFormData.tableList[0].attachment.length; i++) {
                  this.$set(this.currentFormData.tableList[0].attachment[i], 'canOperate', false)
                }
                this.index++
                this.currentFormData.hasSend = true
                this.$message.success('推送成功')
              }
            }
          })
        }
      })
    }
  }
}
</script>


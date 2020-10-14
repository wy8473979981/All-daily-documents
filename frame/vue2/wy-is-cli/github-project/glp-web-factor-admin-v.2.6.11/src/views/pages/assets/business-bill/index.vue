<template>
  <div>
    <breadcrumb />
    <query-form :def="formDefs" @query="onQuery" ref="form"></query-form>
    <query-table
      :columns="columns"
      ref="tb"
      title="业务单据列表"
      api="/backend/claim/queryBaseClaimList"
      class="mt-4"
      row-key="claimNumber"
      :checkedRows.sync="checkedRows"
    >
      <template v-slot:extra="{ checkedRows }">
        <el-button
          type="primary"
          size="small"
          :loading="loading"
          :disabled="checkedRows==0"
          @click="onInvalidBaseClaim(checkedRows)"
        >作废</el-button>
      </template>
      <template v-slot:opt="{row}">
        <el-button type="text" size="small" @click="onLink(row)">详情</el-button>
      </template>
    </query-table>
    <el-dialog title="业务单据作废" :visible.sync="dialogVisible" width="500px" :show-close="false">
      <span>您是否确定共作废{{checkedRows.length}}笔业务单据，单据号如下：{{claimNumbers}}</span>
      <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="作废原因" prop="reason">
          <el-input type="textarea" v-model="form.reason"></el-input>
        </el-form-item>
        <div class="w100 t-c">
          <el-button size="small" @click="dialogVisible=false">取消</el-button>
          <el-button type="primary" size="small" @click="onSubmit">确定</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref, Watch } from 'vue-property-decorator'
import { formDefs, columns } from './config'
import { invalidBaseClaim } from '@/api/debt'
import { resp } from '@/utils/file'
import { format } from '@/utils/date'
@Component
export default class Business extends Vue {
  formDefs = formDefs

  columns = columns

  loading = false

  params = {}

  checkedRows = []

  @Ref() tb!: any

  @Ref() formRef!: any

  dialogVisible = false

  onQuery(params: any = {}) {
    this.tb.query(params)
    this.params = params
  }

  form: any = {
    reason: ''
  }

  get claimNumbers() {
    const claimNumbers: any = []
    this.checkedRows.map((item: any) => {
      claimNumbers.push(item.claimNumber)
    })
    return claimNumbers.join(',')
  }

  rules = {
    reason: [
      { required: true, message: '请输入作废原因', trigger: 'blur' },
      { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
    ]
  }

  onLink(row: any) {
    this.$router.push(`/assets/business-bill/detail/${row.claimNumber}`)
  }

  onSubmit() {
    const data = {
      claimNumberList: this.claimNumbers.split(','),
      reason: this.form.reason
    }
    this.formRef.validate((valid: any) => {
      if (valid) {
        invalidBaseClaim(data).then((res) => {
          this.dialogVisible = false
        })
      } else {
      }
    })
  }

  onInvalidBaseClaim() {
    this.dialogVisible = true
  }

  mounted() {
    this.onQuery()
  }
}
</script>

<style lang="scss" module>
</style>

<template>
<div :loading="loading">
  <query-table title="中登登记列表" :columns="columns" row-key="id" :data-source="dataSource" ref="tb" class="mt-4">
    <template slot="extra">
      <el-button plain size="small" @click="onFirstLog" v-if="!batchId">初始登记</el-button>
      <el-button type="warning" plain size="small" @click="onChangeLog" v-if="canChangeOpt">变更登记</el-button>
      <el-button type="info" plain size="small" @click="onExtendLog" v-if="canChangeOpt">展期登记</el-button>
      <el-button type="danger" plain size="small" @click="onCancelLog" v-if="canChangeOpt">注销登记</el-button>
    </template>
    <template v-slot:opt="{row}">
      <el-button type="text" size="small" @click="onView(row)">详情</el-button>
    </template>
  </query-table>
  <zdw-register ref="zdwRegister"></zdw-register>
  <zdw-detail ref="zdwDetail"></zdw-detail>
</div>
</template>

<script lang="ts">

import { Vue, Component, Ref, Prop, Watch } from 'vue-property-decorator'
import { columns } from './config'
import ZdwRegister from '../components/zdw-register/index.vue'
import ZdwDetail from '../components/zdw-detail/index.vue'

@Component({
  components: { ZdwRegister, ZdwDetail }
})
export default class ZdwList extends Vue {
  @Prop(String) batchId!: string

  @Prop(String) status!: string

  @Prop(String) debts!: string

  @Ref() zdwRegister!: ZdwRegister

  @Ref() zdwDetail!: ZdwDetail

  columns = columns

  dataSource: any[] = []

  loading = false

  get canChangeOpt () {
    return this.batchId && this.status !== '5'
  }

  onFirstLog () {
    this.zdwRegister.register('init', (this.debts || '').split(',')).then(data => {
      this.$message.success('中登初始登记成功')
      this.$router.push(`/finance/debt/zdw-list?batchId=${data}&status=2`)
    })
  }

  onChangeLog () {
    this.zdwRegister.register('change', this.batchId).then(data => {
      this.$message.success('中登变更登记成功')
      this.loadData()
    })
  }

  onExtendLog () {
    this.zdwRegister.register('extend', this.batchId).then(data => {
      this.$message.success('中登展期登记成功')
      this.loadData()
    })
  }

  onCancelLog () {
    this.zdwRegister.register('cancel', (this.batchId)).then(data => {
      this.$message.success('中登注销登记成功')
      this.$router.push('/finance/debt')
    })
  }

  onView (row: any) {
    this.zdwDetail.view(row.id).catch(() => {
      // ignore
    })
  }

  loadData () {
    if (!this.batchId) {
      this.dataSource = []
      return
    }
    this.loading = false
    this.$http.post('/backend/zdw/show/record', { batchId: this.batchId }).then((data) => {
      this.dataSource = data?.records || []
    }).finally(() => {
      this.loading = true
    })
  }

  mounted () {
    this.loadData()
  }

  @Watch('batchId', { immediate: true }) batchIdChange () {
    this.loadData()
  }
}
</script>

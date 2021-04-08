<template>
<div>
<glp-section title="请选择应收账款">
  <div slot="extra"><el-button type="primary" size="small" icon="el-icon-plus" plain>新 增</el-button></div>
  <query-table :dataSource="dateSource" :pageable="false">
    <el-table-column type="selection" width="64px"></el-table-column>
    <el-table-column prop="a" label="应收账款编号"></el-table-column>
    <el-table-column prop="b" label="应收账款名称"></el-table-column>
    <el-table-column prop="c" label="应收账款金融"></el-table-column>
    <el-table-column prop="d" label="转让起始时间"></el-table-column>
    <el-table-column prop="e" label="转让截止时间"></el-table-column>
  </query-table>
</glp-section>
</div>
</template>

<script lang="ts">

import { Vue, Component, Ref } from 'vue-property-decorator'

@Component
export default class AmountInfo extends Vue {
  dateSource: any[] = []
}
</script>

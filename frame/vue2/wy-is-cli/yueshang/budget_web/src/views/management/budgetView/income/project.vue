<template>
  <div class="list-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle" style="flex-flow: wrap;">
      <el-col class="select-title" :span="14">
        <div class="select-cutover">
          宝龙商业集团年度预算-2021 > 租赁表 > 项目指标
        </div>
      </el-col>
    </el-row>
    <el-table ref="table" :data="tableData" size="mini" border stripe header-row-class-name="table-header" :height="this.$store.state.tableHeight">
      <el-table-column show-overflow-tooltip  label="指标" fixed  width="120">
      </el-table-column>
      <el-table-column show-overflow-tooltip  label="年度" fixed  width="100">
      </el-table-column>
      <el-table-column show-overflow-tooltip  label="1月" fixed  width="100">
      </el-table-column>
      <el-table-column show-overflow-tooltip  label="2月" fixed  width="100">
      </el-table-column>
      <el-table-column show-overflow-tooltip  label="3月" fixed  width="100">
      </el-table-column>
      <el-table-column show-overflow-tooltip  label="4月" fixed  width="100">
      </el-table-column>
      <el-table-column show-overflow-tooltip  label="5月" fixed  width="100">
      </el-table-column>
      <el-table-column show-overflow-tooltip  label="6月" fixed  width="100">
      </el-table-column>
      <el-table-column show-overflow-tooltip  label="7月" fixed  width="100">
      </el-table-column>
      <el-table-column show-overflow-tooltip  label="8月" fixed  width="100">
      </el-table-column>
      <el-table-column show-overflow-tooltip  label="9月" fixed  width="100">
      </el-table-column>
      <el-table-column show-overflow-tooltip  label="10" fixed  width="100">
      </el-table-column>
      <el-table-column show-overflow-tooltip  label="10月" fixed  width="100">
      </el-table-column>
      <el-table-column show-overflow-tooltip  label="11月" fixed  width="100">
      </el-table-column>
      <el-table-column show-overflow-tooltip  label="12月" fixed  width="100">
      </el-table-column>
    </el-table>
    <ys-paginator :page-info="pageInfo" @handle_paginator="handle_paginator"/>
  </div>
</template>

<script>
import messageBox from '../../component/messageBox.vue'
import { handle_paginator } from '@mixins'
import { toThousandsClean, getDynamicTableHeight, rTime } from '@/utils/index'
import LeaseApi from '@/apis/apis/leaseApi'
export default {
  mixins: [handle_paginator],
  data () {
    return {
      tableData: [],
      pageInfo: {
        pageSize: 10,
        page: 1,
        pageNum: 0
      }
    }
  },
  watch: {},
  created () {
  },
  mounted () {

  },
  methods: {
    getDynamicTableHeight,
    rTime
  }
}
</script>

<style>
</style>

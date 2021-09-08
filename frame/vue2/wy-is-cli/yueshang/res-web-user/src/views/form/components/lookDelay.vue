<template>
  <!-- 延期历史 -->
  <div class="lookDelay-box">
    <el-dialog
      title="延期历史"
      :visible.sync="fast"
      width="900px"
      v-dialogDrag
      >
      <el-table ref="table" :data="tableData" size="mini" border header-row-class-name="table-header" height="300">
        <el-table-column min-width="100" label="申请人" show-overflow-tooltip prop="applyUserName" />
        <el-table-column width="80" label="申请延期" show-overflow-tooltip prop="delayTime">
          <template slot-scope="scope">
            <span>{{ scope.row.delayTime }}小时</span>
          </template>
        </el-table-column>
        <el-table-column width="130" label="发起时间" show-overflow-tooltip prop="applyDate" />
        <el-table-column min-width="100" label="审批人" show-overflow-tooltip prop="approveUserName" />
        <el-table-column width="80" label="审批状态" show-overflow-tooltip prop="statusCd" />
        <el-table-column min-width="120" label="审批意见" show-overflow-tooltip prop="approveRemark" />
        <el-table-column width="130" label="审批时间" show-overflow-tooltip prop="approveDate" />
      </el-table>
      <!-- <ys-paginator :page-info="pageInfo" @handle_paginator="handle_paginator"/> -->
    </el-dialog>
  </div>
</template>

<script>
import { handle_paginator } from '@/mixins';
import { mapState } from 'vuex';
import Approval from '@/apis/apis/approval';

export default {
  name: 'LookDelay',
  mixins: [handle_paginator],
  props: ['open'],
  data() {
    return {
      pageInfo: {
        rows: 20,
        page: 1,
        sum_num: 0
      },
      tableData: []
    }
  },
  watch: {
    open: {
      immediate: true,
      handler(val) {
        if(val) {
          this.getList()
        }
      }
    }
  },
  computed: {
    ...mapState(['userInfo']),
    fast: {
      get (val) {
        // if (val.open) this.getList()
        return this.open
      },
      set(val) {
        this.$emit('close', {fast: false})
      }
    }
  },
  methods: {
    getList() {
      const params = {
        ...this.pageInfo,
        // userId: this.userInfo.userid,  
        approveId: Number(this.$route.query.id),
        enterpriseId: this.userInfo.enterpriseId,
      }
      Approval.findPmApproveDelayPage(params).then(res => {
        if(res.code == 1){
          this.tableData = res.data.content
          this.pageInfo.sum_num = res.data.totalElements
        } else {
          this.$message.error(res.message)
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.lookDelay-box {
}
</style>

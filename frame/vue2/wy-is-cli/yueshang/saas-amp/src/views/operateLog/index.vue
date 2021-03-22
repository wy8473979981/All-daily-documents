<template>
  <!-- 日志 -->
  <div class="list-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle">
      <el-col :span="24" style="display: flex; align-items: center;">
        <el-input placeholder="操作人" v-model="query.admin_truename" @change="getListChange" size="mini" style="margin-right: 5px; width: 180px;"></el-input>
        <el-date-picker
          style="margin-right: 5px; width: 180px;"
          v-model="query.start_time"
          @change="getListChange"
          type="date"
          size="mini"
          value-format="yyyy-MM-dd"
          placeholder="开始时间">
        </el-date-picker>
        <el-date-picker
          style="margin-right: 10px; width: 180px;"
          v-model="query.end_time"
          type="date"
          size="mini"
          value-format="yyyy-MM-dd"
          @change="selectToTime"
          placeholder="结束时间">
        </el-date-picker>
        <div style="display: inline-block;">
          <el-button @click="getList" size="mini" type="success">查询</el-button>
          <el-button @click="reset" size="mini">重置</el-button>
        </div>
      </el-col>
    </el-row>
    <el-table ref="table" :data="tableData" size="mini" border header-row-class-name="table-header" :max-height="this.$store.state.tableHeight">
      <el-table-column width="120" label="操作人" show-overflow-tooltip prop="name" />
      <el-table-column width="180" label="操作时间" prop="created_at" />
      <el-table-column width="100" label="操作类型" prop="type" />
      <el-table-column width="250" label="操作目标" prop="target" />
      <el-table-column min-width="120" label="日志内容" prop="content" />
      <el-table-column fixed="right" width="130" label="客户端IP" prop="ip_address" />
    </el-table>

    <ys-paginator :page-info="pageInfo" @handlePaginator="handlePaginator"/>
  </div>
</template>

<script>
import { handlePaginator } from '@mixins'
import { getDynamicTableHeight } from '@/utils/index';
import OperateLog from '@/apis/apis/operateLog'
export default {
  mixins: [handlePaginator],
  data() {
    return {
      pageInfo: {
        page_size: 50,
        page: 1,
        sum_num: 0
      },
      query: {
        admin_truename: null,
        start_time: null,
        end_time: null
      },
      tableData: [],
    }
  },
  components: {
  },
  watch: {},
  created() {
    this.getList()
  },
  mounted() {

  },
  // 日期转换格式
  filters: {
    formatDate(time) {
      return time ? new Date(parseInt(time)).format('yyyy-MM-dd') : ''
    }
  },
  methods: {
    // 查询
    async getList() {
      const params = {
        ...this.pageInfo,
        ...this.query
      }
      await OperateLog.find(params).then(res => {
        if(res.code === 200 && res.result){
          this.tableData = res.result.data
          this.pageInfo.sum_num = res.result.sum_num
          getDynamicTableHeight(this)
        }
      })
    },
    // 重新选择搜索项重置页码
    getListChange() {
      this.pageInfo.page = 1
    },
    // 选择结束时间
    selectToTime(e) {
      if(!this.query.start_time){
        this.query.end_time = ''
        this.$message.error('请选择开始时间')
        return
      }
      const dateNum = new Date(this.query.start_time).getTime()
      const toNum = new Date(e).getTime()
      if(toNum < dateNum){
        this.query.end_time = ''
        this.$message.error('结束时间小于开始时间')
      }
      this.getListChange()
    },
    reset() {
      this.query = {
        admin_truename: null,
        start_time: null,
        end_time: null
      }
      this.getList()
    }
  }
}
</script>
<style type="text/css" lang="scss" scoped>
  @import '~@styles/common.scss';
</style>

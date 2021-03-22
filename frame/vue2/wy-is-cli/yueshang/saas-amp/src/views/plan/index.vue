<template>
  <!-- 日志 -->
  <div class="list-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle">
      <el-col class="colcol" :span="24" style="display: flex; align-items: center;">
        <div>
          <el-select placeholder="项目" size="mini" v-model="query.project_config_id" @change="getListChange"  filterable>
            <el-option
              v-for="item in projectList"
              :key="item.project_config_id"
              :label="item.project_name"
              :value="item.project_config_id">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select placeholder="楼栋" size="mini" v-model="query.building" @change="getListChange"  filterable>
            <el-option
              v-for="item in buildings"
              :key="item.id"
              :label="item.value"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select placeholder="楼层" size="mini" v-model="query.floor" @change="getListChange"  filterable>
            <el-option
              v-for="item in floors"
              :key="item.id"
              :label="item.value"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { handlePaginator } from '@mixins'
import { getDynamicTableHeight } from '@/utils/index';
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
        project_config_id: null,
        building: null,
        floor: null
      },
      projectList: [{project_config_id:1,project_name: '七宝宝龙城'}],
      buildings: [{id:1,value: 'T1'},{id:2,value: 'T2'},{id:3,value: 'T3'},{id:4,value: 'T4'},{id:5,value: 'T5'},{id:6,value: 'T6'},{id:7,value: 'T7'}],
      floors: [{id:1,value: 'B2'},{id:2,value: 'B1'},{id:3,value: '1F'},{id:4,value: '2F'},{id:5,value: '3F'},{id:6,value: '4F'}],
    }
  },
  components: {

  },
  watch: {},
  created() {

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
        admin_name: null,
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

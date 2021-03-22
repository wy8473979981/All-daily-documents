<template>
  <!-- 资产分配情况 -->
  <div class="list-page">
    <h2>统计汇总</h2>
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle">
      <el-col :span="17" >
        <el-select placeholder="" size="mini" v-model="query.entrust_manage_status" @change="getListChange" style="margin-right: 5px; width: 180px;">
          <el-option
            v-for="item in entrust_manage_statusList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
<!--        <el-button @click="reset" size="mini">重置</el-button>-->
      </el-col>
      <el-col :span="7" style="text-align: right;">
<!--        <el-button @click="openArea" size="mini" type="success">建面对比</el-button>-->
      </el-col>
    </el-row>
    <el-table ref="table" :data="tableData" size="mini" header-row-class-name="table-header" cell-click="cellClickBack" :cell-class-name="cellClass" @cell-click="cellClick">
      <el-table-column fixed min-width="120" label="事业部" show-overflow-tooltip prop="estate_devlop_division"></el-table-column>
      <el-table-column min-width="100" label="未分配" prop="not_distribute" align="center"></el-table-column>
      <el-table-column min-width="100" label="商业" prop="business" align="center"></el-table-column>
      <el-table-column min-width="100" label="酒店" prop="hotel" align="center"></el-table-column>
      <el-table-column min-width="100" label="办公" prop="office" align="center"></el-table-column>
      <el-table-column min-width="100" label="公寓" prop="apartment" align="center"></el-table-column>
      <el-table-column min-width="150" label="去除重复业态计数" prop="duplicate_removal" align="center"></el-table-column>
    </el-table>
    <h2 style="margin-top: 20px;">项目详情</h2>
    <el-table ref="table" :data="detailData" size="mini" header-row-class-name="table-header" >
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column min-width="150" label="地产开发事业部" show-overflow-tooltip prop="estate_devlop_division"></el-table-column>
      <el-table-column min-width="120" label="在建项目" prop="project_name" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column min-width="100" label="分配状态栏" prop="self_type" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.self_type === '0' ? '宝龙持有' : (scope.row.self_type === '1' ? '合作方持有': (scope.row.self_type === '2' ? '暂时共同持有': (scope.row.self_type === '3' ? '共同持有': (scope.row.self_type == '9' ? '未分配': '未分配')))) }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="120" label="是否签署委托协议" prop="entrust_manage_status" align="center">
      </el-table-column>
      <el-table-column min-width="100" label="汇总业态" prop="layout" align="center"></el-table-column>
      <el-table-column min-width="100" label="建筑总面积" prop="build_area" align="center"></el-table-column>
      <el-table-column min-width="120" label="项目阶段（日）" prop="project_stage" align="center">
        <template slot-scope="scope" slot="header">
          <el-tooltip class="item" effect="dark" content="距离该项目拿地日已经过X日" placement="top">
            <span>项目阶段（日）</span>
          </el-tooltip>
        </template>
      </el-table-column>
<!--      <el-table-column min-width="200" label="未委托原因说明" show-overflow-tooltip prop="not_entrust_reason" align="center"></el-table-column>-->
    </el-table>
    <ys-paginator :page-info="pageInfo" @handlePaginator="handlePaginator"/>
  </div>
</template>

<script>
import { handlePaginator } from '@mixins'
import show from '@/apis/apis/show'
export default {
  mixins: [handlePaginator],
  data () {
    return {
      pageInfo: {
        page_size: 50,
        page: 1,
        sum_num: 0
      },
      query: {
        entrust_manage_status: '2'
      },
      query2: {
        estate_devlop_division: '总计', // 事业一部 ...
        tag: '' // 未分配、商业、酒店、办公、公寓
      },
      entrust_manage_statusList: [{ id: '', name: '全部状态' }, { id: '1', name: '已委托' }, { id: '2', name: '未委托' }],
      tableData: [], // 统计汇总
      detailData: [], // 项目详情列表
      isRepeat: false
    }
  },
  components: {
  },
  watch: {},
  created () {
    this.getList()
    this.getDetailList()
  },
  mounted () {

  },
  methods: {
    // 查询
    async getList () {
      const params = {
        ...this.pageInfo,
        ...this.query
      }
      await show.findllocation(params).then(res => {
        if (res && res.result) {
          this.tableData = res.result || []
          // this.pageInfo.sum_num = res.result.sum_num
        }
      })
    },
    // 查询详情
    async getDetailList () {
      const params = {
        ...this.pageInfo,
        ...this.query,
        ...this.query2
      }
      await show.findDetail(params).then(res => {
        if (res && res.result) {
          this.detailData = res.result.data || []
          this.pageInfo.sum_num = res.result.sum_num
        }
      })
    },
    // 重新选择搜索项重置页码
    getListChange () {
      this.pageInfo.page = 1
      this.query2.tag = ''
      this.getList()
      this.getDetailList()
    },
    reset () {
      this.query = {
        entrust_manage_status: '2'
      }
      this.query2 = {
        estate_devlop_division: '', // 事业一部 ...
        tag: '未分配' // 未分配、商业、酒店、办公、公寓
      }
      this.getList()
    },
    // 导出
    exportExcel () {
      const token = localStorage.getItem('ys_contract_token')
      if (token) {
        window.location.href = `../${this.$baseURL}/projectConfig/export?token=${token}`
      }
    },
    // 过滤单元格显示样式
    cellClass ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex > 0 && columnIndex < 7) {
        const num = this.tableData[rowIndex][column.property]
        if (num && !isNaN(parseInt(num))) {
          // eslint-disable-next-line no-new-wrappers
          return parseInt(num) > 0 ? 'color-blue' : ''
        }
      }
      return ''
    },
    cellClick (row, column, cell, event) {
      const num = parseInt(row[column.property])
      if (column.property === 'estate_devlop_division' || num === 0) {
        // do nothing
        return
      }
      this.query2.estate_devlop_division = row.estate_devlop_division
      this.query2.tag = column.label
      if (column.property === 'duplicate_removal') {
        this.query2.tag = '去重'
        this.isRepeat = true
      } else {
        this.isRepeat = false
      }
      this.getDetailList()
    },
    cellClass2 ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 7) {
        const num = this.detailData[rowIndex][column.property]
        if (num) {
          // eslint-disable-next-line no-new-wrappers
          return num >= 60 ? 'ys-bg-yellow' : ''
        }
      }
      return ''
    }
  }
}
</script>
<style type="text/css" lang="scss" scoped>
  @import '~@styles/common.scss';
  .font-red {
    color: red;
  }
  .list-page {
    h2 {
      border-left: 3px solid #4A90E2;
      padding: 5px 5px 5px 10px;
      font-size: 16px;
      background-color: #E3E7E9;
      margin-bottom: 20px;
    }
  }
  /deep/ .el-table .color-blue {
    color: #4A90E2!important;
    cursor: pointer;
  }
  /deep/ .el-table .ys-bg-yellow{
    background-color: #FFFF00!important;
  }

</style>
<style>
.city-popper .el-cascader-panel .el-cascader-menu__wrap {
  height: 400px;
}
</style>

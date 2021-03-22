<template>
  <!-- 经营委托情况 -->
  <div class="list-page">
    <h2 class="page-title">统计汇总</h2>
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle">
      <el-col :span="22" >
        <el-select placeholder="地产开发事业部" size="mini" v-model="query.estate_devlop_division" @change="getListChange" multiple clearable style="margin-right: 5px; width: 180px;">
          <el-option
            v-for="item in estate_devlop_divisionList"
            :key="item.type_config_id"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
        <el-select placeholder="" size="mini" v-model="query.entrust_manage_status" @change="getListChange" style="margin-right: 5px; width: 180px;">
          <el-option
            v-for="item in entrust_manage_statusList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <el-select placeholder="分配状态栏" size="mini" v-model="query.self_type" @change="getListChange" multiple clearable style="margin-right: 5px; width: 180px;">
          <el-option
            v-for="(item, index) in selfTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <el-select placeholder="业态" size="mini" v-model="query.layout" @change="getListChange" multiple collapse-tags clearable style="margin-right: 5px; width: 180px;">
          <el-option
            v-for="item in selectLayoutList"
            :key="item.value"
            :label="item.label"
            :value="item.label">
          </el-option>
        </el-select>
        <el-date-picker
          style="margin-right: 5px; width: 240px;padding: 0 10px;line-height: 28px;"
          v-model="query.open_date"
          @change="getListChange"
          type="monthrange"
          size="mini"
          unlink-panels
          range-separator="至"
          start-placeholder="开始月份"
          end-placeholder="结束月份"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions">
        </el-date-picker>
        <el-button @click="reset" size="mini">重置</el-button>
      </el-col>
      <el-col :span="2" style="text-align: right;">
        <el-button @click="exportExcel" size="mini" type="success">导出</el-button>
      </el-col>
    </el-row>
    <el-table ref="table" :data="tableData" size="mini" header-row-class-name="table-header" :height="this.$store.state.tableHeight" :cell-class-name="cellClass2" >
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column min-width="120" label="地产开发事业部" show-overflow-tooltip prop="estate_devlop_division"></el-table-column>
      <el-table-column min-width="150" label="在建项目" show-overflow-tooltip prop="project_name" align="center"></el-table-column>
      <el-table-column min-width="100" label="分配状态栏" prop="self_type" align="center"></el-table-column>
      <el-table-column min-width="100" label="建筑面积(㎡)" prop="build_area" align="center"></el-table-column>
      <el-table-column min-width="100" label="物业类型描述" prop="layout" align="center"></el-table-column>
      <el-table-column min-width="100" label="开业时间" prop="open_date" align="center"></el-table-column>
      <el-table-column min-width="120" label="开业倒计时（月）" prop="open_count_down" align="center"></el-table-column>
      <el-table-column min-width="120" label="项目阶段（日）" prop="project_stage" align="center" >
        <template slot-scope="scope" slot="header">
          <el-tooltip class="item" effect="dark" content="距离该项目拿地日已经过X日" placement="top">
            <span>项目阶段（日）</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column min-width="200" label="未分配原因" prop="not_allocation_reason" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="scope.row.not_allocation_reason" placement="top">
            <span class="cut-line3">{{scope.row.not_allocation_reason}}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column min-width="200" label="未委托原因" prop="not_entrust_reason" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="scope.row.not_entrust_reason" placement="top">
            <span class="cut-line3">{{scope.row.not_entrust_reason}}</span>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <ys-paginator :page-info="pageInfo" @handlePaginator="handlePaginator"/>
  </div>
</template>

<script>
import { handlePaginator } from '@mixins'
import show from '@/apis/apis/show'
import TypeApi from '@/apis/apis/typeApi'
import { getDynamicTableHeight } from '@/utils/index'
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
        estate_devlop_division: '',
        self_type: '',
        layout: '',
        open_date: '',
        entrust_manage_status: '2'
      },
      tableData: [], // 统计汇总
      estate_devlop_divisionList: [], // 地产开发事业部
      selfTypeList: [{ id: '0', name: '宝龙持有' }, { id: '2', name: '暂时共同持有' }, { id: '3', name: '共同持有' }, { id: '9', name: '未分配' }],
      entrust_manage_statusList: [{ id: '', name: '全部状态' }, { id: '1', name: '已委托' }, { id: '2', name: '未委托' }],
      selectLayout: [],
      selectLayoutList: [
        {
          value: 1,
          label: '商业'
        },
        {
          value: 2,
          label: '酒店'
        },
        {
          value: 3,
          label: '办公'
        },
        {
          value: 4,
          label: '公寓'
        }
      ],
      permission: `${localStorage.getItem('ys_contract_permission')}`,
      pickerOptions: {
        shortcuts: [{
          text: '本月',
          onClick (picker) {
            picker.$emit('pick', [new Date(), new Date()])
          }
        }, {
          text: '今年至今',
          onClick (picker) {
            const end = new Date()
            const start = new Date(new Date().getFullYear(), 0)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setMonth(start.getMonth() - 3)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  components: {
  },
  watch: {},
  created () {
    this.getTypeList()
    this.getList()
  },
  mounted () {

  },
  methods: {
    // 获取权益类型列表
    getTypeList () {
      TypeApi.typeDropDown().then(res => {
        if (res.code === 200 && res.result) {
          this.estate_devlop_divisionList = res.result.estate_devlop_division
        }
      })
    },
    // 查询
    async getList () {
      const params = {
        ...this.pageInfo,
        ...this.query
      }
      console.log('params==', params)
      await show.findEntrust(params).then(res => {
        if (res && res.result) {
          this.tableData = res.result.data
          getDynamicTableHeight(this)
          this.pageInfo.sum_num = res.result.sum_num
        }
      })
    },
    // 重新选择搜索项重置页码
    getListChange () {
      this.pageInfo.page = 1
      this.getList()
    },
    reset () {
      this.query = {
        estate_devlop_division: '',
        self_type: '',
        layout: '',
        open_date: '',
        entrust_manage_status: '2'
      }
      this.getList()
    },
    // 导出
    exportExcel () {
      const token = localStorage.getItem('ys_contract_token')
      if (token) {
        const params = this.getParams(this.query)
        window.location.href = `../${this.$baseURL}/showDate/export?token=${token}${params}`
      }
    },
    cellClass2 ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 8 && row.entrust_manage_status === '2') {
        const num = this.tableData[rowIndex][column.property]
        if (num) {
          // eslint-disable-next-line no-new-wrappers
          return num >= 60 ? 'ys-bg-yellow' : ''
        }
      }
      if (columnIndex === 7 && row.entrust_manage_status === '2') {
        const num = this.tableData[rowIndex][column.property]
        if (num && !isNaN(parseInt(num))) {
          // eslint-disable-next-line no-new-wrappers
          return num <= 12 ? 'ys-bg-red' : ''
        }
      }
      return ''
    },
    getParams (data) {
      if (data) {
        const params = Object.keys(data)
        let param = ''
        params.forEach(item => {
          // if (Array.isArray(data[item])) {
          //   data[item].forEach((son, index) => {
          //     param += '&' + encodeURIComponent(item) + `[${index}]` + '=' + encodeURIComponent(son)
          //   })
          // } else {
          //   param += '&' + encodeURIComponent(item) + '=' + encodeURIComponent(data[item])
          // }
          param += '&' + encodeURIComponent(item) + '=' + encodeURIComponent(data[item])
        })
        return param
      }
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
  /deep/ .el-table .ys-bg-red{
    background-color: #FF2121!important;
  }
  /deep/ .tool-bar .el-range-separator {
    line-height: 26px;
  }
</style>
<style>
  .city-popper .el-cascader-panel .el-cascader-menu__wrap {
    height: 400px;
  }
  .el-tooltip__popper {
    max-width: 300px;
  }
</style>

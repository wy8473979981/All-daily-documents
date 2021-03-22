<template>
  <!-- 建筑面积对比 -->
  <div class="page">
    <div class="title-search-con">
      <div class="logo-title">
        <img src="../../../static/img/bl/bl_sy_logo.svg">
        <h3>资产盘点系统</h3>
      </div>
      <div class="list-page">
        <el-row class="tool-bar" type="flex" justify="space-between" align="middle" style="flex-flow: wrap;">
          <el-col class="" :span="22">
            <el-select placeholder="存量项目" size="mini" v-model="query.project_name" @change="getListChange" filterable
                       clearable style="margin-right: 5px; width: 180px;">
              <el-option
                v-for="item in projectList"
                :key="item.project_config_id"
                :label="item.project_name + '-' +item.project_label_name"
                :value="item.project_name">
              </el-option>
            </el-select>
            <el-select placeholder="全部/部分" size="mini" v-model="query.screen" @change="getListChange" filterable
                       style="margin-right: 5px; width: 180px;">
              <el-option
                v-for="item in screenList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <el-select placeholder="业态" size="mini" v-model="query.project_label" @change="getListChange"
                       style="margin-right: 5px; width: 180px;">
              <el-option
                v-for="item in selectLayoutList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <!--        <el-select placeholder="红绿灯" size="mini" v-model="query.traffic_light" @change="getListChange('红绿灯')" filterable clearable style="margin-right: 5px; width: 180px;">-->
            <!--          <el-option-->
            <!--            v-for="item in traffic_light_list"-->
            <!--            :key="item.id"-->
            <!--            :label="item.name"-->
            <!--            :value="item.id">-->
            <!--          </el-option>-->
            <!--        </el-select>-->
            <el-date-picker
              v-model="query.report_time"
              @change="getListChange"
              style="margin-right: 20px; width: 200px;"
              type="month"
              size="mini"
              value-format="yyyy-MM"
              :clearable="false"
              placeholder="报表时间">
            </el-date-picker>
            <el-button @click="reset" size="mini">重置</el-button>
          </el-col>
          <el-col :span="2" style="text-align: right;">
            <el-button @click="exportExcel" size="mini" type="success">导出</el-button>
          </el-col>
        </el-row>
        <el-table ref="table" :data="tableData" size="mini" border header-row-class-name="table-header"
                  :height="tableHeight">
          <el-table-column min-width="150" label="存量项目" show-overflow-tooltip prop="project_name"/>
          <el-table-column min-width="80" label="标签" prop="project_label_name" align="center"/>
          </el-table-column>
          <el-table-column label="建筑总面积" align="center">
            <el-table-column
              :label="table_pms + '（㎡）'"
              align="right"
              min-width="250">
              <template slot-scope="scope">
                <span>{{scope.row.build_area}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="资产平台（㎡）"
              align="right"
              min-width="250">
              <template slot-scope="scope">
                <span>{{scope.row.pd_build_area}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="差值（㎡）"
              align="right"
              min-width="250">
              <template slot-scope="scope">
                <span>{{(scope.row.build_area - scope.row.pd_build_area).toFixed(2)}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="差值率（%）"
              align="right"
              min-width="250">
              <template slot-scope="scope">
                <span :class="[scope.row.color == 1 ? 'cRed' : '']">{{scope.row.diff_area?((scope.row.diff_area * 100).toFixed(0)):(scope.row.diff_area === 0 ? 0: '')}}</span>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>

        <ys-paginator :page-info="pageInfo" @handlePaginator="handlePaginator"/>

      </div>
    </div>
  </div>
</template>

<script>
import { handlePaginator } from '@mixins'
import { toThousands, getDynamicTableHeight } from '@/utils/index'
import TypeApi from '@/apis/apis/typeApi'

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
        report_time: null,
        project_name: null,
        screen: 2,
        project_label: '2' // 默认商业
      },
      projectList: [], // 存量项目列表
      selectLayout: [],
      project_labelList: [], // 标签
      type_config_idList: [], // 权益类型列表
      estate_devlop_divisionList: [], // 地产开发事业部
      business_area_companyList: [], // 委托管理公司
      tableData: [],
      fastCreate: false,
      projectConfigId: null, // 编辑id
      projectConfigRow: null,
      fastMember: false,
      memberId: null, // 编辑id
      permission: `${localStorage.getItem('ys_contract_permission')}`,
      tableHeight: null,
      oldTableData: [],
      qckh: [{
        id: 1,
        name: '全场'
      }, {
        id: 2,
        name: '考核'
      }],
      month1: null,
      month2: null,
      month3: null,
      screenList: [{
        id: 1,
        name: '全部'
      }, {
        id: 2,
        name: '部分'
      }],
      selectLayoutList: [
        {
          value: '1',
          label: '全部业态'
        },
        {
          value: '2',
          label: '商业'
        },
        {
          value: '3',
          label: '酒店'
        },
        {
          value: '4',
          label: '办公'
        },
        {
          value: '5',
          label: '公寓'
        },
        {
          value: '6',
          label: '其他'
        }
      ],
      table_pms: 'PMS导入'
    }
  },
  components: {},
  watch: {
    'query.project_label': {
      handler: function (newV, old) {
        if (newV === '2') {
          this.table_pms = 'PMS导入'
        } else {
          this.table_pms = '手工导入'
        }
      },
      immediate: true
    }
  },
  created () {
    this.tableHeight = document.documentElement.clientHeight - 154
    this.query.report_time = new Date().format('yyyy-MM')
    this.getProList()
    this.getList()
  },
  mounted () {

  },
  // 日期转换格式
  filters: {
    formatDate (time) {
      return time ? new Date(parseInt(time)).format('yyyy-MM-dd') : ''
    },
    formatVal (val) {
      return toThousands(val)
    }
  },
  methods: {
    // 获取存量项目列表
    getProList () {
      TypeApi.projectDropDown({
        project_type: 1,
        is_check: true
      }).then(res => {
        if (res.code === 200 && res.result) {
          this.projectList = res.result
        }
      })
    },
    // 获取权益类型列表
    getTypeList () {
      TypeApi.typeDropDown().then(res => {
        if (res.code === 200 && res.result) {
          this.type_config_idList = res.result.equity
          this.project_labelList = res.result.project_label
          this.estate_devlop_divisionList = res.result.estate_devlop_division
          this.business_area_companyList = res.result.business_area_company
        }
      })
    },
    // 查询
    async getList () {
      const params = {
        ...this.pageInfo,
        ...this.query
      }
      await TypeApi.covered(params).then(res => {
        if (res.code === 200 && res.result) {
          this.pageInfo.sum_num = res.result.sum_num
          this.tableData = res.result.data
          this.oldTableData = res.result.data
          // this.pageInfo.sum_num = res.result.sum_num
          getDynamicTableHeight(this)
        }
      })
    },
    // 重新选择搜索项重置页码
    getListChange (light) {
      this.pageInfo.page = 1
      this.getList()
    },
    layoutChange (val) {
      this.query.layout = val.join(',')
      this.getListChange()
    },
    cityChange (val) {
      this.query.city = val[1]
      this.getListChange()
    },
    stockAdd () {
      this.fastCreate = true
    },
    closeCreate (res) {
      this.projectConfigId = null
      this.projectConfigRow = null
      this.fastCreate = res.fast
      if (res.reload) {
        this.getList()
        this.getProList()
      }
    },
    closeMember (res) {
      this.memberId = null
      this.fastMember = res.fast
      if (res.reload) {
        this.getList()
      }
    },
    reset () {
      this.query = {
        report_time: '2020-09',
        project_name: null,
        screen: 2,
        project_label: 2
      }
      this.getList()
    },
    // 编辑
    goEdit (row) {
      this.projectConfigId = row.id
      this.projectConfigRow = row
      this.fastCreate = true
    },
    // 成员列表
    goMember (id) {
      this.memberId = id
      this.fastMember = true
    },
    // 删除
    goDel (id) {
      this.$confirm('确认要删除吗？').then(() => {
        TypeApi.del({ project_config_id: id }).then(res => {
          if (res.code === 200) {
            this.getList()
          }
        })
      })
    },
    formatVal (type, row) {
      if (type === 1) {
        if (row.month1_Kh > 90) {
          row.color[0] = 1
        } else if (row.month1_Kh < 85 && row.month1_Kh > 0) {
          row.color[0] = 3
        } else if (row.month1_Kh >= 85 && row.month1_Kh <= 90) {
          row.color[0] = 2
        }
        if (row.month1_qc > 90) {
          row.color[1] = 1
        } else if (row.month1_qc < 85 && row.month1_qc > 0) {
          row.color[1] = 3
        } else if (row.month1_qc >= 85 && row.month1_qc <= 90) {
          row.color[1] = 2
        }
        if (row.month2_Kh > 90) {
          row.color[2] = 1
        } else if (row.month2_Kh < 85 && row.month2_Kh > 0) {
          row.color[2] = 3
        } else if (row.month2_Kh >= 85 && row.month2_Kh <= 90) {
          row.color[2] = 2
        }
        if (row.month2_qc > 90) {
          row.color[3] = 1
        } else if (row.month2_qc < 85 && row.month2_qc > 0) {
          row.color[3] = 3
        } else if (row.month2_qc >= 85 && row.month2_qc <= 90) {
          row.color[3] = 2
        }
        if (row.month3_Kh > 90) {
          row.color[4] = 1
        } else if (row.month3_Kh < 85 && row.month3_Kh > 0) {
          row.color[4] = 3
        } else if (row.month3_Kh >= 85 && row.month3_Kh <= 90) {
          row.color[4] = 2
        }
        if (row.month3_qc > 90) {
          row.color[5] = 1
        } else if (row.month3_qc < 85 && row.month3_qc > 0) {
          row.color[5] = 3
        } else if (row.month3_qc >= 85 && row.month3_qc <= 90) {
          row.color[5] = 2
        }
      } else if (type === 2) {
      }
    },
    // 导出
    exportExcel () {
      const token = localStorage.getItem('ys_contract_token')
      if (token) {
        window.location.href = `../${this.$baseURL}/projectConfig/pd_pms_cl_compare_export?token=${token}&report_time=${this.query.report_time}`
      }
    }
  }
}
</script>
<style type="text/css" lang="scss" scoped>
  @import '~@styles/common.scss';

  .page {
    width: 100%;
    // overflow-y: auto;
  }

  .page-con {
    width: 100%;
    height: calc(100vh - 84px);
    display: flex;
    overflow-x: auto;
  }

  .list-page {
    padding: 15px;
    overflow-y: auto;

    > h2 {
      border-left: 3px solid #4A90E2;
      padding: 5px;
      font-size: 16px;
      background-color: #E3E7E9;
    }
  }

  .logo-title {
    padding: 0 35px;
    height: 44px;
    background-color: #E3E7E9;
    display: flex;
    align-items: center;

    > img {
      width: 75px;
      height: 30px;
      margin-right: 25px;
    }

    > h3 {
      font-size: 18px;
      color: #333;
    }
  }

  .cGreen {
    color: #5AB46E;
  }

  .cRed {
    color: #ED1111 !important;
  }

  .cOrange {
    color: #e6a23c !important;
  }

  .cDRed {
    color: #ED1111 !important;
    font-weight: bolder !important;
  }
</style>
<style>
  .city-popper .el-cascader-panel .el-cascader-menu__wrap {
    height: 400px;
  }

  .el-table > .el-table__fixed-right {
    height: 100% !important;
  }
</style>

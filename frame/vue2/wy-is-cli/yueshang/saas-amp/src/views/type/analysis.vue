<template>
  <!-- 月数据对比分析 -->
  <div class="page">
    <div class="title-search-con">
      <div class="logo-title">
        <img src="../../../static/img/bl/bl_sy_logo.svg">
        <h3>资产盘点系统</h3>
      </div>
      <div class="list-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle" style="flex-flow: wrap;">
      <el-col class="" :span="22">
        <el-date-picker
          v-model="query.month1"
          style="margin-right: 5px; width: 180px;"
          @change="getList"
          type="month"
          size="mini"
          value-format="yyyy-MM"
          placeholder="对比月份">
        </el-date-picker>
        <el-date-picker
          v-model="query.month2"
          style="margin-right: 5px; width: 180px;"
          @change="getList"
          type="month"
          size="mini"
          value-format="yyyy-MM"
          placeholder="对比月份">
        </el-date-picker>
        <el-select placeholder="存量项目" size="mini" v-model="query.project_name" @change="getListChange" filterable clearable style="margin-right: 5px; width: 180px;">
          <el-option
            v-for="item in projectList"
            :key="item.project_config_id"
            :label="item.project_name + '-' +item.project_label_name"
            :value="item.project_name">
          </el-option>
        </el-select>
        <el-select placeholder="标签" size="mini" v-model="query.project_label" @change="getListChange" filterable clearable style="margin-right: 5px; width: 180px;">
          <el-option
            v-for="item in project_label_list"
            :key="item.id"
            :label="item.name"
            :value="item.name"
            :disabled="item.disabled">
          </el-option>
        </el-select>
        <el-select placeholder="红绿灯" size="mini" v-model="query.traffic_light" @change="getListChange('红绿灯')" filterable clearable style="margin-right: 5px; width: 180px;">
          <el-option
            v-for="item in traffic_light_list"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
<!--        <el-select placeholder="委托管理公司" size="mini" v-model="query.business_area_company" @change="getListChange" clearable style="margin-right: 5px; width: 180px;">-->
<!--          <el-option-->
<!--            v-for="item in business_area_companyList"-->
<!--            :key="item.type_config_id"-->
<!--            :label="item.name"-->
<!--            :value="item.name">-->
<!--          </el-option>-->
<!--        </el-select>-->

        <el-button @click="reset" size="mini">重置</el-button>
      </el-col>
      <el-col :span="2" style="text-align: right;">
        <el-button @click="exportExcel" size="mini" type="success">导出</el-button>
      </el-col>
    </el-row>
    <el-table ref="table" :data="tableData" size="mini" border header-row-class-name="table-header" :height="tableHeight">
      <el-table-column min-width="150" label="存量项目" show-overflow-tooltip prop="project_name" />
      <el-table-column min-width="80" label="业态">
        <template slot-scope="scope">
          <span v-if="scope.row.layout">
            <span v-if="scope.row.layout.indexOf('1') > -1">商业<span v-if="scope.row.layout.indexOf('2') > -1 || scope.row.layout.indexOf('3') > -1 || scope.row.layout.indexOf('4') > -1 || scope.row.layout.indexOf('5') > -1">,</span></span>
            <span v-if="scope.row.layout.indexOf('2') > -1">酒店<span v-if="scope.row.layout.indexOf('3') > -1 || scope.row.layout.indexOf('4') > -1 || scope.row.layout.indexOf('5') > -1">,</span></span>
            <span v-if="scope.row.layout.indexOf('3') > -1">办公<span v-if="scope.row.layout.indexOf('4') > -1 || scope.row.layout.indexOf('5') > -1">,</span></span>
            <span v-if="scope.row.layout.indexOf('4') > -1">公寓<span v-if="scope.row.layout.indexOf('5') > -1">,</span></span>
            <span v-show="scope.row.layout.indexOf('5') > -1">车库</span>
          </span>
          <span v-else>/</span>
        </template>
      </el-table-column>
      <el-table-column min-width="80" label="标签" prop="project_label" align="center" />
      <el-table-column min-width="150" label="委托管理公司" prop="business_area_company" show-overflow-tooltip align="center" />
      <el-table-column label="建筑面积（㎡）" align="center">
        <el-table-column
          label="6月30日"
          min-width="115">
          <template slot-scope="scope">
            <span>{{scope.row.build_area_sum_1 | formatVal}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="9月30日"
          min-width="115">
          <template slot-scope="scope">
            <span>{{scope.row.build_area_sum_2 | formatVal}}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="实际收入（元）" align="center">
        <el-table-column
          label="6月30日"
          min-width="115">
          <template slot-scope="scope">
            <span>{{scope.row.rent_income_sum_1 | formatVal}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="9月30日"
          min-width="115">
          <template slot-scope="scope">
            <span>{{scope.row.rent_income_sum_2 | formatVal}}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="单价（元）" align="center">
        <el-table-column
          label="6月30日"
          min-width="100">
          <template slot-scope="scope">
            <span>{{scope.row.avg_price_1 | formatVal }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="9月30日"
          min-width="100">
          <template slot-scope="scope">
            <span>{{scope.row.avg_price_2 | formatVal }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="差值"
          min-width="100">
          <template slot-scope="scope">
            <span :class="[scope.row.color[0] === 1? 'cGreen' : (scope.row.color[0] === 2 ? 'cRed' : '')]">{{ scope.row.avg_price_diff | formatVal }}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="空置率（%）" align="center">
        <el-table-column
          label="6月30日"
          min-width="100">
          <template slot-scope="scope">
            <span :class="[scope.row.color[1] === 1? 'cGreen' : (scope.row.color[1] === 2 ? 'cRed' : (scope.row.color[1] === 3 ? 'cDRed' : ''))]">{{scope.row.rent_rate_1}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="9月30日"
          min-width="100">
          <template slot-scope="scope">
            <span :class="[scope.row.color[2] === 1? 'cGreen' : (scope.row.color[2] === 2 ? 'cRed' : (scope.row.color[2] === 3 ? 'cDRed' : ''))]">{{scope.row.rent_rate_2}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="差值"
          min-width="100">
          <template slot-scope="scope">
            <span :class="[scope.row.color[3] === 1? 'cGreen' : (scope.row.color[3] === 2 ? 'cRed' : '')]">{{scope.row.rent_rate_diff}}</span>
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
  import { toThousands, getDynamicTableHeight } from '@/utils/index';
  import TypeApi from '@/apis/apis/typeApi'
  import Vue from 'vue'
  export default {
    mixins: [handlePaginator],
    data() {
      return {
        pageInfo: {
          page_size: 100,
          page: 1,
          sum_num: 0
        },
        query: {
          traffic_light: null,
          month1: new Date("2020-06-30").format('yyyy-MM'),
          month2: new Date("2020-09-30").format('yyyy-MM'),
          project_name: null,
          project_label: '商业'
        },
        projectList: [], // 存量项目列表
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
          },
          {
            value: 5,
            label: '车库'
          },
        ],
        project_labelList: [], //标签
        type_config_idList: [], // 权益类型列表
        estate_devlop_divisionList: [], //地产开发事业部
        business_area_companyList: [], //委托管理公司
        tableData: [],
        fastCreate: false,
        projectConfigId: null, // 编辑id
        projectConfigRow: null,
        fastMember: false,
        memberId: null, // 编辑id
        permission: `${localStorage.getItem('ys_contract_permission')}`,
        tableHeight: null,
        traffic_light_list: [{id: 1, name: '单价-红'},{id: 2, name: '单价-绿'},{id: 3, name: '空置率-红'},{id: 4, name: '空置率-绿'}],
        oldTableData: [],
        project_label_list: [{id: 1, name: '商业'},{id: 2, name: '物业'},{id: 3, name: '办公'},{id: 4, name: '公寓'},{id: 5, name: '酒店'},{id: 6, name: '其他'}],
      }
    },
    components: {
    },
    watch: {},
    created() {
      this.tableHeight = document.documentElement.clientHeight - 154
      this.getProList()
      this.getTypeList()
      this.getList()
    },
    mounted() {

    },
    // 日期转换格式
    filters: {
      formatDate(time) {
        return time ? new Date(parseInt(time)).format('yyyy-MM-dd') : ''
      },
      formatVal(val) {
        return toThousands(val)
      }
    },
    methods: {
      // 获取存量项目列表
      getProList() {
        TypeApi.projectDropDown({project_type: 1, is_check: true}).then(res => {
          if(res.code === 200 && res.result){
            this.projectList = res.result
          }
        })
      },
      // 获取权益类型列表
      getTypeList() {
        TypeApi.typeDropDown().then(res => {
          if(res.code === 200 && res.result){
            this.type_config_idList = res.result.equity
            this.project_labelList = res.result.project_label
            this.estate_devlop_divisionList = res.result.estate_devlop_division
            this.business_area_companyList = res.result.business_area_company
          }
        })
      },
      // 查询
      async getList() {
        const params = {
          ...this.pageInfo,
          ...this.query
        }
        await TypeApi.month(params).then(res => {
          if(res.code === 200 && res.result){
            res.result.data.forEach(item => {
              item.color = [0, 0, 0, 0]
              item.avg_price_diff = this.formatVal(item.avg_price_diff, item, 0)
              item.rent_rate_1 = this.formatVal(item.rent_rate_1, item, 1)
              item.rent_rate_2 = this.formatVal(item.rent_rate_2, item, 2)
              item.rent_rate_diff = this.formatVal(item.rent_rate_diff, item, 3)
            })
            this.tableData = res.result.data
            this.oldTableData = res.result.data
            this.pageInfo.sum_num = res.result.sum_num
            getDynamicTableHeight(this)
          }
        })
      },
      // 重新选择搜索项重置页码
      getListChange(light) {
        this.pageInfo.page = 1
        if (this.query.traffic_light > 0 && light === '红绿灯') {
          let list = Object.assign([],this.oldTableData)
          if (this.query.traffic_light === 1) {
            list = list.filter(item => item.color[0] === 2)
            list = list.sort((a,b) => b.avg_price_diff - a.avg_price_diff)
          }else if(this.query.traffic_light === 2){
            list = list.filter(item => item.color[0] === 1)
            list = list.sort((a,b) => b.avg_price_diff - a.avg_price_diff)
          }else if(this.query.traffic_light === 3){
            list = list.filter(item => item.color[3] === 2)
            list = list.sort((a,b) => b.rent_rate_diff - a.rent_rate_diff)
          }else if(this.query.traffic_light === 4){
            list = list.filter(item => item.color[3] === 1)
            list = list.sort((a,b) => b.rent_rate_diff - a.rent_rate_diff)
          }
          this.tableData = list
          return
        }
        this.query.traffic_light = null
        this.getList()
      },
      layoutChange(val) {
        this.query.layout = val.join(',')
        this.getListChange()
      },
      cityChange(val) {
        this.query.city = val[1]
        this.getListChange()
      },
      stockAdd() {
        this.fastCreate = true
      },
      closeCreate(res) {
        this.projectConfigId = null
        this.projectConfigRow = null
        this.fastCreate = res.fast
        if(res.reload) {
          this.getList()
          this.getProList()
        }
      },
      closeMember(res) {
        this.memberId = null
        this.fastMember = res.fast
        if(res.reload) {
          this.getList()
        }
      },
      reset() {
        this.query = {
          traffic_light: null,
          month1: new Date("2020-06-30").format('yyyy-MM'),
          month2: new Date("2020-09-30").format('yyyy-MM'),
          project_name: null,
          project_label: '商业'
        }
        this.getList()
      },
      // 编辑
      goEdit(row) {
        this.projectConfigId = row.id
        this.projectConfigRow = row
        this.fastCreate = true
      },
      // 成员列表
      goMember(id) {
        this.memberId = id
        this.fastMember = true
      },
      // 删除
      goDel(id) {
        this.$confirm(`确认要删除吗？`).then(() => {
          TypeApi.del({project_config_id: id}).then(res => {
            if(res.code === 200){
              this.getList()
            }
          })
        })
      },
      formatVal(val, row, index) {
        if (val && typeof val === 'number' && !isNaN(val)) {
          if (index === 0) {
            if (Number(val) > 0) {
              row.color[index] = 1
            } else if (Number(val) === 0) {

            } else {
              row.color[index] = 2
            }
          } else if (index === 1 || index === 2) {
            if (Number(val) > 0 && Number(val) <= 5) {
              row.color[index] = 1
            } else if (Number(val) > 5 && Number(val) <= 15) {
              row.color[index] = 2
            } else if (Number(val) > 15) {
              row.color[index] = 3
            } else {

            }
          } else if (index === 3) {
            if (Number(val) > 0) {
              row.color[index] = 2
            } else if (Number(val) === 0) {

            } else {
              row.color[index] = 1
            }
          }
          return Math.abs(val)
        } else {
          return val
        }
      },
      // 导出
      exportExcel() {
        const token = localStorage.getItem('ys_contract_token')
        if(token) {
          window.location.href = `../${this.$baseURL}/projectStatistics/cl_month_compare_export?token=${token}&month1=${this.query.month1}&month2=${this.query.month2}`
        }
      }
    }
  }
</script>
<style type="text/css" lang="scss" scoped>
  @import '~@styles/common.scss';
  .page{
    width: 100%;
  // overflow-y: auto;
  }
  .page-con{
    width: 100%;
    height: calc(100vh - 84px);
    display: flex;
    overflow-x: auto;
  }
  .list-page{
    padding: 15px;
    overflow-y: auto;
    >h2{
      border-left: 3px solid #4A90E2;
      padding: 5px;
      font-size: 16px;
      background-color: #E3E7E9;
    }
  }
  .logo-title{
    padding: 0 35px;
    height: 44px;
    background-color: #E3E7E9;
    display: flex;
    align-items: center;
    >img{
      width: 75px;
      height: 30px;
      margin-right: 25px;
    }
    >h3{
      font-size: 18px;
      color: #333;
    }
  }
  .cGreen {
    color: #5AB46E;
  }
  .cRed {
    color: #ED1111!important;
  }
  .cDRed {
    color: #ED1111!important;
    font-weight: bolder!important;
  }
</style>
<style>
  .city-popper .el-cascader-panel .el-cascader-menu__wrap {
    height: 400px;
  }
  .el-table >.el-table__fixed-right {
    height: 100% !important;
  }
</style>

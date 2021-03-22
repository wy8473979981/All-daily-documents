<template>
  <!-- 开业率 -->
  <div class="page">
    <div class="title-search-con">
      <div class="logo-title">
        <img src="../../../static/img/bl/bl_sy_logo.svg">
        <h3>资产盘点系统</h3>
      </div>
      <div class="list-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle" style="flex-flow: wrap;">
      <el-col class="" :span="22">
<!--        <el-select placeholder="存量项目" size="mini" v-model="query.project_name" @change="getListChange" filterable clearable style="margin-right: 5px; width: 180px;">-->
<!--          <el-option-->
<!--            v-for="item in projectList"-->
<!--            :key="item.project_config_id"-->
<!--            :label="item.project_name + '-' +item.project_label_name"-->
<!--            :value="item.project_name">-->
<!--          </el-option>-->
<!--        </el-select>-->
        <el-select placeholder="全场/考核" size="mini" v-model="query.quanchang" @change="getListChange('红绿灯')" filterable style="margin-right: 5px; width: 180px;">
          <el-option
            v-for="item in qckh"
            :key="item.id"
            :label="item.name"
            :value="item.id">
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
        <el-button @click="reset" size="mini">重置</el-button>
      </el-col>
      <el-col :span="2" style="text-align: right;">
        <el-button @click="exportExcel" size="mini" type="success">导出</el-button>
      </el-col>
    </el-row>
    <el-table ref="table" :data="tableData" size="mini" border header-row-class-name="table-header" :height="tableHeight">
      <el-table-column min-width="150" label="存量项目" show-overflow-tooltip prop="project_name" />
      <el-table-column min-width="80" label="标签" prop="project_label" align="center" />
      <el-table-column min-width="150" label="建筑面积(㎡)" show-overflow-tooltip align="right" >
        <template  slot-scope="scope">
          <span>{{scope.row.totalSquare.toFixed(1)}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150" label="计租总面积(㎡)" show-overflow-tooltip align="right" >
        <template  slot-scope="scope">
          <span v-if="query.quanchang === 1">{{scope.row.rentSquareKy.toFixed(1)}}</span>
          <span v-if="query.quanchang === 2">{{scope.row.rentSquareKyKh.toFixed(1)}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150" label="开业面积(㎡)" show-overflow-tooltip align="right" >
        <template  slot-scope="scope">
          <span v-if="query.quanchang === 1">{{scope.row.open_area_qc.toFixed(1)}}</span>
          <span v-if="query.quanchang === 2">{{scope.row.open_area_kh.toFixed(1)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="开业率（%）" align="center">
        <el-table-column
          :label="month1 + '月'"
          align="right"
          min-width="100">
          <template slot-scope="scope">
            <span v-if="query.quanchang === 1" :class="[scope.row.color[0] === 1? 'cGreen' : (scope.row.color[0] === 2 ? 'cRed' : (scope.row.color[0] === 3 ? 'cOrange' : ''))]">{{scope.row.month1_qc.toFixed(1)}}</span>
            <span v-if="query.quanchang === 2" :class="[scope.row.color[1] === 1? 'cGreen' : (scope.row.color[1] === 2 ? 'cRed' : (scope.row.color[1] === 3 ? 'cOrange' : ''))]">{{scope.row.month1_Kh.toFixed(1)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="month2 + '月'"
          align="right"
          min-width="100">
          <template slot-scope="scope">
            <span v-if="query.quanchang === 1" :class="[scope.row.color[2] === 1? 'cGreen' : (scope.row.color[2] === 2 ? 'cRed' : (scope.row.color[2] === 3 ? 'cOrange' : ''))]">{{scope.row.month2_qc.toFixed(1)}}</span>
            <span v-if="query.quanchang === 2" :class="[scope.row.color[3] === 1? 'cGreen' : (scope.row.color[3] === 2 ? 'cRed' : (scope.row.color[3] === 3 ? 'cOrange' : ''))]">{{scope.row.month2_Kh.toFixed(1)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="month3 + '月'"
          align="right"
          min-width="100">
          <template slot-scope="scope">
            <span v-if="query.quanchang === 1" :class="[scope.row.color[4] === 1? 'cGreen' : (scope.row.color[4] === 2 ? 'cRed' : (scope.row.color[4] === 3 ? 'cOrange' : ''))]">{{scope.row.month3_qc.toFixed(1)}}</span>
            <span v-if="query.quanchang === 2" :class="[scope.row.color[5] === 1? 'cGreen' : (scope.row.color[5] === 2 ? 'cRed' : (scope.row.color[5] === 3 ? 'cOrange' : ''))]">{{scope.row.month3_Kh.toFixed(1)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="连续2月下降"
          align="right"
          min-width="100">
          <template slot-scope="scope">
            <span v-if="query.quanchang === 1" :class="[scope.row.down2_qc > 0? 'cRed' :  '']">{{scope.row.down2_qc}}</span>
            <span v-if="query.quanchang === 2" :class="[scope.row.down2_kh > 0? 'cRed' :  '']">{{scope.row.down2_kh}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="本月下降"
          align="right"
          min-width="100">
          <template slot-scope="scope">
            <span v-if="query.quanchang === 1" :class="[scope.row.down1_qc > 0? 'cRed' :  '']">{{scope.row.down1_qc}}</span>
            <span v-if="query.quanchang === 2" :class="[scope.row.down1_ch > 0? 'cRed' :  '']">{{scope.row.down1_ch}}</span>
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
          page_size: 200,
          page: 1,
          sum_num: 0
        },
        query: {
          quanchang: 1
        },
        projectList: [], // 存量项目列表
        selectLayout: [],
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
        oldTableData: [],
        qckh: [{id: 1, name: '全场'},{id: 2, name: '考核'}],
        month1: null,
        month2: null,
        month3: null,
      }
    },
    components: {
    },
    watch: {},
    created() {
      this.tableHeight = document.documentElement.clientHeight - 154
      this.month3 = new Date().getMonth() + 1
      this.month2 = this.month3 - 1
      this.month1 = this.month2 - 1
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
        await TypeApi.opening(params).then(res => {
          if(res.code === 200 && res.result){
            this.pageInfo.sum_num = res.result.sum_num
            res.result.data.forEach(item => {
              item.month1_Kh = Number(item.month1_Kh.replace("%",''))
              item.month1_qc = Number(item.month1_qc.replace("%",''))
              item.month2_Kh = Number(item.month2_Kh.replace("%",''))
              item.month2_qc = Number(item.month2_qc.replace("%",''))
              item.month3_Kh = Number(item.month3_Kh.replace("%",''))
              item.month3_qc = Number(item.month3_qc.replace("%",''))
              item.totalSquare = Number(item.totalSquare)
              item.rentSquareKy = Number(item.rentSquareKy)
              item.open_area_qc = Number(item.open_area_qc)
              item.open_area_kh = Number(item.open_area_kh)
              item.rentSquareKyKh = Number(item.rentSquareKyKh)

              item.color = [0, 0, 0, 0, 0, 0]
              if ((item.month3_qc - item.month2_qc) < 0 && (item.month2_qc - item.month1_qc) < 0) {
                item.down2_qc = (item.month1_qc - item.month3_qc).toFixed(1)
              }
              if ((item.month3_Kh - item.month2_Kh) < 0 && (item.month2_Kh - item.month1_Kh) < 0) {
                item.down2_kh = (item.month1_Kh - item.month3_Kh).toFixed(1)
              }
              if ((item.month3_qc - item.month2_qc) < 0) {
                item.down1_qc = (item.month2_qc - item.month3_qc).toFixed(1)
              }
              if ((item.month3_Kh - item.month2_Kh) < 0) {
                item.down1_kh = (item.month2_Kh - item.month3_Kh).toFixed(1)
              }
              this.formatVal(1,item)
            })
            console.log("res.result.data==",res.result.data)
            this.tableData = res.result.data
            this.oldTableData = res.result.data
            // this.pageInfo.sum_num = res.result.sum_num
            getDynamicTableHeight(this)
          }
        })
      },
      // 重新选择搜索项重置页码
      getListChange(light) {
        this.pageInfo.page = 1
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
          // this.getProList()
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
          quanchang: 1
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
      formatVal(type, row) {
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
      exportExcel() {
        const token = localStorage.getItem('ys_contract_token')
        if(token) {
          window.location.href = `../${this.$baseURL}/projectConfig/cl_month_compare_sync_business_export?token=${token}&quanchang=${this.query.quanchang}`
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
  .cOrange {
    color: #e6a23c !important;
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

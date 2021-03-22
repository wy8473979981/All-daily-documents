<template>
  <!-- 在建资产 -->
  <div class="list-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle">
      <el-col :span="17" >
        <el-select placeholder="在建项目" size="mini" v-model="query.project_name" @change="getListChange" filterable clearable style="margin-right: 5px; width: 180px;">
          <el-option
            v-for="(item, index) in projectListBL"
            :key="index"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <el-select placeholder="经营期操盘类型" size="mini" v-model="query.type_config_id" @change="getListChange" clearable style="margin-right: 5px; width: 180px;">
          <el-option
            v-for="item in type_config_idList"
            :key="item.type_config_id"
            :label="item.name"
            :value="item.type_config_id">
          </el-option>
        </el-select>
        <el-select placeholder="地产开发事业部" size="mini" v-model="query.estate_devlop_division" @change="getListChange" clearable style="margin-right: 5px; width: 180px;">
          <el-option
            v-for="item in estate_devlop_divisionList"
            :key="item.type_config_id"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
        <el-select placeholder="委托管理公司" size="mini" v-model="query.business_area_company" @change="getListChange" clearable style="margin-right: 5px; width: 180px;">
          <el-option
            v-for="item in business_area_companyList"
            :key="item.type_config_id"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
        <el-cascader
          placeholder="城市"
          size="mini"
          v-model="cityValue"
          :options="cityList"
          :show-all-levels="false"
          :props="{ expandTrigger: 'hover', label: 'name', value: 'name' }"
          filterable
          @change="cityChange"
          clearable
          popper-class="city-popper"
          style="width: 180px;margin-right: 5px;">
        </el-cascader>
        <el-select placeholder="项目类型" size="mini" v-model="query.summary_type" @change="getListChange" style="margin-right: 5px; width: 180px;">
          <el-option
            v-for="item in configureList"
            :key="item.type_config_id"
            :label="item.name"
            :value="item.type_config_id">
          </el-option>
        </el-select>
        <el-button @click="reset" size="mini">重置</el-button>
<!--        <el-button v-if="permission.indexOf('lxpz_edit') > -1" @click="synch" size="mini" type="success">同步</el-button>-->
      </el-col>
      <el-col :span="7" style="text-align: right;">
        <el-button @click="openOccupancy" size="mini" type="success">出租率</el-button>
        <el-button @click="openOpening" size="mini" type="success">开业率</el-button>
        <el-button @click="openAnalysis" size="mini" type="success">对比分析</el-button>
        <el-button @click="openArea" size="mini" type="success">建面对比</el-button>
      </el-col>
    </el-row>
    <el-table ref="table" :data="tableData" size="mini" header-row-class-name="table-header" :max-height="this.$store.state.tableHeight">
      <el-table-column fixed min-width="150" label="在建项目" show-overflow-tooltip prop="project_name" />
      <el-table-column min-width="80" label="业态" show-overflow-tooltip prop="layout" align="center">
        <template slot-scope="scope">
          <span v-if="query.summary_type == 1 && scope.row.layout">
            <span v-if="scope.row.layout.indexOf('1') > -1">商业<span v-if="scope.row.layout.indexOf('2') > -1 || scope.row.layout.indexOf('3') > -1 || scope.row.layout.indexOf('4') > -1 || scope.row.layout.indexOf('5') > -1">,</span></span>
            <span v-if="scope.row.layout.indexOf('2') > -1">酒店<span v-if="scope.row.layout.indexOf('3') > -1 || scope.row.layout.indexOf('4') > -1 || scope.row.layout.indexOf('5') > -1">,</span></span>
            <span v-if="scope.row.layout.indexOf('3') > -1">办公<span v-if="scope.row.layout.indexOf('4') > -1 || scope.row.layout.indexOf('5') > -1">,</span></span>
            <span v-if="scope.row.layout.indexOf('4') > -1">公寓<span v-if="scope.row.layout.indexOf('5') > -1">,</span></span>
            <span v-show="scope.row.layout.indexOf('5') > -1">车库</span>
          </span>
          <span v-if="query.summary_type != 1 && scope.row.layout">{{scope.row.layout || ""}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="120" label="经营期操盘类型" prop="type_config_name" align="center" />
      <el-table-column min-width="120" label="地产开发事业部" show-overflow-tooltip prop="estate_devlop_division" align="center" />
      <el-table-column min-width="150" label="委托管理公司" show-overflow-tooltip prop="business_area_company" align="center" />
      <el-table-column min-width="80" label="城市" show-overflow-tooltip prop="city" align="center" />
      <el-table-column min-width="100" label="建筑总面积(㎡)"align="right">
        <template slot-scope="scope">
          <span>{{query.summary_type != 1?scope.row.build_area:''}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="100" label="已交付(㎡)" align="right">
        <template slot-scope="scope">
          <span>{{query.summary_type == 1?scope.row.build_area:(query.summary_type == 3?scope.row.opened_area:'')}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="100" label="未交付(㎡)" align="right">
        <template slot-scope="scope">
          <span :class="!isNegative(scope.row.unopened_area)?'font-red':''">{{scope.row.unopened_area}}</span>
        </template>
      </el-table-column>
<!--      <el-table-column fixed="right" width="130" label="操作">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button type="text" size="mini" @click="goMember(scope.row.id)">成员列表</el-button>-->
<!--          <el-button type="text" v-if="permission.indexOf('lxpz_edit') > -1" size="mini" @click="goDetail(scope.row)">编辑</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
    </el-table>

    <ys-paginator :page-info="pageInfo" @handlePaginator="handlePaginator"/>
    <!-- dialog -->
    <div>
      <!-- 新增 -->
      <edit-build  :open="fastCreate" :id="projectConfigId" :row="projectConfigRow" @close="closeCreate"></edit-build>
      <!-- 成员列表 -->
      <member :open="fastMember" :id="memberId" @close="closeMember"></member>
    </div>
  </div>
</template>

<script>
import { handlePaginator } from '@mixins'
import { getDynamicTableHeight } from '@/utils/index';
import EditBuild from './editBuild';
import Member from './member'
import TypeApi from '@/apis/apis/typeApi'
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
        project_type: 2,
        project_name: null,
        type_config_id: null,
        estate_devlop_division: null,
        business_area_company: null,
        city: null,
        zj_configure: null,
        summary_type: null
      },
      projectListBL: [], //在建项目列表
      projectList: [], // 存量项目列表
      type_config_idList: [],
      estate_devlop_divisionList: [], //地产开发事业部
      business_area_companyList: [], //委托管理公司
      configureList: [],// 是否配置项目
      cityValue: [],
      cityList: [],
      tableData: [],
      fastCreate: false,
      projectConfigId: null, // 编辑id
      projectConfigRow: null,
      fastMember: false,
      memberId: null, // 编辑id
      permission: `${localStorage.getItem('ys_contract_permission')}`
    }
  },
  components: {
    EditBuild,
    Member
  },
  watch: {},
  created() {
    this.query.summary_type = 3
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
    }
  },
  methods: {
    // 获取存量项目列表
    getProList() {
      // TypeApi.projectDropDown({project_type: 2, is_check: true}).then(res => {
      //   if(res.code === 200 && res.result){
      //     this.projectList = res.result
      //   }
      // })
      TypeApi.projectBl().then(res => {
        if(res.code === 200 && res.result){
          this.projectListBL = res.result
        }
      })
      TypeApi.cityList().then(res => {
        if(res.code === 200 && res.result){
          for (var key in res.result) {
            this.cityList.push(res.result[key])
          }
        }
      })
    },
    // 获取权益类型列表
    getTypeList() {
      TypeApi.typeDropDown().then(res => {
        if(res.code === 200 && res.result){
          this.type_config_idList = res.result.equity   // res.result.operating_period
          this.estate_devlop_divisionList = res.result.estate_devlop_division
          this.business_area_companyList = res.result.business_area_company
          // this.configureList = res.result.zj_configure
          this.configureList = [{type_config_id:1,name:'已交付'},{type_config_id:2,name:'未交付'},{type_config_id:3,name:'部分交付'}]
        }
      })
    },
    // 查询
    async getList() {
      const params = {
        ...this.pageInfo,
        ...this.query
      }
      await TypeApi.findAll(params).then(res => {
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
      this.getList()
    },
    cityChange(val) {
      this.query.city = val[1]
      this.getListChange()
    },
    stockAdd() {
      this.fastCreate = true
    },
    closeMember(res) {
      this.memberId = null
      this.fastMember = res.fast
      if(res.reload) {
        this.getList()
      }
    },
    closeCreate(res) {
      this.cpaId = null
      this.fastCreate = res.fast
      if(res.reload) {
        this.getList()
        this.getProList()
      }
    },
    reset() {
      this.query = {
        project_type: 2,
        project_config_name: null,
        type_config_id: null,
        estate_devlop_division: null,
        business_area_company: null,
        city: null,
        summary_type: 3
      }
      this.getList()
    },
    // 成员列表
    goMember(id) {
      this.memberId = id
      this.fastMember = true
    },
    // 详情
    goDetail(row) {
      this.projectConfigId = row.id
      this.projectConfigRow = row
      this.fastCreate = true;
    },
    // 同步
    synch() {
      TypeApi.synch().then(res => {
        if(res.code === 200){
          this.getList()
        }
      })
    },
    // 导出
    exportExcel() {
      const token = localStorage.getItem('ys_contract_token')
      if(token) {
        window.location.href = `../${this.$baseURL}/projectConfig/export?token=${token}`
      }
    },
    isNegative(num) {
      return new Number(num) > 0
    },
    openAnalysis() {
      window.open(location.origin + '/#/analysis')
    },
    openOpening() {
      window.open(location.origin + '/#/opening')
    },
    openOccupancy() {
      window.open(location.origin + '/#/occupancy')
    },
    openArea() {
      window.open(location.origin + '/#/covered')
    }
  }
}
</script>
<style type="text/css" lang="scss" scoped>
  @import '~@styles/common.scss';
  .font-red {
    color: red;
  }
</style>
<style>
.city-popper .el-cascader-panel .el-cascader-menu__wrap {
  height: 400px;
}

</style>

<template>
  <!-- 存量资产 -->
  <div class="list-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle" style="flex-flow: wrap;">
      <el-col class="">
        <el-select placeholder="地产开发事业部" size="mini" v-model="query.estate_devlop_division" @change="getListChange" clearable style="margin-right: 5px; width: 180px;">
          <el-option
            v-for="item in estate_devlop_divisionList"
            :key="item.type_config_id"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
        <el-select placeholder="项目名称" size="mini" v-model="query.name" @change="getListChange" filterable clearable style="margin-right: 5px; width: 180px;">
          <el-option
            v-for="item in projectList"
            :key="item.project_config_id"
            :label="item.project_name + '-' +item.project_label_name"
            :value="item.project_name">
          </el-option>
        </el-select>
        <el-select placeholder="业态" size="mini" v-model="query.layout" @change="getListChange" filterable clearable style="margin-right: 5px; width: 180px;">
          <el-option
            v-for="item in selectLayoutList"
            :key="item.layoutId"
            :label="item.name"
            :value="item.layoutId">
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
          style="margin-right: 5px; width: 180px;">
        </el-cascader>
        <el-button @click="reset" size="mini">重置</el-button>
        <el-button v-if="permission.indexOf('lxpz_edit') > -1" @click="stockAdd" size="mini" type="success">新增</el-button>
      </el-col>
    </el-row>
    <el-table ref="table" :data="tableData" size="mini" border header-row-class-name="table-header" :height="this.$store.state.tableHeight">
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column min-width="150" label="项目名称（开发）" show-overflow-tooltip prop="cardName" />
      <el-table-column min-width="100" label="业态" show-overflow-tooltip prop="layoutName" />
      <el-table-column min-width="150" label="项目名称（经营）" show-overflow-tooltip prop="bisName" />
      <el-table-column min-width="150" label="项目简称" show-overflow-tooltip prop="name" />
      <el-table-column min-width="120" label="地产开发事业部" prop="departName" show-overflow-tooltip align="center" />
      <el-table-column min-width="120" label="项目属性" prop="type" show-overflow-tooltip align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.type === 1? '存量项目' : (scope.row.type === 2? '在建项目' : (scope.row.type === 3? '投前项目' : '')) }}</span>
        </template>
      </el-table-column>
<!--      <el-table-column min-width="180" label="建筑总面积（不含车库）(㎡)" align="right">-->
<!--        <template slot-scope="scope">-->
<!--          <span>{{ scope.row.buldArea | formatVal }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column fixed="right" width="180" label="操作">
        <template slot-scope="scope">
          <el-button v-if="permission.indexOf('lxpz_delete') > -1" size="mini" type="text" @click="goDel(scope.row.id)">删除</el-button>
          <el-button type="text" v-if="permission.indexOf('lxpz_edit') > -1" size="mini" @click="goEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <ys-paginator :page-info="pageInfo" @handlePaginator="handlePaginator"/>
    <!-- dialog -->
    <div>
      <!-- 新增 -->
      <edit-project :open="fastCreate" :id="projectConfigId" :row="projectConfigRow" @close="closeCreate"></edit-project>
    </div>
  </div>
</template>

<script>
import { handlePaginator } from '@mixins'
import { toThousandsClean, getDynamicTableHeight } from '@/utils/index'
import EditProject from './editProject'
import TypeApi from '@/apis/apis/typeApi'
import CalculationApi from '@/apis/apis/income/calculation/calculationApi'
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
        depart: null,
        layout: null,
        name: null,
        type: null // 1存量项目2在建项目3投前项目
      },
      projectList: [], // 存量项目列表
      selectLayout: [],
      selectLayoutList: [],
      project_labelList: [], // 标签
      type_config_idList: [], // 权益类型列表
      estate_devlop_divisionList: [], // 地产开发事业部
      business_area_companyList: [], // 委托管理公司
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
    EditProject
  },
  watch: {},
  created () {
    this.getLayoutList()
    this.getProList()
    this.getTypeList()
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
      return toThousandsClean(val)
    }
  },
  methods: {
    async getLayoutList () {
      // 业态集合
      try {
        await CalculationApi.getLayoutList().then(res => {
          if (res.code === 200) {
            this.selectLayoutList = res.result.list
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    // 获取存量项目列表
    getProList () {
      TypeApi.projectDropDown({ project_type: 1, is_check: true }).then(res => {
        if (res.code === 200 && res.result) {
          this.projectList = res.result
        }
      })
      TypeApi.cityList().then(res => {
        if (res.code === 200 && res.result) {
          for (var key in res.result) {
            this.cityList.push(res.result[key])
          }
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
      await TypeApi.getProjectList(params).then(res => {
        if (res.code === 200 && res.result) {
          this.tableData = res.result.list
          this.pageInfo.sum_num = res.result.total
          getDynamicTableHeight(this)
        }
      })
    },
    // 重新选择搜索项重置页码
    getListChange () {
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
        label: null,
        project_label: null,
        project_config_id: null,
        type_config_id: null,
        estate_devlop_division: null,
        business_area_company: null,
        city: null
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
        TypeApi.delProject({ id: id }).then(res => {
          if (res.code === 200) {
            this.getList()
          }
        })
      })
    },
    // 同步
    async synch () {
      await TypeApi.synchCL().then(res => {
        if (res.code === 200) {
          this.getList()
        }
      })
      await TypeApi.synchCLArea().then(res => {
        if (res.code === 200) {
          this.getList()
        }
      })
    }
  }
}
</script>
<style type="text/css" lang="scss" scoped>
  @import '~@styles/common.scss';
</style>
<style>
.city-popper .el-cascader-panel .el-cascader-menu__wrap {
  height: 400px;
}
</style>

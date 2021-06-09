<template>
  <!-- 存量资产 -->
  <div class="list-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle" style="flex-flow: wrap;">
      <el-col class="" :span="20">
        <el-select placeholder="地产开发事业部" size="mini" v-model="query.depart" @change="getListChange" clearable style="margin-right: 5px; width: 180px;">
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
            :key="item.projectId"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
        <el-select placeholder="业态" size="mini" v-model="query.layout" @change="getListChange" multiple collapse-tags filterable clearable style="margin-right: 5px; width: 180px;">
          <el-option
            v-for="item in selectLayoutList"
            :key="item.layoutId"
            :label="item.name"
            :value="item.layoutId">
          </el-option>
        </el-select>
        <el-select placeholder="项目属性" size="mini" v-model="query.type" @change="getListChange" multiple collapse-tags filterable clearable style="margin-right: 5px; width: 180px;">
          <el-option
            v-for="item in typeList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <el-button @click="reset" size="mini">重置</el-button>
      </el-col>
      <el-col :span="4" type="flex" align="right" style="display: flex;justify-content: flex-end;">
        <el-button v-if="permission.indexOf('lxpz_edit') > -1" @click="stockAdd" size="mini" type="success">新增</el-button>
        <el-button size="mini" type="text" class="filter-icon" @click="display = true"></el-button>
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
      <el-table-column min-width="100" label="省" prop="provinceName" show-overflow-tooltip />
      <el-table-column min-width="100" label="市" prop="cityName" show-overflow-tooltip />
      <el-table-column min-width="100" label="区" prop="countyName" show-overflow-tooltip />
      <template v-for="head in tableHeaders">
        <el-table-column v-if="head.selected" :min-width="head.width" :label="head.value" :prop="head.key" show-overflow-tooltip />
      </template>
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
    <!-- 表头筛选 -->
    <ys-tableHeaderDrawer title="设置显示字段" direction="rtl" :display.sync="display" @filterSave="filterSave" :inner="false" :mask="true" footerBtnSave="确定" footerBtnCancel="取消" :tableHeaders="tableHeaders"></ys-tableHeaderDrawer>
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
        depart: null, // 部门
        layout: [], // 业态
        name: null, // 项目名
        type: [1, 2] // 1存量项目2在建项目3投前项目
      },
      projectList: [], // 项目列表
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
      permission: `${localStorage.getItem('ys_contract_permission')}`,
      typeList: [{ id: 1, name: '存量项目' }, { id: 2, name: '在建项目' }, { id: 3, name: '投前项目' }],
      display: false,
      tableHeaders: [
        { value: '产品线', key: 'projectLine', width: '100', selected: false, indeterminate: false, list: [] },
        { value: '项目来源', key: 'fromName', width: '100', selected: false, indeterminate: false, list: [] }, // 项目来源 1：amp 2、pms 3、身份证
        { value: '签约时间', key: 'signTime', width: '170', selected: false, indeterminate: false, list: [] },
        { value: '开业时间', key: 'openTime', width: '170', selected: false, indeterminate: false, list: [] },
        // { value: '项目状态', key: 'projectStatus', width: '100', selected: false, indeterminate: false, list: [] }, //筹备、待签约、在营
        { value: '管理模式', key: 'manageType', width: '100', selected: false, indeterminate: false, list: [] },
        { value: '合同期限', key: 'contractTime', width: '100', selected: false, indeterminate: false, list: [] },
        { value: '到期时间', key: 'expireTime', width: '170', selected: false, indeterminate: false, list: [] },
        { value: '商业分区', key: 'bisZone', width: '100', selected: false, indeterminate: false, list: [] },
        // { value: '地产分区', key: 'geographyZone', width: '100', selected: false, indeterminate: false, list: [] },
        { value: '地理分区', key: 'geographyZone', width: '100', selected: false, indeterminate: false, list: [] },
        { value: 'GFA/方', key: 'gfaArea', width: '100', selected: false, indeterminate: false, list: [] },
        { value: 'MALL/方', key: 'mallArea', width: '100', selected: false, indeterminate: false, list: [] },
        { value: '商业街/方', key: 'bisStreetArea', width: '100', selected: false, indeterminate: false, list: [] },
        { value: '停车场/方', key: 'parkArea', width: '100', selected: false, indeterminate: false, list: [] },
        // { value: '项目业态', key: 'projectLine', width: '100', selected: false, indeterminate: false, list: [] },
        { value: '建筑面积', key: 'buldArea', width: '100', selected: false, indeterminate: false, list: [] },
        { value: '土地成本', key: 'landCost', width: '100', selected: false, indeterminate: false, list: [] },
        { value: '建安成本', key: 'basisAndOtherCost', width: '100', selected: false, indeterminate: false, list: [] }
        // { value: '单方总投', key: 'projectLine', width: '100', selected: false, indeterminate: false, list: [] },
        // { value: '10年YOC', key: 'projectLine', width: '100', selected: false, indeterminate: false, list: [] },
        // { value: '10年IRR', key: 'projectLine', width: '100', selected: false, indeterminate: false, list: [] },
        // { value: '6年IRR', key: 'projectLine', width: '100', selected: false, indeterminate: false, list: [] },
        // { value: '可承担地价-yoc', key: 'projectLine', width: '150', selected: false, indeterminate: false, list: [] },
        // { value: '可承担地价-IRR', key: 'projectLine', width: '150', selected: false, indeterminate: false, list: [] }
      ]
    }
  },
  components: {
    EditProject
  },
  watch: {
    tableHeaders: {
      handler (newName, oldName) {
        this.$nextTick(() => {
          this.$refs.table.doLayout() // 解决表格错位
        })
      },
      immediate: true,
      deep: true
    }
  },
  created () {
    this.getLayoutList()
    this.getProjectList()
    // this.getTypeList()
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
    // 项目列表
    async getProjectList () {
      await CalculationApi.getProjectList().then(res => {
        if (res.code === 200) {
          res.result.list.forEach(item => {
            item.formName = item.form === 1 ? 'amp' : item.form === 2 ? 'pms' : '身份证'
          })
          this.projectList = res.result.list
        }
      })
    },
    async getLayoutList () {
      // 业态集合
      try {
        await CalculationApi.getLayoutList().then(res => {
          if (res.code === 200) {
            this.selectLayoutList = res.result.list
            if (this.query.layout.length === 0) this.query.layout = [1]
          }
        })
      } catch (e) {
        console.log(e)
      }
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
          res.result.list.forEach(item => {
            if (item.openTime) {
              item.openTime = item.openTime.toString().substr(0, 10)
            }
          })
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
    stockAdd () {
      this.fastCreate = true
    },
    closeCreate (res) {
      this.projectConfigId = null
      this.projectConfigRow = null
      this.fastCreate = res.fast
      if (res.reload) {
        this.getList()
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
        depart: null, // 部门
        layout: [1], // 业态
        name: null, // 项目名
        type: [1, 2] // 1存量项目2在建项目3投前项目
      }
      this.getList()
    },
    // 编辑
    goEdit (row) {
      this.projectConfigId = row.id
      this.projectConfigRow = row
      this.fastCreate = true
    },
    filterSave (data) {
      this.display = data.flag
      this.tableHeaders = JSON.parse(JSON.stringify(data.tableHeaders))
      this.tableData = Object.assign([], this.tableData)
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
  .filter-icon {
    width: 30px;
    height: 30px;
    position: relative;
    border: 1px solid #468ceb;
    &::before {
      content: "";
      width: 25px;
      height: 25px;
      position: absolute;
      top: 0;
      left: 0;
      background: url("../../assets/images/filter_icon.png") center center
      no-repeat;
      background-size: 25px 25px;
    }
  }
</style>
<style>
.city-popper .el-cascader-panel .el-cascader-menu__wrap {
  height: 400px;
}
</style>

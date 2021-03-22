<template>
  <!-- 存量资产 -->
  <div class="list-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle" style="flex-flow: wrap;">
      <el-col class="">
          <el-select placeholder="存量项目" size="mini" v-model="query.project_config_id" @change="getListChange" filterable clearable style="margin-right: 5px; width: 180px;">
            <el-option
              v-for="item in projectList"
              :key="item.project_config_id"
              :label="item.project_name + '-' +item.project_label_name"
              :value="item.project_config_id">
            </el-option>
          </el-select>
          <el-select placeholder="业态" size="mini" v-model="selectLayout" @change="layoutChange" multiple collapse-tags clearable style="margin-right: 5px; width: 180px;">
            <el-option
              v-for="item in selectLayoutList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select placeholder="标签" size="mini" v-model="query.project_label" @change="getListChange" filterable clearable style="margin-right: 5px; width: 180px;">
            <el-option
              v-for="item in project_labelList"
              :key="item.type_config_id"
              :label="item.name"
              :value="item.type_config_id">
            </el-option>
          </el-select>
          <el-select placeholder="权益类型" size="mini" v-model="query.type_config_id" @change="getListChange" clearable style="margin-right: 5px; width: 180px;">
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
            style="margin-right: 5px; width: 180px;">
          </el-cascader>
          <el-button @click="reset" size="mini">重置</el-button>
          <el-button v-if="permission.indexOf('lxpz_edit') > -1" @click="stockAdd" size="mini" type="success">新增</el-button>
      </el-col>
    </el-row>
    <el-table ref="table" :data="tableData" size="mini" border stripe header-row-class-name="table-header" :height="this.$store.state.tableHeight">
      <el-table-column fixed min-width="150" label="存量项目" show-overflow-tooltip prop="project_name" />
      <el-table-column min-width="180" label="业态">
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
      <el-table-column min-width="80" label="标签" prop="project_label_name" align="center" />
      <el-table-column min-width="150" label="权益类型" prop="type_config_name" align="center" />
      <el-table-column min-width="120" label="地产开发事业部" prop="estate_devlop_division" show-overflow-tooltip align="center" />
      <el-table-column min-width="150" label="委托管理公司" prop="business_area_company" show-overflow-tooltip align="center" />
      <el-table-column min-width="100" label="城市" prop="city" show-overflow-tooltip align="center" />
      <el-table-column min-width="180" label="建筑总面积（不含车库）(㎡)" align="right">
        <template slot-scope="scope">
          <span>{{ scope.row.build_area | formatVal }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="100" label="车库面积(㎡)" align="right">
        <template slot-scope="scope">
          <span>{{ scope.row.garage_area | formatVal }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" width="180" label="操作">
        <template slot-scope="scope">
          <el-button type="text" v-if="permission.indexOf('lxpz_edit') > -1" size="mini" @click="goMember(scope.row.id)">成员列表</el-button>
          <el-button type="text" v-if="permission.indexOf('lxpz_edit') > -1" size="mini" @click="goEdit(scope.row)">编辑</el-button>
          <el-button v-if="permission.indexOf('lxpz_delete') > -1" size="mini" type="text" @click="goDel(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <ys-paginator :page-info="pageInfo" @handle_paginator="handle_paginator"/>
    <!-- dialog -->
    <div>
      <!-- 新增 -->
      <create-stock :open="fastCreate" :id="projectConfigId" :row="projectConfigRow" @close="closeCreate"></create-stock>
      <!-- 成员列表 -->
      <member :open="fastMember" :id="memberId" @close="closeMember"></member>
    </div>
  </div>
</template>

<script>
import { handle_paginator } from '@mixins'
import { toThousandsClean, getDynamicTableHeight } from '@/utils/index'
import TypeApi from '@/apis/apis/typeApi'
export default {
  mixins: [handle_paginator],
  data () {
    return {
      pageInfo: {
        page_size: 50,
        page: 1,
        sum_num: 0
      },
      query: {
        project_type: 1,
        label: null,
        project_label: null,
        project_config_id: null,
        type_config_id: null,
        estate_devlop_division: null,
        business_area_company: null,
        city: null
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
        }
      ],
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
  watch: {},
  created () {
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
      await TypeApi.find(params).then(res => {
        if (res.code === 200 && res.result) {
          this.tableData = res.result.data
          this.pageInfo.sum_num = res.result.sum_num
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
        project_type: 1,
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
        TypeApi.del({ project_config_id: id }).then(res => {
          if (res.code === 200) {
            this.getList()
          }
        })
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

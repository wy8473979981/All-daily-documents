<template>
  <!-- 在建资产 -->
  <div class="list-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle">
      <el-col :span="22" >
        <!-- <div>
          <el-select placeholder="在建项目" size="mini" v-model="query.project_config_id" @change="getListChange" filterable clearable>
            <el-option
              v-for="item in projectList"
              :key="item.project_config_id"
              :label="item.project_name"
              :value="item.project_config_id">
            </el-option>
          </el-select>
        </div> -->
        <el-select placeholder="在建项目" size="mini" v-model="query.project_config_name" @change="getListChange" filterable clearable style="margin-right: 5px; width: 180px;">
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
        <el-select placeholder="业态" size="mini" v-model="query.layout" @change="getListChange" clearable style="margin-right: 5px; width: 180px;">
          <el-option
            v-for="item in selectLayoutList"
            :key="item.value"
            :label="item.label"
            :value="item.label">
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
        <el-select placeholder="是否配置项目" size="mini" v-model="query.zj_configure" @change="getListChange" clearable style="margin-right: 5px; width: 180px;">
          <el-option
            v-for="item in configureList"
            :key="item.type_config_id"
            :label="item.name"
            :value="item.type_config_id">
          </el-option>
        </el-select>
        <el-button @click="reset" size="mini">重置</el-button>
        <el-button v-if="permission.indexOf('lxpz_edit') > -1" @click="synch" size="mini" type="success">同步</el-button>
      </el-col>
      <el-col :span="2" style="text-align: right;">
        <el-button v-if="permission.indexOf('lxpz_edit') > -1" @click="exportExcel" size="mini" type="success">导出</el-button>
      </el-col>
    </el-row>
    <el-table ref="table" :data="tableData" size="mini" header-row-class-name="table-header" :max-height="this.$store.state.tableHeight">
      <el-table-column fixed min-width="150" label="在建项目" show-overflow-tooltip prop="project_name" />
      <el-table-column min-width="80" label="汇总业态" show-overflow-tooltip prop="layout" align="center" />
<!--      <el-table-column min-width="80" label="标签" prop="project_label_name" align="center" />-->
      <el-table-column min-width="130" label="经营期操盘类型" prop="type_config_name" align="center" />
      <el-table-column min-width="130" label="地产开发事业部" show-overflow-tooltip prop="estate_devlop_division" align="center" />
      <el-table-column min-width="150" label="委托管理公司" show-overflow-tooltip prop="business_area_company" align="center" />
      <el-table-column min-width="100" label="委管状态栏" prop="entrust_manage_area" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.entrust_manage_status == 1 ? '是' : (scope.row.entrust_manage_status == 2 ? '否': (scope.row.entrust_manage_status == 3 ? '/': '')) }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="100" label="委管面积(㎡)" prop="entrust_manage_area" align="right" />
      <el-table-column min-width="110" label="建筑总面积(㎡)" prop="build_area" align="right" />
      <el-table-column min-width="150" label="自持时间" prop="support_date_text" show-overflow-tooltip align="center" />
      <el-table-column min-width="120" label="分配状态栏" prop="" align="center" >
        <template slot-scope="scope">
          <span>{{scope.row.self_type === '0' ? '宝龙持有' : (scope.row.self_type == '1' ? '合作方持有': (scope.row.self_type == '2' ? '暂时共同持有': (scope.row.self_type == '3' ? '共同持有': (scope.row.self_type == '9' ? '未分配': '')))) }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="110" label="竣工时间" prop="" align="center" >
        <template slot-scope="scope">
          <span>{{scope.row.completion_date?scope.row.completion_date.substr(0,10): ''}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="110" label="预计开业时间" prop="" align="center" >
        <template slot-scope="scope">
          <span>{{scope.row.open_date?scope.row.open_date.substr(0,10): ''}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="80" label="城市" show-overflow-tooltip prop="city" align="center" />
<!--      <el-table-column min-width="100" label="未开业(㎡)" prop="open_area" align="right" />-->
<!--      <el-table-column min-width="100" label="已开业(㎡)" prop="unopen_area" align="right" />-->
      <el-table-column fixed="right" width="130" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="goMember(scope.row.id)">成员列表</el-button>
          <el-button type="text" v-if="permission.indexOf('lxpz_edit') > -1" size="mini" @click="goDetail(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
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
import { getDynamicTableHeight } from '@/utils/index'
import EditBuild from './editBuild'
import Member from './member'
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
        project_type: 2,
        project_config_name: null,
        type_config_id: null,
        estate_devlop_division: null,
        business_area_company: null,
        city: null,
        zj_configure: null,
        layout: null
      },
      projectListBL: [], // 在建项目列表
      projectList: [], // 存量项目列表
      type_config_idList: [],
      estate_devlop_divisionList: [], // 地产开发事业部
      business_area_companyList: [], // 委托管理公司
      configureList: [], // 是否配置项目
      cityValue: [],
      cityList: [],
      tableData: [],
      fastCreate: false,
      projectConfigId: null, // 编辑id
      projectConfigRow: null,
      fastMember: false,
      memberId: null, // 编辑id
      permission: `${localStorage.getItem('ys_contract_permission')}`,
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
          label: '酒店式公寓'
        },
        {
          value: 5,
          label: '车库'
        }
      ]
    }
  },
  components: {
    EditBuild,
    Member
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
    }
  },
  methods: {
    // 获取存量项目列表
    getProList () {
      // TypeApi.projectDropDown({project_type: 2, is_check: true}).then(res => {
      //   if(res.code === 200 && res.result){
      //     this.projectList = res.result
      //   }
      // })
      TypeApi.projectBl().then(res => {
        if (res.code === 200 && res.result) {
          this.projectListBL = res.result
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
          this.type_config_idList = res.result.equity // res.result.operating_period
          this.estate_devlop_divisionList = res.result.estate_devlop_division
          this.business_area_companyList = res.result.business_area_company
          this.configureList = res.result.zj_configure
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
          if (res.result.data) {
            res.result.data.forEach(item => {
              item.entrust_manage_area = item.entrust_manage_area === '0' ? '' : item.entrust_manage_area
            })
            this.tableData = res.result.data
            this.pageInfo.sum_num = res.result.sum_num
            getDynamicTableHeight(this)
          } else {
            this.tableData = []
          }
        } else {
          this.tableData = []
        }
      })
    },
    // 重新选择搜索项重置页码
    getListChange () {
      this.pageInfo.page = 1
      this.getList()
    },
    cityChange (val) {
      this.query.city = val[1]
      this.getListChange()
    },
    stockAdd () {
      this.fastCreate = true
    },
    closeMember (res) {
      this.memberId = null
      this.fastMember = res.fast
      if (res.reload) {
        this.getList()
      }
    },
    closeCreate (res) {
      this.cpaId = null
      this.fastCreate = res.fast
      if (res.reload) {
        this.getList()
        this.getProList()
      }
    },
    reset () {
      this.query = {
        project_type: 2,
        project_config_name: null,
        type_config_id: null,
        estate_devlop_division: null,
        business_area_company: null,
        city: null,
        layout: null
      }
      this.getList()
    },
    // 成员列表
    goMember (id) {
      this.memberId = id
      this.fastMember = true
    },
    // 详情
    goDetail (row) {
      this.projectConfigId = row.id
      this.projectConfigRow = row
      this.fastCreate = true
    },
    // 同步
    synch () {
      TypeApi.synch().then(res => {
        if (res.code === 200) {
          this.getList()
        }
      })
    },
    // 导出
    exportExcel () {
      const token = localStorage.getItem('ys_contract_token')
      if (token) {
        window.location.href = `../${this.$baseURL}/projectConfig/export?token=${token}`
      }
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

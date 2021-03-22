<template>
  <div>
    <el-drawer
      :visible.sync="fast"
      direction="rtl"
      :append-to-body="true"
      :withHeader="false"
      :wrapperClosable="true"
      size="80%">
      <div class="dialog-close-icon" @click="cancel" >
        <i></i>
      </div>
      <div class="table-detail">
        <el-row class="fast-top-bar" type="flex" justify="space-between" align="middle">
          <el-col>
            <h3>资产明细</h3>
          </el-col>
          <el-col style="text-align: right;">
            <el-button plain @click="exportExcel">导出</el-button>
            <el-button plain @click="cancel">关闭</el-button>
          </el-col>
        </el-row>
        <div class="con" style="padding: 20px;">
          <el-row type="flex" justify="space-between" align="middle" style="flex-flow: wrap; padding-bottom: 15px;">
            <el-col :span="24" style="display: flex; align-items: center;">
              <el-cascader
                style="margin-right: 10px;width: 260px;"
                size="medium"
                v-model="ranglDetail"
                placeholder="选择范围"
                :options="range_list"
                :props="props"
                collapse-tags
                clearable
                @change="rangChange">
              </el-cascader>
<!--              <el-select placeholder="自持/可售" v-model="query.status_two" @change="getListChange" multiple collapse-tags clearable style="margin-right: 10px; width: 180px;" size="medium">-->
<!--                <el-option-->
<!--                  v-for="item in status_twoList"-->
<!--                  :key="item.type_config_id"-->
<!--                  :label="item.name"-->
<!--                  :value="item.type_config_id">-->
<!--                </el-option>-->
<!--              </el-select>-->
              <el-select placeholder="在建项目" size="medium" v-model="query.project_config_name" @change="getListChange" filterable clearable style="margin-right: 10px; width: 200px;">
                <el-option
                  v-for="(item, index) in projectListBL"
                  :key="index"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
              <el-select placeholder="汇总业态" size="medium" v-model="query.layout" @change="getListChange" collapse-tags clearable style="margin-right: 10px; width: 200px;">
                <el-option
                  v-for="item in layoutList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label">
                </el-option>
              </el-select>
              <el-select placeholder="分配状态栏" size="medium" :disabled="isCar" v-model="query.self_type" @change="getListChange" clearable style="margin-right: 10px; width: 220px;">
                <el-option
                  v-for="(item, index) in selfTypeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-select placeholder="是否签署委托协议" size="medium" v-model="query.entrust_manage_status" @change="getListChange" clearable style="margin-right: 10px; width: 200px;">
                <el-option
                  v-for="(item, index) in entrust_idList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
<!--              <el-select placeholder="经营期操盘类型" size="medium" v-model="query.type_config_id" @change="getListChange" clearable style="margin-right: 10px; width: 180px;">-->
<!--                <el-option-->
<!--                  v-for="item in type_config_idList"-->
<!--                  :key="item.type_config_id"-->
<!--                  :label="item.name"-->
<!--                  :value="item.type_config_id">-->
<!--                </el-option>-->
<!--              </el-select>-->
            </el-col>
          </el-row>

          <el-table ref="table" :data="tableData_detail" size="medium" :max-height="tableHeight" border :class="{'ye-table-td': (query.self_type === '2' || query.self_type === '9')}">
            <el-table-column min-width="130" label="地产开发事业部" show-overflow-tooltip prop="estate_devlop_division" align="center" />
            <el-table-column min-width="150" label="在建项目" show-overflow-tooltip prop="project_name" />
            <el-table-column min-width="120" label="分配状态栏" align="center" >
              <template slot-scope="scope">
                <span>{{scope.row.self_type === '0' ? '宝龙持有' : (scope.row.self_type == '1' ? '合作方持有': (scope.row.self_type == '2' ? '暂时共同持有': (scope.row.self_type == '3' ? '共同持有': (scope.row.self_type == '9' ? '未分配': '未分配')))) }}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="130" label="是否签署委托协议" align="center" >
              <template slot-scope="scope">
                <span>{{scope.row.entrust_manage_status === '1' ? '是' : (scope.row.entrust_manage_status == '2' ? '否': (scope.row.entrust_manage_status == '3' ? '/': '')) }}</span>
              </template>
            </el-table-column>

            <el-table-column min-width="80" label="汇总业态" show-overflow-tooltip prop="layout" align="center" />
<!--            <el-table-column min-width="120" label="经营期操盘类型" prop="type_config_name" align="center" />-->
<!--            <el-table-column min-width="150" label="委托管理公司" show-overflow-tooltip prop="business_area_company" align="center" />-->
<!--            <el-table-column min-width="80" label="城市" show-overflow-tooltip prop="city" align="center" />-->
            <el-table-column min-width="100" label="建筑总面积(㎡)" prop="build_area" align="right" />
          </el-table>

          <ys-paginator :page-info="pageInfo" @handlePaginator="handlePaginator"/>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { handlePaginator } from '@mixins'
import TypeApi from '@/apis/apis/typeApi'
import StockAssets from '@/apis/apis/stockAssets'
export default {
  name: 'inbuildDetail',
  props: ['open', 'layout', 'status_two', 'rang', 'page', 'self_type', 'entrust_manage_status', 'range_list'],
  mixins: [handlePaginator],
  data() {
    return {
      props: { multiple: true },
      query: {
        status_two: [],
        project_config_name: null,
        type_config_id: null,
        estate_devlop_division: [],
        business_area_company: [],
        city: [],
        self_type: null,
        layout: null,
        entrust_manage_status: null
      },
      status_twoList: [],
      pageInfo: {
        page_size: 50,
        page: 1,
        sum_num: 0
      },
      tableData_detail: [],
      tableHeight: null,
      ranglDetail: [],
      projectListBL: [], //在建项目列表
      type_config_idList: [], //经营期操盘类型
      // estate_devlop_divisionList: [], //地产开发事业部
      // business_area_companyList: [], //委托管理公司
      selfTypeList: [{id: '0', name: '宝龙持有'},{id: '2', name: '暂时共同持有'},{id: '3', name: '共同持有'},{id: '9', name: '未分配'}],// 分配状态栏
      layoutList: [
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
      entrust_idList: [{id: '1',name: '是'},{id: '2',name: '否'},{id: '3',name: '/'}],
      isCar: false
    }
  },
  created() {
    // if(this.entrust_manage_status) {
    //   this.query.entrust_manage_status = '2'
    // }
  },
  computed: {
    fast: {
      get() {
        return this.open
      },
      set(val) {
        this.$emit('close', {fast: false})
      }
    }
  },
  watch: {
    page(n,o){
      this.pageInfo.page = 1
    },
    rang(nv) {
      this.ranglDetail = nv;
    },
    layout(nv, v) {
      if(nv) {
        this.query.layout = this.layout || null
        this.query.self_type = this.self_type || null
      }
    },
    self_type(nv, v) {
      if(nv) {
        this.query.layout = this.layout || null
        this.query.self_type = nv
      }
    },
    entrust_manage_status(nv, v) {
      console.log(nv +"======"+ v)
      if(nv){
        this.query.entrust_manage_status = nv.toString()
      }else{
        this.query.entrust_manage_status = null
      }
    },
    status_two(nv, v) {
      this.query.status_two = nv;
    },
    open(nv) {
      if(nv) {
        this.getList()
      }
    }
  },
  mounted() {
    this.getProList()
    this.getTypeList()
  },
  methods: {
    // 获取存量项目列表
    getProList() {
      TypeApi.projectBl().then(res => {
        if(res.code === 200 && res.result){
          this.projectListBL = res.result
        }
      })
    },
    // 获取分项权益类型列表
    getTypeList() {
      TypeApi.typeDropDown().then(res => {
        if(res.code === 200 && res.result){
          this.status_twoList = res.result.status_two
          this.type_config_idList = res.result.equity
          // this.estate_devlop_divisionList = res.result.estate_devlop_division
          // this.business_area_companyList = res.result.business_area_company
        }
      })
    },
    // 查询
    async getList() {
      this.rangDataHandle(this.ranglDetail)
      if(this.query.layout === '车库') {
        this.query.self_type = null
        this.isCar = true
      }else{
        this.isCar = false
      }
      const params = {
        ...this.query,
        ...this.pageInfo,
        // layout: this.layout,
        // detail_type: 'total'
      }
      await StockAssets.loadInbuild(params).then(res => {
        if(res.code === 200 && res.result){
          this.tableData_detail = res.result.data
          this.pageInfo.sum_num = res.result.sum_num
          this.tableHeight = document.documentElement.clientHeight - 180
        }
      })
    },
    // 重新选择搜索项重置页码
    getListChange() {
      this.pageInfo.page = 1
      this.getList()
    },
    rangChange(data) {
      this.rangDataHandle(data)
      this.getList()
    },
    rangDataHandle(data) {
      this.query.estate_devlop_division = []
      this.query.business_area_company = []
      this.query.city = []
      data.forEach(item => {
        if(item[0] === 111){
          this.query.estate_devlop_division.push(item[1])
        }else if(item[0] === 222){
          this.query.business_area_company.push(item[1])
        }else if(item[0] === 333){
          this.query.city.push(item[1])
        }
      })
    },
    resetData() {
      this.tableData_detail = []
      this.query = {
        status_two: [],
        project_config_name: null,
        type_config_id: null,
        estate_devlop_division: [],
        business_area_company: [],
        city: [],
        self_type: null,
        layout: null,
        entrust_manage_status: '2'
      }
      this.ranglDetail = []
    },
    cancel() {
      this.resetData()
      this.$emit('close', {fast: false})
    },
    // 导出
    exportExcel() {
      console.log("导出文本：")
      const token = localStorage.getItem('ys_contract_token')
      if(token) {
        // 未签署委托协议:type=1 分配状态栏:type=2
        if(this.query.self_type && !this.query.entrust_manage_status) {
          window.open(`../${this.$baseURL}/projectConfig/show_export?token=${token}&type=2`)
        }else if(this.query.entrust_manage_status && !this.query.self_type) {
          window.open(`../${this.$baseURL}/projectConfig/show_export?token=${token}&type=1`)
        }else {
          window.open(`../${this.$baseURL}/projectConfig/show_export?token=${token}&type=2`)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/assets/styles/common.scss';
span{
  font-size: 24px;
}
/deep/ .el-table .el-table__body td {
  font-size: 24px!important;
}
/deep/ .el-table th > .cell {
  font-size: 24px;
}
.ye-table-td /deep/ .el-table__body td {
  color: #F90D0D!important;
}
.dialog-close-icon{
  right: 79.35%!important;
}
.drawer-detail .con {
  // height: calc(100vh - 120px);
  > div {
    margin: 0;
  }
}
</style>

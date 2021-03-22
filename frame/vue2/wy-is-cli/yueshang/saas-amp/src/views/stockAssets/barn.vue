<template>
  <!-- 存量资产-车库 -->
  <div class="list-page">
    <bl-download :downUrl="downUrl" :downLayout="big_layout_id" @uploadClose="uploadClose"></bl-download>
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle" style="flex-flow: wrap;">
      <el-col class="colcol" :span="22">
        <div>
          <el-select placeholder="存量项目" size="mini" v-model="query.project_config_id" @change="getListChange" filterable clearable>
            <el-option
              v-for="item in projectList"
              :key="item.project_config_id"
              :label="item.project_name + '-' +item.project_label_name"
              :value="item.project_config_id">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select placeholder="业态" size="mini" v-model="query.layout" @change="getListChange" collapse-tags multiple clearable>
            <el-option
              v-for="(item, index) in layoutList"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select placeholder="有产证/无产证" size="mini" v-model="query.status_one" @change="getListChange" multiple collapse-tags clearable>
            <el-option
              v-for="item in status_oneList"
              :key="item.type_config_id"
              :label="item.name"
              :value="item.type_config_id">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select placeholder="自持/可售" size="mini" v-model="query.status_two" @change="getListChange" multiple collapse-tags clearable>
            <el-option
              v-for="item in status_twoList"
              :key="item.type_config_id"
              :label="item.name"
              :value="item.type_config_id">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select placeholder="在售/已售" size="mini" v-model="query.status_three" @change="getListChange" multiple collapse-tags clearable>
            <el-option
              v-for="item in status_threeList"
              :key="item.type_config_id"
              :label="item.name"
              :value="item.type_config_id">
            </el-option>
          </el-select>
        </div>
        <div class="oneBtn">
          <el-date-picker
            v-model="query.report_time"
            @change="getListChange"
            type="month"
            size="mini"
            value-format="yyyy-MM"
            placeholder="报表时间">
          </el-date-picker>
          <el-button @click="reset" size="mini">重置</el-button>
        </div>
      </el-col>
      <el-col :span="2" style="text-align: right;">
        <el-button @click="exportExcel" size="mini" type="success">导出</el-button>
      </el-col>
    </el-row>
    <el-row class="status-buttons" type="flex" justify="space-between" align="middle" style="height: 28px; margin-bottom: 10px;">
      <el-col :span="12">
        <span style="font-size: 14px;">审核状态：</span>
        <span v-if="!project_verify_id" style="font-size: 14px;">无数据</span>
        <span v-if="status == 0 && project_verify_id" style="font-size: 14px;">未上报</span>
        <span v-if="status == 1 && project_verify_id" style="font-size: 14px;">待条线审核</span>
        <span v-if="status == 2 && project_verify_id" style="font-size: 14px;">待资管审核</span>
        <span v-if="status == 3 && project_verify_id" style="font-size: 14px;">已驳回</span>
        <span v-if="status == 4 && project_verify_id" style="font-size: 14px;">审核完成</span>
        <span v-if="status == 9 && project_verify_id" style="font-size: 14px;">已撤回</span>
      </el-col>
      <el-col :span="12" style="text-align: right;">
        <el-button v-if="(status == 0 && project_verify_id) && permission.indexOf('clzc_report') > -1" @click="nowAudit(1)" size="mini" type="success">上报</el-button>
        <el-button v-if="(status == 1 && project_verify_id) && permission.indexOf('clzc_report_approval') > -1" @click="nowAudit(9)" size="mini" type="warning" plain>撤回</el-button>
        <el-button v-if="status == 1 && permission.indexOf('clzc_approval_tx') > -1" @click="nowAudit(2)" size="mini" type="success">条线审批</el-button>
        <el-button v-if="status == 2 && permission.indexOf('clzc_approval_zg') > -1" @click="nowAudit(4)" size="mini" type="success">资管审批</el-button>
        <el-button v-if="status == 1 && permission.indexOf('clzc_reject_tx') > -1" @click="nowAudit(3)" size="mini" type="warning" plain>驳回</el-button>
        <el-button v-if="status == 2 && permission.indexOf('clzc_reject_zg') > -1" @click="nowAudit(5)" size="mini" type="warning" plain>驳回</el-button>
        <el-button v-if="status == 4 && permission.indexOf('clzc_reject_admin') > -1" @click="nowAudit(5)" size="mini" type="warning" plain>一键驳回</el-button>
        <!-- <el-button @click="goBack()" size="mini">返回</el-button> -->
      </el-col>
    </el-row>
    <el-table ref="table" :data="tableData" size="mini" border header-row-class-name="table-header" :max-height="this.$store.state.tableHeight">
      <el-table-column fixed min-width="120" label="业态" prop="layout" align="center">
      </el-table-column>
      <el-table-column width="260" label="资产类别">
        <template slot-scope="scope">
          <span v-if="scope.row.status_one_name">{{ scope.row.status_one_name }}<span v-if="scope.row.status_two_name || scope.row.status_three_name">：</span></span>
          <span v-if="scope.row.status_two_name">{{ scope.row.status_two_name }}<span v-if="scope.row.status_three_name">：</span></span>
          <span v-if="scope.row.status_three_name">{{ scope.row.status_three_name }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="120" label="个数" prop="number" align="right">
      </el-table-column>
      <el-table-column min-width="120" label="建筑面积(㎡)" prop="build_area" align="right">
      </el-table-column>
      <el-table-column min-width="120" label="当月总收入(元)" prop="month_real_rent" align="right">
      </el-table-column>
    </el-table>

    <ys-paginator :page-info="pageInfo" @handlePaginator="handlePaginator"/>
    <div>
      <!-- 权限 -->
      <audit :open="fast" :id="project_verify_id" :num="auditNum" @close="close"></audit>
    </div>
  </div>
</template>

<script>
import BlDownload from '@comps/blDownload'
import { handlePaginator } from '@mixins'
import { getDynamicTableHeight } from '@/utils/index'
import AssetsSum from '@/apis/apis/assetsSum'
import TypeApi from '@/apis/apis/typeApi'
import StockAssets from '@/apis/apis/stockAssets'
import Audit from './audit'
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
        project_config_id: null,
        layout: [],
        status_one: [],
        status_two: [],
        status_three: [],
        status_four: [],
        status_five: [],
        report_time: null
      },
      projectList: [], // 存量项目
      shztList: [
        {
          label: '未上报',
          value: 1
        },
        {
          label: '待条线审核',
          value: 2
        },
        {
          label: '待资管审核',
          value: 3
        },
        {
          label: '已驳回',
          value: 4
        },
        {
          label: '审核完成',
          value: 5
        }
      ],
      tableData: [],
      status_oneList: [],
      status_twoList: [],
      status_threeList: [],
      status_fourList: [],
      status_fiveList: [],
      layoutList: [], // 业态列表选项列表
      downUrl: '/projectDetail/down',
      fast: false,
      auditNum: null,
      status: null,
      business_area_status: null,
      business_tech_status: null,
      business_operation_status: null,
      project_verify_id: null,
      big_layout_id: 5, //大业态
      permission: `${localStorage.getItem('ys_contract_permission')}`
    }
  },
  components: {
    BlDownload,
    Audit
  },
  watch: {
    $route() {
      this.getDownList()
      this.getList()
    }
  },
  created() {
    this.getProList()
    setTimeout(() => {
      this.getLastTime()
    },0)
    this.getDownList()
    this.getTypeList()
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
    // 获取有数据最近月份
    getLastTime() {
      AssetsSum.getLastTime().then(res => {
        if(res.code === 200){
          if (res.result) {
            this.query.report_time = res.result.report_time
          } else {
            this.query.report_time = new Date().format('yyyy-MM')
          }
          if (this.$route.query.project_verify_id) {
            this.project_verify_id = this.$route.query.project_verify_id
            this.query.project_config_id = this.$route.query.project_config_id
            this.query.report_time = this.$route.query.report_time
            this.getList()
          } else if (this.$route.query.project_config_id) {
            this.query.project_config_id = this.$route.query.project_config_id
            this.query.report_time = new Date().format('yyyy-MM')
            this.getList()
          } else {
            this.getList()
          }
        }
      })
    },
    // 获取存量项目列表
    getProList() {
      TypeApi.projectDropDown({project_type: 1, layout: 5}).then(res => {
        if(res.code === 200 && res.result){
          this.projectList = res.result
          if (!this.$route.query.project_config_id) {
            this.query.project_config_id = res.result[0].project_config_id
          }
        }
      })
    },
    // 业态下拉数据
    getDownList() {
      StockAssets.smallLayoutDropList({big_layout_id: 5}).then(res => {
        if(res.code === 200 && res.result){
          this.layoutList = res.result.data
        }
      })
    },
    // 获取分项列表
    getTypeList() {
      TypeApi.typeDropDown().then(res => {
        if(res.code === 200 && res.result){
          this.status_oneList = res.result.status_one
          this.status_twoList = res.result.status_two
          this.status_threeList = res.result.status_three
          this.status_fourList = res.result.status_four
          this.status_fiveList = res.result.status_five
        }
      })
    },
    // 查询
    async getList() {
      if(!this.query.project_config_id) return this.$message.error('请选择项目')
      if(!this.query.report_time) return this.$message.error('请选择报表日期')
      const params = {
        ...this.pageInfo,
        ...this.query,
        type: 5
      }
      await StockAssets.find(params).then(res => {
        if(res.code === 200 && res.result){
          this.tableData = res.result.data.res_list
          this.pageInfo.sum_num = res.result.sum_num
          this.status = res.result.data.status
          this.business_area_status = res.result.data.business_area_status
          this.business_tech_status = res.result.data.business_tech_status
          this.business_operation_status = res.result.data.business_operation_status
          this.project_verify_id = res.result.data.project_verify_id
          if (res.result.data.res_sum[0]) {
            this.tableData.push({
              layout: '汇总',
              number: res.result.data.res_sum[0].number_sum,
              build_area: res.result.data.res_sum[0].build_area_sum,
              month_real_rent: res.result.data.res_sum[0].month_real_rent_sum,
            })
          }
          getDynamicTableHeight(this)
        }
      })
    },
    // 重新选择搜索项重置页码
    getListChange() {
      this.pageInfo.page = 1
      this.getList()
    },
    reset() {
      let proId = null
      if (this.$route.query.project_config_id) {
        proId = this.$route.query.project_config_id
      } else if (this.projectList[0]) {
        proId = this.projectList[0].project_config_id
      } else {
        proId = null
      }
      this.query = {
        ...this.query,
        project_config_id: proId,
        layout: [],
        status_one: [],
        status_two: [],
        status_three: [],
        status_four: [],
        status_five: []
      }
      this.getList()
    },
    // 上报、驳回、审核
    nowAudit (num) {
      if (num == 1) {
        this.$prompt('请输入备注信息', '备注', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          const params = {
            project_verify_id: this.project_verify_id,
            verify_action: num,
            message: value,
          }
          StockAssets.verify_action(params).then(res => {
            if(res.code === 200 && res.result){
              this.getList()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消上报'
          });
        });
      }else if (num == 9) {
        this.$prompt('请输入备注信息', '撤回', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          const params = {
            project_verify_id: this.project_verify_id,
            verify_action: num,
            message: value,
          }
          StockAssets.verify_action(params).then(res => {
            if(res.code === 200 && res.result){
              this.getList()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消上报'
          });
        });
      } else {
        this.auditNum = num
        this.fast = true
      }
    },
    close(res) {
      this.fast = res.fast
      if(res.reload) {
        this.getList()
      }
    },
    uploadClose(res) {
      this.query.project_config_id = res.project_config_id
      this.query.report_time = res.report_time
      this.getList()
    },
    // 返回
    goBack() {
      this.$router.push({name:'summary',query: {project_config_id: this.query.project_config_id, report_time: this.query.report_time}})
    },
    // 导出
    exportExcel() {
      const token = localStorage.getItem('ys_contract_token')
      if(token) {
        // excel_type = 1 导出总表明细， =2 导出项目明细
        window.location.href = `../${this.$baseURL}/projectDetail/export_list_all?token=${token}&project_config_id=${this.query.project_config_id}&type=${this.big_layout_id}&report_time=${this.query.report_time}&excel_type=2`
      }
    }
  }
}
</script>
<style type="text/css" lang="scss" scoped>
  @import '~@styles/common.scss';
</style>

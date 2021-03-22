<template>
  <!-- 审核汇总 -->
  <div class="list-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle" style="flex-flow: wrap;">
      <el-col class="colcol" :span="22" >
        <div>
          <el-select placeholder="汇总业态" size="mini" v-model="query.big_layout_type" @change="big_layout_typeChange">
            <el-option
              v-for="item in big_layout_typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div >
          <el-select placeholder="审核状态" size="mini" v-model="query.verify_status" @change="getListChange" clearable>
            <el-option
              v-for="item in verify_statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
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
          <el-select placeholder="委托管理公司" size="mini" v-model="query.business_area_company" @change="getListChange" filterable clearable>
            <el-option
              v-for="(item, index) in business_area_companyList"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select placeholder="标签" size="mini" v-model="query.project_label" @change="getListChange" filterable clearable>
            <el-option
              v-for="item in project_labelList"
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
    <el-table ref="table" :data="tableData" size="mini" header-row-class-name="table-header" :max-height="this.$store.state.tableHeight">
      <el-table-column fixed width="100" label="汇总业态" prop="big_layout_type" align="center">
        <template>
          <span v-if="query.big_layout_type == 1">商业</span>
          <span v-if="query.big_layout_type == 2">酒店</span>
          <span v-if="query.big_layout_type == 3">办公</span>
          <span v-if="query.big_layout_type == 4">公寓</span>
          <span v-if="query.big_layout_type == 5">车库</span>
        </template>
      </el-table-column>
      <el-table-column min-width="120" label="委托管理公司" show-overflow-tooltip prop="business_area_company" align="center">
      </el-table-column>
      <el-table-column min-width="200" label="项目" show-overflow-tooltip prop="project_name">
      </el-table-column>
      <el-table-column min-width="80" label="标签" prop="project_label_name" align="center">
      </el-table-column>
      <el-table-column min-width="80" label="报表时间" prop="report_time" align="center">
      </el-table-column>
      <el-table-column v-if="query.big_layout_type != 1" min-width="120" label="条线" align="center">
        <template slot-scope="scope">
          <el-popover
            v-if="scope.row.message && scope.row.status && scope.row.status > 1"
            placement="top-start"
            title="说明"
            width="100"
            trigger="hover"
            :content="scope.row.message">
            <p v-if="scope.row.status == 3 && scope.row.reject_status == 1" slot="reference" style="cursor: pointer;">驳回<i class="el-icon-info"></i></p>
            <p v-if="scope.row.status == 2 || scope.row.status == 4 || scope.row.reject_status == 2" slot="reference" style="cursor: pointer;">同意<i class="el-icon-info"></i></p>
          </el-popover>
          <p v-if="!scope.row.message">
            <span v-if="scope.row.status == 3 && scope.row.reject_status == 1" slot="reference" style="cursor: pointer;">驳回</span>
            <span v-if="scope.row.status == 2 || scope.row.status == 4 || scope.row.reject_status == 2" slot="reference" style="cursor: pointer;">同意</span>
          </p>
          <p v-if="scope.row.status == 0" slot="reference" style="cursor: pointer;">未上报</p>
          <p v-if="scope.row.status == 1" slot="reference" style="cursor: pointer;">待审核</p>
        </template>
      </el-table-column>
      <el-table-column v-if="query.big_layout_type == 1" min-width="120" label="区域" align="center">
        <template slot-scope="scope">
          <el-popover
            v-if="scope.row.area_message"
            placement="top-start"
            title="说明"
            width="100"
            trigger="hover"
            :content="scope.row.area_message">
            <p v-if="scope.row.business_area_status == 1" slot="reference" style="cursor: pointer;">同意<i class="el-icon-info"></i></p>
            <p v-if="scope.row.business_area_status == 2" slot="reference" style="cursor: pointer;">驳回<i class="el-icon-info"></i></p>
          </el-popover>
          <p v-if="!scope.row.area_message">
            <span v-if="scope.row.business_area_status == 1" slot="reference" style="cursor: pointer;">同意</span>
            <span v-if="scope.row.business_area_status == 2" slot="reference" style="cursor: pointer;">驳回</span>
          </p>
          <p v-if="scope.row.status == 0" slot="reference" style="cursor: pointer;">未上报</p>
          <p v-if="scope.row.status == 1 && scope.row.business_area_status == null" slot="reference" style="cursor: pointer;">待审核</p>
        </template>
      </el-table-column>
      <el-table-column v-if="query.big_layout_type == 1" min-width="120" label="技术" align="center">
        <template slot-scope="scope">
          <el-popover
            v-if="scope.row.tech_message"
            placement="top-start"
            title="说明"
            width="100"
            trigger="hover"
            :content="scope.row.tech_message">
            <p v-if="scope.row.business_tech_status == 1" slot="reference" style="cursor: pointer;">同意<i class="el-icon-info"></i></p>
            <p v-if="scope.row.business_tech_status == 2" slot="reference" style="cursor: pointer;">驳回<i class="el-icon-info"></i></p>
          </el-popover>
          <p v-if="!scope.row.tech_message">
            <span v-if="scope.row.business_tech_status == 1" slot="reference" style="cursor: pointer;">同意</span>
            <span v-if="scope.row.business_tech_status == 2" slot="reference" style="cursor: pointer;">驳回</span>
          </p>
          <p v-if="scope.row.status == 0" slot="reference" style="cursor: pointer;">未上报</p>
          <p v-if="scope.row.status == 1 && scope.row.business_tech_status == null" slot="reference" style="cursor: pointer;">待审核</p>
        </template>
      </el-table-column>
      <el-table-column v-if="query.big_layout_type == 1" min-width="120" label="营运" align="center">
        <template slot-scope="scope">
          <el-popover
            v-if="scope.row.operation_message"
            placement="top-start"
            title="说明"
            width="100"
            trigger="hover"
            :content="scope.row.operation_message">
            <p v-if="scope.row.business_operation_status == 1" slot="reference" style="cursor: pointer;">同意<i class="el-icon-info"></i></p>
            <p v-if="scope.row.business_operation_status == 2" slot="reference" style="cursor: pointer;">驳回<i class="el-icon-info"></i></p>
          </el-popover>
          <p v-if="!scope.row.operation_message">
            <span v-if="scope.row.business_operation_status == 1" slot="reference" style="cursor: pointer;">同意</span>
            <span v-if="scope.row.business_operation_status == 2" slot="reference" style="cursor: pointer;">驳回</span>
          </p>
          <p v-if="scope.row.status == 0" slot="reference" style="cursor: pointer;">未上报</p>
          <p v-if="scope.row.status == 1 && scope.row.business_operation_status == null" slot="reference" style="cursor: pointer;">待审核</p>
        </template>
      </el-table-column>
      <el-table-column v-if="query.big_layout_type == 1" min-width="120" label="资管" align="center">
        <template slot-scope="scope">
          <el-popover
            v-if="scope.row.manage_message && scope.row.business_area_status == 1 && scope.row.business_operation_status == 1 && scope.row.business_tech_status == 1"
            placement="top-start"
            title="说明"
            width="100"
            trigger="hover"
            :content="scope.row.manage_message">
            <p v-if="scope.row.status == 3 && scope.row.business_area_status != 2 && scope.row.business_operation_status != 2 && scope.row.business_tech_status != 2" slot="reference" style="cursor: pointer;">驳回<i class="el-icon-info"></i></p>
            <p v-if="scope.row.status == 4" slot="reference" style="cursor: pointer;">同意<i class="el-icon-info"></i></p>
          </el-popover>
          <p v-if="!scope.row.manage_message">
            <span v-if="scope.row.status == 3 && scope.row.business_area_status != 2 && scope.row.business_operation_status != 2 && scope.row.business_tech_status != 2" slot="reference" style="cursor: pointer;">驳回</span>
            <span v-if="scope.row.status == 4" slot="reference" style="cursor: pointer;">同意</span>
          </p>
          <p v-if="scope.row.status == 0" slot="reference" style="cursor: pointer;">未上报</p>
          <p v-if="scope.row.status == 1 || scope.row.status == 2" slot="reference" style="cursor: pointer;">待审核</p>
        </template>
      </el-table-column>
      <el-table-column v-if="query.big_layout_type != 1" min-width="120" label="资管" align="center">
        <template slot-scope="scope">
          <el-popover
            v-if="scope.row.manage_message"
            placement="top-start"
            title="说明"
            width="100"
            trigger="hover"
            :content="scope.row.manage_message">
            <p v-if="scope.row.status == 3 && scope.row.reject_status == 2" slot="reference" style="cursor: pointer;">驳回<i class="el-icon-info"></i></p>
            <p v-if="scope.row.status == 4" slot="reference" style="cursor: pointer;">同意<i class="el-icon-info"></i></p>
          </el-popover>
          <p v-if="!scope.row.manage_message">
            <span v-if="scope.row.status == 3 && scope.row.reject_status == 2" slot="reference" style="cursor: pointer;">驳回</span>
            <span v-if="scope.row.status == 4" slot="reference" style="cursor: pointer;">同意</span>
          </p>
          <p v-if="scope.row.status == 0" slot="reference" style="cursor: pointer;">未上报</p>
          <p v-if="scope.row.status == 1 || scope.row.status == 2" slot="reference" style="cursor: pointer;">待审核</p>
        </template>
      </el-table-column>
      <el-table-column fixed="right" :width="maxWidth" label="操作">
        <template slot-scope="scope">
          <div class="audit-btn" name="editId">
            <el-button type="text" v-if="permission.indexOf('zchz_details') > -1" size="mini" @click="goAudit(scope.row)">详情</el-button>
            <el-button class="audit-btn-color" type="text" v-if="scope.row.big_layout_type_id != 1 && scope.row.status == 1 && permission.indexOf('clzc_approval_tx') > -1" size="mini" @click="goAudit(scope.row)">审核</el-button>
            <el-button class="audit-btn-color" type="text" v-if="scope.row.big_layout_type_id == 1 && scope.row.status == 1 && scope.row.business_area_status != 1 && permission.indexOf('shhz_approval_qy') > -1" size="mini" @click="goAudit(scope.row)">审核</el-button>
            <el-button class="audit-btn-color" type="text" v-if="scope.row.big_layout_type_id == 1 && scope.row.status == 1 && scope.row.business_tech_status != 1 && permission.indexOf('shhz_approval_js') > -1" size="mini" @click="goAudit(scope.row)">审核</el-button>
            <el-button class="audit-btn-color" type="text" v-if="scope.row.big_layout_type_id == 1 && scope.row.status == 1 && scope.row.business_operation_status != 1 && permission.indexOf('shhz_approval_yy') > -1" size="mini" @click="goAudit(scope.row)">审核</el-button>
            <el-button class="audit-btn-color" type="text" v-if="scope.row.status == 2 && permission.indexOf('clzc_approval_zg') > -1" size="mini" @click="goAudit(scope.row)">审核</el-button>
            <el-button type="text" v-if="scope.row.status != 0 && scope.row.status != null && permission.indexOf('shhz_history') > -1" size="mini" @click="goHistory(scope.row.project_verify_id)">历史</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <ys-paginator :page-info="pageInfo" @handlePaginator="handlePaginator"/>
    <div>
      <!-- 审批历史-->
      <history :open="fast" :id="historyId" @close="close"></history>
    </div>
  </div>
</template>

<script>
import { handlePaginator } from '@mixins'
import { getDynamicTableHeight } from '@/utils/index';
import AssetsSum from '@/apis/apis/assetsSum'
import TypeApi from '@/apis/apis/typeApi'
import Audit from '@/apis/apis/audit'
import History from './history'
export default {
  mixins: [handlePaginator],
  data() {
    const setBigLayoutType = _ => {
      let permission = localStorage.getItem('ys_contract_permission')
      let setLayout = localStorage.getItem('ys_contract_layout')
      if (setLayout) {
        return Number(setLayout)
      } else {
        if (permission.indexOf('clzc_approval_zg') > -1 || permission.indexOf('shhz_approval_qy') > -1 || permission.indexOf('shhz_approval_js') > -1 || permission.indexOf('shhz_approval_yy') > -1) {
          return 1
        } else {
          return 2
        }
      }
    }
    const setVerifyStatus = _ => {
      let permission = localStorage.getItem('ys_contract_permission')
      if (permission.indexOf('clzc_approval_zg') > -1) {
        return 2
      } else if (permission.indexOf('clzc_approval_tx') > -1 || permission.indexOf('shhz_approval_qy') > -1 || permission.indexOf('shhz_approval_js') > -1 || permission.indexOf('shhz_approval_yy') > -1) {
        return 1
      } else {
        return null
      }
    }
    return {
      pageInfo: {
        page_size: 50,
        page: 1,
        sum_num: 0
      },
      query: {
        big_layout_type: setBigLayoutType(),
        business_area_company: null,
        project_config_id: null,
        project_label: null,
        verify_status: setVerifyStatus(),
        // report_time: new Date().format('yyyy-MM'),
        report_time: null,
      },
      big_layout_typeList: [
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
      business_area_companyList: [],
      projectList: [], // 项目列表
      project_labelList: [], //标签列表
      verify_statusList: [
        {
          label: '未提交',
          value: 8
        },
        {
          label: '未上报',
          value: 0
        },
        {
          label: '待条线审核',
          value: 1
        },
        {
          label: '待资管审核',
          value: 2
        },
        {
          label: '已驳回',
          value: 3
        },
        {
          label: '审核完成',
          value: 4
        }
      ],
      biaoqianList: [],
      tableData: [],
      fast: false,
      historyId: null, // 编辑id
      permission: `${localStorage.getItem('ys_contract_permission')}`,
      maxWidth: '76'
    }
  },
  components: {
    History
  },
  watch: {},
  created() {
    this.getLastTime()
    this.getDownList()
    this.getProList()
    this.getTypeList()
    if (this.$route.query.project_config_id) {
      this.query.project_config_id = this.$route.query.project_config_id
      this.query.report_time = this.$route.query.report_time
    }
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
        }
        this.getList()
      })
    },
    // 汇总业态下拉数据
    getDownList() {
      AssetsSum.dropDown().then(res => {
        if(res.code === 200 && res.result){
          this.business_area_companyList = res.result.business_area_company
        }
      })
    },
    // 获取存量项目列表
    getProList() {
      TypeApi.projectDropDown({project_type: 1}).then(res => {
        if(res.code === 200 && res.result){
          this.projectList = res.result
        }
      })
    },
    // 获取标签列表
    getTypeList() {
      TypeApi.typeDropDown().then(res => {
        if(res.code === 200 && res.result){
          this.project_labelList = res.result.project_label
        }
      })
    },
    // 查询
    async getList() {
      const params = {
        ...this.pageInfo,
        ...this.query
      }
      await Audit.find(params).then(res => {
        if(res.code === 200 && res.result){
          this.tableData = res.result.data
          this.pageInfo.sum_num = res.result.sum_num
          getDynamicTableHeight(this)
          setTimeout(() => {
            this.dealButtonsWidth()
          },0)
        } else {
          this.tableData = []
          this.pageInfo.sum_num = 0
        }
      })
    },
    // 根据操作列中按钮数量最大值设定单元格宽度
    dealButtonsWidth() {
      const editId = document.getElementsByName("editId")
      let childNum = 0
      try{
        for (let f = 0;f < editId.length;f ++) {
          let childs = editId[f].childNodes
          let len = childs.length
          let num = 0
          for (let i = 0;i < len;i ++) {
            if(childs[i].tagName && childs[i].tagName.toLowerCase() === "button"){
              num ++
            }
          }
          if(childNum < num){
            childNum = num
          }
        }
      }catch(e){}
      console.log("childNum="+childNum)
      if (childNum === 0) {
        this.maxWidth = ''
      }if (childNum < 2 && childNum > 0) {
        this.maxWidth = '80'
      }else if (childNum === 2) {
        this.maxWidth = '90'
      }else if(childNum === 3){
        this.maxWidth = '130'
      }else if(childNum === 4){
        this.maxWidth = '170'
      }else if(childNum === 5){
        this.maxWidth = '210'
      }
    },
    // 缓存业态选项
    big_layout_typeChange(val) {
      localStorage.setItem('ys_contract_layout', val)
      this.getListChange()
    },
    // 重新选择搜索项重置页码
    getListChange() {
      this.pageInfo.page = 1
      this.getList()
    },
    reset() {
      this.query = {
        ...this.query,
        // big_layout_type: null,
        business_area_company: null,
        project_config_id: null,
        project_label: null,
        verify_status: null
      }
      this.getList()
    },
    goAudit(row) {
      let routeName = ''
      if (row.big_layout_type_id == 1 || this.query.big_layout_type == 1) {
        routeName = 'trade'
      }
      if (row.big_layout_type_id == 2 || this.query.big_layout_type == 1) {
        routeName = 'hotel'
      }
      if (row.big_layout_type_id == 3 || this.query.big_layout_type == 1) {
        routeName = 'office'
      }
      if (row.big_layout_type_id == 4 || this.query.big_layout_type == 1) {
        routeName = 'flats'
      }
      if (row.big_layout_type_id == 5 || this.query.big_layout_type == 1) {
        routeName = 'barn'
      }
      if (row.big_layout_type_id == 6 || this.query.big_layout_type == 1) {
        routeName = 'other'
      }
      this.$router.push({name: routeName,query: {project_verify_id: row.project_verify_id, project_config_id: row.project_config_id, report_time: row.report_time}})
    },
    // 审批历史
    goHistory(id) {
      this.historyId = id
      this.fast = true
    },
    close(res) {
      this.historyId = null
      this.fast = res.fast
      if(res.reload) {
        this.getList()
      }
    },
    // 导出
    exportExcel() {
      const token = localStorage.getItem('ys_contract_token')
      if(token) {
        // excel_type = 1 导出总表明细， =2 导出项目明细
        window.location.href = `../${this.$baseURL}/projectDetail/export_list_all?token=${token}&type=${this.query.big_layout_type}&status=${this.query.verify_status}&report_time=${this.query.report_time}&excel_type=1`
      }
    }
  }
}
</script>
<style type="text/css" lang="scss" scoped>
@import '~@styles/common.scss';
.audit-btn {
  display: flex;
  align-items: center;
  .el-button {
    margin: 0;
    margin-right: 10px;
    // margin-bottom: 5px;
    font-size: 14px;
  }
  .audit-btn-color {
    color: #FB6B1D;
  }
}
// .audit-btn .el-button {
//   margin: 5px 5px;
// }
</style>

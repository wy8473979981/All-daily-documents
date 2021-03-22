<template>
  <!-- 预算查看-总收入 -->
  <div class="list-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle" style="flex-flow: wrap;">
      <el-col class="select-title">
        <div class="select-cutover">
          <span class="select-blue">总收入</span>
          <span @click="$router.push({path: '/management/read/businessCost',query: {areaId: routerParam.areaId,projectId: routerParam.projectId}})">经营费用</span>
          <span @click="$router.push({path: '/management/read/ownerCost',query: {areaId: routerParam.areaId,projectId: routerParam.projectId}})">业主费用</span>
          <span @click="$router.push({path: '/management/read/businessProfit',query: {areaId: routerParam.areaId,projectId: routerParam.projectId}})">商业利润</span>
        </div>
        <div class="select-status">
          <p>总共5个部门，全部已提交完成<span>查看对应业务表＞</span></p>
        </div>
        <div class="select-data">
          <p>（金额：元/面积：平）</p>
        </div>
      </el-col>
      <el-col class="">
        <el-select placeholder="部门" size="mini" v-model="query.project_config_id" @change="getListChange" filterable clearable style="margin-right: 5px; width: 180px;">
          <el-option v-for="item in projectList" :key="item.id" :label="item.dictName" :value="item.dispOrderNo">
          </el-option>
        </el-select>
        <el-button @click="reset" size="mini">重置</el-button>
        <el-button v-if="permission.indexOf('lxpz_edit') > -1" @click="stockAdd" size="mini" type="success">新增</el-button>
      </el-col>
      <el-col class="tip-data">
        <span>提报总收入：232,000元，审批总收入：222,000元，差额：<span class="tip-red">10,000</span>元</span>
      </el-col>
    </el-row>
    <el-table ref="table" :data="tableData" size="mini" border stripe header-row-class-name="table-header" :height="this.$store.state.tableHeight">
      <el-table-column fixed min-width="150" label="大项" show-overflow-tooltip prop="subjectName">
        <template slot-scope="scope">
          {{scope.row.subjectName?scope.row.subjectName.split(',')[0]:''}}
        </template>
      </el-table-column>
      <el-table-column min-width="180" label="子项" show-overflow-tooltip prop="subjectName">
        <template slot-scope="scope">
          <span>{{scope.row.subjectName?scope.row.subjectName.split(',')[1]:''}}</span>
          <el-tooltip class="item" effect="dark" content="取自“租赁表”中自持铺位租金清欠" placement="top">
            <i class="el-icon-question"></i>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column min-width="100" label="单价" show-overflow-tooltip prop="project_name" />
      <el-table-column min-width="100" label="计量" show-overflow-tooltip prop="project_name" />
      <el-table-column min-width="120" label="总额/占比" show-overflow-tooltip prop="proportion" />
      <el-table-column min-width="150" label="当年预算指标" show-overflow-tooltip prop="currentBudgetIndicator">
        <template slot-scope="scope">
          <el-popover placement="right-start" title="222,000" width="230" trigger="hover" content="调低了10,000  调整前 232,000  张帆/部门财务  2020-10-24  14:48">
            <span slot="reference">{{ scope.row.currentBudgetIndicator }}</span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column min-width="150" label="当年预算指标预计完成" show-overflow-tooltip prop="currentIndicatorPerformance">
        <template slot-scope="scope">
          <el-input size="small" v-model="scope.row.currentIndicatorPerformance" placeholder="请输入" class="form-input"></el-input>
        </template>
      </el-table-column>
      <el-table-column min-width="150" label="当年1-9月管报实际" show-overflow-tooltip prop="currentJanSepActual">
        <template slot-scope="scope">
          <el-input size="small" v-model="scope.row.currentJanSepActual" placeholder="请输入" class="form-input"></el-input>
        </template>
      </el-table-column>
      <el-table-column min-width="150" label="当年10-12月预计完成" show-overflow-tooltip prop="currentOctDecPerformance">
        <template slot-scope="scope">
          <el-input size="small" v-model="scope.row.currentOctDecPerformance" placeholder="请输入" class="form-input"></el-input>
        </template>
      </el-table-column>
      <el-table-column min-width="120" label="次年度预算" show-overflow-tooltip prop="nextAnnualBudget">
        <template slot-scope="scope">
          <el-input size="small" v-model="scope.row.nextAnnualBudget" placeholder="请输入" class="form-input"></el-input>
        </template>
      </el-table-column>
      <el-table-column min-width="100" label="1月" show-overflow-tooltip prop="jan">
        <template slot-scope="scope">
          <el-input size="small" v-model="scope.row.jan" placeholder="请输入" class="form-input"></el-input>
        </template>
      </el-table-column>
      <el-table-column min-width="100" label="2月" show-overflow-tooltip prop="feb">
        <template slot-scope="scope">
          <el-input size="small" v-model="scope.row.feb" placeholder="请输入" class="form-input"></el-input>
        </template>
      </el-table-column>
      <el-table-column min-width="100" label="3月" show-overflow-tooltip prop="march">
        <template slot-scope="scope">
          <el-input size="small" v-model="scope.row.march" placeholder="请输入" class="form-input"></el-input>
        </template>
      </el-table-column>
      <el-table-column min-width="100" label="4月" show-overflow-tooltip prop="april">
        <template slot-scope="scope">
          <el-input size="small" v-model="scope.row.april" placeholder="请输入" class="form-input"></el-input>
        </template>
      </el-table-column>
      <el-table-column min-width="100" label="5月" show-overflow-tooltip prop="may">
        <template slot-scope="scope">
          <el-input size="small" v-model="scope.row.may" placeholder="请输入" class="form-input"></el-input>
        </template>
      </el-table-column>
      <el-table-column min-width="100" label="6月" show-overflow-tooltip prop="june">
        <template slot-scope="scope">
          <el-input size="small" v-model="scope.row.june" placeholder="请输入" class="form-input"></el-input>
        </template>
      </el-table-column>
      <el-table-column min-width="100" label="7月" show-overflow-tooltip prop="july">
        <template slot-scope="scope">
          <el-input size="small" v-model="scope.row.july" placeholder="请输入" class="form-input"></el-input>
        </template>
      </el-table-column>
      <el-table-column min-width="100" label="8月" show-overflow-tooltip prop="aug">
        <template slot-scope="scope">
          <el-input size="small" v-model="scope.row.aug" placeholder="请输入" class="form-input"></el-input>
        </template>
      </el-table-column>
      <el-table-column min-width="100" label="9月" show-overflow-tooltip prop="sep">
        <template slot-scope="scope">
          <el-input size="small" v-model="scope.row.sep" placeholder="请输入" class="form-input"></el-input>
        </template>
      </el-table-column>
      <el-table-column min-width="100" label="10月" show-overflow-tooltip prop="oct">
        <template slot-scope="scope">
          <el-input size="small" v-model="scope.row.oct" placeholder="请输入" class="form-input"></el-input>
        </template>
      </el-table-column>
      <el-table-column min-width="100" label="11月" show-overflow-tooltip prop="nov">
        <template slot-scope="scope">
          <el-input size="small" v-model="scope.row.nov" placeholder="请输入" class="form-input"></el-input>
        </template>
      </el-table-column>
      <el-table-column min-width="100" label="12月" show-overflow-tooltip prop="dece">
        <template slot-scope="scope">
          <el-input size="small" v-model="scope.row.dece" placeholder="请输入" class="form-input"></el-input>
        </template>
      </el-table-column>
      <!-- <el-table-column min-width="100" label="车库面积(㎡)" align="right">
        <template slot-scope="scope">
          <span>{{ scope.row.garage_area | formatVal }}</span>
        </template>
      </el-table-column> -->
      <el-table-column fixed="right" width="100" label="对应业务表">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="goMember(scope.row.id)">租赁表</el-button>
          <!-- <el-button type="text" v-if="permission.indexOf('lxpz_edit') > -1" size="mini" @click="goEdit(scope.row)">编辑</el-button>
          <el-button v-if="permission.indexOf('lxpz_delete') > -1" size="mini" type="text" @click="goDel(scope.row.id)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <ys-paginator :page-info="pageInfo" @handle_paginator="handle_paginator" />
    <!-- dialog -->
    <div>
      <!-- 新增 -->
      <!-- <create-stock :open="fastCreate" :id="projectConfigId" :row="projectConfigRow" @close="closeCreate"></create-stock> -->
      <!-- 成员列表 -->
      <!-- <member :open="fastMember" :id="memberId" @close="closeMember"></member> -->
    </div>
  </div>
</template>

<script>
import { handle_paginator } from '@mixins'
import { toThousandsClean, getDynamicTableHeight } from '@/utils/index'
import ReadApi from '@/apis/apis/readApi'
import CommonApi from '@/apis/apis/global'
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
      routerParam: null,
      permission: `${localStorage.getItem('ys_contract_permission')}`
    }
  },
  watch: {},
  created () {
    this.routerParam = this.$route.query
    // this.getProList()
    // this.getTypeList()
    this.getSelectList()
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
    async getSelectList () {
      // 获取部门
      const params = {
        selectType: 'department'
      }
      await CommonApi.getSelectList(params).then(res => {
        if (res.code === '200') {
          this.projectList = res.body
        }
      })
    },
    // 获取存量项目列表
    getProList () {
      // ReadApi.projectDropDown({ project_type: 1, is_check: true }).then(res => {
      //   if (res.code === 200 && res.result) {
      //     this.projectList = res.result
      //   }
      // })
      // ReadApi.cityList().then(res => {
      //   if (res.code === 200 && res.result) {
      //     for (var key in res.result) {
      //       this.cityList.push(res.result[key])
      //     }
      //   }
      // })
    },
    // 获取权益类型列表
    getTypeList () {
      // ReadApi.typeDropDown().then(res => {
      //   if (res.code === 200 && res.result) {
      //     this.type_config_idList = res.result.equity
      //     this.project_labelList = res.result.project_label
      //     this.estate_devlop_divisionList = res.result.estate_devlop_division
      //     this.business_area_companyList = res.result.business_area_company
      //   }
      // })
    },
    async getList () {
      // 查询-列表
      const params = {
        type: 1, // 类型1总收入2经营费用3业主费用4商业利润5管理及企划费用表6其他收入表7开办项目增补项
        ...this.pageInfo,
        ...this.query,
        ...this.routerParam
      }
      await ReadApi.bizSumfeeList(params).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.list
          this.pageInfo.sum_num = res.data.total
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
        ReadApi.del({ project_config_id: id }).then(res => {
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
@import "~@styles/common.scss";
.select-title {
  display: flex;
  justify-content: flex-start;
  padding-bottom: 20px;
  .select-cutover {
    span {
      display: inline-block;
      font-size: 14px;
      padding: 0 20px;
      border-right: 1px solid #000;
      cursor: pointer;
    }
    span:first-child {
      padding-left: 0;
    }
    span:last-child {
      border: 0;
    }
    .select-blue {
      color: #468ceb;
      font-size: 18px;
    }
  }
  .select-status {
    margin: 0 auto;
    p {
      font-size: 14px;
      span {
        font-size: 16px;
        color: #468ceb;
        padding-left: 20px;
      }
    }
  }
  .select-data {
    font-size: 12px;
    color: #666666;
    line-height: 18px;
  }
}
.tip-data {
  padding-top: 20px;
  span {
    font-size: 14px;
  }
  .tip-red {
    color: #ed1111;
  }
}
</style>

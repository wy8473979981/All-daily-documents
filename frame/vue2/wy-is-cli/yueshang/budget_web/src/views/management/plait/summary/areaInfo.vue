<template>
  <!-- 预算编制-汇总-基础信息表-面积信息 -->
  <div class="list-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle" style="flex-flow: wrap;">
      <el-col class="select-title" :span="20">
        <div class="select-cutover">
          <span class="select-blue">面积信息</span>
          <span @click="$router.push({path: '/management/plait/summary/projectInfo',query:toProjectRouter})">项目信息</span>
          <span @click="$router.push({path: '/management/plait/summary/personInfo',query:toPersonRouter})">人员信息</span>
        </div>
      </el-col>
      <el-col :span="16">
        <el-select v-if="!isEdit" placeholder="请选择业态" size="mini" @change="search" v-model="query.bizType" filterable clearable style="margin-right: 5px; width: 180px;">
          <el-option v-for="item in baseAreaBizTypeList" :key="item.id" :label="item.dictName" :value="item.dictCd">
          </el-option>
        </el-select>
        <el-select v-if="!isEdit" placeholder="请选择资产" size="mini" @change="search" v-model="query.assetType" filterable clearable style="margin-right: 5px; width: 180px;">
          <el-option v-for="item in baseAreaAssetList" :key="item.id" :label="item.dictName" :value="item.dictCd">
          </el-option>
        </el-select>
        <el-select v-if="!isEdit" placeholder="请选择级别" size="mini" @change="search" v-model="query.level" filterable clearable style="margin-right: 5px; width: 180px;">
          <el-option v-for="item in baseAreaLevelList" :key="item.id" :label="item.dictName" :value="item.dictCd">
          </el-option>
        </el-select>
        <el-button v-if="!isEdit" @click="reset" size="mini">重置</el-button>
      </el-col>

      <el-col :span="8" style="text-align:right">
        <!-- <ys-import v-if="!isEdit" :params="importParams" @update="getList"></ys-import> -->
        <!-- <ys-export v-if="!isEdit" :params="exportParams"></ys-export> -->
        <!-- <el-button v-if="!isEdit" @click="edit" :disabled="query.level ? true : false" size="mini" type="success">编辑</el-button>
        <el-button v-if="isEdit" @click="save" size="mini" type="success">保存</el-button>
        <el-button v-if="isEdit" @click="cancel" size="mini" type="warning" plain>取消</el-button> -->
      </el-col>
    </el-row>
    <el-table class="table-input-box" ref="table" :data="tableData" size="mini" border stripe header-row-class-name="table-header" :height="this.$store.state.tableHeight" :cell-style="{ padding: '4px 0' }">
      <el-table-column fixed min-width="120" label="业态" show-overflow-tooltip>
        <template slot-scope="scope">
          <p>{{ scope.row.bizType == '合计' ? '/' : getSubjectName(scope,1) }}</p>
        </template>
      </el-table-column>
      <el-table-column fixed min-width="120" label="资产" show-overflow-tooltip>
        <template slot-scope="scope">
          <p>{{ scope.row.bizType =='合计' ? '/' : getSubjectName(scope,2) }}</p>
        </template>
      </el-table-column>
      <el-table-column fixed min-width="120" label="属性" show-overflow-tooltip>
        <template slot-scope="scope">
          <p>{{ scope.row.bizType =='合计' ? '/' : getSubjectName(scope,3) }}</p>
        </template>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column label="管理面积" align="center">
        <el-table-column min-width="140" label="建筑面积" :show-overflow-tooltip="!isEdit" prop="coveredArea" align="right">
          <template slot-scope="scope">
            <p>{{ returnValue(scope.row,'coveredArea',true,false) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="套内面积" :show-overflow-tooltip="!isEdit" prop="insideArea" align="right">
          <template slot-scope="scope">
            <p>{{ returnValue(scope.row,'insideArea',true,false) }}</p>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column label="GLA(可租面积)" align="center">
        <el-table-column min-width="140" label="一铺一价版" :show-overflow-tooltip="!isEdit" prop="glaPriceArea" align="right">
          <template slot-scope="scope">
            <p>{{ returnValue(scope.row,'glaPriceArea',true,false) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="签约版" :show-overflow-tooltip="!isEdit" prop="glaContractArea" align="right">
          <template slot-scope="scope">
            <p>{{ returnValue(scope.row,'glaContractArea',true,false) }}</p>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column label="计费面积" align="center">
        <el-table-column min-width="140" label="签约版" :show-overflow-tooltip="!isEdit" prop="billingArea" align="right">
          <template slot-scope="scope">
            <p>{{ returnValue(scope.row,'billingArea',true,false) }}</p>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column min-width="140" label="车位数" :show-overflow-tooltip="!isEdit" prop="parkingNum" align="right">
        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'parkingNum',true,false) }}</p>
        </template>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column label="收费标准" align="center">
        <el-table-column min-width="140" label="免费时长(h)" :show-overflow-tooltip="!isEdit" prop="ratesFreetime" align="right">
          <template slot-scope="scope">
            <p>{{ returnValue(scope.row,'ratesFreetime',true,false) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="收费标准(元/h)" :show-overflow-tooltip="!isEdit" prop="ratesHour">
          <template slot-scope="scope">
            <p>{{ returnValue(scope.row,'ratesHour',true,false) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="24H封顶(元)" :show-overflow-tooltip="!isEdit" prop="ratesDay" align="right">
          <template slot-scope="scope">
            <p>{{ returnValue(scope.row,'ratesDay',true,false) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="员工停车(元/月)" :show-overflow-tooltip="!isEdit" prop="ratesEmp" align="right">
          <template slot-scope="scope">
            <p>{{ returnValue(scope.row,'ratesEmp',true,false) }}</p>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column min-width="200" label="备注" :show-overflow-tooltip="!isEdit" prop="remarkOne">
        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'remarkOne',false,false) }}</p>
        </template>
      </el-table-column>
    </el-table>
    <ys-paginator v-if="!isEdit" :page-info="pageInfo" @handle_paginator="handle_paginator" />
  </div>
</template>

<script>
import { handle_paginator } from '@mixins'
import { toThousandsClean, getDynamicTableHeight, returnValue } from '@/utils/index'
import FeeScheduleApi from '@/apis/apis/feeScheduleApi'
import SummaryApi from '@/apis/apis/summaryApi'
import GlobalApi from '@/apis/apis/global'
import { mapGetters, mapState } from "vuex";
export default {
  mixins: [handle_paginator],
  data() {
    return {
      pageInfo: {
        pageSize: 10,
        pageNum: 1,
        total: 0
      },
      query: {
        bizType: null, // 业态
        assetType: null, // 资产
        level: null// 级别
      },
      selectIndex: 0,
      routerQuery: null,
      toProjectRouter: null,
      toPersonRouter: null,
      baseAreaBizTypeList: null,
      baseAreaAssetList: null,
      baseAreaLevelList: null,
      isEdit: false,
      selectLayoutList: [], // 业态集合
      levelList: [], // 级别集合
      tableData: [],
      oldTableData: '',
      permission: `${localStorage.getItem('ys_contract_permission')}`
    }
  },
  watch: {},
  computed: {
    ...mapGetters(['currentYear']),
    exportParams() {
      return {
        params: {
          bean: {
            ...this.routerQuery,
            ...this.query,
            type: 12
          }
        },
        excelName: '资金计划',
        exportUrl: '/bizFee/ExcelExport',
      }
    },
    importParams() {
      return {
        importUrl: '/collectbase/baseAreaImp',
        budgetInstanceSheetId: this.routerQuery.budgetInstanceSheetId,
      }
    }
  },
  created() {
    this.routerQuery = this.$route.query;
    this.getInfoId().then(res => {
      if (res.code === 0) {
        this.getList()
        this.getSelectList('baseAreaBizType')
        this.getSelectList('baseAreaAsset')
        this.getSelectList('baseAreaLevel')
        this.toProjectRouter = { ...this.routerQuery, budgetInstanceSheetId: res.data[1] };
        this.toPersonRouter = { ...this.routerQuery, budgetInstanceSheetId: res.data[2] };
      }
    })
  },
  mounted() {

  },
  // 日期转换格式
  filters: {
    formatDate(time) {
      return time ? new Date(parseInt(time)).format('yyyy-MM-dd') : ''
    },
    formatVal(val) {
      return toThousandsClean(val)
    }
  },
  methods: {
    returnValue,
    async getList() {
      // 查询
      const params = {
        pageSize: this.pageInfo.pageSize,
        pageNum: this.pageInfo.pageNum,
        bean: {
          ...this.query,
          budgetInstanceSheetId: this.routerQuery.budgetInstanceSheetId
        }
      };
      this.isEdit = false;
      await SummaryApi.areaInfoList(params).then((res) => {
        if (res.code === 0) {
          this.tableData = []
          this.tableData = res.data.list
          this.pageInfo.total = res.data.total
          // this.oldTableData = JSON.stringify(res.data.list.slice(1))
          getDynamicTableHeight(this)
        }
      })
    },
    async getInfoId() {
      try {
        // 查询
        const params = { budgetInstanceId: this.routerQuery.budgetInstanceId };//实例ID
        return await SummaryApi.getInfoId(params);
      } catch (e) {
        console.log(e)
      }
    },
    async getSelectList(type) {
      // baseAreaBizType   基础信息 面积 业态下拉
      // baseAreaAsset    基础信息 资产类型
      // baseAreaLevel   基础信息 级别拉下
      const params = {
        selectType: type
      }
      await GlobalApi.getSelectList(params).then(res => {
        if (res.code === 0) {
          if (type == 'baseAreaBizType') {
            this.baseAreaBizTypeList = res.data;
          } else if (type == 'baseAreaAsset') {
            this.baseAreaAssetList = res.data;
          } else if (type == 'baseAreaLevel') {
            this.baseAreaLevelList = res.data;
          }
        }
      })
    },
    // async getBizTypeList(level) {
    //   const params = {
    //     sheetId: this.routerQuery.budgetSheetId,
    //     level: level
    //   }
    //   await GlobalApi.getBizTypeList(params).then(res => {
    //     if (res.code === 0) {
    //       this.selectLayoutList = res.data
    //     }
    //   })
    // },
    getSubjectName(scope, level) {
      const row = scope.row
      switch (level) {
        case 1:
          return row.bizType || '-'
          break
        case 2:
          return row.assetType || '-'
          break
        case 3:
          return row.assetNature || '-'
          break
        default:
          return '-'
      }
    },
    // 重新选择搜索项重置页码
    getListChange() {
      this.isEdit = false;
      this.pageInfo.pageNum = 1
      this.getList()
    },
    bizTypeSelectFunc(data) {
      this.query.paramFirst = data.subjectId;
      this.query.bizTypeName = data.subjectName;
      this.search();
    },
    search() {
      this.pageInfo.pageNum = 1
      this.getList()
    },
    reset() {
      this.query = {
        bizType: null, // 业态
        assetType: null, // 资产
        level: null// 级别
      }
      this.getList()
    },
    showInput(index) {
      // 选择一行显示input
      this.selectIndex = index
      if (this.isEdit) {
        this.selectIndex = index
      } else {
        this.selectIndex = null
      }
    },
    edit() {
      // 编辑/取消
      this.isEdit = true
      this.query = {
        bizType: null, // 业态
        assetType: null, // 资产
        level: null// 级别
      }
      this.tableData.shift()
    },
    cancel() {
      const tableData = JSON.stringify(this.tableData)
      if (this.oldTableData == tableData) {
        this.getList()
        this.isEdit = false
      } else {
        this.$confirm('是否保存已编辑内容', {
          confirmButtonText: '是',
          cancelButtonText: '否'
        }).then(() => {
          this.save()
          this.isEdit = false
        }).catch(() => {
          this.getList()
          this.isEdit = false
        })
      }
    },
    // 保存
    save() {
      this.isEdit = false
      this.selectIndex = 0
      const params = {
        budgetInstanceSheetId: this.routerQuery.budgetInstanceSheetId,
        list: [
          ...this.tableData
        ]
      }
      FeeScheduleApi.feeEdit(params).then(res => {
        if (res.code == 0) {
          this.getList()
        } else {
          this.$message({
            message: '数据异常！',
            type: 'warning'
          })
        }
      })
    }
  }
}
</script>
<style type="text/css" lang="scss" scoped>
@import "~@styles/common.scss";
.el-icon-circle-plus,
.el-icon-remove {
  font-size: 20px;
}
.el-icon-remove {
  color: red;
}
.table-input-box {
  p {
    width: 100%;
    height: 24px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
.select-title {
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-start;
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
</style>

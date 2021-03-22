<template>
  <!-- 预算编制-费用支出-其他成本费用 -->
  <div class="list-page otherCostFee">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle" style="flex-flow: wrap;">
      <el-col :span="12">
        <el-select v-if="!isEdit" placeholder="请选择业态" size="mini" @change="search" v-model="query.bizTypeId" filterable clearable style="margin-right: 5px; width: 180px;">
          <el-option v-for="item in selectLayoutList" :key="item.id" :label="item.dictName" :value="item.dictCd">
          </el-option>
        </el-select>
        <el-button v-if="!isEdit" @click="reset" size="mini">重置</el-button>
      </el-col>
      <el-col :span="12" style="text-align:right">
        <!-- <ys-import v-if="!isEdit" :params="importParams" @update="getList"></ys-import> -->
        <ys-export v-if="!isEdit" :params="exportParams"></ys-export>
        <el-button v-if="!isEdit" @click="edit" size="mini" type="success">编辑</el-button>
        <el-button v-if="isEdit" @click="createRow" size="mini" type="success" plain>添加费项</el-button>
        <el-button v-if="isEdit" @click="deleteRows" size="mini" type="danger" :disabled="!getSelectRowLength" plain>删除费项</el-button>
        <el-button v-if="isEdit" @click="save" size="mini" type="success">保存</el-button>
        <el-button v-if="isEdit" @click="cancel" size="mini" type="warning" plain>取消</el-button>
      </el-col>
    </el-row>
    <el-form :model="ruleForm" ref="ruleForm">
      <el-table class="table-input-box" ref="table" :data="ruleForm.tableData" size="mini" @selection-change="handleSelectionChange" border stripe header-row-class-name="table-header" :height="this.$store.state.tableHeight" :cell-style="{ padding: '4px 0' }">
        <el-table-column v-if="isEdit" type="selection" width="50" fixed />
        <el-table-column fixed min-width="140" label="业态" :show-overflow-tooltip="!isEdit" prop="bizType">
          <template slot-scope="scope">
            <el-form-item v-if="isEdit && (scope.$index == selectIndex && (scope.row.id ||scope.row.isCreateBol))" label="" :prop="`tableData.${scope.$index}.bizTypeId`" >
              <el-select placeholder="请选择" size="mini" v-model="scope.row.bizTypeId" filterable clearable @change="bizTypeIdChange(scope.$index, $event)">
                <el-option v-for="item in selectLayoutList" :key="item.id" :label="item.dictName" :value="item.dictCd">
                </el-option>
              </el-select>
            </el-form-item>
            <p v-else @click="showInput(scope.$index)">{{returnValue(scope.row,'bizType',true) }}</p>
          </template>
        </el-table-column>
        <el-table-column fixed min-width="150" label="项目" :show-overflow-tooltip="!isEdit" prop="project">
          <template slot-scope="scope">
            <el-form-item v-if="isEdit && (scope.$index == selectIndex && (scope.row.id ||scope.row.isCreateBol))" label="" :prop="`tableData.${scope.$index}.project`" >
              <el-input maxlength="80" v-model="scope.row.project" placeholder="请输入" size="mini"></el-input>
            </el-form-item>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'project',false) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="170" :label="`${getBudgetYear-1}年度预计发生额`" :show-overflow-tooltip="!isEdit" prop="preYtd" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && (scope.$index == selectIndex && (scope.row.id ||scope.row.isCreateBol))" v-filter-check-input maxlength="12" v-model="scope.row.preYtd" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{returnValue(scope.row,'preYtd') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="170" :label="`${getBudgetYear}年度预算合计`" show-overflow-tooltip prop="ytd" align="right">
          <template slot-scope="scope">
            <p @click="showInput(scope.$index)">{{returnValue(scope.row,'ytd',true,false) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="1月" :show-overflow-tooltip="!isEdit" prop="jan" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && (scope.$index == selectIndex && (scope.row.id ||scope.row.isCreateBol))" v-filter-check-input maxlength="12" v-model="scope.row.jan" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{returnValue(scope.row,'jan') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="2月" :show-overflow-tooltip="!isEdit" prop="feb" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && (scope.$index == selectIndex && (scope.row.id ||scope.row.isCreateBol))" v-filter-check-input maxlength="12" v-model="scope.row.feb" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{returnValue(scope.row,'feb') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="3月" :show-overflow-tooltip="!isEdit" prop="march" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && (scope.$index == selectIndex && (scope.row.id ||scope.row.isCreateBol))" v-filter-check-input maxlength="12" v-model="scope.row.march" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{returnValue(scope.row,'march') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="4月" :show-overflow-tooltip="!isEdit" prop="april" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && (scope.$index == selectIndex && (scope.row.id ||scope.row.isCreateBol))" v-filter-check-input maxlength="12" v-model="scope.row.april" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{returnValue(scope.row,'april') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="5月" :show-overflow-tooltip="!isEdit" prop="may" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && (scope.$index == selectIndex && (scope.row.id ||scope.row.isCreateBol))" v-filter-check-input maxlength="12" v-model="scope.row.may" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{returnValue(scope.row,'may') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="6月" :show-overflow-tooltip="!isEdit" prop="june" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && (scope.$index == selectIndex && (scope.row.id ||scope.row.isCreateBol))" v-filter-check-input maxlength="12" v-model="scope.row.june" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{returnValue(scope.row,'june') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="7月" :show-overflow-tooltip="!isEdit" prop="july" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && (scope.$index == selectIndex && (scope.row.id ||scope.row.isCreateBol))" v-filter-check-input maxlength="12" v-model="scope.row.july" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{returnValue(scope.row,'july') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="8月" :show-overflow-tooltip="!isEdit" prop="aug" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && (scope.$index == selectIndex && (scope.row.id ||scope.row.isCreateBol))" v-filter-check-input maxlength="12" v-model="scope.row.aug" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{returnValue(scope.row,'aug') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="9月" :show-overflow-tooltip="!isEdit" prop="sep" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && (scope.$index == selectIndex && (scope.row.id ||scope.row.isCreateBol))" v-filter-check-input maxlength="12" v-model="scope.row.sep" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{returnValue(scope.row,'sep') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="10月" :show-overflow-tooltip="!isEdit" prop="oct" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && (scope.$index == selectIndex && (scope.row.id ||scope.row.isCreateBol))" v-filter-check-input maxlength="12" v-model="scope.row.oct" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{returnValue(scope.row,'oct') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="11月" :show-overflow-tooltip="!isEdit" prop="nov" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && (scope.$index == selectIndex && (scope.row.id ||scope.row.isCreateBol))" v-filter-check-input maxlength="12" v-model="scope.row.nov" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{returnValue(scope.row,'nov') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="12月" :show-overflow-tooltip="!isEdit" prop="dece" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && (scope.$index == selectIndex && (scope.row.id ||scope.row.isCreateBol))" v-filter-check-input maxlength="12" v-model="scope.row.dece" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{returnValue(scope.row,'dece') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="200" label="备注" :show-overflow-tooltip="!isEdit" prop="remark">
          <template slot-scope="scope">
            <el-input v-if="isEdit && (scope.$index == selectIndex && (scope.row.id ||scope.row.isCreateBol))" maxlength="80" v-model="scope.row.remark" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{returnValue(scope.row,'remark',false) }}</p>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <ys-paginator v-if="!isEdit" :page-info="pageInfo" @handle_paginator="handle_paginator" />
  </div>
</template>

<script>
import { handle_paginator } from '@mixins'
import { toThousandsClean, getDynamicTableHeight, returnValue } from '@/utils/index'
import FeeScheduleApi from '@/apis/apis/feeScheduleApi'
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
        bizTypeId: null// 业态
      },
      routerQuery: null,
      selectIndex: 0,
      selectRow: [],
      createIndex: 0,
      isEdit: false,
      selectLayoutList: [], // 业态集合
      levelList: [], // 级别集合
      ruleForm: {
        tableData: [],
      },
      oldTableData: '',
      permission: `${localStorage.getItem('ys_contract_permission')}`
    }
  },
  watch: {},
  computed: {
    ...mapGetters(['getBudgetYear']),
    getSelectRowLength() {
      return this.selectRow.length > 0
    },
    exportParams() {
      return {
        params: {
          bean: {
            ...this.routerQuery,
            ...this.query,
          }
        },
        excelName: '其他成本费用',
        exportUrl: '/bizOther/excelExport',
      }
    },
    importParams() {
      return {
        importUrl: '/bizOther/excelImport',
        budgetInstanceSheetId: this.routerQuery.budgetInstanceSheetId
      }
    }
  },
  created() {
    this.routerQuery = this.$route.query
    // this.routerQuery = { budgetInstanceSheetId: '85840', budgetSheetId: '45' };
    this.getSelectList('bizFormat')// 业态
    this.getSelectList('clearLevel')// 级别
    this.getList()
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
      this.ruleForm.tableData = []
      await FeeScheduleApi.otherFind(params).then((res) => {
        if (res.code === 0) {
          this.ruleForm.tableData = res.data.list
          this.pageInfo.total = res.data.total
          this.oldTableData = JSON.stringify(res.data.list.slice(1))
          getDynamicTableHeight(this)
        }
      })
    },
    async getSelectList(type) {
      // 级别
      const params = {
        selectType: type
      }
      await GlobalApi.getSelectList(params).then(res => {
        if (res.code === 0) {
          const { data } = res
          const nData = data.map((item) => {
            return { ...item, dictCd: Number(item.dictCd) }
          });
          if (type == 'bizFormat') {
            this.selectLayoutList = nData
          } else if (type == 'clearLevel') {
            this.levelList = nData
          }
        }
      })
    },
    handleSelectionChange(val) {
      this.selectRow = []
      this.selectRow = val
    },
    deleteRows() {
      if (!this.selectRow[0]) return this.$message.error('请选择要删除的数据')
      // 删除培训项
      this.$confirm('确认要删除吗？').then(() => {
        // 本次编辑新增项
        const createIndexs = []
        const ids = []
        this.selectRow.map((item) => {
          if (item.createIndex) {
            createIndexs.push(item.createIndex)
          }
        })
        // 数据库中存在的数据
        this.selectRow.map((item) => {
          if (item.id) {
            ids.push(item.id)
          }
        })
        if (ids.length > 0) {
          let params = {
            budgetInstanceSheetId: this.routerQuery.budgetInstanceSheetId,
            idList: [...ids]
          }
          FeeScheduleApi.otherDel(params).then(res => {
            if (res.code == 0) {
              this.ruleForm.tableData = [...this.ruleForm.tableData].filter(x => [...ids].every(y => y !== x.id))
              if (createIndexs.length > 0) {
                this.ruleForm.tableData = [...this.ruleForm.tableData].filter(x => [...createIndexs].every(y => y !== x.createIndex));
              }
            }
          })
        } else {
          this.ruleForm.tableData = [...this.ruleForm.tableData].filter(x => [...createIndexs].every(y => y !== x.createIndex));
          this.$message({ message: '删除成功！', type: 'success' })
        }
      })
    },
    createRow() {
      this.selectIndex = 0
      this.createIndex++
      const row = {
        createIndex: this.createIndex, isCreateBol: true, bizTypeId: null, project: null, preYtd: null, ytd: null, jan: null, feb: null, march: null, april: null, may: null, june: null, july: null, aug: null, sep: null, oct: null, nov: null, dece: null, remark: null
      }
      this.ruleForm.tableData.unshift(row)
    },
    bizTypeIdChange(index, val) {
      // 选择业态赋值name
      const obj = this.selectLayoutList.find(item => item.dictCd == val)
      this.ruleForm.tableData[index].bizType = obj.dictName
    },
    // 重新选择搜索项重置页码
    getListChange() {
      this.pageInfo.page = 1
      this.isEdit = false;
      this.getList()
    },
    search() {
      this.pageInfo.pageNum = 1
      this.getList()
    },
    reset() {
      this.query = {
        bizTypeId: null// 业态
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
        bizTypeId: null, // 业态
        level: null// 级别
      }
      this.ruleForm.tableData.shift()
    },
    cancel() {
      const tableData = JSON.stringify(this.ruleForm.tableData)
      if (this.oldTableData == tableData) {
        this.getList()
        this.isEdit = false
      } else {
        this.$confirm('是否保存已编辑内容', {
          confirmButtonText: '是',
          cancelButtonText: '否'
        }).then(() => {
          this.save()
        }).catch(() => {
          this.getList()
          this.isEdit = false
        })
      }
    },
    delKey(obj, ...args) {
      args.forEach(v => {
        delete obj[v]
      })
      return obj
    },
    save() {

      for (let key in this.ruleForm.tableData) {
        if (!this.ruleForm.tableData[key].bizTypeId) return this.$message.error('请选择业态')
        if (!this.ruleForm.tableData[key].project) return this.$message.error('请输入项目')
      }

      // 保存
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.isEdit = false
          this.selectIndex = 0
          // const row = {
          //   bizTypeId: null, project: null, preYtd: null, ytd: null, jan: null, feb: null, march: null, april: null, may: null, june: null, july: null, aug: null, sep: null, oct: null, nov: null, dece: null, remark: null
          // }
          // let data = [];
          // this.ruleForm.tableData && this.ruleForm.tableData.map(item => {
          //   let newItem = this.delKey(item, 'createIndex', 'isCreateBol');
          //   if (JSON.stringify(newItem) != JSON.stringify(row)) {
          //     data.push(item);
          //   }
          // })
          const params = {
            budgetInstanceSheetId: this.routerQuery.budgetInstanceSheetId,
            list: [
              ...this.ruleForm.tableData
            ]
          }
          FeeScheduleApi.otherUpdate(params).then(res => {
            if (res.code == 0) {
              this.getList()
            }
          })
        }
      });
    }
  }
}
</script>
<style type="text/css" lang="scss" >
@import "~@styles/common.scss";
.otherCostFee {
  .table-input-box {
    p {
      width: 100%;
      height: 24px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .el-select {
      width: 100%;
    }
    // .el-form-item__error {
    //   position: relative;
    // }
  }
}
</style>

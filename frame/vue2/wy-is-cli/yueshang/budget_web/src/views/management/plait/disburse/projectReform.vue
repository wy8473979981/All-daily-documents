<template>
  <!-- 预算编制-费用支出-工程改造费 -->
  <div class="list-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle" style="flex-flow: wrap;">
      <el-col style="text-align: right;">
        <!-- <ys-import v-if="!isEdit" :params="importParams" @update="getList"></ys-import> -->
        <ys-export v-if="!isEdit" :params="exportParams"></ys-export>
        <!-- <el-button v-if="!isEdit" @click="edit" size="mini" type="success">编辑</el-button>
        <el-button v-if="isEdit" @click="add" size="mini" type="success" plain>添加改造内容</el-button>
        <el-button v-if="isEdit" @click="del" size="mini" type="danger" plain>删除改造内容</el-button>
        <el-button v-if="isEdit" @click="save" size="mini" type="success">保存</el-button>
        <el-button v-if="isEdit" @click="cancel" size="mini" type="warning" plain>取消</el-button> -->
      </el-col>
    </el-row>
    <el-table class="table-input-box" ref="table" :data="tableData" @selection-change="handleSelectionChange" size="mini" border stripe header-row-class-name="table-header" :height="this.$store.state.tableHeight" :cell-style="{ padding: '4px 0' }">
      <el-table-column v-if="isEdit" type="selection" width="50" fixed />
      <el-table-column fixed min-width="140" label="业态" :show-overflow-tooltip="!isEdit" prop="bizType">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.bizType" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ scope.row.bizType || '-' }}</p>
        </template>
      </el-table-column>
      <el-table-column fixed min-width="140" label="科目" :show-overflow-tooltip="!isEdit" prop="subject">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.subject" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ (scope.$index == 0 && !isEdit) ? '/' : scope.row.subject || '-' }}</p>
        </template>
      </el-table-column>
      <el-table-column fixed min-width="140" label="子科目" :show-overflow-tooltip="!isEdit" prop="subSubject">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.subSubject" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ (scope.$index == 0 && !isEdit) ? '/' : scope.row.subSubject || '-' }}</p>
        </template>
      </el-table-column>
      <el-table-column fixed min-width="140" label="专业类别" :show-overflow-tooltip="!isEdit" prop="category">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.category" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ (scope.$index == 0 && !isEdit) ? '/' : scope.row.category || '-' }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="改造需求" :show-overflow-tooltip="!isEdit" prop="demand">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.demand" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ (scope.$index == 0 && !isEdit) ? '/' : scope.row.demand || '-' }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="改造内容" :show-overflow-tooltip="!isEdit" prop="content">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.content" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ (scope.$index == 0 && !isEdit) ? '/' : scope.row.content || '' }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="情况说明" :show-overflow-tooltip="!isEdit" prop="information">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.information" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ (scope.$index == 0 && !isEdit) ? '/' : scope.row.information || '' }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="170" label="施工方案及费用组成" :show-overflow-tooltip="!isEdit" prop="plan">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.plan" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ (scope.$index == 0 && !isEdit) ? '/' : scope.row.plan || '' }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="160" label="进场施工时间" :show-overflow-tooltip="!isEdit" prop="start">
        <template slot-scope="scope">
          <el-date-picker v-if="isEdit && scope.$index == selectIndex" v-model.trim="scope.row.start" value-format="yyyy-MM-dd" prefix-icon="" size="mini" clearable placeholder="请选择">
          </el-date-picker>
          <p v-else @click="showInput(scope.$index)">{{ (scope.$index == 0 && !isEdit) ? '/' : scope.row.start || '' }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="160" label="竣工完成时间" :show-overflow-tooltip="!isEdit" prop="end">
        <template slot-scope="scope">
          <el-date-picker v-if="isEdit && scope.$index == selectIndex" v-model.trim="scope.row.end" value-format="yyyy-MM-dd" prefix-icon="" size="mini" clearable placeholder="请选择">
          </el-date-picker>
          <p v-else @click="showInput(scope.$index)">{{ (scope.$index == 0 && !isEdit) ? '/' : scope.row.end || '' }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="预估费用合计" show-overflow-tooltip prop="ytd" align="right">
        <template slot-scope="scope">
          <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'ytd',true,false) }}</p>
        </template>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column label="款项支付时间" align="center">
        <el-table-column min-width="140" label="1月" :show-overflow-tooltip="!isEdit" prop="jan" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.jan" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'jan') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="2月" :show-overflow-tooltip="!isEdit" prop="feb" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.feb" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'feb') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="3月" :show-overflow-tooltip="!isEdit" prop="march" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.march" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'march') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="4月" :show-overflow-tooltip="!isEdit" prop="april" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.april" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'april') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="5月" :show-overflow-tooltip="!isEdit" prop="may" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.may" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'preYtd') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="6月" :show-overflow-tooltip="!isEdit" prop="june" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.june" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'june') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="7月" :show-overflow-tooltip="!isEdit" prop="july" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.july" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'july') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="8月" :show-overflow-tooltip="!isEdit" prop="aug" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.aug" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'aug') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="9月" :show-overflow-tooltip="!isEdit" prop="sep" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.sep" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'sep') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="10月" :show-overflow-tooltip="!isEdit" prop="oct" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.oct" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'oct') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="11月" :show-overflow-tooltip="!isEdit" prop="nov" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.nov" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'nov') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="12月" :show-overflow-tooltip="!isEdit" prop="dece" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.dece" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'dece') }}</p>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column min-width="200" label="备注" :show-overflow-tooltip="!isEdit" prop="remark">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.remark" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'remark',false) }}</p>
        </template>
      </el-table-column>
    </el-table>

    <ys-paginator :page-info="pageInfo" @handle_paginator="handle_paginator" />
  </div>
</template>

<script>
import { handle_paginator } from '@mixins'
import { toThousandsClean, getDynamicTableHeight, returnValue } from '@/utils/index'
import FeeScheduleApi from "@/apis/apis/feeScheduleApi"
export default {
  mixins: [handle_paginator],
  data() {
    return {
      isEdit: false,
      selectIndex: 0,
      createIndex: 0,
      pageInfo: {
        pageSize: 10,
        pageNum: 1,
        total: 0,
      },
      query: {
      },
      tableData: [],
      oldTableData: '',
      selectData: [],
      routerQuery: null,
      permission: `${localStorage.getItem('ys_contract_permission')}`
    }
  },
  watch: {},
  computed: {
    exportParams() {
      return {
        params: {
          bean: {
            ...this.routerQuery,
          }
        },
        excelName: '工程改造费',
        exportUrl: '/bizReform/excelExport',
      }
    },
    importParams() {
      return {
        importUrl: '/bizReform/excelImport',
        budgetInstanceSheetId: this.routerQuery.budgetInstanceSheetId
      }
    }
  },
  created() {
    this.routerQuery = this.$route.query
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
    // 查询
    async getList() {
      const params = {
        ...this.pageInfo,
        bean: {
          ...this.routerQuery,
          ...this.query,
        }
      }
      this.isEdit = false
      await FeeScheduleApi.reformFind(params).then(res => {
        if (res.code == 0) {
          this.tableData = res.data.list
          this.pageInfo.total = res.data.total
          this.oldTableData = JSON.stringify(res.data.list.slice(1))
          getDynamicTableHeight(this)
        }
      })
    },
    // 重新选择搜索项重置页码
    getListChange() {
      this.isEdit = false
      this.pageInfo.pageNum = 1
      this.getList()
    },
    // 选择一行显示input
    showInput(index) {
      this.selectIndex = index
    },
    reset() {
      this.query = {
        paramFirst: null,
        level: null,
      }
      this.getList()
    },
    // 添加培训项
    add() {
      this.createIndex++
      let newTrain = {
        createIndex: this.createIndex,
        bizType: null,
        subject: null,
        subSubject: null,
        category: null,
        demand: null,
        content: null,
        information: null,
        plan: null,
        start: null,
        end: null,
        ytd: null,
        jan: null,
        feb: null,
        march: null,
        april: null,
        may: null,
        june: null,
        july: null,
        aug: null,
        sep: null,
        oct: null,
        nov: null,
        dece: null,
        remark: null,
      }
      this.tableData.unshift(newTrain)
    },
    handleSelectionChange(val) {
      this.selectData = []
      this.selectData = val
    },
    // 删除
    del() {
      if (!this.selectData[0]) return this.$message.error('请选择要删除的数据')
      // 删除
      this.$confirm(`确认要删除吗？`).then(() => {
        // 本次编辑新增项
        let createIndexs = []
        let ids = []
        this.selectData.map((item) => {
          if (item.createIndex) {
            createIndexs.push(item.createIndex)
          }
        })
        // 数据库中存在的数据
        this.selectData.map((item) => {
          if (item.id) {
            ids.push(item.id)
          }
        })
        if (ids.length > 0) {
          let params = {
            budgetInstanceSheetId: this.routerQuery.budgetInstanceSheetId,
            idList: [...ids]
          }
          FeeScheduleApi.reformDel(params).then(res => {
            if (res.code == 0) {
              this.tableData = [...this.tableData].filter(x => [...ids].every(y => y !== x.id))
              if (createIndexs.length > 0) {
                this.tableData = [...this.tableData].filter(x => [...createIndexs].every(y => y !== x.createIndex))
              }
            }
          })
        } else {
          this.tableData = [...this.tableData].filter(x => [...createIndexs].every(y => y !== x.createIndex))
          this.$message.success('删除成功！')
        }
      })
    },
    // 编辑
    edit() {
      this.isEdit = true
      this.tableData.shift()
    },
    // 取消
    cancel() {
      let tableData = JSON.stringify(this.tableData)
      if (this.oldTableData == tableData) {
        this.getList()
        this.isEdit = false
      } else {
        this.$confirm(`是否保存已编辑内容`, {
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
      for (let key in this.tableData) {
        if (!this.tableData[key].bizType) return this.$message.error('请输入业态')
        if (!this.tableData[key].subject) return this.$message.error('请输入科目')
        if (!this.tableData[key].subSubject) return this.$message.error('请输入子科目')
      }
      this.selectIndex = 0
      const params = {
        budgetInstanceSheetId: this.routerQuery.budgetInstanceSheetId,
        list: this.tableData
      }
      FeeScheduleApi.reformUpdate(params).then(res => {
        if (res.code == 0) {
          this.getList()
          this.isEdit = false
        }
      })
    }
  }
}
</script>
<style type="text/css" lang="scss" scoped>
@import "~@styles/common.scss";
</style>

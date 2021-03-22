<template>
  <!-- 预算编制-费用支出-培训费 -->
  <div class="list-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle" style="flex-flow: wrap;">
      <el-col :span="12">
        <el-select v-if="!isEdit" placeholder="请选择业态" size="mini" v-model="query.bizTypeId" @change="getListChange" filterable clearable style="margin-right: 5px; width: 180px;">
          <el-option v-for="item in bizTypeIdList" :key="item.dictCd" :label="item.dictName" :value="item.dictCd">
          </el-option>
        </el-select>
        <el-select v-if="!isEdit" placeholder="请选择级别" size="mini" v-model="query.level" @change="getListChange" filterable clearable style="margin-right: 5px; width: 180px;">
          <el-option v-for="item in levelList" :key="item.dictCd" :label="item.dictName" :value="item.dictCd">
          </el-option>
        </el-select>
        <el-button v-if="!isEdit" @click="reset" size="mini">重置</el-button>
      </el-col>
      <el-col :span="12" style="text-align: right;">
        <!-- <ys-import v-if="!isEdit" :params="importParams" @update="getList"></ys-import> -->
        <ys-export v-if="!isEdit" :params="exportParams"></ys-export>
        <!-- <el-button v-if="!isEdit" @click="edit" :disabled="query.level ? true : false" size="mini" type="success">编辑</el-button>
        <el-button v-if="isEdit" @click="add" size="mini" type="success" plain>添加培训项</el-button>
        <el-button v-if="isEdit" @click="del" size="mini" type="danger" plain>删除培训项</el-button>
        <el-button v-if="isEdit" @click="save" size="mini" type="success">保存</el-button>
        <el-button v-if="isEdit" @click="cancel" size="mini" type="warning" plain>取消</el-button> -->
      </el-col>
    </el-row>
    <el-table class="table-input-box" ref="table" :data="tableData" @selection-change="handleSelectionChange" size="mini" border stripe header-row-class-name="table-header" :height="this.$store.state.tableHeight" :cell-style="{ padding: '4px 0' }">
      <el-table-column v-if="isEdit" type="selection" width="50" fixed />
      <el-table-column fixed min-width="140" label="费用归属" :show-overflow-tooltip="!isEdit" prop="bizType">
        <template slot-scope="scope">
          <el-select v-if="isEdit && scope.$index == selectIndex" placeholder="请选择" size="mini" v-model="scope.row.bizTypeId" @change="bizTypeIdChange(scope.$index, $event)">
            <el-option v-for="item in bizTypeIdList" :key="item.dictCd" :label="item.dictName" :value="item.dictCd">
            </el-option>
          </el-select>
          <p v-else @click="showInput(scope.$index)">{{ scope.row.bizType || '-' }}</p>
        </template>
      </el-table-column>
      <el-table-column fixed min-width="140" label="培训内容" :show-overflow-tooltip="!isEdit" prop="content">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.content" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ (scope.$index == 0 && !isEdit) ? '/' : scope.row.content || '-' }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="培训对象" :show-overflow-tooltip="!isEdit" prop="trainees">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.trainees" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ (scope.$index == 0 && !isEdit) ? '/' : scope.row.trainees || '-' }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="培训时间" :show-overflow-tooltip="!isEdit" prop="trainingTime">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.trainingTime" maxlength="80" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ (scope.$index == 0 && !isEdit) ? '/' : scope.row.trainingTime || '-' }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="培训总费用" :show-overflow-tooltip="!isEdit" prop="trainingTotal" align="right">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.trainingTotal" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'trainingTotal') }}</p>
        </template>
      </el-table-column>
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
          <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'may') }}</p>
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
      <el-table-column min-width="140" label="合计" show-overflow-tooltip prop="ytd" align="right">
        <template slot-scope="scope">
          <p @click="showInput(scope.$index)">{{returnValue(scope.row,'ytd',true,false) }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="200" label="校验" show-overflow-tooltip prop="verify">
        <template slot-scope="scope">
          <p @click="showInput(scope.$index)">{{returnValue(scope.row,'verify',false,false) }}</p>
        </template>
      </el-table-column>
      <!-- <el-table-column min-width="140" label="车库面积(㎡)" align="right">
        <template slot-scope="scope">
          <span>{{ scope.row.garage_area | formatVal }}</span>
        </template>
      </el-table-column> -->
    </el-table>

    <ys-paginator :page-info="pageInfo" @handle_paginator="handle_paginator" />
  </div>
</template>

<script>
import { handle_paginator } from '@mixins'
import { toThousandsClean, getDynamicTableHeight, returnValue } from '@/utils/index'
import GlobalApi from '@/apis/apis/global'
import FeeScheduleApi from '@/apis/apis/feeScheduleApi'
export default {
  mixins: [handle_paginator],
  data() {
    return {
      fileList: [],
      isEdit: false,
      selectIndex: 0,
      createIndex: 0,
      pageInfo: {
        pageSize: 10,
        pageNum: 1,
        total: 0
      },
      query: {
        bizTypeId: null,
        level: null,
      },
      bizTypeIdList: [], // 业态列表
      levelList: [], // 级别列表
      tableData: [],
      oldTableData: '',
      selectData: [],
      routerQuery: null,
      permission: `${localStorage.getItem('ys_contract_permission')}`
    }
  },
  watch: {},
  created() {
    this.routerQuery = this.$route.query
    this.getBizTypeList()
    this.getSelectList()
    this.getList()
  },
  computed: {
    exportParams() {
      return {
        params: {
          bean: {
            ...this.routerQuery,
            ...this.query,
          }
        },
        excelName: '培训费',
        exportUrl: '/bizTrain/excelExport',
      }
    },
    importParams() {
      return {
        importUrl: '/bizTrain/excelImport',
        budgetInstanceSheetId: this.routerQuery.budgetInstanceSheetId
      }
    }
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
    // 获取业态列表
    getBizTypeList() {
      GlobalApi.getSelectList({ selectType: 'bizFormat' }).then(res => {
        if (res.code == 0) {
          res.data.forEach((item, index) => {
            res.data[index].dictCd = Number(item.dictCd)
          })
          this.bizTypeIdList = res.data
        }
      })
    },
    // 获取级别列表
    getSelectList() {
      GlobalApi.getSelectList({ selectType: 'bizTypeLevel' }).then(res => {
        if (res.code == 0) {
          this.levelList = res.data
        }
      })
    },
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
      await FeeScheduleApi.trainFind(params).then(res => {
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
    // 选择业态赋值name
    bizTypeIdChange(index, val) {
      const obj = this.bizTypeIdList.find(item => item.dictCd == val)
      this.tableData[index].bizType = obj.dictName
    },
    // 选择一行显示input
    showInput(index) {
      this.selectIndex = index
    },
    reset() {
      this.query = {
        bizTypeId: null,
        level: null
      }
      this.getList()
    },
    // 添加培训项
    add() {
      this.createIndex++
      const newTrain = {
        createIndex: this.createIndex,
        bizType: null,
        bizTypeId: null,
        content: null,
        trainees: null,
        trainingTime: null,
        trainingTotal: null,
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
        dece: null
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
          FeeScheduleApi.trainDel(params).then(res => {
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
        if (!this.tableData[key].bizTypeId) return this.$message.error('请选择费用归属')
        if (!this.tableData[key].content) return this.$message.error('请输入培训内容')
        if (!this.tableData[key].trainees) return this.$message.error('请输入培训对象')
        if (!this.tableData[key].trainingTime) return this.$message.error('请选择培训时间')
      }
      this.selectIndex = 0
      const params = {
        budgetInstanceSheetId: this.routerQuery.budgetInstanceSheetId,
        list: this.tableData
      }
      FeeScheduleApi.trainUpdate(params).then(res => {
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

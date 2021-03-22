<template>
  <!-- 预算查看-费用支出-非生产性资产采购 -->
  <div class="list-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle" style="flex-flow: wrap;">
      <el-col :span="12">
        <el-select v-if="!isEdit" placeholder="请选择业态" size="mini" v-model="query.bizTypeId" @change="getListChange" filterable clearable style="margin-right: 5px; width: 180px;">
          <el-option
            v-for="item in bizTypeIdList"
            :key="item.dictCd"
            :label="item.dictName"
            :value="item.dictCd">
          </el-option>
        </el-select>
        <el-select v-if="!isEdit" placeholder="请选择级别" size="mini" v-model="query.level" @change="getListChange" filterable clearable style="margin-right: 5px; width: 180px;">
          <el-option
            v-for="item in levelList"
            :key="item.dictCd"
            :label="item.dictName"
            :value="item.dictCd">
          </el-option>
        </el-select>
        <el-button v-if="!isEdit" @click="reset" size="mini">重置</el-button>
      </el-col>
      <el-col :span="12" style="text-align: right;">
        <!-- <ys-import v-if="!isEdit" :params="importParams" @update="getList"></ys-import> -->
        <ys-export v-if="!isEdit" :params="exportParams"></ys-export>
        <!-- <el-button v-if="!isEdit" @click="edit" :disabled="query.level ? true : false" size="mini" type="success">编辑</el-button> -->
        <!-- <el-button v-if="isEdit" @click="add" size="mini" type="success" plain>添加资产</el-button>
        <el-button v-if="isEdit" @click="del" size="mini" type="danger" plain>删除资产</el-button>
        <el-button v-if="isEdit" @click="save" size="mini" type="success">保存</el-button>
        <el-button v-if="isEdit" @click="cancel" size="mini" type="warning" plain>取消</el-button> -->
      </el-col>
    </el-row>
    <el-table class="table-input-box" ref="table" :data="tableData" @selection-change="handleSelectionChange" size="mini" border stripe header-row-class-name="table-header" :height="this.$store.state.tableHeight" :cell-style="{ padding: '4px 0' }">
      <!-- <el-table-column fixed v-if="isEdit" type="selection" width="50" /> -->
      <el-table-column type="selection"></el-table-column>
      <el-table-column fixed min-width="140" label="业态" :show-overflow-tooltip="!isEdit" prop="bizType">
        <template slot-scope="scope">
          <el-select v-if="isEdit && scope.$index == selectIndex" placeholder="请选择" size="mini" v-model="scope.row.bizTypeId" @change="bizTypeIdChange(scope.$index, $event)">
            <el-option
              v-for="item in bizTypeIdList"
              :key="item.dictCd"
              :label="item.dictName"
              :value="item.dictCd">
            </el-option>
          </el-select>
          <p v-else @click="showInput(scope.$index)">{{ scope.row.bizType || '-' }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="资产名称" :show-overflow-tooltip="!isEdit" prop="assetName">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.assetName" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ (scope.$index == 0 && !isEdit) ? '/' : scope.row.assetName || '-' }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="折旧年限(年)" :show-overflow-tooltip="!isEdit" prop="yearNum" align="right">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.yearNum" v-filter-check-input2 placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ (scope.$index == 0 && !isEdit) ? '/' : scope.row.yearNum || '-' }}</p>
        </template>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column label="采购金额(元)" align="center">
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
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column label="折旧金额(元)" align="center" v-if="!isEdit">
        <el-table-column min-width="140" label="1月" show-overflow-tooltip prop="unitJan" align="right">
            <template slot-scope="scope">
              <span>{{ returnValue(scope.row,'unitJan',true,false) }}</span>
            </template>
        </el-table-column>
        <el-table-column min-width="140" label="2月" show-overflow-tooltip prop="unitFeb" align="right">
            <template slot-scope="scope">
              <span>{{ returnValue(scope.row,'unitFeb',true,false) }}</span>
            </template>
        </el-table-column>
        <el-table-column min-width="140" label="3月" show-overflow-tooltip prop="unitMarch" align="right">
            <template slot-scope="scope">
              <span>{{ returnValue(scope.row,'unitMarch',true,false) }}</span>
            </template>
        </el-table-column>
        <el-table-column min-width="140" label="4月" show-overflow-tooltip prop="unitApril" align="right">
            <template slot-scope="scope">
              <span>{{ returnValue(scope.row,'unitApril',true,false) }}</span>
            </template>
        </el-table-column>
        <el-table-column min-width="140" label="5月" show-overflow-tooltip prop="unitMay" align="right">
            <template slot-scope="scope">
              <span>{{ returnValue(scope.row,'unitMay',true,false) }}</span>
            </template>
        </el-table-column>
        <el-table-column min-width="140" label="6月" show-overflow-tooltip prop="unitJune" align="right">
            <template slot-scope="scope">
              <span>{{ returnValue(scope.row,'unitJune',true,false) }}</span>
            </template>
        </el-table-column>
        <el-table-column min-width="140" label="7月" show-overflow-tooltip prop="unitJuly" align="right">
            <template slot-scope="scope">
              <span>{{ returnValue(scope.row,'unitJuly',true,false) }}</span>
            </template>
        </el-table-column>
        <el-table-column min-width="140" label="8月" show-overflow-tooltip prop="unitAug" align="right">
            <template slot-scope="scope">
              <span>{{ returnValue(scope.row,'unitAug',true,false) }}</span>
            </template>
        </el-table-column>
        <el-table-column min-width="140" label="9月" show-overflow-tooltip prop="unitSep" align="right">
            <template slot-scope="scope">
              <span>{{ returnValue(scope.row,'unitSep',true,false) }}</span>
            </template>
        </el-table-column>
        <el-table-column min-width="140" label="10月" show-overflow-tooltip prop="unitOct" align="right">
            <template slot-scope="scope">
              <span>{{ returnValue(scope.row,'unitOct',true,false) }}</span>
            </template>
        </el-table-column>
        <el-table-column min-width="140" label="11月" show-overflow-tooltip prop="unitNov" align="right">
            <template slot-scope="scope">
              <span>{{ returnValue(scope.row,'unitNov',true,false) }}</span>
            </template>
        </el-table-column>
        <el-table-column min-width="140" label="12月" show-overflow-tooltip prop="unitDec" align="right">
            <template slot-scope="scope">
              <span>{{ returnValue(scope.row,'unitDec',true,false) }}</span>
            </template>
        </el-table-column>
      </el-table-column>
    </el-table>

    <ys-paginator :page-info="pageInfo" @handle_paginator="handle_paginator"/>
  </div>
</template>

<script>
import { handle_paginator } from '@mixins'
import { toThousandsClean, getDynamicTableHeight, returnValue } from '@/utils/index'
import GlobalApi from '@/apis/apis/global'
import FeeScheduleApi from '@/apis/apis/feeScheduleApi'
export default {
  mixins: [handle_paginator],
  data () {
    return {
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
      levelList: [], // 渠道列表
      tableData: [],
      oldTableData: '',
      selectData: [],
      routerQuery: null,
      permission: `${localStorage.getItem('ys_contract_permission')}`
    }
  },
  watch: {
    isEdit() {
      this.$nextTick(() => {
        this.$refs.table.doLayout() //解决表格错位
      })
    }
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
        excelName: '非生产性资产采购',
        exportUrl: '/bizProcure/excelExport',
      }
    },
    importParams() {
      return {
        importUrl: '/bizProcure/excelImport',
        budgetInstanceSheetId: this.routerQuery.budgetInstanceSheetId
      }
    }
  },
  created () {
    this.routerQuery = this.$route.query
    this.getBizTypeList()
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
    getSelectList () {
      GlobalApi.getSelectList({ selectType: 'bizTypeLevel' }).then(res => {
        if (res.code == 0) {
          this.levelList = res.data
        }
      })
    },
    // 查询
    async getList () {
      const params = {
        ...this.pageInfo,
        bean: {
          ...this.routerQuery,
          ...this.query,
        }
      }
      this.isEdit = false
      await FeeScheduleApi.invalidFind(params).then(res => {
        if (res.code == 0) {
          this.tableData = res.data.list
          this.pageInfo.total = res.data.total
          this.oldTableData = JSON.stringify(res.data.list.slice(1))
          getDynamicTableHeight(this)
        }
      })
    },
    // 重新选择搜索项重置页码
    getListChange () {
      this.isEdit = false
      this.pageInfo.pageNum = 1
      this.getList()
    },
    // 选择业态赋值name
    bizTypeIdChange(index, val) {
      let obj = this.bizTypeIdList.find(item => item.dictCd == val)
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
      let newInvalid = {
        createIndex: this.createIndex,
        bizType: null,
        bizTypeId: null,
        assetName: null,
        yearNum: null,
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
      }
      this.tableData.unshift(newInvalid)
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
            budgetInstanceSheetId:this.routerQuery.budgetInstanceSheetId,
            idList:[...ids]
          }
          FeeScheduleApi.invalidDel(params).then(res => {
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
        if (!this.tableData[key].bizTypeId) return this.$message.error('请选择业态')
        if (!this.tableData[key].assetName) return this.$message.error('请输入资产名称')
      }
      this.selectIndex = 0
      const params = {
        budgetInstanceSheetId: this.routerQuery.budgetInstanceSheetId,
        list: this.tableData
      }
      FeeScheduleApi.invalidUpdate(params).then(res => {
        if(res.code == 0){
          this.getList()
          this.isEdit = false
        }
      })
    }
  }
}
</script>
<style type="text/css" lang="scss" scoped>
  @import '~@styles/common.scss';
</style>

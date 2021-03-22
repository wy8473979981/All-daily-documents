<template>
  <!-- 预算编制-收入-停车场收入 -->
  <div class="list-page parkingRevenue">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle" style="flex-flow: wrap;">
      <el-col :span="16">
        <el-select v-if="!isEdit" placeholder="请选择业态" size="mini" @change="search" v-model="query.bizTypeId" filterable clearable style="margin-right: 5px; width: 180px;">
          <el-option v-for="item in selectLayoutList" :key="item.id" :label="item.dictName" :value="item.dictCd"></el-option>
        </el-select>
        <el-button v-if="!isEdit" @click="reset" size="mini">重置</el-button>
      </el-col>
      <el-col :span="8" style="text-align:right">
        <!-- <ys-import v-if="!isEdit" :params="importParams" @update="getList"></ys-import> -->
        <ys-export v-if="!isEdit" :params="exportParams"></ys-export>
        <el-button v-if="!isEdit" @click="changeCarNumFunc" size="mini" type="success">编辑车位</el-button>
        <el-button v-if="!isEdit" @click="edit" size="mini" type="success">编辑</el-button>
        <el-button v-if="isEdit" @click="save" size="mini" type="success">保存</el-button>
        <el-button v-if="isEdit" @click="cancel" size="mini" type="warning" plain>取消</el-button>
      </el-col>
      <el-col class="car-data" v-if="!isEdit">
        <p>{{carNo}}</p>
      </el-col>
    </el-row>
    <el-table class="table-input-box" ref="table" :data="tableData" size="mini" border stripe header-row-class-name="table-header" :height="this.$store.state.tableHeight" :cell-style="{ padding: '4px 0' }">
      <el-table-column fixed min-width="140" label="业态" show-overflow-tooltip prop="bizType">
        <template slot-scope="scope">
          <p @click="showInput(scope.$index)">{{ scope.row.bizType || '/'}}</p>
        </template>
      </el-table-column>
      <el-table-column fixed min-width="140" label="类别" show-overflow-tooltip prop="category">
        <template slot-scope="scope">
          <p @click="showInput(scope.$index)">{{ scope.row.category || '/'}}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="170" :label="`${getBudgetYear-1}年度预计发生额`" show-overflow-tooltip prop="preYtd" align="right">
        <template slot-scope="scope">
          <el-input v-if="returnRowEdit(scope,1)" v-filter-check-input maxlength="12" v-model="scope.row.preYtd" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{returnRowIsEdit(scope,1)?returnValue(scope.row,'preYtd'):returnValue(scope.row,'preYtd',true,false) }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="差异" show-overflow-tooltip prop="diff" align="right">
        <template slot-scope="scope">
          <p @click="showInput(scope.$index)">{{returnValue(scope.row,'diff') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="170" label="平均停车单价（元/次）" show-overflow-tooltip prop="parkingUnit" align="right">
        <template slot-scope="scope">
          <el-input v-if="returnRowEdit(scope,2)" v-filter-check-input maxlength="12" v-model="scope.row.parkingUnit" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{returnRowIsEdit(scope,2)?returnValue(scope.row,'parkingUnit'):returnValue(scope.row,'parkingUnit',true,false) }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="200" label="平均临停车流数（车次/月）" show-overflow-tooltip prop="parkingTime" align="right">
        <template slot-scope="scope">
          <el-input v-if="returnRowEdit(scope,2)" v-filter-check-input2 v-model="scope.row.parkingTime" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{returnRowIsEdit(scope,2)?returnValue(scope.row,'parkingTime',true,true,0):returnValue(scope.row,'parkingTime',true,false,0) }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="200" label="预存卡平均单价（元/张）" show-overflow-tooltip prop="prestoreUnit" align="right">
        <template slot-scope="scope">
          <el-input v-if="returnRowEdit(scope,1)" v-filter-check-input2 v-model="scope.row.prestoreUnit" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{returnRowIsEdit(scope,1)?returnValue(scope.row,'prestoreUnit',true,true,0):returnValue(scope.row,'prestoreUnit',true,false,0) }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="200" label="预存卡月均数（张/月）" show-overflow-tooltip prop="prestoreNum" align="right">
        <template slot-scope="scope">
          <el-input v-if="returnRowEdit(scope,1)" v-filter-check-input2 v-model="scope.row.prestoreNum" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{returnRowIsEdit(scope,1)?returnValue(scope.row,'prestoreNum',true,true,0):returnValue(scope.row,'prestoreNum',true,false,0) }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="170" :label="`${getBudgetYear}年预算合计`" show-overflow-tooltip prop="ytd" align="right">
        <template slot-scope="scope">
          <p @click="showInput(scope.$index)">{{returnValue(scope.row,'ytd') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="1月" show-overflow-tooltip prop="jan" align="right">
        <template slot-scope="scope">
          <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'jan',true,false)}}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="2月" show-overflow-tooltip prop="feb" align="right">
        <template slot-scope="scope">
          <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'feb',true,false)}}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="3月" show-overflow-tooltip prop="march" align="right">
        <template slot-scope="scope">
          <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'march',true,false)}}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="4月" show-overflow-tooltip prop="april" align="right">
        <template slot-scope="scope">
          <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'april',true,false)}}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="5月" show-overflow-tooltip prop="may" align="right">
        <template slot-scope="scope">
          <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'may',true,false)}}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="6月" show-overflow-tooltip prop="june" align="right">
        <template slot-scope="scope">
          <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'june',true,false)}}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="7月" show-overflow-tooltip prop="july" align="right">
        <template slot-scope="scope">
          <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'july',true,false)}}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="8月" show-overflow-tooltip prop="aug" align="right">
        <template slot-scope="scope">
          <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'aug',true,false)}}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="9月" show-overflow-tooltip prop="sep" align="right">
        <template slot-scope="scope">
          <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'sep',true,false)}}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="10月" show-overflow-tooltip prop="oct" align="right">
        <template slot-scope="scope">
          <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'oct',true,false)}}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="11月" show-overflow-tooltip prop="nov" align="right">
        <template slot-scope="scope">
          <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'nov',true,false)}}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="12月" show-overflow-tooltip prop="dece" align="right">
        <template slot-scope="scope">
          <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'dece',true,false)}}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="150" label="备注" show-overflow-tooltip prop="remark">
        <template slot-scope="scope">
          <el-input v-if="returnRowEdit(scope)" maxlength="80" v-model="scope.row.remark" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'remark',false)}}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" :label="`${getBudgetYearNumber+1}VS${getBudgetYearNumber}递增率`" show-overflow-tooltip prop="nextRate" align="right">
        <template slot-scope="scope">
          <p @click="showInput(scope.$index)">{{ scope.row.nextRate |  percent}}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" :label="`${getBudgetYear+1}`" show-overflow-tooltip prop="nextYear" align="right">
        <template slot-scope="scope">
          <el-input v-if="returnRowEdit(scope)" v-filter-check-input maxlength="12" v-model="scope.row.nextYear" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'nextYear')}}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" :label="`${getBudgetYearNumber+2}VS${getBudgetYearNumber+1}递增率`" show-overflow-tooltip prop="oldRate" align="right">
        <template slot-scope="scope">
          <p @click="showInput(scope.$index)">{{ scope.row.oldRate |  percent}}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" :label="`${getBudgetYear+2}`" show-overflow-tooltip prop="oldYear" align="right">
        <template slot-scope="scope">
          <el-input v-if="returnRowEdit(scope)" v-filter-check-input maxlength="12" v-model="scope.row.oldYear" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'oldYear')}}</p>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑车位 -->
    <TruckSpaceDrawer v-if="truckSpaceDrawerFlag" :open="truckSpaceDrawerFlag" :table="cartableData" @drawerSave="mergeSure" @update:dialogVisible="dialogVisibles" />
  </div>
</template>
<script>
import { handle_paginator } from '@mixins'
import messageBox from '../../component/messageBox.vue'
import TruckSpaceDrawer from './components/truckSpaceDrawer.vue'
import { toThousandsClean, getDynamicTableHeight, returnValue } from '@/utils/index'
import IncomeApi from '@/apis/apis/incomeApi'
import globalApi from '@/apis/apis/global'
import { mapGetters, mapState } from "vuex";
export default {
  mixins: [handle_paginator],
  components: { messageBox, TruckSpaceDrawer },
  data() {
    return {
      query: {
        paramFirst: null// 业态
      },
      truckSpaceDrawerFlag: false,//编辑车位抽屉
      routerQuery: null,
      selectIndex: 0,
      isEdit: false,
      selectLayoutList: [], // 业态集合
      tableData: [],
      carNo: '',
      cartableData: [
        {
          bizType: 'MALL',
          ground: null,
          underground: null
        },
        {
          bizType: '商业街',
          ground: null,
          underground: null
        },
        {
          bizType: '住宅',
          ground: null,
          underground: null
        },
        {
          bizType: '写字楼',
          ground: null,
          underground: null
        }
      ],
      oldTableData: '',
      mergeShop: false,
      permission: `${localStorage.getItem('ys_contract_permission')}`
    }
  },
  watch: {},
  computed: {
    ...mapGetters(['getBudgetYear', 'getBudgetYearNumber']),
    exportParams() {
      return {
        params: {
          bean: {
            ...this.routerQuery,
            ...this.query,
          }
        },
        chartType: 49,
        excelName: '停车场收入',
        exportUrl: '/bizParking/excelExport',
      }
    },
    importParams() {
      return {
        importUrl: '/bizParking/excelImport',
        budgetInstanceSheetId: this.routerQuery.budgetInstanceSheetId
      }
    }
  },
  created() {
    this.routerQuery = this.$route.query
    // this.routerQuery = { budgetInstanceSheetId: '85839', budgetSheetId: '49' };
    this.getSelectList('bizFormat')// 业态
    this.getList()
    this.getCarNo();
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
        ...this.query,
        budgetInstanceSheetId: this.routerQuery.budgetInstanceSheetId
      }
      this.isEdit = false;
      await IncomeApi.bizParkingQuery(params).then((res) => {
        if (res.code === 0) {
          this.tableData = res.data
          this.oldTableData = JSON.stringify(res.data.slice(1))
          getDynamicTableHeight(this)
        }
      })
    },
    async getCarNo() {
      // 查询 车位
      const params = {
        budgetInstanceSheetId: this.routerQuery.budgetInstanceSheetId
      }
      await IncomeApi.bizParkingQueryParkingNum(params).then((res) => {
        const { code, data } = res;
        if (code === 0) {
          if (data.length > 0) {
            let groundAll = 0;
            let undergroundAll = 0;
            data && data.map((item) => {
              groundAll += item.ground;
              undergroundAll += item.underground;
            });
            this.cartableData = data;
            this.carNo = `停车场地面车位数:${groundAll}，地下车位数:${groundAll}；其中MALL地面车位数:${data[0].ground || 0}，地下车位数:${data[0].underground || 0}；商业街地面车位数:${data[1].ground || 0}，地下车位数:${data[1].underground || 0}；住宅地面车位数:${data[2].ground || 0}，地下车位数:${data[2].underground || 0}；写字楼地面车位数:${data[3].ground || 0}，地下车位数:${data[3].underground || 0}；`
          } else {
            this.carNo = `停车场地面车位数:0，地下车位数:0；其中MALL地面车位数:0，地下车位数:0；商业街地面车位数:0，地下车位数:0；住宅地面车位数:0，地下车位数:0；写字楼地面车位数:0，地下车位数:0；`
          }
        }
      })
    },
    async getSelectList(type) {
      const params = {
        selectType: type
      }
      await globalApi.getSelectList(params).then(res => {
        if (res.code === 0) {
          const { data } = res
          const nData = data.map((item) => {
            return { ...item, dictCd: Number(item.dictCd) }
          })
          if (type == 'bizFormat') {
            this.selectLayoutList = nData
          }
        }
      })
    },
    getListChange() {
      // 重新选择搜索项重置页码
      this.getList()
      this.isEdit = false;
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
    returnRowEdit(scope, type) {
      const { row, $index } = scope
      const { category } = row
      if (type == 1) {
        if (this.isEdit && category != '临时停车费收入' && $index == this.selectIndex) {
          return true
        } else {
          return false
        }
      } else if (type == 2) {
        if (this.isEdit && category == '临时停车费收入' && $index == this.selectIndex) {
          return true
        } else {
          return false
        }
      } else {
        if (this.isEdit && $index == this.selectIndex) {
          return true
        } else {
          return false
        }
      }
    },
    returnRowIsEdit(scope, type) {
      const { row, $index } = scope
      const { category } = row
      if (type == 1) {
        if (category != '临时停车费收入') {
          return true
        } else {
          return false
        }
      } else if (type == 2) {
        if (category == '临时停车费收入') {
          return true
        } else {
          return false
        }
      } else {
        return true
      }
    },
    search() {
      this.getList()
    },
    reset() {
      this.query = {
        paramFirst: null// 业态
      }
      this.getList()
    },
    edit() {
      // 编辑/取消
      this.isEdit = true
      this.query = {
        bizTypeId: null// 业态
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
    save() {
      // 保存
      this.isEdit = false
      this.selectIndex = 0
      const params = {
        budgetInstanceSheetId: this.routerQuery.budgetInstanceSheetId,
        list: [
          ...this.tableData
        ]
      }
      IncomeApi.bizParkingInsertBatch(params).then(res => {
        if (res.code == 0) {
          this.getList()
        }
      })
    },
    changeCarNumFunc() {
      // 开启车位编辑
      this.truckSpaceDrawerFlag = true
    },
    //弹窗关闭
    dialogVisibles(v) {
      console.log(v)
      this.truckSpaceDrawerFlag = v;
    },
    mergeSure() {
      // 提交车位编辑数据
      let newData = [];
      this.cartableData && this.cartableData.map(item => {
        let obj = { ...item, budgetInstanceSheetId: this.routerQuery.budgetInstanceSheetId };
        newData.push(obj);
      })
      const params = {
        budgetInstanceSheetId: this.routerQuery.budgetInstanceSheetId,
        list: [
          ...newData
        ]
      }
      IncomeApi.bizParkingInsertParkingNumBatch(params).then(res => {
        if (res.code == 0) {
          this.truckSpaceDrawerFlag = false;
          this.getCarNo();
        }
      })
    }
  }
}
</script>
<style type="text/css" lang="scss" >
@import "~@styles/common.scss";
.parkingRevenue {
  .car-data {
    margin: 12px 0 0;
    font-size: 14px;
  }
  .content {
    overflow: hidden !important;
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
  // .el-form-item__error {
  //   position: relative;
  // }
}
</style>

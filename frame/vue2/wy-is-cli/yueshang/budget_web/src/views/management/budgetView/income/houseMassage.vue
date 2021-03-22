<template>
  <!-- 预算查看-经营费用 -->
  <div class="list-page houseMassage">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle" style="flex-flow: wrap;">
      <el-col class="select-title" :span="24">
        <div class="select-cutover">
          <span v-if="routerQuery.bunk" @click="$router.push({path: '/management/budgetView/lease/index',query:routerQuery})">租费收入-商业</span>
          <span v-if="routerQuery.office" class="select-blue">住宅/写字楼</span>
          <span v-if="routerQuery.mutibiz" @click="$router.push({path: '/management/budgetView/lease/wsn',query:routerQuery})">多经收入-商业</span>
          <span v-if="routerQuery.proplan" @click="$router.push({path: '/management/budgetView/feeSchedule/index',query:routerQuery})">管理及企划费用表</span>
          <span v-if="routerQuery.mandate" @click="$router.push({path: '/management/budgetView/otherIncome',query:routerQuery})">其他收入表</span>
          <!-- <span @click="$router.push({path: '/management/budgetView/supplement',query:routerQuery})">开办项目增补项</span> -->
        </div>
        <div class="select-data">
          <p>（金额：元/面积：平）</p>
        </div>
      </el-col>
      <el-col :span="18">
        <el-select placeholder="请选择出售类型" size="mini" filterable clearable v-model="pageInfo.bean.initialStatus" @change="checkFilter" style="margin-right: 5px; width: 150px;">
          <el-option v-for="bizType in saleInitialStatusList" :label="bizType.dictName" :value="bizType.value" :key="bizType.value"></el-option>
        </el-select>
        <el-select placeholder="请选择物业类型" size="mini" filterable clearable v-model="pageInfo.bean.chargeType" @change="checkFilter" style="margin-right: 5px; width: 150px;">
          <el-option v-for="bizType in houseTypeList" :label="bizType.dictName" :value="bizType.value" :key="bizType.value"></el-option>
        </el-select>
        <el-input placeholder="请输入单元编号或住宅号码" size="mini" class="import-input" v-model="pageInfo.bean.queryWord" style="margin-right: 5px; width: 260px;">
          <el-button slot="append" icon="el-icon-search" @click="checkFilter()"></el-button>
        </el-input>
        <!-- <el-button size="mini" type="primary" @click="checkFilter()">查询</el-button> -->
        <el-button size="mini" @click="clearFilter">重置</el-button>
      </el-col>
      <el-col :span="4" class="operation">
        <excel :params="pageInfo" type="住宅/写字楼"></excel>
        <el-button size="mini" type="success" @click="changeContractEditFunc()" plain>添加</el-button>
        <el-button size="mini" type="danger" :disabled="selectItem.length==0" @click="batchDelete" plain>删除</el-button>
        <el-button size="mini" type="text" class="filter-icon" @click="display = true"></el-button>
      </el-col>
    </el-row>
    <el-table ref="table" :row-key="getRowKeys" @selection-change="handelSelecte" :data="tableData" size="mini" border stripe header-row-class-name="table-header" :height="this.$store.state.tableHeight">
      <el-table-column type="selection" :reserve-selection="true"></el-table-column>
      <el-table-column show-overflow-tooltip prop="unitNo" label="号码" fixed width="180">
        <template slot-scope="scope">
          <!-- <span>{{scope.row.unitNo}}</span> -->
          <span>{{scope.row.storeNo}}</span>
        </template>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column show-overflow-tooltip align="center" v-if="headerList.filter(item =>item.id == 1)[0].selected">
        <template slot="header">
          <span>基础信息</span>
          <i class="el-icon-upload2" :class="headerList.filter(item => item.id == 1)[0].selected ? 'left-icon':'right-icon'" @click="toggle(1)"></i>
        </template>
        <!-- <el-table-column show-overflow-tooltip prop="2" label="号码/位置/类型" min-width="300" v-if="headerFilter(1,1)">
          <template slot-scope="scope">
            <span>{{scope.row.storeNo}}/</span>
            <span>{{scope.row.buildingNum}}-{{scope.row.floorNum}}/</span>
            <span>{{scope.row.chargeTypeName}}</span>
          </template>
        </el-table-column> -->
        <el-table-column show-overflow-tooltip prop="2" label="位置" min-width="100" v-if="headerFilter(1,11)">
          <template slot-scope="scope">
            <div>
              <span>{{scope.row.buildingNum}}-{{scope.row.floorNum}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="物业类型" show-overflow-tooltip prop="2" min-width="100" v-if="headerFilter(1,12)">
          <template slot-scope="scope">
            <div>
              <span>{{scope.row.chargeTypeName}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="出售类型" min-width="100" v-if="headerFilter(1,2)">
          <template slot-scope="scope">{{scope.row.initialStatusName || '-'}}</template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line" v-if="headerList.filter(item =>item.id == 1)[0].selected"></el-table-column>
      <el-table-column show-overflow-tooltip label="合同信息" align="center" v-if="headerList.filter(item =>item.id == 2)[0].selected">
        <template slot="header">
          <span>合同信息</span>
          <i class="el-icon-upload2" :class="headerList.filter(item => item.id == 2)[0].selected ? 'left-icon':'right-icon'" @click="toggle(2)"></i>
        </template>
        <!-- <el-table-column show-overflow-tooltip label="合同类型" prop="currContType"  min-width="100">
          <template slot-scope="scope">
            {{scope.row.currContType | currContType}}
          </template>
        </el-table-column> -->
        <el-table-column show-overflow-tooltip prop="contNo" label="合同号" min-width="150" v-if="headerFilter(2,1)">
          <template slot-scope="scope">{{scope.row.contNo || '-'}}</template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="交付计费起始期" min-width="200" v-if="headerFilter(2,2)">
          <template slot-scope="scope">{{scope.row.contStartDate&&scope.row.contStartDate.substr(0,10) || '-'}}</template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="收费面积(m²)" align="right" min-width="150" v-if="headerFilter(2,3)">
          <template slot-scope="scope">{{scope.row.square || '-'}}</template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="收费单价(元)" align="right" min-width="150" v-if="headerFilter(2,4)">
          <template slot-scope="scope">{{scope.row.stdUnitPriceWg | residence | micrometerLevel}}</template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="管理费总收入(元)" align="right" prop="wgIncome" min-width="140" v-if="headerFilter(2,5)">
          <template slot-scope="scope">{{scope.row.wgIncome | residence | micrometerLevel}}</template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line" v-if="headerList.filter(item =>item.id == 2)[0].selected"></el-table-column>
      <el-table-column label="月收入" align="center" v-if="headerList.filter(item =>item.id == 3)[0].selected">
        <template slot="header">
          <span>月收入</span>
          <i class="el-icon-upload2" :class="headerList.filter(item => item.id == 3)[0].selected ? 'left-icon':'right-icon'" @click="toggle(3)"></i>
        </template>
        <el-table-column show-overflow-tooltip label="1月" align="right" min-width="80" v-if="headerList.filter(item =>item.id == 3)[0].selected">
          <template slot-scope="scope">
            <p>{{scope.row.janWg | residence | micrometerLevel}}</p>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="2月" align="right" min-width="80" v-if="headerList.filter(item =>item.id == 3)[0].selected">
          <template slot-scope="scope">
            <p>{{scope.row.febWg | residence | micrometerLevel}}</p>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="3月" align="right" min-width="80" v-if="headerList.filter(item =>item.id == 3)[0].selected">
          <template slot-scope="scope">
            <p>{{scope.row.marchWg | residence | micrometerLevel}}</p>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="4月" align="right" min-width="80" v-if="headerList.filter(item =>item.id == 3)[0].selected">
          <template slot-scope="scope">
            <p>{{scope.row.aprilWg | residence | micrometerLevel}}</p>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="5月" align="right" min-width="80" v-if="headerList.filter(item =>item.id == 3)[0].selected">
          <template slot-scope="scope">
            <p>{{scope.row.mayWg | residence | micrometerLevel}}</p>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="6月" align="right" min-width="80" v-if="headerList.filter(item =>item.id == 3)[0].selected">
          <template slot-scope="scope">
            <p>{{scope.row.juneWg | residence | micrometerLevel}}</p>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="7月" align="right" min-width="80" v-if="headerList.filter(item =>item.id == 3)[0].selected">
          <template slot-scope="scope">
            <p>{{scope.row.julyWg | residence | micrometerLevel}}</p>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="8月" align="right" min-width="80" v-if="headerList.filter(item =>item.id == 3)[0].selected">
          <template slot-scope="scope">
            <p>{{scope.row.augWg | residence | micrometerLevel}}</p>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="9月" align="right" min-width="80" v-if="headerList.filter(item =>item.id == 3)[0].selected">
          <template slot-scope="scope">
            <p>{{scope.row.sepWg | residence | micrometerLevel}}</p>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="10月" align="right" min-width="80" v-if="headerList.filter(item =>item.id == 3)[0].selected">
          <template slot-scope="scope">
            <p>{{scope.row.octWg | residence | micrometerLevel}}</p>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="11月" align="right" min-width="80" v-if="headerList.filter(item =>item.id == 3)[0].selected">
          <template slot-scope="scope">
            <p>{{scope.row.novWg | residence | micrometerLevel}}</p>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="12月" align="right" min-width="80" v-if="headerList.filter(item =>item.id == 3)[0].selected">
          <template slot-scope="scope">
            <p>{{scope.row.deceWg | residence | micrometerLevel}}</p>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line" v-if="headerList.filter(item =>item.id == 3)[0].selected"></el-table-column>
      <el-table-column label="财务初算" align="center" v-if="headerList.filter(item =>item.id == 4)[0].selected">
        <template slot="header">
          <span>财务初算</span>
          <i class="el-icon-upload2" :class="headerList.filter(item => item.id == 4)[0].selected ? 'left-icon':'right-icon'" @click="toggle(4)"></i>
        </template>
        <el-table-column show-overflow-tooltip prop="futureIncomeWg" label="未来2年收入(元)" align="right" min-width="150" v-if="headerFilter(4,1)">
          <template slot-scope="scope">{{scope.row.futureIncomeWg | micrometerLevel}}</template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="owe" label="欠费(元)" align="right" min-width="120" v-if="headerFilter(4,2)">
          <template slot-scope="scope">
            <p v-if="scope.row.owe">
              {{scope.row.owe | micrometerLevel}}
            </p>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="清欠目标" min-width="150" v-if="headerFilter(4,3)">
          <template slot-scope="scope">
            <p v-if="scope.row.clearTarget" type="text" size="mini" class="clearTarget" @click="checkBizClear(scope.row)">
              {{scope.row.clearTarget}}
            </p>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line" v-if="headerList.filter(item =>item.id == 4)[0].selected"></el-table-column>
      <el-table-column show-overflow-tooltip fixed="right" min-width="180" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="getResidence(scope.row)">编辑合同</el-button>
          <el-button type="text" size="mini" @click="getEditOwingMoney(scope.row)">编辑清欠</el-button>
        </template>
      </el-table-column>
    </el-table>
    <ys-paginator :page-info="pageInfo" @handle_paginator="handle_paginator" />

    <!-- 编辑住宅/写字楼预算 -->
    <HouseDrawer v-if="houseDrawerFlag" :open="houseDrawerFlag" :type="openBtn" :id="currentId" @drawerSave="contractEditSure" @update:dialogVisible="dialogVisibles" />

    <!-- 编辑清欠目标 -->
    <ClearDrawer v-if="claerDrawerFlag" :open="claerDrawerFlag" :id="selectRow.id" @drawerSave="updateBizClear" @update:dialogVisible="dialogVisibles" />

    <!-- 查看清欠目标 -->
    <ClearDetailDrawer v-if="claerDetailDrawerFlag" :open="claerDetailDrawerFlag" :id="selectRow.id" @drawerSave="update" @update:dialogVisible="dialogVisibles" />

    <drawer title="我是一个抽屉组件" direction="rtl" :display.sync="display" @filterSave="filterSave" :inner="false" :mask="true" footerBtnSave="确定" footerBtnCancel="取消" :tableHeaders="tableHeaders">

    </drawer>

  </div>
</template>

<script>

import drawer from '../../component/drawer.vue'
import HouseDrawer from './components/houseDrawer.vue'
import ClearDrawer from './components/clearDrawer.vue'
import ClearDetailDrawer from './components/clearDetailDrawer.vue'
import messageBox from '../../component/messageBox.vue'
import excel from './components/excle.vue'
import { handle_paginator } from '@mixins'
import { toThousandsClean, getDynamicTableHeight, rTime } from '@/utils/index'
import LeaseApi from '@/apis/apis/leaseApi'
import { mapGetters } from "vuex";
export default {
  mixins: [handle_paginator],
  data() {
    return {
      display: false,
      houseDrawerFlag: false,//编辑住宅/写字楼预算 抽屉
      claerDrawerFlag: false,//编辑清欠目标
      claerDetailDrawerFlag: false,//查看清欠目标详情
      headerList: [],
      tableData: [],
      selectItem: [],
      houseType: '',
      chargeType: '',
      routerQuery: this.$route.query,
      pageInfo: {
        pageSize: 10,
        pageNum: 1,
        total: 0,
        bean: {
          "annual": this.$route.query.annual,
          "budgetInstanceSheetId": this.$route.query.budgetInstanceSheetId,
          "storeType": "3", //铺位类型,固定值
          "initialStatus": '',
          "queryWord": '',
          "houseType": '',
        },
      },
      currentId: null,
      selectRow: null,
      clearTableData: null,
      openBtn: null,//add 是新增
      checkList: [],
      owingMoneyList: [],
      editOwingMoneyList: [],
      lease: '',
      editOwingMoneyListSlected: [],
      mergeSplitTime: '',
      mergeList: [],
      target: '',
      mergeInfoList: [],
      mergeSplitWarn: false,
      contractEdit: false,
      ruleForm: {
        unitNo: null,//单元编号
        chargeType: null,//物业类型1购物中心2商业街3住宅4住宅底商5写字楼 6住宅公寓7住宅别墅 ,
        storeNo: null,//住宅号码,层号
        initialStatus: null,//出售类型 1未出售2 已出售,
        buildingNum: null,// 楼号

        contNo: null,// 合同编号
        contStartDate: null,// 交付起始日
        square: null, //收费面积 ,
        stdUnitPriceWg: null,//收费单价
        storeType: '3', //铺位类型1铺位2多经3住宅/写字楼 ,
      },
      tableHeaders: [
        {
          value: '基础信息',
          selected: true,
          indeterminate: false,
          id: 1,
          list: [
            {
              value: '位置',
              selected: true,
              id: 11,
            },
            {
              value: '物业类型',
              selected: true,
              id: 12,
            },
            {
              value: '出售类型',
              selected: true,
              id: 2,
            },
          ],
        },
        {
          value: '合同信息',
          selected: true,
          indeterminate: false,
          id: 2,
          list: [
            {
              value: '合同号',
              selected: true,
              id: 1,
            },
            {
              value: '交付计费起始期',
              selected: true,
              id: 2,
            },
            {
              value: '收费面积',
              selected: true,
              id: 3,
            },
            {
              value: '收费单价',
              selected: true,
              id: 4,
            },
            {
              value: '管理费总收入',
              selected: true,
              id: 5,
            }
          ],
        },
        {
          value: '月收入',
          selected: true,
          id: 3,
        },
        {
          value: '财务初算',
          selected: true,
          indeterminate: false,
          id: 4,
          list: [
            {
              value: '未来2年收入',
              selected: true,
              id: 1,
            },
            {
              value: '欠费',
              selected: true,
              id: 2,
            },
            {
              value: '清欠目标',
              selected: true,
              id: 3,
            },
          ],
        }
      ]
    }
  },
  watch: {
    contractEdit(newValue, oldValue) {
      if (!newValue) {
        this.$refs.ruleForm.resetFields();
      }
    },
    'headerList': {
      handler(newName, oldName) {
        this.$nextTick(() => {
          this.$refs.table.doLayout(); //解决表格错位
        })
      },
      immediate: true,
      deep: true
    },
    checkList(newValue, oldValue) {
      this.$nextTick(() => {
        this.$refs.table.doLayout(); //解决表格错位
      });
    }
  },
  computed: {
    ...mapGetters(["bizList", "sellWayList", "houseTypeList", 'saleInitialStatusList']),
  },
  filters: {
    initialStatus(val) {
      switch (val) {
        case 2:
          return '经营中'
          break;
        case 3:
          return '未经营'
          break;
        default:
          return '-'
      }
    },
  },
  components: { messageBox, drawer, HouseDrawer, ClearDrawer, ClearDetailDrawer, excel },
  created() {
    /* this.routerQuery = this.$route.query; */
    this.getList();
    this.headerList = JSON.parse(JSON.stringify(this.tableHeaders))
  },
  mounted() {

  },
  methods: {
    rTime,
    //表单遍历key
    getRowKeys(row) {
      return row.id
    },
    //filterSave
    filterSave(data) {
      this.display = data;
      this.headerList = JSON.parse(JSON.stringify(this.tableHeaders))
      //this.headerList = Object.assign([], this.tableHeaders);
    },
    //过滤
    headerFilter(parentId, id) {
      let arr = this.headerList.filter(item => item.id == parentId);
      if (arr[0].list) {
        let list = arr[0].list;
        return list.filter(obj => obj.id == id)[0].selected
      }
    },
    //查询
    checkFilter() {
      this.pageInfo.pageNum = 1;
      this.getList()
    },
    //重置
    clearFilter() {
      this.pageInfo = {
        pageSize: 10,
        pageNum: 1,
        total: 0,
        bean: {
          "annual": this.routerQuery.annual,
          "budgetInstanceSheetId": this.routerQuery.budgetInstanceSheetId,
          "storeType": "3", //铺位类型,固定值
          "initialStatus": '',
          "queryWord": '',
          "houseType": '',
        },
      }
      this.getList()
    },
    // 查询列表
    async getList() {
      const params = {
        ...this.pageInfo
      }
      await LeaseApi.find(params).then(res => {
        if (res.code === 0 && res.data) {
          this.tableData = res.data.list;
          this.pageInfo.total = res.data.total;
          getDynamicTableHeight(this);
        }
      })
    },
    // 多选
    handelSelecte(val) {
      this.selectItem = val
    },
    // 扩展
    toggle(v) {
      this.headerList.map(item => {
        let status = item.selected;
        if (item.id == v) {
          item.selected = !item.selected;
          if (item.list) {
            item.list.map(obj => {
              obj.selected = !status
            })
          }
        }
      })
      this.tableHeaders = JSON.parse(JSON.stringify(this.headerList))
    },
    //弹窗关闭
    dialogVisibles(v) {
      console.log(v)
      this.contractEdit = v;
      this.houseDrawerFlag = v;
      this.claerDrawerFlag = v;
      this.claerDetailDrawerFlag = v;
    },
    async getEditOwingMoney(item) {
      //弹出 编辑清欠目标 弹窗
      this.selectRow = item ? item : this.selectRow;
      this.claerDrawerFlag = true;
    },
    async updateBizClear(data) {
      // 保存清欠目标
      let params = [
        {
          owe: data.owe,// 欠费
          storeType: '3', //铺位类型1铺位2多经3住宅/写字楼 ,
          budgetInstanceBizLeaseId: data.budgetInstanceBizLeaseId,
          clearRate: Number(data.clearRate)//清欠率%
        }
      ]
      await LeaseApi.saveBizClearowe(params).then(res => {
        if (res.code === 0) {
          this.claerDrawerFlag = false;
          this.getList();
        }
      })
    },
    async checkBizClear(item) {
      //弹出清欠详情-弹窗
      this.claerDetailDrawerFlag = true;
      this.selectRow = item;
    },
    update() {
      // 点击修改-跳转-编辑清欠
      this.claerDetailDrawerFlag = false;
      this.getEditOwingMoney();
    },
    changeContractEditFunc(type) {
      // 添加 住宅/写字楼
      this.houseDrawerFlag = true;
      this.openBtn = 'add';
    },
    async getResidence(data) {
      // 编辑 住宅/写字楼
      this.houseDrawerFlag = true;
      this.openBtn = 'edit';
      this.currentId = data.id;
    },
    async contractEditSure(data) {
      // 新增和修改合同
      try {
        let params = null;
        if (this.openBtn == "add") {
          params = {
            ...this.routerQuery,
            ...data
          }
          await LeaseApi.addSaveResidence(params).then(res => {
            if (res.code === 0) {
              this.houseDrawerFlag = false;
              this.getList();
            }
          })
        } else {
          params = {
            ...data
          }
          await LeaseApi.editSaveResidence(params).then(res => {
            if (res.code === 0) {
              this.houseDrawerFlag = false;
              this.getList();
            }
          })
        }
      } catch (e) {
        console.log(e)
      }
    },
    editContract(item) {
      this.contractEdit = true
    },
    async batchDelete() {
      let params = this.selectItem.map(item => {
        return { ...item, isDel: true }
      })
      await LeaseApi.delResidence(params).then(res => {
        if (res.code === 0) {
          this.getList();
        }
      })
    }
  }
}
</script>
<style type="text/css" lang="scss">
@import "~@styles/common.scss";
.houseMassage {
  .current-page {
    margin: 10px 0;
    span {
      color: #666;
    }
  }
  .table-input-box {
    p {
      width: 100%;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
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
  .el-icon-upload2 {
    display: inline-block;
    margin: 0 10px;
    &.right-icon {
      color: #468ceb;
      transform: rotate(90deg);
      -ms-transform: rotate(90deg); /* IE 9 */
      -moz-transform: rotate(90deg); /* Firefox */
      -webkit-transform: rotate(90deg); /* Safari 和 Chrome */
      -o-transform: rotate(90deg); /* Opera */
    }
    &.left-icon {
      color: #468ceb;
      transform: rotate(-90deg);
      -ms-transform: rotate(-90deg); /* IE 9 */
      -moz-transform: rotate(-90deg); /* Firefox */
      -webkit-transform: rotate(-90deg); /* Safari 和 Chrome */
      -o-transform: rotate(-90deg); /* Opera */
    }
  }
  .content {
    overflow: hidden !important;
  }
  .from {
    h1 {
      padding: 10px 0;
      font-size: 16px;
    }
    h2 {
      padding: 10px 0;
      font-size: 14px;
    }
    .from-item {
      width: 48%;
      display: inline-block;
      margin-bottom: 10px;
      .form-input,
      .el-date-editor {
        width: 220px;
      }
    }
  }
  .clearTarget {
    color: #468ceb;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .import-input .el-input__inner {
    border-right-color: #468ceb;
  }
  .el-input-group__append {
    padding: 0;
    height: 25px;
    width: 29px;
    border-radius: 0;
    border-color: #468ceb;
    background: linear-gradient(
      298deg,
      rgba(70, 140, 235, 1) 0%,
      rgba(53, 171, 255, 1) 100%
    );
  }
  .el-input-group__append button.el-button {
    padding: 0px;
  }
  .tool-bar .el-icon-search::before {
    position: absolute;
    top: 4px;
    left: 5px;
    color: #fff;
    font-size: 20px;
  }
}
.tool-bar {
  .el-icon-search {
    &::before {
      position: absolute;
      top: 8px;
      left: 3px;
      color: #dcdfe6;
    }
  }
  .el-button {
    margin: 0 5px 0 0;
  }
  .operation {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .filter-icon {
    width: 30px;
    height: 30px;
    position: relative;
    border: 1px solid #468ceb;
    &::before {
      content: "";
      width: 25px;
      height: 25px;
      position: absolute;
      top: 0;
      left: 0;
      background: url("../../../../assets/images/filter_icon.png") center center
        no-repeat;
      background-size: 25px 25px;
    }
  }
}
</style>

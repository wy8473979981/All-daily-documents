<template>
  <div>
    <h2>项目信息确认</h2>
    <el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="项目名称:" prop="projectName">
            <span>{{ruleForm.projectName}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="项目所在地:" prop="address">
            <span>{{ruleForm.address}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="分摊原则:" prop="sharePrincipleName">
            <span>{{ruleForm.sharePrincipleName}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="display: flex;align-items: center;">
        <el-col :span="7">
          <el-form-item label="导入历史测算假设:" prop="projectResultId" v-if="isBeforeProject" label-width="130px">
            <el-select v-model="ruleForm.projectResultId" placeholder="" ref="selectblur" filterable size="mini" @change="versionChangeFunc" :disabled="projectStatus">
              <el-option v-for="(item, index) in versionList" :label="item.label" :value="item.value" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="17" style="text-align:right;" v-if="!projectStatus">
          <el-button type="primary" @click="saveFunc('save')" size="mini">暂存</el-button>
          <el-button type="primary" @click="editFunc" size="mini" :disabled="editBol">修改</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-row :gutter="20" class="margin-b">
      <el-col :span="24">
        <div class="table-title">成本项</div>
        <el-table ref="table1" :data="tableData1" class="table table1" size="mini" stripe header-row-class-name="table-header" :span-method="arraySpanMethod1" :cell-style="key3Style">
          <el-table-column label="MALL成本项" min-width="100">
            <template slot-scope="scope">
              <span>{{scope.row.subjectName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="建筑面积(㎡)" min-width="100">
            <template slot-scope="scope">
              <el-input v-if="( [10,20,40,50].includes(scope.row.costSubject) && isBeforeProject && editBol )&&!projectStatus" v-model="scope.row.buildArea" size="mini" v-filter-check-input @change="changeTable1Value"></el-input>
              <p v-else>{{  thousands(scope.row.buildArea, 0) }}</p>
            </template>
          </el-table-column>
          <el-table-column label="A.土地成本单方(元)" min-width="100">
            <template slot-scope="scope">
              <p>{{ [20,30,40,50].includes(scope.row.costSubject) ? '/' : thousands(scope.row.landCostUnit) }}</p>
            </template>
          </el-table-column>
          <el-table-column label="A.土地成本(万元)" min-width="100">
            <template slot-scope="scope">
              <el-input v-if="([10].includes(scope.row.costSubject) && isBeforeProject)&&!projectStatus && editBol" v-model="scope.row.landCost" size="mini" v-filter-check-input2 @change="changeTable1Value"></el-input>
              <p v-else>{{ [20,30,40,50].includes(scope.row.costSubject) ? '/' : thousands(scope.row.landCost,0) }}</p>
            </template>
          </el-table-column>
          <el-table-column label="B.建安成本单方(元)" min-width="100">
            <template slot-scope="scope">
              <p>{{ thousands(scope.row.buildCostUnit) }}</p>
            </template>
          </el-table-column>
          <el-table-column label="B.建安成本(万元)" min-width="100">
            <template slot-scope="scope">
              <el-input v-if="([10,20,40,50].includes(scope.row.costSubject) &&isBeforeProject)&&!projectStatus && editBol" v-model="scope.row.buildCost" size="mini" v-filter-check-input2 @change="changeTable1Value"></el-input>
              <p v-else>{{ thousands(scope.row.buildCost) }}</p>
            </template>
          </el-table-column>
          <el-table-column label="分摊地价(万元)" min-width="100">
            <template slot-scope="scope">
              <p>{{ [20,30,40,50].includes(scope.row.costSubject) ? '/' : thousands(scope.row.landPriceShare,0) }}</p>
            </template>
          </el-table-column>
        </el-table>
        <div class="total-footer">
          <div>
            <span>MALL商业经营部分建面(㎡):</span>
            <span>{{ thousands(constructionAreaOfCommercialOperationPart) }}</span>
          </div>
          <div>
            <span>MALL商业经营部分套内面积(㎡):</span>
            <span>{{ thousands(commercialOperatingArea) }}</span>
          </div>
          <div>
            <span>得房率:</span>
            <el-input v-model="houseAcquisitionRate" v-filter-check-input size="mini" style="width:120px;" v-if="editBol&&!projectStatus" @change="changeTable1Value">
              <i slot="suffix" class="el-input__icon">%</i>
            </el-input>
            <span v-else>{{ thousands(houseAcquisitionRate,2,'%') }}</span>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="margin-b">
      <el-col :span="16">
        <div class="table-title">取费假设</div>
        <el-table ref="table2" :data="tableData2" class="table" size="mini" stripe header-row-class-name="table-header" :span-method="arraySpanMethod2">
          <el-table-column label="科目" min-width="100">
            <template slot-scope="scope">
              <span>{{scope.row.name ||'/'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="计算值" min-width="100">
            <template slot-scope="scope">
              <span>{{scope.row.calculated ||'/'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="阶段" min-width="100">
            <template slot-scope="scope">
              <span>{{scope.row.stage ||'/'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="标准" min-width="100">
            <template slot-scope="scope">
              <span>{{scope.row.standard ||'/'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="备注" min-width="100">
            <template slot-scope="scope">
              <span>{{scope.row.remark ||'/'}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="8">
        <div class="table-title">财务假设</div>
        <el-table ref="table1" :data="tableData3" class="table" size="mini" stripe header-row-class-name="table-header">
          <el-table-column label="科目" min-width="100">
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="标准" min-width="100">
            <template slot-scope="scope">
              <el-input v-if="(scope.row.name!='资本化率' && editBol)" v-filter-check-input4 v-model="scope.row.value" size="mini" @change="changeTable3Value">
                <i slot="suffix" class="el-input__icon">%</i>
              </el-input>
              <p v-else>{{ thousands(scope.row.value,2,'%') }}</p>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="margin-b">
      <el-col :span="24">
        <div class="table-title">进度及其他假设</div>
        <el-table ref="table1" :data="tableData4" class="table" size="mini" stripe header-row-class-name="table-header">
          <el-table-column label="科目" fixed="left" min-width="150">
            <template slot-scope="scope">
              <span>{{scope.row.subjectName}}</span>
            </template>
          </el-table-column>
          <template v-for="(item,index) in key10Ary">
            <el-table-column :label="item" min-width="120" :key="item">
              <template slot-scope="scope">
                <el-input v-if="(scope.row.processSubject==10 && editBol)" v-filter-check-input4 v-model="scope.row['minusYear'+(index+1)]" size="mini" @change="changeTable4Value">
                  <i slot="suffix" class="el-input__icon">%</i>
                </el-input>
                <p v-else>{{![10].includes(scope.row.processSubject)? '/': thousands(scope.row['minusYear'+(index+1)] ,2,'%') }}</p>
              </template>
            </el-table-column>
          </template>
          <template v-for="(item,index) in key11Ary">
            <el-table-column :label="item" min-width="120" :key="item">
              <template slot-scope="scope">
                <el-input v-if="( (scope.row.processSubject==10 && index <3) && scope.row.processSubject==10 && editBol)" v-filter-check-input4 v-model="scope.row['year'+index]" size="mini" @change="changeTable4Value">
                  <i slot="suffix" class="el-input__icon">%</i>
                </el-input>
                <el-input v-else-if="( (scope.row.processSubject!=10 && index >0) && scope.row.processSubject!=30 && editBol)" v-filter-check-input4 v-model="scope.row['year'+index]" size="mini" @change="changeTable4Value">
                  <i slot="suffix" class="el-input__icon">%</i>
                </el-input>
                <p v-else>{{((index==0 && [20,30,40,50,60].includes(scope.row.processSubject)) || ( scope.row.processSubject==10 && index>2)) ? '/' : scope.row.processSubject!=30 ? thousands(scope.row['year'+index] ,2,'%') : thousands(scope.row['year'+index]) }}</p>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="margin-b">
      <el-col :span="24" style="text-align:right" v-if="!projectStatus">
        <el-button type="primary" @click="previousSaveFunc" size="mini">上一步</el-button>
        <el-button type="primary" @click="nextSaveFunc('next')" size="mini">下一步 测算</el-button>
      </el-col>
      <el-col :span="24" style="text-align:right" v-else>
        <el-button type="primary" @click="previousFunc" size="mini">上一步</el-button>
        <el-button type="primary" @click="nextFunc" size="mini">下一步 测算</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import CalculationApi from '@/apis/apis/income/calculation/calculationApi'
export default {
  components: {
  },
  props: {
    formData: {
      type: Object,
      default: {}
    },
    projectStatus: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      projectId: null,
      projectResultId: null,
      saveCurrentProjectResultId: null,//当前项目projectResultId，保存时使用
      oldProjectResultId: null,
      routerQuery: this.$route.query,
      editBol: false,//蓝色单元格为点击修改假设后可修改字段；
      isBeforeProject: false,//是否投前项目
      versionChangeBol: false,//是否切换了版本
      spanArr: [],
      pos: 0,
      ruleForm: {
        projectName: null,
        address: null,
        sharePrincipleName: null,
        projectResultId: null,
      },
      commercialOperatingArea: 0,//MALL商业经营部分套内面积（㎡）
      constructionAreaOfCommercialOperationPart: 0,//MALL商业经营部分建面（㎡）
      houseAcquisitionRate: 0,//得房率
      key10Ary: [],
      key11Ary: [],
      versionList: [],
      tableData1: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],
      oldTableData1: [],
      oldTableData2: [],
      oldTableData3: [],
      oldTableData4: [],
      step: null,
    };
  },
  watch: {
    'ruleForm.projectResultId': {
      immediate: true,
      handler(val, old) {
        if (val !== old) {
          this.oldProjectResultId = old;
        }
      }
    }
  },
  create() { },
  mounted() {
    this.projectId = this.formData.projectId;
    this.projectResultId = this.formData.projectResultId;
    this.saveCurrentProjectResultId = this.formData.projectResultId;
    this.getProjectCalculateDetail();
    this.getVersionByProjectId();
    this.getCostTableData();
    this.getFeeTableData();
    this.getFinanceTableData();
    this.getProcessTableData();
  },
  methods: {
    thousands(value, precise = 2, unit = '') {
      if (isNaN(value) || [null, undefined, ''].includes(value)) {
        return '-';
      }
      var text = Number(value).toFixed(precise);
      var bit = text.indexOf('.') < 0 ? '' : text.substr(text.indexOf('.'));
      var f = text.replace(/\..*$/, '').split('').reverse().join('').replace(/(\d{3})\B/g, function (_, c) { return _ + ','; }).split('').reverse().join('') + bit;
      return f + unit;
    },
    async getProjectCalculateDetail() {
      try {
        let params = { projectResultId: this.projectResultId };
        await CalculationApi.getProjectCalculateDetail(params).then(res => {
          if (res.code === 200) {
            const { result } = res;
            this.ruleForm = { ...result, address: `${result.provinceName}${result.cityName}${result.countyName}` };
            this.projectId = result.projectId;
            this.step = result.step;
            this.projectResultId = result.projectResultId;
            this.isBeforeProject = result.type == 3 ? true : false;//是否是投前项目1、存量项目 2、在建项目 3、投前项目
            this.createTableFourHeader();
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    async getVersionByProjectId() {
      try {
        let params = { projectId: this.projectId }
        await CalculationApi.getVersionByProjectId(params).then(res => {
          if (res.code == 200) {
            const { result: { list } } = res;
            this.versionList = list.map(item => {
              return { ...item, value: item.projectResultId, label: `V${item.version}` }
            })
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    async getCostTableData(useScreenLoadingBol = true) {
      try {
        let params = { projectResultId: this.projectResultId };
        await CalculationApi.getCostTableData(params, useScreenLoadingBol).then(res => {
          if (res.code == 200) {
            this.tableData1 = [];
            const { result } = res;
            if (this.versionChangeBol) {
              oldTableData1.map(oldItem => {
                result.subjects.map(item => {
                  if (oldItem.costSubject == item.costSubject) {
                    let obj = {
                      subjectName: item.subjectName,//科目名称
                      subjectId: oldItem.subjectId,// 成本假设项目ID
                      buildArea: item.buildArea,// 建筑面积
                      landCostUnit: item.landCostUnit,// A.土地成本单方（元）
                      landCost: item.landCost,// A.土地成本（万元）
                      buildCost: item.buildCost,//B.建安成本（万元）
                      buildCostUnit: item.buildCostUnit,// B.建安成本单方（元）
                      landPriceShare: item.landPriceShare,// 分摊地价
                      costSubject: item.costSubject,//项目所属科目, 可用值: 10, 20, 30, 40, 50
                    }
                    this.tableData1.push(obj);
                  }
                })
              })
              console.log(this.tableData1, '1')
            } else {
              result.subjects.map(item => {
                let obj = {
                  subjectName: item.subjectName,//科目名称
                  subjectId: item.subjectId,// 成本假设项目ID
                  buildArea: item.buildArea,// 建筑面积
                  landCostUnit: item.landCostUnit,// A.土地成本单方（元）
                  landCost: item.landCost,// A.土地成本（万元）
                  buildCost: item.buildCost,//B.建安成本（万元）
                  buildCostUnit: item.buildCostUnit,// B.建安成本单方（元）
                  landPriceShare: item.landPriceShare,// 分摊地价
                  costSubject: item.costSubject,//项目所属科目, 可用值: 10, 20, 30, 40, 50
                }
                this.tableData1.push(obj);
              })
            }
            let obj = [{
              subjectName: '总计',//科目名称
              buildArea: result.buildAreaTotal,// 建筑面积总计
              landCost: result.landCostTotal, //土地成方总计 万元
              landCostUnit: result.landCostUnitTotal,// 土地成本单方（元）总计
              buildCost: result.buildCostTotal, //建安成本总计 万元
              buildCostUnit: result.buildCostUnitTotal, //建安成本单方总计
              landPriceShare: result.landPriceShareTotal,//分摊地价总计
            }]
            this.constructionAreaOfCommercialOperationPart = result.constructionAreaOfCommercialOperationPart;
            this.commercialOperatingArea = result.commercialOperatingArea;
            this.houseAcquisitionRate = result.houseAcquisitionRate;
            this.tableData1 = [...this.tableData1, ...obj];
            if (!this.editBol) {
              this.oldTableData1 = JSON.parse(JSON.stringify(this.tableData1));
            }
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    async getFeeTableData() {
      try {
        let params = { projectResultId: this.projectResultId };
        await CalculationApi.getFeeTableData(params).then(res => {
          if (res.code == 200) {
            this.tableData2 = [];
            const { result } = res;
            this.tableData2 = result.list
            this.getSpanArr(this.tableData2);
            if (!this.editBol) {
              this.oldTableData2 = JSON.parse(JSON.stringify(this.tableData2));
            }
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    async getFinanceTableData(useScreenLoadingBol = true) {
      try {
        let params = { projectResultId: this.projectResultId };
        await CalculationApi.getFinanceTableData(params, useScreenLoadingBol).then(res => {
          if (res.code == 200) {
            this.tableData3 = [];
            const { result } = res;
            this.tableData3 = result.list;
            if (!this.editBol) {
              this.oldTableData3 = JSON.parse(JSON.stringify(this.tableData3));
            }
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    async getProcessTableData(useScreenLoadingBol = true) {
      try {
        let params = { projectResultId: this.projectResultId };
        await CalculationApi.getProcessTableData(params, useScreenLoadingBol).then(res => {
          if (res.code == 200) {
            let oldTableData4 = JSON.parse(JSON.stringify(this.tableData4));
            this.tableData4 = [];
            const { result } = res;
            if (this.versionChangeBol) {
              oldTableData4.map(oldItem => {
                result.subjects.map(item => {
                  if (oldItem.processSubject == item.processSubject) {
                    let obj = {
                      ...item,
                      subjectId: oldItem.subjectId,
                      minusYear1: Number(item.minusYear1),
                      minusYear2: Number(item.minusYear2),
                      minusYear3: Number(item.minusYear3),
                      minusYear4: Number(item.minusYear4),
                      minusYear5: Number(item.minusYear5),
                      year0: Number(item.year0),
                      year1: Number(item.year1),
                      year2: Number(item.year2),
                      year3: Number(item.year3),
                      year4: Number(item.year4),
                      year5: Number(item.year5),
                      year6: Number(item.year6),
                      year7: Number(item.year7),
                      year8: Number(item.year8),
                      year9: Number(item.year9),
                      year10: Number(item.year10),
                      year11: Number(item.year11),
                      year12: Number(item.year12),
                      year13: Number(item.year13),
                      year14: Number(item.year14),
                      year15: Number(item.year15),
                      year16: Number(item.year16),
                      year17: Number(item.year17),
                      year18: Number(item.year18),
                      year19: Number(item.year19),
                      year20: Number(item.year20),
                      year21: Number(item.year21),
                    }
                    this.tableData4.push(obj)
                  }
                })
              })
              console.log(this.tableData1, '1')
            } else {
              result.subjects.map(item => {
                let obj = {
                  ...item,
                  minusYear1: Number(item.minusYear1),
                  minusYear2: Number(item.minusYear2),
                  minusYear3: Number(item.minusYear3),
                  minusYear4: Number(item.minusYear4),
                  minusYear5: Number(item.minusYear5),
                  year0: Number(item.year0),
                  year1: Number(item.year1),
                  year2: Number(item.year2),
                  year3: Number(item.year3),
                  year4: Number(item.year4),
                  year5: Number(item.year5),
                  year6: Number(item.year6),
                  year7: Number(item.year7),
                  year8: Number(item.year8),
                  year9: Number(item.year9),
                  year10: Number(item.year10),
                  year11: Number(item.year11),
                  year12: Number(item.year12),
                  year13: Number(item.year13),
                  year14: Number(item.year14),
                  year15: Number(item.year15),
                  year16: Number(item.year16),
                  year17: Number(item.year17),
                  year18: Number(item.year18),
                  year19: Number(item.year19),
                  year20: Number(item.year20),
                  year21: Number(item.year21),
                }
                this.tableData4.push(obj)
              });
            }
            if (!this.editBol) {
              this.oldTableData4 = JSON.parse(JSON.stringify(this.tableData4));
            }
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    createTableFourHeader() {
      // 进度及其他假设 表头
      this.key10Ary = [];
      this.key11Ary = [];
      let devCycle = Number(this.ruleForm.devCycle);
      let signOutYears = Number(this.ruleForm.signOutYears);
      for (let i = 1; i < devCycle; i++) {
        let number = i - devCycle;
        this.key10Ary.push(String(number));
      }
      for (let i = 0; i <= signOutYears + 1; i++) {
        this.key11Ary.push(String(i));
      }
    },
    versionChangeFunc(data) {
      this.$confirm('当前成本项信息将变更，是否确认?', '提示', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        this.versionChangeBol = true;
        this.projectResultId = this.ruleForm.projectResultId;
        this.$refs.selectblur.blur();
        this.getProjectCalculateDetail();
        this.getVersionByProjectId();
        this.getCostTableData();
        this.getFeeTableData();
        this.getFinanceTableData();
        this.getProcessTableData()
      }).catch(() => {
        this.versionChangeBol = false;
        this.ruleForm.projectResultId = this.oldProjectResultId;
        this.projectResultId = this.ruleForm.projectResultId;
        this.$refs.selectblur.blur();
        // console.log(this.ruleForm.projectResultId, 'this.ruleForm.projectResultId');
      });

    },
    arraySpanMethod1({ row, column, rowIndex, columnIndex }) {
      if ([6, 7, 8].includes(rowIndex)) {
        if (columnIndex === 0) {
          return [1, 3];
        }
      }
    },
    arraySpanMethod2({ row, column, rowIndex, columnIndex }) {
      const _row = this.spanArr[rowIndex];
      const _col = _row > 0 ? 1 : 0;
      if (columnIndex === 0) {
        // [0, 0] 表示这一行不显示，[2, 1]表示行的合并数
        return { rowspan: _row, colspan: _col };
      }
      if (columnIndex === 1 && rowIndex === 4) {
        return { rowspan: _row, colspan: _col };
      }
      if (columnIndex === 4 && rowIndex === 1) {
        return { rowspan: 1, colspan: 0 };
      }
      if (columnIndex === 4 && rowIndex === 0) {
        return { rowspan: _row, colspan: _col };
      }
    },
    getSpanArr(data) {
      this.spanArr = [];
      this.pos = 0;
      // data就是我们从后台拿到的数据
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr.push(1);
          this.pos = 0;
        } else {
          // 判断当前元素与上一个元素是否相同
          if (data[i].subject === data[i - 1].subject) {
            this.spanArr[this.pos] += 1;
            this.spanArr.push(0);
          } else {
            this.spanArr.push(1);
            this.pos = i;
          }
        }
      }
    },
    async changeTable1Value(scope, key) {
      // 成本表 修改 值 ，保存逻辑
      this.projectResultId = this.saveCurrentProjectResultId;
      let res = await this.saveCostTableUpdate();
      if (res.code == 200) {
        this.getCostTableData();
      } else {
        this.$message.error(res.msg);
      }
    },
    async changeTable3Value(scope, key) {
      // 财务表 修改 值 ，保存逻辑
      this.projectResultId = this.saveCurrentProjectResultId;
      let res = await this.saveFinanceTableUpdate();
      if (res.code == 200) {
        this.getFinanceTableData();
      } else {
        this.$message.error(res.msg);
      }
    },
    async changeTable4Value(scope, key) {
      // 进度表 修改 值 ，保存逻辑
      this.projectResultId = this.saveCurrentProjectResultId;
      let res = await this.saveProcessTableUpdate();
      if (res.code == 200) {
        this.getProcessTableData();
      } else {
        this.$message.error(res.msg);
      }
    },
    previousFunc() {
      this.$emit('update:step', 2);
    },
    previousSaveFunc() {
      let oldTableData1 = JSON.stringify(this.oldTableData1);
      let oldTableData2 = JSON.stringify(this.oldTableData2);
      let oldTableData3 = JSON.stringify(this.oldTableData3);
      let oldTableData4 = JSON.stringify(this.oldTableData4);
      let tableData1 = JSON.stringify(this.tableData1);
      let tableData2 = JSON.stringify(this.tableData2);
      let tableData3 = JSON.stringify(this.tableData3);
      let tableData4 = JSON.stringify(this.tableData4);
      if (oldTableData1 == tableData1 && oldTableData2 == tableData2 && oldTableData3 == tableData3 && oldTableData4 == tableData4) {// 判断当前页面没有修改，step属于当前值时
        this.$emit('update:step', 2);
      } else {
        this.$confirm('是否保存当前页面录入数据?', '提示', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          this.saveFunc('save');
          this.$emit('update:step', 2);
        }).catch(() => {
          this.$emit('update:step', 2);
        });
      }
    },
    nextFunc() {
      this.$emit('update:step', 4);
    },
    async nextSaveFunc(type) {
      try {
        let oldTableData1 = JSON.stringify(this.oldTableData1);
        let oldTableData2 = JSON.stringify(this.oldTableData2);
        let oldTableData3 = JSON.stringify(this.oldTableData3);
        let oldTableData4 = JSON.stringify(this.oldTableData4);
        let tableData1 = JSON.stringify(this.tableData1);
        let tableData2 = JSON.stringify(this.tableData2);
        let tableData3 = JSON.stringify(this.tableData3);
        let tableData4 = JSON.stringify(this.tableData4);
        console.log(this.step, 'this.step')
        if (oldTableData1 == tableData1 && oldTableData2 == tableData2 && oldTableData3 == tableData3 && oldTableData4 == tableData4) {// 判断当前页面没有修改，step属于当前值时
          this.saveFunc(type);
        } else {
          this.$confirm('是否保存当前页面录入数据?', '提示', {
            distinguishCancelAndClose: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async () => {
            this.saveFunc(type);
          }).catch(() => { });
        }
      } catch (e) {
        console.log(e)
      }
    },
    async saveFunc(type) {
      try {
        this.projectResultId = this.saveCurrentProjectResultId;
        let res1 = await this.saveCostTableUpdate();
        let res2 = await this.saveFinanceTableUpdate();
        let res3 = await this.saveProcessTableUpdate();
        let res4 = null;
        if (type == 'next') {
          res4 = await this.saveCalculateCreate();
          if (res1.code == 200 && res2.code == 200 && res3.code == 200 && res4.code == 200) {
            this.editBol = false;
            this.$message.success('保存成功');
            this.$emit('update:step', 4);
          } else if (res1.code != 200) {
            this.$message.error(res1.msg);
          } else if (res2.code != 200) {
            this.$message.error(res2.msg);
          } else if (res3.code != 200) {
            this.$message.error(res3.msg);
          } else if (res4.code != 200) {
            this.$message.error(res4.msg);
          }
        } else {
          if (res1.code == 200 && res2.code == 200 && res3.code == 200) {
            this.editBol = false;
            this.getCostTableData();
            this.getFeeTableData();
            this.getFinanceTableData();
            this.getProcessTableData()
            this.$message.success('保存成功');
          } else if (res1.code != 200) {
            this.$message.error(res1.msg);
          } else if (res2.code != 200) {
            this.$message.error(res2.msg);
          } else if (res3.code != 200) {
            this.$message.error(res3.msg);
          }
        }
      } catch (e) {
        console.log(e)
      }
    },
    async saveCostTableUpdate(useScreenLoadingBol = true) {
      //成本假设更新
      try {
        let costSubjectList = [];
        let houseAcquisitionRate = 0;
        this.tableData1.map((item, index) => {
          if (index < 5) {
            costSubjectList.push(item)
          }
        })
        let params = {
          costSubjectList: costSubjectList,
          houseAcquisitionRate: this.houseAcquisitionRate,
          projectResultId: this.projectResultId
        }
        return await CalculationApi.saveCostTableUpdate(params, useScreenLoadingBol);
      } catch (e) {
        console.log(e)
      }
    },
    async saveFinanceTableUpdate(useScreenLoadingBol = true) {
      //财务假设更新
      try {
        let list = this.tableData3.map(item => {
          return {
            ...item,
            value: Number(item.value)
          }
        })
        let params = {
          itemList: list,
          projectResultId: this.projectResultId
        }
        return await CalculationApi.saveFinanceTableUpdate(params, useScreenLoadingBol);
      } catch (e) {
        console.log(e)
      }
    },
    async saveProcessTableUpdate(useScreenLoadingBol = true) {
      //项目过程假设更新
      try {
        let list = [];
        this.tableData4.map(item => {
          let obj = {
            ...item,
            minusYear1: Number(item.minusYear1),
            minusYear2: Number(item.minusYear2),
            minusYear3: Number(item.minusYear3),
            minusYear4: Number(item.minusYear4),
            minusYear5: Number(item.minusYear5),
            year0: Number(item.year0),
            year1: Number(item.year1),
            year2: Number(item.year2),
            year3: Number(item.year3),
            year4: Number(item.year4),
            year5: Number(item.year5),
            year6: Number(item.year6),
            year7: Number(item.year7),
            year8: Number(item.year8),
            year9: Number(item.year9),
            year10: Number(item.year10),
            year11: Number(item.year11),
            year12: Number(item.year12),
            year13: Number(item.year13),
            year14: Number(item.year14),
            year15: Number(item.year15),
            year16: Number(item.year16),
            year17: Number(item.year17),
            year18: Number(item.year18),
            year19: Number(item.year19),
            year20: Number(item.year20),
            year21: Number(item.year21),
          }
          list.push(obj);
        });
        let params = {
          processSubjectList: list,
          projectResultId: this.projectResultId
        }
        return await CalculationApi.saveProcessTableUpdate(params, useScreenLoadingBol);
      } catch (e) {
        console.log(e)
      }
    },
    editFunc() {
      this.editBol = true;
    },
    next() {
      this.$emit('update:step', 4);
    },
    async saveCalculateCreate() {
      try {
        let params = {
          projectResultId: this.projectResultId
        }
        return await CalculationApi.saveCalculateCreate(params);
      } catch (e) {
        console.log(e)
      }
    },
    key3Style(column) {
      if ([6, 7, 8].includes(column.rowIndex)) {
        if ([2, 3, 4, 5, 6].includes(column.columnIndex)) {
          return "display:none;border-bottom:none;"
        }
      }
    },
  }
}
</script>
<style lang="scss" scoped>
h2 {
  text-align: left;
  font-size: 18px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #222222;
  line-height: 28px;
}
.margin-b {
  margin-bottom: 25px;
}
.demo-ruleForm {
  margin-bottom: 20px;
  .el-form-item {
    margin-bottom: 0px !important;
  }
  .el-input,
  .el-select {
    position: relative;
    font-size: 12px;
    display: inline-block;
    width: 100%;
  }
  ::v-deep .el-form-item__label {
    color: #000;
  }
  .special-line-height {
    ::v-deep .el-form-item__label {
      line-height: 16px;
    }
  }
}
.table-title {
  border-left: 3px solid #4a90e2;
  padding-left: 10px;
  margin-bottom: 12px;
  font-size: 18px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #222222;
  line-height: 18px;
}

.table::before {
  height: 0px;
}

.el-table {
  ::v-deep .cell {
    // text-overflow: initial;
  }
  // ::v-deep td.is-center,
  // ::v-deep th.is-center {
  //   text-align: center;
  //   border-bottom: 1px solid #ebeef5 !important;
  // }
  ::v-deep .common-column-line {
    background-color: #fff;
  }
  .column-span {
    display: flex;
    justify-content: space-between;
    p {
      width: 100%;
      border-right: 1px solid #ebeef5;
    }
    p:last-child {
      border-right: none;
    }
  }
  // ::v-deep td {
  //   border-right: 1px solid #ebeef5;
  //   border-bottom: 1px solid #ebeef5;
  // }
}

.total-footer {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  line-height: 28px;
  span:first-child {
    margin-right: 5px;
  }
}
</style>

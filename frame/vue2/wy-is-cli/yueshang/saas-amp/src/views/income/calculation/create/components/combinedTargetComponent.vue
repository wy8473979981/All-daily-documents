<template>
  <div class="combinedTargetComponent">
    <el-row :gutter="20">
      <el-col :span="12" class="title-content">
        <h2>项目综合指标</h2>
        <i class="el-icon-warning"></i>
        <span class="tip">点击“编辑指标分级”编辑数据</span>
      </el-col>
      <el-col :span="12" style="text-align: right" v-if="!projectStatus">
        <el-button @click="saveFunc('save')" size="mini">暂存</el-button>
        <el-button type="primary" @click="createRow" size="mini">新增 / 编辑</el-button>
        <el-button @click="deleteRow" size="mini">删除</el-button>
      </el-col>
    </el-row>
    <el-table ref="table" :data="tableData" class="table" size="mini" stripe show-summary header-row-class-name="table-header" :cell-style="key3Style" :header-cell-style="key3Style" :cell-class-name="checkbox" @selection-change="checkboxChangeFunc" :summary-method="getSummaries" :max-height="maxHeight">
      <!--  -->
      <el-table-column fixed="left" type="selection" width="50" :selectable="selectableFunc"></el-table-column>

      <el-table-column label="序号" fixed="left" type="index" width="50">
        <template scope="scope">
          <!-- <span>{{ scope.row.serialShow?scope.row.serialNumber:'' }}</span> -->
          <span>{{scope.$index + 1}}</span>
        </template>
      </el-table-column>

      <el-table-column label="指标" min-width="150">
        <template slot-scope="scope">
          <el-input v-if="!scope.row.systemTarget && !projectStatus" v-model="scope.row.name" size="mini"></el-input>
          <p v-else>{{ scope.row.name }}</p>
        </template>
      </el-table-column>

      <el-table-column prop="weight" label="权重" min-width="100">
        <template slot-scope="scope">
          <el-input :disabled="projectStatus" v-filter-check-input v-model="scope.row.weight" size="mini">
            <i slot="suffix" class="el-input__icon">%</i>
          </el-input>
        </template>
      </el-table-column>

      <el-table-column prop="key3" label="指标分级" :width="key3width" align="center">
        <div slot-scope="scope" class="column-span">
          <template v-for="(item, index) in scope.row.scaleItems">
            <template>
              <div :key="index">
                <p :title="item.itemName">{{item.itemName}}</p>
                <p>{{item.value}}</p>
              </div>
            </template>
          </template>
        </div>
      </el-table-column>

      <el-table-column prop="projectTargetItemId" label="实际" min-width="150">
        <template slot-scope="scope">
          <el-select v-if="scope.row.targetId&&scope.row.isSelect" :disabled="projectStatus" placeholder="请选择" size="mini" v-model="scope.row.projectTargetItemId" @change="bizTypeIdChange(scope,'projectTargetItemActualScore')">
            <el-option v-for="(item,index) in scope.row.targetItems" :key="index" :label="item.itemName" :value="item.targetItemId">
            </el-option>
          </el-select>
          <p>{{ scope.row.projectTargetItemActualScore || '-' }}</p>
        </template>
      </el-table-column>

      <el-table-column label="操作" fixed="right" min-width="80">
        <template slot-scope="scope">
          <el-button v-if="scope.row.targetId && !projectStatus" size="mini" type="text" @click="redactFunc(scope)">编辑指标分级</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="footer-content">
      <div class="note">
        <!-- <p>注：</p>
        <p>① 轨道交通如暂无规划优于有规划却明确不临站点，临站点距离1KM；</p>
        <p>② 周边范围3KM半径的同种业态空置情况（可通过边界猎手等工具查询）；</p>
        <p>③ 关物业产权明晰，是否单一或多业主、多股东，不能附带抵押等无法对抗第三人权利的事项。</p> -->
      </div>
      <div class="btn" v-if="!projectStatus">
        <el-button @click="previousSaveFunc" size="mini">上一步</el-button>
        <el-button type="primary" @click="nextSaveFunc('next')" size="mini">下一步 项目信息确认</el-button>
      </div>
      <div class="btn" v-else>
        <el-button @click="previousFunc" size="mini">上一步</el-button>
        <el-button type="primary" @click="nextFunc" size="mini">下一步 项目信息确认</el-button>
      </div>
    </div>

    <!-- 表头筛选 -->
    <TargetDrawerComponent :title="`编辑指标分级`" direction="rtl" v-if="display" :display.sync="display" @update:save="targetDrawerSave" :width="drawerWidth" :mask="true" footerBtnSave="确定" footerBtnCancel="取消" :targetId="targetId"></TargetDrawerComponent>
  </div>
</template>
<script>
import TargetDrawerComponent from './targetDrawerComponent'
import CalculationApi from '@/apis/apis/income/calculation/calculationApi'
export default {
  components: {
    TargetDrawerComponent
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
      targetId: null,//综合指标 单条数据ID
      rowIndex: null,//综合指标 数据下标
      key3width: 400,
      display: false,
      serialNumber: 0,
      optionValueMax: 0,
      drawerWidth: '600px',
      totalWeight: 0,//权重合计
      maxHeight: null,
      routerQuery: this.$route.query,
      contentData: [],
      selectRow: [],
      tableData: [],
      oldTableData: [],
      projectResultId: null,
      step: null,
    };
  },
  create() { },
  mounted() {
    if (this.routerQuery.flag == 'add') {
      this.projectResultId = this.formData.projectResultId;
    } else {
      this.projectResultId = this.routerQuery.projectResultId;
    }
    this.maxHeight = (document.getElementsByClassName('combinedTargetComponent')[0].offsetHeight - 86) + 'px';
    this.getTableData();
    this.getProjectCalculateDetail();
  },
  methods: {
    async getProjectCalculateDetail() {
      try {
        let params = { projectResultId: this.projectResultId };
        await CalculationApi.getProjectCalculateDetail(params).then(res => {
          if (res.code === 200) {
            const { result } = res;
            this.step = result.step;
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    createRow() {
      // 新增
      let scaleItems = [];
      this.serialNumber = this.serialNumber + 1;//添加序号
      let scaleItem = { targetItemId: null, itemName: null, value: null };
      for (let i = 0; i < this.optionValueMax; i++) {
        scaleItems.push(scaleItem);
      }
      let newRow = [{
        serialShow: true,
        createIndex: this.serialNumber,
        isSelect: false,
        hasInput: true,
        name: null,
        projectTargetItemId: null,
        scaleItems: scaleItems,
        systemTarget: false,
        targetId: null,
        targetItems: null,
        weight: null,
      }];
      this.tableData = [...this.tableData, ...newRow];
    },
    async deleteRow() {
      // 删除 综合指标
      try {
        if (!this.selectRow[0]) return this.$message.error('请选择要删除的数据')
        // 删除
        this.$confirm('是否继续删除?', '提示', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let createIndexs = []
          let ids = []
          this.selectRow.map((item) => {
            if (item.createIndex) {
              createIndexs.push(item.createIndex)
            }
          })
          // 数据库中存在的数据
          this.selectRow.map((item) => {
            if (item.targetId) {
              ids.push(item.targetId)
            }
          })
          if (ids.length > 0) {
            let params = {
              ids: [...ids]
            }
            await CalculationApi.getTargetDelete(params).then(res => {
              if (res.code == 200) {
                this.tableData = [...this.tableData].filter(x => [...ids].every(y => y !== x.targetId))
                if (createIndexs.length > 0) {
                  this.tableData = [...this.tableData].filter(x => [...createIndexs].every(y => y !== x.createIndex))
                }
                this.$message.success('删除成功！')
              } else {
                this.$message.error(res.msg);
              }
            })
          } else {
            this.tableData = [...this.tableData].filter(x => [...createIndexs].every(y => y !== x.createIndex))
            this.$message.success('删除成功！')
          }
        }).catch(() => {
        });
      } catch (e) {
        console.log(e)
      }
    },
    previousFunc() {
      this.$emit('update:step', 1);
    },
    previousSaveFunc() {
      let oldTableData = JSON.stringify(this.oldTableData);
      let tableData = JSON.stringify(this.tableData);
      if (oldTableData == tableData) {// 判断当前页面没有修改
        this.$emit('update:step', 1);
      } else {
        this.$confirm('是否保存当前页面录入数据?', '提示', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          this.saveFunc('save');
          this.$emit('update:step', 1);
        }).catch(() => {
          this.$emit('update:step', 1);
        });
      }
    },
    nextFunc() {
      this.$emit('update:step', 3);
    },
    async nextSaveFunc(type) {
      try {
        let oldTableData = JSON.stringify(this.oldTableData);
        let tableData = JSON.stringify(this.tableData);
        console.log(this.step, 'this.step')
        if (oldTableData == tableData) {// 判断当前页面没有修改，step属于当前值时
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
      // 1.保存时，权重合计必须为100
      if (this.totalWeight != 100) {
        this.$message.error('分配给各指标的权重之和不等于100%，请重新设置权重');
        return false;
      }
      let list1 = [];
      let list2 = [];
      this.tableData.map((item, index) => {
        let obj1 = { name: item.name, targetId: item.targetId, weight: item.weight, targetItemId: item.projectTargetItemId };
        if (item.targetId) {
          let obj2 = { targetId: item.targetId, targetItemId: item.projectTargetItemId };
          list2.push(obj2);
        }
        list1.push(obj1);
      })
      let params = { list: [...list1], projectResultId: this.projectResultId };
      let req = { itemList: [...list2], projectResultId: this.projectResultId };
      let res1 = await CalculationApi.saveTargetCreate(params);
      let res2 = await CalculationApi.saveTargetUpdate(req);
      if (res1.code == 200 && res2.code == 200) {
        this.$message.success('保存成功');
        if (type == 'save') {
          this.getTableData();
        } else if (type == 'next') {
          this.$emit('update:step', 3);
        }
      } else if (res1.code != 200) {
        this.$message.error(res1.msg);
      } else if (res2.code != 200) {
        this.$message.error(res2.msg);
      }
    },
    async getTableData() {
      try {
        let params = {
          projectResultId: this.projectResultId
        }
        this.tableData = [];
        let tableData = [];
        let optionValueAry = [];
        this.optionValueMax = 0;
        await CalculationApi.getTargetInfoByProjectId(params).then(res => {
          if (res.code === 200) {
            const { result: { list } } = res;
            this.$nextTick(() => {
              // 1.计算tableData中 指标分级 数组最大长度
              list.map(item => {
                optionValueAry.push(item.targetItems.length);
              })
              this.optionValueMax = Math.max(...optionValueAry);
              this.key3width = this.optionValueMax * 80;//动态计算指标分级列宽

              // 2.根据 指标分级 数组最大长度  补充 其他行 指标分级数组 少的假数据
              let scaleItem = { targetItemId: null, itemName: null, value: null };
              list.map(item => {
                let diffLength = this.optionValueMax - item.targetItems.length;//计算差的个数
                item['scaleItems'] = JSON.parse(JSON.stringify(item.targetItems));
                for (let i = 0; i < diffLength; i++) {
                  item.scaleItems.push(scaleItem);
                }
                // 对每条数据构造一条填充数据
                let weight = ![null, ''].includes(item.weight) ? (item.weight).toFixed(2) : 0.00;
                let obj = { ...item, weight: weight, isSelect: true, serialShow: true, projectTargetItemActualScore: null, projectTargetItemTotalScore: null, projectTargetItemId: item.targetItems[0].targetItemId };
                this.tableData.push(obj);
              })
              // 3.添加序号
              this.computedTableDate(this.tableData);
              this.oldTableData = JSON.parse(JSON.stringify(this.tableData));
            })
          }
        })
      } catch (e) {
        console.log(e)
      }
    },

    computedTableDate(tableData) {
      // 从table列表拿到的数据计算 1.指标得分=位置得分/该分级最高分 2.指标汇总得分=位置得分/该分级最高分×位置权重
      // projectTargetItemActualScore: 当前指标得分, projectTargetItemTotalScore: 当前指标汇总得分
      tableData.map((item, index) => {
        if (item.isSelect) {
          let currScore = null;//实际列 选中的指标分级的分值
          let projectTargetItemActualScore = 0;// 指标得分
          let projectTargetItemTotalScore = 0;// 当前指标汇总得分
          let projectTargetItemId = item.projectTargetItemId;//实际选项
          let targetItems = item.targetItems;//指标分级数组
          let weightScore = item.weight;//权重分值
          let targetValueAry = targetItems.map(item => {// 当前指标分级分值集合
            if (projectTargetItemId == item.targetItemId) {
              // 当前实际选项的分值
              currScore = item.value;
            }
            return item.value;
          });
          let targeValueMax = Math.max(...targetValueAry);//当前列最大的指标分级 分值
          projectTargetItemActualScore = currScore != null ? ((currScore / targeValueMax) * 100).toFixed(2) + '%' : null;
          projectTargetItemTotalScore = currScore != null ? (currScore / targeValueMax) * (weightScore / 100) : null;
          let obj = { ...item, projectTargetItemActualScore: projectTargetItemActualScore, projectTargetItemTotalScore: projectTargetItemTotalScore };
          this.tableData.splice(index, 1, obj);
        }
      })
    },
    checkbox(row) {
      if ((row.rowIndex + 1) % 2 == 0) {
        // return "mycell"
      }
    },
    checkboxChangeFunc(val) {// 复选框
      this.selectRow = val;
    },
    async redactFunc(scope) {// 点击编辑
      try {
        let { row, $index } = scope;
        this.targetId = row.targetId;
        this.rowIndex = $index;
        this.display = true;
      } catch (e) {
        console.log(e)
      }
    },
    bizTypeIdChange(scope, key) {
      // 实际列切换选项计算table的值
      this.computedTableDate(this.tableData);
    },
    key3Style(column) {
      if (column.columnIndex === 5) {
        return "padding:2px 0px;"
      }
    },
    async getScoreList(params) {
      //根据指标id获取分级列表
      try {
        return await CalculationApi.getScoreList(params)
      } catch (e) {
        console.log(e)
      }
    },
    targetDrawerSave(data) {
      try {
        //  关闭指标分级编辑弹窗，再次请求
        let params = { targetId: this.targetId }
        this.getScoreList(params).then(res => {
          const { code, result: { items } } = res;
          if (code === 200) {
            this.$nextTick(() => {
              // 构造指标分级集合
              let curScoreItems = [];
              items.map((item, index) => {
                if (item.status) {
                  let obj = { targetItemId: item.targetItemId, itemName: item.name, value: item.value, status: item.status };
                  curScoreItems.push(obj);
                }
              });
              let currIndex = this.rowIndex;
              this.tableData[currIndex] = { ...this.tableData[currIndex], scaleItems: curScoreItems, targetItems: curScoreItems, projectTargetItemActualScore: null, projectTargetItemTotalScore: null };
              // 1.计算每一条数据指标分级的长度，算出最大长度
              let optionValueAry = [];
              this.optionValueMax = 0;
              this.tableData.map(item => {
                optionValueAry.push(item.targetItems.length);
              })
              this.optionValueMax = Math.max(...optionValueAry);
              this.key3width = this.optionValueMax * 80;//动态计算指标分级列宽
              // 2.将指标分级 补充 少的假数据
              let scaleItem = { targetItemId: null, itemName: null, value: null };
              this.tableData = this.tableData.map(item => {
                let diffLength = this.optionValueMax - item.targetItems.length;
                item['scaleItems'] = JSON.parse(JSON.stringify(item.targetItems));
                for (let i = 0; i < diffLength; i++) {
                  item.scaleItems.push(scaleItem);
                }
                return { ...item };
              })
              this.computedTableDate(this.tableData)
            })
          }
        });
        this.display = data;
      } catch (e) {
        console.log(e)
      }
    },
    selectableFunc(row, index) {
      if (row && row['systemTarget'] || this.projectStatus) {
        return false;
      } else {
        return true;
      }
    },
    getSummaries(param) {
      try {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          let values = null;
          if (index === 0) {
            sums[index] = '';
            return;
          } else if (index === 1) {
            sums[index] = '汇总';
            return;
          } else if (index === 2) {
            sums[index] = '';
            return;
          } else if (index === 3) {
            values = data.map(item => {
              return Number(item && item['weight']);
            });
            if (!values.every(value => isNaN(value))) {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
            }
            this.totalWeight = sums[index];
            let total = total >= 0 ? total.toFixed(2) : 0.00;
            sums[index] = sums[index] + '%';
            return;
          } else if (index === 4) {
            sums[index] = '综合指标计算值';
            return;
          } else if (index === 5) {

            values = data.map(item => Number(item && item['projectTargetItemTotalScore']));
            if (!values.every(value => isNaN(value))) {
              sums[index] = values.reduce((prev, curr, currentIndex) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + value;
                } else {
                  return prev;
                }
              }, 0);
            }
            let total = Number(sums[index]) * 100;
            total = total >= 0 ? total.toFixed(2) : 0.00;
            sums[index] = total + '%';
            return;
          } else if (index === 6) {
            sums[index] = '';
            return;
          }
        });
        return sums;
      } catch (e) {
        console.log(e)
      }
    },
  }
}
</script>
<style lang="scss" scoped>
.combinedTargetComponent {
  height: 100%;
}
.title-content {
  text-align: right;
  display: flex;
  align-items: center;
  h2 {
    text-align: left;
    font-size: 18px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #222222;
    line-height: 28px;
  }
  .el-icon-warning {
    font-size: 14px;
    color: #f5a623;
    margin: 0 5px;
  }
  .tip {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #f5a623;
    line-height: 14px;
  }
}

.el-button--default {
  border: 1px solid #468ceb;
}
.el-button--default:hover {
  background: linear-gradient(298deg, #468ceb 0%, #35abff 100%);
}
.el-button--primary {
  background: linear-gradient(298deg, #468ceb 0%, #35abff 100%);
}
::v-deep .mycell .el-checkbox__input {
  display: none;
}
.demo-ruleForm {
  .el-form-item {
    margin-bottom: 22px;
  }
  .el-input,
  .el-select {
    position: relative;
    font-size: 12px;
    display: inline-block;
    width: 100%;
  }
}
.table {
  margin-top: 15px;
}
.table::before {
  height: 0px;
}
.el-table {
  ::v-deep .cell {
    .column-span {
      display: flex;
      justify-content: space-between;
      div {
        min-width: 80px;
        &:last-child {
          padding-right: 10px;
        }
      }
      p {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
}
input {
  width: 100%;
}
.footer-content {
  display: flex;
  margin-top: 15px;
}
.note {
  line-height: 24px;
  flex: 1;
}
.btn {
  display: flex;
  align-items: flex-end;
}
</style>

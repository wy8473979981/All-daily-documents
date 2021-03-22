<template>
  <el-drawer :visible.sync="display" direction="rtl" :append-to-body="true" :withHeader="false" :size="width" :before-close="cancelDialog">
    <div class="dialog-close-icon" @click="cancelDialog" style="right:588px">
      <i></i>
    </div>
    <div class="drawerBudget-detail">
      <el-row class="fast-top-bar" type="flex" justify="space-between" align="middle">
        <el-col :span="12" style="text-align: left;">
          <span class="drawer-title">{{title}}</span>
        </el-col>
        <el-col :span="12" style="text-align: right;">
          <el-button type="success" @click="sure">{{footerBtnSave}}</el-button>
          <el-button plain @click="closeByButton">{{footerBtnCancel}}</el-button>
        </el-col>
      </el-row>
      <div class="con">
        <div class="drawerBudget-newBunk header-list">
          <div class="add-btn">
            <i class="el-icon-circle-plus-outline" @click="addTargetFunc"></i>
            <span>增加</span>
          </div>
          <el-table :data="tableData" style="width: 100%;" ref="drawerTable" size="mini" header-row-class-name="drawer-table-header" @selection-change="checkboxChangeFunc">
            <el-table-column type="selection" width="50" :selectable="selectableFunc"></el-table-column>
            <el-table-column prop="label" label="分级名" min-width="100">
              <template slot-scope="scope">
                <el-input v-if="!scope.row.systemTargetItem" v-model="scope.row.name" size="mini" @input="hasValueFunc(scope)"></el-input>
                <p v-else>{{ scope.row.name }}</p>
              </template>
            </el-table-column>
            <el-table-column prop="value" label="分值" min-width="50">
              <template slot-scope="scope">
                <el-input v-if="!scope.row.systemTargetItem" v-filter-check-input v-model="scope.row.value" size="mini" @input="hasValueFunc(scope)"></el-input>
                <p v-else>{{ scope.row.value }}</p>
              </template>
            </el-table-column>
            <el-table-column prop="" label="操作" width="50">
              <template slot-scope="scope">
                <el-button type="text" size="mini" class="delete-btn" v-if="!scope.row.systemTargetItem" @click="deleteRow(scope)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </el-drawer>
</template>
<script>
import CalculationApi from '@/apis/apis/income/calculation/calculationApi'
export default {
  props: {
    //打开方式
    direction: {
      type: String,
    },
    // 是否打开
    display: {
      type: Boolean
    },
    targetId: {
      type: Number,
    },
    // 标题
    title: {
      type: String,
      default: '标题'
    },
    // 是否显示关闭按钮
    closable: {
      type: Boolean,
      default: true
    },
    // 是否显示遮罩
    mask: {
      type: Boolean,
      default: true
    },
    // 是否点击遮罩关闭
    maskClosable: {
      type: Boolean,
      default: true
    },
    // 宽度
    width: {
      type: String,
      default: '400px'
    },
    // 是否在父级元素中打开
    inner: {
      type: Boolean,
      default: false
    },
    footerBtnSave: {
      type: String,
      default: '确定'
    },
    footerBtnCancel: {
      type: String,
      default: '取消'
    }
  },
  data() {
    return {
      selectRow: [],
      checkAll: true,
      tableData: [],
      ruleForm: {
        tableData: [],
      },
      rules: {},
      indeterminate: false,
    }
  },
  computed: {

  },
  mounted() {
    this.getScoreList();
  },
  methods: {
    cancelDialog() {
      this.$emit('update:display', false)
    },
    closeByMask() {
      this.maskClosable && this.$emit('update:display', false)
    },
    closeByButton() {
      this.$emit('update:display', false)
    },
    addTargetFunc() {
      let dataLength = this.tableData.length;
      let row = { targetItemId: null, status: true, name: '', value: '' };
      this.tableData.push(row);
    },
    async redactFunc() {
      try {

      } catch (e) {
        console.log(e)
      }
    },
    async getScoreList() {
      //根据指标id获取分级列表
      try {
        let params = { targetId: this.targetId }
        await CalculationApi.getScoreList(params).then(res => {
          const { code, result: { items } } = res;
          if (code === 200) {
            this.tableData = items.map((item, index) => {
              return { systemTargetItem: item.systemTargetItem, targetItemId: item.targetItemId, name: item.name, value: item.value, status: item.status }
            });
            this.$nextTick(() => {
              this.toggleSelection(this.tableData);
            })
          }
        });
      } catch (e) {
        console.log(e)
      }
    },
    async deleteRow(scope) {
      // 删除 this.tableData 和 selectRow 中的数据
      try {
        let { $index, row } = scope;
        if (!row.targetItemId) {
          this.tableData.splice($index, 1)
        } else {
          let deleteRow = { ...row, value: Number(row.value), deleteFlag: true }
          let params = {
            items: [deleteRow],
            targetId: this.targetId
          }
          await CalculationApi.targetUpdate(params).then(res => {
            const { code, result } = res;
            if (code === 200) {
              this.$message.success('删除成功');
              this.getScoreList()
            } else {
              this.$message.error(res.msg);
            }
          })
        }
      } catch (e) {
        console.log(e)
      }
    },
    selectableFunc(row, index) {
      if (row.systemTargetItem || ([null, undefined, ''].includes(row.name)) || ([null, undefined, ''].includes(row.value))) {
        return false;
      } else {
        return true;
      }
    },
    toggleSelection(data) {
      this.$nextTick(() => {
        data.forEach((item) => {
          if (item.status) {
            //设置该表格选框选中
            this.$refs.drawerTable.toggleRowSelection(item, true);
          } else {
            this.$refs.drawerTable.toggleRowSelection(item, false);
          }
        });
      })
    },
    checkboxChangeFunc(val) {// 复选框
      this.selectRow = val;
      console.log(this.selectRow, '11')
    },
    hasValueFunc(scope) {
      // 已选中，但是清空输入值，就取消当前行选中
      const { row } = scope;
      if (row.name == "" || row.value == "") {
        this.$nextTick(() => {
          this.$refs.drawerTable.toggleRowSelection(row, false);
        })
      } else if (row.name != "" || row.value != "") {
        this.$nextTick(() => {
          this.$refs.drawerTable.toggleRowSelection(row, true);
        })
      }
    },
    async sure() {
      try {
        let selectRowIds = this.selectRow.map(item => {
          return item.targetItemId
        })
        let tableData = [];
        this.tableData.map(item => {
          if (selectRowIds.includes(item.targetItemId)) {
            tableData.push({ ...item, value: Number(item.value), status: true });
          } else {
            tableData.push({ ...item, value: Number(item.value), status: false });
          }
        })
        let params = {
          items: [...tableData],
          targetId: this.targetId
        }
        await CalculationApi.targetUpdate(params).then(res => {
          const { code, result } = res;
          if (code === 200) {
            this.$message.success('保存成功');
            this.$emit('update:save', false)
          } else {
            this.$message.error(res.msg);
          }
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.el-drawer {
  outline: none;
}
.delete-btn {
  color: red;
}
.drawer-title {
  font-size: 18px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  line-height: 28px;
}
.el-drawer .report-label {
  font-size: 18px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: bold;
  line-height: 41px;
  color: #333;
}

.el-drawer__body {
  outline: none;
}
::v-deep .drawer-table-header {
  .el-checkbox__inner {
    visibility: hidden;
  }
}
.add-btn {
  cursor: pointer;
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 5px;
  .el-icon-circle-plus-outline {
    font-size: 24px;
    color: #468ceb;
  }
  span {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #468ceb;
    line-height: 14px;
  }
}
.el-icon-close {
  font-size: 24px;
  cursor: pointer;
}
.dialog-close-icon {
  right: 288px;
  width: 25px;
  height: 142px;
  background-color: #fff;
  position: fixed;
  top: 50%;
  margin-top: -71px;
  // border-radius: 13px;
  cursor: pointer;
}

.dialog-close-icon i {
  display: block;
  border: 6px solid transparent;
  border-left: 6px solid #98a9bc;
  position: absolute;
  top: 50%;
  left: 3px;
  margin-top: -6px;
}

.drawerBudget-detail .fast-top-bar {
  padding: 0 20px;
  height: 44px;
  outline: none;
  align-items: center;
  background-color: #f2f4f6;
}

.drawerBudget-detail .fast-top-bar button {
  border-radius: 0;
}

.drawerBudget-detail .fast-top-bar .el-button--success {
  background: linear-gradient(298deg, #468ceb 0%, #35abff 100%);
  border: 0;
  padding: 8px 17px;
}

.drawerBudget-detail .fast-top-bar .el-button--default {
  border: 0;
  padding: 8px 17px;
}

.drawerBudget-detail .con {
  padding: 0 50px;
  height: calc(100vh - 84px);
  overflow-y: auto;
}

.drawerBudget-detail .con .drawerBudget-newBunk {
  padding-top: 20px;
}

.header-list dl {
  line-height: 28px;
}

.drawerBudget-detail .el-checkbox__input {
  white-space: nowrap;
  cursor: pointer;
  outline: none;
  display: inline-block;
  line-height: 1;
  position: relative;
  vertical-align: middle;
}

.header-list .is-checked .el-checkbox__label {
  color: #333;
}

.header-list dd {
  margin-left: 15px;
}
.el-table {
  ::v-deep .cell {
    // text-overflow: initial;
  }
}
</style>

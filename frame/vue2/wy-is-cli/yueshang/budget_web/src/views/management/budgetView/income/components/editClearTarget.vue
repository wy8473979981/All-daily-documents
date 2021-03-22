<template>
  <el-drawer :visible.sync="editDebtsShow" direction="rtl" :append-to-body="true" :withHeader="false" :wrapperClosable="false" size="900px">
    <div class="dialog-close-icon" @click="close" style="right: 886px;">
      <i></i>
    </div>
    <div class="drawerBudget-detail">
      <el-row class="fast-top-bar" type="flex" justify="space-between" align="middle">
        <el-col>
          <h3 v-show="editDebtsShow">编辑清欠目标</h3>
          <h3 v-show="!editDebtsShow">添加清欠目标</h3>
        </el-col>
        <el-col style="text-align: right;">
          <el-button @click="updateBizClear('clearForm')" type="success">确定</el-button>
          <el-button @click="close" plain>取消</el-button>
        </el-col>
      </el-row>
      <div class="con">
        <div class="drawerBudget-newBunk">
          <div class="drawerBudget-info">
            <el-row :gutter="24">
              <el-col :span="24" class="topRight-col table-col">
                <el-form :model="clearForm" :rules="clearRules" ref="clearForm" label-width="0px">
                  <el-table ref="table" :data="clearForm.editOwingMoneyList" size="mini" @selection-change="updateClearChange" border stripe header-row-class-name="table-header" :height="this.$store.state.tableHeight" :cell-style="{ padding: '4px 0' }" class="drawerBudget-table">
                    <el-table-column type="selection"></el-table-column>
                    <el-table-column label="欠费项目" prop="feeName" min-width="100"></el-table-column>
                    <el-table-column label="欠费金额（元）" prop="owe" min-width="120"></el-table-column>
                    <el-table-column label="1月清欠" prop="jan" min-width="100">
                      <template slot-scope="scope">
                        <el-form-item>
                          <el-input v-model="scope.row.jan" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column label="2月清欠" prop="feb" min-width="100">
                      <template slot-scope="scope">
                        <el-form-item>
                          <el-input v-model="scope.row.feb" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column label="3月清欠" prop="march" min-width="100">
                      <template slot-scope="scope">
                        <el-form-item>
                          <el-input v-model="scope.row.march" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column label="4月清欠" prop="april" min-width="100">
                      <template slot-scope="scope">
                        <el-form-item>
                          <el-input v-model="scope.row.april" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column label="5月清欠" prop="may" min-width="100">
                      <template slot-scope="scope">
                        <el-form-item>
                          <el-input v-model="scope.row.may" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column label="6月清欠" prop="june" min-width="100">
                      <template slot-scope="scope">
                        <el-form-item>
                          <el-input v-model="scope.row.june" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column label="7月清欠" prop="july" min-width="100">
                      <template slot-scope="scope">
                        <el-form-item>
                          <el-input v-model="scope.row.july" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column label="8月清欠" prop="aug" min-width="100">
                      <template slot-scope="scope">
                        <el-form-item>
                          <el-input v-model="scope.row.aug" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column label="9月清欠" prop="sep" min-width="100">
                      <template slot-scope="scope">
                        <el-form-item>
                          <el-input v-model="scope.row.sep" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column label="10月清欠" prop="oct" min-width="100">
                      <template slot-scope="scope">
                        <el-form-item>
                          <el-input v-model="scope.row.oct" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column label="11月清欠" prop="nov" min-width="100">
                      <template slot-scope="scope">
                        <el-form-item>
                          <el-input v-model="scope.row.nov" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column label="12月清欠" prop="dece" min-width="100">
                      <template slot-scope="scope">
                        <el-form-item>
                          <el-input v-model="scope.row.dece" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
                        </el-form-item>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-form>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import LeaseApi from '@/apis/apis/leaseApi'
export default {
  name: 'HouseDrawer',
  data() {
    var checkTime = function (rule, value, callback) {
      const field = rule.field.split(".");
      const index = field[1];
      const item = Vue.clearForm.editOwingMoneyList[index];
      if (!value && item.selected) {
        callback(new Error("请选择完成时间"));
      }
      callback();
    }
    var checkTarget = function (rule, value, callback) {
      const field = rule.field.split(".");
      const index = field[1];
      const item = Vue.clearForm.editOwingMoneyList[index];
      if (!value && item.selected) {
        callback(new Error("请输入金额"));
      }
      callback();
    }
    return {
      clearRules: {
        finishDate: [{ required: true, validator: checkTime, trigger: ['blur', 'change'] }],
        target: [{ required: true, validator: checkTarget, trigger: ['blur', 'change'] }],
      },
      editOwingMoneyListSlected: []
    }
  },
  props: ['editDebtsShow', 'clearForm'],
  watch: {
    'clearForm.editOwingMoneyList': function (newValue, oldValue) {
      this.$nextTick(() => {
        this.clearForm.editOwingMoneyList.map(item => {
          if (item.select) {
            this.$refs.table.toggleRowSelection(item, true)
          }
        })
      })
    },
    editDebts(newValue, oldValue) {
      if (!newValue) {
        this.clearForm.editOwingMoneyList = []
      }
    },
  },
  methods: {
    close() {
      this.$emit('visible:editDebts', false);
    },
    updateClearChange(val) {
      val.map(item => {
        if (item.selected) {
          //val.selected = false
          this.$set(item, 'selected', false)
        } else {
          //val.selected = true
          this.$set(item, 'selected', true)
        }
      })
      this.editOwingMoneyListSlected = val;
    },
    //修改欠费清单
    async updateBizClear(form) {
      /* let flog = false;
       console.log(this.$refs[form]);
       this.$refs[form].validate(valid => {
         if (valid) {
           flog = true;
         }
       }) */
      if (this.editOwingMoneyListSlected.length > 0) {
        let list = [];
        let target = '';
        this.editOwingMoneyListSlected.map(obj => {
          list.push({
            annual: obj.annual,
            budgetInstanceBizLeaseId: obj.budgetInstanceBizLeaseId,
            feeType: obj.feeType,
            finishDate: obj.finishDate,
            owe: obj.owe,
            projectId: obj.projectId,
            storeId: obj.storeId,
            storeNo: obj.storeNo,
            target: obj.target,
            receId: obj.rece_id,
            jan: obj.jan,
            feb: obj.feb,
            march: obj.march,
            april: obj.april,
            may: obj.may,
            june: obj.june,
            july: obj.july,
            aug: obj.aug,
            sep: obj.sep,
            oct: obj.oct,
            nov: obj.nov,
            dece: obj.dece
          })
          target += obj.fee_type_name + ';';
          if (obj.jan) {
            target += '1月' + obj.jan + '元,'
          }
          if (obj.feb) {
            target += '2月' + obj.feb + '元,'
          }
          if (obj.march) {
            target += '3月' + obj.march + '元,'
          }
          if (obj.april) {
            target += '4月' + obj.april + '元,'
          }
          if (obj.may) {
            target += '5月' + obj.may + '元,'
          }
          if (obj.june) {
            target += '6月' + obj.june + '元,'
          }
          if (obj.july) {
            target += '7月' + obj.july + '元,'
          }
          if (obj.aug) {
            target += '8月' + obj.aug + '元,'
          }
          if (obj.sep) {
            target += '9月' + obj.sep + '元,'
          }
          if (obj.oct) {
            target += '10月' + obj.oct + '元,'
          }
          if (obj.nov) {
            target += '11月' + obj.nov + '元,'
          }
          if (obj.dece) {
            target += '12月' + obj.dece + '元'
          }
          target += ';'
        })
        await LeaseApi.updateOwingMoney(list).then(res => {
          if (res.code === 0 && res.data) {
            //this.editDebts = false;
            this.$emit('updatTarget', target)
          }
        })
      }
    },
  }
}
</script>
<style scoped lang="scss">
@import "~@styles/common.scss";
.drawerBudget-detail {
  .drawerBudget-info ::v-deep input.el-input__inner::-webkit-input-placeholder {
    font-weight: 400;
  }
  .con .drawerBudget-table ::v-deep input.el-input__inner {
    border-color: #dcdfe6;
  }
}
</style>

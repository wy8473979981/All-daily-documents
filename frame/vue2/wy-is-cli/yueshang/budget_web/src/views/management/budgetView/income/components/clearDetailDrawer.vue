<template>
  <div>
    <el-drawer :visible.sync="open" direction="rtl" :append-to-body="true" :withHeader="false" :wrapperClosable="false" size="1200px">
      <div class="dialog-close-icon" @click="cancel" style="right: 1186px;">
        <i></i>
      </div>
      <div class="drawerBudget-detail">
        <el-row class="fast-top-bar" type="flex" justify="space-between" align="middle">
          <el-col :span="12">
            <h3>查看清欠目标</h3>
          </el-col>
          <el-col style="text-align: right;">
            <el-button type="success" @click="submit">修改</el-button>
            <el-button plain @click="cancel">取消</el-button>
          </el-col>
        </el-row>
        <div class="con">
          <div class="drawerBudget-newBunk">
            <!-- <h3 class="min-title">基础信息</h3> -->
            <div class="drawerBudget-info">
              <el-row :gutter="24">
                <h4>基础信息</h4>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="12">
                  <div class="d-min">
                    <span>欠费金额(元)</span>
                    <el-input class="required" size="mini" :value="ruleForm.owe | micrometerLevel " placeholder="请输入"></el-input>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="d-min">
                    <span>清欠率</span>
                    <el-input size="mini" :value="ruleForm.clearRate" v-filter-check-input maxlength="12" placeholder="请输入" class="form-input">
                      <i slot="suffix" class="el-input__icon">%</i>
                    </el-input>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="drawerBudget-newBunk">
            <div class="drawerBudget-info">
              <el-row :gutter="24">
                <h4>每月清欠金额初算(元)</h4>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24" class="right-col table-col">
                  <el-table size="mini" border stripe header-row-class-name="table-header" :data="clearTableData" ref="table" :height="'200px'">
                    <el-table-column show-overflow-tooltip label="1月" min-width="50" prop="1">
                      <template slot-scope="scope">
                        <p>{{scope.row[1] | blank | micrometerLevel}}</p>
                      </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip label="2月" min-width="50" prop="2">
                      <template slot-scope="scope">
                        <p>{{scope.row[2] | blank | micrometerLevel}}</p>
                      </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip label="3月" min-width="50" prop="3">
                      <template slot-scope="scope">
                        <p>{{scope.row[3] | blank | micrometerLevel}}</p>
                      </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip label="4月" min-width="50" prop="4">
                      <template slot-scope="scope">
                        <p>{{scope.row[4] | blank | micrometerLevel}}</p>
                      </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip label="5月" min-width="50" prop="5">
                      <template slot-scope="scope">
                        <p>{{scope.row[5] | blank | micrometerLevel}}</p>
                      </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip label="6月" min-width="50" prop="6">
                      <template slot-scope="scope">
                        <p>{{scope.row[6] | blank | micrometerLevel}}</p>
                      </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip label="7月" min-width="50" prop="7">
                      <template slot-scope="scope">
                        <p>{{scope.row[7] | blank | micrometerLevel}}</p>
                      </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip label="8月" min-width="50" prop="8">
                      <template slot-scope="scope">
                        <p>{{scope.row[8] | blank | micrometerLevel}}</p>
                      </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip label="9月" min-width="50" prop="9">
                      <template slot-scope="scope">
                        <p>{{scope.row[9] | blank | micrometerLevel}}</p>
                      </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip label="10月" min-width="50" prop="10">
                      <template slot-scope="scope">
                        <p>{{scope.row[10] | blank | micrometerLevel}}</p>
                      </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip label="11月" min-width="50" prop="11">
                      <template slot-scope="scope">
                        <p>{{scope.row[11] | blank | micrometerLevel}}</p>
                      </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip label="12月" min-width="50" prop="12">
                      <template slot-scope="scope">
                        <p>{{scope.row[12] | blank | micrometerLevel}}</p>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>

    </el-drawer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import LeaseApi from '@/apis/apis/leaseApi'
import { toThousandsClean, getDynamicTableHeight, rTime } from '@/utils/index'
export default {
  name: 'ClearDetailDrawer',
  props: ['open', 'type', 'id'],
  data() {
    return {
      projectList: [],
      ruleForm: {
        owe: null,// 欠费
        clearRate: null,//清欠率%
        storeType: '3', //铺位类型1铺位2多经3住宅/写字楼 ,
      },
      clearTableData: []
    }
  },
  created() {
    this.getDetail()
  },
  computed: {
  },
  watch: {

  },
  mounted() {

  },
  beforeDestroy() {

  },
  methods: {
    async getDetail() {
      this.ruleForm = {
        ...this.ruleForm,
        budgetInstanceBizLeaseId: this.id,
      };
      await LeaseApi.getBizClearowe(this.id).then(res => {
        if (res.code === 0) {
          this.ruleForm = {
            owe: res.data[0].owe,// 欠费
            clearRate: res.data[0].clearRate,//清欠率%
            budgetInstanceBizLeaseId: this.id,
          };
          this.clearTableData = res.data[0].monthClearOweList
        }
      })
    },
    submit() {
      this.$emit('drawerSave', this.ruleForm)
    },
    cancel() {
      this.$emit('update:dialogVisible', false)
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@styles/common.scss";
.dialog-close-icon {
  right: 562px;
}
.drawerBudget-detail .el-table__body-wrapper p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

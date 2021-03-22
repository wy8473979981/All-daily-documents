<template>
  <div>
    <el-drawer :visible.sync="open" direction="rtl" :append-to-body="true" :withHeader="false" :wrapperClosable="false" size="1000px">
      <div class="dialog-close-icon" @click="cancel" style="right: 986px;">
        <i></i>
      </div>
      <div class="drawerBudget-detail">
        <el-row class="fast-top-bar" type="flex" justify="space-between" align="middle">
          <el-col :span="12">
            <h3>编辑车位数</h3>
          </el-col>
          <el-col style="text-align: right;">
            <el-button type="success" @click="submit">提交</el-button>
            <el-button plain @click="cancel">取消</el-button>
          </el-col>
        </el-row>
        <div class="con">
          <div class="drawerBudget-newBunk">
            <div class="drawerBudget-info">
              <el-row :gutter="24">
                <h4>基础信息</h4>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="24" class="right-col table-col">
                  <el-form :model="ruleForm" ref="ruleForm">
                    <el-row>
                      <el-table class="table-input-box drawerBudget-table" size="mini" :data="ruleForm.cartableData" border stripe header-row-class-name="table-header">
                        <el-table-column label="业态" prop="bizType"></el-table-column>
                        <el-table-column label="地面停车位">
                          <template slot-scope="scope">
                            <!-- <el-form-item label=""> -->
                            <el-input v-filter-check-input2 maxlength="12" class="required" v-model="scope.row.ground" placeholder="请输入" size="mini"></el-input>
                            <!-- </el-form-item> -->
                          </template>
                        </el-table-column>
                        <el-table-column label="地下停车位">
                          <template slot-scope="scope">
                            <!-- <el-form-item label=""> -->
                            <el-input v-filter-check-input2 maxlength="12" class="required" v-model="scope.row.underground" placeholder="请输入" size="mini"></el-input>
                            <!-- </el-form-item> -->
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-row>
                  </el-form>
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
import IncomeApi from '@/apis/apis/incomeApi'
export default {
  name: 'TruckSpaceDrawer',
  props: ['open', 'table'],
  data() {
    return {
      ruleForm: {
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
      },

    }
  },
  created() {
    this.ruleForm.cartableData = this.table ? this.table : this.ruleForm.cartableData
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
    resetData() {
      this.ruleForm.cartableData = [{
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
      }]
    },
    submit() {
      if (!this.subValid()) {
        return false
      }
      this.$emit('drawerSave', this.ruleForm)
    },
    subValid() {
      let flag = this.ruleForm.cartableData.some(function (item, index, array) {
        return !item.ground || !item.underground;
      })
      console.log(this.ruleForm.cartableData, '55')
      if (flag) {
        this.$message.error('请将必填项填写完整!')
        return false
      } else {
        return true
      }
    },
    cancel() {
      this.resetData()
      this.$emit('update:dialogVisible', false)
    }
  }
}
</script>

<style scoped lang="scss" scoped>
@import "~@styles/common.scss";
.dialog-close-icon {
  right: 562px;
}
// ::v-deep .drawerBudget-detail .con .el-input__inner {
//   height: 24px;
//   border-radius: 0;
//   padding: 0 15px;
//   border-color: #ffffff;
// }
</style>

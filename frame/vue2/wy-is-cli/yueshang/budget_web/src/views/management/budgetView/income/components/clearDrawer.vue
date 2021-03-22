<template>
  <div>
    <el-drawer :visible.sync="open" direction="rtl" :append-to-body="true" :withHeader="false" :wrapperClosable="false" size="1000px">
      <div class="dialog-close-icon" @click="cancel" style="right: 986px;">
        <i></i>
      </div>
      <div class="drawerBudget-detail">
        <el-row class="fast-top-bar" type="flex" justify="space-between" align="middle">
          <el-col :span="12">
            <h3>编辑清欠目标</h3>
          </el-col>
          <el-col style="text-align: right;">
            <el-button type="success" @click="submit">提交</el-button>
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
                    <el-input class="required" size="mini" v-model="ruleForm.owe" v-filter-check-input maxlength="12" placeholder="请输入"></el-input>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="d-min">
                    <span>清欠率</span>
                    <el-input size="mini" v-model="ruleForm.clearRate" v-filter-check-input maxlength="12" placeholder="请输入" class="form-input">
                      <i slot="suffix" class="el-input__icon">%</i>
                    </el-input>
                  </div>
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
export default {
  name: 'ClearDrawer',
  props: ['open', 'type', 'id'],
  data() {
    return {
      projectList: [],
      ruleForm: {
        owe: null,// 欠费
        clearRate: null,//清欠率%
        storeType: '3', //铺位类型1铺位2多经3住宅/写字楼 ,
      },
    }
  },
  created() {
    this.getDetail()
  },
  computed: {
    ...mapGetters(["bizList", "sellWayList", "houseTypeList", 'saleInitialStatusList']),
  },
  watch: {

  },
  mounted() {

  },
  beforeDestroy() {

  },
  methods: {
    async getDetail() {
      try {
        this.ruleForm = {
          ...this.ruleForm,
          budgetInstanceBizLeaseId: this.id,
        };
        await LeaseApi.getBizClearowe(this.id).then(res => {
          if (res.code === 0 && res.data.length > 0) {
            this.ruleForm = {
              owe: res.data[0].owe,// 欠费
              clearRate: res.data[0].clearRate,//清欠率%
              storeType: '3', //铺位类型1铺位2多经3住宅/写字楼 ,
              budgetInstanceBizLeaseId: this.id,
            };
          } else if (res.code === 0) {
            this.ruleForm = {
              owe: null,// 欠费
              clearRate: null,//清欠率%
              storeType: '3', //铺位类型1铺位2多经3住宅/写字楼 ,
              budgetInstanceBizLeaseId: this.id,
            };
            console.log(this.ruleForm,'33')
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    resetData() {
      this.ruleForm = {
        owe: null,// 欠费
        clearRate: null,//清欠率%
        storeType: '3', //铺位类型1铺位2多经3住宅/写字楼 ,
      };
    },
    submit() {
      if (!this.subValid()) {
        return false
      }
      this.$emit('drawerSave', this.ruleForm)
    },
    subValid() {
      if (!this.ruleForm.owe || !this.ruleForm.clearRate) {
        this.$message.error('请将必填项填写完整!')
        return false
      }
      return true;
    },
    cancel() {
      this.resetData()
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
</style>

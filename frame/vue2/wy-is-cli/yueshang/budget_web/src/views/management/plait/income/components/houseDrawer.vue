<template>
  <div>
    <el-drawer :visible.sync="open" direction="rtl" :append-to-body="true" :withHeader="false" :wrapperClosable="false" size="1000px">
      <div class="dialog-close-icon" @click="cancel" style="right: 986px;">
        <i></i>
      </div>
      <div class="drawerBudget-detail">
        <el-row class="fast-top-bar" type="flex" justify="space-between" align="middle">
          <el-col :span="12">
            <h3>编辑住宅/写字楼预算</h3>
          </el-col>
          <el-col style="text-align: right;">
            <el-button type="success" @click="submit">提交</el-button>
            <el-button plain @click="cancel">取消</el-button>
          </el-col>
        </el-row>
        <div class="con">
          <div class="drawerBudget-newBunk">
            <!-- <h3 class="min-title">编辑多经预算</h3> -->
            <div class="drawerBudget-info">
              <el-row :gutter="24">
                <h4>基础信息</h4>
              </el-row>
              <el-row :gutter="24">
                <!-- <el-col :span="12">
                  <div class="d-min">
                    <span>单元编号</span>
                    <el-input class="required" size="mini" v-model="ruleForm.unitNo" placeholder="请输入"></el-input>
                  </div>
                </el-col> -->
                <el-col :span="12" class="right-col">
                  <div class="d-min">
                    <span>出售类型</span>
                    <el-select class="required" size="mini" v-model="ruleForm.initialStatus" placeholder="请选择">
                      <el-option v-for="item in saleInitialStatusList" :key="item.id" :label="item.dictName" :value="item.dictCd"></el-option>
                    </el-select>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="d-min">
                    <span>物业类型</span>
                    <el-select class="required" size="mini" v-model="ruleForm.chargeType" placeholder="请选择">
                      <el-option v-for="item in houseTypeList" :key="item.id" :label="item.dictName" :value="item.dictCd"></el-option>
                    </el-select>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="24" style="margin-top:15px;" v-if="ruleForm.chargeType&&ruleForm.chargeType==5">
                <el-col :span="12">
                  <div class="d-min">
                    <span>楼号</span>
                    <el-input class="required" size="mini" v-model="ruleForm.buildingNum" placeholder="请输入"></el-input>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="d-min">
                    <span>层号</span>
                    <el-input class="required" size="mini" v-model="ruleForm.storeNo" placeholder="请输入"></el-input>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="24" style="margin-top:15px;">
                <el-col :span="12" v-if="ruleForm.chargeType&&ruleForm.chargeType!=5">
                  <div class="d-min">
                    <span>住宅号码</span>
                    <el-input class="required" size="mini" v-model="ruleForm.storeNo" placeholder="请输入"></el-input>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="drawerBudget-newBunk">
            <!-- <h3 class="min-title">编辑多经预算</h3> -->
            <div class="drawerBudget-info">
              <el-row :gutter="24">
                <h4>合同信息</h4>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="12">
                  <div class="d-min">
                    <span>合同号</span>
                    <el-input class="" size="mini" v-model="ruleForm.contNo" placeholder="请选择">
                    </el-input>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="d-min">
                    <span>交付计费起始期</span>
                    <el-date-picker size="mini" type="date" v-model="ruleForm.contStartDate" placeholder="请选择交付计费起始期" value-format="yyyy-MM-dd">
                    </el-date-picker>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="24" style="margin-top:15px;">
                <el-col :span="12">
                  <div class="d-min">
                    <span>收费面积(m²)</span>
                    <el-input size="mini" class="" v-filter-check-input maxlength="12" v-model="ruleForm.square" placeholder="请输入"></el-input>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="d-min">
                    <span>收费单价(元)</span>
                    <el-input size="mini" class="" v-filter-check-input maxlength="12" v-model="ruleForm.stdUnitPriceWg" placeholder="请输入">
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
  name: 'HouseDrawer',
  props: ['open', 'type', 'id'],
  data() {
    return {
      projectList: [],
      ruleForm: {
        // unitNo: null,//单元编号
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
      if (this.type == 'edit') {
        await LeaseApi.getResidence(this.id).then(res => {
          if (res.code === 0 && res.data) {
            this.ruleForm = res.data;
          }
        })
      }
    },
    resetData() {
      this.ruleForm = {
        // unitNo: null,//单元编号
        chargeType: null,//物业类型1购物中心2商业街3住宅4住宅底商5写字楼 6住宅公寓7住宅别墅 ,
        storeNo: null,//住宅号码,层号
        initialStatus: null,//出售类型 1未出售2 已出售,
        buildingNum: null,// 楼号

        contNo: null,// 合同编号
        contStartDate: null,// 交付起始日
        square: null, //收费面积 ,
        stdUnitPriceWg: null,//收费单价
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
      if (this.ruleForm.chargeType && this.ruleForm.chargeType == 5) {
        if (!this.ruleForm.storeNo || !this.ruleForm.initialStatus || !this.ruleForm.buildingNum) {
          this.$message.error('请将必填项填写完整!')
          return false
        } else {
          return true
        }
      } else {
        if (!this.ruleForm.storeNo || !this.ruleForm.initialStatus) {
          this.$message.error('请将必填项填写完整!')
          return false
        } else {
          return true
        }
      }
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

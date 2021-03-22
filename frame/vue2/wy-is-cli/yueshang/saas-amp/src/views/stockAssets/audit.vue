<template>
  <div>
    <el-drawer
      :visible.sync="fast"
      direction="rtl"
      :append-to-body="true"
      :withHeader="false"
      :wrapperClosable="false"
      size="576px">
      <div class="dialog-close-icon" @click="cancel">
        <i></i>
      </div>
      <div class="drawer-detail">
        <el-row class="fast-top-bar" type="flex" justify="space-between" align="middle">
          <el-col :span="12">
            <h3 v-show="num == 2">条线审核</h3>
            <h3 v-show="num == 21">区域条线审核</h3>
            <h3 v-show="num == 22">技术条线审核</h3>
            <h3 v-show="num == 23">营运条线审核</h3>
            <h3 v-show="num == 3">条线驳回</h3>
            <h3 v-show="num == 5">资管驳回</h3>
            <h3 v-show="num == 31">区域驳回</h3>
            <h3 v-show="num == 32">技术驳回</h3>
            <h3 v-show="num == 33">营运驳回</h3>
            <h3 v-show="num == 4">资管审核</h3>
          </el-col>
          <el-col style="text-align: right;">
            <el-button type="success" @click="submit">提交</el-button>
            <el-button plain @click="cancel">取消</el-button>
          </el-col>
        </el-row>
        <div class="con">
          <div>
            <!-- <h3 class="min-title">存量资产</h3> -->
            <el-row :gutter="20">
              <el-col :span="24">
                <div class="d-min">
                  <span v-if="num == 3">驳回意见</span>
                  <span v-else>审批意见</span>
                  <el-input
                    type="textarea"
                    :rows="20"
                    placeholder="请输入"
                    v-model="info.message">
                  </el-input>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import StockAssets from '@/apis/apis/stockAssets'
export default {
  name: 'Audit',
  props: ['open', 'id', 'num'],
  data() {
    return {
      info: {
        message: null, //原因
      }
    }
  },
  created() {
  },
  computed: {
    fast: {
      get() {
        return this.open
      },
      set(val) {
        this.$emit('close', {fast: false})
      }
    }
  },
  watch: {
    id(nv, v) {
      if(nv) {
        // this.getList()
      }else{
        this.info = {
          message: null, //原因
        }
      }
    }
  },
  mounted() {

  },
  beforeDestroy() {

  },
  methods: {
    resetData() {
      this.info = {
        message: null, //原因
      }
    },
    submit() {
      if (this.num == 3 || this.num == 5) {
        if(!this.info.message) return this.$message.error('请输入驳回原因')
      }
      if (this.num > 30) {
        const params = {
          project_verify_id: this.id,
          verify_action: 2,
          message: this.info.message,
          business_verify_type: null
        }
        if (this.num == 31) {
          params.business_verify_type = 'area'
        } else if (this.num == 32) {
          params.business_verify_type = 'tech'
        } else if (this.num == 33) {
          params.business_verify_type = 'operation'
        }
        StockAssets.business_verify(params).then(res => {
          if(res.code === 200 && res.result){
            this.resetData()
            this.$emit('close', {
              fast: false,
              reload: true
            })
          }
        })
      }
      if (this.num > 20 && this.num < 30) {
        const params = {
          project_verify_id: this.id,
          verify_action: 1,
          message: this.info.message,
          business_verify_type: null
        }
        if (this.num == 21) {
          params.business_verify_type = 'area'
        } else if (this.num == 22) {
          params.business_verify_type = 'tech'
        } else if (this.num == 23) {
          params.business_verify_type = 'operation'
        }
        StockAssets.business_verify(params).then(res => {
          if(res.code === 200 && res.result){
            this.resetData()
            this.$emit('close', {
              fast: false,
              reload: true
            })
          }
        })
      }
      if (this.num < 10) {
        const params = {
          project_verify_id: this.id,
          verify_action: this.num,
          message: this.info.message,
        }
        if (this.num == 3) {
          params.verify_action = 3
          params.reject_status = 1
        }
        if (this.num == 5) {
          params.verify_action = 3
          params.reject_status = 2
        }
        StockAssets.verify_action(params).then(res => {
          if(res.code === 200 && res.result){
            this.resetData()
            this.$emit('close', {
              fast: false,
              reload: true
            })
          }
        })
      }
    },
    cancel() {
      this.resetData()
      this.fast = false
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@styles/common.scss';
.dialog-close-icon{
  right: 562px;
}
</style>

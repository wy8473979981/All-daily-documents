<template>
  <div>
    <el-drawer
      :visible.sync="fast"
      direction="rtl"
      :append-to-body="true"
      :withHeader="false"
      :wrapperClosable="true"
      size="914px">
      <div class="dialog-close-icon" @click="cancel">
        <i></i>
      </div>
      <div class="drawer-detail">
        <el-row class="fast-top-bar" type="flex" justify="space-between" align="middle">
          <el-col>
            <h3>审批流详情</h3>
          </el-col>
          <el-col style="text-align: right;">
            <el-button plain @click="cancel">关闭</el-button>
          </el-col>
        </el-row>
        <div class="con">
          <div>
            <p class="tab-title">
              <span>查询号：3804023</span>
              <span>发起人：PD问题反馈管理员</span>
              <span>发起日期：2020-06-22 10:25</span>
              <span>状态：审批中</span>
            </p>

          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>

export default {
  name: 'Look',
  props: ['open', 'id'],
  components: {
    
  },
  data() {
    return {
      
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
    
  },
  mounted() {

  },
  beforeDestroy() {
    
  },
  methods: {
    cancel() {
      this.fast = false;
      this.resetData();
    },
    resetData() {

    },
    // 加载详情
    getList() {
      
    },
  }
}
</script>

<style scoped lang="scss">
@import '~@/assets/styles/common.scss';
span{
  font-size: 14px;
}
.dialog-close-icon{
  right: 900px;
}
.tab-title{
  margin: 0 10px 10px;
  >span{
    margin-right: 30px;
  }
}
</style>
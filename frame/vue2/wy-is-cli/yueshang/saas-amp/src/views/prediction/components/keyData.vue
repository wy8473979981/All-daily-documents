<template>
  <div class="project_msg">
    <div>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="d-min">
            <span>项目投资启动</span>
            <el-date-picker
              class="required"
              v-model="survey.start_date"
              value-format="timestamp"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="d-min">
            <span>项目开工</span>
            <el-date-picker
              class="required"
              v-model="survey.project_started_date"
              value-format="timestamp"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="d-min">
            <span>项目开业</span>
            <el-date-picker
              class="required"
              v-model="survey.project_opening_date"
              value-format="timestamp"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="d-min">
            <span>项目竣工</span>
            <el-date-picker
              class="required"
              v-model="survey.project_cpl_date"
              value-format="timestamp"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 类别 -->
    <div>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="d-min">
            <span>项目退出</span>
            <el-date-picker
              class="required"
              v-model="survey.project_exit_date"
              value-format="timestamp"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data'],
  data() {
    return {
      survey: {
        start_date: null, //项目投资启动
        project_started_date: null, //项目开工
        project_opening_date: null, //项目开业
        project_cpl_date: null, //项目竣工
        project_exit_date: null //项目退出
      },
    }
  },
  created() {
    
  },
  watch: {
    data: {
      handler(nv, ov) {
        console.log(nv)
        if(nv) {
          this.loadData(nv)
        }else{
          this.resetData()
        }
      },
      deep: true
    }
  },
  methods: {
    // 加载详情数据
    loadData(data) {
      this.survey = data
    },
    // 数据复位（清除）
    resetData() {
      for(let key in this.survey) {
        this.survey[key] = null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.project_msg{
  .el-select{
    width: 100%;
  }
  >div{
    margin-bottom: 13px;
    >p{
      margin-bottom: 15px;
    }
  }
}
.el-row{
  margin-bottom: 20px;
}
.d-min{
  >span{
    display: block;
    font-size: 14px;
    color: #98A9BC;
    margin-bottom: 10px;
  }
}
</style>

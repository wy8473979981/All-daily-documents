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
          <el-col :span="6">
            <h3>新建沙盒</h3>
          </el-col>
          <el-col style="text-align: right;">
            <el-button type="success" @click="submit">提交</el-button>
            <el-button plain @click="cancel">取消</el-button>
          </el-col>
        </el-row>
        <div class="con">
          <div>
            <h3 class="min-title">沙盒方案</h3>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="d-min">
                  <span>项目名称</span>
                  <input-autocomplete class="required" ref="proName" :project-list="projectList" field="project_name" @handleSelect="handleSelect"></input-autocomplete>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="d-min">
                  <span>方案名称</span>
                  <el-input class="required" v-model="info.case_name" placeholder="请输入"></el-input>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top:15px;">
              <el-col :span="12">
                <div class="d-min">
                  <span>模拟年限</span>
                  <el-input class="required" v-model="info.analog_years" maxlength="2" @input="analog_yearsInput($event)" v-filter-check-input2 placeholder="请输入"></el-input>
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
import GlobalApi from '@/apis/apis/global';
import Sandbox from '@/apis/apis/sandbox';

export default {
  name: 'Create',
  props: ['open'],
  data() {
    return {
      projectList: [],
      info: {
        project_id: null, //项目编号
        case_name: null, //方案名称
        analog_years: null, //模拟年限
      }
    }
  },
  created() {
    this.getProList()
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
    getProList() {
      GlobalApi.getProjectList().then(res => {
        console.log("proList:",res)
        if(res.code === 200 && res.result){
          this.projectList = res.result.data
        }
      })
    },
    handleSelect(item) {
      console.log(item);
      this.info.project_id = item.project_id
    },
    analog_yearsInput(val) {
      if (val > 15) {
        this.info.analog_years = 15
      }
    },
    resetData() {
      this.info = {
        project_id: null, //项目编号
        case_name: null, //方案名称
        analog_years: null, //模拟年限
      };
      this.$refs.proName.inputvalue = '';
      console.log(this.$refs.proName)
    },
    submit() {
      if(!this.subValid()) {
        return false
      }
      const params = { 
        post_data: JSON.stringify({
          json_data: {
            info: this.info
          }
        })
      }
      Sandbox.add(params).then(res => {
        console.log(res)
        if(res.code === 200){
          this.resetData()
          this.$emit('close', {
            fast: false,
            reload: true
          })
        }
      })
    },
    subValid() {
      if(!this.info.project_id || !this.info.case_name || !this.info.analog_years) {
        this.$message.error('请将必填项填写完整!')
        return false
      }
      return true
    },
    cancel() {
      this.resetData()
      this.fast = false;
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
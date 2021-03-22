<template>
  <div>
    <el-drawer
      :visible.sync="fast"
      direction="rtl"
      :append-to-body="true"
      :withHeader="false"
      :wrapperClosable="false"
      size="1155px">
      <div class="dialog-close-icon" @click="cancel">
        <i></i>
      </div>
      <div class="drawer-detail">
        <el-row class="fast-top-bar" type="flex" justify="space-between" align="middle">
          <el-col>
            <h3 v-show="!readonly">新建地块</h3>
            <h3 v-show="readonly">编辑地块</h3>
          </el-col>
          <el-col style="text-align: right;">
            <el-button type="success" @click="submit">提交</el-button>
            <el-button plain @click="cancel">取消</el-button>
          </el-col>
        </el-row>
        <div class="con">
          <div>
            <el-row :gutter="20" style="margin-top:30px;">
              <el-col :span="6">
                <div class="d-min">
                  <span>项目名称</span>
                  <el-input class="required" :disabled="readonly" v-model="info.project_name" placeholder="请输入"></el-input>
                  <!-- <el-select class="required" :disabled="readonly" filterable clearable v-model="info.project_name" placeholder="请选择">
                    <el-option
                      v-for="item in projectList"
                      :key="item.project_name"
                      :label="item.project_name"
                      :value="item.project_name">
                    </el-option>
                  </el-select> -->
                </div>
              </el-col>
              <el-col :span="6">
                <div class="d-min">
                  <span>版本</span>
                  <el-input class="required" :disabled="readonly" v-model="info.version" placeholder="请输入"></el-input>
                </div>
              </el-col>
            </el-row>
          </div>
          <!-- 切换 项目概况 / 地块配置信息 -->
          <div class="tab-label">
            <label :class="{'active':tab===1}" @click="tabSwitch(1)">项目概况</label>|
            <label :class="{'active':tab===2}" @click="tabSwitch(2)">地块配置信息</label>
          </div>
          <!-- 项目概况 -->
          <project-msg v-show="tab===1" :data="pmData" ref="project_msg_data"></project-msg>
          <!-- 地块配置信息 -->
          <land-set v-show="tab===2" :data="lsData" ref="land_set_data"></land-set>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import ProjectMsg from './components/projectMag';
import LandSet from './components/landSet';
import Parcel from '../../../apis/apis/parcel';
import GlobalApi from '@/apis/apis/global';

export default {
  name: 'CreateParcel',
  props: ['open', 'id'],
  components: {
    Parcel,
    ProjectMsg,
    LandSet,
  },
  data() {
    return {
      projectList: [],
      tab: 1,
      info: {
        project_name: null, // 项目名称
        version: null, // 版本
      },
      pmData: null, //项目概况数据
      lsData: null, //地块配置信息数据
      readonly: false, //只读状态
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
    id(nv, v) {
      this.tab = 1;
      if(nv) {
        this.readonly = true;
        this.getList()
      }else{
        this.readonly = false;
        this.resetData()
      }
    }
  },
  mounted() {

  },
  beforeDestroy() {
    
  },
  methods: {
    tabSwitch(n) {
      this.tab = n;
    },
    cancel() {
      this.fast = false;
      this.resetData();
    },
    resetData() {
      this.tab = 1;
      this.pmData = null;
      this.$refs.project_msg_data.resetData();
      this.lsData = null;
      this.$refs.land_set_data.resetData();
      this.info = {
        project_name: null,
        version: null,
      }
    },
    // 加载详情
    getList() {
      Parcel.findDetail({land_id: this.id}).then(res => {
        console.log(res)
        if(res.code === 200 && res.result){
          this.pmData = {
            lands: res.result.module.lands,
            others: res.result.module.others,
          };
          this.lsData = {
            config: res.result.config
          };
          this.info = res.result.info;
        }
      })
    },
    getProList() {
      GlobalApi.getProjectList().then(res => {
        console.log("proList:",res)
        if(res.code === 200 && res.result){
          this.projectList = res.result.data
        }
      })
    },
    // 提交
    submit() {
      if(!this.info.project_name) {
        this.$message.error('请选择项目名称')
        return
      }
      if(!this.info.version) {
        this.$message.error('请输入版本')
        return
      }
      let data= {
        json_data: {
          info: this.info,
          module: {
            lands: this.$refs.project_msg_data.lands,
            others: this.$refs.project_msg_data.others,
          },
          config: this.$refs.land_set_data.config
        }
      } 
      console.log(data.json_data)
      const params = { 
        post_data: JSON.stringify(data)
      }
      console.log(this.id)
      if(this.id) {
        // 修改
        Parcel.update(params).then(res => {
          console.log("地块更新:",res)
          if(res.code === 200) {
            this.$emit('close', {
              fast: false,
              reload: true
            })
            this.resetData();
          }
        })
      }else{
        // 新建
        Parcel.add(params).then(res => {
          console.log("地块新增:",res)
          if(res.code === 200) {
            this.$emit('close', {
              fast: false,
              reload: true
            })
            this.resetData();
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@styles/common.scss';
span{
  font-size: 14px;
}
.dialog-close-icon{
  right: 1141px;
}
</style>
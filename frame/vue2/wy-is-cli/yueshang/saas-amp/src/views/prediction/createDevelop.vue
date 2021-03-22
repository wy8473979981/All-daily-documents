<template>
  <div>
    <el-drawer
      :visible.sync="fast"
      direction="rtl"
      :append-to-body="true"
      :withHeader="false"
      size="1155px">
      <div class="dialog-close-icon" @click="fast=false">
        <i></i>
      </div>
      <div class="detail">
        <el-row class="fast-top-bar" type="flex" justify="space-between" align="middle">
          <el-col>
            <h3 v-show="!id">新建开发新项目</h3>
            <h3 v-show="id">编辑开发新项目</h3>
          </el-col>
          <el-col style="text-align: right;">
            <el-button type="success" @click="submit">提交</el-button>
            <!-- <el-button plain @click="fast=false">暂存</el-button> -->
            <el-button plain @click="fast=false">取消</el-button>
          </el-col>
        </el-row>
        <div class="con">
          <div>
            <el-row :gutter="20" style="margin-top:30px;">
              <el-col :span="6">
                <div class="d-min">
                  <span>方案名称</span>
                  <el-input class="required" v-model="info.version" placeholder="请输入"></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="d-min">
                  <span>类别</span>
                  <el-input v-model="info.version" placeholder="请输入" readonly></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="d-min">
                  <span>项目</span>
                  <el-select class="required" clearable v-model="info.project_name" placeholder="请选择">
                    <el-option
                      v-for="item in projectList"
                      :key="item.cate_id"
                      :label="item.cate_name"
                      :value="item.cate_id">
                    </el-option>
                  </el-select>
                </div>
              </el-col>
            </el-row>
          </div>
          <div>
            <h3 class="min-title">核心测算</h3>
            <div class="data-bar">
              <div>
                <el-row :gutter="20">
                  <el-col :span="6">
                    <div class="d-min">
                      <span>IRR(%)</span>
                      <el-input class="required" v-model="info.version" placeholder="请输入"></el-input>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="d-min">
                      <span>净现值(万元)</span>
                      <el-input class="required" v-model="info.version" placeholder="请输入"></el-input>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="d-min">
                      <span>增至(万元)</span>
                      <el-input class="required" v-model="info.version" placeholder="请输入"></el-input>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="d-min">
                      <span>收购价(万元)</span>
                      <el-input class="required" v-model="info.version" placeholder="请输入"></el-input>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div style="margin-top:14px;">
                <el-row :gutter="20">
                  <el-col :span="6">
                    <div class="d-min">
                      <span>贷款(万元)</span>
                      <el-input class="required" v-model="info.version" placeholder="请输入"></el-input>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="d-min">
                      <span>退出年数(年)</span>
                      <el-input class="required" v-model="info.version" placeholder="请输入"></el-input>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
          <!-- 切换 项目概况 / 地块配置信息 -->
          <div class="tab-label">
            <label :class="{'active':tab===1}" @click="tabSwitch(1)">项目概况</label>|
            <label :class="{'active':tab===2}" @click="tabSwitch(2)">关键日期</label>
            <label :class="{'active':tab===3}" @click="tabSwitch(3)">面积</label>
          </div>
          <!-- 项目概况 -->
          <!-- <project-msg v-show="tab===1" :data="pmData" ref="project_msg_data"></project-msg> -->
          <!-- 关键日期 -->
          <!-- <key-date v-show="tab===2" :data="kdData" ref="project_msg_data"></key-date> -->
          <!-- 面积 -->
          <!-- <area-data v-show="tab===3" :data="lsData" ref="land_set_data"></area-data> -->
          <!-- 表数据 -->
          <div>
            <h3 class="min-title">核心测算</h3>
            <table class="input-table">
              <thead>
                <tr>
                  <th></th>
                  <th>合计</th>
                  <th>第1年</th>
                  <th>第2年</th>
                  <th>第3年</th>
                </tr>
              </thead>
              <tbody>
                <!-- 地块类型 -->
                <tr>
                  <td width="150px">NOI(万元)</td>
                  <td v-for="(item, index) in test" :key="index">
                    <el-input v-model="item.aaa" placeholder="请输入"></el-input>
                  </td>
                </tr>
                <!-- 用地面积（m²） -->
                <tr>
                  <td>ROI</td>
                  <td v-for="(item, index) in test" :key="index">
                    <el-input v-model="item.bbb" placeholder="请输入"></el-input>
                  </td>
                </tr>
                <!-- 地上建筑面积（m²） -->
                <tr>
                  <td>总经营费用(万元)</td>
                  <td v-for="(item, index) in test" :key="index">
                    <el-input v-model="item.ccc" placeholder="请输入"></el-input>
                  </td>
                </tr>
                <!-- 平均容积率（%） -->
                <tr>
                  <td>折旧摊销(万元)</td>
                  <td v-for="(item, index) in test" :key="index">
                    <el-input v-model="item.ddd" placeholder="请输入" readonly></el-input>
                  </td>
                </tr>
                <!-- 地下建筑面积合计（m²） -->
                <tr>
                  <td>税(万元)</td>
                  <td v-for="(item, index) in test" :key="index">
                    <el-input v-model="item.eee" placeholder="请输入"></el-input>
                  </td>
                  <td></td>
                </tr>
                <!-- 土地出让金（亿元） -->
                <tr>
                  <td>EBITDA</td>
                  <td v-for="(item, index) in test" :key="index">
                    <el-input v-model="item.fff" placeholder="请输入"></el-input>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- 表数据 -->
          <div>
            <h3 class="min-title">总收入</h3>
            <table class="input-table">
              <thead>
                <tr>
                  <th></th>
                  <th>合计</th>
                  <th>第1年</th>
                  <th>第2年</th>
                  <th>第3年</th>
                </tr>
              </thead>
              <tbody>
                <!-- 地块类型 -->
                <tr>
                  <td width="150px">租金(万元)</td>
                  <td v-for="(item, index) in test" :key="index">
                    <el-input v-model="item.aaa" placeholder="请输入"></el-input>
                  </td>
                </tr>
                <!-- 用地面积（m²） -->
                <tr>
                  <td>物管(万元)</td>
                  <td v-for="(item, index) in test" :key="index">
                    <el-input v-model="item.bbb" placeholder="请输入"></el-input>
                  </td>
                </tr>
                <!-- 地上建筑面积（m²） -->
                <tr>
                  <td>多经(万元)</td>
                  <td v-for="(item, index) in test" :key="index">
                    <el-input v-model="item.ccc" placeholder="请输入"></el-input>
                  </td>
                </tr>
                <!-- 平均容积率（%） -->
                <tr>
                  <td>总收入</td>
                  <td v-for="(item, index) in test" :key="index">
                    <el-input v-model="item.ddd" placeholder="请输入" readonly></el-input>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- 表数据 -->
          <div>
            <h3 class="min-title">销售所得分析</h3>
            <table class="input-table">
              <thead>
                <tr>
                  <th></th>
                  <th>第1年</th>
                </tr>
              </thead>
              <tbody>
                <!-- 地块类型 -->
                <tr>
                  <td width="150px">销售价格(元)</td>
                  <td v-for="(item, index) in test2" :key="index">
                    <el-input v-model="item.aaa" placeholder="请输入"></el-input>
                  </td>
                </tr>
                <!-- 用地面积（m²） -->
                <tr>
                  <td>销售成本(元)</td>
                  <td v-for="(item, index) in test2" :key="index">
                    <el-input v-model="item.bbb" placeholder="请输入"></el-input>
                  </td>
                </tr>
                <!-- 平均容积率（%） -->
                <tr>
                  <td>贷款余额(元)</td>
                  <td v-for="(item, index) in test2" :key="index">
                    <el-input v-model="item.ddd" placeholder="请输入" readonly></el-input>
                  </td>
                </tr>
                <!-- 地上建筑面积（m²） -->
                <tr>
                  <td>净销售所得(元)</td>
                  <td v-for="(item, index) in test2" :key="index">
                    <el-input v-model="item.ccc" placeholder="请输入"></el-input>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- 表数据 -->
          <div>
            <h3 class="min-title">贷款</h3>
            <table class="input-table">
              <thead>
                <tr>
                  <th></th>
                  <th>第1年</th>
                </tr>
              </thead>
              <tbody>
                <!-- 地块类型 -->
                <tr>
                  <td width="150px">还款额(元)</td>
                  <td v-for="(item, index) in test2" :key="index">
                    <el-input v-model="item.aaa" placeholder="请输入"></el-input>
                  </td>
                </tr>
                <!-- 用地面积（m²） -->
                <tr>
                  <td>本金(元)</td>
                  <td v-for="(item, index) in test2" :key="index">
                    <el-input v-model="item.bbb" placeholder="请输入"></el-input>
                  </td>
                </tr>
                <!-- 平均容积率（%） -->
                <tr>
                  <td>利息(元)</td>
                  <td v-for="(item, index) in test2" :key="index">
                    <el-input v-model="item.ddd" placeholder="请输入" readonly></el-input>
                  </td>
                </tr>
                <!-- 地上建筑面积（m²） -->
                <tr>
                  <td>剩余贷款本金(元)</td>
                  <td v-for="(item, index) in test2" :key="index">
                    <el-input v-model="item.ccc" placeholder="请输入"></el-input>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- 表数据 -->
          <div>
            <h3 class="min-title">输出资本化率</h3>
            <table class="input-table">
              <thead>
                <tr>
                  <th></th>
                  <th>第1年</th>
                </tr>
              </thead>
              <tbody>
                <!-- 地块类型 -->
                <tr>
                  <td width="150px">输出资本化率(%)</td>
                  <td v-for="(item, index) in test2" :key="index">
                    <el-input v-model="item.aaa" placeholder="请输入"></el-input>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- 表数据 -->
          <div>
            <h3 class="min-title">目标利润率</h3>
            <table class="input-table">
              <thead>
                <tr>
                  <th></th>
                  <th>第1年</th>
                </tr>
              </thead>
              <tbody>
                <!-- 地块类型 -->
                <tr>
                  <td width="150px">目标利润率(%)</td>
                  <td v-for="(item, index) in test2" :key="index">
                    <el-input v-model="item.aaa" placeholder="请输入"></el-input>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- 表数据 -->
          <div>
            <h3 class="min-title">折现率</h3>
            <table class="input-table">
              <thead>
                <tr>
                  <th></th>
                  <th>第1年</th>
                </tr>
              </thead>
              <tbody>
                <!-- 地块类型 -->
                <tr>
                  <td width="150px">折现率(%)</td>
                  <td v-for="(item, index) in test2" :key="index">
                    <el-input v-model="item.aaa" placeholder="请输入"></el-input>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
const test = [
  {aaa:'1',bbb:'AMP资产分析项目名称1',ccc:'1F沙盒模拟',ddd:'78.56',eee:'32.68',fff:'16.9%'},
  {aaa:'1',bbb:'AMP资产分析项目名称1',ccc:'1F沙盒模拟',ddd:'78.56',eee:'32.68',fff:'16.9%'},
  {aaa:'1',bbb:'AMP资产分析项目名称1',ccc:'1F沙盒模拟',ddd:'78.56',eee:'32.68',fff:'16.9%'},
  {aaa:'1',bbb:'AMP资产分析项目名称1',ccc:'1F沙盒模拟',ddd:'78.56',eee:'32.68',fff:'16.9%'}
]
const test2 = [
  {aaa:'1',bbb:'AMP资产分析项目名称1',ccc:'1F沙盒模拟',ddd:'78.56',eee:'32.68',fff:'16.9%'}
]
// import ProjectMsg from './components/projectMag';
// import KeyDate from './components/keyData';
// import AreaData from './components/areaData';
// import Prediction from '../../apis/apis/prediction'

export default {
  name: 'CreateParcel',
  props: ['open', 'id'],
  components: {
    // ProjectMsg,
    // KeyDate,
    // AreaData,
  },
  data() {
    return {
      projectList: this.$store.state.landType,
      tab: 1,
      test: [...test],
      test2: [...test2],
      info: {
        project_name: null, // 项目名称
        version: null, // 版本
      },
      pmData: null, //项目概况数据
      kdData: null, //项目概况数据
      lsData: null, //地块配置信息数据
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
        this.$emit('close', val)
      }
    }
  },
  watch: {
    id(nv, v) {
      this.tab = 1;
      if(nv) {
        this.getList()
      }else{
        this.pmData = null;
        this.lsData = null;
        this.info = {
          project_name: null,
          version: null,
        }
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
    // 加载详情
    getList() {
      // Prediction.findDetail({land_id: this.id}).then(res => {
      //   console.log(res)
      //   if(res.code === 200 && res.result){
      //     this.pmData = {
      //       lands: res.result.module.lands,
      //       others: res.result.module.others,
      //     };
      //     this.lsData = {
      //       config: res.result.config
      //     };
      //     this.info = res.result.info;
      //   }
      // })
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
      console.log(this.$refs.project_msg_data)
      console.log(this.$refs.land_set_data)
      const params = {
        json_data: {
          info: this.info,
          module: {
            lands: this.$refs.project_msg_data.lands,
            others: this.$refs.project_msg_data.others,
          },
          config: this.$refs.land_set_data.config
        }
      }
      console.log(params)
      // if(this.id) {
      //   // 修改
      //   Prediction.update(params).then(res => {
      //     console.log("地块更新:",res)
      //   })
      // }else{
      //   // 新建
      //   Prediction.add(params).then(res => {
      //     console.log("地块新增:",res)
      //     // this.fast = false;
      //   })
      // }
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
.detail{
  .fast-top-bar{
    padding: 0 20px;
    height: 74px;
    align-items: center;
    background-color: #F2F4F6;
    h3{
      font-size: 18px;
      color: #7A8FA4;
    }
    button {
      padding: 0;
      min-width: 80px;
      height: 32px;
      border-radius: 2px;
    }
  }
  ::v-deep .con{
    padding: 0 20px;
    height: calc(100vh - 74px);
    overflow-y: auto;
    >div{
      margin-bottom: 30px;
    }
    .min-title{
      margin-bottom: 20px;
    }
    .el-input__inner{
      height: 36px;
      border-color: transparent;
      background-color: #F2F4F6;
      border-radius: 2px;
    }
    .el-input__inner:focus{
      outline: none;
      border-color: #468CEB;
    }
    .el-select .el-input .el-select__caret{
      line-height: 36px;
    }
    .el-input.is-disabled .el-input__inner{
      background-color: #DFE3E5;
      color: #333;
    }
    .el-date-editor .el-input__icon{
      line-height: 36px;
    }
  }
  .d-min{
    >span{
      display: block;
      font-size: 14px;
      color: #98A9BC;
      margin-bottom: 10px;
    }
  }

}
</style>
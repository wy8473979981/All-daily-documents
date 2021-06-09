
<template>
  <div class="dialogd">
    <!-- 新增弹窗 -->
    <el-dialog
      :title="title"
      :visible.sync="visible"
      :width="width"
      :before-close="handleClose"
    >
      <el-divider></el-divider>
      <div v-if="step == 0">
        <el-form class="colum">
          <div class="df">
            <div class="form">
              <el-form-item label="项目名称">
                <el-select v-model="one" placeholder="请选择项目名称">
                  <el-option
                    v-for="item in [{ id: 1, name: '泉州安溪项目' }]"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="form">
              <el-form-item label="版本编号">
                <el-select v-model="two" placeholder="请选择版本编号">
                  <el-option
                    v-for="item in [{ id: 1, name: 'V1.0' }]"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>

          <div class="df" style="margin-top: -5px">
            <div class="form">
              <el-form-item label="项目业态">
                <el-select v-model="three" placeholder="请选择项目业态">
                  <el-option
                    v-for="item in [{ id: 1, name: '0' }]"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="form">
              <el-form-item label="开业日期">
                <el-select v-model="four" placeholder="请选择开业日期号">
                  <el-option
                    v-for="item in [{ id: 1, name: '' }]"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>

          <div class="df" style="margin-top: -5px">
            <div class="form">
              <el-form-item label="所在省">
                <el-select v-model="five" placeholder="请选择所在省">
                  <el-option
                    v-for="item in [{ id: 1, name: '浙江省' }]"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="form">
              <el-form-item label="所在市">
                <el-select v-model="six" placeholder="请选择所在市">
                  <el-option
                    v-for="item in [{ id: 1, name: '京华市' }]"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>

          <div class="df" style="margin-top: -5px">
            <div class="form">
              <el-form-item label="所在区/县">
                <el-select v-model="seven" placeholder="请选择所在区/县">
                  <el-option
                    v-for="item in [{ id: 1, name: '狮子区' }]"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="form">
              <el-form-item label="事业部">
                <el-select v-model="eight" placeholder="请选择事业部">
                  <el-option
                    v-for="item in [{ id: 1, name: '第三事业部' }]"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>

          <div class="df" style="margin-top: -5px">
            <div class="form">
              <el-form-item label="Mall首年租金单价（元/m/月）">
                <el-select v-model="nine" placeholder="请选择">
                  <el-option
                    v-for="item in [{ id: 1, name: '59' }]"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="form">
              <el-form-item label="首年免租期（月）">
                <el-select v-model="ten" placeholder="请选择">
                  <el-option
                    v-for="item in [{ id: 1, name: '0' }]"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>

          <div class="df" style="margin-top: -5px">
            <div class="form">
              <el-form-item label="次年免租期（月）">
                <el-select v-model="oneone" placeholder="请选择">
                  <el-option
                    v-for="item in [{ id: 1, name: '0' }]"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="form">
              <el-form-item label="第三年免租期（月）">
                <el-select v-model="onetwo" placeholder="请选择">
                  <el-option
                    v-for="item in [{ id: 1, name: '0' }]"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>

          <div class="df" style="margin-top: -5px">
            <div class="form">
              <el-form-item label="退出年限（年）">
                <el-select v-model="onethree" placeholder="请选择">
                  <el-option
                    v-for="item in [{ id: 1, name: '10' }]"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="form">
              <el-form-item label="分摊原则">
                <el-select v-model="onefour" placeholder="请选择">
                  <el-option
                    v-for="item in [{ id: 1, name: '全地价' }]"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>

          <div class="df" style="margin-top: -5px">
            <div class="form">
              <el-form-item label="开发周期（年）">
                <el-select v-model="onefive" placeholder="请选择">
                  <el-option
                    v-for="item in [{ id: 1, name: '3' }]"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="form">
              <el-form-item label="备注">
                <el-input v-model="onesix"></el-input>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>

      <div class="step2" v-if="step == 2">
        <div class="whitebj">
          <header>
            成本项
            <div class="xian"></div>
          </header>
          <div class="bjbody">
            <p>a. 地上商业</p>
            <p>b. 地下商业</p>
            <p>c. 地上下车库</p>
            <p>d. 地上人防车库</p>
            <p>e. 地上非人防车库</p>
            <div>总计: 278929元</div>
          </div>
        </div>
        <div class="whitebj">
          <header>
            进度及其他假设
            <div class="xian"></div>
          </header>
          <div class="bjbody">
            <p>施工进度</p>
            <p>整场租金递增率</p>
            <p>平均租金单价（元）</p>
            <p>正常出租率</p>
            <p>多经停车场占租金比例</p>
            <p>多经停车场占分成比例</p>
          </div>
        </div>
        <div class="whitebj" style="height: 346px">
          <header>
            取费假设
            <div class="xian"></div>
          </header>
          <div class="bjbody">
            <p>专项维保基金（Capex）</p>
            <p>信息维护费</p>
            <p>开办费</p>
            <p>前端服务费</p>
            <p>筹备期推广费</p>
            <p>招商佣金</p>
            <p>租金管理费</p>
            <p>企划旺场费</p>
          </div>
        </div>
        <div class="whitebj" style="height: 346px">
          <header>
            财务假设
            <div class="xian"></div>
          </header>
          <div class="bjbody">
            <p>房产税</p>
            <p>增值税及附加</p>
            <p>退出费用</p>
            <p>折现率初始化</p>
            <p>资本化率</p>
          </div>
        </div>
      </div>

      <div class="step3" v-if="step == 1">
        <div class="table">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="num" width="50" label="序号"> </el-table-column>
            <el-table-column prop="one" width="70" label="指标"></el-table-column>
            <el-table-column prop="three" width="110" label="权重">
              <div slot-scope="scope">
                <el-input v-model="scope.row.three">
                  <span slot="suffix">%</span>
                </el-input>
              </div>
            </el-table-column>
            <el-table-column prop="two" width="280px" label="指标分级">
              <div slot-scope="scope">
                <div v-if="scope.$index == 0" class="two">
                  <div>
                    <p>商圈和行</p>
                    <p>{{scope.row.two.t1}}</p>
                  </div>
                  <div>
                    <p>社区核心</p>
                    <p>{{scope.row.two.t2}}</p>
                  </div>
                  <div>
                    <p>商圈边缘</p>
                    <p>{{scope.row.two.t3}}</p>
                  </div>
                  <div>
                    <p>社区边缘</p>
                    <p>{{scope.row.two.t4}}</p>
                  </div>
                </div>
                <div v-if="scope.$index == 1" class="two">
                  <div>
                    <p>换乘节点</p>
                    <p>{{scope.row.two.t1}}</p>
                  </div>
                  <div>
                    <p>单线节点</p>
                    <p>{{scope.row.two.t2}}</p>
                  </div>
                  <div>
                    <p>暂规划</p>
                    <p>{{scope.row.two.t3}}</p>
                  </div>
                  <div>
                    <p>不临时站点</p>
                    <p>{{scope.row.two.t4}}</p>
                  </div>
                </div>
                <div v-if="scope.$index == 2" class="two">
                  <div>
                    <p>大于65%</p>
                    <p>{{scope.row.two.t1}}</p>
                  </div>
                  <div>
                    <p>大于55%</p>
                    <p>{{scope.row.two.t2}}</p>
                  </div>
                  <div>
                    <p>大于45%</p>
                    <p>{{scope.row.two.t3}}</p>
                  </div>
                  <div>
                    <p>小于45%</p>
                    <p>{{scope.row.two.t4}}</p>
                  </div>
                </div>
                <div v-if="scope.$index == 3" class="two">
                  <div>
                    <p>小于5%</p>
                    <p>{{scope.row.two.t1}}</p>
                  </div>
                  <div>
                    <p>小于15%</p>
                    <p>{{scope.row.two.t2}}</p>
                  </div>
                  <div>
                    <p>小于25%</p>
                    <p>{{scope.row.two.t3}}</p>
                  </div>
                  <div>
                    <p>大于25%</p>
                    <p>{{scope.row.two.t4}}</p>
                  </div>
                </div>
                <div v-if="scope.$index == 4" class="two">
                  <div>
                    <p>单一无3</p>
                    <p>{{scope.row.two.t1}}</p>
                  </div>
                  <div>
                    <p>单一有3</p>
                    <p>{{scope.row.two.t2}}</p>
                  </div>
                  <div>
                    <p>非单一</p>
                    <p>{{scope.row.two.t3}}</p>
                  </div>
                  <div>
                    <p>多产权</p>
                    <p>{{scope.row.two.t4}}</p>
                  </div>
                </div>

              </div>
            </el-table-column>
            <el-table-column prop="four" label="指标分级">
              <div slot-scope="scope">
                <div class="four">
                  <div class="head">
                    <span>商圈核心</span>
                    <i class="el-icon-caret-bottom"></i>
                  </div>
                  <div class="num">{{scope.row.four}}</div>
                </div>
              </div>
            </el-table-column>
          </el-table>
        </div>

        <div class="total">
          <div class="num">
            <p>汇总</p>
            <div>100%</div>
          </div>

          <div class="num">
            <p>综合指标算值</p>
            <div>0.00%</div>
          </div>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button class="leftbtn" @click="leftBtn">{{
          leftBtnText
        }}</el-button>
        <el-button type="primary" @click="rightBtn">{{
          rightBtnText
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "moneyDialog",
  props: {
    dialogVisible: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      one: 1,
      two: 1,
      three: 1,
      four: 1,
      five: 1,
      six: 1,
      seven: 1,
      eight: 1,
      nine: 1,
      ten: 1,
      oneone: 1,
      onetwo: 1,
      onethree: 1,
      onefour: 1,
      onefive: 1,
      onesix: "",
      visible: false,
      step: 0,
      leftBtnText: "下一步 项目综合指标",
      rightBtnText: "完成",
      width: "607px",

      tableData:[
        {
          num:1,
          one:'位置',
          two:{
            t1:0,
            t2:5,
            t3:15,
            t4:20,
          },
          three:'20.00',
          four:'0.00%'
        },{
          num:1,
          one:'轨交',
          two:{
            t1:0,
            t2:5,
            t3:15,
            t4:20,
          },
          three:'20.00',
          four:'0.00%'
        },{
          num:1,
          one:'使用率',
          two:{
            t1:0,
            t2:5,
            t3:15,
            t4:20,
          },
          three:'20.00',
          four:'0.00%'
        },{
          num:1,
          one:'周边空置率',
          two:{
            t1:0,
            t2:5,
            t3:15,
            t4:20,
          },
          three:'20.00',
          four:'0.00%'
        },{
          num:1,
          one:'产权',
          two:{
            t1:0,
            t2:5,
            t3:15,
            t4:20,
          },
          three:'20.00',
          four:'0.00%'
        }
      ]
    };
  },
  watch: {
    dialogVisible() {
      this.visible = this.dialogVisible;
    },
  },
  created() {
    this.step = 0
    this.leftBtnText = '下一步 项目综合指标',
    this.rightBtnText = '完成'
  },
  methods: {
    leftBtn() {
      switch (this.step) {
        case 0:
          this.step = 1;
          this.leftBtnText = "上一步";
          this.rightBtnText = "下一步 测算";
          this.width = "700px";
          break;
        case 1:
          this.step = 0;
          this.leftBtnText = "下一步 项目综合指标";
          this.rightBtnText = "完成";
          this.width = "607px";
          break;
        case 2:
          this.step = 0;
          this.leftBtnText = "下一步 项目综合指标";
          this.rightBtnText = "完成";
          this.width = "607px";
          break;
        default:
          break;
      }
    },
    rightBtn() {
      switch (this.step) {
        case 0:
          this.handleClose();
          break;
        case 1:
          this.step = 2;
          this.leftBtnText = "下一步 项目信息确认";
          this.rightBtnText = "完成";
          this.width = "567px";
          break;
        case 2:
          this.handleClose();
          break;
        default:
          break;
      }
    },
    handleClose() {
      this.$emit("update:dialogVisible", false);
    },
  },
};
</script>

<style lang="scss" scoped>
@import './basicInforEntryDialog.scss'
</style>
<template>
  <div class="left-detail-container">
    <el-scrollbar style="height: 100%">
      <div class="left-content">
        <div class="investment-content content-area">
          <div class="investment-title">
            <el-row>
              <el-col :span="12">
                <div class="title">招商</div>
              </el-col>
              <el-col :span="12">
                <div class="title-right">
                  <!-- <el-button size="mini" round>超小按钮</el-button> -->
                  <div class="right-detail" @click="handlePushRouter('InvestmentPromotionRanking')">进入详情</div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="investment-data-content">
            <div v-for="item in [{id: 1, name: '全场出租率', value: homeState.zs.qcczl.ccl, tb: homeState.zs.qcczl.ccltb}, {id: 2, name: '全场开业率', value: homeState.zs.qckyl.kyl, tb: homeState.zs.qckyl.kyltb}]" :key="item.id" class="investment-data">
              <p>{{ item.name }}</p>
              <div class="income-data-icon clearfix">
                <div class="left fl"> {{ item.value }} </div>
                <div class="right fl"><svg-icon :icon-class="filterClassOrData(item.tb, true)" class="icon" /><span :class="filterClassOrData(item.tb, true)">{{ filterClassOrData(item.tb, false) }}%</span></div>
              </div>
            </div>
          </div>
          <div class="investment-echarts">
            <CommonTitle
              :around-list="aroundList"
              @click="handlePlusClick"
            />
            <ysn-ring-graph
              v-if="homeState.zs.kh.ccltb"
              name="考核"
              :list="[{
                label: '当月考核出租率',
                rate: homeState.zs.kh.ccltb,
                value: homeState.zs.kh.cclData
              },{
                label: '当月考核开业率',
                rate: homeState.zs.kh.kylbt,
                value: homeState.zs.kh.kylData
              }]"
            />
          </div>
          <div class="investment-rent">
            <CommonTitle
              :around-list="aroundList"
              title="平均租金(权责)"
              @click="handlePlusClick"
            />
            <div class="income-data-icon clearfix pl-8">
              <div class="left fl">87</div>
              <div class="left fl" style="font-size: 14px;padding-top: 5px">元/㎡/月</div>
              <div class="right fl" style="font-size: 14px;padding-top: 6px">
                <svg-icon :icon-class="filterClassOrData(homeState.zs.pjzj.pjzjtb, true)" class="icon" />
                <span :class="filterClassOrData(homeState.zs.pjzj.pjzjtb, true)">{{ filterClassOrData(homeState.zs.pjzj.pjzjtb, false) }}%</span>
              </div>
            </div>
          </div>
        </div>
        <div class="income-content content-area content-area--income">
          <div class="income-title">
            <el-row>
              <el-col :span="12">
                <div class="title">收入<span class="title-unit">(万元)</span></div>
              </el-col>
              <el-col :span="12">
                <div class="title-right">
                  <!-- <el-button size="mini" round>超小按钮</el-button> -->
                  <div class="right-detail" @click="handlePushRouter('IncomeRanking')">进入详情</div>
                </div>
              </el-col>
            </el-row>
          </div>
          <p />
          <div v-for="(item, index) in homeState.sr.srData" :key="index" class="income-echarts">
            <CommonTitle
              :around-list="aroundList"
              :title="item.title"
              @click="handlePlusClick"
            />
            <!-- 先用0 测试无比率效果  -->
            <ysn-ring-graph
              :name="item.title"
              :list="[{
                title: item.titleLeft,
                amount: item.leftData,
                range: item.leftDataBt, // item.leftDataBt
                label: '收缴率',
                rate: item.leftDataBt, // item.leftDataBt
                value: item.leftDataHb
              },{
                title: item.titleRight,
                amount: item.rightData,
                range: 0,//item.rightDataBt,
                label: '收缴率',
                rate: 0,//item.rightDataBt,
                value: item.rightDataHb
              }]"
            />
          </div>
        </div>
        <div class="arrearage-content content-area content-area--arrearage">
          <div class="income-title">
            <el-row>
              <el-col :span="12">
                <div class="title">客流<span class="title-unit">(万人)</span></div>
              </el-col>
              <el-col :span="12">
                <div class="title-right">
                  <!-- <el-button size="mini" round>超小按钮</el-button> -->
                  <div class="right-detail" @click="handlePushRouter('CustomerFlowRank')">进入详情</div>
                </div>
              </el-col>
            </el-row>
          </div>
          <p />
          <CommonTitle
            :around-list="aroundList"
            title="客流"
            @click="handlePlusClick"
          />
          <div class="pass-info-top clearfix">
            <div class="left fl">
              <div class="title">昨日总人数</div>
              <div class="info">
                <span>{{ homeState.keliu.zuori }}</span>
                <svg-icon :icon-class="filterClassOrData(homeState.keliu.zuoritb, true)" class="icon" />
                <span :class="filterClassOrData(homeState.keliu.zuoritb, true)">{{ filterClassOrData(homeState.keliu.zuoritb, false) }}%</span>
              </div>
            </div>
            <div class="right fr pr-48">
              <div class="title">当日总人数</div>
              <div class="info">{{ homeState.keliu.dangri }}</div>
            </div>
          </div>
          <div class="pass-info-bottom clearfix">
            <div class="left fl">
              <div class="title">当月总人数</div>
              <div class="info">
                <span>{{ homeState.keliu.dangyue }}</span>
                <svg-icon :icon-class="filterClassOrData(homeState.keliu.dangyuetb, true)" class="icon" />
                <span :class="filterClassOrData(homeState.keliu.dangyuetb, true)">{{ filterClassOrData(homeState.keliu.dangyuetb, false) }}%</span>
              </div>
            </div>
            <div class="right fr pr-48">
              <div class="title">当年总人数</div>
              <div class="info">{{ homeState.keliu.dangnian }}</div>
            </div>
          </div>
        </div>
        <div class="sale-flow-content content-area content-area--sale-flow">
          <div class="income-title">
            <el-row>
              <el-col :span="12">
                <div class="title">销售<span class="title-unit">(万元)</span></div>
              </el-col>
              <el-col :span="12">
                <div class="title-right">
                  <!-- <el-button size="mini" round>超小按钮</el-button> -->
                  <div class="right-detail" @click="handlePushRouter('SaleRanking')">进入详情</div>
                </div>
              </el-col>
            </el-row>
          </div>
          <p />
          <CommonTitle
            :around-list="aroundList"
            title="销售"
            @click="handlePlusClick"
          />
          <div class="pass-info">
            <div class="yesterday">
              <div class="title">昨日总销售额</div>
              <div class="info">
                <span>{{ homeState.xiaoshou.zuori }}</span>
                <svg-icon :icon-class="filterClassOrData(homeState.xiaoshou.zuoritb, true)" class="icon" />
                <span :class="filterClassOrData(homeState.xiaoshou.zuoritb, true)">{{ filterClassOrData(homeState.xiaoshou.zuoritb, false) }}%</span>
              </div>
            </div>
            <div class="month">
              <div class="title">当月总销售额</div>
              <div class="info">
                <span>{{ homeState.xiaoshou.dangyue }}</span>
                <svg-icon :icon-class="filterClassOrData(homeState.xiaoshou.dangyuetb, true)" class="icon" />
                <span :class="filterClassOrData(homeState.xiaoshou.dangyuetb, true)">{{ filterClassOrData(homeState.xiaoshou.dangyuetb, false) }}%</span>
              </div>
            </div>
            <div class="year-content clearfix">
              <div class="year-left fl">
                <div class="title">当年累计销售额</div>
                <div class="info">{{ homeState.xiaoshou.dangnian }}</div>
              </div>
              <div class="year-right fl">
                <div class="title">月销售平效</div>
                <div class="info">{{ homeState.xiaoshou.yuexiaoshou }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="car-flow-content content-area content-area--car-flow">
          <div class="income-title">
            <el-row>
              <el-col :span="12">
                <div class="title">车流</div>
              </el-col>
              <el-col :span="12">
                <div class="title-right">
                  <!-- <el-button size="mini" round>超小按钮</el-button> -->
                  <div class="right-detail" @click="handlePushRouter('CarFlowRank')">进入详情</div>
                </div>
              </el-col>
            </el-row>
          </div>
          <p />
          <CommonTitle
            :around-list="aroundList"
            title="车流"
            @click="handlePlusClick"
          />
          <div class="pass-info">
            <div class="yesterday">
              <div class="title">昨日车流</div>
              <div class="info">
                <span>{{ homeState.cheliu.zuori }}</span>
                <svg-icon :icon-class="filterClassOrData(homeState.cheliu.zuoritb, true)" class="icon" />
                <span :class="filterClassOrData(homeState.cheliu.zuoritb, true)">{{ filterClassOrData(homeState.cheliu.zuoritb, false) }}%</span>
              </div>
            </div>
            <div class="month">
              <div class="title">当月车流</div>
              <div class="info">
                <span>{{ homeState.cheliu.dangyue }}万</span>
                <svg-icon :icon-class="filterClassOrData(homeState.cheliu.dangyuetb, true)" class="icon" />
                <span :class="filterClassOrData(homeState.cheliu.dangyuetb, true)">{{ filterClassOrData(homeState.cheliu.dangyuetb, false) }}%</span>
              </div>
            </div>
            <div class="year">
              <div class="title">当年车流</div>
              <div class="info">{{ homeState.cheliu.dangnian }}万</div>
            </div>
          </div>
        </div>
        <div class="arrearage-content content-area content-area--arrearagean">
          <div class="income-title">
            <el-row>
              <el-col :span="12">
                <div class="title">欠费<span class="title-unit">(万元)</span></div>
              </el-col>
              <el-col :span="12">
                <div class="title-right">
                  <!-- <el-button size="mini" round>超小按钮</el-button> -->
                  <div class="right-detail" @click="handlePushRouter('ArrearageRank')">进入详情</div>
                </div>
              </el-col>
            </el-row>
          </div>
          <p />
          <div class="history-arrearage clearfix">
            <div class="left fl">
              <div class="title">历史欠费</div>
              <div class="info">{{ homeState.qianfei.lishi }}</div>
            </div>
            <div class="right fl">
              <div class="title">当年累计欠费</div>
              <div class="info">{{ homeState.qianfei.dangnian }}</div>
            </div>
          </div>
        </div>
        <div class="vip-content content-area content-area--vip">
          <div class="income-title">
            <el-row>
              <el-col :span="12">
                <div class="title">会员</div>
              </el-col>
              <el-col :span="12">
                <div class="title-right">
                  <!-- <el-button size="mini" round>超小按钮</el-button> -->
                  <div class="right-detail" @click="handlePushRouter('VipRank')">进入详情</div>
                </div>
              </el-col>
            </el-row>
          </div>
          <p />
          <CommonTitle
            :around-list="aroundList"
            title="会员"
            @click="handlePlusClick"
          />
          <div class="vip-info">
            <div class="yesterday">
              <div class="title">昨日新增</div>
              <div class="info">
                <span>{{ homeState.huiyuan.zuori }}</span>
                <svg-icon :icon-class="filterClassOrData(homeState.huiyuan.zuiritb, true)" class="icon" />
                <span :class="filterClassOrData(homeState.huiyuan.zuiritb, true)"> {{ filterClassOrData(homeState.huiyuan.zuiritb, false) }}% </span>
              </div>
            </div>
            <div class="month">
              <div class="title">当月新增</div>
              <div class="info">
                <span>{{ homeState.huiyuan.dangyue }}</span>
                <svg-icon :icon-class="filterClassOrData(homeState.huiyuan.dangyuetb, true)" class="icon" />
                <span :class="filterClassOrData(homeState.huiyuan.dangyuetb, true)">{{ filterClassOrData(homeState.huiyuan.dangyuetb, false) }}%</span>
              </div>
            </div>
            <div class="year-content clearfix">
              <div class="year-left fl">
                <div class="title">当年新增</div>
                <div class="info">{{ homeState.huiyuan.dangnian }}</div>
              </div>
              <div class="year-right fl">
                <div class="title">累计</div>
                <div class="info">{{ homeState.huiyuan.leiji }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="warning-content content-area  content-area--warning">
          <div class="income-title">
            <el-row>
              <el-col :span="12">
                <div class="title">预警</div>
              </el-col>
              <el-col :span="12">
                <div class="title-right">
                  <!-- <el-button size="mini" round>超小按钮</el-button> -->
                  <div class="right-detail" @click="handlePushRouter('EarlyWarning')">进入详情</div>
                </div>
              </el-col>
            </el-row>
          </div>
          <p />
          <CommonTitle
            :around-list="aroundList"
            title="租约到期"
            @click="handlePlusClick"
          />
          <ysn-ring-graph
            v-if="homeState.yujing.leftweilai"
            nowrap
            name="item.title"
            :list="[{
              title: '未来三个月内到期租户(个)',
              amount: homeState.yujing.leftweilai,
              label: '到期品牌占比',
              value: '20'
            },{
              title: '未来三个月内到期总面积(m²)',
              amount: homeState.yujing.rightweilai,
              label: '到期面积占比',
              value: '20'
            }]"
          />
          <!-- <div class="warning-info-content clearfix">
            <div class="info-left fl">
              <div class="title">未来三个月内到 期租户(个)</div>
              <div class="info">{{ homeState.yujing.leftweilai }}</div>
              <div id="warning-left-echarts" />
              <div class="echarts-info">到期品牌占比</div>
            </div>
            <div class="info-right fl">
              <div class="title">未来三个月内到 期总面积(m²)</div>
              <div class="info">{{ homeState.yujing.rightweilai }}</div>
              <div id="warning-right-echarts" />
              <div class="echarts-info">到期面积占比</div>
            </div>
          </div> -->
          <CommonTitle
            :around-list="aroundList"
            title="押不抵租"
            @click="handlePlusClick"
          />
          <div class="warning-info-content clearfix">
            <div class="info-left fl">
              <div class="title">累计差额(万元)</div>
              <div class="info">3,400</div>
            </div>
            <div class="info-right fl">
              <ysn-ring-graph
                nowrap
                name="item.title"
                :list="[{
                  label: '品牌占比数',
                  value: '20'
                }]"
              />
              <!-- <div id="warning-bottom-echarts" />
              <div class="echarts-info" style="padding-left: 5px">品牌占比数</div> -->
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
import CommonTitle from './components/commonTitle'
import ysnRingGraph from './components/ysn-ring-graph'
import { mapState } from 'vuex'
export default {
  components: { CommonTitle, ysnRingGraph },

  props: {
    aroundList: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      homeState: state => state.home.homeState
    })
  },
  methods: {
    // commonTitle 传递数据
    handlePlusClick(data, isPlus) {
      this.$emit('handleAroundMap', data, isPlus)
    },
    handlePushRouter(routeName) {
      this.$router.push({
        name: routeName
      })
    },
    filterClassOrData(res, isClass) {
      if (isClass) {
        return res.includes('-') ? 'down' : 'up'
      }
      return res.includes('-') ? res.substring(1) : res
    }
  }
}
</script>
<style lang="scss" scoped>
$thirdTitle: #575757;
.left-detail-container {
    width: 263px;
    height: 100%;
    padding: 34px 0 0px 0;
    .left-content {
        border-right: 1px solid #E5E2DE;
    }
    .investment-echarts-container,.incom--echarts-container {
        position: relative;
        .position-svg {
            position: absolute;
            top: 47px;
            left: 19px;
            span {
                font-size: 10px;
            }
        }
    }
    .echarts-content {
        padding-left: 8px;
    }
}
.investment-content {
    padding-bottom: 30px;
    .investment-data-content {
        padding-left: 8px;

        padding-bottom: 16px;
    }
    .income-data-icon {
        .left {
            font-size: 20px;
            color: $font-word-color;
        }
        .right {
            padding-top: 6px;
        }
    }
}
.income-title {
    margin: 0 19px 16px 0;
}
.investment-title {
  padding-right: 19px;
}
.investment-title,.income-title {
    .title {
        // padding-left: 8px;
        font-weight: bold;
        font-size: $font-title-size;
        padding-bottom: 11px;
        color: $font-word-color;
        border-bottom: 1px solid $font-word-color;
        margin-top: 2px;
    }
    .title-unit {
        font-size: $font-base-size;
    }
    .title-right {
        height: 34px;
        padding-bottom: 11px;
        border-bottom: 1px solid #D1CEC9;
        text-align: right;
        .right-detail {
            width: 64px;
            line-height: 24px;
            background: #D1CEC9;
            border-radius: 12px;
            font-size: 12px;
            text-align: center;
            cursor: pointer;
            color: #fff;
            display: inline-block;
            &:hover {
                background-color: #1C4C7F;
            }
        }
    }
}
.investment-data,.income-data,.investment-rent {
  p {
    color: $thirdTitle;
    font-size: $font-base-size;
    margin: 12px 0 2px 0;
  }
  &:first-of-type p {
    margin-top: 16px;
  }
  .left-data {
    color: $font-word-color;
    height: 30px;
    font-size: $font-record-size;
  }
  .right-data {
    height: 30px;
    font-size: $font-base-size;
    color: #485F47;
    padding-top: 10px;
  }
}
.income-data {
    padding-bottom: 0;
    padding-left: 8px;
    .income-data-icon {
        .left {
            font-size: 20px;
            color: $font-word-color;
        }
        .right {
            padding-top: 7px;
        }
    }
}
.income-content {
    .income-data {

        .incom-text {
            margin: 8px 0;
            font-size: $font-base-size;
            color: $font-word-color;
        }
    }

}
.investment-echarts {
    .investment-info {
        font-size: $font-base-size;
        color: $font-word-color;
        width: 80px;
        text-align: center;
        padding-bottom: 16px;
    }
    #investment-left-echarts {
        margin-top: 8px;
        margin-bottom: 4px;
        width: 90px;
        height: 90px;
    }
    #investment-right-echarts {
        margin-top: 8px;
        margin-bottom: 4px;
        width: 90px;
        height: 90px;
    }
}
.income-echarts {
    #income-left-echarts {
        margin-top: 17px;
        margin-bottom: 5px;
        width: 90px;
        height: 90px;
    }
    #income-right-echarts {
        margin-top: 17px;
        margin-bottom: 5px;
        width: 90px;
        height: 90px;
    }
    .income-echarts-info {
        font-size: $font-base-size;
        color: $font-word-color;
        padding-bottom: 16px;
        padding-left: 18px;
    }
}
.pass-info,.history-arrearage,.vip-info,.warning-info-content {
  padding-bottom: 11px;
  margin-top: 8px;
  padding-left: 8px;
  .title {
    font-size: $font-base-size;
    color: $thirdTitle;
    margin-bottom: 4px;
  }
  .info {
    font-size: 20px;
    color: $font-word-color;
    margin-bottom: 12px;
    .icon,
    .up,
    .down {
      font-size: $font-base-size;
    }
  }
  .year-content {
    .year-left {
      margin-right: 28px;
    }
  }
}
.history-arrearage {
    .left {
        margin-right: 62px;
    }
}
.vip-content {
    .year-content {
        .year-left {
            margin-right: 62px;
        }
    }
}
.warning-info-content {
    .info-left {
        margin-right: 11px;
    }
    .title {
        width: 110px;
    }
    #warning-left-echarts {
        width: 90px;
        height: 90px;
    }
    #warning-right-echarts {
        width: 90px;
        height: 90px;
    }
    #warning-bottom-echarts {
        width: 90px;
        height: 90px;
    }
    .echarts-info {
        margin-top: 5px;
    }
}
.pass-info-top,.pass-info-bottom {
  padding-left: 8px;
  .title {
    font-size: $font-base-size;
    color: $thirdTitle;
    margin-bottom: 4px;
  }
  .info {
    font-size: 20px;
    color: $font-word-color;
    margin-bottom: 12px;
    .icon,
    .up,
    .down {
      font-size: $font-base-size;
    }
  }
}
.pass-info-top {
  margin-top: 8px;
}
.pass-info-bottom {
  margin-bottom: 12px;
}
.pr-48 {
  padding-right: 48px;
}
::v-deep .el-scrollbar__wrap{
  overflow-x: hidden !important;
}

.content-area {
  padding-bottom: 0;
  margin-bottom: 30px;
  padding-left: 7px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 34px;
    bottom: 4px;
    left: 0;
    width: 1px;
    border-left: 1px dashed #CBCBCB;
  }
  &.content-area--income {
    margin-bottom: 12px;
    &::before {
      bottom: 18px;
    }
  }

  &.content-area--arrearage {
    margin-bottom: 8px;
    &::before {
      bottom: 16px;
    }
  }

  &.content-area--sale-flow {
    margin-bottom: -4px;
    &::before {
      bottom: 28px;
    }
  }

  &.content-area--car-flow{
    margin-bottom: -4px;
    &::before {
      bottom: 28px;
    }
  }

  &.content-area--arrearagean{
    margin-bottom: -4px;
    &::before {
      bottom: 28px;
    }
  }
  &.content-area--vip{
    margin-bottom: -4px;
    &::before {
      bottom: 28px;
    }
  }
  &.content-area--warning{
    margin-bottom: -4px;
    &::before {
      bottom: 34px;
    }
  }
}
</style>

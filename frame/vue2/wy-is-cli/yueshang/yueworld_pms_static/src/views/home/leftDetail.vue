<template>
  <div class="left-detail-container">
    <el-scrollbar style="height: 100%">
      <div class="left-content">
        <div class="investment-content">
          <div class="investment-title">
            <el-row>
              <el-col :span="12">
                <div class="title-left">招商</div>
              </el-col>
              <el-col :span="12">
                <div class="title-right">
                  <!-- <el-button size="mini" round>超小按钮</el-button> -->
                  <div class="right-detail" @click="handlePushRouter('investmentPromotionRanking')">进入详情</div>
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
              @click="handlePlusClick"
            />
            <div class="echarts-content">
              <el-row>
                <el-col :span="12">
                  <div class="investment-echarts-container">
                    <div id="investment-left-echarts" />
                    <div class="investment-info">
                      <div>当月考核</div>
                      <div>出租率</div>
                    </div>
                    <div class="position-svg">
                      <svg-icon :icon-class="filterClassOrData(homeState.zs.kh.ccltb, true)" class="icon" />
                      <span :class="filterClassOrData(homeState.zs.kh.ccltb, true)">{{ filterClassOrData(homeState.zs.kh.ccltb, false) }}%</span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="investment-echarts-container">
                    <div id="investment-right-echarts" />
                    <div class="investment-info">
                      <div>当月考核</div>
                      <div>开业率</div>
                    </div>
                    <div class="position-svg">
                      <svg-icon :icon-class="filterClassOrData(homeState.zs.kh.kylbt, true)" class="icon" />
                      <span :class="filterClassOrData(homeState.zs.kh.kylbt, true)">{{ filterClassOrData(homeState.zs.kh.kylbt, false) }}%</span>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="investment-rent">
            <CommonTitle
              title="平均租金(权责)"
              @click="handlePlusClick"
            />
            <div class="income-data-icon clearfix" style="padding-left: 8px; margin-top: 8px">
              <div class="left fl">{{ homeState.zs.pjzj.pjzjData }}</div>
              <div class="right fl">
                <svg-icon :icon-class="filterClassOrData(homeState.zs.pjzj.pjzjtb, true)" class="icon" />
                <span :class="filterClassOrData(homeState.zs.pjzj.pjzjtb, true)">{{ filterClassOrData(homeState.zs.pjzj.pjzjtb, false) }}%</span>
              </div>
            </div>
          </div>
        </div>
        <div class="income-content">
          <div class="income-title">
            <el-row>
              <el-col :span="12">
                <div class="title-left">收入<span class="title-unit">(万元)</span></div>
              </el-col>
              <el-col :span="12">
                <div class="title-right">
                  <!-- <el-button size="mini" round>超小按钮</el-button> -->
                  <div class="right-detail" @click="handlePushRouter('incomeRanking')">进入详情</div>
                </div>
              </el-col>
            </el-row>
          </div>
          <p />
          <div v-for="(item, index) in homeState.sr.srData" :key="index" class="income-echarts">
            <CommonTitle
              :title="item.title"
              @click="handlePlusClick"
            />
            <div class="income-data">
              <el-row>
                <el-col :span="12">
                  <div class="incom-text">{{ item.titleLeft }}</div>
                  <div class="income-data-icon clearfix">
                    <div class="left fl"> {{ item.leftData }} </div>
                    <div class="right fl">
                      <svg-icon :icon-class="filterClassOrData(item.leftDataBt, true)" class="icon" />
                      <span :class="filterClassOrData(item.leftDataBt, true)">{{ filterClassOrData(item.leftDataBt, false) }}%</span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="incom-text">{{ item.titleRight }}</div>
                  <div class="income-data-icon clearfix">
                    <div class="left fl"> {{ item.rightData }} </div>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="echarts-content">
              <el-row>
                <el-col :span="12">
                  <div id="income-left-echarts" />
                  <div class="income-echarts-info">收缴率</div>
                </el-col>
                <el-col :span="12">
                  <div class="incom--echarts-container">
                    <div id="income-right-echarts" />
                    <div class="income-echarts-info">收缴率</div>
                    <div class="position-svg">
                      <svg-icon :icon-class="filterClassOrData(item.rightDataBt, true)" class="icon" />
                      <span :class="filterClassOrData(item.rightDataBt, true)">{{ filterClassOrData(item.rightDataBt, false) }}%</span>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
        <div class="arrearage-content">
          <div class="income-title">
            <el-row>
              <el-col :span="12">
                <div class="title-left">客流<span class="title-unit">(万人)</span></div>
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
              <div class="title">当月总人数</div>
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
        <div class="sale-flow-content">
          <div class="income-title">
            <el-row>
              <el-col :span="12">
                <div class="title-left">销售<span class="title-unit">(万人)</span></div>
              </el-col>
              <el-col :span="12">
                <div class="title-right">
                  <!-- <el-button size="mini" round>超小按钮</el-button> -->
                  <div class="right-detail" @click="handlePushRouter('saleRanking')">进入详情</div>
                </div>
              </el-col>
            </el-row>
          </div>
          <p />
          <CommonTitle
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
        <div class="car-flow-content">
          <div class="income-title">
            <el-row>
              <el-col :span="12">
                <div class="title-left">车流<span class="title-unit">（万人）</span></div>
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
        <div class="arrearage-content">
          <div class="income-title">
            <el-row>
              <el-col :span="12">
                <div class="title-left">欠费<span class="title-unit">(万元)</span></div>
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
        <div class="vip-content">
          <div class="income-title">
            <el-row>
              <el-col :span="12">
                <div class="title-left">会员</div>
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
        <div class="warning-content">
          <div class="income-title">
            <el-row>
              <el-col :span="12">
                <div class="title-left">预警</div>
              </el-col>
              <el-col :span="12">
                <div class="title-right">
                  <!-- <el-button size="mini" round>超小按钮</el-button> -->
                  <div class="right-detail" @click="handlePushRouter('earlyWarning')">进入详情</div>
                </div>
              </el-col>
            </el-row>
          </div>
          <p />
          <CommonTitle
            title="租约到期"
            @click="handlePlusClick"
          />
          <div class="warning-info-content clearfix">
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
          </div>
          <CommonTitle
            title="押不抵租"
            @click="handlePlusClick"
          />
          <div class="warning-info-content clearfix">
            <div class="info-left fl">
              <div class="title">累计差额(万元)</div>
              <div class="info">3,400</div>
            </div>
            <div class="info-right fl">
              <div id="warning-bottom-echarts" />
              <div class="echarts-info" style="padding-left: 5px">品牌占比数</div>
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
import CommonTitle from './components/commonTitle'
import { mapState } from 'vuex'
export default {
  components: { CommonTitle },
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
.left-detail-container {
    width: 263px;
    height: 100%;
    padding: 34px 0 24px 0;
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

        padding-bottom: 17px;
    }
    .income-data-icon {
        .left {
            font-size: $font-record-size;
            color: $font-word-color;
        }
        .right {
            padding-top: 9px;
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
    .title-left {
        padding-left: 8px;
        font-weight: bold;
        font-size: $font-title-size;
        padding-bottom: 13px;
        color: $font-word-color;
        border-bottom: 1px solid $font-word-color;
    }
    .title-unit {
        font-size: $font-base-size;
    }
    .title-right {
        height: 34px;
        padding-bottom: 13px;
        border-bottom: 1px solid #D1CEC9;
        text-align: right;
        .right-detail {
            width: 64px;
            line-height: 24px;
            background: #E5E2DE;
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
        color: $font-word-color;
        font-size: $font-base-size;
        margin: 16px 0 10px 0;
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
            font-size: $font-record-size;
            color: $font-word-color;
        }
        .right {
            padding-top: 9px;
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
        width: 82px;
        height: 82px;
    }
    #investment-right-echarts {
        margin-top: 8px;
        margin-bottom: 4px;
        width: 82px;
        height: 82px;
    }
}
.income-echarts {
    #income-left-echarts {
        margin-top: 17px;
        margin-bottom: 5px;
        width: 82px;
        height: 82px;
    }
    #income-right-echarts {
        margin-top: 17px;
        margin-bottom: 5px;
        width: 82px;
        height: 82px;
    }
    .income-echarts-info {
        font-size: $font-base-size;
        color: $font-word-color;
        padding-bottom: 16px;
        padding-left: 18px;
    }
}
.pass-info,.history-arrearage,.vip-info,.warning-info-content {
    padding-bottom: 13px;
    margin-top: 8px;
    padding-left: 8px;
    .title {
        font-size: $font-base-size;
        color: $font-word-color;
        margin-bottom: 8px;
    }
    .info {
        font-size: $font-record-size;
        color: $font-word-color;
        margin-bottom: 17px;
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
        margin-right: 23px;
    }
    .title {
        width: 110px;
    }
    #warning-left-echarts {
        width: 82px;
        height: 82px;
    }
    #warning-right-echarts {
        width: 82px;
        height: 82px;
    }
    #warning-bottom-echarts {
        width: 82px;
        height: 82px;
    }
    .echarts-info {
        margin-top: 5px;
    }
}
.pass-info-top,.pass-info-bottom {
  padding-left: 8px;
  .title {
        font-size: $font-base-size;
        color: $font-word-color;
        margin-bottom: 8px;
    }
    .info {
        font-size: $font-record-size;
        color: $font-word-color;
        margin-bottom: 17px;
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
  margin-bottom: 16px;
}
.pr-48 {
  padding-right: 48px;
}
</style>

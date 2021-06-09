<template>
  <div  v-if="ComprehensiveShow">
    <!-- 租金预算 -->
    <ysn-glbSearch style="margin: 10px 0 0 38px" v-if="ComprehensivePlace"/>
    <div v-if="ComprehensivePlace">
      <div
        style="
          border-bottom: 1px solid #d1cec9;
          padding-bottom: 8px;
          margin: 30px 0 20px 0;
        "
      >
        <span class="info-title">土地信息</span>
      </div>
      <el-row v-for="(item, index) in landInfo" :key="index" class="info-col">
        <el-col class="pro-key" :span="11">{{ item.key }}</el-col>
        <el-col class="pro-val" :span="13">{{ item.value }}</el-col>
      </el-row>
    </div>
    <div  v-if="!ComprehensivePlace">
      <div class="score">
        <el-row>
          <el-col class="left-box" :span="12">
            <p class="zhpf">综合评分：</p>
            <p class="fenshu">83 <span>分</span></p>
          </el-col>
          <el-col :span="12">
            <p style="margin-top: 5px" class="right-box">
              地块等级：<span>B级</span>
            </p>
            <p class="right-box">竞争力：<span>74分</span></p>
          </el-col>
        </el-row>
      </div>
      <img class="zhpf-img" src="@/assets/image/zhpf-img.png" alt="" />
      <div style="border-bottom: 1px solid #d1cec9; padding-bottom: 8px">
        <span class="project-name">分析报告</span>
      </div>
      <div class="describe">
        区域周边人口活跃度高，商场、酒吧等配套设施少，交通便利，与周边区域的对比中较为突出。
      </div>
      <div style="border-bottom: 1px solid #d1cec9; padding-bottom: 8px">
        <span class="project-name">AI建议</span>
      </div>
      <div class="describe">
        属目前上海市重点打造区域，未来城市CBD,片区规划起点高，未来前景好，周边人群消费层次高。但当前民，生配套较少，可规划商场，酒店等业态。
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
    ComprehensiveShow: {
      type: Boolean,
      default: false
    },
    ComprehensivePlace: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // ComprehensiveShow:this.ComprehensiveShow, //点击地块
      // ComprehensivePlace: this.ComprehensivePlace, //点击地块
      landInfo: [
        { key: "地块名称", value: "上海市闵行区漕宝路Z000602单元11-04地块" },
        { key: "土地面积", value: "8.32万平" },
        { key: "土地获取成本", value: "135,000万元" },
        { key: "土地剩余使用年限", value: "70年" },
        { key: "地块公告号", value: "202104401" },
        { key: "范围", value: "新镇路至横沥港" },
        { key: "土地用途", value: "商业用地" },
        { key: "保证金", value: "12,000万元" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.info-title {
  font-size: 18px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #050101;
  border-left: 3px solid #000;
  padding-left: 10px;
}

.info-col {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  padding-left: 15px;
  line-height: 25px;
}
.pro-key {
  font-weight: 500;
  color: #050101;
}
.pro-val {
  font-weight: 600;
  color: #848382;
}
.score {
  width: 235px;
  background-color: #b5b18b;
  margin: 20px auto;
  border-radius: 15px;
}
.left-box {
  text-align: center;
  padding: 5px 0;
  .zhpf {
    font-size: 12px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 800;
    color: #050101;
    line-height: 22px;
  }
  .fenshu {
    font-size: 27px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    span {
      font-size: 14px;
      font-weight: 500;
      color: #050101;
      line-height: 22px;
    }
  }
}
.right-box {
  font-size: 12px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 800;
  color: #050101;
  line-height: 22px;
  span {
    font-size: 14px;
    font-weight: 500;
    color: #050101;
    line-height: 22px;
  }
}
.zhpf-img {
  width: 265px;
  height: 190px;
  margin: 0 0 20px 15px;
}
.describe {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #848382;
  line-height: 24px;
  margin: 20px auto;
}
</style>
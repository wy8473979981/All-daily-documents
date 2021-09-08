<template>
  <!-- 项目详情 -->
  <div style="margin-top: 20px">
    <div style="border-bottom: 1px solid #d1cec9; padding-bottom: 8px">
      <span class="project-name">上海闵行七宝项目</span>
    </div>
    <img class="project-img" src="@/assets/image/city.png" alt="" />
    <div
      style="
        border-bottom: 1px solid #d1cec9;
        padding-bottom: 8px;
        margin: 10px 0;
      "
    >
      <span class="info-title">项目信息</span>
    </div>
    <el-row v-for="(item, index) in projectInfo" :key="index" class="info-col">
      <el-col class="pro-key" :span="10" style="color: #848382;">{{ item.key }}</el-col>
      <el-col class="pro-val" :span="14" style="color: #050101">{{ item.value }}</el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 项目详情
      projectInfo: [
        { key: "公司项目", value: "上海" },
        { key: "项目位置", value: "上海奉贤区新建路2199号" },
        { key: "开业时间", value: "2013-09-30" },
        { key: "土地使用期限", value: "45年（2061-09-30）" },
        { key: "经营委托期限", value: "10年" },
        { key: "租金包使用期限", value: "10年" },
        { key: "得房率", value: "60%" },
        { key: "停车位", value: "1,025" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.project-name {
  height: 30px;
  font-size: 24px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #050101;
  line-height: 36px;
  border-bottom: 2px solid #000;
  padding-bottom: 8px;
}
.project-img {
  width: 355px;
  height: 170px;
  margin: 5px 0;
}
.info-title {
  font-size: 18px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #050101;
  border-left: 3px solid #000;
  padding-left: 10px;
}
.pro-key {
  font-weight: 500;
  color: #050101;
}
.pro-val {
  font-weight: 600;
  color: #848382;
}
.info-col{
  margin-bottom: 12px;
}
</style>
<template>
  <div class="calculation">
    <!-- 业态测算 -->
    <ZJ />
    <button class="add" @click="add">新增</button>
    <div class="tabs">
      <div class="df">
        <div
          :class="tabId == index ? 'tab-box' : 'tab-boxs'"
          v-for="(item, index) in tabList"
          :key="index"
          @click="tabClick(index,item)"
        >
          {{ item }}
        </div>
      </div>
      <div class="box">
        <div class="top">
          <div class="left">
            <span></span>
            <p>{{ title }}</p>
          </div>
          <div class="right">
            <span>酒店集团总经理</span>
            <div><span>已批准</span></div>
          </div>
        </div>
        <div
          class="txt"
          v-for="(item, index) in txtList"
          :key="index"
          :style="'width:' + item.width"
        >
          <p>{{ item.name }}</p>
          <p>{{ item.val }}</p>
        </div>
        <button
          class="add"
          @click="$router.push('/project')"
          style="margin-left: 64px"
        >
          测算详情
        </button>
      </div>
    </div>
    <div class="bottom">
      <div class="top">
        <div class="left">
          <span></span>
          <p>运营开发节点</p>
        </div>
        <div class="right">
          <span>事业部总经理</span>
          <div><span>已批准</span></div>
        </div>
      </div>
      <ul>
        <li class="li1">
          <span
            :style="'width:' + item.width"
            v-for="(item, index) in tableList"
            :key="index"
            >{{ item.name }}</span
          >
        </li>
        <li class="li2" v-for="(item, index) in ulList" :key="index">
          <span>{{ item.name1 }}</span>
          <span>{{ item.name2 }}</span>
          <span>{{ item.name3 }}</span>
          <span>{{ item.name4 }}</span>
          <span>{{ item.name5 }}</span>
        </li>
      </ul>
    </div>
    <!-- 资管意见 -->
    <div class="last">
      <p>资管意见</p>
      <div class="br"></div>
    </div>
    <div class="lastTxt">
      商业部分0地价YOC12.8%， 保收益率10%的情况下可承受地价2415元/m;
      写字楼0地价YOC8.4%， 若收益率需达10%，则需地产补贴5676万元。
    </div>

    <!-- <FormatAdd></FormatAdd> -->

    <basicInforEntryDialog
      :title="basicTitle"
      :dialogVisible.sync="basicDialogVisible"
    ></basicInforEntryDialog>
  </div>
</template>

<script>
import ZJ from "./components/zj";
import FormatAdd from "./components/format-add";
import basicInforEntryDialog from "./basicInforEntryDialog";
export default {
  components: {
    ZJ,
    FormatAdd,
    basicInforEntryDialog,
  },
  data() {
    return {
      title: "酒店",
      tabList: ["商业", "公寓", "酒店", "写字楼"],
      txtList: [
        { name: "评分", val: "-", width: "45px" },
        { name: "起始租金（元/㎡月）", val: "-", width: "130px" },
        { name: "0地价YOC", val: "-", width: "65px" },
        { name: "含要求地价YOC", val: "-", width: "100px" },
        { name: "保YOC10%建议地价（元/㎡）", val: "-", width: "130px" },
        { name: "经营亏损补贴（万）", val: "-", width: "108px" },
      ], //写字楼
      tableList: [
        {
          name: "业态",
          width: "70px",
        },
        {
          name: "方案批复",
          width: "80px",
        },
        {
          name: "三点一线",
          width: "80px",
        },
        {
          name: "封顶",
          width: "76px",
        },
        {
          name: "幕墙",
          width: "76px",
        },
      ], //运营开发节点
      ulList: [
        {
          name1: "购物中心",
          name2: "",
          name3: "",
          name4: "",
          name5: "2024.07.00",
        },
        { name1: "商业街", name2: "/", name3: "/", name4: "/", name5: "/" },
        { name1: "酒店", name2: "/", name3: "/", name4: "/", name5: "/" },
        { name1: "办公", name2: "", name3: "", name4: "", name5: "2024.07.00" },
        { name1: "公寓", name2: "/", name3: "/", name4: "/", name5: "/" },
      ], //运营开发节点数据
      tabId: 2,

      //基础信息录入dialog
      basicDialogVisible: false,
      basicTitle: "基础信息录入",
    };
  },
  methods: {
    tabClick(val,item) {
      this.tabId = val;
      console.log(val);
      this.title = item
    },
    add() {
      this.basicDialogVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.df {
  display: flex;
  overflow: scroll;
  width: 276px;
}
.calculation {
  .add {
    width: 86px;
    height: 32px;
    background: #014543;
    border-radius: 16px;
    border: none;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 1;
    margin-bottom: 16px;
  }
  .tabs {
    display: flex;
    // overflow: scroll;
    width: 276px;
    position: relative;
    .tab-box {
      min-width: 90px;
      height: 46px;
      background: #fff;
      border-radius: 8px 8px 0 0;
      border: 1px solid rgba(151, 151, 151, 0.24);
      display: flex;
      line-height: 30px;
      justify-content: center;
      font-size: 12px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #014543;
      cursor: pointer;
    }
    .tab-boxs {
      min-width: 90px;
      height: 46px;
      background: #d1cec9;
      border-radius: 8px 8px 0 0;
      border: 1px solid rgba(151, 151, 151, 0.24);
      display: flex;
      line-height: 30px;
      justify-content: center;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      cursor: pointer;
    }
    .box {
      background: #fff;
      height: 180px;
      width: 276px;
      border-radius: 8px;
      position: absolute;
      bottom: -166px;
      padding: 16px 8px 16px 10px; //设计图问题

      .txt {
        margin-top: 8px;
        display: flex;
        flex-direction: column;
        float: left;
        white-space: nowrap;
        margin-bottom: 16px;
        :nth-child(1) {
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #848382;
          line-height: 12px;
        }
        :nth-child(2) {
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #050101;
          line-height: 12px;
        }
      }
    }
  }
}
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    span {
      display: inline-block;
      width: 2px;
      height: 12px;
      background: #014543;
    }
    p {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 600;
      color: #050101;
      line-height: 12px;
      margin-left: 5px;
    }
  }
  .right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #fa6400;
      line-height: 17px;
      margin-right: 8px;
    }
    div {
      width: 37px;
      height: 15px;
      background: rgba(40, 169, 162, 0.19);
      border-radius: 4px;
      border: 1px solid #28a9a2;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #28a9a2;
        transform: scale(0.5);
        white-space: nowrap;
        padding-left: 16px;
        line-height: 15px;
      }
    }
  }
}
.bottom {
  margin-top: 173px !important;
  height: 228px;
  background: #ffffff;
  border-radius: 8px;
  // padding: 16px 8px 16px 10px; //设计图问题
  width: 100%;
  .top {
    padding: 16px 8px 12px 10px; //设计图问题
  }
  ul {
    width: 100%;
    overflow: scroll;
    .li1 {
      width: 357px;
      padding-left: 19px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #848382;
      line-height: 12px;
      height: 20px;
      background: rgba(55, 55, 55, 0.08);
      display: flex;
      align-items: center;
      span {
        display: inline-block;
        width: 20%;
        line-height: 1;
      }
    }
    .li2 {
      width: 357px;
      padding-left: 19px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #050101;
      line-height: 12px;
      display: flex;
      align-items: center;
      span {
        display: inline-block;
        width: 20%;
        line-height: 1;
      }
    }
    li:nth-child(3) {
      background: rgba(40, 169, 162, 0.08);
      height: 20px;
      line-height: 20px;
    }
    li:nth-child(5) {
      background: rgba(40, 169, 162, 0.08);
      height: 20px;
      line-height: 20px;
    }
    li:nth-child(2n) {
      background: #fff;
      height: 36px;
      line-height: 36px;
    }
  }
}
//资管意见
.last {
  margin-top: 16px;
  font-size: 18px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 600;
  color: #050101;
  // border-bottom: 1px solid #d1cec9;
  position: relative;
  .br {
    width: 100%;
    height: 1px;
    background: #d1cec9;
    position: absolute;
    bottom: -27px;
  }
  p {
    position: absolute;
    z-index: 5;
    padding-bottom: 8px;
    padding-left: 12px;
    display: inline-block;
    width: 184.5px;
    line-height: 1;
    border-bottom: 1px solid #050101;
  }
}
.lastTxt {
  margin-top: 43px;
  width: 100%;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #848382;
  line-height: 24px;
  padding: 8px 16px 0 0;
  margin-bottom: 20px;
}
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 1px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
</style>
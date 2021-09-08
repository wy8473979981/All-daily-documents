<template>
  <div class="history">
    <!-- 项目测算 -->
    <div class="tab">
      <p>项目测算</p>
      <div class="br" />
      <div class="right">
        <button @click="duibi">测算对比分析</button>
        <button v-show="tableShow" @click="$router.push('history')">历史测算</button>
        <button @click="$router.push('/wisdomLand')">返回</button>
        <ysn-navSetting class="text-right mb-24" />
      </div>
    </div>
    <div class="body">
      <div style="display: flex; align-items: center">
        <el-radio v-model="radio" label="1">搜索</el-radio>
        <el-radio
          v-model="radio"
          label="2"
          style="margin-right: 30px"
        >筛选</el-radio>
        <el-input
          v-show="!radioShow"
          v-model="input2"
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
        />
        <div v-show="radioShow" class="select">
          <Select :title="'省份：全国'" :options-list="optionsList" />
          <Select
            :title="'城市/区：闵行区'"
            :options-list="optionsList1"
          />
          <Select :title="'业态：商业'" :options-list="optionsList2" />
          <Select :title="'年份：2021'" :options-list="optionsList3" />
        </div>
      </div>
      <div class="float-right" @click="close">
        <i class="el-icon-setting" />设置显示字段
      </div>
      <div class="mask">
        <div class="right">右滑显示更多</div>
      </div>
    </div>
    <!-- //图例 -->
    <div class="legend">
      <span v-show="tableShow">（单位：万元人民币）</span>
    </div>
    <!-- 项目测算 -->
    <Projectable ref="reftable" />
    <ul v-for="(item, index) in ulList" v-show="tableShow" :key="index">
      <li :class="item.leave ? 'color' : 'colrs'">
        <div :style="item.leave ? 'color:#848382' : 'color:#050101'">
          {{ item.name1 }}
        </div>
        <div :style="item.leave ? 'color:#848382' : 'color:#050101'">
          {{ item.name2 }}
        </div>
        <div :style="item.leave ? 'color:#848382' : 'color:#050101'">
          {{ item.name3 }}
        </div>
        <div :style="item.leave ? 'color:#848382' : 'color:#050101'">
          {{ item.name4 }}
        </div>
        <div :style="item.leave ? 'color:#848382' : 'color:#050101'">
          {{ item.name5 }}
        </div>
        <div :style="item.leave ? 'color:#848382' : 'color:#050101'">
          {{ item.name6 }}
        </div>
        <div :style="item.leave ? 'color:#848382' : 'color:#050101'">
          {{ item.name7 }}
        </div>
      </li>
    </ul>
    <div v-show="tableShow" class="bottom">
      <button @click="over">上一步</button>
      <button @click="over">完成</button>
    </div>
    <DisplayText ref="uploat" />
    <div class="page">
      <span>5个项目</span>
      <Page />
    </div>
  </div>
</template>

<script>
import DisplayText from './components/display-text'
import Page from './components/page'
import Projectable from './components/project-table'
import Select from './components/select'
export default {
  components: {
    Page,
    Projectable,
    Select,
    DisplayText
  },
  data() {
    return {
      tableShow: false, // 显示隐藏
      radio: '1',
      radioShow: false, // 筛选框
      input2: '',
      ulList: [
        {
          name1: '1.土地成本',
          name2: '119,168.00',
          name3: ' ',
          name4: ' ',
          name5: '4,385.00',
          name6: '4,385.00',
          name7: '4,385.00',
          leave: 2
        },
        {
          name1: '2.建安成本&地下车库成本',
          name2: '119,168.00',
          name3: ' ',
          name4: ' ',
          name5: '4,385.00',
          name6: '4,385.00',
          name7: '4,385.00',
          leave: 2
        },
        {
          name1: '3.商业前期费用',
          name2: '119,168.00',
          name3: ' ',
          name4: ' ',
          name5: '4,385.00',
          name6: '4,385.00',
          name7: '4,385.00',
          leave: 2
        },
        {
          name1: '4.专项维保基金(Capex)',
          name2: '119,168.00',
          name3: ' ',
          name4: ' ',
          name5: '4,385.00',
          name6: '4,385.00',
          name7: '4,385.00',
          leave: 2
        },
        {
          name1: '5.信息维护费',
          name2: '119,168.00',
          name3: ' ',
          name4: ' ',
          name5: '4,385.00',
          name6: '4,385.00',
          name7: '4,385.00',
          leave: 2
        },
        {
          name1: '1.总收入',
          name2: '119,168.00',
          name3: ' ',
          name4: ' ',
          name5: '4,385.00',
          name6: '4,385.00',
          name7: '4,385.00'
        },
        {
          name1: '1.1总租金收入',
          name2: '119,168.00',
          name3: ' ',
          name4: ' ',
          name5: '4,385.00',
          name6: '4,385.00',
          name7: '4,385.00',
          leave: 2
        },
        {
          name1: ' 1.2多经停车场收入',
          name2: '119,168.00',
          name3: ' ',
          name4: ' ',
          name5: '4,385.00',
          name6: '4,385.00',
          name7: '4,385.00',
          leave: 2
        },
        {
          name1: '1.总支出',
          name2: '119,168.00',
          name3: ' ',
          name4: ' ',
          name5: '4,385.00',
          name6: '4,385.00',
          name7: '4,385.00'
        },
        {
          name1: '1.1总租金收入',
          name2: '119,168.00',
          name3: ' ',
          name4: ' ',
          name5: '4,385.00',
          name6: '4,385.00',
          name7: '4,385.00',
          leave: 2
        },
        {
          name1: ' 1.2多经停车场收入',
          name2: '119,168.00',
          name3: ' ',
          name4: ' ',
          name5: '4,385.00',
          name6: '4,385.00',
          name7: '4,385.00',
          leave: 2
        },
        {
          name1: '1.业主收入',
          name2: '119,168.00',
          name3: ' ',
          name4: ' ',
          name5: '4,385.00',
          name6: '4,385.00',
          name7: '4,385.00'
        },
        {
          name1: '1.1总租金收入',
          name2: '119,168.00',
          name3: ' ',
          name4: ' ',
          name5: '4,385.00',
          name6: '4,385.00',
          name7: '4,385.00',
          leave: 2
        },
        {
          name1: ' 1.2多经停车场收入',
          name2: '119,168.00',
          name3: ' ',
          name4: ' ',
          name5: '4,385.00',
          name6: '4,385.00',
          name7: '4,385.00',
          leave: 2
        }
      ],
      optionsList: ['江苏', '上海'], // 筛选框
      optionsList1: ['黄浦区', '闵行区'], // 筛选框
      optionsList2: ['商业', '写字楼'], // 筛选框
      optionsList3: ['2021', '2022'] // 筛选框
    }
  },
  watch: {
    radio(val) {
      if (val === 2) {
        this.radioShow = true
      }
      if (val === 1) {
        this.radioShow = false
      }
    }
  },
  methods: {
    over() {
      this.tableShow = false
      this.$refs.reftable.tableShow = false
    },
    // 测算对比分析
    duibi() {
      this.$refs.reftable.tableShow = !this.$refs.reftable.tableShow
      this.tableShow = !this.tableShow
    },
    // 显示字段
    close() {
      this.$refs.uploat.uploadShow = true
    }
  }
}
</script>

<style lang="scss" scoped>
.history {
  // overflow: scroll;
  ::v-deep.el-table__row td .cell{
    height: 48px !important;
    line-height: 23px;
    margin: 10px 0 6px 0;
  }
}
.tab {
  margin-top: 32px;
  font-size: 18px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 600;
  color: #050101;
  font-size: 18px;
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
    line-height: 28px;
    position: absolute;
    z-index: 5;
    padding-bottom: 8px;
    padding-left: 8px;
    display: inline-block;
    width: 224px;
    line-height: 1;
    border-bottom: 1px solid #050101;
  }
  .right {
    position: absolute;
    right: 0;
    top: -17px;
    display: flex;
    align-items: center;
    z-index: 200;
    button {
      width: 116px;
      height: 32px;
      background: #c8c6a9;
      border-radius: 16px;
      border: none;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 24px;
      margin-right: 29px;
      margin-bottom: 24px;
    }
  }
}

.body {
  height: auto;
  padding-top: 64px;
  position: relative;
  padding-left: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .float-right {
    cursor: pointer;
    width: 142px;
    float: right;
    font-size: 14px;
    color: #004948;
    line-height: 24px;
    i {
      margin-right: 4px;
      font-size: 14px;
    }
  }
  .select {
    display: flex;
    margin-right: 10px;
    ::v-deepel-input--medium .el-input__inner {
      width: 150px !important;
    }
  }
  ::v-deep.el-radio__label {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;

    line-height: 24px;
  }
  ::v-deep.el-radio__input.is-checked + .el-radio__label {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #004948;
    line-height: 24px;
  }
  ::v-deep.el-radio__inner::after {
    width: 6px;
    height: 6px;
    background-color: #bf9000;
    border: 1px solid #fff;
  }
  ::v-deep.el-radio {
    margin-right: 17px;
  }
  ::v-deep.el-input--medium .el-input__inner {
    width: 236px;
    height: 32px;
    background: #fdfcfa;
    border-radius: 18px;
  }
  // ::v-deep.el-input--medium {
  //   margin-left: 30px;
  // }
  ::v-deep.el-input--medium .el-input__icon {
    line-height: 32px;
  }
  .mask {
    width: 125px;
    height: 614px;
    // background: linear-gradient(90deg, rgba(242, 241, 236, 0) 0%, #f2f1ec 100%);
    position: absolute;
    right: -34px;
    top: 97px;
    z-index: 5;
    .right {
      background: #c8c6a9;
      border-radius: 10px 0px 0px 10px;
      width: 24px;
      height: 132px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      float: right;
      margin-right: 10px;
      margin-top: 186px;
    }
  }
}
.legend {
  width: 140px;
  height: 36px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #050101;
  line-height: 36px;
  float: right;
}
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 1px !important; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px !important;
}

ul {
  width: 1117px;
  overflow: hidden;
  li {
    height: 32px;
    width: 1135px;
    background: #eaeaea;
    border-radius: 50px;
    display: flex;
    align-items: center;
    line-height: 32px;
    :nth-child(1) {
      width: 209px;
      height: 32px;
      padding-left: 44px;
    }
    :nth-child(2) {
      width: 99px;
      height: 32px;
      padding-left: 10px;
    }
    :nth-child(3) {
      width: 119px;
      height: 32px;
      padding-left: 23px;
    }
    :nth-child(4) {
      width: 119px;
      height: 32px;
      padding-left: 25px;
    }
    :nth-child(5) {
      width: 119px;
      height: 32px;
      padding-left: 30px;
    }
    :nth-child(6) {
      width: 119px;
      height: 32px;
      padding-left: 38px;
    }
    :nth-child(7) {
      width: 119px;
      height: 32px;
      padding-left: 38px;
    }
    :nth-child(8) {
      width: 119px;
      height: 32px;
      padding-left: 40px;
    }
    :nth-child(9) {
      width: 119px;
      height: 32px;
      padding-left: 40px;
    }
  }
  .color {
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #050101;
    background: none;

    :nth-child(2) {
      color: #6f120c !important;
    }
    :nth-child(3) {
      color: #6f120c !important;
    }
    :nth-child() {
      color: #6f120c !important;
    }

    :nth-child(6) {
      color: #6f120c !important;
    }
    :nth-child(7) {
      color: #6f120c !important;
    }
  }
  .colrs {
    background: #eaeaea;
    :nth-child(1) {
      font-weight: 600;
      color: #050101;
    }
    :nth-child(2) {
      color: #6f120c !important;
    }

    :nth-child() {
      color: #6f120c !important;
    }
  }
}
.bottom {
  width: 100%;
  display: flex;
  justify-content: flex-end;
   margin-bottom: 60px;
  :nth-child(1) {
    width: 86px;
    height: 32px;
    background: #c8c6a9;
    border-radius: 16px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    border: none;
    margin-right: 8px;
  }
  :nth-child(2) {
    width: 86px;
    height: 32px;
    background: #014543;
    border-radius: 16px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    border: none;
  }
}
.page {
  position: fixed;
  width: 1160px;
  bottom: 0;
  margin-left: -25px;
  // right: 70px;
  height: 48px;
  background: #fdfcfa;
  // position: relative;
  padding-left: 39px;
  ::v-deep.el-input__inner {
    background: #fdfcfa !important;
  }
  ::v-deep.el-pagination button{
    background: #fdfcfa !important;
  }
  ::v-deep.number{
    background: #fdfcfa !important;
  }
  span {
    width: 50px;
    height: 24px;
    font-size: 14px;
    font-family: Helvetica;
    color: #bf9000;
    line-height:58px;
    position: absolute;
    left: 39px;
  }
}
</style>


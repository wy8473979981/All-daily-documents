<template>
  <div class="app-page-main">
    <div class="drop-down">
      <el-select slot="prepend" v-model="select" placeholder="请选择">
        <el-option v-for="(item, i) in list" :key="i" :value="item.name">
          {{ item.name }}
        </el-option>
      </el-select>
    </div>
    <div class="tabss">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基础信息" name="first">
          <div class="shopinformations">
            <div class="shopinformation">
              <p>商铺信息</p>
              <p>M-B1-001</p>
            </div>
            <div class="shopinformation">
              <p>商铺信息</p>
              <p>都可茶饮</p>
            </div>
            <div class="shopinformation">
              <p>招商负责人</p>
              <p>张三</p>
            </div>
            <div class="shopinformation">
              <p>招商协调人</p>
              <p>李四</p>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="radios">
      <el-radio v-model="radio" label="1">已完成</el-radio>
      <el-radio v-model="radio" label="2">进行中</el-radio>
      <el-radio v-model="radio" label="3">未进行</el-radio>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClicks">
      <el-tab-pane label="进度信息" name="first">
        <div class="progress">
          <div v-for="(item, i) in listData" :key="i" class="speedss">
            <div class="speeds">
              <div class="speed" :class="num == item.id ? 'fn' : ''" :style="i < 3 ? 'background: #1C4C7F;border: 6px solid #9ABBDD;' : ''">
                <span>{{ item.name }}</span>
              </div>
              <p>{{ item.time }}</p>
              <div v-if="item.id !== 6 ? true : false" class="bor" />
            </div>
          </div>
          <div class="content-a">
            <div class="contents">
              <span>洽谈日期</span>
              <p>2021-05-21</p>
            </div>
            <div class="contents">
              <span>洽谈方式</span>
              <p>电话沟通</p>
            </div>
            <div class="contents">
              <span>联系人</span>
              <p>XXXXXX</p>
            </div>
            <div class="contents">
              <span>联系电话</span>
              <p>XXXXXXXXXXX</p>
            </div>
            <div class="contents">
              <span>沟通内容</span>
              <p>有意向承租</p>
            </div>
          </div>
          <div class="content-b">
            <div class="contents">
              <span>意向编号</span>
              <p>MM-210501111</p>
            </div>
            <div class="contents">
              <span>意向金金额(元)</span>
              <p>10,000</p>
            </div>
            <div class="contents">
              <span>意向签约日期</span>
              <p>2021-05-08</p>
            </div>
          </div>
          <div class="content-c">
            <div class="contents">
              <span>合同编号</span>
              <p>YS-210517001</p>
            </div>
            <div class="contents">
              <span>合同开始日期</span>
              <p>2021-06-16</p>
            </div>
            <div class="contents">
              <span>合同结束日期</span>
              <p>2024-06-15</p>
            </div>
            <div class="contents">
              <span>预计进场日期</span>
              <p>2021-05-23</p>
            </div>
            <div class="contents">
              <span>预计开业日期</span>
              <p>2021-06-11</p>
            </div>
          </div>
          <div class="content-d">
            <div class="contents">
              <span>合同编号</span>
              <p>YS-210517001</p>
            </div>
            <div class="contents">
              <span>双签时间</span>
              <p>2021-06-16</p>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: 'SpeedOfProgress',
  components: {},
  data() {
    return {
      activeName: 'first',
      select: '',
      radio: '1',
      active: 0,
      fn: '',
      num: '4',
      listData: [
        { id: 1, name: '洽谈', time: '2020-04-01' },
        { id: 2, name: '意向', time: '2020-04-04' },
        { id: 3, name: '合同', time: '2020-04-08' },
        { id: 4, name: '双签', time: '2020-04-10' },
        { id: 5, name: '进场', time: '2020-04-20' },
        { id: 6, name: '开业', time: '2020-04-28' }
      ],
      list: [
        {
          name: '上海区域'
        },
        {
          name: '七宝'
        },
        {
          name: '奉贤'
        },
        {
          name: '宝山'
        },
        {
          name: '杭州区域'
        },
        {
          name: '萧山'
        },
        {
          name: '......'
        },
        {
          name: '上海城市公司'
        },
        {
          name: '华新'
        },
        {
          name: '青浦'
        },
        {
          name: '吴泾'
        },
        {
          name: '杭州城市公司'
        },
        {
          name: '萧山'
        },
        {
          name: '......'
        }
      ]
    }
  },
  watch: {},
  created() {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    handleClicks(tab, event) {
      console.log(tab, event)
    },
    next() {
      if (this.active++ > 2) this.active = 1
    }
  }
}
</script>
<style lang="scss" scoped>
.app-page-main {
  background: #f6f5ee;
  position: relative;
  ::v-deep.el-input__inner {
    background: #fdfcfa;
    border-radius: 16px;
    height: 32px;
  }
  .fn {
    background: #48a0c3 !important;
    border: 6px solid #b3d9e8 !important;
  }

  ::v-deep.el-input__icon {
    line-height: 32px;
  }
  ::v-deep.el-icon-arrow-up:before {
    content: "\e78f";
    color: #050101;
  }
  ::v-deep.el-tabs__item.is-active {
    color: #050101;
    padding: 0 0 0 8px;
    font-size: 16px;
    font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
    font-weight: bold;
    color: #050101;
  }
  ::v-deep.el-tabs__active-bar {
    background-color: #050101;
    width: 124px !important;
    margin-left: -8px;
  }
  ::v-deep.el-tabs__nav-wrap::after {
    background: #d1cec9;
  }
  .shopinformations {
    display: flex;
    .shopinformation {
      margin-right: 54px;
      p:nth-child(1) {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: #050101;
        padding: 0;
        margin: 0;
        margin-left: 8px;
      }
      p:nth-child(2) {
        font-size: 20px;
        font-family: MicrosoftYaHei;
        color: #050101;
        padding-top: 12px;
        margin: 0;
        margin-left: 8px;
      }
    }
  }
  .radios {
    position: absolute;
    top: 154px;
    right: 24px;
    z-index: 999;
    ::v-deep.el-radio {
      font-family: MicrosoftYaHei;
      color: #050101;
    }
    ::v-deep.el-radio__input.is-checked .el-radio__inner {
      background: #48a0c3;
    }
    ::v-deep.el-radio__input.is-checked + .el-radio__label {
      color: #050101;
    }
    ::v-deep.el-radio__inner::after {
      background: #1c4c7f;
      width: 7px;
      height: 7px;
    }
  }

  ::v-deep.el-step__title.is-process {
    font-size: 16px;
    font-family: MicrosoftYaHei;
    color: #050101;
    font-weight: none;
  }
  .progress {
    display: flex;
    flex-wrap: wrap;
    .speedss {
      display: flex;
      position: relative;
      .speeds {
        .speed {
          width: 82px;
          height: 82px;
          background: #becbd2;
          border: 6px solid #dae7ee;
          border-radius: 50%;
          display: flex;
          align-items: center;
          font-size: 16px;
          font-family: MicrosoftYaHei;
          color: #ffffff;
          margin-right: 90px;
          justify-content: center;
          cursor: pointer;
        }
        p {
          font-size: 16px;
          font-family: MicrosoftYaHei;
          color: #050101;
          margin-top: 11px;
        }
        .bor {
          width: 100px;
          height: 1px;
          border: 1px solid #dfe4e7;
          position: absolute;
          background: #dfe4e7;
          top: 44px;
          left: 80px;
        }
        .bor1 {
          width: 100px;
          height: 1px;
          border: 1px solid #dfe4e7;
          position: absolute;
          background: #dfe4e7;
          top: 44px;
          left: 257px;
        }
        .bor2 {
          width: 100px;
          height: 1px;
          border: 1px solid #dfe4e7;
          position: absolute;
          background: #dfe4e7;
          top: 44px;
          left: 438px;
        }
        .bor3 {
          width: 100px;
          height: 1px;
          border: 1px solid #dfe4e7;
          position: absolute;
          background: #dfe4e7;
          top: 44px;
          left: 615px;
        }
        .bor4 {
          width: 100px;
          height: 1px;
          border: 1px solid #dfe4e7;
          position: absolute;
          background: #dfe4e7;
          top: 44px;
          left: 615px;
        }
        .bor5 {
          width: 100px;
          height: 1px;
          border: 1px solid #dfe4e7;
          position: absolute;
          background: #dfe4e7;
          top: 44px;
          left: 792px;
        }
      }
    }
    .content-a {
      width: 152px;
      height: 354px;
      background: #EFEDEA;
      padding-left: 16px;
      border-radius: 10px;
      margin-top: 8px;
      .contents {
        margin-top: 23px;
        span {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: #848382;
        }
        p {
          font-size: 16px;
          font-family: MicrosoftYaHei;
          color: #050101;
          margin: 0;
          margin-top: 6px;
        }
      }
    }
    .content-b {
      width: 152px;
      height: 354px;
      background: #EFEDEA;
      padding-left: 16px;
      margin-top: 8px;
      border-radius: 10px;
      margin-left: 20px;
      .contents {
        margin-top: 23px;
        span {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: #848382;
        }
        p {
          font-size: 16px;
          font-family: MicrosoftYaHei;
          color: #050101;
          margin: 0;
          margin-top: 6px;
        }
      }
    }
    .content-c {
      width: 152px;
      height: 354px;
      background: #EFEDEA;
      padding-left: 16px;
      margin-top: 8px;
      border-radius: 10px;
      margin-left: 20px;
      .contents {
        margin-top: 23px;
        span {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: #848382;
        }
        p {
          font-size: 16px;
          font-family: MicrosoftYaHei;
          color: #050101;
          margin: 0;
          margin-top: 6px;
        }
      }
    }
    .content-d {
      width: 152px;
      height: 354px;
      border-radius: 10px;
      background: #fdfcfa;
      padding-left: 16px;
      margin-top: 8px;
      margin-left: 20px;
      .contents {
        margin-top: 23px;
        span {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: #848382;
        }
        p {
          font-size: 16px;
          font-family: MicrosoftYaHei;
          color: #050101;
          margin: 0;
          margin-top: 6px;
        }
      }
    }
  }
}
</style>

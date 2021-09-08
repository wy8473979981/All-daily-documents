<template>
  <div class="calculation">
    <!-- 退出测算 -->
    <ZJ />
    <ExitComponents v-if="serchShow" ref="exit" :title="'A'" />
    <div class="h" />
    <ExitComponents v-if="serchShow" ref="exit" :title="'B'" />

    <div v-if="!serchShow" class="serch">
      <div class="box1">
        <div class="top">
          <div class="one-left">
            <p>青岛城阳</p>
            <el-dropdown>
              <span class="el-dropdown-link">
                方案A<i class="el-icon-arrow-down el-icon--right" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>方案B</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="one-right">查看测算详情</div>
        </div>

        <Lines />
      </div>
      <div class="box1">
        <div class="NPV-one" style="border-bottom: 1px solid #dddddd">
          <div class="box">
            <p>NPV</p>
            <p><span>5475</span>万元</p>
          </div>
          <div class="box">
            <p>IRR</p>
            <p><span>16.83%</span></p>
          </div>
          <div class="box">
            <p>业主收益回报率</p>
            <p><span>9.89%</span></p>
          </div>
          <div class="box">
            <p>净值</p>
            <p><span>276.821</span>万元</p>
          </div>
        </div>
        <div class="NPV-two">
          <div class="left">
            <p>Cap rate</p>
            <div class="input">
              <span>728</span>
              <span>%</span>
            </div>
            <p style="font-size: 12px">Cap rate当前平均参考值5.20%</p>
            <div class="input-box">
              <div class="box">
                <p>起始租金</p>
                <div class="input" style="width: 77px">
                  <span>728</span>
                  <span>%</span>
                </div>
              </div>
              <div class="box">
                <p>租金增长率</p>
                <div class="input" style="width: 77px">
                  <span>728</span>
                  <span>%</span>
                </div>
              </div>
            </div>
          </div>
          <div class="right">
            <p>Cap rate</p>
            <span>325676</span>
            <div class="input-box">
              <div class="box">
                <p>起始租金</p>
                <div class="input" style="width: 77px">
                  <span>728</span>
                  <span>%</span>
                </div>
              </div>
              <div class="box">
                <p>租金增长率</p>
                <div class="input" style="width: 77px">
                  <span>728</span>
                  <span>%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="NPV-one three">
          <div v-for="(item, index) in dataList" :key="index" class="box">
            <p>{{ item.name }}</p>
            <p>
              <span>{{ item.val }}</span>
            </p>
          </div>
        </div>
        <div class="NPV-one three">
          <div v-for="(item, index) in dataList" :key="index" class="box">
            <p>{{ item.name }}</p>
            <p>
              <span>{{ item.val }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ZJ from './components/zj'
import ExitComponents from './components/exit-components'
import Lines from './line'
export default {
  components: {
    ZJ,
    ExitComponents,
    Lines
  },
  data() {
    return {
      serchShow: true,
      dataList: [
        {
          name: '土地成本',
          val: '上海'
        },
        {
          name: '建安成本',
          val: 'A'
        },
        {
          name: '商业街经营部分建面',
          val: '2013/12/19'
        },
        {
          name: '开发周期',
          val: '否'
        }
      ]
    }
  },
  methods: {
    serchClick() {
      console.log(222)
    }
  }
}
</script>

<style lang="scss" scoped>
.h {
  height: 17px;
  width: 10%;
}
.serch {
  .box1 {
    width: 363px;

    padding: 20px;
    background: #ffffff;
    // overflow-x: scroll;
    margin-bottom: 12px;
    border-radius: 20px;
    .NPV-one {
      // width: 357px;
      display: flex;
      justify-content: space-between;

      padding-bottom: 20px;
      .box {
        :nth-child(1) {
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #848382;
          line-height: 16px;
        }
        :nth-child(2) {
          span {
            font-size: 14px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #014543;
            line-height: 17px;
          }
        }
      }
    }
    .NPV-two {
      margin-top: 20px;
      display: flex;
      .left {
        width: 169px;
        p {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #848382;
          line-height: 16px;
          margin-bottom: 8px;
        }
        .input-box {
          display: flex;
        }
      }
      .right {
        flex: 1;
        p {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #848382;
          line-height: 16px;
          margin-bottom: 8px;
        }
        span {
          font-size: 14px;
          font-family: Helvetica;
          color: #074e4d;
          line-height: 16px;
        }
        .input-box {
          margin-top: 57px;
          display: flex;
        }
      }
    }
  }
  .top {
    width: 344px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    .one-left {
      display: flex;
      p {
        width: 72px;
        font-size: 18px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 600;
        color: #050101;
        line-height: 18px;
        margin-right: 8px;
      }
      ::v-deep.el-dropdown {
        color: #28a9a2;
        width: 60px;
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 600;

        margin-right: 102px;
      }
    }
    .one-right {
      width: 84px;
      height: 18px;
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #28a9a2;
      line-height: 18px;
      margin-right: 12px;
    }
  }
}
.input {
  width: 149px;
  height: 26px;
  background: #ffffff;
  border: 1px solid #044b4a;
  padding: 0 8px 0 17px;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #999999;
  line-height: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  margin-right: 6px;
}
.three {
  margin-top: 25px;
  border-bottom: none;
}
</style>

<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: AMP-首页
-->
<template>
  <div class="home-content">
    <!-- 左侧布局 -->
    <div class="home-left d-inline-block">
      <!-- 顶部指标卡 -->
      <home-index-card :card-data="cardData" />
      <transition name="el-zoom-in-top">
        <!-- 切换箭头 -->
        <p class="text-center pt-4">
          <img class="cursor-pointer" :src="JT_IMG" @click="echarts">
        </p>
      </transition>

      <!-- 主要数据展示 -->
      <transition name="el-zoom-in-top">
        <div class="wisdom-land">
          <div class="btn" @click="changemap">
            {{ mapFlag ? "智慧拿地" : "返回" }}
          </div>
          <!-- 地图 -->
          <div class="map-box">
            <TencentMap
              v-if="this.title === '智慧拿地'"
              ref="map"
              @click="clickMap"
            />
            <TencentMapSatellite
              v-if="this.title === '返回'"
              ref="tencentMapSatellite"
            />
            <!-- <img
              class="mapbg"
              :src="mapFlag ? PMAP_IMG : WX_IMG"
              alt=""
              v-show="!echart"
            /> -->
            <img
              v-if="this.tabIdx == 2"
              v-show="echart"
              class="mapbg"
              :src="BK_IMG"
              alt=""
            >
            <!-- v-if="this.tabIdx == 2" -->

            <!-- 弹窗卡片 -->
          </div>
        </div>
      </transition>
    </div>
    <!-- 右侧布局 -->
    <div class="home-right d-inline-block">
      <!-- 用户信息设置 -->
      <ysn-navSetting class="text-right mb-24" />
      <!-- 右侧操作按钮 -->
      <div
        style="margin-bottom: 20px; overflow: scroll; white-space: nowrap"
        class="df"
      >
        <span
          v-for="(item, idx) in btnArr"
          :key="idx"
          class="btn-right"
          :class="tabIdx == idx ? 'active' : ''"
          @click="changeTab(idx)"
        >{{ item }}</span>
      </div>
      <div
        style="min-height: 300px"
        :class="filterS ? '' : 'filterShow'"
        @click="filterS = true"
      >
        <transition v-if="tabIdx == 0" name="el-zoom-in-top">
          <Details v-if="pmEchart" />
        </transition>
        <transition
          v-if="tabIdx == 1"
          name="el-zoom-in-top"
        ><div>
          <CalculaTion /></div></transition>
        <transition v-if="tabIdx == 2" name="el-zoom-in-top">
          <Money />
        </transition>
        <transition v-if="tabIdx == 0" name="el-zoom-in-top">
          <Comprehensive
            ref="comprehensive"
            :comprehensive-show="ComprehensiveShow"
            :comprehensive-place="ComprehensivePlace"
          />
        </transition>
        <transition
          v-if="tabIdx == 3"
          name="el-zoom-in-top"
        ><div><Exit /></div></transition>
      </div>
      <!-- <div class="bol" v-if="bol"></div> -->
    </div>
  </div>
</template>

<script>
import HomeIndexCard from '@views/home/blocks/homeIndexCard'
import RiskList from '@views/home/blocks/riskList'
import JT_IMG from '@/assets/image/amp_home_jt.png' // 箭头图片
import PMAP_IMG from '@/assets/image/ping-map.png' // 平面地图
import BK_IMG from '@/assets/image/编组 2.png' // 板块地图
import WX_IMG from '@/assets/image/weixin-map.png'
import CalculaTion from './components/calculation'
import Exit from './components/exit'
import Money from './components/money'
import Details from './components/details'
import Comprehensive from './components/Comprehensive-score'
import TencentMapSatellite from '@/views/tencentMap/satellite' // 卫星地图
import TencentMap from '@/views/tencentMap/index' // 平面地图
export default {
  name: 'WisdomLand',
  components: {
    HomeIndexCard,
    RiskList,
    CalculaTion,
    Exit,
    Money,
    Details,
    Comprehensive,
    TencentMap,
    TencentMapSatellite
  },
  data() {
    return {
      WX_IMG, // 卫星地图
      PMAP_IMG, // 平面地图,
      JT_IMG, // 箭头图片
      BK_IMG, // 板块地图
      // 顶部指标卡数据
      cardData: [
        { title: '总投资', text: '450.00', company: '亿' },
        { title: '总面积', text: '125.64' },
        { title: '项目', text: '112.00' },
        {
          title: '总收入',
          text: '633.64',
          company: '亿',
          lastTitle: '达标率85%'
        },
        { title: '总估值', text: '450.00', company: '亿' },
        { title: 'NO1', text: '1.50', company: '亿' },
        { title: '可售货值' }
      ],
      // 右侧按钮
      btnArr: ['详情', '投测', '租金', '估值'],

      mapFlag: true, // 判断图片是哪个地图
      title: '智慧拿地', // 按钮名称
      tabIdx: -1,
      bol: true, // 毛玻璃
      spenSionShow: false, // 业态悬浮
      clickCardShow: false, // 弹窗卡片
      placeShow: false, // 点击地块
      placeShow1: false, // 点击地块
      ComprehensiveShow: false, // 地块信息显示
      ComprehensivePlace: false, // 地块评测显示
      echart: true, // 平面图显示
      pmEchart: true, // 版图
      filterS: false // 遮罩
    }
  },
  mounted() {
    this.echart = false
  },
  methods: {
    // 点击地图遮罩消失
    clickMap() {
      this.filterShow = true
    },
    // 智慧拿地按钮
    changemap() {
      this.mapFlag = !this.mapFlag
      this.echart = false
      if (this.mapFlag) {
        this.title = '智慧拿地'
        // this.$refs.tencentMapSatellite.destroy();
      } else {
        this.title = '返回'
        this.$refs.map.destroy()
      }
      this.spenSionShow = false
      this.clickCardShow = false
    },
    // 菜单栏
    changeTab(index) {
      this.title = '智慧拿地'
      this.mapFlag = true
      this.tabIdx = index
      this.spenSionShow = false
      this.bol = false
      this.echart = false
      this.clickCardShow = false
      this.filterS = false
      // this.$refs.map.clickShow = false;
      if (index === 1) {
        this.$refs.map.clickMakeMarkers()
      }
      if (index === 3) {
        this.$refs.map.clickMakeMarkers(index)
      }
      if (index === 2) {
        this.title = ''
        this.echart = true
        this.pmEchart = false
        this.mapFlag = false
        this.ComprehensiveShow = false
      }
    },
    // 业态悬浮菜单
    spenSion(val) {
      this.spenSionShow = !this.spenSionShow
    },

    // 弹窗卡片
    clickCard() {
      this.clickCardShow = !this.clickCardShow
    },
    // 点击地块
    place() {
      this.tabIdx = 0
      this.placeShow1 = true
      this.placeShow = false
      this.pmEchart = false
      console.log('-----444')
      this.ComprehensiveShow = true
      this.ComprehensivePlace = false
    },
    // 地图
    echarts() {
      if (this.tabIdx === 2) {
        this.title = ''
        this.mapFlag = false
        this.echart = true
        this.placeShow1 = false
        this.placeShow = false
        this.pmEchart = true
        this.ComprehensiveShow = false
        this.ComprehensivePlace = false
      } else {
        this.title = '智慧拿地'
        this.mapFlag = true
      }
    },
    clikd() {
      this.tabIdx = 0
      this.placeShow1 = true
      this.placeShow = false
      this.pmEchart = false
      console.log('-----')
      this.ComprehensiveShow = true
      this.ComprehensivePlace = true
    }
  }
}
</script>

<style lang="scss" scoped>
.home-content {
  padding-top: 32px;
}
.home-left {
  width: 100%;
  padding-right: 276px;
  box-sizing: border-box;
}
.home-right {
  height: auto;
  width: 276px;
  margin-left: -276px;
  vertical-align: top;
  position: relative;
}

.wisdom-land {
  position: relative;
  .btn {
    width: 94px;
    cursor: pointer;
    display: inline-block;
    padding: 5px 15px;
    background-color: #004948;
    color: #fff;
    border-radius: 20px;
    text-align: center;
    position: absolute;
    top: 10px;
    left: 16px;
    z-index: 1990;
  }
  .map-box {
    position: relative;
    margin-top: 15px;
    .mapbg {
      width: 770px;
      height: 600px;
    }
    .click-box {
      position: absolute;
      cursor: pointer;
      top: 241px;
      right: 165px;
      width: 120px;
      height: 116px;
      background-color: transparent;
    }
    .click-boxs {
      position: absolute;
      cursor: pointer;
      top: 122px;
      left: 19px;
      width: 300px;
      height: 180px;

      background-color: transparent;
    }
    //业态悬浮
    .spen-sion {
      width: 50px;
      height: 50px;
      background: transparent;
      position: absolute;
      top: 313px;
      left: 306px;
      border-radius: 50%;
      .box {
        width: 104px;
        height: 105px;
        background: #ffffff;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: absolute;
        top: 8px;
        left: 72px;
        li {
          padding: 0 16px;
          height: 28px;
          font-size: 12px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #848382;
          cursor: pointer;
          line-height: 28px;
        }
        li:hover {
          background: #f2f1ec;
          color: #3b8995;
        }
      }
    }
  }
}
.btn-right {
  background-color: #c8c6a9;
  width: 52px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  margin-right: 5px;
  color: #fff;
  border-radius: 15px;
  font-size: 14px;
  cursor: pointer;
}
.active {
  background-color: #014543;
}

.home-right {
  width: 276px;
  margin-left: -276px;
}
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
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 1px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.bol {
  width: 100%;
  height: 713px;
  background: rgba(228, 227, 227, 0.23);
  border-radius: 10px;
  position: absolute;
  top: 169px;
  z-index: 11;
}
.filterShow {
  filter: blur(10px);
}
.df {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  :nth-child(4) {
    background: #d1cec9;
  }
}
</style>

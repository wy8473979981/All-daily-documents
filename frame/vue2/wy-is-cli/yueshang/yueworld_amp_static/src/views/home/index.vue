<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: AMP-首页
-->
<template>
  <div class="home-content">
    <!-- 左侧布局 -->
    <div class="home-left d-inline-block" :class="isThree?'three':''">
      <!-- 顶部指标卡 -->
      <home-index-card :card-data="cardData" :card-right-data="cardRightData" @chooseDate="chooseDate" />

      <!-- 主要数据展示 -->
      <transition name="el-zoom-in-top">
        <!-- 进度条数据 -->
        <main-data v-if="pageModel==='page'" :progress-data="progressData" :prog-all-max-num="progAllMaxNum" :progress-all-data="progressAllData" @getData="getData" />
      </transition>

      <!-- 地图切换箭头 -->
      <transition name="el-zoom-in-top">
        <!-- 切换箭头 -->
        <p class="text-center pt-4">
          <img v-if="pageModel==='map'" class="cursor-pointer" :src="JT_IMG" @click="backToMap">
        </p>
      </transition>

      <transition name="el-zoom-in-top">
        <!-- 地图模式数据 -->
        <map-content
          v-if="pageModel === 'map'"
          ref="mapContent"
          @handlerTooltipSelected="handlerTooltipSelected"
          @handleChangePoint="handleChangePoint"
          @mapChange="mapChange"
        />
      </transition>

    </div>
    <!-- 右侧布局 -->
    <div class="home-right d-inline-block" :class="isThree?'three':''">
      <!-- 用户信息设置 -->
      <ysn-navSetting class="text-right mb-24" />

      <!-- 顶部按钮 -->
      <div v-if="pageModel==='map'&&mapType!='china'" class="search-btn mb-8 d-flex" :class="isThree?'flex-ju-end three':''">
        <div
          v-for="(item,index) in glbBtnGroup"
          :key="index"
          :class="['btn mr-8',item.disabled?'disabled':index==btnActive?'active':'default']"
          @click="glbBtnGroupChange(index,item)"
        >{{ item.name }}</div>
      </div>

      <!-- 三级不显示的内容区域 -->
      <template v-if="!isThree">
        <!-- 全局搜索 -->
        <ysn-glbSearch :class="showFilter?'showFilter':''" @glbBtnGroupChange="glbBtnGroupChange" />
        <p class="clearfix" />

        <!-- 地图 -->
        <div class="mt-20 map-content" :class="showFilter?'showFilter':''">
          <transition name="el-zoom-in-center">
            <img v-if="pageModel==='page'" :src="JT_IMG" class="right-jt" @click="pageModel='map'">
          </transition>

          <!-- 地图 -->
          <transition name="el-zoom-in-center">
            <map-data v-if="pageModel==='page'" :show-label="false" class="map-box" />
          </transition>

          <!-- 达标率 -->
          <transition name="el-zoom-in-center">
            <ComplianceRate v-if="pageModel==='map'" />
          </transition>
        </div>

        <!-- 风险预警 -->
        <risk-List :data-list="riskListData" :class="showFilter?'showFilter':''" />

      </template>

      <!-- 三级时需要显示内容 -->
      <template v-else>
        <!-- 三级地图右侧详情 -->
        <!-- <three-map-right-detail v-if="threeType==='detail'" :three-map-pint-info="threeMapDetail" /> -->
        <!-- 三级地图详情底部弹框 -->
        <!-- <three-map-card v-if="threeType==='detail'" /> -->
        <!-- 三级地图右侧详情  -->
        <Details v-if="threeType==='detail'" />

        <!-- 投测 -->
        <Calculation v-if="threeType==='calculation'" />

        <!-- 租金 -->
        <Money v-if="threeType==='money'" />

        <!-- 估值 -->
        <Comprehensive
          v-if="threeType==='detail'"
          ref="comprehensive"
          :comprehensive-show="ComprehensiveShow"
          :comprehensive-place="ComprehensivePlace"
        />

        <Exit v-if="threeType==='comprehensive'" />
      </template>

    </div>
  </div>
</template>

<script>
import ComplianceRate from './blocks/complianceRate'
import HomeIndexCard from './blocks/homeIndexCard'
import MainData from './blocks/mainData'
import MapData from './blocks/mapData'
import MapContent from './blocks/mapContent'
import RiskList from './blocks/riskList'
import JT_IMG from '@/assets/image/amp_home_jt.png'
import ThreeMapRightDetail from './blocks/threeMapDetail/blocks/threeMapRightDetail'
import ThreeMapCard from './blocks/threeMapDetail/blocks/threeMapCard'

// 详情
import Details from './blocks/wisdomLand/components/details'
// 液态测算
import Calculation from './blocks/wisdomLand/components/calculation'
// 租金
import Money from './blocks/wisdomLand/components/money'
// 估值
import Comprehensive from './blocks/wisdomLand/components/Comprehensive-score'
import Exit from './blocks/wisdomLand/components/exit'
// api接口
import { getHomeData } from '@/api/home'

export default {
  name: 'Home',
  components: { ThreeMapCard, ThreeMapRightDetail, HomeIndexCard, MainData, RiskList, ComplianceRate, MapData, MapContent, Calculation, Money, Comprehensive, Details, Exit },
  data() {
    return {
      // 箭头图片,
      JT_IMG,
      // 顶部指标卡数据
      cardData: [
        { title: '总投资', text: '246.63', company: '亿' },
        { title: '总面积', text: '125.64' },
        { title: '项目', text: '125.64' },
        { title: '总收入', text: '633.64', company: '亿', lastTitle: '达标率85%' },
        { title: '总估值', text: '284.66' },
        { title: '可售货值' }
      ],
      // 指标卡 进度条数据
      cardRightData: [
        [{ title: '资产单元', value: '890' },
          { title: '含车位', value: '未选' },
          { title: '资产上市', value: '20' }],
        [{ title: 'NOI', value: '30.32亿' },
          { title: '总客流', value: '6亿' },
          { title: '总销售', value: '201亿' }]
      ],
      // 风险预警列表
      riskListData: [
        { title: '业主收益未达标：', child: [
          { title: '杭州项目', id: 1 },
          { title: '晋江项目', id: 2 },
          { title: '嘉兴项目', id: 3 },
          { title: '苏州项目', id: 4 },
          { title: '上海青浦项目', id: 5 },
          { title: '宁波项目', id: 6 },
          { title: '宁波项目', id: 7 }
        ], id: 3 },
        { title: '杭州临安青山湖项目', id: 2 }
        // 租金包未达标
      ],

      // 右侧按钮
      glbBtnGroup: [
        {
          name: '详情',
          disabled: false,
          type: 'detail'
        },
        {
          name: '投测',
          disabled: false,
          type: 'calculation'
        },
        {
          name: '租金',
          disabled: false,
          type: 'money'
        },
        {
          name: '估值',
          disabled: false,
          type: 'comprehensive'
        }
      ],
      // 页面模式- page/map
      pageModel: 'map',
      mapType: 'china', // 一、二级地图类型切换
      showFilter: false, // 是否显示毛玻璃效果
      // 当前选中的btn
      btnActive: -1,

      isThree: false, // 是否到第三级
      threeType: '', // 三级类型 见glbBtnGroup的item

      progressData: { // 进度条-分解模式数据
        sy1: [], // 商业
        sy2: [],
        bg1: [], // 办公
        bg2: [],
        gy1: [], // 公寓
        gy2: [],
        ck1: [], // 车库
        ck2: []
      },
      progAllMaxNum: 0, // 汇总模式最大值
      progressAllData: { // 进度条-分解模式数据
        sy1: {}, // 商业
        sy2: {},
        bg1: {}, // 办公
        bg2: {},
        gy1: {}, // 公寓
        gy2: {},
        ck1: {}, // 车库
        ck2: {}
      },

      // 三级详情数据
      threeMapDetail: {},

      ComprehensiveShow: false, // 地块信息显示
      ComprehensivePlace: false // 地块评测显示

    }
  },
  mounted() {
    this.getHomeData()
  },
  methods: {
    // 进度条组件返回form 去查询数据
    getData(form) {
      this.getHomeData(form)
    },
    // 获取日期
    chooseDate(date) {
      this.getHomeData({ date })
    },
    // 获取首页数据
    async getHomeData(data) {
      const res = await getHomeData(data)
      const { cardData, cardRightData, riskListData, progressData, progAllMaxNum, progressAllData } = res
      this.cardData = cardData
      this.cardRightData = cardRightData
      this.riskListData = riskListData
      this.progressData = progressData
      this.progAllMaxNum = progAllMaxNum
      this.progressAllData = progressAllData
    },
    // 点击箭头事件
    backToMap() {
      this.pageModel = 'page'
      this.isThree = false
      this.initBtn()
      this.quitThree()
    },
    // 退出三级
    quitThree() {
      this.initBtn()
      this.$refs.mapContent.showMap()
    },
    // 一级二级地图切换事件，  city/china
    mapChange(mapType) {
      this.mapType = mapType
      // 初始化切换
      this.initBtn()
    },
    // 退出三级/二级时初始化按钮组及毛玻璃效果
    initBtn() {
      this.showFilter = false
      this.btnActive = -1
      this.glbBtnGroup[0].disabled = true
      if (this.isThree) {
        // 三级情况下
        this.glbBtnGroup[0].disabled = false
      }
      this.$forceUpdate
    },
    // 顶部按钮事件
    glbBtnGroupChange(index, item) {
      // 禁用状态
      if (item.disabled) {
        return
      }
      // 设置选中效果
      this.btnActive = index

      // 三级事件切换
      if (this.isThree) {
        this.threeBtnGroupChange(item)
        return
      }

      // 二级3个按钮都是显示毛玻璃效果
      this.twoBtnGroupChange(item)
    },
    // 三级点击事件
    threeBtnGroupChange(item) {
      this.threeType = item.type
      // TODO
    },
    // 二级按钮组事件
    twoBtnGroupChange(item) {
      // 暂时只有显示毛玻璃效果
      this.showFilter = true
    },
    // 地图三级list点击事件
    handlerTooltipSelected(e, params) {
      console.log('进入三级', e, params)
      this.isThree = true
      this.initBtn()
    },
    // 三级地图点击事件
    // -》目前为详情点击
    handleChangePoint(item) {
      this.threeType = 'detail'
      this.threeMapDetail = {
        name: '上海闵行七宝项目' + item,
        location: '上海闵行区新建路2199号'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    .home-content{
        padding-top: 32px;
    }
    .home-left{
        width:100%;
        padding-right: 276px;
        box-sizing: border-box;
        transition: all 1s;
        &.three{
          padding-right: 403px;
        }
    }
    .home-right{
        width: 276px;
        margin-left: -276px;
        vertical-align: top;
        padding-left: 16px;
        padding-right: 24px;
        transition: all 1s;
         &.three{
          width: 403px;
          margin-left: -403px;
        }
    }
    .map-content{
      height:276px;
      width:100%;
      position: relative;
      margin-bottom: 16px;
    }
    .map-box{
      height:276px;
      width:100%;
    }
    .right-jt{
        transform: rotate(90deg);
        position: absolute;
        top: 50%;
        cursor: pointer;
        z-index: 9;
    }

  .showFilter{
    filter:blur(10px);
    -webkit-filter:blur(10px);
    -moz-filter:blur(10px);
    -ms-filter:blur(10px);
    -o-filter:blur(10px);
  }

  .search-btn{
    width: 100%;
    &.three .btn:last-child{
      margin-right: 0;
    }
    .btn{
      font-size: 14px;
      color: white;
      padding: 0px 12px;
      border-radius: 16px;
      height: 32px;
      line-height: 32px;
      cursor: pointer;
      min-width: 52px;
    }
    .default{
      background: #C8C6A9;
    }
    .disabled{
      background: #D1CEC9;
    }
    .active{
      background: #014543
    }
  }
</style>

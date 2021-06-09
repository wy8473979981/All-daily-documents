<template>
  <div class="ys-page">
    <!-- 顶部标题显示 -->
    <page-top :title="title"></page-top>

    <!-- tab切换 -->
    <ysNTab :tabList="tabList" :currentTab="currentTab" @selected="tabClickFunc"></ysNTab>

    <!-- 周报 、 月报 下拉 -->
    <page-tab :list="selectTabWeekList" @showPop="showWeekPop"></page-tab>

    <page-tips :tipTitle="pageTitle" :tList="tipsList">
      <div slot="table-content">
        <div class="unit">单位：亿元</div>
        <!-- 表格 -->
        <app-table :fixednum="1" :values="tableData" :totalRow="totalRow" :columns="tableColumns" @row-column-click="onRowColumnClick"></app-table>
      </div>
    </page-tips>

    <!-- 报表 下拉 -->
    <van-action-sheet v-model="showTabSelect" :show="showTabSelect" :actions="actionSheets.report" @select="onReportSelect" @click-overlay="overlay"></van-action-sheet>

    <!-- 周报 下拉 -->
    <van-action-sheet v-model="show[0]" :show="show[0]" :actions="actionSheets.weekAndMonth" @select="onWeekSelect" @click-overlay="overlay"></van-action-sheet>
    <!-- 月份 下拉 -->
    <van-action-sheet v-model="show[1]" :show="show[1]" :actions="actionSheets.monthList" @select="onMonthSelect" @click-overlay="overlay"></van-action-sheet>

    <!-- 用户名水印 -->
    <wm-watermark :text="watermarkText"></wm-watermark>
  </div>
</template>

<script>
import pageTop from "@/components/page-header/page-top.vue"
import {
  CONFIG
} from "./config"
export default {
  data () {
    return {
      pageTitle: '说明',
      tipsList: [{
        title: '请横屏查看'
      }],
      title: '全宝龙',
      watermarkText: '',
      showTabSelect: false,
      show: [false, false],
      totalRow: null,
      currentTab: '1', // tab选中项
      tableData: CONFIG.tableData, // 表格数据
      tableColumns: CONFIG.columns1, // 表格表头
      tabList: CONFIG.tabList, // tab 数据
      actionSheets: CONFIG.actionSheets,
      selectTabWeekList: CONFIG.selectTabWeekList,
      weekIndex: 0,
    };
  },
  components: {
    pageTop,
  },
  onLoad: function (options) {
    if (localStorage.getItem('watermarkText')) {
      this.watermarkText = localStorage.getItem('watermarkText') || '';
    }
  },
  onShow () { },
  mounted () {
    // 监听手机横屏和竖屏切换
    let evt = "onorientationchange" in window ? "orientationchange" : "resize";
    window.addEventListener(evt, () => {
      if (window.orientation == 0 || window.orientation == 180) {
        window.scrollTo({ top: 0 })
        this.setData({
          tableColumns: CONFIG.columns1,
          tipsList: [{
            title: '请横屏查看'
          }],
          pageTitle: '说明'
        })
      } else {
        this.setData({
          tableColumns: CONFIG.columns2,
          tipsList: null,
          pageTitle: null
        })
        setTimeout(() => {
          window.scrollTo({ top: 110 })
        }, 50)
      }
    }, false);
  },
  methods: {
    tabClickFunc (data) {
      this.currentTab = data;
      this.actionSheets.report.forEach((item, ind) => {
        item.color = null;
      })
      if (data == 4) {
        this.showTabSelect = true;
        this.$forceUpdate();
      }
    },
    onReportSelect (res) {
      this.showTabSelect = false;
      this.actionSheets.report.forEach((item, ind) => {
        if (item.name === res.detail.name) {
          item.color = '#00a1ff';
        } else {
          item.color = null;
        }
      })
      console.log(res)
    },
    showWeekPop (data) {
      this.weekIndex = data.index;
      this.show[data.index] = true;
      this.$forceUpdate();
    },
    onWeekSelect (res) {
      this.actionSheets.weekAndMonth.forEach((item, ind) => {
        if (item.name === res.detail.name) {
          item.color = '#00a1ff';
        } else {
          item.color = null;
        }
      })
      if (res.detail.name == '月报') {
        let list = [{
          name: res.detail.name,
          hiddenImage: false
        }, {
          name: '月份',
          hiddenImage: false
        }]
        this.setData({
          show: [false, false],
          selectTabWeekList: list
        })
      } else if (res.detail.name == '周报') {
        let list = [{
          name: res.detail.name,
          hiddenImage: false
        }, {
          name: '',
          hiddenImage: true
        }]
        this.setData({
          show: [false, false],
          selectTabWeekList: list
        })
      }
    },
    onMonthSelect (res) {
      let list = [{
        name: '月报',
        hiddenImage: false
      }, {
        name: res.detail.name,
        hiddenImage: false
      }]
      this.actionSheets.monthList.forEach((item, ind) => {
        if (item.name === res.detail.name) {
          item.color = '#00a1ff';
        } else {
          item.color = null;
        }
      })
      this.setData({
        show: [false, false],
        selectTabWeekList: list
      })
    },
    overlay () {
      this.showTabSelect = false;
      this.show = [false, false];
    },
    onRowColumnClick (data) {
      console.log(data)
    },
  }
}
</script>
<style>
@import "./index.css";
</style>

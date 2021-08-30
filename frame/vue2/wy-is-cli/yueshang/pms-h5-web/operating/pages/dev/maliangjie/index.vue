<template>
<view class="maliangjie-index-page">
  <app-header :tabs="[{ label: '购物列表' }, { label: '项目排名' }]" @tab-changed="onTabChanged">
    <app-project-selector @selected="onProjectSelected"></app-project-selector>
    <view slot="right">
      <app-picker range @changed="onDateChanged" from-date="2020-10-12"></app-picker>
    </view>
    
  </app-header>
  <app-section>
    <view slot="head-title">123</view>
    <view slot="head-actions">
      <app-filter-dialog type="primary" tip="筛选指标（注：最多可选3项）" maxnum="1" :checkboxes="checkboxes" @selected="onSelectedChanged">复选框过滤
      </app-filter-dialog>
      <app-filter-dialog class="action" :groups="groups" maxnum="3" @selected="onSelectedChanged">分组过滤
      </app-filter-dialog>
    </view>
    <view @tap="onClick">发送请求</view>
  </app-section>

  <app-section title="测试收起模式" collapseable>
    测试收起模式
  </app-section>
</view>
</template>

<script>
const app = getApp();
let times = 0;
import appHeader from "@/components/common/header";
import appPicker from "@/components/selector/datepicker";
import appSection from "@/components/container/section";
import appFilterDialog from "@/components/filter/dialog";
import appProjectSelector from "@/components/selector/project";

export default {
  data() {
    return {
      checkboxes: [{
        label: "面积",
        key: "square",
        unit: "%",
        width: "120rpx"
      }, {
        label: "招商率",
        key: "zsRate",
        unit: "%",
        width: "120rpx"
      }, {
        label: "开业率",
        key: "kyRate",
        unit: "%",
        width: "120rpx"
      }, {
        label: "日均客流(万/天)",
        key: "actualFlowDay",
        width: "220rpx",
        align: "right"
      }, {
        label: "客流密度(人/㎡/天)",
        key: "permeability",
        width: "220rpx",
        align: "right"
      }, {
        label: "租金收缴率",
        key: "zjRate",
        width: "220rpx",
        align: "right"
      }],
      groups: [{
        label: "分组一",
        maxnum: 1,
        items: [{
          label: "分组一：数据1"
        }, {
          label: "分组一：数据2"
        }]
      }, {
        label: "分组二",
        maxnum: 2,
        items: [{
          label: "分组二：数据1"
        }, {
          label: "分组二：数据2"
        }, {
          label: "分组二：数据3"
        }]
      }]
    };
  },

  components: {
    appHeader,
    appPicker,
    appSection,
    appFilterDialog,
    appProjectSelector
  },
  props: {},
  onLoad: function () {},
  methods: {
    onClick() {
      // times++;
      // app.request
      //   .options({ loading: times % 2 })
      //   .get('https://www.baidu.com')
      //   .then(res => {
      //     console.log(res);
      //   });
      uni.showActionSheet({
        itemList: ["A", "B", "C"]
      });
    },

    onProjectSelected(e) {
      console.log("onProjectSelected", e);
    },

    onSelectedChanged(values) {
      console.log(values);
    },

    onTabChanged(e) {
      console.log(e);
    },

    onDateChanged(e) {
      console.log(e);
    }

  }
};
</script>
<style>
@import "./index.css";
</style>
<template>
  <!-- 商业公司发起的商务条件  承租 模块 -->
  <div class="module-content">
    <ysSection :collapseable="true">
      <div slot="head-title">
        <customTags :data="{mainText:'承租',subText:'九优文具礼品生活馆',secondText:'零售配套'}" :height="`24px`" :mianTextStyle="{fontSize:'14px'}" :subTextStyle="{fontSize:'14px'}" :secondTextStyle="{color:'#787878FF'}" />
      </div>
      <div class="list-content">
        <div class="list-item" v-for="(item,index) in dataList" :key="index">
          <div class="item-left">{{item.label}}</div>
          <div class="item-right">
            <span class="main-text">{{item.key1}}</span>
            <span class="sub-text">{{item.key2}}</span>
            <span class="second-text">{{item.key3}}</span>
            <span class="tag-box">
              <customTags :data="{mainText:item.mainText,subText:'',secondText:''}" :className="item.className" :mianTextStyle="{width:'52px'}" />
            </span>
          </div>
        </div>
      </div>

    </ysSection>
  </div>
</template>
<script>
export default {
  name: 'ysNTenantModule',
  components: {
  },
  data () {
    return {
      dataList: [
        { label: '品牌', key1: '对比', key2: '预算', key3: 'MUJI无印良品MUJI无印良品MUJI无印良品MUJI无印良品MUJI无印良品', status: '0', mainText: '不一致', className: 'red' },
        { label: '业态', key1: '对比', key2: '标准', key3: '零售配套', status: '0', mainText: '不一致', className: 'red' },
        { label: '交付日期', key1: '对比', key2: '预算', key3: '2021-05-29', status: '0', mainText: '有延期', className: 'red' },
        { label: '租金', key1: '对比', key2: '标准', key3: '首年 +8%', status: '1', mainText: '有提高', className: 'dark-blue' },
        { label: '租金', key1: '对比', key2: '预算', key3: '首年 -5%', status: '0', mainText: '未达标', className: 'red' },
        { label: '物管费', key1: '对比', key2: '标准', key3: '首年 -8%', status: '0', mainText: '未达标', className: 'red' },
        { label: '物管费', key1: '对比', key2: '预算', key3: '首年 -5%', status: '0', mainText: '未达标', className: 'red' },
        { label: '预付租金', key1: '对比', key2: '标准', key3: '-50%', status: '0', mainText: '未达标', className: 'red' },
        { label: '特殊条款', key1: '对比', key2: '', key3: '', status: '0', mainText: '存在', className: 'red' },
      ]
    }
  },
  computed: {},
  created () { },
  mounted () { },
  methods: {}
};
</script>
<style lang="scss" scoped>
@import "~@/scss/variables.scss";

.module-content {
  font-family: PingFangSC-Regular, PingFang SC;
  .list-content {
    border-bottom: 1px solid RGBA(217, 217, 209, 1);
  }
  .list-item {
    display: flex;
    height: 40px;
    .item-left {
      display: flex;
      align-items: center;
      height: 100%;
      width: 62px;
      margin-right: 7px;
      font-size: 14px;
      font-weight: 400;
      color: #000000;
    }
    .item-right {
      height: 100%;
      width: calc(100% - 69px);
      display: flex;
      align-items: center;
      border-bottom: 1px solid RGBA(217, 217, 209, 1);

      .main-text {
        display: inline-block;
        width: 42px;
        font-size: 14px;
        font-weight: 400;
        color: #575757;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .sub-text {
        display: inline-block;
        width: 42px;
        font-size: 14px;
        font-weight: 400;
        color: #575757;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .second-text {
        height: 19px;
        width: 152px;
        line-height: 22px;
        padding-right: 5px;
        font-size: 10px;
        font-weight: 400;
        color: #575757;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    &:last-child {
      .item-right {
        border: none;
      }
    }
  }
}
</style>

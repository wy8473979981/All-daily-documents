<template>
  <!-- 商业公司发起的商务条件  其他事项 模块 -->
  <div class="module-content">
    <ysSection :collapseable="true">
      <div slot="head-title">
        <customTags :data="{mainText:'其他事项',subText:'',secondText:''}" :height="`24px`" :className="'dark-blue'" :mianTextStyle="{width:'80px',fontSize:'14px'}" />
      </div>
      <div class="list-content">
        <div class="list-item">
          <div class="item-left">租售比</div>
          <div class="item-right">
            <span class="main-text main-text-range">8.86%</span>
          </div>
        </div>
        <div class="list-item">
          <div class="item-left">条款类型</div>
          <div class="item-right">
            <span class="main-text main-text-range">重要特殊条款</span>
          </div>
        </div>
        <div class="list-item">
          <div class="item-left">装修期开始时间</div>
          <div class="item-right">
            <span class="main-text main-text-range">2021-07-07</span>
          </div>
        </div>
        <div class="list-item">
          <div class="item-left">装修期结束时间</div>
          <div class="item-right">
            <span class="main-text">2021-12-21</span>
            <span class="tag-box">
              <customTags :data="{mainText:'有批注',subText:'',secondText:''}" :className="'gray'" :mianTextStyle="{width:'52px',color:'#333333FF'}" />
            </span>
          </div>
        </div>
        <div class="list-item">
          <div class="item-left">装修管理费(元)</div>
          <div class="item-right">
            <span class="main-text main-text-range">每平方28元m²/合计1,655.96元</span>
          </div>
        </div>
        <div class="list-item">
          <div class="item-left">违约金(元)</div>
          <div class="item-right">
            <span class="main-text main-text-range">/</span>
          </div>
        </div>
        <div class="list-item">
          <div class="item-left">广告位</div>
          <div class="item-right">
            <span class="main-text main-text-range">/</span>
          </div>
        </div>
        <div class="list-item">
          <div class="item-left">停车</div>
          <div class="item-right">
            <span class="main-text main-text-range">/</span>
          </div>
        </div>
        <div class="list-item">
          <div class="item-left">其他事项</div>
          <div class="item-right">
            <span class="main-text main-text-range">/</span>
          </div>
        </div>
      </div>

    </ysSection>
  </div>
</template>
<script>
export default {
  name: 'ysNQtsxModule',
  components: {
  },
  data () {
    return {
      dataList: []
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
      width: 98px;
      margin-right: 26px;
      font-size: 14px;
      font-weight: 400;
      color: #000000;
    }
    .item-right {
      height: 100%;
      width: calc(100% - 124px);
      display: flex;
      align-items: center;
      border-bottom: 1px solid RGBA(217, 217, 209, 1);

      .main-text {
        display: inline-block;
        width: calc(100% - 52px);
        font-size: 14px;
        font-weight: 400;
        color: #575757;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .main-text-range {
        width: 100%;
      }
      .sub-text {
        display: inline-block;
        width: 116px;
        height: 19px;
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

<template>
  <!-- 商业公司发起的商务条件  留言记录 模块 -->
  <div class="module-content">
    <ysSection :collapseable="true">
      <div slot="head-title">
        <customTags :data="{mainText:'留言记录',subText:'',secondText:''}" :height="`24px`" :className="'dark-blue'" :mianTextStyle="{width:'80px',fontSize:'14px'}" />
      </div>
      <div class="list-content">
        <div class="list-item">
          <ysSection :collapseable="true" :use-image="false">
            <div slot="head-title">
              <span class="ly-title">潘丽 05-12 16:08</span>
            </div>
            <span class="ly-content">
              该商户装修期153天(2021.06.01-2021.10.31)期间只交一个月物业费，即1184*35=65382元
            </span>
          </ysSection>
        </div>
        <div class="list-item">
          <ysSection :collapseable="true" :use-image="false">
            <div slot="head-title">
              <span class="ly-title">潘丽 05-12 16:08</span>
            </div>
            <span class="ly-content">
              该商户装修期153天(2021.06.01-2021.10.31)期间只交一个月物业费，即1184*35=65382元
            </span>
          </ysSection>
        </div>
        <div class="list-item">
          <ysSection :collapseable="true" :use-image="false">
            <div slot="head-title">
              <span class="ly-title">潘丽 05-12 16:08</span>
            </div>
            <span class="ly-content">
              该商户装修期153天(2021.06.01-2021.10.31)期间只交一个月物业费，即1184*35=65382元
            </span>
          </ysSection>
        </div>
      </div>
    </ysSection>
  </div>
</template>
<script>
export default {
  name: 'ysNAccessoryModule',
  components: {
  },
  data () {
    return {
      show1: false,
      dataList: []
    }
  },
  computed: {},
  created () { },
  mounted () { },
  methods: {

  }
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
    margin-bottom: 10px;
    border-bottom: 1px solid RGBA(217, 217, 209, 1);
    &:last-child {
      border: none;
    }
    .ly-title {
      display: inline-block;
      height: 40px;
      line-height: 40px;
      padding-left: 5px;
      font-size: 14px;
      font-weight: 400;
      color: #575757;
    }
    .ly-content {
      font-size: 14px;
      font-weight: 400;
      color: #000000;
    }
    ::v-deep .ys-n-section {
      .app-section__body {
        padding: 0 0 0 5px;
      }
    }
  }
}
</style>

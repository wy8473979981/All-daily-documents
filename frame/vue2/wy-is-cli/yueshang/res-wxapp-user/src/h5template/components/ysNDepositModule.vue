<template>
  <!-- 商业公司发起的商务条件  预付款、保证金 -->
  <div class="module-content">
    <ysSection :collapseable="true">
      <div slot="head-title">
        <customTags :data="{mainText:'预付款、保证金',subText:'',secondText:''}" :height="`24px`" :className="'dark-blue'" :mianTextStyle="{width:'124px',fontSize:'14px'}"/>
      </div>
      <div class="list-content">
        <div class="list-item" v-for="(item,index) in dataList" :key="index">
          <div class="item-left">{{item.label}}</div>
          <div class="item-right">
            <span class="main-text">{{item.key1}}</span>
            <span class="sub-text">{{item.key2}}</span>
            <span class="second-text">{{item.key3}}</span>
            <span class="tag-box">
              <customTags :data="{mainText:item.mainText,subText:item.subText,secondText:''}" :type="'vertical'" :className="item.className" :mianTextStyle="{width:'96px',textAlign:'right'}" :subTextStyle="{textAlign:'right'}" />
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
        { label: '预付租金(元)', status: '0', mainText: '10,000.00', subText: '50% / 5,000.00', className: 'red' },
        { label: '预付物管费(元)', status: '1', mainText: '10,000.00', subText: '', className: 'none' },
        { label: '履约保证金-租金(元)', status: '1', mainText: '10,000.00', subText: '', className: 'none' },
        { label: '履约保证金-物管费(元)', status: '1', mainText: '10,000.00', subText: '', className: 'none' },
        { label: '履约保证金(元)', status: '1', mainText: '20,000.00', subText: '', className: 'none' },
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
      width: 175px;
      margin-right: 40px;
      font-size: 14px;
      font-weight: 400;
      color: #000000;
    }
    .item-right {
      height: 100%;
      width: calc(100% - 215px);
      display: flex;
      align-items: center;

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
  }
}
</style>

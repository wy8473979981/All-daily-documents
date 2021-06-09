<template>
  <!-- 商业公司发起的商务条件  备注 模块 -->
  <div class="module-content">
    <ysSection :collapseable="true">
      <div slot="head-title">
        <customTags :data="{mainText:'备注',subText:'',secondText:''}" :height="`24px`" :className="'dark-blue'" :mianTextStyle="{width:'48px',fontSize:'14px'}" />
      </div>
      <div class="list-content">
        <div class="list-item">
          <div class="item-left">铺位信息</div>
          <div class="item-right">
            <span class="main-text main-text-range">铺位号：M86638708</span>
          </div>
        </div>
        <div class="list-item">
          <div class="item-left"></div>
          <div class="item-right">
            <span class="main-text">面积：538.42m²</span>
            <span class="tag-box">
              <customTags :data="{mainText:'查看全部',subText:'',secondText:''}" :className="'gray'" :mianTextStyle="{width:'69px',color:'#333333FF'}" @mianHandleClick="mianHandleClick" />
            </span>
          </div>
        </div>
        <template v-if="more">
          <div class="list-item">
            <div class="item-left">租金</div>
            <div class="item-right">
              <span class="main-text main-text-range">标准租金:220元/m²/月(第1年)、242元/m²/月(第2年)</span>
            </div>
          </div>
          <div class="list-item">
            <div class="item-left"></div>
            <div class="item-right">
              <span class="main-text main-text-range">管理费标准:55元/m²/月</span>
            </div>
          </div>
          <div class="list-item">
            <div class="item-left">新品牌(柯卡芙)</div>
            <div class="item-right">
              <span class="main-text main-text-range">租金单价:245元/m²/月(第1年)、262.15元/m²/月(第2年)</span>
            </div>
          </div>
          <div class="list-item">
            <div class="item-left"></div>
            <div class="item-right">
              <span class="main-text main-text-range">管理费:55元/m²/月</span>
            </div>
          </div>
          <div class="list-item">
            <div class="item-left"></div>
            <div class="item-right">
              <span class="main-text main-text-range">工程改造费:本铺0元，累计0元</span>
            </div>
          </div>
          <div class="list-item">
            <div class="item-left"></div>
            <div class="item-right">
              <span class="main-text main-text-range">合同期限:2021/12/22-2023/12/21；2年</span>
            </div>
          </div>
          <div class="list-item">
            <div class="item-left"></div>
            <div class="item-right">
              <span class="main-text main-text-range">进场日期:2021/10/7</span>
            </div>
          </div>
          <div class="list-item">
            <div class="item-left"></div>
            <div class="item-right">
              <span class="main-text main-text-range">支付方式:季度支付</span>
            </div>
          </div>
          <div class="list-item">
            <div class="item-left"></div>
            <div class="item-right">
              <span class="main-text main-text-range">履约保证金:31122(租金履约保证金25416.30元，物业费履约保证金5705.7元)</span>
            </div>
          </div>
          <div class="list-item">
            <div class="item-left"></div>
            <div class="item-right">
              <span class="main-text main-text-range">免租期:该铺位免租期标准1个月(30天)；(兰溪宝龙为筹备期项目，开业时间为2021年12月22日)；执行起止时间2022/04/01-2022/04/30</span>
            </div>
          </div>
          <div class="list-item">
            <div class="item-left">其他描述</div>
            <div class="item-right">
              <span class="main-text main-text-range">符合业态落位</span>
            </div>
          </div>
          <div class="list-item">
            <div class="item-left"></div>
            <div class="item-right">
              <span class="main-text main-text-range">租金每年递增7%</span>
            </div>
          </div>
          <div class="list-item">
            <div class="item-left"></div>
            <div class="item-right">
              <span class="main-text main-text-range">商务条件符合公司标准</span>
            </div>
          </div>
        </template>
      </div>

    </ysSection>
  </div>
</template>
<script>
export default {
  name: 'ysNRemarkModule',
  components: {
  },
  data () {
    return {
      more: false,
      dataList: []
    }
  },
  computed: {},
  created () { },
  mounted () { },
  methods: {
    mianHandleClick () {
      this.more = !this.more
    }
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
    display: flex;
    // height: 40px;
    .item-left {
      display: flex;
      align-items: center;
      height: 100%;
      width: 56px;
      margin-right: 20px;
      padding: 10px 0;
      font-size: 14px;
      font-weight: 400;
      color: #000000;
    }
    .item-right {
      height: 100%;
      width: calc(100% - 76px);
      padding: 10px 0;
      display: flex;
      align-items: center;
      border-bottom: 1px solid RGBA(217, 217, 209, 1);

      .main-text {
        display: inline-block;
        width: calc(100% - 69px);
        font-size: 14px;
        font-weight: 400;
        color: #575757;
        // white-space: nowrap;
        // overflow: hidden;
        // text-overflow: ellipsis;
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

<template>
  <!-- 商业公司发起的商务条件  附件 模块 -->
  <div class="module-content">
    <ysSection :collapseable="true">
      <div slot="head-title">
        <customTags :data="{mainText:'附件',subText:'',secondText:''}" :height="`24px`" :className="'dark-blue'" :mianTextStyle="{width:'48px',fontSize:'14px'}"/>
      </div>

      <div class="list-content">
        <div class="list-item">
          <div class="item-left">品牌落位图</div>
          <div class="item-right">
            <div class="tag-box">
              <span class="name">MUJI无印良品-品牌落位图</span>
              <span class="format">.pdf</span>
            </div>
          </div>
        </div>
        <div class="list-item">
          <div class="item-left">品牌介绍
            <van-popover v-model="show1Popover" trigger="click" theme="dark" placement="top-start">
              <div class="tip-box">品牌简介、设计效果图、材质说明等</div>
              <template #reference>
                <van-image class="second-text-link" :src="questionIcon"></van-image>
              </template>
            </van-popover>
          </div>
          <div class="item-right">
            <div class="tag-box">
              <span class="name">MUJI无印良品-品牌介绍</span>
              <span class="format">.pdf</span>
            </div>
            <div class="tag-box">
              <span class="name">MUJI无印良品-商标注册证</span>
              <span class="format">.pdf</span>
            </div>
          </div>
        </div>
        <div class="list-item">
          <div class="item-left">品牌证照
            <van-popover v-model="show2Popover" trigger="click" theme="dark" placement="top-start">
              <div class="tip-box">商标注册及品牌授权书、营业执照及组织机构代码证和税务登记证三证合一、法人身份证</div>
              <template #reference>
                <van-image class="second-text-link" :src="questionIcon"></van-image>
              </template>
            </van-popover>
          </div>
          <div class="item-right">
            <div class="tag-box">
              <span class="name">MUJI无印良品-授权书</span>
              <span class="format">.pdf</span>
            </div>
            <div class="tag-box">
              <span class="name">MUJI无印良品负责人身份证</span>
              <span class="format">.pdf</span>
            </div>
          </div>
        </div>
        <div class="list-item">
          <div class="item-left">工程改造费明细清单</div>
          <div class="item-right">
            <div class="tag-box">
              <span class="name">杭州下沙宝龙广场商户工程改造费明细清单</span>
              <span class="format">.pdf</span>
            </div>
          </div>
        </div>
        <div class="list-item">
          <div class="item-left">广告位位置及方案</div>
          <div class="item-right">
            /
          </div>
        </div>
        <div class="list-item">
          <div class="item-left">其它</div>
          <div class="item-right">
            /
          </div>
        </div>
      </div>
    </ysSection>
  </div>
</template>
<script>

import questionIcon from "../../assets/images/question-icon.png";
export default {
  name: 'ysNAccessoryModule',
  components: {
  },
  data () {
    return {
      questionIcon: questionIcon,
      show1: false,
      dataList: [],
      show1Popover: false,
      show2Popover: false,
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
    display: flex;
    // height: 40px;
    .item-left {
      display: flex;
      align-items: center;
      height: 100%;
      width: 126px;
      margin-right: 9px;
      padding: 10px 0;
      font-size: 14px;
      font-weight: 400;
      color: #000000;
      .second-text-link {
        width: 16px;
        height: 16px;
        margin-left: 5px;
      }
    }
    .item-right {
      height: 100%;
      width: calc(100% - 135px);
      padding: 10px 0;
      border-bottom: 1px solid RGBA(217, 217, 209, 1);

      .tag-box {
        width: 100%;
        height: 18px;
        display: flex;
        align-items: center;
        margin-bottom: 6px;
        background: #d9d9d9;
        border-radius: 13px;
        font-size: 12px;
        font-weight: 400;
        color: #333333;
        padding: 0 6px;
        &:last-child {
          margin-bottom: 0;
        }
        .name {
          display: inline-block;
          max-width: calc(100% - 23px);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .format {
          display: inline-block;
          width: 23px;
        }
      }
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
.van-popover__wrapper {
  display: flex;
  align-items: center;
}
.tip-box {
  width: 300px;
  padding: 10px;
  font-size: 10px;
}
</style>

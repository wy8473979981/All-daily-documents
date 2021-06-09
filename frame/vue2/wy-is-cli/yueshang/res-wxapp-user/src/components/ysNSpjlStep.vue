<template>
  <!-- 商业公司发起的商务条件  审批记录 模块 -->
  <!-- 点击查看审批流 弹出 审批记录弹窗 -->
  <van-popup v-model="show" position="top" :close-on-click-overlay="false">
    <div class="wrapper">
      <customTags :data="{mainText:'审批记录',subText:''}" :height="`24px`" :mianTextStyle="{width:'80px'}" />
      <div class="body-content">

        <div class="custom-steps">
          <div class="custom-steps__items">
            <div class="custom-step__item ">
              <div class="custom-step__centent">
                <ysSection :collapseable="true" :use-image="false">
                  <div slot="head-title" class="head-title">潘丽 05-12 16:08 </div>
                  <div slot="heade-right-text" class="heade-right-text">已签批</div>
                  <span class="ly-content">
                    该商户装修期153天(2021.06.01-2021.10.31)期间只交一个月物业费，即1184*35=65382元
                    该商户装修期153天(2021.06.01-2021.10.31)期间只交一个月物业费，即1184*35=65382元
                    该商户装修期153天(2021.06.01-2021.10.31)期间只交一个月物业费，即1184*35=65382元
                    该商户装修期153天(2021.06.01-2021.10.31)期间只交一个月物业费，即1184*35=65382元
                    该商户装修期153天(2021.06.01-2021.10.31)期间只交一个月物业费，即1184*35=65382元
                    该商户装修期153天(2021.06.01-2021.10.31)期间只交一个月物业费，即1184*35=65382元

                  </span>
                </ysSection>
              </div>
              <div class="custom-step__circle-container">
                <i class="custom-icon custom-icon__no"></i>
              </div>
              <div class="custom-step__line "></div>
            </div>

            <div class="custom-step__item ">
              <div class="custom-step__centent">
                <ysSection :collapseable="true" :use-image="false">
                  <div slot="head-title" class="head-title">潘丽 05-12 16:08 </div>
                  <div slot="heade-right-text" class="heade-right-text">已签批</div>
                  <span class="ly-content">
                    该商户装修期153天(2021.06.01-2021.10.31)期间只交一个月物业费，即1184*35=65382元
                    该商户装修期153天(2021.06.01-2021.10.31)期间只交一个月物业费，即1184*35=65382元
                    该商户装修期153天(2021.06.01-2021.10.31)期间只交一个月物业费，即1184*35=65382元
                    该商户装修期153天(2021.06.01-2021.10.31)期间只交一个月物业费，即1184*35=65382元
                  </span>
                </ysSection>
              </div>
              <div class="custom-step__circle-container">
                <i class="custom-icon custom-icon__yes"></i>
              </div>
              <div class="custom-step__line custom-step__line__yes"></div>
            </div>

            <div class="custom-step__item ">
              <div class="custom-step__centent">
                <ysSection :collapseable="true" :use-image="false">
                  <div slot="head-title" class="head-title">潘丽 05-12 16:08 </div>
                  <div slot="heade-right-text" class="heade-right-text">已签批</div>
                  <span class="ly-content">
                    该商户装修期153天(2021.06.01-2021.10.31)期间只交一个月物业费，即1184*35=65382元
                    该商户装修期153天(2021.06.01-2021.10.31)期间只交一个月物业费，即1184*35=65382元
                    该商户装修期153天(2021.06.01-2021.10.31)期间只交一个月物业费，即1184*35=65382元
                  </span>
                </ysSection>
              </div>
              <div class="custom-step__circle-container">
                <i class="custom-icon custom-icon__no custom-icon custom-icon__yes"></i>
              </div>
              <div class="custom-step__line custom-step__line__yes"></div>
            </div>
          </div>
          <ysNPopup :showPopup="true" :buttonList="buttonList" :placeholder="'填写审批意见'" @onCancel="onCancel" @onSave="onSave"></ysNPopup>
        </div>

      </div>
    </div>
  </van-popup>
</template>
<script>
export default {
  name: 'ysNSpjlStep',
  components: {
  },
  props: {
    showSpjl: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    showSpjl: {
      handler: function (newValue) {
        this.show = newValue
      },
      // immediate: true,
      // deep: true,
    },
  },
  data () {
    return {
      show: this.showSpjl,
      buttonList: [
        {
          name: '取消',
          style: {
            color: '#333',
            background: 'transparent',
          },
          fc: 'cancel'
        },
        {
          name: '保存',
          style: {
            color: '#fff',
            background: '#0071C1'
          },
          fc: 'save'
        }
      ]
    }
  },
  computed: {},
  created () { },
  mounted () { },
  methods: {
    close () {
      this.$emit('update:showSpjl', false);
    },
    onCancel () {
      this.$emit('update:showSpjl', false);
    },
    onSave () {

    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/scss/variables.scss";
.wrapper {
  width: 100%;
  height: 100%;
  padding: 13px 23px 20px 22px;
  background-color: #f6f6ee;
  font-family: PingFangSC-Regular, PingFang SC;
  .body-content {
    width: 100%;
    margin-top: 14px;
    min-height: 200px;
    .custom-steps__items {
      height: 250px;
      overflow: auto;
      padding: 0 0 0 35px;
      margin-bottom: 20px;
      .custom-step__item {
        display: block;
        padding: 17px 0 10px 0;
        position: relative;
        flex: 1;
        color: #969799;
        font-size: 14px;
        &:not(:last-child) {
          border-bottom: 1px solid #c0c0b8;
        }
        &:first-child {
          padding-top: 0;
          .custom-step__circle-container {
            top: 13px;
          }
          .custom-step__line {
            top: 30px;
            height: 94%;
          }
        }
        &:last-child {
          .custom-step__line {
            display: none;
          }
        }
        .custom-step__circle-container {
          position: absolute;
          top: 30px;
          left: -23px;
          z-index: 2;
          font-size: 12px;
          line-height: 1;
          -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
          .custom-icon {
            display: block;
            width: 25px;
            height: 25px;
            background-repeat: no-repeat;
            background-size: contain;
          }
          .custom-icon__no {
            background-image: url("../assets/images/unapproval.png");
          }
          .custom-icon__yes {
            background-image: url("../assets/images/approval.png");
          }
        }
        .custom-step__line {
          position: absolute;
          left: -23px;
          top: 49px;
          height: 82%;
          width: 1px;
          background-color: #bfbfc2;
          -webkit-transition: background-color 0.3s;
          transition: background-color 0.3s;
        }

        .custom-step__line__yes {
          background-color: #0071c1;
        }
      }
    }
  }
}
::v-deep .ys-n-section {
  margin-bottom: 0px;
  .app-section__head {
    height: 25px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 500;
    color: #020b14;
  }
  .app-section__body {
    padding: 0;
  }
}
</style>

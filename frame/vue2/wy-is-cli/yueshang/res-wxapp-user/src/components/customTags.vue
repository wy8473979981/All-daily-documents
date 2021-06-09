<template>
  <div class="custom-tags">

    <div class="custom-tags-vertical" v-if="type == 'vertical'">
      <span :class="`mian-text-${className} mian-text`" :style="mianTextStyle" @click="mianHandleClick">{{data.mainText}}</span>
      <span :class="`sub-text-${className} sub-text`" :style="subTextStyle">{{data.subText}}</span>
    </div>

    <div :class="`${className} custom-tags-horizontal`" v-if="type == 'horizontal'" :style="{height:height}">

      <div class="horizontal-box">
        <span :class="`mian-text-${className} mian-text`" :style="mianTextStyle" @click="mianHandleClick">{{data.mainText}}</span>
        <span class="sub-text" v-if="data.subText" :style="subTextStyle">{{data.subText}}</span>
      </div>

      <template v-if="link">
        <span :class="`second-text-${className} second-text`" :style="secondTextStyle" v-if="data.secondText" @click="secHandleClick">
          {{data.secondText}}
          <van-image class="second-text-link" :src="arrowDown"></van-image>
        </span>

      </template>

      <template v-else>
        <span :class="`second-text-${className} second-text`" :style="secondTextStyle" v-if="data.secondText">{{data.secondText}}</span>
      </template>

    </div>

  </div>
</template>
<script>
import arrowDown from "../assets/images/more-arrow.png";
export default {
  name: 'customTags',
  data () {
    return {
      arrowDown: arrowDown,
    }
  },
  props: {
    type: {// 垂直或者水平
      type: String,
      default: 'horizontal'
    },
    link: {// 链接或者有点击事件
      type: Boolean,
      default: false
    },
    height: {// 水平组件高度
      type: String,
      default: '18px'
    },
    className: {
      type: String,
      default: 'blue'
    },
    mianTextStyle: {
      type: Object,
      default: null
    },
    subTextStyle: {
      type: Object,
      default: null
    },
    secondTextStyle: {
      type: Object,
      default: null
    },
    data: {// 数据
      type: Object,
      default: { mainText: null, subText: null, secondText: null }
    },
  },
  watch: {

  },
  computed: {
  },
  created () {
  },
  mounted () {
  },
  methods: {
    mianHandleClick () {
      this.$emit('mianHandleClick')
    },
    secHandleClick () {
      this.$emit('handleClick')
      console.log('handleClick')
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/scss/variables.scss";

.custom-tags {
  display: flex;
  align-items: center;
  font-family: PingFangSC-Regular, PingFang SC;
  .custom-tags-vertical {
    border-radius: 13px;
    font-weight: 400;
    .mian-text {
      display: inline-block;
      height: 18px;
      padding: 0 9px;
      font-size: 12px;
      text-align: center;
      white-space: nowrap;
      border-radius: 13px;
    }
    .sub-text {
      display: block;
      padding-right: 9px;
      white-space: nowrap;
      text-align: center;
      font-size: 10px;
    }
  }
  .custom-tags-horizontal {
    height: 18px;
    display: flex;
    align-items: center;
    font-weight: 400;
    white-space: nowrap;
    .horizontal-box {
      height: 100%;
      display: flex;
      align-items: center;
      background: #bfbfc2;
      border-radius: 13px;
    }
    .mian-text {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 13px;
      text-align: center;
      font-size: 10px;
      white-space: nowrap;
      padding: 0 9px;
    }
    .sub-text {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #bfbfc2;
      border-radius: 13px;
      text-align: center;
      font-size: 10px;
      color: #ffffff;
      padding: 0 8px 0 5px;
    }
    .second-text {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      margin-left: 15px;
    }
    .second-text-link {
      width: 5px;
      height: 10px;
      margin-left: 5px;
    }
  }

  .custom-tags-vertical,
  .custom-tags-horizontal {
    .mian-text-blue {
      color: #ffffff;
      background: #0071c1;
    }
    .mian-text-red {
      color: #ffffff;
      background: #be0000;
    }
    .mian-text-gray {
      color: #ffffff;
      background: #bfbfc2;
    }
    .mian-text-dark-blue {
      color: #ffffff;
      background: #004c83;
    }
    .mian-text-none {
      font-size: 14px;
      color: #575757;
    }

    .sub-text-blue {
      color: #0071c1;
    }
    .sub-text-red {
      color: rgba(111, 18, 12, 1);
    }
    .sub-text-gray {
      color: #575757;
    }

    .second-text-blue {
      color: #0071c1;
    }
    .second-text-red {
      color: rgba(111, 18, 12, 1);
    }
    .second-text-gray {
      color: #575757;
    }
    .second-text-dark-blue {
      color: #0071c1;
    }
  }
}
</style>

<template>
  <!-- 搜索 -->
  <van-search v-model="value" :class="{'van-search-bg': showBg}" :placeholder="placeholder" :autofocus="autofocus" :disabled="disabled" @input="changeText">
    <template #left-icon>
      <van-image :src="iconSearch"></van-image>
    </template>
  </van-search>
</template>
<script>
import iconSearch from "../../assets/images/icon-search.png";
export default {
  data() {
    return {
      value: '',
      iconSearch: iconSearch
    }
  },
  props: {
    search: {
      type: [String,Number],
      default: ''
    },
    placeholder: {
      type: String,
      default: '搜索'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    pageType: {
      type: [Number,String]
    },
    showBg: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    search: {
      handler(n, o) {
        console.log("model-new=" + n + "-----old=" + o)
        this.value = n
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    changeText(data) {
      // console.log('imput-value:',data)
      this.$emit('changeText',data)
    }
  },
  mounted() {
    this.$nextTick(() => {
      if(this.pageType === 9) {
        document.getElementsByTagName('input')[0].focus();
      }
    })
  },
}
</script>
<style lang="scss" scoped>
/* 自定义 search 组件样式 */
.van-search {
  padding: 16px 40px;
  background-color: transparent;
}
.van-search-bg {
  background: linear-gradient(270deg, #286B97 0%, #3891B9 100%);
}
/deep/ .van-search__content {
  background-color: rgba(255,255,255,0.26);
  font-size: 28px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  height: 60px;
  line-height: 60px;
  border-radius: 30px;
}
.van-search .van-cell {
  display: flex!important;
  align-items: center!important;
  padding: 2px 8px 2px 0;
}
/deep/ .van-field__control {
  color: #FFFFFF;
  text-indent: 16px;
}
/deep/ .van-field__left-icon {
  width: 30px;
  //height: 26px;
  .van-image {
    vertical-align: sub;
  }
}
/deep/ input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
  font-size: 28px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255,255,255,.7);
}

/deep/ input:-moz-placeholder, textarea:-moz-placeholder {
  font-size: 28px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255,255,255,.7);
}

/deep/input::-moz-placeholder, textarea::-moz-placeholder {
  font-size: 28px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255,255,255,.7);
}

/deep/input:-ms-input-placeholder, textarea:-ms-input-placeholder {
  font-size: 28px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255,255,255,.7);
}
</style>
